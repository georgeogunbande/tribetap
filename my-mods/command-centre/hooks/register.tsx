import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { AgentRow, Snapshot } from '../types'

const PANE = 'command-centre'
const EVERY_MS = 5 * 60 * 1000
const FAILURE = /\b(error|failed|failure|exception|traceback|fatal)\b/i
const OPEN_TODO = /^\s*[-*]\s*\[ \]\s*(.+)$/
const MAX_TODOS = 20

// Change the tag when the snapshot's fields change: it declines what an
// earlier version stored, which outlives a reload.
const snapshot = atom({ plugin: 'command-centre', key: 'snapshot' } as const, null, {
  shape: 'snapshot-1',
})

const join = (dir: string, name: string) => `${dir.replace(/\/$/, '')}/${name}`

// The newest file's time, and a failure line from the tail of the newest log.
async function inspect($: EngineInterface, name: string, files: string[]): Promise<AgentRow> {
  let newest: { path: string; mtimeMs: number } | null = null
  for (const path of files) {
    const stat = await $.fs.stat(path)
    if (stat.kind === 'file' && (newest === null || stat.mtimeMs > newest.mtimeMs)) {
      newest = { path, mtimeMs: stat.mtimeMs }
    }
  }
  if (newest === null) return { name, lastRunMs: null, failure: null }

  let failure: string | null = null
  try {
    const tail = (await $.fs.read(newest.path)).split('\n').slice(-60)
    failure = tail.reverse().find(line => FAILURE.test(line))?.trim().slice(0, 120) ?? null
  } catch {
    failure = null
  }

  return { name, lastRunMs: newest.mtimeMs, failure }
}

async function collect($: EngineInterface, agentsDir: string, notesFile: string): Promise<Snapshot> {
  const problems: string[] = []
  const agents: AgentRow[] = []

  if (await $.fs.exists(agentsDir)) {
    for (const entry of await $.fs.list(agentsDir)) {
      const path = join(agentsDir, entry.name)
      if (entry.kind === 'dir') {
        const files = (await $.fs.list(path)).map(inner => join(path, inner.name))
        agents.push(await inspect($, entry.name, files))
      } else if (entry.kind === 'file') {
        agents.push(await inspect($, entry.name, [path]))
      }
    }
  } else {
    problems.push(`no agents folder at ${agentsDir}`)
  }

  let todos: string[] = []
  if (await $.fs.exists(notesFile)) {
    todos = (await $.fs.read(notesFile))
      .split('\n')
      .flatMap(line => OPEN_TODO.exec(line)?.[1] ?? [])
      .slice(0, MAX_TODOS)
  } else {
    problems.push(`no notes file at ${notesFile}`)
  }

  agents.sort((a, b) => (b.lastRunMs ?? 0) - (a.lastRunMs ?? 0))

  return {
    agents,
    todos,
    refreshedMs: await $.clock.now(),
    problem: problems.length > 0 ? problems.join('; ') : null,
  }
}

function ago(nowMs: number, thenMs: number | null): string {
  if (thenMs === null) return 'never'
  const minutes = Math.max(0, Math.round((nowMs - thenMs) / 60000))
  if (minutes < 60) return `${minutes}m ago`
  if (minutes < 60 * 48) return `${Math.round(minutes / 60)}h ago`
  return `${Math.round(minutes / 1440)}d ago`
}

export const register: Register = (on, options) => {
  const agentsDir = String(options.agentsDir)
  const notesFile = String(options.notesFile)

  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'command-centre',
      description: 'Open the command centre pane',
    })
    await update($, snapshot, () => null)
    void $.ui.open({ id: PANE, title: 'Command centre' })
    const refresh = async () => {
      const fresh = await collect($, agentsDir, notesFile)
      await update($, snapshot, () => fresh)
    }
    void refresh()
    $.clock.every(EVERY_MS, refresh)

    return next(e)
  })

  on('command.run', { command: 'command-centre' }, async $ => {
    await $.ui.open({ id: PANE, title: 'Command centre' })

    return { text: 'Command centre opened.' }
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text, Button } = $.ui.resolve(e)
    const data = await read($, snapshot)
    const now = await $.clock.now()

    if (data === null) return <Text dimColor>Loading…</Text>

    const failing = data.agents.filter(agent => agent.failure !== null).length

    return (
      <Box flexDirection="column">
        <Text bold>
          Agents ({data.agents.length}, {failing} failing)
        </Text>
        {data.agents.length === 0 && <Text dimColor>None found.</Text>}
        {data.agents.map(agent => (
          <Box flexDirection="column">
            <Text>
              {agent.failure === null ? 'ok  ' : 'FAIL'} {agent.name} · {ago(now, agent.lastRunMs)}
            </Text>
            {agent.failure !== null && <Text dimColor>  {agent.failure}</Text>}
          </Box>
        ))}
        <Text bold>To-dos ({data.todos.length})</Text>
        {data.todos.length === 0 && <Text dimColor>Nothing open.</Text>}
        {data.todos.map(todo => (
          <Text>[ ] {todo}</Text>
        ))}
        {data.problem !== null && <Text dimColor>{data.problem}</Text>}
        <Text dimColor>Refreshed {ago(now, data.refreshedMs)} · every 5 min</Text>
        <Button
          key="refresh"
          label="Refresh now"
          onPress={async () => {
            const fresh = await collect($, agentsDir, notesFile)
            await update($, snapshot, () => fresh)
          }}
        />
      </Box>
    )
  })
}
