import { useEffect, useState } from 'react'

const W = 440
const H = 180

/**
 * Law of large numbers: flip coins, watch the running proportion of heads
 * wander at first, then home in on 0.5. Robotics hook: averaging noisy readings.
 */
type Tally = { heads: number; total: number; history: number[] }

export default function ProbabilitySim({ onComplete }: { onComplete: (score: number) => void }) {
  const [{ heads, total, history }, setTally] = useState<Tally>({ heads: 0, total: 0, history: [] })
  const [done, setDone] = useState(false)

  const flip = (n: number) => {
    // Functional update so rapid clicks accumulate instead of racing on stale state.
    setTally((prev) => {
      let h = prev.heads
      let t = prev.total
      const hist = [...prev.history]
      for (let i = 0; i < n; i++) {
        if (Math.random() < 0.5) h++
        t++
        hist.push(h / t)
      }
      // keep last ~400 points for the chart
      return { heads: h, total: t, history: hist.slice(-400) }
    })
  }

  useEffect(() => {
    if (total >= 500 && !done) {
      setDone(true)
      onComplete(1)
    }
  }, [total, done, onComplete])

  const reset = () => {
    setTally({ heads: 0, total: 0, history: [] })
    setDone(false)
  }

  const prop = total > 0 ? heads / total : 0
  const yFor = (p: number) => H - 20 - (p - 0.3) * (H - 40) * (1 / 0.4) // map 0.3..0.7 → chart
  const clampY = (p: number) => Math.max(10, Math.min(H - 10, yFor(p)))

  const points = history
    .map((p, i) => `${20 + (i / Math.max(history.length - 1, 1)) * (W - 30)},${clampY(p)}`)
    .join(' ')

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <p className="text-sm text-slate-300">
        One coin flip is pure chance — you can’t predict it. But flip <b>many</b> and something
        strange happens. Flip and watch the running % of heads.
      </p>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full rounded-lg bg-slate-950">
        {/* 50% reference line */}
        <line x1={20} y1={clampY(0.5)} x2={W - 10} y2={clampY(0.5)} stroke="#334155" strokeWidth={1} strokeDasharray="4 4" />
        <text x={W - 8} y={clampY(0.5) - 4} textAnchor="end" fontSize={10} fill="#64748b">50%</text>
        {/* proportion trace */}
        {history.length > 1 && <polyline points={points} fill="none" stroke="#a78bfa" strokeWidth={2} />}
        {/* current point */}
        {total > 0 && (
          <circle cx={20 + (W - 30)} cy={clampY(prop)} r={4} fill="#a78bfa" />
        )}
      </svg>

      <div className="mt-3 flex items-center justify-center gap-6 font-mono text-sm">
        <span className="text-slate-400">flips: <span className="font-bold text-white">{total}</span></span>
        <span className="text-slate-400">heads: <span className="font-bold text-white">{heads}</span></span>
        <span className="text-slate-400">
          proportion: <span className={`font-bold ${done ? 'text-emerald-300' : 'text-violet-300'}`}>{(prop * 100).toFixed(1)}%</span>
        </span>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        <button onClick={() => flip(1)} className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-700">
          Flip 1
        </button>
        <button onClick={() => flip(25)} className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-700">
          Flip 25
        </button>
        <button onClick={() => flip(100)} className="rounded-lg bg-violet-500 px-3 py-1.5 text-sm font-bold text-slate-950 hover:bg-violet-400">
          Flip 100
        </button>
        <button onClick={reset} className="ml-2 text-xs text-slate-500 hover:text-slate-300">reset</button>
      </div>

      {total > 0 && total < 500 && !done && (
        <p className="mt-2 text-center text-xs text-slate-500">
          {total < 30
            ? 'Jumpy, right? Small samples swing wildly. Keep flapping — reach 500 flips.'
            : 'Watch it settle toward the dashed 50% line as flips pile up.'}
        </p>
      )}
      {done && (
        <p className="mt-2 text-center text-sm font-semibold text-emerald-300">
          🎉 With 500 flips you landed near 50%, even though each flip was unpredictable. That taming
          of randomness by volume is the Law of Large Numbers — and why averaging noisy sensor
          readings gives a robot a trustworthy number.
        </p>
      )}
    </div>
  )
}
