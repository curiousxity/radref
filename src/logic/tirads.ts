import type {
  Composition,
  Echogenicity,
  EchogenicFocus,
  Margin,
  Shape,
  TiradsForm,
  TiradsResult,
} from '../types/tirads'

const compositionPoints: Record<Composition, number> = {
  cystic: 0,
  spongiform: 0,
  mixed: 1,
  solid: 2,
}

const echogenicityPoints: Record<Echogenicity, number> = {
  anechoic: 0,
  hyperechoic: 1,
  isoechoic: 1,
  hypoechoic: 2,
  veryHypoechoic: 3,
}

const shapePoints: Record<Shape, number> = {
  widerThanTall: 0,
  tallerThanWide: 3,
}

const marginPoints: Record<Margin, number> = {
  smooth: 0,
  illDefined: 0,
  lobulated: 2,
  extrathyroidal: 3,
}

const focusPoints: Record<EchogenicFocus, number> = {
  macrocalcification: 1,
  rimCalcification: 2,
  punctate: 3,
}

const compositionLabels: Record<Composition, string> = {
  cystic: 'cystic or almost completely cystic',
  spongiform: 'spongiform',
  mixed: 'mixed cystic and solid',
  solid: 'solid or almost completely solid',
}

const echogenicityLabels: Record<Echogenicity, string> = {
  anechoic: 'anechoic',
  hyperechoic: 'hyperechoic',
  isoechoic: 'isoechoic',
  hypoechoic: 'hypoechoic',
  veryHypoechoic: 'very hypoechoic',
}

const shapeLabels: Record<Shape, string> = {
  widerThanTall: 'wider-than-tall',
  tallerThanWide: 'taller-than-wide',
}

const marginLabels: Record<Margin, string> = {
  smooth: 'smooth margins',
  illDefined: 'ill-defined margins',
  lobulated: 'lobulated or irregular margins',
  extrathyroidal: 'extrathyroidal extension',
}

const focusLabels: Record<EchogenicFocus, string> = {
  macrocalcification: 'macrocalcifications',
  rimCalcification: 'peripheral rim calcifications',
  punctate: 'punctate echogenic foci',
}

function parseSize(sizeCm: string) {
  const value = Number(sizeCm)
  return Number.isFinite(value) ? value : 0
}

function getCategory(points: number): TiradsResult['category'] {
  if (points <= 1) return 'TR1'
  if (points === 2) return 'TR2'
  if (points === 3) return 'TR3'
  if (points <= 6) return 'TR4'
  return 'TR5'
}

function getRecommendation(category: TiradsResult['category'], sizeCm: number) {
  if (sizeCm > 0 && sizeCm < 0.5) {
    return { recommendation: 'No FNA or follow-up is recommended for nodules smaller than 5 mm, even if highly suspicious.', followUp: false, fna: false }
  }
  if (category === 'TR1' || category === 'TR2') {
    return { recommendation: 'No FNA or follow-up recommended.', followUp: false, fna: false }
  }
  // TR3 and above are size-banded, so withhold a recommendation until a size is entered
  // rather than reporting the below-threshold branch by default.
  if (sizeCm <= 0) {
    return { recommendation: 'Enter the maximum size to apply the FNA and follow-up thresholds.', followUp: false, fna: false }
  }
  if (category === 'TR3') {
    if (sizeCm >= 2.5) return { recommendation: 'FNA is recommended. Ultrasound follow-up may also be considered.', followUp: true, fna: true }
    if (sizeCm >= 1.5) return { recommendation: 'Follow-up ultrasound is recommended at 1, 3, and 5 years. FNA threshold is 2.5 cm.', followUp: true, fna: false }
    return { recommendation: 'No FNA or follow-up recommended at the current size.', followUp: false, fna: false }
  }
  if (category === 'TR4') {
    if (sizeCm >= 1.5) return { recommendation: 'FNA is recommended. If observed instead, follow-up ultrasound is typically at 1, 2, 3, and 5 years.', followUp: true, fna: true }
    if (sizeCm >= 1.0) return { recommendation: 'Follow-up ultrasound is recommended at 1, 2, 3, and 5 years. FNA threshold is 1.5 cm.', followUp: true, fna: false }
    return { recommendation: 'No FNA or follow-up recommended at the current size.', followUp: false, fna: false }
  }
  if (sizeCm >= 1.0) return { recommendation: 'FNA is recommended. If observed, annual follow-up for up to 5 years is generally advised.', followUp: true, fna: true }
  if (sizeCm >= 0.5) return { recommendation: 'Follow-up ultrasound is recommended annually for up to 5 years. FNA threshold is 1.0 cm.', followUp: true, fna: false }
  return { recommendation: 'No FNA or follow-up recommended at the current size.', followUp: false, fna: false }
}

export function calculateTirads(form: TiradsForm): TiradsResult {
  const sizeCm = parseSize(form.sizeCm)
  const points =
    compositionPoints[form.composition] +
    echogenicityPoints[form.echogenicity] +
    shapePoints[form.shape] +
    marginPoints[form.margin] +
    form.echogenicFoci.reduce((sum, focus) => sum + focusPoints[focus], 0)

  const category = getCategory(points)
  const location = [form.laterality, form.pole].filter(Boolean).join(' ')
  const focusText = form.echogenicFoci.length ? form.echogenicFoci.map((item) => focusLabels[item]).join(', ') : 'no suspicious echogenic foci'
  const sizeMissing = sizeCm <= 0
  const sizeText = sizeMissing ? 'of unstated size' : `measuring ${sizeCm.toFixed(1)} cm`
  const description = `${location ? `${location} ` : ''}thyroid nodule ${sizeText}, ${compositionLabels[form.composition]}, ${echogenicityLabels[form.echogenicity]}, ${shapeLabels[form.shape]}, with ${marginLabels[form.margin]} and ${focusText}.`
  const management = getRecommendation(category, sizeCm)
  // The management sentence is a prompt to the user until a size is entered, so it is
  // kept out of the report text and shown only in the result summary.
  const impression = `${location ? `${location} ` : ''}thyroid nodule is classified as ACR TI-RADS ${category} (${points} points).${sizeMissing ? '' : ` ${management.recommendation}`}`

  return { category, points, recommendation: management.recommendation, sizeMissing, description, impression, followUp: management.followUp, fna: management.fna }
}
