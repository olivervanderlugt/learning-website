import type { Lesson } from '../../types'

export const physExamLesson: Lesson = {
  nodeId: 'phys-exam',
  screens: [
    {
      kind: 'explain',
      title: 'Module exam — the laws your robot obeys',
      body: [
        'Twenty-three questions spanning first-principles reasoning, forces, kinematics, momentum, rotation, energy, Ohm’s law, Kirchhoff, dividers, RC/induction and statics (equilibrium, stress/strain, bending) — all NEW scenarios, no repeats from the lesson quizzes. No sims, no notes: pure retrieval from memory.',
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
    {
      kind: 'quiz',
      question:
        'A rover decelerates steadily from 8 m/s to a full stop over 4 seconds. How far does it travel while braking?',
      options: ['16 m', '32 m', '8 m', '24 m'],
      correctIndex: 0,
      explanations: [
        'Correct: with constant deceleration, average speed is (8+0)/2 = 4 m/s; distance = 4 × 4 = 16 m.',
        '32 m treats the speed as a constant 8 m/s the whole time — but it’s slowing to a stop, so you need the AVERAGE speed, 4 m/s, not the starting speed.',
        '8 m divides the correct answer by 2 again — the average-speed method already accounts for the slow-down once.',
        '24 m overcounts — the correct average speed is (8+0)/2 = 4 m/s, giving 4 × 4 = 16 m, not 24.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A robot launches a small dart horizontally at 6 m/s off a shelf 1.25 m above the floor (use g = 10 m/s²). How far from the shelf does it land?',
      options: ['3.0 m', '1.25 m', '6.0 m', '12 m'],
      correctIndex: 0,
      explanations: [
        'Correct: fall time comes from the VERTICAL drop alone: 1.25 = ½×10×t² → t = 0.5 s. Horizontal distance = 6 × 0.5 = 3.0 m.',
        '1.25 m is just the shelf height — that number describes how far it falls, not how far it travels sideways.',
        '6.0 m is the horizontal speed by itself, skipping the step of finding how LONG the fall actually takes.',
        '12 m would need a 2-second fall — but 1.25 m only takes 0.5 s to fall at g = 10 m/s², not 2 s.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A 2 kg robot-arm segment moving at 3 m/s collides and sticks to a stationary 4 kg segment. What is their combined speed afterward?',
      options: ['1 m/s', '1.5 m/s', '3 m/s', '0.5 m/s'],
      correctIndex: 0,
      explanations: [
        'Correct: total momentum = 2×3 + 4×0 = 6 kg·m/s; combined mass = 6 kg; v = 6/6 = 1 m/s.',
        '1.5 m/s divides the momentum by the WRONG mass (4 kg instead of the combined 6 kg).',
        '3 m/s would mean the collision changed nothing — but the momentum must now move a heavier combined mass, so it slows.',
        '0.5 m/s divides the momentum by too much mass — the correct total is 6 kg, giving 1 m/s.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You apply a 5 N force perpendicular to a wrench, 0.3 m from the bolt. What torque does that produce?',
      options: ['1.5 N·m', '15 N·m', '5.3 N·m', '0.06 N·m'],
      correctIndex: 0,
      explanations: [
        'Correct: torque = lever arm × force = 0.3 × 5 = 1.5 N·m.',
        '15 N·m is off by a factor of 10 — likely misreading 0.3 m as 3 m. τ = 0.3 × 5 = 1.5 N·m.',
        '5.3 N·m comes from ADDING the lever arm and force (0.3 + 5) — torque MULTIPLIES them.',
        '0.06 N·m comes from dividing (0.3 ÷ 5) instead of multiplying — torque is r × F = 1.5 N·m.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A 9 V supply feeds a divider: R₁ = 2 kΩ on top, R₂ = 1 kΩ on the bottom, output tapped across R₂. What is Vout?',
      options: ['3 V', '6 V', '4.5 V', '9 V'],
      correctIndex: 0,
      explanations: [
        'Correct: Vout = 9 · R₂/(R₁+R₂) = 9 · 1000/3000 = 9 · 1/3 = 3 V.',
        '6 V is what the TOP resistor R₁ drops (2/3 of 9); the output across R₂ gets the remaining 3 V.',
        '4.5 V would be the equal-resistor (half) case; here R₁ is twice R₂, so R₂’s share is a third.',
        '9 V is the full supply — a divider always outputs a fraction of it.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'At a wiring junction, 6 A flows in and one branch carries 4 A out. By Kirchhoff’s current law, what does the other branch carry?',
      options: ['2 A out', '10 A out', '6 A out', '2 A in'],
      correctIndex: 0,
      explanations: [
        'Correct: KCL — current in (6 A) equals current out, so the second branch carries 6 − 4 = 2 A out.',
        '10 A adds inflow and outflow; they must BALANCE, not sum — total out equals the 6 A in.',
        '6 A out would ignore the 4 A already leaving on the first branch — only 2 A remains.',
        'It flows OUT: the 6 A inflow must exit, and 4 A + 2 A = 6 A accounts for it.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A capacitor charges through a resistor with time constant RC = 3 s. After 3 seconds it is approximately…',
      options: [
        '63% charged',
        '100% charged',
        '50% charged',
        '33% charged',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: after exactly one time constant (t = RC), the capacitor reaches Vin·(1 − e⁻¹) ≈ 63% of full.',
        'Full charge (~99%) takes about five time constants, not one.',
        '50% is a common guess, but the exponential curve passes 63% at one time constant, not half.',
        '33% underestimates it — the fast early rise reaches 63% by one RC.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A DC motor is switched on and briefly draws a large current spike before settling lower. What causes the spike to fade?',
      options: [
        'As it spins up it generates a back-EMF that opposes the supply, throttling the current',
        'The battery voltage drops permanently',
        'The motor’s resistance grows as it warms',
        'Friction cancels the current',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a spinning motor acts as a generator, producing a back-EMF that opposes the supply; at startup there’s no spin, so nothing limits the inrush.',
        'The supply voltage is set by the battery, not by the motor spinning up.',
        'Warming changes resistance only slightly; the dominant effect is the rising back-EMF from rotation.',
        'Friction is mechanical — the electrical current is throttled by the induced back-EMF, not friction.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A 6 m beam rests on supports A (left) and B (right). A 600 N load sits 2 m from A. Taking moments about A, what is the reaction at B?',
      options: ['200 N', '400 N', '600 N', '300 N'],
      correctIndex: 0,
      explanations: [
        'Correct: moments about A give R_B·6 = 600·2, so R_B = 1200/6 = 200 N (and R_A = 400 N).',
        '400 N is the reaction at A (the closer support), not B.',
        '600 N is the whole load; the two supports share it.',
        '300 N would be an even split, but the load is at 2 m, not the 3 m midpoint.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A steel rod under a 20 kN load has a cross-sectional area of 2 cm² (2×10⁻⁴ m²). What is the axial stress?',
      options: ['100 MPa', '40 MPa', '10 MPa', '400 MPa'],
      correctIndex: 0,
      explanations: [
        'Correct: σ = F/A = 20000 / (2×10⁻⁴) = 1×10⁸ Pa = 100 MPa.',
        '40 MPa uses the wrong area; 20000/(2×10⁻⁴) = 10⁸ Pa = 100 MPa.',
        '10 MPa is off by a factor of 10 — recheck 20000/(2×10⁻⁴).',
        '400 MPa would need a quarter of the area; here it’s 100 MPa.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A steel bracket is loaded until the stress exceeds its yield strength, then unloaded. What is its condition?',
      options: [
        'Permanently deformed — past yield the deformation is plastic and does not spring back',
        'Back to its exact original shape',
        'Fractured into pieces',
        'Unchanged — steel never yields',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: beyond the yield point deformation becomes plastic (permanent), so the bracket stays bent even after the load is removed.',
        'Full recovery happens only if the stress stayed BELOW yield (elastic region).',
        'Fracture is beyond the higher ultimate strength; just past yield it’s bent, not broken.',
        'Steel yields once stress passes its yield strength — that’s exactly what happened here.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'To make a rectangular beam much stiffer in bending, which change helps MOST (its second moment of area is I = b·h³/12)?',
      options: [
        'Increase its depth h — I grows with the cube of depth',
        'Increase its width b — that has the biggest effect',
        'Make it shorter in width only',
        'Depth and width help exactly equally',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: I ∝ h³, so adding depth is far more effective than adding width (which only helps linearly) — the reason beams are tall and I-beams put material in the flanges.',
        'Width b appears to the first power in I; depth’s cube dependence beats it decisively.',
        'Reducing width lowers stiffness; you want more depth for bending resistance.',
        'They are not equal — h enters as a cube, b only linearly.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A car’s braking distance follows d ∝ v² (distance grows with the square of speed). At 50 km/h it needs 12 m to stop. Reasoning from first principles, roughly how far does it need at 100 km/h?',
      options: [
        '48 m — doubling the speed quadruples the distance (2² = 4)',
        '24 m — double the speed, double the distance',
        '12 m — braking distance doesn’t change',
        '36 m — three times the distance',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: d ∝ v², so 2× the speed is 2² = 4× the distance → 12 × 4 = 48 m. The “double→double” analogy badly underestimates it, which is why speed is so dangerous.',
        '24 m assumes distance is proportional to speed — but the v² law makes it grow with the SQUARE, so doubling speed quadruples distance.',
        'Braking distance depends strongly on speed through v²; it very much changes.',
        '36 m is 3×, but doubling the speed gives 2² = 4×, not 3× — read the exponent.',
      ],
    },
  ],
}
