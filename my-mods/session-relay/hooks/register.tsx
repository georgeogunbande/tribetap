import type { EngineInterface, Register } from 'claude-code'

type Role = 'planner' | 'builder' | 'reviewer'
type Registry = Partial<Record<Role, string>>

const TARGET: Partial<Record<Role, Role>> = { planner: 'builder', builder: 'reviewer' }
const TAG = '[session-relay]'
const MAX_PLAN = 8000
const MAX_SUMMARY = 800

const clip = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max)}… (cut)` : text

type Engine = EngineInterface

async function readRegistry($: Engine, path: string): Promise<Registry> {
  if (!(await $.fs.exists(path))) return {}
  try {
    return JSON.parse(await $.fs.read(path)) as Registry
  } catch {
    return {}
  }
}

async function relay($: Engine, path: string, role: Role, title: string, body: string) {
  const target = TARGET[role]
  if (target === undefined) return
  const sessionId = (await readRegistry($, path))[target]
  if (sessionId === undefined) {
    $.ui.toast(`session-relay: no ${target} session registered yet`)
    return
  }
  const sent = await $.session.send({
    to: { sessionId },
    text: `${TAG} ${title} from the ${role} session:\n\n${body}`,
  })
  $.ui.toast(
    sent.isDelivered
      ? `session-relay: sent to the ${target} session`
      : `session-relay: ${target} not reached (${sent.reason})`,
  )
}

export const register: Register = (on, options) => {
  const role = options.role as Role | 'off'
  const registryPath = String(options.registry)
  let hasPlanned = false
  const edited = new Set<string>()

  on('session.start', async ($, e, next) => {
    if (role !== 'off') {
      const registry = await readRegistry($, registryPath)
      registry[role] = await $.session.id()
      await $.fs.write(registryPath, JSON.stringify(registry, null, 2))
    }

    return next(e)
  })

  // The plan is the answer the planning turn ends on after ExitPlanMode.
  on('tool.call', { tool: 'ExitPlanMode' }, ($, e, next) => {
    if (role === 'planner') hasPlanned = true

    return next(e)
  })

  on('tool.call', { tool: ["Edit", "Write"] }, ($, e, next) => {
    if (role === 'builder') if ('file_path' in e) edited.add(e.file_path)

    return next(e)
  })

  on('turn.complete', async ($, e, next) => {
    const ran = await next(e)
    if (e.agentId !== undefined || e.reason !== 'answer') return ran

    if (role === 'planner' && hasPlanned && e.answer.trim() !== '') {
      hasPlanned = false
      await relay($, registryPath, role, 'Plan', clip(e.answer.trim(), MAX_PLAN))
    }

    if (role === 'builder' && edited.size > 0) {
      const files = [...edited].slice(0, 15).join(', ')
      edited.clear()
      await relay($, registryPath, role, 'Change summary', `${clip(e.answer.trim(), MAX_SUMMARY)}\n\nFiles: ${files}`)
    }

    return ran
  })

  on('session.receive', async ($, e, next) => {
    if (e.text.startsWith(TAG)) {
      const title = e.text.slice(TAG.length).trim().split(' from ')[0]
      $.ui.toast(`session-relay: ${title} received`)
    }

    return next(e)
  })
}
