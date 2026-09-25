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

/**
 * The shell every lesson shares: a header, the lesson body as info cards, the
 * numbered reference list, and the standing caveat that these are teaching
 * notes rather than a guideline.
 */
export function LessonPage({
  name,
  lede,
  sourceNote,
  references,
  referencesNote,
  children,
}: {
  /** Lesson title, used as the page heading. */
  name: string
  /** One-sentence summary of what the lesson teaches. */
  lede: string
  /** Which guideline versions the lesson reflects. */
  sourceNote: string
  references: LessonReference[]
  /** Caveat about the references themselves, shown under the list. */
  referencesNote?: string
  /** The lesson body, as `info-card lesson-body` sections. */
  children: ReactNode
}) {
  return (
    <div className="page lesson-page">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Lesson</p>
          <h2>{name}</h2>
          <p>{lede}</p>
          <p className="source-note">{sourceNote}</p>
        </div>
      </section>

      {children}

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
        {referencesNote && <p className="source-note">{referencesNote}</p>}
      </section>

      <p className="source-note lesson-caveat">
        Personal teaching notes compiled from the cited literature. Check the current guideline before applying to a patient.
      </p>
    </div>
  )
}
