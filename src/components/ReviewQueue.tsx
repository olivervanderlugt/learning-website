import { useEffect, useRef, useState } from 'react'
import { nodeById } from '../content/curriculum'
import { useStore, dueReviewIds } from '../store'
import { subjectStyles } from './SkillNode'
import { useDismissable } from './useDismissable'

/**
 * Header chip + dropdown for spaced repetition (Stage 4): lists mastered nodes
 * whose review is due. A review = reopen the lesson and re-pass its quiz (or
 * finish its extra-practice pool); success doubles the interval, failure resets it.
 */
export default function ReviewQueue() {
  const reviews = useStore((s) => s.reviews)
  const masteredNodeIds = useStore((s) => s.masteredNodeIds)
  const openLesson = useStore((s) => s.openLesson)
  const seedMissingReviews = useStore((s) => s.seedMissingReviews)
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  // Nodes mastered before this feature existed get a schedule on first load.
  useEffect(() => {
    seedMissingReviews()
  }, [seedMissingReviews])

  useDismissable(open, () => setOpen(false), rootRef)

  const due = dueReviewIds(reviews, masteredNodeIds)
  if (due.length === 0) return null

  return (
    <div ref={rootRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        title="Mastered nodes due for a refresher — reviews keep knowledge from fading"
        className="rounded-lg border border-amber-500/50 bg-amber-500/10 px-3 py-1.5 text-sm font-semibold text-amber-300 hover:bg-amber-500/20"
      >
        🔁 {due.length} due
      </button>
      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 w-72 rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-xl">
          <p className="px-2 pb-1 pt-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Due for review — re-pass the quiz to lock it in
          </p>
          <ul className="max-h-72 overflow-y-auto">
            {due.map((id) => {
              const node = nodeById.get(id)
              if (!node) return null
              const s = subjectStyles[node.subject]
              return (
                <li key={id}>
                  <button
                    onClick={() => {
                      setOpen(false)
                      openLesson(id)
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-slate-200 hover:bg-slate-800"
                  >
                    <span className={`h-2 w-2 shrink-0 rounded-full ${s.dot}`} />
                    <span className="min-w-0 truncate">{node.title}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
