import type { ComponentType } from 'react'
import BinaryCounter from './BinaryCounter'
import BinaryConverter from './BinaryConverter'

export interface GameProps {
  onComplete: (score: number) => void
}

/** gameId (from content) → game component. One game = one file. */
export const games: Record<string, ComponentType<GameProps>> = {
  'binary-counter': BinaryCounter,
  'binary-converter': BinaryConverter,
}
