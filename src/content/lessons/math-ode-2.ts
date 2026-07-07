import type { Lesson } from '../../types'

export const mathOde2Lesson: Lesson = {
  nodeId: 'math-ode-2',
  screens: [
    {
      kind: 'explain',
      title: 'When change depends on change',
      body: [
        'First-order ODEs relate y to its rate y′. SECOND-order ones bring in the acceleration y″ — and that unlocks the most important shape in engineering: the oscillator.',
        'A mass on a spring obeys m·x″ + c·x′ + k·x = 0: mass times acceleration, plus damping times velocity, plus stiffness times position, equals zero.',
        'Three terms, one equation — and its behaviour is governed entirely by how the damping c compares to the stiffness k and mass m.',
      ],
      deeper: [
        'The solution has the form x(t) = e^(−σt)·(oscillating part), where σ (the decay rate) and the oscillation frequency both come from the "characteristic equation" m·r² + c·r + k = 0 — the same quadratic you already know, solved for r. Its two roots tell you everything: real roots → no oscillation, complex roots → oscillation with a decaying envelope.',
      ],
    },
    {
      kind: 'predict',
      question:
        'You pull a mass on a spring aside and let go, with only a LITTLE damping. What does it do?',
      options: [
        'Overshoots the center, swings back, and oscillates with slowly shrinking swings',
        'Slides straight back to center and stops, no overshoot',
        'Stays exactly where you released it',
        'Flies off to infinity',
      ],
      correctIndex: 0,
      reveal:
        'Light damping = "underdamped": the mass overshoots the center and rings back and forth, each swing a little smaller as damping bleeds off energy. That decaying wobble is the single most recognizable curve in all of engineering — and, crucially, it is the EXACT shape of an aggressive PID controller overshooting its target.',
    },
    {
      kind: 'explain',
      title: 'Three regimes: under, critical, over',
      body: [
        'The damping ratio ζ (zeta) = c / (2·√(k·m)) sorts every oscillator into three cases. ζ < 1 (underdamped): overshoots and rings. ζ = 1 (critically damped): the fastest possible return with NO overshoot. ζ > 1 (overdamped): no overshoot, but sluggishly slow.',
        'Critical damping is the sweet spot engineers chase — a car’s suspension, a door closer, a robot arm settling: all tuned near ζ = 1.',
        'And this is literally the same trade-off as PID tuning: too little damping (Kd) rings, too much crawls.',
      ],
      deeper: [
        'The natural frequency ω_n = √(k/m) sets how fast an UNDAMPED version would oscillate. Stiffer spring (bigger k) or lighter mass (smaller m) → faster ringing. Damping then rides on top, deciding how quickly that ringing dies. A badly tuned quadcopter altitude loop and a mass on a spring are the same second-order system wearing different clothes.',
      ],
      links: [{ nodeId: 'robo-control-2', label: 'Refresher: Tuning PID — reading the step response' }],
    },
    {
      kind: 'predict',
      question:
        'Completion step — a robot arm settles to its target position but overshoots badly and rings for two seconds before stopping. In oscillator terms, what is its damping ratio, and what would fix it?',
      options: [
        'ζ < 1 (underdamped) — increase damping toward ζ = 1 to kill the ringing',
        'ζ > 1 (overdamped) — decrease damping to speed it up',
        'ζ = 1 already — nothing can improve it',
        'ζ = 0 — the system has no stiffness',
      ],
      correctIndex: 0,
      reveal:
        'Overshoot plus ringing is the fingerprint of ζ < 1. Pushing ζ up toward 1 (more damping — in PID terms, more Kd) trades that ringing for a clean, fast settle. This is the SAME diagnosis you made in the PID tuning lesson, now grounded in the differential equation underneath it.',
    },
    {
      kind: 'predict',
      question:
        'Independent step — a heavy door has an overdamped closer (ζ > 1): it eases shut slowly and never slams. Someone swaps in a weaker closer, dropping ζ below 1. What now happens when the door shuts?',
      options: [
        'It swings past the frame, bounces back open a little, then settles — it overshoots',
        'It shuts even more gently and slowly',
        'It refuses to close at all',
        'Nothing changes — ζ does not affect door behaviour',
      ],
      correctIndex: 0,
      reveal:
        'Dropping ζ below 1 makes the door underdamped: it now overshoots the closed position, bounces, and rings before settling — a door that "slams and rattles." Overdamped closers exist precisely to keep ζ ≥ 1 so the door never overshoots the frame.',
    },
    {
      kind: 'code',
      prompt:
        'Prove the three regimes yourself. This releases a mass from x = 1 and tracks the LOWEST point it reaches (how far it overshoots past the center at 0). Fill in the acceleration line for m·x″ + c·x′ + k·x = 0, then compare three damping values.',
      starter: `function overshoot(m, k, c) {
  let x = 1, v = 0, minX = 1
  const dt = 0.001
  for (let i = 0; i < 8000; i++) {
    const acc = 0 // fill in: -(k/m)*x - (c/m)*v
    v += acc * dt
    x += v * dt
    if (x < minX) minX = x
  }
  return minX.toFixed(2)
}
print('underdamped (c=1):', overshoot(1, 4, 1))
print('critical   (c=4):', overshoot(1, 4, 4))
print('overdamped (c=8):', overshoot(1, 4, 8))`,
      expected: `underdamped (c=1): -0.44
critical   (c=4): 0.00
overdamped (c=8): 0.01`,
      hint: 'Rearrange m·x″ + c·x′ + k·x = 0 for acceleration: acc = -(k/m)*x - (c/m)*v',
      success:
        'With m=1, k=4, critical damping is c = 2·√(k·m) = 4. c=1 (ζ=0.25) overshoots to −0.44 — a 44% overshoot past center. c=4 (ζ=1) just kisses 0.00 with no overshoot: the critical sweet spot. c=8 (ζ=2) is so sluggish it hasn’t even reached center yet (0.01). Fast-with-overshoot vs slow-without — and ζ=1 is the knife-edge between them.',
    },
    {
      kind: 'quiz',
      question: 'What does the damping ratio ζ = 1 (critical damping) give you?',
      options: [
        'The fastest return to rest WITHOUT any overshoot',
        'The slowest possible return',
        'The largest overshoot',
        'Permanent oscillation that never decays',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: ζ = 1 is the exact boundary — any less and it overshoots, any more and it slows down. It’s the quickest settle you can get with zero overshoot.',
        'Overdamped (ζ > 1) is the slow one — critical damping is actually the fastest non-overshooting case.',
        'Underdamped (ζ < 1) produces overshoot; ζ = 1 produces exactly none.',
        'Permanent oscillation needs ζ = 0 (no damping at all) — ζ = 1 decays cleanly and quickly.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A mass-spring system has m = 2 kg, k = 8 N/m. What damping coefficient c gives critical damping (ζ = 1)?',
      options: ['c = 8', 'c = 4', 'c = 16', 'c = 2'],
      correctIndex: 0,
      explanations: [
        'Correct: critical damping is c = 2·√(k·m) = 2·√(8×2) = 2·√16 = 2×4 = 8.',
        'c = 4 gives ζ = 4/(2·√16) = 0.5 — underdamped, so it would still overshoot.',
        'c = 16 gives ζ = 2 — overdamped and sluggish, past the critical point.',
        'c = 2 gives ζ = 0.25 — heavily underdamped, lots of ringing.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'An underdamped robot joint rings when it stops. Which change would REDUCE the overshoot?',
      options: [
        'Increase the damping (raise ζ toward 1) — in PID terms, raise Kd',
        'Decrease the damping to let it move more freely',
        'Increase the stiffness k a lot',
        'Remove all damping so ζ = 0',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: more damping pushes ζ up toward 1, trading the ringing for a clean settle — exactly what raising the derivative gain Kd does in a PID loop.',
        'Less damping lowers ζ further below 1 — MORE overshoot and ringing, the opposite of what you want.',
        'Raising stiffness k raises the natural frequency (faster ringing) but LOWERS ζ = c/(2√(km)) — it can actually make overshoot worse.',
        'ζ = 0 means zero damping — the joint would ring forever, the worst possible case.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why is the underdamped response called "the same shape" as an aggressive PID controller overshooting its target?',
      options: [
        'Both are second-order systems — position/error overshoots, rings, and decays under the same m·x″ + c·x′ + k·x math',
        'They just happen to look similar by coincidence',
        'Because PID controllers contain physical springs',
        'Because both always diverge to infinity',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a PID loop closes into a second-order differential equation in the error, so its step response IS a damped-oscillator curve — the Kd term plays the role of the damping c.',
        'It’s not coincidence — the underlying equation is literally the same second-order form.',
        'PID controllers have no physical springs; the "spring-like" restoring behaviour emerges from the proportional gain in the math.',
        'A well-damped system settles, it doesn’t diverge — divergence is a separate instability case.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The natural frequency ω_n = √(k/m). Stiffening the spring (bigger k) while keeping mass and damping fixed does what?',
      options: [
        'Raises the ringing frequency AND lowers ζ, so it can ring faster and overshoot more',
        'Lowers the ringing frequency',
        'Has no effect on frequency or damping',
        'Guarantees critical damping',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: ω_n = √(k/m) rises with k (faster ringing), and since ζ = c/(2√(km)), a bigger k also shrinks ζ — so a stiffer, same-damped system rings faster and overshoots more.',
        'Stiffer springs oscillate FASTER, not slower — ω_n grows with k.',
        'It affects both: frequency goes up and the damping ratio goes down.',
        'Raising k alone moves you AWAY from critical damping (ζ drops), it doesn’t guarantee it.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A system has ζ = 0.1. How would you describe its response to a sudden disturbance?',
      options: [
        'Heavily underdamped — lots of overshoot and many rings before settling',
        'Critically damped — clean, fast, no overshoot',
        'Overdamped — slow and sluggish, no overshoot',
        'Undamped — oscillates forever',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: ζ = 0.1 is far below 1, so the response overshoots a lot and rings many times, each swing only slightly smaller than the last.',
        'Critical damping is ζ = 1 exactly — ζ = 0.1 is nowhere near it.',
        'Overdamped is ζ > 1 — ζ = 0.1 is the opposite extreme.',
        'Undamped is ζ = 0 exactly; ζ = 0.1 still decays, just very slowly.',
      ],
    },
    {
      question: 'Why do cars use shock absorbers tuned near critical damping rather than very stiff (overdamped) ones?',
      options: [
        'Critical damping absorbs a bump fast without bouncing, while overdamped would recover too slowly for the next bump',
        'Overdamped shocks would make the car bounce more',
        'Stiffer damping always rides better',
        'Cars actually use ζ = 0 for comfort',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: near-critical damping settles a bump quickly with no bounce; an overdamped shock would still be slowly recovering when the next bump arrives, riding harshly.',
        'Overdamped systems don’t bounce — they’re just slow; the reason to avoid them is sluggish recovery, not bouncing.',
        'Too much damping makes the ride harsh and slow to recover — stiffer is not always better.',
        'ζ = 0 (no damping) would let the car bounce endlessly after every bump — dangerous and uncomfortable.',
      ],
    },
    {
      question: 'The characteristic equation of m·x″ + c·x′ + k·x = 0 is m·r² + c·r + k = 0. Complex roots mean…',
      options: [
        'The system oscillates (underdamped) — the imaginary part sets the ringing frequency',
        'The system never moves',
        'The system diverges to infinity',
        'There is no damping at all',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: complex roots appear exactly when damping is light (ζ < 1); the imaginary part becomes the oscillation frequency and the real part the decay rate.',
        'The system definitely moves — complex roots specifically signal oscillatory motion.',
        'For a stable damped system the real part is negative, so it decays, not diverges.',
        'There can still be damping — complex roots occur for any ζ between 0 and 1, i.e. some damping but not enough to stop oscillation.',
      ],
    },
    {
      question: 'An overdamped door closer (ζ = 1.5) is described as "safe but slow." What is the trade-off being made?',
      options: [
        'It guarantees no overshoot/slam, but returns more slowly than critical damping would',
        'It returns faster than critical but sometimes slams',
        'It saves energy at the cost of overshoot',
        'There is no trade-off — overdamped is strictly best',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: ζ > 1 never overshoots (no slam), but pays for that safety with a slower return than the critical ζ = 1 optimum.',
        'Overdamped is slower than critical, not faster, and it never slams.',
        'The trade-off is speed, not energy — and overdamped systems don’t overshoot at all.',
        'There is a real trade-off: overdamped sacrifices settling speed, which is why critical damping is usually preferred when overshoot is merely undesirable rather than dangerous.',
      ],
    },
  ],
}
