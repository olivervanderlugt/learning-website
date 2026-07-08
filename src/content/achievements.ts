import { domains, nodes } from './curriculum'
import { REVIEW_FIRST_INTERVAL_DAYS } from '../store'
import type { Progress } from '../types'

/** The slice of Progress that stats/achievements derive from. */
export type ProgressSlice = Pick<
  Progress,
  'xp' | 'masteredNodeIds' | 'knownNodeIds' | 'quizScores' | 'reviews'
>

export interface DomainStat {
  id: string
  title: string
  subject: string
  mastered: number
  total: number
  examPassed: boolean
}

export interface Stats {
  xp: number
  mastered: number
  totalNodes: number
  examsPassed: number
  totalExams: number
  perfectQuizzes: number
  reviewsCompleted: number
  knownMarks: number
  domainsTouched: number
  domainsCompleted: number
  perDomain: DomainStat[]
}

export interface Achievement {
  id: string
  icon: string
  title: string
  desc: string
  unlocked: boolean
  /** e.g. "7/10" toward the goal, for locked ones. */
  progress?: string
}

const examNodes = nodes.filter((n) => n.isExam)
const depthChainIntros = [
  ...new Set(nodes.filter((n) => /-2$/.test(n.id)).map((n) => n.id.replace(/-2$/, ''))),
]

export function computeStats(p: ProgressSlice): Stats {
  const mastered = new Set(p.masteredNodeIds)
  const perDomain: DomainStat[] = domains.map((d) => {
    const ns = nodes.filter((n) => n.domainId === d.id)
    const exam = ns.find((n) => n.isExam)
    return {
      id: d.id,
      title: d.title,
      subject: ns[0]?.subject ?? 'cs',
      mastered: ns.filter((n) => mastered.has(n.id)).length,
      total: ns.length,
      examPassed: !!exam && mastered.has(exam.id),
    }
  })
  return {
    xp: p.xp,
    mastered: mastered.size,
    totalNodes: nodes.length,
    examsPassed: examNodes.filter((n) => mastered.has(n.id)).length,
    totalExams: examNodes.length,
    perfectQuizzes: Object.values(p.quizScores).filter((s) => s >= 1).length,
    // A review counts as completed once its interval has grown past the seed value.
    reviewsCompleted: Object.values(p.reviews).filter(
      (r) => r.intervalDays > REVIEW_FIRST_INTERVAL_DAYS,
    ).length,
    knownMarks: p.knownNodeIds.length,
    domainsTouched: perDomain.filter((d) => d.mastered > 0).length,
    // d.total > 0 guard: an empty domain must not count as "completed".
    domainsCompleted: perDomain.filter((d) => d.total > 0 && d.mastered === d.total).length,
    perDomain,
  }
}

export function computeAchievements(p: ProgressSlice): Achievement[] {
  const s = computeStats(p)
  const mastered = new Set(p.masteredNodeIds)
  // A chain counts when the intro and every depth node that EXISTS for it is
  // mastered — hardcoding -2 and -3 would break for 2-lesson or 5-lesson chains.
  const nodeIds = new Set(nodes.map((n) => n.id))
  const chainsDone = depthChainIntros.filter((base) => {
    if (!mastered.has(base)) return false
    for (let d = 2; nodeIds.has(`${base}-${d}`); d++) {
      if (!mastered.has(`${base}-${d}`)) return false
    }
    return true
  }).length

  const a = (
    id: string,
    icon: string,
    title: string,
    desc: string,
    unlocked: boolean,
    progress?: string,
  ): Achievement => ({ id, icon, title, desc, unlocked, progress: unlocked ? undefined : progress })

  return [
    a('first-steps', '🚀', 'First Steps', 'Master your first lesson.', s.mastered >= 1),
    a('double-digits', '🔟', 'Double Digits', 'Master 10 lessons.', s.mastered >= 10, `${s.mastered}/10`),
    a('scholar', '🎓', 'Scholar', 'Master 25 lessons.', s.mastered >= 25, `${s.mastered}/25`),
    a(
      'half-map',
      '🗺️',
      'Half the Map',
      'Master half of every node on the map.',
      s.mastered * 2 >= s.totalNodes,
      `${s.mastered}/${Math.ceil(s.totalNodes / 2)}`,
    ),
    a('first-exam', '🏅', 'Examined', 'Pass your first module exam.', s.examsPassed >= 1),
    a(
      'exam-collector',
      '👑',
      'Exam Collector',
      'Pass 5 module exams.',
      s.examsPassed >= 5,
      `${s.examsPassed}/5`,
    ),
    a(
      'valedictorian',
      '🏆',
      'Valedictorian',
      'Pass every module exam on the map.',
      s.totalExams > 0 && s.examsPassed >= s.totalExams,
      `${s.examsPassed}/${s.totalExams}`,
    ),
    a('perfectionist', '💯', 'Perfectionist', 'Score 100% on any quiz or exam.', s.perfectQuizzes >= 1),
    a('kilowatt', '⚡', 'Kilowatt', 'Earn 1000 XP.', s.xp >= 1000, `${s.xp}/1000`),
    a(
      'polymath',
      '🧠',
      'Polymath',
      'Master a lesson in 5 different domains.',
      s.domainsTouched >= 5,
      `${s.domainsTouched}/5`,
    ),
    a(
      'renaissance',
      '🌍',
      'Renaissance',
      'Master a lesson in every domain.',
      s.domainsTouched >= s.perDomain.length,
      `${s.domainsTouched}/${s.perDomain.length}`,
    ),
    a(
      'deep-diver',
      '⛓️',
      'Deep Diver',
      'Master a full deep-dive chain — the intro and every one of its depth lessons.',
      chainsDone >= 1,
    ),
    a(
      'robot-whisperer',
      '🤖',
      'Robot Whisperer',
      'Master the entire Robotics Bridge domain — the goal of the whole map.',
      s.perDomain.some((d) => d.id === 'robotics-bridge' && d.mastered === d.total),
    ),
    a(
      'gardener',
      '🔁',
      'Gardener',
      'Complete a spaced-repetition review — knowledge that stays alive.',
      s.reviewsCompleted >= 1,
    ),
  ]
}
