import type { Lesson } from '../../types'

export const roboExamLesson: Lesson = {
  nodeId: 'robo-exam',
  screens: [
    {
      kind: 'explain',
      title: 'Module exam — close the loop',
      body: [
        'This is the capstone domain — sense, control & tuning, state space, kinematics, transforms, the Jacobian, embedded brains and robot software, tied into one exam. Eighteen NEW questions, no repeats from the lessons, answered from memory.',
        'Score 80% and the bridge to robotics is sealed. Miss it? Costs nothing — you’ll see exactly which idea slipped, review it, and retake.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Your warehouse robot must measure distances to shelves and obstacles all around it — including in pitch-dark aisles at night. Which sensor is the right pick?',
      options: [
        'A lidar — it measures distance with its own emitted light',
        'A camera — it sees everything in front of it',
        'A wheel encoder — it tracks how far the robot has moved',
        'An IMU — it feels every bump and turn',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: lidar sends out its own light and times the reflection, so it reads distances directly — darkness is irrelevant because it brings its own illumination.',
        'A camera is passive — it needs ambient light, and even in daylight it gives pixels, not distances, without heavy extra processing.',
        'An encoder counts the robot’s OWN wheel turns — it says how far you’ve driven, nothing about what’s around you.',
        'An IMU feels tilt and acceleration of the robot itself — it can’t sense external objects at all.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A 10-bit ADC digitizes a 0–5 V force sensor. Roughly what is the smallest voltage change it can distinguish?',
      options: [
        'About 5 mV — 5 V split across 2¹⁰ = 1024 levels',
        '0.5 V — 5 V divided by the 10 bits',
        'About 20 mV — 5 V divided by 256 levels',
        'Zero — a digital reading is exact',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: 10 bits give 2¹⁰ = 1024 levels, so each step is 5 V ÷ 1024 ≈ 4.9 mV. Bits set resolution.',
        'You divided by the bit COUNT — but each bit doubles the levels, so 10 bits mean 1024 steps, not 10.',
        '256 levels is what 8 bits buy (2⁸). Ten bits give 1024 — four times finer.',
        'Digital never means exact — the reading snaps to the nearest level, and that rounding gap is quantization error.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A delivery drone bounces endlessly above and below its target altitude — overshooting up, then down, never settling. Textbook diagnosis?',
      options: [
        'Proportional gain too high, derivative damping too low — ease off P or add D',
        'The integral term is missing',
        'The control loop is running too fast',
        'The battery is nearly empty',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: oscillation is the classic signature of an overeager P term with nothing braking it — D watches how fast the error changes and damps the bounce before it happens.',
        'A missing I term causes a steady-state OFFSET — settling stubbornly short of the target — not symmetric bouncing around it.',
        'Faster loops make control smoother, not wilder — it’s a too-SLOW loop that can destabilize, reacting to stale readings.',
        'A dying battery gives weak thrust — the drone would droop below target, not bounce energetically around it.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Cruise control on a long constant hill holds the car 2 km/h below the set speed — steady, never catching up. What’s going on?',
      options: [
        'No integral action: the P push exactly balances the hill at a point below target, and nothing accumulates the leftover error',
        'The derivative gain is too low',
        'The proportional gain is too high',
        'The engine physically can’t go faster uphill',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: P-only control finds equilibrium where its push equals the constant drag of the hill — a permanent small error. Only the I term, summing that error over time, grinds the gap to zero.',
        'D reacts to CHANGE in error — this error is constant, so its derivative is zero and D contributes nothing either way.',
        'Too much P causes overshoot and oscillation, not a calm steady shortfall — this symptom points at what’s missing, not what’s excessive.',
        'The engine has plenty of reserve — the controller simply never asks for it, because a P-only law stops pushing harder once it balances.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You swap a robot arm’s angle sensor for a cheaper, noisier one, and the previously smooth PID controller starts twitching violently. Which term is most to blame?',
      options: [
        'The D term — differentiating a jittery signal turns tiny noise spikes into huge rate-of-change commands',
        'The I term — it adds up all the noise',
        'The P term — it multiplies the noise the most',
        'None — PID controllers are immune to sensor noise',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a small but FAST wiggle has a huge derivative, so the D term amplifies high-frequency noise into violent commands — which is why real controllers filter the signal before differentiating.',
        'Backwards — integration smooths noise: random jitter averages toward zero as it accumulates, so I is the calmest term here.',
        'P passes noise through scaled by its gain, but it doesn’t blow up fast jitter the way differentiation does — rate of change is what explodes.',
        'The controller only knows the world through its sensors — noisy measurements mean noisy error, and the D term makes that painfully visible.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A 2-joint arm has segments of length 50 and 50. Shoulder angle θ₁ = 90° (pointing straight up), elbow angle θ₂ = 0° (straight). Where is the hand relative to the base?',
      options: [
        '(0, 100) — both segments in line, straight up',
        '(100, 0) — straight out along the ground',
        '(0, 50) — only the upper segment counts',
        '(50, 50) — one segment up, one sideways',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: θ₂ = 0 keeps the forearm in line with the upper arm, so the whole 50 + 50 = 100 points along θ₁ = 90° — straight up to (0, 100).',
        '(100, 0) is the pose for θ₁ = 0° — you rotated the calculation, not the shoulder. At 90° the arm points up.',
        'The hand sits at the END of the chain — the forearm’s 50 adds on top of the upper arm’s 50. Dropping it locates the elbow, not the hand.',
        'That would need the elbow bent 90° so the forearm turns sideways — but θ₂ = 0 means dead straight, both segments stacked.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A pick-and-place arm with segments 80 and 60 is told to grab a part 180 cm from its base. What will the inverse-kinematics solver report?',
      options: [
        'No solution — the target is beyond the arm’s maximum reach of 140',
        'Exactly one solution',
        'Two solutions — elbow-up and elbow-down',
        'It returns the closest angles and the arm stretches the rest',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: fully extended the arm reaches 80 + 60 = 140 — the 180 cm target is simply outside the workspace, so no joint angles exist. IK can fail; that’s part of what makes it hard.',
        'One exact solution happens only at the boundary — a target at exactly 140, arm dead straight. Beyond it there are none.',
        'Elbow-up/elbow-down pairs exist for targets INSIDE the reachable region — this one is outside it entirely.',
        'Segments are rigid — nothing stretches. A solver may report the nearest reachable pose, but the commanded point itself has no solution.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Why not run a robot’s 1000-times-per-second motor control loop on a laptop with a general-purpose OS, instead of a humble microcontroller?',
      options: [
        'The OS can pause your program at any moment to run something else — deadlines are not guaranteed',
        'Laptops are too slow to compute PID a thousand times per second',
        'Laptop CPUs can’t do the math precisely enough',
        'A 1 kHz loop needs more RAM than a laptop has',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a general-purpose scheduler juggles dozens of programs and may preempt yours for milliseconds at a time — fatal when being late is being wrong. A bare microcontroller runs your loop and nothing else, deterministically.',
        'A laptop is thousands of times faster than the microcontroller that handles this easily — raw speed was never the issue, timing guarantees are.',
        'The arithmetic is identical on both — the difference is WHEN your code runs, not how well it calculates.',
        'A PID loop needs a handful of variables — bytes, not gigabytes. Memory has nothing to do with the deadline problem.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Your robot needs millisecond-deadline motor control AND heavy camera processing. What’s the standard architecture?',
      options: [
        'A microcontroller for the deadline-critical motor loop, a bigger computer for vision — talking to each other',
        'Run everything on the big computer, since it’s more powerful',
        'Run everything on the microcontroller, since it’s more reliable',
        'Alternate: vision for one second, then motors for one second',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: split by requirement — the microcontroller guarantees the hard real-time loop, the bigger computer crunches images, and messages flow between them. This split is on virtually every real robot.',
        'Power isn’t the problem — its general-purpose OS can’t promise millisecond deadlines, so the motor loop would occasionally arrive late and misbehave.',
        'Reliable, yes — but with kilobytes of RAM it can’t hold even one camera frame, let alone process it.',
        'Motors need control EVERY millisecond — a full second of neglect while vision runs means a robot lurching blind.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You want to add a black-box recorder that logs every lidar scan on a running ROS robot. What must change in the lidar node’s code?',
      options: [
        'Nothing — the recorder just subscribes to the existing /scan topic',
        'The lidar node must add a call to the new recorder',
        'The lidar node must be updated with a list of all its subscribers',
        'The lidar and recorder must be merged into one program',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the lidar publishes to its topic without knowing or caring who listens — a new subscriber attaches without touching the publisher. That decoupling is the entire point of pub/sub.',
        'Direct calls are exactly what pub/sub replaces — if the lidar had to call each consumer, every new tool would mean editing sensor code.',
        'Publishers hold no subscriber list in their code — the framework routes messages by topic name, which is why adding listeners is free.',
        'Merging kills the modularity: separate nodes let you swap, test and crash pieces independently — one giant program is what ROS exists to avoid.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A rescue-robot spec demands: reach a commanded arm pose within 0.3 s and NEVER swing past it (the arm works next to casualties). Which two step-response numbers does the spec constrain?',
      options: [
        'Rise time and overshoot',
        'Settling time and steady-state error',
        'Loop rate and steady-state error',
        'Overshoot and steady-state error',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: “within 0.3 s” bounds the rise time; “never swing past” demands (near-)zero overshoot. Spec language maps straight onto response metrics.',
        'Settling and final accuracy matter too, but the two quoted requirements are speed-to-target (rise time) and no-swing-past (overshoot).',
        'Loop rate is an implementation choice, not a response metric — the spec constrains the visible behavior, not the code.',
        'Overshoot yes — but the 0.3 s requirement is about how FAST the arm approaches, which is rise time, not the final leftover gap.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A delivery drone’s weight is known to the gram. The BEST way to handle gravity is…',
      options: [
        'Feedforward the exact hover thrust from the model, and let feedback trim the leftovers',
        'A large integral gain, to accumulate the droop away quickly',
        'A large proportional gain, to overpower gravity',
        'Oversized motors, so gravity becomes negligible',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a perfectly predictable force is feedforward’s home turf — command it up front with no error needed, and feedback only fights gusts and model error.',
        'The I term eventually learns the same thrust, but only by integrating real error first — slower, and a big Ki invites overshoot and windup.',
        'Huge Kp shrinks the droop but never zeroes it (P needs a standing error to produce a standing thrust) — and it buys oscillation on the way.',
        'Gravity scales with the drone’s own mass — you can’t out-motor it into irrelevance, and the hover would be brutally inefficient.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Two identical drones are both at exactly 5 m altitude, but drone A is climbing and drone B is falling. A controller reading ONLY altitude treats them identically. Which concept names what’s missing?',
      options: [
        'The state — the minimal set of variables (here altitude AND vertical speed) that determines the future',
        'The steady-state error',
        'The feedforward term',
        'The loop rate',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: altitude alone is an incomplete state — the two drones share it yet have opposite futures. Add vertical velocity and the future is pinned down; that completeness is what “state” means.',
        'Steady-state error is the leftover gap after settling — nothing to do with distinguishing rising from falling.',
        'Feedforward supplies predictable commands from a model; it doesn’t define what information the controller must read.',
        'A faster loop reads the same incomplete number more often — fresher timestamps on the same blindness.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Your rover’s GPS is noisy — each fix jumps metres around the true spot — yet the navigation stack outputs a smooth, accurate position. What is it almost certainly doing?',
      options: [
        'Fusing a motion-model prediction with each noisy fix, weighted by trust — a Kalman-style estimator',
        'Displaying the raw GPS fixes directly',
        'Averaging the last 1000 fixes, so the position is minutes old',
        'Ignoring the GPS and trusting the wheel odometry alone',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: predict with the model, correct with the measurement, weight by uncertainty — the Kalman recipe every real rover runs.',
        'The raw fixes ARE the jumpy input — a smooth output proves something is filtering between the GPS and the screen.',
        'A long flat average is smooth but laggy — the rover would be reading its position from minutes in the past while driving.',
        'Pure dead-reckoning drifts without bound — wheels slip, so model-only navigation degrades within metres. The GPS data must keep coming back in.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A 2-link arm has equal links L₁ = L₂ = 2, shoulder θ₁ = 0°, elbow θ₂ = 90°. Using x = L₁cosθ₁ + L₂cos(θ₁+θ₂), y = L₁sinθ₁ + L₂sin(θ₁+θ₂), where is the hand?',
      options: ['(2, 2)', '(4, 0)', '(0, 4)', '(2, 0)'],
      correctIndex: 0,
      explanations: [
        'Correct: x = 2·cos0 + 2·cos90 = 2 + 0 = 2; y = 2·sin0 + 2·sin90 = 0 + 2 = 2. Upper arm reaches out 2, elbow sends the forearm 2 up.',
        '(4, 0) is the fully-straight pose (θ₂ = 0°); here the elbow is bent 90°, folding the forearm upward.',
        '(0, 4) would need the shoulder pointing straight up (θ₁ = 90°); here θ₁ = 0°.',
        '(2, 0) forgets the forearm’s vertical contribution — the bent elbow adds 2 in y.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A robot arm reaches a configuration where the determinant of its Jacobian is zero. What is happening?',
      options: [
        'It is at a singularity — instantaneously it cannot move its hand in some direction',
        'It is in its most dexterous, capable pose',
        'Its forward kinematics has become undefined',
        'It has reached maximum motor efficiency',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: det(J) = 0 means J is non-invertible, so a direction of hand motion is momentarily lost — a singularity (the same det = 0 idea as gimbal lock).',
        'Capability is highest when det(J) is FAR from zero; at zero it is at its worst.',
        'Forward kinematics (angles → position) always works fine; it is the inverse VELOCITY map that fails here.',
        'Efficiency is unrelated — near a singularity the motors are asked for impossibly large speeds.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Why does chaining homogeneous transforms (rather than tracking positions by hand) scale to a 6-joint arm?',
      options: [
        'Forward kinematics is just the ordered product of each joint’s transform — the same rule for 2 joints or 20',
        'Because 6 is a special number for robots',
        'Because it removes the need to know link lengths',
        'Because the joints can then be solved independently of each other',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: each joint contributes one rotation-plus-translation matrix, and multiplying them in order gives the end-effector pose regardless of joint count.',
        'Nothing special about 6 — the matrix-product rule works for any number of joints.',
        'Link lengths live inside the translation part of each transform; they are still essential.',
        'The joints are coupled through the chain — joint 6’s world pose depends on all the joints before it.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Numerical inverse kinematics (for arms with no closed-form solution) most resembles which technique?',
      options: [
        'Gradient descent — iterate using a derivative (the Jacobian) to step joints toward the target',
        'Bubble sort — repeatedly swap adjacent joints',
        'Binary search — halve a sorted list of angles',
        'Hashing — look the answer up in a table',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: IK nudges the joints along the Jacobian to shrink the hand-position error step by step — the same iterate-with-a-derivative idea as gradient descent.',
        'Sorting swaps values in a list; it has nothing to do with converging on joint angles.',
        'Binary search needs a sorted 1-D structure; IK explores a continuous multi-joint space via the Jacobian.',
        'A lookup table can’t cover a continuous space of targets; IK computes the angles on the fly.',
      ],
    },
  ],
}
