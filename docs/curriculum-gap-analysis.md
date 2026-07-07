# Bachelor-Curriculum Gap Analysis — Foundations app

**Purpose:** hand-off document for a coding agent building Stage 1/2 content (3-lesson mini-course chains) in the Learning website app. One section per domain: canonical syllabus → gap ranking vs current app coverage → problem sources → resource shortlist. Ordered by priority: math → physics → chemistry → robotics/control → AI/ML → CS core → the rest.

**Link verification:** every URL was fetched live on 2026-07-06 by research agents. ✓ = fetched with content confirmed. ✓ᴶ = URL resolves but page is JS-rendered (shell only via fetcher — fine in a browser). "(linked)" = appears as a link on a fetched page, not independently fetched.

**Gap-ranking legend:** **(a)** essential for robotics · **(b)** essential to pass a real first-year exam / degree level · **(c)** nice-to-have.

---

## 0. VU Amsterdam context (Ollie's own degree)

Source: NVAO accreditation report of the SBI bachelor (Jan 2023, Appendix E) ✓ https://publicaties.nvao.net/prd/AV-1776_20230704_Rapport_25-01-2023_Report_Ba_Innov_VU.pdf plus VU curriculum pages ✓ https://vu.nl/en/education/bachelor/computer-science/curriculum and ✓ https://vu.nl/en/education/bachelor/mathematics/curriculum. **Course codes could not be verified** (studiegids.vu.nl is JS-rendered and unscrapable) — names only, no invented codes.

**SBI bachelor (Ollie's programme):**
- Year 1: Calculus (6 EC), Physics: Mechanics (3 EC), Physics Lab (3 EC), Biochemistry, Organic Chemistry, Sustainable Chemistry, plus business/innovation courses.
- Year 2: Statistics (6 EC), Linear Algebra (3 EC), Applied Computer Science (3 EC — SBI's *only* programming course), Thermodynamics (3 EC), Physics: Electricity & Magnetism (3 EC).
- SBI has **no** discrete math, no data structures/algorithms, no systems courses; chemistry is applied (organic/bio/sustainable), not a general-chemistry survey.

**VU Computer Science (Informatica) year 1–2, for comparison:** Computer Programming, Logic & Sets, Data Structures & Algorithms, Computer Organisation, Computer Networks, Discrete Math & Calculus (y1); Operating Systems, Linear Algebra, Statistical Methods, Databases (y2); Automata & Complexity, Machine Learning (y3).

**VU Mathematics year 1:** Single Variable Calculus, Multivariable Calculus, Mathematical Analysis, Linear Algebra, Probability Theory, Basic Concepts in Mathematics (proof technique), Discrete Mathematics.

**Entry baseline:** VWO wiskunde B ≈ single-variable differentiation/integration + trig, **no** linear algebra, almost no probability. So the app's calculus chain overlaps the entry baseline, while its linalg/probability chains are genuinely first-year-university territory. Dutch remediation source if a VWO gap shows up: Math4All ✓ https://www.math4all.nl/. Khan Academy NL exists (partial translation) ✓ https://nl.khanacademy.org/.

**Practical implication:** the app directly complements SBI — it supplies everything SBI lacks (CS core, discrete math, deep robotics) and reinforces what SBI grades him on (calculus y1 NOW, statistics/linalg/E&M/thermo in y2). Build order below weights the y2 SBI courses accordingly.

---

## 1. Math

Current app coverage: linalg ×3 (vectors, matrices-as-transformations, determinants & eigenvectors), calculus ×3 (derivative intuition, rules/chain rule, integrals), probability ×3 (basics/LLN, distributions/EV, Bayes), logic ×1, 14-question exam.

**Bottom line:** the app covers ~the first third of 18.01, the intuition layer of 18.06, and the probability half of 18.05. Entirely missing: limits/rigor, integration technique, Taylor series, ALL multivariable, ALL ODEs, the four-subspaces core of linalg (rank, orthogonality, least squares, SVD), all of statistics (inference), nearly all discrete math/proofs.

### 1.1 Canonical courses

| Area | Course | URL |
|---|---|---|
| Calc I/II | MIT 18.01SC (OCW Scholar) | ✓ https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/ |
| Multivariable | MIT 18.02SC | ✓ https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/ |
| ODEs | MIT 18.03SC | ✓ https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/ |
| Linear algebra | MIT 18.06SC (Strang) | ✓ https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/ |
| Prob & stats | MIT 18.05 (Spring 2022) | ✓ https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/ |
| Discrete/proofs | MIT 6.042J (Spring 2015) | ✓ https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/ |

VU equivalents: SBI Calculus (y1), Linear Algebra + Statistics (y2); VU Math: Single/Multivariable Calculus, Mathematical Analysis, Linear Algebra, Probability Theory, Basic Concepts (proofs).

Topic lists (condensed from actual syllabi):
- **18.01**: limits, differentiation (rules, implicit, inverse), applications (linear approx, optimization, related rates, Newton's method, MVT), definite integral (Riemann, both FTCs, areas/volumes), techniques (trig sub, partial fractions, by parts), L'Hôpital, improper integrals, Taylor series.
- **18.02**: vectors/matrices, partial derivatives, gradient, directional derivatives, multivariable chain rule, optimization, Lagrange multipliers, double/line integrals, Green's theorem, triple/surface integrals, divergence theorem, Stokes.
- **18.03**: first-order ODEs (separable, linear, integrating factors), second-order constant-coefficient (**damped oscillators, resonance, frequency response** — literally PID math), Fourier series, step/delta, convolution, **Laplace transform, transfer functions, poles**, first-order systems (eigenvalues, phase portraits, matrix exponential, linearization).
- **18.06**: elimination/LU, vector spaces, column space/nullspace, **independence/basis/rank, four subspaces**, **orthogonality, projections, least squares, Gram-Schmidt**, determinants, eigen/diagonalization, exp(At), **positive definite matrices, SVD, pseudoinverse**.
- **18.05**: counting, RVs, distributions, expectation/variance, **covariance/correlation**, CLT, Bayesian inference (priors→posteriors), **NHST/p-values/confidence intervals, linear regression**, bootstrapping.
- **6.042J**: proofs, sets/relations/functions, **induction**, graphs, state machines & invariants, modular arithmetic, counting, discrete probability.

### 1.2 Gap ranking

**(a) essential for robotics — build first:**
1. **Linalg depth 2** (extend chain with -4/-5): rank/nullspace/four subspaces → orthogonality/projections/**least squares** → **SVD & pseudoinverse**. SVD/pseudoinverse is arguably the single most robotics-valuable missing math topic (redundant-arm IK, point-cloud registration, covariance).
2. **ODEs — new chain**: first-order → second-order oscillators/damping/resonance (ties to PidSim!) → systems/phase portraits/matrix exponential (ties to robo-control-3). Include a Laplace/transfer-function teaser as the control bridge.
3. **Multivariable slice**: partial derivatives → gradient + multivariable chain rule → **Jacobians** + Lagrange multipliers. (Gradient fixes ai-learning's 1-D-only footing; Jacobians are THE object of robot kinematics.)
4. **Statistics**: variance/**covariance** (the language of Kalman filters) → CLT & estimation → hypothesis testing/CIs → regression. Also founder-relevant (A/B tests, "did my robot actually improve?"). Doubles as SBI y2 Statistics prep.

**(b) essential for degree level:**
5. Calc I completion: limits (incl. informal ε-δ), implicit differentiation, optimization/related rates, integration techniques, Taylor series.
6. Proofs & discrete: sets/relations/functions notation, induction, counting — this IS the Stage-2 bridge; grow math-logic into a chain.
7. Multivariable completion: multiple integrals, Green/divergence/Stokes.

**(c) nice-to-have:** graph-theory proofs, number theory beyond crypto needs, Fourier depth (defer to future Signal Processing domain), Jordan form, complex analysis.

### 1.3 Problem sources (all with solutions)

- 18.01SC / 18.02SC / 18.03SC unit exams + finals with solutions — linked per-unit on each ✓ course page above.
- 18.06 Spring 2010 exams 1–3 + final with solution PDFs ✓ https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/pages/exams/ (Study Materials adds many prior-year exams).
- 18.05 psets w/ solutions ✓ https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/pages/problem-sets/ and exams w/ solutions ✓ .../pages/exams/.
- Paul's Online Math Notes — Calc I–III + ODE practice problems with full step-by-step solutions ✓ https://tutorial.math.lamar.edu/ (Calc I set: ✓ https://tutorial.math.lamar.edu/Problems/CalcI/CalcI.aspx).
- 6.042J psets/exams on the ✓ course page; *Book of Proof* exercises with odd-numbered solutions (below).

### 1.4 Resource shortlist (≤3 per area)

- **Calculus:** 3Blue1Brown *Essence of Calculus* ✓ https://www.3blue1brown.com/topics/calculus · Paul's Notes ✓ · 18.01SC videos ✓.
- **Multivariable:** 18.02SC (Auroux) ✓ · Khan Academy multivariable (Grant Sanderson unit) ✓ᴶ https://www.khanacademy.org · 3B1B divergence/curl ✓.
- **ODEs:** 18.03SC (Mattuck) ✓ · 3Blue1Brown *Differential Equations* series ✓ https://www.3blue1brown.com/topics/differential-equations · Khan Academy ODEs ✓ https://www.khanacademy.org/math/differential-equations.
- **Linear algebra:** 3B1B *Essence of Linear Algebra* ✓ https://www.3blue1brown.com/topics/linear-algebra · Strang 18.06 lectures ✓ · *Interactive Linear Algebra* (Georgia Tech, free interactive textbook) ✓ https://textbooks.math.gatech.edu/ila/.
- **Prob/stats:** StatQuest ✓ https://www.youtube.com/@statquest · *Seeing Theory* (interactive — a perfect pedagogy match for the app) ✓ https://seeing-theory.brown.edu/ · 18.05 Orloff & Bloom readings ✓.
- **Proofs/discrete:** *Book of Proof* 3e (Hammack, free PDF) ✓ https://www.people.vcu.edu/~rhammack/BookOfProof/ · 6.042J open textbook + videos ✓ · Seeing Theory counting chapter ✓.

---

## 2. Physics

Current app coverage: forces (F=ma sim), electricity (Ohm's law sim), energy; exam. Everything else is a gap.

### 2.1 Canonical courses

| Area | Course | URL |
|---|---|---|
| Mechanics | MIT 8.01SC (Fall 2016) | ✓ https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/ |
| E&M | MIT 8.02 (Spring 2007) | ✓ https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2007/ |
| Statics/materials | MIT 2.001 Mechanics & Materials I | ✓ https://ocw.mit.edu/courses/2-001-mechanics-materials-i-fall-2006/ |

VU equivalents: SBI Physics: Mechanics + Physics Lab (y1), Physics: E&M + Thermodynamics (y2).

Topic lists:
- **8.01SC**: vectors → 1D/2D kinematics → Newton's laws (gravity, tension, springs, friction) → circular motion → momentum & impulse → center of mass → work/KE → potential energy & conservation, energy diagrams → collisions → **rigid bodies, moment of inertia, torque, rotational dynamics → angular momentum → rolling → gyroscopes**.
- **8.02**: fields & charge → potential → Gauss's law → conductors/capacitors → current, resistance, **DC circuits** → Biot-Savart, Ampère → **forces/torques on current loops (= how motors work)** → **Faraday induction**, inductance → RL/RC → LC/driven LRC → Maxwell, EM radiation.
- **2.001**: force/moment equilibrium → planar trusses → friction → shear/bending diagrams → stress/strain → principal stress → material failure → beam bending/deflection → **torsion** → energy methods.

### 2.2 Gap ranking

**(a) essential for robotics:**
1. **Kinematics equations (suvat), projectile & circular motion** — already top of the Stage 1 backlog (8.01 weeks 1–3).
2. **Rotational dynamics: torque, moment of inertia, angular momentum, rolling** — THE core physics of motors, arms, wheels, IMUs. Biggest single physics gap (8.01 weeks 10–12).
3. **Momentum, impulse, collisions** — impacts, grippers, legged ground contact.
4. **DC circuits beyond Ohm: KVL/KCL, dividers, RC transients** — sensor interfaces, filtering (8.02 weeks 5, 10; also backlogged).
5. **Magnetic forces/torques + Faraday induction** — how motors and encoders physically work; feeds the future Electronics domain.
6. **Statics & mechanics of materials: FBD equilibrium, trusses, bending, torsion, stress/strain** — a chassis is a structure; motor-shaft sizing is a torsion problem (all of 2.001; seeds the future MechE domain).
7. **Oscillations/SHM + damping/resonance** — badly tuned arms shake; direct cross-link to robo-control-2 (underdamped PID response IS a damped oscillator) and the ODE chain.

**(b) essential for degree level:** Gauss's law quantitatively, capacitance/dielectrics, LC/LRC + Maxwell (qualitative), gravitation/orbits, work-energy formalism, **thermodynamics** (laws, heat engines, entropy — robot thermal budgets; SBI y2 course!), gas laws.

**(c) nice-to-have:** wave interference/EM radiation, fluid statics, special-relativity teaser.

### 2.3 Problem sources

- **8.01L exams page — 4 practice exams each WITH solutions + formula sheets** (the best free "real MIT mechanics exam with answers") ✓ https://ocw.mit.edu/courses/8-01l-physics-i-classical-mechanics-fall-2005/pages/exams/.
- 8.01SC psets ✓ https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/pages/assignments/ — **problems only, no solutions**; its worked-example videos are the solution model.
- 8.02 problem-solving sessions — 11 topic-wise worked PDFs (Gauss → capacitors → Ampère → induction → RC/RL → LRC) ✓ https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2007/pages/problem-solving/. (Note: 8.02T Spring 2005 has NO exams page — don't cite it.)
- 2.001 lecture notes + psets ✓ https://ocw.mit.edu/courses/2-001-mechanics-materials-i-fall-2006/pages/assignments/.
- Isaac Physics — self-marking problems, GCSE→university ramp; closest existing product to the app's mastery model ✓ᴶ https://isaacphysics.org/.
- BPhO past papers (Round-2 include mark schemes) ✓ https://www.bpho.org.uk/ (paper-directory pages are JS-empty to fetchers — spot-check in a browser before curating specific PDFs). IPhO 1967–2025 archive with solutions (stretch material) ✓ https://ipho.olimpicos.net/.

### 2.4 Resource shortlist

- **Mechanics:** 8.01SC ✓ · Walter Lewin 8.01 lectures (40 videos) ✓ https://www.youtube.com/playlist?list=PLyQSN7X0ro203puVhQsmCj9qhlFQ-As8e · The Mechanical Universe (Caltech, 52 eps) ✓ https://www.youtube.com/playlist?list=PL8_xPU5epJddRABXqJ5h5G0dk-XGtA5cZ. Text backbone: OpenStax University Physics Vol. 1 ✓ᴶ https://openstax.org/details/books/university-physics-volume-1.
- **Rotation & oscillations:** 8.01SC weeks 10–12 ✓ https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/pages/week-10-rotational-motion/ · Lewin lectures 19–24, 31–32 ✓ · PhET sims (Torque, Pendulum Lab, Masses & Springs — good models for the app's own sims) ✓ https://phet.colorado.edu/en/simulations/filter?subjects=physics&type=html.
- **E&M:** 8.02 course ✓ · Lewin 8.02 lectures (37 videos) ✓ https://www.youtube.com/playlist?list=PLUdYlQf0_sSsfcNOPSNPQKHDhSjTJATPu · OpenStax Vol. 2 ✓ᴶ https://openstax.org/details/books/university-physics-volume-2.
- **Circuits/electronics:** Falstad CircuitJS (live animated sim — obvious embed/model candidate) ✓ https://www.falstad.com/circuit/ · Ben Eater ✓ https://eater.net/ · Khan Academy circuits ✓ᴶ https://www.khanacademy.org/science/physics.
- **Statics/materials:** 2.001 ✓ · The Efficient Engineer (exceptional animated stress/strain/bending/trusses explainers) ✓ https://www.youtube.com/@TheEfficientEngineer · PhET equilibrium sims ✓.
- **Thermo:** Mechanical Universe eps. 45–48 ✓ · OpenStax Vol. 2 ch. 1–4 ✓ᴶ · 5.111 Unit III (chemical-thermo angle) ✓ https://ocw.mit.edu/courses/5-111sc-principles-of-chemical-science-fall-2014/pages/unit-iii-thermodynamics-chemical-equilibrium/.

---

## 3. Chemistry

Current app coverage: atoms, reactions, materials; exam. Missing everything quantitative.

### 3.1 Canonical course

**MIT 5.111SC Principles of Chemical Science (Fall 2014, Drennan)** ✓ https://ocw.mit.edu/courses/5-111sc-principles-of-chemical-science-fall-2014/ — Units: I The Atom (quantum numbers, orbitals, configurations) · II Bonding & Structure (Lewis, VSEPR, MO theory, periodic trends) · III Thermodynamics & Equilibrium (ΔH/ΔS/ΔG, acid-base, buffers) · IV Transition Metals & **Redox (the electrochemistry unit)** · V Kinetics (rate laws, activation energy, catalysis).

VU equivalents: SBI's Biochemistry / Organic Chemistry / Sustainable Chemistry (applied, y1) — no general-chem survey, so 5.111 fills the foundations under his own coursework.

### 3.2 Gap ranking

**(a) essential for robotics:** **electrochemistry for batteries** — redox, cell potential, energy density, Li-ion behavior (every robot runs on one); **stoichiometry & the mole** — chem's algebra, needed for anything quantitative incl. battery-capacity calcs.
**(b) essential for degree level:** thermochemistry (Hess, ΔG), equilibrium & acid-base/buffers, kinetics & rate laws, quantum electronic structure, bonding (VSEPR/MO), periodic trends.
**(c) nice-to-have:** transition metals, organic basics (functional groups, polymers — ties to chem-materials), nuclear.

### 3.3 Problem sources

**5.111 exams page — 4 exams + final + practice exams, ALL with solutions + equation sheets** (the single best free real-chem-exam source) ✓ https://ocw.mit.edu/courses/5-111sc-principles-of-chemical-science-fall-2014/pages/exams/. Psets also have solutions ✓ (course page).

### 3.4 Resource shortlist

Tyler DeWitt (best stoichiometry/moles teacher online) ✓ https://www.youtube.com/@TylerDeWitt · Chemistry LibreTexts (reference/fact-checking) ✓ https://chem.libretexts.org/ · **Battery University** (BU-104, BU-204 how Li-ion works, BU-302 series/parallel packs, BU-409 charging — perfect `resources` entries for an electrochem-for-robots node) ✓ https://batteryuniversity.com/articles. Text backbone: OpenStax Chemistry 2e ✓ᴶ https://openstax.org/details/books/chemistry-2e.

---

## 4. Robotics Bridge (+ Control Theory)

Current app coverage: sensing, PID ×3 (PID → tuning/Z–N/step metrics → feedforward & state-space incl. x′=Ax+Bu, u=−Kx, Kalman teaser), FK intro, embedded, ROS; exam. The control chain is genuinely ahead of a typical intro; kinematics and estimation are the big gaps.

### 4.1 Canonical courses

| Area | Course | URL |
|---|---|---|
| Robotics | **Modern Robotics** (Lynch & Park, Northwestern) — THE undergrad canon; free book PDF + videos + Coursera + simulator | ✓ https://hades.mech.northwestern.edu/index.php/Modern_Robotics |
| Robotics (2nd pass) | MIT 6.4210 Robotic Manipulation (Tedrake) — free interactive notes, exercises per chapter | ✓ https://manipulation.csail.mit.edu/ |
| Control | MIT 2.004 Dynamics & Control II | ✓ https://ocw.mit.edu/courses/2-004-dynamics-and-control-ii-spring-2008/ |
| Control (stretch) | Underactuated Robotics (Tedrake) — LQR, Lyapunov, trajectory optimization | ✓ https://underactuated.mit.edu/ |

**Modern Robotics topics:** config space/DOF → rigid-body motions (rotation matrices, twists, exponential coords — modern screw-theory alternative to DH; DH is Appendix C) → FK (product of exponentials) → **velocity kinematics & Jacobians** → IK (analytic + Newton–Raphson) → dynamics (Lagrangian + Newton–Euler) → trajectory generation → motion planning → control → wheeled robots. Note: a "DH gap" is better framed as a "rigid-body transforms + Jacobians gap" — matches both the modern canon and the app's linalg chain.
**2.004 topics:** lumped-parameter modeling (ODEs), time-domain response, **frequency response**, feedback compensation.

### 4.2 Gap ranking

**Kinematics & dynamics:**
- (a): rotation matrices & homogeneous transforms; FK on real 6R arms; **Jacobians** (velocity kinematics, singularities — the app's det=0/gimbal-lock hook is the perfect on-ramp); numerical IK. Biggest robotics gap; already on the backlog.
- (b): Lagrangian dynamics / M(q)q̈+C+g=τ; trajectory generation (trapezoidal/quintic).
- (c): screw-theory formalism, closed chains; diff-drive kinematics (cheap, do early).

**Control:**
- (a): **transfer functions & Laplace intuition** (poles ↔ response — why the symptom→gain table works); **stability** (pole locations, gain/phase margin at intuition level); discrete-time effects (sampling/loop rate — formalize what the app touches); **LQR** as "u=−Kx with K chosen optimally" (natural next lesson after robo-control-3).
- (b): Bode plots/frequency response; block-diagram algebra; second-order vocabulary (ζ, ωn, overshoot formulas); root locus (reading level); controllability/observability.
- (c): MPC concept, robust control, system ID, Lyapunov formalism (Stage 2).

**State estimation** (no single canonical course; three free resources = a full course):
- (a): **full 1D → multivariate Kalman filter** (predict/update, Kalman gain, covariance) — the app's math-prob-3 Bayes + linalg chains are the exact prereqs; highest leverage per hour in this whole report. Sensor fusion (IMU+encoder); process vs measurement noise.
- (b): EKF (linearization), particle filter/MCL, Bayes filter as the unifying frame.
- (c): UKF, smoothing.

**Motion planning & SLAM:**
- (a): A* formally (heuristics/admissibility — formalize the existing pathfinder game); **RRT/PRM** (configuration-space planning); occupancy grids; MCL localization.
- (b): SLAM concept + graph-/EKF-SLAM basics; ICP; C-space formally.
- (c): RRT*, trajectory optimization, POMDPs, factor graphs.

**Embedded/ROS** (least-gapped): (a) real hardware/real-time lab project (Stage 3), ROS 2 pub/sub + tf frames (tf ties to kinematics chain); (b) I2C/SPI/UART, PWM/motor drivers (fits the planned H-bridge chain), URDF; (c) RTOS, CAN, micro-ROS.

### 4.3 Problem sources

- Modern Robotics official practice exercises + solutions (PDF, linked from ✓ MR page): https://hades.mech.northwestern.edu/images/e/ef/MR_practice_exercises.pdf
- **Real university exams WITH solutions** — SNU 2017–2020 exam sets on the MR wiki, e.g. https://hades.mech.northwestern.edu/images/2/28/SNU-2017-exams.pdf (linked from ✓ page).
- **OCW 2.004 psets 1–10 + full solutions** ✓ https://ocw.mit.edu/courses/2-004-dynamics-and-control-ii-spring-2008/pages/assignments/.
- rlabbe Kalman book — all exercises include solutions inline (below). Stachniss 2020 exercise ZIP (linked from ✓ Bonn page): https://www.ipb.uni-bonn.de/html/teaching/exercises-2020/2020-stachnisslab-all-exercises.zip.
- Underactuated per-chapter exercises ✓ (autograded notebook versions via Drake/Deepnote).

### 4.4 Resource shortlist

- **Kinematics:** MR book + lightboard videos ✓ · 6.4210 notes ✓ · Stachniss rotation/homogeneous-coords lectures ✓ https://www.ipb.uni-bonn.de/online-training-robotics/index.html (page also embeds Ben Eater's quaternion explorable https://eater.net/quaternions).
- **Control:** Brian Douglas — engineeringmedia.com ✓ https://engineeringmedia.com/ + MATLAB Tech Talks control index ✓ https://www.mathworks.com/videos/tech-talks/controls.html (verified series: PID ×7, Kalman ×7, State Space ×5, Bode ×9, MPC ×10) · OCW 2.004 ✓ · Underactuated ✓.
- **State estimation:** bzarg "How a Kalman filter works, in pictures" (already in app resources; the best first read) ✓ https://www.bzarg.com/p/how-a-kalman-filter-works-in-pictures/ · **rlabbe, Kalman and Bayesian Filters in Python** (free Jupyter book, g-h → KF → EKF/UKF/particle, exercises+solutions) ✓ https://github.com/rlabbe/Kalman-and-Bayesian-Filters-in-Python · kalmanfilter.net (fully worked numerical examples) ✓ https://www.kalmanfilter.net/.
- **Planning/SLAM:** Red Blob Games interactive A* intro (perfect pedagogy match) ✓ https://www.redblobgames.com/pathfinding/a-star/introduction.html · Stachniss online training (complete free mobile-robotics course: Bayes filter → occupancy grids → EKF/MCL → A* → ICP → graph SLAM) ✓ · MR ch. 10 / 6.4210 ch. 6 ✓. Deeper: Stachniss SLAM Course playlist (linked from ✓ page): https://www.youtube.com/playlist?list=PLgnQpQtFTOGQrZ4O5QzbIHgl3b1JHimN_.

---

## 5. AI / ML

Current app coverage: state-space search, gradient descent on L(x)=x², perceptron/XOR; exam.

### 5.1 Canonical courses

| Course | URL |
|---|---|
| MIT 6.390 (ex-6.036) Intro to ML — accessible, prereqs = exactly the app's math chains | ✓ https://introml.mit.edu/ |
| Berkeley CS188 AI (sp25 archive, fully open) — search, CSPs, MDPs, RL, Bayes nets, HMMs, particle filters | ✓ https://inst.eecs.berkeley.edu/~cs188/sp25/ |
| Stanford CS229 (rigor bar; current materials login-gated — reference, not primary track) | ✓ https://cs229.stanford.edu/ |

VU equivalent: Machine Learning (CS y3).

### 5.2 Gap ranking

- (a): **supervised-learning workflow** — linear regression, loss functions, train/val/test, **overfitting/regularization** (a founder evaluating "does my model work" lives here); classification/logistic regression; **backprop** (the app's chain-rule lesson is the perfect prereq — Karpathy micrograd is the lab).
- (b): MDPs + value iteration + Q-learning (bridge from the control chain); bias/variance; cross-entropy/softmax; CNN intuition (robot vision); k-means/PCA.
- (c): SVMs/kernels, learning-theory proofs, transformers/imitation learning, deep-RL algorithms (PPO/SAC).

### 5.3 Problem sources

**CS188 sp25 — every discussion has worksheet + solutions + video, plus exam-prep sets with solutions and the Pacman projects — the best free problem bank in this whole report** ✓. 6.390 exercises/labs ✓. OpenAI Spinning Up exercises (solutions in repo) ✓ https://spinningup.openai.com/en/latest/spinningup/exercises.html.

### 5.4 Resource shortlist

- **Neural nets/backprop:** 3Blue1Brown NN series ✓ https://www.3blue1brown.com/topics/neural-networks · **Karpathy "Zero to Hero"** (micrograd → GPT from scratch) ✓ https://karpathy.ai/zero-to-hero.html · 6.390 notes ✓.
- **Classical ML:** 6.390 ✓ · CS229 notes (bar-setting reference) ✓.
- **RL:** CS188 MDP/RL lectures ✓ · OpenAI Spinning Up ✓ https://spinningup.openai.com/en/latest/ · MATLAB Tech Talks RL series (control-engineer's view) ✓.

---

## 6. How Computers Work / Architecture

Current app coverage: bits, gates, adder (gate sandbox), CPU; exam.

**Canonical:** Nand2Tetris ✓ https://www.nand2tetris.org/ (Boolean logic → ALU → sequential logic/flip-flops → machine language → CPU+memory → assembler → VM → compiler → OS; 12 auto-graded projects) · CMU 15-213/CS:APP ✓ https://www.cs.cmu.edu/~213/ (data representation/two's complement/floats, x86-64, stack, **caches/memory hierarchy**, VM, concurrency). VU equivalent: Computer Organisation (CS y1).

**Gaps:** (a) memory hierarchy & caches; hardware interrupts; **two's complement, overflow, fixed-point** (MCU sensor math); **IEEE 754 floats** (every control-loop numeric bug). (b) **assembly & the stack** (calling conventions — the app jumps gates→CPU with no ISA layer; biggest architecture gap); sequential logic/flip-flops/registers (app is combinational-only); fetch-decode-execute detail, pipelining basics. (c) microarchitecture, linking/loading.

**Problems:** Nand2Tetris projects 1–6 with auto-grading ✓ (https://www.nand2tetris.org/course) · CS:APP self-study labs (bomb/data lab) — http://csapp.cs.cmu.edu/3e/labs.html (linked from ✓ 15-213).

**Resources:** Nand2Tetris ✓ · Ben Eater 8-bit breadboard CPU ✓ https://eater.net/8bit (+ 6502 series — real chips, buses, timing) · CS:APP/15-213 lectures ✓.

---

## 7. Programming (systems level)

Current app coverage: variables, functions, data structures, recursion, debugging/testing — all sandboxed JS; exam.

**Canonical:** Harvard CS50x ✓ https://cs50.harvard.edu/x/ (C → arrays → algorithms → **memory/pointers/malloc** → data structures in C → Python → SQL → web) · CMU 15-213 ✓ (the canonical "C + how it really executes" course). VU equivalents: Computer Programming (CS y1); SBI's Applied Computer Science (y2).

**Gaps:** (a) **C: pointers, arrays-as-memory, malloc/free, structs** — the #1 CS-side robotics *language* gap (embedded/ROS code is C/C++; the #1 *concept* gap is OS concurrency, §9); **bit manipulation** (masks/shifts, MCU registers); compilation model vs the app's interpreted-JS mental model; memory bugs (buffer overflow, dangling pointers). (b) manual data-structure implementation in C (linked list, hash table from raw memory); stack/heap distinction; file I/O. (c) C++ (RAII, templates — needed for ROS 2, second-year), make/CMake, Python fluency.

**Problems:** CS50 psets + check50 auto-grader ✓ (https://cs50.harvard.edu/x/psets/ — Week 4 "memory" psets: filter, recover) · CS:APP labs (above) · Project Euler (math×programming cross-links) ✓ https://projecteuler.net/.

**Resources:** CS50x ✓ · Beej's Guide to C (free full book) ✓ https://beej.us/guide/bgc/ · CS:APP/15-213 ✓.

---

## 8. Algorithms & Data Structures

Current app coverage: Big-O, data-structures survey, BFS vs A* game; exam.

**Canonical:** **MIT 6.006 Spring 2020** ✓ https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/ — sorting (insertion/merge/counting/radix), hashing (chaining, universal), heaps, BSTs/AVL, BFS/DFS, weighted shortest paths (Bellman-Ford, **Dijkstra**), **dynamic programming (4 lectures, SRTBOT framework)**, complexity. (Successor 6.1210 = same course renumbered; the 2020 capture is the complete public version.) VU equivalent: Data Structures & Algorithms (CS y1).

**Gaps:** (a) **Dijkstra + weighted shortest paths** (app has the game, not the mechanics); **dynamic programming** (trajectory optimization, Viterbi — entirely missing); **heaps/priority queues** (inside every planner); hash-table internals (collisions, load factor). (b) **sorting + divide & conquer + recurrences** (the classic first-year exam core — entirely missing); BST/AVL balancing; loop-invariant correctness arguments. (c) radix sort, network flow, amortized analysis.

**Problems:** **6.006 psets ×9 (PS0–PS8) w/ solutions** ✓ https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/assignments/ + **quizzes w/ solutions** ✓ .../pages/quizzes/ — the best free exam-with-solutions source among all CS domains.

**Resources:** 6.006 OCW (videos + notes) ✓ · Abdul Bari algorithms playlist (YouTube; well-regarded for sorting/DP intuition) · CS50 Week 3 ✓ as on-ramp.

---

## 9. Operating Systems

Current app coverage: round-robin scheduling, page tables, polling vs interrupts; exam.

**Canonical:** **OSTEP** (free book) ✓ https://pages.cs.wisc.edu/~remzi/OSTEP/ — virtualization (processes, fork/exec, scheduling/MLFQ, paging/TLBs) · **concurrency (threads, locks, CVs, semaphores, deadlock)** · persistence (disks, FS, journaling) · MIT 6.1810 xv6 labs ✓ https://pdos.csail.mit.edu/6.1810/2025/. VU equivalent: Operating Systems (CS y2).

**Gaps:** (a) **threads, locks, race conditions, deadlock — the most robotics-critical missing CS concept in the whole app** (concurrent sensor/control/comms loops; ROS executors); fork/exec/wait; real-time-flavored scheduling (priority — why RR isn't enough for control loops). (b) VM beyond one page table (TLB, multi-level, swapping, COW); file systems (inodes, journaling — robot data logging); syscalls/user-kernel boundary. (c) RAID, mmap, distributed FS.

**Problems:** **OSTEP homework simulators — Python scripts that generate unlimited problems and compute answers (`-c` flag); perfect fit for the app's quiz model** ✓ https://pages.cs.wisc.edu/~remzi/OSTEP/Homework/homework.html (code: https://github.com/remzi-arpacidusseau/ostep-homework/) · 6.1810 labs (self-graded via `make grade`) ✓.

**Resources:** OSTEP book ✓ · 6.1810 xv6 labs ✓ · Computerphile OS shorts (c-tier).

---

## 10. Networks

Current app coverage: layered stack, packets/TTL/routing, HTTP vs MQTT; exam.

**Canonical:** **Kurose & Ross companion site** ✓ https://gaia.cs.umass.edu/kurose_ross/index.php — free full lecture videos, **auto-generated interactive problems with answers** (https://gaia.cs.umass.edu/kurose_ross/interactive/), Wireshark labs. Topics: application layer (HTTP, DNS, sockets) → transport (UDP, reliable transfer, **TCP: handshake, flow/congestion control**) → network layer (IP, routing) → link layer (Ethernet, ARP). · Stanford CS144 (build TCP piece-by-piece in C++) ✓ https://cs144.github.io/. VU equivalent: Computer Networks (CS y1).

**Gaps:** (a) **sockets programming** (UDP/TCP client-server — ROS DDS, telemetry; app has zero hands-on networking); UDP-vs-TCP tradeoff mechanics (why robot control uses UDP/DDS); IP addressing/subnets/DHCP/ARP (debugging a robot's LAN). (b) TCP specifics (handshake, seq numbers, retransmission, AIMD); DNS; sliding-window protocol design (classic exam material). (c) BGP/OSPF detail, 802.11 internals, NAT traversal.

**Problems:** Kurose-Ross interactive problems (unlimited, with answers) + Wireshark labs (linked from ✓ site) · CS144 labs (public specs, auto-testable) ✓.

**Resources:** Kurose-Ross site ✓ · Beej's Guide to Network Programming ✓ https://beej.us/guide/bgnet/ · Ben Eater "How the Internet works" ✓ https://eater.net/inet.

---

## 11. Databases

Current app coverage: relational model/FKs, SQL SELECT/WHERE/JOIN, transactions/ACID/indexes; exam. **Lowest robotics urgency of all CS domains — rank below OS/networks.**

**Canonical:** **CMU 15-445 (Fall 2025, Pavlo)** ✓ https://15445.courses.cs.cmu.edu/fall2025/ — SQL depth, storage/buffer pools, **B+trees**, joins, query optimization, 2PL/MVCC, ARIES recovery; full lecture videos on YouTube. VU equivalent: Databases (CS y2).

**Gaps:** (b) **normalization (1NF–3NF/BCNF, functional dependencies)** — standard first-year exam topic, missing; B+tree mechanics; SQL depth (GROUP BY/HAVING, subqueries, NULL semantics); isolation levels/2PL beyond the lost-update story; ER modeling. (a) thin: SQLite-on-robot/rosbag-style time-series logging patterns, indexes for sensor-log queries. (c) query-optimizer internals, distributed, building BusTub.

**Problems:** **15-445 written homeworks ×6 WITH official solution PDFs** (SQL, storage, indexes, execution, transactions, recovery) ✓ https://15445.courses.cs.cmu.edu/fall2025/assignments.html · CS50 SQL (gentler psets) ✓ https://cs50.harvard.edu/sql (linked from ✓ CS50).

**Resources:** 15-445 lectures + HW solutions ✓ · CS50 SQL ✓ · SQLBolt-style drills only if needed.

---

## 12. Theory of Computation

Current app coverage: FSMs, Turing/halting, P vs NP; exam.

**Canonical:** **MIT 18.404J (Fall 2020, taught by Sipser himself)** ✓ https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/ — regular languages (**DFA/NFA equivalence, regex, pumping lemma**), CFGs/PDAs, Turing machines & decidability, **reductions**, P/NP/NP-completeness (Cook-Levin), space complexity. VU equivalents: Logic & Sets (CS y1), Automata & Complexity (CS y3).

**Gaps:** (b) regex ↔ DFA/NFA equivalence + pumping lemma (the standard exam core — app has FSMs-as-behaviors, no formal-language angle); CFGs (= how parsers work); reductions (undecidability + NP-completeness proofs); proof technique itself (dovetails with the math-logic Stage-2 bridge). (a) thin: regex as a practical tool; CFGs → parsing config/command languages; FSM minimization. (c) space complexity, oracles, interactive proofs.

**Problems:** 18.404J psets (no official solutions) + **exams incl. sample final WITH solutions** ✓ https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/pages/exams/. **Theory has the thinnest free solved-problem supply of any domain — app-authored extraPractice pools matter most here.**

**Resources:** 18.404J Sipser lectures ✓ · Sipser 3e (book, paid) · Computerphile automata/halting videos (c-tier).

---

## 13. Security

Current app coverage: threat models, Caesar→public-key concept, least privilege/secure boot; exam.

**Canonical:** **pwn.college (ASU)** ✓ https://pwn.college/ — free hands-on dojo: Linux → assembly → reverse engineering → memory corruption → web → crypto; auto-graded in-browser challenges (doubles as C/assembly practice — big synergy with §6–7). · **Cryptopals** ✓ https://cryptopals.com/ — implement-and-break real crypto: XOR → **AES**-ECB/CBC attacks → MACs → **Diffie-Hellman → RSA**.

**Gaps:** (a) memory-safety vulnerabilities (buffer overflow — robot firmware is C; ties to the C gap); **TLS in practice + real symmetric crypto (AES, HMAC)** — securing robot↔cloud links (app stops at "public keys exist"); signed-firmware mechanics beyond the concept. (b) how RSA/DH actually work (modular-arithmetic level — ties to 6.042J); hashes/integrity; certificates/PKI; SQL injection & XSS (SQLi links to the DB domain). (c) ROP/binary exploitation depth, formal models.

**Problems:** pwn.college dojos (auto-graded, free account) ✓ · Cryptopals (self-checkable known outputs) ✓ · CS50 Cybersecurity (linked from ✓ CS50) https://cs50.harvard.edu/cybersecurity.

**Resources:** pwn.college ✓ · Cryptopals ✓ · Computerphile crypto (Mike Pound's AES/TLS explainers; c-tier).

---

## 14. History of Science & Tech

Current app coverage: scientific revolution, computing, industrial — these map to the survey's three biggest arcs; least urgent domain.

**Canonical:** **Crash Course History of Science** (46 eps, based on McClellan & Dorn's standard survey text) ✓ https://thecrashcourse.com/topic/historyofscience/ · **MIT OCW STS.003 The Rise of Modern Science** ✓ https://ocw.mit.edu/courses/sts-003-the-rise-of-modern-science-fall-2010/. VU CS has "History of Science for CS" in y2.

**Gaps (all c-tier):** Greek/Islamic/medieval science, chemistry revolution (Lavoisier), Darwin & genetics, relativity/quantum arc, historiography (Kuhn, "what counts as science"). No exam-prep urgency; grow opportunistically.

---

## Cross-domain problem archives (verified)

- MIT OCW exams w/ solutions — `/pages/exams/` pattern across 18.01/18.02/18.06/18.404/8.01 etc.; search via ✓ https://ocw.mit.edu/search/.
- Isaac Physics (self-marking, hint-scaffolded — closest existing product to the app's mastery model) ✓ https://isaacphysics.org/ · Ada Computer Science (successor to Isaac CS; ~1000 self-marking CS questions) ✓ https://adacomputerscience.org/.
- Project Euler (900+ math×programming problems) ✓ https://projecteuler.net/ · BPhO ✓ https://www.bpho.org.uk/ · IPhO archive w/ solutions ✓ https://ipho.olimpicos.net/ · TU Delft OCW ✓ https://ocw.tudelft.nl/.
- Dutch tentamenbanken are behind study-association logins — no fully public Dutch exam archive found.

**Quality tiers for mining extraPractice pools:** *printed solutions* = 6.006, 15-445 HWs, 18.05/18.06/5.111/8.01L exams, OSTEP simulators (`-c` computes answers), Kurose interactive, 2.004 psets, CS188 worksheets, MR/SNU exams. *Auto-graded, no printed solutions* = Nand2Tetris, CS50 check50, 6.1810 make grade, pwn.college, Cryptopals, Isaac/Ada.

---

## Suggested build order (gaps → 3-lesson mini-course chains)

Pattern per chain (proven): intro node → `-2` → `-3`; each = concept → worked-fading → independent, `deeper?` toggle, one Node-verified `code` screen, ≥4-question `extraPractice` pool, curated `resources`; grow the domain exam ~4 fresh questions; repoint downstream corridors to chain bottoms.

**Phase 1 — robotics core + SBI-year-2 leverage (do in order):**
1. **phys-kinematics chain** (already backlogged): suvat/projectiles → momentum & collisions → rotational dynamics (torque, moment of inertia, angular momentum). Source: 8.01SC weeks 1–12; problems: 8.01L practice exams. *Rotation is the biggest single physics gap.*
2. **math-ode chain (NEW)**: first-order ODEs → second-order oscillators/damping/resonance (cross-link PidSim + a new phys-oscillations node) → systems/phase portraits/matrix exponential (cross-link robo-control-3). Source: 18.03SC.
3. **math-linalg-4/-5 (extend chain)**: rank/nullspace/four subspaces → least squares & projections → SVD + pseudoinverse. Source: 18.06; repoint robo-kinematics dependencies as geometry demands.
4. **robo-kinematics chain** (backlogged): rotation matrices & homogeneous transforms → FK + Jacobians/singularities (det=0 hook) → numerical IK & workspace. Source: Modern Robotics ch. 3–6; problems: MR practice exercises + SNU exams.
5. **robo-estimation chain (NEW)**: 1D Kalman (Gaussian×Gaussian, predict/update) → multivariate KF + covariance → EKF/sensor-fusion teaser. Prereqs already shipped (math-prob-3, robo-control-3). Source: bzarg → rlabbe. *Highest leverage per hour.*
6. **math-mv chain (NEW, multivariable slice)**: partial derivatives & gradient → multivariable chain rule + Jacobian (shared object with robo-kinematics!) → Lagrange multipliers + optimization. Source: 18.02SC.
7. **math-stats chain (NEW)**: variance/covariance → CLT & estimation → hypothesis tests/CIs + regression. Source: 18.05; Seeing Theory as sim model. *Direct SBI y2 Statistics prep.*

**Phase 2 — degree bar, control + electricity:**
8. **robo-control-4 (extend)**: transfer functions/poles → Bode/frequency response → LQR ("u=−Kx, K chosen optimally"). Source: 2.004 + Brian Douglas.
9. **phys-electricity chain** (backlogged): KVL/KCL/dividers → RC transients + magnetism/induction (motors & encoders) → transistors/H-bridge. Source: 8.02 + Falstad sims + Ben Eater.
10. **math-calculus-4/-5 (extend)**: limits & continuity (informal ε-δ) → integration techniques → Taylor series. Source: 18.01SC + Paul's Notes.
11. **phys-statics chain (NEW, seeds MechE domain)**: FBDs/equilibrium/trusses → stress-strain → beam bending + torsion. Source: 2.001 + Efficient Engineer.
12. **chem-quant chain (NEW)**: stoichiometry/moles → thermochemistry & equilibrium → electrochemistry/batteries (Battery University resources). Source: 5.111.

**Phase 3 — CS core depth:**
13. **prog-c chain (NEW)**: pointers & memory model → malloc/structs/building a linked list → bit manipulation + memory bugs. Source: CS50 weeks 1–5 + Beej. *Unlocks OS depth, security, embedded.*
14. **os-concurrency chain (NEW)**: threads & races → locks/CVs → deadlock + real-time scheduling. Source: OSTEP (simulators = ready-made problem generators). *Most robotics-critical CS concept.*
15. **algo depth** (backlogged): sorting + divide&conquer/recurrences → Dijkstra/heaps worked problems → dynamic programming. Source: 6.006 psets/quizzes.
16. **ai-learning chain (extend)**: linear regression & loss → train/test/overfitting → backprop (Karpathy micrograd-style code screens). Then optionally MDP/Q-learning via CS188.
17. **net-sockets chain (NEW)**: sockets hands-on → TCP mechanics (handshake/retransmission/AIMD) → UDP-vs-TCP for robots + subnets. Source: Kurose interactive + Beej networking.
18. **math-logic chain (extend, Stage-2 bridge)**: sets/relations/functions → induction → proof techniques. Source: Book of Proof + 6.042J.

**Phase 4 — completeness (opportunistic):** theory formal-language chain (regex↔DFA, pumping lemma — author own problem pools, thinnest solved-problem supply), security real-crypto chain (AES/RSA/TLS via Cryptopals), db normalization/B+trees (15-445 HWs), architecture assembly/memory-hierarchy chain (Nand2Tetris projects 4–6), multivariable completion (vector-calc theorems), history expansion (Crash Course).

**Rationale for the ordering:** Phase 1 = everything that feeds the robot-competence spine (kinematics→dynamics→control→estimation) plus what SBI grades Ollie on next year; Phase 2 completes the "pass a real first-year exam" bar in math/physics; Phase 3 = the CS systems trio (C → concurrency → networking) robotics actually needs, before completeness topics. Within each phase items are ordered by prerequisite flow, so they can be built strictly top-to-bottom.

