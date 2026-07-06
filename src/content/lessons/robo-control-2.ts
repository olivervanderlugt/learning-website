import type { Lesson } from '../../types'

export const roboControl2Lesson: Lesson = {
  nodeId: 'robo-control-2',
  screens: [
    {
      kind: 'explain',
      title: 'The step response — a controller’s fingerprint',
      body: [
        'You tuned a PID by feel. Engineers tune by READING a curve: command a sudden jump in the target (a “step”) and record how the system chases it.',
        'That recording — the step response — is judged by four numbers: rise time (how fast it first approaches), overshoot (how far past it swings), settling time (when the wiggling stops), and steady-state error (any gap that never closes).',
        'Every tuning decision is one of these four numbers talking to you.',
      ],
      deeper: [
        'The standard definitions: rise time = time from 10% to 90% of the way to the target; overshoot = the peak beyond the target as a % of the step size; settling time = when the response stays inside a ±5% band around the target; steady-state error = the gap remaining once everything stops moving.',
        'They fight each other: pushing rise time down (more Kp) usually buys you more overshoot and a longer settling time. Tuning is choosing which number your robot cares about most — a surgical robot wants zero overshoot; a delivery drone wants a fast rise.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A robot arm is commanded to a new angle. It glides up smoothly with no overshoot, but takes a leisurely 6 seconds to get there and finally stops 2° short — forever. Which two step-response numbers are bad?',
      options: [
        'Rise time and steady-state error — slow to approach, and a permanent gap',
        'Overshoot and settling time — it swings past and wiggles',
        'Only overshoot — it ends 2° away from the target',
        'None — smooth motion means a well-tuned controller',
      ],
      correctIndex: 0,
      reveal:
        'The lazy 6-second glide is a poor rise time; the 2° gap that never closes is steady-state error. Overshoot and ringing are absent — this response is SAFE but sluggish and inaccurate. Diagnosis before medicine: next, which knob fixes which number.',
    },
    {
      kind: 'explain',
      title: 'Symptom → knob: the tuning table',
      body: [
        'Each symptom points at a gain. Too slow to rise → raise Kp. Overshoots and rings → lower Kp or raise Kd (damping). A constant gap that never closes → raise Ki. Twitchy, amplifying every sensor jitter → lower Kd.',
        'Worked example — the sluggish arm from the last screen: slow rise, so raise Kp. Now it overshoots slightly, so add some Kd to damp it. The 2° gap remains, so add Ki until it grinds to zero.',
        'That three-move sequence — P for speed, D for calm, I for accuracy — is how most real controllers get tuned.',
      ],
      deeper: [
        'The classic recipe (Ziegler–Nichols, 1942): set Ki = Kd = 0, raise Kp until the system oscillates steadily, note that critical gain and the oscillation period, then back Kp off and compute Ki and Kd from those two numbers. Crude, but still the famous starting point.',
        'Loop rate matters too: the controller only acts once per tick. A 10 Hz loop on a fast drone is like driving while opening your eyes ten times a second — no gain can rescue stale information.',
      ],
      links: [{ nodeId: 'robo-control', label: 'Refresher: Control Loops & PID' }],
    },
    {
      kind: 'predict',
      question:
        'Completion step — finish the tune. After raising Kp, your drone reaches altitude fast but overshoots 30% and bounces three times before settling. Rise time is fine. Which single knob comes next?',
      options: [
        'Raise Kd — damp the swing without giving up the speed',
        'Raise Kp further — push through the bouncing',
        'Raise Ki — accumulate the error away',
        'Lower the loop rate so it reacts less often',
      ],
      correctIndex: 0,
      reveal:
        'Overshoot + ringing with a good rise time is the textbook cue for more damping: raise Kd. Lowering Kp would also calm it, but sacrifices the rise time you just won. Ki fights constant gaps, not bounces — piling it on makes overshoot WORSE. And a slower loop means staler information, never smoother control.',
    },
    {
      kind: 'predict',
      question:
        'Independent step — no hints. A wheeled robot follows a line; on carpet (constant extra friction) it tracks steadily 4 cm left of the line. No oscillation, quick response. What do you change?',
      options: [
        'Raise Ki — only the integral erases a constant offset',
        'Raise Kp — push harder at all times',
        'Raise Kd — react to the drift',
        'Replace the wheel encoders — the sensors must be broken',
      ],
      correctIndex: 0,
      reveal:
        'A steady offset against a constant disturbance is THE integral symptom: raise Ki and the accumulated 4 cm grinds to zero. More Kp would shrink the gap but never close it (and risks ringing). The error isn’t changing, so Kd sees nothing. The sensors are fine — they’re correctly reporting a controller problem.',
    },
    {
      kind: 'code',
      prompt:
        'Prove the steady-state error yourself. This simulates a P-only controller lifting a mass against gravity, long enough to settle completely. The control law is missing: the push should be Kp times the error. Fill it in and run — does a bigger Kp fix the droop, or only shrink it?',
      starter: `function settle(kp) {
  let pos = 0, vel = 0
  const target = 1, gravity = 1.5, dt = 0.02
  for (let i = 0; i < 4000; i++) {
    const error = target - pos
    const push = 0 // fill in: kp times error
    const acc = push - gravity - 0.8 * vel
    vel += acc * dt
    pos += vel * dt
  }
  return pos.toFixed(2)
}
print('Kp=3 settles at', settle(3), 'of target 1')
print('Kp=12 settles at', settle(12), 'of target 1')`,
      expected: `Kp=3 settles at 0.50 of target 1
Kp=12 settles at 0.87 of target 1`,
      hint: 'The proportional law is: push = kp * error',
      success:
        'Kp=3 stalls halfway; Kp=12 climbs to 0.87 — closer, never there. P-only settles exactly where its push balances gravity, which always needs a leftover error (error = gravity ÷ Kp). That permanent discount is what the I term — or feedforward, next lesson — eliminates.',
    },
    {
      kind: 'quiz',
      question:
        'Your step response reaches 90% of the target in 0.1 s, swings 25% past it, and wobbles for 2 full seconds before staying put. Which metric is GOOD here?',
      options: [
        'Rise time — 0.1 s to near the target is fast',
        'Settling time — 2 s is excellent',
        'Overshoot — 25% is ideal',
        'Steady-state error — the wobble proves it is zero',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: 0.1 s to 90% is a quick rise. The problem children are the 25% overshoot and the 2 s of ringing before it settles.',
        'Those 2 seconds of visible wobble ARE the settling time — and it’s the worst part of this response, twenty times longer than the rise.',
        'Ideal overshoot for most robots is near zero — 25% past the target could be a gripper smashing into the object it reaches for.',
        'Wobbling says nothing about the final gap — steady-state error is measured after everything stops, which this response hasn’t shown you yet.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A quadcopter overshoots its target altitude and oscillates. You could lower Kp or raise Kd. When is raising Kd the better fix?',
      options: [
        'When you want to keep the fast rise time — D damps the swing without slowing the approach',
        'Never — lowering Kp is always safer',
        'When the sensor is very noisy',
        'When there is also a constant steady-state error',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: lowering Kp calms things by making the whole response weaker and slower. Raising Kd targets only the overshoot — it brakes when the error changes fast, so you keep the aggressive rise.',
        'Lowering Kp trades away rise time. If the mission needs a fast response, damping with D is exactly what the D term exists for.',
        'Backwards — D DIFFERENTIATES the signal, so heavy noise is the one situation where raising Kd bites you: it amplifies jitter into violent commands.',
        'A constant gap is Ki’s job. D sees only CHANGE in error; a steady offset is invisible to it.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In the Ziegler–Nichols tuning recipe, what do you do first?',
      options: [
        'Zero out I and D, then raise Kp until the system oscillates steadily',
        'Max out all three gains, then reduce them together',
        'Set Ki as high as possible for accuracy',
        'Measure the sensor’s noise floor',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: with only P active you find the critical gain where steady oscillation begins — that gain and the oscillation period then set the starting Kp, Ki and Kd.',
        'Starting with everything high is a recipe for violent instability — the method deliberately isolates ONE knob to find the system’s edge safely.',
        'High Ki alone causes slow windup and heavy overshoot — I is derived LAST, from the critical-gain measurement.',
        'Noise matters when filtering the D term, but Ziegler–Nichols is built on finding the oscillation point, not on measuring noise.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Your PID runs at 1000 Hz on the bench. In the field, logging steals CPU and the loop drops to 20 Hz. The gains are unchanged. What do you expect?',
      options: [
        'Degraded, possibly unstable control — every correction now acts on 50 ms-old information',
        'Identical behavior — the gains define the controller',
        'Better behavior — fewer corrections means smoother output',
        'The robot moves 50× slower but stays accurate',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: each correction now waits 50 ms, so a fast disturbance grows before the loop even sees it. Gains tuned for 1 ms of staleness routinely oscillate or diverge at 50 ms.',
        'The gains define the math per tick, but the loop RATE decides how stale the error is. Same gains + slower loop = a different (worse) controller.',
        'Fewer corrections means each one is larger and later — that is how oscillation starts, not how smoothness happens.',
        'Loop rate changes reaction latency, not the robot’s speed. The motion commands are just as strong — only more out-of-date.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A 3D printer head reaches each position fast with no bounce, but every printed line is shifted 0.5 mm in the same direction. Which gain was probably left at zero?',
      options: [
        'Ki — nothing accumulates the constant bias away',
        'Kd — nothing damps the motion',
        'Kp — nothing pushes toward the target',
        'None — PID cannot fix a constant shift',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a repeatable constant offset with otherwise clean motion is the fingerprint of missing integral action — a small persistent error that P tolerates forever.',
        'Damping problems show up as overshoot and ringing — this motion is clean, so Kd isn’t the issue.',
        'With Kp at zero the head would barely move at all, let alone track fast — the proportional push is clearly working.',
        'A constant bias is exactly what integral action is FOR — it sums the error until even a 0.5 mm gap is driven out.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A response overshoots by 40% and rings for ages before settling. Which knob do you reach for first?',
      options: [
        'Raise Kd (or lower Kp) — the response needs damping',
        'Raise Ki — accumulate the error faster',
        'Raise Kp — push through the ringing',
        'Raise the target so the overshoot lands on it',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: overshoot and ringing mean too much drive for too little damping — add Kd, or ease off Kp if you can afford a slower rise.',
        'Integral action makes overshoot WORSE — it keeps pushing based on accumulated error even after you pass the target.',
        'More Kp adds energy to a system already swinging past its goal — the bouncing amplifies.',
        'Moving the goalposts isn’t control — the new target would simply be overshot too.',
      ],
    },
    {
      question:
        'A camera gimbal tracks smoothly indoors but twitches violently when the drone’s motors vibrate. Which gain amplifies vibration the most?',
      options: [
        'Kd — it differentiates the shaking into huge rate-of-change commands',
        'Ki — it accumulates the vibration',
        'Kp — it scales the vibration the most',
        'None — gains cannot amplify vibration',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: vibration is small but FAST, and speed is exactly what a derivative magnifies — tiny high-frequency wiggles become violent D-term commands. Real gimbals low-pass filter before differentiating.',
        'Integration averages fast symmetric wiggles toward zero — I is the calmest term against vibration.',
        'P passes the wiggle through scaled by Kp, but it doesn’t explode with frequency the way differentiation does.',
        'They can: any gain shapes how measurement content becomes commands, and D specifically amplifies the fastest content.',
      ],
    },
    {
      question: 'What is the rise time of a step response?',
      options: [
        'The time to get from 10% to 90% of the way to the new target',
        'The time until all oscillation stops',
        'The percentage it swings past the target',
        'The gap remaining after everything settles',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: rise time measures how quickly the response first approaches the target — by convention, from 10% to 90% of the step.',
        'That’s the settling time — a different (and often much longer) number.',
        'That’s the overshoot, expressed as a percentage of the step size.',
        'That’s the steady-state error — the accuracy metric, not the speed metric.',
      ],
    },
    {
      question:
        'An elevator with P-only control always stops 3 cm below the floor when loaded with passengers (constant extra weight). The fix?',
      options: [
        'Add integral action — the loaded droop accumulates away to zero',
        'Add derivative action to react to the droop',
        'Double the loop rate',
        'Lower Kp so it stops more gently',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: constant load, constant droop — the textbook steady-state error. The I term integrates the 3 cm gap until the motor holds the extra weight with zero error.',
        'The droop is constant, so its rate of change is zero — the D term literally outputs nothing against it.',
        'A faster loop reads the same steady 3 cm more often — staleness isn’t the problem, the control law is.',
        'Lower Kp makes the droop BIGGER: the balance point moves further from the target when the push per metre of error weakens.',
      ],
    },
  ],
}
