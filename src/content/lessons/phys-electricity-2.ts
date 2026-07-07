import type { Lesson } from '../../types'

export const physElectricity2Lesson: Lesson = {
  nodeId: 'phys-electricity-2',
  screens: [
    {
      kind: 'explain',
      title: 'The two laws that solve any circuit',
      body: [
        'Ohm’s law handles one resistor. Real circuits have many, and Kirchhoff’s two laws tie them together. KCL (current law): all current flowing INTO a junction equals the current flowing OUT — charge doesn’t pile up.',
        'KVL (voltage law): around any complete loop, the voltage rises (batteries) and drops (resistors) sum to zero — energy in equals energy out.',
        'Every circuit simulator, from SPICE to your robot’s power design, is just these two laws solved at scale.',
      ],
      deeper: [
        'KCL is conservation of charge; KVL is conservation of energy. Together they turn any resistor network into a system of linear equations — the SAME "solve Ax = b" you met in linear algebra. A circuit with N nodes becomes N−1 equations; solve them and you know every voltage and current. Electronics is applied linear algebra with copper.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Three wires meet at a junction. 5 A flows in on one wire, 2 A flows out on another. What must the third wire carry?',
      options: [
        '3 A flowing out — the outflows must total the 5 A inflow',
        '7 A flowing in — currents add up',
        '5 A flowing out — it matches the input wire',
        '0 A — the junction absorbs the rest',
      ],
      correctIndex: 0,
      reveal:
        'KCL: in = out, so 5 A in must equal 2 A + 3 A out — the third wire carries 3 A OUT. Charge can’t accumulate at a junction (a node has no room to store it), so whatever flows in must flow back out. This is how current splits between parallel branches.',
    },
    {
      kind: 'explain',
      title: 'The voltage divider — the most-used circuit',
      body: [
        'Put two resistors in series across a voltage, and the middle tap gives you a FRACTION of it: Vout = Vin · R₂ / (R₁ + R₂). That’s the voltage divider.',
        'It’s everywhere: reading a sensor, scaling a signal to a safe level, setting a reference. The bigger R₂ is relative to R₁, the more of Vin appears at the output.',
        'Series resistances add (R₁ + R₂); parallel ones combine as R₁·R₂/(R₁+R₂), always smaller than either.',
      ],
      deeper: [
        'Why the divider works: the SAME current flows through both series resistors (KCL — nowhere else to go), and by Ohm’s law each drops a voltage proportional to its resistance (V = I·R). So the two resistors split Vin in proportion to their sizes. Many sensors (thermistors, photoresistors, potentiometers) ARE one leg of a divider — the microcontroller reads the tap voltage and infers temperature, light, or angle.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Completion step — a 12 V supply feeds two series resistors, R₁ = 1 kΩ on top and R₂ = 2 kΩ on the bottom, output tapped across R₂. What is Vout = 12 · R₂/(R₁+R₂)?',
      options: [
        '8 V — R₂ is 2/3 of the total resistance, so it gets 2/3 of the voltage',
        '4 V — R₁ gets the bigger share',
        '6 V — always half',
        '12 V — the full supply appears',
      ],
      correctIndex: 0,
      reveal:
        'Vout = 12 · 2000/(1000+2000) = 12 · 2/3 = 8 V. The bottom resistor is twice the top, so it claims twice the voltage drop — 8 V across R₂, 4 V across R₁, adding back to 12 (KVL). Swap the resistors and you’d get 4 V out instead.',
    },
    {
      kind: 'predict',
      question:
        'Independent step — you need a divider that outputs HALF the input. What resistor relationship achieves Vout = Vin/2?',
      options: [
        'R₁ = R₂ (equal resistors split the voltage evenly)',
        'R₂ much larger than R₁',
        'R₁ much larger than R₂',
        'R₂ = 0',
      ],
      correctIndex: 0,
      reveal:
        'Equal resistors split evenly: Vout = Vin · R₂/(R₁+R₂) = Vin · R/(2R) = Vin/2. The ratio is all that matters, not the absolute values — 1 kΩ + 1 kΩ and 1 MΩ + 1 MΩ both give half (though larger values waste less current). This is the first thing every hardware designer reaches for.',
    },
    {
      kind: 'code',
      prompt:
        'Compute a voltage divider and series/parallel combinations. Fill in the divider formula Vout = Vin·R₂/(R₁+R₂), then check the two resistor-combination rules.',
      starter: `function divider(vin, r1, r2) {
  const vout = 0 // fill in: vin * r2 / (r1 + r2)
  return vout.toFixed(2)
}
const R1 = 1000, R2 = 2000
print('Vout (12V, 1k/2k):', divider(12, R1, R2))
print('Vout (12V, 1k/1k):', divider(12, 1000, 1000))
print('series 1k+2k:', R1 + R2)
print('parallel 1k||2k:', (R1 * R2 / (R1 + R2)).toFixed(2))`,
      expected: `Vout (12V, 1k/2k): 8.00
Vout (12V, 1k/1k): 6.00
series 1k+2k: 3000
parallel 1k||2k: 666.67`,
      hint: 'The divider formula is vout = vin * r2 / (r1 + r2)',
      success:
        'The 1k/2k divider gives 8 V (R₂ claims its 2/3 share); equal resistors give exactly half, 6 V. Series resistances add to 3000 Ω; the parallel combination is 666.67 Ω — smaller than EITHER resistor, because two paths let more current through than one. These three formulas, plus Ohm’s law, size almost every passive circuit a robot needs.',
    },
    {
      kind: 'quiz',
      question: 'Kirchhoff’s current law (KCL) states that at any junction…',
      options: [
        'Total current in equals total current out — charge does not accumulate',
        'Voltage in equals voltage out',
        'Resistance is conserved',
        'Power is always zero',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: KCL is conservation of charge — a node can’t store charge, so inflow must equal outflow.',
        'That confuses it with the voltage law (KVL); KCL is specifically about CURRENT at a node.',
        'Resistance isn’t a flow quantity and isn’t "conserved" at a node — KCL is about current.',
        'Power at a junction isn’t zero in general; KCL balances current, not power.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Kirchhoff’s voltage law (KVL) says that around any closed loop, the sum of voltage rises and drops is…',
      options: [
        'Zero — energy gained from sources equals energy lost in components',
        'Equal to the supply voltage',
        'Always positive',
        'Equal to the total current',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: KVL is conservation of energy around a loop — every volt supplied is dropped somewhere, netting zero.',
        'The supply voltage is one term in the sum; the whole loop nets to zero, not to the supply.',
        'Rises are positive and drops are negative — they cancel to zero, not to a positive total.',
        'KVL sums voltages (in volts), not currents — different quantity entirely.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A voltage divider has R₁ = 3 kΩ (top) and R₂ = 1 kΩ (bottom) across 8 V, tapped over R₂. What is Vout?',
      options: ['2 V', '6 V', '4 V', '8 V'],
      correctIndex: 0,
      explanations: [
        'Correct: Vout = 8 · 1000/(3000+1000) = 8 · 1/4 = 2 V — R₂ is a quarter of the total, so it gets a quarter of the voltage.',
        '6 V is what the TOP resistor R₁ drops (3/4 of 8) — the output is tapped across R₂, which gets the remaining 2 V.',
        '4 V would be the equal-resistor (half) case; here R₁ is three times R₂, so R₂’s share is smaller.',
        '8 V is the full input — a divider always outputs less, unless R₁ = 0.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Two 100 Ω resistors are placed in PARALLEL. What is their combined resistance?',
      options: [
        '50 Ω — parallel resistance is always less than the smallest resistor',
        '200 Ω — resistances add',
        '100 Ω — unchanged',
        '10000 Ω — they multiply',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: 100·100/(100+100) = 10000/200 = 50 Ω. Two equal parallel resistors halve the resistance — two paths let twice the current flow.',
        'Adding (200 Ω) is the SERIES rule; parallel paths reduce resistance, not increase it.',
        'Parallel resistance changes (drops to 50 Ω) — adding a second path always eases current flow.',
        'Multiplying alone isn’t the rule; it’s product OVER sum, giving 50 Ω.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why can a thermistor (temperature-dependent resistor) be read by a microcontroller using a voltage divider?',
      options: [
        'As its resistance changes with temperature, the divider’s output voltage changes — which the MCU can measure',
        'Because thermistors output voltage directly',
        'Because temperature is a voltage',
        'It can’t — thermistors need a special sensor chip',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: put the thermistor as one leg of a divider; its changing resistance shifts Vout, and the MCU’s analog input reads that voltage and infers temperature.',
        'A thermistor changes RESISTANCE, not voltage — the divider is what converts that into a readable voltage.',
        'Temperature isn’t a voltage; the divider is the trick that turns a resistance change into a voltage the MCU can sample.',
        'It very much can — the humble divider is exactly how most resistive sensors interface to a microcontroller.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'At a node, 3 A and 4 A flow in, and 2 A flows out on one wire. What does the remaining wire carry?',
      options: ['5 A out', '9 A out', '1 A out', '5 A in'],
      correctIndex: 0,
      explanations: [
        'Correct: KCL — total in (3+4 = 7 A) must equal total out; 2 A already leaves, so the last wire carries 7 − 2 = 5 A out.',
        '9 A adds everything without balancing in vs out; inflow is 7 A, so outflow must also be 7 A total.',
        '1 A would leave the node with only 3 A out against 7 A in — charge would vanish, violating KCL.',
        'It must flow OUT — the inflows (7 A) exceed the single 2 A outflow, so the balance leaves the node.',
      ],
    },
    {
      question: 'Three 90 Ω resistors are in SERIES. What is the total resistance?',
      options: ['270 Ω', '30 Ω', '90 Ω', '729000 Ω'],
      correctIndex: 0,
      explanations: [
        'Correct: series resistances add directly — 90 + 90 + 90 = 270 Ω.',
        '30 Ω is the PARALLEL result (90/3) — series adds instead of dividing.',
        '90 Ω ignores that stacking resistors in series increases the total.',
        '729000 is 90³ — resistances add in series, they don’t multiply.',
      ],
    },
    {
      question: 'A divider must output 3 V from a 12 V supply (tapped across R₂). Which resistor ratio works?',
      options: [
        'R₂/(R₁+R₂) = 1/4, e.g. R₁ = 3 kΩ, R₂ = 1 kΩ',
        'R₁ = R₂',
        'R₂ three times R₁',
        'R₂ = 0',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: 3/12 = 1/4, so R₂ must be a quarter of the total — R₁ = 3 kΩ, R₂ = 1 kΩ gives 12·(1/4) = 3 V.',
        'Equal resistors give half (6 V), not a quarter.',
        'R₂ three times R₁ would give 3/4 of 12 = 9 V, the opposite extreme.',
        'R₂ = 0 outputs 0 V, not 3 V.',
      ],
    },
    {
      question: 'Why does adding resistors in parallel DECREASE total resistance, while series INCREASES it?',
      options: [
        'Parallel adds more paths for current (easier flow); series makes current pass through more obstacles in a row',
        'Parallel resistors are always smaller physically',
        'It’s an arbitrary convention',
        'Series and parallel actually give the same result',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: parallel paths are like extra lanes on a road — more ways through means less overall resistance; series stacks obstacles, adding up the total.',
        'Physical size is irrelevant; it’s about how many paths the current has.',
        'It follows directly from Ohm’s law and the two circuit laws — not a convention.',
        'They give very different results: series adds, parallel reduces (product over sum).',
      ],
    },
  ],
}
