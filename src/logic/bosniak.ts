/** Bosniak 2019 classification of cystic renal masses (Silverman et al., Radiology 2019). */
export type BosniakForm = {
  cysticRenalMass: boolean
  enhancingPresent: boolean
  wallThickness: 'none' | 'thin' | 'minimallyThick' | 'thick'
  wallIrregularity: boolean
  septaCount: 'none' | 'few' | 'many'
  septaThickness: 'thin' | 'minimallyThick' | 'thick'
  calcificationOnly: boolean
  enhancingNodule: 'none' | 'irregularity' | 'nodule'
  t1HyperintenseUnenhanced: boolean
}

export const initialBosniakForm: BosniakForm = {
  cysticRenalMass: true,
  enhancingPresent: false,
  wallThickness: 'thin',
  wallIrregularity: false,
  septaCount: 'none',
  septaThickness: 'thin',
  calcificationOnly: false,
  enhancingNodule: 'none',
  t1HyperintenseUnenhanced: false,
}

export type BosniakResult = {
  category: string
  reason: string
  management: string
  impression: string
}

export function classify(form: BosniakForm): BosniakResult {
  if (!form.cysticRenalMass) {
    return {
      category: 'Not applicable',
      reason: 'Bosniak 2019 is intended for cystic renal masses with less than about 25% enhancing tissue.',
      management: 'Use a different renal mass pathway for predominantly solid or non-cystic lesions.',
      impression: 'Renal lesion is not suitable for Bosniak 2019 classification because it is not a cystic renal mass.',
    }
  }

  if (form.enhancingNodule === 'nodule') {
    return {
      category: 'Bosniak IV',
      reason: 'Enhancing nodules are Bosniak IV.',
      management: 'Urologic referral and definitive management should be considered.',
      impression: 'Cystic renal mass contains an enhancing nodule, compatible with Bosniak IV.',
    }
  }

  if (form.enhancingPresent && (form.wallThickness === 'thick' || form.septaThickness === 'thick' || form.wallIrregularity || form.enhancingNodule === 'irregularity')) {
    return {
      category: 'Bosniak III',
      reason: 'Enhancing thick wall/septa or enhancing irregularity corresponds to Bosniak III.',
      management: 'Urologic consultation and individualized management should be considered.',
      impression: 'Cystic renal mass demonstrates enhancing thickened and/or irregular wall or septa, compatible with Bosniak III.',
    }
  }

  if (
    (form.enhancingPresent && form.wallThickness === 'minimallyThick') ||
    (form.enhancingPresent && form.septaThickness === 'minimallyThick') ||
    (form.enhancingPresent && form.septaCount === 'many') ||
    // An MRI IIF feature in its own right, whether or not a thin wall enhances.
    form.t1HyperintenseUnenhanced
  ) {
    return {
      category: 'Bosniak IIF',
      reason: 'Smooth minimal thickening, many thin enhancing septa, or heterogeneously hyperintense appearance on unenhanced fat-saturated T1 can qualify as IIF.',
      management: 'Follow-up imaging is generally recommended at 6 months, 12 months, then annually for 5 years.',
      impression: 'Cystic renal mass is compatible with Bosniak IIF. Imaging follow-up is recommended.',
    }
  }

  // v2019 class I allows a thin smooth wall "that may enhance", or no visible wall.
  const thinOrNoWall = form.wallThickness === 'thin' || form.wallThickness === 'none'

  if (
    (form.septaCount === 'few' && (form.enhancingPresent || form.calcificationOnly)) ||
    (form.septaCount === 'none' && form.calcificationOnly) ||
    // T1-hyperintense cysts have already returned IIF above.
    !form.enhancingPresent ||
    (form.septaCount === 'none' && thinOrNoWall && !form.wallIrregularity)
  ) {
    if (form.septaCount === 'none' && !form.calcificationOnly && thinOrNoWall) {
      return {
        category: 'Bosniak I',
        reason: 'Simple cyst with no wall or a thin smooth wall, and no septa or suspicious features.',
        management: 'No routine follow-up is required.',
        impression: 'Simple cystic renal lesion compatible with Bosniak I.',
      }
    }

    return {
      category: 'Bosniak II',
      reason: 'Few thin septa, calcification, or other reliably benign features are compatible with Bosniak II.',
      management: 'No routine follow-up is required.',
      impression: 'Cystic renal mass is compatible with Bosniak II.',
    }
  }

  return {
    category: 'Indeterminate',
    reason: 'Inputs do not map cleanly to a single Bosniak 2019 branch.',
    management: 'Review enhancement, septal morphology, and wall irregularity against the official Bosniak 2019 criteria.',
    impression: 'Indeterminate cystic renal mass; correlate with official Bosniak 2019 criteria.',
  }
}
