import type { Lesson } from '../../types'

export const mathLogicLesson: Lesson = {
  nodeId: 'math-logic',
  screens: [
    {
      kind: 'explain',
      title: 'The algebra of true and false',
      body: [
        'Logic is arithmetic for truth. Instead of numbers you have two values — true and false — and instead of +, ×, you have AND, OR, NOT.',
        'It’s the backbone of every if-statement, every database query, and every safety rule a robot follows.',
        'And it’s the exact same algebra as the logic gates you built — one idea, two subjects.',
      ],
      links: [{ nodeId: 'gates', label: 'See it in silicon: The Logic of Gates' }],
    },
    {
      kind: 'predict',
      question: '“It is raining AND I have an umbrella.” This whole statement is true in how many of the four possible situations?',
      options: ['1 — only when both parts are true', '2', '3', 'All 4'],
      correctIndex: 0,
      reveal:
        'AND is strict: the combined statement is true only when BOTH parts are true — that’s 1 of the 4 rain/umbrella combinations. This is exactly the AND gate’s truth table (output 1 only for 1,1). Logic on paper and gates in silicon are the same rules.',
    },
    {
      kind: 'predict',
      question: 'OR in logic is “inclusive”: A OR B is true when at least one holds. So “I’ll bring a coat OR a sweater” is FALSE only when…',
      options: [
        'I bring neither',
        'I bring both',
        'I bring exactly one',
        'It can never be false',
      ],
      correctIndex: 0,
      reveal:
        'Inclusive OR is false only when BOTH parts are false — bringing neither. Bringing one, or even both, makes it true. (Everyday “or” sometimes means exclusive “one or the other but not both” — that’s XOR, a different operation.)',
    },
    {
      kind: 'explain',
      title: 'NOT, implication, and De Morgan',
      body: [
        'NOT flips a value: NOT true = false. Implication, “if A then B”, is a promise that’s broken only when A is true but B is false.',
        'De Morgan’s laws let you rewrite negations: NOT(A AND B) = (NOT A) OR (NOT B). You used this exact rule to build an OR gate from NANDs.',
        'These few operations combine into every logical condition you’ll ever write. Quiz to lock it in.',
      ],
      deeper: [
        'Implication trips people up: “if it rains, the ground is wet” is only proven FALSE by a case where it rains but the ground is dry. A sunny day (rain false) doesn’t break the promise at all — the statement is vacuously true.',
        'De Morgan in words: “not (both)” = “at least one is not”, and “not (either)” = “neither”. Flipping a negation across AND swaps it to OR and vice-versa — the same mirror trick that turned a NAND into an OR.',
        'A robot safety rule like “stop UNLESS (path clear AND battery ok)” is pure Boolean algebra; simplifying such conditions correctly with De Morgan is how you avoid logic bugs that could crash a machine into a wall.',
      ],
    },
    {
      kind: 'quiz',
      question: 'When is “A AND B” true?',
      options: [
        'Only when both A and B are true',
        'When at least one of A or B is true',
        'When A and B differ',
        'Always',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: AND requires BOTH to be true — one of four combinations, matching the AND gate.',
        'That’s OR (at least one). AND is stricter: it needs both.',
        'That’s XOR (they differ). AND needs both true, not merely different.',
        'AND is false whenever either part is false, so it’s far from always true.',
      ],
    },
    {
      kind: 'quiz',
      question: 'De Morgan’s law says NOT(A AND B) equals…',
      options: [
        '(NOT A) OR (NOT B)',
        '(NOT A) AND (NOT B)',
        'A OR B',
        'NOT A',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: “not both true” = “at least one is false” = (NOT A) OR (NOT B). Negation flips AND into OR.',
        'That’s NOT(A OR B) — “neither”, a stricter claim than “not both”.',
        'Dropping the NOT entirely changes the meaning completely; the negation must distribute onto each part.',
        'That ignores B; both parts must appear, each negated, joined by OR.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The implication “if A then B” is false in exactly which case?',
      options: [
        'A is true but B is false',
        'A is false but B is true',
        'Both are false',
        'Both are true',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the promise is broken only when the condition A holds yet the result B fails — true antecedent, false consequent.',
        'A false and B true doesn’t break the promise — “if A then B” says nothing about when A is false.',
        'Both false leaves the promise intact (vacuously true) — A never happened.',
        'Both true is the promise kept, obviously true.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Inclusive OR (A OR B) is false only when…',
      options: [
        'Both A and B are false',
        'Both are true',
        'They differ',
        'A is true',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: OR needs at least one true, so it fails only when both are false.',
        'Both true makes OR true — inclusive OR happily allows both.',
        'Differing makes at least one true, so OR is true, not false.',
        'If A is true, OR is already true regardless of B.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why is Boolean logic called the same idea as the logic gates you built?',
      options: [
        'AND/OR/NOT on true/false are exactly what AND/OR/NOT gates compute on 1/0',
        'Both use electricity',
        'Gates are faster than logic',
        'They are unrelated; the names just coincide',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: map true→1 and false→0 and the truth tables are identical — gates are Boolean algebra realized in silicon.',
        'Electricity is how gates are built physically, but the deep link is that they compute the SAME logical functions.',
        'Speed isn’t the connection; the point is the operations and truth tables match exactly.',
        'It’s not a coincidence — Boolean algebra is literally the mathematics the gates implement.',
      ],
    },
  ],
}
