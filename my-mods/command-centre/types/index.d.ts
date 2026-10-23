export type AgentRow = {
  name: string
  lastRunMs: number | null
  failure: string | null
}

export type Snapshot = {
  agents: AgentRow[]
  todos: string[]
  refreshedMs: number
  problem: string | null
}

declare module 'claude-code' {
  interface PluginState {
    'command-centre': { snapshot: Shaped<Snapshot | null> }
  }
}
