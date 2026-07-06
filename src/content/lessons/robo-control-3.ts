import type { Lesson } from '../../types'

export const roboControl3Lesson: Lesson = {
  nodeId: 'robo-control-3',
  screens: [
    {
      kind: 'explain',
      title: 'Feedback’s blind spot',
      body: [
        'PID is purely reactive: it cannot push until an error already exists. Your drone must first SAG below its target before the controller learns that gravity is a thing — every single flight.',
        'But you KNOW gravity is coming. Feedforward means using a model to command what is predictably needed — hover thrust, friction compensation — before any error appears. Feedback then only cleans up the surprises.',
        'The rule of thumb in real robotics: feedforward does the heavy lifting you can predict, feedback handles what you can’t.',
      ],
      deeper: [
        'Feedforward is only as good as your model: overestimate the drone’s weight and your “hover thrust” makes it climb. That’s why the pairing matters — model errors just become small residual errors for the feedback to mop up.',
        'The I term is sometimes called “poor man’s feedforward”: it slowly LEARNS the constant force by accumulating error, while true feedforward knows it from the model on tick one.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A drone with P-only control hovers stubbornly below its target (gravity droop). Instead of adding an I term, you add feedforward: the exact thrust that balances the drone’s known weight. What happens to the droop?',
      options: [
        'It disappears — the P term now only handles gusts and model error, hovering around zero average error',
        'Nothing changes — only an I term can remove an offset',
        'The drone now accelerates upward forever',
        'The drone becomes unstable and oscillates',
      ],
      correctIndex: 0,
      reveal:
        'The droop existed because P needed a standing error to generate the standing thrust. Feedforward supplies that thrust for free, so the equilibrium moves to zero error. Same cure as the I term — but instant, from the model, with no error accumulating first.',
    },
    {
      kind: 'explain',
      title: 'The state: everything the system remembers',
      body: [
        'To predict where a mass goes next, position alone isn’t enough — a ball at 10 m rising and a ball at 10 m falling have very different futures. You need position AND velocity: together they are the STATE.',
        'Write the state as a vector x = [pos, vel]. One tick of physics: new pos = pos + vel·dt, and new vel = vel + (push/mass)·dt. Both lines are linear — the whole update is a matrix multiplying the state vector.',
        'Worked, with dt = 0.1 and no push: x = [2, 1] → new pos = 2 + 1·0.1 = 2.1, new vel stays 1. The state marches forward one matrix-multiply per tick.',
      ],
      deeper: [
        'In matrix form: x′ = A·x + B·u. A encodes the physics — how the state evolves on its own; B encodes how your control input u pushes on it. This is the state-space model, the standard language of modern control.',
        'The payoff is scale: a drone carries position, velocity, orientation and spin — a 12-number state. Same equation, bigger matrix. PID thinks about one error at a time; state space thinks about the whole vector at once.',
      ],
      links: [{ nodeId: 'math-linalg-2', label: 'Refresher: Matrices as Transformations' }],
    },
    {
      kind: 'predict',
      question:
        'Completion step — one more tick. dt = 0.1, state x = [2.1, 1], and now a push gives acceleration 2. New state = [2.1 + ?, 1 + ?]',
      options: [
        '[2.2, 1.2] — pos gains vel·dt = 0.1, vel gains acc·dt = 0.2',
        '[3.1, 3] — add the velocity and acceleration whole',
        '[2.1, 1.2] — position doesn’t change this tick',
        '[2.3, 1.1] — pos gains 0.2, vel gains 0.1',
      ],
      correctIndex: 0,
      reveal:
        'pos += vel·dt = 1·0.1 = 0.1 → 2.2, and vel += acc·dt = 2·0.1 = 0.2 → 1.2. Each part of the state updates from the current state plus the input — exactly the A·x + B·u recipe, one row at a time.',
    },
    {
      kind: 'explain',
      title: 'Control as one matrix: u = −K·x',
      body: [
        'Here’s the twist: PID was state-space control in disguise. Measure the state as [error, error-rate] and compute u = Kp·error + Kd·error-rate — that’s a dot product: u = K·x with K = [Kp, Kd].',
        'Full-state feedback generalizes it: u = −K·x, one gain per state variable, chosen with linear algebra so the WHOLE vector is steered at once — even for machines with many coupled joints, where separate PIDs fight each other.',
        'One problem remains: you can rarely MEASURE the whole state. Encoders give position; velocity must be estimated from noisy readings.',
      ],
      deeper: [
        'The estimator is called an observer; the famous optimal one is the Kalman filter. Every tick it PREDICTS the state with the model (A·x + B·u), then corrects the prediction with the noisy measurement — weighting each by how much it trusts them. That predict-then-update dance is Bayes’ rule, running on vectors.',
        'This stack — state-space model + full-state feedback + Kalman estimation — is what flies rockets and balances Segways. It’s a full university course (often two); this lesson is your map of it.',
      ],
      links: [{ nodeId: 'math-prob-3', label: 'The update step IS Bayes’ Rule' }],
    },
    {
      kind: 'predict',
      question:
        'Independent step. Your controller computes push = 4·error − 2·vel (drive toward the target, brake against speed). Right now error = 0.5 m and the robot approaches at vel = 1 m/s. What push does it command?',
      options: [
        '0 — the approach is already exactly on profile, no correction needed',
        '2 — keep pushing while any error remains',
        '4 — the full proportional push',
        '−2 — slam the brakes immediately',
      ],
      correctIndex: 0,
      reveal:
        '4·0.5 − 2·1 = 2 − 2 = 0. The gains agree that closing at 1 m/s from half a metre is precisely the approach they want — so, no push. That’s the upgrade over “push proportional to error”: the controller reasons about the WHOLE state, gliding into the target instead of reacting to the gap alone.',
    },
    {
      kind: 'code',
      prompt:
        'Run a state-space robot yourself. The state is [pos, vel]; each tick is the matrix update pos += vel·dt, then vel += u·dt (u is the commanded acceleration). The velocity row is missing — fill it in, then run three ticks of constant u = 2 from standstill.',
      starter: `const dt = 0.1
function step(x, u) {
  const pos = x[0] + x[1] * dt
  const vel = 0 // fill in: x[1] plus u times dt
  return [pos, vel]
}
let x = [0, 0]
for (let k = 1; k <= 3; k++) {
  x = step(x, 2)
  print('tick', k, '-> pos', x[0].toFixed(2), 'vel', x[1].toFixed(2))
}`,
      expected: `tick 1 -> pos 0.00 vel 0.20
tick 2 -> pos 0.02 vel 0.40
tick 3 -> pos 0.06 vel 0.60`,
      hint: 'The velocity row is: const vel = x[1] + u * dt',
      success:
        'Notice position lags velocity by one tick — the state carries the memory. What you wrote IS x′ = A·x + B·u with A = [[1, dt], [0, 1]] and B = [0, dt]. A Kalman filter runs this exact line as its “predict” step, hundreds of times a second.',
    },
    {
      kind: 'quiz',
      question: 'What is the key limitation of pure feedback control that feedforward fixes?',
      options: [
        'Feedback can only react AFTER an error exists — predictable forces get corrected late, every time',
        'Feedback needs expensive sensors',
        'Feedback only works on slow systems',
        'Feedback cannot use gains larger than 1',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: with feedback alone, known forces like gravity must first cause an error before being countered. Feedforward commands the predictable part up front, so no error is needed.',
        'Feedback does need a sensor, but cost isn’t the structural issue — reactivity is: no error, no action.',
        'Feedback runs the fastest systems on Earth — the limitation is WHEN it can act, not how fast.',
        'Gains can be as large as stability allows — nothing about feedback caps them at 1.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Why is [position, velocity] a proper state for a moving mass, while [position] alone is not?',
      options: [
        'Two masses at the same position but different velocities have different futures — position alone can’t predict the next instant',
        'Velocity is easier to measure than position',
        'Two numbers are always better than one',
        'Position changes too fast to track on its own',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the state must contain everything needed to predict what happens next. Same position, different velocity → different futures — so velocity belongs in the state.',
        'Usually the OPPOSITE: encoders measure position directly, and velocity has to be estimated. It’s in the state because prediction needs it, not because it’s convenient.',
        'The state is the MINIMAL memory that determines the future — velocity earns its place because prediction fails without it, not to pad the vector.',
        'How fast a variable changes isn’t the problem — incompleteness is. Position updates fine; it just can’t predict alone.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In the state-space model x′ = A·x + B·u, what does the A matrix describe?',
      options: [
        'How the state evolves on its own — the physics with hands off the controls',
        'The strength of the motors',
        'The noise in the sensors',
        'The target trajectory to follow',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: A maps this tick’s state to the next with zero input — drift, momentum, velocity coupling into position. It is the un-actuated physics.',
        'Motor authority lives in B — it scales how the input u pushes the state. A acts even with the motors off.',
        'Sensor noise belongs to the measurement side (what a Kalman filter models separately) — A is the true dynamics.',
        'Targets come from the planner. A doesn’t know where you WANT to go — only how the system moves.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A robot has only a position encoder, but full-state feedback needs velocity too. What is the standard solution?',
      options: [
        'An observer (e.g. a Kalman filter): predict the state from the model, then correct with each noisy measurement',
        'Differentiate the raw encoder signal and use that directly',
        'Install a second position encoder',
        'Skip velocity — position is close enough',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the observer runs the model as a prediction and blends in measurements weighted by trust — producing a clean estimate of the full state, velocity included.',
        'Raw differentiation amplifies every count of encoder jitter into velocity spikes — usable only after careful filtering, which is exactly what the observer does properly.',
        'A second encoder still measures position — duplicating a sensor doesn’t create the missing state variable.',
        'Dropping velocity turns the controller back into P-only — the damping information is precisely what you’d lose.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why do multi-joint robot arms outgrow one-independent-PID-per-joint?',
      options: [
        'Moving one joint disturbs the others — state-space control steers the whole coupled vector with one gain matrix, while separate PIDs fight each other',
        'PID arithmetic is too slow for several joints',
        'Multiple PID loops need multiple CPUs',
        'They don’t — independent PIDs are always optimal',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: swinging the shoulder throws torque into the elbow. Independent loops each see the other’s motion as a mystery disturbance; a state-space controller models the coupling and commands all joints as one system.',
        'The arithmetic is trivial either way — a few multiplies per joint. The problem is each loop being blind to the coupling, not compute.',
        'One microcontroller happily runs dozens of PID loops — the limitation is informational, not computational.',
        'They’re fine when coupling is weak, but far from optimal in general — fast multi-joint motion is exactly where the one-loop-per-joint illusion breaks.',
      ],
    },
  ],
  extraPractice: [
    {
      question:
        'A robot arm holds a 2 kg payload steady. Which part of its command is best supplied by feedforward?',
      options: [
        'The constant torque that balances the payload’s known weight',
        'The response to an unexpected bump',
        'The correction for sensor noise',
        'The reaction to a human pushing the arm',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a known mass on a known arm is fully predictable — compute the gravity torque from the model and command it directly; feedback never needs to discover it.',
        'A bump is by definition unpredicted — that’s the feedback term’s job.',
        'Noise isn’t in the model — it’s handled by filtering and estimation, not by feedforward commands.',
        'A human push is an external surprise — exactly the residual disturbance feedback exists for.',
      ],
    },
    {
      question: 'Which is a sensible state vector for a swinging pendulum?',
      options: [
        '[angle, angular velocity]',
        '[angle] alone',
        '[the current motor command]',
        '[time since the swing started]',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: angle plus angular velocity pins down the pendulum’s future — the same two-number pattern as position and velocity for a mass.',
        'Angle alone is ambiguous: at the same angle it might be swinging left or right — two different futures.',
        'The command is an INPUT (u), not a description of where the system currently is.',
        'Time tells you nothing about the pendulum’s condition — two swings can be at totally different poses at the same elapsed time.',
      ],
    },
    {
      question:
        'In x′ = A·x + B·u, your input u is motor thrust. Where does “how strongly thrust changes the state” live?',
      options: ['In B', 'In A', 'In x', 'In u itself'],
      correctIndex: 0,
      explanations: [
        'Correct: B is the input matrix — it translates your command u into its effect on each state variable.',
        'A is the hands-off physics: how the state drifts with zero input.',
        'x is the state being pushed — it doesn’t encode the pushing.',
        'u is just the command’s value; how much a unit of it matters is B’s job.',
      ],
    },
    {
      question:
        'A Kalman filter’s velocity estimate disagrees with one wildly-off encoder reading. What does it do?',
      options: [
        'Nudges the estimate slightly toward the measurement, weighted by how much it trusts the sensor',
        'Replaces its estimate with the measurement immediately',
        'Ignores all measurements from then on',
        'Stops the robot until the sensor agrees',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the filter blends prediction and measurement by their uncertainties — a noisy sensor gets a small weight, so one wild reading barely moves the estimate.',
        'Fully trusting each raw reading is what NOT having a filter looks like — the estimate would inherit every noise spike.',
        'Ignoring measurements forever means pure dead-reckoning, which drifts without bound — the filter always keeps listening, just skeptically.',
        'Estimation and safety logic are separate — the filter’s job is to keep producing the best estimate, not to halt the machine.',
      ],
    },
  ],
}
