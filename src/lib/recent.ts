import { calculators } from '../data/calculators'
import type { IndexedCalculator } from '../data/calculators'

export const RECENT_KEY = 'radref-recent'
export const RECENT_MAX = 6

/** Moves `path` to the front, drops any earlier copy, and keeps at most `max` entries. */
export function pushRecent(list: string[], path: string, max: number = RECENT_MAX): string[] {
  return [path, ...list.filter((entry) => entry !== path)].slice(0, max)
}

export function readRecent(storage?: Pick<Storage, 'getItem'>): string[] {
  try {
    const parsed: unknown = JSON.parse((storage ?? localStorage).getItem(RECENT_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter((entry): entry is string => typeof entry === 'string') : []
  } catch {
    return []
  }
}

export function writeRecent(list: string[], storage?: Pick<Storage, 'setItem'>): void {
  try {
    (storage ?? localStorage).setItem(RECENT_KEY, JSON.stringify(list))
  } catch {
    // Storage blocked: the list just won't persist.
  }
}

/** The registry items for `paths`, in the same order; paths no longer in the registry are dropped. */
export function recentItems(paths: string[]): IndexedCalculator[] {
  return paths.flatMap((path) => calculators.filter((item) => item.path === path))
}
