import type { Lesson } from '../../types'

export const elecTransistorsLesson: Lesson = {
  nodeId: 'elec-transistors',
  screens: [
    {
      kind: 'explain',
      title: 'A tiny signal controlling a big current',
      body: [
        'A transistor is a valve: a small voltage or current at its control terminal governs a much larger current through its main path. That one idea powers both digital logic and analog amplification.',
        'Used as a SWITCH, it is fully off (no current) or fully on (a near-short with a small on-resistance R_DS(on)). A MOSFET turns on when its gate-source voltage V_GS climbs past a threshold V_th — below it, off; well above it, on.',
        'Used as an AMPLIFIER, the transistor operates in between, where a small change in the control produces a proportional, larger change in the output current — the seed of every analog amplifier.',
      ],
      deeper: [
        'This is exactly the switch you built gates from — and the same device an H-bridge uses to drive a motor. A microcontroller pin can only source a few milliamps; a MOSFET lets that tiny pin current switch amps of motor or LED-array current. The digital world lives in the fully-on/fully-off extremes (fast, low-power); the analog world lives in the linear middle (amplifiers, sensors), where the same transistor behaves completely differently.',
      ],
      links: [{ nodeId: 'phys-electricity-3', label: 'Refresher: the transistor as a switch' }],
    },
    {
      kind: 'predict',
      question:
        'An N-channel MOSFET has threshold V_th = 2 V. Its gate is driven to V_GS = 0.5 V. Is it conducting?',
      options: [
        'No — V_GS (0.5 V) is below the threshold (2 V), so the MOSFET is off (essentially an open switch)',
        'Yes — any positive gate voltage turns it fully on',
        'It is half-on, passing exactly half the current',
        'It conducts, but only in reverse',
      ],
      correctIndex: 0,
      reveal:
        'A MOSFET stays OFF until V_GS exceeds V_th. At 0.5 V, well below the 2 V threshold, the channel hasn’t formed — it’s an open switch. You’d need to drive the gate several volts ABOVE 2 V to get it solidly on with a low R_DS(on). That threshold behavior is exactly what makes it a clean digital switch.',
    },
    {
      kind: 'explain',
      title: 'The op-amp and its two golden rules',
      body: [
        'An operational amplifier is a near-ideal amplifier: enormous gain, near-infinite input impedance (it draws no input current), near-zero output impedance. On its own that huge gain is unusable — but wrap it in NEGATIVE FEEDBACK and it becomes precise and predictable.',
        'Two golden rules make feedback circuits trivial to analyze: (1) no current flows into either input; (2) the feedback drives the two inputs to the SAME voltage. From just those, gain becomes a ratio of two resistors.',
        'Inverting amp: A = −Rf/Rin (output flips sign). Non-inverting amp: A = 1 + Rf/Rin (same sign, always ≥ 1). The op-amp does whatever it must at its output to keep its inputs equal.',
      ],
      deeper: [
        'In the inverting configuration the “+” input is grounded, so rule 2 forces the “−” input to 0 V too — a VIRTUAL GROUND: it sits at 0 V without being physically connected to ground. Current Vin/Rin flows into that node, and since rule 1 says none enters the op-amp, it all continues through Rf, producing Vout = −(Rf/Rin)·Vin. A non-inverting amp instead feeds the input straight to “+”, and the feedback divider sets the gain to 1 + Rf/Rin — which can never go below 1 (a gain of exactly 1 is the unity buffer that fixes divider loading).',
      ],
      links: [{ nodeId: 'elec-components', label: 'Why buffer: divider loading' }],
    },
    {
      kind: 'predict',
      question:
        'An inverting amplifier has Rin = 1 kΩ and Rf = 10 kΩ, with Vin = +0.2 V. What is the output?',
      options: [
        '−2 V — gain is −Rf/Rin = −10, times +0.2 V',
        '+2 V — gain is +10, output keeps the sign',
        '+0.2 V — the amplifier passes it through unchanged',
        '−0.02 V — divide instead of multiply',
      ],
      correctIndex: 0,
      reveal:
        'The inverting gain is A = −Rf/Rin = −10/1 = −10. So Vout = −10 · 0.2 = −2 V. The minus sign is the “inverting” part — a positive input yields a negative output — and the magnitude is set purely by the resistor ratio 10:1. Swap to the non-inverting config and the same resistors would give 1 + 10 = 11× with the sign kept.',
    },
    {
      kind: 'code',
      prompt:
        'Compute both op-amp gains from the two golden rules. Inverting: A = −Rf/Rin. Non-inverting: A = 1 + Rf/Rin. Fill in the non-inverting output, then compare the two for the same input and resistors.',
      starter: `function invertingOut(Vin, Rf, Rin) {
  return (-Rf / Rin) * Vin
}
function nonInvertingOut(Vin, Rf, Rin) {
  return 0 // fill in: (1 + Rf / Rin) * Vin
}
const Vin = 0.5, Rf = 10000, Rin = 2000
print('inverting:     ' + invertingOut(Vin, Rf, Rin).toFixed(2))
print('non-inverting: ' + nonInvertingOut(Vin, Rf, Rin).toFixed(2))`,
      expected: `inverting:     -2.50
non-inverting: 3.00`,
      hint: 'Non-inverting gain adds 1 to the ratio: (1 + Rf / Rin) * Vin. With Rf/Rin = 5 that’s a gain of 6.',
      success:
        'Same resistors (Rf/Rin = 5), two different amplifiers: inverting gives −5× → −2.50 V, non-inverting gives (1+5) = 6× → +3.00 V. The resistor RATIO sets the gain and the topology sets the sign and the “+1”. This two-resistor control is why op-amps condition almost every analog sensor signal before it reaches an ADC.',
    },
    {
      kind: 'quiz',
      question: 'What are the two “golden rules” for an ideal op-amp with negative feedback?',
      options: [
        'No current flows into the inputs, and feedback forces the two inputs to the same voltage',
        'The output equals the supply, and the inputs are always 0 V',
        'Infinite current flows into the inputs, and the output is always 0',
        'The gain is exactly 1, and the inputs are opposite in sign',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: infinite input impedance ⇒ no input current, and huge gain under feedback ⇒ the op-amp drives its output until the two inputs match. Everything else follows from these two.',
        'The output is set by the feedback, not pinned to the supply, and the inputs equal each other (often not 0).',
        'Input current is essentially ZERO (infinite input impedance), the opposite of infinite.',
        'The closed-loop gain is set by the resistors, not fixed at 1, and feedback makes the inputs EQUAL, not opposite.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In an inverting amplifier, the “−” input sits at a “virtual ground.” What does that mean?',
      options: [
        'The feedback holds it at 0 V (because “+” is grounded) even though it isn’t physically wired to ground',
        'It is short-circuited directly to ground with a wire',
        'It floats to whatever voltage the input happens to be',
        'It is connected to the negative supply rail',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: with “+” grounded, golden rule 2 forces “−” to 0 V too — a virtual ground that carries the input current on to Rf without a physical ground connection.',
        'It is NOT physically grounded — that’s the whole point of the word “virtual”; the feedback maintains 0 V.',
        'Feedback pins it at 0 V; it doesn’t float with the input.',
        'It sits at 0 V (matching the grounded “+”), not at the negative rail.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A non-inverting amplifier has Rf = 0 (a wire) and Rin = ∞ (open). What is its gain?',
      options: [
        '1 — it becomes a unity-gain buffer (voltage follower)',
        '0 — no output at all',
        'Infinite — the op-amp saturates',
        '−1 — it inverts the signal',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: A = 1 + Rf/Rin = 1 + 0 = 1. The output follows the input exactly — a buffer that draws no input current but drives a load, the fix for divider loading.',
        'Gain 1 means the output equals the input, not zero.',
        'The non-inverting gain floors at 1 and here equals exactly 1 — no saturation from the formula.',
        'Non-inverting keeps the sign; it never inverts. Gain is +1.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does a microcontroller pin use a MOSFET to switch a motor or a bank of LEDs?',
      options: [
        'The pin can only source a few milliamps; the MOSFET lets that tiny gate signal switch amps of load current',
        'The MOSFET generates extra voltage for the load',
        'The pin needs the MOSFET to measure temperature',
        'A MOSFET is required to make the pin output digital',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a logic pin can’t supply motor-level current, but it CAN drive a MOSFET gate (near-zero current), and the MOSFET then carries the heavy load current — small signal controls big power.',
        'The MOSFET switches current from the supply; it doesn’t create voltage.',
        'Switching power has nothing to do with temperature measurement.',
        'The pin is already digital; the MOSFET is about current capacity, not logic levels.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A non-inverting amplifier has Rin = 1 kΩ, Rf = 3 kΩ, Vin = 1 V. What is Vout?',
      options: ['4 V', '3 V', '−3 V', '0.25 V'],
      correctIndex: 0,
      explanations: [
        'Correct: A = 1 + Rf/Rin = 1 + 3 = 4, so Vout = 4·1 = 4 V.',
        '3 V forgets the “+1” of the non-inverting formula (that would be −Rf/Rin magnitude).',
        'Non-inverting keeps the sign positive; −3 V would be an inverting result (and still misses the +1).',
        '0.25 V inverts the ratio; the gain multiplies, giving 4, not 1/4.',
      ],
    },
    {
      question: 'An N-channel MOSFET has V_th = 2 V. Which gate drive turns it solidly ON?',
      options: [
        'V_GS = 10 V (well above the threshold)',
        'V_GS = 0 V',
        'V_GS = 1 V',
        'V_GS = −5 V',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: driving V_GS well above V_th forms a strong channel with low R_DS(on) — solidly on.',
        'At 0 V the gate is below threshold — the MOSFET is off.',
        '1 V is below the 2 V threshold — still off.',
        'A negative V_GS is further from turning on an N-channel device — firmly off.',
      ],
    },
    {
      question: 'What is the purpose of NEGATIVE feedback around an op-amp?',
      options: [
        'It tames the huge open-loop gain into a precise, stable gain set by external resistors',
        'It maximizes the gain to infinity',
        'It disconnects the inputs from the output',
        'It converts the op-amp into a pure switch',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: feeding the output back to the “−” input makes the op-amp self-correct, trading raw gain for an accurate resistor-set gain and stability.',
        'Feedback REDUCES the effective gain to a controlled value — the opposite of maximizing it.',
        'Feedback is precisely the CONNECTION from output back to an input; it doesn’t disconnect them.',
        'Feedback gives linear, proportional amplification — the switch behavior is the open-loop comparator use, without feedback.',
      ],
    },
    {
      question:
        'An op-amp with NO feedback (open loop) is fed +0.01 V on “+” and 0 V on “−”. What does the output do?',
      options: [
        'Slams to its positive rail — with no feedback, the enormous gain saturates it (this is a comparator)',
        'Outputs exactly +0.01 V',
        'Outputs 0 V',
        'Outputs a controlled +10× = 0.1 V',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: open-loop gain is huge, so any tiny positive difference drives the output hard to the positive rail — that’s how an op-amp acts as a comparator.',
        'Passing the input unchanged would need a unity-gain buffer (feedback); open loop doesn’t do that.',
        '0 V would require the inputs to be equal; here “+” is higher, so the output swings positive.',
        'A controlled gain needs feedback resistors; open loop there’s no defined finite gain — it saturates.',
      ],
    },
  ],
}
