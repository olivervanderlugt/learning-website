import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MAX_TIER, nodeById } from './content/curriculum'
import type { NodeStatus, Progress, ReviewState } from './types'

// ---- Spaced repetition (Stage 4) ----
export const DAY_MS = 24 * 60 * 60 * 1000
/** First review comes this many days after mastery. */
export const REVIEW_FIRST_INTERVAL_DAYS = 3
/** Interval doubles per successful review, up to this cap. */
export const REVIEW_MAX_INTERVAL_DAYS = 60

interface View {
  name: 'map' | 'lesson' | 'cumulativeReview'
  nodeId?: string
}

interface AppState extends Progress {
  view: View
  /** Transient: the learner asked to replay the tour (not persisted). */
  onboardingReplay: boolean
  /** Transient: domain the map should fly to once it mounts (onboarding hand-off). */
  pendingFocusDomainId: string | null
  /** Open a lesson from the map (resumes from lessonProgress). */
  openLesson: (nodeId: string) => void
  /** Full exit to the map, clearing any interlink detour stack. */
  backToMap: () => void
  /** Open the cumulative cross-domain review flow (samples from mastered nodes). */
  startCumulativeReview: () => void
  /** Jump to a linked lesson mid-lesson, saving this spot to return to. */
  jumpToLesson: (fromNodeId: string, fromScreenIndex: number, toNodeId: string) => void
  /** Leave the current lesson: pop the detour stack (return to parent) or go to map. */
  exitLesson: () => void
  /** Persist the current screen index so the lesson resumes later. */
  setLessonScreen: (nodeId: string, screenIndex: number) => void
  completeScreen: (nodeId: string, screenIndex: number) => void
  recordQuizScore: (nodeId: string, score: number) => void
  masterNode: (nodeId: string, xpGain: number) => void
  /** Mark "I already know this" — satisfies downstream suggestions, no XP. */
  markKnown: (nodeId: string) => void
  /** Undo an "I already know this" mark (back to normal). */
  unmarkKnown: (nodeId: string) => void
  /** Finish a review: success doubles the interval, failure resets it to the start. */
  completeReview: (nodeId: string, success: boolean) => void
  /** Backfill review schedules for nodes mastered before this feature existed. */
  seedMissingReviews: () => void
  toggleTheme: () => void
  /** Finish (or skip) the first-run tour; a chosen domain makes the map fly there. */
  completeOnboarding: (focusDomainId?: string) => void
  /** Show the tour again from step 1, and let every guide tip fire once more. */
  replayOnboarding: () => void
  setGuideEnabled: (on: boolean) => void
  /** Mark a guide tip as seen so it never returns. */
  dismissHint: (id: string) => void
  /** Consume the queued map focus (called once the map has flown there). */
  clearPendingFocus: () => void
  /** Pick the map's content layer (0 = essentials, up to MAX_TIER = everything). */
  setViewTier: (tier: number) => void
  resetProgress: () => void
  importProgress: (data: Partial<Progress> & { showDepth?: boolean }) => void
}

const initialProgress: Progress = {
  version: 1,
  xp: 0,
  completedScreens: [],
  masteredNodeIds: [],
  knownNodeIds: [],
  quizScores: {},
  lessonProgress: {},
  navStack: [],
  reviews: {},
  theme: 'dark',
  onboardingDone: false,
  guideEnabled: true,
  guideSeen: [],
  viewTier: MAX_TIER,
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialProgress,
      view: { name: 'map' },
      onboardingReplay: false,
      pendingFocusDomainId: null,

      openLesson: (nodeId) => set({ view: { name: 'lesson', nodeId }, navStack: [] }),

      backToMap: () => set({ view: { name: 'map' }, navStack: [] }),

      startCumulativeReview: () => set({ view: { name: 'cumulativeReview' }, navStack: [] }),

      jumpToLesson: (fromNodeId, fromScreenIndex, toNodeId) =>
        set((s) => ({
          view: { name: 'lesson', nodeId: toNodeId },
          navStack: [...s.navStack, { nodeId: fromNodeId, screenIndex: fromScreenIndex }],
          lessonProgress: { ...s.lessonProgress, [fromNodeId]: fromScreenIndex },
        })),

      exitLesson: () =>
        set((s) => {
          if (s.navStack.length === 0) return { view: { name: 'map' } }
          const stack = s.navStack.slice()
          const parent = stack.pop()!
          return {
            view: { name: 'lesson', nodeId: parent.nodeId },
            navStack: stack,
            lessonProgress: { ...s.lessonProgress, [parent.nodeId]: parent.screenIndex },
          }
        }),

      setLessonScreen: (nodeId, screenIndex) =>
        set((s) => ({ lessonProgress: { ...s.lessonProgress, [nodeId]: screenIndex } })),

      completeScreen: (nodeId, screenIndex) =>
        set((s) => {
          const key = `${nodeId}:${screenIndex}`
          if (s.completedScreens.includes(key)) return s
          return { completedScreens: [...s.completedScreens, key] }
        }),

      recordQuizScore: (nodeId, score) =>
        set((s) => ({
          quizScores: { ...s.quizScores, [nodeId]: Math.max(s.quizScores[nodeId] ?? 0, score) },
        })),

      masterNode: (nodeId, xpGain) =>
        set((s) =>
          s.masteredNodeIds.includes(nodeId)
            ? s
            : {
                masteredNodeIds: [...s.masteredNodeIds, nodeId],
                // Real mastery supersedes an "I already know this" mark.
                knownNodeIds: s.knownNodeIds.filter((id) => id !== nodeId),
                xp: s.xp + xpGain,
                reviews: {
                  ...s.reviews,
                  [nodeId]: { lastSeen: Date.now(), intervalDays: REVIEW_FIRST_INTERVAL_DAYS },
                },
              },
        ),

      markKnown: (nodeId) =>
        set((s) =>
          s.knownNodeIds.includes(nodeId) || s.masteredNodeIds.includes(nodeId)
            ? s
            : { knownNodeIds: [...s.knownNodeIds, nodeId] },
        ),

      unmarkKnown: (nodeId) =>
        set((s) => ({ knownNodeIds: s.knownNodeIds.filter((id) => id !== nodeId) })),

      completeReview: (nodeId, success) =>
        set((s) => {
          const prev = s.reviews[nodeId]
          const intervalDays = success
            ? Math.min((prev?.intervalDays ?? REVIEW_FIRST_INTERVAL_DAYS) * 2, REVIEW_MAX_INTERVAL_DAYS)
            : REVIEW_FIRST_INTERVAL_DAYS
          return { reviews: { ...s.reviews, [nodeId]: { lastSeen: Date.now(), intervalDays } } }
        }),

      seedMissingReviews: () =>
        set((s) => {
          const missing = s.masteredNodeIds.filter((id) => !s.reviews[id])
          if (missing.length === 0) return s
          const seeded = { ...s.reviews }
          for (const id of missing)
            seeded[id] = { lastSeen: Date.now(), intervalDays: REVIEW_FIRST_INTERVAL_DAYS }
          return { reviews: seeded }
        }),

      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

      completeOnboarding: (focusDomainId) =>
        set(
          focusDomainId === undefined
            ? { onboardingDone: true, onboardingReplay: false }
            : {
                onboardingDone: true,
                onboardingReplay: false,
                pendingFocusDomainId: focusDomainId,
                // A replay can be finished from inside a lesson — land on the map.
                view: { name: 'map' },
                navStack: [],
              },
        ),

      // Clearing guideSeen replays the tips too: a replay is the full new-user run.
      replayOnboarding: () => set({ onboardingReplay: true, guideSeen: [] }),

      setGuideEnabled: (on) => set({ guideEnabled: on }),

      dismissHint: (id) =>
        set((s) => (s.guideSeen.includes(id) ? s : { guideSeen: [...s.guideSeen, id] })),

      clearPendingFocus: () => set({ pendingFocusDomainId: null }),

      setViewTier: (tier) => set({ viewTier: Math.max(0, Math.min(MAX_TIER, tier)) }),

      resetProgress: () => set((s) => ({ ...initialProgress, theme: s.theme, viewTier: s.viewTier })),

      importProgress: (data) => {
        // A hand-edited or truncated export can carry wrong shapes (e.g. a string
        // where an array belongs) — spreading those into state corrupts it later.
        const strings = (v: unknown): string[] =>
          Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
        const record = <T,>(v: unknown, ok: (x: unknown) => x is T): Record<string, T> => {
          if (typeof v !== 'object' || v === null || Array.isArray(v)) return {}
          return Object.fromEntries(Object.entries(v).filter(([, x]) => ok(x)))
        }
        const isNum = (x: unknown): x is number => typeof x === 'number' && Number.isFinite(x)
        const isReview = (x: unknown): x is ReviewState =>
          typeof x === 'object' && x !== null &&
          isNum((x as ReviewState).lastSeen) && isNum((x as ReviewState).intervalDays)
        set((s) => ({
          version: 1,
          // XP is a non-negative integer; a hand-edited export could carry junk.
          xp: isNum(data.xp) ? Math.max(0, Math.floor(data.xp)) : 0,
          completedScreens: strings(data.completedScreens),
          masteredNodeIds: strings(data.masteredNodeIds),
          knownNodeIds: strings(data.knownNodeIds),
          // Quiz scores are fractions in [0,1] — drop anything out of range.
          quizScores: record(data.quizScores, (x): x is number => isNum(x) && x >= 0 && x <= 1),
          lessonProgress: record(data.lessonProgress, isNum),
          navStack: [],
          reviews: record(data.reviews, isReview),
          theme: data.theme === 'light' || data.theme === 'dark' ? data.theme : s.theme,
          onboardingDone: data.onboardingDone === true,
          // Tips default ON — an export predating the guide shouldn't silence it.
          guideEnabled: typeof data.guideEnabled === 'boolean' ? data.guideEnabled : true,
          guideSeen: strings(data.guideSeen),
          // Accept both the current field and the short-lived boolean it replaced.
          viewTier: isNum(data.viewTier)
            ? Math.max(0, Math.min(MAX_TIER, data.viewTier))
            : typeof data.showDepth === 'boolean'
              ? (data.showDepth ? MAX_TIER : 0)
              : s.viewTier,
        }))
      },
    }),
    {
      name: 'learn-progress-v1',
      partialize: (s): Progress => ({
        version: s.version,
        xp: s.xp,
        completedScreens: s.completedScreens,
        masteredNodeIds: s.masteredNodeIds,
        knownNodeIds: s.knownNodeIds,
        quizScores: s.quizScores,
        lessonProgress: s.lessonProgress,
        navStack: s.navStack,
        reviews: s.reviews,
        theme: s.theme,
        onboardingDone: s.onboardingDone,
        guideEnabled: s.guideEnabled,
        guideSeen: s.guideSeen,
        viewTier: s.viewTier,
      }),
    },
  ),
)

// Dev-only handle so browser-driven verification reaches the LIVE store
// (dynamic import('/src/store.ts') gets a parallel instance under Vite HMR).
if (import.meta.env.DEV) (globalThis as unknown as { __store?: typeof useStore }).__store = useStore

/** Mastered nodes whose review is due (computed, never stored). */
export function dueReviewIds(
  reviews: Record<string, ReviewState>,
  masteredNodeIds: string[],
  now = Date.now(),
): string[] {
  return masteredNodeIds.filter((id) => {
    // Ignore ids that no longer exist (a stale imported/persisted blob).
    if (!nodeById.has(id)) return false
    const r = reviews[id]
    return r !== undefined && now >= r.lastSeen + r.intervalDays * DAY_MS
  })
}

/**
 * Gentle mastery-decay for a mastered node's map badge (Stage 4, computed).
 * 0 while the review isn't due yet, then ramps 0→1 over one full interval past
 * the due date (capped at 1). Drives a subtle fade/wilt on the map — never a
 * penalty to XP or status, just a nudge that the memory is going stale.
 */
export function reviewDecay(review: ReviewState | undefined, now = Date.now()): number {
  if (!review) return 0
  const intervalMs = review.intervalDays * DAY_MS
  const dueAt = review.lastSeen + intervalMs
  if (now < dueAt || intervalMs <= 0) return 0
  return Math.min(1, (now - dueAt) / intervalMs)
}

/**
 * Node status is computed, never stored. Soft gating: 'later' nodes are fully
 * playable — the status only drives what the UI SUGGESTS doing first.
 */
export function nodeStatus(
  nodeId: string,
  prereqIds: string[],
  masteredNodeIds: string[],
  knownNodeIds: string[] = [],
): NodeStatus {
  if (masteredNodeIds.includes(nodeId)) return 'mastered'
  if (knownNodeIds.includes(nodeId)) return 'known'
  const satisfied = (p: string) => masteredNodeIds.includes(p) || knownNodeIds.includes(p)
  return prereqIds.every(satisfied) ? 'available' : 'later'
}
