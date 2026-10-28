/** What the build stamps in through `define` in vite.config.ts. */
export type BuildInfo = {
  /** `appVersion` of package.json's version and the commit count. */
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

/**
 * The version every deploy shows: major and minor from package.json, and as the patch number the
 * count of commits on the built commit's first-parent history, so each merge or push to main
 * deploys a higher number without anyone editing package.json. With no count (a build outside a
 * git checkout, or a shallow clone), package.json's version is used as it is.
 */
export function appVersion(packageVersion: string, commitCount: number | null): string {
  if (commitCount === null || !Number.isInteger(commitCount) || commitCount < 1) return packageVersion
  const [major, minor] = packageVersion.split('.')
  return `${major}.${minor}.${commitCount}`
}
