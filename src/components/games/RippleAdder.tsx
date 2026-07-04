import { useState } from 'react'
import { motion } from 'motion/react'

const PLACES = [8, 4, 2, 1]

type Bit = 0 | 1

/**
 * 4-bit ripple-carry adder: the learner enters two numbers with bit toggles,
 * then steps through the four full adders watching the carry ripple.
 */
export default function RippleAdder({ onComplete }: { onComplete: (score: number) => void }) {
  const [a, setA] = useState<Bit[]>([0, 1, 0, 1]) // 5
  const [b, setB] = useState<Bit[]>([0, 0, 1, 1]) // 3
  const [step, setStep] = useState(-1) // -1 = editing, 0..3 = adders done (right to left)
  const [finished, setFinished] = useState(false)

  const valA = a.reduce((s: number, bit, i) => s + bit * PLACES[i], 0)
  const valB = b.reduce((s: number, bit, i) => s + bit * PLACES[i], 0)

  // Compute all stages (index 0 = rightmost/ones column).
  const stages: { sum: Bit; cout: Bit }[] = []
  let carry: Bit = 0
  for (let col = 3; col >= 0; col--) {
    const x = a[col], y = b[col]
    const sum = ((x ^ y ^ carry) as Bit)
    const cout = ((x & y) | (carry & (x ^ y))) as Bit
    stages.push({ sum, cout })
    carry = cout
  }

  const editing = step < 0
  const toggle = (row: 'a' | 'b', i: number) => {
    if (!editing) return
    const set = row === 'a' ? setA : setB
    set((bits) => bits.map((v, j) => (j === i ? ((1 - v) as Bit) : v)) as Bit[])
  }

  const advance = () => {
    if (step < 3) {
      setStep(step + 1)
    } else if (!finished) {
      setFinished(true)
      onComplete(1)
    }
  }

  const sumBits = [3, 2, 1, 0].map((col) => (3 - col <= step ? stages[3 - col].sum : null))
  const finalCarry = step >= 3 ? stages[3].cout : null
  const total = valA + valB

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
      {editing ? (
        <p className="text-sm text-slate-300">
          Pick two numbers to add (toggle the bits), then watch four full adders — copies of the one
          you built — do it for real.
        </p>
      ) : (
        <p className="text-sm text-slate-300">
          Adders work <b>right to left</b>, exactly like you on paper — each one must wait for its
          neighbour’s carry. Step through the ripple.
        </p>
      )}

      <div className="mt-4 space-y-2 font-mono">
        <BitRow label="A" bits={a} onToggle={(i) => toggle('a', i)} editing={editing} dec={valA} />
        <BitRow label="B" bits={b} onToggle={(i) => toggle('b', i)} editing={editing} dec={valB} />
      </div>

      {!editing && (
        <>
          <div className="mt-4 flex items-center justify-center gap-1">
            {[0, 1, 2, 3].map((col) => {
              const stageIdx = 3 - col // rightmost first
              const done = stageIdx <= step
              const active = stageIdx === step
              return (
                <motion.div
                  key={col}
                  animate={active ? { scale: [1, 1.12, 1] } : {}}
                  className={`flex h-14 w-16 flex-col items-center justify-center rounded-lg border-2 text-[10px] font-bold ${
                    done
                      ? 'border-cyan-400 bg-cyan-500/15 text-cyan-300'
                      : 'border-slate-700 bg-slate-950 text-slate-500'
                  }`}
                >
                  FA{stageIdx}
                  <span className="text-[9px] font-normal">
                    {done ? `carry→${stages[stageIdx].cout}` : 'waiting'}
                  </span>
                </motion.div>
              )
            })}
          </div>
          <p className="mt-1 text-center text-[10px] text-slate-500">
            ← carries ripple this way (FA0 = ones column, computed first)
          </p>

          <div className="mt-3 flex items-center justify-center gap-2 font-mono">
            <span className="w-8 text-sm text-slate-400">=</span>
            <span
              className={`flex h-10 w-9 items-center justify-center rounded-lg border text-lg font-black ${
                finalCarry !== null
                  ? 'border-amber-400 bg-amber-500/15 text-amber-300'
                  : 'border-slate-800 text-slate-700'
              }`}
              title="final carry (16s place)"
            >
              {finalCarry ?? '·'}
            </span>
            {sumBits.map((s, i) => (
              <span
                key={i}
                className={`flex h-10 w-9 items-center justify-center rounded-lg border text-lg font-black ${
                  s !== null
                    ? 'border-cyan-400 bg-cyan-500/15 text-cyan-300'
                    : 'border-slate-800 text-slate-700'
                }`}
              >
                {s ?? '·'}
              </span>
            ))}
          </div>
        </>
      )}

      <div className="mt-5 text-center">
        {finished ? (
          <p className="text-sm font-semibold text-emerald-300">
            🎉 {valA} + {valB} = {total} — computed by nothing but the gates you built. Your laptop
            does this 64 bits wide, billions of times per second.
          </p>
        ) : (
          <button
            onClick={advance}
            className="rounded-lg bg-cyan-500 px-5 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400"
          >
            {editing ? `Add ${valA} + ${valB} →` : step < 3 ? `Step: run FA${step + 1} →` : 'Show the result →'}
          </button>
        )}
      </div>
    </div>
  )
}

function BitRow({
  label,
  bits,
  onToggle,
  editing,
  dec,
}: {
  label: string
  bits: Bit[]
  onToggle: (i: number) => void
  editing: boolean
  dec: number
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <span className="w-8 text-sm text-slate-400">{label}</span>
      <span className="w-9" />
      {bits.map((bit, i) => (
        <button
          key={i}
          onClick={() => onToggle(i)}
          disabled={!editing}
          className={`flex h-10 w-9 items-center justify-center rounded-lg border-2 text-lg font-black transition ${
            bit
              ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
              : 'border-slate-700 bg-slate-950 text-slate-600'
          } ${editing ? 'hover:border-slate-400' : 'opacity-80'}`}
        >
          {bit}
        </button>
      ))}
      <span className="w-10 text-right text-sm text-slate-400">= {dec}</span>
    </div>
  )
}
