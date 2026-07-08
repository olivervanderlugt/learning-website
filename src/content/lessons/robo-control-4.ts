import type { Lesson } from '../../types'

export const roboControl4Lesson: Lesson = {
  nodeId: 'robo-control-4',
  screens: [
    {
      kind: 'explain',
      title: 'The pole is the personality',
      body: [
        'State space describes a system with matrices; the classical view describes the SAME system with a single fraction. Take the Laplace transform of the dynamics and the input-to-output relationship becomes a transfer function G(s) = output(s) / input(s) — a ratio of polynomials in the complex variable s.',
        'The roots of the DENOMINATOR are the POLES, and they alone decide the character of the response. A pole is a complex number: its real part sets how fast a mode decays or grows, its imaginary part sets how fast it oscillates.',
        'The one rule that matters: every pole in the LEFT half-plane (negative real part) decays → stable. A single pole in the RIGHT half-plane (positive real part) grows without bound → unstable.',
      ],
      deeper: [
        'A pole at s = −a produces a mode e^(−a·t): larger a means faster decay, so poles far to the left settle quickly. A complex pair s = −σ ± jω gives e^(−σt)·cos(ωt) — a decaying oscillation, exactly the underdamped ringing you met as PID overshoot and as the mass-spring-damper. The damping ratio ζ is just the angle of the pole from the negative-real axis: on the axis (ζ = 1) is critically damped, near the imaginary axis is barely-damped ringing. Poles are the same eigenvalues you saw decide stability in x′ = A·x — two languages, one truth.',
      ],
      links: [
        { nodeId: 'math-ode-2', label: 'Same ringing: damped oscillators & ζ' },
        { nodeId: 'math-ode-3', label: 'Poles are eigenvalues: phase portraits & stability' },
      ],
    },
    {
      kind: 'predict',
      question:
        'A controller gives your system closed-loop poles at s = −2 ± 3j. How does it behave?',
      options: [
        'It oscillates at frequency 3 but the oscillation DECAYS (rate 2) — stable, with some ringing',
        'It is unstable — any imaginary part means it blows up',
        'It decays smoothly with no oscillation at all',
        'It oscillates forever at constant amplitude',
      ],
      correctIndex: 0,
      reveal:
        'The real part is −2 (negative) → the response decays, so the system is STABLE. The imaginary part ±3 → it oscillates at ω = 3 rad/s on the way in. Together: a decaying oscillation e^(−2t)·cos(3t) — underdamped but settling. Only a positive real part would blow up; a purely imaginary pair (real part 0) would ring forever.',
    },
    {
      kind: 'explain',
      title: 'Shake it and watch: the Bode plot',
      body: [
        'How do you probe a system without knowing its equations? Drive it with a sine wave and sweep the frequency. At each frequency the output is a sine of the same frequency, scaled in amplitude (GAIN) and shifted in time (PHASE). Plot gain and phase versus frequency and you have a BODE plot.',
        'Low frequencies usually pass through (the system keeps up); past its BANDWIDTH the gain rolls off (the system is too sluggish to follow fast wiggles). Bandwidth is a direct readout of how fast your controller can actually respond.',
        'Feedback stability lives here too: the GAIN MARGIN and PHASE MARGIN measure how much extra gain or lag you could add before the loop starts to oscillate. Small margins = a twitchy controller one disturbance away from ringing.',
      ],
      deeper: [
        'Instability in a feedback loop is when a signal comes back around exactly in phase and at least as strong as it left — it reinforces itself. The danger point is 180° of phase lag with gain ≥ 1. Phase margin is how many degrees of extra lag you have before hitting −180° at the frequency where gain = 1; gain margin is how much extra gain you have before gain = 1 at the frequency where phase hits −180°. Rules of thumb: aim for ~45° phase margin and ~6 dB gain margin. Adding delay (a slow sensor, a laggy loop) eats phase margin — which is why loop rate mattered back in tuning.',
      ],
    },
    {
      kind: 'predict',
      question:
        'You add a slow, laggy sensor to a working feedback loop — extra phase lag at every frequency. Its phase margin was a healthy 45°. What is the risk?',
      options: [
        'The added lag eats into the phase margin; enough of it drives the margin toward 0 and the loop starts to oscillate',
        'Nothing — extra lag always makes a loop more stable',
        'The bandwidth increases, making the system faster',
        'The gain margin grows, so it becomes safer',
      ],
      correctIndex: 0,
      reveal:
        'Phase lag from the sensor adds to the loop’s existing lag, pushing it closer to the −180° danger point at the crossover frequency — i.e. it SPENDS your phase margin. Drive the margin to zero and the loop sustains oscillation; go negative and it grows. This is exactly why a sluggish sensor or a slow control loop destabilizes an otherwise-fine controller — lag is the enemy of margin.',
    },
    {
      kind: 'explain',
      title: 'Letting the math pick the gains: LQR',
      body: [
        'Full-state feedback is u = −K·x, but which K? Hand-tuning one gain per state variable is hopeless for a big coupled system. The Linear-Quadratic Regulator (LQR) CHOOSES K to minimize a cost you write down: J = ∫ (xᵀQx + uᵀRu) dt.',
        'Q penalizes state error (how much you hate being off-target); R penalizes control effort (how much you hate spending actuator energy). Big R → gentle, energy-saving gains; small R → aggressive gains that snap to target but work the motors hard.',
        'Given A, B, Q, R the optimal K falls out of a matrix equation (the Riccati equation) — no manual tuning. It is the workhorse behind balancing rockets, drones and legged robots.',
      ],
      deeper: [
        'LQR is guaranteed to stabilize any controllable system and comes with famous robustness (at least 60° phase margin, infinite gain margin in the classic case). It is optimal only for the cost you chose, though — Q and R ARE the design knobs; picking them well is the real engineering. Pair LQR (optimal control) with a Kalman filter (optimal estimation) and you get the LQG controller, the backbone of modern aerospace control.',
      ],
      links: [
        { nodeId: 'robo-control-3', label: 'Where u = −K·x came from: state space' },
        { nodeId: 'robo-estimation', label: 'Its estimation partner: the Kalman filter' },
      ],
    },
    {
      kind: 'code',
      prompt:
        'Compute an LQR gain yourself for a scalar unstable plant ẋ = a·x + b·u (a = +1, so it runs away on its own). The Riccati solution for P is done; fill in the optimal gain K = (b/R)·P, then watch the closed-loop pole a − b·K land in the stable (negative) region — and see how R trades effort for speed.',
      starter: `function lqrScalar(a, b, Q, R) {
  // positive solution of the scalar Riccati  2aP - (b^2/R)P^2 + Q = 0:
  const P = (a + Math.sqrt(a * a + b * b * Q / R)) * R / (b * b)
  const K = 0 // fill in: b * P / R   (the optimal feedback gain)
  const pole = a - b * K // closed-loop pole with u = -Kx
  return 'K=' + K.toFixed(2) + '  pole=' + pole.toFixed(2)
}
print('cheap control  (R=0.01): ' + lqrScalar(1, 1, 1, 0.01))
print('balanced       (R=1):    ' + lqrScalar(1, 1, 1, 1))
print('expensive      (R=100):  ' + lqrScalar(1, 1, 1, 100))`,
      expected: `cheap control  (R=0.01): K=11.05  pole=-10.05
balanced       (R=1):    K=2.41  pole=-1.41
expensive      (R=100):  K=2.00  pole=-1.00`,
      hint: 'The optimal gain is K = b * P / R — bigger P or smaller R means a bigger gain.',
      success:
        'Every closed-loop pole is negative, so LQR stabilized a plant that was running away (a = +1) — and R is the throttle: cheap control (R = 0.01) buys an aggressive gain 11 and a fast pole at −10, while expensive control (R = 100) settles for a gentle gain 2 and a slow pole at −1. You didn’t tune anything; the cost function chose the gain for you.',
    },
    {
      kind: 'quiz',
      question: 'What does the location of a system’s poles tell you?',
      options: [
        'Poles in the left half-plane (negative real part) mean stability; any pole in the right half-plane means it blows up',
        'Poles set only the steady-state value, not stability',
        'The more poles a system has, the more stable it is',
        'Poles matter only for the input, not the response',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: each pole’s real part sets decay (left, stable) or growth (right, unstable); the imaginary part adds oscillation. One right-half-plane pole is enough to make the whole system diverge.',
        'Poles govern the dynamic modes — decay, growth, oscillation — not merely the final value; stability is exactly a pole-location question.',
        'Stability is about WHERE the poles sit, not how many there are — one badly-placed pole ruins it.',
        'Poles are roots of the transfer function’s denominator — they shape the system’s own response, independent of the particular input.',
      ],
    },
    {
      kind: 'quiz',
      question: 'On a Bode plot, what does the system’s BANDWIDTH indicate?',
      options: [
        'The frequency band it can follow before its gain rolls off — a direct measure of how fast it can respond',
        'The total number of poles',
        'The steady-state error to a step input',
        'The amount of sensor noise',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: below bandwidth the output tracks the input; above it the gain drops and the system can’t keep up, so bandwidth is the practical speed limit of the loop.',
        'The number of poles shows up as the slope of the roll-off, but bandwidth itself is the frequency where tracking gives out.',
        'Steady-state error is a low-frequency / DC property; bandwidth is about the high-frequency limit of response.',
        'Noise is separate; bandwidth is a property of the system’s frequency response, not of the sensor.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A feedback loop has a small phase margin. What does that mean in practice?',
      options: [
        'Only a little extra lag (or gain) would push it to −180° with gain ≥ 1 and make it oscillate — it is close to instability',
        'It is very robust and hard to destabilize',
        'It has zero steady-state error',
        'Its bandwidth is unusually large',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: phase margin is the cushion of extra lag before the loop hits the self-reinforcing −180°/gain-1 condition — small margin means a twitchy, nearly-oscillating controller.',
        'Small margin is the opposite of robust; a healthy design keeps ~45° of phase margin in reserve.',
        'Steady-state error is unrelated to phase margin — you can have zero error and terrible margins.',
        'Margin measures stability robustness, not bandwidth; a wide-bandwidth loop can have tiny margins.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In LQR, what do the weighting matrices Q and R let you trade off?',
      options: [
        'Q penalizes state error and R penalizes control effort — raising R gives gentler, energy-saving gains',
        'Q and R set the sensor and process noise, like a Kalman filter',
        'Q is the target trajectory and R is the disturbance',
        'They have no effect on the resulting gain K',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: LQR minimizes ∫(xᵀQx + uᵀRu)dt, so Q says how much you hate error and R how much you hate effort — the ratio picks aggressive vs. gentle gains.',
        'Noise covariances belong to the Kalman filter (its Q and R are a different pair); LQR’s Q and R are cost weights on state and control.',
        'Neither is a trajectory or disturbance — they are penalty weights in the cost function.',
        'Q and R ARE the design knobs — changing them directly changes the optimal K the Riccati equation returns.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Which set of poles describes a stable system that settles WITHOUT any oscillation?',
      options: [
        's = −3 and s = −5 (both real, negative)',
        's = −1 ± 4j (complex pair)',
        's = +2 (real, positive)',
        's = ±2j (purely imaginary)',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: two real negative poles give pure decaying exponentials — stable and non-oscillatory (overdamped-style).',
        'A complex pair has an imaginary part, so it oscillates on the way in — stable but ringing.',
        'A positive real pole grows without bound — unstable.',
        'Purely imaginary poles oscillate forever at constant amplitude — marginally stable, not settling.',
      ],
    },
    {
      question: 'Increasing loop delay (a laggy sensor or slow control loop) does what to phase margin?',
      options: [
        'Reduces it — added lag pushes the loop closer to the −180° instability point',
        'Increases it, making the loop more stable',
        'Leaves it unchanged',
        'Converts it into gain margin',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: delay adds phase lag at every frequency, spending your phase-margin cushion — the core reason loop rate and sensor speed matter for stability.',
        'Delay never helps stability; it only erodes margin.',
        'Delay directly adds phase lag, so the margin must change (shrink).',
        'Phase margin and gain margin are distinct cushions; lag doesn’t transmute one into the other.',
      ],
    },
    {
      question:
        'You run LQR with a very large R (control effort heavily penalized). Compared to a small R, the resulting gain K is…',
      options: [
        'Smaller — the controller acts gently to save actuator effort, giving a slower closed-loop response',
        'Larger — big R always means big gains',
        'Unchanged — R does not affect K',
        'Negative — large R flips the sign of the gain',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a large R makes control expensive, so the optimizer uses a smaller K and accepts a slower, gentler response — exactly what the code screen showed (R = 100 → gain 2, pole −1).',
        'It is the reverse: large R (expensive control) yields SMALLER gains, small R yields aggressive ones.',
        'R is a primary knob for K — the Riccati solution depends directly on it.',
        'The sign of full-state feedback (u = −Kx) is fixed; R changes the magnitude, not the sign.',
      ],
    },
    {
      question: 'Why is the transfer-function pole picture and the state-space eigenvalue picture “two languages, one truth”?',
      options: [
        'A system’s transfer-function poles are exactly the eigenvalues of its A matrix — both are the roots that set the natural modes',
        'They describe different systems that happen to look similar',
        'Poles decide stability but eigenvalues do not',
        'Only the state-space view can represent oscillation',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the poles (denominator roots of G(s)) coincide with the eigenvalues of A, so the negative-real-part stability test is identical in both frameworks.',
        'They are two representations of the SAME system, not lookalikes — that is why the stability tests agree.',
        'Both decide stability by the same rule — negative real parts — because poles and eigenvalues are the same numbers.',
        'Both views capture oscillation: a complex pole and a complex eigenvalue are the same thing.',
      ],
    },
  ],
}
