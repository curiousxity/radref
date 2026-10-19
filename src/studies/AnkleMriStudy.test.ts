import { describe, expect, test } from 'vitest'
import { report, studyOf } from '../study/testing'
import { AnkleMriStudyPage } from './AnkleMriStudy'

const study = studyOf(AnkleMriStudyPage)

describe('ankle MRI lesson', () => {
  test('has one learn section per report step, in the search-pattern order', () => {
    // The report steps (technique to impression) link to these ids, so they must not drift.
    expect(study.learn.map((section) => section.id)).toEqual([
      'technique', 'bones', 'lateral-ligaments', 'syndesmosis', 'medial-ligaments', 'medial-tendons',
      'lateral-tendons', 'posterior', 'anterior', 'spaces', 'plantar', 'impression',
    ])
  })

  test('cites 15 references, each with a DOI', () => {
    expect(study.references).toHaveLength(15)
    for (const ref of study.references) expect(ref.doi, ref.citation).toBeTruthy()
  })

  test('the placeholder report is empty until the report steps are written', () => {
    expect(report(study)).toEqual({ text: '', warnings: [] })
  })
})
