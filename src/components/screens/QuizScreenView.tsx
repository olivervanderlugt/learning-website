import { useMemo, useState } from 'react'
import { shuffledIndices } from '../../shuffle'
import { RichHeading } from './RichText'
import type { QuizScreen } from '../../types'

export default function QuizScreenView({
  screen,
  questionNumber,
  totalQuestions,
  onAnswer,
  onDone,
}: {
  screen: QuizScreen
  questionNumber: number
  totalQuestions: number
  /** Called once, with whether the first committed answer was correct. */
  onAnswer: (correct: boolean) => void
  onDone: () => void
}) {
  const [choice, setChoice] = useState<number | null>(null)
  const order = useMemo(() => shuffledIndices(screen.options.length), [screen])

  const commit = (i: number) => {
    if (choice !== null) return
    setChoice(i)
    onAnswer(i === screen.correctIndex)
  }

  return (
    <div>
      <div className="mb-3 inline-block rounded bg-amber-500/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-300">
        🧠 Quiz {questionNumber}/{totalQuestions} — from memory
      </div>
      <RichHeading text={screen.question} className="text-xl font-bold leading-snug" />

      <div className="mt-5 space-y-2">
        {order.map((i) => {
          const opt = screen.options[i]
          const committed = choice !== null
          const isChoice = choice === i
          const isCorrect = i === screen.correctIndex
          return (
            <button
              key={i}
              disabled={committed}
              onClick={() => commit(i)}
              className={[
                'block w-full rounded-lg border px-4 py-3 text-left text-sm transition',
                !committed
                  ? 'border-slate-700 bg-slate-900 hover:border-amber-500/60 hover:bg-slate-800'
                  : isCorrect
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                    : isChoice
                      ? 'border-rose-500 bg-rose-500/10 text-rose-200'
                      : 'border-slate-800 bg-slate-900 opacity-50',
              ].join(' ')}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {choice !== null && (
        <div
          className={`mt-5 rounded-xl border p-4 ${
            choice === screen.correctIndex
              ? 'border-emerald-600/50 bg-emerald-500/5'
              : 'border-rose-600/50 bg-rose-500/5'
          }`}
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {choice === screen.correctIndex ? '✅ Correct' : '❌ Not this one'}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{screen.explanations[choice]}</p>
          {choice !== screen.correctIndex && (
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              <span className="font-semibold text-emerald-300">The answer:</span>{' '}
              {screen.explanations[screen.correctIndex]}
            </p>
          )}
          <button
            onClick={onDone}
            className="mt-4 rounded-lg bg-cyan-500 px-5 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400"
          >
            {questionNumber === totalQuestions ? 'See my result →' : 'Next question →'}
          </button>
        </div>
      )}
    </div>
  )
}
