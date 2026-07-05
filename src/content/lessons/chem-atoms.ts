import type { Lesson } from '../../types'

export const chemAtomsLesson: Lesson = {
  nodeId: 'chem-atoms',
  screens: [
    {
      kind: 'explain',
      title: 'Everything is made of ~90 LEGO bricks',
      body: [
        'Every material around you — silicon chips, copper wire, battery acid, you — is built from atoms, and there are only about 90 naturally occurring kinds (elements).',
        'An atom is mostly empty space: a tiny, heavy nucleus of protons (+) and neutrons (no charge), with feather-light electrons (−) around it.',
        'One number rules everything: the count of protons. Change it and you have a different element.',
      ],
    },
    {
      kind: 'predict',
      question: 'Take a carbon atom (6 protons) and somehow add one proton to its nucleus. What do you have now?',
      options: [
        'A nitrogen atom — it became a different element',
        'A heavier carbon atom',
        'A carbon ion with a positive charge',
        'Still carbon, just unstable',
      ],
      correctIndex: 0,
      reveal:
        'Proton count = element identity, full stop. 6 protons is carbon; 7 protons IS nitrogen (this is what nuclear reactions do). A heavier carbon would need an extra NEUTRON (an isotope), and a charged carbon would need fewer/more ELECTRONS (an ion). Three particles, three different dials.',
    },
    {
      kind: 'explain',
      title: 'Three dials: element, isotope, ion',
      body: [
        'Protons set the ELEMENT (6 = carbon, 29 = copper). Neutrons set the ISOTOPE — same element, different mass. Electrons set the CHARGE — remove one and the atom becomes a positive ION.',
        'Electrons live in shells around the nucleus; the first holds 2, the next 8. Atoms react to fill or empty their outer shell — that single urge drives almost all chemistry.',
        'Time to feel it. Build some atoms.',
      ],
      deeper: [
        'Why do full shells matter? Electrons obey quantum rules: each shell is a set of allowed energy states, and a filled shell is an unusually stable, low-energy arrangement. Noble gases (helium, neon, argon) have naturally full shells — which is why they react with almost nothing.',
        'A sodium atom (11 electrons: 2, 8, 1) can reach a full shell two ways: gain 7 electrons or lose 1. Losing 1 is far easier — so sodium ALWAYS forms Na⁺. Chlorine (2, 8, 7) grabs 1 to complete its shell → Cl⁻. Opposite charges attract: table salt.',
        'Isotopes matter in engineering: carbon-14’s slow radioactive decay dates archaeology; deuterium (heavy hydrogen) moderates nuclear reactors. Same chemistry, different nuclear behavior.',
      ],
    },
    {
      kind: 'game',
      gameId: 'atom-builder',
    },
    {
      kind: 'explain',
      title: 'The periodic table is a map, not a list',
      body: [
        'Line the elements up by proton count and a pattern repeats: element behavior cycles as shells refill. Mendeleev spotted the repeating pattern in 1869 — and used gaps in it to predict undiscovered elements.',
        'Columns share outer-shell counts, so they share behavior: the left column all shed one electron (reactive metals), the second-from-right column all grab one (reactive gases), the far right is full-shell and inert.',
        'Read it like an engineer: the table tells you which elements conduct, which react, which bond — before you touch anything.',
      ],
      deeper: [
        'Mendeleev’s killer move was leaving holes: he predicted “eka-aluminium” and “eka-silicon” with specific densities and melting points. Gallium (1875) and germanium (1886) matched — the periodic pattern was real, decades before anyone knew about protons or shells.',
        'Why silicon for chips? It sits in column 14 with 4 outer electrons — it bonds into a perfect crystal, and its conductivity is tunable by sprinkling in neighbors (phosphorus = extra electron, boron = missing one). That tunability IS the semiconductor industry.',
        'Robotics shopping list on the table: copper (great conductor, motor windings), lithium (lightest metal that gives up an electron easily → batteries), neodymium (ferocious magnets in every servo), carbon (fiber composites), silicon (every chip).',
      ],
      links: [{ nodeId: 'phys-electricity', label: 'Where the electrons flow: Electricity & Circuits' }],
    },
    {
      kind: 'quiz',
      question: 'What determines which ELEMENT an atom is?',
      options: [
        'The number of protons in its nucleus',
        'The number of electrons around it',
        'The number of neutrons in its nucleus',
        'Its total mass',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: proton count is the atomic number — 6 protons is always carbon, 79 is always gold, no exceptions.',
        'Electrons come and go easily (that makes IONS, and drives chemistry) — but a Na⁺ ion is still sodium.',
        'Neutrons change the ISOTOPE (mass), not the identity — carbon-12 and carbon-14 are both carbon.',
        'Mass varies between isotopes of the same element, so it can’t define identity — only proton count does.',
      ],
    },
    {
      kind: 'quiz',
      question: 'An atom loses one electron. What is it now?',
      options: [
        'A positive ion (1+) of the same element',
        'A negative ion (1−) of the same element',
        'A different element',
        'An isotope of the same element',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: it lost a negative charge, so positives now outnumber negatives by one → a 1+ ion. Identity unchanged — protons untouched.',
        'Losing a NEGATIVE electron leaves the atom net POSITIVE — gaining an electron would make it 1−.',
        'Element identity lives in the nucleus (protons); shuffling electrons never changes what element it is.',
        'Isotopes differ in NEUTRONS. Electron changes make ions, not isotopes.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why do elements in the same COLUMN of the periodic table behave similarly?',
      options: [
        'They have the same number of electrons in their outer shell',
        'They have the same number of protons',
        'They have the same total number of electrons',
        'They were discovered around the same time',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: chemistry is outer-shell business. Lithium and sodium both have 1 outer electron to shed, so they react alike.',
        'Same protons would make them the same element — every element has a unique proton count.',
        'Total electron counts differ down a column (Li has 3, Na has 11); it’s the OUTER shell count that repeats.',
        'Discovery dates are historical accidents — the table’s columns encode electron structure, not chronology.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Helium (2 electrons) and neon (10 electrons) barely react with anything. Why?',
      options: [
        'Their outer electron shells are completely full',
        'They have too few electrons to react',
        'They are too light for chemistry',
        'Their nuclei have no protons',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: full shells (He: 2; Ne: 2+8) are maximally stable — no urge to gain, lose or share electrons means no reactions.',
        'Hydrogen has just 1 electron and reacts explosively — it’s not the count, it’s whether the shell is FULL.',
        'Mass doesn’t set reactivity — lithium is light and violently reactive.',
        'Every atom has protons (helium has 2, neon 10) — that’s what makes them elements at all.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why is silicon the element of the entire chip industry?',
      options: [
        'Its 4 outer electrons form a perfect crystal whose conductivity can be tuned with tiny impurities',
        'It is the best electrical conductor of all elements',
        'It is the rarest and most valuable element',
        'It is the only element that can be purified',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: 4 outer electrons → a diamond-like crystal lattice; doping with phosphorus or boron adds or removes mobile charge — a conductivity DIAL, which is exactly what transistors switch.',
        'Metals like copper and silver conduct far better — silicon’s value is being a CONTROLLABLE semi-conductor, not a great one.',
        'Silicon is the second most abundant element in Earth’s crust (sand is silicon dioxide) — it’s cheap, which helps.',
        'Many elements are purified industrially; silicon’s specialness is its tunable crystal, not purification.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Carbon-12 and carbon-14 are both carbon, but differ in…',
      options: ['Neutron count', 'Proton count', 'Electron count', 'Charge'],
      correctIndex: 0,
      explanations: [
        'Correct: both have 6 protons (that’s what makes them carbon); carbon-14 has 2 extra neutrons — an isotope.',
        'Different proton counts would make them different elements entirely.',
        'Neutral atoms of both have 6 electrons; electron differences would make ions, and the names would note charge, not mass.',
        'The numbers 12 and 14 are mass numbers (protons + neutrons), not charges.',
      ],
    },
    {
      question: 'Sodium (outer shell: 1 electron) meets chlorine (outer shell: 7). What happens?',
      options: [
        'Sodium hands its electron to chlorine; the resulting Na⁺ and Cl⁻ ions attract — salt',
        'They share the electron equally and drift apart',
        'Chlorine gives 7 electrons to sodium',
        'Nothing — both already have full shells',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: one transfer completes BOTH outer shells; the opposite charges then bind the ions into a crystal — NaCl, table salt.',
        'Equal sharing is covalent bonding (e.g. two identical atoms); here the transfer is nearly complete because the shell math is so lopsided.',
        'Backwards — chlorine needs to GAIN 1 to reach a full 8, and sodium wants to LOSE 1; a 7-electron gift helps neither.',
        'Neither is full beforehand: 1 and 7 outer electrons are both maximally reactive configurations.',
      ],
    },
  ],
}
