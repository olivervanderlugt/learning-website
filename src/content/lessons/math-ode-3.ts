import type { Lesson } from '../../types'

export const mathOde3Lesson: Lesson = {
  nodeId: 'math-ode-3',
  screens: [
    {
      kind: 'explain',
      title: 'One equation becomes a vector',
      body: [
        'Any second-order ODE can be rewritten as a SYSTEM of two first-order ones by naming velocity as its own variable. Let the state be the vector [x, v]: then x′ = v, and v′ = −(k/m)x − (c/m)v.',
        'Stack those and you get x′ = A·x — where x is now the state vector and A is a matrix. The whole system’s future is packed into one matrix.',
        'This is exactly the state-space form your control lessons used: x′ = A·x + B·u.',
      ],
      deeper: [
        'Writing it as x′ = A·x isn’t just tidier notation — it scales. A drone has a state vector of a dozen numbers (positions, velocities, angles, rates); a single matrix A captures how all of them influence each other’s rates of change at once. Everything you learn about the 2-D case generalizes directly to that.',
      ],
      links: [{ nodeId: 'robo-control-3', label: 'Refresher: State-space & the state vector' }],
    },
    {
      kind: 'predict',
      question:
        'You plot the state [position, velocity] of a lightly-damped oscillator as a single point moving on a 2-D graph over time. What path does that point trace?',
      options: [
        'An inward spiral toward the origin',
        'A straight line to the origin',
        'A perfect circle it never leaves',
        'A path that spirals outward to infinity',
      ],
      correctIndex: 0,
      reveal:
        'This graph is the PHASE PORTRAIT, and a damped oscillator spirals INWARD: each loop is the ring-back-and-forth, and the shrinking radius is the energy bleeding away. A perfect circle would be zero damping (energy conserved); an outward spiral would be an unstable system gaining energy. The shape of the spiral tells you the stability at a glance.',
    },
    {
      kind: 'explain',
      title: 'Eigenvalues decide the fate',
      body: [
        'The solution of x′ = A·x is x(t) = e^(At)·x(0) — the "matrix exponential." You don’t need to compute it by hand; what matters is that its behaviour is decided by the EIGENVALUES of A.',
        'If every eigenvalue has a negative real part, all directions decay and the system is STABLE. If any eigenvalue has a positive real part, that direction grows and the system is UNSTABLE — it blows up.',
        'The imaginary parts, if any, set the oscillation frequency. Real part = grow/decay, imaginary part = spin.',
      ],
      deeper: [
        'This is why eigenvalues were worth learning: they are the natural "axes" of the matrix, the directions along which A simply stretches. Along an eigenvector, the vector equation collapses to the scalar y′ = λy from the first ODE lesson — solution e^(λt). The full system is just a blend of those simple exponential modes, one per eigenvalue. Control design (choosing K in u = −K·x) is literally MOVING the eigenvalues into the stable left half-plane.',
      ],
      links: [{ nodeId: 'math-linalg-3', label: 'Refresher: Determinants & Eigenvectors' }],
    },
    {
      kind: 'predict',
      question:
        'Completion step — a linearized robot balancing controller has a matrix A whose eigenvalues are −2 and −5 (both real, both negative). What does the robot do after a small nudge?',
      options: [
        'Returns smoothly to balance — both modes decay, no oscillation',
        'Oscillates forever around balance',
        'Tips over — the nudge grows',
        'Spirals slowly inward with visible ringing',
      ],
      correctIndex: 0,
      reveal:
        'Both eigenvalues are real and negative, so both modes decay with NO imaginary part to cause oscillation — the robot eases back to balance smoothly (this is the overdamped/critically-damped style return). Negative real parts = stable; no imaginary parts = no ringing. A positive eigenvalue anywhere would mean "tips over."',
    },
    {
      kind: 'predict',
      question:
        'Independent step — you compute A’s eigenvalues and one of them is +0.5 (positive real part). What can you conclude, no simulation needed?',
      options: [
        'The system is unstable — that mode grows exponentially and the state blows up',
        'The system is stable — one positive eigenvalue is fine',
        'The system oscillates at 0.5 Hz forever',
        'Nothing can be concluded without running it',
      ],
      correctIndex: 0,
      reveal:
        'A single eigenvalue with a positive real part is enough to doom the whole system: along that eigenvector, the state grows like e^(0.5t) and eventually dominates everything. Stability requires EVERY eigenvalue to have a negative real part — one bad apple spoils it. This is the entire reason control design obsesses over eigenvalue placement.',
    },
    {
      kind: 'code',
      prompt:
        'Prove stability from the sign of the damping. This evolves the state [x, v] of x′ = A·x for 40 ticks. A positive damping c pulls eigenvalues into the stable region; a NEGATIVE c (anti-damping, like a controller with the wrong sign) pushes one out. Fill in the velocity update and watch the two outcomes.',
      starter: `function evolve(c) {
  let x = 1, v = 0
  const k = 4, m = 1, dt = 0.1
  for (let i = 0; i < 40; i++) {
    const ax = v
    const av = 0 // fill in: -(k/m)*x - (c/m)*v
    x += ax * dt
    v += av * dt
  }
  return x.toFixed(2)
}
print('stable   (c=+4):', evolve(4))
print('unstable (c=-2):', evolve(-2))`,
      expected: `stable   (c=+4): 0.00
unstable (c=-2): 75.36`,
      hint: 'The velocity’s rate of change is the acceleration: av = -(k/m)*x - (c/m)*v',
      success:
        'With c = +4 the state decays to 0.00 — stable, eigenvalues in the left half-plane. Flip the damping to c = −2 (an anti-damper injecting energy) and the same system blows up to 75.36 in the same 40 ticks — one eigenvalue crossed into the right half-plane. The SIGN of a single number decided "settles" versus "explodes." That is the knife-edge every controller lives on.',
    },
    {
      kind: 'quiz',
      question: 'Rewriting a second-order ODE m·x″ + c·x′ + k·x = 0 as a first-order system requires…',
      options: [
        'Introducing velocity v = x′ as a second state variable, giving x′ = v and v′ = −(k/m)x − (c/m)v',
        'Differentiating the equation one more time',
        'Ignoring the damping term',
        'Assuming the mass is zero',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: naming v = x′ turns one 2nd-order equation into two coupled 1st-order ones, which stack into the vector form x′ = A·x.',
        'You reduce the order by adding a variable, not by differentiating again (which would raise it).',
        'The damping term stays — it becomes part of the matrix A.',
        'Mass appears in A (as k/m and c/m); it isn’t assumed zero.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A phase portrait shows the state spiralling OUTWARD. What does this indicate?',
      options: [
        'An unstable system gaining energy — at least one eigenvalue has a positive real part',
        'A stable, well-damped system',
        'A perfectly energy-conserving oscillator',
        'A system already at rest',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: outward spiral = growing amplitude = instability, which corresponds to an eigenvalue with a positive real part (and imaginary part for the spinning).',
        'Stable systems spiral INWARD (or decay straight in), toward the origin, not away from it.',
        'A perfect circle (constant radius) is the energy-conserving case; an outward spiral is gaining energy.',
        'A system at rest sits at the origin as a single point — an outward spiral is actively diverging.',
      ],
    },
    {
      kind: 'quiz',
      question: 'For x′ = A·x, the system is STABLE (returns to equilibrium) exactly when…',
      options: [
        'Every eigenvalue of A has a negative real part',
        'At least one eigenvalue is negative',
        'All eigenvalues are positive',
        'The eigenvalues are all imaginary',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: stability requires ALL eigenvalues to have negative real parts — every mode must decay. A single positive real part causes divergence.',
        '"At least one" isn’t enough — one remaining positive eigenvalue still blows the system up.',
        'Positive real parts mean GROWTH — that’s instability, the opposite of stable.',
        'Purely imaginary eigenvalues sit on the boundary (undamped oscillation, marginally stable) — not asymptotically stable.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In the solution x(t) = e^(At)·x(0), what role do the IMAGINARY parts of A’s eigenvalues play?',
      options: [
        'They set the oscillation frequency — how fast the state spins/rings',
        'They set whether the system grows or decays',
        'They have no effect on the solution',
        'They determine the initial condition',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: imaginary part = frequency (spin/ring rate), real part = grow/decay rate. Together they make the spiral in the phase portrait.',
        'Grow-vs-decay is the REAL part’s job; the imaginary part handles oscillation.',
        'They very much matter — without them the system can’t oscillate at all.',
        'The initial condition x(0) is separate input data, not something the eigenvalues determine.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Full-state feedback control chooses a gain K in u = −K·x. In eigenvalue terms, what is it actually doing?',
      options: [
        'Reshaping the effective matrix (A − BK) so its eigenvalues move into the stable left half-plane',
        'Deleting the matrix A entirely',
        'Forcing all eigenvalues to be exactly zero',
        'Making the system second-order again',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: feedback changes the closed-loop matrix to (A − BK), and K is chosen to place its eigenvalues where you want — stable, and as fast or damped as desired.',
        'A is a fixed property of the plant; feedback augments it via BK, it can’t delete it.',
        'Eigenvalues at exactly zero would be marginally stable, not the goal — you place them with negative real parts.',
        'Feedback keeps the state-space (first-order vector) form; it relocates eigenvalues rather than changing the order.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A matrix A has eigenvalues −1 ± 3i (complex, negative real part). How does the system behave?',
      options: [
        'It spirals inward — oscillates at frequency 3 while decaying at rate 1 (stable ringing)',
        'It decays smoothly with no oscillation',
        'It grows without bound',
        'It oscillates forever at constant amplitude',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: negative real part (−1) → decay; nonzero imaginary part (±3) → oscillation. Together: a stable inward spiral, i.e. underdamped ringing that dies out.',
        'The nonzero imaginary part (±3) guarantees oscillation — it won’t be smooth/non-oscillatory.',
        'Negative real part means it decays, not grows — it’s stable.',
        'Constant amplitude needs a ZERO real part; here the −1 makes the amplitude shrink over time.',
      ],
    },
    {
      question: 'Why is the vector form x′ = A·x preferred over a single high-order ODE for a real robot?',
      options: [
        'It scales cleanly to many coupled state variables and connects directly to eigenvalue-based control design',
        'It avoids using any calculus',
        'It only works for systems with no damping',
        'It eliminates the need for a computer',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: real systems have many interacting states; the matrix form captures all their couplings at once and exposes eigenvalues, which is exactly what controllers manipulate.',
        'It’s still calculus (x′ is a derivative) — the vector form organizes it, it doesn’t remove it.',
        'It handles damping fine — damping just appears as entries in A.',
        'You typically simulate or compute eigenvalues with a computer; the form doesn’t remove that need.',
      ],
    },
    {
      question: 'Along an eigenvector of A, the vector system x′ = A·x reduces to what simpler equation?',
      options: [
        'The scalar y′ = λy — plain exponential growth or decay with rate λ',
        'A second-order oscillator equation',
        'A constant (no change at all)',
        'A random-walk equation',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: an eigenvector is a direction where A just scales by λ, so the coupled system collapses to the scalar y′ = λy — the very first ODE you solved, with solution e^(λt).',
        'Along an eigenvector it becomes FIRST-order scalar, not a second-order oscillator — that structure is what eigen-decomposition removes.',
        'It changes at rate λ per unit of y — only λ = 0 would make it constant.',
        'It’s fully deterministic exponential behaviour, nothing random about it.',
      ],
    },
    {
      question: 'A controller redesign moves a troublesome eigenvalue from +0.3 to −2. What have you achieved?',
      options: [
        'Turned an unstable, diverging mode into a stable, fast-decaying one',
        'Made the system oscillate faster',
        'Made a stable system unstable',
        'Nothing — only imaginary parts matter',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: crossing from a positive real part (+0.3, growing) to a negative one (−2, decaying) converts divergence into a quick stable return — the core goal of pole placement.',
        'That change is about the REAL part (grow→decay); oscillation speed is set by imaginary parts, unchanged here.',
        'It’s the reverse — you moved from unstable (+0.3) to stable (−2).',
        'Real parts are exactly what decide stability, so this change matters enormously.',
      ],
    },
  ],
}
