import { describe, expect, it } from 'vitest'
import { nextChoiceIndex } from './choiceKeys'

// Radiogroup keyboard pattern (WAI-ARIA APG): arrows move and wrap, Home/End jump to the ends.
describe('nextChoiceIndex', () => {
  it.each([
    [0, 'ArrowRight', 3, 1],
    [2, 'ArrowRight', 3, 0],
    [0, 'ArrowDown', 3, 1],
    [0, 'ArrowLeft', 3, 2],
    [1, 'ArrowUp', 3, 0],
    [1, 'Home', 3, 0],
    [0, 'End', 3, 2],
  ])('(%i, %s, %i) moves to %i', (current, key, count, expected) => {
    expect(nextChoiceIndex(current, key, count)).toBe(expected)
  })

  it('ignores other keys', () => {
    expect(nextChoiceIndex(0, 'a', 3)).toBeNull()
  })
})
