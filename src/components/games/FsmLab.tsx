import { useEffect, useState } from 'react'

/**
 * FSM lab: a robot behavior controller as a live state machine. The learner
 * fires events and watches the state hop (or deliberately NOT hop — undefined
 * events are ignored, which is a lesson in itself). Three challenges;
 * onComplete fires after the last.
 */
type StateId = 'patrol' | 'avoid' | 'docking' | 'charging'
type EventId = 'obstacle' | 'clear' | 'low_battery' | 'docked' | 'charged'

const TRANSITIONS: Record<StateId, Partial<Record<EventId, StateId>>> = {
  patrol: { obstacle: 'avoid', low_battery: 'docking' },
  avoid: { clear: 'patrol', low_battery: 'docking' },
  docking: { docked: 'charging', obstacle: 'avoid' },
  charging: { charged: 'patrol' },
}

const STATE_INFO: Record<StateId, { label: string; icon: string; x: number; y: number }> = {
  patrol: { label: 'PATROL', icon: '🤖', x: 80, y: 50 },
  avoid: { label: 'AVOID', icon: '⚠️', x: 300, y: 50 },
  docking: { label: 'DOCKING', icon: '🎯', x: 80, y: 165 },
  charging: { label: 'CHARGING', icon: '🔋', x: 300, y: 165 },
}

const EVENTS: EventId[] = ['obstacle', 'clear', 'low_battery', 'docked', 'charged']

interface Challenge {
  label: string
  check: (state: StateId, log: { ev: EventId; ignored: boolean }[]) => boolean
}

const CHALLENGES: Challenge[] = [
  {
    label: 'Get the robot CHARGING.',
    check: (s) => s === 'charging',
  },
  {
    label: 'Back to work: from CHARGING, end up in PATROL having passed through AVOID on the way.',
    check: (s, log) => s === 'patrol' && log.some((l) => !l.ignored && l.ev === 'obstacle') && log.some((l) => !l.ignored && l.ev === 'clear'),
  },
  {
    label: 'Prove robustness: fire at least 2 events the current state IGNORES (nothing happens), then still reach CHARGING.',
    check: (s, log) => s === 'charging' && log.filter((l) => l.ignored).length >= 2,
  },
]

export default function FsmLab({ onComplete }: { onComplete: (score: number) => void }) {
  const [state, setState] = useState<StateId>('patrol')
  const [log, setLog] = useState<{ ev: EventId; ignored: boolean }[]>([])
  const [stage, setStage] = useState(0)
  const [solved, setSolved] = useState(false)
  const [done, setDone] = useState(false)
  const [flash, setFlash] = useState<EventId | null>(null)

  const challenge = CHALLENGES[stage]

  const fire = (ev: EventId) => {
    if (done || solved) return
    const next = TRANSITIONS[state][ev]
    setLog((prev) => [...prev, { ev, ignored: next === undefined }])
    if (next === undefined) {
      setFlash(ev)
    } else {
      setFlash(null)
      setState(next)
    }
  }

  useEffect(() => {
    if (!done && !solved && challenge?.check(state, log)) setSolved(true)
  }, [state, log, challenge, solved, done])

  const nextStage = () => {
    if (stage + 1 >= CHALLENGES.length) {
      setDone(true)
      onComplete(1)
    } else {
      setStage((s) => s + 1)
      setSolved(false)
      setLog([])
      // stage 2 starts from charging (its brief says so); stage 3 from patrol
      setState(stage === 0 ? 'charging' : 'patrol')
      setFlash(null)
    }
  }

  // edges to draw (from, to, label, path offset)
  const edges: { from: StateId; to: StateId; ev: EventId }[] = []
  ;(Object.keys(TRANSITIONS) as StateId[]).forEach((from) => {
    ;(Object.entries(TRANSITIONS[from]) as [EventId, StateId][]).forEach(([ev, to]) => edges.push({ from, to, ev }))
  })

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <div className={`rounded-lg border px-3 py-2 text-sm ${solved || done ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border-amber-500/40 bg-amber-500/10 text-amber-200'}`}>
        {done ? (
          <span className="font-semibold">🎉 You just programmed a robot the way real behavior controllers are written.</span>
        ) : solved ? (
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold">✓ Challenge {stage + 1} solved!</span>
            <button onClick={nextStage} className="shrink-0 rounded-md bg-emerald-500 px-2.5 py-1 text-xs font-bold text-slate-950 hover:bg-emerald-400">
              {stage + 1 >= CHALLENGES.length ? 'Finish' : 'Next challenge'}
            </button>
          </div>
        ) : (
          <>
            <span className="font-semibold">Challenge {stage + 1}/{CHALLENGES.length}:</span> {challenge.label}
          </>
        )}
      </div>

      <svg viewBox="0 0 440 230" className="mt-3 w-full rounded-lg bg-slate-950">
        <defs>
          <marker id="fsm-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="#64748b" />
          </marker>
        </defs>
        {edges.map(({ from, to, ev }, i) => {
          const a = STATE_INFO[from]
          const b = STATE_INFO[to]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const len = Math.hypot(dx, dy)
          const ux = dx / len
          const uy = dy / len
          // offset perpendicular so opposite arrows don't overlap
          const px = -uy * 10
          const py = ux * 10
          const x1 = a.x + ux * 46 + px
          const y1 = a.y + uy * 30 + py
          const x2 = b.x - ux * 46 + px
          const y2 = b.y - uy * 30 + py
          return (
            <g key={i} opacity={from === state ? 1 : 0.35}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth={1.2} markerEnd="url(#fsm-arrow)" />
              <text x={(x1 + x2) / 2 + px * 0.7} y={(y1 + y2) / 2 + py * 0.7 + 3} textAnchor="middle" fontSize={9} fill={from === state ? '#fbbf24' : '#64748b'}>
                {ev}
              </text>
            </g>
          )
        })}
        {(Object.keys(STATE_INFO) as StateId[]).map((s) => {
          const info = STATE_INFO[s]
          const active = s === state
          return (
            <g key={s}>
              <ellipse cx={info.x} cy={info.y} rx={46} ry={26} fill={active ? '#f59e0b22' : '#0f172a'} stroke={active ? '#fbbf24' : '#334155'} strokeWidth={active ? 2.5 : 1.2} />
              <text x={info.x} y={info.y - 2} textAnchor="middle" fontSize={13}>{info.icon}</text>
              <text x={info.x} y={info.y + 13} textAnchor="middle" fontSize={9} fontWeight={700} fill={active ? '#fbbf24' : '#94a3b8'}>{info.label}</text>
            </g>
          )
        })}
      </svg>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        {EVENTS.map((ev) => (
          <button
            key={ev}
            onClick={() => fire(ev)}
            className={`rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold transition-colors ${
              flash === ev ? 'border-slate-500 bg-slate-700 text-slate-400' : 'border-amber-500/40 bg-slate-800 text-amber-200 hover:bg-slate-700'
            }`}
          >
            {ev}
          </button>
        ))}
      </div>
      {flash && (
        <p className="mt-2 text-center text-xs text-slate-400">
          “{flash}” means nothing in {STATE_INFO[state].label} — the machine ignores it. (That’s a feature: no rule, no reaction.)
        </p>
      )}

      {log.length > 0 && (
        <p className="mt-2 truncate text-center font-mono text-[11px] text-slate-500">
          {log.slice(-8).map((l, i) => (
            <span key={i} className={l.ignored ? 'line-through opacity-60' : ''}>
              {l.ev}
              {i < Math.min(log.length, 8) - 1 ? ' → ' : ''}
            </span>
          ))}
        </p>
      )}
    </div>
  )
}
