# Employability Skills Coverage — spec

**Purpose:** the build-ready spec for weaving an employability-oriented skill set into the existing Atlas knowledge graph, and for showing honestly which of those skills the graph covers, which it covers only shallowly, and which are missing entirely. This is a **coverage lens plus a gap-filling plan**, not a course tracker. It supersedes nothing already built; it adds a new lens over the existing graph and a queue of content chains to close the gaps it exposes.

Read [curriculum-gap-analysis.md](curriculum-gap-analysis.md) (v1, whole-map survey + the proven chain build pattern) for how content chains get authored — this doc does not repeat it. Where the gap-analysis docs ask *"what does a bachelor's degree cover that we don't?"*, this doc asks a narrower, more practical question: *"what does an entry-level technical role expect that we don't?"*

**Naming note:** `curriculum` in this codebase already means the knowledge graph (`src/content/curriculum.ts`). Nothing here reuses that word. The reference courses below are exactly that — a **reference for which skills matter**, not units of work to be tracked.

---

## 1. Scope decisions

Four decisions were taken before this spec was written. They are recorded here because several of them cut work that would otherwise look obviously worth doing.

| Decision | Choice | Consequence |
|---|---|---|
| Where the effort centres | **Coverage-driven** — build the lens first, then let it drive which gap content gets authored | Tier 1 is instrumentation + tagging; Tier 2 is content |
| Progress metrics | **No tracker metrics** — no hours logged, no budget, no certificate URLs, no per-course status or milestones | The "am I on track" signal is Atlas's existing mastery / XP / spaced-repetition data. Nothing new to keep entering |
| How the language gap gets taught | **Local setup, taught inside the lessons** — the learner installs and runs a real local toolchain, guided step by step | No in-browser runtime investment needed. See §6 |
| Data-and-analytics track | **Tier 2, but genuinely wanted** — not demoted to a resource-only stub | Authored as real content, but after the lens exists |

### What this supersedes from the original brief

The original brief specified a per-course data model: status, percent complete, hours logged, start and completion dates, certificate URL, free-text notes, user-defined milestones (seeded with ten problem sets plus a final project for the first course), hours-against-total, courses-completed-out-of-eight, and spend against a EUR 165 budget.

**All of that is dropped** by the "no tracker metrics" decision above. It is recorded here so the reasoning is not rediscovered later: every one of those fields depends on data the learner would have to keep entering by hand, indefinitely, for a private tool used by one person. The parts of the original data model that **survive**:

- **The skills view** — grouped by skill rather than by course, showing what covers each skill and where the gaps are. This is the core of Tier 1.
- **The presentation rule** — every figure is shown as an absolute number alongside its total and the resulting percentage. Never a bare percentage, never a bare count. This applies to every number the coverage view renders.

---

## 2. Reference curriculum (verbatim)

Recorded verbatim as the provenance of the skill taxonomy in §3 and the source of the resource links in Tier 1. No hour estimates, prices, URLs, or syllabus details beyond what appears here have been invented or fetched. **The original brief lives outside the repo** (it came from a Cowork session; the `docs/curriculum-gap-analysis-*.md` files are a different workstream and do not contain it), so this section is the only in-repo record of it and cannot be re-verified against a source here.

### 1. CS50x: Introduction to Computer Science
- **Provider:** Harvard University
- **URL:** https://cs50.harvard.edu/x/
- **Skills:** C, Python, SQL, algorithms, data structures, memory management
- **Estimated hours:** 150
- **Cost:** free, certificate included
- **Certificate:** free certificate at 70% or above on all problem sets, labs, and the final project. Verified edX certificate is a separate paid option.
- **Notes:** broadest single credential in this list; covers three languages at once.

### 2. CS50P: Introduction to Programming with Python
- **Provider:** Harvard University
- **URL:** https://cs50.harvard.edu/python/
- **Skills:** Python, functions, exceptions, unit tests, file I/O, regular expressions, OOP
- **Estimated hours:** 60
- **Cost:** free, certificate included
- **Certificate:** free certificate at 70% or above on all problems and the final project.

### 3. Foundational C# with Microsoft
- **Provider:** Microsoft and freeCodeCamp
- **URL:** https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/
- **Skills:** C#, .NET, variables and data types, control flow, methods, debugging
- **Estimated hours:** 35
- **Cost:** free
- **Certificate:** free, Microsoft-branded. Training modules are on Microsoft Learn and award trophies; the final assessment is an 80-question, 1-hour exam on freeCodeCamp.
- **Notes:** best recognition-per-hour ratio in this list.

### 4. Java Programming I
- **Provider:** University of Helsinki (MOOC.fi)
- **URL:** https://java-programming.mooc.fi/
- **Skills:** Java, object-oriented programming, algorithms, IntelliJ, automated testing
- **Estimated hours:** 70
- **Cost:** free
- **Certificate:** free certificate at 80% or above of the programming exercise points.
- **Notes:** legacy course, no longer updated and no longer eligible for ECTS credit.

### 5. Java Programming II
- **Provider:** University of Helsinki (MOOC.fi)
- **URL:** https://java-programming.mooc.fi/
- **Skills:** Java, advanced OOP, collections, interfaces, streams, GUI basics
- **Estimated hours:** 70
- **Cost:** free
- **Certificate:** separate free certificate at 80% or above of the exercise points.

### 6. Relational Database Certification
- **Provider:** freeCodeCamp
- **URL:** https://www.freecodecamp.org/learn/relational-database/
- **Skills:** SQL, PostgreSQL, Bash, Git, database design, normalisation
- **Estimated hours:** 70
- **Cost:** free
- **Certificate:** free, with a permanent public verification URL.
- **Notes:** freeCodeCamp lists this as 300 hours nominally; 70 is realistic for someone who already programs.

### 7. Back End Development and APIs Certification
- **Provider:** freeCodeCamp
- **URL:** https://www.freecodecamp.org/learn/back-end-development-and-apis/
- **Skills:** REST API design, Node.js, Express, MongoDB, HTTP methods, middleware
- **Estimated hours:** 70
- **Cost:** free
- **Certificate:** free, with a permanent public verification URL.
- **Notes:** nominally 300 hours; 70 is realistic with prior programming experience.

### 8. Prepare for PL-300: Microsoft Power BI Data Analyst
- **Provider:** Microsoft Learn
- **Skills:** Power BI, Power Query, DAX, data modelling, data visualisation, row-level security, workspace management. Also tag: Excel Power Query, Excel Power Pivot — Excel and Power BI share the same query engine and data model, so this track covers both.
- **Estimated hours:** 40
- **Cost:** training free; PL-300 exam approximately EUR 165 (USD 165, varies by region)
- **Certificate:** Microsoft certification, valid one year, free online renewal. Includes free practice assessments on the exam page.
- **Notes:** the only paid item in the curriculum, and the only one that appears by name in supply chain job postings.

**Totals:** 8 courses, 565 estimated hours, EUR 165 total cost across a curriculum where 7 of 8 items (87.5%) are free.

---

## 3. The essential-skill taxonomy

Derived from §2 by **deduplication and grouping only** — every skill below appears verbatim in a course's Skills field. Nothing is invented, and nothing is dropped. Skill ids are kebab-case and stable; they are what nodes get tagged with.

Families exist purely to group the coverage view into readable sections.

### Family: `languages`
| id | Skill | Evidenced by |
|---|---|---|
| `c` | C | 1 |
| `python` | Python | 1, 2 |
| `csharp` | C# | 3 |
| `dotnet` | .NET | 3 |
| `java` | Java | 4, 5 |
| `sql` | SQL | 1, 6 |

### Family: `programming-concepts`
| id | Skill | Evidenced by |
|---|---|---|
| `variables-and-data-types` | variables and data types | 3 |
| `control-flow` | control flow | 3 |
| `methods` | methods | 3 |
| `functions` | functions | 2 |
| `exceptions` | exceptions | 2 |
| `file-io` | file I/O | 2 |
| `regular-expressions` | regular expressions | 2 |
| `oop` | object-oriented programming / OOP | 2, 4 |
| `advanced-oop` | advanced OOP | 5 |
| `collections` | collections | 5 |
| `interfaces` | interfaces | 5 |
| `streams` | streams | 5 |
| `gui-basics` | GUI basics | 5 |
| `algorithms` | algorithms | 1, 4 |
| `data-structures` | data structures | 1 |
| `memory-management` | memory management | 1 |

### Family: `tooling-and-testing`
| id | Skill | Evidenced by |
|---|---|---|
| `debugging` | debugging | 3 |
| `unit-tests` | unit tests | 2 |
| `automated-testing` | automated testing | 4 |
| `intellij` | IntelliJ | 4 |
| `git` | Git | 6 |
| `bash` | Bash | 6 |

### Family: `data-and-databases`
| id | Skill | Evidenced by |
|---|---|---|
| `postgresql` | PostgreSQL | 6 |
| `database-design` | database design | 6 |
| `normalisation` | normalisation | 6 |
| `mongodb` | MongoDB | 7 |

### Family: `web-and-apis`
| id | Skill | Evidenced by |
|---|---|---|
| `rest-api-design` | REST API design | 7 |
| `nodejs` | Node.js | 7 |
| `express` | Express | 7 |
| `http-methods` | HTTP methods | 7 |
| `middleware` | middleware | 7 |

### Family: `analytics-and-bi`
| id | Skill | Evidenced by |
|---|---|---|
| `power-bi` | Power BI | 8 |
| `power-query` | Power Query | 8 |
| `dax` | DAX | 8 |
| `data-visualisation` | data visualisation | 8 |
| `row-level-security` | row-level security | 8 |
| `workspace-management` | workspace management | 8 |
| `data-modelling` | data modelling | 8 |
| `excel-power-query` | Excel Power Query | 8 |
| `excel-power-pivot` | Excel Power Pivot | 8 |

**Total: 46 essential skills across 6 families** (languages 6, programming-concepts 16, tooling-and-testing 6, data-and-databases 4, web-and-apis 5, analytics-and-bi 9).

---

## 4. Provisional coverage map

**This section is a first-pass estimate, not a verified result.** It was produced by reading node titles and lesson subjects during the audit, not by exhaustively reading all ~123 lessons. Confirming it *is* the tagging work item in Tier 1 — expect the numbers to move.

Coverage uses three states:

- **Covered** — at least one node teaches the skill directly and at usable depth.
- **Partial** — a node touches the skill but stops short of what the reference course implies (e.g. SQL as `SELECT`/`WHERE`/`JOIN` but no schema work).
- **Gap** — no node teaches it at all.

### Provisional totals

| State | Count | Of total | Percentage |
|---|---|---|---|
| Covered | 7 | 46 | 15% |
| Partial | 7 | 46 | 15% |
| Gap | 32 | 46 | 70% |

### Covered (7)

| Skill | Covering nodes |
|---|---|
| `c` | `prog-c`, `prog-c-2`, `prog-c-3` |
| `memory-management` | `prog-c-2`, `prog-c-3` |
| `algorithms` | `algo-bigo`, `algo-sorting`, `algo-dp`, `algo-paths`, `algo-graphs` |
| `data-structures` | `algo-structures`, `prog-data` |
| `functions` | `prog-functions` |
| `control-flow` | `prog-variables`, `prog-functions` |
| `debugging` | `prog-data-3` |

### Partial (7)

| Skill | Covering nodes | What's missing |
|---|---|---|
| `sql` | `db-sql` | GROUP BY + COUNT/AVG are explained and quizzed conceptually; missing schema definition (DDL/CREATE TABLE), subqueries, and hands-on aggregation practice |
| `unit-tests` | `prog-data-3` | Testing as a *concept*; no real test framework or runner |
| `automated-testing` | `prog-data-3` | Same — no framework, no test-suite discipline |
| `http-methods` | `net-protocols` | Only GET appears, as an illustration, alongside status codes; the method verbs (POST/PUT/DELETE) are never taught, and HTTP appears as a protocol, not as an API surface to design against |
| `normalisation` | `db-relational` | Mentioned in passing; no normal forms, no decomposition practice |
| `database-design` | `db-relational` | Tables, primary/foreign keys and JOIN-as-lookup only; missing schema design as a discipline, ER modelling, and table/column decisions |
| `variables-and-data-types` | `prog-variables` | Strings and numbers only; no type taxonomy — no booleans-as-a-type, no int/float distinction |

### Gap (32)

Grouped by the chain that would close them — this ordering **is** the Tier 2 queue.

| Proposed chain | Skills closed |
|---|---|
| **Python (local toolchain)** | `python`, `exceptions`, `file-io`, `regular-expressions` |
| **OOP + Java** | `oop`, `advanced-oop`, `java`, `collections`, `interfaces`, `streams`, `intellij`, `gui-basics` |
| **C# / .NET** | `csharp`, `dotnet`, `methods` |
| **Backend & APIs** | `rest-api-design`, `nodejs`, `express`, `mongodb`, `middleware` |
| **Developer tooling** | `git`, `bash` |
| **Data & BI** | `power-bi`, `power-query`, `dax`, `data-visualisation`, `row-level-security`, `workspace-management`, `data-modelling`, `excel-power-query`, `excel-power-pivot` |
| **db-depth** | `postgresql` |

**The honest headline:** the graph was built for a robotics-founder path — systems, maths, physics, control. The skill set above leans applied software engineering and data analysis. The overlap is real but thin — only 7 of 46 skills (15%) are covered, and that coverage is concentrated in exactly the places Atlas already went deep (C, algorithms, data structures). Every language an employer is likely to name — Python, Java, C# — is currently absent, and 32 of 46 skills (70%) are outright gaps.

**Scope, stated plainly:** those 32 gap skills span 6+ content chains — two of them (OOP + Java, Data & BI) multi-session — plus two new domains, each carrying its own exam node and its own map cell. At the established one-chain-per-session cadence, and competing with the existing Phase 2–4 queue and the robotics-core goal, closing this out is a multi-month body of work, not a stage that lands in a few sittings. Worth building, but worth sizing honestly.

---

## 5. Data model

Two design constraints inherited from the codebase, both non-negotiable:

1. **All types live in `src/types.ts`.**
2. **Derived state is computed, never stored.** No new persisted fields, no new counters. The achievements system already sets this precedent and the coverage lens follows it exactly.

The result: **the coverage lens persists nothing.** It reads authored tags plus the mastery data Atlas already keeps.

### Authored data

```ts
// src/types.ts

export type SkillFamily =
  | 'languages'
  | 'programming-concepts'
  | 'tooling-and-testing'
  | 'data-and-databases'
  | 'web-and-apis'
  | 'analytics-and-bi'

/** One skill from the employability reference set (see docs/employability-skills-coverage.md §3). */
export interface EssentialSkill {
  id: string
  name: string
  family: SkillFamily
  /** Reference-course numbers evidencing this skill — provenance only, never tracked. */
  sources: number[]
}
```

Added to the existing `KnowledgeNode`:

```ts
  /** Employability skills this node teaches at usable depth (EssentialSkill ids). */
  skills?: string[]
  /** Skills this node touches without reaching usable depth (EssentialSkill ids). */
  skillsPartial?: string[]
```

The depth judgment lives in these two authored tags — set per node by actually reading the lesson during the tagging pass — rather than in any proxy. A skill id must not appear in both fields on the same node.

A new content file holds the taxonomy — `src/content/skills.ts`, following the `src/content` data-only convention and deliberately **not** named `curriculum.ts`:

```ts
export const essentialSkills: EssentialSkill[] = [ /* §3 */ ]
```

### Derived data

Computed on the fly, in the shape of the existing `achievements.ts` helpers:

```ts
export type SkillCoverageState = 'gap' | 'partial' | 'covered'

export interface SkillCoverage {
  skill: EssentialSkill
  /** Nodes that teach this skill at usable depth (tagged in `skills`). */
  nodeIds: string[]
  /** Nodes that only touch this skill (tagged in `skillsPartial`). */
  partialNodeIds: string[]
  /** How many of the covering nodes the learner has mastered. */
  masteredCount: number
  state: SkillCoverageState
}
```

`state` is derived, not authored, from the two authored tag fields: `covered` when any node lists the skill in its `skills`; else `partial` when any node lists it in its `skillsPartial`; else `gap`. Depth-of-teaching is decided per node at tagging time (from reading the lesson) and captured in which field the tag lands in — **not** inferred from `tier`, which is a map-display layer, not a measure of how deeply a lesson teaches a skill. This keeps `covered` reachable for a well-taught intro-level skill.

### Presentation rule

Every number the view renders is shown as **absolute, total, and percentage** — "Skills covered: 7 of 46 (15%)", never "15%" alone and never "7" alone. This applies to per-family rollups and per-skill mastery counts equally.

### What is deliberately absent

No `status`, `percentComplete`, `hoursLogged`, `startDate`, `completionDate`, `certificateUrl`, `notes`, or `milestones` on anything. No budget. No course entity with progress state. The eight courses appear in the codebase only as `Resource[]` links on the nodes they support, using the mechanism that already exists.

---

## 6. The Python approach — local toolchain, taught in-lesson

The chosen approach is that the lessons **walk through installing and using a real local Python toolchain**, rather than executing Python in the browser.

**Why this removes the blocker rather than working around it.** Atlas's code-runner executes JavaScript in a Web Worker, so it cannot run Python. That looked like a hard constraint on teaching Python at all. It isn't, because **mastery in Atlas has never come from the code-runner** — it comes from the quiz (≥80%), as `masterNode` and the results screen already implement. The runner is a teaching device, not a gate.

Consequences:

- **No new app mechanism is required.** No Pyodide, no runtime, no new `Screen` kind, no store changes. This chain is pure content authoring.
- **The lesson pattern is new but small:** `explain` (a setup or concept step) → `predict` (what will this command print?) → the learner runs it locally and compares against the shown expected output → `quiz` (tests comprehension, and carries mastery as always).
- **The app cannot verify a local run.** Self-verification is honest for a private single-user tool, and it is worth stating plainly rather than pretending otherwise.
- **Setup is itself content.** Installing an interpreter, creating a virtual environment, installing and running a test runner, and reading a traceback are employability skills in their own right — they overlap `bash`, `unit-tests`, and `automated-testing`, which lets one chain close skills from three different reference courses.

The same pattern generalises to the C#, Java, and backend chains later, which is the main reason to prove it out on Python first.

---

## 7. Agreed insights

### Tier 1 — the lens (build first)

Cheap, almost entirely authored data plus one view, and its output *is* the Tier 2 queue.

1. **Skill taxonomy** — §3 encoded as `src/content/skills.ts`.
2. **Node tagging** — `skills?: string[]` and `skillsPartial?: string[]` on `KnowledgeNode`, applied to every node that teaches or touches an essential skill (usable-depth tags in `skills`, shallower ones in `skillsPartial`). Confirms or corrects §4.
3. **Validator invariants** — every skill id in a node's `skills` **and** `skillsPartial` resolves to a real skill; no skill id appears in both fields on the same node; the taxonomy has no duplicate ids. Added to `src/content/validate.ts` per the existing "add an invariant whenever a content rule matters" rule.
4. **Coverage view** — grouped by skill and family, showing covering nodes, mastery, and gaps, under the presentation rule in §5.
5. **Resource links** — the eight courses attached to the nodes they support via the existing `resourcesByNode` mechanism.

### Tier 2 — the muscle (once the lens proves useful)

Ordered by the coverage map, most-essential first. Each is a content chain following the proven pattern in v1.

1. **Python, local toolchain** (§6) — closes 4 skills, proves the new lesson pattern.
2. **OOP + Java** — closes 8 skills; **multi-session** — the skills span two 70-hour courses (Java I + II), realistically 2–3 build sessions, so sequence it as such. Factor a shared OOP-concepts node so object-orientation is authored once, not three times across Python, Java, and C#.
3. **C# / .NET** — closes 3 skills (`csharp`, `dotnet`, `methods`); small, and maps cleanly onto the existing lesson shape.
4. **Backend & APIs** — closes 5 skills; nothing web-facing exists in the graph today. Also carries the new `applied-software` domain + its exam + an unclaimed map cell on top of the 5 skills.
5. **Developer tooling (Git, Bash)** — closes 2 skills; partially overlaps the Python chain's setup work.
6. **Data & BI** — closes 9 skills, the single largest block; **multi-session** — now 9 skills plus a new domain, exam, and map cell. Furthest from the app's sim-based pedagogy, so expect concept nodes plus heavy reliance on curated resources rather than interactive sims.
7. **db-depth** — promotes `sql`, `normalisation`, `database-design` from partial to covered **and** closes the `postgresql` gap. db-transactions already covers B-tree vs hash indexes and EXPLAIN, so the "indexes & B+trees" lesson builds on that rather than duplicating it. **Overlaps an existing backlog item — see §8.**
8. **Coverage-weighted next-step nudge** — bias the existing suggestion logic toward nodes that close an uncovered skill.
9. **Depth and over-investment signals** — surface where depth has accumulated on non-essential content while essential skills sit untouched. Deliberately understated; this should inform, not nag.

### Tier 3 — cut, kept on record

So they are not rediscovered and re-argued later.

| Candidate | Reason cut |
|---|---|
| Hours logged vs estimate | Depends on data that would have to be entered by hand forever |
| Projected completion date from logged hours | Depends on the hours above |
| Budget / spend tracking | One external fee; infrastructure cost exceeds any insight |
| Certificate expiry reminders | No certificate tracking, and the app has no dates or notification infrastructure |
| Weekly required-pace calculator | Requires a deadline and an hours feed, neither of which exists |
| Cross-course effort-versus-value dashboard | A tracker feature; the useful part survives as Tier 1 prioritisation |
| Headline readiness percentage gauge | Explicitly declined; the coverage view already shows covered-of-total without gamifying it |
| Standalone ordered "track" playlist | Prereq ordering and suggestions already do this; the skill tags give the same value far cheaper |
| Prereq sanity checker for the essential subgraph | The existing validator, prereq logic, and map-layout checker already cover it |

---

## 8. Decisions taken, and what remains open

§8.1 and §8.2 were open questions when this spec was first written; both were decided on 2026-07-22 and are recorded here as settled. §8.3 and §8.4 remain open.

### 8.1 Domain and subject architecture — DECIDED

Two cost drivers shaped this decision:

- **The validator enforces exactly one exam node per domain**, with prereqs equal to every other node in that domain. Every new domain therefore obligates an exam node with fresh retrieval questions.
- **A new `Subject`** (the colour/category axis, distinct from domain) requires the full checklist: `Subject` type, `subjectStyles`/`subjectNames`, `subjectHex` plus the minimap's light-mode mirror, an `html.light` accent override, and a distinct colour.

**Decision: no new `Subject` at all, and only two new domains.** Every Phase-5 node reuses the existing `cs` cyan, so the new-subject checklist is never triggered.

| Content | Placement | New exam? |
|---|---|---|
| Python, OOP + Java, C# | Extend the existing **`programming`** domain — they *are* programming fundamentals | No. Grow `prog-exam` ~4 fresh questions per chain, per the established pattern |
| Backend & APIs, developer tooling (Git, Bash) | **New domain `applied-software`** — "Applied Software Engineering". Coherent cluster: how professional software gets built and shipped | Yes, one |
| Data & BI | **New domain `data-analytics`** — "Data & Analytics". Nine skills, genuinely distinct from databases; `links` (not prereqs) to `math-stats` | Yes, one |
| db-depth chain | Extend the existing **`databases`** domain | No. Grow `db-exam` |

**Map layout is deliberately not pre-decided.** Both new domains need their own cell, and `node scripts/check-map-layout.mjs` must report zero crossings in every view tier afterwards. A slot gets claimed when a chain is actually built — layout cannot be chosen on paper, as several prior chains found the hard way.

**Escape hatch:** if the map reads as visually muddy with everything cyan, giving `data-analytics` its own colour later is a cheap, isolated change — far cheaper than doing the full new-subject wiring now, on spec, before any of the content exists.

### 8.2 Relational-DB overlap — DECIDED: merged into one chain

CLAUDE.md's Phase 4 carried **"db normalization/B+trees (15-445 HWs)"**, covering the same ground as this spec's Tier 2 relational-DB item from a different angle (bachelor rigour rather than employability).

**Decision: build it once, as a single `db-depth` chain** — schema design & normalization → indexes & B+trees → PostgreSQL in practice. One chain serves both framings: it promotes `sql`, `normalisation`, and `database-design` from partial to covered, closes the `postgresql` gap, *and* closes the Phase-4 rigour item. It extends the existing `databases` domain, keeps 15-445 homeworks as its problem source, and builds its indexes lesson on top of db-transactions' existing B-tree-vs-hash-index and EXPLAIN material rather than duplicating it.

The original Phase-4 line has been left in place as the historical record, annotated to point here, so no existing backlog entry was rewritten or deleted.

### 8.3 Ordering against the existing queue — OPEN

CLAUDE.md's "Next priorities" currently names `math-calculus-4/-5` as the next content work, alongside deploying the app. Tier 1 here would compete for that slot. The existing list has not been altered; the placement proposal is recorded in the backlog section of CLAUDE.md for a decision.

### 8.4 Mirroring into the in-app roadmap — OPEN

`src/content/roadmap.ts` is an in-app informational mirror of CLAUDE.md's roadmap section, and its header instructs that changes be mirrored. If this work becomes a named stage, that file will want a corresponding entry. Flagged only — no source file has been touched.

### 8.5 Third-party names in the codebase — RESOLVED

The project convention is to keep third-party names out of what gets written; the reference curriculum in §2 is composed almost entirely of them, and was required verbatim. Resolution: **this planning doc carries the names, the application code and UI strings stay neutral** ("essential skills", "employability track" — no employer or vendor names in node titles, skill ids, domain names, or filenames).

The one place vendor names legitimately reach the UI is the Tier 1 resource links — and that is an **established pattern already**, since `resourcesByNode` links out to MIT OpenCourseWare, 3Blue1Brown, Khan Academy and others throughout the existing graph. Course links are consistent with how the codebase already works.
