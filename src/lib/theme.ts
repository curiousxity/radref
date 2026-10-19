export const THEME_KEY = 'radref-theme'

export type Theme = 'light' | 'dark'

/** What the toggle holds: a stored theme, or 'system' (no key stored) to follow the OS. */
export type ThemeChoice = Theme | 'system'

const CHOICE_CYCLE: readonly ThemeChoice[] = ['system', 'light', 'dark']

/** The toggle's cycle: System, then Light, then Dark, then back to System. */
export function nextThemeChoice(current: ThemeChoice): ThemeChoice {
  return CHOICE_CYCLE[(CHOICE_CYCLE.indexOf(current) + 1) % CHOICE_CYCLE.length]
}

/** The toggle's accessible name: the current choice, then what a tap does. */
export function themeToggleLabel(current: ThemeChoice): string {
  const next = nextThemeChoice(current)
  return `Theme: ${current}. ${next === 'system' ? 'Follow system' : `Switch to ${next}`}`
}

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

/** Removes the stored choice, so the system setting is followed again. */
export function clearStoredTheme(
  storage?: Pick<Storage, 'removeItem'>,
): void {
  try {
    (storage ?? localStorage).removeItem(THEME_KEY)
  } catch {
    // Storage blocked: nothing was stored to clear, or it cannot be cleared.
  }
}

/** Sets data-theme on <html> and points every theme-color meta at the active background. */
export function applyTheme(theme: Theme, doc: Document = document): void {
  doc.documentElement.dataset.theme = theme
  doc
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((meta) => meta.setAttribute('content', THEME_COLORS[theme]))
}
