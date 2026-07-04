import { useState } from 'react'
import type { ExplainScreen } from '../../types'

export default function ExplainScreenView({
  screen,
  onDone,
}: {
  screen: ExplainScreen
  onDone: () => void
}) {
  const [deep, setDeep] = useState(false)
  return (
    <div>
      <h2 className="text-xl font-bold">{screen.title}</h2>
      <div className="mt-4 space-y-3">
        {screen.body.map((p, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-slate-300">
            {p}
          </p>
        ))}
      </div>

      {screen.deeper && screen.deeper.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setDeep((d) => !d)}
            className="rounded-lg border border-violet-500/40 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-300 hover:bg-violet-500/20"
          >
            {deep ? '▴ Hide deeper explanation' : '▾ Go deeper — explain more'}
          </button>
          {deep && (
            <div className="mt-3 space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              {screen.deeper.map((p, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-slate-300">
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      <button
        onClick={onDone}
        className="mt-6 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-400 active:scale-[0.98]"
      >
        Got it →
      </button>
    </div>
  )
}
