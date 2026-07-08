import { useEffect, useState } from 'react'

/**
 * Decimal↔binary drills with worked-example fading:
 * full worked example → completion step → independent, both directions.
 */
export default function BinaryConverter({ onComplete }: { onComplete: (score: number) => void }) {
  const [stage, setStage] = useState(0)
  const next = () => setStage(stage + 1)

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
      <div className="mb-4 flex gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded ${i <= stage ? 'bg-cyan-400' : 'bg-slate-700'}`}
          />
        ))}
      </div>

      {stage === 0 && <WorkedExample onNext={next} />}
      {stage === 1 && <CompletionStep onNext={next} />}
      {stage === 2 && <IndependentB2D onNext={next} />}
      {stage === 3 && <WorkedD2B onNext={next} />}
      {stage === 4 && <IndependentD2B onDone={() => onComplete(1)} />}
    </div>
  )
}

function Btn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400"
    >
      {children}
    </button>
  )
}

function NumberCheck({
  answer,
  onCorrect,
  placeholder,
}: {
  answer: number
  onCorrect: () => void
  placeholder: string
}) {
  const [val, setVal] = useState('')
  const [wrong, setWrong] = useState(false)
  const check = () => {
    if (parseInt(val.trim(), 10) === answer) onCorrect()
    else setWrong(true)
  }
  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <input
          value={val}
          onChange={(e) => {
            setVal(e.target.value)
            setWrong(false)
          }}
          onKeyDown={(e) => e.key === 'Enter' && check()}
          placeholder={placeholder}
          className="w-28 rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-center text-lg font-bold text-slate-100 outline-none focus:border-cyan-400"
        />
        <button
          onClick={check}
          className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400"
        >
          Check
        </button>
      </div>
      {wrong && (
        <p className="mt-2 text-sm text-rose-300">
          Not quite — add up only the place values above a <b>1</b>. Try again.
        </p>
      )}
    </div>
  )
}

function PlaceRow({ bits }: { bits: string }) {
  const places = [8, 4, 2, 1].slice(4 - bits.length)
  const all = bits.length > 4 ? [16, 8, 4, 2, 1].slice(5 - bits.length) : places
  return (
    <div className="mt-3 flex justify-center gap-2">
      {bits.split('').map((b, i) => (
        <div key={i} className="flex w-11 flex-col items-center gap-1">
          <span className="text-[11px] text-slate-500">{all[i]}s</span>
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-lg border text-lg font-black ${
              b === '1'
                ? 'border-cyan-400 bg-cyan-500/15 text-cyan-300'
                : 'border-slate-700 bg-slate-950 text-slate-600'
            }`}
          >
            {b}
          </span>
        </div>
      ))}
    </div>
  )
}

// Stage 0 — full worked example
function WorkedExample({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <p className="text-sm font-bold text-slate-200">📖 Worked example: what is 1011 in decimal?</p>
      <PlaceRow bits="1011" />
      <div className="mt-4 space-y-1 text-sm text-slate-300">
        <p>Each position has a value: 8, 4, 2, 1. Read which switches are ON:</p>
        <p className="font-mono text-cyan-300">1×8 + 0×4 + 1×2 + 1×1 = 8 + 2 + 1 = 11</p>
        <p>
          So <b>1011 = 11</b>. That’s the whole trick — every conversion works this way.
        </p>
      </div>
      <Btn onClick={onNext}>Your turn (guided) →</Btn>
    </div>
  )
}

// Stage 1 — completion step: learner finishes the worked example
function CompletionStep({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <p className="text-sm font-bold text-slate-200">✍️ Finish this one: what is 1101 in decimal?</p>
      <PlaceRow bits="1101" />
      <div className="mt-4 text-sm text-slate-300">
        <p>
          The ON positions are worth: <span className="font-mono text-cyan-300">8 + 4 + 0 + 1 = ?</span>
        </p>
      </div>
      <NumberCheck answer={13} onCorrect={onNext} placeholder="?" />
    </div>
  )
}

// Stage 2 — independent binary→decimal
function IndependentB2D({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <p className="text-sm font-bold text-slate-200">💪 All yours: what is 10110 in decimal?</p>
      <PlaceRow bits="10110" />
      <p className="mt-3 text-sm text-slate-400">No hints this time — you know the method.</p>
      <NumberCheck answer={22} onCorrect={onNext} placeholder="?" />
    </div>
  )
}

// Stage 3 — worked example, other direction
function WorkedD2B({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <p className="text-sm font-bold text-slate-200">📖 The other direction: 19 in binary?</p>
      <div className="mt-3 space-y-1 text-sm text-slate-300">
        <p>Greedy method: take the biggest power of 2 that fits, subtract, repeat.</p>
        <p className="font-mono text-cyan-300">19 − 16 = 3 → 3 − 2 = 1 → 1 − 1 = 0</p>
        <p>
          We used 16, 2 and 1 (not 8, not 4): <b className="font-mono">10011</b>
        </p>
      </div>
      <PlaceRow bits="10011" />
      <Btn onClick={onNext}>Last one — solo →</Btn>
    </div>
  )
}

// Stage 4 — independent decimal→binary via toggles
function IndependentD2B({ onDone }: { onDone: () => void }) {
  const PLACES = [16, 8, 4, 2, 1]
  const [bits, setBits] = useState([0, 0, 0, 0, 0])
  const [solved, setSolved] = useState(false)
  const value = bits.reduce((a, b, i) => a + b * PLACES[i], 0)

  // Functional update + derive the win from committed state — rapid clicks
  // otherwise race on the stale closure `bits`.
  const toggle = (i: number) => {
    if (solved) return
    setBits((prev) => prev.map((b, j) => (j === i ? 1 - b : b)))
  }
  useEffect(() => {
    if (!solved && value === 25) setSolved(true)
  }, [value, solved])

  return (
    <div>
      <p className="text-sm font-bold text-slate-200">
        💪 Flip the switches to write <span className="text-cyan-300">25</span> in binary.
      </p>
      <div className="mt-3 flex justify-center gap-2">
        {PLACES.map((p, i) => (
          <div key={p} className="flex flex-col items-center gap-1">
            <span className="text-[11px] text-slate-500">{p}s</span>
            <button
              onClick={() => toggle(i)}
              className={`flex h-12 w-11 items-center justify-center rounded-lg border-2 text-lg font-black transition ${
                bits[i]
                  ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                  : 'border-slate-700 bg-slate-950 text-slate-600 hover:border-slate-500'
              }`}
            >
              {bits[i]}
            </button>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-sm text-slate-400">
        Current value: <span className="font-bold text-slate-100">{value}</span>
      </p>
      {solved && (
        <div className="mt-3 text-center">
          <p className="text-sm font-semibold text-emerald-300">
            🎉 11001 — you now convert both directions. That’s the core skill of this whole node.
          </p>
          <Btn onClick={onDone}>Finish drills →</Btn>
        </div>
      )}
    </div>
  )
}
