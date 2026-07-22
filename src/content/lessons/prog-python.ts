import type { Lesson } from '../../types'

export const progPythonLesson: Lesson = {
  nodeId: 'prog-python',
  screens: [
    {
      kind: 'explain',
      title: 'Your second language teaches you the first',
      body: [
        'You already think in code from the JavaScript track — variables, loops, functions, lists. Python doesn’t make you relearn any of that; it re-dresses ideas you own.',
        'Learning a second language is where the concepts finally separate from the syntax: you discover that a `for` loop is an idea, not a set of C-style parentheses and braces.',
        'By the end of this chain you’ll read and write Python, run it from your own terminal, and — the real prize — understand JavaScript more deeply for having seen a second way to say the same things.',
      ],
      deeper: [
        'Syntax is the surface; SEMANTICS is what the code means. A `while` loop, a function call, a dictionary lookup — these are semantic concepts that survive every language. Once you’ve met the same idea wearing two different syntaxes, you stop memorising punctuation and start recognising structure, which is exactly how experienced engineers pick up a third and fourth language in an afternoon.',
        'Python matters specifically for robotics: it’s the language of the ROS 2 tooling and `rclpy` node scripts, of quick “dump the sensor log and plot it” one-offs, and of essentially all modern machine learning. When you want to prototype a perception idea fast, you reach for Python.',
      ],
    },
    {
      kind: 'explain',
      title: 'Get Python running',
      body: [
        'On macOS a Python 3 interpreter is already there — open your terminal and type `python3 --version`; you should see something like `Python 3.11.x`. (If it’s missing or ancient, install the current version from python.org.)',
        'Two ways to run code: type `python3` alone to enter the REPL — an interactive prompt where each line runs instantly, perfect for trying one expression. Or put code in a file like `robot.py` and run the whole thing with `python3 robot.py`.',
        'Try both now: run `python3 --version`, then start the REPL and type `print("hello")`, then press Ctrl-D to exit.',
      ],
      deeper: [
        'REPL stands for Read–Eval–Print Loop: it Reads your line, Evaluates it, Prints the result, and Loops back for the next. It’s the fastest possible feedback cycle — you’ll live in it for quick checks (“what does `7 // 2` give again?”) while real programs go in `.py` files you can save, re-run, and test.',
        'One difference from the browser you’re used to: a `.py` file is run top to bottom by the interpreter every time, with no build step and no HTML around it. Just source in, output out.',
      ],
    },
    {
      kind: 'predict',
      question:
        'You run this Python file. Remember: indentation is not decoration in Python — it defines which lines belong to the loop.\n\n```\nfor i in range(3):\n    print("tick")\nprint("done")\n```\n\nWhat does it print?',
      options: [
        'tick / tick / tick / done (three ticks, then one done)',
        'tick / done (one of each)',
        'tick / tick / tick / done / done / done (three of each)',
        'A syntax error — Python needs braces around the loop body',
      ],
      correctIndex: 0,
      reveal:
        '`range(3)` yields 0, 1, 2 — three passes — and only the INDENTED `print("tick")` is inside the loop, so it runs three times. `print("done")` sits at the outer indent level, outside the loop, so it runs once at the end. In Python the indentation IS the block: there are no braces, and getting the indent wrong changes what your program does rather than just how it looks.',
    },
    {
      kind: 'explain',
      title: 'JavaScript → Python, line by line',
      body: [
        'Almost everything maps directly. `let x = 5;` becomes just `x = 5` (no `let`, no semicolon). `console.log(x)` becomes `print(x)`. Braces `{ }` become a colon and indentation. Template literals `` `${name}` `` become f-strings: `f"{name}"`.',
        'Two naming/equality shifts: Python convention is snake_case (`max_speed`, not `maxSpeed`), and `===` becomes plain `==` (Python’s `==` already compares by value, with no loose-vs-strict trap).',
        'Your arrays are LISTS (`[1, 2, 3]`) and your objects are DICTS (`{"battery": 80}`); you loop with `for x in things:` — the equivalent of JS’s `for (const x of things)`.',
      ],
      deeper: [
        'Why enforce indentation as syntax at all? Because in every other language the indentation and the braces can DISAGREE — code that looks nested but isn’t, the source of real bugs. Python removes the second source of truth: what you see is the structure. The cost is that a stray space can be an error, which is why editors auto-indent Python for you.',
        'A subtlety you’ll meet later: JS has `==` (loose) and `===` (strict); Python has `==` (value equality) and `is` (identity — same object in memory). They are NOT the same axis. `==` asks “equal value?”, `is` asks “literally the same object?” — reach for `==` almost always.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A classic gotcha for JS programmers. In Python, `/` and `//` are different operators.\n\n```\nprint(7 / 2)\nprint(7 // 2)\n```\n\nWhat prints?',
      options: [
        '3.5 then 3',
        '3 then 3.5',
        '3.5 then 3.5',
        '3 then 3 (both floor)',
      ],
      correctIndex: 0,
      reveal:
        '`/` is TRUE division and always gives a float: `7 / 2` is `3.5`. `//` is FLOOR division — it divides and rounds down to a whole number: `7 // 2` is `3`. JavaScript has only one `/` (always 3.5) and makes you call `Math.floor`; Python builds the floor into its own operator, which is why counting problems (“how many full boxes?”) use `//`.',
    },
    {
      kind: 'predict',
      question:
        'f-strings are Python’s template literals. The `f` prefix lets `{ }` splice values into the text.\n\n```\nname = "Atlas"\ncount = 3\nprint(f"{name} has {count} lessons")\n```\n\nWhat prints?',
      options: [
        'Atlas has 3 lessons',
        '{name} has {count} lessons',
        'f"Atlas has 3 lessons"',
        'name has count lessons',
      ],
      correctIndex: 0,
      reveal:
        'Inside an f-string, each `{ }` is evaluated and its value dropped into the text: `{name}` → `Atlas`, `{count}` → `3`. Without the leading `f`, Python would print the braces literally as text — the `f` is what switches on the substitution, exactly like the backtick does in a JS template literal. Forget the `f` and you get `{name} has {count} lessons`, which is the most common f-string mistake.',
    },
    {
      kind: 'explain',
      title: 'Virtual environments: one sandbox per project',
      body: [
        'Real projects need extra packages, installed with `pip`. But installing everything into the one system Python is a trap: project A needs an old version, project B needs a new one, and they collide.',
        'A VIRTUAL ENVIRONMENT is a private Python folder for a single project. Create one with `python3 -m venv .venv`, then turn it on with `source .venv/bin/activate` — your prompt gains a `(.venv)` tag. Now `pip install` lands only here; `deactivate` turns it back off.',
        'Make a project folder, run those two commands, and watch the `(.venv)` appear — you’ll use this on every real Python project, including the pytest one two lessons from now.',
      ],
      deeper: [
        'What a venv actually is: a folder with its own `python` and its own `site-packages` (where installed libraries live), plus a tweak so that while it’s “activated” the shell finds THIS python first. Nothing magic — it’s isolation by putting a project-local copy earlier on your PATH.',
        'The payoff is reproducibility: `pip freeze > requirements.txt` records the exact versions in your venv, and a teammate (or your future self on another machine) runs `pip install -r requirements.txt` to rebuild the identical toolbox. This is how a robot codebase runs the same on your laptop and on the robot.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In Python, what defines which lines are inside a loop or function body?',
      options: [
        'Indentation — the leading whitespace level IS the block structure',
        'Curly braces `{ }` around the body, like JavaScript',
        'A pair of `begin` and `end` keywords',
        'Semicolons at the end of each contained line',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: Python uses indentation as real syntax. Lines indented under a `for`/`def`/`if` header belong to it; dedenting ends the block.',
        'That’s JavaScript. Python deliberately has no braces — the indentation you can already see is the single source of truth for structure.',
        '`begin`/`end` is Pascal-style; Python uses neither keywords nor braces, just the indent level.',
        'Python doesn’t need line-ending semicolons at all; a newline ends a statement, and indentation groups statements.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What is the difference between `/` and `//` in Python?',
      options: [
        '`/` always gives a float (true division); `//` floor-divides down to a whole number',
        'They are identical — `//` is just an old spelling of `/`',
        '`//` is a comment, so the second one does nothing',
        '`/` floors and `//` gives the exact decimal — it’s the reverse',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `7 / 2` is `3.5`, `7 // 2` is `3`. Use `//` when you want whole units and no decimal tail.',
        'They’re genuinely different operators with different results — mixing them up is a classic off-by-a-decimal bug.',
        'In Python a comment starts with `#`, not `//`. `//` is the floor-division operator and very much runs.',
        'Backwards: `/` keeps the decimal (float), `//` throws the fractional part away by flooring.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why create a virtual environment (`python3 -m venv .venv`) for a project?',
      options: [
        'To isolate that project’s installed packages so versions can’t clash with other projects or the system Python',
        'To make Python run noticeably faster',
        'It’s required or Python refuses to start',
        'To encrypt your source code',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a venv is a per-project sandbox for packages, so project A’s old library and project B’s new one never collide, and the system Python stays clean.',
        'A venv is about isolation, not speed — it runs the same interpreter, just with its own package folder.',
        'Python runs fine without one; venvs are a best practice for managing dependencies, not a startup requirement.',
        'Nothing is encrypted — the source stays plain text; the venv only isolates installed libraries.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You want to insert the value of `speed` into a printed message in Python. Which is the idiomatic way?',
      options: [
        'An f-string: `print(f"speed is {speed}")`',
        'A template literal: `` print(`speed is ${speed}`) ``',
        'String concatenation only: `print("speed is " + speed)` always works with any type',
        'You cannot put variables inside Python strings',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the `f` prefix turns `{speed}` into a substitution slot — Python’s equivalent of a JS template literal.',
        'Backticks and `${}` are JavaScript syntax; in Python they’re a syntax error. The Python spelling is `f"...{speed}..."`.',
        '`"..." + speed` breaks if `speed` is a number — Python won’t add a string and an int; you’d need `str(speed)`. f-strings convert for you.',
        'You certainly can — f-strings (and `.format`, and `%`) all splice variables into strings.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What is the Python REPL best used for?',
      options: [
        'Quickly trying one expression or line and seeing the result instantly, with no file needed',
        'Storing the finished program that you re-run and test later',
        'Compiling Python into a standalone binary',
        'Editing HTML that wraps your Python',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the Read–Eval–Print Loop runs each line as you type it — ideal for “what does this do?” checks. Real programs live in `.py` files.',
        'That’s the job of a saved `.py` file; the REPL forgets everything when you close it.',
        'The REPL interprets and runs code interactively; it doesn’t produce a compiled binary.',
        'There’s no HTML in the picture — Python runs directly, source in, output out.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Translate to Python: `let maxSpeed = 5;`',
      options: [
        '`max_speed = 5` — no `let`, no semicolon, snake_case by convention',
        '`let max_speed = 5;` — keep `let`, just rename',
        '`int maxSpeed = 5` — Python needs the type first',
        '`var maxSpeed = 5;` — Python uses `var`',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: Python variables are plain assignments — drop `let`, drop the semicolon, and the community style is snake_case.',
        'Python has no `let` keyword and no line-ending semicolons; both are JavaScript.',
        'Python is dynamically typed — you don’t (and can’t) write a type keyword like `int` before the name here.',
        '`var` is JavaScript too; Python just uses `name = value`.',
      ],
    },
    {
      question: 'What does `print(10 // 3)` output?',
      options: [
        '3 — floor division drops the fractional part',
        '3.333… — it keeps the decimal',
        '4 — it rounds to nearest',
        '1 — that’s the remainder',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `//` floors the result of 10/3 (3.33…) down to `3`.',
        'That decimal is what `/` gives; `//` deliberately discards the fractional part.',
        'Floor division rounds DOWN, not to nearest — 3.9 would still floor to 3.',
        'The remainder (1) is what `%` gives; `//` gives the whole quotient (3).',
      ],
    },
    {
      question: 'How do you loop over the items of a list `readings` in Python?',
      options: [
        '`for r in readings:` then an indented body',
        '`for (const r of readings) { ... }`',
        '`foreach r in readings do ... end`',
        '`readings.forEach(r => { ... })` only',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `for x in iterable:` with an indented block is Python’s core loop — the direct analogue of JS’s `for...of`.',
        'That’s the JavaScript `for...of` with braces; Python drops the parentheses and braces for a colon and indentation.',
        '`foreach`/`do`/`end` is other languages’ syntax; Python has none of those keywords.',
        'Python lists have no `.forEach` method; the idiomatic loop is `for r in readings:`.',
      ],
    },
    {
      question: 'You typed `python3` and now see a `>>>` prompt. Where are you, and how do you leave?',
      options: [
        'In the interactive REPL; exit with Ctrl-D (or `exit()`)',
        'In a frozen crash; force-quit the terminal',
        'In a text editor; press Escape then `:wq`',
        'Running a saved program that will stop on its own',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `>>>` is the REPL prompt waiting for a line. Ctrl-D (EOF) or calling `exit()` returns you to the shell.',
        'Nothing has crashed — the interpreter is simply waiting for your next line of Python.',
        '`:wq` is the Vim editor; the REPL is not an editor, it runs each line you type.',
        'The REPL is interactive and waits for you indefinitely; it isn’t a script running to completion.',
      ],
    },
  ],
}
