type KeyLike = Pick<KeyboardEvent, 'key' | 'ctrlKey' | 'metaKey' | 'altKey' | 'defaultPrevented'> & {
  target: EventTarget | null
}

/**
 * Whether a keypress is the `/` shortcut to the search field: a plain `/`, with no
 * modifier, while focus is not somewhere the viewer types.
 */
export function isSearchShortcut(event: KeyLike): boolean {
  if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey || event.defaultPrevented) return false
  const target = event.target as { tagName?: unknown; isContentEditable?: unknown } | null
  if (!target) return true
  if (target.isContentEditable === true) return false
  const tag = typeof target.tagName === 'string' ? target.tagName.toUpperCase() : ''
  return tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT'
}
