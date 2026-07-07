import type { Lesson } from '../../types'

export const mathOdeLesson: Lesson = {
  nodeId: 'math-ode',
  screens: [
    {
      kind: 'explain',
      title: 'Equations about change itself',
      body: [
        'A differential equation relates a quantity to its OWN rate of change. The simplest and most common form is dy/dx = k·y — "the rate of change is proportional to the current amount."',
        'That one equation describes radioactive decay, population growth, capacitor discharge, and a cooling cup of coffee — completely different physics, identical math.',
        'Solving it means finding the FUNCTION y(x), not just a number.',
      ],
      deeper: [
        'The general technique here is called SEPARATION OF VARIABLES: if dy/dx = f(x)·g(y), you can split the x-stuff and y-stuff onto opposite sides — dy/g(y) = f(x)·dx — and integrate both sides independently. It only works when the equation factors this cleanly; most real ODEs don’t, which is why this is the gentle on-ramp, not the whole subject.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A hot cup of coffee cools according to dT/dt = −k(T − T_room). As T gets closer to T_room, what happens to the cooling RATE?',
      options: [
        'It slows down — the rate is proportional to the remaining gap, which is shrinking',
        'It speeds up as it approaches room temperature',
        'It stays perfectly constant the whole time',
        'It reverses and the coffee starts reheating',
      ],
      correctIndex: 0,
      reveal:
        'The rate dT/dt is proportional to (T − T_room) — the gap. As the gap shrinks, the rate shrinks too, so cooling slows and slows, technically never (in the ideal model) fully reaching T_room. This is why coffee cools fast at first and seems to "hover" annoyingly close to room temperature forever after.',
    },
    {
      kind: 'explain',
      title: 'Solving by separation',
      body: [
        'Worked example: dy/dx = k·y. Separate: dy/y = k·dx. Integrate both sides: ln|y| = kx + C. Exponentiate: y = (e^C)·e^{kx}, and since e^C is just some constant, rename it A: y = A·e^{kx}.',
        'A is fixed by the STARTING value: at x = 0, y = A. So if you know where you began, you know the whole curve forever after.',
        'Every "separable" ODE follows this exact three-step dance: separate, integrate, solve for the constant.',
      ],
      deeper: [
        'Notice the "integrate both sides" step is exactly the accumulation idea from Integrals & Accumulation — solving an ODE is nothing more than running that machinery twice, once on each side of the equals sign.',
      ],
      links: [{ nodeId: 'math-calculus-3', label: 'Refresher: Integrals & Accumulation' }],
    },
    {
      kind: 'predict',
      question:
        'Completion step — a radioactive sample obeys dN/dt = −λN with N(0) = 1000 g. Following the same three steps, what is N(t)?',
      options: [
        'N(t) = 1000·e^(−λt)',
        'N(t) = 1000 − λt',
        'N(t) = λ·e^(−1000t)',
        'N(t) = 1000·e^(λt)',
      ],
      correctIndex: 0,
      reveal:
        'Separate (dN/N = −λ dt), integrate (ln|N| = −λt + C), exponentiate (N = A·e^(−λt)), then fix A using N(0) = 1000. Same dance every time — only the sign on λ (decay, not growth) and the starting value change.',
    },
    {
      kind: 'predict',
      question:
        'Independent step — you have two identical radioactive samples, but sample B’s decay constant λ is DOUBLE sample A’s. Which one reaches half its starting amount sooner?',
      options: [
        'Sample B — a bigger λ means the exponential decays faster',
        'Sample A — a smaller λ always wins the race to decay',
        'They tie — λ only affects the starting amount, not the speed',
        'It depends on which sample started with more mass',
      ],
      correctIndex: 0,
      reveal:
        'In N(t) = N0·e^(−λt), λ sits in the EXPONENT — it controls how fast the curve falls, not where it starts (that’s N0). Double λ means the exponent grows twice as fast in magnitude, so sample B reaches any given fraction of its start in half the time.',
    },
    {
      kind: 'code',
      prompt:
        'Prove the exponential-decay law yourself. Fill in the missing update line for dy/dt = −k·y (a tiny Euler step: y changes by −k·y·dt each tick), then compare the simulation to the closed-form formula for two different decay rates.',
      starter: `function simulateDecay(y0, k, dt, steps) {
  let y = y0
  for (let i = 0; i < steps; i++) {
    y += 0 // fill in: -k * y * dt
  }
  return y.toFixed(2)
}
print('k=0.5 decays to', simulateDecay(100, 0.5, 0.001, 4000))
print('k=1.0 decays to', simulateDecay(100, 1.0, 0.001, 4000))`,
      expected: `k=0.5 decays to 13.53
k=1.0 decays to 1.83`,
      hint: 'Each tiny step, y should change by: -k * y * dt',
      success:
        'k=0.5 lands at 13.53 — matching the closed form 100·e^(−0.5×4) = 13.53 exactly. k=1.0 (double the rate) lands at 1.83, matching 100·e^(−4) — a MUCH faster fall, exactly as the last screen predicted. Thousands of tiny straight-line steps trace out a curve no straight line could.',
    },
    {
      kind: 'quiz',
      question: 'Which of these is a SEPARABLE differential equation?',
      options: [
        'dy/dx = 3y (the y-stuff and x-stuff can be split onto opposite sides)',
        'dy/dx = x + y (x and y are tangled together by addition)',
        'd²y/dx² = y (a second derivative is involved)',
        'dy/dx = sin(x·y) (x and y are multiplied inside a function)',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: dy/dx = 3y rearranges cleanly to dy/y = 3 dx — pure y on one side, pure x on the other. That is exactly what "separable" means.',
        'Addition tangles x and y so they can’t be pulled onto opposite sides by simple algebra — this needs different techniques entirely.',
        'A second derivative isn’t automatically unseparable, but this particular equation (y’’ = y) needs a different solving method than separation — that’s next lesson’s territory.',
        'sin(xy) mixes x and y inside a single function with no clean way to split them apart — not separable.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A radioactive sample starts at N0 = 1000 g with λ = 0.05 per year. Using N(t) = 1000·e^(−λt), about how much remains after 20 years?',
      options: ['≈368 g', '≈500 g', '≈0 g', '≈950 g'],
      correctIndex: 0,
      explanations: [
        'Correct: N(20) = 1000·e^(−0.05×20) = 1000·e^(−1) ≈ 1000×0.368 ≈ 368 g.',
        '500 g would be the HALF-LIFE point — but the half-life here is ln(2)/0.05 ≈ 13.9 years, not 20.',
        'Exponential decay never truly reaches zero in this model — it always leaves a shrinking remainder, however small.',
        '950 g barely decayed at all — that would need a much smaller λ or a much shorter time than 20 years.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A capacitor discharges as V(t) = V0·e^(−t/RC). If V0 = 9 V and RC = 2 s, what is the voltage after 4 seconds?',
      options: ['≈1.22 V', '≈4.5 V', '≈9 V', '≈0 V exactly'],
      correctIndex: 0,
      explanations: [
        'Correct: V(4) = 9·e^(−4/2) = 9·e^(−2) ≈ 9×0.1353 ≈ 1.22 V.',
        '4.5 V would be half of 9 — but this is exponential decay, not a straight halving at the "half the time constant" mark.',
        '9 V would mean no discharge happened at all — but 4 seconds is a full 2 time-constants (RC) of decay.',
        'Exponential decay approaches zero but the model never reaches EXACTLY zero in finite time — there is always a shrinking remainder.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Newton’s law of cooling, dT/dt = −k(T − T_room), is separable because…',
      options: [
        'Letting u = T − T_room turns it into du/dt = −ku — the same growth/decay form as before',
        'Temperature and time are the same kind of quantity',
        'It has no k in it',
        'It is actually not separable at all',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: substituting u = T − T_room reduces it to exactly the du/dt = −ku pattern from this lesson — same solution shape, just shifted by the room temperature.',
        'They’re very different quantities (degrees vs. seconds) — separability is about the ALGEBRAIC structure of the equation, not the units involved.',
        'k is very much present — it controls how fast the temperature gap closes.',
        'It absolutely is separable, once you notice the (T − T_room) term behaves exactly like a single variable under the substitution u = T − T_room.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You solve dy/dx = k·y and get y = A·e^(kx). What determines the constant A?',
      options: [
        'The starting value: A = y at x = 0',
        'The value of k',
        'The final value of y after infinite time',
        'A is always exactly 1',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: plugging x = 0 into y = A·e^(kx) gives y(0) = A — the starting condition pins down the one remaining unknown.',
        'k controls the SHAPE (growth vs. decay, how fast) but says nothing about where the curve starts — that’s A’s job.',
        'For decay (negative k), the "final value" is approximately zero regardless of A — that tells you nothing about A itself.',
        'A is whatever the initial condition says it is — for a colony starting at 5000 organisms, A = 5000, not 1.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A bacteria colony grows as dN/dt = 0.2N (N in thousands), starting at N(0) = 5. What is N(t)?',
      options: ['N(t) = 5·e^(0.2t)', 'N(t) = 5·e^(−0.2t)', 'N(t) = 5 + 0.2t', 'N(t) = 0.2·e^(5t)'],
      correctIndex: 0,
      explanations: [
        'Correct: positive k = 0.2 means GROWTH, and N(0) = 5 fixes the constant — N(t) = 5·e^(0.2t).',
        'The negative sign would mean decay — but dN/dt = 0.2N (positive coefficient) means the colony is growing, not shrinking.',
        'That’s linear growth, not exponential — separable equations of this form always solve to an exponential, never a straight line.',
        'The roles are swapped — 5 is the starting AMOUNT (goes in front), 0.2 is the RATE (goes in the exponent).',
      ],
    },
    {
      question: 'You have y = 50·e^(−0.1t). What is y at t = 10?',
      options: ['≈18.4', '≈25', '≈5', '≈50'],
      correctIndex: 0,
      explanations: [
        'Correct: y(10) = 50·e^(−1) ≈ 50×0.3679 ≈ 18.4.',
        '25 would be exactly half of 50 — but exponential decay over one "time constant" (here, t=10 since k=0.1) leaves about 37%, not 50%.',
        '5 decays too much — that would need roughly e^(−2.3), a much longer time or a much larger k.',
        '50 is the STARTING value — some decay has clearly happened by t = 10.',
      ],
    },
    {
      question: 'Which everyday process is NOT well modeled by dy/dx = k·y?',
      options: [
        'A ball’s height while bouncing — position depends on gravity, not on the height itself',
        'Radioactive decay — fewer atoms left means fewer decays per second',
        'Compound interest — more money earns more interest',
        'A cooling drink — bigger temperature gap means faster heat loss',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a bouncing ball’s motion is governed by gravity and impacts (constant acceleration, suvat territory) — its rate of change does NOT scale with its current height.',
        'Radioactive decay is the textbook dy/dx = k·y example — the decay rate is directly proportional to how much material remains.',
        'Compound interest is discrete-time dy/dx = k·y — your balance grows in proportion to how much you already have.',
        'Newton’s cooling is exactly this pattern (after the T − T_room substitution) — the rate of heat loss scales with the remaining temperature gap.',
      ],
    },
    {
      question: 'In N(t) = N0·e^(−λt), if you double N0 but keep λ the same, what happens to the HALF-LIFE (time to reach half the current amount)?',
      options: [
        'It stays exactly the same — half-life depends only on λ, not on the starting amount',
        'It doubles along with N0',
        'It halves',
        'It becomes instantaneous',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: half-life = ln(2)/λ — it depends ONLY on the decay constant, never on how much you started with. Twice as much material takes exactly as long to halve.',
        'This is a common intuition trap — more material does NOT mean it takes longer to halve; the process is proportional, so timing is unaffected by starting amount.',
        'The opposite mistake — again, N0 doesn’t appear in the half-life formula at all.',
        'Nothing about doubling N0 makes decay instantaneous — the RATE of decay changes with N0, but the FRACTIONAL timing does not.',
      ],
    },
  ],
}
