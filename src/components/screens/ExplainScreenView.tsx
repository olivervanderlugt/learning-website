import type { ExplainScreen } from '../../types'

export default function ExplainScreenView({
  screen,
  onDone,
}: {
  screen: ExplainScreen
  onDone: () => void
}) {
  return (
    <div>
      <h2 className="text-xl font-bold">{screen.title}</h2>
      <div className="mt-4 space-y-3">
        {screen.body.map((p, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-slate-300">
            {p}
          </p>
        ))}
      </div>
      <button
        onClick={onDone}
        className="mt-6 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-400 active:scale-[0.98]"
      >
        Got it →
      </button>
    </div>
  )
}
