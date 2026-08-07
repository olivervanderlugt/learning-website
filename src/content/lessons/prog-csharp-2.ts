import type { Lesson } from '../../types'

/**
 * prog-csharp-2 — "Methods: Signatures, Overloads and Scope" (tier 1).
 * Local-toolchain pattern: no `code` screens. Every program and output below
 * was EXECUTED against the real .NET SDK 10.0.302 and is byte-exact — including
 * the compiler error proving that local functions cannot be overloaded.
 */
export const progCsharp2Lesson: Lesson = {
  nodeId: 'prog-csharp-2',
  screens: [
    {
      kind: 'explain',
      title: 'A method is a promise the compiler enforces',
      body: [
        'In JavaScript a function takes whatever you hand it. In C# a METHOD publishes a SIGNATURE — its name, the type of each parameter, and the type it returns — and the compiler holds both sides to it.',
        'That signature is a contract: pass the wrong type and it will not build; forget to return a value and it will not build; return the wrong type and it will not build.',
        'Put this in `Program.cs` and run it:\n\n```\nint Clamp(int value, int max)\n{\n    if (value > max)\n    {\n        return max;\n    }\n    return value;\n}\n\nvoid Report(string label)\n{\n    Console.WriteLine($"[{label}] ok");\n}\n\nConsole.WriteLine(Clamp(30, 20));\nConsole.WriteLine(Clamp(5, 20));\nReport("startup");\n```\n\nVerified output:\n\n```\n20\n5\n[startup] ok\n```',
      ],
      deeper: [
        'Read the declaration `int Clamp(int value, int max)` left to right: “returns an `int`, is called `Clamp`, takes an `int` I will call `value` and an `int` I will call `max`”. The return type comes FIRST — that is the shape shared by C, C++, Java and C#, and it is why C-family code reads type-name-parameters while Python reads `def name(params) -> type`.',
        '`void` is a return type meaning “returns nothing”. A `void` method is called for its EFFECT (printing, moving a motor, writing a file); a non-void method is called for its VALUE. Mixing the two — a method that both prints and returns — is usually a design smell: it becomes hard to test and hard to reuse.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Someone edits `Clamp` so its last line is deleted:\n\n```\nint Clamp(int value, int max)\n{\n    if (value > max)\n    {\n        return max;\n    }\n}\n```\n\nWhat happens when you `dotnet run`?',
      options: [
        'The build fails — a method declared to return `int` must return one on every path, and the `value <= max` path returns nothing',
        'It builds and returns 0 whenever `value <= max`, since `int` defaults to 0',
        'It builds and returns `null` whenever `value <= max`',
        'It builds fine — the compiler only checks that SOME path returns a value',
      ],
      correctIndex: 0,
      reveal:
        'The build fails, byte for byte:\n\n```\nProgram.cs(1,5): error CS0161: \'Clamp(int, int)\': not all code paths return a value\n\nThe build failed. Fix the build errors and run again.\n```\n\nThe signature promised an `int` for EVERY call, and there is a route through the method — the `if` being false — that falls off the end without one. A compiler that checks every path is the whole point: in JavaScript the same function silently returns `undefined` and the bug surfaces as `NaN` three functions later.',
    },
    {
      kind: 'explain',
      title: 'Overloading: one name, several signatures',
      body: [
        'C# lets several methods share a NAME as long as their parameter lists differ — the compiler picks the match from the argument types at the call site. That is OVERLOADING, and it is why `Console.WriteLine` accepts an int, a string, a bool and a double.',
        'One catch you will hit immediately: the loose "local functions" from the last screen CANNOT be overloaded (`error CS0128: A local variable or function named \'Clamp\' is already defined in this scope`). Real overloads live inside a class, which is where C# methods normally live anyway.',
        'Run this:\n\n```\nConsole.WriteLine(Motor.Clamp(30, 20));\nConsole.WriteLine(Motor.Clamp(30.5, 20.0));\nConsole.WriteLine(Motor.Clamp(5, 20));\n\nstatic class Motor\n{\n    public static int Clamp(int value, int max)\n    {\n        Console.WriteLine("int version");\n        return value > max ? max : value;\n    }\n\n    public static double Clamp(double value, double max)\n    {\n        Console.WriteLine("double version");\n        return value > max ? max : value;\n    }\n}\n```',
      ],
      deeper: [
        'The signature for overload purposes is the NAME plus the parameter TYPES — the return type is not part of it. Two methods differing only in return type (`int Read()` and `double Read()`) are a compile error, because at a call site like `Read();` the compiler would have no way to choose.',
        'Overload resolution happens entirely at COMPILE time, from the static types of the arguments. `Clamp(30, 20)` picks the int version because the literals are ints; `Clamp(30.5, 20.0)` picks the double version. Nothing is decided while the program runs — which is why you can read the chosen overload straight off the source.',
      ],
    },
    {
      kind: 'predict',
      question:
        'That program printed six lines. The third call is `Motor.Clamp(5, 20)`, where both arguments are int literals and 5 is below the max.\n\nWhat does the pair of lines for that third call look like?',
      options: [
        '`int version` then `5`',
        '`double version` then `5`',
        '`int version` then `20`',
        'Just `5` — the marker only prints when clamping actually happens',
      ],
      correctIndex: 0,
      reveal:
        'The full verified output is:\n\n```\nint version\n20\ndouble version\n20\nint version\n5\n```\n\n`5` and `20` are both `int` literals, so the compiler binds the call to the int overload — the marker prints, then `5 > 20` is false so the ternary returns `value`, `5`. Two details worth noticing: the marker prints on every call because it is the first statement of the method body, not conditional on clamping; and the DOUBLE overload printed `20`, not `20,0` — .NET renders a whole-valued double with no fractional part at all, so it dodges the culture separator entirely.',
    },
    {
      kind: 'explain',
      title: 'Scope: a local dies when the call ends',
      body: [
        'A variable declared inside a method exists only inside that method, and only for the duration of ONE call. Each call gets a fresh copy.',
        'Predict what this prints, then run it:\n\n```\nvoid Bump()\n{\n    int count = 0;\n    count = count + 1;\n    Console.WriteLine(count);\n}\n\nBump();\nBump();\nBump();\n```',
        'Verified output:\n\n```\n1\n1\n1\n```',
      ],
      deeper: [
        'The three calls print `1` because `int count = 0;` runs again on every call — the variable lives on the CALL STACK, and the frame holding it is discarded when the method returns. This is the same stack you watched unwind in the recursion lesson.',
        'The rule is also enforced in the other direction: try to read `count` after `Bump()` returns and you get `error CS0103: The name \'count\' does not exist in the current context`. Anything a method should REMEMBER between calls has to live somewhere longer-lived — a field on an object, or a `static` field on the class, which is exactly the next screen.',
      ],
    },
    {
      kind: 'explain',
      title: 'static vs instance: shared by the type, or owned by the object',
      body: [
        'A `static` member belongs to the TYPE — there is exactly one of it, shared by everything. An instance member belongs to one OBJECT created with `new`, and every object gets its own.',
        'You have already used both: `Console.WriteLine` and `Motor.Clamp` are static (called on the type name, no object needed), while `"rover".ToUpper()` is an instance method called on a particular string.',
        'Run this and watch the two rovers keep separate speeds while sharing one counter:\n\n```\nvar a = new Rover("scout");\nvar b = new Rover("digger");\n\na.Accelerate(10);\na.Accelerate(5);\nb.Accelerate(3);\n\na.Report();\nb.Report();\nConsole.WriteLine(Rover.Count);\n\nclass Rover\n{\n    public static int Count = 0;\n\n    private string name;\n    private int speed = 0;\n\n    public Rover(string name)\n    {\n        this.name = name;\n        Count = Count + 1;\n    }\n\n    public void Accelerate(int by)\n    {\n        speed = speed + by;\n    }\n\n    public void Report()\n    {\n        Console.WriteLine($"{name} at {speed}");\n    }\n}\n```',
      ],
      deeper: [
        '`public` and `private` are ACCESS MODIFIERS. `private` (the default for fields) means “only code inside this class may touch it” — so nothing outside `Rover` can set `speed` to a nonsense value; it has to go through `Accelerate`. That is encapsulation, and it is enforced by the compiler rather than by convention (Python’s leading-underscore is only a polite request).',
        '`this.name = name;` disambiguates: the parameter `name` shadows the field `name` inside the constructor, and `this.` reaches past the shadow to the field. The constructor itself is the method with no return type whose name matches the class — it runs once, at `new`, to put a fresh object into a valid state.',
      ],
    },
    {
      kind: 'predict',
      question:
        'That program creates two rovers, accelerates `a` by 10 then 5, accelerates `b` by 3, then prints both reports and `Rover.Count`.\n\nWhat are the three lines?',
      options: [
        '`scout at 15`, `digger at 3`, `2`',
        '`scout at 15`, `digger at 18`, `2`',
        '`scout at 15`, `digger at 3`, `1`',
        '`scout at 15`, `digger at 3`, `3`',
      ],
      correctIndex: 0,
      reveal:
        'Verified output: `scout at 15`, `digger at 3`, `2`. `speed` is an INSTANCE field, so `a` and `b` each have their own — `a` accumulates 10 + 5 = 15 while `b` sits at 3, completely untouched. `Count` is `static`, so there is only ONE of it for the whole type; the constructor bumps it on every `new`, and two rovers were created, so it reads `2`. This is the whole distinction in one program: per-object state versus per-type state.',
    },
    {
      kind: 'explain',
      title: 'Parameters: optional, named, and passed by value',
      body: [
        'Parameters can have DEFAULTS, so callers omit what they don’t care about — and a method whose body is a single expression can be written with `=>` instead of braces.',
        'Run this:\n\n```\nConsole.WriteLine(Describe("scout"));\nConsole.WriteLine(Describe("digger", 3));\n\nstring Describe(string name, int wheels = 4) => $"{name}/{wheels}";\n```\n\nVerified output:\n\n```\nscout/4\ndigger/3\n```',
        'Callers can also name arguments at the call site — `Describe(name: "scout", wheels: 6)` — which makes a call with several numbers readable instead of a mystery of positional literals.',
      ],
      deeper: [
        'Arguments are passed BY VALUE: the method gets a copy of the value. Assigning to a parameter inside the method therefore cannot change the caller’s variable. Run this and compare:\n\n```\nvoid Slow(int speed) { speed = speed - 10; }\nvoid Fill(int[] readings) { readings[0] = 99; }\n\nint current = 50;\nint[] data = { 1, 2, 3 };\nSlow(current);\nFill(data);\nConsole.WriteLine(current);\nConsole.WriteLine(data[0]);\n```\n\nVerified output: `50` then `99`.',
        'Both were passed by value — so why did one change? Because for a REFERENCE type (arrays, `List<T>`, any `class`) the value being copied is the REFERENCE, not the object. The copy still points at the same array, so `readings[0] = 99` edits the caller’s array. For a VALUE type (`int`, `double`, `bool`, `struct`) the number itself is copied, so `speed = speed - 10` only edits the copy. Same rule, two kinds of type — this is the single most misunderstood thing in C#.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What exactly is a method’s signature in C#?',
      options: [
        'Its name plus the number, types and order of its parameters — the return type is NOT part of it',
        'Its name plus its return type — the parameters are not part of it',
        'Its full text, including the body',
        'Its name only; C# allows just one method per name',
      ],
      correctIndex: 0,
      explanations: [
        'Correct, and that is precisely why two methods differing only in return type are a compile error: the call site would have no information to choose between them.',
        'Backwards. Parameters are what distinguish overloads; the return type is deliberately excluded.',
        'The body is the implementation, not the signature. The signature is the contract callers compile against — you can rewrite the body freely without touching any caller.',
        'C# very much allows several methods per name — that is overloading, and it is why `Console.WriteLine` accepts so many different argument types.',
      ],
    },
    {
      kind: 'quiz',
      question:
        '`Motor` has both `Clamp(int, int)` and `Clamp(double, double)`. You write `Motor.Clamp(30, 20);`. How is it decided which one runs?',
      options: [
        'The compiler picks the int overload at COMPILE time, from the static types of the two int literals',
        'The runtime picks an overload by inspecting the actual values as the call happens',
        'The first overload declared in the file always wins',
        'The double overload wins, because every int can be widened to a double',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: overload resolution is a compile-time decision based on the argument types, so you can read the chosen overload straight off the source.',
        'Nothing about the choice is deferred to runtime — that would be dynamic dispatch on argument types, which C# only does with the `dynamic` keyword.',
        'Declaration order is irrelevant; the compiler chooses the best TYPE match, and reports an ambiguity error if there genuinely isn’t one.',
        'Widening is only used when there is no exact match. With an exact int overload available, converting to double would be a strictly worse fit.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A method declared `static` on a class differs from an instance method how?',
      options: [
        'It belongs to the type itself and is called as `TypeName.Method(...)` with no object; instance methods are called on an object created with `new` and can see that object’s fields',
        'It runs faster because the compiler inlines it',
        'It can only be called once per program run',
        'It is private by default, whereas instance methods are public by default',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: static = one, shared, belonging to the type (`Console.WriteLine`, `Motor.Clamp`); instance = one per object, with access to that object’s own fields via `this`.',
        'Speed is not the distinction — the JIT inlines small methods of either kind. `static` is about what the member belongs to.',
        '`static` places no limit on how many times you call it; `Motor.Clamp` was called three times in this lesson.',
        'Accessibility is set by `public`/`private` and is completely independent of `static`. Both kinds default to `private` when unmarked.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A method takes an `int[] readings` parameter and sets `readings[0] = 99;`. Another takes an `int speed` and sets `speed = 0;`. After both calls, what has the caller observed?',
      options: [
        'The array’s first element really is 99, but the caller’s int is unchanged — arguments are copied, and for an array what is copied is the reference to the same array',
        'Both changed — C# passes everything by reference',
        'Neither changed — C# copies everything deeply before a call',
        'The array changed because arrays are special-cased; a `List<int>` would not have changed',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: one rule (pass by value) with two consequences, because copying a REFERENCE still leaves both copies pointing at the same object, while copying an `int` copies the number itself.',
        'If everything were by reference, `speed = 0;` would have zeroed the caller’s variable too. It did not.',
        'A deep copy would have protected the array as well — nothing is deep-copied at a call; only the argument slot is copied.',
        'Nothing is special-cased. Every reference type behaves this way, `List<int>` included; the split is reference type versus value type.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why do the three `Bump()` calls all print `1`?',
      options: [
        '`int count = 0;` is a local, re-created and re-initialised on every call, and destroyed when the call returns',
        'Because `count` is never actually incremented — `count = count + 1` returns a new value without storing it',
        'Because `Console.WriteLine` caches the first value it printed',
        'Because the compiler optimised the repeated calls into one',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: locals live on the stack frame for the duration of one call. To remember something between calls you need a field — an instance field, or a `static` one shared by the type.',
        '`count = count + 1` does store: it assigns back into `count`, which is why `1` prints rather than `0`. The reset happens on the NEXT call, at the declaration.',
        'There is no such cache — `Console.WriteLine` prints whatever it is handed, every time.',
        'Even if the calls were inlined, each would still run its own declaration and print. Optimisation is never allowed to change observable output like this.',
      ],
    },
  ],
  extraPractice: [
    {
      question:
        'Which pair of methods is a LEGAL overload set?\n\nA: `int Read(string path)` and `double Read(string path)`\nB: `int Read(string path)` and `int Read(string path, int offset)`',
      options: [
        'Only B — overloads must differ in their parameter list, and the return type is not part of the signature',
        'Only A — overloads must differ in return type',
        'Both A and B are legal',
        'Neither — C# does not allow two methods with the same name',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: B differs by parameter count, so the compiler can always tell the calls apart. A differs only in return type, which the signature excludes — it is a compile error.',
        'Return type is exactly what CANNOT distinguish overloads; a bare call like `Read(path);` would be unresolvable.',
        'A is illegal for that reason. Only B compiles.',
        'C# allows any number of same-named methods, provided their parameter lists differ.',
      ],
    },
    {
      question: 'What does `void` mean as a return type?',
      options: [
        'The method returns no value — it is called for its effect, and `return;` with no expression is how you exit early',
        'The method returns `null`',
        'The method returns 0',
        'The method may return any type it likes',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `void` is the “no value” return type. `Report("startup")` prints; there is nothing to assign from it, and `int x = Report("s");` is a compile error.',
        '`null` is a real value that a reference type can hold; `void` means there is no value at all to receive.',
        'Returning 0 would make the return type `int`. `void` returns nothing whatsoever.',
        'That would be `object` or `dynamic`. `void` is the most specific possible promise: nothing comes back.',
      ],
    },
    {
      question:
        'Given `string Describe(string name, int wheels = 4)`, which call is INVALID?',
      options: [
        '`Describe(4)` — the first parameter has no default, and an `int` is not a `string`',
        '`Describe("scout")`',
        '`Describe("scout", 6)`',
        '`Describe(name: "scout", wheels: 6)`',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `name` is required and typed `string`. Passing `4` fails on both counts — you cannot skip a required parameter by supplying the optional one positionally.',
        'Perfectly valid — `wheels` falls back to its default 4, giving `scout/4`.',
        'Valid: both parameters supplied positionally, giving `scout/6`.',
        'Valid: named arguments are allowed and make multi-number calls readable. They may even be given out of order.',
      ],
    },
    {
      question: 'A method needs to remember a running total across many calls. Where should that total live?',
      options: [
        'In a field — an instance field if each object needs its own total, or a `static` field if the whole type shares one',
        'In a local variable declared at the top of the method',
        'In a parameter with a default value',
        'Nowhere — C# methods cannot retain state, so you must write it to a file',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: locals die with the call, fields live as long as the object (or the program, for `static`). `Rover.Count` is exactly this pattern.',
        'That is the `Bump()` trap — the declaration re-runs on every call, resetting the total to its initial value each time.',
        'A default only supplies a value when the caller omits the argument; it is not storage, and it cannot accumulate anything.',
        'Fields retain state perfectly well in memory; a file is only needed if the value must survive the process exiting.',
      ],
    },
    {
      question:
        'What compiler error does an `int`-returning method get if one branch falls off the end without returning?',
      options: [
        '`CS0161: not all code paths return a value` — a build error, so nothing runs',
        'None — the method returns the default `0` on that path',
        'A runtime `NullReferenceException` the first time that path is taken',
        'A warning only, which you may safely ignore',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the compiler checks every path against the declared return type, and a failed build means the program never executes.',
        'That silent-default behaviour is what C# deliberately refuses to do — it would hide the mistake behind a plausible-looking 0.',
        'Nothing reaches runtime; this is caught at compile time. And `int` cannot be null in the first place.',
        'It is an error, not a warning. Warnings (like `CS8321`, unused local function) let the build succeed; errors stop it dead.',
      ],
    },
  ],
}
