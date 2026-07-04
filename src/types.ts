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

export interface ExplainScreen {
  kind: 'explain'
  title: string
  /** Short paragraphs — max ~3 sentences each before interaction. */
  body: string[]
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

export interface QuizScreen {
  kind: 'quiz'
  question: string
  options: string[]
  correctIndex: number
  /** One per option: why it's right, or which misconception it reflects. */
  explanations: string[]
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

export type Screen = (
  | ExplainScreen
  | PredictScreen
  | QuizScreen
  | GatePuzzleScreen
  | SandboxScreen
  | GameScreen
) & {
  /** Optional screens (bonus exercises / deeper dives) get a Skip button. */
  optional?: boolean
}

export interface Lesson {
  nodeId: string
  screens: Screen[]
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

export interface Progress {
  version: 1
  xp: number
  /** `${nodeId}:${screenIndex}` */
  completedScreens: string[]
  masteredNodeIds: string[]
  /** nodeId → best quiz score as fraction 0..1 */
  quizScores: Record<string, number>
}
