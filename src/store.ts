import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { NodeStatus, Progress, ReviewState } from './types'

// ---- Spaced repetition (Stage 4) ----
export const DAY_MS = 24 * 60 * 60 * 1000
/** First review comes this many days after mastery. */
export const REVIEW_FIRST_INTERVAL_DAYS = 3
/** Interval doubles per successful review, up to this cap. */
export const REVIEW_MAX_INTERVAL_DAYS = 60

interface View {
  name: 'map' | 'lesson'
  nodeId?: string
}

interface AppState extends Progress {
  view: View
  /** Open a lesson from the map (resumes from lessonProgress). */
  openLesson: (nodeId: string) => void
  /** Full exit to the map, clearing any interlink detour stack. */
  backToMap: () => void
  /** Jump to a linked lesson mid-lesson, saving this spot to return to. */
  jumpToLesson: (fromNodeId: string, fromScreenIndex: number, toNodeId: string) => void
  /** Leave the current lesson: pop the detour stack (return to parent) or go to map. */
  exitLesson: () => void
  /** Persist the current screen index so the lesson resumes later. */
  setLessonScreen: (nodeId: string, screenIndex: number) => void
  completeScreen: (nodeId: string, screenIndex: number) => void
  recordQuizScore: (nodeId: string, score: number) => void
  masterNode: (nodeId: string, xpGain: number) => void
  /** Finish a review: success doubles the interval, failure resets it to the start. */
  completeReview: (nodeId: string, success: boolean) => void
  /** Backfill review schedules for nodes mastered before this feature existed. */
  seedMissingReviews: () => void
  toggleTheme: () => void
  resetProgress: () => void
  importProgress: (data: Partial<Progress>) => void
}

const initialProgress: Progress = {
  version: 1,
  xp: 0,
  completedScreens: [],
  masteredNodeIds: [],
  quizScores: {},
  lessonProgress: {},
  navStack: [],
  reviews: {},
  theme: 'dark',
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialProgress,
      view: { name: 'map' },

      openLesson: (nodeId) => set({ view: { name: 'lesson', nodeId }, navStack: [] }),

      backToMap: () => set({ view: { name: 'map' }, navStack: [] }),

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
                xp: s.xp + xpGain,
                reviews: {
                  ...s.reviews,
                  [nodeId]: { lastSeen: Date.now(), intervalDays: REVIEW_FIRST_INTERVAL_DAYS },
                },
              },
        ),

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

      resetProgress: () => set((s) => ({ ...initialProgress, theme: s.theme })),

      importProgress: (data) =>
        set((s) => ({
          version: 1,
          xp: data.xp ?? 0,
          completedScreens: data.completedScreens ?? [],
          masteredNodeIds: data.masteredNodeIds ?? [],
          quizScores: data.quizScores ?? {},
          lessonProgress: data.lessonProgress ?? {},
          navStack: [],
          reviews: data.reviews ?? {},
          theme: data.theme ?? s.theme,
        })),
    }),
    {
      name: 'learn-progress-v1',
      partialize: (s): Progress => ({
        version: s.version,
        xp: s.xp,
        completedScreens: s.completedScreens,
        masteredNodeIds: s.masteredNodeIds,
        quizScores: s.quizScores,
        lessonProgress: s.lessonProgress,
        navStack: s.navStack,
        reviews: s.reviews,
        theme: s.theme,
      }),
    },
  ),
)

/** Mastered nodes whose review is due (computed, never stored). */
export function dueReviewIds(
  reviews: Record<string, ReviewState>,
  masteredNodeIds: string[],
  now = Date.now(),
): string[] {
  return masteredNodeIds.filter((id) => {
    const r = reviews[id]
    return r !== undefined && now >= r.lastSeen + r.intervalDays * DAY_MS
  })
}

/** Node status is computed, never stored. */
export function nodeStatus(
  nodeId: string,
  prereqIds: string[],
  masteredNodeIds: string[],
): NodeStatus {
  if (masteredNodeIds.includes(nodeId)) return 'mastered'
  return prereqIds.every((p) => masteredNodeIds.includes(p)) ? 'available' : 'locked'
}
