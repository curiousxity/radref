/** Where focus and selection move in a radiogroup for a key press (WAI-ARIA APG radio group):
 *  ArrowRight/ArrowDown go forward and ArrowLeft/ArrowUp back, both wrapping; Home and End
 *  jump to the first and last option. Any other key returns null and is left alone. */
export function nextChoiceIndex(current: number, key: string, count: number): number | null {
  if (count <= 0) return null
  switch (key) {
    case 'ArrowRight':
    case 'ArrowDown':
      return (current + 1) % count
    case 'ArrowLeft':
    case 'ArrowUp':
      return (current - 1 + count) % count
    case 'Home':
      return 0
    case 'End':
      return count - 1
    default:
      return null
  }
}
