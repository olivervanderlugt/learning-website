import type { Lesson } from '../../types'

export const progPython2Lesson: Lesson = {
  nodeId: 'prog-python-2',
  screens: [
    {
      kind: 'explain',
      title: 'An error is a value with a type',
      body: [
        'When Python hits something it can’t do — divide by zero, open a missing file, convert `"hello"` to an int — it doesn’t return a weird value like JS’s `NaN`. It RAISES an exception: an object of a specific type that stops the program unless you catch it.',
        'Those types form a family tree: `ValueError`, `ZeroDivisionError`, `FileNotFoundError`, `KeyError`… all descend from `Exception`. The type tells you exactly what went wrong, which is why catching “a ValueError” is precise where “an error” is vague.',
        'This is stricter than JavaScript, and that’s the point: reality throws garbage at robot code — an unplugged sensor, a corrupt log line — and a program that names and handles each failure survives contact with it.',
      ],
      deeper: [
        'Because exceptions are typed objects, you catch them by category. `except ValueError` handles bad conversions; `except (FileNotFoundError, PermissionError)` handles a couple of file problems; a broad `except Exception` is the catch-all. You’re matching on a type in a hierarchy, not on a string message — the same idea as `catch (e)` in JS but with the type doing the routing.',
        'You can define your own: `class SensorTimeout(Exception): pass` gives you a named failure you can `raise SensorTimeout("no reply from lidar")` and catch specifically upstream. Naming your failures is how a codebase stays debuggable as it grows.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Python prints a TRACEBACK when an uncaught exception stops the program. Read it BOTTOM-UP: the last line is the error; the frames above are the call chain that led there.\n\n```\ndef read_sensor(reading):\n    return 100 / reading\n\ndef process(values):\n    for v in values:\n        print(read_sensor(v))\n\nprocess([4, 2, 0])\n```\n\nThe run prints 25.0, then 50.0, then crashes. Which line does the BOTTOM of the traceback blame, and with what error?',
      options: [
        '`return 100 / reading` — `ZeroDivisionError: division by zero`',
        '`process([4, 2, 0])` — that’s the call that started it, so it’s the culprit',
        '`for v in values:` — the loop is where it looped into trouble',
        'No error — dividing by zero quietly gives `inf` like in JavaScript',
      ],
      correctIndex: 0,
      reveal:
        'The very last line names the exception — `ZeroDivisionError: division by zero` — and the frame just above it points at the line that actually failed: `return 100 / reading`, when `v` was 0. The frames higher up (`process(...)`, then the loop) are the call chain that GOT you there, read top-down; the crime scene is at the bottom. And no — unlike JavaScript, Python raises on division by zero rather than handing back `inf`.',
    },
    {
      kind: 'explain',
      title: 'try / except / else / finally',
      body: [
        'You handle an exception by wrapping the risky code: `try:` the thing that might fail, `except ValueError:` what to do if it does. That’s the whole core — attempt, and have a plan for the named failure.',
        'Two optional clauses complete it. `else:` runs only if the `try` block did NOT raise (the success path). `finally:` runs no matter what — success, failure, even a return — for cleanup you must not skip.',
        'The trap is a bare `except:` with no type. It swallows EVERYTHING, including `KeyboardInterrupt` (you pressing Ctrl-C) and `SystemExit` — so your program becomes un-quittable and hides bugs. Always name the exception you actually expect.',
      ],
      deeper: [
        'Why does bare `except:` catch Ctrl-C when `except Exception:` doesn’t? Because `KeyboardInterrupt` and `SystemExit` descend from `BaseException`, not from `Exception` — the language deliberately puts “the user wants out” and “the program is exiting” on a different branch so ordinary error handling leaves them alone. Catching `Exception` is the honest broad net; catching bare `except:` catches the two you should never eat.',
        'You can inspect the caught object: `except ValueError as e:` binds it to `e`, so you can log `str(e)`, re-raise it with a bare `raise`, or wrap it in your own exception. Catch, understand, then decide — don’t just silence.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Trace the control flow. The conversion succeeds here.\n\n```\ntry:\n    x = int("42")\nexcept ValueError:\n    print("bad number")\nelse:\n    print("ok:", x)\nfinally:\n    print("cleanup done")\n```\n\nWhat prints, and in what order?',
      options: [
        'ok: 42 / cleanup done',
        'bad number / cleanup done',
        'ok: 42 (only — finally is skipped on success)',
        'ok: 42 / bad number / cleanup done',
      ],
      correctIndex: 0,
      reveal:
        '`int("42")` succeeds, so the `except` is skipped entirely. Because the `try` raised nothing, the `else` runs → `ok: 42`. Then `finally` runs the way it ALWAYS does, success or not → `cleanup done`. If the string had been `"hello"`, you’d instead see `bad number` (from except) then `cleanup done` — never the `else`, because that only fires when the try succeeded.',
    },
    {
      kind: 'explain',
      title: 'Files, and why `with` matters',
      body: [
        'You open a file with `open("log.txt")`, but a file you open must be closed, or you leak an OS resource. The safe way is a context manager: `with open("log.txt") as f:` — when the indented block ends, Python closes `f` for you, even if an exception fired inside.',
        'That’s `try/finally` distilled into one line: the `with` GUARANTEES the cleanup (close) happens. Read lines by looping `for line in f:`; write by opening with mode `"w"` — but beware, `"w"` TRUNCATES the file to empty first. Use `"a"` to append instead.',
        'You’ll pair this with exceptions constantly: open a sensor log, loop its lines, and wrap each parse in a targeted `except` so one corrupt line doesn’t kill the whole run.',
      ],
      deeper: [
        'The three common modes: `"r"` read (the default, errors if the file is missing), `"w"` write (creates or empties the file), `"a"` append (creates or adds to the end). Choosing `"w"` when you meant `"a"` is how people erase their own log files — the truncation happens the instant you open, before you write a single byte.',
        'A context manager is any object with `__enter__`/`__exit__` methods, which is why `with` also shows up for locks, network connections and database sessions. The pattern “acquire on enter, release on exit no matter what” is one of Python’s best ideas — you’ll meet its cousin (a lock’s release-in-`finally`) in the OS concurrency track.',
      ],
      links: [{ nodeId: 'os-concurrency-2', label: 'Release-in-finally, on a lock: Mutexes' }],
    },
    {
      kind: 'predict',
      question:
        'A robot log has one reading per line, but some lines are junk. This code skips the bad ones with a targeted except.\n\n```\nlines = ["12.5", "oops", "13.0", "", "14.5"]\nreadings = []\nfor line in lines:\n    try:\n        readings.append(float(line))\n    except ValueError:\n        continue\nprint(len(readings))\nprint(sum(readings))\n```\n\nWhat two numbers print?',
      options: [
        '3 and 40.0',
        '5 and 40.0',
        '3 and 39.5',
        'It crashes on "oops"',
      ],
      correctIndex: 0,
      reveal:
        '`float("oops")` and `float("")` both raise `ValueError`, so `continue` skips them and they never reach the list. The three that convert — 12.5, 13.0, 14.5 — go in, so `len` is `3` and `sum` is `40.0`. Because the risky `float(...)` is wrapped, one malformed line can’t take down the whole log parse — exactly the resilience you want on a robot chewing through real sensor data.',
    },
    {
      kind: 'quiz',
      question: 'How do you read a Python traceback to find where the error actually happened?',
      options: [
        'Bottom-up: the last line names the exception type and message; the frame just above points at the failing line',
        'Top-down: the first line is always the exact line that failed',
        'The middle line is the error; the rest is noise',
        'You can’t tell from a traceback — you must add prints',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the exception type/message is the final line, and the deepest (last-listed) frame is the line that raised — read the frames above as the call chain that led there.',
        'The top of the traceback is the OUTERMOST call (where execution began), not the failing line — reading it first misleads beginners.',
        'There’s no single “middle” line; the structure is a stack of frames ending in the error line — position matters, not the middle.',
        'The traceback already points precisely at the failing line and names the error; prints help further but the traceback is the first, best clue.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What is wrong with using a bare `except:` (no exception type)?',
      options: [
        'It catches everything — including `KeyboardInterrupt` and `SystemExit` — so it hides bugs and can make the program un-quittable',
        'It’s a syntax error; Python requires a type',
        'It’s the recommended default because it’s the safest',
        'It only catches `SyntaxError`, which is useless',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: bare `except:` swallows even Ctrl-C and exit signals (they’re `BaseException`s), so real problems get silenced and you lose the ability to interrupt. Name the exception you expect.',
        'It’s valid syntax, unfortunately — which is exactly why it’s a trap that runs and hides errors rather than failing loudly.',
        'It’s the opposite of recommended: over-broad catching is a well-known anti-pattern precisely because it hides failures.',
        'A bare `except:` catches almost everything, not just `SyntaxError` — that over-breadth is the whole problem.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In `try/except/else/finally`, when does the `finally` block run?',
      options: [
        'Always — whether the try succeeded, raised, or returned early',
        'Only when an exception was raised',
        'Only when NO exception was raised',
        'Only if you explicitly call it',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `finally` is the guaranteed-cleanup clause; it runs on success, on failure, and even when the block returns — that’s its whole purpose.',
        'That describes `except`. `finally` runs regardless of whether anything was raised.',
        'That describes `else` (runs only on the no-exception success path). `finally` runs either way.',
        '`finally` runs automatically as part of the statement — there’s nothing to call.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why prefer `with open("log.txt") as f:` over a plain `f = open("log.txt")`?',
      options: [
        'The `with` block closes the file automatically when it ends, even if an exception is raised inside',
        'It makes reading the file faster',
        'It’s the only way to open a file in Python',
        'It prevents other programs from ever opening the file again',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `with` is a context manager — it guarantees `f.close()` on exit, success or exception, so you never leak the handle. It’s `try/finally` in one line.',
        'It’s about guaranteed cleanup, not speed — the read itself is the same.',
        'Plain `open(...)` works too; you just then have to remember to `close()` yourself, which `with` handles for you.',
        '`with` manages closing, not exclusive locking — it doesn’t lock other programs out of the file.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You open a file with mode `"w"` to add a line to your existing log. What happens?',
      options: [
        'The file is truncated to empty the instant it opens — your old log is gone before you write anything',
        'Your new line is appended safely after the old content',
        'Python refuses, because the file already exists',
        'Nothing happens until you also call `f.flush()`',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `"w"` empties (truncates) the file on open. To ADD to an existing file you want `"a"` (append); mixing them up erases logs.',
        'That’s what `"a"` does. `"w"` overwrites from scratch, discarding the old content.',
        '`"w"` happily opens an existing file — and wipes it. It’s `"x"` (exclusive create) that refuses when the file exists.',
        'The truncation happens at open time regardless of `flush`; the old content is already gone.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Which `except` clause specifically handles `int("hello")` failing?',
      options: [
        '`except ValueError:` — a bad string-to-int conversion raises ValueError',
        '`except TypeError:` — the types are wrong',
        '`except KeyError:` — a missing key',
        '`except ZeroDivisionError:` — division trouble',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the value `"hello"` is the wrong VALUE for an int conversion, so Python raises `ValueError` — catch exactly that.',
        '`TypeError` is for wrong-type operations (e.g. adding a str and an int), not a bad conversion value.',
        '`KeyError` is for a missing dictionary key — unrelated to converting a string.',
        '`ZeroDivisionError` only arises from dividing by zero; there’s no division here.',
      ],
    },
    {
      question: 'How do you raise your own error to signal a sensor timeout?',
      options: [
        'Define `class SensorTimeout(Exception): pass`, then `raise SensorTimeout("no reply")`',
        'Return the string "ERROR" and hope the caller checks it',
        'Call `print("timeout")` and continue as if nothing happened',
        'You can’t create custom exceptions in Python',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: subclass `Exception`, then `raise` it — a named failure the caller can catch specifically upstream.',
        'Returning a magic string is exactly the fragile pattern exceptions replace — callers forget to check it.',
        'Printing doesn’t stop or signal anything; the bad state flows onward silently.',
        'Custom exceptions are a core feature — any class inheriting from `Exception` works.',
      ],
    },
    {
      question:
        'A traceback ends with `FileNotFoundError: [Errno 2] No such file or directory: \'log.txt\'`. What does it tell you?',
      options: [
        'The code tried to open `log.txt` and it isn’t there — check the path/filename or create the file',
        'The file is corrupted and must be repaired',
        'You lack permission to read the file',
        'Python itself is installed incorrectly',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `FileNotFoundError` means the named path doesn’t exist from where the program is running — usually a typo or a wrong working directory.',
        'A corrupt file would still open (and maybe fail later); “not found” means the path resolved to nothing.',
        'That would be `PermissionError`; “No such file” is about existence, not access rights.',
        'The interpreter ran fine enough to reach your `open` call and report a clear error — Python is working.',
      ],
    },
    {
      question:
        'Which file mode should you use to ADD lines to an existing log without erasing it?',
      options: [
        '`"a"` (append) — writes at the end, keeping existing content',
        '`"w"` (write) — the standard choice for adding',
        '`"r"` (read) — you can write in read mode',
        '`"x"` (exclusive) — appends to any file',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `"a"` opens at the end and preserves what’s already there — the safe way to grow a log.',
        '`"w"` truncates the file to empty on open, destroying the existing log — the opposite of what you want.',
        '`"r"` is read-only; attempting to write in it raises an error.',
        '`"x"` is exclusive-create: it FAILS if the file already exists, so it can’t append to an existing log.',
      ],
    },
  ],
}
