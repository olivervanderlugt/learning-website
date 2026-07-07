import { useRef, useState } from 'react'

// Plane: f(x) = 0.25 x²  on domain [-4, 4]; derivative f'(x) = 0.5 x
const VBW = 440
const VBH = 340
const OX = VBW / 2
const OY = VBH - 40 // origin near bottom so the parabola sits above
const U = 44 // px per unit (x); y uses same
const f = (x: number) => 0.25 * x * x
const df = (x: number) => 0.5 * x
const XMIN = -4
const XMAX = 4

const toSvg = (x: number, y: number) => ({ px: OX + x * U, py: OY - y * U })

/** Draggable point on a curve showing the live tangent slope (the derivative). */
export default function SlopeExplorer({ onComplete }: { onComplete: (score: number) => void }) {
  const [stage, setStage] = useState(0)
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <div className="mb-3 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded ${i <= stage ? 'bg-cyan-400' : 'bg-slate-700'}`} />
        ))}
      </div>
      {stage === 0 && <Curve prompt="explore" onSolved={() => setStage(1)} />}
      {stage === 1 && <Curve prompt="flat" targetX={0} onSolved={() => setStage(2)} />}
      {stage === 2 && <Curve prompt="slope1" targetX={2} onSolved={() => onComplete(1)} />}
    </div>
  )
}

function Curve({
  prompt,
  targetX,
  onSolved,
}: {
  prompt: 'explore' | 'flat' | 'slope1'
  targetX?: number
  onSolved: () => void
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [x, setX] = useState(-3)
  const [drag, setDrag] = useState(false)
  const [solved, setSolved] = useState(false)

  const slope = df(x)
  const y = f(x)

  // Solve conditions
  const hit =
    prompt === 'flat'
      ? Math.abs(slope) < 0.12
      : prompt === 'slope1'
        ? Math.abs(slope - 1) < 0.12
        : false
  if (hit && !solved && prompt !== 'explore') setSolved(true)

  const pointerX = (e: React.PointerEvent) => {
    const rect = svgRef.current!.getBoundingClientRect()
    const px = (e.clientX - rect.left) * (VBW / rect.width)
    const mx = (px - OX) / U
    setX(Math.max(XMIN, Math.min(XMAX, Math.round(mx * 4) / 4)))
  }

  // curve path
  const path = Array.from({ length: 81 }, (_, i) => {
    const cx = XMIN + (i / 80) * (XMAX - XMIN)
    const p = toSvg(cx, f(cx))
    return `${i === 0 ? 'M' : 'L'}${p.px.toFixed(1)},${p.py.toFixed(1)}`
  }).join(' ')

  const pt = toSvg(x, y)
  // tangent segment: y = slope*(X - x) + y, draw for X in [x-1.6, x+1.6]
  const t1 = toSvg(x - 1.6, y + slope * -1.6)
  const t2 = toSvg(x + 1.6, y + slope * 1.6)

  const targetPt = targetX !== undefined ? toSvg(targetX, f(targetX)) : null

  return (
    <div>
      <p className="text-sm text-slate-300">
        {prompt === 'explore' && (
          <>This curve is <span className="font-mono text-cyan-300">y = ¼x²</span>. Drag the dot. The dashed line is the <b>tangent</b> — its steepness is the <b>slope</b>, and that number IS the derivative at that point.</>
        )}
        {prompt === 'flat' && <>Challenge: drag the dot to where the curve is perfectly <b>flat</b> — where the slope reads 0.</>}
        {prompt === 'slope1' && <>Last one: find where the slope equals exactly <span className="font-mono text-cyan-300">1</span> (the tangent rises at 45°).</>}
      </p>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${VBW} ${VBH}`}
        className="mt-3 w-full touch-none select-none rounded-lg bg-slate-950"
        onPointerMove={(e) => drag && pointerX(e)}
        onPointerUp={() => setDrag(false)}
        onPointerLeave={() => setDrag(false)}
      >
        {/* axes */}
        <line x1={0} y1={OY} x2={VBW} y2={OY} stroke="#475569" strokeWidth={1.5} />
        <line x1={OX} y1={0} x2={OX} y2={VBH} stroke="#475569" strokeWidth={1.5} />
        {[-4, -3, -2, -1, 1, 2, 3, 4].map((gx) => (
          <line key={gx} x1={OX + gx * U} y1={OY - 4} x2={OX + gx * U} y2={OY + 4} stroke="#64748b" strokeWidth={1} />
        ))}
        {/* curve */}
        <path d={path} fill="none" stroke="#22d3ee" strokeWidth={2.5} />
        {/* target marker */}
        {targetPt && !solved && (
          <circle cx={targetPt.px} cy={targetPt.py} r={12} fill="none" stroke="#fbbf24" strokeWidth={2} strokeDasharray="3 3" />
        )}
        {/* tangent */}
        {/* var(--color-slate-200) flips with the theme so the tangent stays visible on light backgrounds */}
        <line x1={t1.px} y1={t1.py} x2={t2.px} y2={t2.py} stroke="var(--color-slate-200)" strokeWidth={2} strokeDasharray="5 4" />
        {/* point */}
        <circle
          cx={pt.px}
          cy={pt.py}
          r={10}
          fill="#22d3ee"
          fillOpacity={0.3}
          stroke="#22d3ee"
          strokeWidth={2.5}
          className="cursor-grab"
          onPointerDown={(e) => {
            try {
              ;(e.target as Element).setPointerCapture?.(e.pointerId)
            } catch {
              /* capture may be rejected; drag still works via svg listener */
            }
            setDrag(true)
          }}
        />
      </svg>

      <div className="mt-2 flex items-center justify-center gap-6 font-mono text-sm">
        <span className="text-slate-400">x = <span className="font-bold text-slate-100">{x}</span></span>
        <span className="text-slate-400">
          slope = <span className={`font-bold ${solved ? 'text-emerald-300' : 'text-cyan-300'}`}>{slope.toFixed(2)}</span>
        </span>
      </div>

      {prompt === 'explore' ? (
        <p className="mt-2 text-center text-xs text-slate-500">
          See how the slope is negative on the left (going down), zero at the bottom, positive on the right? That’s the derivative changing.
        </p>
      ) : solved ? (
        <div className="mt-2 text-center">
          <p className="text-sm font-semibold text-emerald-300">
            {prompt === 'flat'
              ? '🎯 At x = 0 the slope is 0 — the derivative is zero exactly where the curve turns around. That’s how you find peaks and valleys.'
              : '🎯 Slope 1 at x = 2. You just read a derivative off a graph by eye — the core skill of calculus.'}
          </p>
          <button onClick={onSolved} className="mt-3 rounded-lg bg-cyan-500 px-5 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400">
            Continue →
          </button>
        </div>
      ) : (
        <p className="mt-2 text-center text-xs text-slate-500">Drag the dot onto the gold circle.</p>
      )}

      {prompt === 'explore' && (
        <div className="mt-2 text-center">
          <button onClick={onSolved} className="rounded-lg bg-cyan-500 px-5 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400">
            Challenge me →
          </button>
        </div>
      )}
    </div>
  )
}
