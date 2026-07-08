import type { Lesson } from '../../types'

export const chemQuant3Lesson: Lesson = {
  nodeId: 'chem-quant-3',
  screens: [
    {
      kind: 'explain',
      title: 'Chemistry that pushes electrons',
      body: [
        'Some reactions move ELECTRONS from one atom to another. The atom that loses electrons is OXIDIZED; the one that gains them is REDUCED — together, a REDOX reaction (“LEO the lion says GER”: Lose Electrons = Oxidation, Gain Electrons = Reduction).',
        'Separate the two halves so the electrons must travel through a WIRE to get across, and you’ve built a battery: a controlled redox reaction driving a current.',
        'This is the direct chemical root of every volt your robot runs on.',
      ],
      links: [{ nodeId: 'chem-quant-2', label: 'Refresher: Thermochemistry & Equilibrium' }],
    },
    {
      kind: 'predict',
      question:
        'In a galvanic cell, why do the electrons flow through the external wire instead of just reacting directly?',
      options: [
        'The two half-reactions are physically separated, so electrons can ONLY cross through the wire — that flow IS the current',
        'Electrons are afraid of the chemicals',
        'The wire creates the electrons from nothing',
        'Because metal is always negative',
      ],
      correctIndex: 0,
      reveal:
        'A battery separates the oxidation half (which gives up electrons) from the reduction half (which wants them). Because they’re not touching, the freed electrons have exactly one route to the other side: the external wire. That forced detour through your circuit is the useful current — the chemistry’s electron transfer, rerouted through your motor. Short the two halves together directly and the energy just dumps as heat instead of work.',
    },
    {
      kind: 'code',
      prompt:
        'A galvanic cell’s voltage is E_cell = E(cathode) − E(anode), from standard reduction potentials. Daniell cell: Cu²⁺/Cu = +0.34 V (cathode), Zn²⁺/Zn = −0.76 V (anode). Compute the cell voltage.',
      starter:
        "// E_cell = E(cathode) - E(anode).  Positive E_cell => the reaction is spontaneous.\nconst cathode = 0.34     // Cu2+/Cu reduction potential (V)\nconst anode = -0.76      // Zn2+/Zn reduction potential (V)\nconst eCell = \nprint('cell voltage (V):', eCell)\nprint('spontaneous?', eCell > 0)",
      expected: 'cell voltage (V): 1.1\nspontaneous? true',
      hint: 'cathode - anode',
      success:
        'E_cell = 0.34 − (−0.76) = 1.10 V — the textbook Daniell-cell voltage, and positive, so the reaction runs on its own and can drive a load. Subtracting a negative anode potential is why pairing a strong reducer (zinc) with a strong oxidizer (copper) gives a healthy voltage. Stack cells in series and the voltages add: three ~1.2 V NiMH cells make a ~3.6 V pack.',
    },
    {
      kind: 'explain',
      title: 'What a battery spec actually means',
      body: [
        'A cell’s VOLTAGE comes from its chemistry (Li-ion ≈ 3.7 V, alkaline ≈ 1.5 V). Its CAPACITY, in amp-hours (Ah) or milliamp-hours (mAh), is how much charge it can deliver.',
        'Runtime ≈ capacity ÷ current draw: a 2000 mAh pack feeding 500 mA lasts about 4 hours. Energy stored ≈ capacity × voltage (watt-hours) — that’s what really sets how far a robot goes.',
        'The C-RATE limits how HARD you can pull: a 2 Ah cell rated “5C” can briefly supply 10 A — the difference between a cell that runs a sensor and one that spins a motor.',
      ],
      deeper: [
        'RECHARGEABLE cells are reversible redox: discharging runs the reaction forward (electrons out); charging forces it backward with an external voltage, pushing the electrons and ions back — exactly the Le Chatelier “push it the other way” idea from the last lesson. Non-rechargeable (primary) cells use a reaction that can’t practically be reversed.',
        'Energy DENSITY — watt-hours per kilogram — is the number that dominates robotics. Lithium wins because lithium is the lightest metal that readily gives up an electron, so you get the most charge per gram. This single property gates how long a drone flies or a rover roams, which is why battery chemistry is such fierce research.',
        'The same electrochemistry runs in reverse everywhere: CORROSION is unwanted oxidation (iron losing electrons to oxygen = rust), and ELECTROPLATING/electrolysis is driving a non-spontaneous redox with external power to deposit metal or split water. One framework — electron transfer at electrodes — spans batteries, rust, and manufacturing.',
      ],
      links: [
        { nodeId: 'robo-embedded', label: 'Powering the microcontroller: Embedded' },
        { nodeId: 'phys-electricity', label: 'What the voltage then does: Circuits' },
      ],
    },
    {
      kind: 'quiz',
      question: 'In a redox reaction, the substance that is OXIDIZED…',
      options: [
        'Loses electrons (they flow away to the substance being reduced)',
        'Gains electrons',
        'Always gains mass',
        'Stops the reaction',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: oxidation is loss of electrons (LEO). Those electrons travel to the substance being reduced — in a cell, via the wire.',
        'Gaining electrons is REDUCTION — the other half of the pair.',
        'Oxidation is about electrons, not mass; the atom doesn’t “gain mass” by losing electrons.',
        'Oxidation is half of what MAKES the reaction go, not something that stops it.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A cell has cathode potential +0.80 V and anode potential +0.15 V. What is E_cell, and is it spontaneous?',
      options: [
        '+0.65 V, spontaneous — E_cell = cathode − anode is positive',
        '+0.95 V, spontaneous — you add the potentials',
        '−0.65 V, non-spontaneous',
        '0 V — the potentials cancel',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: E_cell = 0.80 − 0.15 = +0.65 V. A positive cell voltage means the redox runs spontaneously and can power a load.',
        'You SUBTRACT the anode from the cathode, not add — adding double-counts and overstates the voltage.',
        'The subtraction gives +0.65, not −0.65 — cathode (0.80) is the larger term, so the result is positive.',
        'The potentials differ (0.80 vs 0.15), so they don’t cancel — there’s a real 0.65 V driving force.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A 3000 mAh battery powers a robot drawing 600 mA. Roughly how long does it run?',
      options: [
        'About 5 hours — runtime ≈ capacity ÷ current',
        'About 0.2 hours — current ÷ capacity',
        'About 1800 hours — capacity × current',
        'About 3 hours — capacity ÷ 1000',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: 3000 mAh ÷ 600 mA = 5 hours. Capacity in mAh divided by draw in mA gives hours (real runtime is a bit less due to losses).',
        'That inverts the ratio (600 ÷ 3000) — dividing current by capacity gives nonsense units, not time.',
        'Multiplying capacity by current has the wrong units entirely; runtime is a DIVISION.',
        '3 hours ignores the actual 600 mA draw — dividing by 1000 isn’t the current. Use capacity ÷ current.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Charging a rechargeable battery does what, chemically?',
      options: [
        'Forces the redox reaction backward with external voltage, restoring the reactants',
        'Adds fresh chemicals into the cell',
        'Cools the reaction to reset it',
        'Nothing chemical — it just stores electricity like a bucket',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: an external source pushes electrons (and ions) back the way they came, reversing the discharge reaction — the same equilibrium “push it backward” idea, driven by applied voltage.',
        'No new material is added — charging re-forms the original reactants from the products already inside.',
        'Temperature isn’t the mechanism; an applied voltage reversing the redox is.',
        'A battery stores energy CHEMICALLY (in the reactants), not as static charge in a bucket — that’s what a capacitor does.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Rust forming on iron is an example of…',
      options: [
        'Oxidation — iron loses electrons to oxygen (unwanted electrochemistry)',
        'Reduction — iron gains electrons',
        'A purely physical change, no electrons involved',
        'An endothermic-only process unrelated to redox',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: rust is iron being oxidized by oxygen — the same electron-loss chemistry as a battery’s anode, just wasted and destructive.',
        'Iron LOSES electrons to oxygen here — that’s oxidation, not reduction (oxygen is the one reduced).',
        'It’s fundamentally electron transfer (redox), not a mere physical change like melting.',
        'Rusting is redox; framing it as “just endothermic” misses that electrons move from iron to oxygen.',
      ],
    },
    {
      question: 'Two identical 1.5 V cells wired in SERIES give a pack voltage of…',
      options: [
        '3.0 V — series voltages add',
        '1.5 V — voltage stays the same',
        '0.75 V — voltage halves',
        '4.5 V — voltage triples',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: in series the cell voltages sum, so 1.5 + 1.5 = 3.0 V (capacity stays the same). Parallel would keep 1.5 V but add capacity.',
        'Series ADDS voltages — staying at 1.5 V is what a PARALLEL connection does.',
        'Series never halves voltage; you’re adding two sources nose-to-tail.',
        'Two cells add to double, not triple — three in series would give 4.5 V.',
      ],
    },
    {
      question: 'Why does lithium dominate high-performance robot batteries?',
      options: [
        'It’s the lightest metal that readily gives up an electron → the most charge per gram (high energy density)',
        'It’s the cheapest element available',
        'It’s completely non-reactive and therefore safe',
        'It stores energy physically rather than chemically',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: energy density (Wh/kg) is king in robotics, and lithium’s low mass plus eager electron donation maximize charge per gram — more flight time, more range.',
        'Lithium isn’t the cheapest; it wins on energy density despite cost.',
        'Lithium is quite reactive (that’s WHY it gives up electrons easily) — energy density, not inertness, is the reason.',
        'A battery stores energy chemically; lithium’s advantage is chemical (light + reactive), not physical storage.',
      ],
    },
    {
      question:
        'A cell is rated 2 Ah at 5C. What continuous current can it briefly supply, and what does that enable?',
      options: [
        '10 A — enough surge to spin a motor, not just trickle a sensor',
        '0.4 A — capacity ÷ 5',
        '2 A — the C-rate doesn’t change the current',
        '5 A — the C number is the amps',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: C-rate × capacity = 5 × 2 Ah = 10 A. High C-rate means high burst current — the difference between running electronics and driving motors.',
        'That divides instead of multiplies — a 5C rating INCREASES the deliverable current above 1C, not below.',
        'The C-rate is exactly what sets how much MORE than the 1C (2 A) current you can pull — here 5×.',
        'C is a multiplier on capacity, not a raw amp value — 5 × 2 Ah = 10 A, not 5 A.',
      ],
    },
  ],
}
