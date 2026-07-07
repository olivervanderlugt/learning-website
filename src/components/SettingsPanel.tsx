import { useRef, useState } from 'react'
import { useStore } from '../store'
import { computeAchievements, computeStats } from '../content/achievements'
import { subjectStyles } from './SkillNode'
import type { Progress, Subject } from '../types'

type Tab = 'progress' | 'data'

export default function SettingsPanel() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<Tab>('progress')
  const [msg, setMsg] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const importProgress = useStore((s) => s.importProgress)
  const resetProgress = useStore((s) => s.resetProgress)

  const exportProgress = () => {
    const s = useStore.getState()
    const data: Progress = {
      version: s.version,
      xp: s.xp,
      completedScreens: s.completedScreens,
      masteredNodeIds: s.masteredNodeIds,
      knownNodeIds: s.knownNodeIds,
      quizScores: s.quizScores,
      lessonProgress: s.lessonProgress,
      navStack: s.navStack,
      reviews: s.reviews,
      theme: s.theme,
      showDepth: s.showDepth,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const aEl = document.createElement('a')
    aEl.href = url
    aEl.download = 'learning-progress.json'
    aEl.click()
    URL.revokeObjectURL(url)
    setMsg('Progress downloaded ✓')
  }

  const onImportFile = async (file: File) => {
    try {
      const data = JSON.parse(await file.text())
      if (data?.version !== 1 || !Array.isArray(data.masteredNodeIds)) {
        setMsg('That file isn’t a valid progress export.')
        return
      }
      importProgress(data)
      setMsg('Progress imported ✓')
    } catch {
      setMsg('Couldn’t read that file — is it the exported JSON?')
    }
  }

  const onReset = () => {
    if (window.confirm('Really wipe ALL progress (XP, mastered nodes, quiz scores)? Export first if unsure.')) {
      resetProgress()
      setMsg('Progress reset.')
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => { setOpen(!open); setMsg(null) }}
        aria-label="Settings"
        className={`rounded-lg border px-3 py-1.5 text-sm transition ${
          open
            ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300'
            : 'border-slate-700 text-slate-300 hover:bg-slate-800'
        }`}
      >
        ⚙︎
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-20 flex max-h-[75vh] w-[26rem] flex-col rounded-xl border border-slate-700 bg-slate-900 shadow-xl">
          {/* Tabs */}
          <div className="flex gap-1 border-b border-slate-800 p-2">
            {(
              [
                ['progress', '📊 Progress'],
                ['data', '💾 Data'],
              ] as [Tab, string][]
            ).map(([t, label]) => (
              <button
                key={t}
                onClick={() => { setTab(t); setMsg(null) }}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  tab === t
                    ? 'bg-slate-800 text-slate-100'
                    : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="overflow-y-auto p-4">
            {tab === 'progress' ? (
              <ProgressTab />
            ) : (
              <>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Progress data
                </p>
                <div className="mt-2 space-y-2">
                  <button
                    onClick={exportProgress}
                    className="w-full rounded-lg border border-slate-700 px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-800"
                  >
                    ⬇️ Export progress (JSON)
                  </button>
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="w-full rounded-lg border border-slate-700 px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-800"
                  >
                    ⬆️ Import progress
                  </button>
                  <button
                    onClick={onReset}
                    className="w-full rounded-lg border border-rose-900 px-3 py-2 text-left text-sm text-rose-300 hover:bg-rose-950"
                  >
                    🗑 Reset all progress
                  </button>
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) onImportFile(f)
                    e.target.value = ''
                  }}
                />
                {msg && <p className="mt-3 text-xs text-slate-400">{msg}</p>}
                <p className="mt-3 text-[11px] leading-relaxed text-slate-600">
                  Progress lives in this browser. Export before switching machines.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ProgressTab() {
  const xp = useStore((s) => s.xp)
  const masteredNodeIds = useStore((s) => s.masteredNodeIds)
  const knownNodeIds = useStore((s) => s.knownNodeIds)
  const quizScores = useStore((s) => s.quizScores)
  const reviews = useStore((s) => s.reviews)

  const slice = { xp, masteredNodeIds, knownNodeIds, quizScores, reviews }
  const stats = computeStats(slice)
  const achievements = computeAchievements(slice)
  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <div>
      {/* Headline numbers */}
      <div className="grid grid-cols-3 gap-2">
        <StatCard value={`${stats.xp}`} label="XP earned" accent="text-amber-300" />
        <StatCard value={`${stats.mastered}/${stats.totalNodes}`} label="lessons mastered" accent="text-cyan-300" />
        <StatCard value={`${stats.examsPassed}/${stats.totalExams}`} label="exams passed" accent="text-emerald-300" />
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        <StatCard value={`${stats.perfectQuizzes}`} label="perfect scores" accent="text-violet-300" />
        <StatCard value={`${stats.reviewsCompleted}`} label="reviews done" accent="text-rose-300" />
        <StatCard value={`${stats.domainsCompleted}/${stats.perDomain.length}`} label="domains complete" accent="text-teal-300" />
      </div>

      {/* Per-domain bars */}
      <p className="mt-5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
        Progress by domain
      </p>
      <div className="mt-2 space-y-1.5">
        {stats.perDomain.map((d) => {
          const pct = d.total === 0 ? 0 : Math.round((d.mastered / d.total) * 100)
          const dot = subjectStyles[d.subject as Subject]?.dot ?? 'bg-slate-500'
          return (
            <div key={d.id} className="flex items-center gap-2">
              <span className="w-40 shrink-0 truncate text-xs text-slate-300" title={d.title}>
                {d.title}
              </span>
              <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-800">
                <div className={`h-full rounded-full ${dot}`} style={{ width: `${pct}%` }} />
              </div>
              <span className="w-14 shrink-0 text-right text-[10px] tabular-nums text-slate-500">
                {d.mastered}/{d.total}
                {d.examPassed ? ' 🏅' : ''}
              </span>
            </div>
          )
        })}
      </div>

      {/* Achievements */}
      <p className="mt-5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
        Achievements · {unlockedCount}/{achievements.length}
      </p>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {achievements.map((a) => (
          <div
            key={a.id}
            title={a.desc}
            className={`rounded-lg border p-2 ${
              a.unlocked
                ? 'border-amber-500/30 bg-amber-500/5'
                : 'border-slate-800 bg-slate-950/40 opacity-60'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className={`text-base ${a.unlocked ? '' : 'grayscale'}`}>{a.icon}</span>
              <span className={`truncate text-xs font-semibold ${a.unlocked ? 'text-slate-100' : 'text-slate-400'}`}>
                {a.title}
              </span>
            </div>
            <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-slate-500">{a.desc}</p>
            {!a.unlocked && a.progress && (
              <p className="mt-1 text-[10px] font-semibold tabular-nums text-slate-400">{a.progress}</p>
            )}
          </div>
        ))}
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-slate-600">
        Everything here is computed from your progress — master lessons, pass exams and keep
        reviews fresh to fill it up. No streaks, no pressure.
      </p>
    </div>
  )
}

function StatCard({ value, label, accent }: { value: string; label: string; accent: string }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/60 px-2 py-2 text-center">
      <div className={`text-lg font-bold tabular-nums ${accent}`}>{value}</div>
      <div className="mt-0.5 text-[10px] leading-tight text-slate-500">{label}</div>
    </div>
  )
}
