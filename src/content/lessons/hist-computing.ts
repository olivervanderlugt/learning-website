import type { Lesson } from '../../types'

export const histComputingLesson: Lesson = {
  nodeId: 'hist-computing',
  screens: [
    {
      kind: 'explain',
      title: 'The machine you already built',
      body: [
        'You’ve built gates, an adder, even a tiny CPU. This lesson is the story of the real people who did that for the first time — and how long it took.',
        'The surprise: the IDEA of a computer is a century older than the electronics. Software was imagined before hardware could exist.',
        'Keep one question in mind: at each step, what was the missing ingredient — the idea, or the technology?',
      ],
      links: [
        { nodeId: 'gates', label: 'Refresher: The Logic of Gates' },
        { nodeId: 'cpu', label: 'Refresher: The CPU' },
      ],
    },
    {
      kind: 'predict',
      question: 'The first computer program was written in the 1840s. What did it run on?',
      options: [
        'Nothing — the machine it was written for was never completed',
        'An early electrical relay computer',
        'A steam-powered prototype that worked briefly',
        'A mechanical calculator in a bank',
      ],
      correctIndex: 0,
      reveal:
        'Ada Lovelace wrote an algorithm (computing Bernoulli numbers) for Charles Babbage’s Analytical Engine — a fully programmable MECHANICAL computer designed in 1837. Victorian engineering could never finish building it, so the first program existed a century before any machine could run it. The idea outran the technology.',
    },
    {
      kind: 'explain',
      title: 'Idea first, hardware later',
      body: [
        'Babbage’s Analytical Engine (1837) had the full modern recipe: a mill (CPU), a store (memory), and punched-card programs — in brass and gears.',
        'Lovelace saw what Babbage didn’t fully articulate: a machine that manipulates SYMBOLS could go beyond numbers — to music, to anything encodable. That’s the bits insight, 100 years early.',
        'In 1936 Alan Turing made it mathematics: one “universal machine” can compute anything any machine can. Every laptop and robot controller is that one design.',
      ],
      deeper: [
        'Turing’s 1936 paper wasn’t about building anything — it answered a logic question (the Entscheidungsproblem: can every mathematical statement be decided by a procedure?). The answer was no, and the proof required inventing a precise definition of “procedure” — the Turing machine.',
        'Universality is why software eats the world: you don’t build a new machine per task, you write new instructions for the SAME machine. Your CPU lesson showed this — one fetch-decode-execute loop, endless programs.',
        'World War II turned theory into urgency: code-breaking (Colossus at Bletchley, with Turing central to the Enigma effort) and artillery tables (ENIAC, 1945) funded the first real electronic computers.',
      ],
      links: [{ nodeId: 'bits', label: 'The bits insight: everything is encodable' }],
    },
    {
      kind: 'predict',
      question: 'ENIAC (1945) computed with ~18,000 vacuum tubes — hot, glass, failure-prone. What single invention two years later eventually replaced the tube and made computers small, cheap and reliable?',
      options: ['The transistor', 'The integrated circuit', 'The microprocessor', 'Magnetic core memory'],
      correctIndex: 0,
      reveal:
        'The transistor (Bell Labs, 1947): a switch made of solid silicon-family material with no vacuum, no filament, no moving parts. The integrated circuit (1958) and microprocessor (1971) came LATER — they’re ways of packing ever more transistors together. First the new switch, then the packaging revolution.',
    },
    {
      kind: 'explain',
      title: 'Small, then everywhere',
      body: [
        'The chip era is one trend line: more transistors in less space for less money. Moore’s observation (1965) — transistor counts roughly doubling every couple of years — held for decades.',
        'That’s why the same decades gave us the microprocessor (1971), the personal computer (late 1970s), and eventually a CPU in every sensor and servo.',
        'Meanwhile a parallel story: ARPANET (1969) linked computers together, and the World Wide Web (public in 1991) made the network usable by everyone. Compute + connection = the modern world.',
      ],
      deeper: [
        'Moore’s law was never physics — it was an industry pacing itself to an expectation, a self-fulfilling roadmap. It’s now slowing (transistors approach atomic scales), which is why the industry pivots to specialized chips: GPUs, neural accelerators, robot SoCs.',
        'The first ARPANET message in 1969 was meant to be “LOGIN”; the system crashed after “LO”. Even the internet started with a bug.',
        'Pattern worth stealing for a startup: each wave (mainframe → PC → web → mobile → embedded AI) looked like a toy to the previous wave’s giants. Cheap-and-underestimated is where new companies win.',
      ],
    },
    {
      kind: 'game',
      gameId: 'computing-timeline',
    },
    {
      kind: 'quiz',
      question: 'Why is Ada Lovelace’s 1843 work called the first computer program?',
      options: [
        'She published an algorithm for a programmable machine — even though that machine was never built',
        'She built the first working computer',
        'She invented the transistor that made programs possible',
        'She wrote the first program that ran on ENIAC',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: her notes on the Analytical Engine contain a step-by-step algorithm (Bernoulli numbers) for a machine that existed only on paper — software preceded hardware.',
        'No machine was built — that’s the point. The Analytical Engine stayed a design; her program never ran in her lifetime.',
        'The transistor came in 1947, a century later, and is hardware — unrelated to her contribution.',
        'ENIAC arrived in 1945, over 100 years after her notes. She never saw an electronic computer.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What made Turing’s 1936 “universal machine” idea so important?',
      options: [
        'One machine, given the right instructions, can compute anything any other machine can',
        'It was the first machine to use electricity',
        'It proved computers could never make mistakes',
        'It was the fastest computer of its era',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: universality means you build ONE general machine and change only the software — the principle behind every computer since.',
        'It wasn’t a physical machine at all — it was a mathematical construction in a logic paper.',
        'Almost the opposite: the same paper proved some problems are UNDECIDABLE — no machine can solve them.',
        'There was nothing to race — it existed only on paper, as a definition of what “computable” means.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Put the hardware chain in the right causal order:',
      options: [
        'Transistor → integrated circuit → microprocessor',
        'Microprocessor → transistor → integrated circuit',
        'Integrated circuit → transistor → microprocessor',
        'Transistor → microprocessor → integrated circuit',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: first the new switch (1947), then many switches on one chip (1958), then a whole CPU on one chip (1971). Each step packages the previous one more densely.',
        'The microprocessor is MADE of integrated circuitry, which is made of transistors — it can’t come first.',
        'An integrated circuit is a circuit OF transistors on one chip; the transistor had to exist first.',
        'The microprocessor (1971) is a special integrated circuit (1958) — the IC came before it, not after.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Moore’s law is best described as…',
      options: [
        'An industry trend — transistor counts doubling every ~2 years — not a law of physics',
        'A physical law guaranteeing computers improve forever',
        'A law regulating the price of computer chips',
        'Turing’s theorem about what is computable',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: it was Gordon Moore’s empirical observation that became the industry’s self-imposed roadmap — and it’s slowing as transistors near atomic scale.',
        'Nothing guarantees it — it’s an observed trend, and physics (atom-sized limits, heat) is now ending the free ride.',
        'It’s not legislation — “law” here just means a repeated pattern someone noticed.',
        'That’s computability theory (1936) — a genuinely mathematical result, unlike Moore’s empirical trend.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A pattern this history keeps repeating — and the useful lesson for a builder — is:',
      options: [
        'Ideas often arrive before the technology to realize them; the winners spot when tech finally catches up',
        'Hardware always comes first, and software follows years later',
        'Every breakthrough came from one lone genius working in isolation',
        'New computing waves are always led by the biggest existing companies',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: Babbage/Lovelace waited a century for electronics; Turing’s 1936 machine waited a decade; neural networks waited for GPUs. Timing idea-to-technology is a founder’s core skill.',
        'Backwards for the biggest cases: the program (1843) and the theory (1936) both predate working electronic hardware (1940s).',
        'Every milestone was collaborative: Bell Labs teams, Bletchley Park, university groups — even Babbage had Lovelace.',
        'Historically the opposite: PCs, the web and mobile were each dismissed as toys by the era’s giants — new waves are where newcomers win.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'ENIAC (1945) was built with which switching technology?',
      options: ['Vacuum tubes', 'Transistors', 'Integrated circuits', 'Brass gears'],
      correctIndex: 0,
      explanations: [
        'Correct: ~18,000 vacuum tubes — power-hungry and failure-prone, which is what made the transistor such a leap.',
        'The transistor was invented two years later (1947) and took years to reach computers.',
        'Integrated circuits arrived in 1958, over a decade later.',
        'Gears were Babbage’s century — ENIAC was fully electronic.',
      ],
    },
    {
      question: 'What did the World Wide Web (1991) add on top of the existing internet?',
      options: [
        'Pages and links — a usable way for anyone to publish and navigate information',
        'The physical cables connecting computers',
        'The first-ever electronic messages',
        'The transistor density needed for networking',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the internet (ARPANET, 1969) already moved data; Berners-Lee’s web added URLs, HTML pages and hyperlinks — the usable layer on top.',
        'The network infrastructure existed for two decades before the web — that’s exactly the internet/web distinction.',
        'Electronic messaging predates the web by decades (email was common on ARPANET in the 1970s).',
        'Transistor density is a chip story; the web is a software/protocol story.',
      ],
    },
  ],
}
