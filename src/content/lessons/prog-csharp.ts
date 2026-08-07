import type { Lesson } from '../../types'

/**
 * prog-csharp — "C#: Typed and Compiled" (tier 0, forks off prog-data).
 * Local-toolchain pattern (the prog-python shape): no `code` screens — the app's
 * runner is JS-only — so every command and program output quoted here was
 * EXECUTED against a real .NET SDK (10.0.302, macOS arm64) and is byte-exact.
 * Culture note: this machine resolves to en-NL, so `Console.WriteLine(87.5)`
 * genuinely prints `87,5` — that observation is taught, not hidden.
 */
export const progCsharpLesson: Lesson = {
  nodeId: 'prog-csharp',
  screens: [
    {
      kind: 'explain',
      title: 'A language that checks your work before it runs',
      body: [
        'JavaScript and Python find out what type a value is while the program runs. C# decides BEFORE it runs: you name the type, a compiler checks every line against it, and code that doesn’t add up never gets to execute.',
        'That single difference reshapes everything — how you declare a variable, how a function is written, and crucially WHEN you find out you were wrong (in a second, at your desk, rather than at 3am on a robot).',
        'You already own the ideas. This lesson re-dresses them in C#, and you’ll run every example on your own machine.',
      ],
      deeper: [
        'The three-way split worth carrying with you: DYNAMIC typing (Python, JS) attaches types to values at runtime; STATIC typing (C#, Java, C, Rust) attaches them to names at compile time. Neither is “safer” in the abstract — static typing trades some flexibility for a machine-checked proof that whole classes of mistakes (passing a string where a number is needed, calling a method that doesn’t exist) cannot happen.',
        'C# also matters commercially: it is Microsoft’s flagship language, it runs on Windows/macOS/Linux via .NET, it is the language of Unity (and therefore of most robot simulators and games), and it is the single best recognition-per-hour credential in the reference course list. Learning it is a genuine employability move, not just a mental exercise.',
      ],
    },
    {
      kind: 'explain',
      title: 'Get a project running (do this now)',
      body: [
        'Install the .NET SDK from https://dotnet.microsoft.com/download (or `brew install dotnet` on a Mac), then check it: `dotnet --version` prints the SDK version — this chain was authored and every output verified on **10.0.302**.',
        'Now scaffold a project. `dotnet new console -o Rover` creates a folder `Rover/` containing `Program.cs` and `Rover.csproj`; `cd Rover` then `dotnet run` compiles and executes it.',
        'Do it now — you should see this (the scaffolder also prints a few "Restoring…" lines, trimmed here):\n\n```\n$ dotnet --version\n10.0.302\n\n$ dotnet new console -o Rover\nThe template "Console App" was created successfully.\n\n$ cd Rover\n$ dotnet run\nHello, World!\n```',
      ],
      deeper: [
        'What the two files are. `Program.cs` is your source. `Rover.csproj` is the PROJECT FILE — a tiny XML document that says what to build: `<OutputType>Exe</OutputType>` (make a runnable program), `<TargetFramework>net10.0</TargetFramework>` (build against .NET 10), plus `ImplicitUsings` and `Nullable`. It is C#’s answer to `package.json`, and you’ll edit it again when you add a library in the third lesson.',
        'The generated `Program.cs` is a single line: `Console.WriteLine("Hello, World!");`. That is TOP-LEVEL STATEMENTS — a modern C# convenience where the compiler wraps your loose statements in the `class Program { static void Main(string[] args) { ... } }` boilerplate that older C# made you type out. The boilerplate still exists; you just don’t have to see it.',
      ],
    },
    {
      kind: 'explain',
      title: 'Declaring a variable means naming its type',
      body: [
        'In C# the type comes FIRST: `int speed = 12;` — and `speed` is an `int` forever. The core types you’ll use constantly: `int` (whole numbers), `double` (decimals), `string` (text), `bool` (true/false).',
        '`Console.WriteLine(...)` is the print statement, and `$"..."` is an INTERPOLATED STRING — C#’s f-string, with `{ }` holes exactly like Python’s.',
        'Replace the body of `Program.cs` with this and run it:\n\n```\nint speed = 12;\nstring name = "rover";\nbool armed = false;\nvar wheels = 4;\n\nConsole.WriteLine(name);\nConsole.WriteLine(speed);\nConsole.WriteLine(armed);\nConsole.WriteLine(wheels);\nConsole.WriteLine($"{name} has {wheels} wheels at {speed} km/h");\n```',
      ],
      deeper: [
        '`var` is the one place you may omit the type — but it does NOT mean “dynamic”. `var wheels = 4;` means “compiler, work out the type from the right-hand side and write it in for me”, and it writes in `int`. The variable is every bit as statically typed as if you had spelled it out; `var` is shorthand, not an escape hatch. (Try `wheels = "four";` on the next line and the build fails with the same CS0029 you’ll meet in a moment.)',
        'Semicolons and braces are back. Every statement ends in `;`, every block is wrapped in `{ }`, and indentation is purely cosmetic — the exact opposite of the Python rule you just learned. Two languages, two answers to “what marks a block?”, and neither is the idea itself.',
      ],
    },
    {
      kind: 'predict',
      question:
        'You just ran that program. Four of the five lines are obvious — the interesting one is `Console.WriteLine(armed);` where `armed` was declared `bool armed = false;`.\n\nWhat does that line print?',
      options: [
        'False — with a capital F',
        'false — exactly as written in the source',
        '0 — booleans print as numbers',
        'Nothing, because printing a bool needs an explicit conversion',
      ],
      correctIndex: 0,
      reveal:
        'It prints `False`. The literal you WRITE is lowercase `false` (that is the C# keyword), but printing calls `bool.ToString()`, which returns the capitalised `"False"`. So the source and the output disagree on capitalisation — a tiny thing that trips people who then try to compare printed text against `"false"`. The full run is:\n\n```\nrover\n12\nFalse\n4\nrover has 4 wheels at 12 km/h\n```\n\nNote also that `var wheels = 4;` printed `4` like any other int — `var` inferred the type, it did not make the variable dynamic.',
    },
    {
      kind: 'explain',
      title: 'JavaScript / Python → C#, line by line',
      body: [
        'Almost everything maps. `let x = 5;` and `x = 5` both become `int x = 5;`. `console.log(x)` / `print(x)` become `Console.WriteLine(x);`. Template literals and f-strings become `$"{x}"`. Python’s `snake_case` and JS’s `camelCase` become **PascalCase for methods and types**, `camelCase` for locals.',
        'Lists are `List<int>`, arrays are `int[]`, and a `for` loop keeps the C-style `for (int i = 0; i < 3; i++)` you know from JavaScript — plus `foreach (string s in items)` which is Python’s `for s in items:`.',
        'The one truly new keyword is the SWITCH EXPRESSION: `mode switch { "idle" => "wait", _ => "unknown" }`, where `_` is the catch-all (the `else`).',
      ],
      deeper: [
        'Angle brackets `< >` are GENERICS — a type that takes a type. `List<int>` reads “list of int”, and it is a genuinely different type from `List<string>`: the compiler will refuse to put a string in it. Python’s `list` and JS’s `Array` hold anything, so they need no such notation; C# spells the element type out so mistakes are caught before the program runs.',
        'Naming really is convention-enforced here: public methods and types are `PascalCase` (`Console`, `WriteLine`, `Clamp`), local variables and parameters are `camelCase` (`speed`, `maxSpeed`). Nothing breaks if you disobey, but every C# codebase and every reviewer expects it, so build the habit now.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Here is the whole of `Program.cs`:\n\n```\nint x = "hello";\nConsole.WriteLine(x);\n```\n\nYou run `dotnet run`. What happens?',
      options: [
        'It never runs — the build fails first, with `error CS0029: Cannot implicitly convert type \'string\' to \'int\'`',
        'It runs and prints `hello` — C# converts the value to fit',
        'It runs and prints `0` — the int keeps its default value',
        'It runs and then crashes at the `Console.WriteLine` line with a runtime type error',
      ],
      correctIndex: 0,
      reveal:
        'Nothing executes. `dotnet run` builds first, the compiler sees a `string` being assigned to an `int`, and stops (the real output prefixes the full path to `Program.cs` and appends the `.csproj` — shortened here):\n\n```\nProgram.cs(1,9): error CS0029: Cannot implicitly convert type \'string\' to \'int\'\n\nThe build failed. Fix the build errors and run again.\n```\n\nThat is the entire deal of a compiled, statically typed language: `Program.cs(1,9)` names the file, the line and even the COLUMN, before a single instruction ran. In Python or JavaScript this same mistake sails through and detonates later — possibly only on the one input that reaches that branch, in production. Here it cannot ship.',
    },
    {
      kind: 'predict',
      question:
        'A trap that catches every Python and JavaScript programmer. Both operands below are `int`.\n\n```\nConsole.WriteLine(7 / 2);\nConsole.WriteLine(7 % 2);\n```\n\nWhat two lines print?',
      options: [
        '3 then 1',
        '3,5 then 1',
        '3.5 then 1',
        '3 then 3,5',
      ],
      correctIndex: 0,
      reveal:
        'It prints `3` then `1`. When BOTH operands are `int`, `/` is INTEGER division — it divides and throws the remainder away, so `7 / 2` is `3`, exactly like Python’s `//`. There is no separate `//` operator in C#; the type of the operands chooses the behaviour. `%` gives the discarded remainder, `1`.\n\nTo get `3.5` you have to make one side a `double`: `7.0 / 2`. This is the single most common numeric bug when arriving from a dynamic language — `(a + b) / 2` on two ints silently truncates your average.',
    },
    {
      kind: 'explain',
      title: 'Control flow: same ideas, C-style clothes',
      body: [
        'Nothing here is new — a counted loop, a loop over a collection, a branch, and a multi-way choice. Only the punctuation changed.',
        'Put this in `Program.cs` and run it before reading on:\n\n```\nfor (int i = 0; i < 3; i++)\n{\n    Console.WriteLine($"tick {i}");\n}\n\nstring[] sensors = { "lidar", "imu", "gps" };\nforeach (string s in sensors)\n{\n    Console.WriteLine(s.ToUpper());\n}\n\nint battery = 18;\nif (battery < 20)\n{\n    Console.WriteLine("low battery");\n}\nelse\n{\n    Console.WriteLine("fine");\n}\n\nstring mode = "idle";\nstring action = mode switch\n{\n    "idle" => "wait",\n    "drive" => "go",\n    _ => "unknown",\n};\nConsole.WriteLine(action);\n```',
        'Verified output:\n\n```\ntick 0\ntick 1\ntick 2\nLIDAR\nIMU\nGPS\nlow battery\nwait\n```',
      ],
      deeper: [
        'The switch EXPRESSION (`mode switch { ... }`) is not the old switch STATEMENT with `case`/`break`. An expression produces a value, so it can sit on the right of `=` — and the compiler will warn you if your arms don’t cover every possibility. It is the closest thing C# has to pattern matching, and it replaces the long `if/else if/else` ladders you would write in JS.',
        '`_` is the discard pattern: “anything else”. Leave it out and a `mode` you didn’t list throws a `SwitchExpressionException` at runtime — which is sometimes exactly what you want (fail loudly on an unknown robot state rather than silently doing nothing).',
      ],
    },
    {
      kind: 'explain',
      title: 'The gotcha nobody warns you about: culture',
      body: [
        'Printing a `double` formats it using the machine’s CURRENT CULTURE — its regional number settings — and cultures disagree about the decimal separator.',
        'Run this and note what YOUR machine says:\n\n```\nusing System.Globalization;\n\nConsole.WriteLine(CultureInfo.CurrentCulture.Name);\nConsole.WriteLine(87.5);\nConsole.WriteLine(87.5.ToString(CultureInfo.InvariantCulture));\n```',
        'On the Mac these lessons were written on, the culture is `en-NL` and the real output is:\n\n```\nen-NL\n87,5\n87.5\n```',
      ],
      deeper: [
        'Read that again: the SAME program prints `87,5` here and `87.5` on a US-configured machine. The Netherlands uses a decimal comma, so .NET obeys. This is correct behaviour for text a human reads — and a disaster for a CSV of sensor readings, a JSON payload, or a number you write to a log and parse back somewhere else.',
        'The rule professionals follow: culture-aware formatting for the USER INTERFACE, `CultureInfo.InvariantCulture` for anything a MACHINE will read back. `value.ToString(CultureInfo.InvariantCulture)` always gives you the dot. The mirror-image bug bites on the way in too — `double.Parse("87.5")` can fail or silently give 875 on a comma-culture machine unless you pass the invariant culture.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does it mean that C# is statically typed and compiled?',
      options: [
        'Every variable has a type fixed at compile time, and a compiler checks the whole program for type errors before any of it runs',
        'Types are attached to values as the program runs, so a variable can hold a string now and a number later',
        'It means the program is compiled once into machine code that only runs on the machine that built it',
        'It means you must declare every variable at the top of the file before using it',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the type belongs to the NAME, is decided at compile time, and the build fails on a mismatch — you find out at your desk, not in production.',
        'That is dynamic typing — Python and JavaScript. In C# a variable’s type never changes after its declaration.',
        'C# compiles to portable IL, not machine code for one machine; the same build runs on Windows, macOS and Linux. Static typing is about type checking, not portability.',
        'Nothing requires declarations at the top — you declare where you first need the variable. The point is that a declaration names a TYPE.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In C#, `int total = 7 / 2;` gives `total` the value 3. Why?',
      options: [
        'Both operands are `int`, so `/` performs integer division and discards the remainder',
        'C# always rounds division results down to the nearest whole number',
        '`int` cannot store 3.5, so the compiler silently rounds it to the nearest int (4 would round up)',
        'It is a bug in the example — C# would refuse to compile a fractional result into an `int`',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the OPERAND types choose the operator’s behaviour. Make one side a double (`7.0 / 2`) and you get 3.5.',
        'It is not division in general that floors — `7.0 / 2` gives 3.5. It is specifically int-divided-by-int that never produces a fraction.',
        'No rounding to nearest happens: 3.5 truncates toward zero to 3, not up to 4. And the truncation happens in the division, not in the assignment.',
        'It compiles perfectly happily, which is exactly what makes it dangerous — the result type of int/int IS int, so there is nothing for the compiler to complain about.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does `var speed = 12;` actually do?',
      options: [
        'Declares a variable whose type the compiler infers as `int` — it is fully statically typed, `var` is just shorthand',
        'Declares a dynamically typed variable that can later hold a string or a bool',
        'Declares a variable of a special `var` type that boxes any value',
        'Is invalid C# — it is JavaScript syntax that the compiler rejects',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `var` means “infer the type from the initialiser and write it in for me”. `speed` is an `int` and assigning a string to it later fails to compile.',
        'That is JavaScript’s `var`. C#’s looks the same and behaves completely differently — the type is fixed at compile time.',
        'There is no `var` type. The inferred type here is genuinely `int`; nothing is boxed.',
        '`var` is real, valid, idiomatic C# — it is used constantly to avoid writing long generic type names twice.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A colleague’s C# program writes sensor readings to a CSV. It works on their laptop and produces unreadable files on yours. What is the most likely cause?',
      options: [
        'Doubles were formatted with the machine’s current culture, so one machine wrote `87.5` and the other wrote `87,5`',
        'One machine used `int` and the other used `double` for the same reading',
        'The two machines run different .NET versions, which changed how numbers are stored',
        'CSV files cannot store decimal numbers, so the data was always corrupt',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `Console.WriteLine(87.5)` and `.ToString()` use `CurrentCulture`, so a comma-decimal locale writes `87,5` — which then collides with the comma separator in the CSV. Machine-readable output must use `CultureInfo.InvariantCulture`.',
        'The type would change precision, not the separator character — and it would change identically on both machines, since the source is the same.',
        'Number storage is fixed by the IEEE-754 standard and does not vary by .NET version; what varies here is the FORMATTING of the text, driven by regional settings.',
        'CSV stores decimals fine. The problem is which character separates the whole part from the fraction, and whether it clashes with the field separator.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Which command creates a new C# console project in a folder called `Rover`?',
      options: [
        '`dotnet new console -o Rover`',
        '`dotnet init Rover --console`',
        '`dotnet create project Rover`',
        '`csc --new Rover`',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `dotnet new <template> -o <folder>`. The `console` template writes `Program.cs` and `Rover.csproj`, then restores the project.',
        'There is no `dotnet init`; scaffolding is always `dotnet new` plus a template name.',
        'There is no `dotnet create` verb. `dotnet new` is the scaffolding command for every template — console, classlib, web and so on.',
        '`csc` is the raw C# compiler buried inside the SDK. You practically never invoke it directly; the `dotnet` CLI drives it for you.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Translate to C#: `name = "rover"` (Python) / `let name = "rover";` (JavaScript).',
      options: [
        '`string name = "rover";` — type first, semicolon at the end',
        '`let name = "rover";` — C# kept `let` from JavaScript',
        '`name: string = "rover"` — the type follows the name after a colon',
        '`name = "rover"` — C# infers everything, no type and no semicolon needed',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `<type> <name> = <value>;`. You could also write `var name = "rover";` and the compiler infers `string`.',
        'C# has no `let` keyword for variables. Declarations start with the type (or `var`).',
        'Colon-after-name is TypeScript/Python annotation syntax; C# puts the type first, with no colon.',
        'The semicolon is mandatory, and a bare `name = "rover"` without a type or `var` is an assignment to an undeclared variable — a compile error.',
      ],
    },
    {
      question: 'What prints?\n\n```\ndouble half = 9 / 2;\nConsole.WriteLine(half);\n```',
      options: [
        '4 — the int division happens first, then 4 is widened to a double',
        '4.5 — the target type `double` makes the division fractional',
        '4,5 — the same as 4.5, just written with the local separator',
        'A compile error — you cannot assign an int expression to a double',
      ],
      correctIndex: 0,
      explanations: [
        'Correct, and this is the nastiest version of the trap: `9 / 2` is evaluated as int/int = 4 BEFORE anything is assigned. The double on the left arrives too late to help. Write `9.0 / 2` instead.',
        'The declared type of the variable does not reach back and change how the expression on the right is evaluated — the operand types alone decide that.',
        'Culture only changes how a fractional value is DISPLAYED. There is no fraction here to display: the value really is 4.',
        'Assigning an int to a double is a legal widening conversion — which is precisely why this compiles silently and bites you at runtime.',
      ],
    },
    {
      question: 'Which loop iterates directly over the elements of `string[] sensors`?',
      options: [
        '`foreach (string s in sensors) { ... }`',
        '`for (string s of sensors) { ... }`',
        '`for s in sensors:` followed by an indented block',
        '`sensors.forEach(s => { ... })` — the only option C# offers',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `foreach (<type> <name> in <collection>)` is C#’s element loop — the direct equivalent of JS `for...of` and Python `for x in xs`.',
        '`of` is JavaScript. C# spells the same idea `foreach (... in ...)`.',
        'That is Python: no parentheses, a colon, and indentation as the block. C# needs the parentheses, the type, and braces.',
        'A `ForEach` method does exist on `List<T>`, but `foreach` is the idiomatic loop and works on arrays too — which `List<T>.ForEach` does not.',
      ],
    },
    {
      question: 'You run `dotnet run` and see `error CS0103: The name \'battery\' does not exist in the current context`. When did this error occur?',
      options: [
        'At compile time — the build failed, so none of your program executed',
        'At runtime, on the line that used `battery`, after the earlier lines had already printed',
        'At restore time, before the compiler ever looked at your code',
        'It is only a warning; the program ran and skipped that line',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `CS####` codes are COMPILER errors. `dotnet run` builds first, and a failed build means nothing runs — you get "The build failed. Fix the build errors and run again."',
        'Runtime failures in .NET are exceptions with names like `FormatException`, not `CSxxxx` codes — and they appear after whatever output preceded them.',
        'Restore fetches packages from NuGet; it never inspects your C# for undefined names. This is the compiler talking.',
        'Errors (as opposed to warnings, `CS8321` and friends) stop the build outright. Nothing is skipped because nothing is produced.',
      ],
    },
    {
      question: 'Why does `Console.WriteLine(true)` print `True` rather than `true`?',
      options: [
        'Printing converts the value via `bool.ToString()`, which returns the capitalised string `"True"`',
        'C#’s boolean literals are actually spelled `True` and `False` in source code',
        '`Console.WriteLine` capitalises the first letter of anything it prints',
        'It is a culture setting; on other machines it prints lowercase',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the LITERAL you write is lowercase `true`, but its string representation is `"True"`. Comparing printed output against `"true"` is a classic slip.',
        'The keywords really are lowercase `true`/`false`; only the printed form is capitalised.',
        'It prints strings exactly as given — `Console.WriteLine("hello")` stays lowercase. The capital comes from bool’s own `ToString`.',
        'Boolean formatting is not culture-dependent; `"True"`/`"False"` are fixed. Number and date formatting are the culture-sensitive ones.',
      ],
    },
  ],
}
