/**
 * Mayfield stages of progressive perilunate instability (Mayfield et al., J Hand Surg Am
 * 1980). Shared by the Mayfield calculator and the wrist MRI study.
 *
 * The paper itself is paywalled. Stages I and IV and the sequential progression are checked
 * against its abstract, and all four stages against Kennedy and Allan's review, which reproduces
 * Mayfield's table (Clin Orthop Relat Res 2012), and against two open reviews (Dvorsky et al.,
 * J Hand Surg Glob Online 2025; Sharma et al., Indian J Radiol Imaging 2025). The reviews differ
 * on which stage they call the perilunate dislocation (II or III), so, by the author's decision
 * of 2026-10-29, each stage is named by the structures disrupted (claims MF-1 to MF-5 in
 * docs/superpowers/research/2026-10-23-wrist-calculators-sources.md).
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
  // MF-1, Kennedy and Allan: "In the first stage of this classification, the scapholunate
  // articulation is disrupted".
  I: 'scapholunate disruption',
  // MF-2, Kennedy and Allan: "capitolunate joint disruption in addition to the scapholunate
  // injury ... Radiographs may show capitate subluxation or dislocation"; Dvorsky 2025: "the
  // lunate remains aligned with the distal radius, whereas the capitate and remaining carpal
  // bones dislocate dorsally".
  II: 'capitolunate disruption, with dorsal displacement or dislocation of the capitate relative to the lunate',
  // MF-3, Kennedy and Allan: "The lunotriquetral joint is now also disrupted".
  III: 'additional lunotriquetral disruption',
  // MF-4, Kennedy and Allan: "the radiolunate joint is disrupted and the lunate is dislocated
  // volarly from the lunate fossa".
  IV: 'lunate dislocation, volarly from the lunate fossa of the radius',
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
