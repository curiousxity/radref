import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * A client-side route change leaves the scroll position where it was, so
 * opening a calculator from halfway down the home page lands you halfway down
 * the calculator. Reset to the top on forward navigation, and leave POP alone
 * so the browser can restore the previous position on back/forward.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType === 'POP') return
    // `html { scroll-behavior: smooth }` would otherwise animate the jump.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, navigationType])

  return null
}
