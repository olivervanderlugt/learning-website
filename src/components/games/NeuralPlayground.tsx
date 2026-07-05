import { useEffect, useMemo, useState } from 'react'

/**
 * One artificial neuron, hands-on: sliders for w1, w2, bias steer a decision
 * line over labeled points. Challenge 1: separate two clusters (possible).
 * Challenge 2: XOR — provably impossible with one line; after honest trying,
 * the learner declares it impossible (that's the win) and sees why a hidden
 * layer fixes it. onComplete fires after challenge 2.
 */
interface Pt {
  x: number
  y: number
  label: 1 | -1
}

const CLUSTERS: Pt[] = [
  { x: 1.5, y: 1.5, label: 1 },
  { x: 2.2, y: 2.6, label: 1 },
  { x: 2.8, y: 1.2, label: 1 },
  { x: -1.5, y: -1.0, label: -1 },
  { x: -2.2, y: -2.2, label: -1 },
  { x: -1.0, y: -2.6, label: -1 },
]

const XOR: Pt[] = [
  { x: 1.9, y: 1.9, label: 1 },
  { x: -1.9, y: -1.9, label: 1 },
  { x: -1.9, y: 1.9, label: -1 },
  { x: 1.9, y: -1.9, label: -1 },
]

const W = 440
const H = 260
const sx = (vx: number) => ((vx + 4) / 8) * (W - 20) + 10
const sy = (vy: number) => H - (((vy + 4) / 8) * (H - 20) + 10)

export default function NeuralPlayground({ onComplete }: { onComplete: (score: number) => void }) {
  const [w1, setW1] = useState(-1)
  const [w2, setW2] = useState(-1)
  const [b, setB] = useState(0)
  const [stage, setStage] = useState<0 | 1>(0)
  const [moves, setMoves] = useState(0)
  const [stage1Solved, setStage1Solved] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [done, setDone] = useState(false)

  const points = stage === 0 ? CLUSTERS : XOR
  const predict = (p: Pt) => (w1 * p.x + w2 * p.y + b > 0 ? 1 : -1)
  const correct = points.filter((p) => predict(p) === p.label).length

  useEffect(() => {
    if (stage === 0 && !stage1Solved && moves > 0 && correct === points.length) setStage1Solved(true)
  }, [stage, stage1Solved, moves, correct, points.length])

  useEffect(() => {
    if (done) onComplete(1)
  }, [done, onComplete])

  const adjust = (setter: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(Number(e.target.value))
    setMoves((m) => m + 1)
  }

  const toStage2 = () => {
    setStage(1)
    setMoves(0)
    setW1(1)
    setW2(1)
    setB(0)
  }

  // decision line w1·x + w2·y + b = 0 across the viewport
  const line = useMemo(() => {
    if (Math.abs(w2) > 0.05) {
      const yAt = (vx: number) => -(w1 * vx + b) / w2
      return { x1: sx(-4), y1: sy(yAt(-4)), x2: sx(4), y2: sy(yAt(4)) }
    }
    if (Math.abs(w1) > 0.05) {
      const vx = -b / w1
      return { x1: sx(vx), y1: sy(-4), x2: sx(vx), y2: sy(4) }
    }
    return null
  }, [w1, w2, b])

  const banner = done
    ? '🎉 You just discovered why neural networks need layers.'
    : stage === 0
      ? stage1Solved
        ? '✓ Separated! One neuron = one straight line. That’s its entire power.'
        : 'Challenge 1/2: slide the weights until the line separates ● from ● (all 6 correct).'
      : revealed
        ? 'Exactly — NO single line works. Each slider move just trades one mistake for another.'
        : `Challenge 2/2: now separate THIS pattern (XOR). Try hard — best so far: ${correct}/4.`

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <div className={`rounded-lg border px-3 py-2 text-sm ${stage1Solved && stage === 0 ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : done || revealed ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border-rose-500/40 bg-rose-500/10 text-rose-200'}`}>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold">{banner}</span>
          {stage === 0 && stage1Solved && (
            <button onClick={toStage2} className="shrink-0 rounded-md bg-emerald-500 px-2.5 py-1 text-xs font-bold text-slate-950 hover:bg-emerald-400">
              Next challenge
            </button>
          )}
          {stage === 1 && revealed && !done && (
            <button onClick={() => setDone(true)} className="shrink-0 rounded-md bg-emerald-500 px-2.5 py-1 text-xs font-bold text-slate-950 hover:bg-emerald-400">
              Finish
            </button>
          )}
        </div>
        {stage === 1 && revealed && (
          <p className="mt-1 text-xs opacity-80">
            The fix: a HIDDEN LAYER. Two neurons make the two dashed lines, and a third neuron
            combines them: “below the upper AND above the lower” — the green band catches exactly
            the ● points. Stacking simple lines builds shapes no single line can — that’s deep
            learning in one sentence.
          </p>
        )}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full rounded-lg bg-slate-950">
        {/* axes */}
        <line x1={sx(-4)} y1={sy(0)} x2={sx(4)} y2={sy(0)} stroke="#1e293b" />
        <line x1={sx(0)} y1={sy(-4)} x2={sx(0)} y2={sy(4)} stroke="#1e293b" />
        {/* hidden-layer reveal: two parallel dashed lines (y = x ± 1.5); the band
            between them holds both ● points — two neurons + AND solves XOR */}
        {stage === 1 && revealed && (
          <>
            <line x1={sx(-4)} y1={sy(-4 + 1.5)} x2={sx(4)} y2={sy(4 + 1.5)} stroke="#34d399" strokeWidth={1.5} strokeDasharray="6 4" />
            <line x1={sx(-4)} y1={sy(-4 - 1.5)} x2={sx(4)} y2={sy(4 - 1.5)} stroke="#34d399" strokeWidth={1.5} strokeDasharray="6 4" />
          </>
        )}
        {/* decision line */}
        {line && <line {...line} stroke="#22d3ee" strokeWidth={2} />}
        {/* points */}
        {points.map((p, i) => {
          const ok = predict(p) === p.label
          return (
            <g key={i}>
              <circle cx={sx(p.x)} cy={sy(p.y)} r={9} fill={p.label === 1 ? '#34d399' : '#fb7185'} opacity={0.9} />
              <text x={sx(p.x)} y={sy(p.y) + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill="#0f172a">
                {ok ? '✓' : '✗'}
              </text>
            </g>
          )
        })}
        <text x={W - 8} y={14} textAnchor="end" fontSize={10} fill="#64748b">
          fires when w₁·x + w₂·y + b &gt; 0 → ● side
        </text>
      </svg>

      <div className="mt-3 grid grid-cols-3 gap-3">
        {([['w₁', w1, setW1], ['w₂', w2, setW2], ['bias', b, setB]] as const).map(([label, val, setter]) => (
          <label key={label} className="block">
            <span className="flex justify-between font-mono text-xs text-slate-400">
              <span>{label}</span>
              <b className="text-cyan-300">{val.toFixed(1)}</b>
            </span>
            <input type="range" min={-3} max={3} step={0.1} value={val} onChange={adjust(setter)} className="w-full accent-cyan-400" />
          </label>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="font-mono text-xs text-slate-400">
          correct: <b className={correct === points.length ? 'text-emerald-300' : 'text-slate-200'}>{correct}/{points.length}</b>
        </span>
        {stage === 1 && !revealed && moves >= 8 && (
          <button onClick={() => setRevealed(true)} className="rounded-lg border border-rose-500/50 bg-rose-500/10 px-3 py-1.5 text-sm font-semibold text-rose-200 hover:bg-rose-500/20">
            I’m convinced — no single line can do this
          </button>
        )}
        {stage === 1 && !revealed && moves < 8 && (
          <span className="text-xs text-slate-500">really try it first — move the sliders</span>
        )}
      </div>
    </div>
  )
}
