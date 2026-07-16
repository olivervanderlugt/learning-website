import type { Lesson } from '../../types'

export const mathLogic3Lesson: Lesson = {
  nodeId: 'math-logic-3',
  screens: [
    {
      kind: 'explain',
      title: 'What a proof actually is',
      body: [
        'A PROOF is a chain of steps that takes you from things already accepted (axioms, prior results) to a new claim, where every step is forced — no gaps, no “probably”.',
        'There are only a handful of moves. DIRECT: assume the hypothesis, deduce the conclusion. CONTRAPOSITIVE: prove “if not-B then not-A” instead (logically identical to “if A then B”). CONTRADICTION: assume the claim is false and derive an impossibility.',
        'This is the difference between “it works on the cases I tried” and “it works for all n, guaranteed” — the exact difference between a passing test and a correctness proof.',
      ],
      links: [
        { nodeId: 'math-logic', label: 'Recap: implication and its truth table' },
        { nodeId: 'theory-turing', label: 'Where proof meets its limit: the halting problem' },
      ],
    },
    {
      kind: 'predict',
      question:
        'To prove “if n² is even, then n is even”, a direct attack is awkward. The CONTRAPOSITIVE proves an equivalent statement instead. Which one?',
      options: [
        'If n is odd, then n² is odd',
        'If n is even, then n² is even',
        'If n² is odd, then n is even',
        'n² is even if and only if n is even',
      ],
      correctIndex: 0,
      reveal:
        'The contrapositive of “if A then B” is “if not-B then not-A” — swap AND negate both parts. Here A = “n² is even”, B = “n is even”, so it becomes “if n is odd (not-B), then n² is odd (not-A)”. And that’s easy: n odd means n = 2k+1, so n² = 4k²+4k+1 = 2(2k²+2k)+1, which is odd. Proving the contrapositive proves the original — they’re the same truth table.',
    },
    {
      kind: 'explain',
      title: 'Proof by contradiction',
      body: [
        'To prove a claim by CONTRADICTION, assume the OPPOSITE and show it forces something impossible. If “not P” leads to nonsense, then P must be true.',
        'The classic: √2 is irrational. Assume it’s a fraction a/b in lowest terms; algebra forces both a and b to be even — so it wasn’t in lowest terms after all. Contradiction, so no such fraction exists.',
        'It’s the same shape as a robot safety check: assume the unsafe state is reachable, follow the logic, hit an impossibility → the state is unreachable. Quiz-worthy, but first: induction.',
      ],
      deeper: [
        'Contradiction is powerful because it hands you a free extra assumption to work with — “suppose there were a largest prime p” lets you construct p!+1 and derive a new prime, blowing up the assumption. You get leverage precisely because you assumed the thing you want to destroy.',
        'A subtle trap: proof by contradiction and proof by contrapositive look similar but aren’t identical. Contrapositive proves “if A then B” by a direct proof of “not-B → not-A”. Contradiction assumes “A and not-B” together and derives any absurdity. Contrapositive is often cleaner when it applies.',
        'Reductio ad absurdum is ancient (Euclid’s infinitude of primes, ~300 BC) and still the workhorse of impossibility results across CS — undecidability, lower bounds, and “no algorithm can…” theorems are almost all contradictions in disguise.',
      ],
    },
    {
      kind: 'explain',
      title: 'Induction: the domino principle',
      body: [
        'INDUCTION proves a statement for ALL natural numbers with two steps. BASE CASE: show it holds for n = 1. INDUCTIVE STEP: show that IF it holds for n, THEN it holds for n+1.',
        'Together they’re an infinite ladder: rung 1 stands (base), and every rung makes the next one stand (step), so every rung stands. Knock the first domino and assume each domino topples the next — they all fall.',
        'Prove Gauss’s sum 1 + 2 + … + n = n(n+1)/2. Below, compute the honest running sum and the closed form side by side — induction is the guarantee that they match for EVERY n, not just the ones you print.',
      ],
      deeper: [
        'The inductive step for Gauss: assume 1+…+n = n(n+1)/2 (the “inductive hypothesis”). Then 1+…+n+(n+1) = n(n+1)/2 + (n+1) = (n+1)(n/2 + 1) = (n+1)(n+2)/2 — which is exactly the formula with n+1 plugged in. The step goes through, so it holds for all n.',
        'STRONG induction lets the step assume the claim for ALL values up to n (not just n) — needed when a case depends on several smaller ones, e.g. proving every integer >1 factors into primes, or that any postage ≥ 12¢ is payable in 4¢ and 5¢ stamps.',
        'Recursion IS induction executed: a recursive function’s base case is the proof’s base case, and its recursive call trusting the smaller result is the inductive hypothesis. If you can prove it by induction, you can write it as a correct recursion — and vice versa.',
      ],
    },
    {
      kind: 'code',
      prompt:
        'Induction guarantees 1+2+…+n = n(n+1)/2 for every n. Fill in the closed form so it matches the honest running sum. Expected: three rows where the last two numbers agree (1 1 1 / 5 15 15 / 10 55 55).',
      starter: `function sumTo(n) {          // the honest loop: add 1..n
  let s = 0
  for (let k = 1; k <= n; k++) s += k
  return s
}
function formula(n) {
  return 0                   // <-- fix: Gauss's closed form n(n+1)/2
}
for (const n of [1, 5, 10]) {
  print(n, sumTo(n), formula(n))
}`,
      expected: `1 1 1
5 15 15
10 55 55`,
      hint: 'Return n * (n + 1) / 2 — the formula induction proves. For n=10 that’s 10·11/2 = 55.',
      success:
        'The loop and the formula agree at n = 1, 5, 10 — but that’s only evidence, not proof. Induction upgrades it to a guarantee for ALL n: base case n=1 gives 1, and the step turns n(n+1)/2 into (n+1)(n+2)/2 by adding n+1. Leave `return 0` and the columns disagree everywhere except where the true sum happens to be 0 — testing three cases can never certify infinitely many.',
    },
    {
      kind: 'quiz',
      question: 'The contrapositive of “if A then B” is…',
      options: [
        'If (not B) then (not A) — and it is logically equivalent to the original',
        'If B then A — the converse',
        'If (not A) then (not B) — the inverse',
        'A and B are both false',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: swap the two parts AND negate both. It has the identical truth table to “if A then B”, so proving it proves the original.',
        'That’s the CONVERSE, which is NOT equivalent — “if wet then rained” doesn’t follow from “if rained then wet”.',
        'That’s the INVERSE, also not equivalent to the original (it’s equivalent to the converse instead).',
        'The contrapositive is a conditional statement, not a claim that both parts are false.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Proof by induction needs which two ingredients?',
      options: [
        'A base case (it holds for the smallest n) and an inductive step (if it holds for n, it holds for n+1)',
        'A base case and a lucky guess',
        'Checking n = 1 through n = 100 exhaustively',
        'Assuming the statement is false and finding a contradiction',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: base case starts the ladder, the inductive step passes truth from each rung to the next — together they cover all n.',
        'The step isn’t a guess; it’s a proof that truth propagates from n to n+1.',
        'Checking finitely many cases never proves a claim about ALL (infinitely many) n — that’s the whole point of induction.',
        'That describes proof by CONTRADICTION, a different technique.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In the √2-is-irrational proof, you assume √2 = a/b in lowest terms and derive that a and b are BOTH even. Why does that finish the proof?',
      options: [
        'Both even contradicts “lowest terms” (they’d share a factor of 2), so the assumption that √2 is a fraction must be false',
        'It shows √2 is actually rational',
        'It proves a and b don’t exist as numbers',
        'Even numbers can’t be squared',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a fraction in lowest terms can’t have both parts even. Reaching that impossibility means the starting assumption (√2 is such a fraction) was wrong — so √2 is irrational.',
        'The opposite: the contradiction refutes rationality, proving irrationality.',
        'a and b were assumed to exist; the contradiction is about their shared factor, not their existence as numbers.',
        'Even numbers square perfectly well; the contradiction is about the lowest-terms assumption, not squaring.',
      ],
    },
    {
      kind: 'quiz',
      question: 'How are recursion and induction related?',
      options: [
        'A recursion’s base case is the proof’s base case, and its recursive call trusting the smaller result is the inductive hypothesis',
        'They are unrelated ideas that happen to share the word “step”',
        'Recursion is faster than induction',
        'Induction only works on code, recursion only on paper',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: they’re the same structure — proving correctness by induction mirrors exactly how a recursive function bottoms out and builds up.',
        'The correspondence is deep, not coincidental: an inductive proof IS the argument that a recursion is correct.',
        'Speed isn’t the relationship; one is a proof technique, the other a code structure, sharing one skeleton.',
        'Backwards and false — induction is a proof method (paper), recursion is code, and each illuminates the other.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'You want to prove “if n² is odd then n is odd”. Which approach is cleanest, and why?',
      options: [
        'Contrapositive: prove “if n is even then n² is even” — direct and easy, since n = 2k gives n² = 4k²',
        'Just check n = 1, 3, 5, 7 and conclude',
        'Assume n² is even and hope for the best',
        'Induction on n, with base case n = 0',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the contrapositive “n even → n² even” is a trivial direct proof (n=2k ⇒ n²=4k², even), and it’s logically equivalent to the original.',
        'Checking a few odd numbers is evidence, not proof — it says nothing about the infinitely many you didn’t check.',
        'That’s neither the contrapositive nor a complete contradiction setup; it doesn’t lead anywhere clean.',
        'Induction is overkill and awkward here; the statement isn’t naturally about “n then n+1”. Contrapositive is the tool.',
      ],
    },
    {
      question: 'Euclid proves there are infinitely many primes by contradiction: assume a LARGEST prime p, list all primes, and form N = (product of all primes) + 1. What breaks?',
      options: [
        'N leaves remainder 1 when divided by every listed prime, so N has a prime factor not on the list — contradicting “that was all of them”',
        'N is always prime, which is impossible',
        'N is even, so it can’t be prime',
        'The product is too large to compute',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: N isn’t divisible by any prime on the supposedly-complete list (remainder 1 each time), so either N is a new prime or has a new prime factor — either way the list was incomplete. Contradiction.',
        'N need not itself be prime (e.g. 2·3·5·7·11·13+1 = 30031 = 59·509); the point is it must have a prime factor NOT on the list.',
        'N’s parity is irrelevant and it isn’t generally even; the argument is about divisibility by the listed primes.',
        'Computability isn’t the issue — the contradiction is purely logical, regardless of size.',
      ],
    },
    {
      question: 'STRONG induction differs from ordinary induction in that the inductive step may assume…',
      options: [
        'The claim holds for ALL values from the base up to n, not merely for n alone',
        'The claim is false for n',
        'Nothing — it has no inductive hypothesis',
        'Only that the claim holds for n − 1',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: strong induction lets you assume every smaller case, which is what you need when a case depends on several predecessors (e.g. prime factorisation, or Fibonacci-style recurrences).',
        'You never assume the claim is false in an inductive step — that’s contradiction, a different method.',
        'It certainly has a hypothesis — a stronger one (all smaller cases), hence the name.',
        'That’s ordinary induction (assume just n). Strong induction assumes the whole range below.',
      ],
    },
    {
      question: 'A student “proves” 1 + 2 + … + n = n(n+1)/2 by verifying it for n = 1, 2, 3, 4, 5. What is missing for this to be a proof?',
      options: [
        'An inductive step — a general argument that truth for n forces truth for n+1, covering the infinitely many untested cases',
        'Nothing; five cases is plenty',
        'A faster computer to check more values',
        'A contradiction',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: no finite number of checks proves a statement about all n. The inductive step (n ⇒ n+1) plus the base case is what turns evidence into proof.',
        'Five cases — or five billion — is still evidence, never proof, for a claim over all natural numbers.',
        'More checks don’t help; the gap is logical, not computational.',
        'Contradiction is a valid technique but isn’t what this particular claim needs — induction is the natural fit.',
      ],
    },
  ],
}
