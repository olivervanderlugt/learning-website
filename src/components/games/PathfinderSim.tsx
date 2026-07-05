import { useEffect, useState } from 'react'

/**
 * Grid pathfinding lab: toggle walls, then run BFS or A* from start to goal.
 * Explored cells and the found path are shown with counts, so the learner SEES
 * A* explore far less than BFS for the same (shortest) path length.
 * Steps: 1) run BFS on the open grid, 2) run A*, 3) build a wall of ≥8 cells
 * and find a path around it with A*. onComplete fires after step 3.
 */
const COLS = 13
const ROWS = 9
const START = 1 * ROWS + 4 // col 1, row 4
const GOAL = 11 * ROWS + 4 // col 11, row 4

const cellOf = (i: number) => ({ c: Math.floor(i / ROWS), r: i % ROWS })
const idxOf = (c: number, r: number) => c * ROWS + r

interface RunResult {
  explored: number[]
  path: number[]
  algo: 'bfs' | 'astar'
}

function search(walls: Set<number>, algo: 'bfs' | 'astar'): RunResult {
  const goal = cellOf(GOAL)
  const h = (i: number) => {
    const { c, r } = cellOf(i)
    return Math.abs(c - goal.c) + Math.abs(r - goal.r)
  }
  // frontier as array; BFS = plain FIFO, A* = pick lowest f = g + h each pop
  const frontier: number[] = [START]
  const g = new Map<number, number>([[START, 0]])
  const parent = new Map<number, number>()
  const exploredOrder: number[] = []
  const closed = new Set<number>()

  while (frontier.length > 0) {
    let pickAt = 0
    if (algo === 'astar') {
      let best = Infinity
      frontier.forEach((node, k) => {
        const f = (g.get(node) ?? Infinity) + h(node)
        if (f < best) {
          best = f
          pickAt = k
        }
      })
    }
    const current = frontier.splice(pickAt, 1)[0]
    if (closed.has(current)) continue
    closed.add(current)
    exploredOrder.push(current)
    if (current === GOAL) break

    const { c, r } = cellOf(current)
    const neighbors = [
      [c + 1, r],
      [c - 1, r],
      [c, r + 1],
      [c, r - 1],
    ]
    for (const [nc, nr] of neighbors) {
      if (nc < 0 || nc >= COLS || nr < 0 || nr >= ROWS) continue
      const ni = idxOf(nc, nr)
      if (walls.has(ni) || closed.has(ni)) continue
      const ng = (g.get(current) ?? 0) + 1
      if (ng < (g.get(ni) ?? Infinity)) {
        g.set(ni, ng)
        parent.set(ni, current)
        frontier.push(ni)
      }
    }
  }

  const path: number[] = []
  if (closed.has(GOAL)) {
    let cur = GOAL
    while (cur !== START) {
      path.push(cur)
      cur = parent.get(cur)!
    }
    path.push(START)
    path.reverse()
  }
  return { explored: exploredOrder, path, algo }
}

const STEPS = [
  'Step 1 — the grid is open. Run BFS (explores in all directions equally) and note how many cells it touches.',
  'Step 2 — now run A*. It uses “distance to goal” as a compass. Same shortest path — how many cells does IT touch?',
  'Step 3 — draw a wall of at least 8 cells between start and goal (click cells), then run A* and watch it route around.',
] as const

export default function PathfinderSim({ onComplete }: { onComplete: (score: number) => void }) {
  const [walls, setWalls] = useState<Set<number>>(new Set())
  const [result, setResult] = useState<RunResult | null>(null)
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [note, setNote] = useState<string | null>(null)

  const toggleWall = (i: number) => {
    if (i === START || i === GOAL) return
    setWalls((prev) => {
      const nextWalls = new Set(prev)
      if (nextWalls.has(i)) nextWalls.delete(i)
      else nextWalls.add(i)
      return nextWalls
    })
    setResult(null)
  }

  const run = (algo: 'bfs' | 'astar') => {
    const res = search(walls, algo)
    setResult(res)
    setNote(null)
    if (res.path.length === 0) {
      setNote('No path — the wall seals the goal off completely. Remove a cell and re-run.')
      return
    }
    if (step === 0 && algo === 'bfs') setStep(1)
    else if (step === 1 && algo === 'astar') setStep(2)
    else if (step === 2 && algo === 'astar' && walls.size >= 8) setDone(true)
    else if (step === 2 && algo === 'astar') setNote(`Wall is only ${walls.size} cell${walls.size === 1 ? '' : 's'} — make it at least 8 so the detour is real.`)
  }

  useEffect(() => {
    if (done) onComplete(1)
  }, [done, onComplete])

  const exploredSet = new Set(result?.explored ?? [])
  const pathSet = new Set(result?.path ?? [])

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <p className="text-sm font-semibold text-violet-300">{done ? '🎉 Complete!' : STEPS[step]}</p>

      <div className="mt-3 grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
        {Array.from({ length: COLS * ROWS }, (_, k) => {
          const c = k % COLS
          const r = Math.floor(k / COLS)
          const i = idxOf(c, r)
          const isWall = walls.has(i)
          const bg =
            i === START ? '#34d399' : i === GOAL ? '#fb7185' : isWall ? '#475569' : pathSet.has(i) ? '#a78bfa' : exploredSet.has(i) ? '#a78bfa33' : '#0f172a'
          return (
            <button
              key={k}
              onClick={() => toggleWall(i)}
              aria-label={i === START ? 'start' : i === GOAL ? 'goal' : `cell ${c},${r}`}
              className="aspect-square w-full rounded-[3px] border border-slate-800 transition-colors"
              style={{ background: bg }}
            >
              {i === START ? '🤖' : i === GOAL ? '⭐' : ''}
            </button>
          )
        })}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2">
          <button onClick={() => run('bfs')} className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-1.5 text-sm font-semibold text-slate-200 hover:bg-slate-700">
            Run BFS
          </button>
          <button onClick={() => run('astar')} className="rounded-lg bg-violet-500 px-3 py-1.5 text-sm font-bold text-slate-950 hover:bg-violet-400">
            Run A*
          </button>
          <button
            onClick={() => {
              setWalls(new Set())
              setResult(null)
              setNote(null)
            }}
            className="text-xs text-slate-500 hover:text-slate-300"
          >
            clear walls
          </button>
        </div>
        {result && result.path.length > 0 && (
          <p className="font-mono text-xs text-slate-300">
            {result.algo === 'bfs' ? 'BFS' : 'A*'}: explored <b className={result.algo === 'astar' ? 'text-emerald-300' : 'text-amber-300'}>{result.explored.length}</b> cells · path{' '}
            <b className="text-violet-300">{result.path.length - 1}</b> steps
          </p>
        )}
      </div>

      {note && <p className="mt-2 text-sm text-amber-300">{note}</p>}
      {done && (
        <p className="mt-2 text-center text-sm font-semibold text-emerald-300">
          A* found the same shortest path as BFS while exploring a fraction of the map — the
          heuristic “which way is the goal?” is what makes real-time robot navigation possible.
        </p>
      )}
    </div>
  )
}
