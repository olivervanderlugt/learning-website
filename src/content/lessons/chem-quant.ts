import type { Lesson } from '../../types'

export const chemQuantLesson: Lesson = {
  nodeId: 'chem-quant',
  screens: [
    {
      kind: 'explain',
      title: 'Counting atoms by weighing them',
      body: [
        'Atoms are far too small and too many to count one by one. So chemists count by WEIGHING: one MOLE is 6.022×10²³ particles — Avogadro’s number — chosen so that an element’s atomic mass in grams is exactly one mole of it.',
        'Carbon’s atomic mass is 12, so 12 grams of carbon is one mole — about 600 billion trillion atoms. Weigh the grams, divide by the molar mass, and you know the count.',
        'That bridge — grams ↔ moles ↔ number of particles — is the foundation of all quantitative chemistry.',
      ],
      links: [{ nodeId: 'chem-reactions', label: 'Refresher: Reactions & Energy' }],
    },
    {
      kind: 'predict',
      question:
        'A balanced equation reads 2 H₂ + O₂ → 2 H₂O. What do the coefficients 2, 1, 2 actually tell you?',
      options: [
        'The RATIO of particles that react: 2 molecules of H₂ per 1 of O₂, giving 2 of H₂O',
        'The mass in grams of each substance',
        'The temperature needed for each',
        'How many seconds the reaction takes',
      ],
      correctIndex: 0,
      reveal:
        'Coefficients are a MOLE RATIO, not masses. 2 H₂ + O₂ → 2 H₂O means “2 moles of hydrogen react with 1 mole of oxygen to make 2 moles of water” — or 2 dozen with 1 dozen, any scale. This ratio is the heart of STOICHIOMETRY: once you know moles of one substance, the balanced equation converts it into moles of every other. (The equation must be BALANCED first — the same count of each atom on both sides, because atoms are conserved.)',
    },
    {
      kind: 'code',
      prompt:
        'Ammonia synthesis: N₂ + 3 H₂ → 2 NH₃. You have 2 mol N₂ and 3 mol H₂. One runs out first (the LIMITING reagent) and caps the product. Compute the NH₃ made from the limiting reagent using its mole ratio.',
      starter:
        "// N2 + 3 H2 -> 2 NH3.  Ratio: 1 N2 needs 3 H2; 3 H2 make 2 NH3.\nconst n2 = 2\nconst h2 = 3\nconst h2_needed = n2 * 3            // H2 required to consume all the N2\nprint('H2 needed for all N2:', h2_needed)\nconst limiting = h2 >= h2_needed ? 'N2' : 'H2'\nprint('limiting reagent:', limiting)\n// H2 is limiting. From 3 H2 -> 2 NH3, mol NH3 = mol H2 * (2/3). Complete it:\nconst nh3 = \nprint('NH3 produced (mol):', nh3)",
      expected: 'H2 needed for all N2: 6\nlimiting reagent: H2\nNH3 produced (mol): 2',
      hint: 'h2 * 2/3',
      success:
        'All the N₂ would need 6 mol H₂ but only 3 are present, so H₂ LIMITS the reaction and the extra N₂ is left over. Scaling 3 mol H₂ by the 2/3 ratio gives 2 mol NH₃ — the theoretical yield. Every yield calculation is this: find what runs out first, then ride the mole ratio to the product.',
    },
    {
      kind: 'explain',
      title: 'Limiting reagents and yield',
      body: [
        'The LIMITING reagent is whatever runs out first — it sets the maximum product; everything else is in EXCESS and partly wasted. Real reactions rarely hit 100%, so actual/theoretical is the PERCENT YIELD.',
        'Molar mass (grams per mole) converts the tidy mole ratio back to real grams you can weigh out on a scale.',
        'This is design, not trivia: mix reactants off-ratio and you pay for material that never reacts.',
      ],
      deeper: [
        'To find molar mass, add up the atomic masses of every atom in the formula. Water (H₂O) = 2×1 + 16 = 18 g/mol; CO₂ = 12 + 2×16 = 44 g/mol. So 18 g of water and 44 g of CO₂ each contain exactly the same NUMBER of molecules — one mole. Mass differs; count is identical.',
        'Concentration ties moles to volume: molarity (mol/L) is how solutions are dosed. A “0.1 M” solution has 0.1 mole of solute per litre — the language of every buffer, electrolyte and battery chemistry you’ll mix.',
        'Stoichiometry scales linearly, which is why it’s so powerful: double every reactant and you double the product, exactly. It’s just ratios — the same proportional reasoning as gear ratios or unit conversions, applied to matter.',
      ],
      links: [{ nodeId: 'chem-quant-2', label: 'Next: how much ENERGY the reaction moves' }],
    },
    {
      kind: 'quiz',
      question: 'What is a mole?',
      options: [
        'A fixed count of particles — 6.022×10²³ — so an element’s atomic mass in grams is one mole of it',
        'A unit of mass equal to one gram',
        'The volume one atom takes up',
        'The energy released by a reaction',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the mole is a COUNT (Avogadro’s number), the chemist’s “dozen,” calibrated so grams-of-atomic-mass = one mole. It turns weighable grams into countable particles.',
        'A mole is a count, not a mass — though it’s DEFINED so that atomic-mass-in-grams equals one mole, which is why the two feel linked.',
        'It has nothing to do with an atom’s volume — it’s purely how many particles.',
        'Energy is thermochemistry (next lesson); the mole just counts particles.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In 2 H₂ + O₂ → 2 H₂O, you react 4 mol H₂ with plenty of O₂. How many moles of water form?',
      options: [
        '4 mol — the 2 H₂ : 2 H₂O ratio is 1-to-1',
        '2 mol — water is always half the hydrogen',
        '8 mol — double the hydrogen',
        '1 mol — one water per equation',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the coefficients 2 and 2 give a 1-to-1 mole ratio, so 4 mol H₂ → 4 mol H₂O (with O₂ in excess).',
        'That would be the ratio if it were 2 H₂ → 1 H₂O, but the balanced equation makes two waters from two hydrogens.',
        'Scaling up the reactant doesn’t change the RATIO — 4 mol H₂ can’t make more water than the 1-to-1 ratio allows.',
        'The coefficients are per-reaction ratios you scale, not a fixed one-water cap.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You mix reactants and one is the “limiting reagent.” What does that mean?',
      options: [
        'It runs out first, so it sets the maximum product; the others are left in excess',
        'It is the most expensive ingredient',
        'It slows the reaction down',
        'It is whichever you added the most of',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the reaction stops when the limiting reagent is consumed — it caps the yield, and any excess of the others is simply unreacted.',
        'Cost is unrelated; “limiting” is purely about which quantity runs out first given the mole ratio.',
        'It doesn’t change the rate — it determines how much product you can make, not how fast.',
        'Often it’s whichever you added LEAST of relative to the ratio — you must compare against the stoichiometry, not raw amount.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why must an equation be BALANCED before you use its coefficients as a mole ratio?',
      options: [
        'Atoms are conserved — the same count of each element must appear on both sides, or the ratio is wrong',
        'Because it looks neater',
        'To make the reaction go faster',
        'So the molar masses cancel out',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: matter isn’t created or destroyed, so every atom on the left must reappear on the right. Only a balanced equation gives a ratio that respects that conservation.',
        'It’s not cosmetic — an unbalanced equation gives physically wrong amounts.',
        'Balancing is bookkeeping on paper; it doesn’t touch reaction rate.',
        'Molar masses don’t cancel — balancing is about atom COUNTS, which the coefficients encode.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'How many moles are in 36 grams of water (H₂O, molar mass 18 g/mol)?',
      options: ['2 mol', '18 mol', '36 mol', '0.5 mol'],
      correctIndex: 0,
      explanations: [
        'Correct: moles = grams ÷ molar mass = 36 ÷ 18 = 2 mol. The molar mass is the exchange rate between grams and moles.',
        '18 is the molar mass itself, not the answer — divide the sample mass by it.',
        '36 is the grams you started with; moles is that divided by 18.',
        '0.5 inverts the division — it’s 18 ÷ 36; moles is grams over molar mass, 36 ÷ 18.',
      ],
    },
    {
      question: 'The molar mass of CO₂ (C = 12, O = 16) is…',
      options: ['44 g/mol', '28 g/mol', '32 g/mol', '12 g/mol'],
      correctIndex: 0,
      explanations: [
        'Correct: add every atom — 12 (C) + 2×16 (O) = 44 g/mol. A formula’s molar mass is just the sum of its atomic masses.',
        '28 forgets one oxygen (12 + 16); CO₂ has TWO oxygens.',
        '32 counts the two oxygens but drops the carbon; include all atoms.',
        '12 is only the carbon; the two oxygens add 32 more.',
      ],
    },
    {
      question: 'For 2 Al + 3 Cl₂ → 2 AlCl₃, how many moles of Cl₂ react with 4 mol of Al?',
      options: ['6 mol', '4 mol', '3 mol', '12 mol'],
      correctIndex: 0,
      explanations: [
        'Correct: the ratio is 2 Al : 3 Cl₂, so 4 mol Al × (3/2) = 6 mol Cl₂. Ride the coefficients as a ratio.',
        '4 mol ignores the ratio — Cl₂ is needed in a 3-to-2 proportion to Al, not 1-to-1.',
        '3 is the raw coefficient; you must scale it to the 4 mol of Al actually present.',
        '12 multiplies by 3 instead of by 3/2 — remember the Al coefficient is 2, not 1.',
      ],
    },
    {
      question: 'A reaction has a theoretical yield of 10 g but you actually collect 8 g. The percent yield is…',
      options: ['80%', '125%', '8%', '18%'],
      correctIndex: 0,
      explanations: [
        'Correct: percent yield = actual ÷ theoretical × 100 = 8 ÷ 10 × 100 = 80%. Real reactions lose some to side-reactions and handling.',
        '125% inverts the fraction (10 ÷ 8) — you can’t exceed 100% by collecting LESS than predicted.',
        '8% drops the division by theoretical — percent yield compares the two amounts, not the raw grams.',
        '18 adds the two masses; percent yield is a ratio of actual to theoretical.',
      ],
    },
  ],
}
