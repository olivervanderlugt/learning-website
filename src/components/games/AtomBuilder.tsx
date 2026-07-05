import { useEffect, useState } from 'react'

/**
 * Atom builder: add/remove protons and electrons, watch the element identity,
 * charge and electron shells update live. A series of build challenges
 * (neutral atoms, then ions) must be completed; onComplete fires after the last.
 * Shells use the simple 2/8/8 filling that's exact for elements 1–18.
 */
const ELEMENTS = [
  'Hydrogen', 'Helium', 'Lithium', 'Beryllium', 'Boron', 'Carbon', 'Nitrogen', 'Oxygen',
  'Fluorine', 'Neon', 'Sodium', 'Magnesium', 'Aluminium', 'Silicon', 'Phosphorus', 'Sulfur',
  'Chlorine', 'Argon',
] as const
const SYMBOLS = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'] as const

const SHELL_CAPS = [2, 8, 8]
const MAX = 18

interface Challenge {
  label: string
  protons: number
  electrons: number
  hint: string
}

const CHALLENGES: Challenge[] = [
  { label: 'Build a neutral helium atom (He)', protons: 2, electrons: 2, hint: 'Helium is element #2 — the proton count IS the element. Neutral means electrons match protons.' },
  { label: 'Build a neutral carbon atom (C)', protons: 6, electrons: 6, hint: 'Carbon is element #6. Watch the second shell start to fill after the first holds 2.' },
  { label: 'Build a lithium ion, Li⁺', protons: 3, electrons: 2, hint: 'Keep lithium’s 3 protons, but remove one electron: more + than −, so the atom carries a +1 charge.' },
  { label: 'Build an oxide ion, O²⁻', protons: 8, electrons: 10, hint: 'Oxygen’s 8 protons, but with 2 EXTRA electrons — a full outer shell of 8, and a 2− charge.' },
]

function shellsFor(electrons: number): number[] {
  const shells: number[] = []
  let left = electrons
  for (const cap of SHELL_CAPS) {
    if (left <= 0) break
    const n = Math.min(cap, left)
    shells.push(n)
    left -= n
  }
  return shells
}

export default function AtomBuilder({ onComplete }: { onComplete: (score: number) => void }) {
  const [protons, setProtons] = useState(1)
  const [electrons, setElectrons] = useState(1)
  const [challengeIdx, setChallengeIdx] = useState(0)
  const [solved, setSolved] = useState(false)
  const [done, setDone] = useState(false)

  const challenge = CHALLENGES[challengeIdx]
  const charge = protons - electrons
  const shells = shellsFor(electrons)

  // Challenge check: matched → brief "solved" state, then advance (or finish).
  useEffect(() => {
    if (done || solved || !challenge) return
    if (protons === challenge.protons && electrons === challenge.electrons) {
      setSolved(true)
    }
  }, [protons, electrons, challenge, solved, done])

  const next = () => {
    if (challengeIdx + 1 >= CHALLENGES.length) {
      setDone(true)
      onComplete(1)
    } else {
      setChallengeIdx((i) => i + 1)
      setSolved(false)
    }
  }

  const chargeLabel = charge === 0 ? 'neutral' : charge > 0 ? `${charge}+ ion` : `${-charge}− ion`
  const R = 100

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      {/* Challenge banner */}
      <div className={`rounded-lg border px-3 py-2 text-sm ${solved || done ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border-teal-500/40 bg-teal-500/10 text-teal-200'}`}>
        {done ? (
          <span className="font-semibold">🎉 All atoms built! Protons choose the element, electrons choose the charge.</span>
        ) : solved ? (
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold">✓ Correct — {challenge.label.replace('Build ', 'that’s ')}</span>
            <button onClick={next} className="shrink-0 rounded-md bg-emerald-500 px-2.5 py-1 text-xs font-bold text-slate-950 hover:bg-emerald-400">
              {challengeIdx + 1 >= CHALLENGES.length ? 'Finish' : 'Next challenge'}
            </button>
          </div>
        ) : (
          <>
            <span className="font-semibold">Challenge {challengeIdx + 1}/{CHALLENGES.length}:</span> {challenge.label}
            <p className="mt-0.5 text-xs opacity-70">{challenge.hint}</p>
          </>
        )}
      </div>

      {/* Atom display */}
      <div className="mt-3 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6">
        <svg viewBox={`${-R - 12} ${-R - 12} ${2 * R + 24} ${2 * R + 24}`} className="w-52 shrink-0">
          {/* shells */}
          {shells.map((count, si) => {
            const r = 36 + si * 26
            return (
              <g key={si}>
                <circle cx={0} cy={0} r={r} fill="none" stroke="#334155" strokeWidth={1} />
                {Array.from({ length: count }, (_, ei) => {
                  const a = (ei / count) * 2 * Math.PI - Math.PI / 2
                  return <circle key={ei} cx={r * Math.cos(a)} cy={r * Math.sin(a)} r={4.5} fill="#2dd4bf" />
                })}
              </g>
            )
          })}
          {/* nucleus */}
          <circle cx={0} cy={0} r={22} fill="#f43f5e" opacity={0.85} />
          <text x={0} y={-1} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">{protons}p</text>
          <text x={0} y={11} textAnchor="middle" fontSize={9} fill="#ffe4e6">nucleus</text>
        </svg>

        <div className="text-center sm:text-left">
          <p className="font-mono text-3xl font-bold text-teal-300">
            {SYMBOLS[protons - 1]}
            {charge !== 0 && (
              <sup className="text-base text-amber-300">{Math.abs(charge) > 1 ? Math.abs(charge) : ''}{charge > 0 ? '+' : '−'}</sup>
            )}
          </p>
          <p className="text-sm text-slate-300">{ELEMENTS[protons - 1]} — element #{protons}</p>
          <p className={`text-sm ${charge === 0 ? 'text-slate-400' : 'text-amber-300'}`}>{chargeLabel}</p>
          <p className="mt-1 font-mono text-xs text-slate-500">shells: {shells.join(', ') || '0'}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-slate-700 bg-slate-800/60 p-2 text-center">
          <p className="text-xs font-semibold text-rose-300">protons (nucleus)</p>
          <div className="mt-1 flex items-center justify-center gap-3">
            <button onClick={() => setProtons((p) => Math.max(1, p - 1))} className="h-8 w-8 rounded-lg border border-slate-600 bg-slate-800 font-bold text-slate-200 hover:bg-slate-700">−</button>
            <span className="w-8 font-mono text-lg font-bold text-slate-100">{protons}</span>
            <button onClick={() => setProtons((p) => Math.min(MAX, p + 1))} className="h-8 w-8 rounded-lg border border-slate-600 bg-slate-800 font-bold text-slate-200 hover:bg-slate-700">+</button>
          </div>
        </div>
        <div className="rounded-lg border border-slate-700 bg-slate-800/60 p-2 text-center">
          <p className="text-xs font-semibold text-teal-300">electrons (shells)</p>
          <div className="mt-1 flex items-center justify-center gap-3">
            <button onClick={() => setElectrons((e) => Math.max(0, e - 1))} className="h-8 w-8 rounded-lg border border-slate-600 bg-slate-800 font-bold text-slate-200 hover:bg-slate-700">−</button>
            <span className="w-8 font-mono text-lg font-bold text-slate-100">{electrons}</span>
            <button onClick={() => setElectrons((e) => Math.min(MAX, e + 1))} className="h-8 w-8 rounded-lg border border-slate-600 bg-slate-800 font-bold text-slate-200 hover:bg-slate-700">+</button>
          </div>
        </div>
      </div>

      <p className="mt-2 text-center text-xs text-slate-500">
        Change protons → the ELEMENT changes. Change electrons → the CHARGE changes.
      </p>
    </div>
  )
}
