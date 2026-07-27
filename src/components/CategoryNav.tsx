import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import type { CalculatorCategory } from '../data/calculators'

function closeAllDropdowns() {
  document.querySelectorAll('details.nav-dropdown[open]').forEach((el) => el.removeAttribute('open'))
}

export function CategoryNav({ categories }: { categories: CalculatorCategory[] }) {
  const location = useLocation()

  useEffect(() => {
    closeAllDropdowns()
  }, [location.pathname])

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      document.querySelectorAll('details.nav-dropdown[open]').forEach((el) => {
        if (!el.contains(event.target as Node)) el.removeAttribute('open')
      })
    }
    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [])

  return (
    <nav className="top-nav" aria-label="Primary">
      {categories.map((category) => {
        const isActiveCategory = category.items.some((item) => item.path === location.pathname)
        return (
          <details key={category.name} className="nav-dropdown" name="primary-nav">
            <summary className={isActiveCategory ? 'nav-link active' : 'nav-link'}>{category.name}</summary>
            <div className="nav-dropdown-menu">
              {category.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => (isActive ? 'nav-dropdown-link active' : 'nav-dropdown-link')}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </details>
        )
      })}
    </nav>
  )
}
