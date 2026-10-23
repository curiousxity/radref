/**
 * Sanders classification of intra-articular calcaneal fractures (Sanders et al., Clin Orthop
 * Relat Res 1993), read on the coronal CT image where the posterior facet is widest. Shared
 * by the Sanders calculator and the foot MRI study.
 *
 * Unchecked draft: the type wording has not yet been checked against the paper (claims SA-1
 * to SA-6 in docs/superpowers/research/2026-10-23-foot-calculators-sources.md).
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
  /** Any articular fragment displaced 2 mm or more (SA-3). */
  displaced?: boolean
  lines?: SandersLine[]
  /** More than four articular parts. */
  comminuted?: boolean
}

export type SandersType = 'I' | 'IIA' | 'IIB' | 'IIC' | 'IIIAB' | 'IIIAC' | 'IIIBC' | 'IV'

export const sandersTypes: SandersType[] = ['I', 'IIA', 'IIB', 'IIC', 'IIIAB', 'IIIAC', 'IIIBC', 'IV']

const groupDescriptions: Record<'I' | 'II' | 'III' | 'IV', string> = {
  I: 'undisplaced articular fracture, whatever the number of fracture lines', // SA-3
  II: 'two-part fracture of the posterior facet', // SA-4
  III: 'three-part fracture of the posterior facet, with a centrally depressed fragment', // SA-4
  IV: 'four-part or more comminuted fracture of the posterior facet', // SA-4
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
