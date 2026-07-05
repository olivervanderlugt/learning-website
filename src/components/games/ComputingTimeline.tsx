import { useEffect, useMemo, useState } from 'react'

/**
 * Computing-history timeline: milestone cards appear shuffled with years hidden;
 * the learner repeatedly picks the EARLIEST remaining event. Correct picks snap
 * onto the timeline and reveal their year; wrong picks flash and count as a miss.
 * Completing the timeline fires onComplete (score = accuracy).
 */
interface Milestone {
  year: number
  title: string
  detail: string
}

const MILESTONES: Milestone[] = [
  { year: 1837, title: 'Babbage designs the Analytical Engine', detail: 'A programmable mechanical computer — on paper. Victorian engineering couldn’t finish it.' },
  { year: 1843, title: 'Ada Lovelace publishes the first algorithm', detail: 'Her notes on the Analytical Engine include a program for Bernoulli numbers — software before hardware existed.' },
  { year: 1936, title: 'Turing describes the universal machine', detail: 'One imagined machine that can compute anything computable — the blueprint of every computer since.' },
  { year: 1947, title: 'The transistor is invented at Bell Labs', detail: 'A tiny electrical switch with no moving parts — the raw material of every chip.' },
  { year: 1958, title: 'The integrated circuit', detail: 'Kilby (then Noyce) put many transistors on one sliver of silicon — the chip is born.' },
  { year: 1969, title: 'ARPANET sends its first message', detail: 'Two university computers link up; the message “LO” crashes mid-word. The internet has begun.' },
  { year: 1971, title: 'The first microprocessor (Intel 4004)', detail: 'A whole CPU on one chip — the moment computers could shrink into everything.' },
  { year: 1991, title: 'The World Wide Web goes public', detail: 'Berners-Lee’s pages + links + browsers turn the internet into a place anyone can use.' },
]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function ComputingTimeline({ onComplete }: { onComplete: (score: number) => void }) {
  const initialPool = useMemo(() => shuffle(MILESTONES), [])
  const [pool, setPool] = useState<Milestone[]>(initialPool)
  const [placed, setPlaced] = useState<Milestone[]>([])
  const [misses, setMisses] = useState(0)
  const [wrongYear, setWrongYear] = useState<number | null>(null)
  const [done, setDone] = useState(false)

  const pick = (m: Milestone) => {
    if (done) return
    const earliest = Math.min(...pool.map((p) => p.year))
    if (m.year === earliest) {
      setPool((prev) => prev.filter((p) => p.year !== m.year))
      setPlaced((prev) => [...prev, m])
      setWrongYear(null)
    } else {
      setMisses((n) => n + 1)
      setWrongYear(m.year)
    }
  }

  useEffect(() => {
    if (placed.length === MILESTONES.length && !done) {
      setDone(true)
      onComplete(Math.max(0.4, 1 - misses * 0.1))
    }
  }, [placed.length, done, misses, onComplete])

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <p className="text-sm text-slate-300">
        Build the timeline of computing. The years are hidden — tap the event you think comes{' '}
        <b>next</b> (earliest first). Wrong guesses flash red and cost a little score.
      </p>

      {/* Timeline of placed events */}
      <div className="mt-3 space-y-1.5">
        {placed.map((m) => (
          <div key={m.year} className="flex items-start gap-3 rounded-lg border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-2">
            <span className="mt-0.5 w-12 shrink-0 font-mono text-sm font-bold text-fuchsia-300">{m.year}</span>
            <div>
              <p className="text-sm font-semibold text-slate-100">{m.title}</p>
              <p className="text-xs text-slate-400">{m.detail}</p>
            </div>
          </div>
        ))}
        {placed.length === 0 && (
          <div className="rounded-lg border border-dashed border-slate-700 px-3 py-2 text-center text-xs text-slate-500">
            timeline starts here — pick the earliest event below
          </div>
        )}
      </div>

      {/* Pool of unplaced events */}
      {pool.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {pool.map((m) => (
            <button
              key={m.year}
              onClick={() => pick(m)}
              className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                wrongYear === m.year
                  ? 'border-red-500/60 bg-red-500/10 text-red-200'
                  : 'border-slate-700 bg-slate-800 text-slate-200 hover:border-fuchsia-500/50 hover:bg-slate-700'
              }`}
            >
              {m.title}
              {wrongYear === m.year && <span className="block text-xs text-red-300">not yet — something else came first</span>}
            </button>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>
          placed: <b className="text-slate-300">{placed.length}</b>/{MILESTONES.length}
        </span>
        <span>
          misses: <b className={misses > 0 ? 'text-red-300' : 'text-slate-300'}>{misses}</b>
        </span>
      </div>

      {done && (
        <p className="mt-2 text-center text-sm font-semibold text-emerald-300">
          🎉 Timeline complete{misses === 0 ? ' — flawless!' : ''}. Notice the shape: a century of
          mechanical dreams, then ideas (Turing), then hardware (transistor → chip → CPU), then
          connection (internet → web). Each layer stood on the previous one.
        </p>
      )}
    </div>
  )
}
