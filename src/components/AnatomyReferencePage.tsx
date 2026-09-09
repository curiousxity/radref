import { AnatomyViewer } from './AnatomyViewer'

/**
 * The shell every Anatomy reference shares: a header, one framed viewer from
 * `public/anatomy/`, and a short note on what the model is worth turning over
 * for. The pages carry no logic of their own, so they declare their content
 * here rather than each repeating the markup.
 */
export function AnatomyReferencePage({
  name,
  intro,
  sourceNote,
  file,
  viewerTitle,
  hint,
  scrollsInFrame,
  notesHeading = 'Why it is worth turning over',
  notes,
}: {
  /** Structure the reference covers, used as the page heading. */
  name: string
  /** Opening paragraph describing the model. */
  intro: string
  /** Provenance and the limits of the geometry. */
  sourceNote: string
  /** File name under `/anatomy/`. */
  file: string
  /** Accessible name for the frame. */
  viewerTitle: string
  /** How to drive this particular viewer. */
  hint: string
  /**
   * Whether the embedded document scrolls internally, which makes the embed the
   * worse phone experience. Required rather than defaulted: it is a fact about
   * the document, and a new reference that omitted it would silently get the
   * wrong treatment.
   */
  scrollsInFrame: boolean
  /** Heading over the notes list. */
  notesHeading?: string
  /** Why the model repays rotating, one point per item. */
  notes: string[]
}) {
  return (
    <div className="page">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Anatomy</p>
          <h2>{name}</h2>
          <p>{intro}</p>
          <p className="source-note">{sourceNote}</p>
        </div>
      </section>

      <AnatomyViewer file={file} title={viewerTitle} hint={hint} emphasiseFullScreen={scrollsInFrame} />

      <section className="info-card">
        <h3>{notesHeading}</h3>
        <ul className="plain-list">
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
