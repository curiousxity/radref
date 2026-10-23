/**
 * Mayfield stages of progressive perilunate instability (Mayfield et al., J Hand Surg Am
 * 1980). Shared by the Mayfield calculator and the wrist MRI study.
 *
 * Unchecked draft: the stage wording has not yet been checked against the paper (claims
 * MF-1 to MF-5 in docs/superpowers/research/2026-10-23-wrist-calculators-sources.md).
 */

/** Which structures around the lunate are disrupted. */
export type MayfieldInput = {
  scapholunate?: boolean
  capitolunate?: boolean
  lunotriquetral?: boolean
  lunateDislocated?: boolean
}

export type MayfieldStage = 'I' | 'II' | 'III' | 'IV'

export type MayfieldResult = { stage: MayfieldStage; description: string }

export const mayfieldStages: MayfieldStage[] = ['I', 'II', 'III', 'IV']

export const mayfieldDescriptions: Record<MayfieldStage, string> = {
  I: 'scapholunate disruption (scapholunate dissociation)', // MF-1
  II: 'scapholunate and capitolunate disruption, with the capitate dislocated from the lunate (perilunate dislocation)', // MF-2
  III: 'disruption around the lunate extending through the lunotriquetral joint (lunotriquetral dissociation)', // MF-3
  IV: 'dislocation of the lunate from the radius (lunate dislocation)', // MF-4
}

const structureOf: Record<MayfieldStage, keyof MayfieldInput> = {
  I: 'scapholunate',
  II: 'capitolunate',
  III: 'lunotriquetral',
  IV: 'lunateDislocated',
}

/** The highest stage whose structure is disrupted, or undefined when none is. */
export function mayfield(input: MayfieldInput): MayfieldResult | undefined {
  const stage = [...mayfieldStages].reverse().find((s) => input[structureOf[s]] === true)
  return stage && { stage, description: mayfieldDescriptions[stage] }
}

/**
 * MF-5: the stages are progressive, each including the injuries of the stages before it.
 * The earlier stages whose structure is not marked disrupted, for a "check" note.
 */
export function mayfieldGaps(input: MayfieldInput): MayfieldStage[] {
  const result = mayfield(input)
  if (!result) return []
  return mayfieldStages.slice(0, mayfieldStages.indexOf(result.stage)).filter((s) => input[structureOf[s]] !== true)
}

export function mayfieldSentence(result: MayfieldResult): string {
  return `Perilunate injury, Mayfield stage ${result.stage}: ${result.description}.`
}
