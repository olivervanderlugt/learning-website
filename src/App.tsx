import SkillTreeView from './components/SkillTreeView'
import { useStore } from './store'

function App() {
  const view = useStore((s) => s.view)
  const xp = useStore((s) => s.xp)
  const backToMap = useStore((s) => s.backToMap)

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="text-xl">🤖</span>
          <h1 className="text-base font-bold tracking-tight">
            Foundations <span className="font-normal text-slate-500">· one map, every subject</span>
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
          <div className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-amber-300">
            ⚡ {xp} XP
          </div>
        </div>
      </header>

      <main className="min-h-0 flex-1">
        {view.name === 'map' ? (
          <SkillTreeView />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-slate-400">Lesson player arrives in P2.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
