import type { Lesson } from '../../types'

export const progPython3Lesson: Lesson = {
  nodeId: 'prog-python-3',
  screens: [
    {
      kind: 'explain',
      title: 'Regex: a tiny language for describing text',
      body: [
        'A REGULAR EXPRESSION is a pattern that describes a shape of text — “a run of digits”, “a word ending in .log”, “ERROR at the start of a line”. Instead of hand-writing loops to scan strings, you describe what you want and let the engine find it.',
        'The building blocks: a LITERAL matches itself (`cat` matches “cat”); a CHARACTER CLASS `[oa]` matches any one listed character; `\\d` matches any digit. You’ll try these in Python’s `re` module in a moment.',
        'This is genuinely a second mini-language living inside Python — dense, powerful, and everywhere once you can read it: log parsing, input validation, and pulling numbers out of a robot’s sensor stream.',
      ],
      deeper: [
        'QUANTIFIERS say how many: `*` is “zero or more”, `+` is “one or more”, `?` is “zero or one (optional)”. ANCHORS pin position: `^` is “start of string/line”, `$` is “end”. GROUPS `( ... )` both bundle a sub-pattern and CAPTURE what it matched so you can pull it out afterward. So `^(\\d+)-(\\d+)$` means “start, capture digits, a dash, capture digits, end”.',
        'Regex is powerful but not all-powerful: it can’t count arbitrarily deep nesting (matching balanced brackets to any depth is beyond it). That’s not a quirk — it’s the mathematical ceiling of the machine a regex compiles to, which is the connection on the next screen.',
      ],
    },
    {
      kind: 'predict',
      question:
        '`re.findall(pattern, text)` returns a list of every non-overlapping match. `\\d+` means “one or more digits”.\n\n```\nimport re\ntext = "sensor7 read 42 then sensor3 read 108"\nprint(re.findall(r"\\d+", text))\n```\n\nWhat is the printed list?',
      options: [
        "['7', '42', '3', '108']",
        "['7423108'] — all the digits joined",
        "['42', '108'] — only the standalone numbers",
        "[7, 42, 3, 108] — as integers",
      ],
      correctIndex: 0,
      reveal:
        '`\\d+` grabs each MAXIMAL run of digits as a separate match, so it finds `7`, `42`, `3`, and `108` — including the `7` and `3` stuck to “sensor”, because the pattern only cares about digits, not word boundaries. `findall` returns them as STRINGS in a list (note the quotes) — you’d call `int(x)` on each to do math. This one line is how you rip every number out of a noisy log.',
    },
    {
      kind: 'explain',
      title: 'Two ways to match, one to extract',
      body: [
        '`re.findall(pattern, text)` returns ALL matches as a list — best when you want every number or every word of a shape. `re.search(pattern, text)` scans for the FIRST match anywhere and returns a match object (or `None` if there’s none).',
        'When your pattern has GROUPS, the match object lets you extract them: `m.group(1)` is the first `( ... )`, `m.group(2)` the second, `m.group(0)` the whole match. That’s how you parse “10-25” into its two numbers.',
        'Try it: search `"valid range 10-25 units"` with `r"(\\d+)-(\\d+)"` and print `m.group(1)` and `m.group(2)`.',
      ],
      deeper: [
        'The payoff you’ve been building toward: a regex COMPILES TO A FINITE-STATE MACHINE. Each character you feed it drives a transition between states; a match is “did we land in an accepting state?”. That’s literally the automaton you drove in the FSM lab — which is also why regex can’t count unbounded nesting: a finite-state machine has finitely many states and no stack to remember arbitrary depth.',
        'Practical note: always write patterns as RAW strings — `r"\\d+"` — so Python doesn’t try to interpret the backslashes itself before `re` ever sees them. Forgetting the `r` is the single most common regex bug in Python.',
      ],
      links: [{ nodeId: 'theory-fsm', label: 'The machine a regex becomes: Finite-State Machines' }],
    },
    {
      kind: 'predict',
      question:
        'Anchors pin a match to a position: `^` means “at the start”.\n\n```\nimport re\nprint(bool(re.search(r"^ERROR", "ERROR: overheat")))\nprint(bool(re.search(r"^ERROR", "log: ERROR here")))\n```\n\nWhat two values print?',
      options: [
        'True then False',
        'True then True',
        'False then True',
        'True then False, but only because the second has a space',
      ],
      correctIndex: 0,
      reveal:
        '`^ERROR` only matches when “ERROR” sits at the very START of the string. The first string begins with ERROR → match → `True`. In the second, “ERROR” appears in the middle, not at the start, so the anchored pattern fails → `None` → `bool(None)` is `False`. Anchors are how you say “a log line that STARTS with ERROR” rather than “mentions ERROR anywhere”.',
    },
    {
      kind: 'explain',
      title: 'pytest: a real test runner',
      body: [
        'In the debugging lesson you learned that a test is code that checks code, and that edge cases catch the most bugs. pytest turns that discipline into a tool: you write functions named `test_*` that use a plain `assert`, and the `pytest` command finds and runs them all.',
        'Set it up in your project’s virtual environment: `pip install pytest`. Put your tests in a file named `test_something.py`, each check as a function like `def test_clamp_ceiling(): assert clamp(150) == 100`.',
        'Then just run `pytest` in that folder. It auto-discovers every `test_*.py` file and every `test_*` function, runs them, and prints a green dot per pass and a big red block per fail — with the exact assert and values that didn’t match.',
      ],
      deeper: [
        'Why plain `assert` instead of special methods? pytest rewrites your `assert` under the hood so that when `assert clamp(150) == 100` fails, it shows you both sides — `assert 150 == 100` — not just “failed”. You get the introspection of a heavy framework with the syntax of a one-liner.',
        'The professional loop this enables: write the edge-case test FIRST (empty input, the boundary value, the largest case), watch it fail (red), write the code, watch it pass (green). Then every future change re-runs `pytest` and your old bugs can never silently return — the regression-test idea, now automated. This is exactly how a robot codebase avoids shipping a fix that breaks something else.',
      ],
      links: [{ nodeId: 'prog-data-3', label: 'The testing mindset this automates: Debugging & Testing' }],
    },
    {
      kind: 'predict',
      question:
        'Here’s an implementation and four pytest tests. Which test FAILS when you run `pytest`?\n\n```\ndef clamp(x):\n    if x < 0:\n        return 0\n    if x > 100:\n        return 100\n    return x\n\ndef test_midrange(): assert clamp(50) == 50\ndef test_below():    assert clamp(-5) == 0\ndef test_above():    assert clamp(150) == 100\ndef test_ceiling():  assert clamp(100) == 0\n```',
      options: [
        'test_ceiling — clamp(100) returns 100 (100 is not > 100), so `100 == 0` fails',
        'test_above — clamp(150) should stay 150',
        'test_below — clamp(-5) should stay -5',
        'None fail — all four pass',
      ],
      correctIndex: 0,
      reveal:
        '`clamp(100)` hits neither guard: 100 is not `< 0` and not `> 100` (it’s equal, not greater), so it falls through to `return x` → 100. The test asserts `clamp(100) == 0`, so pytest reports `assert 100 == 0` — a fail. The other three are correct: 50 stays 50, -5 floors to 0, 150 caps at 100. This is the classic boundary bug — the test at the exact edge (`100`) is the one that catches whether `>` should have been `>=`.',
    },
    {
      kind: 'quiz',
      question: 'What does `re.findall(r"\\d+", text)` return?',
      options: [
        'A list of every run of one-or-more digits found in `text`, each as a string',
        'The first digit it finds, as an integer',
        '`True` if the text contains any digit',
        'The text with all digits removed',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `findall` returns ALL non-overlapping matches as a list of strings; `\\d+` matches each maximal digit run. Convert with `int()` if you need numbers.',
        '`findall` returns every match, not just the first, and they come back as strings — you’d use `re.search` for a single match object.',
        'That’s closer to `bool(re.search(...))`; `findall` returns the matched substrings, not a yes/no.',
        'Removing matches is `re.sub`; `findall` extracts them, leaving the text untouched.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In the pattern `^(\\d+)-(\\d+)$`, what do the parentheses do?',
      options: [
        'They form capture groups, so `m.group(1)` and `m.group(2)` return the two matched digit runs',
        'They are literal round brackets that must appear in the text',
        'They make the pattern optional',
        'They anchor the match to the start of the line',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `( ... )` both bundles a sub-pattern and CAPTURES it, so you can pull each piece out with `group(1)`, `group(2)`, etc.',
        'To match literal parentheses in the text you’d escape them as `\\(` and `\\)`; unescaped `()` create groups.',
        'Optionality comes from `?`, not parentheses — though you can wrap a group and make the whole group optional with `(...)?`.',
        'Anchoring is the `^` and `$`, not the parentheses.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A regular expression is equivalent to which machine — and what limit follows from that?',
      options: [
        'A finite-state machine; because it has no unbounded memory, it can’t match arbitrarily deep nesting',
        'A Turing machine; so regex can compute anything',
        'A neural network; so it must be trained on examples',
        'A sorting algorithm; so it orders the matches',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a regex compiles to a finite-state automaton — characters drive state transitions, a match ends in an accepting state. Finitely many states and no stack means it can’t count unbounded nesting.',
        'Regex is strictly weaker than a Turing machine — that’s the whole point of the FSM connection and why some patterns (balanced brackets to any depth) are impossible.',
        'Regex is a fixed pattern matcher with no learning involved; there’s no training.',
        'Matching isn’t sorting — the engine recognises patterns, it doesn’t order anything.',
      ],
    },
    {
      kind: 'quiz',
      question: 'How does the `pytest` command decide what to run?',
      options: [
        'It auto-discovers files named `test_*.py` and functions named `test_*`, then runs each and reports pass/fail',
        'It runs every function in every file in the project',
        'You must list each test manually in a config file or it runs nothing',
        'It only runs the single function you pass as an argument',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: pytest’s convention is to collect `test_*.py` files and the `test_*` functions inside them automatically — no registration needed.',
        'It runs only functions matching the `test_*` naming convention, not every function — your helper functions are left alone.',
        'No manual listing is required; the naming convention IS the registration.',
        'Running one function is possible, but by default `pytest` collects and runs the whole discovered suite.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Why write a pytest test at the exact BOUNDARY value (like `clamp(100)`) rather than only a mid-range value?',
      options: [
        'Boundary values are where off-by-one slips (`>` vs `>=`) hide; mid-range inputs pass even when the edges are wrong',
        'Boundary tests run faster than mid-range ones',
        'pytest only accepts boundary values as valid tests',
        'Mid-range values can never be tested',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the edge is exactly where `<` vs `<=` and `>` vs `>=` bugs live; a value like 50 sails through regardless, so it proves little.',
        'Test speed doesn’t depend on the input value; the reason is coverage of the bug-prone boundary.',
        'pytest accepts any assertion; boundary values are a testing STRATEGY, not a pytest requirement.',
        'Mid-range values are perfectly testable — they’re just less likely to expose the classic boundary bugs.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'What does the quantifier `+` mean in a regex, as in `ab+`?',
      options: [
        'One or more of the preceding item — so `ab+` matches `ab`, `abb`, `abbb`, …',
        'Exactly one `b` — the `+` is decoration',
        'Zero or more `b`s — same as `*`',
        'Addition of the two characters',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `+` means “one or more of the thing before it”, so `ab+` needs at least one `b` after the `a`, and matches longer runs greedily.',
        '`+` explicitly allows more than one; “exactly one” would be no quantifier at all (`ab`).',
        '`*` is zero-or-more (so it’d also match a lone `a`); `+` requires at least one, which is the difference.',
        'Regex quantifiers count repetitions; they don’t do arithmetic.',
      ],
    },
    {
      question: 'Why write regex patterns as raw strings, e.g. `r"\\d+"` instead of `"\\d+"`?',
      options: [
        'The `r` stops Python from interpreting backslash escapes first, so the pattern reaches `re` intact',
        'The `r` makes the regex run faster',
        'It’s required or `re` raises an error every time',
        'The `r` means “read-only” and protects the string',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: without `r`, Python processes `\\` sequences before `re` sees them, mangling patterns; the raw prefix passes the backslashes through untouched.',
        'Raw strings are about how backslashes are interpreted, not about speed.',
        'Some patterns happen to work without `r`, but many break subtly — it’s a strong convention, not a hard syntax error.',
        '`r` stands for raw, referring to backslash handling; it has nothing to do with read-only protection.',
      ],
    },
    {
      question:
        'You run `pytest` and see `1 failed, 3 passed` with a line `assert 100 == 0`. What do you do?',
      options: [
        'Read the failing values — the code produced 100 where the test expected 0 — and fix whichever is wrong',
        'Delete the failing test so the suite is green',
        'Ignore it; a mostly-green run is good enough to ship',
        'Rerun until it passes by chance',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: pytest hands you both sides (`100` vs `0`); decide whether the code is wrong or the expectation is, and fix that. The failure is information.',
        'Deleting the test hides the bug — the whole point of the suite is to fail when something is wrong.',
        'A single red test means a real mismatch; shipping over it defeats the purpose of testing.',
        'A deterministic assert won’t pass “by chance” — rerunning changes nothing; you must fix the mismatch.',
      ],
    },
    {
      question:
        'You want to check whether a log line STARTS WITH the word “WARN”. Which pattern fits?',
      options: [
        '`r"^WARN"` — the `^` anchors the match to the start of the line',
        '`r"WARN$"` — `$` anchors to the start',
        '`r"WARN"` — this only matches lines that are exactly “WARN”',
        '`r"[WARN]"` — a character class for the word',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `^` pins the match to the beginning, so `^WARN` matches only lines that start with WARN.',
        '`$` anchors to the END of the line, so `WARN$` matches lines ending in WARN — the opposite position.',
        'Bare `WARN` matches WARN ANYWHERE in the line, not only exact-match lines — and doesn’t enforce “at the start”.',
        '`[WARN]` is a character class meaning “any one of W, A, R, N”, not the word “WARN” — a common beginner mix-up.',
      ],
    },
  ],
}
