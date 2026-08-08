import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { domains } from '../content/curriculum'
import { onboardingSteps, RECOMMENDED_DOMAIN_ID } from '../content/onboarding'
import { useStore } from '../store'

/**
 * First-run tour (and replayable from ⚙︎). Four steps of authored copy from
 * content/onboarding.ts; step 2's status cards flip on tap — the learner finds
 * out what the map's badges mean by DOING it, same pedagogy as a lesson.
 * Skipping and finishing both call completeOnboarding, so it never re-appears.
 */
export default function OnboardingFlow() {
  const completeOnboarding = useStore((s) => s.completeOnboarding)
  const [stepIndex, setStepIndex] = useState(0)
  /** Status cards already flipped on step 2. */
  const [flipped, setFlipped] = useState<string[]>([])
  const [domainId, setDomainId] = useState(RECOMMENDED_DOMAIN_ID)

  // Clamped read: an out-of-range index (stale click, future content edit) must
  // never resolve to undefined — that white-screens the whole app.
  const step = onboardingSteps[Math.min(stepIndex, onboardingSteps.length - 1)]
  const isLast = stepIndex === onboardingSteps.length - 1

  const skip = () => completeOnboarding()

  // Escape = skip, matching the Roadmap/Skills overlays.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') completeOnboarding()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [completeOnboarding])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Atlas"
      className="absolute inset-0 z-30 overflow-y-auto bg-slate-950/95 backdrop-blur"
    >
      <div className="mx-auto flex min-h-full max-w-xl flex-col justify-center px-5 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6"
          >
            <p className="text-[11px] font-bold uppercase tracking-widest text-cyan-300">
              Step {stepIndex + 1} of {onboardingSteps.length}
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-100">{step.title}</h1>
            {step.body.map((p) => (
              <p key={p} className="mt-3 text-sm leading-relaxed text-slate-300">
                {p}
              </p>
            ))}

            {step.cards && (
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {step.cards.map((c) => {
                  const open = flipped.includes(c.id)
                  return (
                    <button
                      key={c.id}
                      onClick={() => setFlipped((f) => (f.includes(c.id) ? f : [...f, c.id]))}
                      aria-expanded={open}
                      className={`rounded-xl border p-3 text-left transition ${
                        open
                          ? 'border-cyan-500/40 bg-cyan-500/5'
                          : 'border-slate-700 bg-slate-950/60 hover:border-slate-500'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">{c.icon}</span>
                        <span className="text-sm font-bold text-slate-100">{c.label}</span>
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-slate-400">
                        {open ? c.meaning : 'Tap to reveal'}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}

            {isLast && (
              <ul className="mt-5 max-h-64 space-y-1.5 overflow-y-auto pr-1">
                {domains.map((d) => {
                  const chosen = d.id === domainId
                  return (
                    <li key={d.id}>
                      <button
                        onClick={() => setDomainId(d.id)}
                        aria-pressed={chosen}
                        className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition ${
                          chosen
                            ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300'
                            : 'border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-800/60'
                        }`}
                      >
                        <span className="min-w-0 flex-1 truncate">{d.title}</span>
                        {d.id === RECOMMENDED_DOMAIN_ID && (
                          <span className="shrink-0 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                            Recommended
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}

            <div className="mt-6 flex items-center justify-between gap-4">
              {/* Step dots */}
              <div className="flex items-center gap-1.5">
                {onboardingSteps.map((s, i) => (
                  <span
                    key={s.id}
                    aria-hidden
                    className={`h-1.5 rounded-full transition-all ${
                      i === stepIndex ? 'w-5 bg-cyan-400' : 'w-1.5 bg-slate-700'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() =>
                  isLast
                    ? completeOnboarding(domainId)
                    : // Clamp: the exiting card stays clickable mid-transition, so a
                      // rapid double-click would otherwise advance past the last step.
                      setStepIndex((i) => Math.min(i + 1, onboardingSteps.length - 1))
                }
                className="rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-400 active:scale-[0.98]"
              >
                {step.next}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex justify-center">
          <button
            onClick={skip}
            className="rounded-lg px-3 py-1.5 text-xs text-slate-500 transition hover:text-slate-300"
          >
            Skip the tour
          </button>
        </div>
      </div>
    </div>
  )
}
