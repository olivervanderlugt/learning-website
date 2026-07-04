import type { Lesson } from '../../types'

export const roboControlLesson: Lesson = {
  nodeId: 'robo-control',
  screens: [
    {
      kind: 'explain',
      title: 'Closing the loop',
      body: [
        'You can sense and you can act. Feedback control is the art of using what you sense to decide how to act — over and over, correcting as you go.',
        'The idea is simple: measure the error (how far you are from your goal), then push in proportion to it. Measure again. Repeat forever.',
        'This one loop makes drones hover, arms hold position, and cars keep their lane.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A drone is 2 m below its target height. A simple controller pushes up with force proportional to the error. As it rises and the error shrinks, the upward push…',
      options: [
        'Shrinks too — gentler as it approaches the target',
        'Stays at full power until it arrives',
        'Grows stronger',
        'Turns off immediately',
      ],
      correctIndex: 0,
      reveal:
        'Proportional control eases off as the error shrinks — big error, big push; small error, small push. That’s the P in PID. But P alone has two classic problems: it can overshoot and bounce, and it can settle just short of the goal. The fixes are calculus.',
    },
    {
      kind: 'explain',
      title: 'P, I, D — and why you already know them',
      body: [
        'PID adds two more terms to the proportional push. The D term looks at how fast the error is changing — its derivative — and damps overshoot before it happens.',
        'The I term adds up accumulated error over time — its integral — and erases any stubborn steady gap, like the constant pull of gravity.',
        'Derivative and integral: exactly the two moves from Calculus & Change. Now go tune a real one.',
      ],
    },
    { kind: 'game', gameId: 'pid-sim' },
    {
      kind: 'explain',
      title: 'The most important loop in robotics',
      body: [
        'What you just tuned runs, in some form, inside nearly every robot, drone, 3D printer, thermostat and cruise control on Earth.',
        'The gains you slid (P, I, D) are what engineers spend real time tuning — too much and it shakes itself apart, too little and it’s sluggish or sloppy.',
        'You’ve now closed the sense→decide→act loop with math. Quiz to seal it.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In a PID controller, what does the P (proportional) term do?',
      options: [
        'Pushes in proportion to the current error — bigger error, bigger correction',
        'Adds up past errors',
        'Predicts future error',
        'Turns the motor fully on or off',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the correction is proportional to how far off you are right now — the basic restoring push.',
        'That’s the I (integral) term, which accumulates past error. P responds only to the present error.',
        'The D term reacts to the error’s rate of change (a hint about where it’s heading); P just scales the present error.',
        'That’s bang-bang (on/off) control — cruder than proportional, which gives a graded push.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Which PID term is the derivative of the error, used to damp overshoot?',
      options: ['The D term', 'The P term', 'The I term', 'None of them'],
      correctIndex: 0,
      explanations: [
        'Correct: D uses the rate of change (derivative) of the error to anticipate and brake overshoot — the calm-down term.',
        'P uses the raw error size, not its rate of change.',
        'I uses the accumulated (integral of) error, the opposite calculus operation from the derivative.',
        'It’s a real term — D, the derivative of error, and it’s what stops the endless bouncing.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A proportional-only controller keeps settling slightly below its target against constant gravity. Which term fixes this?',
      options: [
        'The I (integral) term — it accumulates the small leftover error until it’s corrected',
        'The D term',
        'A bigger sensor',
        'Nothing can fix it',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the integral sums the persistent small error over time, growing its contribution until the gap is driven to zero — exactly the steady-state offset fix.',
        'D reacts to change; against a CONSTANT offset the error isn’t changing, so D does nothing here. The integral is the cure.',
        'The sensor isn’t the problem — the control law is. Adding integral action removes the steady offset.',
        'It’s a solved problem: adding an integral term eliminates steady-state error. That’s precisely why PID includes it.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The feedback control loop can be summarized as…',
      options: [
        'Measure error, apply correction proportional to it (plus I and D), repeat',
        'Guess a command once and hope',
        'Run the motor at a fixed speed always',
        'Wait for the robot to stabilize on its own',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: continuously measure the error and correct based on it (P), its history (I) and its trend (D) — the closed loop.',
        'Open-loop “guess and hope” has no feedback — the whole point of control is to measure and correct.',
        'Fixed speed ignores the error entirely; feedback adjusts the command based on the measured gap.',
        'Most systems don’t self-stabilize against disturbances — the controller is what actively holds them steady.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why are the D and I terms proof that calculus is essential for robotics?',
      options: [
        'They ARE a derivative and an integral of the error signal',
        'They use random numbers',
        'They are just bigger P terms',
        'They have nothing to do with calculus',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: D is literally the derivative of the error and I is its integral — the controller runs calculus in real time, every loop.',
        'No randomness involved — PID is fully deterministic calculus on the error signal.',
        'They’re fundamentally different operations from P: rate-of-change (D) and accumulation (I), not a scaled present error.',
        'They’re calculus by definition — that’s exactly why Calculus & Change is a prerequisite for controlling robots.',
      ],
    },
  ],
}
