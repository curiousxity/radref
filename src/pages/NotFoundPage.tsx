import { Link, useLocation } from 'react-router-dom'
import { regionGroups, regionPath, regions } from '../data/calculators'

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
            date, or a page may have moved to a different address.
          </p>
          <div className="hero-actions">
            <Link to="/" className="primary-button">Browse everything</Link>
          </div>
        </div>
      </section>

      {regions.map((region) => (
        <section key={region} className="info-card">
          <h3><Link to={regionPath(region)}>{region}</Link></h3>
          <ul className="plain-list link-list">
            {regionGroups(region).flatMap((group) => group.items).map((item) => (
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
