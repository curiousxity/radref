export type Composition = 'cystic' | 'spongiform' | 'mixed' | 'solid'
export type Echogenicity = 'anechoic' | 'hyperechoic' | 'isoechoic' | 'hypoechoic' | 'veryHypoechoic'
export type Shape = 'widerThanTall' | 'tallerThanWide'
export type Margin = 'smooth' | 'illDefined' | 'lobulated' | 'extrathyroidal'
export type EchogenicFocus = 'macrocalcification' | 'rimCalcification' | 'punctate'
export type Laterality = 'right lobe' | 'left lobe' | 'isthmus' | ''
export type Pole = 'upper pole' | 'mid pole' | 'lower pole' | ''

export type TiradsForm = {
  laterality: Laterality
  pole: Pole
  sizeCm: string
  composition: Composition
  echogenicity: Echogenicity
  shape: Shape
  margin: Margin
  echogenicFoci: EchogenicFocus[]
}

export type TiradsResult = {
  points: number
  category: 'TR1' | 'TR2' | 'TR3' | 'TR4' | 'TR5'
  recommendation: string
  followUp: boolean
  fna: boolean
  description: string
  impression: string
}
