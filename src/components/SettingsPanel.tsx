import { useRef, useState } from 'react'
import { useStore } from '../store'
import { useDismissable } from './useDismissable'
import type { Progress } from '../types'

export default function SettingsPanel() {
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const importProgress = useStore((s) => s.importProgress)
  const resetProgress = useStore((s) => s.resetProgress)
  const guideEnabled = useStore((s) => s.guideEnabled)
  const setGuideEnabled = useStore((s) => s.setGuideEnabled)
  const replayOnboarding = useStore((s) => s.replayOnboarding)

  useDismissable(open, () => setOpen(false), rootRef)

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
      onboardingDone: s.onboardingDone,
      guideEnabled: s.guideEnabled,
      guideSeen: s.guideSeen,
      viewTier: s.viewTier,
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
    <div ref={rootRef} className="relative">
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
        <div className="absolute right-0 top-11 z-20 flex max-h-[75vh] w-[22rem] flex-col rounded-xl border border-slate-700 bg-slate-900 shadow-xl">
          <div className="overflow-y-auto p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Guide
            </p>
            <div className="mt-2 space-y-2">
              <button
                onClick={() => setGuideEnabled(!guideEnabled)}
                title="Short contextual tips pointing at parts of the app you haven’t used yet"
                className="flex w-full items-center justify-between gap-2 rounded-lg border border-slate-700 px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-800"
              >
                <span>💡 Guide tips</span>
                <span
                  className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
                    guideEnabled
                      ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
                      : 'border-slate-700 text-slate-500'
                  }`}
                >
                  {guideEnabled ? 'On' : 'Off'}
                </span>
              </button>
              <button
                onClick={() => {
                  replayOnboarding()
                  setOpen(false)
                }}
                className="w-full rounded-lg border border-slate-700 px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-800"
              >
                🔁 Replay onboarding
              </button>
            </div>

            <p className="mt-5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
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
          </div>
        </div>
      )}
    </div>
  )
}

