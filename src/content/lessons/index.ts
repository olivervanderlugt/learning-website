import type { Lesson } from '../../types'
import { bitsLesson } from './bits'
import { gatesLesson } from './gates'
import { adderLesson } from './adder'
import { cpuLesson } from './cpu'
import { hcwExamLesson } from './hcw-exam'
import { mathLinalgLesson } from './math-linalg'
import { mathCalculusLesson } from './math-calculus'
import { progVariablesLesson } from './prog-variables'
import { mathProbLesson } from './math-prob'
import { physForcesLesson } from './phys-forces'
import { physElectricityLesson } from './phys-electricity'
import { roboSensingLesson } from './robo-sensing'
import { roboControlLesson } from './robo-control'

export const lessons: Record<string, Lesson> = {
  bits: bitsLesson,
  gates: gatesLesson,
  adder: adderLesson,
  cpu: cpuLesson,
  'hcw-exam': hcwExamLesson,
  'math-linalg': mathLinalgLesson,
  'math-calculus': mathCalculusLesson,
  'prog-variables': progVariablesLesson,
  'math-prob': mathProbLesson,
  'phys-forces': physForcesLesson,
  'phys-electricity': physElectricityLesson,
  'robo-sensing': roboSensingLesson,
  'robo-control': roboControlLesson,
}
