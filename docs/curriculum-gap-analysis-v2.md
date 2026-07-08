# Bachelor-Curriculum Gap Analysis v2 — the next four chains

**Purpose:** a focused hand-off document for building the next four queued mini-course chains in the Learning website (Atlas) app. This EXTENDS [curriculum-gap-analysis.md](curriculum-gap-analysis.md) (v1, the whole-map survey) — read v1 first for the domain-wide context and the proven build pattern. Where v1 gave one section per *domain*, v2 gives a deep, build-ready spec per *chain*: canonical syllabus units → gap vs current coverage → problem sources with solutions → per-lesson breakdown (concept, the one Node-verified code screen, extraPractice, exam growth) → resource shortlist. The four chains, in the CLAUDE.md backlog order:

1. **Electronics & Circuit Design** — NEW domain (components&circuits → transistors&op-amps → motor drivers/H-bridge). Phase 2, HANDOFF item 2.
2. **math-stats** — NEW chain (variance/covariance → CLT → hypothesis tests/regression). Phase 1, the last unbuilt Phase-1 math chain.
3. **robo-control-4** — extend the control chain (transfer functions/poles → Bode → LQR). Phase 2.
4. **phys-statics** — NEW chain, seeds a future MechE domain (FBDs/equilibrium → stress-strain → beam bending). Phase 2.

**Link verification:** every URL below was fetched live on **2026-07-08** by research agents. Same legend as v1: **✓** = fetched, real content confirmed · **✓ᴶ** = URL resolves but the page is JS-rendered (fetcher gets a shell — fine in a browser, e.g. YouTube) · **(linked)** = appears as a link on a fetched page, not fetched independently. Nothing here is an invented URL, course number, or PDF filename; where a source could not be confirmed it is listed under "Could not verify / dropped."

**Code screens:** every code-screen expected output proposed below was **Node-verified on 2026-07-08** (run against the exact arithmetic shown). The builder should still re-run each against the completed solution per the quality gate, but the numbers are correct as written.

**Gap-ranking legend (from v1):** **(a)** essential for robotics · **(b)** essential to pass a real first-year exam / degree level · **(c)** nice-to-have.

**One honest headline on problem-sources-with-solutions** (the hardest requirement, and it varies a lot by chain): **math-stats is the jackpot** — MIT 18.05 posts full solutions to every pset AND every exam, free. **robo-control-4 is mixed** — 2.004 has solved psets for the transfer-function/Bode lessons, but there is *no* free worked-solution source for the LQR lesson (author from the Underactuated worked example). **Electronics and phys-statics are the hard cases** — the canonical MIT courses (6.002, 2.001) post problems but **no** solution keys, so the answer-bearing sources are, respectively, All About Circuits worksheets (answers inline, CC-BY) and the self-checking engineeringstatics.org + Efficient Engineer "Test Your Understanding" items. Details and honest gating notes per chain below.

---

## 1. Electronics & Circuit Design (NEW domain)

**What it is:** a 3-lesson intro chain that turns the physics of electricity (already built in phys-electricity/-2/-3) into real *engineering* — designing with components, understanding the transistor and op-amp, and driving a motor. This is the on-ramp HANDOFF item 2 has been pointing at since the phys-electricity chain reached transistors/H-bridge.

**Placement & scaffolding (from CLAUDE.md):**
- New **Subject** = `electronics`. Follow the "new subject" checklist in the brainstorm section: add to the `Subject` type + `subjectStyles`/`subjectNames` + `subjectHex` + the `html.light` accent overrides + the minimap's `subjectHexLight` branch. Pick a distinct vivid accent — **orange** is the natural free slot (amber=physics, cyan=cs, emerald=engineering, rose=robotics, violet=math, teal=chem, fuchsia=history are all taken); suggest `orange`/copper for circuitry. (Note: the current 2-node "Engineering" emerald tag on robo-embedded/robo-ros is separate — do NOT fold Electronics into it.)
- Node ids: `elec-components` → `elec-transistors` → `elec-motors` (chain of 3), plus a module exam `elec-exam` (1 intro + 10 fresh retrieval Qs, `isExam: true`, prereqs = all 3 electronics nodes — the validator enforces exactly one exam per domain).
- Prereq of `elec-components` = **phys-electricity-3** (chain-bottom convention; it already teaches capacitors, RC, induction, transistor-as-switch — the perfect launch pad). Cross-link `elec-motors` back to `robo-embedded`/`robo-ros` and `phys-electricity-3`.
- **Reserved layout slot:** x4660+/y850+ (documented in the curriculum.ts header). The far-right x4660 column also hosts phys-statics (upper, y220–620, chain 4 below); Electronics sits lower (y850+). Expect a long corridor from phys-electricity-3 (≈x1760,y500) to `elec-components` — run `node scripts/check-map-layout.mjs` and re-anchor/route as needed; this corridor is the one real layout risk in the chain.

### 1.1 Canonical course & syllabus units

**MIT 6.002 "Circuits and Electronics" (Spring 2007, Agarwal & Lang)** ✓ https://ocw.mit.edu/courses/6-002-circuits-and-electronics-spring-2007/ — the authoritative free first course in circuits & electronics, and it sits exactly where this chain does: its prereqs are 8.02 (E&M) + 18.03 (ODEs), i.e. deeper than intro E&M. Syllabus ✓ (`/pages/syllabus/`) confirms the spine: lumped-circuit abstraction; resistive networks; **switches and MOS transistors**; digital abstraction; **amplifiers incl. op-amps and small-signal analysis**; energy-storage elements (L, C); **first- and second-order (RC/RL/RLC) dynamics**. Learning outcomes explicitly name "use operational-amplifier models in circuits with negative feedback" and first/second-order transient analysis. Full video lectures, notes, 11 homeworks, exams. Textbook: Agarwal & Lang, *Foundations of Analog and Digital Electronic Circuits* (paid).

Topic lists mapped to the three lessons (condensed from the fetched 6.002 syllabus + All About Circuits worksheet groups + Ultimate Electronics chapters):
- **Lesson 1 — components & circuits:** resistors/capacitors/inductors as real parts; Ohm's law, power; **KVL/KCL**; node method, superposition, Thévenin/Norton; series/parallel; **voltage & current dividers**, loading (divider output sags under load); **RC/RL time behavior**, time constant τ, transient vs steady state.
- **Lesson 2 — transistors & op-amps:** **MOSFET as switch AND amplifier** (cutoff/saturation, V_GS>V_th, R_DS(on)); BJT as switch and in active mode; **ideal op-amp model** (∞ gain, ∞ input impedance, 0 output impedance; the two golden rules: no input current, inputs held equal by feedback); **negative feedback**; **inverting (A=−Rf/Rin, virtual ground) and non-inverting (A=1+Rf/Rin)** amplifiers; comparator (open-loop); active filters / integrator / differentiator.
- **Lesson 3 — motor drivers & the H-bridge:** transistor switching of **inductive loads**, back-EMF spike V=L·di/dt, **flyback/freewheeling diode**; **H-bridge** topology (4 switches, diagonal pairs set direction); **PWM duty-cycle** speed control; shoot-through & dead-time; integrated driver ICs (L293D/L298N/DRV8833/TB6612FNG).

### 1.2 Gap vs current app coverage

The app currently stops at physics-level electricity (phys-electricity: Ohm's law sim; -2: dividers/KCL/KVL; -3: RC, induction, and a *conceptual* transistor/H-bridge teaser). **(a)** The whole engineering layer is missing: designing with the divider (including loading), the op-amp as the universal analog building block, and actually *driving a motor* (PWM, H-bridge, flyback) — all directly robotics-critical (every sensor interface, every motor). **(b)** The transistor as an amplifier (not just a switch) and negative feedback are standard first-year-EE exam material. **(c)** Second-order RLC resonance, filters beyond first-order, and real device physics can wait.

### 1.3 Problem sources (with solutions) — honest note

**6.002 OCW posts problems but NO solution keys.** The assignments page ✓ (`/pages/assignments/`) lists the 11 homework PDFs and the exams page ✓ (`/pages/exams/`) lists 9 quiz/final PDFs — all problem-statements only (the syllabus says worked solutions were handed back physically in class). So 6.002 is a great *stretch/self-solve* problem bank, not an answer-bearing one.

**The answer-bearing source is All About Circuits — Worksheets (Tony Kuphaldt, CC-BY 4.0)** ✓ https://www.allaboutcircuits.com/worksheets/ — 100+ Socratic-style worksheets, **each rendering its answers inline on the same page** (several literally titled "…Practice Worksheet With Answers"). This is the seed for the `extraPractice` pools; pull numeric problems and hand-verify each answer. Directly relevant, verified:
- Lesson 1: `…/voltage-divider-circuits/` ✓ (fetched, answers confirmed) · `…/ohms-law-worksheet/`, `…/series-dc-circuits/`, `…/parallel-dc-circuits/`, `…/kirchhoffs-laws/`, `…/current-divider-circuits/`, `…/time-constant-calculations/`, `…/thevenins-nortons-and-maximum-power-transfer-theorems/` (linked).
- Lesson 2: `…/bipolar-junction-transistors-as-switches/` ✓ (fetched) · `…/insulated-gate-field-effect-transistors/`, `…/basic-operational-amplifiers/`, `…/inverting-and-noninverting-opamp-voltage-amplifier-circuits/`, `…/negative-feedback-opamp-circuits/`, `…/active-filters/` (linked).
- Lesson 3: `…/design-project-pulse-width-modulation-pwm-signal-generator/`, `…/dc-motor-control-circuits/`, `…/servo-motor-systems/` (linked).

### 1.4 Per-lesson build spec

**`elec-components` — "Designing with Components: Dividers, Loading & Networks."** Concept (≤3 sentences before doing): real circuits are resistor networks you *design*; the voltage divider Vout=Vin·R2/(R1+R2) is the workhorse, but the moment you connect a load across R2 the output *sags* — that's "loading," the first thing that bites a beginner. Arc: predict what a resistive sensor (a divider!) reads → explain series/parallel and Thévenin intuition → worked divider → independent "size R1,R2 for a target Vout." `deeper?`: Thévenin equivalent = why a divider is a lousy voltage source. **Code screen (Node-verified):** compute an unloaded divider then the same divider under a load resistor, showing the sag.
```
Vin=9V, R1=1kΩ, R2=1kΩ; then add load RL=1kΩ across R2.
unloaded: 4.50   loaded: 3.00      // Vout = Vin·(R2‖RL)/(R1 + R2‖RL)
```
`extraPractice` (≥4, seed from AAC divider/KCL/time-constant worksheets): current divider, a two-stage loaded divider, RC time-constant readback, Thévenin of a divider. Hook (whyItMatters): every resistive sensor (thermistor, potentiometer, flex sensor) is a divider you read — and loading is why your reading drifts.

**`elec-transistors` — "The Transistor & the Op-Amp: Switch, Amplifier, Building Block."** Concept: a transistor lets a tiny signal control a large current (switch) or a proportional one (amplifier); wrap an op-amp (near-ideal amplifier) in **negative feedback** and its two golden rules — no input current, inputs forced equal — make gain a matter of *two resistors*. Arc: predict a MOSFET's on/off from V_GS → explain the ideal op-amp + virtual ground → worked inverting amp → independent non-inverting design. `deeper?`: gain-bandwidth tradeoff; the comparator (open-loop). **Code screen (Node-verified):** compute inverting and non-inverting output voltages.
```
Vin=0.5V, Rf=10kΩ, Rin=2kΩ.
inverting: -2.50   non-inverting: 3.00   // A=-Rf/Rin  and  A=1+Rf/Rin
```
`extraPractice` (seed from AAC op-amp/BJT-switch/FET worksheets): pick R for a target gain, MOSFET-as-switch on/off, non-inverting buffer (gain 1), comparator output for a given input. Hook: an op-amp conditions every analog sensor before the ADC; the MOSFET is what an MCU pin uses to switch real power.

**`elec-motors` — "Driving a Motor: PWM, the H-Bridge & Flyback."** Concept: an MCU pin can't source motor current, and a motor is an *inductive* load that kicks back a voltage spike when switched — so you use transistors (PWM for speed, an **H-bridge** of four for direction) plus a **flyback diode** to catch the spike. Arc: predict what average voltage a 50%-duty PWM delivers → explain the H-bridge's diagonal pairs → worked "which switches for forward vs reverse" → independent duty-cycle-for-target-speed. `deeper?`: shoot-through & dead-time; why 20 kHz PWM (above hearing, below switching-loss). **Code screen (Node-verified):** PWM average voltage vs duty cycle.
```
Vsupply=12V.   duty 0.25 → 3.00    duty 0.50 → 6.00    duty 0.75 → 9.00   // Vavg = duty·Vsupply
```
`extraPractice` (seed from AAC PWM/DC-motor-control/servo worksheets): flyback-diode purpose, H-bridge truth table (forward/reverse/brake/coast), why a stalled motor over-currents (ties phys-electricity-3 back-EMF), decoupling caps on the rail. Hook: this is the literal circuit between your robot's brain and its wheels.

**Grow `elec-exam`:** author 1 intro + 10 FRESH retrieval Qs (never reuse lesson quizzes), `correctIndex: 0` convention, misconception-specific explanations, numerics hand-verified. Suggested coverage: loaded-divider numeric, KCL balance, op-amp inverting/non-inverting gain, MOSFET switch region, ideal-op-amp golden rules, H-bridge direction, PWM average voltage, flyback-diode purpose, series/parallel resistance, RC time constant.

### 1.5 Resource shortlist (paste-ready for `resourcesByNode`)

- **`elec-components`:** [interactive] Falstad **CircuitJS** ✓ https://www.falstad.com/circuit/ — live animated schematics; the definitive free sandbox for predict→observe screens. · [book] *Ultimate Electronics* — "Voltage Dividers" ✓ https://ultimateelectronicsbook.com/voltage-dividers/ — dividers, Thévenin, loading with runnable in-page sims. · [course] MIT 6.002 (free) ✓ https://ocw.mit.edu/courses/6-002-circuits-and-electronics-spring-2007/ — the real course when he wants full depth.
- **`elec-transistors`:** [book] *Ultimate Electronics* — "The Ideal Op-Amp" ✓ https://ultimateelectronicsbook.com/ideal-op-amp/ (+ "Inverting Amplifier" ✓ https://ultimateelectronicsbook.com/op-amp-inverting-amplifier/) — best free ideal-op-amp/virtual-ground treatment. · [video] EEVblog #600 "What is an Operational Amplifier?" ✓ᴶ https://www.youtube.com/watch?v=7FYHt5XviKc — the canonical free op-amp video. · [article] electronics-tutorials.ws "MOSFET as a Switch" ✓ https://www.electronics-tutorials.ws/transistor/tran_7.html (op-amp series starts ✓ https://www.electronics-tutorials.ws/opamp/opamp_1.html) — fills the transistor half Ultimate Electronics leaves unwritten.
- **`elec-motors`:** [article] All About Circuits — "H-bridge DC Motor Control (Complementary PWM, Shoot-through, Dead-time)" ✓ https://www.allaboutcircuits.com/technical-articles/h-bridge-dc-motor-control-complementary-pulse-width-modulation-pwm-shoot-through-dead-time-pwm/ — cleanest free H-bridge article. · [article] Northwestern Mechatronics Wiki — "Driving a high-current DC motor using an H-bridge" ✓ https://hades.mech.northwestern.edu/index.php/Driving_a_high_current_DC_Motor_using_an_H-bridge — practical (back-EMF, freewheeling diodes, 20 kHz PWM). · [video] DroneBot Workshop — L298N + Arduino ✓ https://dronebotworkshop.com/dc-motors-l298n-h-bridge/ (video ✓ᴶ https://www.youtube.com/watch?v=dyjo_ggEtVU) — hands-on with a real driver IC.

**Caveats for the builder:** (1) 6.002 has no solution keys — lean on AAC worksheets (answers inline) for graded/extraPractice numerics. (2) Ultimate Electronics' *transistor* chapters are planned-but-unwritten (transistors appear only as modeling elements); use electronics-tutorials.ws + AAC BJT/FET worksheets for Lesson 2's device half. (3) *The Art of Electronics* (Horowitz & Hill) is the famous reference but paid, no free authoritative URL — mention as an optional `book` pointer without a link.

---

## 2. math-stats (NEW chain)

**What it is:** the statistics/inference chain — the last unbuilt Phase-1 math chain, and the highest-value one for Ollie personally: it is direct **SBI year-2 Statistics** prep, it's the language of the Kalman filter he already built (`robo-estimation`), and it's founder-relevant (A/B tests, "did my robot actually improve?").

**Placement & scaffolding:**
- Subject = `math` (violet, existing). Node ids: `math-stats` → `math-stats-2` → `math-stats-3`.
- Prereq of `math-stats` = **math-prob-3** (chain-bottom convention; distributions, expected value and Bayes are done there). **Cross-link** to `robo-estimation` (the covariance matrix *is* the Kalman state uncertainty) and `math-linalg-4` (least squares = regression), matching the app's link-not-prereq convention for cross-map ties.
- **Reserved layout slot:** x2520, below the math-mv chain (which sits at x2520, y400/600/800), at y≥1000. A clean vertical drop `math-stats` (2520,1000) → -2 (2520,1180) → -3 (2520,1360) is the first guess; verify with `node scripts/check-map-layout.mjs` in BOTH view tiers.
- **Grow `math-exam`:** currently 26 Qs (after linalg-4/5). Add ~4 FRESH stats Qs → 30, and add the three new nodes to math-exam's prereqs (validator enforces prereqs = all math nodes).

### 2.1 Canonical course & syllabus units

**MIT 18.05 "Introduction to Probability and Statistics" (Spring 2022, Orloff & Kamrin)** ✓ https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/ — the exact-level match, and (see §2.3) the single best problems-with-solutions source in this whole document. The fetched calendar ✓ (`/pages/calendar/`) maps almost one-to-one onto the three lessons:
- **Lesson 1 — variance, covariance, correlation, covariance matrix:** Class 5a Variance of discrete variables; Class 6a Continuous RVs: expected value & variance; **Class 7 Joint distributions: independence, covariance, and correlation** (the core reading); Studio 4 Covariance and correlation (hands-on).
- **Lesson 2 — LLN, CLT, sampling & estimation:** **Class 6b Law of Large Numbers, Central Limit Theorem, histograms** (core); Class 10 Intro to statistics, likelihood, MLE (point estimation); Classes 22–23 + Studio 9 Confidence intervals (intro; bootstrap CIs in Class 24 are an optional extension).
- **Lesson 3 — NHST, t-tests, CIs, regression:** **Class 17 NHST: rejection regions, z-test**; **Class 18 NHST: t-tests**; Class 20 Bayes vs NHST; Classes 22–23 Confidence intervals; **Class 26 Linear and multiple regression** (the regression reading).

(For **Stage-2 rigor** later, MIT 18.650 "Statistics for Applications" ✓ https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/ is the proof-first version — but it posts **no** solutions, so it's a reference, not a problem source. Skip it for this beginner chain.)

### 2.2 Gap vs current app coverage

The app has probability (math-prob: LLN coin sim; -2: distributions/EV; -3: Bayes) but **zero inferential statistics**. **(a)** Covariance and the covariance *matrix* are the literal language of the Kalman filter Ollie already built — this chain closes the loop on `robo-estimation`. **(a/b)** The CLT (why the normal is everywhere, why averaging noisy sensors helps as 1/√n) and estimation/standard error are foundational for both robotics and SBI y2. **(b)** NHST/p-values/CIs and simple linear regression are the core of any first statistics exam and of "did my change actually help?" **(c)** ANOVA, chi-square, multiple regression, bootstrap can wait (all flagged optional in 18.05).

### 2.3 Problem sources (with solutions) — the jackpot

**MIT 18.05 posts solutions to EVERYTHING, free:**
- **Problem sets 1–11, each with a matching solutions PDF** ✓ https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/pages/problem-sets/ (pattern `…/resources/mit18_05_s22_psetNN_pdf/` + `…_psetNN_sol_pdf/`). Most relevant: PS covering variance/covariance/correlation (L1), CLT/estimation (L2), NHST/CIs/regression (L3).
- **Exams (incl. practice exams) with solutions** ✓ https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/pages/exams/ — Exam 1 + solutions (through covariance), Exam 2 + solutions (NHST), Final + solutions, plus big "practice problem" lists with solutions. Bonus: the **"Gallery of Significance Tests" PDF** (`…/resources/mit18_05_s22_exam2_nhst_pdf/`) is a one-page NHST cheat-sheet — ideal to author Lesson-3 quiz questions from.
- Interactive auto-graded problem checkers for psets 1–10 on the MIT Open Learning Library mirror (linked from the OCW pages).

**Secondary — OpenIntro Statistics (4th ed.), free textbook** ✓ https://www.openintro.org/book/os/ — honest caveat: **odd-numbered exercise answers are free in Appendix A**, but the *full* worked solutions and sample exams are **gated behind Verified-Teacher registration** (confirmed the links hit a registration wall). Still valuable free: name-your-price ($0) full PDF, per-section videos, and **free R labs** for Ch 2 (summary stats/SD → L1), Ch 5 (inference/CIs → L2), Ch 7 (t-tests → L3), Ch 8 (linear regression → L3). Note OpenIntro treats covariance only lightly — for the **covariance-matrix** framing, 18.05 Class 7 is the better spine.

### 2.4 Per-lesson build spec

**`math-stats` — "Variance, Covariance & the Covariance Matrix."** Concept: variance measures spread (average squared distance from the mean); **covariance** measures whether two variables move together, and stacking covariances into a **matrix** is exactly how a Kalman filter stores "how uncertain, and how correlated, my state estimate is." Correlation is covariance normalized to [−1,1]. Arc: predict which of two datasets has bigger spread → explain variance → worked covariance of two columns → independent correlation. `deeper?`: why the covariance matrix is symmetric and positive-semidefinite; the ellipse picture (ties `robo-estimation-2`). **Code screen (Node-verified, population formulas):**
```
x=[1,2,3,4,5], y=[2,4,6,8,10].
var(x): 2.00   cov(x,y): 4.00   corr: 1.00     // y is a perfect linear function of x → corr=1
```
`extraPractice` (seed from 18.05 PS + Seeing Theory): variance of a small set, covariance sign (up-together vs opposite), correlation of an uncorrelated pair (≈0), why correlation ≠ causation. Hook: the covariance matrix is the uncertainty ellipse in your Kalman filter.

**`math-stats-2` — "The Central Limit Theorem & Estimation."** Concept: average enough independent samples and the mean's distribution becomes **normal regardless of the original shape** (CLT), and its spread — the **standard error** — shrinks like σ/√n; that 1/√n is why more sensor readings help, and by how much. Arc: predict the shape of many dice-roll averages → explain LLN vs CLT (LLN says the mean converges; CLT says *how* it's distributed) → worked standard-error → independent "how many samples to halve the error." `deeper?`: point estimates vs the true parameter; a first confidence interval (estimate ± ~2·SE). **Code screen (Node-verified):** standard error vs sample size.
```
population σ=10.   n=1 → 10.00     n=4 → 5.00     n=100 → 1.00     // SE = σ/√n
```
`extraPractice` (seed from 18.05 PS + OpenIntro Ch 5 lab): SE for a given n, "how many samples for SE=1," LLN-vs-CLT statement check, why averaging noisy sensors helps. Hook: 100 readings are 10× more precise than 1, not 100× — the 1/√n law robots live by.

**`math-stats-3` — "Hypothesis Tests & Regression."** Concept: to ask "is this real or noise?" you assume a null hypothesis, compute how many standard errors your result sits from it (z/t), and read off a **p-value** (the chance of a result this extreme if the null were true — *not* the chance the null is true); **linear regression** is the same least-squares line from `math-linalg-4`, now used to estimate and test a slope. Arc: predict whether a small difference is "significant" → explain the p-value (with its #1 misconception) → worked t/z statistic → independent least-squares slope. `deeper?`: confidence interval ↔ test duality; R² and residuals. **Code screen (Node-verified):** least-squares regression line (cov/var form).
```
x=[0,1,2,3,4], y=[1,3,4,6,7].
slope: 1.50   intercept: 1.20     // slope = Sxy/Sxx = cov/var,  intercept = ȳ − slope·x̄
```
(Alternative/second screen if desired — a z-test statistic, also Node-verified: x̄=52, μ₀=50, σ=10, n=25 → z = (x̄−μ₀)/(σ/√n) = **1.00**; x̄=55 → **2.50**.) `extraPractice` (seed from 18.05 Exam-2 practice + "Gallery of Significance Tests"): interpret a p-value (catch the misconception), one-sample z/t, regression slope, CI-vs-test duality. Hook: this is the exact toolkit for "did my robot/product actually get better?"

**Grow `math-exam`** (+4 fresh): covariance-matrix property, standard-error-shrinks-as-1/√n, p-value interpretation (misconception-buster), least-squares slope numeric.

### 2.5 Resource shortlist (paste-ready)

- **`math-stats`:** [interactive] Seeing Theory — Basic Probability (Variance) ✓ https://seeing-theory.brown.edu/basic-probability/index.html#section3 and Regression Analysis (Correlation, with a live correlation matrix on Iris) ✓ https://seeing-theory.brown.edu/regression-analysis/index.html#section2 — the closest interactive to the covariance/correlation-matrix idea. · [video] StatQuest "Covariance, Clearly Explained!!!" ✓ https://www.youtube.com/watch?v=qtaqvPAeEJY (+ "Pearson's Correlation" ✓ https://www.youtube.com/watch?v=xZ_z8KWkhXE).
- **`math-stats-2`:** [video] 3Blue1Brown "But what is the Central Limit Theorem?" ✓ https://www.3blue1brown.com/lessons/clt — best visual CLT explainer. · [interactive] Seeing Theory — Probability Distributions (CLT sampler) ✓ https://seeing-theory.brown.edu/probability-distributions/index.html#section3 and Frequentist Inference (Point Estimation + Confidence Interval animation) ✓ https://seeing-theory.brown.edu/frequentist-inference/index.html#section2. · [course] MIT 18.05 (free, with solutions) ✓ https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/.
- **`math-stats-3`:** [video] StatQuest "p-values: what they are and how to interpret them" ✓ https://www.youtube.com/watch?v=vemZtEM63GY (+ "Linear Regression, Clearly Explained!!!" ✓ https://www.youtube.com/watch?v=nk2CQITm_eo). · [interactive] Seeing Theory — Regression (drag points on Anscombe's Quartet, watch OLS + SSE update) ✓ https://seeing-theory.brown.edu/regression-analysis/index.html#section1. · [book] OpenIntro Statistics (free PDF + R labs Ch 7/8) ✓ https://www.openintro.org/book/os/.

(Khan Academy statistics ✓ᴶ https://www.khanacademy.org/math/statistics-probability resolves but is JS-rendered to the fetcher — fine as a secondary auto-graded drill source, but the unit slugs are search-confirmed, not body-confirmed.)

---

## 3. robo-control-4 (extend the control chain)

**What it is:** three more lessons on the existing robo-control chain (robo-control → tuning → feedforward/state-space), adding the *classical frequency-domain view* and *optimal control* — the two things a real controls course has that the app's intuition-first PID chain doesn't yet: transfer functions/poles, Bode plots/margins, and LQR.

**Placement & scaffolding — read this, the naming needs a decision:**
- The CLAUDE.md backlog names this "robo-control-4" with one reserved slot (2950,2300). But the topic list (transfer functions/poles → Bode → LQR) is three distinct concepts, and the proven pattern is one concept per node. **Recommended:** build it as a 3-lesson extension **`robo-control-4` (transfer functions/poles) → `robo-control-5` (Bode/frequency response) → `robo-control-6` (LQR)**, continuing the control column downward from the reserved (2950,2300) slot. If layout gets tight, the fallback (mirroring how phys-forces-3 folded rotational dynamics into its back half) is to compress Bode into robo-control-4's second half and make LQR robo-control-5 — but 3 clean lessons is the better product. Confirm this naming with Ollie before authoring.
- Subject = `robotics` (rose, existing). Prereq of `robo-control-4` = **robo-control-3** (state-space, u=−Kx — the direct launch pad; LQR is literally "u=−Kx with K chosen optimally"). Cross-link `robo-control-4/-5` to `math-ode` (Laplace/2nd-order) and `robo-control-6` to `math-linalg-3` (eigenvalues) + `robo-estimation` (the LQ/Kalman duality).
- **Grow `robo-exam`:** currently 22 Qs. Add ~4 FRESH control Qs → 26; add the new nodes to robo-exam prereqs.
- **Layout:** continue the control column from (2950,2300); the region below/right is comparatively open (it's where robo-estimation already lives at x2380). Run `node scripts/check-map-layout.mjs` in both tiers.

**⚠ Correction to the CLAUDE.md backlog line:** it cites "**2.004**" as the source for all of robo-control-4. That's correct for the transfer-function and Bode lessons, but **2.004 does NOT cover LQR/state-space**. Pair it with **16.06** (topic sequence) and **Underactuated Ch. 8** (the actual LQR derivation) for the third lesson — see below.

### 3.1 Canonical courses & syllabus units — and which has solutions

Definitive answer to "which course has solved problems" after fetching all three assignments pages: **only MIT 2.004 posts solutions.**

| Course | URL | Solutions? | Covers |
|---|---|---|---|
| **MIT 2.004 Dynamics & Control II** (Spring 2008, Rowell) | ✓ https://ocw.mit.edu/courses/2-004-dynamics-and-control-ii-spring-2008/ | **YES — full pset solutions** | Laplace → transfer functions → poles/zeros → frequency response → Bode. **Best fit for L1 & L2.** No LQR. Text: Nise. |
| **MIT 16.06 Principles of Automatic Control** (Fall 2012, Hall) | ✓ https://ocw.mit.edu/courses/16-06-principles-of-automatic-control-fall-2012/ | NO (psets only) | Root locus, Nyquist, frequency-domain design, **and state-space** — the best all-three-lesson topic map, no answer keys. |
| **MIT 16.30 Feedback Control Systems** (Fall 2010, How & Frazzoli) | ✓ https://ocw.mit.edu/courses/16-30-feedback-control-systems-fall-2010/ | NO | State-space, full-state feedback, robustness (relevant to L3), no answer keys. |

Topic units from the fetched **2.004 calendar** (`/pages/calendar/` ✓), mapped:
- **Lesson 1 — transfer functions & poles:** Laplace transform & properties (Lec 3); block-diagram algebra (Lec 4); transfer functions (Lec 7, 11); standard inputs δ/step/ramp/sinusoid (Lec 18); **poles & zeros** (Lec 19); standard 1st/2nd-order responses (Lec 20); **effects of poles & zeros on response** (Lec 23); steady-state error (Lec 24); **stability, Routh-Hurwitz** (Lec 25); root locus (Lec 26–29 — the LHP-stability payoff).
- **Lesson 2 — frequency response & Bode:** sinusoidal response (Lec 30); **frequency response & pole-zero plots** (Lec 31); **Bode plots** (Lec 32); **poles & zeros on Bode plots** (Lec 33); conclusion (Lec 34). Gain/phase margin isn't a named 2.004 lecture but is the standard Bode-stability topic (covered by the MATLAB video in §3.4).
- **Lesson 3 — LQR / optimal control** (not in 2.004; from 16.06 topics + Underactuated Ch. 8, confirmed verbatim on the fetched chapter): state-space ẋ=Ax+Bu → quadratic cost J=∫(xᵀQx+uᵀRu)dt → optimal policy **u*=−R⁻¹BᵀSx=−Kx** → **algebraic Riccati equation** SA+AᵀS−SBR⁻¹BᵀS+Q=0 → local linearization of nonlinear robot dynamics (the tie-in).

### 3.2 Gap vs current app coverage

The app's control chain is genuinely ahead of a typical intro (PID → tuning/Z-N/step metrics → feedforward & state-space, incl. u=−Kx and a Kalman teaser). What's missing is the **formal language that explains *why* the tuning heuristics work**: **(a)** transfer functions & pole locations (poles in the left-half-plane ⇔ stable; pole position ⇔ speed/overshoot — the rigor under robo-control-2's symptom→gain table); **(a)** LQR as the principled way to *choose* the K that robo-control-3 introduced. **(b)** Bode plots, gain/phase margins, bandwidth — the classical exam core and the language every controls engineer speaks. **(c)** Nyquist, root-locus construction by hand, MPC (Stage 2+).

### 3.3 Problem sources (with solutions) — honest note

- **MIT 2.004 assignments** ✓ https://ocw.mit.edu/courses/2-004-dynamics-and-control-ii-spring-2008/pages/assignments/ — **Problem Sets 1–10, each with a matching solutions PDF** ("Problem Set Solutions" is a listed resource type; pattern `…/resources/psN/` + `…/resources/psNsoln/`). Poles/zeros & Bode problems are in the later sets (PS6–PS10 track Lec 19–34). **This is the answer-bearing source for L1 & L2.**
- **MIT 16.06 assignments** ✓ (`/pages/assignments/`) — Problem Sets 1–12 (most drawn from Franklin/Powell/Emami-Naeini), **no solutions, no exams**. Extra problem prompts only.
- **MIT 16.30 assignments** ✓ (`/pages/assignments/`) — Homework 1–7 + 2 labs, **no solutions**.
- **Lesson 3 (LQR) has NO free worked-solution source.** Author extraPractice from the **Underactuated Ch. 8 worked double-integrator** (Q=I, R=1 → **K=[1, √3]**, stated in-text) plus its end-of-chapter exercises, and from the scalar LQR closed form (below). Hand-verify all.

### 3.4 Per-lesson build spec

**`robo-control-4` — "Transfer Functions & Poles: Why the Response Looks Like That."** Concept: a transfer function G(s) is the system boiled down to one ratio in the Laplace variable s, and its **poles** (the denominator's roots) *are* the response — a real pole at −a decays like e^(−at) (fast if a is big), poles with imaginary parts oscillate, and **any pole in the right-half-plane means unstable**. Arc: predict which of two poles settles faster → explain poles↔response → worked "settling time from a pole" → independent stability call. `deeper?`: 2nd-order ζ/ωn ↔ pole angle; Routh-Hurwitz as a shortcut. **Code screen (Node-verified):** approximate settling time (4/|p|) and stability from a real pole.
```
pole −2 → 2.00 s      pole −4 → 1.00 s      pole +1 → unstable      // τ=1/|p|, settle≈4/|p|; p>0 ⇒ blows up
```
`extraPractice` (seed from 2.004 PS6–8 + Brian Douglas): fast-vs-slow pole, LHP/RHP stability, dominant-pole idea, first-order time constant from a pole. Hook: this is the math under robo-control-2's "why raising Kp speeds it up but risks oscillation."

**`robo-control-5` — "Frequency Response & Bode Plots."** Concept: feed a system sine waves of rising frequency and it passes low ones but attenuates and phase-lags high ones; the **Bode plot** graphs that gain (dB) and phase vs frequency, and the frequencies where gain hits 1 / phase hits −180° give the **gain and phase margins** — how much headroom before instability. Arc: predict what a first-order low-pass does to a fast sine → explain magnitude/phase and the −3 dB corner → worked dB/phase at the corner → independent margin read. `deeper?`: why margins predict robustness; bandwidth ↔ speed. **Code screen (Node-verified):** first-order low-pass G(jω)=1/(1+jω/ωc), gain (dB) and phase at ω/ωc = 0.1, 1, 10.
```
ω/ωc=0.1 → dB −0.04, phase −5.7°
ω/ωc=1   → dB −3.01, phase −45.0°     // the corner: half-power, 45° lag
ω/ωc=10  → dB −20.04, phase −84.3°    // −20 dB/decade rolloff
```
`extraPractice` (seed from 2.004 PS9–10 + MATLAB Bode series): −3 dB corner meaning, rolloff slope, phase-margin definition, "which system is more stable" from two Bode plots. Hook: reading a Bode margin is how you know a controller won't ring itself apart.

**`robo-control-6` — "LQR: Choosing the Best u = −Kx."** Concept: robo-control-3 gave the *form* u=−Kx but not *which* K; **LQR picks K optimally** by minimizing a cost J that trades off state error (weight Q) against control effort (weight R) — crank R up and the controller gets gentle/lazy, crank it down and it gets aggressive. The optimal K comes from the Riccati equation (a solver, conceptually). Arc: predict what happens to K as you penalize effort more → explain the Q/R tradeoff and u=−Kx → worked scalar gain → independent "cheap vs expensive control." `deeper?`: the algebraic Riccati equation; LQR↔Kalman duality (ties robo-estimation). **Code screen (Node-verified):** scalar LQR closed form for ẋ=u (a=0, b=1), where K=√(q/r).
```
q=1, r=1    → K 1.00
q=1, r=0.01 → K 10.00     // cheap control (small R) ⇒ aggressive gain
q=1, r=100  → K 0.10      // expensive control (big R) ⇒ gentle gain
```
(For the multivariable payoff, state the Underactuated double-integrator result K=[1, √3] for Q=I, R=1 as the "here's what a real solver gives" reveal.) `extraPractice`: Q/R tradeoff direction, what LQR optimizes, u=−Kx recognition, why LQR beats hand-tuning for MIMO. Hook: LQR is how a drone or arm with many coupled states gets tuned without guessing gains one at a time.

**Grow `robo-exam`** (+4 fresh): pole-location→stability, settling-time-from-pole, Bode −3 dB/phase-margin read, LQR Q/R-tradeoff.

### 3.5 Resource shortlist (paste-ready)

- **`robo-control-4`:** [video] Brian Douglas / Engineering Media "Control System Lectures" playlist (Laplace/TF/poles-zeros) ✓ https://www.youtube.com/playlist?list=PLUMWjy5jgHK3j74Z5Tq6Tso1fSfVWZC8L (hub ✓ https://engineeringmedia.com/videos) — the reference intuition playlist. · [course] MIT 2.004 (Lec 19/20/23 + solved psets) ✓ https://ocw.mit.edu/courses/2-004-dynamics-and-control-ii-spring-2008/. · [video] Steve Brunton "Control Bootcamp" (stability = poles in LHP) ✓ https://www.youtube.com/playlist?list=PLMrJAkhIeNNR20Mz-VpzgfQs5zrYi085m.
- **`robo-control-5`:** [video] MATLAB Tech Talks "Why the Bode Plot Is Awesome!" ✓ https://www.mathworks.com/videos/why-the-bode-plot-is-awesome-1781070392174.html (series ✓ https://www.mathworks.com/videos/series/understanding-bode-plots-95146.html) — derives gain/phase margins from G(jω)=−1. · [video] MATLAB "Using Bode Plots" (controller design) — controls hub ✓ https://www.mathworks.com/videos/tech-talks/controls.html. · [course] MIT 2.004 Lec 30–34 + PS9–10 solutions ✓ (URL above).
- **`robo-control-6`:** [video] MATLAB "State Space, Part 4: What Is LQR Optimal Control?" ✓ https://www.mathworks.com/videos/state-space-part-4-what-is-lqr-control-1551955957637.html — **the best free single LQR explainer** (builds J, Q/R, u=−Kx from intuition; follow-on "Why the Riccati Equation Is Important for LQR" linked). · [article] Underactuated Robotics Ch. 8 LQR ✓ https://underactuated.mit.edu/lqr.html — the rigorous free derivation + worked double-integrator (K=[1,√3]) + robot linearization (videos ✓ https://www.youtube.com/playlist?list=PLkx8KyIQkMfU5szP43GlE_S1QGSPQfL9s). · [video] Steve Brunton "LQR Control for the Inverted Pendulum on a Cart" ✓ https://www.youtube.com/watch?v=1_UobILf3cc — optimal u=−Kx on the canonical balancing robot.

---

## 4. phys-statics (NEW chain — seeds a future MechE domain)

**What it is:** the statics & mechanics-of-materials chain — the physics of *structures that hold their shape*. Its own robotics hook: "a chassis is a structure; a motor shaft is a torsion problem; a robot arm is a cantilever beam that must not sag or snap." It stays in the Physics subject (phys- prefix, consistent with phys-forces/phys-electricity) but explicitly **seeds the planned Mechanical Engineering domain** (HANDOFF item 2).

**Placement & scaffolding:**
- Subject = `physics` (amber, existing). Node ids: `phys-statics` → `phys-statics-2` → `phys-statics-3`.
- Prereq of `phys-statics` = **phys-forces-3** (chain-bottom convention; it teaches forces, torque and moments — statics is "forces and moments that sum to zero"). Cross-link `phys-statics-3` (bending) to `math-calculus-3` (integration of the load → shear → moment relationship) and to `robo-kinematics` (a link arm as a beam).
- **Reserved layout slot:** x4660, y220–620 (documented in curriculum.ts). Sits in the far-right column above the Electronics domain (chain 1, y850+). A vertical stack `phys-statics` (4660,220) → -2 (4660,420) → -3 (4660,620) is the first guess; verify with `node scripts/check-map-layout.mjs`. The incoming corridor from phys-forces-3 (≈x2480,y320) is long — route with care.
- **Grow `phys-exam`:** currently 18 Qs. Add ~4 FRESH statics Qs → 22; add the new nodes to phys-exam prereqs.

### 4.1 Canonical courses & syllabus units

**MIT 2.001 "Mechanics & Materials I" (Fall 2006)** ✓ https://ocw.mit.edu/courses/2-001-mechanics-materials-i-fall-2006/ — the primary spine (undergrad ME; text = Hibbeler, *Mechanics of Materials*). Its fetched syllabus ✓ (`/pages/syllabus/`) gives a 27-lecture calendar whose 8 "Parts" map cleanly to the three lessons plus torsion:
- **Lesson 1 — FBDs, equilibrium & trusses:** review of forces & moments → equilibrium; applying ΣF=0, ΣM=0; **planar trusses** (method of joints); friction; intro shear-force/bending-moment diagrams.
- **Lesson 2 — stress & strain:** force-deformation & static indeterminacy; **uniaxial loading & material properties** (σ=F/A, ε, E, Hooke's law); multiaxial stress & strain; stress-strain-temperature; **failure of materials** (factor of safety).
- **Lesson 3 — beam bending (+torsion extension):** **pure bending**, moment-curvature, **σ=My/I**; **beam deflection**; statically indeterminate beams; **torsion and twisting** of shafts (the motor-shaft hook); energy methods.

Alternatives verified: **MIT 1.050 Engineering Mechanics I** (Fall 2007) ✓ https://ocw.mit.edu/courses/1-050-engineering-mechanics-i-fall-2007/ (statics + deformable solids; heavier on continuum/tensors — 2.001 maps more cleanly). **MIT 3.11 Mechanics of Materials** (Roylance, Fall 1999) ✓ https://ocw.mit.edu/courses/3-11-mechanics-of-materials-fall-1999/ — matters because it's the source of the free open textbook in §4.3.

### 4.2 Gap vs current app coverage

Physics currently covers forces (F=ma), energy, and E&M/circuits, but **nothing about deformable structures**. **(a)** FBD/equilibrium on structures, stress/strain, and bending are what let Ollie reason about whether a robot's frame, mount or arm will hold — the concrete bridge from physics to buildable hardware, and the literal seed of the MechE domain. **(b)** Stress-strain, Hooke's law, shear-moment diagrams and σ=My/I are the core of any first engineering-mechanics exam. **(c)** Multiaxial/principal stress, Mohr's circle, energy methods, statically-indeterminate beams (Stage 2).

### 4.3 Problem sources (with solutions) — honest note (this is the hard one)

Statics solution keys are mostly paywalled; the MIT courses post problems but **no** keys. The free *self-checking* sources are the win here:
- **Engineering Statics: Open & Interactive (Baker & Haynes)** ✓ https://engineeringstatics.org/ — CC BY-NC-SA, PreTeXt, with **inline worked examples, interactive GeoGebra figures, and — critically — Numbas AUTO-GRADED exercises** that tell the learner right/wrong (verified on the Ch. 6 exercises page ✓). **Scope caveat:** it's a pure *statics* text → covers **Lesson 1 fully** (equilibrium Ch. 5, trusses/method of joints & sections Ch. 6, shear/bending-moment diagrams Ch. 8, second moment of area Ch. 10) but **not** σ=F/A, Hooke's law, or σ=My/I. Full PDF (linked) https://engineeringstatics.org/pdf/statics.pdf.
- **Mechanics of Materials (Roylance) on LibreTexts** ✓ https://eng.libretexts.org/Bookshelves/Mechanical_Engineering/Mechanics_of_Materials_(Roylance) — free (= MIT 3.11); covers **Lessons 2 & 3** precisely (Ch. 1–3 tensile/stress/strain, **Ch. 4 Bending** — σ=My/I, deflection ✓ `…/04:_Bending/4.02:_Stresses_in_Beams`). Worked derivations in-text; **no graded answer keys**.
- **The Efficient Engineer articles** — each ends with a **"Test Your Understanding" MCQ that shows a full worked solution inline** (verified on the shear/moment and stress-strain pages) — free self-check for all three lessons. Quiz bank (linked) https://efficientengineer.com/practice/.
- **Engineer4Free — Statics Solved Problems** ✓ https://www.engineer4free.com/statics-solved-problems.html — free, well-posed problem statements (2D equilibrium 2.x, trusses 6.x, **18 shear/bending-moment problems 9.1–9.18**), **but step-by-step solutions are behind a $10 Patreon tier**. Use the free problem statements; author solutions yourself.
- **MIT 2.001 / 1.050 problem sets** ✓ (`/pages/assignments/`) — on-target problems (2.001 PS1–11; 1.050 has "#3 stresses & equilibrium, #5 strength models, #6 beam stress-strength, #8 torsion") but **no posted solutions**.

**Bottom line:** free self-checking practice exists (engineeringstatics.org Numbas for L1; Efficient Engineer "Test Your Understanding" for all three); classic worked solution keys are either unposted (MIT) or paywalled (Engineer4Free). Plan to author most `extraPractice` from the worked examples in Roylance + Efficient Engineer.

### 4.4 Per-lesson build spec

**`phys-statics` — "Free-Body Diagrams, Equilibrium & Trusses."** Concept: a structure that isn't moving obeys **ΣF=0 and ΣM=0** — draw every force on a free-body diagram, sum forces and moments to zero, and you can solve for unknown support reactions and every member force in a truss (method of joints). Arc: predict which support carries more load → explain ΣF=0/ΣM=0 → worked beam reactions → independent truss joint. `deeper?`: why moments let you isolate one unknown; two-force members. **Code screen (Node-verified):** reactions of a simply-supported beam with an off-center point load.
```
beam length L=4 m, point load P=100 N at x=1 m from support A.
R_A: 75.00 N    R_B: 25.00 N     // ΣM_A=0 ⇒ R_B=P·x/L; ΣF=0 ⇒ R_A=P−R_B
```
`extraPractice` (seed from engineeringstatics.org Numbas Ch. 5/6 + Efficient Engineer trusses): reaction of a cantilever, moment about a pivot, method-of-joints member force, distributed-load resultant. Hook: this is how you check a motor mount or a robot arm bracket won't tear off.

**`phys-statics-2` — "Stress, Strain & Material Limits."** Concept: internal force spread over area is **stress σ=F/A**; the fractional stretch it causes is **strain ε=ΔL/L**; in the elastic range they're proportional through **Young's modulus, σ=Eε (Hooke's law)**, and every material has a stress it yields/breaks at — so you design with a **factor of safety**. Arc: predict which rod stretches more → explain σ, ε, E → worked stress+elongation → independent factor-of-safety. `deeper?`: the stress-strain curve (elastic → yield → fracture); why steel and rubber differ by 5 orders of magnitude in E. **Code screen (Node-verified):** axial stress, strain and elongation of a loaded rod.
```
F=20 000 N, A=400 mm² (=400e-6 m²), E=200 GPa (steel), L=2 m.
σ: 50.00 MPa    strain: 0.000250    ΔL: 0.50 mm     // σ=F/A, ε=σ/E, ΔL=εL
```
`extraPractice` (seed from Roylance Ch. 1–3 + Efficient Engineer stress-strain "Test Your Understanding"): stress from force+area, elongation, factor of safety = σ_yield/σ_applied, stiffer-material comparison. Hook: "will this bracket permanently bend under the motor's thrust?" is a σ-vs-σ_yield question.

**`phys-statics-3` — "Beam Bending: Shear, Moment & σ = My/I."** Concept: load a beam and it develops an internal **shear force and bending moment** along its length (the shear/moment diagrams), and the bending moment M creates a stress that's zero at the neutral axis and largest at the surface: **σ = My/I**, where I (second moment of area) rewards putting material far from the center — which is exactly why I-beams and tubes are stiff for their weight. Arc: predict where a loaded beam is most stressed → explain shear/moment → worked bending stress → independent "pick a cross-section." `deeper?`: moment-curvature & deflection (d²y/dx²=M/EI); torsion of a shaft as the twist-analog. **Code screen (Node-verified):** bending stress in a rectangular beam.
```
rectangular section b=50 mm, h=100 mm; bending moment M=1000 N·m.
I: 4.1667e-6 m⁴    σ_max: 12.00 MPa     // I=bh³/12, y=h/2, σ=My/I = 6M/(bh²)
```
`extraPractice` (seed from Roylance Ch. 4 + Efficient Engineer shear-moment/beam-deflection): where max bending moment occurs, I of a rectangle, why depth h helps more than width b (h³ vs b), torsion twist of a shaft. Hook: a robot arm is a cantilever beam — σ=My/I tells you if it sags or snaps under payload.

**Grow `phys-exam`** (+4 fresh): beam reaction numeric, σ=F/A stress, Hooke's-law elongation, σ=My/I bending-stress or I-beam-stiffness reasoning.

### 4.5 Resource shortlist (paste-ready)

- **`phys-statics`:** [video] The Efficient Engineer "Understanding and Analysing Trusses" ✓ https://www.youtube.com/watch?v=Hn_iozUo9m4 (article ✓ https://efficientengineer.com/trusses/). · [interactive/course] Engineering Statics: Open & Interactive — equilibrium Ch. 5 + method of joints Ch. 6, with GeoGebra figures & Numbas exercises ✓ https://engineeringstatics.org/. · [article] The Efficient Engineer — shear/bending FBD & support reactions ✓ https://efficientengineer.com/shear-force-and-bending-moment-diagrams/.
- **`phys-statics-2`:** [video] The Efficient Engineer "An Introduction to Stress and Strain" ✓ https://www.youtube.com/watch?v=aQf6Q8t1FQE (article ✓ https://efficientengineer.com/stress-and-strain/) — σ, τ, ε, σ=Eε, stress-strain diagram, worked factor-of-safety. · [book] Roylance *Mechanics of Materials* Ch. 1–3 (LibreTexts, free) ✓ https://eng.libretexts.org/Bookshelves/Mechanical_Engineering/Mechanics_of_Materials_(Roylance). · [article] The Efficient Engineer "Young's Modulus" (linked) https://efficientengineer.com/youngs-modulus/.
- **`phys-statics-3`:** [video] The Efficient Engineer "Understanding Shear Force and Bending Moment Diagrams" ✓ https://www.youtube.com/watch?v=C-FEVzI8oe8 — the best free beam-bending explainer, fully worked simply-supported example. · [book] Roylance Ch. 4 "Stresses in Beams" (σ=My/I derivation) ✓ https://eng.libretexts.org/Bookshelves/Mechanical_Engineering/Mechanics_of_Materials_(Roylance)/04:_Bending/4.02:_Stresses_in_Beams. · [video] The Efficient Engineer "Beam Deflection" ✓ https://www.youtube.com/watch?v=MvBqCeZllpQ (article ✓ https://efficientengineer.com/beam-deflection/; torsion extension https://efficientengineer.com/torsion/ linked).

---

## Build sequencing & cross-chain notes

**Recommended order** (dependencies + leverage):
1. **math-stats** first — it's Phase 1 (the others are Phase 2), it has the best problem-with-solutions source (18.05, fully solved), it needs no new subject/color plumbing (just three math nodes), and it closes the loop on the Kalman chain Ollie already built. Lowest-friction, highest personal payoff (SBI y2).
2. **robo-control-4/-5/-6** — extends an existing chain (no new subject), continues the strongest spine in the app (perception→control→estimation), and 2.004 gives solved psets for two of its three lessons. Decide the 3-node-vs-compressed naming with Ollie before authoring (see §3).
3. **phys-statics** — new chain in an existing subject (amber), seeds MechE; do it before Electronics because it shares the far-right x4660 column and establishes that corridor.
4. **Electronics** last of the four — it's the only one needing full **new-subject plumbing** (Subject type, styles, hex, light-mode overrides, minimap branch) plus a **new exam node**, and its parent corridor from phys-electricity-3 is the trickiest layout. Most setup cost, so bank the three cheaper chains first.

**Every chain, before commit (the quality gate — see CLAUDE.md):** `npm run build` (the real typecheck) · content validator green (add invariants if a new rule matters — e.g. the new `electronics` subject + `elec-exam`) · `node scripts/check-map-layout.mjs` reports **zero crossings in BOTH view tiers** · re-run each new `code` screen against the completed solution (the expected outputs above are Node-verified as of 2026-07-08 but re-verify in-app) · hand-fact-check technical claims · browser-play one new lesson end-to-end.

**Reserved-slot recap** (all from the curriculum.ts header): math-stats → x2520, y≥1000 (below math-mv) · robo-control-4… → continue the control column from (2950,2300) · phys-statics → x4660, y220–620 · Electronics domain → x4660+, y850+. Two of these share the x4660 column (phys-statics upper, Electronics lower) — build phys-statics first and leave clearance.

**Exam growth recap:** math-exam 26→30 (+4) · robo-exam 22→26 (+4) · phys-exam 18→22 (+4) · **new** elec-exam = 1 intro + 10 fresh Qs.

## Could not verify / dropped (honesty ledger)

- **Electronics:** 6.002 has **no** OCW solution keys (problems only) — the answer source is AAC worksheets, not MIT. Ultimate Electronics' transistor chapters are unwritten (use electronics-tutorials.ws for Lesson 2's device half). *The Art of Electronics* is paid, no free URL. The EEVblog blog page for video #600 returns a CrowdSec captcha to fetchers — cite the YouTube video (7FYHt5XviKc), not the blog. YouTube pages are JS shells (✓ᴶ) but IDs were triangulated across sources.
- **math-stats:** OpenIntro's *full* solutions and sample exams are Verified-Teacher-gated; only Appendix-A odd answers are free. 18.650 has no solutions (Stage-2 reference only). Khan Academy pages are JS-rendered (✓ᴶ) — slugs search-confirmed, bodies not. Of three search-suggested StatQuest p-value video IDs, only `vemZtEM63GY` was fetch-confirmed; the others were dropped.
- **robo-control-4:** **only 2.004 has pset solutions** (16.06 and 16.30 post problems only). **No** free worked-solution source exists for the LQR lesson — author from Underactuated's worked double-integrator (K=[1,√3]) + the scalar closed form. One search-suggested Brian Douglas "pole locations" video returned an empty body and was dropped; link the verified playlist, not guessed video IDs. The CLAUDE.md "2.004" cite is right only for Lessons 1–2 (corrected in §3).
- **phys-statics:** MIT 2.001/1.050/3.11 post **no** solution keys. Engineering Statics is statics-only (no stress/strain/bending — that's Roylance). Engineer4Free's worked solutions are Patreon-gated ($10); only problem statements are free. A legacy 2.001-Spring-2003 dspace page rumored to have "solutions" returned an empty/dead frameset — dropped. Copyrighted Hibbeler/Meriam solution manuals on Quizlet/Scribd were deliberately not used.

*Compiled 2026-07-08 (Cowork research). All URLs fetched live that day; all code-screen numbers Node-verified that day. Feeds future content sessions per the CLAUDE.md Stage-1/2 backlog. Pair with v1 ([curriculum-gap-analysis.md](curriculum-gap-analysis.md)) for whole-map context.*

