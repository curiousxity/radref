import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LessonCaveat, LessonReferences } from '../components/LessonPage'
import { QuizPanel } from './QuizPanel'
import { ReportBuilder } from './ReportBuilder'
import type { StudyDefinition } from './types'

const TABS = [
  { id: 'report', label: 'Report' },
  { id: 'learn', label: 'Learn' },
  { id: 'quiz', label: 'Quiz' },
] as const
type TabId = (typeof TABS)[number]['id']

function isTab(value: string | null): value is TabId {
  return TABS.some((tab) => tab.id === value)
}

/**
 * One exam type: build the report, learn the method, test yourself. The tab lives in the
 * URL (`?tab=learn`), so the back button and shared links land on the right tab.
 */
export function StudyPage({ study }: { study: StudyDefinition }) {
  const [params, setParams] = useSearchParams()
  const requested = params.get('tab')
  const tab: TabId = isTab(requested) ? requested : 'report'
  const [scrollTarget, setScrollTarget] = useState<string | null>(null)

  function selectTab(next: TabId) {
    setParams(next === 'report' ? {} : { tab: next })
  }

  /** From a report step's "Read the full section" link. */
  function openLearnSection(id: string) {
    selectTab('learn')
    setScrollTarget(id)
  }

  useEffect(() => {
    if (tab !== 'learn' || !scrollTarget) return
    document.getElementById(`learn-${scrollTarget}`)?.scrollIntoView({ block: 'start' })
    setScrollTarget(null)
  }, [tab, scrollTarget])

  return (
    <div className="page study-page">
      <section className="section-block calculator-header">
        <div>
          <p className="eyebrow">Study</p>
          <h2>{study.name}</h2>
          <p>{study.lede}</p>
          <p className="source-note">{study.sourceNote}</p>
        </div>
      </section>

      <div className="study-tabs" role="tablist" aria-label={`${study.name} sections`}>
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={tab === item.id}
            aria-controls={`panel-${item.id}`}
            className={tab === item.id ? 'study-tab active' : 'study-tab'}
            onClick={() => selectTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="study-panel">
        {tab === 'report' && <ReportBuilder study={study} onOpenLearn={openLearnSection} />}

        {tab === 'learn' && (
          <>
            <nav className="info-card study-contents" aria-label="In this lesson">
              <h3>In this lesson</h3>
              <ol className="plain-list">
                {study.learn.map((section) => (
                  <li key={section.id}>
                    <a href={`#learn-${section.id}`}>{section.title}</a>
                  </li>
                ))}
              </ol>
            </nav>
            {study.learn.map((section) => (
              <section key={section.id} id={`learn-${section.id}`} className="info-card lesson-body">
                <h3>{section.title}</h3>
                {section.body}
              </section>
            ))}
            <LessonReferences references={study.references} note={study.referencesNote} />
          </>
        )}

        {tab === 'quiz' && <QuizPanel slug={study.slug} questions={study.quiz} />}
      </div>

      <LessonCaveat />
    </div>
  )
}
