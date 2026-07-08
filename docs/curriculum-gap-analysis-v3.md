# Bachelor-Curriculum Gap Analysis v3 — the CS-systems + core-math depth batch

**Purpose:** a focused hand-off document for building the next four queued mini-course chains, picking up exactly where [curriculum-gap-analysis-v2.md](curriculum-gap-analysis-v2.md) leaves off. Read **v1** ([curriculum-gap-analysis.md](curriculum-gap-analysis.md), the whole-map survey + proven build pattern) and **v2** (the previous four chains: Electronics, math-stats, robo-control-4, phys-statics) first — this doc does NOT repeat their content. Like v2, v3 gives a deep, build-ready spec per *chain*: canonical syllabus units → gap vs current coverage → problem sources with solutions → per-lesson breakdown (concept, the one Node-verified code screen, extraPractice, exam growth) → resource shortlist. The four chains, in the CLAUDE.md Phase-3 backlog order:

1. **prog-c** — NEW chain, extends the Programming domain (pointers & memory model → malloc/structs/linked list → bit manipulation & memory bugs). The #1 CS-side robotics *language* gap.
2. **os-concurrency** — NEW chain, extends the OS domain (threads & races → locks/condition variables → deadlock & real-time scheduling). The "most robotics-critical missing CS concept."
3. **ai-learning depth** — extends the AI chain (linear regression & loss → train/test/overfitting/regularization → backprop).
4. **math-calculus-4/-5/-6** — extends the calculus chain (limits & continuity → integration techniques → Taylor series).

**Link verification:** every URL below was fetched live on **2026-07-08** by four parallel research agents (one per chain). Same legend as v1/v2: **✓** = fetched, real content confirmed · **✓ᴶ** = URL resolves but the page is JS-rendered (fetcher gets a shell — fine in a browser, e.g. YouTube; title corroborated by a second source where noted) · **(linked)** = appears as a link on a fetched page, not fetched independently · **✗** = could not verify. Nothing here is an invented URL, course number, or PDF filename; where a source could not be confirmed it is listed under "Could not verify / dropped."

**Code screens:** every code-screen expected output proposed below was **Node-verified on 2026-07-08** — run in a JS sandbox that mimics the app worker's `print()` (joins args with a space), exact arithmetic as shown. The builder must still re-run each against the completed solution per the quality gate, and — critically — must NOT declare `const print` in the starter (the worker injects it; see the CLAUDE.md gotcha) — but the numbers are correct as written.

**Gap-ranking legend (from v1):** **(a)** essential for robotics · **(b)** essential to pass a real first-year exam / degree level · **(c)** nice-to-have.

**One honest headline on problem-sources-with-solutions** (it varies a lot by chain): **math-calculus is the jackpot** — Paul's Online Math Notes posts *free, ungated, full step-by-step worked solutions* to every practice problem across limits, integration techniques and Taylor series (verified end-to-end, individual solution page and all), plus MIT 18.01SC exams-with-solutions. **os-concurrency is the unusual win** — OSTEP's homework *simulators compute the answers* (the `-c` flag), so it's effectively an unlimited supply of auto-solved problems mapped cleanly per lesson. **ai-learning is mixed-but-fine** — Google's ML Crash Course has free self-checking exercises across all three lessons and micrograd self-checks against PyTorch, but the only *printed worked solutions* (Berkeley CS188) cover just the perceptron / neural-net-representation slice, NOT regression, loss, or the backprop derivation. **prog-c is the hard case** — every canonical lab (CS:APP Data Lab, Malloc Lab, CS50 psets) *deliberately withholds* answer keys (autograder-only, instructor-gated), so the answer-bearing sources are learn-c.org's inline "Solution" buttons + Exercism community solutions, and you author-and-Node-verify the rest. Details and honest gating notes per chain below.

---

## 1. prog-c (NEW chain — extends the Programming domain)

**What it is:** a 3-lesson chain that takes the learner from the app's sandboxed-JavaScript mental model to how memory *actually works* in C — pointers and addresses, manual allocation and structs (building a linked list from raw memory), and bit manipulation + the memory bugs that bite. This is the single biggest CS-side language gap for the robotics goal: embedded firmware, MCU register programming, and ROS 2 nodes are C/C++, and bit masks/shifts are literally how you read a sensor status register or set a GPIO.

**Placement & scaffolding — read this, two decisions:**
- **Domain/exam decision.** Recommended: keep prog-c in the existing **`programming`** domain (Subject `cs`, cyan — same as prog-data-3), so "Programming" simply broadens from JS to C, exactly as math-linalg-4/-5 extended math without a new exam. Then **grow `prog-exam` 14→18** (+4 fresh C questions) and add the three new nodes to its prereqs (the validator enforces exam prereqs = all domain nodes). *Alternative* (heavier, only if Ollie wants a clean JS/C split): make a new `programming-c` domain with its own `prog-c-exam` (1 intro + 10 fresh Qs) — this costs a new domain entry + exam node. Recommend the low-friction option; confirm with Ollie.
- Node ids: `prog-c` → `prog-c-2` → `prog-c-3` (chain of 3), Subject `cs`.
- **Prereq = `prog-data`**, NOT the chain bottom prog-data-3. This is the pedagogically perfect launch pad: prog-data (560,400) is titled "Data in Memory" and its description already promises "*what memory actually looks like underneath*" — prog-c cashes that check. (Recursion/debugging in prog-data-2/-3 aren't needed to grasp pointers; this mirrors the 2026-07-07 "honest prereq" cleanup.) Cross-link `prog-c-3` to `bits` (binary/HCW) and `prog-c` forward to `robo-embedded`/`robo-ros` (the C you'll actually write) and to `os-concurrency` (chain 2 — threads are a C API).
- **No reserved slot exists** (unlike v2's chains) — this is the real layout risk. The Programming cell is dense: the JS chain runs down x560 (prog-variables 560,0 → prog-functions 560,200 → prog-data 560,400), then jogs left to x240 for prog-data-2/-3 (240,~620/820), with prog-exam at (0,1020) and Street S1 (y1100–1400) below carrying the long prog-data→{os,net,algo,ros} sweeps. **First-guess:** a short C column to the RIGHT of prog-data, hanging down-right off it — `prog-c` (820,400) → `prog-c-2` (820,620) → `prog-c-3` (820,820), fitting the empty x750–1120 gutter between Programming and Math. **The catch:** the prog-data→os-processes / →robo-ros sweeps leave prog-data (560,400) heading right and down — they may pierce an x820 column at y400–1100. Run `node scripts/check-map-layout.mjs` in BOTH tiers; if it hits, either drop the column lower/right or claim fresh space below Street S1. Treat this as the one hard part of the chain (like v2's Electronics corridor).

### 1.1 Canonical course & syllabus units

Two fully-free spine sources, both verified by fetching the actual content:

**Harvard CS50x** ✓ https://cs50.harvard.edu/x/ — the pedagogical spine (teaches C first, Weeks 1–5, in exactly this order). The relevant weeks, fetched, topic lists confirmed verbatim:
- **Week 1 "C"** ✓ https://cs50.harvard.edu/x/weeks/1/ — types, operators, conditionals, loops, integer overflow (the on-ramp).
- **Week 4 "Memory"** ✓ https://cs50.harvard.edu/x/weeks/4/ — verbatim: *"Pointers. Segmentation Faults. Dynamic Memory Allocation. Stack. Heap. Buffer Overflow. File I/O. Images."* → covers **Lessons 1 & 3**.
- **Week 5 "Data Structures"** ✓ https://cs50.harvard.edu/x/weeks/5/ — verbatim: *"Abstract Data Types. Queues, Stacks. Linked Lists. Trees, Binary Search Trees. Hash Tables. Tries."* → covers **Lesson 2**.

**Beej's Guide to C Programming** (Brian "Beej" Hall, v0.10.5, free complete book) ✓ https://beej.us/guide/bgc/ — the reference text (the `book` slot), exact chapter URLs verified:
- **Lesson 1 — pointers & memory:** Ch. 5 "Pointers—Cower In Fear!" ✓ https://beej.us/guide/bgc/html/split/pointers.html (addresses, pointer types, dereference, pass-by-pointer, NULL).
- **Lesson 2 — malloc & structs:** Ch. 8 "Structs" ✓ https://beej.us/guide/bgc/html/split/structs.html (`.` / `->`, passing struct pointers) + Ch. 12 "Manual Memory Allocation" ✓ https://beej.us/guide/bgc/html/split/manual-memory-allocation.html (malloc/free, error-checking, calloc, realloc, a full grow/shrink example).
- **Lesson 3 — bits & bugs:** Ch. 24 "Bitwise Operations" ✓ https://beej.us/guide/bgc/html/split/bitwise-operations.html (`& | ^ ~ << >>`, compound assignment, UB on bad shifts) + Ch. 14.5.1 hex/octal/binary literals ✓ https://beej.us/guide/bgc/html/split/types-ii-way-more-types.html (`0x`/`0b`, `unsigned`).

**CMU 15-213 / CS:APP3e** ✓ https://www.cs.cmu.edu/~213/ (labs page ✓ https://csapp.cs.cmu.edu/3e/labs.html) is the rigor/problem-source anchor — Data Lab (bit puzzles) and Malloc Lab (implement your own allocator). Textbook: Bryant & O'Hallaron, *Computer Systems: A Programmer's Perspective* (paid).

### 1.2 Gap vs current app coverage

The app teaches programming **only in sandboxed JavaScript** (prog-variables, prog-functions, prog-data, prog-data-2 recursion, prog-data-3 debugging) — **zero C, zero pointers, zero manual memory, zero bit manipulation**, so a learner exits with no model of what a variable *is* in memory. **(a)** This is the top CS-side robotics language gap: embedded/ROS 2 is C/C++, and bit masks/shifts (Lesson 3) are how you read a sensor status register or set a GPIO; the pointer + manual-memory model (Lessons 1–2) is prerequisite to all of it, and it unblocks the queued os-concurrency, security, and architecture chains. **(b)** Pointers, dynamic allocation, structs and bitwise ops are core first/second-year CS (CS50 Weeks 4–5, CMU 15-213) — no degree is complete without them. **(c)** The stack-vs-heap and dangling-pointer/leak material also sharpens debugging intuition that transfers back to the JS lessons.

### 1.3 Problem sources (with solutions) — the hard case

Every canonical lab deliberately withholds answer keys; the answer-bearing sources are the self-checking interactives:
- **learn-c.org — FREE, with inline solutions.** Every chapter has an in-browser runner and a one-click **"Solution"** button. The three pages map almost 1:1 onto the lessons: Pointers ✓ https://www.learn-c.org/en/Pointers, Linked lists ✓ https://www.learn-c.org/en/Linked_lists (builds `typedef struct node {int val; struct node *next;} node_t;` with malloc'd push/pop/free — nearly the exact Lesson-2 code screen), Bitmasks ✓ https://www.learn-c.org/en/Bitmasks (set `|= 1<<n`, clear `&= ~(1<<n)`, flip `^= 1<<n`, check `& (1<<n)`). **The best self-checking, per-topic source here.**
- **Exercism C track** ✓ https://exercism.org/tracks/c — 84 free exercises with an auto-test-runner and community-visible solutions *after* you solve (login required). Free solutions, less curated per-topic.
- **CS:APP Data Lab** — the ideal Lesson-3 problem bank: 13 bit puzzles using only `! ~ & ^ | + << >>`, with a self-checking `btest`/`dlc`/`driver.pl`. Writeup ✓ https://csapp.cs.cmu.edu/3e/datalab.pdf. **Solutions are instructor-only** (stated in the writeup) — but the puzzles are self-checkable, so pull the *statements* for extraPractice and Node-verify your own answers.
- **CS:APP Malloc Lab** ✓ https://csapp.cs.cmu.edu/3e/malloclab.pdf (linked from labs page) — self-checking driver, instructor-only key. Too heavy for a code screen; a legit Stage-3 build project.
- **CS50 psets** — Week 4 Volume/Filter/**Recover** ✓ https://cs50.harvard.edu/x/psets/4/, Week 5 Inheritance/Speller ✓ https://cs50.harvard.edu/x/psets/5/. Auto-graded via check50; **NO published key** (honesty policy forbids it). Superb *specs/inspiration* (Recover = recovering JPEGs from a raw card dump is a perfect pointer/memory exercise) — author your own solutions.

**Honest bottom line:** there is **no single free source with a printed answer key** for pointers/bit-ops. Path: pull problem *statements* from Data Lab / CS50 specs, use **learn-c.org** and **Exercism** where you want visible solutions, and Node-verify your own code-screen answers (which the app requires anyway).

### 1.4 Per-lesson build spec

**`prog-c` — "Pointers & the Memory Model: What a Variable Really Is."** Concept (≤3 sentences before doing): memory is one long array of numbered bytes; a *pointer* is just a variable that holds one of those numbers (an address), and `*p` ("dereference") means "the value living at that address." An array is a block of consecutive cells, so `arr[i]` is exactly `*(arr + i)` — and because an `int` is 4 bytes, "arr + 1" jumps 4 addresses, not 1. Arc: predict which cell an address points at → explain address/dereference → worked array-as-memory → independent "compute the address of arr[k]." `deeper?`: the stack vs the heap; why a pointer to a local goes stale. **Code screen (Node-verified):** model a byte-addressed int array and read it via pointer arithmetic.
```
base address 1000, int stride 4 bytes, arr = [10,20,30,40].
&arr[0]: 1000
&arr[2]: 1008
*(arr+2): 30      // arr[i] == *(arr + i); &arr[i] = base + i*4
```
`extraPractice` (≥4; seed from learn-c.org Pointers + CS50 Recover): address of arr[k], value via `*(p+k)`, swap-via-pointers result, null-pointer/segfault recognition. Hook (whyItMatters): every C-based sensor driver hands your robot a *pointer* to a buffer of readings — pointer arithmetic is how you walk it.

**`prog-c-2` — "malloc, Structs & Building a Linked List."** Concept: when you don't know the size up front you ask the heap for memory with `malloc` (and must `free` it or leak); a `struct` bundles fields, and a struct that holds a *pointer to its own type* is a **linked list** — nodes scattered across the heap, each pointing to the next. Arc: predict what `->next` reaches → explain malloc/struct/`->` → worked "traverse and sum" → independent "count the nodes / append one." `deeper?`: why `free` order matters; realloc and the grow-a-buffer pattern. **Code screen (Node-verified):** build a linked list (objects standing in for malloc'd nodes) and traverse it.
```
list built from [3,1,4,1,5]; walk p = p.next to the end.
length: 5
sum: 14
```
`extraPractice` (seed from learn-c.org Linked lists + CS50 Week 5): node count, sum/max via traversal, insert-at-head result, "what leaks if you lose the head pointer." Hook: a path planner or a sensor-event queue is a linked list you build and free thousands of times a second.

**`prog-c-3` — "Bit Manipulation & Memory Bugs."** Concept: hardware talks in bits, so you pack and read fields with masks and shifts — `(x >> k) & mask` extracts, `x |= (1<<k)` sets, `x &= ~(1<<k)` clears; and the classic C bugs (buffer overflow past an array's end, reading uninitialized/dangling memory, forgetting to `free`) all come from getting an index or a lifetime wrong. Arc: predict a shifted-and-masked value → explain masks/shifts/register bits → worked "unpack a packed word" → independent "set/clear/test a status bit." `deeper?`: two's-complement gotchas; why `<<` past the width is undefined. **Code screen (Node-verified):** unpack a 24-bit packed sensor/color word into its three byte fields.
```
word = 0x12AB34.
R: 18 G: 171 B: 52      // R=(w>>16)&0xFF, G=(w>>8)&0xFF, B=w&0xFF
```
`extraPractice` (seed from CS:APP Data Lab statements + learn-c.org Bitmasks): set/clear/toggle bit n, test whether a flag bit is set, count set bits, spot the off-by-one buffer overflow. Hook: setting a GPIO or reading an IMU's status register is exactly this — one masked, shifted byte.

**Grow `prog-exam` 14→18** (+4 fresh, `correctIndex: 0` convention, misconception-specific explanations, numerics hand-verified): pointer-arithmetic address numeric, linked-list traversal result, malloc/free (what leaks), bit-mask extraction — and add prog-c/-2/-3 to prog-exam's prereqs.

### 1.5 Resource shortlist (paste-ready for `resourcesByNode`)

- **`prog-c`:** [interactive] **Python Tutor — C mode** ✓ https://pythontutor.com/c.html — step-through visualizer that draws stack frames and pointer arrows; the definitive "predict where the arrow points" tool. · [interactive] learn-c.org "Pointers" ✓ https://www.learn-c.org/en/Pointers (in-browser, Solution button). · [book] Beej Ch. 5 "Pointers" ✓ https://beej.us/guide/bgc/html/split/pointers.html. · [video] freeCodeCamp "Pointers in C for Absolute Beginners" ✓ᴶ https://www.youtube.com/watch?v=MIL2BK02X8A (YouTube shell; title/author corroborated via Class Central ✓ https://www.classcentral.com/course/freecodecamp-pointers-in-c-for-absolute-beginners-full-course-199520). · [course] CS50 Week 4 "Memory" ✓ https://cs50.harvard.edu/x/weeks/4/.
- **`prog-c-2`:** [interactive] learn-c.org "Linked lists" ✓ https://www.learn-c.org/en/Linked_lists (malloc'd node struct, push/pop/free). · [book] Beej Ch. 12 "Manual Memory Allocation" ✓ https://beej.us/guide/bgc/html/split/manual-memory-allocation.html + Ch. 8 "Structs" ✓ https://beej.us/guide/bgc/html/split/structs.html. · [course + project] CS50 Week 5 "Data Structures" ✓ https://cs50.harvard.edu/x/weeks/5/; CS:APP Malloc Lab ✓ https://csapp.cs.cmu.edu/3e/malloclab.pdf (Stage-3 build).
- **`prog-c-3`:** [interactive] learn-c.org "Bitmasks" ✓ https://www.learn-c.org/en/Bitmasks (set/clear/flip/check bit n). · [problem set] CS:APP Data Lab writeup ✓ https://csapp.cs.cmu.edu/3e/datalab.pdf (13 self-checkable bit puzzles → extraPractice). · [book] Beej Ch. 24 "Bitwise Operations" ✓ https://beej.us/guide/bgc/html/split/bitwise-operations.html + hex/binary literals ✓ https://beej.us/guide/bgc/html/split/types-ii-way-more-types.html. · [course] CS50 Week 4 (buffer overflow / segfaults) ✓ https://cs50.harvard.edu/x/weeks/4/.

**Caveats for the builder:** (1) No free printed answer keys for pointers/bit-ops — lean on learn-c.org (inline solutions) + Data Lab statements (author-and-Node-verify). (2) Beej's *bitwise* chapter is `bitwise-operations.html`, NOT `bitwise.html` (that 404s). (3) All YouTube pages are JS shells (✓ᴶ) — the freeCodeCamp video ID is real and title-corroborated; the "Low Level Learning" / "Jacob Sorber" videos the agent surfaced were search-only on their channel attribution, so they're **not** cited here (see ledger). (4) *The C Programming Language* (K&R) is the famous reference but paid, no free authoritative URL — mention as an optional `book` pointer without a link.

---

## 2. os-concurrency (NEW chain — extends the OS domain)

**What it is:** a 3-lesson chain on the concurrency material the project itself flags as "the most robotics-critical missing CS concept" — why threads that share state race, how locks and condition variables fix it, and how deadlock and real-time scheduling decide whether your control loop actually meets its deadline. A robot is inherently concurrent (a sensor loop, a control loop and a comms loop all touch shared state), so this is directly the ROS-executor / shared-setpoint mental model.

**Placement & scaffolding:**
- Node ids: `os-concurrency` → `os-concurrency-2` → `os-concurrency-3` (chain of 3), Subject `cs` (cyan, existing OS domain).
- **Prereq = `os-processes`** (threads build directly on the processes/scheduling it already teaches; os-processes is at (3900,1300)). Cross-link `os-concurrency` to `prog-c-2` (chain 1 — the pthreads API is C), `os-concurrency` back to `os-processes`, and `os-concurrency-3` (real-time) to `robo-control` (the control loop *is* the periodic task whose deadline RM guarantees) and `robo-ros`.
- **Grow `os-exam` 10→14** (+4 fresh Qs); add the three new nodes to os-exam's prereqs.
- **No reserved slot** — the OS cell is compact (os-processes 3900,1300 · os-memory 3760,1500 · os-io 4040,1500 · os-exam 4060,1720), sitting in the far-right of Band 1. **First-guess:** a new column to the RIGHT of the cell hanging off os-processes — `os-concurrency` (4320,1320) → `-2` (4320,1520) → `-3` (4320,1720) — and move `os-exam` to the new cell bottom (e.g. ~(4110,1940)). The band-1 right area (x4300–4560, y1300–2000) is open and clears the future Electronics column (v2's reserved x4660/y850+, which sits higher). If the x4320 column crowds os-io, the fallback is to stack the chain in the open gap *below* the cell (x3900, y1900/2080/2260, exam lower still). Run `node scripts/check-map-layout.mjs` in both tiers.

### 2.1 Canonical course & syllabus units

**OSTEP — "Operating Systems: Three Easy Pieces" (Arpaci-Dusseau, U. Wisconsin), free** — the Concurrency section maps onto this chain almost 1:1, and every chapter PDF filename below was confirmed by fetching the PDF itself:
- **Lesson 1 — threads & races:** Ch. 26 "Concurrency: An Introduction" ✓ https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf — the canonical `counter = counter + 1` race, disassembled to load/add/store, traced to a lost update; defines critical section, race condition, mutual exclusion.
- **Lesson 2 — locks & condition variables:** Ch. 28 "Locks" ✓ https://pages.cs.wisc.edu/~remzi/OSTEP/threads-locks.pdf · Ch. 30 "Condition Variables" ✓ https://pages.cs.wisc.edu/~remzi/OSTEP/threads-cv.pdf (the `while`-not-`if` rule, Mesa semantics, a full bounded-buffer producer/consumer with two CVs) · Ch. 31 "Semaphores" ✓ https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf (binary-semaphore-as-lock, ordering, dining philosophers).
- **Lesson 3 — deadlock & real-time scheduling:** Ch. 32 "Common Concurrency Problems" ✓ https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf — the **four Coffman conditions verbatim** (mutual exclusion, hold-and-wait, no preemption, circular wait), the wait-for cycle, and per-condition prevention (lock ordering, trylock, atomic-all-at-once). The *real-time scheduling* half is not in OSTEP → second source below.

**Real-time scheduling** (Lesson 3, second half): **UPenn CIS 480 rate-monotonic slides** ✓ https://www.engineering.upenn.edu/~lee/09cis480/papers/LiuLayland.pdf — derives the Liu-Layland utilization bound **U ≤ n(2^(1/n) − 1) → ln 2 ≈ 0.693**, the critical-instant worst case, RM optimality among fixed-priority schedulers, EDF's 100% bound, and the hyperbolic bound, with worked numeric examples. Prose companion: Zalewski, "What Every Engineer Needs To Know About Rate-Monotonic Scheduling" ✓ https://www.amd.e-technik.uni-rostock.de/ma/gol/bsys/pdf/whatevereyeng.pdf.

**Companion hands-on course:** MIT 6.1810 (Fall 2025), xv6 labs ✓ https://pdos.csail.mit.edu/6.1810/2025/ — its **Lab: locks** ✓ https://pdos.csail.mit.edu/6.1810/2025/labs/lock.html (redesign the allocator into per-CPU freelists to kill lock contention + implement a read-write lock, self-graded via `make grade`) is the Stage-3 capstone.

### 2.2 Gap vs current app coverage

The OS domain today is three single intro lessons — os-processes (round-robin), os-memory (page tables), os-io (polling vs interrupts) — with **zero threads, races, locks, condition variables, deadlock, or real-time scheduling**. **(a) Top-tier robotics.** A robot is inherently concurrent; the OSTEP lost-update trace *is* what happens to a shared setpoint or odometry pose without a mutex, and rate-monotonic analysis is the literal math for "will my 1 kHz control loop still meet its deadline alongside a 30 Hz perception task" — round-robin (which os-processes already teaches) provably can't guarantee that. This is also the direct ROS-executor mental model. **(b) Degree-level core.** Locks/CVs/semaphores/deadlock are a mandatory second-year OS unit everywhere; the Coffman conditions and producer/consumer are standard exam fare. **(c) Nice-to-have:** reader-writer locks, dining philosophers, and lock-free/CAS are enrichment (`deeper?` toggles).

### 2.3 Problem sources (with solutions) — the unusual win

- **OSTEP homework simulators — FREE and effectively unlimited.** The homework page ✓ https://pages.cs.wisc.edu/~remzi/OSTEP/Homework/homework.html states verbatim that each simulator lets you *both generate problems AND obtain solutions* via the `-c` flag (different `-s` seeds → new problems). GitHub repo ✓ https://github.com/remzi-arpacidusseau/ostep-homework (root listing confirms the `threads-intro`, `threads-locks`, `threads-cv`, `threads-sema`, `threads-bugs` folders). This is the best problem source for the chain — ideal for `extraPractice`. Mapping (script names confirmed from the chapter PDFs' homework sections):
  - **Lesson 1 (races)** → `threads-intro/x86.py` — runs thread interleavings on `looping-race-nolock.s` (shared var at address 2000); `-c` reveals the critical section and the final value. A perfect fit for the app's "predict the final counter" pedagogy.
  - **Lesson 2 (locks/CVs)** → `threads-locks/x86.py` (lock-building interleavings) + `threads-cv/` (`main-two-cvs-while.c`, producer/consumer timing predictions) + `threads-sema/`.
  - **Lesson 3 (deadlock)** → `threads-bugs/vector-deadlock.c` (`./vector-deadlock -n 2 -l 1 -v`, add `-d`, watch it deadlock; `vector-global-order.c` etc. demonstrate each Coffman-condition fix). RT-scheduling problems come from the UPenn slides' worked examples.
- **OSTEP end-of-chapter homeworks** — solutions only *via* the simulators (no separate printed key). Questions confirmed inside every fetched PDF.
- **MIT 6.1810 Lab: locks** ✓ — self-graded via `make grade` (the lock lab shows exact expected `kalloctest`/`rwlktest` output); no written solutions (honesty policy). Great as a Stage-3 build, not for quick quiz problems.

### 2.4 Per-lesson build spec

**`os-concurrency` — "Threads & Race Conditions: When Sharing Goes Wrong."** Concept: two threads share memory to cooperate, but `counter++` is really three steps — load, add, store — and if the scheduler switches threads mid-sequence, two increments can both read the same old value and one update is silently lost. That non-determinism is a *race condition*, and the stretch of code that must not be interleaved is the *critical section*. Arc: predict the final value of a shared counter under a bad interleaving → explain load/add/store + the lost update → worked interleaving trace → independent "which schedules are safe." `deeper?`: why the bug is intermittent (heisenbug); atomicity. **Code screen (Node-verified):** simulate the classic lost-update interleaving deterministically.
```
two threads each do counter++ ; schedule = T1 load, T2 load, T1 store, T2 store.
final counter: 1
expected: 2
lost updates: 1        // both threads read 0, both store 1 → one increment vanishes
```
`extraPractice` (seed from OSTEP `threads-intro/x86.py -c`): final value under a given schedule, identify the critical section, which of two schedules loses an update, why the bug hides in testing. Hook: two robot loops writing the same odometry pose without protection lose readings exactly like this.

**`os-concurrency-2` — "Locks & Condition Variables: Taking Turns Safely."** Concept: a **lock** (mutex) makes a critical section atomic — only one thread holds it, so the load/add/store can't be split — while a **condition variable** lets a thread *sleep until* some state is true (e.g. "buffer not full") and be woken when it changes, which is how producers and consumers hand work back and forth without busy-waiting. Arc: predict what a lock does to the racing counter → explain mutual exclusion + wait/signal → worked bounded-buffer → independent "where do the lock/wait go." `deeper?`: the `while`-not-`if` rule (spurious wakeups); semaphores; why holding a lock too long kills throughput. **Code screen (Node-verified):** a bounded buffer whose condition variables keep the fill within capacity.
```
capacity 3; schedule of 5 produces + 5 consumes; CV blocks produce-when-full, consume-when-empty.
produced: 5 consumed: 5 maxFill: 3      // the CV invariant: fill never exceeds capacity
```
(Simpler contrast option, also Node-verified: 1000 lock-protected increments → **final counter: 1000**, i.e. no lost updates vs Lesson 1.) `extraPractice` (seed from OSTEP `threads-cv`/`threads-sema`): does adding a lock fix the race, bounded-buffer fill after a schedule, `if`-vs-`while` on wait, a semaphore initialized to 0 vs 1. Hook: a thread-safe command queue between a robot's planner and its motor driver is exactly a lock + condition variable.

**`os-concurrency-3` — "Deadlock & Real-Time Scheduling: Meeting the Deadline."** Concept: give two threads two locks in opposite orders and each can grab one and wait forever for the other — **deadlock**, which needs all four Coffman conditions (mutual exclusion, hold-and-wait, no preemption, circular wait), so breaking any one prevents it (e.g. always lock in a global order). And when periodic tasks share a CPU, **rate-monotonic** analysis tells you whether they all meet their deadlines: total utilization U = Σ(Cᵢ/Tᵢ) must sit under the bound n(2^(1/n)−1). Arc: predict whether two lock orderings deadlock → explain the four conditions + lock ordering → worked utilization check → independent "is this task set schedulable." `deeper?`: priority inversion (the Mars Pathfinder story); EDF's 100% bound. **Code screen (Node-verified):** rate-monotonic schedulability of a periodic task set.
```
tasks (compute C, period T): (1,4), (2,6), (1,8).
U: 0.708
RM bound: 0.780
schedulable: true      // U = 1/4 + 2/6 + 1/8 ≤ 3·(2^(1/3) − 1)
```
`extraPractice` (seed from OSTEP `threads-bugs/vector-deadlock.c` + UPenn slides): which Coffman condition a fix removes, does a given lock order deadlock, compute U for a task set, RM bound for n tasks. Hook: "will my 1 kHz control loop still hit every deadline when perception is running?" is this exact utilization sum.

**Grow `os-exam` 10→14** (+4 fresh): lost-update final value, lock/CV purpose, a Coffman-condition / lock-ordering question, rate-monotonic utilization numeric — and add os-concurrency/-2/-3 to os-exam's prereqs.

### 2.5 Resource shortlist (paste-ready)

- **`os-concurrency`:** [book] OSTEP Ch. 26 ✓ https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf. · [interactive] OSTEP `x86.py` race simulator (`threads-intro/`) ✓ https://github.com/remzi-arpacidusseau/ostep-homework. · [interactive] **The Deadlock Empire** ✓ https://deadlockempire.github.io/ — a browser puzzle game where you play the scheduler and break flawed locking; reinforces races/critical-sections from the first lesson on.
- **`os-concurrency-2`:** [book] OSTEP Ch. 30 Condition Variables ✓ https://pages.cs.wisc.edu/~remzi/OSTEP/threads-cv.pdf (+ Ch. 28 Locks ✓ https://pages.cs.wisc.edu/~remzi/OSTEP/threads-locks.pdf, Ch. 31 Semaphores ✓ https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf). · [interactive] OSTEP producer/consumer C (`threads-cv/main-two-cvs-while.c`) ✓ https://github.com/remzi-arpacidusseau/ostep-homework. · [project] MIT 6.1810 Lab: locks ✓ https://pdos.csail.mit.edu/6.1810/2025/labs/lock.html.
- **`os-concurrency-3`:** [book] OSTEP Ch. 32 (four Coffman conditions) ✓ https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf. · [interactive] The Deadlock Empire ✓ https://deadlockempire.github.io/ (deadlock levels). · [slides/article] UPenn rate-monotonic slides (Liu-Layland bound derived) ✓ https://www.engineering.upenn.edu/~lee/09cis480/papers/LiuLayland.pdf; backup tutorial ✓ https://www.amd.e-technik.uni-rostock.de/ma/gol/bsys/pdf/whatevereyeng.pdf.

**Caveats for the builder:** (1) **No current video** for this chain was verifiable — the MIT 6.828 Fall 2014 lecture playlist ✓ᴶ https://www.youtube.com/playlist?list=PLfciLKR3SgqNJKKIKUliWoNBBH1VHL3AP resolves but is dated and not chapter-aligned; 6.1810 (2025) posts only `.txt` lecture notes, not videos. Use the OSTEP PDFs + Deadlock Empire as the "video slot" substitute, or hand-pick and verify a specific lecture later. (2) The OSTEP homepage timed out once to the fetcher — irrelevant, every chapter PDF was fetched directly and confirmed. (3) GitHub directory *file listings* render via JS (✓ᴶ), but the folders and script names above are confirmed from the repo root listing + the chapter PDFs, not guessed.

---

## 3. ai-learning depth (extends the AI chain)

**What it is:** three lessons that turn the app's abstract gradient-descent game into the actual supervised-learning workflow — fitting a model to data (regression + loss), the generalization problem (train/test, overfitting, regularization), and how networks actually learn (backprop). It sits right between the two AI nodes the app already has (the gradient-descent game and the perceptron/XOR network) and reuses prereqs the app *just built*: least squares (math-linalg-4) and the chain rule (math-calculus-2).

**Placement & scaffolding — one naming decision:**
- The AI intro `ai-learning` already exists, so the depth chain is three NEW nodes **`ai-learning-2` (regression & loss) → `ai-learning-3` (overfitting & regularization) → `ai-learning-4` (backprop)**. Confirm this 3-node extension with Ollie (matches v2's robo-control naming call).
- **Repoint `ai-neural` ← `ai-learning-4`.** Right now ai-neural depends on the ai-learning intro; backprop (ai-learning-4) is the honest, pedagogically superior prereq for "how neural networks learn." This is the standard "repoint the downstream dep to the chain bottom" move and it improves the story (backprop → neural nets).
- Subject: the AI domain mixes (ai-learning is `math`, ai-neural is `cs`); pick one for chain coherence — recommend `cs` (cyan) since the domain reads as CS, or match ai-learning's `math` (violet) if you prefer. Cross-link `ai-learning-2` to `math-linalg-4` (least squares = regression's normal equations) and `math-calculus-2` (the gradient); `ai-learning-4` to `math-calculus-2` (the chain rule *is* backprop) — a strong, already-built tie.
- **Grow `ai-exam` 10→14** (+4 fresh); add the three nodes to ai-exam's prereqs.
- **No reserved slot** — the AI cell is x1120–1870, y2700–3100 (ai-search 1120,2700 · ai-learning ~1680,2700 · ai-neural 1680,2900 · ai-exam 1400,3100). ai-neural sits directly below ai-learning, so the chain can't go straight down. **First-guess:** a column to the RIGHT of the cell hanging off ai-learning — `ai-learning-2` (2020,2680) → `-3` (2020,2860) → `-4` (2020,3040) — in the open area below the robo-estimation chain (which lives higher, ~y1360–1720). Repoint ai-neural's in-edge to ai-learning-4 and grow ai-exam's fan-in. Run `node scripts/check-map-layout.mjs` in both tiers.

### 3.1 Canonical course & syllabus units

**MIT 6.390 "Intro to Machine Learning" open textbook** — the rigorous spine (the course homepage ✓ https://introml.mit.edu/ is a Fall-26 pre-semester shell, but the full textbook ✓ https://introml.mit.edu/notes/ is public and open):
- **Lesson 1 — regression & loss:** Ch. 2 "Regression" ✓ https://introml.mit.edu/notes/regression.html (hypothesis, squared loss → MSE, the OLS closed form θ* = (XᵀX)⁻¹XᵀY — framed as the pseudoinverse/projection onto the column space, tying straight to math-linalg-4/-5) + Ch. 3 "Gradient Descent" ✓ https://introml.mit.edu/notes/gradient_descent.html.
- **Lesson 2 — overfitting & regularization:** Ch. 2 §2.7–2.8 (same URL) — **ridge regression** J = MSE + λ‖θ‖², train vs test error, structural vs estimation error (= bias/variance), validation, cross-validation.
- **Lesson 3 — backprop:** Ch. 6 "Neural Networks" §6.5 "Error back-propagation" ✓ https://introml.mit.edu/notes/neural_networks.html (single neuron → one-hidden-layer → general L-layer; the page renders a single-neuron computational-graph figure that matches the planned micrograd-style code screen) + Appendix A "Matrix Calculus" ✓ https://introml.mit.edu/notes/matrix_calculus.html.

**Google ML Crash Course (MLCC)** — the interactive/pedagogical spine, whose module order is almost a 1:1 match ✓ https://developers.google.com/machine-learning/crash-course: Linear Regression → **Loss** ✓ https://developers.google.com/machine-learning/crash-course/linear-regression/loss (Lesson 1) → Overfitting → **L2 regularization** ✓ https://developers.google.com/machine-learning/crash-course/overfitting/regularization (Lesson 2) → Neural networks → **Backpropagation** ✓ https://developers.google.com/machine-learning/crash-course/neural-networks/backpropagation (Lesson 3). Every unit has inline "Test your knowledge" checks.

**Berkeley CS188** ✓ https://inst.eecs.berkeley.edu/~cs188/sp25/ (archived; current is fa25) — **be precise:** CS188 is ~80% search/CSPs/MDPs/RL/Bayes-nets; its ML content is only ~3 lectures (perceptron, neural-net representation) and it has **no regression/MSE/gradient-descent-fit material**. Its value here is purely a solved-problem bank for the *backprop/neural-net* lesson (§3.3), not for Lessons 1–2.

### 3.2 Gap vs current app coverage

The AI domain has ai-search (state-space), ai-learning (a gradient-descent game on the abstract L(x)=x²), and ai-neural (perceptron/XOR) — it teaches optimization mechanics and the perceptron in isolation but has **zero of the actual supervised-learning workflow**. **(a) Highest — ai-learning-2 (regression + loss):** the missing bridge that turns the abstract gradient-descent game into "gradient descent *fits a model to data*," directly reusing the just-built least-squares (math-linalg-4) and chain-rule (math-calculus-2) nodes. **(b) ai-learning-3 (overfitting/regularization):** the single most transferable idea for a roboticist — why a model that memorizes training data fails on new sensor readings — and the natural home for bias/variance. **(c) ai-learning-4 (backprop):** highest-ceiling but most self-contained; the payoff that connects the chain-rule node to how ai-neural's networks actually learn, best delivered as a micrograd-style single-neuron code screen.

### 3.3 Problem sources (with solutions) — mixed but fine

- **Google MLCC — FREE, self-checking, across all three lessons.** Each module has multiple-choice "Test your knowledge" (answers + explanations revealed inline), interactive widget exercises, and Colab programming exercises with worked solution notebooks. The L2-regularization check-your-understanding items are directly adaptable to the app's quiz format. Best self-checking practice for Lessons 1–2.
- **Karpathy micrograd** ✓ https://github.com/karpathy/micrograd — the canonical ~100-line autograd; **self-checking** (its `test/` verifies gradients against PyTorch). For Lesson 3 this is the reference to diff against, and the README states an exact worked forward+backward example (`g.data = 24.7041`, `a.grad = 138.8338`, `b.grad = 645.5773`) usable as a second Node-verifiable check. Course page: "Neural Networks: Zero to Hero" ✓ https://karpathy.ai/zero-to-hero.html.
- **Berkeley CS188 fa25 Discussion 10 (ML) + full solutions** ✓ https://inst.eecs.berkeley.edu/~cs188/fa25/assets/discussions/cs188-fa25-disc10-sols.pdf — the strongest *printed* worked-solution bank, but scope-limited: a full worked Perceptron problem (weight-update table, linear separability) + an 8-part "Neural Network Representations" problem, each with written solutions. **Covers perceptrons + NN representation, NOT the backprop gradient derivation and NOTHING for regression/loss (Lessons 1–2).** Mine it for ai-learning-4 extraPractice only.
- **MIT 6.390 textbook** — dense with inline self-check prompts (great for authoring extraPractice *questions*), but the actual graded psets/exams-with-solutions are **gated** (enrolled CAT-SOOP site, not open). Don't claim free 6.390 solved psets.

### 3.4 Per-lesson build spec

**`ai-learning-2` — "Linear Regression & Loss: Fitting a Line to Data."** Concept: a model is a guess with knobs — the line ŷ = wx + b — and a **loss function** (mean squared error, the average squared miss) scores how wrong it is on the data; "learning" is just turning w and b to push that loss downhill, and the downhill direction is the gradient the app's game already taught. Arc: predict which of two lines fits better → explain MSE → worked loss at two settings → independent "which way should w move." `deeper?`: the closed-form least-squares solution (= math-linalg-4's normal equations); why squared, not absolute, error. **Code screen (Node-verified):** MSE of a line at two settings, plus the loss gradient's sign.
```
data (1,2)(2,4)(3,6) [true line y = 2x].
MSE(w=1,b=0): 4.667
MSE(w=2,b=0): 0.000
dMSE/dw at w=1: -9.333      // negative slope ⇒ increase w to reduce loss
```
`extraPractice` (seed from MLCC Loss unit + Seeing Theory regression): MSE for a given line, which line has lower loss, sign of the gradient, "loss is zero when the line hits every point." Hook: fitting a calibration curve to sensor readings is exactly minimizing this loss.

**`ai-learning-3` — "Overfitting, Generalization & Regularization."** Concept: a model that's complex enough can *memorize* the training data — driving training loss to zero while doing worse on data it hasn't seen — so you hold out a **test set** to measure real performance, and you fight memorization with **regularization**, adding a penalty on large weights (L2/ridge: loss + λ·Σw²) that keeps the model simple. Arc: predict what happens to test error as a model gets more complex → explain train/test + the bias/variance tradeoff → worked regularized loss → independent "which λ generalizes." `deeper?`: cross-validation; early stopping; why more data helps. **Code screen (Node-verified):** L2-regularized (ridge) loss as the penalty weight grows.
```
base MSE 0.5, weights w = [3, 4] (Σw² = 25).
lambda=0: 0.50
lambda=0.1: 3.00
lambda=1: 25.50        // the penalty grows with big weights ⇒ pushes them smaller
```
`extraPractice` (seed from MLCC Overfitting/Regularization unit + TensorFlow Playground): regularized loss for a given λ, train-vs-test gap = overfitting, what λ→0 vs λ→large does, why a memorizing model fails on new data. Hook: a perception model that aced your lab but fails in a new room overfit — regularization and a test set are the fix.

**`ai-learning-4` — "Backpropagation: How Networks Learn."** Concept: a network is a chain of tiny operations, so to nudge every weight you need each weight's effect on the loss — and the **chain rule** (from math-calculus-2) gives it: run a **forward pass** to get the prediction and loss, then push gradients **backward** through the graph, multiplying local derivatives. Arc: predict which weight a change affects → explain forward/backward + the chain rule → worked single-neuron gradients → independent "compute dL/dw." `deeper?`: why gradients vanish/explode in deep nets; the computational graph as bookkeeping. **Code screen (Node-verified):** forward + backward pass through one neuron, squared-error loss.
```
neuron pred = w·x + b ; loss L = (pred − y)² ; x=2, w=3, b=1, y=10.
pred: 7 loss: 9
dL/dw: -12 dL/db: -6      // dL/dpred = 2(pred−y) = −6; dL/dw = dL/dpred · x
```
(For the "here's what a real autograd gives" reveal, cite micrograd's README example: `g.data = 24.7041`, `a.grad = 138.8338`, `b.grad = 645.5773`.) `extraPractice` (seed from CS188 fa25 disc10 + 3B1B backprop): forward value of a neuron, dL/dw via chain rule, which direction a weight moves, why backprop reuses the forward pass's numbers. Hook: every time your robot's vision net improves, this backward pass is what updated its millions of weights.

**Grow `ai-exam` 10→14** (+4 fresh): MSE numeric, overfitting/regularization concept (train-vs-test or λ direction), single-neuron backprop gradient, "loss is zero when the line fits" — and add ai-learning-2/-3/-4 to ai-exam's prereqs.

### 3.5 Resource shortlist (paste-ready)

- **`ai-learning-2`:** [interactive] Seeing Theory — Regression Analysis (drag the points, watch SSE change) ✓ https://seeing-theory.brown.edu/regression-analysis/index.html. · [article] MIT 6.390 Ch. 2 "Regression" ✓ https://introml.mit.edu/notes/regression.html. · [video] StatQuest "Linear Regression, Clearly Explained!!!" ✓ᴶ https://www.youtube.com/watch?v=nk2CQITm_eo (least squares + R²; YouTube shell, ID fetch-confirmed). · [interactive] MLCC Loss unit ✓ https://developers.google.com/machine-learning/crash-course/linear-regression/loss.
- **`ai-learning-3`:** [interactive] **TensorFlow Playground** ✓ https://playground.tensorflow.org/ — Regularization None/L1/L2 dropdown + train/test-ratio slider; drive it to *watch* overfitting. · [article] MLCC "Overfitting: L2 regularization" ✓ https://developers.google.com/machine-learning/crash-course/overfitting/regularization. · [article] MIT 6.390 §2.7–2.8 (ridge + validation), same regression.html ✓. · [video] StatQuest "Bias and Variance" ⚠ (ID search-confirmed only, not fetched — verify before embedding; see ledger).
- **`ai-learning-4`:** [video] 3Blue1Brown "Backpropagation calculus" ✓ᴶ https://www.youtube.com/watch?v=tIeHLnjs5U8 (the chain-rule-for-gradients video; 10:17, metadata confirmed) + intuition "Backpropagation, intuitively" ✓ᴶ https://www.youtube.com/watch?v=Ilg3gGewQ5U; series hub ✓ https://www.3blue1brown.com/topics/neural-networks. · [book/lab] Karpathy micrograd ✓ https://github.com/karpathy/micrograd + Zero to Hero ✓ https://karpathy.ai/zero-to-hero.html. · [article] MIT 6.390 Ch. 6 §6.5 "Error back-propagation" ✓ https://introml.mit.edu/notes/neural_networks.html.

**Caveats for the builder:** (1) CS188 solved problems only cover the perceptron/NN-representation slice — they are NOT a source for regression or the backprop derivation; MLCC + micrograd carry the self-checking for Lessons 1–2 and 4 respectively. (2) 6.390's graded psets/exams are gated; only the open textbook is free. (3) The StatQuest "Bias and Variance" video ID was search-confirmed but not fetch-confirmed — verify it resolves before embedding, or use the StatQuest channel page. (4) Do NOT cite the CS188 *sp25* `/assets/sections/` path (404) — the working file is the *fa25* `/assets/discussions/` one above.

---

## 4. math-calculus-4/-5/-6 (extends the calculus chain)

**What it is:** three lessons that complete the single-variable-calculus core the intro chain skips — limits & continuity (the rigor it assumes but never states), integration *techniques* (how to actually evaluate an integral, not just what one is), and Taylor series (polynomial approximation — the mathematical justification for the linearization the app's control and estimation chains already lean on). It's also direct **VU SBI year-1 Calculus** prep.

**Placement & scaffolding — one naming decision:**
- The CLAUDE.md backlog names this "math-calculus-4/-5" (two), but there are three distinct concepts. **Recommended:** build three clean lessons **`math-calculus-4` (limits & continuity) → `math-calculus-5` (integration techniques) → `math-calculus-6` (Taylor series)**, continuing the calculus column. *Fallback* (if two nodes are preferred, mirroring how phys-forces-3 folded two topics): fold limits into the front of the integration lesson and keep -4 = integration techniques, -5 = Taylor — but three is the better product (limits/continuity is a full lesson). Confirm with Ollie.
- Subject `math` (violet, existing). Prereq of `math-calculus-4` = **math-calculus-3** (chain-bottom convention). Cross-link `math-calculus-6` (Taylor) to `robo-control-3` and `robo-estimation-3` (first-order linearization = the 1-term Taylor expansion / the EKF's Jacobian step) and to `math-ode` (series solutions) — a genuine internal loop.
- **Grow `math-exam`** (+4 fresh calculus Qs) and add the three nodes to math-exam's prereqs. **Count note:** math-exam is currently **26** (after linalg-4/5), so this takes it to **30**; if v2's math-stats chain also lands it adds 4 more (→34). Both just add fresh Qs to the same exam, whose prereqs must list all math nodes — the order doesn't matter, only the final prereq set.
- **No reserved slot, but a clean corridor exists.** The calculus column is at x2240 (math-calculus 2240,0 · -2 2240,200 · -3 2240,400); math-ode forks LEFT off -3 (to x1420) and math-mv/math-stats claim x2520 to the right. So the space directly below -3 is open. **First-guess:** stack straight down the calculus column — `math-calculus-4` (2240,600) → `-5` (2240,780) → `-6` (2240,960) — staying above Street S1 (y1100). Verify both tiers with `node scripts/check-map-layout.mjs` (watch the math-calculus-2→math-mv fork edge up at y200–400 and any exam fan-in); nudge the column if it grazes.

### 4.1 Canonical course & syllabus units

**MIT 18.01SC "Single Variable Calculus" (OCW Scholar, self-study with exams+solutions)** ✓ https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/ — the primary spine, unit list fetched and mapped:
- **Lesson 1 — limits & continuity:** the formal limit/continuity thread runs through the early units; the payoff (0/0 indeterminate forms → L'Hôpital) is **Unit 5 Part A "L'Hospital's Rule and Improper Integrals"** ✓ https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/pages/unit-5-exploring-the-infinite/part-a-lhospitals-rule-and-improper-integrals/. (For a cleaner limits/continuity structure, Paul's Notes Ch. 2 below is the better blueprint.)
- **Lesson 2 — integration techniques:** **Unit 4 "Techniques of Integration"** ✓ https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/pages/unit-4-techniques-of-integration/ — Part B covers Partial Fractions, Advanced Partial Fractions, Integration by Parts (sessions 74–76); Part A covers trig substitution.
- **Lesson 3 — Taylor series:** **Unit 5 Part B "Taylor Series"** ✓ https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/pages/unit-5-exploring-the-infinite/part-b-taylor-series/ (Infinite Series → Power Series → Taylor's Series → operations).

**Paul's Online Math Notes** ✓ https://tutorial.math.lamar.edu/ — the structural blueprint for Lesson 1 and the best solved-problem source (§4.3). Its Calc I Ch. 2 "Limits" section list is an exact lesson outline: The Limit, One-Sided Limits, Computing Limits, **Continuity** ✓ https://tutorial.math.lamar.edu/Classes/CalcI/Continuity.aspx, The Definition of the Limit (informal ε-δ); Calc II has Integration by Parts, Partial Fractions ✓ https://tutorial.math.lamar.edu/Classes/CalcII/PartialFractions.aspx, and Taylor Series ✓ https://tutorial.math.lamar.edu/Classes/CalcII/TaylorSeries.aspx.

**OpenStax Calculus** (free textbook) — Vol. 1 for limits (§2.3 The Limit Laws ✓ https://openstax.org/books/calculus-volume-1/pages/2-3-the-limit-laws, §4.8 L'Hôpital), Vol. 2 for integration techniques (§3.1 Integration by Parts ✓ https://openstax.org/books/calculus-volume-2/pages/3-1-integration-by-parts) and series (§6.3 Taylor and Maclaurin Series ✓ https://openstax.org/books/calculus-volume-2/pages/6-3-taylor-and-maclaurin-series).

### 4.2 Gap vs current app coverage

The calculus chain (math-calculus / -2 / -3) covers slope/derivative, derivative rules & chain rule, and integral-as-accumulation. These three lessons fill exactly what a first-year exam tests and the intro skips. **(a) Highest — math-calculus-6 (Taylor):** nothing in the app touches series or polynomial approximation, yet linearization (f(x) ≈ f(a) + f′(a)(x−a); the cos θ ≈ 1 − θ²/2 small-angle trick) is the justification the app *already relies on* in robo-control (linearizing about an operating point) and robo-estimation-3 (the EKF's first-order Jacobian) — this closes an internal loop. **(b) High — math-calculus-5 (integration techniques):** the app teaches *what* an integral is but no method to evaluate a non-trivial one; u-substitution, by parts, and partial fractions are the "can you actually do it" core, and partial fractions ties back to math-ode. **(c) Solid — math-calculus-4 (limits & continuity):** the rigor the intro assumes (one-sided limits, removable discontinuities, 0/0 → L'Hôpital) — less directly robotics-critical but pure first-year exam bread-and-butter. All three are squarely VU SBI year-1 Calculus material, so this chain doubles as coursework prep.

### 4.3 Problem sources (with solutions) — the jackpot

- **Paul's Online Math Notes — FREE, ungated, full step-by-step worked solutions.** Verified end-to-end: a practice page (Computing Limits ✓ https://tutorial.math.lamar.edu/problems/calci/computinglimits.aspx — 15 problems, each with a **[Solution]** link) AND an individual solution page (✓ https://tutorial.math.lamar.edu/Solutions/CalcI/ComputingLimits/Prob7.aspx — renders the *full* worked solution inline, rationalize-the-numerator steps to the boxed answer 1/4). Integration by Parts practice ✓ https://tutorial.math.lamar.edu/problems/calcii/integrationbyparts.aspx (9 solved problems). Relevant sets (same verified `/problems/…` + `/Solutions/…` pattern): Continuity, One-Sided Limits, L'Hospital's Rule (Calc I); Integration by Parts, Partial Fractions (Calc II §7.1/§7.4); Taylor Series, Applications of Series (Calc II §10.16/§10.17). **The best free solved-problem source in this whole document — seed every extraPractice pool here.**
- **MIT 18.01SC — psets and exams WITH solutions, FREE.** Confirmed: the Final Exam page ✓ https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/pages/final-exam/ links both the exam and its solutions PDF; the course lists "Problem Set Solutions" and "Exam Solutions" resource types. Excellent for exam-style retrieval; slightly more effort to pull individual problems than Paul's inline solutions.
- **OpenStax — selected (odd) exercise answers free in-book; full solutions manual instructor-gated.** Fine as a free textbook + odd-answer checking, NOT a full solved bank like Paul's. Stated honestly — no fabricated solutions URL.

### 4.4 Per-lesson build spec

**`math-calculus-4` — "Limits & Continuity: Getting Arbitrarily Close."** Concept: a **limit** is the value a function *heads toward* as its input approaches a point — which can exist even where the function itself is undefined (a removable hole) — and a function is **continuous** where its limit equals its value (no jumps or holes). When both top and bottom head to 0, you get the 0/0 indeterminate form that L'Hôpital's rule resolves. Arc: predict where a function with a hole is heading → explain the limit + one-sided limits → worked removable discontinuity → independent "continuous or not." `deeper?`: the informal ε-δ picture ("for any tolerance, there's a closeness"); L'Hôpital for 0/0. **Code screen (Node-verified):** numerically approach a removable discontinuity.
```
f(x) = (x² − 1)/(x − 1), undefined at x = 1 but the limit is 2.
x=1.1  : 2.1000
x=1.01 : 2.0100
x=1.001: 2.0010        // f(1) is 0/0, yet f → 2 as x → 1
```
`extraPractice` (seed from Paul's Computing Limits/Continuity solutions): evaluate a limit by plugging in, a one-sided limit that differs, spot the removable vs jump discontinuity, a 0/0 case for L'Hôpital. Hook: "what does this sensor read *at exactly* the singular pose?" is a limit question — the answer can exist even where the formula divides by zero.

**`math-calculus-5` — "Integration Techniques: Actually Evaluating Integrals."** Concept: the intro chain said an integral accumulates a rate, but real integrals need *methods* — **u-substitution** (reverse the chain rule), **integration by parts** (∫u dv = uv − ∫v du, reverse the product rule), and **partial fractions** (split a messy ratio into easy pieces). Arc: predict which method a given integral needs → explain by-parts/substitution → worked ∫x·eˣ dx → independent "pick and apply the method." `deeper?`: partial fractions for rational functions (ties math-ode); trig substitution. **Code screen (Node-verified):** confirm an analytic by-parts result numerically (a Riemann/midpoint sum → the closed form).
```
∫₀¹ x·eˣ dx = [(x−1)eˣ]₀¹ = 1 (by parts). Check with a midpoint sum.
numeric: 1.0000
analytic: 1        // the technique gives the exact answer the sum converges to
```
`extraPractice` (seed from Paul's Integration by Parts / Partial Fractions solutions): choose the technique, ∫x·eˣ or ∫x·sin x by parts, a u-substitution result, split a fraction into partial fractions. Hook: integrating a torque profile or a battery-discharge curve means picking the right technique — the accumulation idea alone won't evaluate it.

**`math-calculus-6` — "Taylor Series: Turning Curves into Polynomials."** Concept: near a point, any smooth function is well-approximated by a polynomial built from its derivatives there — the **Taylor series** — and keeping just the first one or two terms is exactly the **linearization** robotics runs on (eˣ ≈ 1 + x, cos θ ≈ 1 − θ²/2). Add more terms and the polynomial hugs the curve over a wider range. Arc: predict how close a 2-term approximation gets → explain the series + its coefficients → worked partial sums of eˣ → independent "how many terms for this accuracy." `deeper?`: radius of convergence; why the first-order term is the derivative (ties robo-estimation-3's EKF). **Code screen (Node-verified):** partial sums of the eˣ series converging to e.
```
eˣ = Σ xᵏ/k!. At x = 1 this converges to e = 2.71828…
1 term : 1.0000
3 terms: 2.5000
5 terms: 2.7083
e      : 2.7183        // each term shrinks (÷k!) ⇒ fast convergence
```
`extraPractice` (seed from Paul's Taylor Series / Applications of Series solutions): a 1st/2nd-order approximation value, the small-angle cos θ ≈ 1 − θ²/2, "how many terms for 2-decimal accuracy," recognize a known series. Hook: the EKF, small-angle approximations, and every "linearize about the operating point" in the control chain are all the first term of a Taylor series.

**Grow `math-exam`** (+4 fresh, → 30 from the current 26; add math-calculus-4/-5/-6 to prereqs): numerical/removable-limit, integration-by-parts recognition or result, a continuity/L'Hôpital 0/0 question, Taylor/linearization (small-angle or partial-sum).

### 4.5 Resource shortlist (paste-ready)

- **`math-calculus-4`:** [video] 3Blue1Brown "(ε, δ) definitions of limits" ✓ https://www.3blue1brown.com/lessons/epsilon-delta (+ "Limits" ✓ https://www.3blue1brown.com/lessons/limits, "L'Hôpital's rule" ✓ https://www.3blue1brown.com/lessons/l-hopitals-rule). · [interactive] Khan Academy "Limits and continuity" ✓ᴶ https://www.khanacademy.org/math/ap-calculus-ab/ab-limits-new (exercises + unit test; JS-rendered). · [article] Paul's Notes — Continuity ✓ https://tutorial.math.lamar.edu/Classes/CalcI/Continuity.aspx. · [book] OpenStax Calculus Vol. 1 §2.3 ✓ https://openstax.org/books/calculus-volume-1/pages/2-3-the-limit-laws (L'Hôpital §4.8).
- **`math-calculus-5`:** [article] Paul's Notes — Integration by Parts ✓ https://tutorial.math.lamar.edu/problems/calcii/integrationbyparts.aspx + Partial Fractions ✓ https://tutorial.math.lamar.edu/Classes/CalcII/PartialFractions.aspx (both with full solutions). · [video/course] MIT 18.01SC Unit 4 Part B (Partial Fractions / Integration by Parts, sessions 74–76) ✓ https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/pages/unit-4-techniques-of-integration/. · [book] OpenStax Calculus Vol. 2 §3.1 ✓ https://openstax.org/books/calculus-volume-2/pages/3-1-integration-by-parts.
- **`math-calculus-6`:** [video] 3Blue1Brown "Taylor series" ✓ https://www.3blue1brown.com/lessons/taylor-series — builds cos x ≈ 1 − x²/2 + …, the eˣ series, factorial coefficients, and the linearization theme; the ideal spine. · [book] OpenStax Calculus Vol. 2 §6.3 "Taylor and Maclaurin Series" ✓ https://openstax.org/books/calculus-volume-2/pages/6-3-taylor-and-maclaurin-series. · [article] Paul's Notes — Taylor Series ✓ https://tutorial.math.lamar.edu/Classes/CalcII/TaylorSeries.aspx (+ Applications of Series). · [course] MIT 18.01SC Unit 5 Part B (Taylor's Series) ✓ https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/pages/unit-5-exploring-the-infinite/part-b-taylor-series/.

**Caveats for the builder:** (1) Paul's Notes is the solved-problem workhorse — every extraPractice pool can be seeded from it, ungated. (2) OpenStax only posts odd-answer keys free (full solutions manual is instructor-gated); use it as the textbook, Paul's for solved problems. (3) A native Taylor/limit interactive (a `code` screen computing partial sums, or a slider widget) is safer than a third-party applet — the Desmos/GeoGebra Taylor applets are JS shells whose contents couldn't be verified (see ledger); build it in-app.

---

## Build sequencing & cross-chain notes

**Recommended order** (friction + leverage; all four are Phase-3-ish CS-systems + core-math):
1. **math-calculus-4/-5/-6 first** — clearest win: the best solved-problem source (Paul's Notes, fully worked, ungated), no new subject/domain/exam plumbing (extends math, grows math-exam), a clean open corridor below the calculus column, direct SBI-year-1 Calculus prep, and Taylor/linearization closes a loop with the control/estimation chains already built. Lowest friction, high personal payoff (mirrors v2 putting math-stats first).
2. **os-concurrency** — extends the OS domain (no new subject), the OSTEP `-c` simulators give unlimited auto-solved problems mapped per lesson, and it's the "most robotics-critical missing CS concept." Layout is a compact-cell checker pass, not a new-subject build.
3. **ai-learning-2/-3/-4** — extends an existing chain, reuses the just-built least-squares (math-linalg-4) and chain-rule (math-calculus-2) prereqs, and has strong self-checking practice (MLCC + micrograd) even though printed solutions (CS188) cover only part. Decide the 3-node naming + the ai-neural→ai-learning-4 repoint with Ollie first.
4. **prog-c** — most friction of the four: the hard problem-source case (every canonical lab withholds keys), the trickiest layout (dense Programming cell + the prog-data sweeps), and it carries the domain/exam decision. Bank the three cheaper chains first.

**Cross-chain note (prog-c ↔ os-concurrency):** these are a natural CS-systems *pair* — prog-c's pointer/memory model makes os-concurrency's shared-state races concrete (the threads API is C), so pedagogically prog-c → os-concurrency. But the app's code runner is JS, so neither *technically* blocks the other; sequence by build-friction (os-concurrency is easier to land) while treating prog-c as the conceptual prerequisite. If Ollie wants to push the CS-systems spine hardest, build prog-c and os-concurrency back-to-back.

**Every chain, before commit (the quality gate — see CLAUDE.md):** `npm run build` (the real typecheck) · content validator green · `node scripts/check-map-layout.mjs` reports **zero crossings in BOTH view tiers** · re-run each new `code` screen against the completed solution (outputs above are Node-verified as of 2026-07-08 but re-verify in-app; do NOT declare `const print` in the starter) · hand-fact-check technical claims · browser-play one new lesson end-to-end.

**Placement recap** (all first-guesses — no reserved slots existed for these, unlike v2; run the checker): prog-c → C column right of prog-data, ~x820 y400/620/820 (**layout risk:** the prog-data→{os,net,algo,ros} sweeps) · os-concurrency → column right of the OS cell, ~x4320 y1320/1520/1720, move os-exam to the new bottom · ai-learning-2/-3/-4 → column right of the AI cell, ~x2020 y2680/2860/3040, repoint ai-neural ← ai-learning-4 · math-calculus-4/-5/-6 → straight down the calculus column, ~x2240 y600/780/960.

**Exam growth recap:** prog-exam 14→18 (+4, *if* prog-c stays in the programming domain — else a new elec-style prog-c-exam) · os-exam 10→14 (+4) · ai-exam 10→14 (+4) · math-exam 26→30 (+4; +4 more if v2's math-stats also lands).

## Could not verify / dropped (honesty ledger)

- **prog-c:** No free *printed* answer key exists for pointers/bit-ops — CS:APP Data Lab & Malloc Lab and CS50 psets all withhold keys (autograder-only / instructor-gated); the answer-bearing sources are learn-c.org (inline "Solution") + Exercism (community solutions after solving). Beej's bitwise chapter is `bitwise-operations.html` (the guessed `bitwise.html` 404s). YouTube pages are JS shells (✓ᴶ): the freeCodeCamp pointers video (MIL2BK02X8A) is title-corroborated via Class Central, but the "Low Level Learning" and "Jacob Sorber" videos the agent surfaced were search-only on channel attribution and are **not** cited. K&R is paid, no free authoritative URL.
- **os-concurrency:** **No current video** for the chain could be verified — the MIT 6.828 Fall 2014 playlist resolves (✓ᴶ) but is dated and not chapter-aligned; 6.1810 (2025) posts only `.txt` notes. The OSTEP homepage timed out once to the fetcher (✗) — irrelevant, all chapter PDFs were fetched directly. GitHub directory *file* listings render via JS (✓ᴶ); folder/script names are confirmed from the repo root + chapter PDFs. Dijkstra EWD123 and the 6.1810 `.txt` lecture notes are (linked), not independently fetched.
- **ai-learning:** CS188's printed solutions cover only perceptron / NN-representation (NOT regression, loss, or the backprop derivation). 6.390's graded psets/exams are gated (only the open textbook is free). The CS188 *sp25* `/assets/sections/` path and a guessed `note22.pdf` both 404 — use the *fa25* `/assets/discussions/` solutions PDF. StatQuest "Bias and Variance" (EuBBz3bI-aA) was search-confirmed only, not fetch-confirmed (⚠) — verify before embedding. YouTube pages are JS shells (✓ᴶ); the 3B1B and StatQuest linear-regression IDs were fetch/metadata-confirmed.
- **math-calculus:** OpenStax posts only odd-answer keys free (full solutions manual instructor-gated) — Paul's Notes is the ungated worked-solution source. Desmos and GeoGebra Taylor applets are JS shells whose contents couldn't be confirmed — build the interactive natively rather than cite an unverified applet ID. Several OpenStax/Paul's chapter pages returned HTTP 200 with real content too large to render inline (status ✓, body not shown); the specific section URLs were corroborated via allowed-domain search.

*Compiled 2026-07-08 (Cowork research, four parallel agents). All URLs fetched live that day; all code-screen numbers Node-verified that day. Feeds the next content session per the CLAUDE.md Phase-3 backlog. Pair with v1 ([curriculum-gap-analysis.md](curriculum-gap-analysis.md)) for whole-map context and v2 ([curriculum-gap-analysis-v2.md](curriculum-gap-analysis-v2.md)) for the previous four chains.*
