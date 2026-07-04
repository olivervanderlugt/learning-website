import { useState } from 'react'

const TARGETS = [5, 11, 20]
const PLACES = [16, 8, 4, 2, 1]

/** Clickable 5-bit switch row: hit each target number to win. */
export default function BinaryCounter({ onComplete }: { onComplete: (score: number) => void }) {
  const [bits, setBits] = useState<number[]>([0, 0, 0, 0, 0])
  const [targetIdx, setTargetIdx] = useState(0)
  const [done, setDone] = useState(false)

  const value = bits.reduce((acc, b, i) => acc + b * PLACES[i], 0)
  const target = TARGETS[targetIdx]

  const toggle = (i: number) => {
    if (done) return
    const next = bits.map((b, j) => (j === i ? 1 - b : b))
    setBits(next)
    const v = next.reduce((acc, b, j) => acc + b * PLACES[j], 0)
    if (v === target) {
      if (targetIdx === TARGETS.length - 1) {
        setDone(true)
        onComplete(1)
      } else {
        setTargetIdx(targetIdx + 1)
        setBits([0, 0, 0, 0, 0])
      }
    }
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
      <p className="text-sm text-slate-300">
        These 5 switches are one tiny piece of computer memory. Click switches to flip them —{' '}
        <span className="font-bold text-cyan-300">make the number {done ? '—' : target}</span>.
      </p>

      <div className="mt-5 flex items-end justify-center gap-3">
        {PLACES.map((place, i) => (
          <div key={place} className="flex flex-col items-center gap-1.5">
            <span className="text-[11px] text-slate-500">{place}s</span>
            <button
              onClick={() => toggle(i)}
              className={[
                'flex h-16 w-12 items-center justify-center rounded-lg border-2 text-2xl font-black transition-all',
                bits[i]
                  ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.4)]'
                  : 'border-slate-700 bg-slate-950 text-slate-600 hover:border-slate-500',
              ].join(' ')}
            >
              {bits[i]}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-5 text-center">
        <span className="text-sm text-slate-400">These switches say: </span>
        <span className="text-3xl font-black tabular-nums text-white">{value}</span>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {TARGETS.map((t, i) => (
          <span
            key={t}
            className={[
              'rounded-full px-3 py-1 text-xs font-bold',
              i < targetIdx || done
                ? 'bg-emerald-500/20 text-emerald-300'
                : i === targetIdx
                  ? 'bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400'
                  : 'bg-slate-800 text-slate-500',
            ].join(' ')}
          >
            {(i < targetIdx || done) && '✓ '}
            {t}
          </span>
        ))}
      </div>

      {done && (
        <p className="mt-4 text-center text-sm font-semibold text-emerald-300">
          🎉 You just wrote three numbers straight into “memory” — that’s all storage is.
        </p>
      )}
    </div>
  )
}
