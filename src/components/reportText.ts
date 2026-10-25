/**
 * The sections a copy box may carry. Calculators use the three report sections: Findings (what
 * was measured or seen), Impression (the category or diagnosis) and Recommendation (follow-up and
 * management, with the guideline's interval). The contrast and anticoagulation pages write a
 * Chart note instead, since what they produce goes in the patient's chart, not a report. The
 * studies show their whole Report (Report tab) and a Report template (Learn tab), which keep
 * their own layout.
 */
export type ReportSection = 'Findings' | 'Impression' | 'Recommendation' | 'Chart note' | 'Report' | 'Report template'

/**
 * Tidies text before it is shown and copied: single spaces, a capital letter at the start of
 * each line (unless the word is written with an inner capital, like eGFR), and a full stop at
 * the end of each line that has no closing punctuation (a line ending in a colon is a heading).
 * Line breaks and blank lines are kept.
 */
export function formatReportText(text: string): string {
  return text
    .split('\n')
    .map((line) => {
      const tidy = line.replace(/[ \t]+/g, ' ').trim()
      if (!tidy) return ''
      const capitalised = /^[a-z][A-Z]/.test(tidy) ? tidy : tidy.charAt(0).toUpperCase() + tidy.slice(1)
      return /[.!?:]$/.test(capitalised) ? capitalised : `${capitalised}.`
    })
    .join('\n')
}
