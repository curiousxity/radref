/** What the build stamps in through `define` in vite.config.ts. */
export type BuildInfo = {
  /** `version` from package.json. */
  version: string
  /** Build day, YYYY-MM-DD in UTC. */
  date: string
  /** Short git commit, or empty when the build ran outside a git checkout. */
  commit: string
}

/** The footer line, e.g. "Version 1.0.0 · built 2026-10-23 · 9cc2037". */
export function versionLine({ version, date, commit }: BuildInfo): string {
  return [`Version ${version}`, `built ${date}`, commit].filter(Boolean).join(' · ')
}
