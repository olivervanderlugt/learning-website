import type { Lesson } from '../../types'

export const chemQuant2Lesson: Lesson = {
  nodeId: 'chem-quant-2',
  screens: [
    {
      kind: 'explain',
      title: 'Every reaction moves energy',
      body: [
        'Breaking a chemical bond COSTS energy; forming one RELEASES energy. A reaction’s net energy is the difference — captured as its enthalpy change, ΔH.',
        'If more energy comes out than went in, ΔH is negative and the reaction is EXOTHERMIC (it heats its surroundings — a fire, a battery discharging). If it soaks up heat, ΔH is positive and ENDOTHERMIC (a cold pack).',
        'Enthalpy is why fuels burn, batteries deliver power, and motor drivers get hot.',
      ],
      links: [{ nodeId: 'chem-quant', label: 'Refresher: Moles & Stoichiometry' }],
    },
    {
      kind: 'predict',
      question:
        'A reaction breaks bonds worth 679 kJ and forms bonds worth 864 kJ. Is it exothermic or endothermic?',
      options: [
        'Exothermic — forming released MORE (864) than breaking cost (679), so net energy leaves',
        'Endothermic — bond-breaking always wins',
        'Neither — the energy exactly cancels',
        'Impossible to tell without the temperature',
      ],
      correctIndex: 0,
      reveal:
        'ΔH = (energy to break bonds) − (energy released forming bonds) = 679 − 864 = −185 kJ. Negative ΔH means the products sit at LOWER energy than the reactants, and the surplus 185 kJ escapes as heat — exothermic. The rule: stronger bonds forming than breaking ⇒ energy released. This bond-accounting is the simplest way to estimate any reaction’s heat.',
    },
    {
      kind: 'code',
      prompt:
        'Estimate ΔH from bond energies for H₂ + Cl₂ → 2 HCl. ΔH = (bonds broken) − (bonds formed). Bond energies (kJ/mol): H–H 436, Cl–Cl 243, H–Cl 432. Compute ΔH.',
      starter:
        "// ΔH = energy to BREAK reactant bonds  -  energy RELEASED forming product bonds.\n// H2 + Cl2 -> 2 HCl.  Break: one H-H + one Cl-Cl.  Form: two H-Cl.\nconst broken = 436 + 243        // H-H + Cl-Cl\nconst formed = 2 * 432          // two H-Cl bonds\nconst deltaH = \nprint('bonds broken (kJ):', broken)\nprint('bonds formed (kJ):', formed)\nprint('deltaH (kJ):', deltaH)\nprint('exothermic?', deltaH < 0)",
      expected: 'bonds broken (kJ): 679\nbonds formed (kJ): 864\ndeltaH (kJ): -185\nexothermic? true',
      hint: 'broken - formed',
      success:
        'ΔH = 679 − 864 = −185 kJ: the two H–Cl bonds are stronger (release more) than the H–H and Cl–Cl bonds cost to break, so 185 kJ leaves as heat — exothermic. Flip which side is bigger and you’d get a positive ΔH, an endothermic reaction that pulls heat IN.',
    },
    {
      kind: 'explain',
      title: 'Reversible reactions and Le Chatelier',
      body: [
        'Many reactions run BOTH ways at once and settle at EQUILIBRIUM — forward and reverse rates equal, concentrations steady (not stopped, just balanced).',
        'LE CHATELIER’S PRINCIPLE: disturb an equilibrium and it shifts to oppose the change. Add a reactant → it shifts forward to consume it. Remove product → it shifts forward to replace it. Raise temperature → it favors the endothermic direction.',
        'Charging a battery is literally pushing its reaction backward against equilibrium.',
      ],
      deeper: [
        'The equilibrium constant K captures the balance point: K = products/reactants (each raised to its coefficient) at equilibrium. Large K means the reaction lies mostly toward products; small K means it barely proceeds. K depends only on temperature — that’s why heating a reaction can change where it settles.',
        'HESS’S LAW says ΔH is path-independent: the total heat of a reaction is the same whether it happens in one step or ten, so you can add the ΔH of known steps to get the ΔH of one you can’t measure directly. It’s conservation of energy applied to chemistry — the enthalpy “altitude” only depends on start and end, not the route.',
        'Exothermic doesn’t mean fast. ΔH tells you the energy DIFFERENCE (thermodynamics); a separate barrier, the activation energy, sets the SPEED (kinetics). Diamond turning to graphite is exothermic yet takes eons — a catalyst lowers the barrier without changing ΔH, the same trick enzymes and catalytic converters use.',
      ],
      links: [{ nodeId: 'chem-quant-3', label: 'Next: harvesting the electrons — Batteries' }],
    },
    {
      kind: 'quiz',
      question: 'A reaction has ΔH = −92 kJ. What does the negative sign tell you?',
      options: [
        'It’s exothermic — it releases 92 kJ of heat; products are lower-energy than reactants',
        'It’s endothermic — it absorbs 92 kJ',
        'It runs backward only',
        'It cannot happen at all',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: negative ΔH = energy leaves the system as heat. The products sit lower on the energy scale, and the drop is given off.',
        'Endothermic is POSITIVE ΔH (heat absorbed) — the opposite sign.',
        'The sign is about energy, not direction of reaction; exothermic reactions run forward and warm their surroundings.',
        'A negative ΔH actually favors a reaction happening — it releases energy, it doesn’t forbid the reaction.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A reversible reaction is at equilibrium. You add more reactant. By Le Chatelier’s principle, what happens?',
      options: [
        'It shifts FORWARD, consuming the added reactant to make more product',
        'It shifts backward to make more reactant',
        'Nothing — equilibrium can’t change',
        'The reaction stops permanently',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the system opposes the disturbance by consuming what you added — shifting toward products until a new balance is reached.',
        'Shifting backward would ADD to the excess reactant, worsening the disturbance — the opposite of what Le Chatelier predicts.',
        'Equilibrium is dynamic and responsive — a change in conditions moves it to a new balance point.',
        'It never stops; it re-balances. Equilibrium means equal forward/reverse rates, not a halt.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You estimate ΔH from bond energies. When is a reaction exothermic?',
      options: [
        'When the bonds FORMED release more energy than the bonds BROKEN cost',
        'When breaking bonds releases more than forming them',
        'Whenever any bonds break at all',
        'Only at high temperature',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: net heat out means the product bonds are stronger — forming them pays back more than breaking the reactant bonds cost. ΔH = broken − formed is negative.',
        'Breaking bonds always COSTS energy (never releases it) — energy comes out only when new bonds FORM.',
        'Breaking bonds alone is endothermic; it’s the forming step that can release the surplus.',
        'Temperature can shift equilibrium, but whether ΔH is negative is set by the bond energies, not the temperature.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Hess’s law lets you add the ΔH of several steps to find an overall ΔH. Why is that valid?',
      options: [
        'Enthalpy depends only on start and end states, not the path taken — like altitude gained on a hike',
        'Because heat is always conserved as a fixed number for every reaction',
        'Because reactions always take the shortest path',
        'It isn’t valid — ΔH must be measured directly',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: ΔH is a state function — the net energy change is fixed by the endpoints, so any route (real or hypothetical) gives the same total. That’s why step-ΔHs add.',
        'It’s not a fixed universal number — different reactions have different ΔH; the point is that the PATH between the same endpoints doesn’t matter.',
        'Reactions don’t choose paths by length; Hess’s law works precisely because the path is irrelevant to ΔH.',
        'Hess’s law is standard practice exactly so you DON’T have to measure hard-to-run reactions directly.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A hand-warmer gets hot when activated. The reaction inside is…',
      options: [
        'Exothermic (ΔH negative) — it releases heat to your hands',
        'Endothermic (ΔH positive) — it absorbs heat',
        'At equilibrium with no net energy change',
        'Neither — warmth is unrelated to chemistry',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: it gives OFF heat, so energy leaves the reaction — exothermic, negative ΔH.',
        'Endothermic reactions get COLD (they pull heat in) — that’s an instant cold pack, not a hand-warmer.',
        'A system at equilibrium with no net change wouldn’t steadily pour out heat.',
        'The warmth IS the reaction’s released enthalpy — very much chemistry.',
      ],
    },
    {
      question:
        'Raising the temperature of a reaction at equilibrium favors its endothermic direction. Why?',
      options: [
        'Added heat is a disturbance; the system shifts the way that ABSORBS heat to oppose it',
        'Heat always speeds only the forward reaction',
        'Temperature never affects equilibrium',
        'Because endothermic reactions are faster',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: Le Chatelier again — treat added heat like an added “reactant,” and the system shifts toward the side that consumes heat (the endothermic direction).',
        'Heat speeds BOTH directions; the shift is about which direction relieves the added heat, not just the forward one.',
        'Temperature is the one thing that changes the equilibrium constant K itself — it very much matters.',
        'Speed (kinetics) is separate from which way equilibrium shifts (thermodynamics); the shift follows heat absorption.',
      ],
    },
    {
      question:
        'A reaction is exothermic but sits unchanged for years until you add a catalyst. What does the catalyst change?',
      options: [
        'It lowers the activation-energy barrier (speed), without changing ΔH',
        'It makes ΔH more negative',
        'It supplies the energy the reaction was missing',
        'It reverses the reaction',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: catalysts are kinetics, not thermodynamics — they lower the barrier so the reaction gets going, but the start-to-end energy drop (ΔH) is untouched.',
        'ΔH is fixed by the reactants and products; a catalyst can’t change it.',
        'A catalyst doesn’t donate energy — it opens a lower-barrier path; the reaction’s own ΔH powers it.',
        'It speeds the reaction toward the same products, not backward.',
      ],
    },
    {
      question:
        'Two reactions: A has a large equilibrium constant K, B has a tiny K. Which lies mostly toward products at equilibrium?',
      options: [
        'A — a large K means products dominate the balance',
        'B — a small K means more product',
        'Both equally — K doesn’t indicate that',
        'Neither reaches equilibrium',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: K = products/reactants at equilibrium, so a LARGE K means the top (products) dominates — the reaction goes nearly to completion.',
        'A small K means the reaction barely proceeds — reactants dominate, not products.',
        'K directly reports the products-to-reactants balance, so it absolutely distinguishes them.',
        'Both reach equilibrium; K just says WHERE that balance sits.',
      ],
    },
  ],
}
