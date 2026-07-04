import type { Lesson } from '../../types'

export const physElectricityLesson: Lesson = {
  nodeId: 'phys-electricity',
  screens: [
    {
      kind: 'explain',
      title: 'The stuff your robot runs on',
      body: [
        'Every gate you built, every sensor, every motor — all of it is moving electric charge through circuits. Electricity is the lifeblood of a robot.',
        'Three quantities describe it. Voltage (volts) is the push. Current (amps) is the flow of charge. Resistance (ohms) is how much the path fights the flow.',
        'A water analogy: voltage is water pressure, current is the flow rate, resistance is a narrow pipe.',
      ],
    },
    {
      kind: 'predict',
      question:
        'In a circuit you increase the voltage (push harder) while keeping the resistance the same. What happens to the current (flow)?',
      options: [
        'Current increases',
        'Current decreases',
        'Current stays the same',
        'Current stops',
      ],
      correctIndex: 0,
      reveal:
        'More push, more flow: current increases. This is Ohm’s law, V = I·R — rearranged, I = V/R. Voltage and current rise together (for fixed resistance); more resistance chokes the flow. You’ll dial all three next.',
    },
    {
      kind: 'explain',
      title: 'Ohm’s law: V = I·R',
      body: [
        'Ohm’s law ties the three together: Voltage = Current × Resistance. Know any two and you can find the third.',
        'It’s the single most-used equation in electronics — you’ll reach for it every time you pick a resistor or size a motor.',
        'Build the circuit and hit a target current.',
      ],
    },
    { kind: 'game', gameId: 'ohms-law-sim' },
    {
      kind: 'predict',
      question:
        'Your robot’s battery delivers 12 V and a stalled motor draws 4 A. Power is P = V·I. How much power is it burning?',
      options: ['48 watts', '3 watts', '16 watts', '8 watts'],
      correctIndex: 0,
      reveal:
        'P = V·I = 12 × 4 = 48 W — a lot, and it all becomes heat in a stalled motor, which is how motors burn out. Power (watts) is the rate of energy use; it’s why battery life and motor heat are constant design worries in robotics.',
    },
    {
      kind: 'explain',
      title: 'From Ohm’s law to motors',
      body: [
        'Remember the H-bridge from the gates lesson — four transistor switches that drive a motor forwards or backwards? Ohm’s law governs exactly how much current flows through it.',
        'Too much current melts wires; too little and the motor is weak. Every robot is a balancing act of volts, amps and ohms.',
        'Quiz time — from memory.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does Ohm’s law state?',
      options: [
        'Voltage = Current × Resistance (V = I·R)',
        'Power = Voltage × Resistance',
        'Current = Voltage × Resistance',
        'Voltage = Current ÷ Resistance',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: V = I·R. From it, I = V/R and R = V/I — the three forms you’ll use constantly.',
        'That mixes up the formulas — power is P = V·I. Ohm’s law relates voltage, current and resistance as V = I·R.',
        'Current is voltage DIVIDED by resistance (I = V/R), not multiplied — more resistance means less current.',
        'It’s a product, not a quotient: V = I·R. Dividing would say more resistance raises voltage, which isn’t the relationship.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A 9 V supply drives a 3 Ω resistor. What current flows?',
      options: ['3 A', '27 A', '6 A', '12 A'],
      correctIndex: 0,
      explanations: [
        'Correct: I = V/R = 9 / 3 = 3 A.',
        '27 is 9 × 3 — that would be voltage × resistance, not current. Current is V ÷ R = 3 A.',
        '6 comes from 9 − 3; Ohm’s law divides: 9 / 3 = 3 A.',
        '12 is 9 + 3; the relationship is division, giving 3 A.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Keeping voltage fixed, if you increase resistance, current…',
      options: ['Decreases', 'Increases', 'Stays the same', 'Doubles'],
      correctIndex: 0,
      explanations: [
        'Correct: I = V/R — resistance is in the denominator, so more resistance means less current (a narrower pipe throttles the flow).',
        'More resistance fights the flow harder, so current drops, not rises. Increasing current needs more voltage or less resistance.',
        'Current depends on resistance through I = V/R — change R and current changes too.',
        'Doubling resistance actually HALVES the current (for fixed voltage), not doubles it.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does a stalled motor drawing high current get dangerously hot?',
      options: [
        'Power (P = V·I) turns into heat, and high current means high power',
        'Stalling reverses the voltage',
        'Heat comes from the motor spinning fast',
        'Resistance disappears when stalled',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: P = V·I, so large current at the supply voltage dumps lots of power as heat into a motor that isn’t moving to shed it.',
        'The voltage doesn’t reverse — a stall means the motor can’t spin, its resistance is low, so current (and heat) spike.',
        'A stalled motor isn’t spinning at all — the heat comes from high current through low resistance, not motion.',
        'Resistance doesn’t vanish; a stalled motor has LOW resistance, which is exactly why current runs high.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Voltage, current and resistance map to which water analogy?',
      options: [
        'Pressure, flow rate, pipe narrowness',
        'Temperature, volume, colour',
        'Depth, salt, waves',
        'They don’t map to anything physical',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: voltage is like pressure (the push), current is the flow rate, resistance is how narrow the pipe is — a genuinely useful mental model.',
        'Those quantities don’t capture push/flow/restriction — the classic analogy is pressure, flow, and pipe width.',
        'Not the right mapping — think pressure driving flow through a pipe whose narrowness resists it.',
        'The analogy is real and helpful: pressure→voltage, flow→current, narrowness→resistance, and it even respects V = I·R.',
      ],
    },
  ],
}
