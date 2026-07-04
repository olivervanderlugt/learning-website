import type { Lesson } from '../../types'

export const gatesLesson: Lesson = {
  nodeId: 'gates',
  screens: [
    {
      kind: 'explain',
      title: 'From switches to decisions',
      body: [
        'You can store numbers in switches. But a computer doesn’t just store — it DECIDES: “if both bumpers pressed, stop the motors.”',
        'A logic gate is a tiny circuit that makes one micro-decision: it looks at one or two input signals and outputs a 0 or 1 by a fixed rule.',
        'Here’s the wild part: you only need ONE kind of gate to build every computer ever made. Let’s prove it with your own hands.',
      ],
    },
    {
      kind: 'predict',
      question:
        'The NAND gate outputs 1 UNLESS both inputs are 1. Suppose you wire the SAME signal into both of its inputs. What does the circuit do to that signal?',
      options: [
        'Always outputs 1, no matter what',
        'Copies the signal unchanged',
        'Inverts the signal (0→1, 1→0)',
        'Always outputs 0, no matter what',
      ],
      correctIndex: 2,
      reveal:
        'Both inputs are now the same, so only two cases exist: signal 0 → “both 1?” no → output 1. Signal 1 → “both 1?” yes → output 0. The output is always the opposite of the input — you’ve invented the NOT gate from a NAND. Now go build it for real.',
    },
    { kind: 'gatePuzzle', puzzleId: 'not-from-nand' },
    {
      kind: 'explain',
      title: 'One gate to rule them all',
      body: [
        'That move — tying NAND’s inputs together — is why engineers call NAND “universal”. Every other gate is just NANDs in disguise.',
        'This isn’t trivia: chips are easier and cheaper to manufacture when they repeat one simple building block millions of times.',
        'Next target: AND. Hint — the name NAND literally means NOT-AND.',
      ],
    },
    {
      kind: 'predict',
      question: 'NAND gives you “NOT (A AND B)”. You also now own a NOT gate. How do you build a plain AND?',
      options: [
        'Invert both inputs before the NAND',
        'Invert the NAND’s output',
        'Wire two NANDs to the same inputs side by side',
        'You can’t — AND needs a new kind of gate',
      ],
      correctIndex: 1,
      reveal:
        'NAND already computes AND and then flips it — so flip it back! NAND(A,B) → NOT gives you AND in two gates. Inverting the INPUTS instead gives something different (that trick comes next…).',
    },
    { kind: 'gatePuzzle', puzzleId: 'and-from-nand' },
    {
      kind: 'predict',
      question:
        'Compare: OR outputs 0 only for (0,0). NAND outputs 0 only for (1,1). What turns a NAND into an OR?',
      options: [
        'Invert the NAND’s output',
        'Invert BOTH inputs before the NAND',
        'Chain two NANDs after each other',
        'Nothing — OR can’t be made from NAND',
      ],
      correctIndex: 1,
      reveal:
        'Flipping both inputs swaps the roles of 0 and 1 going in: the one failing case moves from (1,1) to (0,0) — exactly OR’s table. This mirror trick is De Morgan’s law, and you’re about to wire it: NOT A and NOT B into a NAND.',
    },
    { kind: 'gatePuzzle', puzzleId: 'or-from-nand' },
    {
      kind: 'explain',
      title: 'XOR: the difference detector',
      body: [
        'One gate left, and it’s the most interesting: XOR outputs 1 only when its inputs DIFFER. Equal in → 0, different in → 1.',
        'Say it in gates you own: “(A OR B) AND NOT (A AND B)” — at least one on, but not both.',
        'Remember XOR. In the next node it becomes the heart of the circuit that ADDS numbers.',
      ],
    },
    { kind: 'gatePuzzle', puzzleId: 'xor-from-parts' },
    { kind: 'gatePuzzle', puzzleId: 'xor-nand-only', optional: true },
    {
      kind: 'explain',
      title: 'You just learned silicon’s vocabulary',
      body: [
        'NOT, AND, OR, XOR — built from nothing but NAND. Your laptop’s billions of transistors are doing exactly this, just smaller and faster.',
        'Robot hook: an H-bridge motor driver — the circuit that lets a robot drive motors forward AND backward — is four transistor switches steered by this same gate logic.',
        'Quiz time: from memory, no peeking at the workbench.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A NAND gate gets inputs A=1, B=1. What does it output?',
      options: ['0', '1', 'Depends on the previous inputs', 'Undefined'],
      correctIndex: 0,
      explanations: [
        'Correct: NAND is “NOT both” — (1,1) is the one and only case where it outputs 0.',
        '1 is NAND’s output in every OTHER case. (1,1) is exactly its one failing row: output 0.',
        'Gates like NAND have no memory — the output depends only on the inputs right now. (Memory circuits exist, but they’re built FROM gates like these.)',
        'It’s fully defined: NAND(1,1) = NOT(1 AND 1) = NOT(1) = 0.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Which gate outputs 1 only when its two inputs are DIFFERENT?',
      options: ['OR', 'AND', 'XOR', 'NAND'],
      correctIndex: 2,
      explanations: [
        'OR outputs 1 when at least one input is 1 — including (1,1), where the inputs are equal.',
        'AND outputs 1 only for (1,1) — inputs equal, the opposite of what we want.',
        'Correct: XOR is the difference detector — (0,1) and (1,0) give 1; (0,0) and (1,1) give 0.',
        'NAND outputs 1 for (0,0) too — equal inputs. Close cousin, different table.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why is NAND called a “universal” gate?',
      options: [
        'It appears in every electronic device',
        'Any other logic gate can be built from NANDs alone',
        'It works with any voltage',
        'It has the simplest truth table',
      ],
      correctIndex: 1,
      explanations: [
        'It IS everywhere — but that’s a consequence, not the definition. Universal means: NANDs alone can rebuild every other gate.',
        'Correct: you personally built NOT, AND and OR from NANDs today — and XOR from those. That completeness is what “universal” means.',
        'Voltage tolerance is an electrical property, unrelated to logical universality.',
        'NOT’s table is simpler (2 rows). NAND’s power is completeness, not simplicity.',
      ],
    },
    {
      kind: 'quiz',
      question: 'How did you build a NOT gate from a NAND?',
      options: [
        'Wired the same signal into both NAND inputs',
        'Left one NAND input unconnected',
        'Wired the NAND’s output back into its input',
        'Set one input permanently to 0',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: with both inputs equal to the signal, NAND(x,x) = NOT x. One gate, one trick.',
        'An unconnected input has no defined signal — real chips misbehave exactly this way, which is why floating inputs are a classic hardware bug.',
        'Feedback loops create memory (and oscillation!) — that’s how RAM cells work, but it’s not a NOT gate.',
        'With one input stuck at 0, NAND outputs 1 no matter what — a broken “always on”, not an inverter.',
      ],
    },
    {
      kind: 'quiz',
      question: 'To build OR from NANDs you inverted both inputs first. Which law is that?',
      options: ['Ohm’s law', 'De Morgan’s law', 'Moore’s law', 'The law of excluded middle'],
      correctIndex: 1,
      explanations: [
        'Ohm’s law relates voltage, current and resistance — physics of the wire, not logic of the signal.',
        'Correct: De Morgan’s law says NOT(A AND B) = (NOT A) OR (NOT B) — flipping inputs and outputs swaps AND with OR. You wired the proof.',
        'Moore’s law is the observation that transistor counts double every ~2 years — economics, not logic.',
        'The excluded middle says a statement is true or false — foundational for logic, but not the AND↔OR mirror trick you used.',
      ],
    },
  ],
}
