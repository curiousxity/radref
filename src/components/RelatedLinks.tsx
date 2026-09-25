import { Link } from 'react-router-dom'
import { itemLabelFor, relatedTo } from '../data/calculators'

function capitalise(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

/**
 * Cross-links under a page, e.g. from a lesson to the calculator that applies it.
 * Driven by `related` in the registry, so the pages themselves stay unaware of it.
 */
export function RelatedLinks({ path }: { path: string }) {
  const items = relatedTo(path)
  if (items.length === 0) return null

  return (
    <section className="section-block related-links" aria-labelledby="related-heading">
      <p className="eyebrow" id="related-heading">Related</p>
      <div className="card-grid">
        {items.map((item) => (
          <Link key={item.path} to={item.path} className="tool-card">
            <div>
              <p className="tool-category">{capitalise(itemLabelFor(item.category))}</p>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
            <span className="tool-arrow">Open</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
