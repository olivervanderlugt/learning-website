import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { lessons } from '../content/lessons'
import { nodeById, nodes as curriculum, XP_PER_NODE } from '../content/curriculum'
import { useStore } from '../store'
import type { LessonLink, QuizQuestion, Screen } from '../types'
import ExplainScreenView from './screens/ExplainScreenView'
import PredictScreenView from './screens/PredictScreenView'
import QuizScreenView from './screens/QuizScreenView'
import GatePuzzleScreenView from './screens/GatePuzzleScreenView'
import CodeScreenView from './screens/CodeScreenView'
import { games } from './games'

export default function LessonPlayer({ nodeId }: { nodeId: string }) {
  const lesson = lessons[nodeId]
  const node = nodeById.get(nodeId)
  const backToMap = useStore((s) => s.backToMap)
  const completeScreen = useStore((s) => s.completeScreen)
  const setLessonScreen = useStore((s) => s.setLessonScreen)
  const jumpToLesson = useStore((s) => s.jumpToLesson)
  const exitLesson = useStore((s) => s.exitLesson)
  const navStack = useStore((s) => s.navStack)

  const quizIndices = useMemo(
    () => (lesson ? lesson.screens.flatMap((s, i) => (s.kind === 'quiz' ? [i] : [])) : []),
    [lesson],
  )

  // Resume from the saved position; restart the quiz section fresh so scoring stays whole.
  const initialIdx = useMemo(() => {
    if (!lesson) return 0
    const mastered = useStore.getState().masteredNodeIds.includes(nodeId)
    const raw = useStore.getState().lessonProgress[nodeId] ?? 0
    const firstQuiz = quizIndices[0] ?? lesson.screens.length
    const start = mastered ? 0 : Math.min(raw, firstQuiz)
    return start >= lesson.screens.length ? 0 : start
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeId, lesson])

  const [idx, setIdx] = useState(initialIdx)
  const [quizResults, setQuizResults] = useState<Record<number, boolean>>({})

  // Persist position as the learner advances (mid-session save).
  useEffect(() => {
    if (lesson) setLessonScreen(nodeId, idx)
  }, [nodeId, idx, lesson, setLessonScreen])

  if (!lesson || !node) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <p className="text-slate-400">This lesson isn’t built yet.</p>
        <button onClick={backToMap} className="text-sm text-cyan-400 hover:underline">
          ← Back to the map
        </button>
      </div>
    )
  }

  const screens = lesson.screens
  const finished = idx >= screens.length

  const advance = () => {
    completeScreen(nodeId, idx)
    setIdx(idx + 1)
  }

  const retryQuiz = () => {
    setQuizResults({})
    setIdx(quizIndices[0])
  }

  if (finished) {
    const correct = quizIndices.filter((i) => quizResults[i]).length
    return <ResultsScreen nodeId={nodeId} correct={correct} total={quizIndices.length} onRetry={retryQuiz} />
  }

  const screen = screens[idx]
  const wide = screen.kind === 'gatePuzzle' || screen.kind === 'sandbox'
  const parent = navStack[navStack.length - 1]
  const parentTitle = parent ? nodeById.get(parent.nodeId)?.title : undefined

  return (
    <div className={`mx-auto flex h-full w-full flex-col px-6 ${wide ? 'max-w-6xl' : 'max-w-2xl'}`}>
      {parentTitle && (
        <button
          onClick={exitLesson}
          className="mt-3 flex items-center gap-2 self-start rounded-lg border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300 hover:bg-violet-500/20"
        >
          ↩ You detoured here — return to “{parentTitle}”
        </button>
      )}
      <div className="flex items-center gap-3 py-4">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-cyan-400 transition-all duration-300"
            style={{ width: `${(idx / screens.length) * 100}%` }}
          />
        </div>
        <span className="text-xs tabular-nums text-slate-500">
          {idx + 1}/{screens.length}
        </span>
      </div>
      <div className="flex items-center justify-between pb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{node.title}</p>
        {screen.optional && (
          <button
            onClick={advance}
            className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 hover:bg-amber-500/20"
          >
            ⭐ Bonus challenge — skip →
          </button>
        )}
      </div>

      <div className={`min-h-0 flex-1 ${wide ? 'pb-4' : 'overflow-y-auto pb-10'}`}>
        <ScreenView
          key={idx}
          screen={screen}
          questionNumber={screen.kind === 'quiz' ? quizIndices.indexOf(idx) + 1 : 0}
          totalQuestions={quizIndices.length}
          onQuizAnswer={(ok) => setQuizResults((r) => ({ ...r, [idx]: ok }))}
          onDone={advance}
        />
        {screen.links && screen.links.length > 0 && (
          <LinkRow links={screen.links} onJump={(to) => jumpToLesson(nodeId, idx, to)} />
        )}
      </div>
    </div>
  )
}

function LinkRow({ links, onJump }: { links: LessonLink[]; onJump: (nodeId: string) => void }) {
  return (
    <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Need a refresher?</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {links.map((l) => {
          const exists = nodeById.get(l.nodeId)?.hasLesson
          return (
            <button
              key={l.nodeId}
              disabled={!exists}
              onClick={() => onJump(l.nodeId)}
              className="rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-40"
              title={exists ? 'Jump there and return here afterward' : 'Lesson not built yet'}
            >
              ↗ {l.label}
            </button>
          )
        })}
      </div>
      <p className="mt-2 text-[11px] text-slate-600">You’ll come right back here when you’re done.</p>
    </div>
  )
}

function ScreenView({
  screen,
  questionNumber,
  totalQuestions,
  onQuizAnswer,
  onDone,
}: {
  screen: Screen
  questionNumber: number
  totalQuestions: number
  onQuizAnswer: (correct: boolean) => void
  onDone: () => void
}) {
  switch (screen.kind) {
    case 'explain':
      return <ExplainScreenView screen={screen} onDone={onDone} />
    case 'predict':
      return <PredictScreenView screen={screen} onDone={onDone} />
    case 'quiz':
      return (
        <QuizScreenView
          screen={screen}
          questionNumber={questionNumber}
          totalQuestions={totalQuestions}
          onAnswer={onQuizAnswer}
          onDone={onDone}
        />
      )
    case 'game': {
      const Game = games[screen.gameId]
      return <div>{Game ? <Game onComplete={() => onDone()} /> : <p>Unknown game: {screen.gameId}</p>}</div>
    }
    case 'gatePuzzle':
      return <GatePuzzleScreenView screen={screen} onDone={onDone} />
    case 'code':
      return <CodeScreenView screen={screen} onDone={onDone} />
    case 'sandbox':
      return <p className="text-slate-400">Free-play sandbox coming soon — skipping.</p>
  }
}

function ResultsScreen({
  nodeId,
  correct,
  total,
  onRetry,
}: {
  nodeId: string
  correct: number
  total: number
  onRetry: () => void
}) {
  const exitLesson = useStore((s) => s.exitLesson)
  const recordQuizScore = useStore((s) => s.recordQuizScore)
  const masterNode = useStore((s) => s.masterNode)
  const completeReview = useStore((s) => s.completeReview)
  const navStack = useStore((s) => s.navStack)
  const score = total > 0 ? correct / total : 1
  const passed = score >= 0.8
  const lesson = lessons[nodeId]
  const [practicing, setPracticing] = useState(false)

  const parent = navStack[navStack.length - 1]
  const parentTitle = parent ? nodeById.get(parent.nodeId)?.title : undefined

  const before = useRef<string[] | null>(null)
  if (before.current === null) before.current = useStore.getState().masteredNodeIds
  const alreadyMastered = before.current.includes(nodeId)

  // Nodes that just became RECOMMENDED (soft gating — they were always playable).
  const newlyUnlocked = useMemo(() => {
    if (!passed) return []
    const known = useStore.getState().knownNodeIds
    const prior = new Set([...(before.current ?? []), ...known])
    const after = new Set([...prior, nodeId])
    return curriculum.filter(
      (n) =>
        n.prereqIds.includes(nodeId) &&
        !after.has(n.id) &&
        n.prereqIds.every((p) => after.has(p)) &&
        !n.prereqIds.every((p) => prior.has(p)),
    )
  }, [passed, nodeId])

  const committed = useRef(false)
  useEffect(() => {
    if (committed.current) return
    committed.current = true
    recordQuizScore(nodeId, score)
    if (passed) masterNode(nodeId, XP_PER_NODE)
    // Retaking an already-mastered node's quiz IS a spaced-repetition review:
    // passing pushes the next review out, failing pulls it back to the start.
    if (alreadyMastered) completeReview(nodeId, passed)
  }, [nodeId, score, passed, alreadyMastered, recordQuizScore, masterNode, completeReview])

  if (practicing && lesson?.extraPractice?.length) {
    return (
      <ExtraPractice
        questions={lesson.extraPractice}
        onExit={() => setPracticing(false)}
        onFinish={(passRate) => {
          // Finishing the whole pool counts as a review — but only a SUCCESSFUL
          // one if the learner actually got most of it right (same 0.8 bar as a
          // quiz retake); answering wrong shouldn't push the next review out.
          completeReview(nodeId, passRate >= 0.8)
          setPracticing(false)
        }}
      />
    )
  }

  const exitLabel = parentTitle ? `↩ Back to “${parentTitle}”` : 'Back to the map'

  return (
    <div className="flex h-full items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.45 }}
        className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 text-center"
      >
        {passed ? (
          <>
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', bounce: 0.6, delay: 0.15 }}
              className="text-6xl"
            >
              🏆
            </motion.div>
            <h2 className="mt-4 text-2xl font-black">Node mastered!</h2>
            <p className="mt-2 text-slate-300">
              Quiz: {correct}/{total} correct
              {!alreadyMastered && <span className="ml-2 font-bold text-amber-300">+{XP_PER_NODE} XP</span>}
            </p>
            {newlyUnlocked.length > 0 && (
              <div className="mt-5 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Up next on your path</p>
                {newlyUnlocked.map((n, i) => (
                  <motion.div
                    key={n.id}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.15 }}
                    className="rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-4 py-2.5 text-sm font-semibold text-cyan-200"
                  >
                    🔓 {n.title}
                  </motion.div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="text-6xl">🌱</div>
            <h2 className="mt-4 text-2xl font-black">Almost there</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              You got {correct}/{total} — mastery needs {Math.ceil(total * 0.8)}/{total}. That’s not a failure, it’s
              information: one idea hasn’t clicked yet. Skim the explanations again, then retake the quiz.
            </p>
          </>
        )}

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {!passed && (
            <button
              onClick={onRetry}
              className="rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-400"
            >
              Retake quiz
            </button>
          )}
          {lesson?.extraPractice?.length ? (
            <button
              onClick={() => setPracticing(true)}
              className="rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-5 py-2.5 text-sm font-bold text-emerald-300 hover:bg-emerald-500/20"
            >
              🔁 Extra practice ({lesson.extraPractice.length})
            </button>
          ) : null}
          <button
            onClick={exitLesson}
            className={
              passed
                ? 'rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-400'
                : 'rounded-lg border border-slate-700 px-5 py-2.5 text-sm text-slate-300 hover:bg-slate-800'
            }
          >
            {exitLabel}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

/** Optional extra-practice quiz run (adaptive tempo — not graded, just reinforcement). */
function ExtraPractice({
  questions,
  onExit,
  onFinish,
}: {
  questions: QuizQuestion[]
  /** Bail out early — does NOT count as a completed review. */
  onExit: () => void
  /** Reached the end of the pool — passRate is correct/total across the run. */
  onFinish: (passRate: number) => void
}) {
  const [i, setI] = useState(0)
  // How many the learner got right across the run (onAnswer fires once/question).
  const correct = useRef(0)
  const last = i === questions.length - 1
  // Stable object per question — QuizScreenView's option shuffle is keyed on the
  // screen object, so a fresh object every render would reshuffle mid-question
  // (same guard as CumulativeReviewFlow).
  const quizScreen = useMemo(() => ({ kind: 'quiz' as const, ...questions[i] }), [questions, i])
  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col px-6">
      <div className="flex items-center justify-between py-4">
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
          Extra practice {i + 1}/{questions.length}
        </p>
        <button onClick={onExit} className="text-xs text-slate-500 hover:text-slate-300">
          exit practice
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto pb-10">
        <QuizScreenView
          key={i}
          screen={quizScreen}
          questionNumber={i + 1}
          totalQuestions={questions.length}
          onAnswer={(ok) => {
            if (ok) correct.current += 1
          }}
          onDone={() => (last ? onFinish(correct.current / questions.length) : setI(i + 1))}
        />
      </div>
    </div>
  )
}
