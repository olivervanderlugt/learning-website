import { AnimatePresence, motion } from 'motion/react'
import { guideHints } from '../content/guide'
import { useStore, dueReviewIds } from '../store'

/**
 * Guide mode: one contextual tip card on the map, showing the highest-priority
 * hint the learner hasn't dismissed yet (see content/guide.ts for copy + the
 * relevance rules). Cyan, deliberately unlike the amber achievement toasts —
 * a tip is information, not a reward. Off entirely when guideEnabled is false.
 */
export default function GuideHints() {
  const guideEnabled = useStore((s) => s.guideEnabled)
  const guideSeen = useStore((s) => s.guideSeen)
  const view = useStore((s) => s.view)
  const masteredNodeIds = useStore((s) => s.masteredNodeIds)
  const knownNodeIds = useStore((s) => s.knownNodeIds)
  const reviews = useStore((s) => s.reviews)
  const dismissHint = useStore((s) => s.dismissHint)
  const setGuideEnabled = useStore((s) => s.setGuideEnabled)

  // Every hint points at a control on the map, so tips only exist there.
  if (!guideEnabled || view.name !== 'map') return null

  const slice = {
    masteredNodeIds,
    knownNodeIds,
    dueCount: dueReviewIds(reviews, masteredNodeIds).length,
  }
  const hint = guideHints.find((h) => !guideSeen.includes(h.id) && h.when(slice))

  return (
    <div className="pointer-events-none absolute right-4 top-4 z-10 w-80">
      <AnimatePresence>
        {hint && (
          <motion.div
            key={hint.id}
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="pointer-events-auto rounded-xl border border-cyan-500/40 bg-slate-900 p-3 shadow-xl shadow-cyan-500/10"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">{hint.icon}</span>
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  💡 Tip
                </span>
                <span className="block text-sm font-bold text-slate-100">{hint.title}</span>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{hint.body}</p>
              </div>
              <button
                onClick={() => dismissHint(hint.id)}
                aria-label="Dismiss tip"
                title="Got it"
                className="shrink-0 text-slate-500 hover:text-slate-300"
              >
                ✕
              </button>
            </div>
            <button
              onClick={() => setGuideEnabled(false)}
              className="mt-2 text-[11px] text-slate-500 transition hover:text-slate-300"
            >
              turn off tips
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
