import type { Lesson } from '../../types'

export const progFunctionsLesson: Lesson = {
  nodeId: 'prog-functions',
  screens: [
    {
      kind: 'explain',
      title: 'Naming a bundle of steps',
      body: [
        'Once programs grow, repeating the same lines everywhere becomes a nightmare. A function packages steps under a name so you can reuse them by just saying the name.',
        'Think of it as teaching the computer a new verb: define driveForward() once, then call it whenever you like.',
        'Run this one to see a function being called.',
      ],
      links: [{ nodeId: 'prog-variables', label: 'Refresher: Variables & Control Flow' }],
    },
    {
      kind: 'code',
      prompt: 'This defines a function, then calls it. Predict the output, then Run.',
      starter: "function sayHi() {\n  print('hi from a function')\n}\n\nsayHi()",
      expected: 'hi from a function',
      success:
        'Defining a function (function name() { … }) does nothing on its own — only CALLING it (sayHi()) runs the steps inside. Define once, call as often as you like.',
    },
    {
      kind: 'predict',
      question: 'Functions can hand a value back with return. What does this print?\n\nfunction square(n) {\n  return n * n\n}\nprint(square(4))',
      options: ['8', '16', '4', 'nothing'],
      correctIndex: 1,
      reveal:
        'square(4) runs with n = 4, computes 4 × 4 = 16, and returns it. print then shows 16. A parameter (n) is an input the caller fills in; return is the answer the function sends back — inputs in, answer out.',
    },
    {
      kind: 'code',
      prompt: 'Finish this function so it returns DOUBLE its input. (Right now it returns nothing.)',
      starter: 'function double(n) {\n  return  // <-- return n * 2\n}\nprint(double(21))',
      expected: '42',
      hint: 'Write: return n * 2',
      success:
        'return n * 2 sends back twice the input, so double(21) is 42. A function with a parameter and a return is a reusable mini-machine: value in, value out.',
    },
    {
      kind: 'code',
      prompt: 'All yours: write a function named area that returns width × height, then it gets called for you.',
      starter: '// write: function area(width, height) that returns width * height\n\nprint(area(6, 7))',
      expected: '42',
      hint: 'function area(width, height) { return width * height }',
      success:
        'You just built a reusable tool with two inputs. area(6, 7) is 42, and you could call area again with any numbers — that reuse is the whole point.',
    },
    {
      kind: 'explain',
      title: 'Abstraction: thinking in bigger blocks',
      body: [
        'Functions let you stop thinking about details. Once driveForward() and turnLeft() exist, you write patrol() by calling them — you think in verbs, not motor commands.',
        'This layering is called abstraction, and it’s the only reason humans can build million-line robot codebases without drowning.',
        'Lock it in — quiz from memory.',
      ],
      deeper: [
        'Each function is a black box with a contract: given these inputs, it produces this output (or effect), and you can use it without knowing its insides — just like you use print() without knowing how it draws text.',
        'Good functions do ONE thing and have a clear name. A robot’s software is a tower of them: readSensor() feeds avoidObstacle() feeds navigate() feeds runMission() — each layer trusting the one below.',
        'This is the same idea as the logic gates you built: a NAND hides transistors, an adder hides NANDs, a CPU hides adders. Abstraction is how complexity stays manageable at every level of a machine.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does the return statement do in a function?',
      options: [
        'Sends a value back to whatever called the function',
        'Prints a value to the screen',
        'Restarts the function',
        'Deletes the function',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: return hands a result back to the caller, who can store or use it — inputs in, answer out.',
        'Printing is a separate action (print()); a function can return a value without printing anything.',
        'return ends the function and hands back a value — it doesn’t loop or restart it.',
        'Nothing is deleted; return simply ends the call and passes a value back.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What is a function parameter?',
      options: [
        'A named input the caller fills in each time',
        'The function’s name',
        'A permanent global value',
        'The line that calls the function',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a parameter (like n in square(n)) is a slot for an input the caller supplies, letting one function work on many values.',
        'The name is how you call it; the parameter is the input it receives — different things.',
        'Parameters are local to the call, not permanent globals — each call gets its own.',
        'That’s the call site; the parameter is the variable inside the definition that receives the passed value.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does defining a function but never calling it produce no output?',
      options: [
        'Defining only teaches the steps; calling actually runs them',
        'Functions are disabled by default',
        'You must print the function first',
        'It’s a bug in JavaScript',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a definition just stores the recipe under a name; the steps run only when you call it.',
        'Nothing is disabled — an uncalled function is simply a recipe no one has cooked yet.',
        'You don’t print functions to run them; you call them with name().',
        'It’s intended behavior everywhere: definitions describe, calls execute.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why is abstraction (hiding details behind named functions) essential for big programs?',
      options: [
        'It lets you reason in higher-level ideas instead of every low-level detail',
        'It makes programs run faster',
        'It removes the need for variables',
        'It is only useful for tiny scripts',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: naming a block lets you think “patrol()” instead of a hundred motor lines — the only way large systems stay understandable.',
        'Abstraction is about human understanding, not raw speed; a call has a tiny cost, in fact.',
        'Functions USE variables (parameters, locals) — abstraction organizes code, it doesn’t remove variables.',
        'It matters MOST in large programs — tiny scripts can survive without it, million-line robot code cannot.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A robot’s code has readSensor(), avoidObstacle(), and navigate(), each calling the ones below it. This tower of functions is an example of…',
      options: [
        'Layered abstraction',
        'A syntax error',
        'An infinite loop',
        'Hardware design',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: higher functions build on lower ones, each hiding detail — the same layering as gates → adders → CPU.',
        'It’s well-structured code, not an error — layering is exactly how good programs are organized.',
        'Calling other functions isn’t looping; each returns and control moves on. A loop repeats the SAME block.',
        'This is software structure; the same principle appears in hardware too, but here it’s about organizing code.',
      ],
    },
  ],
}
