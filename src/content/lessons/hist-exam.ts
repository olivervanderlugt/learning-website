import type { Lesson } from '../../types'

export const histExamLesson: Lesson = {
  nodeId: 'hist-exam',
  screens: [
    {
      kind: 'explain',
      title: 'Module exam — prove you see the patterns',
      body: [
        'Ten questions across the whole domain — the scientific method, computing history, and the machine revolutions — all NEW, no repeats from the lesson quizzes. Retrieval from memory is the point.',
        'Score 80% and the module is sealed. Below that? You lose nothing — you’ll see exactly which thread slipped, review it, and retake.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Tycho spent 20 years measuring planet positions; Galileo rushed to improve the telescope; the Royal Society obsessed over instruments. Why are better measurements such an engine for discovery?',
      options: [
        'Sharper data exposes small mismatches with theory — and mismatches are where new laws hide',
        'Precise instruments make running experiments unnecessary',
        'Better tools mostly confirm that the old theories were right all along',
        'Measurement matters for engineering, but truth comes from logical argument',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: Kepler found ellipses only because Tycho’s data was precise enough that an 8-arcminute error couldn’t be waved away. Better instruments shrink error bars until a discrepancy becomes signal.',
        'Instruments ARE the experiment’s eyes — measurement is how an experiment delivers its verdict, not a substitute for running it.',
        'History ran the other way: the telescope broke Earth-centered astronomy and Tycho’s precision killed circular orbits. Sharper looking tends to dethrone old theories.',
        'That’s the pre-revolution mindset — logic anchored to authority. The revolution’s whole move was anchoring argument to observation.',
      ],
    },
    {
      kind: 'quiz',
      question: 'By 1700, Newton’s physics had displaced Aristotle’s. On the revolution’s own standards, what actually earned that trust?',
      options: [
        'It made precise, testable predictions that kept coming true',
        'Newton’s genius and reputation made his word authoritative',
        'It matched everyday intuition better than Aristotle’s physics did',
        'Its mathematics was so elegant that it had to be true',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: universal gravitation predicted comet returns, tides and planet positions — claims that could have failed, and didn’t. Surviving hard tests is the only currency the new method accepts.',
        'Swapping Aristotle’s authority for Newton’s would change the name, not the method — the revolution’s point was that NOBODY’s word settles it.',
        'It’s less intuitive: the same invisible force pulling apples supposedly steers the Moon? Intuition backed Aristotle; evidence backed Newton.',
        'Elegance is a hint, not a verdict — circular orbits were elegant for 2,000 years and wrong. Beauty didn’t save them from Tycho’s data.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A natural philosopher in 1670 announces a surprising result. Under the new Royal Society norms, what makes the community accept it as knowledge?',
      options: [
        'Others independently repeat the experiment and get the same result',
        'A respected senior member vouches for the claimant’s character',
        'The claimant wins a public debate against the critics',
        'The result is shown to be consistent with the ancient texts',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: publish the method, let strangers replicate — a result must survive OTHER people’s hands before it counts. Replication is the filter between anecdote and knowledge.',
        'Character vouching is just authority in a wig — exactly the currency the new norms devalued.',
        'Debating skill measures rhetoric, not reality — Aristotle’s physics won arguments for two millennia while being wrong about falling bodies.',
        'Agreement with ancient texts was the OLD test; the revolution made agreement with experiment the only one that counts.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Ada Lovelace saw something in the Analytical Engine that even Babbage hadn’t fully articulated. What was her far-reaching insight?',
      options: [
        'A machine that manipulates symbols could work on anything encodable — music, text — not just numbers',
        'The machine would one day think and originate ideas of its own',
        'The real breakthrough was that machines calculate faster than humans',
        'The mechanical parts should be replaced with electrical switches',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: she saw the engine processed SYMBOLS, and numbers are just one thing symbols can stand for — the “everything is encodable” idea, a century before bits.',
        'She famously argued the opposite — the engine “has no pretensions to originate anything”, it only does what it’s ordered to. Her leap was about representation, not machine minds.',
        'Speed is the mundane win — mechanical calculators already beat humans. Her leap was about WHAT could be computed, not how fast.',
        'Electronics were unimaginable in the 1840s — the vision that outran the hardware was generality, not a better component.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The vacuum tube could already switch and amplify. Why did the transistor (1947) displace it so completely?',
      options: [
        'Solid-state means no fragile glass, no burning filament, tiny size, little power — reliable, cheap, and endlessly shrinkable',
        'Vacuum tubes couldn’t represent binary 1s and 0s',
        'A single transistor could store an entire program',
        'Transistors were the first components able to amplify a signal',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: same JOB as the tube, radically better physics — nothing to heat, break or burn out, and it keeps getting smaller. That shrinkability is the runway Moore’s law ran on.',
        'ENIAC computed in binary-style logic with tubes just fine — switching wasn’t the problem. Heat, bulk and constant failures were.',
        'A transistor is one switch, not a memory bank — storing anything takes many of them working together.',
        'Amplification was the vacuum tube’s claim to fame for decades — the transistor did the same tricks in solid material.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What role did World War II actually play in the birth of electronic computers?',
      options: [
        'Urgent problems — code-breaking, artillery tables — poured money and talent into building the first electronic machines',
        'Commanders needed a network to exchange electronic messages',
        'Turing invented his universal machine as a wartime weapon',
        'The war halted computing progress until peacetime',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: Colossus broke ciphers at Bletchley and ENIAC was built for ballistics tables. The theory had existed since 1936 — the war supplied the urgency and funding to turn it into hardware.',
        'Networking waited until ARPANET (1969), decades later — wartime machines crunched codes and trajectories, they didn’t message each other.',
        'His universal-machine paper is from 1936, answering a pure logic question — the war came later and put him to work on Enigma.',
        'The opposite: the war compressed years of development into months by making computation a matter of survival.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Put these computing milestones in the order they happened:',
      options: [
        'Babbage designs the Analytical Engine → Turing defines the universal machine → ENIAC runs → the transistor is invented',
        'Turing defines the universal machine → Babbage designs the Analytical Engine → the transistor is invented → ENIAC runs',
        'The transistor is invented → ENIAC runs → Turing defines the universal machine → Babbage designs the Analytical Engine',
        'Babbage designs the Analytical Engine → ENIAC runs → the transistor is invented → Turing defines the universal machine',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: mechanical design (1830s) → mathematical theory (1936) → working electronic machine (1945) → the better switch (1947). Idea, then theory, then machine, then the component that made machines practical.',
        'Babbage’s brass-and-gears design predates Turing by a century — the Victorian idea came first, the mathematics later.',
        'Fully reversed — this order would mean the hardware appeared before anyone had the idea or the theory for it.',
        'Turing’s theory (1936) came BEFORE ENIAC (1945) — the mathematics of what computers could do predated any electronic computer existing.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Steam had powered factories for a century, yet the moving assembly line only became possible with electricity. Why?',
      options: [
        'Each machine could get its own motor, so machines could line up in the order of the WORK instead of crowding around one central engine',
        'Electric motors deliver fundamentally more power than steam engines',
        'Steam engines couldn’t run continuously through a workday',
        'Electric machines operated themselves without workers',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: one steam engine meant belts and shafts dictating the whole floor plan; a motor per machine freed the layout. The assembly line is a LAYOUT invention — process order beat power proximity.',
        'Big steam engines out-muscled early motors — the win was distribution and placement, not raw watts.',
        'Steam engines drove mills day and night for decades — endurance wasn’t the problem, geometry was.',
        'Self-operation is Wave 3 (computers and control) — electric Wave-2 machines still needed a human at every station.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In 1914 Ford doubled workers’ pay to $5 a day — and profited. What made that math work?',
      options: [
        'Assembly-line workers were so productive that paying more to cut turnover and keep trained people was a bargain',
        'New labor laws forced all factories to raise wages',
        'Machines had taken over the real work, so the wages were mostly symbolic',
        'Rising wages happen automatically whenever machines raise output',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the line made each worker’s output enormous while turnover was rampant — endlessly retraining replacements cost more than the raise. High productivity can FUND high wages; it doesn’t guarantee them.',
        'No mandate — Ford chose it, and competitors were stunned. Minimum-wage laws came decades later.',
        'The line still needed thousands of humans at every station — each hour of their time got MORE valuable, not less.',
        'The Engels’ pause is the counterexample: industrial output soared for decades while ordinary wages stagnated. The productivity–pay link is real but never automatic.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Steam, electricity and computing are called “general-purpose technologies.” What earns that label — and makes their arrival so disruptive?',
      options: [
        'They transform work across nearly EVERY industry and spawn waves of downstream inventions',
        'They deliver their productivity gains immediately, without new skills or reorganization',
        'They were designed by committees to serve the general public',
        'They replace all previous technologies the moment they arrive',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: steam didn’t just pump mines — it drove mills, trains and ships; computing runs everything from looms to lidar. A technology that upgrades ALL work rewrites the whole economy.',
        'Their signature is the opposite — the payoff arrives only after workflows are redesigned around them, often decades later. That lag is where founders find their opening.',
        'They spread through markets and competition, not committee design — “general-purpose” describes their reach, not their governance.',
        'Adoption takes decades — steam and sail shared the oceans for most of a century. Old tech fades because it’s outcompeted, not overnight.',
      ],
    },
  ],
}
