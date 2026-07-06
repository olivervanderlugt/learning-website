import { useState } from 'react'
import type { GatePuzzleScreen } from '../../types'
import { puzzles } from '../../content/puzzles'
import GateSandbox from '../GateSandbox'

export default function GatePuzzleScreenView({
  screen,
  onDone,
}: {
  screen: GatePuzzleScreen
  onDone: () => void
}) {
  const puzzle = puzzles[screen.puzzleId]
  const [started, setStarted] = useState(false)
  const [solved, setSolved] = useState(false)

  if (!puzzle) return <p className="text-slate-400">Unknown puzzle: {screen.puzzleId}</p>

  if (!started) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="mb-3 inline-block rounded bg-cyan-500/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-cyan-300">
          🔧 Build it
        </div>
        <h2 className="text-xl font-bold">{puzzle.title}</h2>
        <div className="mt-4 space-y-3">
          {puzzle.intro.map((p, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-slate-300">
              {p}
            </p>
          ))}
        </div>
        <button
          onClick={() => setStarted(true)}
          className="mt-6 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-400 active:scale-[0.98]"
        >
          Open the workbench →
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-slate-300">
          <span className="font-bold text-slate-100">{puzzle.title}:</span> {puzzle.goal}
        </p>
        {solved && (
          <button
            onClick={onDone}
            className="shrink-0 rounded-lg bg-emerald-500 px-5 py-2 text-sm font-bold text-slate-950 hover:bg-emerald-400"
          >
            Continue →
          </button>
        )}
      </div>
      <div className="min-h-0 flex-1">
        <GateSandbox puzzle={puzzle} onComplete={() => setSolved(true)} />
      </div>
    </div>
  )
}
