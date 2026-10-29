/**
 * Mason classification of radial head fractures (Mason, Br J Surg 1954), with Johnston's
 * type IV (Ulster Med J 1962), and the quantitative Broberg-Morrey modification for types I and
 * II (Clin Orthop Relat Res 1987). Shared by the Mason calculator and the elbow MRI study's bones
 * step.
 *
 * Types I to III are checked against Mason's table as Iannuzzi and Leopold reproduce it (Clin
 * Orthop Relat Res 2012) and type IV against Johnston's paper. The 2 mm and 30% thresholds are
 * not in Broberg and Morrey's 1986 paper, which this used to cite; the 1987 paper is paywalled,
 * so they are checked against a review that states them (van der Windt et al., EFORT Open Rev
 * 2024) (claims MA-1 to MA-6 in docs/superpowers/research/2026-10-23-elbow-mri-sources.md).
 * Other versions differ: in the Hotchkiss modification type II is displaced 2 mm or more or
 * blocks forearm rotation, with no size requirement (Swensen et al., J Orthop Traumatol 2019), so
 * the Broberg-Morrey result is always labelled as such.
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
 * The Broberg-Morrey modification (van der Windt et al. 2024, crediting Broberg and Morrey 1987):
 * a partial fracture "must be of sufficient size (at least 30% of the articular surface) and
 * displacement (at least 2 mm) to be considered a displaced fracture (Mason type II, as opposed
 * to nondisplaced Mason type I)". So type II needs both (MA-6); anything less is type I (MA-5),
 * including a fragment displaced 2 mm or more but under 30% of the articular surface (the
 * author's decision, 2026-10-29). Undefined while a measurement that would decide it is missing.
 */
export function brobergMorrey(displacementMm?: number, surfacePercent?: number): 'I' | 'II' | undefined {
  if (displacementMm === undefined) return undefined
  if (displacementMm < 2) return 'I'
  if (surfacePercent === undefined) return undefined
  return surfacePercent >= 30 ? 'II' : 'I'
}

/** One report sentence, e.g. "Radial head fracture, Mason type II: marginal sector fracture with displacement." */
export function masonSentence(result: MasonResult): string {
  if (result.modified) return `Radial head fracture with dislocation of the elbow, Mason type IV (Johnston modification).`
  return `Radial head fracture, Mason type ${result.type}: ${result.description}.`
}

export type MasonMeasurements = {
  displacementMm?: number
  /** Share of the radial head's articular surface the fragment carries, in percent. */
  surfacePercent?: number
  /** Mechanical block to forearm rotation: recorded on its own; it never changes the type. */
  mechanicalBlock?: boolean
}

/**
 * The measured findings, one line each, kept apart from the type: van der Windt et al. 2024
 * separate displacement ("Displacement (>2 mm) ... without a mechanical block to
 * pronation/supination is not a clear indication for surgery") from a mechanical block to
 * rotation ("a clear indication for surgery").
 */
export function masonFindings({ displacementMm, surfacePercent, mechanicalBlock }: MasonMeasurements): string[] {
  return [
    displacementMm !== undefined && `Fragment displacement: ${displacementMm} mm.`,
    surfacePercent !== undefined && `Articular surface involved: ${surfacePercent}%.`,
    mechanicalBlock !== undefined && `Mechanical block to forearm rotation: ${mechanicalBlock ? 'present' : 'absent'}.`,
  ].filter((line): line is string => Boolean(line))
}

/** The Broberg-Morrey line, always named as that modification. */
export function brobergMorreySentence(type: 'I' | 'II'): string {
  return `Broberg-Morrey modification: type ${type}.`
}
