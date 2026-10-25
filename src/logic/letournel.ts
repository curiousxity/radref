/**
 * Letournel (Judet-Letournel) classification of acetabular fractures: five elementary and five
 * associated types (Judet et al., J Bone Joint Surg Am 1964; Letournel, Clin Orthop Relat Res
 * 1980), reached by the CT questions radiology reviews teach (Durkee et al., AJR 2006;
 * Scheinfeld et al., RadioGraphics 2015). Shared by the Letournel calculator and the pelvis CT
 * study.
 *
 * Unchecked draft: the column lines, the transverse and T-shaped questions, the isolated
 * posterior wall and the spur sign are checked against Durkee's full text; the rest of the
 * wording is not yet (claims LT-1 to LT-9 in
 * docs/superpowers/research/2026-10-23-pelvis-calculators-sources.md).
 */

export type LtType = 'PW' | 'PC' | 'AW' | 'AC' | 'T' | 'PCPW' | 'TPW' | 'TS' | 'ACPHT' | 'BC'

export const ltElementary: LtType[] = ['PW', 'PC', 'AW', 'AC', 'T']
export const ltAssociated: LtType[] = ['PCPW', 'TPW', 'TS', 'ACPHT', 'BC']
export const ltTypes: LtType[] = [...ltElementary, ...ltAssociated]

export const ltNames: Record<LtType, string> = {
  PW: 'posterior wall',
  PC: 'posterior column',
  AW: 'anterior wall',
  AC: 'anterior column',
  T: 'transverse',
  PCPW: 'posterior column and posterior wall',
  TPW: 'transverse and posterior wall',
  TS: 'T-shaped',
  ACPHT: 'anterior column or wall with posterior hemitransverse',
  BC: 'both-column',
}

export const ltDescriptions: Record<LtType, string> = {
  // LT-2, Durkee: "the iliopectineal line is not disrupted ... However, disruption of the
  // ilioischial line may or may not be present as an extension of the comminuted posterior wall
  // component." It said "with both columns intact".
  PW: 'a fragment of the posterior rim, with the iliopectineal line intact; the ilioischial line may be broken by the wall fragment',
  PC: 'the ischium separated from the ilium through the greater sciatic notch, breaking the ilioischial line and the obturator ring', // LT-2
  AW: 'a fragment of the anterior rim, breaking the middle of the iliopectineal line', // LT-2
  AC: 'the anterior column separated, from the iliac crest or the anterior border down through the pubic ramus, breaking the iliopectineal line', // LT-2
  T: 'one fracture line through both columns, separating an upper iliac part from a lower ischiopubic part, obturator ring intact', // LT-2
  PCPW: 'a posterior column fracture with a separate posterior wall fragment', // LT-3
  TPW: 'a transverse fracture with a posterior wall fragment', // LT-3
  TS: 'a transverse fracture with a vertical stem splitting the ischiopubic part and breaking the obturator ring', // LT-3
  ACPHT: 'an anterior column or wall fracture with a transverse line through the posterior column only', // LT-3
  BC: 'both columns separated from each other and from the ilium, so no joint surface stays attached to the intact ilium (spur sign)', // LT-3, LT-5
}

export function ltIsAssociated(type: LtType): boolean {
  return ltAssociated.includes(type)
}

/** Which of the two radiographic column lines are broken (LT-4). */
export type LtLines = 'neither' | 'anterior' | 'posterior' | 'both'

export type LtInput = {
  lines?: LtLines
  posteriorWall?: boolean
  /**
   * With the ilioischial line only and a posterior wall fragment: is the posterior column itself
   * separated, or is the line broken only by the wall fragment (Durkee's isolated posterior wall)?
   */
  posteriorColumn?: boolean
  /** With the iliopectineal line only: the anterior wall alone, or the whole anterior column. */
  anteriorPart?: 'wall' | 'column'
  /** With both lines broken: the obturator ring broken. */
  obturatorBroken?: boolean
  /** With both lines and the obturator ring broken: some joint surface still on the intact ilium. */
  articularOnIlium?: boolean
  /** Then: a vertical stem through the ischiopubic part (T-shaped), or an anterior column with a posterior hemitransverse. */
  pattern?: 'stem' | 'hemitransverse'
}

/**
 * The type from the CT questions (LT-4 to LT-7). Undefined when the answers are not enough to
 * name a type, or name a combination Letournel did not, such as an anterior column fracture
 * with a posterior wall fragment.
 */
export function letournel(input: LtInput): LtType | undefined {
  const wall = input.posteriorWall ?? false
  switch (input.lines ?? 'neither') {
    case 'neither':
      return wall ? 'PW' : undefined
    case 'posterior':
      if (!wall) return 'PC'
      if (input.posteriorColumn === undefined) return undefined
      return input.posteriorColumn ? 'PCPW' : 'PW'
    case 'anterior':
      if (wall || !input.anteriorPart) return undefined
      return input.anteriorPart === 'wall' ? 'AW' : 'AC'
    case 'both':
      if (input.obturatorBroken === undefined) return undefined
      if (!input.obturatorBroken) return wall ? 'TPW' : 'T'
      if (input.articularOnIlium === undefined) return undefined
      if (!input.articularOnIlium) return 'BC'
      if (!input.pattern) return undefined
      return input.pattern === 'stem' ? 'TS' : 'ACPHT'
  }
}

/** LT-8: a posterior wall fragment beside a both-column, T-shaped or hemitransverse fracture is written as an addition. */
export function ltExtraWall(type: LtType, posteriorWall: boolean): boolean {
  return posteriorWall && ['TS', 'ACPHT', 'BC'].includes(type)
}

export function ltSentence(type: LtType, posteriorWall = false, side?: string): string {
  const where = side ? `${side} acetabular fracture` : 'Acetabular fracture'
  const kind = ltIsAssociated(type) ? 'associated' : 'elementary'
  return `${where}, Letournel ${ltNames[type]} (${kind}): ${ltDescriptions[type]}${ltExtraWall(type, posteriorWall) ? ', with a posterior wall fragment as well' : ''}.`
}
