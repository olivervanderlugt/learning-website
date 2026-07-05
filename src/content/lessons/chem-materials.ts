import type { Lesson } from '../../types'

export const chemMaterialsLesson: Lesson = {
  nodeId: 'chem-materials',
  screens: [
    {
      kind: 'explain',
      title: 'Why metals bend and conduct',
      body: [
        'In a metal, atoms give up their outer electrons into a shared “sea” that flows freely around a lattice of positive ions. That one picture explains almost everything metallic.',
        'Free-flowing electrons = electrical (and heat) conduction. Ions that can slide past each other without breaking bonds = bendable, not brittle.',
        'Plastics are the opposite: their electrons are locked into specific covalent bonds along long carbon chains — nothing free to flow, so they insulate.',
      ],
      links: [{ nodeId: 'phys-electricity', label: 'What conduction means: Electricity & Circuits' }],
    },
    {
      kind: 'predict',
      question: 'Drop a ceramic mug and it shatters; drop a steel mug and it dents. Both are held by strong bonds — why the different failure?',
      options: [
        'Metal ions can slide to a new position and re-bond; ceramic bonds are rigid and directional — once broken, there’s no sliding, so cracks run',
        'Ceramic bonds are much weaker than metal bonds',
        'Steel is softer than ceramic in every way',
        'The ceramic was already cracked',
      ],
      correctIndex: 0,
      reveal:
        'It’s about what happens AFTER a bond is stressed. The electron sea lets metal ions shuffle sideways and instantly re-bond — the dent is billions of atoms that moved and re-stuck. Ceramic bonds are strong but fixed in direction: atoms can’t slide, so stress concentrates at a crack tip and rips through. Strong ≠ tough: ceramics are often HARDER than steel yet shatter — hardness and toughness are different properties.',
    },
    {
      kind: 'explain',
      title: 'The engineer’s menu',
      body: [
        'Four material families: METALS (strong, conductive, heavy-ish), POLYMERS/plastics (light, cheap, insulating, weak-ish), CERAMICS (hard, heat-proof, brittle), and COMPOSITES — a strong fiber glued in a light matrix, like carbon fiber in epoxy.',
        'Composites cheat the menu: fibers carry the load, matrix holds the shape — strength of one, lightness of the other. That’s why drones and race cars are carbon fiber.',
        'Every robot part is a line on this menu: aluminium frame, copper windings, plastic housings, ceramic insulators, carbon-fiber arms.',
      ],
      deeper: [
        'The number that rules mobile robots is SPECIFIC strength/stiffness — performance per kilogram. Steel is stronger than aluminium per cm², but aluminium wins per kg, and carbon fiber beats both along the fiber direction. Every gram of structure is battery life you spent.',
        'Composites have a catch: they’re strong along the fibers, weak across them — designers lay fiber sheets in multiple directions (0°/45°/90°) like plywood. Anisotropy is a feature to design WITH, not just a flaw.',
        'Why copper for wires everywhere? Best conductor after silver, at 1% of the price, and ductile enough to draw into wire — engineering picks are always property × cost, not property alone.',
      ],
    },
    {
      kind: 'predict',
      question: 'A battery has two DIFFERENT metals in a conductive liquid. Why must the metals be different?',
      options: [
        'The two metals hold electrons unequally tightly — that difference is what pushes electrons through your circuit',
        'Two identical metals would react too violently',
        'One metal must melt for current to flow',
        'It’s only a cost-saving choice',
      ],
      correctIndex: 0,
      reveal:
        'A battery is a tug-of-war over electrons. Metals differ in how easily they give electrons up (their reactivity): zinc releases them readily, copper holds tighter. Connect them through a circuit and electrons flow from the eager giver to the eager taker — the voltage is the DIFFERENCE in grip. Identical metals = no difference = zero volts, no violence, just nothing. This is electrochemistry: chemical asymmetry converted to electrical push.',
    },
    {
      kind: 'explain',
      title: 'Electrochemistry: chemistry ⇄ electricity',
      body: [
        'Discharging a battery: the reactive metal dissolves (oxidation — losing electrons), electrons travel through YOUR circuit doing work, and are accepted at the other electrode (reduction). One reaction, split in two places, with the circuit as the only bridge.',
        'Recharging runs it backwards: the charger pushes electrons the other way, un-dissolving the metal. Lithium-ion cells do exactly this, shuttling lithium ions between electrodes thousands of times.',
        'Corrosion is the same chemistry uninvited: iron + water + oxygen form a tiny battery, and your robot’s frame is the dissolving electrode. Rust is a battery you didn’t want.',
      ],
      deeper: [
        'The reactivity ranking of metals (lithium and zinc near the top, copper, silver and gold near the bottom) is the master key: it predicts battery voltage (further apart = more volts), which metal corrodes first, and why gold — bottom of the list — never tarnishes and plates every critical connector.',
        'Galvanic corrosion trap for builders: bolt aluminium to steel in a damp chassis and you’ve built an accidental battery — the aluminium sacrifices itself. Fix: insulate the joint, or exploit the effect deliberately (ships bolt on zinc “sacrificial anodes” that corrode INSTEAD of the hull).',
        'Why lithium for robot batteries? Top of the reactivity list (big voltage per cell: ~3.7 V vs ~1.5 V for alkaline) AND the third-lightest element — maximum electrical push per gram. Chemistry chose your battery, not marketing.',
      ],
      links: [{ nodeId: 'chem-reactions', label: 'The energy bookkeeping: Reactions & Energy' }],
    },
    {
      kind: 'quiz',
      question: 'Why do metals conduct electricity while plastics don’t?',
      options: [
        'Metals have a sea of free-moving electrons; plastics lock all electrons into fixed covalent bonds',
        'Metals contain more electrons in total',
        'Plastics are less dense than metals',
        'Metals are shinier, which attracts current',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: conduction needs charge that can MOVE. Metal outer electrons roam the whole lattice; a polymer’s electrons are pinned in place along its chains.',
        'Total electron count is irrelevant — what matters is whether any are free to flow (an insulating atom of lead has plenty of electrons).',
        'Density doesn’t decide conduction — graphite is light and conducts; glass is denser than lithium metal and insulates.',
        'Shine is a SYMPTOM of the same free electrons (they reflect light) — it doesn’t cause conduction.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Ceramics are often harder than steel, yet shatter where steel dents. The distinction is…',
      options: [
        'Hardness vs toughness — resisting scratches is different from absorbing impact by deforming',
        'Ceramics have weaker bonds than metals',
        'Steel is always the superior material',
        'Ceramics are hard only when cold',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: hardness resists surface deformation; toughness absorbs energy by plastic flow. Metal ions slide and re-bond (dent); ceramic bonds are directional and can’t slide (crack).',
        'Ceramic bonds are typically very strong — rigidity, not weakness, is what makes cracks catastrophic.',
        '“Superior” depends on the job: for heat shields and insulators, brittle-but-refractory ceramic wins.',
        'Temperature isn’t the axis here — ceramics stay hard AND brittle hot or cold.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What makes carbon-fiber composite ideal for a drone arm?',
      options: [
        'Stiff, strong fibers carry the load while a light matrix holds them — top strength per gram',
        'It is cheaper than injection-molded plastic',
        'It conducts electricity better than copper',
        'It is heavier than aluminium, adding stability',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the fiber/matrix split gives near-metal stiffness at a fraction of the weight — and grams are battery life on anything that moves or flies.',
        'Carbon fiber is expensive in both material and labor — you pay for the weight savings.',
        'Carbon conducts somewhat, far worse than copper — and that’s not why it’s chosen for structure.',
        'It’s much LIGHTER than aluminium — and added weight helps nothing on a drone.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Where does a battery’s voltage fundamentally come from?',
      options: [
        'The difference in how tightly the two electrode materials hold electrons',
        'The amount of liquid electrolyte',
        'The physical size of the battery',
        'The thickness of its wires',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: voltage is the reactivity GAP between electrodes — lithium-based pairs sit far apart (~3.7 V/cell); closer pairs give less. Same pair, same voltage, any size.',
        'More electrolyte/material adds CAPACITY (runtime), not voltage — a watch cell and a car cell of the same chemistry match voltages.',
        'Size scales energy stored, not the per-cell push — that’s why packs stack cells in series for more volts.',
        'Wires affect resistance and max current, never the chemical push itself.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You bolt an aluminium bracket directly to a steel frame on an outdoor robot. Months later the aluminium is pitted and crumbling. What happened?',
      options: [
        'Galvanic corrosion — the metal pair plus moisture formed a battery, and aluminium was the dissolving electrode',
        'Aluminium naturally evaporates outdoors',
        'The steel absorbed the aluminium',
        'Vibration alone ate the bracket',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: two different metals + rainwater = an accidental cell; the more reactive aluminium oxidizes (dissolves) to protect the steel. Insulate dissimilar-metal joints, or add a sacrificial zinc.',
        'Metals don’t evaporate at outdoor temperatures — the aluminium LEFT as dissolved ions, electrochemically.',
        'Atoms don’t migrate into bulk steel — the loss went into corrosion products, not the other metal.',
        'Vibration causes cracking and fretting, not the pitted, powdery chemical attack described.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Ships bolt slabs of zinc to their steel hulls. Why?',
      options: [
        'Zinc is more reactive than iron, so it corrodes FIRST, sparing the hull',
        'Zinc makes the hull lighter',
        'Zinc conducts sonar signals better',
        'Zinc kills barnacles chemically',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a sacrificial anode — in the seawater battery, zinc volunteers as the dissolving electrode and is replaced cheaply at dry dock.',
        'A few hundred kilos of zinc on a ship is rounding error — it’s electrochemical protection, not weight design.',
        'Sonar is acoustic; zinc plays no role in it.',
        'Anti-fouling is a separate (paint) technology — the zinc is there for the hull’s own metal.',
      ],
    },
    {
      question: 'For a mobile robot chassis, why might you choose aluminium over stronger steel?',
      options: [
        'Aluminium is stronger PER KILOGRAM — and on a battery-powered machine, mass is runtime',
        'Aluminium is immune to all corrosion',
        'Steel cannot be machined',
        'Aluminium is a better electrical insulator',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: specific strength rules mobile design — a lighter frame means less motor torque and battery drain for the same job.',
        'Aluminium corrodes too (its oxide skin usually protects it, but galvanic pairing defeats that) — corrosion isn’t the reason.',
        'Steel machines fine — it’s just ~3× denser, and that weight costs energy every second the robot moves.',
        'Aluminium CONDUCTS well (power lines use it) — insulation is the opposite of true.',
      ],
    },
  ],
}
