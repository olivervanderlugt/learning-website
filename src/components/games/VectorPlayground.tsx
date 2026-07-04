import { useRef, useState } from 'react'

// SVG plane setup
const VBW = 440
const VBH = 360
const OX = VBW / 2
const OY = VBH / 2
const U = 32 // px per unit
const XMAX = 6
const YMAX = 5

type Vec = { x: number; y: number }

const toSvg = (v: Vec) => ({ px: OX + v.x * U, py: OY - v.y * U })
const clampRound = (v: Vec): Vec => ({
  x: Math.max(-XMAX, Math.min(XMAX, Math.round(v.x * 2) / 2)),
  y: Math.max(-YMAX, Math.min(YMAX, Math.round(v.y * 2) / 2)),
})
const add = (a: Vec, b: Vec): Vec => ({ x: a.x + b.x, y: a.y + b.y })
const mag = (v: Vec) => Math.sqrt(v.x * v.x + v.y * v.y)
const dist = (a: Vec, b: Vec) => mag({ x: a.x - b.x, y: a.y - b.y })

const COL = { a: '#22d3ee', b: '#a78bfa', sum: '#34d399', target: '#fbbf24' }

/**
 * Interactive vector playground with three staged, guided-discovery challenges:
 * free explore → reach a target by vector addition → reach it by scaling.
 */
export default function VectorPlayground({ onComplete }: { onComplete: (score: number) => void }) {
  const [stage, setStage] = useState(0)
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <div className="mb-3 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`h-1 flex-1 rounded ${i <= stage ? 'bg-cyan-400' : 'bg-slate-700'}`} />
        ))}
      </div>
      {stage === 0 && <ExploreStage onNext={() => setStage(1)} />}
      {stage === 1 && <AddTargetStage onNext={() => setStage(2)} />}
      {stage === 2 && <ScaleStage onDone={() => onComplete(1)} />}
    </div>
  )
}

/** Shared plane renderer with draggable vector tips. */
function Plane({
  vectors,
  onDrag,
  extras,
  children,
}: {
  vectors: { key: string; v: Vec; color: string; from?: Vec; label: string; draggable?: boolean }[]
  onDrag?: (key: string, v: Vec) => void
  extras?: React.ReactNode
  children?: React.ReactNode
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dragKey, setDragKey] = useState<string | null>(null)

  const pointerToMath = (e: React.PointerEvent): Vec => {
    const rect = svgRef.current!.getBoundingClientRect()
    const px = (e.clientX - rect.left) * (VBW / rect.width)
    const py = (e.clientY - rect.top) * (VBH / rect.height)
    return clampRound({ x: (px - OX) / U, y: (OY - py) / U })
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VBW} ${VBH}`}
      className="w-full touch-none select-none rounded-lg bg-slate-950"
      onPointerMove={(e) => {
        if (dragKey && onDrag) onDrag(dragKey, pointerToMath(e))
      }}
      onPointerUp={() => setDragKey(null)}
      onPointerLeave={() => setDragKey(null)}
    >
      {/* grid */}
      {Array.from({ length: 2 * XMAX + 1 }, (_, i) => i - XMAX).map((gx) => (
        <line key={`vx${gx}`} x1={OX + gx * U} y1={0} x2={OX + gx * U} y2={VBH} stroke={gx === 0 ? '#475569' : '#1e293b'} strokeWidth={gx === 0 ? 1.5 : 1} />
      ))}
      {Array.from({ length: 2 * YMAX + 1 }, (_, i) => i - YMAX).map((gy) => (
        <line key={`hy${gy}`} x1={0} y1={OY - gy * U} x2={VBW} y2={OY - gy * U} stroke={gy === 0 ? '#475569' : '#1e293b'} strokeWidth={gy === 0 ? 1.5 : 1} />
      ))}
      <defs>
        {Object.entries(COL).map(([k, c]) => (
          <marker key={k} id={`arrow-${k}`} markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
            <path d="M0,0 L7,3 L0,6 Z" fill={c} />
          </marker>
        ))}
      </defs>

      {extras}

      {vectors.map(({ key, v, color, from, label, draggable }) => {
        const start = from ? toSvg(from) : { px: OX, py: OY }
        const end = toSvg(from ? add(from, v) : v)
        const markerKey = color === COL.a ? 'a' : color === COL.b ? 'b' : color === COL.sum ? 'sum' : 'target'
        return (
          <g key={key}>
            <line x1={start.px} y1={start.py} x2={end.px} y2={end.py} stroke={color} strokeWidth={3} markerEnd={`url(#arrow-${markerKey})`} />
            <text x={end.px + 8} y={end.py - 8} fill={color} fontSize={13} fontWeight={700} fontFamily="monospace">
              {label}
            </text>
            {draggable && (
              <circle
                cx={end.px}
                cy={end.py}
                r={11}
                fill={color}
                fillOpacity={0.25}
                stroke={color}
                strokeWidth={2}
                className="cursor-grab"
                onPointerDown={(e) => {
                  try {
                    ;(e.target as Element).setPointerCapture?.(e.pointerId)
                  } catch {
                    /* some environments/pointers reject capture — drag still works via svg listener */
                  }
                  setDragKey(key)
                }}
              />
            )}
          </g>
        )
      })}
      {children}
    </svg>
  )
}

function Btn({ onClick, children, disabled }: { onClick: () => void; children: React.ReactNode; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mt-3 rounded-lg bg-cyan-500 px-5 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  )
}

// Stage 0 — free exploration of vector addition (tip-to-tail)
function ExploreStage({ onNext }: { onNext: () => void }) {
  const [a, setA] = useState<Vec>({ x: 3, y: 1 })
  const [b, setB] = useState<Vec>({ x: 1, y: 2 })
  const sum = add(a, b)

  return (
    <div>
      <p className="text-sm text-slate-300">
        A vector is an arrow: a direction and a length. Drag the <span className="font-bold" style={{ color: COL.a }}>A</span> and{' '}
        <span className="font-bold" style={{ color: COL.b }}>B</span> tips. Watch how <span className="font-bold" style={{ color: COL.sum }}>A+B</span>{' '}
        is B laid tip-to-tail after A.
      </p>
      <div className="mt-3">
        <Plane
          onDrag={(k, v) => (k === 'a' ? setA(v) : setB(v))}
          vectors={[
            { key: 'a', v: a, color: COL.a, label: 'A', draggable: true },
            { key: 'b', v: b, color: COL.b, from: a, label: 'B', draggable: false },
            { key: 'bh', v: b, color: COL.b, label: 'B', draggable: true },
            { key: 'sum', v: sum, color: COL.sum, label: 'A+B' },
          ]}
        />
      </div>
      <p className="mt-2 text-center font-mono text-sm text-slate-400">
        ({a.x}, {a.y}) + ({b.x}, {b.y}) = <span className="font-bold text-emerald-300">({sum.x}, {sum.y})</span>
      </p>
      <p className="mt-1 text-center text-xs text-slate-500">Notice: you add vectors by adding their x’s and their y’s. That’s the whole rule.</p>
      <Btn onClick={onNext}>Got the idea — challenge me →</Btn>
    </div>
  )
}

// Stage 1 — reach a target purely by vector addition
function AddTargetStage({ onNext }: { onNext: () => void }) {
  const target: Vec = { x: -3, y: 3 }
  const [a, setA] = useState<Vec>({ x: 2, y: 0 })
  const [b, setB] = useState<Vec>({ x: 0, y: -2 })
  const sum = add(a, b)
  const hit = dist(sum, target) < 0.35

  return (
    <div>
      <p className="text-sm text-slate-300">
        Your robot must travel from the origin to the <span className="font-bold" style={{ color: COL.target }}>gold star</span> at (-3, 3) — but only in
        two hops. Drag A and B so <span className="font-bold" style={{ color: COL.sum }}>A+B</span> lands on the star. (Many answers work!)
      </p>
      <div className="mt-3">
        <Plane
          onDrag={(k, v) => (k === 'a' ? setA(v) : setB(v))}
          extras={
            <g>
              <circle cx={toSvg(target).px} cy={toSvg(target).py} r={13} fill="none" stroke={COL.target} strokeWidth={2} strokeDasharray="3 3" />
              <text x={toSvg(target).px} y={toSvg(target).py + 5} textAnchor="middle" fontSize={16}>⭐</text>
            </g>
          }
          vectors={[
            { key: 'a', v: a, color: COL.a, label: 'A', draggable: true },
            { key: 'bh', v: b, color: COL.b, label: 'B', draggable: true },
            { key: 'sum', v: sum, color: COL.sum, label: 'A+B' },
          ]}
        />
      </div>
      <p className="mt-2 text-center font-mono text-sm text-slate-400">
        A+B = ({sum.x}, {sum.y}) &nbsp;·&nbsp; target (-3, 3)
      </p>
      {hit ? (
        <div className="mt-2 text-center">
          <p className="text-sm font-semibold text-emerald-300">🎯 Landed it! Any A and B whose components sum to (-3, 3) works — that’s the freedom vectors give you.</p>
          <Btn onClick={onNext}>Next: scaling →</Btn>
        </div>
      ) : (
        <p className="mt-2 text-center text-xs text-slate-500">Keep dragging — get the green A+B arrowhead onto the star.</p>
      )}
    </div>
  )
}

// Stage 2 — scale a fixed-direction vector to reach a target on its line
function ScaleStage({ onDone }: { onDone: () => void }) {
  const dir: Vec = { x: 2, y: 1 } // base direction
  const target: Vec = { x: 5, y: 2.5 } // = 2.5 * dir
  const [s, setS] = useState(1)
  const scaled = { x: dir.x * s, y: dir.y * s }
  const hit = dist(scaled, target) < 0.3
  const [done, setDone] = useState(false)
  if (hit && !done) setDone(true)

  return (
    <div>
      <p className="text-sm text-slate-300">
        Scaling multiplies a vector’s length without changing its direction. The base arrow points along (2, 1). Slide to scale it until it reaches the{' '}
        <span className="font-bold" style={{ color: COL.target }}>star</span>.
      </p>
      <div className="mt-3">
        <Plane
          vectors={[{ key: 's', v: scaled, color: COL.a, label: `${s}·(2,1)` }]}
          extras={
            <g>
              <circle cx={toSvg(target).px} cy={toSvg(target).py} r={13} fill="none" stroke={COL.target} strokeWidth={2} strokeDasharray="3 3" />
              <text x={toSvg(target).px} y={toSvg(target).py + 5} textAnchor="middle" fontSize={16}>⭐</text>
            </g>
          }
        />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span className="text-sm text-slate-400">scale</span>
        <input type="range" min={-1} max={3} step={0.5} value={s} onChange={(e) => setS(parseFloat(e.target.value))} className="flex-1 accent-cyan-400" />
        <span className="w-10 text-right font-mono text-sm font-bold text-cyan-300">{s}×</span>
      </div>
      <p className="mt-1 text-center font-mono text-xs text-slate-500">
        {s}·(2, 1) = ({scaled.x}, {scaled.y})
      </p>
      {done && (
        <div className="mt-2 text-center">
          <p className="text-sm font-semibold text-emerald-300">
            🎉 2.5× hits the star. Negative scales flip the arrow around — that’s all a “−1” does geometrically.
          </p>
          <Btn onClick={onDone}>Finish playground →</Btn>
        </div>
      )}
    </div>
  )
}
