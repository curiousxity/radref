import { describe, expect, test } from 'vitest'
import { RECENT_MAX, pushRecent, readRecent, recentItems, writeRecent } from './recent'

describe('pushRecent', () => {
  test('moves an existing path to the front', () => {
    expect(pushRecent(['/a', '/b'], '/b')).toEqual(['/b', '/a'])
  })
  test('truncates to max', () => {
    expect(pushRecent(['/a', '/b', '/c'], '/d', 3)).toEqual(['/d', '/a', '/b'])
  })
  test('defaults to RECENT_MAX', () => {
    expect(RECENT_MAX).toBe(6)
    const long = ['/1', '/2', '/3', '/4', '/5', '/6']
    expect(pushRecent(long, '/7')).toHaveLength(6)
  })
})

describe('readRecent', () => {
  test('invalid JSON gives []', () => {
    expect(readRecent({ getItem: () => 'not json' })).toEqual([])
  })
  test('a throwing storage gives []', () => {
    expect(
      readRecent({
        getItem: () => {
          throw new Error()
        },
      }),
    ).toEqual([])
  })
  test('non-array or non-string entries are dropped', () => {
    expect(readRecent({ getItem: () => '{"a":1}' })).toEqual([])
    expect(readRecent({ getItem: () => '["/a", 3, null]' })).toEqual(['/a'])
  })
  test('missing key gives []', () => {
    expect(readRecent({ getItem: () => null })).toEqual([])
  })
})

describe('writeRecent', () => {
  test('stores JSON under the key', () => {
    const seen: [string, string][] = []
    writeRecent(['/a'], { setItem: (k, v) => void seen.push([k, v]) })
    expect(seen).toEqual([['radref-recent', '["/a"]']])
  })
  test('swallows a throwing storage', () => {
    expect(() =>
      writeRecent(['/a'], {
        setItem: () => {
          throw new Error()
        },
      }),
    ).not.toThrow()
  })
})

describe('recentItems', () => {
  test('drops paths not in the registry and keeps order', () => {
    expect(recentItems(['/tirads', '/gone']).map((i) => i.path)).toEqual(['/tirads'])
    expect(recentItems(['/meld', '/tirads']).map((i) => i.path)).toEqual(['/meld', '/tirads'])
  })
})
