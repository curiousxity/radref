import { useEffect, useState } from 'react'
import {
  THEME_KEY,
  applyTheme,
  clearStoredTheme,
  nextThemeChoice,
  parseStoredTheme,
  readStoredTheme,
  resolveTheme,
  themeToggleLabel,
  writeStoredTheme,
  type ThemeChoice,
} from '../lib/theme'

function prefersDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/** Header button cycling System, Light and Dark. The icon shows the current choice. */
export function ThemeToggle() {
  // The pre-paint script in index.html has already set data-theme from the same key.
  const [choice, setChoice] = useState<ThemeChoice>(() => readStoredTheme() ?? 'system')

  // Follow the system setting live, but only while the choice is 'system'.
  useEffect(() => {
    if (choice !== 'system') return
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    function onChange(event: MediaQueryListEvent) {
      applyTheme(resolveTheme(null, event.matches))
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [choice])

  // Another tab (or an anatomy viewer) changed the stored choice. A removed key
  // (newValue null) or a storage clear (key null) means follow the system again.
  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== THEME_KEY && event.key !== null) return
      const stored = event.key === null ? null : parseStoredTheme(event.newValue)
      applyTheme(resolveTheme(stored, prefersDark()))
      setChoice(stored ?? 'system')
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  function handleToggle() {
    const next = nextThemeChoice(choice)
    if (next === 'system') {
      clearStoredTheme()
      applyTheme(resolveTheme(null, prefersDark()))
    } else {
      writeStoredTheme(next)
      applyTheme(next)
    }
    setChoice(next)
  }

  return (
    <button type="button" className="theme-toggle" onClick={handleToggle} aria-label={themeToggleLabel(choice)}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        {choice === 'light' ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </>
        ) : choice === 'dark' ? (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
          </>
        )}
      </svg>
    </button>
  )
}
