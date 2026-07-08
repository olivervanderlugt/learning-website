import { useEffect, useState } from 'react'
import SkillTreeView from './components/SkillTreeView'
import LessonPlayer from './components/LessonPlayer'
import SettingsPanel from './components/SettingsPanel'
import RoadmapView from './components/RoadmapView'
import ReviewQueue from './components/ReviewQueue'
import ProgressPanel from './components/ProgressPanel'
import AchievementToasts from './components/AchievementToasts'
import { useStore } from './store'

function App() {
  const view = useStore((s) => s.view)
  const theme = useStore((s) => s.theme)
  const toggleTheme = useStore((s) => s.toggleTheme)
  const backToMap = useStore((s) => s.backToMap)
  const [roadmapOpen, setRoadmapOpen] = useState(false)

  // Apply theme class to <html> so the light-mode CSS variables take effect.
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('light', theme === 'light')
    root.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="text-xl">🤖</span>
          <h1 className="text-base font-bold tracking-tight">
            Atlas <span className="font-normal text-slate-500">· one map, every subject</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {view.name === 'lesson' && (
            <button
              onClick={backToMap}
              className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800"
            >
              ← Map
            </button>
          )}
          <ReviewQueue />
          <button
            onClick={() => setRoadmapOpen((o) => !o)}
            title={roadmapOpen ? 'Back to the map' : 'Roadmap & coming soon'}
            className={`rounded-lg border px-3 py-1.5 text-sm transition ${
              roadmapOpen
                ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300'
                : 'border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            🧭 Roadmap
          </button>
          <ProgressPanel />
          <button
            onClick={toggleTheme}
            aria-label="Toggle light/dark theme"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <SettingsPanel />
        </div>
      </header>

      <main className="relative min-h-0 flex-1">
        {view.name === 'map' || !view.nodeId ? (
          <SkillTreeView />
        ) : (
          <LessonPlayer key={view.nodeId} nodeId={view.nodeId} />
        )}
        {roadmapOpen && <RoadmapView onClose={() => setRoadmapOpen(false)} />}
        <AchievementToasts />
      </main>
    </div>
  )
}

export default App
