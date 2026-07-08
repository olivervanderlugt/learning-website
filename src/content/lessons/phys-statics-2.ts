import type { Lesson } from '../../types'

export const physStatics2Lesson: Lesson = {
  nodeId: 'phys-statics-2',
  screens: [
    {
      kind: 'explain',
      title: 'It’s not the force, it’s the force per area',
      body: [
        'A thread snaps under a load a steel cable shrugs off — same force, different outcome. What actually decides whether material fails is STRESS: force spread over the cross-sectional area, σ = F/A.',
        'Double the area and you halve the stress, because the same load is shared over more material. That’s why a thick bar holds what a thin one can’t, and why stress — not raw force — is what you compare against a material’s limits.',
        'Stress has units of pressure (pascals, N/m²); engineers usually quote it in megapascals (MPa = N/mm²) because real parts see millions of pascals.',
      ],
      deeper: [
        'This is normal (axial) stress — force acting perpendicular to the area, pulling (tension) or pushing (compression). There’s a cousin, SHEAR stress, where the force acts ALONG the area instead (think scissors, or a bolt trying to slide apart) — same idea, σ or τ = force/area, different direction. Bolts, welds and glued joints are usually sized against shear; a hanging cable against tension.',
      ],
      links: [{ nodeId: 'phys-statics', label: 'Where the forces come from: equilibrium' }],
    },
    {
      kind: 'predict',
      question:
        'A steel rod carries a 10 kN pull and reaches a stress of 100 MPa. You replace it with a rod of DOUBLE the cross-sectional area, same load. What is the new stress?',
      options: [
        '50 MPa — twice the area shares the same force, so half the stress',
        '100 MPa — stress depends only on the load, not the area',
        '200 MPa — a bigger rod means more stress',
        '25 MPa — stress falls with the square of the area',
      ],
      correctIndex: 0,
      reveal:
        'Stress is σ = F/A, so doubling A with the same F halves the stress: 100 → 50 MPa. More cross-section means the same load is spread thinner. This is the core sizing lever — if a part is over-stressed, give it more area. (It scales with A directly, not A², so double area is exactly half stress.)',
    },
    {
      kind: 'explain',
      title: 'How much it stretches, and when it breaks',
      body: [
        'Under stress a material STRETCHES. The fractional stretch is STRAIN, ε = ΔL/L — how much longer it got, divided by how long it was. For stiff materials in normal use, stress and strain are proportional: σ = E·ε (Hooke’s law).',
        'That constant E is YOUNG’S MODULUS, the material’s stiffness. Steel’s E ≈ 200 GPa is huge, so steel barely strains under big stress; rubber’s tiny E stretches easily. E is a property of the material, not the part’s shape.',
        'This proportionality only holds in the ELASTIC region — remove the load and it springs back. Push past the YIELD strength and the material deforms permanently (plastic); push further and it fractures. Engineers keep the working stress well below yield with a SAFETY FACTOR.',
      ],
      deeper: [
        'Combine the definitions and you can predict how much a bar stretches under load: ε = σ/E = (F/A)/E, and ΔL = ε·L = F·L/(A·E). So elongation grows with load and length, and shrinks with more area or a stiffer material. A safety factor of, say, 2 means you only ever load the part to half its yield stress — headroom for overloads, flaws, fatigue and the fact that materials aren’t perfect. Sizing a robot’s structural members is exactly this: keep σ = F/A comfortably under yield/(safety factor).',
      ],
    },
    {
      kind: 'predict',
      question:
        'A steel bracket is loaded until the stress passes its yield strength, then the load is removed. What happens?',
      options: [
        'It stays permanently bent — past yield the deformation is plastic and does not spring back',
        'It springs back exactly to its original shape',
        'It instantly shatters into pieces',
        'Nothing changes; steel never deforms',
      ],
      correctIndex: 0,
      reveal:
        'Below yield, deformation is elastic — release the load and it returns to shape. But once stress exceeds the YIELD strength, some deformation becomes plastic (permanent), so the bracket stays bent even after unloading. It hasn’t fractured yet (that’s the higher ultimate strength), but it’s ruined. This is why designs keep working stress below yield, with a safety-factor margin.',
    },
    {
      kind: 'code',
      prompt:
        'Compute stress σ = F/A and elongation ΔL = F·L/(A·E) for a steel bar (E = 200 GPa) under a 10 kN load, for two cross-sections. Fill in the two missing lines and see how a thicker bar lowers both stress and stretch.',
      starter: `const F = 10000, L = 2, E = 200e9 // N, m, Pa (steel)
function bar(A) {
  const stress = 0     // fill in: F / A            (in pascals)
  const stretch = 0    // fill in: F * L / (A * E)   (in metres)
  return 'stress=' + (stress / 1e6).toFixed(1) + 'MPa  stretch=' + (stretch * 1000).toFixed(2) + 'mm'
}
print('A=1cm2: ' + bar(1e-4))
print('A=2cm2: ' + bar(2e-4))`,
      expected: `A=1cm2: stress=100.0MPa  stretch=1.00mm
A=2cm2: stress=50.0MPa  stretch=0.50mm`,
      hint: 'stress = F / A. Elongation combines the definitions: ΔL = F * L / (A * E). Doubling A halves both.',
      success:
        'Doubling the cross-section from 1 cm² to 2 cm² cut the stress from 100 to 50 MPa AND the stretch from 1.0 to 0.5 mm — both scale as 1/A. Steel’s huge E = 200 GPa is why even 100 MPa only stretches a 2 m bar by a single millimetre. This F/A vs. material-limit comparison is how every structural member gets sized.',
    },
    {
      kind: 'quiz',
      question: 'What is mechanical stress?',
      options: [
        'Force per unit cross-sectional area, σ = F/A',
        'The total force on a part',
        'The change in length of a part',
        'Force multiplied by area',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: stress spreads the internal force over the area it acts on, σ = F/A — that’s what you compare against a material’s strength.',
        'Raw force alone doesn’t determine failure; the SAME force over a smaller area gives higher stress.',
        'Change in length relates to strain, not stress.',
        'Stress DIVIDES force by area; multiplying gives the wrong units and meaning.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Strain (ε = ΔL/L) is…',
      options: [
        'The fractional change in length — a dimensionless ratio',
        'The force applied to the material',
        'The stiffness of the material',
        'The stress divided by the area',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: strain is how much it stretched divided by its original length — a pure number with no units.',
        'Force is what causes strain; strain itself is a length ratio.',
        'Stiffness is Young’s modulus E, which relates stress to strain — not strain itself.',
        'Stress divided by area is dimensionally wrong; strain is ΔL/L.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Young’s modulus E in Hooke’s law σ = E·ε represents…',
      options: [
        'The stiffness of the material — how much stress it takes to produce a given strain',
        'The maximum force the part can hold',
        'The weight of the material',
        'The cross-sectional area of the part',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: E is the slope of stress vs. strain — a high E (like steel’s 200 GPa) means big stress produces little strain (very stiff).',
        'Maximum load is set by strength and area, not by E; E governs stiffness, not the failure point.',
        'E is a stiffness property, independent of the part’s weight.',
        'Area is a geometric property of the part; E is an intrinsic material property.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why do engineers apply a safety factor, keeping working stress well below the yield strength?',
      options: [
        'To leave headroom for overloads, material flaws, fatigue and uncertainty, so the part stays in the elastic (recoverable) region',
        'Because materials get stronger when loaded lightly',
        'To make the part as heavy as possible',
        'Because stress cannot be calculated accurately at all',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: real loads, materials and models are imperfect, so a safety factor keeps the true stress a comfortable margin below yield — the part never deforms permanently in service.',
        'Materials don’t strengthen from light loading; the margin is about uncertainty and overloads.',
        'A safety factor doesn’t aim to add weight for its own sake — it’s a stress margin (though it often does add material).',
        'Stress IS calculable; the safety factor covers the gap between the idealized calculation and messy reality.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A cable of cross-section 2 mm² (2×10⁻⁶ m²) carries 400 N. What is the stress?',
      options: ['200 MPa', '800 MPa', '100 MPa', '0.5 MPa'],
      correctIndex: 0,
      explanations: [
        'Correct: σ = F/A = 400 / (2×10⁻⁶) = 2×10⁸ Pa = 200 MPa.',
        '800 MPa would use a quarter of the area; here A = 2×10⁻⁶ m² gives 200 MPa.',
        '100 MPa halves the correct value — check the arithmetic: 400/2×10⁻⁶ = 2×10⁸.',
        '0.5 MPa divides the wrong way; stress is force OVER area, giving a large number here.',
      ],
    },
    {
      question:
        'A 1 m bar strains by ε = 0.002 under load. How much did it elongate (ΔL = ε·L)?',
      options: ['2 mm', '0.002 mm', '2 m', '0.2 mm'],
      correctIndex: 0,
      explanations: [
        'Correct: ΔL = ε·L = 0.002 × 1 m = 0.002 m = 2 mm.',
        '0.002 mm is off by a factor of 1000 — 0.002 m equals 2 mm.',
        '2 m would be a 200% stretch; ε = 0.002 is only 0.2%.',
        '0.2 mm is ten times too small; 0.002 × 1 m = 2 mm.',
      ],
    },
    {
      question:
        'Two rods, same material and load, but rod B has twice the cross-sectional area of rod A. How do their stresses compare?',
      options: [
        'Rod B has half the stress of rod A',
        'Rod B has twice the stress of rod A',
        'They have the same stress',
        'Rod B has a quarter of the stress',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: σ = F/A, so with the same F, doubling A halves the stress — rod B sees half of rod A’s stress.',
        'More area gives LESS stress, not more.',
        'Equal stress would need equal area (or the areas wouldn’t matter), but B has double the area.',
        'Stress scales as 1/A, not 1/A², so double area is half stress, not a quarter.',
      ],
    },
    {
      question: 'A material is loaded into its ELASTIC region and then unloaded. What happens?',
      options: [
        'It returns exactly to its original shape',
        'It stays permanently deformed',
        'It fractures',
        'It becomes permanently stiffer',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: elastic deformation is fully recoverable — remove the load and it springs back, like a stretched spring.',
        'Permanent deformation happens only PAST the yield point (plastic region), not within the elastic region.',
        'Fracture is well beyond yield; the elastic region is far from failure.',
        'Elastic loading doesn’t change the material’s stiffness — E is unchanged.',
      ],
    },
  ],
}
