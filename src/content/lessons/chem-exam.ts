import type { Lesson } from '../../types'

export const chemExamLesson: Lesson = {
  nodeId: 'chem-exam',
  screens: [
    {
      kind: 'explain',
      title: 'Module exam — prove the matter',
      body: [
        'Fourteen questions across the whole chemistry module — atoms, reactions, materials, moles, energy and electrochemistry — and every one is NEW. No periodic table, no notes: retrieval from memory is the point.',
        'Score 80% and the module is sealed. Below that? You lose nothing — you’ll see exactly which idea slipped, review it, and retake.',
      ],
    },
    {
      kind: 'quiz',
      question: 'An atom in your robot’s frame has 13 protons, 14 neutrons and 13 electrons. What element is it?',
      options: ['Aluminium', 'Silicon', 'Iron', 'Cobalt'],
      correctIndex: 0,
      explanations: [
        'Correct: 13 protons = aluminium, always — the proton count alone names the element. (Fitting for a frame: light, strong per kilogram.)',
        'Silicon is 14 protons — you counted the NEUTRONS. Neutrons set the isotope, never the identity.',
        'Iron is 26 protons — that’s 13 + 13, protons plus electrons. Only the protons vote on identity.',
        'Cobalt is 27 protons — that’s the MASS number (13 + 14). Mass tells you which isotope, not which element.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A particle has 8 protons and 10 electrons. What exactly is it?',
      options: [
        'An oxygen ion with a 2− charge',
        'An oxygen ion with a 2+ charge',
        'A neon atom',
        'An isotope of oxygen',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: 8 protons = oxygen, and two EXTRA negatives make it 2−. That’s the O²⁻ in rust and in every oxide ceramic.',
        'Sign flipped — two extra ELECTRONS means negatives outnumber positives. 2+ would be 8 protons with only 6 electrons.',
        'Neon has 10 PROTONS — you identified it by electron count, but electrons come and go. The nucleus says oxygen.',
        'Isotopes are a NEUTRON story. Changing electrons makes ions; this one gained two.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A newly studied element sits in the LEFTMOST column of the periodic table. What can you bet on before any experiment?',
      options: [
        'It readily loses its single outer electron, forming a 1+ ion',
        'It grabs one extra electron, forming a 1− ion',
        'It reacts with almost nothing',
        'It conducts unusually well because it has more electrons in total',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: columns share outer-shell counts, and the left column all carry one lonely outer electron — cheapest path to a full shell is shedding it. That’s why lithium, sodium and potassium all behave alike.',
        'Grabbing one is the second-from-right column (7 outer electrons, one short of full) — the opposite end of the table.',
        'Inertness belongs to the FAR RIGHT column, where shells are already full. One outer electron is maximally reactive, not inert.',
        'Total electron count varies wildly down any column and doesn’t set behavior — the OUTER shell does.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Two atoms both have 17 protons, but one has 18 neutrons and the other has 20. What are they?',
      options: [
        'Two isotopes of the same element (chlorine)',
        'Two different elements',
        'A chlorine atom and a chlorine ion',
        'Chlorine and argon',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: same protons = same element (17 is chlorine); different neutrons = different isotopes. Same chemistry, different mass — this is chlorine-35 and chlorine-37.',
        'Different elements would need different PROTON counts — neutrons never change the name on the box.',
        'Ions differ in ELECTRONS, giving a charge. Nothing here touched the electron count.',
        'Argon is 18 PROTONS — you promoted a neutron count to an identity. Neutrons don’t get a vote.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You mix baking soda and vinegar in a flask — it fizzes, and the flask turns noticeably COLD. What kind of reaction is this?',
      options: [
        'Endothermic — it absorbs heat from the flask and your hand',
        'Exothermic — fizzing always means energy is being released',
        'Neither — atoms are conserved, so energy must be too',
        'Exothermic, but the cold gas carries the heat away',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the new bond arrangement sits HIGHER in energy than the old one, and the deficit is withdrawn from the surroundings as heat — same bookkeeping as a cold pack.',
        'Fizzing just means a gas is forming — it says nothing about the energy direction. This one runs uphill, drinking heat.',
        'Atom conservation and energy flow are separate ledgers: atoms are always conserved, yet reactions still absorb or release energy by rearranging bonds.',
        'An exothermic reaction warms its surroundings by definition — a flask you can feel getting cold is absorbing heat, full stop.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does food last weeks in a fridge but only days on the counter?',
      options: [
        'Cooling slows molecules, so far fewer collisions clear the activation-energy hill of spoilage reactions',
        'Cold destroys the bonds inside bacteria',
        'The fridge removes the activation energy from the food',
        'Spoilage reactions become endothermic when cold',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: temperature is molecular speed, and rate roughly doubles per ~10 °C — so dropping ~20 °C cuts spoilage speed severalfold. Same reason batteries hate heat.',
        'Fridge temperatures don’t break bonds — bacteria survive fine and resume the moment things warm up. The reactions merely crawl.',
        'Activation energy is a property of the REACTION — a fixed hill. Cooling doesn’t lower the hill; it just means fewer molecules have the speed to climb it.',
        'Exo/endo is set by the bond energies of reactants and products — temperature changes the SPEED, never the direction of the energy ledger.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Hydrogen burns as 2H₂ + O₂ → 2H₂O. Why must the equation produce exactly TWO water molecules?',
      options: [
        'Atoms are conserved — 4 hydrogens and 2 oxygens go in, so they must all come out',
        'Energy conservation requires two products for one oxygen',
        'Water is only stable in pairs',
        'It’s a convention chemists agreed on for readability',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: count them — 4 H and 2 O on the left, and two H₂O molecules hold exactly 4 H and 2 O. Balancing an equation is just refusing to lose atoms.',
        'Energy conservation is real but it’s a separate ledger — it constrains heat released, not the molecule count. Atom counting sets the coefficients.',
        'Single water molecules are perfectly stable — the “2” comes from bookkeeping the incoming atoms, not from water chemistry.',
        'It’s forced, not chosen: write one H₂O and you’ve vaporized two hydrogens and an oxygen from existence — which reactions can never do.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A mounting plate sits against your robot’s hot motor housing. It must stay hard, not soften, and not conduct the heat onward. Which material family?',
      options: [
        'Ceramic — hard, heat-proof and insulating, as long as nothing impacts it',
        'Polymer — plastics handle heat best',
        'Metal — aluminium would stay coolest',
        'Carbon-fiber composite — it’s the strongest option per gram',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: rigid, directional bonds shrug off heat and lock electrons in place (no conduction) — exactly why spark plugs and kiln linings are ceramic. The price is brittleness, fine for a protected plate.',
        'Backwards — polymers are the FIRST family to soften and melt; their long carbon chains let go at low temperatures.',
        'Metals stay strong when warm, but the electron sea that makes them metals conducts heat superbly — the plate would pipe the heat straight to the other side.',
        'Composites are strong per gram, but their epoxy MATRIX is a polymer — it cooks and lets go at motor-housing temperatures.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You build a battery from a zinc strip and a copper strip in an electrolyte. What actually happens when you connect a motor across it?',
      options: [
        'Zinc, the more reactive metal, dissolves as it gives up electrons — which travel through the wire to the copper side',
        'Copper dissolves, because it holds electrons more tightly',
        'Electrons flow through the electrolyte liquid from zinc to copper',
        'Both metals dissolve at the same rate, splitting the work',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the eager giver oxidizes — zinc sheds electrons (dissolving as ions) and the electrons do work in YOUR circuit on the way to the tighter-gripping copper. That asymmetry IS the voltage.',
        'Holding electrons TIGHTLY is why copper survives — the electrode that loses electrons is the one that dissolves, and that’s the reactive one.',
        'Electrons take the wire; the liquid carries IONS to close the loop. Two different couriers on two different roads — that split is the whole trick.',
        'The reactivity gap makes it one-sided by design: zinc sacrifices, copper collects. Equal dissolving would mean zero gap — and zero volts.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Critical robot connectors are plated with GOLD, near the bottom of the metal reactivity list. Why that metal?',
      options: [
        'Gold is so unreactive it never oxidizes — the contact surface stays clean, bare metal for years',
        'Gold conducts electricity better than any other metal',
        'Gold is the hardest metal, so the contacts never wear out',
        'Any metal works equally well — gold plating is a luxury signal',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the same reactivity ranking that predicts battery voltage and corrosion says gold barely reacts at all — no oxide skin ever forms to block the connection. Bottom of the list = perfect for contacts.',
        'Silver and copper both conduct BETTER than gold — gold wins on staying bare, not on raw conductivity.',
        'Gold is actually one of the SOFTEST metals — it’s plated microns thin over harder metal precisely because it wears easily.',
        'Try copper contacts outdoors and watch the oxide layer strangle the connection — reactive metals grow insulating skins, so the metal choice matters enormously.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'How many moles are in 88 grams of CO₂? (C = 12, O = 16, so CO₂ = 44 g/mol.)',
      options: ['2 mol', '44 mol', '88 mol', '0.5 mol'],
      correctIndex: 0,
      explanations: [
        'Correct: moles = mass ÷ molar mass = 88 ÷ 44 = 2 mol. The molar mass converts grams to a particle count.',
        '44 is the molar mass itself — you divide the 88 g sample by it, you don’t report it.',
        '88 is the grams you started with; moles is that divided by 44.',
        '0.5 inverts the division (44 ÷ 88) — moles is grams over molar mass, 88 ÷ 44 = 2.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'For N₂ + 3 H₂ → 2 NH₃, you have 5 mol N₂ and 6 mol H₂. Which is the limiting reagent?',
      options: [
        'H₂ — 5 mol N₂ would need 15 mol H₂, but only 6 are present',
        'N₂ — there is less of it by the ratio',
        'Neither — they are in perfect ratio',
        'Both run out at exactly the same time',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the 1 : 3 ratio means 5 mol N₂ demands 15 mol H₂; with only 6 mol H₂, hydrogen runs out first and limits the yield.',
        'By count there’s less H₂ relative to what the 1 : 3 ratio needs — N₂ is actually in excess here.',
        'Perfect ratio would be 5 N₂ : 15 H₂; 6 mol H₂ is far short, so they’re not balanced.',
        'H₂ is exhausted long before N₂ — 6 mol H₂ only consumes 2 mol of the 5 mol N₂.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A reaction breaks bonds totaling 500 kJ and forms bonds totaling 620 kJ. What is ΔH, and is it exothermic?',
      options: [
        '−120 kJ, exothermic — forming released more than breaking cost',
        '+120 kJ, endothermic — breaking cost more',
        '+1120 kJ — you add the two',
        '0 kJ — they cancel',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: ΔH = broken − formed = 500 − 620 = −120 kJ. Negative means net heat is released — exothermic.',
        'The sign is negative: formed (620) exceeds broken (500), so energy comes OUT, not in.',
        'Adding them is meaningless — ΔH is the DIFFERENCE between energy in (breaking) and out (forming).',
        'They don’t cancel — 500 and 620 differ by 120 kJ, which is released.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A galvanic cell has a cathode potential of +0.34 V and an anode potential of −0.44 V. What is its voltage?',
      options: [
        '+0.78 V — E_cell = cathode − anode = 0.34 − (−0.44)',
        '−0.10 V — add the two potentials',
        '+0.10 V — subtract the smaller from the larger magnitude',
        '−0.78 V — anode minus cathode',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: E_cell = 0.34 − (−0.44) = 0.78 V. Subtracting a negative anode potential adds the magnitudes — a healthy, spontaneous voltage.',
        'Adding the raw signed values (0.34 + −0.44) is the wrong formula — E_cell subtracts the anode.',
        'Working with magnitudes drops the sign handling — the negative anode potential should ADD, giving 0.78, not 0.10.',
        'That’s cathode and anode reversed — E_cell is cathode − anode, giving a positive 0.78 V for a spontaneous cell.',
      ],
    },
  ],
}
