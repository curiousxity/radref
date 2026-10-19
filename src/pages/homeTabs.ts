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
