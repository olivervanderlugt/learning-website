import type { Lesson } from '../../types'

export const mecheMakingLesson: Lesson = {
  nodeId: 'meche-making',
  screens: [
    {
      kind: 'explain',
      title: 'From a perfect drawing to a real part',
      body: [
        'A CAD model is geometrically perfect. Real parts never are — every dimension comes out a little off. A TOLERANCE is the allowed range: “10.00 mm ±0.05” means anything from 9.95 to 10.05 is acceptable.',
        'When two parts mate, their tolerances decide the FIT: a shaft in a hole is a CLEARANCE fit (always a gap), a TRANSITION fit (maybe snug), or an INTERFERENCE fit (forced together, press-fit).',
        'Getting tolerances right is the difference between parts that assemble and a box of scrap.',
      ],
      links: [{ nodeId: 'meche-gears', label: 'Refresher: Gears, Linkages & Mechanisms' }],
    },
    {
      kind: 'predict',
      question:
        'Why not just specify every dimension as an exact number — say, a shaft of exactly 10.000 mm — and skip tolerances?',
      options: [
        'No process makes exact parts; a tolerance defines how much variation still works, and tighter tolerances cost more',
        'Exact dimensions are always achievable if the machine is good',
        'Tolerances are only about making drawings look professional',
        'Exact numbers would make parts cheaper to produce',
      ],
      correctIndex: 0,
      reveal:
        'Every real process — machining, moulding, printing — has scatter, so “exactly 10.000” is physically impossible; you’d reject 100% of parts. A tolerance states how much deviation still functions, and it’s an economic dial: halving a tolerance can multiply cost, because it demands better machines, more measurement and more scrap. Good engineering means loose tolerances everywhere you can afford and tight ones only where the fit truly matters.',
    },
    {
      kind: 'code',
      prompt:
        'A shaft goes in a hole, each with a tolerance band. The clearance is (hole − shaft). The TIGHTEST fit uses the smallest hole and largest shaft; the LOOSEST uses the largest hole and smallest shaft. Compute the maximum clearance. (Sizes in micrometres.)',
      starter:
        "// Clearance = hole - shaft. Work the two worst cases from the tolerance bands.\nconst holeMin = 5000, holeMax = 5030   // hole is 5000-5030 um\nconst shaftMin = 4950, shaftMax = 4980 // shaft is 4950-4980 um\nconst minClearance = holeMin - shaftMax // tightest: smallest hole, largest shaft\nprint('min clearance (um):', minClearance)\n// Loosest fit: largest hole, smallest shaft. Compute it:\nconst maxClearance = \nprint('max clearance (um):', maxClearance)\nprint('always a clearance fit?', minClearance > 0)",
      expected: 'min clearance (um): 20\nmax clearance (um): 80\nalways a clearance fit? true',
      hint: 'holeMax - shaftMin',
      success:
        'Even in the worst case the hole is 20 µm bigger than the shaft, so the parts ALWAYS fit with a gap — a guaranteed clearance fit. Flip the bands so the shaft could exceed the hole and you’d risk an interference (jam) — which is exactly how press-fits and bearings are designed on purpose. This min/max reasoning is a tolerance stack-up, the daily arithmetic of making things fit.',
    },
    {
      kind: 'explain',
      title: 'How the part actually gets made',
      body: [
        'The process shapes the design. 3D PRINTING builds up layers — cheap for one-off complex shapes, but weak along the layers. MACHINING (CNC) cuts away from a block — strong and precise, but slower and wasteful. MOULDING/casting is dirt-cheap per part but needs an expensive mould, so it only pays off at volume.',
        'DESIGN FOR MANUFACTURE means shaping your part to its process: draft angles for moulding, avoiding overhangs for printing, reachable faces for machining.',
        'The best design that can’t be made is worthless — how you’ll build it is part of designing it.',
      ],
      deeper: [
        'Tolerance stack-up scales: chain five parts each ±0.1 mm and the worst-case assembly can be off by ±0.5 mm — errors add. This is why a long arm of loosely-toleranced links can wander centimetres at the fingertip, and why robots either tighten key tolerances or CALIBRATE the accumulated error out in software.',
        'Process picks track quantity: 3D printing and CNC win for 1–100 parts (no tooling cost); injection moulding and casting win past ~1000 (the mould cost amortizes). A startup prototypes on a printer, then re-designs for moulding once volume justifies the tool — the same part, re-thought for a new process.',
        'GD&T (geometric dimensioning and tolerancing) goes beyond size to control FORM and POSITION — flatness, concentricity, true position — because a hole can be exactly the right diameter yet in exactly the wrong place. It’s the formal language that makes a drawing unambiguous to any machine shop on earth.',
      ],
      links: [{ nodeId: 'meche-exam', label: 'Test the whole module: Mechanical Engineering exam' }],
    },
    {
      kind: 'quiz',
      question: 'What does a tolerance of “20.0 mm ±0.1” actually specify?',
      options: [
        'Any size from 19.9 to 20.1 mm is acceptable — the allowed range of variation',
        'The part must be exactly 20.0 mm or it’s scrap',
        'The part will always be 20.1 mm',
        'The part’s weight must be 20 grams',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: ±0.1 defines a band (19.9–20.1 mm) within which the part functions — real processes always land somewhere in a range, not on an exact value.',
        'Demanding exactly 20.0 would reject every real part; the ± is precisely what makes production possible.',
        'It won’t always hit the top of the band — it lands somewhere in 19.9–20.1, unpredictably.',
        'The tolerance is on the DIMENSION (size), not weight.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A shaft is guaranteed SMALLER than its hole across all tolerances. This is a…',
      options: [
        'Clearance fit — there is always a gap, so it always assembles freely',
        'Interference fit — it must be pressed together',
        'Transition fit — it might or might not fit',
        'Manufacturing error — shafts must be bigger than holes',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: shaft always < hole means a guaranteed gap — a clearance fit that slides together every time (bearings, sliding pins).',
        'Interference is the opposite — the shaft is LARGER, forced in; here it’s always smaller.',
        'A transition fit is when the bands overlap so it could go either way; here the shaft is always smaller, so it’s definitively clearance.',
        'A shaft smaller than its hole is a normal, intentional clearance fit, not an error.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does injection moulding only make sense at high volume, while 3D printing suits one-offs?',
      options: [
        'Moulding needs an expensive mould (huge upfront cost) but is cheap per part; printing has no tooling cost but is slow per part',
        'Moulding is always cheaper than printing at any quantity',
        'Printing produces stronger parts, so it’s used for mass production',
        'They cost exactly the same regardless of quantity',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the mould’s big fixed cost only pays off spread over thousands of parts; printing skips tooling, so it wins for a handful even though each part is slow.',
        'At LOW volume moulding is far more expensive — the mould cost dominates until quantity is high.',
        'Printed parts are usually WEAKER (especially along layers); volume production favors moulding for cost, not print strength.',
        'Cost per part depends heavily on quantity — that trade is the whole reason to switch processes.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Five stacked parts are each 10 mm ±0.1 mm. What is the worst-case total length?',
      options: [
        '50 mm ±0.5 mm — tolerances add across the stack',
        '50 mm ±0.1 mm — tolerance stays the same',
        '50 mm exactly — the errors cancel',
        '10 mm ±0.5 mm — only one part counts',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: worst-case tolerances ADD, so five ±0.1 parts stack to 50 mm ±0.5 mm — the reason long assemblies drift.',
        'The band grows with each part in the worst case; it doesn’t stay ±0.1.',
        'Errors CAN cancel on average, but the worst case (all high or all low) is ±0.5 — you design for the worst case.',
        'All five parts contribute to both the length (50 mm) and the accumulated tolerance (±0.5).',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A hole is 8.00–8.04 mm and a pin is 8.05–8.07 mm. Across all tolerances the pin is always bigger. This is a…',
      options: [
        'Interference (press) fit — the pin must be forced in and grips tightly',
        'Clearance fit — it slides in freely',
        'Transition fit — sometimes tight, sometimes loose',
        'Impossible combination',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: pin always larger than the hole means it can’t drop in — it’s pressed in and held by interference, exactly how bearings and dowels are retained.',
        'Clearance needs the pin SMALLER than the hole; here it’s always larger, so no free slide.',
        'Transition fits need overlapping bands (could go either way); here the pin is always bigger, so it’s firmly interference.',
        'It’s a perfectly normal, deliberate press-fit — very common in real assemblies.',
      ],
    },
    {
      question: 'Tightening a tolerance from ±0.2 mm to ±0.02 mm typically…',
      options: [
        'Raises cost sharply — it needs better machines, more inspection and more rejected parts',
        'Has no effect on cost',
        'Lowers cost by simplifying the drawing',
        'Makes the part lighter',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: tighter tolerances demand precision equipment, more measurement and more scrap — cost climbs fast, so you tighten only where the fit truly needs it.',
        'Cost is very sensitive to tolerance; an order-of-magnitude tighter band is much more expensive.',
        'A tighter number on the drawing makes the PART harder to make, not cheaper.',
        'Tolerance controls dimensional variation, not weight.',
      ],
    },
    {
      question: 'For a strong, precise metal bracket in a batch of five, the best process is usually…',
      options: [
        'CNC machining — precise and strong, with no tooling cost to amortize at low volume',
        'Injection moulding — cheapest for five parts',
        'Casting a custom mould for each one',
        'Whatever is slowest',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: machining gives metal strength and tight tolerances with zero tooling cost, so it wins for small batches where a mould could never pay off.',
        'Moulding needs a costly mould that only amortizes over thousands — wildly uneconomic for five.',
        'A per-part custom mould is the most expensive route imaginable for five parts.',
        'Process choice is about cost, strength and precision — not deliberately picking the slowest.',
      ],
    },
    {
      question: 'GD&T (geometric dimensioning and tolerancing) adds control over a feature’s FORM and POSITION because…',
      options: [
        'A hole can be exactly the right size yet in the wrong place or crooked — size alone isn’t enough',
        'It replaces the need for any size tolerances',
        'It makes parts cheaper by removing tolerances',
        'It only applies to 3D-printed parts',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: diameter tolerance says nothing about WHERE the hole sits or whether it’s square — GD&T pins down position, flatness, concentricity and more so the drawing is unambiguous.',
        'It works alongside size tolerances, adding form/position control, not replacing dimensional limits.',
        'It adds control (and rigor), not fewer tolerances — it makes intent precise, which can raise cost where needed.',
        'GD&T applies to any manufacturing process, not just printing.',
      ],
    },
  ],
}
