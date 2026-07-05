import { useEffect, useState } from 'react'

/**
 * Big-O growth explorer: a log-scale slider for n drives live operation counts
 * for O(1)..O(n²) against a fixed 1M-ops-per-tick budget. Three questions must
 * be answered by exploring the slider; onComplete fires after the last
 * (score = fraction answered right on the first try).
 */
const BUDGET = 1_000_000

interface Fam {
  label: string
  ops: (n: number) => number
  color: string
}

const FAMILIES: Fam[] = [
  { label: 'O(1)', ops: () => 1, color: '#34d399' },
  { label: 'O(log n)', ops: (n) => Math.max(1, Math.ceil(Math.log2(n))), color: '#2dd4bf' },
  { label: 'O(n)', ops: (n) => n, color: '#22d3ee' },
  { label: 'O(n log n)', ops: (n) => Math.ceil(n * Math.max(1, Math.log2(n))), color: '#a78bfa' },
  { label: 'O(n²)', ops: (n) => n * n, color: '#fb7185' },
]

interface Q {
  question: string
  options: string[]
  correctIndex: number
  explain: string
}

const QUESTIONS: Q[] = [
  {
    question: 'Slide n up to 1,000,000 (a big warehouse map). Which families still fit in the 1M-ops budget?',
    options: ['O(1), O(log n) and O(n) — the rest blow past it', 'All of them', 'Only O(1)', 'O(n²) fits, O(log n) doesn’t'],
    correctIndex: 0,
    explain: 'At n = 1M: O(1)=1 op, O(log n)=20 ops, O(n)=1M ops (just fits), O(n log n)≈20M, O(n²)=1,000,000,000,000. The n² algorithm needs a trillion operations — a million times over budget.',
  },
  {
    question: 'Find (roughly) the largest n where O(n²) still fits the budget. Where does it give out?',
    options: ['Around n ≈ 1,000', 'Around n ≈ 500,000', 'Around n ≈ 1,000,000', 'It never exceeds the budget'],
    correctIndex: 0,
    explain: 'n² = 1M exactly when n = 1,000. That’s the brutal truth of quadratic growth: a million-op budget buys you only a thousand items. Doubling the budget buys just 41% more n (√2), not twice as much.',
  },
  {
    question: 'Now the punchline: slide from n = 1,000 to n = 1,000,000. How did O(log n) change?',
    options: ['From ~10 to ~20 ops — a 1000× bigger problem cost 2× the work', 'It grew 1000×, like the problem', 'It stayed exactly the same', 'It grew about 100×'],
    correctIndex: 0,
    explain: 'log₂(1,000) ≈ 10 and log₂(1,000,000) ≈ 20. Every DOUBLING of n adds just one operation. That’s why binary search and tree lookups feel free at any scale — and why sorted data is such a superpower.',
  },
]

const fmt = (x: number) =>
  x >= 1e12 ? (x / 1e12).toFixed(1) + ' trillion' : x >= 1e9 ? (x / 1e9).toFixed(1) + ' billion' : x >= 1e6 ? (x / 1e6).toFixed(1) + 'M' : x >= 1e3 ? (x / 1e3).toFixed(1) + 'k' : String(Math.round(x))

export default function BigORace({ onComplete }: { onComplete: (score: number) => void }) {
  const [exp, setExp] = useState(1) // n = 10^exp, slider 0..6
  const [qIdx, setQIdx] = useState(0)
  const [choice, setChoice] = useState<number | null>(null)
  const [firstTryRight, setFirstTryRight] = useState(0)
  const [tried, setTried] = useState(false)
  const [done, setDone] = useState(false)

  const n = Math.round(10 ** exp)
  const q = QUESTIONS[qIdx]

  const pick = (i: number) => {
    if (choice !== null || done) return
    if (i === q.correctIndex) {
      setChoice(i)
      if (!tried) setFirstTryRight((c) => c + 1)
    } else {
      setTried(true)
      setChoice(i)
    }
  }

  const next = () => {
    if (choice !== q.correctIndex) {
      setChoice(null) // wrong answer: explanation seen, try again
      return
    }
    if (qIdx + 1 >= QUESTIONS.length) setDone(true)
    else {
      setQIdx((i) => i + 1)
      setChoice(null)
      setTried(false)
    }
  }

  useEffect(() => {
    if (done) onComplete(Math.max(0.5, firstTryRight / QUESTIONS.length))
  }, [done, firstTryRight, onComplete])

  // log-scale bar widths: 1 op → 0%, 10^12 ops → 100%
  const width = (ops: number) => Math.min(100, (Math.log10(Math.max(1, ops)) / 12) * 100)
  const budgetX = width(BUDGET)

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <p className="text-sm text-slate-300">
        Your robot’s planner gets a budget of <b>1 million operations</b> per control tick. Drag{' '}
        <b>n</b> (problem size) and watch which algorithm families survive.
      </p>

      <div className="mt-3 flex items-center gap-3">
        <span className="font-mono text-xs text-slate-400">n =</span>
        <input
          type="range"
          min={0}
          max={6}
          step={0.05}
          value={exp}
          onChange={(e) => setExp(Number(e.target.value))}
          className="w-full accent-cyan-400"
        />
        <span className="w-24 shrink-0 text-right font-mono text-sm font-bold text-cyan-300">{fmt(n)}</span>
      </div>

      {/* bars (log scale) */}
      <div className="relative mt-3 space-y-1.5 rounded-lg bg-slate-950 p-3">
        {/* budget line */}
        <div className="absolute bottom-2 top-2 w-px border-l border-dashed border-amber-400/70" style={{ left: `calc(5.5rem + (100% - 6.5rem) * ${budgetX / 100})` }} />
        {FAMILIES.map((f) => {
          const ops = f.ops(n)
          const over = ops > BUDGET
          return (
            <div key={f.label} className="flex items-center gap-2">
              <span className="w-20 shrink-0 text-right font-mono text-xs text-slate-400">{f.label}</span>
              <div className="relative h-4 flex-1 overflow-hidden rounded bg-slate-800/60">
                <div
                  className="h-full rounded transition-all duration-150"
                  style={{ width: `${width(ops)}%`, background: over ? '#fb7185' : f.color, opacity: over ? 0.9 : 0.75 }}
                />
              </div>
              <span className={`w-20 shrink-0 font-mono text-[11px] ${over ? 'font-bold text-rose-300' : 'text-slate-400'}`}>{fmt(ops)}</span>
            </div>
          )
        })}
        <p className="pt-1 text-right font-mono text-[10px] text-amber-300/80">┆ budget (1M) — log scale</p>
      </div>

      {/* question flow */}
      {!done ? (
        <div className="mt-3 rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-3">
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Explore & answer {qIdx + 1}/{QUESTIONS.length}</p>
          <p className="mt-1 text-sm font-semibold text-slate-200">{q.question}</p>
          <div className="mt-2 space-y-1.5">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => pick(i)}
                disabled={choice === q.correctIndex}
                className={`block w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                  choice === i
                    ? i === q.correctIndex
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                      : 'border-rose-500 bg-rose-500/10 text-rose-200'
                    : 'border-slate-700 bg-slate-800 text-slate-200 hover:border-cyan-500/50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {choice !== null && (
            <div className="mt-2">
              {choice === q.correctIndex ? (
                <>
                  <p className="text-sm text-emerald-200">✓ {q.explain}</p>
                  <button onClick={next} className="mt-2 rounded-lg bg-cyan-500 px-4 py-1.5 text-sm font-bold text-slate-950 hover:bg-cyan-400">
                    {qIdx + 1 >= QUESTIONS.length ? 'Finish' : 'Next →'}
                  </button>
                </>
              ) : (
                <p className="text-sm text-rose-200">Not quite — move the slider and look at the numbers, then try again.</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <p className="mt-3 text-center text-sm font-semibold text-emerald-300">
          🎉 You’ve felt all three lessons of Big-O: quadratic dies young (n≈1,000), linear rides the
          budget line, and logarithmic barely notices a million. Choose the family BEFORE you write
          the code.
        </p>
      )}
    </div>
  )
}
