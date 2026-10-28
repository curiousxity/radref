import { useParams } from 'react-router-dom'
import { IndexRows } from '../components/IndexRows'
import { kindLabel, regionForSlug, regionGroups } from '../data/calculators'
import { NotFoundPage } from './NotFoundPage'

/**
 * Everything for one body region at `/regions/:slug`, under a small heading per kind of page.
 * The 3D tag is left off under the 3D anatomy heading, which already says it.
 */
export function RegionPage() {
  const region = regionForSlug(useParams().slug)
  if (!region) return <NotFoundPage />

  return (
    <div className="page">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Region</p>
          <h2>{region}</h2>
        </div>
      </section>

      {regionGroups(region).map(({ kind, items }) => (
        <section key={kind} className="index-section" aria-labelledby={`region-${kind}`}>
          <h3 className="index-label" id={`region-${kind}`}>{kindLabel(kind, true)}</h3>
          <IndexRows rows={items.map((item) => ({ path: item.path, name: item.name, tag: kind === 'anatomy' ? undefined : item.tag, note: item.description }))} />
        </section>
      ))}
    </div>
  )
}
