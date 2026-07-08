import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { useStore } from '../store'
import { buildCumulativeReview, type ReviewItem } from './cumulativeReview'
import { subjectStyles, subjectNames } from './SkillNode'
import QuizScreenView from './screens/QuizScreenView'

/**
 * The cumulative cross-domain review flow (Stage 4). Samples fresh retrieval
 * questions across mastered nodes (see cumulativeReview.ts), runs them as one
 * short mixed exam, and folds each answer back into that node's spaced-repetition
 * schedule. No XP — retention practice, not new mastery.
 */
export default function CumulativeReviewFlow() {
  const masteredNodeIds = useStore((s) => s.masteredNodeIds)
  const reviews = useStore((s) => s.reviews)
  const completeReview = useStore((s) => s.completeReview)
  const backToMap = useStore((s) => s.backToMap)

  // Build the sample ONCE per flow entry (don't reshuffle as reviews update).
  const items = useMemo(
    () => buildCumulativeReview(masteredNodeIds, reviews),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const [idx, setIdx] = useState(0)
  // nodeId → was the (first committed) answer correct.
  const [results, setResults] = useState<Record<string, boolean>>({})

  // ALL hooks run before any conditional return (rules of hooks). `item` is
  // undefined once we're past the last question / when there are none.
  const item = items[idx]
  // Stable screen object per question so QuizScreenView's option-shuffle memo
  // isn't invalidated on every parent re-render (which reshuffles on commit).
  const quizScreen = useMemo(
    () => (item ? { kind: 'quiz' as const, ...item.question } : null),
    [item],
  )

  if (items.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="text-slate-400">
          Master a few lessons across different subjects, then come back for a mixed review.
        </p>
        <button onClick={backToMap} className="text-sm text-cyan-400 hover:underline">
          ← Back to the map
        </button>
      </div>
    )
  }

  if (idx >= items.length || !item || !quizScreen) {
    return <CumulativeResults items={items} results={results} onExit={backToMap} />
  }

  const s = subjectStyles[item.subject]

  const onAnswer = (correct: boolean) => {
    setResults((r) => (item.nodeId in r ? r : { ...r, [item.nodeId]: correct }))
    // Fold this answer into the node's spaced-repetition schedule immediately.
    completeReview(item.nodeId, correct)
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col px-6">
      <div className="flex items-center gap-3 py-4">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-amber-400 transition-all duration-300"
            style={{ width: `${(idx / items.length) * 100}%` }}
          />
        </div>
        <span className="text-xs tabular-nums text-slate-500">
          {idx + 1}/{items.length}
        </span>
      </div>
      <div className="flex items-center justify-between pb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
          🎓 Cumulative review — mixed subjects
        </p>
        <span className={`rounded px-2 py-0.5 text-[11px] font-medium ${s.badge}`}>
          {subjectNames[item.subject]}
        </span>
      </div>
      <p className="pb-3 text-[11px] text-slate-500">
        From <span className="font-semibold text-slate-300">{item.title}</span>
      </p>

      <div className="min-h-0 flex-1 overflow-y-auto pb-10">
        <QuizScreenView
          key={idx}
          screen={quizScreen}
          questionNumber={idx + 1}
          totalQuestions={items.length}
          onAnswer={onAnswer}
          onDone={() => setIdx(idx + 1)}
        />
      </div>
    </div>
  )
}

function CumulativeResults({
  items,
  results,
  onExit,
}: {
  items: ReviewItem[]
  results: Record<string, boolean>
  onExit: () => void
}) {
  const total = items.length
  const correct = items.filter((it) => results[it.nodeId]).length
  const score = total > 0 ? correct / total : 1
  const pct = Math.round(score * 100)
  const strong = score >= 0.8

  // Wrong answers, so the learner knows exactly what to revisit.
  const missed = items.filter((it) => !results[it.nodeId])

  const openLesson = useStore((s) => s.openLesson)

  return (
    <div className="flex h-full items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.45 }}
        className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 text-center"
      >
        <div className="text-6xl">{strong ? '🎓' : '🔁'}</div>
        <h2 className="mt-4 text-2xl font-black">
          {strong ? 'Knowledge holds up!' : 'Refreshed a few memories'}
        </h2>
        <p className="mt-2 text-slate-300">
          {correct}/{total} correct across {new Set(items.map((i) => i.domainId)).size} subjects
          <span className="ml-2 font-bold text-amber-300">{pct}%</span>
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          Each answer nudged that node's review schedule — right answers push the next review
          further out, misses bring it back sooner. No XP: this is retention practice.
        </p>

        {missed.length > 0 && (
          <div className="mt-5 text-left">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Worth another look
            </p>
            <div className="mt-2 space-y-1.5">
              {missed.map((it) => {
                const s = subjectStyles[it.subject]
                return (
                  <button
                    key={it.nodeId}
                    onClick={() => openLesson(it.nodeId)}
                    className="flex w-full items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-left text-sm text-slate-200 hover:border-slate-600"
                  >
                    <span className={`h-2 w-2 shrink-0 rounded-full ${s.dot}`} />
                    <span className="min-w-0 truncate">{it.title}</span>
                    <span className="ml-auto shrink-0 text-xs text-cyan-400">review →</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <button
          onClick={onExit}
          className="mt-7 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-400"
        >
          Back to the map
        </button>
      </motion.div>
    </div>
  )
}
