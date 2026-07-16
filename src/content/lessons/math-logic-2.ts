import type { Lesson } from '../../types'

export const mathLogic2Lesson: Lesson = {
  nodeId: 'math-logic-2',
  screens: [
    {
      kind: 'explain',
      title: 'Sets: the language everything is written in',
      body: [
        'A SET is just a collection of distinct things: A = {1, 2, 3}. Order and repeats don’t matter — {1, 2, 2} is the same set as {1, 2}.',
        'Three operations combine sets: UNION A ∪ B (in either), INTERSECTION A ∩ B (in both), and COMPLEMENT (everything NOT in A). They are AND, OR and NOT from the last lesson, wearing new clothes.',
        'Every type you’ll ever program — the integers, the valid sensor readings, the reachable robot states — is a set. Get fluent here and the rest of math reads more easily.',
      ],
      links: [{ nodeId: 'math-logic', label: 'Recap: AND, OR, NOT — the algebra of truth' }],
    },
    {
      kind: 'predict',
      question:
        'A = {1, 2, 3, 4} has 4 elements, B = {3, 4, 5, 6} has 4 elements. They share {3, 4}. How many DISTINCT elements are in A ∪ B (the union)?',
      options: ['6', '8', '4', '2'],
      correctIndex: 0,
      reveal:
        'Not 8 — that would double-count the shared 3 and 4. The union is {1, 2, 3, 4, 5, 6} = 6 elements. This is the inclusion–exclusion rule: |A ∪ B| = |A| + |B| − |A ∩ B| = 4 + 4 − 2 = 6. You subtract the overlap once so it isn’t counted twice.',
    },
    {
      kind: 'explain',
      title: 'Subsets, and De Morgan on sets',
      body: [
        'A ⊆ B means every element of A is also in B (A is a SUBSET of B). The empty set {} is a subset of everything, and every set is a subset of itself.',
        'De Morgan carries straight over: NOT(A ∪ B) = (NOT A) ∩ (NOT B), and NOT(A ∩ B) = (NOT A) ∪ (NOT B). “Not in either” means “outside both”; complement flips ∪ into ∩.',
        'Code the two set operations. The load-bearing line is the intersection test — keep an element only if it lives in both sets.',
      ],
      deeper: [
        'The set of ALL subsets of a set is its POWER SET, and a set with n elements has exactly 2ⁿ subsets — because each element is independently either in or out (n binary choices). {1,2,3} has 2³ = 8 subsets.',
        'Inclusion–exclusion generalises: for three sets you add the singles, subtract each pairwise overlap, then ADD BACK the triple overlap (which you subtracted one too many times). This “add-subtract-add” pattern reappears in probability and combinatorics constantly.',
        'A robot’s reachable configuration space is a set; obstacles carve out a forbidden subset; the safe region is the complement of the obstacle set intersected with the reachable set. Motion planning is set algebra made physical.',
      ],
    },
    {
      kind: 'code',
      prompt:
        'Compute A ∩ B (elements in BOTH) and A ∪ B (distinct elements in either). Fix the intersection filter. Expected: “inter 2” then “union 6”.',
      starter: `const A = [1, 2, 3, 4]
const B = [3, 4, 5, 6]
const inter = A.filter(x => false)     // <-- fix: keep x only if it's also in B
const union = [...new Set([...A, ...B])]
print('inter', inter.length)
print('union', union.length)`,
      expected: `inter 2
union 6`,
      hint: 'Replace false with B.includes(x) — an element is in the intersection exactly when it appears in B too.',
      success:
        'Intersection is AND (in A AND in B); the Set in `union` drops duplicates so the shared 3 and 4 are counted once — inclusion–exclusion in code: 4 + 4 − 2 = 6. Leave it as `false` and the intersection is empty (0), because you kept nothing.',
    },
    {
      kind: 'explain',
      title: 'Relations and functions',
      body: [
        'A RELATION is any set of ordered pairs (a, b) — “a is related to b”. “Is a prereq of”, “is less than”, “sends data to” are all relations on this app’s node graph.',
        'A FUNCTION is a special relation with one rule: every input maps to EXACTLY ONE output. {(1,10), (2,20)} is a function; {(1,10), (1,99)} is not — input 1 can’t give two answers.',
        'Functions come in flavours: INJECTIVE (no two inputs share an output), SURJECTIVE (every possible output is hit), and BIJECTIVE (both — a perfect one-to-one pairing you can invert). Quiz to lock it in.',
      ],
      deeper: [
        'A bijection is exactly what lets you INVERT: if f pairs each input with a unique output and misses none, f⁻¹ runs it backwards unambiguously. A rotation matrix is a bijection on space (det ≠ 0); that’s why you can always undo a rotation — the same “invertible ⇔ bijective” idea underneath linear algebra.',
        'Injective without surjective is a lossless encoding into a bigger space (every input recoverable, but some codes unused); surjective without injective is a lossy bucketing (every bucket used, but collisions lose information — like a hash). Which one you need decides whether the operation is reversible.',
        '“Exactly one output per input” is why functions are safe to compute: a robot’s control law u = f(state) must be a genuine function, or the same situation would demand two contradictory commands. Determinism IS the function property.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does A ∩ B (intersection) contain?',
      options: [
        'Only the elements that are in BOTH A and B',
        'Every element that is in A or B or both',
        'The elements in A but not in B',
        'All elements not in A',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: intersection is the AND of membership — an element qualifies only if it’s in A AND in B.',
        'That’s the UNION (∪), the OR of membership — in either one counts.',
        'That’s the set difference A \\ B, not the intersection.',
        'That’s the complement of A; intersection needs membership in both sets, not the negation of one.',
      ],
    },
    {
      kind: 'quiz',
      question: 'By inclusion–exclusion, if |A| = 10, |B| = 7 and |A ∩ B| = 3, what is |A ∪ B|?',
      options: ['14', '17', '20', '3'],
      correctIndex: 0,
      explanations: [
        'Correct: |A ∪ B| = |A| + |B| − |A ∩ B| = 10 + 7 − 3 = 14. You subtract the overlap once so it isn’t double-counted.',
        '17 = 10 + 7 forgets to remove the 3 shared elements, counting them twice.',
        '20 has no basis — it neither adds nor subtracts the sets correctly.',
        '3 is the size of the overlap alone, not the union.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Which set of pairs is NOT a valid function?',
      options: [
        '{(1, 5), (1, 9), (2, 5)} — the input 1 maps to two different outputs',
        '{(1, 5), (2, 5), (3, 5)} — three inputs all map to 5',
        '{(1, 1), (2, 2), (3, 3)}',
        '{(7, 0)} — a single pair',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a function requires each input to have EXACTLY ONE output; 1 → 5 and 1 → 9 breaks that rule.',
        'That IS a valid function — several inputs sharing one output is fine (it’s just not injective). The rule is about inputs, not outputs.',
        'A perfectly valid function (in fact a bijection); each input has one output.',
        'One input, one output — a valid (tiny) function.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A function is BIJECTIVE. What does that let you do that a merely-injective function might not?',
      options: [
        'Invert it — run it backwards unambiguously, because every output is hit by exactly one input',
        'Make it run faster',
        'Guarantee it has no inputs',
        'Prove it is also a relation',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: bijective = injective AND surjective, so every output has exactly one source — the inverse f⁻¹ is itself a well-defined function.',
        'Bijectivity is about structure, not speed.',
        'A bijection generally has plenty of inputs; that’s unrelated.',
        'Every function is already a relation — bijectivity adds invertibility, which is the real payoff.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'How many subsets does the set {a, b, c, d} have?',
      options: [
        '16 — each of the 4 elements is independently in or out, so 2⁴',
        '4 — one per element',
        '8 — the elements plus the empty set',
        '24 — 4 factorial',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a set with n elements has 2ⁿ subsets; here 2⁴ = 16 (including {} and the whole set). Each element is a yes/no choice.',
        '4 counts the elements, not the subsets — you can pick any combination of them.',
        '8 = 2³ would be right for a 3-element set; with 4 elements it’s 2⁴.',
        '24 = 4! counts orderings (permutations), but subsets ignore order and size can vary.',
      ],
    },
    {
      question: 'De Morgan for sets: NOT(A ∩ B) equals which expression?',
      options: [
        '(NOT A) ∪ (NOT B) — “not in both” means “outside A or outside B”',
        '(NOT A) ∩ (NOT B) — outside both',
        'A ∪ B',
        'A ∩ B with the elements reversed',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: complementing an intersection flips ∩ into ∪ and negates each part — the same mirror rule as NOT(A AND B) = (NOT A) OR (NOT B).',
        'That’s NOT(A ∪ B) — “outside both” is the complement of the UNION, a different (smaller) set.',
        'Dropping the complements entirely changes the meaning; the negation must distribute.',
        '“Reversing elements” isn’t a set operation; De Morgan is about how NOT distributes over ∩ and ∪.',
      ],
    },
    {
      question: 'A hash function maps many possible inputs into a small fixed range, so different inputs can collide onto the same output. In function terms, such a hash is…',
      options: [
        'Not injective — collisions mean two inputs share an output, so it can’t be inverted to recover the input',
        'Not a function at all — outputs repeat',
        'Bijective — it covers the whole range',
        'Injective but not surjective',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: collisions violate injectivity (distinct inputs, same output), which is exactly why you can’t reverse a hash to get the original — information is lost.',
        'It’s still a genuine function: each input has ONE output. Repeated outputs are allowed; that’s a non-injective function, not a non-function.',
        'Bijective needs injectivity too; collisions rule that out.',
        'Backwards: collisions destroy injectivity. It’s typically surjective-ish onto its range but definitely not injective.',
      ],
    },
    {
      question: 'Which statement about the empty set {} is TRUE?',
      options: [
        'It is a subset of every set, including itself',
        'It is an element of every set',
        'It has one subset: the number 0',
        'It cannot be intersected with anything',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: “every element of {} is in S” is vacuously true (there are no elements to check), so {} ⊆ S for all S — the same vacuous-truth idea as implication with a false condition.',
        'Being a SUBSET (⊆) is not the same as being an ELEMENT (∈); {} is a subset of every set but not generally a member.',
        'Its only subset is {} itself (a set, not the number 0), and it has 2⁰ = 1 subset.',
        'A ∩ {} = {} for any A — intersecting with the empty set is perfectly defined and gives the empty set.',
      ],
    },
  ],
}
