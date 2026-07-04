import { useEffect, useRef, useState } from 'react'

// Simulation constants
const DT = 0.02
const STEPS = 400 // 8 seconds
const TARGET = 6 // setpoint (on a 0..10 position scale)
const GRAVITY = 2.5 // constant downward disturbance the controller must fight
const DRAG = 0.8
const TOL = 0.5 // settle tolerance around the setpoint

const W = 440
const H = 220
const PAD = 30

type Traj = { p: number; err: number }[]

/** Simulate the full trajectory deterministically for given gains. */
function simulate(Kp: number, Ki: number, Kd: number): Traj {
  let p = 0
  let v = 0
  let integral = 0
  let prevErr = TARGET
  const out: Traj = []
  for (let i = 0; i < STEPS; i++) {
    const err = TARGET - p
    integral += err * DT
    integral = Math.max(-20, Math.min(20, integral)) // anti-windup clamp
    const deriv = (err - prevErr) / DT
    prevErr = err
    const control = Kp * err + Ki * integral + Kd * deriv
    const a = control - GRAVITY - DRAG * v
    v += a * DT
    p += v * DT
    p = Math.max(-1, Math.min(11, p))
    out.push({ p, err })
  }
  return out
}

const xFor = (i: number) => PAD + (i / (STEPS - 1)) * (W - PAD - 10)
const yFor = (p: number) => H - PAD - (p / 10) * (H - 2 * PAD)

export default function PidSim({ onComplete }: { onComplete: (score: number) => void }) {
  const [Kp, setKp] = useState(1)
  const [Ki, setKi] = useState(0)
  const [Kd, setKd] = useState(0)
  const [traj, setTraj] = useState<Traj | null>(null)
  const [frame, setFrame] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [result, setResult] = useState<null | { settled: boolean; finalErr: number }>(null)
  const [solved, setSolved] = useState(false)
  const raf = useRef<number | null>(null)

  const run = () => {
    const t = simulate(Kp, Ki, Kd)
    setTraj(t)
    setFrame(0)
    setResult(null)
    setPlaying(true)
  }

  useEffect(() => {
    if (!playing || !traj) return
    const step = () => {
      setFrame((f) => {
        if (f >= STEPS - 1) {
          setPlaying(false)
          // evaluate: last 20% of run stays within tolerance of setpoint
          const tail = traj.slice(Math.floor(STEPS * 0.8))
          const settled = tail.every((s) => Math.abs(s.err) < TOL)
          const finalErr = traj[STEPS - 1].err
          setResult({ settled, finalErr })
          if (settled) setSolved(true)
          return f
        }
        raf.current = requestAnimationFrame(step)
        return f + 3 // ~3 sim steps per frame
      })
    }
    raf.current = requestAnimationFrame(step)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [playing, traj])

  useEffect(() => {
    if (solved) onComplete(1)
  }, [solved, onComplete])

  const shown = traj ? traj.slice(0, frame + 1) : []
  const tracePts = shown.map((s, i) => `${xFor(i)},${yFor(s.p)}`).join(' ')
  const dronePos = shown.length ? shown[shown.length - 1].p : 0

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <p className="text-sm text-slate-300">
        A thruster must hold its craft at the dashed target line, fighting constant gravity. Tune the three PID gains so it
        reaches the line and <b>stays</b> there — no endless bouncing, no falling short.
      </p>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full rounded-lg bg-slate-950">
        {/* setpoint */}
        <line x1={PAD} y1={yFor(TARGET)} x2={W - 10} y2={yFor(TARGET)} stroke="#fb7185" strokeWidth={1.5} strokeDasharray="5 4" />
        <text x={W - 8} y={yFor(TARGET) - 4} textAnchor="end" fontSize={10} fill="#fb7185">target</text>
        {/* tolerance band */}
        <rect x={PAD} y={yFor(TARGET + TOL)} width={W - PAD - 10} height={yFor(TARGET - TOL) - yFor(TARGET + TOL)} fill="#fb718522" />
        {/* baseline */}
        <line x1={PAD} y1={yFor(0)} x2={W - 10} y2={yFor(0)} stroke="#334155" strokeWidth={1} />
        {/* trace */}
        {shown.length > 1 && <polyline points={tracePts} fill="none" stroke="#22d3ee" strokeWidth={2} />}
        {/* drone */}
        {shown.length > 0 && <text x={xFor(shown.length - 1)} y={yFor(dronePos) + 6} textAnchor="middle" fontSize={18}>🚁</text>}
      </svg>

      <div className="mt-3 grid grid-cols-3 gap-3">
        <Gain label="P" hint="push toward target" value={Kp} setValue={setKp} max={10} color="accent-cyan-400" disabled={playing} />
        <Gain label="I" hint="erase steady offset" value={Ki} setValue={setKi} max={5} color="accent-violet-400" disabled={playing} />
        <Gain label="D" hint="damp oscillation" value={Kd} setValue={setKd} max={8} color="accent-emerald-400" disabled={playing} />
      </div>

      <div className="mt-3 flex items-center justify-center gap-3">
        <button onClick={run} disabled={playing} className="rounded-lg bg-rose-500 px-5 py-2 text-sm font-bold text-slate-950 hover:bg-rose-400 disabled:opacity-50">
          {playing ? 'Running…' : '▶ Run'}
        </button>
      </div>

      {result && !result.settled && (
        <div className="mt-3 rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm text-slate-300">
          {Math.abs(result.finalErr) > TOL && Ki === 0 ? (
            <>Falls short of the line — P alone can’t beat constant gravity (it settles where push balances weight). Add some <b className="text-violet-300">I</b> to erase that offset.</>
          ) : Kd < 1 ? (
            <>It’s oscillating around the target. Add some <b className="text-emerald-300">D</b> to damp the bouncing.</>
          ) : (
            <>Close! Nudge the gains — try P≈3, I≈1, D≈3 as a starting point.</>
          )}
        </div>
      )}
      {solved && (
        <div className="mt-3 rounded-lg border border-emerald-600/50 bg-emerald-500/5 p-3">
          <p className="text-sm font-semibold text-emerald-300">
            🎯 Locked on target and steady! That’s a tuned PID controller — P pushes toward the goal, I erases the leftover
            gap, D calms the overshoot. Every hovering drone runs this loop hundreds of times a second.
          </p>
        </div>
      )}
    </div>
  )
}

function Gain({
  label,
  hint,
  value,
  setValue,
  max,
  color,
  disabled,
}: {
  label: string
  hint: string
  value: number
  setValue: (v: number) => void
  max: number
  color: string
  disabled: boolean
}) {
  return (
    <label className="block text-sm">
      <span className="font-mono font-bold text-slate-200">{label}</span>
      <span className="ml-2 font-mono text-slate-400">{value.toFixed(1)}</span>
      <input type="range" min={0} max={max} step={0.5} value={value} disabled={disabled} onChange={(e) => setValue(+e.target.value)} className={`mt-1 w-full ${color}`} />
      <span className="text-[10px] text-slate-500">{hint}</span>
    </label>
  )
}
