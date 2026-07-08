/** Fisher–Yates helpers shared by the quiz/predict screens and the review engine. */

/** A shuffled copy of the array (input untouched). */
export function shuffle<T>(arr: T[]): T[] {
  const out = arr.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/** Display order for n options — shuffled so the correct answer's position carries no signal. */
export function shuffledIndices(n: number): number[] {
  return shuffle(Array.from({ length: n }, (_, i) => i))
}
