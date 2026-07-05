import type { Lesson } from '../../types'

export const theoryTuringLesson: Lesson = {
  nodeId: 'theory-turing',
  screens: [
    {
      kind: 'explain',
      title: 'Add a tape, change the universe',
      body: [
        'The FSM’s ceiling was memory. Turing’s 1936 move: give the little machine an infinite TAPE it can read, write and move along. States + unbounded scratch paper.',
        'This “Turing machine” can count anything, match any parentheses — and, Turing argued, compute anything that ANY mechanical procedure can compute. That claim (the Church-Turing thesis) has held for 90 years.',
        'Your laptop, a supercomputer, the CPU you built from gates: all exactly as powerful as this cartoon machine — just faster. Computability doesn’t grow with transistor count.',
      ],
      links: [{ nodeId: 'hist-computing', label: 'The history: Turing’s 1936 paper' }],
    },
    {
      kind: 'predict',
      question: 'If every computer equals a Turing machine in WHAT it can compute, what does buying a 1000× faster computer change?',
      options: [
        'Only speed — every answer it finds, a slower machine would also find, eventually',
        'It can now solve previously unsolvable problems',
        'It becomes more than Turing-complete',
        'Nothing at all, including speed',
      ],
      correctIndex: 0,
      reveal:
        'Computability is a yes/no property; speed is a matter of patience. A 1000× machine changes which problems are PRACTICAL (that’s complexity — next lesson), never which are POSSIBLE. This split — possible vs practical — is the cleanest big idea in theory, and the reason “just wait for better hardware” cannot fix certain problems, ever.',
    },
    {
      kind: 'explain',
      title: 'The wall: problems no machine can solve',
      body: [
        'Here’s the shock in Turing’s paper: some well-defined problems are UNCOMPUTABLE — no machine, no algorithm, no future technology can solve them.',
        'The famous one: the HALTING PROBLEM. Write a program H that inspects any program P and input, and answers “will P eventually finish, or loop forever?”. Turing proved H cannot exist.',
        'Not “is hard” — cannot exist, the way a largest integer cannot exist. The proof fits in a paragraph and is one of the great mic-drops of mathematics.',
      ],
      deeper: [
        'The proof is self-reference judo. Suppose H exists. Build a troll program T that asks H “will I halt?” and then does the OPPOSITE of H’s answer (halts if H says loop; loops if H says halt). Now run T on itself: whatever H predicts, T contradicts it. H was wrong — so no correct H can exist. QED.',
        'This isn’t an isolated curiosity: Rice’s theorem generalizes it — essentially ANY interesting question about what a program will do (“does it ever crash?”, “does it ever leak this data?”) is uncomputable in general. Perfect program analysis is mathematically off the table.',
        'Yet your editor’s linter and your worker’s 2-second timeout WORK. How? They answer a weaker question: “provably fine / provably broken / CAN’T TELL”, or they bound the run. Practical tools live in the gap the theorem leaves open — approximation, timeouts, restricted languages. Impossibility results don’t end engineering; they aim it.',
      ],
      links: [{ nodeId: 'prog-variables', label: 'Where you met the 2s timeout: the code runner' }],
    },
    {
      kind: 'predict',
      question: 'Your code-runner worker kills learner code after 2 seconds. Could a cleverer checker instead PROVE, for every submission, whether it will loop forever?',
      options: [
        'No — that’s literally the halting problem; the timeout is the honest engineering answer',
        'Yes, with enough AI',
        'Yes, by testing all inputs first',
        'Only for programs longer than 1,000 lines',
      ],
      correctIndex: 0,
      reveal:
        'A perfect loop-detector for arbitrary code is exactly H — proven impossible, and AI doesn’t get an exemption (a neural network is still an algorithm, still bound by the theorem). The 2-second terminate is not a hack; it’s the mathematically correct response to an uncomputable question: change the question to a bounded one. Theory told you where to stop looking.',
    },
    {
      kind: 'quiz',
      question: 'What did adding the infinite tape give the machine that the FSM lacked?',
      options: [
        'Unbounded read/write memory — enabling counting, nesting and general computation',
        'Faster clock speed',
        'The ability to read input at all',
        'Better electrical efficiency',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the tape is memory without a ceiling — exactly the thing whose absence blocked balanced-parentheses.',
        'Turing machines are gloriously slow — power here means CAN vs CANNOT, not speed.',
        'FSMs read input fine; they just can’t write notes about it.',
        'It’s a paper machine — physics comes later.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The Church-Turing thesis claims…',
      options: [
        'Anything any mechanical procedure can compute, a Turing machine can compute — “computable” has one meaning',
        'Turing machines are the fastest computers',
        'All problems are computable with enough effort',
        'Churches invented computing',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: every rival definition of “algorithm” ever proposed (lambda calculus, your CPU, quantum computers for computability) landed exactly equal. That convergence is the evidence.',
        'They’re absurdly slow — the thesis is about the boundary of possible, not performance.',
        'The halting problem refutes that directly — the thesis DEFINES the boundary; it doesn’t erase it.',
        'Alonzo Church, the logician — Turing’s counterpart with lambda calculus.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The halting problem asks for a program that…',
      options: [
        'Decides, for ANY program and input, whether it eventually finishes — and provably cannot exist',
        'Stops other programs from running',
        'Measures how long programs take',
        'Detects infinite loops in most simple cases',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a universal terminate-or-loop oracle — impossible by the self-reference proof.',
        'Killing programs is easy (your OS does it); PREDICTING them is the impossible part.',
        'Timing halting programs is fine; the impossibility is deciding IF one halts.',
        '“Most simple cases” is exactly what real tools do — legal because it’s weaker than the universal claim.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The proof builds a program that asks the oracle about ITSELF and does the opposite. This shows H can’t exist because…',
      options: [
        'Whatever H answers about that program is wrong by construction — so no always-correct H is possible',
        'Programs are forbidden from self-reference',
        'The troll program runs too slowly',
        'H merely needs more memory',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: one guaranteed counterexample defeats a claimed-universal oracle. Same self-reference blade as “this sentence is false” — but here it cuts a precise engineering claim.',
        'Self-reference is perfectly legal (programs process programs all the time — compilers!) — that legality is what arms the proof.',
        'Speed never enters — the contradiction is logical.',
        'No resource fixes it; the impossibility is absolute, tape unlimited.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Given Rice’s theorem (all interesting behavioral questions about programs are uncomputable in general), how do real analysis tools work?',
      options: [
        'They answer weaker questions — “provably safe / provably broken / can’t tell” — or bound execution with timeouts',
        'They secretly solve the halting problem',
        'They only run on small programs',
        'They don’t work; all analysis tools are fake',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: approximation with an honest “unknown” bucket, restricted languages, and bounded runs — engineering inside the theorem’s boundaries. Your 2s worker timeout is this.',
        'Nothing solves it — tools that claimed to would be wrong on some input, guaranteed.',
        'Size isn’t the boundary — tiny programs can be undecidable; huge ones can be provable.',
        'They work well — by answering answerable questions.',
      ],
    },
  ],
  extraPractice: [
    {
      question: '“Turing-complete” describes a system that…',
      options: [
        'Can simulate a Turing machine — hence compute anything computable (given time and memory)',
        'Was personally approved by Turing',
        'Contains at least one infinite tape',
        'Cannot ever crash',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the universality club — your CPU, every language, Excel formulas, even Minecraft redstone qualify. Membership is shockingly cheap; that’s the Church-Turing lesson.',
        'He died in 1954; the term honors the model.',
        'Real systems have finite memory — “complete” means the STRUCTURE suffices; memory is treated as extendable.',
        'Turing-complete systems crash plenty — power ≠ safety (rather the opposite: more power, less analyzability).',
      ],
    },
    {
      question: 'Why does “our AI will just detect all infinite loops” fail as a startup pitch?',
      options: [
        'A neural network is an algorithm, so the halting problem applies to it too — some inputs WILL fool it',
        'AI is too expensive to run',
        'Infinite loops are too rare to matter',
        'It would work but nobody needs it',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: no algorithm escapes the theorem — “with AI” doesn’t amend mathematics. (A tool that catches MANY loops with an honest can’t-tell bucket is legitimate — and exists.)',
        'Cost isn’t the objection; impossibility is.',
        'They matter enormously (your Worker timeout exists for a reason) — the pitch fails on the word ALL.',
        'Everyone needs it — which is why it’s important that it’s impossible as stated.',
      ],
    },
  ],
}
