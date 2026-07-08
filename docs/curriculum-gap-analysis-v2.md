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
