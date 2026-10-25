import { describe, expect, it } from 'vitest'
import { classifyAdrenal, initialAdrenalForm } from './incidentalAdrenal'
import type { AdrenalForm } from './incidentalAdrenal'

/*
 * Mayo-Smith 2017, Fig. 1. The tool used to treat a blank density as 0 HU (so any mass without a
 * density was an adenoma), applied the 10 HU rule only to masses of 4 cm or less without a cancer
 * history (the paper: "almost always diagnostic of a lipid-rich adenoma, regardless of size"), used
 * "larger than 4 cm" where the flowchart says "≥4 cm", and gave no follow-up interval. The author's
 * decision (2026-10-25): follow-up intervals go in the calculators, so the tool now follows Fig. 1.
 */
const at = (over: Partial<AdrenalForm>) => classifyAdrenal({ ...initialAdrenalForm, ...over })

describe('ACR 2017 incidental adrenal mass', () => {
  it('waits for a size, and leaves a mass under 1 cm alone', () => {
    expect(at({}).category).toBe('Awaiting size')
    expect(at({ sizeCm: '0.9' }).recommendation).toContain('No further evaluation')
  })

  it('does not call a mass with no density an adenoma', () => {
    expect(at({ sizeCm: '1.5' }).category).toBe('Probably benign')
  })

  it.each([
    ['10 HU, 5 cm', { sizeCm: '5', densityHu: '10' }, 'Benign adenoma'],
    ['10 HU with a cancer history', { sizeCm: '3', densityHu: '10', cancerHistory: true }, 'Benign adenoma'],
    ['11 HU, 4 cm', { sizeCm: '4', densityHu: '11' }, '4 cm or more'],
    ['4 cm, cancer history', { sizeCm: '4', cancerHistory: true }, '4 cm or more, cancer history'],
    ['stable 1 year', { sizeCm: '3', prior: 'stable' as const }, 'Benign (stable)'],
  ])('%s: %s', (_label, over, expected) => {
    expect(at(over).category).toBe(expected)
  })

  // "1-2 cm, Probably benign: Consider 12 month F/U adrenal CT"; ">2cm, <4cm: Adrenal CT".
  it('gives the flowchart follow-up with no prior imaging and no cancer history', () => {
    expect(at({ sizeCm: '2' }).recommendation).toContain('follow-up adrenal CT in 12 months')
    expect(at({ sizeCm: '2.1' }).recommendation).toContain('6- to 12-month follow-up CT')
  })

  // "New or enlarging: No Cancer Hx: Consider F/U adrenal CT or resection; + Cancer Hx: Consider Bx or PET-CT."
  it('handles a new or enlarging mass by cancer history', () => {
    expect(at({ sizeCm: '3', prior: 'growing' }).recommendation).toContain('Consider follow-up adrenal CT or resection')
    expect(at({ sizeCm: '3', prior: 'growing', cancerHistory: true }).recommendation).toContain('Consider biopsy or PET/CT')
  })
})
