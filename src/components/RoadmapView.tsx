import { useEffect } from 'react'
import { stages, futureSubjects, foldInNote } from '../content/roadmap'
import type { StageStatus } from '../content/roadmap'

const statusMeta: Record<StageStatus, { label: string; icon: string; badge: string; rail: string }> = {
  done: {
    label: 'Complete',
    icon: '✅',
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    rail: 'bg-emerald-400',
  },
  current: {
    label: 'Current frontier',
    icon: '🚧',
    badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40',
    rail: 'bg-cyan-400',
  },
  later: {
    label: 'Later',
    icon: '🔒',
    badge: 'bg-slate-700/40 text-slate-400 border-slate-600/40',
    rail: 'bg-slate-600',
  },
}

/** Preview / "coming soon" overview of the plan to grow to bachelor depth. */
export default function RoadmapView({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Roadmap"
      className="absolute inset-0 z-20 overflow-y-auto bg-slate-950/95 backdrop-blur"
    >
      <div className="mx-auto max-w-4xl px-5 py-8">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-100">
              The road to bachelor depth
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
              What you play now is the <span className="text-slate-200">breadth spine</span> — every
              subject has an on-ramp. This is the honest plan for turning it into genuinely
              bachelor-worthy depth, plus the subjects still to come. A preview so none of it gets
              lost.
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800"
          >
            ✕ Close
          </button>
        </div>

        {/* Stages */}
        <h2 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-500">
          Six stages to bachelor-worthy content
        </h2>
        <ol className="relative space-y-3 border-l border-slate-800 pl-6">
          {stages.map((s) => {
            const m = statusMeta[s.status]
            return (
              <li key={s.n} className="relative">
                {/* Timeline dot */}
                <span
                  className={`absolute -left-[31px] top-4 h-3 w-3 rounded-full ring-4 ring-slate-950 ${m.rail}`}
                />
                <div
                  className={`rounded-2xl border p-4 ${
                    s.status === 'later'
                      ? 'border-slate-800 bg-slate-900/40'
                      : 'border-slate-800 bg-slate-900/80'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">STAGE {s.n}</span>
                    <h3
                      className={`text-base font-bold ${
                        s.status === 'later' ? 'text-slate-300' : 'text-slate-100'
                      }`}
                    >
                      {s.title}
                    </h3>
                    <span
                      className={`ml-auto rounded-full border px-2 py-0.5 text-[11px] font-semibold ${m.badge}`}
                    >
                      {m.icon} {m.label}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    <span className="font-semibold text-slate-400">Goal — </span>
                    {s.goal}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                    <span className="font-semibold text-slate-500">Done when — </span>
                    {s.doneWhen}
                  </p>
                  {s.note && (
                    <p className="mt-2 rounded-lg bg-slate-950/60 px-3 py-1.5 text-xs italic text-slate-400">
                      {s.note}
                    </p>
                  )}
                </div>
              </li>
            )
          })}
        </ol>

        {/* Future subjects */}
        <h2 className="mb-1 mt-9 text-[11px] font-bold uppercase tracking-widest text-slate-500">
          Subjects coming later
        </h2>
        <p className="mb-4 text-sm text-slate-400">
          New domains to add once depth lands — ordered by value for the robotics-founder goal.
          Data-only for now; lessons come with the stages above.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {futureSubjects.map((f) => (
            <div
              key={f.rank}
              className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-4"
            >
              <span
                className="mt-1 h-3 w-3 shrink-0 rounded-full"
                style={{ background: f.color }}
                aria-hidden
              />
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-bold text-slate-600">#{f.rank}</span>
                  <h3 className="text-sm font-bold text-slate-200">{f.name}</h3>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{f.why}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 p-4 text-sm leading-relaxed text-slate-400">
          {foldInNote}
        </p>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-400"
          >
            ← Back to the map
          </button>
        </div>
      </div>
    </div>
  )
}
