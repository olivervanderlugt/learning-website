import { useEffect, useRef, useState } from 'react'

const TRACK = 440
const TARGET_V = 6 // m/s target for the challenge

/**
 * F = m·a made tangible: pick a force and mass, launch a cart, watch it
 * accelerate. Challenge: hit a target final speed (teaches a = F/m and v = a·t).
 */
export default function ForceSim({ onComplete }: { onComplete: (score: number) => void }) {
  const [force, setForce] = useState(4)
  const [mass, setMass] = useState(2)
  const [running, setRunning] = useState(false)
  const [t, setT] = useState(0) // seconds elapsed in current run
  const [x, setX] = useState(0) // metres travelled
  const [v, setV] = useState(0)
  const [best, setBest] = useState<number | null>(null)
  const [solved, setSolved] = useState(false)
  const raf = useRef<number | null>(null)

  const a = force / mass

  useEffect(() => {
    if (!running) return
    let last: number | null = null
    let elapsed = 0 // local accumulator — keeps the setState updaters pure
    // (scheduling rAF inside an updater multiplies frames under StrictMode).
    const RUN = 3 // simulate 3 seconds
    const tick = (ts: number) => {
      if (last === null) last = ts
      const dt = Math.min((ts - last) / 1000, 0.05)
      last = ts
      elapsed += dt
      if (elapsed >= RUN) {
        const finalV = a * RUN
        setT(RUN)
        setV(finalV)
        setBest(finalV)
        setRunning(false)
        if (Math.abs(finalV - TARGET_V) < 0.35) setSolved(true)
        return
      }
      setT(elapsed)
      setV(a * elapsed)
      setX(0.5 * a * elapsed * elapsed)
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [running, a])

  const launch = () => {
    setT(0)
    setX(0)
    setV(0)
    setSolved(false)
    setRunning(true)
  }

  // cart position on screen (cap distance for display)
  const maxX = 0.5 * a * 9 // distance if a were current & t=3
  const cartPx = Math.min((x / Math.max(maxX, 1)) * (TRACK - 60), TRACK - 60)

  useEffect(() => {
    if (solved) onComplete(1)
  }, [solved, onComplete])

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <p className="text-sm text-slate-300">
        Newton’s second law: <span className="font-mono text-amber-300">F = m·a</span>, so acceleration is{' '}
        <span className="font-mono text-amber-300">a = F/m</span>. Set a force and mass, launch the cart for 3 seconds,
        and try to reach exactly <b>{TARGET_V} m/s</b>.
      </p>

      {/* track */}
      <div className="relative mt-4 h-16 overflow-hidden rounded-lg bg-slate-950" style={{ width: '100%' }}>
        <div className="absolute inset-x-0 bottom-3 h-px bg-slate-700" />
        <div
          className="absolute bottom-1 text-2xl transition-none"
          style={{ left: `${cartPx}px` }}
        >
          🛒
        </div>
        <div className="absolute bottom-1 right-2 text-2xl">🚩</div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <label className="text-sm">
          <span className="text-slate-400">Force: <span className="font-mono font-bold text-amber-300">{force} N</span></span>
          <input type="range" min={1} max={12} step={1} value={force} disabled={running} onChange={(e) => setForce(+e.target.value)} className="mt-1 w-full accent-amber-400" />
        </label>
        <label className="text-sm">
          <span className="text-slate-400">Mass: <span className="font-mono font-bold text-amber-300">{mass} kg</span></span>
          <input type="range" min={1} max={6} step={1} value={mass} disabled={running} onChange={(e) => setMass(+e.target.value)} className="mt-1 w-full accent-amber-400" />
        </label>
      </div>

      <div className="mt-3 flex items-center justify-center gap-6 font-mono text-sm">
        <span className="text-slate-400">a = F/m = <span className="font-bold text-slate-100">{a.toFixed(2)} m/s²</span></span>
        <span className="text-slate-400">t = <span className="font-bold text-slate-100">{t.toFixed(1)} s</span></span>
        <span className="text-slate-400">speed = <span className={`font-bold ${solved ? 'text-emerald-300' : 'text-amber-300'}`}>{v.toFixed(2)} m/s</span></span>
      </div>

      <div className="mt-3 text-center">
        <button
          onClick={launch}
          disabled={running}
          className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-bold text-slate-950 hover:bg-amber-400 disabled:opacity-50"
        >
          {running ? 'Running…' : '🚀 Launch (3 s)'}
        </button>
      </div>

      {best !== null && !solved && !running && (
        <p className="mt-2 text-center text-xs text-slate-500">
          Reached {best.toFixed(2)} m/s. To hit {TARGET_V} m/s in 3 s you need a = {(TARGET_V / 3).toFixed(1)} m/s² —
          so pick F and m with F/m = {(TARGET_V / 3).toFixed(1)}. (Try F=4, m=2.)
        </p>
      )}
      {solved && (
        <p className="mt-2 text-center text-sm font-semibold text-emerald-300">
          🎯 Bang on {TARGET_V} m/s! a = F/m = {a.toFixed(1)}, and speed built up as v = a·t. Heavier cart? You’d need
          more force for the same punch — exactly why robot motors are sized to their payload.
        </p>
      )}
    </div>
  )
}
