import { useState } from 'react'
import { motion } from 'motion/react'

interface Instr {
  text: string
  meaning: string
  exec: (r: Record<string, number>) => Record<string, number>
}

const PROGRAM: Instr[] = [
  {
    text: 'LOAD R1, 2',
    meaning: 'put the number 2 into register R1',
    exec: (r) => ({ ...r, R1: 2 }),
  },
  {
    text: 'LOAD R2, 3',
    meaning: 'put the number 3 into register R2',
    exec: (r) => ({ ...r, R2: 3 }),
  },
  {
    text: 'ADD R3, R1, R2',
    meaning: 'send R1 and R2 through the adder circuit, store the result in R3',
    exec: (r) => ({ ...r, R3: r.R1 + r.R2 }),
  },
]

const PHASES = ['fetch', 'decode', 'execute'] as const
type Phase = (typeof PHASES)[number]

const phaseBlurb: Record<Phase, string> = {
  fetch: 'The CPU reads the instruction that the program counter (PC) points at.',
  decode: 'Control circuits work out WHAT the instruction asks for.',
  execute: 'The hardware does it — registers change. Then PC moves to the next line.',
}

/** Step through fetch-decode-execute for a 3-instruction program. */
export default function CpuSim({ onComplete }: { onComplete: (score: number) => void }) {
  const [pc, setPc] = useState(0)
  const [phaseIdx, setPhaseIdx] = useState(-1) // -1 = not started
  const [regs, setRegs] = useState<Record<string, number>>({ R1: 0, R2: 0, R3: 0 })
  const [done, setDone] = useState(false)

  const phase: Phase | null = phaseIdx >= 0 ? PHASES[phaseIdx % 3] : null

  const tick = () => {
    if (done) return
    const next = phaseIdx + 1
    const nextPhase = PHASES[next % 3]
    if (nextPhase === 'execute') {
      setRegs(PROGRAM[pc].exec)
    }
    // after execute completes, advance PC on the following tick
    if (phase === 'execute') {
      if (pc === PROGRAM.length - 1) {
        setDone(true)
        onComplete(1)
        return
      }
      setPc(pc + 1)
    }
    setPhaseIdx(next)
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
      <p className="text-sm text-slate-300">
        A 3-line program that computes 2 + 3. Click the clock — every click is one phase of the
        cycle. Watch PC and the registers.
      </p>

      <div className="mt-4 flex gap-4">
        <div className="flex-1 rounded-lg border border-slate-800 bg-slate-950 p-3 font-mono text-sm">
          {PROGRAM.map((ins, i) => (
            <div
              key={i}
              className={`rounded px-2 py-1.5 ${
                i === pc && phaseIdx >= 0 && !done
                  ? 'bg-cyan-500/15 text-cyan-200'
                  : i < pc || done
                    ? 'text-slate-600 line-through decoration-slate-700'
                    : 'text-slate-400'
              }`}
            >
              {i === pc && phaseIdx >= 0 && !done && '▶ '}
              {ins.text}
            </div>
          ))}
        </div>

        <div className="w-40 space-y-2">
          <Reg name="PC" value={done ? '—' : pc} highlight={phase === 'fetch'} />
          {Object.entries(regs).map(([name, v]) => (
            <Reg key={name} name={name} value={v} highlight={phase === 'execute' && PROGRAM[pc]?.text.includes(name.replace('R', 'R'))} />
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        {PHASES.map((p) => (
          <span
            key={p}
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
              phase === p && !done
                ? 'bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400'
                : 'bg-slate-800 text-slate-500'
            }`}
          >
            {p}
          </span>
        ))}
      </div>

      {phase && !done && (
        <motion.p
          key={phaseIdx}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-sm text-slate-300"
        >
          <b className="capitalize text-cyan-300">{phase}:</b> {phaseBlurb[phase]}
          {phase === 'decode' && (
            <span className="text-slate-400"> Here: “{PROGRAM[pc].meaning}”.</span>
          )}
        </motion.p>
      )}

      <div className="mt-4 text-center">
        {done ? (
          <p className="text-sm font-semibold text-emerald-300">
            🎉 R3 = 5. Nine clock ticks, one addition — a real CPU does billions of these ticks per
            second, which is the only reason computers feel “smart”.
          </p>
        ) : (
          <button
            onClick={tick}
            className="rounded-lg bg-cyan-500 px-6 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400 active:scale-95"
          >
            {phaseIdx < 0 ? 'Power on ⏻' : '⏱ Tick the clock'}
          </button>
        )}
      </div>
    </div>
  )
}

function Reg({ name, value, highlight }: { name: string; value: number | string; highlight?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg border px-3 py-1.5 font-mono text-sm transition ${
        highlight ? 'border-amber-400 bg-amber-500/10 text-amber-200' : 'border-slate-800 bg-slate-950 text-slate-300'
      }`}
    >
      <span className="text-xs text-slate-500">{name}</span>
      <motion.span key={String(value)} initial={{ scale: 1.4 }} animate={{ scale: 1 }} className="font-black">
        {value}
      </motion.span>
    </div>
  )
}
