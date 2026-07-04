import { useState } from 'react'
import type { PredictScreen } from '../../types'

export default function PredictScreenView({
  screen,
  onDone,
}: {
  screen: PredictScreen
  onDone: () => void
}) {
  const [choice, setChoice] = useState<number | null>(null)

  return (
    <div>
      <div className="mb-3 inline-block rounded bg-violet-500/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-violet-300">
        🔮 Predict first
      </div>
      <h2 className="text-xl font-bold leading-snug">{screen.question}</h2>

      <div className="mt-5 space-y-2">
        {screen.options.map((opt, i) => {
          const committed = choice !== null
          const isChoice = choice === i
          const isCorrect = i === screen.correctIndex
          return (
            <button
              key={i}
              disabled={committed}
              onClick={() => setChoice(i)}
              className={[
                'block w-full rounded-lg border px-4 py-3 text-left text-sm transition',
                !committed
                  ? 'border-slate-700 bg-slate-900 hover:border-cyan-500/60 hover:bg-slate-800'
                  : isCorrect
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                    : isChoice
                      ? 'border-rose-500 bg-rose-500/10 text-rose-200'
                      : 'border-slate-800 bg-slate-900 opacity-50',
              ].join(' ')}
            >
              {opt}
              {committed && isChoice && !isCorrect && ' — your prediction'}
            </button>
          )
        })}
      </div>

      {choice !== null && (
        <div className="mt-5 rounded-xl border border-slate-700 bg-slate-900 p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
            {choice === screen.correctIndex ? '🎯 Called it!' : '👀 Here’s what actually happens'}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{screen.reveal}</p>
          <button
            onClick={onDone}
            className="mt-4 rounded-lg bg-cyan-500 px-5 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  )
}
