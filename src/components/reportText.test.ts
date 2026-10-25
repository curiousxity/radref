import { readdirSync, readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'
import { formatReportText } from './reportText'

describe('formatReportText', () => {
  test('capitalises each line and ends it with a full stop', () => {
    expect(formatReportText('right thyroid nodule, TR4')).toBe('Right thyroid nodule, TR4.')
    expect(formatReportText('first line\nsecond line.')).toBe('First line.\nSecond line.')
  })

  test('keeps closing punctuation, headings and blank lines', () => {
    expect(formatReportText('Is it stable?')).toBe('Is it stable?')
    expect(formatReportText('FINDINGS:\n\nnone')).toBe('FINDINGS:\n\nNone.')
  })

  test('leaves words with an inner capital alone and collapses spaces', () => {
    expect(formatReportText('eGFR  below 30')).toBe('eGFR below 30.')
    expect(formatReportText('  mRS 2 ')).toBe('mRS 2.')
  })
})

// The author's decision (2026-10-25): every calculator's copy boxes are the standard report
// sections, so a page can't drift back to labels like "Management" or "Report text". The
// label type enforces it at build time; this checks the pages use only those names.
describe('copy box labels', () => {
  test('every calculator page labels its copy boxes with a report section', () => {
    const dir = new URL('../pages/', import.meta.url)
    const allowed = new Set(['Findings', 'Impression', 'Recommendation', 'Chart note'])
    for (const file of readdirSync(dir).filter((name) => name.endsWith('.tsx'))) {
      const source = readFileSync(new URL(file, dir), 'utf8')
      for (const match of source.matchAll(/<CopyBlock[^>]*?label="([^"]+)"/gs)) {
        expect(allowed.has(match[1]), `${file}: ${match[1]}`).toBe(true)
      }
    }
  })
})
