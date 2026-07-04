import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { lessons } from '../content/lessons'
import { nodeById, nodes as curriculum, XP_PER_NODE } from '../content/curriculum'
import { useStore } from '../store'
import type { Screen } from '../types'
import ExplainScreenView from './screens/ExplainScreenView'
import PredictScreenView from './screens/PredictScreenView'
import QuizScreenView from './screens/QuizScreenView'
import { games } from './games'

export default function LessonPlayer({ nodeId }: { nodeId: string }) {
  const lesson = lessons[nodeId]
  const node = nodeById.get(nodeId)
  const backToMap = useStore((s) => s.backToMap)
  const completeScreen = useStore((s) => s.completeScreen)

  const [idx, setIdx] = useState(0)
  // quiz screen index → was the first committed answer correct
  const [quizResults, setQuizResults] = useState<Record<number, boolean>>({})

  const quizIndices = useMemo(
    () => (lesson ? lesson.screens.flatMap((s, i) => (s.kind === 'quiz' ? [i] : [])) : []),
    [lesson],
  )

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
    return (
      <ResultsScreen
        nodeId={nodeId}
        correct={correct}
        total={quizIndices.length}
        onRetry={retryQuiz}
      />
    )
  }

  const screen = screens[idx]

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col px-6">
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
      <p className="pb-4 text-xs font-bold uppercase tracking-wider text-slate-500">{node.title}</p>

      <div className="min-h-0 flex-1 overflow-y-auto pb-10">
        <ScreenView
          key={idx}
          screen={screen}
          questionNumber={screen.kind === 'quiz' ? quizIndices.indexOf(idx) + 1 : 0}
          totalQuestions={quizIndices.length}
          onQuizAnswer={(ok) => setQuizResults((r) => ({ ...r, [idx]: ok }))}
          onDone={advance}
        />
      </div>
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
      return (
        <div>
          {Game ? <Game onComplete={() => onDone()} /> : <p>Unknown game: {screen.gameId}</p>}
        </div>
      )
    }
    case 'gatePuzzle':
      return <p className="text-slate-400">Gate puzzles arrive in P3 — skipping.</p>
    case 'sandbox':
      return <p className="text-slate-400">Sandbox arrives in P3 — skipping.</p>
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
  const backToMap = useStore((s) => s.backToMap)
  const recordQuizScore = useStore((s) => s.recordQuizScore)
  const masterNode = useStore((s) => s.masterNode)
  const score = total > 0 ? correct / total : 1
  const passed = score >= 0.8

  // Snapshot the mastered set as it was when the results screen mounted, so the
  // unlock list doesn't vanish once the store commits this node as mastered.
  const before = useRef<string[] | null>(null)
  if (before.current === null) {
    before.current = useStore.getState().masteredNodeIds
  }
  const alreadyMastered = before.current.includes(nodeId)

  const newlyUnlocked = useMemo(() => {
    if (!passed) return []
    const prior = before.current ?? []
    const after = new Set([...prior, nodeId])
    return curriculum.filter(
      (n) =>
        n.prereqIds.includes(nodeId) &&
        !after.has(n.id) &&
        n.prereqIds.every((p) => after.has(p)) &&
        // it was locked before this mastery
        !n.prereqIds.every((p) => prior.includes(p)),
    )
  }, [passed, nodeId])

  // Commit results exactly once, after render.
  const committed = useRef(false)
  useEffect(() => {
    if (committed.current) return
    committed.current = true
    recordQuizScore(nodeId, score)
    if (passed) masterNode(nodeId, XP_PER_NODE)
  }, [nodeId, score, passed, recordQuizScore, masterNode])

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
              {!alreadyMastered && (
                <span className="ml-2 font-bold text-amber-300">+{XP_PER_NODE} XP</span>
              )}
            </p>
            {newlyUnlocked.length > 0 && (
              <div className="mt-5 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                  Unlocked
                </p>
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
              You got {correct}/{total} — mastery needs {Math.ceil(total * 0.8)}/{total}. That’s not
              a failure, it’s information: one idea hasn’t clicked yet. Skim the explanations again,
              then retake the quiz.
            </p>
          </>
        )}

        <div className="mt-7 flex justify-center gap-3">
          {!passed && (
            <button
              onClick={onRetry}
              className="rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-400"
            >
              Retake quiz
            </button>
          )}
          <button
            onClick={backToMap}
            className={
              passed
                ? 'rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-400'
                : 'rounded-lg border border-slate-700 px-5 py-2.5 text-sm text-slate-300 hover:bg-slate-800'
            }
          >
            Back to the map
          </button>
        </div>
      </motion.div>
    </div>
  )
}
