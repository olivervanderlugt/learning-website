import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useStore } from '../store'
import { computeAchievements } from '../content/achievements'
import type { Achievement } from '../content/achievements'

const TOAST_MS = 6000

/**
 * Watches progress and pops a toast whenever an achievement flips to unlocked
 * (e.g. right after a lesson's mastery screen). Session-scoped: achievements
 * already unlocked when the app loads are never re-announced.
 */
export default function AchievementToasts() {
  const xp = useStore((s) => s.xp)
  const masteredNodeIds = useStore((s) => s.masteredNodeIds)
  const knownNodeIds = useStore((s) => s.knownNodeIds)
  const quizScores = useStore((s) => s.quizScores)
  const reviews = useStore((s) => s.reviews)

  /** Each toast gets a unique instance key so a dismiss timer only removes its own toast. */
  const [toasts, setToasts] = useState<{ key: number; ach: Achievement }[]>([])
  const nextKey = useRef(0)
  /** Ids seen unlocked so far this session; null until the first compute. */
  const seen = useRef<Set<string> | null>(null)

  useEffect(() => {
    const unlocked = computeAchievements({ xp, masteredNodeIds, knownNodeIds, quizScores, reviews })
      .filter((a) => a.unlocked)
    const ids = new Set(unlocked.map((a) => a.id))
    if (seen.current === null) {
      // First run: snapshot without announcing pre-existing achievements.
      seen.current = ids
      return
    }
    const fresh = unlocked.filter((a) => !seen.current!.has(a.id))
    seen.current = ids // also forgets locked ones, so re-earning after a reset re-announces
    if (fresh.length === 0) return
    const entries = fresh.map((ach) => ({ key: nextKey.current++, ach }))
    setToasts((q) => [...q, ...entries])
    for (const e of entries) {
      setTimeout(() => setToasts((q) => q.filter((t) => t.key !== e.key)), TOAST_MS)
    }
  }, [xp, masteredNodeIds, knownNodeIds, quizScores, reviews])

  return (
    <div className="pointer-events-none absolute bottom-6 left-1/2 z-50 flex w-80 -translate-x-1/2 flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.button
            key={t.key}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            onClick={() => setToasts((q) => q.filter((x) => x.key !== t.key))}
            title="Dismiss"
            className="pointer-events-auto flex items-start gap-3 rounded-xl border border-amber-500/40 bg-slate-900 p-3 text-left shadow-xl shadow-amber-500/10"
          >
            <span className="text-2xl leading-none">{t.ach.icon}</span>
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-300">
                🏆 Achievement unlocked
              </span>
              <span className="block text-sm font-bold text-slate-100">{t.ach.title}</span>
              <span className="mt-0.5 block text-xs leading-snug text-slate-400">{t.ach.desc}</span>
            </span>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  )
}
