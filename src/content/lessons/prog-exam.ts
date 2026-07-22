import type { Lesson } from '../../types'

export const progExamLesson: Lesson = {
  nodeId: 'prog-exam',
  screens: [
    {
      kind: 'explain',
      title: 'Module exam — think like the interpreter',
      body: [
        'Twenty-two questions across the whole module — variables, loops, functions, arrays, recursion, debugging, pointers, bits and Python — all NEW, no repeats from the lesson quizzes. No code runner this time: trace every snippet in your head, the way the machine would.',
        'Score 80% and Programming Fundamentals is sealed. Below that costs nothing — you’ll see exactly which idea slipped, review it, and retake.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Trace this by hand. What prints?\n\nlet n = 0\nfor (let i = 0; i < 5; i = i + 1) {\n  if (i < 2) { n = n + 10 } else { n = n + 1 }\n}\nprint(n)',
      options: ['23', '50', '32', '14'],
      correctIndex: 0,
      explanations: [
        'Correct: i = 0 and 1 take the +10 branch (n = 20), then i = 2, 3, 4 take the +1 branch — 20 + 3 = 23.',
        '50 assumes every iteration adds 10 — but the if splits the loop: only i = 0 and 1 satisfy i < 2.',
        '32 comes from letting i = 2 into the +10 branch — but i < 2 is FALSE at exactly 2. Strict less-than excludes the boundary.',
        '14 gives +10 only once — but the loop starts at i = 0, so BOTH 0 and 1 are below 2. Two big hits, then three small ones.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A classic trap — what does this print?\n\nlet a = 3\nlet b = 5\na = b\nb = a\nprint(a)\nprint(b)',
      options: ['5 then 5', '5 then 3', '3 then 5', '3 then 3'],
      correctIndex: 0,
      explanations: [
        'Correct: a = b makes a hold 5, destroying the 3 forever. Then b = a copies the NEW a — 5 again. A real swap needs a third variable to save the 3 first.',
        '“5 then 3” is what a swap WOULD give — but assignment copies the current value, and by the time b = a runs, the 3 is already gone.',
        '“3 then 5” treats the assignments as if they never ran — but a = b really does overwrite a with 5.',
        '“3 then 3” copies in the wrong direction — a = b means “put b’s value INTO a”, right side into left side, always.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A landing sequence counts down: for (let i = 10; i > 0; i = i - 2) { fireThruster() }. How many times does the thruster fire?',
      options: ['5', '10', '6', '4'],
      correctIndex: 0,
      explanations: [
        'Correct: i takes 10, 8, 6, 4, 2 — five runs. Then i becomes 0, and 0 > 0 is false, so the loop stops.',
        '10 ignores the step — i drops by 2 each pass, not 1, so it visits only the even numbers on the way down.',
        '6 sneaks in a run at i = 0 — but the condition i > 0 is checked BEFORE each run, and 0 > 0 fails.',
        '4 stops one early, as if i = 2 didn’t qualify — but 2 > 0 is true, so that pass fires too.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Trace the calls. What prints?\n\nfunction add3(n) {\n  return n + 3\n}\nfunction twice(n) {\n  return add3(add3(n))\n}\nprint(twice(4))',
      options: ['10', '7', '14', '8'],
      correctIndex: 0,
      explanations: [
        'Correct: the inner add3(4) returns 7, and that 7 feeds the outer call — add3(7) = 10. Nested calls evaluate inside-out.',
        '7 applies add3 only once — but twice wraps one call INSIDE another, so the +3 happens twice.',
        '14 reads “twice” as multiply-by-2, computing (4+3)×2 — but a name is just a label; only the body counts, and the body is two +3s.',
        '8 doubles the input and skips add3 entirely — twice never multiplies, it just calls add3 on add3’s answer.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'What does this program print?\n\nfunction f() {\n  return 5\n  print("after")\n}\nprint(f())',
      options: ['just 5', '5 then after', 'after then 5', 'nothing'],
      correctIndex: 0,
      explanations: [
        'Correct: return EXITS the function on the spot, handing back 5 — the print("after") line is unreachable and never runs.',
        'Lines after a return don’t get a turn — return isn’t a label at the end, it’s an immediate exit door.',
        'Nothing runs before the return either — the function starts at the top and leaves at the return, in that order.',
        'The function does produce output: it returns 5, and the outer print(f()) displays it.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'What prints?\n\nfunction boost(speed) {\n  speed = speed + 10\n}\nlet speed = 5\nboost(speed)\nprint(speed)',
      options: ['5', '15', '10', 'undefined'],
      correctIndex: 0,
      explanations: [
        'Correct: the parameter speed is the function’s own local box holding a COPY of the number 5. Boosting the copy leaves the outer variable untouched — to change it, boost would have to return 15 and the caller store it.',
        '15 assumes the parameter and the outer variable are the same box — but a number argument is copied in, and the copy is thrown away when the call ends.',
        '10 adds the boost to nothing — the copy briefly becomes 15 inside, but neither 10 nor 15 ever reaches the outer speed.',
        'The outer speed was properly declared and set to 5 — it never becomes undefined; it just never changes.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Your teammate rewrites the INSIDE of readSensor() to be faster, but its inputs and return value stay exactly the same. What happens to navigate(), which calls it?',
      options: [
        'Nothing — navigate() depends only on the contract, which didn’t change',
        'navigate() must be rewritten to match the new internals',
        'navigate() breaks until readSensor() is renamed',
        'The whole program must be retyped from the top',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: that’s abstraction paying off — callers rely on the black box’s contract (inputs in, answer out), not its guts. Same contract, zero ripple.',
        'If callers had to track internals, big programs would be impossible — the entire point of a function boundary is that internals can change freely behind it.',
        'It’s the opposite — renaming is exactly what WOULD break callers, because they call it by name. Unchanged name + unchanged contract = unchanged callers.',
        'Programs aren’t fragile as a whole like that — changes stay contained inside the function’s walls, which is why teams can work on different functions at once.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A robot wants its closest obstacle. What prints?\n\nlet scan = [5, 25, 8, 30]\nlet closest = 100\nfor (let i = 0; i < scan.length; i = i + 1) {\n  if (scan[i] < closest) { closest = scan[i] }\n}\nprint(closest)',
      options: ['5', '30', '100', '68'],
      correctIndex: 0,
      explanations: [
        'Correct: closest only ever drops — 100 → 5 at i = 0, then 25, 8, 30 all fail the < 5 test. The loop found the minimum.',
        '30 is the MAXIMUM — you’d get it by flipping the comparison to >. The < keeps the smallest value seen so far.',
        '100 assumes closest never updates — but 5 < 100 is true on the very first pass, so it’s replaced immediately.',
        '68 is the SUM of all readings — that’s the accumulation pattern (closest + scan[i]), not the keep-the-smaller pattern used here.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A path has waypoints.length points. You write: for (let i = 0; i <= waypoints.length; i = i + 1) { goTo(waypoints[i]) }. What goes wrong?',
      options: [
        'The final pass reads past the end — waypoints[waypoints.length] is undefined',
        'The loop skips the last waypoint',
        'Nothing — <= is needed to include the last element',
        'The loop never terminates',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: valid indexes run 0 to length−1, so when i equals length, waypoints[i] is one slot past the end — the robot gets sent to undefined. The classic off-by-one.',
        'Skipping the last one is the OPPOSITE bug (i < length − 1). Here the loop goes too far, not too short.',
        'Tempting — but < length already reaches the last element, because index 0 means the last one sits at length−1, not length.',
        'It terminates fine — i climbs past length and the condition goes false. The crime is the one bad read on the way out.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'waypoints is an array of {x, y} objects. Which expression reads the x of the SECOND waypoint?',
      options: ['waypoints[1].x', 'waypoints[2].x', 'waypoints.x[1]', 'waypoints[0].x'],
      correctIndex: 0,
      explanations: [
        'Correct: indexes start at 0, so the second waypoint lives at [1] — index into the array first, then dot into the object’s field.',
        '[2] counts from 1 — natural, but arrays don’t: [2] is the THIRD waypoint. Second means index 1.',
        'That reverses the layers — the array holds objects, not the other way round, so you must pick a waypoint BEFORE you can ask for its x.',
        '[0] overcorrects the off-by-one — index 0 is the FIRST waypoint. Shift everything down by exactly one, not two.',
      ],
    },
    {
      kind: 'quiz',
      question: 'g(n) = 2 × g(n − 1), with base case g(0) = 1. What is g(3)?',
      options: ['8', '6', '2', '16'],
      correctIndex: 0,
      explanations: [
        'Correct: g(3) = 2 × g(2) = 2 × 2 × g(1) = 2 × 2 × 2 × g(0) = 8 — three doublings of 1.',
        '6 is 2 × 3 — you multiplied by n instead of doubling the recursive result.',
        '2 is just the first doubling — the recursion keeps going until it hits g(0).',
        '16 would be four doublings (g(4)) — count the steps from 3 down to the base case: exactly three.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Inside a recursive function, why must the base-case check come BEFORE the recursive call, not after it?',
      options: [
        'Code after a recursive call only runs once that call returns — a base case placed there can never stop the dive',
        'It is only a style convention',
        'Base cases run faster at the top of a function',
        'The language refuses to compile it otherwise',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: execution reaches the recursive call and dives immediately — anything below waits for the dive to finish. If the stop-check lives below, nothing ever stops the dive in the first place.',
        'It’s correctness, not style: check-after-call means infinite recursion, because the check is never reached on the way down.',
        'Position doesn’t change speed — it changes whether the check EVER executes before the next call fires.',
        'It compiles fine — that’s the danger. The mistake only reveals itself at runtime, as a stack overflow.',
      ],
    },
    {
      kind: 'quiz',
      question: 'You found the bug and edited one line. What must happen before you call it fixed?',
      options: [
        'Re-run the failing case to confirm it passes AND the other tests to confirm nothing else broke',
        'Nothing — the fix is obvious from reading the code',
        'Delete the test that was failing',
        'Rewrite the surrounding code while you are in there',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a fix is a hypothesis until the failing input passes — and edits can break neighbors, so the rest of the suite must stay green too.',
        '“Obvious” fixes fail constantly — the same misreading that wrote the bug can misread the fix. Evidence over confidence.',
        'That silences the alarm instead of putting out the fire — the test is the proof your fix works, and the guard that keeps it working.',
        'Bundling extra changes destroys your evidence: if something now fails, you can’t tell whether the fix or the “improvements” did it.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'countdown(1000000) with a CORRECT base case still crashes with a stack error, while the loop version runs fine. Why?',
      options: [
        'Each unfinished recursive call holds a stack frame — a million frames exhaust the stack; the loop reuses one variable',
        'The base case is secretly wrong',
        'Loops can count higher than recursion can',
        'The computer ran out of disk space',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: correctness isn’t the issue — DEPTH is. A million nested calls means a million frames alive at once; the loop keeps one counter and constant memory.',
        'The base case is fine — it would stop the recursion at 0. The program dies of memory exhaustion long before arriving there.',
        'Both can count arbitrarily high — the difference is memory per step: constant for the loop, linear in depth for recursion.',
        'The call stack lives in RAM and has a fixed size — disk never enters the picture.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A pointer `p` holds the address 3000, and the value stored at address 3000 is 42. What is `*p`, and what is `p`?',
      options: [
        '`*p` is 42 (the value at the address); `p` is 3000 (the address itself)',
        '`*p` is 3000; `p` is 42',
        'Both `*p` and `p` are 42',
        'Both `*p` and `p` are 3000',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `p` holds the address (3000); dereferencing with `*` follows it to the box and reads 42. The pointer is the signpost; `*p` is the house.',
        'Reversed — `p` is the address you stored, and `*p` follows it. You can’t get 3000 by dereferencing.',
        '`p` is the address (3000), not the value; only `*p` is 42.',
        '`*p` reads THROUGH the address to the value 42; it isn’t the address again.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Trace the bits. `reg` starts at `0b1010`. You run `reg = reg | (1 << 0)` then `reg = reg & ~(1 << 3)`. What is `reg` now (in binary)?',
      options: ['0b0011', '0b1011', '0b0010', '0b1010'],
      correctIndex: 0,
      explanations: [
        'Correct: `1 << 0` = `0b0001`, so OR sets bit 0 → `0b1011`. Then `~(1 << 3)` clears bit 3 → `0b0011`. Set with OR, clear with AND-NOT.',
        '`0b1011` is only the first step (bit 0 set) — you forgot the second op clears bit 3.',
        '`0b0010` clears bit 3 but drops the bit-0 set — the OR should have turned bit 0 on.',
        '`0b1010` is the starting value — both operations changed it.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A function does `int *p = malloc(40); ... return p;` and the caller uses `p` much later. A second function does `int arr[10]; return arr;` (returning the local array’s address). Which pointer is safe to use later?',
      options: [
        'Only the malloc’d one — heap memory lives until freed; the local array’s stack space is reclaimed on return',
        'Only the local array — stack memory is faster and safer',
        'Both — a returned pointer is always valid',
        'Neither — C can never return a pointer',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the heap block persists until you `free` it, so returning its pointer is fine. The local array vanishes with its stack frame — its returned address dangles.',
        'The local array is the DANGEROUS one — its memory is reused by the next call.',
        'Only the heap pointer is valid; the stack one dangles. “Always valid” is exactly the trap.',
        'C returns pointers routinely — the rule is that the memory must outlive the function, which heap allocation guarantees.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A C loop writes to `arr[i]` for `i` from 0 to 10 inclusive, but `arr` has only 10 elements. What kind of bug is this, and what’s the danger?',
      options: [
        'An off-by-one buffer overflow — `arr[10]` is out of bounds and corrupts whatever memory sits after the array',
        'A memory leak — the extra write is never freed',
        'Nothing — arrays automatically grow to fit',
        'A syntax error the compiler will catch',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: valid indices are 0..9, so `arr[10]` writes one past the end — an off-by-one overflow that silently corrupts adjacent memory (and can be an exploit).',
        'A leak is un-freed allocation; this is an out-of-bounds WRITE, a different and more dangerous class of bug.',
        'C arrays are fixed-size and never grow — the write simply lands outside them.',
        'C does no bounds checking, so it compiles cleanly and fails only at runtime — that’s exactly what makes it dangerous.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Project A pins a library at version 1.0; project B needs version 2.0 of the SAME library. Install both system-wide and they clash. How does giving each project its own virtual environment fix this?',
      options: [
        'Each venv holds its own isolated set of installed packages, so A keeps 1.0 and B keeps 2.0 without ever colliding',
        'The venv makes Python run faster, and the speed-up sidesteps the version clash',
        'Activating a venv upgrades the system Python to the newest library version everywhere',
        'You merge both projects into a single shared venv so they use one copy of the library',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a venv is a per-project sandbox of packages. Two projects, two venvs, two independent copies of the library — the conflict simply can’t happen.',
        'Speed has nothing to do with it — a venv changes WHERE packages install (a private folder), not how fast code runs.',
        'The opposite of isolation: a venv deliberately leaves the system Python untouched, precisely so per-project installs can differ.',
        'One shared venv recreates the exact clash — a single environment can only hold one version of a given library at a time.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Read this traceback. Which line names the actual error, and which line is the code that raised it?\n\nTraceback (most recent call last):\n  File "drive.py", line 12, in <module>\n    move(step)\n  File "drive.py", line 7, in move\n    return 100 / speed\nZeroDivisionError: division by zero',
      options: [
        'The BOTTOM line names the error (ZeroDivisionError); the line right above it, return 100 / speed, is the code that raised it',
        'The TOP line (line 12, in <module>) names the error, because a traceback reads top to bottom',
        'The move(step) call is the culprit, since it appears first and calls everything else',
        'A traceback only shows the file name — you cannot tell which line failed from it',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: read a traceback bottom-up. The last line is the exception and its message; the frame just above it is the deepest call — return 100 / speed — where it actually blew up.',
        'Top-down is backwards: the top frame is the OUTERMOST call (<module>). The real failure is at the bottom, deepest in the call chain.',
        'move(step) is only the caller on the way in — it is not where the division by zero happened. Follow the stack down to the raising line.',
        'The traceback pinpoints it exactly: file drive.py, line 7, inside move. That specificity is the whole point of reading it.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A program runs `with open("log.txt", "w") as f:` and then an exception is thrown INSIDE the with-block, before it finishes. What does the `with` statement guarantee?',
      options: [
        'The file is still closed automatically as the block is exited — `with` closes it whether the block finishes normally or blows up',
        'Nothing — the exception skips the close, so the file leaks open',
        'The exception is swallowed and the program keeps running past the block',
        'The partly written file is automatically rolled back to its previous contents',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: that is exactly what a context manager is for — its cleanup (closing the file) runs on the way out of the block, even when an exception tears the block short.',
        'The leak is what `with` PREVENTS — a plain `f = open(...)` could leak on an exception, which is the whole reason to use `with`.',
        '`with` closes the file but does NOT suppress the error — the exception still propagates out; it just leaves a properly closed file behind.',
        'There is no rollback — opening in "w" already truncated the file, and `with` only guarantees the close, not any undo of the writes.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'What does `re.findall(r"\\d+", "unit 3 has 27 bolts and 4 gears")` return?',
      options: [
        "['3', '27', '4'] — a list of every run of consecutive digits, each as a string",
        '[3, 27, 4] — a list of integers, since the digits are numbers',
        "['3274'] — every digit in the text concatenated into one string",
        "'3' — just the first match found",
      ],
      correctIndex: 0,
      explanations: [
        'Correct: \\d+ matches one-or-more digits greedily, and findall returns EVERY non-overlapping run — "3", "27", "4" — always as strings, never converted to numbers.',
        'findall returns strings, not ints — regex works on text. You would have to call int() on each to get numbers.',
        'Each match is a separate maximal digit-run; findall keeps them as separate list items, it does not glue them together.',
        "'3' would be re.search(...).group() — the FIRST match. findall collects ALL of them into a list.",
      ],
    },
  ],
}
