import { useEffect, useRef, useState } from 'react'
import type { CodeScreen } from '../../types'

// Worker source: runs the learner's JS with a print() that collects output.
const WORKER_SRC = `
self.onmessage = (e) => {
  const logs = []
  const print = (...args) => logs.push(args.map((a) =>
    typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '))
  try {
    const fn = new Function('print', 'console', e.data)
    fn(print, { log: print })
    self.postMessage({ ok: true, logs })
  } catch (err) {
    self.postMessage({ ok: false, error: String(err && err.message ? err.message : err), logs })
  }
}
`

const norm = (s: string) =>
  s
    .split('\n')
    .map((l) => l.trimEnd())
    .join('\n')
    .trim()

type RunState =
  | { phase: 'idle' }
  | { phase: 'running' }
  | { phase: 'done'; output: string; error?: string; correct: boolean }
  | { phase: 'timeout' }

export default function CodeScreenView({
  screen,
  onDone,
}: {
  screen: CodeScreen
  onDone: () => void
}) {
  const [code, setCode] = useState(screen.starter)
  const [run, setRun] = useState<RunState>({ phase: 'idle' })
  const [attempts, setAttempts] = useState(0)
  const workerRef = useRef<Worker | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const solved = run.phase === 'done' && run.correct

  useEffect(
    () => () => {
      workerRef.current?.terminate()
      workerRef.current = null
      clearTimeout(timerRef.current)
    },
    [],
  )

  const execute = () => {
    if (run.phase === 'running') return
    setRun({ phase: 'running' })
    const blob = new Blob([WORKER_SRC], { type: 'application/javascript' })
    const url = URL.createObjectURL(blob)
    const worker = new Worker(url)
    URL.revokeObjectURL(url)
    workerRef.current = worker

    const timer = setTimeout(() => {
      worker.terminate()
      workerRef.current = null
      setRun({ phase: 'timeout' })
    }, 2000)
    timerRef.current = timer

    worker.onmessage = (e: MessageEvent) => {
      clearTimeout(timer)
      worker.terminate()
      workerRef.current = null
      const { ok, logs, error } = e.data as { ok: boolean; logs: string[]; error?: string }
      const output = (logs ?? []).join('\n')
      const correct = ok && norm(output) === norm(screen.expected)
      setAttempts((a) => a + 1)
      setRun({ phase: 'done', output, error: ok ? undefined : error, correct })
    }
    worker.postMessage(code)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Cmd/Ctrl+Enter runs; Tab inserts two spaces.
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      execute()
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const el = e.currentTarget
      const s = el.selectionStart
      const next = code.slice(0, s) + '  ' + code.slice(el.selectionEnd)
      setCode(next)
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = s + 2
      })
    }
  }

  return (
    <div>
      <div className="mb-3 inline-block rounded bg-cyan-500/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-cyan-300">
        ⌨️ Write code
      </div>
      <p className="text-[15px] leading-relaxed text-slate-300">{screen.prompt}</p>

      <div className="mt-4 overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-3 py-1.5">
          <span className="font-mono text-[11px] text-slate-500">program.js</span>
          <span className="text-[11px] text-slate-600">Tab indents · ⌘/Ctrl+Enter runs</span>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Code editor"
          spellCheck={false}
          rows={Math.max(6, code.split('\n').length + 1)}
          className="w-full resize-none bg-slate-950 px-4 py-3 font-mono text-sm leading-relaxed text-slate-100 outline-none"
        />
      </div>

      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={execute}
          disabled={run.phase === 'running'}
          className="rounded-lg bg-cyan-500 px-5 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400 disabled:opacity-50"
        >
          {run.phase === 'running' ? 'Running…' : '▶ Run'}
        </button>
        <button
          onClick={() => {
            setCode(screen.starter)
            setRun({ phase: 'idle' })
          }}
          className="text-xs text-slate-500 hover:text-slate-300"
        >
          reset code
        </button>
      </div>

      {run.phase !== 'idle' && (
        <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950 p-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Output</div>
          {run.phase === 'running' && <p className="mt-1 font-mono text-sm text-slate-500">…</p>}
          {run.phase === 'timeout' && (
            <p className="mt-1 font-mono text-sm text-amber-300">
              ⏱ Stopped after 2s — an infinite loop? Check your loop’s stopping condition.
            </p>
          )}
          {run.phase === 'done' && (
            <>
              <pre className="mt-1 whitespace-pre-wrap font-mono text-sm text-slate-200">
                {run.output || '(no output — did you call print?)'}
              </pre>
              {run.error && <p className="mt-1 font-mono text-sm text-rose-300">⚠ {run.error}</p>}
            </>
          )}
        </div>
      )}

      {run.phase === 'done' && !run.correct && !run.error && (
        <div className="mt-3 rounded-lg border border-slate-700 bg-slate-900 p-3">
          <p className="text-sm text-slate-300">
            Not the expected output yet. Expected:
            <span className="ml-2 font-mono text-cyan-300">{screen.expected.replace(/\n/g, ' ⏎ ')}</span>
          </p>
          {screen.hint && attempts >= 1 && (
            <p className="mt-2 text-sm text-amber-300">💡 {screen.hint}</p>
          )}
        </div>
      )}

      {solved && (
        <div className="mt-3 rounded-xl border border-emerald-600/50 bg-emerald-500/5 p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">✅ It runs!</div>
          <p className="mt-1 text-sm leading-relaxed text-slate-300">{screen.success}</p>
          <button
            onClick={onDone}
            className="mt-3 rounded-lg bg-cyan-500 px-5 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  )
}
