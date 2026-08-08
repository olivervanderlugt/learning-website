// Guide mode: short contextual tips that surface the parts of the UI a new
// learner wouldn't find on their own. Copy AND the "is it relevant yet?"
// predicate live together here (achievements.ts convention); the only thing
// persisted is which ids have been dismissed (Progress.guideSeen).

/** The slice of progress a hint's `when` may look at. */
export interface GuideSlice {
  masteredNodeIds: string[]
  knownNodeIds: string[]
  dueCount: number
}

export interface GuideHint {
  id: string
  icon: string
  title: string
  body: string
  /** True once this tip is worth showing. */
  when: (s: GuideSlice) => boolean
}

/** ORDER IS PRIORITY: the first unseen hint whose `when` passes is the one shown. */
export const guideHints: GuideHint[] = [
  {
    id: 'map-basics',
    icon: '🧭',
    title: 'Two views worth knowing',
    body: '🧭 Roadmap in the header shows the long-term plan for the whole map; 🎯 Skills shows which employable skills the lessons actually cover.',
    when: () => true,
  },
  {
    id: 'xp-panel',
    icon: '⚡',
    title: 'Your XP badge is a button',
    body: 'Click ⚡ XP in the header for your stats, per-domain progress bars and achievements — all computed from what you have mastered.',
    when: (s) => s.masteredNodeIds.length >= 1,
  },
  {
    id: 'view-tiers',
    icon: '🌱',
    title: 'Declutter the map',
    body: 'The 🌱 / 🌳 selector top-left switches between essentials only and everything. Depth chains wait quietly under 🌳 until you want them.',
    when: (s) => s.masteredNodeIds.length >= 1,
  },
  {
    id: 'review-chip',
    icon: '🔁',
    title: 'Something is due for review',
    body: 'The 🔁 chip in the header lists mastered lessons whose memory is going stale. Re-pass the quiz and the interval doubles.',
    when: (s) => s.dueCount >= 1,
  },
  {
    id: 'known-mark',
    icon: '⏩',
    title: 'You marked a lesson known',
    body: '⏩ nodes count as done for everything downstream but earn no XP. Undo it any time from that node’s panel on the map.',
    when: (s) => s.knownNodeIds.length >= 1,
  },
]
