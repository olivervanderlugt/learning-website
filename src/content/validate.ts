import { domains, nodes, nodeById } from './curriculum'
import { lessons } from './lessons'
import { puzzles } from './puzzles'
import { games } from '../components/games'
import type { Lesson } from '../types'

/**
 * Structural quality audit of all content. Runs automatically in dev (see main.tsx)
 * and can be invoked anywhere. Returns a list of human-readable problems; empty = clean.
 * Extend this whenever a new content invariant matters — this is the guardrail that
 * keeps every new lesson on-par.
 */
export function validateContent(): string[] {
  const problems: string[] = []
  const err = (m: string) => problems.push(m)

  // --- Nodes ---
  const seen = new Set<string>()
  for (const n of nodes) {
    if (seen.has(n.id)) err(`Duplicate node id: ${n.id}`)
    seen.add(n.id)
    for (const p of n.prereqIds) {
      if (!nodeById.has(p)) err(`Node ${n.id} lists unknown prereq ${p}`)
      if (p === n.id) err(`Node ${n.id} is its own prereq`)
    }
    if (!n.title?.trim()) err(`Node ${n.id} has no title`)
    if (!n.whyItMatters?.trim()) err(`Node ${n.id} has no whyItMatters`)
    if (n.hasLesson && !lessons[n.id]) err(`Node ${n.id} is hasLesson but no lesson registered`)
    for (const r of n.resources ?? []) {
      if (!/^https?:\/\//.test(r.url)) err(`Node ${n.id} resource "${r.title}" has a non-http url`)
      if (!r.note?.trim()) err(`Node ${n.id} resource "${r.title}" has no note`)
    }
  }

  // --- Module exams: every domain has exactly one, gated on ALL its other nodes ---
  for (const d of domains) {
    const domainNodes = nodes.filter((n) => n.domainId === d.id)
    const exams = domainNodes.filter((n) => n.isExam)
    if (exams.length !== 1) {
      err(`Domain ${d.id} has ${exams.length} exam nodes (needs exactly 1)`)
      continue
    }
    const exam = exams[0]
    const others = domainNodes.filter((n) => n.id !== exam.id).map((n) => n.id)
    const prereqs = new Set(exam.prereqIds)
    for (const id of others) if (!prereqs.has(id)) err(`Exam ${exam.id} is missing domain prereq ${id}`)
    for (const p of exam.prereqIds)
      if (!others.includes(p)) err(`Exam ${exam.id} lists prereq ${p} outside its domain`)
    const quizzes = lessons[exam.id]?.screens.filter((s) => s.kind === 'quiz').length ?? 0
    if (quizzes < 8) err(`Exam ${exam.id} has only ${quizzes} quiz questions (needs >=8 fresh ones)`)
  }

  // --- Lessons ---
  for (const [id, lesson] of Object.entries(lessons)) {
    if (!nodeById.has(id)) err(`Lesson "${id}" has no matching node`)
    const node = nodeById.get(id)
    if (node && !node.hasLesson) err(`Lesson "${id}" exists but node.hasLesson is not set`)
    validateLesson(id, lesson, err)
  }

  // --- Puzzles ---
  for (const [id, pz] of Object.entries(puzzles)) {
    if (pz.palette.length === 0) err(`Puzzle ${id} has empty palette`)
    if (pz.truthTable.length === 0) err(`Puzzle ${id} has empty truth table`)
    for (const row of pz.truthTable) {
      if (row.inputs.length !== pz.inputLabels.length)
        err(`Puzzle ${id}: a row has ${row.inputs.length} inputs but ${pz.inputLabels.length} input labels`)
      if (row.outputs.length !== pz.outputLabels.length)
        err(`Puzzle ${id}: a row has ${row.outputs.length} outputs but ${pz.outputLabels.length} output labels`)
      for (const b of [...row.inputs, ...row.outputs])
        if (b !== 0 && b !== 1) err(`Puzzle ${id}: truth-table value ${b} is not 0/1`)
    }
  }

  return problems
}

function validateLesson(id: string, lesson: Lesson, err: (m: string) => void) {
  if (lesson.nodeId !== id) err(`Lesson registered as "${id}" but its nodeId is "${lesson.nodeId}"`)
  if (lesson.screens.length === 0) return err(`Lesson ${id} has no screens`)

  let quizCount = 0
  lesson.screens.forEach((s, i) => {
    const at = `${id}[screen ${i} kind=${s.kind}]`
    switch (s.kind) {
      case 'explain':
        if (!s.title?.trim()) err(`${at}: no title`)
        if (!s.body?.length) err(`${at}: empty body`)
        break
      case 'predict':
        if (!s.options || s.options.length < 2) err(`${at}: needs >=2 options`)
        if (s.correctIndex < 0 || s.correctIndex >= (s.options?.length ?? 0)) err(`${at}: correctIndex out of range`)
        if (!s.reveal?.trim()) err(`${at}: no reveal`)
        break
      case 'quiz':
        quizCount++
        if (!s.options || s.options.length < 2) err(`${at}: needs >=2 options`)
        if (s.correctIndex < 0 || s.correctIndex >= (s.options?.length ?? 0)) err(`${at}: correctIndex out of range`)
        if ((s.explanations?.length ?? 0) !== (s.options?.length ?? 0))
          err(`${at}: ${s.explanations?.length} explanations for ${s.options?.length} options (must match)`)
        break
      case 'gatePuzzle':
        if (!puzzles[s.puzzleId]) err(`${at}: unknown puzzleId "${s.puzzleId}"`)
        break
      case 'game':
        if (!games[s.gameId]) err(`${at}: unknown gameId "${s.gameId}"`)
        break
      case 'code':
        if (typeof s.expected !== 'string') err(`${at}: no expected output`)
        if (!s.success?.trim()) err(`${at}: no success message`)
        break
    }
    // interlink targets must exist
    for (const link of s.links ?? []) {
      if (!nodeById.has(link.nodeId)) err(`${at}: link to unknown node "${link.nodeId}"`)
    }
  })

  if (quizCount === 0) err(`Lesson ${id} has no retrieval quiz (pedagogy requires ending quizzes)`)

  for (const [j, q] of (lesson.extraPractice ?? []).entries()) {
    if ((q.explanations?.length ?? 0) !== (q.options?.length ?? 0)) err(`Lesson ${id} extraPractice[${j}]: explanations/options mismatch`)
    if (q.correctIndex < 0 || q.correctIndex >= q.options.length) err(`Lesson ${id} extraPractice[${j}]: correctIndex out of range`)
  }
}
