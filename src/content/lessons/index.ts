import type { Lesson } from '../../types'
import { bitsLesson } from './bits'
import { gatesLesson } from './gates'
import { adderLesson } from './adder'
import { cpuLesson } from './cpu'
import { hcwExamLesson } from './hcw-exam'

export const lessons: Record<string, Lesson> = {
  bits: bitsLesson,
  gates: gatesLesson,
  adder: adderLesson,
  cpu: cpuLesson,
  'hcw-exam': hcwExamLesson,
}
