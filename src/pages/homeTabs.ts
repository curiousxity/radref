import type { CalculatorCategory } from '../data/calculators'

export type HomeTab = 'calculators' | 'studies' | 'anatomy' | 'recent'

export const HOME_TABS: { id: HomeTab; label: string }[] = [
  { id: 'calculators', label: 'Calculators' },
  { id: 'studies', label: 'Studies' },
  { id: 'anatomy', label: 'Anatomy' },
  { id: 'recent', label: 'Recent' },
]

/** The tab named by `?tab=`; anything else (or nothing) is the Calculators tab. */
export function parseHomeTab(value: string | null): HomeTab {
  return HOME_TABS.find((tab) => tab.id === value)?.id ?? 'calculators'
}

const OWN_TAB: Record<string, HomeTab> = { Studies: 'studies', Anatomy: 'anatomy' }

/** Studies and Anatomy each get their own tab; every other category, in registry order, is Calculators. */
export function categoriesForTab(
  tab: Exclude<HomeTab, 'recent'>,
  categories: CalculatorCategory[],
): CalculatorCategory[] {
  return categories.filter((category) => (OWN_TAB[category.name] ?? 'calculators') === tab)
}

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

/**
 * What the panel under the (always visible) tab row shows: search results while the query
 * has any text, otherwise the selected tab's content.
 */
export function homePanel(tab: HomeTab, query: string): HomeTab | 'search' {
  return query.trim() !== '' ? 'search' : tab
}

/** The tab marked selected (aria-selected and the underline): the shown tab, or none while
 *  search results fill the panel. */
export function selectedTab(tab: HomeTab, panel: HomeTab | 'search'): HomeTab | null {
  return panel === 'search' ? null : tab
}

/** Choosing a tab clears the search, so the tab's own content shows. */
export function queryAfterTabSelect(): string {
  return ''
}

/**
 * The tab a key moves to in a row of `count` tabs (ARIA tabs pattern): arrows step and wrap,
 * Home and End jump to the ends. Null for any other key.
 */
export function tabIndexForKey(key: string, current: number, count: number): number | null {
  switch (key) {
    case 'ArrowRight': return (current + 1) % count
    case 'ArrowLeft': return (current - 1 + count) % count
    case 'Home': return 0
    case 'End': return count - 1
    default: return null
  }
}
