import { describe, expect, test } from 'vitest'
import { calculators } from './calculators'

describe('registry', () => {
  test('tags are short', () => {
    for (const item of calculators) {
      if (item.tag === undefined) continue
      expect(item.tag.length, item.path).toBeGreaterThan(0)
      expect(item.tag.length, item.path).toBeLessThanOrEqual(12)
    }
  })
})
