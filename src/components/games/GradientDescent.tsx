import { useEffect, useState } from 'react'

/**
 * Gradient descent explorer: a ball on the loss curve L(x) = x², stepped by
 * x ← x − lr·L'(x). A learning-rate slider + Step buttons let the learner FEEL
 * convergence, oscillation and divergence. Three challenges: converge, then
 * deliberately diverge, then converge fast. onComplete fires after the last.
 */
const X0 = 4 // starting position after every reset

interface Challenge {
  label: string
  hint: string
  check: (hist: number[], lr: number) => boolean
}

const CHALLENGES: Challenge[] = [
  {
    label: 'Roll into the valley: get the loss below 0.01',
    hint: 'Pick a moderate learning rate (say 0.1–0.4) and keep stepping. Each step moves against the slope.',
    check: (hist) => hist.length > 1 && hist[hist.length - 1] ** 2 < 0.01,
  },
  {
    label: 'Now BREAK it: set the learning rate above 1.0 and take 4+ steps — watch what happens',
    hint: 'With lr > 1 each step overshoots the valley by more than it came in — the ball climbs OUT. This is real: too-high learning rates make training explode.',
    check: (hist, lr) => lr > 1.0 && hist.length >= 5 && Math.abs(hist[hist.length - 1]) > Math.abs(X0),
  },
  {
    label: 'Precision run: from a fresh reset, loss below 0.0001 in at most 12 steps',
    hint: 'Too small a rate wastes steps, too big overshoots. Something around 0.3–0.5 is the sweet spot. (0.5 is magic here — see why?)',
    check: (hist) => hist.length > 1 && hist.length <= 13 && hist[hist.length - 1] ** 2 < 0.0001,
  },
]

const W = 440
const H = 190

export default function GradientDescent({ onComplete }: { onComplete: (score: number) => void }) {
  const [x, setX] = useState(X0)
  const [hist, setHist] = useState<number[]>([X0])
  const [lr, setLr] = useState(0.2)
  const [stage, setStage] = useState(0)
  const [solved, setSolved] = useState(false)
  const [done, setDone] = useState(false)

  const loss = x * x
  const challenge = CHALLENGES[stage]

  const step = (times: number) => {
    if (done) return
    setHist((prev) => {
      let cur = prev[prev.length - 1]
      const next = [...prev]
      for (let k = 0; k < times; k++) {
        cur = cur - lr * 2 * cur // gradient of x² is 2x
        cur = Math.max(-40, Math.min(40, cur))
        next.push(cur)
      }
      return next
    })
  }

  // keep x in sync with history tail
  useEffect(() => {
    setX(hist[hist.length - 1])
  }, [hist])

  useEffect(() => {
    if (done || solved || !challenge) return
    if (challenge.check(hist, lr)) setSolved(true)
  }, [hist, lr, challenge, solved, done])

  const nextStage = () => {
    if (stage + 1 >= CHALLENGES.length) {
      setDone(true)
      onComplete(1)
    } else {
      setStage((s) => s + 1)
      setSolved(false)
      setHist([X0])
    }
  }

  const reset = () => setHist([X0])

  // curve mapping: x ∈ [-5, 5] → svg
  const sx = (vx: number) => ((vx + 5) / 10) * (W - 20) + 10
  const sy = (vy: number) => H - 15 - (Math.min(vy, 25) / 25) * (H - 35)
  const curve = Array.from({ length: 101 }, (_, i) => {
    const vx = -5 + (i / 100) * 10
    return `${sx(vx)},${sy(vx * vx)}`
  }).join(' ')
  const ballX = Math.max(-5, Math.min(5, x))
  const offMap = Math.abs(x) > 5

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <div className={`rounded-lg border px-3 py-2 text-sm ${solved || done ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border-violet-500/40 bg-violet-500/10 text-violet-200'}`}>
        {done ? (
          <span className="font-semibold">🎉 You’ve tuned your first optimizer — converge, diverge, converge FAST.</span>
        ) : solved ? (
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold">✓ Done — {stage === 1 ? 'it exploded, exactly as real training does' : `loss ${loss < 0.0001 ? loss.toExponential(1) : loss.toFixed(4)}`}</span>
            <button onClick={nextStage} className="shrink-0 rounded-md bg-emerald-500 px-2.5 py-1 text-xs font-bold text-slate-950 hover:bg-emerald-400">
              {stage + 1 >= CHALLENGES.length ? 'Finish' : 'Next challenge'}
            </button>
          </div>
        ) : (
          <>
            <span className="font-semibold">Challenge {stage + 1}/{CHALLENGES.length}:</span> {challenge.label}
            <p className="mt-0.5 text-xs opacity-70">{challenge.hint}</p>
          </>
        )}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full rounded-lg bg-slate-950">
        <polyline points={curve} fill="none" stroke="#475569" strokeWidth={2} />
        {/* history trail */}
        {hist.slice(-14).map((hx, i, arr) => {
          const cx = Math.max(-5, Math.min(5, hx))
          return <circle key={i} cx={sx(cx)} cy={sy(cx * cx)} r={3} fill="#a78bfa" opacity={(i + 1) / arr.length * 0.6} />
        })}
        {/* ball */}
        <circle cx={sx(ballX)} cy={sy(ballX * ballX)} r={7} fill={offMap ? '#fb7185' : '#a78bfa'} />
        <text x={sx(ballX)} y={sy(ballX * ballX) - 12} textAnchor="middle" fontSize={10} fill={offMap ? '#fb7185' : '#c4b5fd'}>
          {offMap ? '💥 off the chart' : `x=${x.toFixed(2)}`}
        </text>
        <text x={W - 8} y={H - 6} textAnchor="end" fontSize={10} fill="#64748b">loss L(x) = x²</text>
      </svg>

      <div className="mt-3 flex items-center gap-3">
        <span className="shrink-0 font-mono text-xs text-slate-400">learning rate</span>
        <input type="range" min={0.02} max={1.3} step={0.02} value={lr} onChange={(e) => setLr(Number(e.target.value))} className="w-full accent-violet-400" />
        <span className={`w-12 shrink-0 text-right font-mono text-sm font-bold ${lr > 1 ? 'text-rose-300' : 'text-violet-300'}`}>{lr.toFixed(2)}</span>
      </div>

      <div className="mt-2 flex items-center justify-center gap-2">
        <button onClick={() => step(1)} className="rounded-lg bg-violet-500 px-4 py-1.5 text-sm font-bold text-slate-950 hover:bg-violet-400">
          Step ↓
        </button>
        <button onClick={() => step(5)} className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-1.5 text-sm font-semibold text-slate-200 hover:bg-slate-700">
          Step ×5
        </button>
        <button onClick={reset} className="ml-2 text-xs text-slate-500 hover:text-slate-300">reset ball</button>
        <span className="ml-auto font-mono text-xs text-slate-400">
          steps: <b className="text-slate-200">{hist.length - 1}</b> · loss: <b className={loss < 0.01 ? 'text-emerald-300' : 'text-slate-200'}>{loss < 0.0001 && loss > 0 ? loss.toExponential(1) : loss.toFixed(4)}</b>
        </span>
      </div>
    </div>
  )
}
