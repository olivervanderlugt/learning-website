import type { Lesson } from '../../types'

export const roboExamLesson: Lesson = {
  nodeId: 'robo-exam',
  screens: [
    {
      kind: 'explain',
      title: 'Module exam — close the loop',
      body: [
        'This is the capstone domain — sense, control, kinematics, embedded brains and robot software, tied into one exam. Ten NEW questions, no repeats from the lessons, answered from memory.',
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
  ],
}
