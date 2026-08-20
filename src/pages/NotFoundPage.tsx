import { Link, useLocation } from 'react-router-dom'
import { categories } from '../data/calculators'

export function NotFoundPage() {
  const location = useLocation()

  return (
    <div className="page">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">404</p>
          <h2>That page does not exist</h2>
          <p>
            Nothing is published at <code className="not-found-path">{location.pathname}</code>. The link may be out of
            date, or a calculator may have moved to a different address.
          </p>
          <div className="hero-actions">
            <Link to="/" className="primary-button">Browse all calculators</Link>
          </div>
        </div>
      </section>

      {categories.map((category) => (
        <section key={category.name} className="info-card">
          <h3>{category.name}</h3>
          <ul className="plain-list link-list">
            {category.items.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
