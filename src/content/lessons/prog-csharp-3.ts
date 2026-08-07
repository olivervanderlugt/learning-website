import type { Lesson } from '../../types'

/**
 * prog-csharp-3 — ".NET: The Runtime, the CLI and When Things Break" (tier 1).
 * Local-toolchain pattern: no `code` screens. Every command, package and
 * program output below was EXECUTED against the real .NET SDK 10.0.302 on
 * macOS arm64 (runtimes 10.0.10) and is quoted byte-exact, with absolute paths
 * shortened where noted.
 */
export const progCsharp3Lesson: Lesson = {
  nodeId: 'prog-csharp-3',
  screens: [
    {
      kind: 'explain',
      title: 'C# is the language. .NET is everything else.',
      body: [
        '.NET is the PLATFORM your C# runs on: a compiler, a runtime that executes the compiled output, a huge standard library, and the `dotnet` command that drives all of it.',
        'Two pieces get installed and they are not the same thing. The SDK is the developer kit — it can build. The RUNTIME can only run something already built, which is what you install on a server or a robot.',
        'Ask your machine what it has:\n\n```\n$ dotnet --list-sdks\n10.0.302 [/opt/homebrew/Cellar/dotnet/10.0.302/libexec/sdk]\n\n$ dotnet --list-runtimes\nMicrosoft.AspNetCore.App 10.0.10 [...]\nMicrosoft.NETCore.App 10.0.10 [...]\n```\n\n(Your paths will differ — the versions are what matter. These lessons were verified on SDK 10.0.302.)',
      ],
      deeper: [
        'Notice that the SDK version (10.0.302) and the runtime version (10.0.10) are not the same number, and that is normal: the SDK ships on its own cadence and bundles the runtimes it can target. `Microsoft.NETCore.App` is the base runtime every console app needs; `Microsoft.AspNetCore.App` adds the web-server stack on top, which is why it appeared without you asking.',
        'The names are a fossil record. ".NET Framework" was the original Windows-only platform; ".NET Core" was the cross-platform rewrite; from version 5 onward it is just ".NET". If you find a Stack Overflow answer mentioning ".NET Framework 4.8", it is about the old Windows-only line and may not apply to you at all.',
      ],
    },
    {
      kind: 'explain',
      title: 'What `dotnet run` is actually doing',
      body: [
        '`dotnet run` is three steps in a trench coat: restore (fetch dependencies), build (compile to a `.dll`), run (hand that `.dll` to the runtime).',
        'Split them apart and watch. With `Console.WriteLine("hello from the runtime");` in `Program.cs`:\n\n```\n$ dotnet build\n  Determining projects to restore...\n  All projects are up-to-date for restore.\n  Rover -> ./bin/Debug/net10.0/Rover.dll\n\nBuild succeeded.\n    0 Warning(s)\n    0 Error(s)\n```',
        'The build produced an artifact you can run yourself, without rebuilding:\n\n```\n$ ls bin/Debug/net10.0\nRover\nRover.deps.json\nRover.dll\nRover.pdb\nRover.runtimeconfig.json\n\n$ dotnet bin/Debug/net10.0/Rover.dll\nhello from the runtime\n```',
      ],
      deeper: [
        'The compiler does NOT emit machine code. `Rover.dll` contains INTERMEDIATE LANGUAGE (IL) — a compact, CPU-independent instruction set. At run time the JIT ("just-in-time") compiler translates each method into real arm64 or x64 instructions the first moment it is called, then caches that. This is why one build runs on your Mac and on a Linux robot, and why the first execution of a hot loop is measurably slower than the second.',
        'The supporting files each have a job: `Rover.runtimeconfig.json` tells the launcher which runtime version to load; `Rover.deps.json` lists every dependency and where to find it; `Rover.pdb` holds the debug symbols that let a stack trace name your file and LINE NUMBER — you will see that pay off two screens from now. The extension-less `Rover` file is a small native launcher; it needs .NET installed in a standard location, so `dotnet <path>.dll` is the reliable way to run an artifact by hand.',
      ],
    },
    {
      kind: 'predict',
      question:
        'You compile `Rover` on your Mac and copy the whole `bin/Debug/net10.0` folder onto a Linux robot that has the .NET RUNTIME installed but no SDK.\n\nWhat happens when you run `dotnet Rover.dll` there?',
      options: [
        'It runs — the `.dll` holds CPU-independent IL, and the runtime JIT-compiles it for that machine',
        'It fails — the `.dll` contains macOS arm64 machine code and cannot execute on Linux',
        'It fails — running any .NET program requires the SDK to be installed',
        'It runs, but only after `dotnet build` is executed again on the robot',
      ],
      correctIndex: 0,
      reveal:
        'It runs. The build output is IL, not machine code, so it carries across operating systems and CPU architectures untouched; the RUNTIME on the target machine JIT-compiles it to native instructions on the spot. The SDK is only needed to BUILD — that is the whole point of the SDK/runtime split, and it is why production servers and robots ship with the runtime alone (smaller, less attack surface, nothing to compile). Options 2 and 4 both assume ahead-of-time native compilation, which .NET can do on request but does not do by default.',
    },
    {
      kind: 'explain',
      title: 'Namespaces and `using`: the library is enormous',
      body: [
        'Every type in .NET lives in a NAMESPACE — a dotted name that groups related types: `System` (`Console`, `Math`, `string`), `System.Collections.Generic` (`List<T>`, `Dictionary<K,V>`), `System.IO` (files), `System.Diagnostics` (`Stopwatch`).',
        'A `using System.Diagnostics;` line at the top means "I may write `Stopwatch` instead of `System.Diagnostics.Stopwatch`". It imports NAMES, not code — nothing is downloaded or executed.',
        'Modern projects turn on `<ImplicitUsings>enable</ImplicitUsings>` in the `.csproj`, which pre-imports the handful everyone always needs. That is why this runs with no `using` line at all:\n\n```\nConsole.WriteLine(Math.Sqrt(9));\nConsole.WriteLine(string.Join(", ", new[] { "a", "b" }));\nvar list = new List<int> { 3, 1, 2 };\nlist.Sort();\nConsole.WriteLine(string.Join(" ", list));\n```\n\nVerified output:\n\n```\n3\na, b\n1 2 3\n```',
      ],
      deeper: [
        'Contrast this with Python’s `import`. Python’s `import re` genuinely LOADS a module object at run time and binds it to a name; C#’s `using` is a pure compile-time spelling convenience over types that are already in assemblies your project references. Nothing about `using` affects what ends up in the built program.',
        '`Math.Sqrt(9)` printed `3`, not `3` with a decimal — `Sqrt` returns a `double`, and .NET prints a whole-valued double with no fractional part. Handy here, but do not rely on it: `Math.Sqrt(2)` prints a long fraction whose decimal separator follows your machine’s culture, exactly as the first lesson warned.',
      ],
    },
    {
      kind: 'predict',
      question:
        '`Stopwatch` lives in the `System.Diagnostics` namespace, which implicit usings do NOT include. This is the whole file:\n\n```\nvar sw = Stopwatch.StartNew();\nConsole.WriteLine(sw.IsRunning);\n```\n\nWhat happens?',
      options: [
        'A compile error: `CS0103: The name \'Stopwatch\' does not exist in the current context`',
        'It runs and prints `True` — C# finds types automatically wherever they live',
        'A runtime error when the `Stopwatch.StartNew()` line is reached',
        'It prints nothing and exits silently, because `sw` is null',
      ],
      correctIndex: 0,
      reveal:
        'Compile error — the same `CS0103` you get for a misspelled variable, because to the compiler an un-imported type name and an undefined name are the same problem: nothing in scope answers to `Stopwatch`. Add `using System.Diagnostics;` as the first line and it prints `True`. The lesson is that "unknown name" errors in C# have two cures — fix the typo, or import the namespace — and your editor will offer the import for you.',
    },
    {
      kind: 'explain',
      title: 'NuGet: someone already wrote it',
      body: [
        'NuGet is .NET’s package registry — npm or pip for C#. `dotnet add package <name>` records a dependency in your `.csproj` and downloads it.',
        'Add a real one. It prints eleven lines — certificate-bundle notices and NuGet feed traffic — of which these are the two that matter (paths shortened):\n\n```\n$ dotnet add package Humanizer --version 2.14.1\ninfo : PackageReference for package \'Humanizer\' version \'2.14.1\' added to file \'./Rover.csproj\'.\nlog  : Restored ./Rover.csproj (in 82 ms).\n```\n\nYour `.csproj` grew a block:\n\n```\n  <ItemGroup>\n    <PackageReference Include="Humanizer" Version="2.14.1" />\n  </ItemGroup>\n```',
        'Now use it — `using Humanizer;` and run:\n\n```\nusing Humanizer;\n\nConsole.WriteLine("sensor_reading_count".Humanize());\nConsole.WriteLine(TimeSpan.FromMinutes(90).Humanize());\nConsole.WriteLine(3.ToWords());\n```\n\nVerified output:\n\n```\nsensor reading count\n1 hour\nthree\n```',
      ],
      deeper: [
        'The `.csproj` is the lockstep equivalent of `package.json` or `requirements.txt`: it is the file you COMMIT, and `dotnet restore` (which `build` and `run` do for you) rebuilds the exact dependency set on any machine from it. `dotnet list package` prints what you have — Requested vs Resolved versions side by side.',
        'The same supply-chain caution applies as with npm and pip: every package you add is code you will execute with your own privileges. `dotnet add package` even checks a vulnerability feed as it restores. Prefer well-known packages, pin versions explicitly (`--version`), and read what a dependency pulls in behind it.',
      ],
    },
    {
      kind: 'explain',
      title: 'When it breaks: exceptions and the stack trace',
      body: [
        'A runtime failure in .NET THROWS an exception. If nobody catches it, the runtime prints the exception type, its message, and a stack trace, then kills the process.',
        'Run this — the middle reading is deliberately junk:\n\n```\nstring[] readings = { "12", "oops", "18" };\n\nConsole.WriteLine("start");\nforeach (string r in readings)\n{\n    Console.WriteLine(int.Parse(r));\n}\nConsole.WriteLine("end");\n```',
        'Verified output (absolute path shortened):\n\n```\nstart\n12\nUnhandled exception. System.FormatException: The input string \'oops\' was not in a correct format.\n   at System.Number.ThrowFormatException[TChar](ReadOnlySpan`1 value)\n   at System.Int32.Parse(String s)\n   at Program.<Main>$(String[] args) in Program.cs:line 6\n```',
      ],
      deeper: [
        'Read a .NET stack trace TOP-DOWN — the opposite of Python. The top frame is where the exception was actually thrown (deep inside `System.Number`), and each line below is the caller of the one above. Walk down until you reach a frame in YOUR code: `at Program.<Main>$(String[] args) in Program.cs:line 6`. That is the line to look at, and the file-and-line only appear because the `.pdb` symbol file from the build is sitting next to the `.dll`.',
        '`Program.<Main>$` is the compiler-generated `Main` that wraps your top-level statements — the boilerplate the first lesson mentioned, showing itself. Also note what did NOT print: `18` and `end`. An unhandled exception unwinds the stack immediately, so everything after the throw is abandoned; the output ending abruptly is itself a diagnostic clue.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Now the same loop is wrapped in `try { Console.WriteLine(int.Parse(r)); } catch (FormatException ex) { Console.WriteLine($"skipping \'{r}\': {ex.Message}"); } finally { Console.WriteLine($"-- done with {r}"); }`, still over `{ "12", "oops", "18" }`.\n\nHow many `-- done with` lines appear, and does `end` print?',
      options: [
        'Three `-- done with` lines — one per reading, including the one that threw — and `end` does print',
        'Two — the `finally` is skipped for the reading that threw — and `end` prints',
        'One — the loop stops at the first failure — and `end` does not print',
        'Three, but `end` does not print, because a caught exception still terminates the program',
      ],
      correctIndex: 0,
      reveal:
        'Verified output:\n\n```\nstart\n12\n-- done with 12\nskipping \'oops\': The input string \'oops\' was not in a correct format.\n-- done with oops\n18\n-- done with 18\nend\n```\n\nThree things to take: `finally` runs on EVERY route out of the block — normal completion and thrown exception alike — which is what makes it the place to release a file handle or a motor lock. A CAUGHT exception is handled, so the loop continues to `18` and the program reaches `end` normally. And `ex.Message` is the same text the crash printed, now yours to log with context instead of a dead process.',
    },
    {
      kind: 'explain',
      title: 'Don’t use exceptions for things you expect',
      body: [
        'Exceptions are for the EXCEPTIONAL. A sensor line that might be junk is not exceptional — it is Tuesday — and throwing/catching on every bad row is both slow and noisy.',
        'For predictable failure .NET offers the Try-pattern, which returns a `bool` and hands the value back through an `out` parameter:\n\n```\nConsole.WriteLine(int.TryParse("12", out int good));\nConsole.WriteLine(good);\nConsole.WriteLine(int.TryParse("oops", out int bad));\nConsole.WriteLine(bad);\n```\n\nVerified output:\n\n```\nTrue\n12\nFalse\n0\n```',
        'Note `bad` is `0`, not null and not garbage: on failure the `out` parameter is set to the type’s default.',
      ],
      deeper: [
        '`out int good` declares the variable inline AND marks it as an output the method is REQUIRED to assign before it returns. `out` and `ref` are the two modifiers that suspend the pass-by-value rule from the last lesson and let a method write straight into the caller’s variable; they differ in direction. `ref` passes an existing, already-initialised variable in AND out, so the method can read the current value first. `out` is one-way: the method may not read it, and the compiler insists it be written — which is exactly right for "here is the parsed number" alongside a success flag.',
        'The judgement call, stated plainly: use `TryParse` when bad input is a normal, expected case you have a plan for, and let the exception fly when the input being wrong means your assumptions are broken and continuing would corrupt something. "Catch everything and carry on" is the worst of both — it turns a loud, locatable failure into silent wrong behaviour, exactly the bare-`except` trap from the Python chain.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A classic off-by-one, now in C#:\n\n```\nint[] readings = { 4, 8, 15 };\n\nint total = 0;\nfor (int i = 0; i <= readings.Length; i++)\n{\n    total = total + readings[i];\n}\nConsole.WriteLine(total);\n```\n\nWhat does running it produce?',
      options: [
        'No total at all — an unhandled `System.IndexOutOfRangeException` at line 6',
        '`27` — the extra iteration reads a zero and changes nothing',
        '`27` — C# stops the loop at the end of the array automatically',
        'A compile error — the compiler detects the out-of-range index',
      ],
      correctIndex: 0,
      reveal:
        'Verified output (path shortened):\n\n```\nUnhandled exception. System.IndexOutOfRangeException: Index was outside the bounds of the array.\n   at Program.<Main>$(String[] args) in Program.cs:line 6\n```\n\nValid indices are `0..Length-1`, so `<=` walks one step too far. Two contrasts worth holding on to: C#, unlike C, CHECKS every array access and throws rather than reading whatever memory happens to sit there — the `prog-c` buffer-overflow class of bug simply cannot happen here. And unlike the type errors from lesson one, this is a RUNTIME failure: `i` is a perfectly good `int`, so there was nothing for the compiler to object to. Static typing catches type mistakes, not logic mistakes.',
    },
    {
      kind: 'quiz',
      question: 'What is the difference between the .NET SDK and the .NET runtime?',
      options: [
        'The SDK builds code (compiler, `dotnet new`/`build`/`add package`) and includes a runtime; the runtime alone can only execute an already-built app',
        'The SDK is for Windows and the runtime is the cross-platform version',
        'The runtime is the newer replacement for the SDK; installing both is redundant',
        'The SDK runs your app and the runtime compiles it just before execution',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: developer machines get the SDK, servers and robots get just the runtime — smaller, and there is nothing on them that can compile.',
        'Both are cross-platform. The split is build-capability versus run-capability, not operating system.',
        'They are complementary, not successive: `dotnet --list-sdks` and `dotnet --list-runtimes` report two different things, and the SDK bundles runtimes.',
        'Exactly backwards on both counts. The SDK compiles; the runtime executes (JIT-compiling IL to native code as it goes).',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does the compiler put inside `Rover.dll`?',
      options: [
        'Intermediate Language (IL) — a CPU-independent instruction set that the runtime JIT-compiles to native code when each method first runs',
        'Native arm64 or x64 machine code for the machine that built it',
        'The original C# source text, which the runtime re-parses on every run',
        'A zip of the project folder that `dotnet` unpacks and interprets line by line',
      ],
      correctIndex: 0,
      explanations: [
        'Correct, and it is why the same build runs on macOS, Windows and Linux, and why a hot method is slower the very first time it executes.',
        'That would be ahead-of-time compilation. .NET can do it on request, but the default `dotnet build` output is portable IL.',
        'The source is not shipped; IL is a compiled form. (The `.pdb` maps IL back to file and line for stack traces, which is a different thing.)',
        'Nothing is interpreted line by line — IL is compiled to real machine instructions by the JIT before it executes.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does `using System.Diagnostics;` at the top of a file do?',
      options: [
        'Lets you write the short name `Stopwatch` instead of `System.Diagnostics.Stopwatch` — a compile-time convenience that imports names, not code',
        'Downloads the `System.Diagnostics` package from NuGet',
        'Loads a module object at run time and binds it to a name, like Python’s `import`',
        'Automatically disposes of the resources used in that file when it finishes',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `using` is pure spelling. The types are already reachable through the assemblies the project references; you are only shortening how you name them.',
        'Nothing is downloaded — that is `dotnet add package`. `System.Diagnostics` is part of the base library that ships with the runtime.',
        'That is Python’s model. C#’s `using` has no run-time effect at all and does not create any object.',
        'That is the DIFFERENT `using` — the `using var file = ...` statement form, which does dispose a resource. The directive at the top of a file only imports names.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In a .NET stack trace, which frame points at the bug in YOUR code?',
      options: [
        'The topmost frame that names one of your own files with an `in ...:line N` suffix — the top of the trace is where the throw happened, and each line below is its caller',
        'The bottom line, because .NET traces read bottom-up like Python tracebacks',
        'The frame with the longest namespace, since that is the deepest one',
        'None — .NET traces only show framework internals, so you need a debugger to locate anything',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: read down from the top past the framework frames until you hit your own file. `in Program.cs:line 6` is your line, and it is only there because the `.pdb` symbols were built alongside the `.dll`.',
        'The direction is the opposite of Python’s. In .NET the throw site is at the TOP and callers descend from it.',
        'Namespace length says nothing about ownership — `System.Number.ThrowFormatException` is framework code with a short namespace and it is the topmost frame.',
        'Your frames appear whenever the `.pdb` is present, complete with file and line — which is usually enough without ever opening a debugger.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You are parsing thousands of sensor lines, a few of which are always malformed. Which approach is right?',
      options: [
        '`int.TryParse` — a malformed line is an expected case, so branch on a returned bool instead of throwing and catching on every bad row',
        '`int.Parse` inside a `try`/`catch` around the whole file, so the first bad line stops the import',
        '`int.Parse` with no handling — let it crash so you find out',
        'Catch `Exception` around every line and ignore it, so nothing can ever stop the run',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: exceptions are for the exceptional. Expected bad input gets a `TryParse` branch — faster, and it states in the code that you planned for this.',
        'One `try` around the whole file means a single bad row throws away every good row after it — the opposite of what a resilient importer should do.',
        'Crashing is right when your assumptions are broken, but "a few malformed lines" is a known condition you have a plan for, not a broken assumption.',
        'That is the bare-`except` trap: swallowing every exception turns a loud, locatable failure into silent wrong data, which is the most expensive kind of bug.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'What are the three things `dotnet run` does, in order?',
      options: [
        'Restore dependencies, build to a `.dll`, then execute that `.dll` on the runtime',
        'Execute, then build, then restore if the execution failed',
        'Download the SDK, compile to native machine code, then launch it',
        'Only execute — you must always run `dotnet build` yourself first',
      ],
      correctIndex: 0,
      explanations: [
        'Correct, and each step is separately available: `dotnet restore`, `dotnet build`, then `dotnet bin/Debug/net10.0/App.dll`.',
        'Nothing can execute before it is built. The order is fixed: restore, build, run.',
        'The SDK is already installed, and the build output is IL rather than native machine code.',
        '`dotnet run` builds for you — that is exactly why a type error surfaces as "The build failed. Fix the build errors and run again."',
      ],
    },
    {
      question: 'Which file records that your project depends on Humanizer 2.14.1?',
      options: [
        'The `.csproj`, as `<PackageReference Include="Humanizer" Version="2.14.1" />`',
        '`Program.cs`, via the `using Humanizer;` line',
        '`Rover.dll`, which the package is compiled into',
        '`Rover.runtimeconfig.json`, which lists all packages',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the `.csproj` is the committed source of truth for dependencies — .NET’s `package.json`. `dotnet restore` rebuilds the whole set from it on any machine.',
        '`using Humanizer;` only shortens type names. Delete the `PackageReference` and that line stops compiling, which proves the dependency lives in the project file.',
        'The `.dll` is your compiled code; the package resolves separately, and `Rover.deps.json` records where the runtime should find it.',
        '`runtimeconfig.json` names the runtime VERSION to load, not your NuGet packages.',
      ],
    },
    {
      question:
        'What is printed by `Console.WriteLine(int.TryParse("oops", out int n));` followed by `Console.WriteLine(n);`?',
      options: [
        '`False` then `0` — the method reports failure and sets the `out` parameter to the type’s default',
        '`False` then nothing — `n` was never assigned, so reading it is a compile error',
        '`False` then `null`',
        'It throws a `FormatException`, exactly as `int.Parse` would',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: that is the point of the Try-pattern — a bool you can branch on, and a defined value (0) rather than an exception.',
        'An `out` parameter is guaranteed assigned before the method returns, on both the success and failure paths, so `n` is definitely readable.',
        '`int` is a value type and cannot be null; its default is `0`.',
        'Not throwing is the entire reason `TryParse` exists alongside `Parse`.',
      ],
    },
    {
      question: 'Why does `readings[3]` on a 3-element array throw rather than reading neighbouring memory, as C would?',
      options: [
        'The .NET runtime bounds-checks every array access and throws `IndexOutOfRangeException` when the index is outside `0..Length-1`',
        'The C# compiler proves at build time that the index is out of range',
        'Arrays in C# are dictionaries, so a missing key returns an error object',
        'It does read neighbouring memory — the exception comes from the value being garbage',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: memory safety is checked at run time on every access, which is exactly the class of bug (buffer overflow, reading past the end) that the C lesson showed running unchecked.',
        'The compiler cannot prove it in general — the index is usually a variable whose value is only known while running, as with the loop counter `i` here.',
        'They are contiguous blocks of memory with a known length, not dictionaries; the length is what the bounds check consults.',
        'No out-of-bounds read happens at all. The check runs BEFORE the access, which is why the failure is precise and locatable.',
      ],
    },
    {
      question: 'A `finally` block runs when?',
      options: [
        'On every exit from the `try` block — normal completion, a caught exception, or an exception on its way out',
        'Only when an exception was thrown and caught',
        'Only when no exception was thrown',
        'Only if the `catch` block itself completes without error',
      ],
      correctIndex: 0,
      explanations: [
        'Correct, and that guarantee is what makes `finally` the right home for cleanup — closing a file, releasing a lock, stopping a motor.',
        'It runs on the clean path too: the verified output printed `-- done with 12` and `-- done with 18`, neither of which threw.',
        'Backwards — the whole value of `finally` is that it also runs when things go wrong.',
        '`finally` runs regardless of what the `catch` does, including when the catch rethrows.',
      ],
    },
  ],
}
