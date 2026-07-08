import { lessons } from '../content/lessons'
import { nodeById } from '../content/curriculum'
import { DAY_MS } from '../store'
import { shuffle } from '../shuffle'
import type { QuizQuestion, ReviewState, Subject } from '../types'

/**
 * Cumulative cross-domain review ENGINE (Stage 4).
 *
 * It authors NO new content: it SAMPLES fresh retrieval questions out of the
 * quiz + extra-practice pools already sitting in each node's lesson, then mixes
 * them across domains into one short exam. Completing it feeds the normal
 * spaced-repetition schedule (completeReview per contributing node), so a
 * cumulative pass pushes those nodes' next reviews out just like a solo retake.
 */

export interface ReviewItem {
  nodeId: string
  title: string
  subject: Subject
  domainId: string
  question: QuizQuestion
}

/** Every retrieval question a node can contribute (lesson quizzes + extra practice). */
function questionsForNode(nodeId: string): QuizQuestion[] {
  const lesson = lessons[nodeId]
  if (!lesson) return []
  const fromQuizzes = lesson.screens.flatMap((s) =>
    s.kind === 'quiz' ? [{ question: s.question, options: s.options, correctIndex: s.correctIndex, explanations: s.explanations }] : [],
  )
  return [...fromQuizzes, ...(lesson.extraPractice ?? [])]
}

/** Mastered nodes that actually have questions to draw from. */
function candidateNodeIds(masteredNodeIds: string[]): string[] {
  return masteredNodeIds.filter((id) => nodeById.has(id) && questionsForNode(id).length > 0)
}

/**
 * Eligible once enough mastered material spans at least two domains — a
 * cumulative review of a single topic isn't cumulative.
 */
export function cumulativeReviewEligible(masteredNodeIds: string[]): boolean {
  const ids = candidateNodeIds(masteredNodeIds)
  if (ids.length < 4) return false
  const domains = new Set(ids.map((id) => nodeById.get(id)!.domainId))
  return domains.size >= 2
}

/** The size cap on one cumulative review. */
export const CUMULATIVE_REVIEW_COUNT = 10

function pickOne<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Build one cumulative review. Picks nodes round-robin across domains (maximum
 * cross-domain spread), preferring the most-overdue nodes within each domain,
 * then samples one random question from each chosen node.
 */
export function buildCumulativeReview(
  masteredNodeIds: string[],
  reviews: Record<string, ReviewState>,
  count = CUMULATIVE_REVIEW_COUNT,
  now = Date.now(),
): ReviewItem[] {
  const ids = candidateNodeIds(masteredNodeIds)
  if (ids.length === 0) return []

  // How overdue each node is (larger = staler; negative = not due yet).
  const overdue = (id: string): number => {
    const r = reviews[id]
    if (!r) return 0
    return now - (r.lastSeen + r.intervalDays * DAY_MS)
  }

  // Group by domain; within a domain, staler-first with a random tiebreak so
  // equally-fresh nodes still rotate between sessions.
  const byDomain = new Map<string, string[]>()
  for (const id of ids) {
    const domainId = nodeById.get(id)!.domainId
    if (!byDomain.has(domainId)) byDomain.set(domainId, [])
    byDomain.get(domainId)!.push(id)
  }
  for (const list of byDomain.values()) {
    shuffle(list)
    list.sort((a, b) => overdue(b) - overdue(a))
  }

  // Round-robin across domains (shuffled order) until we hit the count.
  const domainQueues = shuffle([...byDomain.values()])
  const chosen: string[] = []
  let progressed = true
  while (chosen.length < count && progressed) {
    progressed = false
    for (const q of domainQueues) {
      if (chosen.length >= count) break
      const next = q.shift()
      if (next !== undefined) {
        chosen.push(next)
        progressed = true
      }
    }
  }

  const items: ReviewItem[] = chosen.map((id) => {
    const node = nodeById.get(id)!
    return {
      nodeId: id,
      title: node.title,
      subject: node.subject,
      domainId: node.domainId,
      question: pickOne(questionsForNode(id)),
    }
  })
  return shuffle(items)
}
