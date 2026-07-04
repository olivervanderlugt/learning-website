import type { Lesson } from '../../types'
import { bitsLesson } from './bits'

export const lessons: Record<string, Lesson> = {
  bits: bitsLesson,
}
