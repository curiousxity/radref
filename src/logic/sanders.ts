/**
 * Sanders classification of intra-articular calcaneal fractures (Sanders et al., Clin Orthop
 * Relat Res 1993), read on the coronal CT image where the posterior facet is widest. Shared
 * by the Sanders calculator and the foot MRI study.
 *
 * The paper is matched on PubMed (PMID 8472475) but paywalled. Its abstract states the four
 * types (SA-4, worded as there); the widest-facet image, the A-B-C lines, the subtype letters
 * and the 2 mm are checked against Jiménez-Almonte et al.'s review (Clin Orthop Relat Res 2019),
 * which says the 1993 paper itself gave no displacement figure (claims SA-1 to SA-6 in
 * docs/superpowers/research/2026-10-23-foot-calculators-sources.md).
 */

/** Fracture lines through the posterior facet, lateral (A) to medial (C). */
export type SandersLine = 'A' | 'B' | 'C'

export const sandersLines: SandersLine[] = ['A', 'B', 'C']

export const sandersLineDescriptions: Record<SandersLine, string> = {
  A: 'lateral', // SA-2
  B: 'central', // SA-2
  C: 'medial, next to the sustentaculum', // SA-2
}

export type SandersInput = {
  /**
   * Any articular fragment displaced more than 2 mm (SA-3). Jiménez-Almonte: "Type I fractures
   * include all minimally displaced (≤ 2 mm) articular fractures".
   */
  displaced?: boolean
  lines?: SandersLine[]
  /** Four or more articular fragments (SA-4: "three or more primary fracture lines, resulting in four or more articular fragments"). */
  comminuted?: boolean
}

export type SandersType = 'I' | 'IIA' | 'IIB' | 'IIC' | 'IIIAB' | 'IIIAC' | 'IIIBC' | 'IV'

export const sandersTypes: SandersType[] = ['I', 'IIA', 'IIB', 'IIC', 'IIIAB', 'IIIAC', 'IIIBC', 'IV']

const groupDescriptions: Record<'I' | 'II' | 'III' | 'IV', string> = {
  I: 'minimally displaced (2 mm or less) articular fracture, whatever the number of fracture lines', // SA-3
  // SA-4, the abstract's wording: "Type II were two-part or split fractures; Type III were
  // three-part or split depression fractures; and Type IV were four-part or highly comminuted
  // articular fractures."
  II: 'two-part or split fracture of the posterior facet',
  III: 'three-part or split depression fracture of the posterior facet',
  IV: 'four-part or highly comminuted fracture of the posterior facet',
}

export function sandersGroup(type: SandersType): 'I' | 'II' | 'III' | 'IV' {
  return type === 'I' || type === 'IV' ? type : type.startsWith('III') ? 'III' : 'II'
}

export function sandersDescription(type: SandersType): string {
  const group = sandersGroup(type)
  const letters = type.slice(group.length).split('') as SandersLine[]
  const where = letters.length > 0 ? ` (line${letters.length === 1 ? '' : 's'} ${letters.join(' and ')})` : ''
  return `${groupDescriptions[group]}${where}`
}

/**
 * Undisplaced is type I. Displaced takes its type from the number of lines (SA-4) and its
 * subtype from which lines they are (SA-5); comminution or all three lines is type IV.
 * Undefined until a line or comminution is marked.
 */
export function sanders(input: SandersInput): SandersType | undefined {
  const lines = sandersLines.filter((line) => input.lines?.includes(line))
  if (lines.length === 0 && input.comminuted !== true) return undefined
  if (input.displaced !== true) return 'I'
  if (input.comminuted === true || lines.length === 3) return 'IV'
  return `${lines.length === 1 ? 'II' : 'III'}${lines.join('')}` as SandersType
}

export function sandersSentence(type: SandersType): string {
  return `Intra-articular calcaneal fracture, Sanders type ${type}: ${sandersDescription(type)}.`
}
