import type { Lesson } from '../../types'

export const physExamLesson: Lesson = {
  nodeId: 'phys-exam',
  screens: [
    {
      kind: 'explain',
      title: 'Module exam — the laws your robot obeys',
      body: [
        'Ten questions spanning forces, energy and electricity — all NEW scenarios, no repeats from the lesson quizzes. No sims, no notes: pure retrieval from memory.',
        'Score 80% and physics is sealed. Fall short? It costs nothing — you’ll see exactly which law slipped, review it, and retake.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A 4 kg delivery robot’s motor pushes it forward with 10 N while friction drags back with 2 N. What is its acceleration?',
      options: ['2 m/s²', '2.5 m/s²', '3 m/s²', '32 m/s²'],
      correctIndex: 0,
      explanations: [
        'Correct: acceleration comes from the NET force — 10 − 2 = 8 N, so a = F/m = 8/4 = 2 m/s².',
        '2.5 is 10/4 — that ignores friction. Forces add as vectors first: the net push is 10 − 2 = 8 N.',
        '3 is (10 + 2)/4 — friction opposes the motion here, so it subtracts from the motor’s push, not adds.',
        '32 is 8 × 4 — that computes F = m·a with the roles flipped. To get acceleration you DIVIDE net force by mass: a = F/m.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A warehouse rover cruises across flat ground at a perfectly constant 1.5 m/s. What is the net force on it?',
      options: [
        'Zero — the motor’s push exactly balances friction',
        'A constant forward force, needed to keep it moving',
        'A force equal to its weight',
        'm × v = its mass times 1.5',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: constant velocity means zero acceleration, so the net force is zero — the motor’s push and friction cancel exactly. The motor fights friction, not inertia.',
        'The classic pre-Newton trap — motion doesn’t need a net force, CHANGING motion does. The motor’s force is real, but friction cancels it, leaving zero net.',
        'Weight pulls down and the ground pushes up — those cancel too. Neither has anything to do with the steady forward glide.',
        'm·v is momentum, not force. Force relates to acceleration (F = m·a), and here acceleration is zero.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Your robot arm pushes a heavy 40 kg crate with 50 N, but the crate doesn’t budge. How hard does the crate push back on the arm?',
      options: [
        'Exactly 50 N',
        'Less than 50 N — that’s why it doesn’t move',
        'More than 50 N, because it’s heavier than the arm',
        'Zero — a stationary object exerts no force',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: third law — reaction forces are ALWAYS equal and opposite, regardless of mass or motion. The crate stays put because friction with the floor cancels the push, not because it pushes back weakly.',
        'Action-reaction pairs are never unequal. What stops the crate is a THIRD force — floor friction — not a weak reaction.',
        'Mass never enters the third law — a fly pushes back on a truck exactly as hard as the truck pushes on it. The reaction is 50 N.',
        'Stationary objects push back all the time — a wall pushes on your hand the instant you push on it. Equal and opposite, always.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A drone releases a 1 kg package and a 5 kg package at the same instant (ignore air resistance). Which hits the ground first?',
      options: [
        'They land together — same acceleration',
        'The 5 kg one — gravity pulls it harder',
        'The 1 kg one — it’s easier to accelerate',
        'The 5 kg one, but only from high altitude',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: gravity DOES pull the 5 kg one five times harder, but it also has five times the inertia — a = F/m, and the two effects cancel exactly. Everything falls with the same acceleration.',
        'Half right: the force IS bigger. But the mass in a = F/m is bigger by the same factor, so the acceleration comes out identical.',
        'Lighter is easier to accelerate per newton — but gravity supplies proportionally fewer newtons to it. The ratio F/m is the same for both.',
        'Altitude changes nothing about the tie — with no air resistance, equal acceleration means equal fall time from any height.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Kinetic energy is ½·m·v². How much kinetic energy does a 2 kg robot moving at 3 m/s carry?',
      options: ['9 J', '6 J', '18 J', '3 J'],
      correctIndex: 0,
      explanations: [
        'Correct: ½ × 2 × 3² = ½ × 2 × 9 = 9 J. Square the speed first, then multiply.',
        '6 is m × v — that’s momentum, not energy. Kinetic energy squares the velocity: ½ × 2 × 9 = 9 J.',
        '18 is m × v² — you dropped the ½. Halve it: 9 J.',
        '3 is ½ × 2 × 3 — the speed must be SQUARED before multiplying. That square is why doubling speed quadruples crash energy.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Your robot must run a 3-hour patrol drawing a steady 20 W. What’s the smallest battery (in energy) that survives the mission?',
      options: ['60 Wh', '6.7 Wh', '23 Wh', '20 Wh'],
      correctIndex: 0,
      explanations: [
        'Correct: energy = power × time = 20 W × 3 h = 60 Wh. Runtime ÷-logic run backwards — the mission’s energy bill.',
        '6.7 is 20 ÷ 3 — dividing gives runtime-style units, but here you need TOTAL energy: power × time = 60 Wh.',
        '23 is 20 + 3 — watts and hours don’t add; they multiply into watt-hours: 60 Wh.',
        '20 Wh confuses power with energy — 20 W is the RATE of spending; over 3 hours it spends 60 Wh.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Your robot brakes hard from full speed to a stop. Where did its kinetic energy go?',
      options: [
        'It became heat in the brakes, motors and tyres',
        'It was destroyed — the robot stopped, so the energy ended',
        'It automatically flowed back into the battery',
        'It converted into potential energy',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: energy is conserved, so the motion energy has to GO somewhere — friction in braking turns it into heat. That’s why brakes get hot.',
        'Energy is never destroyed — it converts. The speed is gone, but every joule of it now warms the brakes and the air.',
        'That’s regenerative braking, and it needs special hardware to run the motors as generators — ordinary friction braking just makes heat.',
        'Potential energy would require gaining height (or charging something) — braking flat on the ground stores nothing; it dissipates as heat.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A 12 V battery must be limited to 2 A through a test motor. What series resistance does the circuit need in total?',
      options: ['6 Ω', '24 Ω', '10 Ω', '14 Ω'],
      correctIndex: 0,
      explanations: [
        'Correct: R = V/I = 12/2 = 6 Ω. The third rearrangement of Ohm’s law — solve for the one you don’t know.',
        '24 is 12 × 2 — multiplying V by I gives power (24 W), not resistance. Resistance is V ÷ I = 6 Ω.',
        '10 is 12 − 2 — volts and amps don’t subtract. Ohm’s law divides: 12/2 = 6 Ω.',
        '14 is 12 + 2 — adding mixes units. R = V/I = 6 Ω.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A sensor board runs at 5 V and draws 0.5 A. How much power does it consume?',
      options: ['2.5 W', '10 W', '5.5 W', '0.1 W'],
      correctIndex: 0,
      explanations: [
        'Correct: P = V·I = 5 × 0.5 = 2.5 W. Small board, small budget — but it still counts against the battery.',
        '10 is 5 ÷ 0.5 — dividing gives resistance-flavoured nonsense here. Power MULTIPLIES: 5 × 0.5 = 2.5 W.',
        '5.5 is 5 + 0.5 — volts and amps multiply into watts, they never add. P = 2.5 W.',
        '0.1 is 0.5 ÷ 5 — that’s I/V, the inverse of resistance. Power is the product: 2.5 W.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A wire carries 2 A INTO a running motor. How much current flows OUT of the motor’s other terminal, back toward the battery?',
      options: [
        'Exactly 2 A — current isn’t consumed',
        'Less than 2 A — the motor uses some up',
        '0 A — the motor absorbs all of it',
        'It depends on the voltage',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: charge flows in a loop and none goes missing — the same 2 A leaves as enters. What the motor spends is ENERGY (each charge arrives with more energy than it leaves with), not current.',
        'The classic “current gets used up” trap — the flow is like water in a closed loop, identical everywhere in a series path. The motor drains energy from the charge, not the charge itself.',
        'If 0 A came out, charge would pile up inside the motor forever — circuits are loops, and the flow rate matches all the way around.',
        'Voltage sets HOW MUCH current flows in the first place (I = V/R), but whatever flows in one terminal flows out the other — series current is the same everywhere.',
      ],
    },
  ],
}
