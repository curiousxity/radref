export const THEME_KEY = 'radref-theme'

export type Theme = 'light' | 'dark'

/** Page background per theme; also the browser chrome colour (theme-color meta). */
export const THEME_COLORS: Record<Theme, string> = { light: '#fbfbfa', dark: '#0b0d0e' }

export function parseStoredTheme(raw: string | null): Theme | null {
  return raw === 'light' || raw === 'dark' ? raw : null
}

/** A stored choice wins; otherwise follow the system setting. */
export function resolveTheme(stored: Theme | null, prefersDark: boolean): Theme {
  return stored ?? (prefersDark ? 'dark' : 'light')
}

export function readStoredTheme(
  storage?: Pick<Storage, 'getItem'>,
): Theme | null {
  try {
    return parseStoredTheme((storage ?? localStorage).getItem(THEME_KEY))
  } catch {
    return null
  }
}

export function writeStoredTheme(
  theme: Theme,
  storage?: Pick<Storage, 'setItem'>,
): void {
  try {
    (storage ?? localStorage).setItem(THEME_KEY, theme)
  } catch {
    // Storage blocked: the choice just won't persist.
  }
}

/** Sets data-theme on <html> and points every theme-color meta at the active background. */
export function applyTheme(theme: Theme, doc: Document = document): void {
  doc.documentElement.dataset.theme = theme
  doc
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((meta) => meta.setAttribute('content', THEME_COLORS[theme]))
}
