import type { Lesson } from '../../types'

export const theoryComplexityLesson: Lesson = {
  nodeId: 'theory-complexity',
  screens: [
    {
      kind: 'explain',
      title: 'Possible, but practical?',
      body: [
        'Turing sorted problems into possible vs impossible. Complexity theory splits the possible pile again: solvable FAST vs solvable only in cosmic time.',
        'P is the class of problems with polynomial-time algorithms (n, n², n³…) — the ones that scale. Your sorting, searching, shortest paths: all in P.',
        'Outside sit problems whose only known algorithms are exponential (2ⁿ) — where adding ONE item to the input can double the work. You met one: the 20-stop delivery route.',
      ],
      links: [{ nodeId: 'algo-bigo', label: 'Refresher: growth families' }],
    },
    {
      kind: 'predict',
      question: 'Strange asymmetry: finding a route under 500 km through 50 cities might take eons. But if I HAND you a route and claim it’s under 500 km, how hard is checking?',
      options: [
        'Trivial — add up 50 distances and compare',
        'Just as hard as finding one',
        'Harder than finding one',
        'Impossible without quantum computers',
      ],
      correctIndex: 0,
      reveal:
        'Checking is one addition per leg — seconds. FINDING might mean sifting astronomically many candidates. This gap — hard to find, easy to verify — defines the class NP: solutions verifiable in polynomial time. Puzzles live here: sudoku, protein folding, chip layout, your route. The million-dollar question is whether the gap is real…',
    },
    {
      kind: 'explain',
      title: 'P vs NP: the biggest open question in computer science',
      body: [
        'P = fast to SOLVE. NP = fast to CHECK a proposed solution. Obviously P ⊆ NP (solving fast implies checking fast). The question: are they EQUAL? Does easy-to-check imply easy-to-solve?',
        'Nobody knows. It’s one of the seven Clay Millennium Problems — a literal $1,000,000 prize — open since 1971. Near-universal belief: P ≠ NP, but no proof.',
        'The stakes: thousands of NP-COMPLETE problems (route planning, scheduling, packing) are all secretly the SAME problem — a fast algorithm for any one gives fast algorithms for all. One key, every lock.',
      ],
      deeper: [
        'NP-completeness (Cook 1971, Karp 1972) is a web of translations: any NP problem can be REWRITTEN as boolean satisfiability (SAT), and SAT rewrites into routing, scheduling, sudoku… That’s why they stand or fall together — they are each other in disguise. Recognizing “this smells NP-complete” saves you months of hunting for a fast exact algorithm that likely doesn’t exist.',
        'P ≠ NP would also confirm the foundation of cryptography: codes easy to check with the key but hard to crack without one require find≫check problems to exist. If P = NP (with a practical algorithm), most encryption collapses overnight — the security domain lives downstream of this question.',
        'What if your problem IS NP-complete? The engineer’s menu: exact algorithms for small n, approximation with guarantees (“within 3% of optimal”), heuristics (your A* instincts), or SAT/ILP solvers that are shockingly good on real-world instances despite worst-case doom. NP-complete means “stop seeking perfect-and-fast”, not “give up”.',
      ],
      links: [{ nodeId: 'ai-search', label: 'You met the explosion here: Search & Planning' }],
    },
    {
      kind: 'quiz',
      question: 'A problem is in P when…',
      options: [
        'Some algorithm solves it in polynomial time (n, n², n³…) — it scales to real sizes',
        'It can be programmed in Python',
        'It has never been solved',
        'Its answer is always “yes”',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: polynomial growth is the theory’s formal line for “tractable” — your Big-O families n through nᵏ.',
        'Language is irrelevant — P is about the problem’s best possible algorithm.',
        'P problems are the SOLVED-well ones.',
        'Answers vary per input; the CLASS is about solving cost.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A problem is in NP when…',
      options: [
        'A proposed solution can be VERIFIED in polynomial time — finding one may still be brutal',
        'No computer can ever solve it',
        'It takes exactly non-polynomial time',
        'Only networks can solve it',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: NP is about cheap checking. (The name means “nondeterministic polynomial”, not “not polynomial” — the most misread acronym in CS.)',
        'That’s uncomputability — Turing’s wall, a different (higher) wall than NP.',
        'P is inside NP — easy problems are also easy to check; NP is an upper story, not a separate building.',
        'Nothing to do with networking.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does a fast algorithm for ANY one NP-complete problem crack ALL of them?',
      options: [
        'Every NP problem can be translated into any NP-complete problem in polynomial time — they are mutual disguises',
        'They all use the same source code',
        'It’s an unproven rumor',
        'Because computers keep getting faster',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the reduction web — solve sudoku-at-scale fast and routing, scheduling and SAT fall with it, via translation. That’s what “complete” means.',
        'No shared code — shared STRUCTURE, proven by explicit translations.',
        'The reductions are theorems (Cook, Karp) — the open part is whether a fast algorithm exists at all.',
        'Hardware multiplies constants; 2ⁿ eats multipliers for breakfast (your Big-O lesson).',
      ],
    },
    {
      kind: 'quiz',
      question: 'Most encryption depends on P ≠ NP being true (or at least on find≫check problems existing) because…',
      options: [
        'A code must be easy to verify WITH the key yet infeasible to crack without it — exactly a find/check gap',
        'Encryption algorithms are written in NP',
        'The government requires hard math',
        'P = NP would make computers stop working',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: decryption-with-key is the cheap check; cracking is the expensive find. If finding collapses to checking (practically), the asymmetry — and the lock — vanishes.',
        'Class membership isn’t a programming language.',
        'It’s mathematics, not regulation, holding the door.',
        'Computers would work fine — SECRETS would stop working.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your fleet-scheduling problem turns out NP-complete, and real instances have n = 200. The professional response?',
      options: [
        'Approximation or a modern SAT/ILP solver — near-optimal fast beats optimal never',
        'Search for an exact fast algorithm for a few years',
        'Tell customers 200 robots is impossible',
        'Wait for CPUs to double a few times',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: guaranteed-within-3% heuristics and industrial solvers handle real instances astonishingly well — worst-case doom rarely visits real data. Ship that.',
        'You’d be betting your startup on refuting the field’s strongest conjecture.',
        'The problem is “perfect answers”, not the fleet — good answers exist in milliseconds.',
        '2²⁰⁰ laughs at Moore’s law — exponential vs hardware isn’t a fair fight, and you know why.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Sudoku (generalized to n×n) is NP-complete. What does that say about a claimed “instant solver for any size”?',
      options: [
        'It would settle P vs NP and earn $1,000,000 — so demand extraordinary evidence',
        'It’s probably a normal coding achievement',
        'Sudoku isn’t mathematical enough to matter',
        'The claim is definitely true since 9×9 solvers exist',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: fast general sudoku = fast SAT = P = NP. Either the claim breaks the biggest conjecture in CS, or (rather more likely) it’s wrong at scale.',
        'It would be the coding achievement of the century.',
        'It’s NP-complete — as mathematical as it gets.',
        '9×9 is one fixed tiny instance — the claim’s “any size” is where the theorem bites.',
      ],
    },
    {
      question: 'The three ladders of theory you’ve now climbed, in order of what they classify:',
      options: [
        'FSMs (what needs memory) → computability (what’s possible at all) → complexity (what’s practical)',
        'Complexity → FSMs → computability',
        'They all classify the same thing',
        'Computability → FSMs → complexity',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: finite memory’s limits, then absolute limits, then time limits — three fences, each inside the last. Everything you build lives inside all three.',
        'Complexity presumes computability; FSMs are the smallest rung.',
        'Different fences: memory, possibility, time.',
        'FSMs come first — they’re the machine you can fully enumerate.',
      ],
    },
  ],
}
