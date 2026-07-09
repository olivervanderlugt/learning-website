import type { Lesson } from '../../types'

export const physFirstPrinciplesLesson: Lesson = {
  nodeId: 'phys-first-principles',
  screens: [
    {
      kind: 'explain',
      title: 'Boil it down to what must be true',
      body: [
        'A FIRST PRINCIPLE is a fact so fundamental you can’t derive it from anything simpler — a bedrock truth. First-principles thinking means breaking a problem down to those bedrock truths and reasoning UP from them, step by step.',
        'The opposite is reasoning by ANALOGY: “it’s basically like the last one,” “that’s just how it’s done.” Fast, usually fine — and exactly how you inherit everyone else’s hidden assumptions and mistakes.',
        'Physics is the home of this habit: you don’t memorize a thousand formulas, you derive them from a few laws. Learn to think this way and the whole map gets smaller.',
      ],
      links: [{ nodeId: 'phys-forces', label: 'Where you’ll use it first: Forces & Motion' }],
    },
    {
      kind: 'predict',
      question:
        'A ball dropped from rest falls 5 m in 1 second. Reasoning by analogy, a friend says “so in 2 seconds it falls 10 m — double the time, double the distance.” From the actual law of falling (distance = ½·g·t²), how far does it really fall in 2 s?',
      options: [
        '20 m — distance grows with t², so 2× the time is 4× the distance',
        '10 m — the friend’s “double it” is correct',
        '15 m — halfway between',
        '5 m — it falls the same amount each second',
      ],
      correctIndex: 0,
      reveal:
        'The law says distance ∝ t², so doubling the time QUADRUPLES the distance: ½·10·2² = 20 m, not 10. The “double the time, double the distance” analogy quietly assumed a straight-line relationship that isn’t there. That’s the whole lesson in miniature: an analogy pattern-matches the surface; the first principle (the actual law) tells you the real shape. When they disagree, the principle wins.',
    },
    {
      kind: 'code',
      prompt:
        'The famous move: don’t ask “what does a battery cost?” (an analogy to yesterday’s price). Ask “what is it MADE of, and what do those raw materials cost?” — then build the number up from the bottom. Add each material’s contribution (kg × price per kg).',
      starter:
        "// Rough materials in one kWh of battery cell, and raw-market prices.\nconst materials = [\n  { name: 'nickel',    kg: 0.75, pricePerKg: 16 },\n  { name: 'graphite',  kg: 1.0,  pricePerKg: 8 },\n  { name: 'lithium',   kg: 0.25, pricePerKg: 40 },\n  { name: 'aluminium', kg: 0.5,  pricePerKg: 4 },\n]\nlet floor = 0\nfor (const m of materials) {\n  // add this material's contribution to the cost floor:\n  floor = floor + \n}\nprint('materials cost floor ($/kWh):', floor)\nprint('below a $200/kWh market price?', floor < 200)",
      expected: 'materials cost floor ($/kWh): 32\nbelow a $200/kWh market price? true',
      hint: 'm.kg * m.pricePerKg',
      success:
        'Reasoning up from the constituents gives a materials floor near $32/kWh — far below a $200 market price, which means the high price is not a law of nature, it’s just today’s process. That gap between the first-principles floor and the accepted price is where physicists find new physics and founders find new companies. (This is exactly how Musk argued batteries could get radically cheaper.)',
    },
    {
      kind: 'explain',
      title: 'How to actually do it',
      body: [
        'Three moves: (1) state the claim, (2) ask of each assumption “is this a fundamental truth, or just convention/analogy?”, (3) rebuild the answer using only what survives.',
        'Physics hands you power tools for this. DIMENSIONAL ANALYSIS: the units on both sides of an equation must match, so a wrong formula often outs itself instantly. LIMITING CASES: check what happens at zero, at infinity — a real law behaves sensibly there. ESTIMATION: build a rough number from fundamentals before trusting a precise one.',
        'The reward is independence: you can derive, sanity-check and even invent, instead of only recalling.',
      ],
      deeper: [
        'This is old and deep. Aristotle called a first principle “the first basis from which a thing is known”; Descartes tried to doubt everything and rebuild knowledge from what could not be doubted; Feynman’s version was “what do we actually know for sure, and how do we know it?” Same move across 2,300 years: tear down to bedrock, rebuild up.',
        'Dimensional analysis is almost magic. Suppose you forget the period of a pendulum but know it depends on length L (metres) and gravity g (m/s²). The only combination with units of seconds is √(L/g) — so the period MUST be proportional to √(L/g), which is exactly right (T = 2π√(L/g)). You recovered the form of a law you’d forgotten, from units alone.',
        'First principles has a COST: rebuilding everything from scratch is slow, and analogy is right often enough that reinventing the wheel each morning would paralyze you. The skill is knowing WHERE to dig — spend first-principles effort on the load-bearing assumption everyone copies without checking (the “$200 battery,” the “impossible” spec), and reason by analogy for the rest.',
      ],
      links: [
        { nodeId: 'chem-quant-3', label: 'The battery, for real: Electrochemistry & Batteries' },
        { nodeId: 'phys-forces', label: 'Derive, don’t memorize: Forces & Motion' },
      ],
    },
    {
      kind: 'quiz',
      question: 'What best describes reasoning from first principles?',
      options: [
        'Break a problem down to fundamental truths, then build the answer up from only those',
        'Find the most similar past example and copy its answer',
        'Trust the expert consensus without checking',
        'Guess and adjust until it feels right',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: strip away assumptions to bedrock facts, then reconstruct — that’s the method, and why it can reach answers analogy never will.',
        'Copying the nearest example is reasoning by ANALOGY — the very thing first principles is defined against.',
        'Deferring to consensus is an appeal to authority; first principles asks you to re-derive whether the consensus actually follows from fundamentals.',
        'Undirected guessing isn’t it — first principles is a disciplined build-up from known truths, not trial and error.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A rocket’s kinetic energy is ½·m·v². Someone reasons “if we double the speed, we double the energy.” Why is that analogy wrong?',
      options: [
        'Energy grows with v², so doubling the speed QUADRUPLES the energy',
        'It’s right — energy is proportional to speed',
        'Energy actually halves when speed doubles',
        'Speed and energy are unrelated',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the v² in the formula means 2× speed is 2² = 4× energy — the same t²-style trap as the falling ball. Read the exponent, don’t pattern-match “double→double.”',
        'The square is exactly what makes it NOT proportional to speed — proportional would be ½·m·v, which isn’t the law.',
        'Energy rises with speed, and rises fast (as the square); it doesn’t halve.',
        'They’re tightly linked through v² — the point is the relationship is quadratic, not that there’s none.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You half-remember a formula for speed as distance × time. A quick check: distance is in metres, time in seconds, so distance × time has units of metre·seconds. What does this tell you?',
      options: [
        'The formula is wrong — speed must be metres per second, so it should be distance ÷ time',
        'The formula is fine — units don’t matter',
        'Speed is measured in metre·seconds',
        'You need a stopwatch to know',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: speed’s units are m/s, but distance × time gives m·s — the mismatch flags the error instantly, and dividing (m ÷ s) fixes it. That’s dimensional analysis catching a bug for free.',
        'Units are the whole point here — a units mismatch is a guaranteed sign the equation is wrong.',
        'Speed is metres per second, not metre·seconds — the wrong units are exactly the clue.',
        'No measurement needed — the units alone already prove the formula can’t be right.',
      ],
    },
    {
      kind: 'quiz',
      question: 'When is reasoning by analogy the SMARTER choice over grinding everything from first principles?',
      options: [
        'For the many routine assumptions that are reliably true — save first-principles effort for the load-bearing one everyone copies unchecked',
        'Never — first principles is always worth the time',
        'Always — analogy is faster, so use it for everything',
        'Only when you have no data at all',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: rebuilding everything is paralyzingly slow, and analogy is usually right — the skill is spending first-principles effort exactly where a copied assumption might be wrong and costly.',
        'First principles has a real time cost; applying it to every trivial step would stop you getting anything done.',
        'Leaning on analogy for EVERYTHING is how inherited mistakes go unquestioned — you still need first principles for the assumptions that matter.',
        'First principles is most useful precisely when you DO have facts to build from — it’s not a last resort for data-free guessing.',
      ],
    },
  ],
  extraPractice: [
    {
      question:
        'A supplier insists a custom part “can’t cost less than $500 — that’s the market rate.” A first-principles response is to…',
      options: [
        'Estimate the raw material + machining time from scratch and see what the floor actually is',
        'Accept it, since the supplier knows the market',
        'Find a different part that’s cheaper and use that number',
        'Assume it’s wrong without checking anything',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: build the cost up from fundamentals (material mass × price + machine time × rate) to find the real floor — the “market rate” is an analogy, not a law.',
        'Deferring to “the market rate” is exactly the inherited-assumption trap first principles exists to break.',
        'Swapping in another part’s price is still analogy — you haven’t derived what THIS part must cost.',
        'First principles isn’t “assume it’s wrong” — it’s DERIVE the floor and compare; the derivation is the whole point.',
      ],
    },
    {
      question:
        'Doubling the radius of a wheel does what to its circumference (C = 2πr), and is “double r → double C” right?',
      options: [
        'Doubles it — circumference is linear in r, so here the “double” analogy actually holds',
        'Quadruples it — like the t² cases',
        'Leaves it unchanged',
        'Halves it',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: C = 2πr is LINEAR in r, so 2× radius really is 2× circumference. First principles isn’t “always distrust doubling” — it’s reading the actual relationship, which here is linear.',
        'That would be true for AREA (πr²), not circumference — check the exponent: r is to the first power here.',
        'Circumference clearly grows with radius; it doesn’t stay fixed.',
        'It grows, not shrinks — doubling r doubles C.',
      ],
    },
    {
      question: 'The core value of dimensional analysis (checking units) is that it…',
      options: [
        'Catches wrong equations for free — if the units don’t match on both sides, the formula is wrong',
        'Tells you the exact numerical answer',
        'Replaces the need to understand the physics',
        'Only works for money problems',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: units must balance across an equation, so a mismatch instantly exposes an error — a fast first-principles sanity check before you trust any formula.',
        'It checks the FORM, not the exact number — it can rule out wrong equations but won’t hand you the final digits.',
        'It complements understanding by catching slips; it doesn’t replace knowing what the quantities mean.',
        'Units apply to every physical quantity — length, time, force, energy — not just money.',
      ],
    },
    {
      question: 'Why is first-principles thinking especially prized in physics and in startups?',
      options: [
        'Both reward deriving non-obvious truths from fundamentals rather than copying what already exists',
        'Both avoid math entirely',
        'Both only ever reason by analogy',
        'Neither cares whether conclusions are actually correct',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a physicist derives new results from laws, and a founder finds openings by re-deriving what’s really possible — both beat the crowd precisely by not just copying the status quo.',
        'Both are deeply quantitative — physics obviously, and startups through unit economics and estimation.',
        'Reasoning only by analogy is the opposite of what makes either field advance.',
        'Both live or die on whether the conclusions are right — physics by experiment, startups by the market.',
      ],
    },
  ],
}
