import type { Lesson } from '../../types'

export const elecExamLesson: Lesson = {
  nodeId: 'elec-exam',
  screens: [
    {
      kind: 'explain',
      title: 'Module exam — from divider to motor',
      body: [
        'Ten fresh questions across the whole Electronics module — dividers and loading, KCL, the op-amp’s golden rules and gains, the MOSFET switch, the H-bridge, PWM and the flyback diode. All NEW, no repeats from the lessons, answered from memory.',
        'Score 80% and the module is sealed. Below that? You lose nothing — you’ll see exactly which idea slipped, review it, and retake.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A divider has Vin = 10 V, R₁ = 3 kΩ (top) and R₂ = 2 kΩ (bottom). What is Vout, unloaded?',
      options: ['4 V', '6 V', '5 V', '2 V'],
      correctIndex: 0,
      explanations: [
        'Correct: Vout = Vin·R₂/(R₁+R₂) = 10·2/(3+2) = 10·0.4 = 4 V.',
        '6 V is the voltage across R₁ (the top resistor), not the tapped output across R₂.',
        '5 V assumes equal resistors, but here R₁ ≠ R₂ so the split isn’t 1/2.',
        '2 V uses R₂ alone without the ratio; you must divide by (R₁+R₂) = 5 kΩ.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'At a circuit node, 3 A flows in from one wire and 1 A flows in from another. By Kirchhoff’s current law, what must the total current leaving the node be?',
      options: ['4 A', '2 A', '3 A', '0 A'],
      correctIndex: 0,
      explanations: [
        'Correct: KCL says current in equals current out — 3 + 1 = 4 A must leave (charge is conserved at a node).',
        '2 A is the difference; KCL sums the inflows, giving 4 A out.',
        '3 A ignores the second inflow; both 3 A and 1 A enter, so 4 A leaves.',
        '0 A would violate conservation — 4 A entered, so 4 A must exit.',
      ],
    },
    {
      kind: 'quiz',
      question: 'An inverting amplifier has Rin = 2 kΩ, Rf = 8 kΩ, and Vin = +1 V. What is the output?',
      options: ['−4 V', '+4 V', '+5 V', '−0.25 V'],
      correctIndex: 0,
      explanations: [
        'Correct: inverting gain A = −Rf/Rin = −8/2 = −4, so Vout = −4·1 = −4 V.',
        'The inverting configuration flips the sign — a positive input gives a NEGATIVE output.',
        '+5 V would be the non-inverting result (1 + Rf/Rin = 5); this is the inverting amp.',
        '−0.25 V inverts the ratio; the gain multiplies by Rf/Rin = 4, not divides.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A non-inverting amplifier is built with Rin = 1 kΩ and Rf = 4 kΩ. What is its gain?',
      options: ['5', '4', '−4', '0.2'],
      correctIndex: 0,
      explanations: [
        'Correct: non-inverting gain A = 1 + Rf/Rin = 1 + 4 = 5.',
        '4 forgets the “+1” that defines the non-inverting formula.',
        'Non-inverting keeps the sign positive; −4 would be an inverting magnitude (and misses the +1).',
        '0.2 inverts the ratio; the gain is 1 + Rf/Rin, which multiplies to 5.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'An N-channel MOSFET has threshold V_th = 2.5 V. Its gate is at V_GS = 1 V. What state is it in?',
      options: [
        'Off — V_GS is below the threshold, so no channel forms',
        'Fully on — any positive gate voltage conducts',
        'In its linear amplifying region',
        'Conducting in reverse',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: V_GS (1 V) is below V_th (2.5 V), so the channel hasn’t formed — the MOSFET is off.',
        'It only turns on once V_GS EXCEEDS the threshold, not for any positive voltage.',
        'The amplifying region requires V_GS above threshold with the right drain conditions; below threshold it’s simply off.',
        'Below threshold there’s no conduction at all, forward or reverse.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Which pair of statements are the ideal op-amp’s two golden rules (with negative feedback)?',
      options: [
        'No current enters the inputs; feedback forces the two inputs to equal voltages',
        'The output equals the supply; the inputs are always at ground',
        'The inputs draw large currents; the output is fixed at zero',
        'The gain is exactly 1; the inputs are always opposite',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: infinite input impedance ⇒ zero input current, and huge feedback gain ⇒ the inputs are driven equal. All op-amp circuit analysis flows from these.',
        'The output is set by feedback, not pinned to the supply, and the inputs are equal (not necessarily at ground).',
        'Input current is essentially ZERO, the opposite of large.',
        'Closed-loop gain is set by resistors, not fixed at 1, and feedback makes the inputs EQUAL, not opposite.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'On a 20 V supply, a PWM signal runs at 30% duty cycle into a motor. What average voltage does the motor effectively see?',
      options: ['6 V', '14 V', '10 V', '20 V'],
      correctIndex: 0,
      explanations: [
        'Correct: Vavg = duty · Vsupply = 0.30 · 20 = 6 V.',
        '14 V is the 70% (off-fraction) value; the on-fraction is 30%.',
        '10 V would be a 50% duty cycle, not 30%.',
        '20 V is 100% duty (always on); 30% delivers less.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why is a flyback diode placed across an inductive load like a motor?',
      options: [
        'To give the inductor’s current a safe path when the switch opens, clamping the V = L·di/dt spike',
        'To boost the motor’s torque',
        'To rectify AC into DC',
        'To limit the steady-state current',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: switching an inductor off makes its current spike; the diode lets that current circulate and decay, protecting the transistor from the voltage kick.',
        'The diode is protective; it doesn’t add torque.',
        'The motor already runs on switched DC — the diode’s role is transient protection, not rectification.',
        'Steady current is set by the motor and supply; the diode only matters at the switching transient.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In an H-bridge, closing BOTH switches on the same side (top and bottom of one leg) causes…',
      options: [
        'Shoot-through — a destructive short from supply to ground through the two transistors',
        'The motor to spin forward at full speed',
        'Dynamic braking with no risk',
        'The flyback diodes to charge the motor',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: both switches on one leg on at once is a direct low-resistance path from supply to ground — a huge current that can destroy the transistors; dead-time exists to prevent it.',
        'Forward drive uses a DIAGONAL pair, not both switches on one side.',
        'That would be a destructive short, not safe braking (braking shorts the motor terminals via the two low-side or two high-side switches).',
        'Shoot-through is a fault, not a charging mechanism.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A capacitor charges through a resistor with time constant τ = R·C. After ONE time constant, roughly what fraction of the final voltage has it reached?',
      options: ['About 63%', 'About 100%', 'About 37%', 'About 50%'],
      correctIndex: 0,
      explanations: [
        'Correct: V(t) = Vfinal·(1 − e^(−t/τ)), and at t = τ that’s 1 − e^(−1) ≈ 0.63, so ~63%.',
        'It takes about 5 time constants to reach ~99–100%, not one.',
        '37% is what REMAINS (e^(−1)); the fraction CHARGED is 1 − 0.37 = 63%.',
        '50% is reached at about 0.69·τ, a bit before one full time constant.',
      ],
    },
  ],
}
