import { useState } from 'react'
import type { QuizQuestion } from './types'

/** Best score per study, kept only in this browser. Storage can be unavailable (private mode), so every access is guarded. */
function storageKey(slug: string) {
  return `radref:quiz-best:${slug}`
}

function readBest(slug: string): number | null {
  try {
    const raw = window.localStorage.getItem(storageKey(slug))
    return raw === null ? null : Number(raw)
  } catch {
    return null
  }
}

function writeBest(slug: string, score: number) {
  try {
    window.localStorage.setItem(storageKey(slug), String(score))
  } catch {
    // Not saving the best score is harmless.
  }
}

export function QuizPanel({ slug, questions }: { slug: string; questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [best, setBest] = useState<number | null>(() => readBest(slug))

  const answered = questions.filter((q) => q.id in answers).length
  const correct = questions.filter((q) => answers[q.id] === q.answer).length
  const finished = answered === questions.length

  function choose(question: QuizQuestion, index: number) {
    if (question.id in answers) return
    const next = { ...answers, [question.id]: index }
    setAnswers(next)
    if (Object.keys(next).length === questions.length) {
      const score = questions.filter((q) => next[q.id] === q.answer).length
      if (best === null || score > best) {
        setBest(score)
        writeBest(slug, score)
      }
    }
  }

  return (
    <div className="study-quiz">
      <section className="info-card quiz-summary" aria-live="polite">
        <p className="metric-label">Progress</p>
        <p className="quiz-score">
          {answered === 0 ? `${questions.length} questions` : `${correct} of ${answered} correct`}
          {finished && ` · ${Math.round((correct / questions.length) * 100)}%`}
        </p>
        {best !== null && <p className="source-note">Your best: {best} of {questions.length}</p>}
        {answered > 0 && (
          <button type="button" className="reset-button" onClick={() => setAnswers({})}>Start again</button>
        )}
      </section>

      {questions.map((question, number) => {
        const chosen = answers[question.id]
        const done = chosen !== undefined
        return (
          <section key={question.id} className="info-card quiz-question">
            <p className="metric-label">Question {number + 1}</p>
            <h3>{question.question}</h3>
            <div className="quiz-options">
              {question.options.map((option, index) => {
                const state = !done ? '' : index === question.answer ? ' correct' : index === chosen ? ' wrong' : ' dim'
                return (
                  <button
                    key={option}
                    type="button"
                    className={`quiz-option${state}`}
                    disabled={done}
                    aria-pressed={chosen === index}
                    onClick={() => choose(question, index)}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
            {done && (
              <div className={`quiz-explanation lesson-body ${chosen === question.answer ? 'is-correct' : 'is-wrong'}`}>
                <p className="metric-label">{chosen === question.answer ? 'Correct' : 'Not quite'}</p>
                {question.explanation}
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
