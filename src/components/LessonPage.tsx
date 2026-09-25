import type { ReactNode } from 'react'

export type LessonReference = {
  /** Citation as it should read in the list, without the DOI. */
  citation: string
  /** Omitted when the source has no DOI; the citation then stands alone. */
  doi?: string
}

/** An inline citation that opens the paper at doi.org. */
export function Cite({ doi, children }: { doi: string; children: ReactNode }) {
  return (
    <a href={`https://doi.org/${doi}`} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

/** The numbered reference list closing every lesson. */
export function LessonReferences({ references, note }: { references: LessonReference[]; note?: string }) {
  return (
    <section className="info-card">
      <h3>References</h3>
      <ol className="plain-list">
        {references.map((ref) => (
          <li key={ref.doi ?? ref.citation}>
            {ref.citation}
            {ref.doi && (
              <>
                {' '}
                <Cite doi={ref.doi}>doi:{ref.doi}</Cite>
              </>
            )}
          </li>
        ))}
      </ol>
      {note && <p className="source-note">{note}</p>}
    </section>
  )
}

/** The standing caveat that these are teaching notes rather than a guideline. */
export function LessonCaveat() {
  return (
    <p className="source-note lesson-caveat">
      Personal teaching notes compiled from the cited literature. Check the current guideline before applying to a patient.
    </p>
  )
}
