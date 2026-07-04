// ---------- Knowledge graph ----------

export type Subject = 'cs' | 'physics' | 'engineering' | 'math' | 'robotics'

/** Curated external material shown in the node detail panel ("Go deeper"). */
export interface Resource {
  title: string
  url: string
  type: 'video' | 'interactive' | 'article' | 'book' | 'course'
  /** One line: why THIS resource, what to get from it. */
  note: string
}

export interface KnowledgeNode {
  id: string
  title: string
  subject: Subject
  description: string
  /** One line: why this matters for building real things (especially robots). */
  whyItMatters: string
  prereqIds: string[]
  /** Parent domain group, e.g. 'how-computers-work'. */
  domainId: string
  /** Hand-authored map position. */
  x: number
  y: number
  /** True when the node has a playable lesson. */
  hasLesson?: boolean
  /** Node is a module exam (mixed retrieval test over several nodes). */
  isExam?: boolean
  /** Curated videos/links/books for going deeper than the lesson. */
  resources?: Resource[]
}

export interface Domain {
  id: string
  title: string
  /** Domain-level prerequisites (domain ids). */
  prereqDomainIds: string[]
}

/** Computed from Progress — never stored on the node. */
export type NodeStatus = 'locked' | 'available' | 'mastered'

// ---------- Lessons ----------

/** A jump to another lesson; the learner returns here afterward (interlinking). */
export interface LessonLink {
  nodeId: string
  label: string
}

/** Reusable quiz question shape (used by QuizScreen and a lesson's extra-practice pool). */
export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  /** One per option: why it's right, or which misconception it reflects. */
  explanations: string[]
}

export interface ExplainScreen {
  kind: 'explain'
  title: string
  /** Short paragraphs — max ~3 sentences each before interaction. */
  body: string[]
  /** Optional deeper explanation, revealed on demand via "Go deeper" (adaptive tempo). */
  deeper?: string[]
}

export interface PredictScreen {
  kind: 'predict'
  question: string
  options: string[]
  /** Index of the correct option. */
  correctIndex: number
  /** Shown after the learner commits: the outcome + explanation of the gap. */
  reveal: string
}

export interface QuizScreen extends QuizQuestion {
  kind: 'quiz'
}

export interface GatePuzzleScreen {
  kind: 'gatePuzzle'
  puzzleId: string
}

export interface SandboxScreen {
  kind: 'sandbox'
  presetId?: string
}

/** Interactive one-off widgets (binary counter, converter drills, adder demo). */
export interface GameScreen {
  kind: 'game'
  gameId: string
}

/** Live-code challenge: learner writes/edits JS, runs it, must match expected output. */
export interface CodeScreen {
  kind: 'code'
  prompt: string
  /** Starter code shown in the editor (worked-example fading: fuller → emptier). */
  starter: string
  /** Expected stdout from print() calls, compared line-by-line (trimmed). */
  expected: string
  /** Optional hint revealed after a wrong run. */
  hint?: string
  /** Shown on success. */
  success: string
}

export type Screen = (
  | ExplainScreen
  | PredictScreen
  | QuizScreen
  | GatePuzzleScreen
  | SandboxScreen
  | GameScreen
  | CodeScreen
) & {
  /** Optional screens (bonus exercises / deeper dives) get a Skip button. */
  optional?: boolean
  /** Links to prerequisite/related lessons; jumping saves this lesson's place and returns after. */
  links?: LessonLink[]
}

export interface Lesson {
  nodeId: string
  screens: Screen[]
  /** Pool of extra questions offered on the results screen for extra practice (adaptive tempo). */
  extraPractice?: QuizQuestion[]
}

// ---------- Gate sandbox ----------

export type GateKind = 'INPUT' | 'OUTPUT' | 'NAND' | 'NOT' | 'AND' | 'OR' | 'XOR'

export interface TruthTableRow {
  inputs: number[]
  outputs: number[]
}

export interface GatePuzzle {
  id: string
  title: string
  goal: string
  inputLabels: string[]
  outputLabels: string[]
  /** Gate types the learner may place. */
  palette: GateKind[]
  truthTable: TruthTableRow[]
  /** Shown before the puzzle: worked example / hint prose. */
  intro: string[]
}

// ---------- Progress (persisted) ----------

export type Theme = 'dark' | 'light'

/** A saved place to return to after an interlink detour. */
export interface NavEntry {
  nodeId: string
  screenIndex: number
}

export interface Progress {
  version: 1
  xp: number
  /** `${nodeId}:${screenIndex}` */
  completedScreens: string[]
  masteredNodeIds: string[]
  /** nodeId → best quiz score as fraction 0..1 */
  quizScores: Record<string, number>
  /** nodeId → last screen index reached, so a lesson resumes mid-session. */
  lessonProgress: Record<string, number>
  /** Return-stack for interlink detours (jump to a prereq lesson, come back). */
  navStack: NavEntry[]
  theme: Theme
}
