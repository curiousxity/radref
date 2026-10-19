import { describe, expect, it } from 'vitest'
import { tiradsPoints } from '../logic/tirads'
import { pointsDetail, withPoints } from './tiradsOptions'

// Spongiform: "Do not add further points for other categories" (Tessler et al., JACR 2017,
// Fig. 1). calculateTirads scores a spongiform nodule 0, so the page must not show the other
// features' points while spongiform is selected.
describe('TI-RADS option points display', () => {
  it('shows +N from the points table', () => {
    expect(pointsDetail(3, false)).toBe('+3')
    expect(pointsDetail(0, false)).toBe('+0')
  })

  it('shows nothing when the points are suppressed (spongiform)', () => {
    expect(pointsDetail(3, true)).toBeUndefined()
  })

  it('keeps each value and label and adds the detail only when not suppressed', () => {
    const options = [{ value: 'veryHypoechoic' as const, label: 'Very hypoechoic' }]
    expect(withPoints(tiradsPoints.echogenicity, options, false)).toEqual([{ value: 'veryHypoechoic', label: 'Very hypoechoic', detail: '+3' }])
    expect(withPoints(tiradsPoints.echogenicity, options, true)).toEqual([{ value: 'veryHypoechoic', label: 'Very hypoechoic', detail: undefined }])
  })
})
