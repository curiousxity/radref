/**
 * Neer classification of proximal humerus fractures (Neer, J Bone Joint Surg Am 1970).
 * UNCHECKED: written while PubMed could not be reached; the claims are listed in
 * docs/superpowers/research/2026-10-23-shoulder-mri-sources.md (N1-N6) for checking.
 *
 * The proximal humerus has four segments: the articular segment (separated at the anatomical
 * neck), the greater tuberosity, the lesser tuberosity and the shaft (separated at the surgical
 * neck). A segment counts as a "part" only when it is displaced more than 1 cm or angulated more
 * than 45 degrees (N2); however many fracture lines there are, a fracture with no displaced
 * segment is one-part (N3).
 */

/** The four fracture lines, one per segment. */
export type NeerLine = 'anatomicalNeck' | 'surgicalNeck' | 'greaterTuberosity' | 'lesserTuberosity'

/** No fracture line, a line with the segment in place, or a displaced segment. */
export type LineStatus = 'none' | 'undisplaced' | 'displaced'

export type NeerInput = {
  lines: Record<NeerLine, LineStatus>
  dislocation: 'none' | 'anterior' | 'posterior'
  /** Articular surface fractures (N5). */
  articular: 'none' | 'head-split' | 'impression'
}

export type NeerResult = {
  /** 1 to 4, the segments counted as parts. */
  parts: number
  /** e.g. "Three-part (surgical neck and greater tuberosity)". */
  label: string
  description: string
  /** Report sentence, ready to paste. */
  report: string
  /** True when the displaced lines are not one of Neer's named patterns. */
  unusual: boolean
}

export const NEER_LINES: NeerLine[] = ['anatomicalNeck', 'surgicalNeck', 'greaterTuberosity', 'lesserTuberosity']

export const lineNames: Record<NeerLine, string> = {
  anatomicalNeck: 'anatomical neck',
  surgicalNeck: 'surgical neck',
  greaterTuberosity: 'greater tuberosity',
  lesserTuberosity: 'lesser tuberosity',
}

export const emptyNeerInput: NeerInput = {
  lines: { anatomicalNeck: 'none', surgicalNeck: 'none', greaterTuberosity: 'none', lesserTuberosity: 'none' },
  dislocation: 'none',
  articular: 'none',
}

/** N2: displaced means more than 1 cm or more than 45 degrees; exactly 1 cm or 45 degrees is not. */
export function isDisplaced(displacementCm: number | undefined, angulationDeg: number | undefined): boolean {
  return (displacementCm ?? 0) > 1 || (angulationDeg ?? 0) > 45
}

const partWords = ['', 'One-part', 'Two-part', 'Three-part', 'Four-part']

function list(items: string[]): string {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

/** Neer's named patterns, by the set of displaced lines (N4). */
function named(displaced: NeerLine[]): string | undefined {
  const has = (line: NeerLine) => displaced.includes(line)
  if (displaced.length === 1) return `${lineNames[displaced[0]]} displaced`
  if (displaced.length === 2 && has('surgicalNeck') && (has('greaterTuberosity') || has('lesserTuberosity'))) {
    return `surgical neck and ${has('greaterTuberosity') ? 'greater' : 'lesser'} tuberosity displaced`
  }
  if (displaced.length === 3 && has('greaterTuberosity') && has('lesserTuberosity') && (has('surgicalNeck') || has('anatomicalNeck'))) {
    return 'articular segment and both tuberosities displaced'
  }
  return undefined
}

const descriptions: Record<number, string> = {
  1: 'No segment is displaced more than 1 cm or angulated more than 45°, however many fracture lines there are.',
  2: 'One segment is displaced in relation to the other three.',
  3: 'Two segments are displaced: the shaft and one tuberosity, leaving the articular segment with the other tuberosity.',
  4: 'Three segments are displaced: the articular segment and both tuberosities are separated from each other and from the shaft.',
}

export function classifyNeer(input: NeerInput): NeerResult {
  const fractured = NEER_LINES.filter((line) => input.lines[line] !== 'none')
  const displaced = NEER_LINES.filter((line) => input.lines[line] === 'displaced')
  // Displacing every line still leaves four segments at most.
  const parts = Math.min(4, displaced.length + 1)
  const pattern = displaced.length === 0 ? undefined : named(displaced)
  const unusual = displaced.length > 0 && pattern === undefined

  const dislocation = input.dislocation === 'none' ? '' : `${input.dislocation} fracture-dislocation`
  const articular = input.articular === 'head-split' ? 'head-splitting fracture' : input.articular === 'impression' ? 'impression fracture of the articular surface' : ''
  const extras = [dislocation, articular].filter(Boolean)

  if (fractured.length === 0 && extras.length === 0) {
    return { parts: 0, label: 'No fracture entered', description: 'Mark the fracture lines present.', report: '', unusual: false }
  }

  const head = parts === 1 ? 'One-part' : `${partWords[parts]}${pattern ? ` (${pattern})` : ` (${list(displaced.map((line) => lineNames[line]))} displaced)`}`
  const label = [head, ...extras].join(', ')
  const description = [
    descriptions[parts],
    unusual ? 'This combination of displaced segments is not one of Neer\'s named patterns; check the images.' : '',
  ].filter(Boolean).join(' ')
  const lines = fractured.length > 0 ? ` Fracture lines: ${list(fractured.map((line) => `${lineNames[line]}${input.lines[line] === 'displaced' ? ' (displaced)' : ''}`))}.` : ''
  const report = `Proximal humerus fracture, Neer ${partWords[parts].toLowerCase()}${extras.length > 0 ? ` ${extras.join(' with ')}` : ''}.${lines}`
  return { parts, label, description, report, unusual }
}
