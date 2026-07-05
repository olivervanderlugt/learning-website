import type { Lesson } from '../../types'

export const chemReactionsLesson: Lesson = {
  nodeId: 'chem-reactions',
  screens: [
    {
      kind: 'explain',
      title: 'A reaction is a rearrangement',
      body: [
        'A chemical reaction never creates or destroys atoms — it only rearranges which atoms are bonded to which. Burn methane (CH₄ + 2O₂ → CO₂ + 2H₂O) and count: 1 carbon, 4 hydrogens, 4 oxygens on each side.',
        'What changes is the ENERGY: breaking bonds costs energy, forming bonds releases it.',
        'The balance between those two decides whether a reaction heats things up or cools them down.',
      ],
      links: [{ nodeId: 'chem-atoms', label: 'Refresher: Atoms & the Periodic Table' }],
    },
    {
      kind: 'predict',
      question: 'Burning methane RELEASES heat. Where was that energy before the flame?',
      options: [
        'Stored in the arrangement of chemical bonds — the new bonds are lower-energy than the old ones',
        'Inside the atoms’ nuclei',
        'Created by the flame out of nothing',
        'Absorbed from the surrounding air’s warmth',
      ],
      correctIndex: 0,
      reveal:
        'The energy is positional, like a ball on a hill: the old bonds (C–H, O=O) sit HIGHER in energy than the new ones (C=O, O–H). Rearranging into stronger, lower-energy bonds releases the difference as heat and light. Nuclear energy is a different (million-fold bigger) story, and energy is never created — chemistry just cashes out what the bonds stored.',
    },
    {
      kind: 'explain',
      title: 'Exothermic, endothermic, and the spark',
      body: [
        'Reactions that release energy are EXOTHERMIC (burning, batteries discharging); ones that absorb it are ENDOTHERMIC (photosynthesis, charging a battery, instant cold packs).',
        'Puzzle: if burning releases energy, why doesn’t your fuel ignite by itself? Because breaking the FIRST bonds needs an upfront payment — the ACTIVATION ENERGY. A match provides it; the reaction’s own heat pays it forward from there.',
        'A CATALYST lowers that entry fee without being consumed — same reaction, less spark needed.',
      ],
      deeper: [
        'Picture an energy landscape: reactants sit in one valley, products in a deeper one, with a hill between. Reaction speed depends on the HILL height (activation energy); energy released depends only on the VALLEY difference. Catalysts carve a tunnel through the hill — they change the speed, never the payout.',
        'Temperature is molecular speed: hotter molecules crash harder and more often clear the hill. A rule of thumb: many reactions roughly double their rate per 10 °C — which is why batteries die in the cold and electronics age in the heat.',
        'This is also why lithium batteries are dangerous when damaged: a short heats the cell, heat speeds the internal reactions, which release more heat — thermal runaway. Robot battery-pack design is largely managing this exact loop.',
      ],
    },
    {
      kind: 'predict',
      question: 'A cold pack turns icy when you snap it (an endothermic process starts). Where does the coldness “come from”?',
      options: [
        'The dissolving process absorbs heat FROM the water and surroundings, so the pack’s temperature drops',
        'The pack releases stored coldness',
        'A tiny refrigerator inside the pack switches on',
        'It violates energy conservation slightly',
      ],
      correctIndex: 0,
      reveal:
        'Cold isn’t a substance — it’s the ABSENCE of heat. Pulling the salt’s particles apart into solution costs more energy than the new particle-water attractions pay back, and the deficit is withdrawn from the surroundings as heat. The pack feels cold because it’s draining warmth from your skin. Energy conservation holds perfectly: heat moved, nothing vanished.',
    },
    {
      kind: 'quiz',
      question: 'In every chemical reaction, what is strictly conserved?',
      options: [
        'The atoms — same count of each element before and after',
        'The molecules — same substances before and after',
        'The temperature',
        'The bonds — same bonds before and after',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: atoms are only re-partnered, never created or destroyed — that’s why chemical equations must balance.',
        'Molecules are exactly what CHANGES — methane and oxygen become carbon dioxide and water.',
        'Temperature routinely changes — that’s the exothermic/endothermic distinction.',
        'Bonds break and form — the reshuffling of bonds IS the reaction.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A reaction is exothermic when…',
      options: [
        'The new bonds formed are collectively lower-energy (stronger) than the bonds broken',
        'It needs no activation energy',
        'It absorbs heat from its surroundings',
        'It happens very fast',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: products in a deeper energy valley than reactants → the difference exits as heat/light.',
        'Even very exothermic reactions (like combustion) usually need a spark — activation energy is about the hill, not the valleys.',
        'That’s endothermic — exothermic reactions RELEASE heat.',
        'Speed is a separate axis: rust is exothermic and takes years; some fast processes absorb heat.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does gasoline sit safely in a tank yet burn fiercely once lit?',
      options: [
        'The reaction needs activation energy first; once burning, its own heat activates the next molecules',
        'Gasoline only becomes flammable when hot',
        'Oxygen cannot touch gasoline in a tank',
        'The tank’s metal suppresses the reaction chemically',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: room-temperature collisions can’t clear the activation-energy hill; a spark pushes some molecules over, and the released heat chain-reacts the rest.',
        'Gasoline’s flammability is constant — what changes with heat is how many molecules can clear the hill.',
        'There’s air (and gasoline vapor) in every tank — contact isn’t the barrier, energy is.',
        'The metal is inert here; nothing about steel suppresses combustion chemistry.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does a catalyst change about a reaction?',
      options: [
        'Its speed — by lowering activation energy — while the energy released stays the same',
        'The amount of energy the reaction releases',
        'The identity of the products',
        'It gets consumed to fuel the reaction',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a catalyst is a tunnel through the hill — faster to the SAME destination, and it emerges unchanged to catalyze again.',
        'The valley difference (energy payout) is fixed by reactants and products — no catalyst can change thermodynamics.',
        'Same products, reached faster; changing products would mean a different reaction entirely.',
        'By definition a catalyst is NOT consumed — that’s what distinguishes it from a reactant.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Your robot’s lithium battery pack must avoid “thermal runaway”. What is the feedback loop to fear?',
      options: [
        'Heat speeds up internal reactions, which release more heat, which speeds them further',
        'Cold slows the reactions until the battery explodes',
        'The battery absorbs so much heat it freezes',
        'Catalysts in the battery run out',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: rate rises with temperature (roughly doubling per ~10 °C), so heat → faster exothermic reactions → more heat — a positive feedback loop. Pack design (cooling, fusing, spacing) exists to break it.',
        'Cold SLOWS reactions — it hurts performance, not safety; the danger is the hot direction.',
        'An exothermic runaway releases heat; it cannot freeze itself.',
        'Batteries don’t run on catalysts; the runaway is about rate–temperature feedback.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Charging a battery is endothermic (energy in); discharging is exothermic (energy out). What are you doing when charging?',
      options: [
        'Pushing the chemistry uphill into a higher-energy arrangement it can later fall back down from',
        'Creating new electrons inside the battery',
        'Cooling the battery below room temperature',
        'Adding more lithium atoms from the charger',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: electrical energy forces the reaction backwards into the higher valley — a chemical spring, compressed now, released on demand.',
        'Electrons are neither created nor destroyed — charging moves them (and lithium ions) to the other electrode.',
        'Charging usually WARMS a battery slightly (losses); the endothermic bookkeeping is in the chemistry, not the casing temperature.',
        'No atoms travel through the charger cable — only energy does; the battery’s atoms just rearrange.',
      ],
    },
    {
      question: 'Rusting iron releases energy (it’s exothermic), yet a nail rusts over years, not seconds. Why?',
      options: [
        'High activation energy and limited contact make the reaction extremely slow despite being downhill',
        'Rusting is actually endothermic',
        'Iron atoms resist all reactions',
        'Rust only forms in the dark',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: speed and energy payout are independent — rust is a deep valley reached over a high hill, crossed a few molecules at a time. (Hand-warmer packets speed the same reaction with powdered iron and salt water.)',
        'Rusting releases heat — powdered-iron hand warmers literally run on it.',
        'Iron reacts readily (that’s the corrosion problem!) — just slowly in bulk form.',
        'Light is irrelevant to rust; moisture and oxygen are what matter.',
      ],
    },
  ],
}
