import type { Lesson } from '../../types'

export const mecheGearsLesson: Lesson = {
  nodeId: 'meche-gears',
  screens: [
    {
      kind: 'explain',
      title: 'Teeth that trade speed for torque',
      body: [
        'A gear pair is a lever that spins forever. The GEAR RATIO = teeth on the driven gear ÷ teeth on the driver. A small gear turning a big one gives a ratio above 1.',
        'That ratio trades the same way a lever does: output SPEED divides by the ratio, output TORQUE multiplies by it. Slower but stronger, or faster but weaker — you choose.',
        'This is why a tiny high-speed motor can move a heavy robot: a gearbox converts its whizzing, weak spin into a slow, powerful one.',
      ],
      links: [{ nodeId: 'meche-machines', label: 'Refresher: Mechanical Advantage' }],
    },
    {
      kind: 'predict',
      question:
        'A 12-tooth gear on a motor drives a 36-tooth gear on a wheel. Compared to the motor, how does the wheel turn?',
      options: [
        '3× slower, with 3× the torque — the ratio is 36/12 = 3',
        '3× faster, with 3× the torque',
        '3× slower, with 3× less torque',
        'At the same speed and torque',
      ],
      correctIndex: 0,
      reveal:
        'The ratio is 36 ÷ 12 = 3. The big gear turns once for every three turns of the small one, so the wheel spins 3× SLOWER — but torque is multiplied by 3. It’s the lever bargain again: you lose speed to gain force. (Power — torque × speed — stays roughly the same, minus friction.) Reverse it, driving the small gear with the big one, and you’d get 3× the speed for 1/3 the torque.',
    },
    {
      kind: 'code',
      prompt:
        'A gearbox: 12-tooth driver, 36-tooth driven. Ratio = driven ÷ driver. Output speed divides by the ratio; output torque MULTIPLIES by it (power is conserved). Compute the output torque.',
      starter:
        "// Gear ratio = driven teeth / driver teeth.\nconst driverTeeth = 12\nconst drivenTeeth = 36\nconst ratio = drivenTeeth / driverTeeth\nconst inRpm = 3000        // motor speed\nconst inTorque = 0.5      // motor torque (Nm)\nconst outRpm = inRpm / ratio         // speed divides\nprint('gear ratio:', ratio)\nprint('output rpm:', outRpm)\n// Torque multiplies by the ratio — slower but stronger:\nconst outTorque = \nprint('output torque (Nm):', outTorque)",
      expected: 'gear ratio: 3\noutput rpm: 1000\noutput torque (Nm): 1.5',
      hint: 'inTorque * ratio',
      success:
        'A 3:1 gearbox turned 3000 rpm at 0.5 Nm into 1000 rpm at 1.5 Nm — a third the speed, triple the torque. Notice power is conserved: 3000×0.5 and 1000×1.5 both give 1500 (units aside). Every robot joint is a motor plus exactly this trade, sized to need speed or strength.',
    },
    {
      kind: 'explain',
      title: 'From ratios to real mechanisms',
      body: [
        'Chain several gears (a GEAR TRAIN) and the ratios multiply — that’s how a wristwatch or a robot wrist gets huge reductions from small gears.',
        'Gears transmit rotary motion, but LINKAGES reshape motion itself: a four-bar linkage turns rotation into a specific path, and a CAM turns rotation into a custom rise-and-fall (an engine’s valves, a robot’s walking gait).',
        'Mechanisms are how a single spinning motor becomes gripping, walking, steering — whatever the robot must do.',
      ],
      deeper: [
        'Multi-stage reduction: two 3:1 stages in series give 9:1, not 6:1 — ratios MULTIPLY. This is why a compact gearbox can reach 100:1 with a few small stages, turning a screaming 10 000 rpm motor into a stately, powerful output.',
        'A SLIDER-CRANK linkage converts rotation into straight-line back-and-forth (or the reverse) — it’s the piston-and-crankshaft of every engine and pump. A four-bar linkage, by contrast, can be tuned so a point traces almost any curve, which is how legged robots and old drawing machines make feet or pens follow a designed path.',
        'Backlash — the tiny slop between meshing teeth — is the enemy of precision robots: when a joint reverses direction, it lurches through the free play before the load moves. Preloaded, anti-backlash, or harmonic-drive gears exist specifically to kill it, at the cost of friction and money.',
      ],
      links: [{ nodeId: 'robo-embedded', label: 'The motor that drives it: Embedded' }],
    },
    {
      kind: 'quiz',
      question: 'A gear ratio of 5:1 (driven:driver) does what to a motor’s output?',
      options: [
        'Divides speed by 5 and multiplies torque by 5 — slower, stronger',
        'Multiplies both speed and torque by 5',
        'Multiplies speed by 5 and divides torque by 5',
        'Leaves speed and torque unchanged',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a reduction ratio trades speed for torque — output turns 5× slower but 5× stronger, with power roughly constant.',
        'You can’t multiply both — that would create power. Gaining torque costs speed.',
        'That’s the ratio applied backwards (an overdrive, driver bigger than driven); a 5:1 reduction slows the output.',
        'A ratio other than 1:1 always changes the speed/torque trade — 5:1 is a big reduction.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Two gear stages of 3:1 and 4:1 are chained in a gear train. The overall ratio is…',
      options: [
        '12:1 — stage ratios multiply',
        '7:1 — stage ratios add',
        '1.33:1 — the ratios divide',
        '3.5:1 — you average them',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: gear-train ratios multiply, so 3 × 4 = 12:1. That compounding is how small gears reach huge reductions.',
        'Ratios multiply, not add — chaining scales the reduction, it doesn’t sum it.',
        'Dividing would shrink the reduction; chaining stages always increases it (3 × 4 = 12).',
        'Averaging isn’t how series stages combine — each stage reduces what the previous one output, so they multiply.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does a CAM mechanism do?',
      options: [
        'Converts steady rotation into a custom-shaped rise-and-fall (or push) profile',
        'Multiplies torque like a gear',
        'Stores electrical energy',
        'Only reverses the direction of a shaft',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a cam’s profile is a programmable motion — as it rotates, a follower rises and falls exactly as the shape dictates (engine valves, indexing machines).',
        'Torque multiplication is a gear’s job; a cam shapes MOTION, not force ratio.',
        'Energy storage is a battery/capacitor/spring; a cam transmits and reshapes motion.',
        'It does far more than reverse a shaft — it turns rotation into an arbitrary timed displacement.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Backlash in a geartrain is a problem for a precision robot because…',
      options: [
        'On reversing direction, the joint lurches through the tooth free-play before the load actually moves',
        'It makes the gears spin faster than intended',
        'It adds torque the motor can’t control',
        'It stores energy that later releases randomly',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: backlash is the slop between teeth — reverse the drive and the output waits, motionless, until the gap closes, ruining fine positioning.',
        'It doesn’t change speed; it inserts dead motion at direction changes.',
        'It’s lost motion, not extra torque — the motor turns while the output momentarily doesn’t.',
        'It’s mechanical free-play, not an energy store — the issue is position error, not stored energy.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A motor spins at 6000 rpm. You need the output at 500 rpm. What reduction ratio is required?',
      options: ['12:1', '6:1', '500:1', '2:1'],
      correctIndex: 0,
      explanations: [
        'Correct: ratio = input speed ÷ output speed = 6000 ÷ 500 = 12, so a 12:1 reduction (and ~12× the torque).',
        '6:1 would give 1000 rpm, twice too fast — divide 6000 by the target 500.',
        '500:1 confuses the target speed with the ratio; the ratio is 6000 ÷ 500 = 12.',
        '2:1 would give 3000 rpm — far short of the needed reduction to 500.',
      ],
    },
    {
      question: 'A 4:1 reduction gearbox is 90% efficient. A motor supplies 2 Nm. The ideal vs real output torque is about…',
      options: [
        'Ideal 8 Nm; real ≈ 7.2 Nm after the 10% friction loss',
        'Ideal 8 Nm; real 8 Nm — gears have no losses',
        'Ideal 0.5 Nm; real 0.45 Nm',
        'Ideal 6 Nm; real 5.4 Nm',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: ideal torque = 2 × 4 = 8 Nm; efficiency trims it to 0.9 × 8 ≈ 7.2 Nm, the friction taking its cut as heat.',
        'Real gears always lose some to friction — 90% efficiency means ~7.2 Nm, not the full 8.',
        'That divides instead of multiplies — a 4:1 REDUCTION multiplies torque by 4, giving 8 Nm ideal.',
        '6 Nm uses a ratio of 3, not 4; with 4:1 the ideal is 8 Nm before losses.',
      ],
    },
    {
      question: 'A slider-crank mechanism (as in an engine) converts…',
      options: [
        'Rotation into straight-line back-and-forth motion (or vice versa)',
        'Rotation into a higher-torque rotation',
        'Electrical energy into rotation',
        'Heat directly into motion with no moving parts',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the crank spins, the slider (piston) reciprocates in a straight line — the classic rotation ↔ linear conversion of engines and pumps.',
        'Torque multiplication is a gear’s job; the slider-crank changes the TYPE of motion, not the ratio.',
        'That’s a motor; a slider-crank is a pure mechanical linkage, no electricity involved.',
        'It’s all moving parts (crank, rod, slider) — nothing about heat-to-motion here.',
      ],
    },
    {
      question: 'Why can a small, weak, fast motor still drive a heavy robot leg?',
      options: [
        'A gearbox trades its high speed for high torque, so the slow output is strong enough',
        'Gears add energy the motor lacks',
        'Heavy legs need less torque than light ones',
        'The motor secretly runs faster under load',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: reduction gearing converts the motor’s fast-but-weak spin into a slow-but-strong output — exactly the torque a heavy joint needs, at the cost of speed.',
        'Gears conserve power (minus friction); they reshape the speed/torque split, they don’t add energy.',
        'Heavier legs need MORE torque — the gearbox is what supplies it.',
        'Motors actually slow down under load; the gearbox, not a speed-up, provides the torque.',
      ],
    },
  ],
}
