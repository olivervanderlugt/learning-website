import { useEffect, useState } from 'react'

const VREF = 5 // volts full-scale
const BITS = 3 // 3-bit ADC → 8 levels
const LEVELS = 2 ** BITS // 8

/**
 * Analog-to-digital conversion: drag a continuous sensor voltage and watch it
 * snap to one of 8 digital levels (3 bits). Bridges the sensor world to bits.
 */
export default function AdcSim({ onComplete }: { onComplete: (score: number) => void }) {
  const [volts, setVolts] = useState(2.4)
  const [seenLevels, setSeenLevels] = useState<Set<number>>(new Set())
  const [done, setDone] = useState(false)

  // quantize
  const step = VREF / (LEVELS - 1)
  const digital = Math.round(volts / step) // 0..7
  const bin = digital.toString(2).padStart(BITS, '0')
  const quantized = digital * step

  const onChange = (v: number) => {
    setVolts(v)
    const d = Math.round(v / step)
    setSeenLevels((prev) => {
      if (prev.has(d)) return prev
      const next = new Set(prev)
      next.add(d)
      return next
    })
  }

  // Fire completion from an effect, latched — calling onComplete inside the
  // setState updater double-fires under StrictMode and re-fires on every
  // slider move once all levels are seen.
  useEffect(() => {
    if (!done && seenLevels.size >= LEVELS) {
      setDone(true)
      onComplete(1)
    }
  }, [seenLevels, done, onComplete])

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <p className="text-sm text-slate-300">
        A sensor outputs a smooth analog voltage, but the CPU only understands bits. An ADC (analog-to-digital converter)
        snaps the voltage to the nearest of {LEVELS} levels ({BITS} bits). Sweep the slider through all {LEVELS} levels.
      </p>

      <svg viewBox="0 0 440 160" className="mt-4 w-full rounded-lg bg-slate-950">
        {/* level lines */}
        {Array.from({ length: LEVELS }, (_, i) => {
          const y = 140 - (i / (LEVELS - 1)) * 120
          const active = i === digital
          return (
            <g key={i}>
              <line x1={40} y1={y} x2={400} y2={y} stroke={active ? '#fb7185' : '#1e293b'} strokeWidth={active ? 2 : 1} />
              <text x={10} y={y + 4} fontSize={10} fill={active ? '#fb7185' : '#475569'} fontFamily="monospace">
                {i.toString(2).padStart(BITS, '0')}
              </text>
            </g>
          )
        })}
        {/* true analog value marker */}
        {(() => {
          const yTrue = 140 - (volts / VREF) * 120
          const yQ = 140 - (quantized / VREF) * 120
          return (
            <g>
              <line x1={40} y1={yTrue} x2={400} y2={yTrue} stroke="#22d3ee" strokeWidth={1.5} strokeDasharray="4 3" />
              <text x={405} y={yTrue + 4} fontSize={10} fill="#22d3ee" fontFamily="monospace">{volts.toFixed(2)}V</text>
              <circle cx={220} cy={yQ} r={6} fill="#fb7185" />
            </g>
          )
        })()}
      </svg>

      <input type="range" min={0} max={VREF} step={0.01} value={volts} onChange={(e) => onChange(+e.target.value)} className="mt-3 w-full accent-rose-400" />

      <div className="mt-3 flex items-center justify-center gap-6 font-mono text-sm">
        <span className="text-slate-400">analog: <span className="font-bold text-cyan-300">{volts.toFixed(2)} V</span></span>
        <span className="text-slate-400">→ digital: <span className="font-bold text-rose-300">{bin}</span> ({digital})</span>
      </div>

      <p className="mt-2 text-center text-xs text-slate-500">
        Levels reached: {seenLevels.size}/{LEVELS}. Notice the cyan (true) and rose (stored) values rarely match exactly —
        that gap is quantization error, and more bits shrink it.
      </p>
      {seenLevels.size >= LEVELS && (
        <p className="mt-1 text-center text-sm font-semibold text-emerald-300">
          🎉 All 8 levels — remember “Speaking in Switches”? 3 bits = 8 values, right here in a real sensor. A 12-bit ADC
          would give 4096 levels for a far smoother reading.
        </p>
      )}
    </div>
  )
}
