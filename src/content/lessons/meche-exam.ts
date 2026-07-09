import type { Lesson } from '../../types'

export const mecheExamLesson: Lesson = {
  nodeId: 'meche-exam',
  screens: [
    {
      kind: 'explain',
      title: 'Module exam — build the machine',
      body: [
        'Ten questions across the whole module — simple machines, mechanical advantage, gear ratios, linkages, tolerances and manufacturing — all NEW, no repeats from the lesson quizzes. Work the trades in your head.',
        'Score 80% and the module is sealed. Below that costs nothing — you’ll see exactly which idea slipped, review it, and retake.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A lever has an effort arm of 3 m and a load arm of 1 m. You push down with 40 N. Ignoring friction, how much force lifts the load?',
      options: ['120 N', '40 N', '13 N', '80 N'],
      correctIndex: 0,
      explanations: [
        'Correct: MA = effort arm ÷ load arm = 3, so output force = 40 × 3 = 120 N (over 1/3 the distance).',
        '40 N is your input — the lever multiplies it by the 3:1 arm ratio.',
        '13 N ≈ 40 ÷ 3, dividing instead of multiplying — a longer effort arm INCREASES output force.',
        '80 N uses a factor of 2; the arms give a factor of 3 (3 m ÷ 1 m).',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A machine with a mechanical advantage of 10 lifts a load 0.1 m. Ignoring friction, how far must your input move?',
      options: ['1 m — input distance = output distance × MA', '0.1 m — the same as the load', '0.01 m — 10× less', '10 m — MA times the load weight'],
      correctIndex: 0,
      explanations: [
        'Correct: work is conserved, so gaining 10× force costs 10× distance — input moves 0.1 × 10 = 1 m.',
        'If input and output moved the same distance with 10× force, energy would appear from nowhere.',
        'The input moves FARTHER, not less — that’s the price of the force multiplication.',
        '10 m confuses distance with the load; input distance = output distance × MA = 0.1 × 10 = 1 m.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A 20-tooth gear drives a 60-tooth gear. The driver spins at 900 rpm. How fast does the driven gear turn?',
      options: ['300 rpm', '2700 rpm', '900 rpm', '60 rpm'],
      correctIndex: 0,
      explanations: [
        'Correct: ratio = 60 ÷ 20 = 3, and speed divides by the ratio, so 900 ÷ 3 = 300 rpm (with 3× the torque).',
        '2700 rpm multiplies by 3 — but a bigger driven gear turns SLOWER, not faster.',
        'The gears differ in size, so the speed must change — it can’t stay 900 rpm.',
        '60 is the tooth count, not the speed; the output is 900 ÷ 3 = 300 rpm.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Between two meshed gears, which arrangement produces MORE torque at the output than the input?',
      options: [
        'A small gear driving a large gear (a reduction) — torque up, speed down',
        'A large gear driving a small gear — torque up, speed up',
        'Two equal gears — torque doubles',
        'Any gear pair always doubles torque',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: small-drives-large is a reduction (ratio > 1): output torque is multiplied and speed divided, the standard robot gearbox.',
        'Large-drives-small is an overdrive — it raises speed and LOWERS torque, the opposite trade.',
        'Two equal gears give a 1:1 ratio — same torque and speed (just reversed direction), no doubling.',
        'The torque change depends on the tooth RATIO; a 1:1 pair changes nothing.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A gearbox chains a 2:1 stage and a 5:1 stage. A motor at 0.4 Nm drives it. Ignoring losses, the overall ratio and output torque are…',
      options: ['10:1 and 4 Nm', '7:1 and 2.8 Nm', '2.5:1 and 1 Nm', '10:1 and 0.04 Nm'],
      correctIndex: 0,
      explanations: [
        'Correct: stage ratios multiply (2 × 5 = 10:1), and a reduction multiplies torque, so 0.4 × 10 = 4 Nm.',
        'Ratios multiply, not add — 2 × 5 = 10, not 7.',
        'Dividing the ratios is wrong; series stages compound to 10:1, not 2.5:1.',
        'A reduction MULTIPLIES torque; 0.04 Nm divides it, which is backwards for a 10:1 reduction.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You need a robot’s rotating shaft to drive a piston straight in and out. Which mechanism converts rotation to that back-and-forth linear motion?',
      options: [
        'A slider-crank linkage',
        'A pair of spur gears',
        'A worm gear',
        'A voltage divider',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the slider-crank turns a rotating crank into straight-line reciprocation (and back) — the engine/pump mechanism.',
        'Spur gears transmit rotation to rotation; they don’t convert it to linear motion.',
        'A worm gear changes speed/axis of rotation but keeps motion rotary, not linear.',
        'A voltage divider is an electronics circuit — nothing to do with converting motion.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A hole is 12.00–12.04 mm and a shaft is 11.95–11.98 mm. What is the TIGHTEST (minimum) clearance?',
      options: ['0.02 mm', '0.09 mm', '0.06 mm', '0.00 mm'],
      correctIndex: 0,
      explanations: [
        'Correct: tightest = smallest hole − largest shaft = 12.00 − 11.98 = 0.02 mm. Still positive, so it always fits.',
        '0.09 mm is the LOOSEST clearance (largest hole 12.04 − smallest shaft 11.95), not the tightest.',
        '0.06 mm mixes the bands; the minimum uses the smallest hole with the largest shaft.',
        'It never reaches zero — even the worst case leaves a 0.02 mm gap, a guaranteed clearance fit.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Four identical spacers, each 5.0 mm ±0.05 mm, are stacked. What is the worst-case total?',
      options: ['20.0 mm ±0.2 mm', '20.0 mm ±0.05 mm', '5.0 mm ±0.2 mm', '20.0 mm exactly'],
      correctIndex: 0,
      explanations: [
        'Correct: worst-case tolerances add — 4 × 5.0 = 20 mm nominal, and 4 × 0.05 = ±0.2 mm. Errors accumulate down a stack.',
        'The tolerance grows with each part in the worst case; it doesn’t stay ±0.05.',
        '5.0 mm is one spacer; four of them nominal is 20 mm, with ±0.2 accumulated.',
        'Worst case assumes all four run high (or low), giving ±0.2 mm — they don’t perfectly cancel.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A startup needs 100 000 identical plastic clips. Which manufacturing process is most economical?',
      options: [
        'Injection moulding — the mould’s upfront cost amortizes over huge volume, making each part very cheap',
        '3D printing each one — best at any volume',
        'CNC machining each from a block',
        'Hand-carving for consistency',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: at 100 000 parts the expensive mould is spread thin, so injection moulding’s per-part cost is unbeatable.',
        '3D printing suits ONES to hundreds — printing 100 000 would be absurdly slow and costly per part.',
        'Machining each clip from a block is wasteful and slow at that scale; moulding is far cheaper in volume.',
        'Hand work can’t deliver 100 000 parts economically or consistently — that’s exactly what tooling solves.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A gearbox has an ideal ratio of 5:1 but is only 80% efficient. A 3 Nm motor drives it. The real output torque is about…',
      options: ['12 Nm — 5 × 3 = 15 Nm ideal, then × 0.8', '15 Nm — efficiency doesn’t matter', '18.75 Nm — divide by 0.8', '1.92 Nm — divide by the ratio'],
      correctIndex: 0,
      explanations: [
        'Correct: ideal torque = 3 × 5 = 15 Nm; efficiency trims it to 0.8 × 15 = 12 Nm, the rest lost to friction as heat.',
        'Real gears lose some to friction — 80% efficiency means 12 Nm, not the full 15.',
        'Dividing by 0.8 INCREASES the torque, which would create energy; efficiency reduces the output.',
        '1.92 Nm divides by the ratio — a reduction MULTIPLIES torque; the output is far larger than the input.',
      ],
    },
  ],
}
