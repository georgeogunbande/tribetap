import type { EngineInterface, Register } from 'claude-code'

// A short prompt that asks for one of these and nothing heavier is simple.
const SIMPLE = /\b(renam\w*|format\w*|prettier|reindent|indent|typo|spelling|sort imports?|add a comment|what is|what does|what's|how do i|explain briefly|quick question)\b/i
const HEAVY = /\b(implement|refactor|architect\w*|design|debug|investigate|migrat\w*|optimi[sz]e|security|performance|across|every file|all files|write tests?|build|fix the bug)\b/i
const MAX_SIMPLE_CHARS = 280

// A subagent that only looks: an Explore agent, or a prompt that asks to find
// or read and names no change.
const LOOKS = /\b(find|search|locate|grep|list|read|look up|where is|which files?)\b/i
const CHANGES = /\b(edit|write|create|implement|fix|modify|delete|remove|refactor|rename|run|install|commit)\b/i

const isSimple = (text: string) =>
  text.length <= MAX_SIMPLE_CHARS && SIMPLE.test(text) && !HEAVY.test(text)

const isReadOnly = (type: string, prompt: string) =>
  type === 'Explore' || (LOOKS.test(prompt) && !CHANGES.test(prompt))

async function lastPrompt($: EngineInterface): Promise<string> {
  const rows = await $.session.messages()
  if ('deny' in rows) return ''
  const prompts = rows.filter(row => row.role === 'user' && row.text.trim() !== '')

  return prompts[prompts.length - 1]?.text ?? ''
}

function show($: EngineInterface, main: string, sub: string) {
  $.ui.status([main && `model ${main}`, sub && `sub ${sub}`].filter(Boolean).join(' · ') || undefined)
}

export const register: Register = (on, options) => {
  const cheap = String(options.cheapModel)
  // One decision per turn, so a turn keeps one model and its cache.
  const verdicts = new Map<string, boolean>()
  let lastMain = ''
  let lastSub = ''

  on('turn.step', async function* ($, e, next) {
    // Subagents are routed at agent.spawn; their steps only report.
    if (e.agentId !== undefined) {
      lastSub = e.model
      show($, lastMain, lastSub)

      return yield* next(e)
    }

    let simple = verdicts.get(e.turnId)
    if (simple === undefined) {
      simple = isSimple(await lastPrompt($))
      verdicts.set(e.turnId, simple)
      if (verdicts.size > 50) verdicts.delete(verdicts.keys().next().value as string)
    }

    const model = simple ? cheap : e.model
    lastMain = simple ? `${model} (simple)` : model
    show($, lastMain, lastSub)

    return yield* next(simple ? { ...e, model } : e)
  })

  on('agent.spawn', ($, e, next) => {
    if (e.fork || e.model !== undefined || !isReadOnly(e.subagentType, e.prompt)) {
      return next(e)
    }
    lastSub = `${cheap} (read-only)`
    show($, lastMain, lastSub)

    return next({ ...e, model: cheap })
  })
}
