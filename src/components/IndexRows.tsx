import { Link } from 'react-router-dom'

export type IndexRow = { path: string; name: string; tag?: string; note?: string }

/** Hairline index rows: name on the left (with an optional muted line under it), a short mono tag on the right. */
export function IndexRows({ rows }: { rows: IndexRow[] }) {
  return (
    <ul className="index-rows">
      {rows.map((row) => (
        <li key={row.path}>
          <Link to={row.path} className="index-row">
            <span className="index-text">
              <span className="index-name">{row.name}</span>
              {row.note && <span className="index-note">{row.note}</span>}
            </span>
            {row.tag && <span className="index-tag">{row.tag}</span>}
          </Link>
        </li>
      ))}
    </ul>
  )
}
