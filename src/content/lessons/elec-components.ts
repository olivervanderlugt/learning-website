import type { Lesson } from '../../types'

export const elecComponentsLesson: Lesson = {
  nodeId: 'elec-components',
  screens: [
    {
      kind: 'explain',
      title: 'The workhorse: the voltage divider',
      body: [
        'Physics told you Ohm’s law; engineering asks you to DESIGN. The single most-used building block is the voltage divider: two resistors in series across a supply, with the output tapped between them.',
        'The output is a simple fraction of the input: Vout = Vin·R₂/(R₁+R₂), where R₂ is the resistor between the output tap and ground. Equal resistors give half the input; a big R₁ over a small R₂ gives a small output.',
        'Every resistive sensor is secretly a divider — a thermistor or flex sensor is one of the two resistors, so its changing resistance changes Vout, which your microcontroller reads.',
      ],
      deeper: [
        'Series resistors ADD (R = R₁+R₂), because the same current flows through both and the voltages stack. Parallel resistors combine as the “product over sum” R = R₁·R₂/(R₁+R₂), always LESS than either one, because you’ve opened a second path for current. The divider formula is just Ohm’s law applied twice: the same current I = Vin/(R₁+R₂) flows through both resistors, and Vout is that current times R₂.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A divider has Vin = 10 V, R₁ = 1 kΩ (top) and R₂ = 4 kΩ (bottom, to ground). Roughly what is Vout at the tap?',
      options: [
        '8 V — the bigger bottom resistor keeps most of the voltage: 10·4/(1+4)',
        '2 V — the top resistor drops most of it',
        '5 V — a divider always halves the input',
        '10 V — the output equals the input',
      ],
      correctIndex: 0,
      reveal:
        'Vout = Vin·R₂/(R₁+R₂) = 10·4/(1+4) = 10·0.8 = 8 V. The bottom resistor R₂ is 4× the top, so it “keeps” 4/5 of the supply. A divider only halves the input when the two resistors are EQUAL; here the split is 80/20.',
    },
    {
      kind: 'explain',
      title: 'The trap: loading sags the output',
      body: [
        'That clean formula assumes nothing is connected to the output. The moment you hook a real LOAD across R₂ — the next circuit stage, an ADC input, an LED — that load sits in PARALLEL with R₂.',
        'Parallel resistance is always smaller than either resistor, so the effective bottom resistance drops, and Vout SAGS below what you designed. This is “loading,” the classic beginner surprise: the meter read 4.5 V, but under load it’s only 3 V.',
        'The fix is intuition you’ll formalize as the Thévenin equivalent: a divider is a lousy voltage source with a built-in “output resistance,” and drawing current from it drops the voltage.',
      ],
      deeper: [
        'The Thévenin view: any two-terminal resistor network looks, from the outside, like a single source Vth behind a single resistance Rth. For a divider, Vth is the unloaded Vout and Rth is R₁∥R₂. Load it and you’ve made a NEW divider between Rth and the load — so a load much bigger than Rth barely sags it, while a load comparable to Rth halves it. That’s why you buffer a divider with an op-amp (next lesson) when you need it to actually drive something.',
      ],
      links: [
        { nodeId: 'phys-electricity-2', label: 'Refresher: dividers, series & parallel' },
        { nodeId: 'elec-transistors', label: 'The fix: buffer it with an op-amp' },
      ],
    },
    {
      kind: 'predict',
      question:
        'An unloaded divider outputs 4.5 V. You connect a load resistor across R₂ that is much SMALLER than R₂. What happens to Vout?',
      options: [
        'It drops well below 4.5 V — the small load, in parallel with R₂, sharply lowers the effective bottom resistance',
        'It stays exactly 4.5 V — loads never affect a divider',
        'It rises above 4.5 V — adding a resistor adds voltage',
        'It jumps to the full supply voltage',
      ],
      correctIndex: 0,
      reveal:
        'A load in parallel with R₂ makes the effective bottom resistance R₂∥R_load, which is smaller than either — and a smaller bottom resistor means a smaller fraction of Vin, so Vout sags. The smaller the load relative to R₂, the harder it pulls the output down. That sag is exactly what the code screen computes.',
    },
    {
      kind: 'code',
      prompt:
        'Compute a divider’s output unloaded, then loaded. Vin = 9 V, R₁ = R₂ = 1 kΩ. Fill in the parallel-combination line (product over sum) for R₂ in parallel with a load RL = 1 kΩ, then compare.',
      starter: `function divider(Vin, R1, Rbottom) {
  return Vin * Rbottom / (R1 + Rbottom)
}
function parallel(Ra, Rb) {
  return 0 // fill in: Ra * Rb / (Ra + Rb)
}
const Vin = 9, R1 = 1000, R2 = 1000, RL = 1000
const unloaded = divider(Vin, R1, R2)
const loaded = divider(Vin, R1, parallel(R2, RL))
print('unloaded: ' + unloaded.toFixed(2))
print('loaded:   ' + loaded.toFixed(2))`,
      expected: `unloaded: 4.50
loaded:   3.00`,
      hint: 'Parallel resistance is the product over the sum: Ra * Rb / (Ra + Rb). For two equal 1 kΩ resistors that’s 500 Ω.',
      success:
        'Unloaded the divider gives a clean 4.50 V (equal resistors → half of 9). Add an equal-value load and R₂∥RL = 500 Ω, so the output sags to 3.00 V — a third of the way gone, just from connecting something. That is loading, and it is why you can’t treat a divider as a real power source.',
    },
    {
      kind: 'quiz',
      question: 'For a voltage divider Vout = Vin·R₂/(R₁+R₂), when does Vout equal exactly half of Vin?',
      options: [
        'When R₁ = R₂',
        'When R₂ is much larger than R₁',
        'When R₁ is much larger than R₂',
        'Only when both resistors are 1 kΩ specifically',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: equal resistors split the supply evenly, so R₂/(R₁+R₂) = 1/2 and Vout = Vin/2.',
        'A much larger R₂ keeps MOST of the voltage (fraction near 1), not half.',
        'A much larger R₁ leaves only a small fraction across R₂ — Vout heads toward 0, not half.',
        'The specific value doesn’t matter — only the RATIO does; any two equal resistors halve the input.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You connect a load across a divider’s output and the voltage drops. Why?',
      options: [
        'The load sits in parallel with R₂, lowering the effective bottom resistance and shrinking the output fraction',
        'The load adds resistance in series, raising the total',
        'Loads always increase the output voltage',
        'The supply voltage itself decreases',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: parallel combination R₂∥R_load is smaller than R₂, so the divider ratio drops and Vout sags — the definition of loading.',
        'The load is in PARALLEL with R₂, not in series — parallel lowers resistance, it doesn’t add.',
        'Loading always lowers (or leaves unchanged) the output, never raises it.',
        'The supply is unaffected; it’s the divider’s effective bottom resistance that changed.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Two 2 kΩ resistors are connected in PARALLEL. What is their combined resistance?',
      options: [
        '1 kΩ — product over sum: (2·2)/(2+2) = 1',
        '4 kΩ — parallel resistances add',
        '2 kΩ — parallel doesn’t change equal resistors',
        '0.5 kΩ — divide by the number of resistors squared',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: R₁∥R₂ = R₁·R₂/(R₁+R₂) = 4/4 = 1 kΩ. Two equal resistors in parallel give exactly half of one.',
        'Adding is for SERIES; parallel resistance is always less than the smaller resistor.',
        'Parallel does change it — a second path for current lowers the resistance to 1 kΩ.',
        'The rule is product over sum, not divide-by-count-squared; here that gives 1 kΩ.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does a resistive sensor (like a thermistor) naturally fit into a voltage divider?',
      options: [
        'Its resistance changes with the measured quantity, so as one leg of a divider it turns that change into a readable voltage',
        'Because thermistors generate their own voltage',
        'Because a divider amplifies the sensor’s current',
        'Because sensors must always be wired in parallel',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the sensor IS one of the two resistors; its changing R shifts the divider ratio, converting temperature (or bend, or light) into a voltage a microcontroller can sample.',
        'A thermistor doesn’t generate voltage — it changes resistance; the divider supplies the voltage to be split.',
        'A divider doesn’t amplify; it produces a proportional voltage from the sensor’s resistance.',
        'The sensor sits as one leg of the divider (in series with the other resistor), not merely in parallel.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A divider has Vin = 12 V, R₁ = 2 kΩ (top), R₂ = 1 kΩ (bottom). What is Vout (unloaded)?',
      options: ['4 V', '8 V', '6 V', '12 V'],
      correctIndex: 0,
      explanations: [
        'Correct: Vout = 12·R₂/(R₁+R₂) = 12·1/(2+1) = 12·1/3 = 4 V.',
        '8 V would be the voltage across R₁ (the top resistor), not the tapped output across R₂.',
        '6 V assumes equal resistors, but here R₁ is twice R₂, so the split is 1/3 not 1/2.',
        'The output is a fraction of Vin, never the full supply, unless R₁ = 0.',
      ],
    },
    {
      question: 'Two resistors, 3 kΩ and 6 kΩ, are placed in SERIES. What is the total resistance?',
      options: ['9 kΩ', '2 kΩ', '4.5 kΩ', '18 kΩ'],
      correctIndex: 0,
      explanations: [
        'Correct: series resistances simply add — 3 + 6 = 9 kΩ.',
        '2 kΩ is their PARALLEL value (product over sum); the question asks for series.',
        '4.5 kΩ is the average — not how resistors combine in either configuration.',
        '18 kΩ multiplies them; series adds, it doesn’t multiply.',
      ],
    },
    {
      question:
        'A divider’s Thévenin output resistance is Rth = R₁∥R₂ = 500 Ω. Which load causes the LEAST sag?',
      options: [
        'A 100 kΩ load — far larger than Rth, so it barely draws current',
        'A 500 Ω load — equal to Rth',
        'A 100 Ω load — much smaller than Rth',
        'A 0 Ω (short) load',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a load much larger than the source resistance draws little current, so the output barely sags — the rule of thumb “load ≫ Rth” for a stiff divider.',
        'A load equal to Rth roughly halves the output — significant sag.',
        'A load far smaller than Rth pulls the output way down — heavy loading.',
        'A short (0 Ω) collapses the output to zero — the worst possible sag.',
      ],
    },
    {
      question: 'What is the practical fix when a divider must actually DRIVE a load without sagging?',
      options: [
        'Buffer it with an op-amp follower, which reproduces the divider’s voltage but supplies the current',
        'Use larger resistors so more current flows',
        'Remove R₂ entirely',
        'Increase the supply voltage to compensate',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: an op-amp buffer (unity-gain follower) presents a high input impedance to the divider — no loading — and a low output impedance to the load — plenty of current. That’s the next lesson.',
        'Larger resistors make loading WORSE (higher Rth), and smaller ones waste power — neither is the real fix.',
        'Removing R₂ destroys the divider; you’d lose the output reference entirely.',
        'Raising the supply is a fragile patch — the sag still varies with the load; a buffer removes the coupling properly.',
      ],
    },
  ],
}
