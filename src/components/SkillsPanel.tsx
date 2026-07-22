import { useEffect } from 'react'
import { nodeById } from '../content/curriculum'
import { computeSkillCoverage, essentialSkills } from '../content/skills'
import { useStore } from '../store'
import type { SkillCoverage, SkillCoverageState, SkillFamily } from '../types'

/** Readable section titles for the six skill families. */
const familyNames: Record<SkillFamily, string> = {
  languages: 'Languages',
  'programming-concepts': 'Programming Concepts',
  'tooling-and-testing': 'Tooling & Testing',
  'data-and-databases': 'Data & Databases',
  'web-and-apis': 'Web & APIs',
  'analytics-and-bi': 'Analytics & BI',
}

/** Families in authored order (first appearance in the taxonomy). */
const familyOrder = essentialSkills.reduce<SkillFamily[]>((acc, s) => {
  if (!acc.includes(s.family)) acc.push(s.family)
  return acc
}, [])

const stateMeta: Record<SkillCoverageState, { icon: string; label: string; badge: string }> = {
  covered: { icon: '✅', label: 'Covered', badge: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' },
  partial: { icon: '🟡', label: 'Partial', badge: 'border-amber-500/40 bg-amber-500/10 text-amber-300' },
  gap: { icon: '⭕', label: 'Gap', badge: 'border-slate-700 bg-slate-800/60 text-slate-400' },
}

/** "7 of 46 (15%)" — the presentation rule: absolute + total + percentage, never a bare figure. */
function frac(n: number, total: number): string {
  const pct = total === 0 ? 0 : Math.round((n / total) * 100)
  return `${n} of ${total} (${pct}%)`
}

/**
 * Coverage lens (Phase-5 Tier 1): the employability reference skill set mapped
 * against the graph. Everything is derived on the fly from computeSkillCoverage
 * + the mastered set — nothing persisted, like the achievements panel. Follows
 * the RoadmapView full-overlay pattern (Escape closes, role=dialog).
 */
export default function SkillsPanel({ onClose }: { onClose: () => void }) {
  const masteredNodeIds = useStore((s) => s.masteredNodeIds)
  const openLesson = useStore((s) => s.openLesson)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const mastered = new Set(masteredNodeIds)
  const coverage = computeSkillCoverage(masteredNodeIds)
  const total = coverage.length
  const coveredCount = coverage.filter((c) => c.state === 'covered').length
  const partialCount = coverage.filter((c) => c.state === 'partial').length
  const gapCount = coverage.filter((c) => c.state === 'gap').length

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Employability skills coverage"
      className="absolute inset-0 z-20 overflow-y-auto bg-slate-950/95 backdrop-blur"
    >
      <div className="mx-auto max-w-4xl px-5 py-8">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-100">Employability skills</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
              What an entry-level technical role expects, mapped against the graph — which skills the
              lessons already teach, which they only touch, and where the gaps are.
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800"
          >
            ✕ Close
          </button>
        </div>

        {/* Headline totals */}
        <div className="grid gap-3 sm:grid-cols-3">
          <TotalCard label="Covered" figure={frac(coveredCount, total)} accent="text-emerald-300" />
          <TotalCard label="Partial" figure={frac(partialCount, total)} accent="text-amber-300" />
          <TotalCard label="Gap" figure={frac(gapCount, total)} accent="text-slate-400" />
        </div>

        {/* Families */}
        <div className="mt-8 space-y-7">
          {familyOrder.map((family) => {
            const rows = coverage.filter((c) => c.skill.family === family)
            const famCovered = rows.filter((c) => c.state === 'covered').length
            return (
              <section key={family}>
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-800 pb-1.5">
                  <h2 className="text-sm font-bold text-slate-200">{familyNames[family]}</h2>
                  <span className="text-[11px] font-semibold tabular-nums text-slate-500">
                    Covered: {frac(famCovered, rows.length)}
                  </span>
                </div>
                <ul className="space-y-2">
                  {rows.map((c) => (
                    <SkillRow key={c.skill.id} c={c} mastered={mastered} openLesson={openLesson} onClose={onClose} />
                  ))}
                </ul>
              </section>
            )
          })}
        </div>

        <p className="mt-8 rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 p-4 text-sm leading-relaxed text-slate-400">
          Covered means a lesson teaches the skill at usable depth; partial means one only touches it.
          Everything here is derived from your mastered lessons — nothing is tracked separately.
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

function TotalCard({ label, figure, accent }: { label: string; figure: string; accent: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center">
      <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{label}</div>
      <div className={`mt-1 text-lg font-bold tabular-nums ${accent}`}>{figure}</div>
    </div>
  )
}

function SkillRow({
  c,
  mastered,
  openLesson,
  onClose,
}: {
  c: SkillCoverage
  mastered: Set<string>
  openLesson: (id: string) => void
  onClose: () => void
}) {
  const m = stateMeta[c.state]
  const covering = c.nodeIds.length + c.partialNodeIds.length
  const partialSet = new Set(c.partialNodeIds)
  return (
    <li className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${m.badge}`}>
          {m.icon} {m.label}
        </span>
        <span className="text-sm font-semibold text-slate-200">{c.skill.name}</span>
        {c.state !== 'gap' && (
          <span className="ml-auto text-[11px] font-semibold tabular-nums text-slate-500">
            mastered {frac(c.masteredCount, covering)}
          </span>
        )}
      </div>

      {c.state === 'gap' ? (
        <p className="mt-2 text-xs italic text-slate-600">No lesson yet.</p>
      ) : (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {[...c.nodeIds, ...c.partialNodeIds].map((id) => {
            const node = nodeById.get(id)
            const title = node?.title ?? id
            const isMastered = mastered.has(id)
            const touchOnly = partialSet.has(id)
            const playable = !!node?.hasLesson
            const cls = [
              'rounded-md border px-1.5 py-0.5 text-[11px] transition',
              touchOnly ? 'border-dashed' : '',
              isMastered
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                : 'border-slate-700 bg-slate-800/60 text-slate-300',
              playable ? 'hover:bg-slate-700' : 'cursor-default',
            ].join(' ')
            return playable ? (
              <button
                key={id}
                onClick={() => {
                  openLesson(id)
                  onClose()
                }}
                title={touchOnly ? `${title} — touches this skill` : title}
                className={cls}
              >
                {isMastered ? '✓ ' : ''}
                {title}
              </button>
            ) : (
              <span key={id} title={title} className={cls}>
                {title}
              </span>
            )
          })}
        </div>
      )}
    </li>
  )
}
