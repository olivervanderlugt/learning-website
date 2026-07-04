import { useEffect, useState } from 'react'

const TARGET_I = 2 // amps target for the challenge

/**
 * Ohm's law circuit: V = I·R. Adjust voltage and resistance, watch current
 * and the bulb brightness respond. Challenge: dial in a target current.
 */
export default function OhmsLawSim({ onComplete }: { onComplete: (score: number) => void }) {
  const [volts, setVolts] = useState(6)
  const [ohms, setOhms] = useState(6)
  const current = volts / ohms // I = V / R
  const solved = Math.abs(current - TARGET_I) < 0.05
  const power = volts * current // P = V·I

  useEffect(() => {
    if (solved) onComplete(1)
  }, [solved, onComplete])

  // brightness 0..1 from current (cap at ~4A)
  const bright = Math.min(current / 4, 1)

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <p className="text-sm text-slate-300">
        Ohm’s law: <span className="font-mono text-amber-300">V = I·R</span>, so current is{' '}
        <span className="font-mono text-amber-300">I = V/R</span>. Voltage pushes, resistance resists. Dial the current to
        exactly <b>{TARGET_I} A</b> to light the bulb just right.
      </p>

      {/* circuit diagram */}
      <svg viewBox="0 0 440 180" className="mt-4 w-full rounded-lg bg-slate-950">
        {/* wires */}
        <path d="M60,140 L60,60 L200,60" fill="none" stroke="#475569" strokeWidth={3} />
        <path d="M240,60 L380,60 L380,140 L60,140" fill="none" stroke="#475569" strokeWidth={3} />
        {/* battery */}
        <line x1={60} y1={128} x2={60} y2={152} stroke="#fbbf24" strokeWidth={2} />
        <line x1={52} y1={132} x2={52} y2={148} stroke="#fbbf24" strokeWidth={4} />
        <text x={30} y={145} fontSize={11} fill="#fbbf24" fontFamily="monospace">{volts}V</text>
        {/* bulb */}
        <circle cx={220} cy={60} r={20} fill="#fbbf24" fillOpacity={bright} stroke="#fbbf24" strokeWidth={2} />
        <circle cx={220} cy={60} r={20} fill="none" stroke="#fbbf24" strokeWidth={2} />
        {bright > 0.05 && (
          <g stroke="#fde68a" strokeWidth={1.5} opacity={bright}>
            <line x1={220} y1={30} x2={220} y2={20} /><line x1={220} y1={90} x2={220} y2={100} />
            <line x1={190} y1={60} x2={180} y2={60} /><line x1={250} y1={60} x2={260} y2={60} />
          </g>
        )}
        {/* resistor (zigzag) on bottom wire */}
        <polyline points="200,140 210,132 220,148 230,132 240,148 250,132 260,140" fill="none" stroke="#34d399" strokeWidth={2.5} />
        <text x={205} y={168} fontSize={11} fill="#34d399" fontFamily="monospace">{ohms}Ω</text>
        {/* current flow dots */}
        {current > 0.05 &&
          [0, 1, 2, 3].map((k) => (
            <circle key={k} cx={90 + k * 30} cy={60} r={3} fill="#22d3ee">
              <animate attributeName="cx" values="90;380" dur={`${Math.max(0.4, 2 / current)}s`} repeatCount="indefinite" begin={`${k * 0.2}s`} />
            </circle>
          ))}
      </svg>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <label className="text-sm">
          <span className="text-slate-400">Voltage: <span className="font-mono font-bold text-amber-300">{volts} V</span></span>
          <input type="range" min={1} max={12} step={1} value={volts} onChange={(e) => setVolts(+e.target.value)} className="mt-1 w-full accent-amber-400" />
        </label>
        <label className="text-sm">
          <span className="text-slate-400">Resistance: <span className="font-mono font-bold text-emerald-300">{ohms} Ω</span></span>
          <input type="range" min={1} max={12} step={1} value={ohms} onChange={(e) => setOhms(+e.target.value)} className="mt-1 w-full accent-emerald-400" />
        </label>
      </div>

      <div className="mt-3 flex items-center justify-center gap-6 font-mono text-sm">
        <span className="text-slate-400">I = V/R = <span className={`font-bold ${solved ? 'text-emerald-300' : 'text-cyan-300'}`}>{current.toFixed(2)} A</span></span>
        <span className="text-slate-400">P = V·I = <span className="font-bold text-white">{power.toFixed(1)} W</span></span>
      </div>

      {solved ? (
        <p className="mt-3 text-center text-sm font-semibold text-emerald-300">
          🎯 {TARGET_I} A exactly! Notice many combos work — {volts}V ÷ {ohms}Ω = 2A, but so would 4V÷2Ω. Same law runs every
          motor, sensor and LED on a robot.
        </p>
      ) : (
        <p className="mt-2 text-center text-xs text-slate-500">
          {current > TARGET_I ? 'Too much current — raise resistance or lower voltage.' : current < TARGET_I ? 'Not enough — raise voltage or lower resistance.' : ''}
        </p>
      )}
    </div>
  )
}
