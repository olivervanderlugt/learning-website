import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { NodeStatus, Progress } from './types'

interface View {
  name: 'map' | 'lesson'
  nodeId?: string
}

interface AppState extends Progress {
  view: View
  openLesson: (nodeId: string) => void
  backToMap: () => void
  completeScreen: (nodeId: string, screenIndex: number) => void
  recordQuizScore: (nodeId: string, score: number) => void
  masterNode: (nodeId: string, xpGain: number) => void
  resetProgress: () => void
  importProgress: (data: Progress) => void
}

const initialProgress: Progress = {
  version: 1,
  xp: 0,
  completedScreens: [],
  masteredNodeIds: [],
  quizScores: {},
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialProgress,
      view: { name: 'map' },
      openLesson: (nodeId) => set({ view: { name: 'lesson', nodeId } }),
      backToMap: () => set({ view: { name: 'map' } }),
      completeScreen: (nodeId, screenIndex) =>
        set((s) => {
          const key = `${nodeId}:${screenIndex}`
          if (s.completedScreens.includes(key)) return s
          return { completedScreens: [...s.completedScreens, key] }
        }),
      recordQuizScore: (nodeId, score) =>
        set((s) => ({
          quizScores: {
            ...s.quizScores,
            [nodeId]: Math.max(s.quizScores[nodeId] ?? 0, score),
          },
        })),
      masterNode: (nodeId, xpGain) =>
        set((s) =>
          s.masteredNodeIds.includes(nodeId)
            ? s
            : { masteredNodeIds: [...s.masteredNodeIds, nodeId], xp: s.xp + xpGain },
        ),
      resetProgress: () => set({ ...initialProgress }),
      importProgress: (data) =>
        set({
          version: 1,
          xp: data.xp ?? 0,
          completedScreens: data.completedScreens ?? [],
          masteredNodeIds: data.masteredNodeIds ?? [],
          quizScores: data.quizScores ?? {},
        }),
    }),
    {
      name: 'learn-progress-v1',
      partialize: (s): Progress => ({
        version: s.version,
        xp: s.xp,
        completedScreens: s.completedScreens,
        masteredNodeIds: s.masteredNodeIds,
        quizScores: s.quizScores,
      }),
    },
  ),
)

/** Node status is computed, never stored. */
export function nodeStatus(
  nodeId: string,
  prereqIds: string[],
  masteredNodeIds: string[],
): NodeStatus {
  if (masteredNodeIds.includes(nodeId)) return 'mastered'
  return prereqIds.every((p) => masteredNodeIds.includes(p)) ? 'available' : 'locked'
}
