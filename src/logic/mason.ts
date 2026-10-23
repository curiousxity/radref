/**
 * Mason classification of radial head fractures (Mason, Br J Surg 1954), with Johnston's
 * type IV (Ulster Med J 1962), and the quantitative Broberg-Morrey thresholds for types I and II
 * (J Bone Joint Surg Am 1986). Shared by the Mason calculator and the elbow MRI study's bones
 * step.
 *
 * Unchecked draft: the wording has not yet been checked against the papers (claims MA-1 to
 * MA-6 in docs/superpowers/research/2026-10-23-elbow-mri-sources.md).
 */

/** How the radial head is broken, worded as Mason's three original types. */
export type MasonPattern = 'undisplaced' | 'displaced' | 'comminuted'

export type MasonInput = {
  pattern?: MasonPattern
  /** Was the elbow dislocated with this fracture? */
  dislocation?: boolean
}

export type MasonType = 'I' | 'II' | 'III' | 'IV'

export type MasonResult = {
  type: MasonType
  /** The type's description, worded to start mid-sentence. */
  description: string
  /** True for type IV, which is Johnston's addition rather than Mason's own. */
  modified: boolean
}

export const masonDescriptions: Record<MasonType, string> = {
  I: 'fissure or marginal fracture without displacement',
  II: 'marginal sector fracture with displacement',
  III: 'comminuted fracture involving the whole head',
  IV: 'radial head fracture with dislocation of the elbow',
}

const patternTypes: Record<MasonPattern, MasonType> = {
  undisplaced: 'I', // MA-1
  displaced: 'II', // MA-2
  comminuted: 'III', // MA-3
}

/** The Mason type, or undefined while the answers so far do not decide it. */
export function mason({ pattern, dislocation }: MasonInput): MasonResult | undefined {
  // MA-4: a dislocation makes it Johnston's type IV whatever the fracture pattern.
  if (dislocation === true) return { type: 'IV', description: masonDescriptions.IV, modified: true }
  if (dislocation === undefined || pattern === undefined) return undefined
  const type = patternTypes[pattern]
  return { type, description: masonDescriptions[type], modified: false }
}

/**
 * Broberg-Morrey's thresholds: type I is displaced less than 2 mm (MA-5); type II is displaced
 * 2 mm or more and involves 30% or more of the head (MA-6). A fragment displaced 2 mm or more
 * but involving less than 30% of the head is not covered by those thresholds, so it returns
 * undefined, as does a missing measurement that would decide it.
 */
export function brobergMorrey(displacementMm?: number, headPercent?: number): 'I' | 'II' | undefined {
  if (displacementMm === undefined) return undefined
  if (displacementMm < 2) return 'I'
  if (headPercent === undefined || headPercent < 30) return undefined
  return 'II'
}

/** One report sentence, e.g. "Radial head fracture, Mason type II: marginal sector fracture with displacement." */
export function masonSentence(result: MasonResult): string {
  if (result.modified) return `Radial head fracture with dislocation of the elbow, Mason type IV (Johnston modification).`
  return `Radial head fracture, Mason type ${result.type}: ${result.description}.`
}
