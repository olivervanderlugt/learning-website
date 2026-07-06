import type { Lesson } from '../../types'

export const progData3Lesson: Lesson = {
  nodeId: 'prog-data-3',
  screens: [
    {
      kind: 'explain',
      title: 'Bugs are hypotheses, not mysteries',
      body: [
        'Every programmer writes bugs — the skill that separates beginners from professionals is what happens NEXT. Debugging is the scientific method pointed at your own code.',
        'The loop: observe the wrong output, form ONE specific hypothesis (“the loop stops one element early”), gather evidence (print the values!), and only then change code. One hypothesis, one test, one change.',
        'The anti-pattern is flailing: changing three things at once and hoping. When the output flips, you won’t know which change did it — or what you just broke.',
      ],
      deeper: [
        'Two pro moves: RUBBER-DUCK DEBUGGING — explain the code line by line out loud (to a duck, a friend, anyone); saying it forces you to actually read what it does instead of what you meant. And BISECTION — cut the suspect region in half, test the halves, repeat: you find the bad line in log₂(n) steps, the same halving trick as binary search.',
        'Read error messages BOTTOM to top-of-your-code: the message names the symptom, the line number names the crime scene. Most beginners skip the single most informative sentence the machine will ever give them.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Your line-following robot turns left where it should turn right — but only sometimes. What is the FIRST move of a good debugger?',
      options: [
        'Find the smallest, most reliable way to reproduce it — a minimal test case',
        'Rewrite the turning function from scratch',
        'Add more code to compensate for the wrong turns',
        'Assume the motor hardware is broken',
      ],
      correctIndex: 0,
      reveal:
        'A bug you can reproduce on demand is half-solved; a “sometimes” bug is a nightmare. Shrink the situation until the failure is reliable — one specific line pattern, one speed. Rewriting destroys the evidence, compensating code buries the bug deeper, and blaming hardware without evidence is just hope.',
    },
    {
      kind: 'explain',
      title: 'Worked example: the case of the missing reading',
      body: [
        'A robot sums 4 sensor readings [4, 8, 15, 16]. Expected 43 — it prints 27. Hypothesis time: 43 − 27 = 16… exactly the LAST reading. So the loop probably skips the final element.',
        'Check the loop header: for (i = 0; i < readings.length − 1; i++). There it is — “length − 1” stops the loop one early. The evidence (missing 16) pointed straight at the crime.',
        'This is the OFF-BY-ONE, the most common bug in programming: <, <=, length, length − 1 — one character, one missing element.',
      ],
      deeper: [
        'The print-statement strategy, systematized: print the INPUTS at function entry (is the data what you think?), print the loop variable each pass (does i reach 3?), print just before the return (did the right value get built?). Three prints bracket almost any bug.',
        'The arithmetic of evidence is powerful: output too small by exactly one element → skipped element. Too big by 2× → double-counted. NaN → something undefined leaked into the math. Learn to read the DELTA, not just “it’s wrong”.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Completion step — the opposite off-by-one. A loop over [5, 6, 7] runs for (i = 0; i <= arr.length; i++) and sums arr[i]. In JavaScript, arr[3] is undefined, and 18 + undefined is NaN. What prints?',
      options: [
        'NaN — the loop reads one PAST the end and poisons the total',
        '18 — the extra pass is harmlessly skipped',
        '25 — undefined counts as 7',
        'An error stops the program at arr[3]',
      ],
      correctIndex: 0,
      reveal:
        'i runs 0, 1, 2, 3 — four passes over a three-element array. arr[3] is undefined, and any arithmetic with undefined is NaN, which then infects every later addition. JS doesn’t crash on out-of-bounds reads — it silently hands you undefined, which is why <= vs < matters so much here.',
    },
    {
      kind: 'explain',
      title: 'Tests: bugs caught before they hatch',
      body: [
        'A TEST is just code that checks code: run the function on a known input, compare to the known answer, complain loudly on mismatch. sumReadings([4,8,15,16]) === 43 — one line, permanent vigilance.',
        'The pros write tests for the EDGE CASES first, because that’s where bugs live: the empty list (should be 0), a single element, the largest value. Typical inputs almost always work; edges almost never do on the first try.',
        'Once a test exists, that bug can never sneak back unnoticed — every future change re-runs the check. That’s called a regression test, and it’s why big codebases don’t collapse.',
      ],
      deeper: [
        'Robot code raises the stakes: a bug on hardware can bend metal. Real robot teams run their code against SIMULATED sensors and motors first — thousands of tests per commit, zero broken robots. The PID sim you tuned is exactly that idea.',
        'The habit to build now: every time you FIX a bug, write the test that would have caught it, and keep it forever. Your test suite becomes a museum of every mistake you’ll never make twice.',
      ],
      links: [{ nodeId: 'math-logic', label: 'A test is a proposition: Logic & Truth' }],
    },
    {
      kind: 'predict',
      question:
        'Independent step. You must pick ONE input to test a “sum the readings” function before it ships on a robot. Which catches the most bugs?',
      options: [
        'The empty list [] — the edge case where wrong initial values and off-by-ones show themselves',
        '[1, 2, 3] — a nice typical case',
        'A huge random list — more data, more coverage',
        'The same list the demo uses',
      ],
      correctIndex: 0,
      reveal:
        'The empty list is where assumptions die: a wrong starting total, a loop that assumes “at least one element”, an off-by-one — all fail loudly on []. Typical inputs pass by accident all the time; random data fails without telling you WHY. Edges first, always.',
    },
    {
      kind: 'code',
      prompt:
        'Fix the bug from the worked example. This function loses the last sensor reading — expected 43, it returns 27. Find the off-by-one in the loop header, fix it, and run: both lines must come out right.',
      starter: `function sumReadings(readings) {
  let total = 0
  for (let i = 0; i < readings.length - 1; i++) {
    total = total + readings[i]
  }
  return total
}
const r = [4, 8, 15, 16]
print('sum:', sumReadings(r))
print('all 4 readings counted?', sumReadings(r) === 43)`,
      expected: `sum: 43
all 4 readings counted? true`,
      hint: 'The loop must visit indexes 0, 1, 2 AND 3 — change the condition to: i < readings.length',
      success:
        'One character (“− 1”) was eating a sensor reading. Notice the last print is a TEST — it checks the answer, not just shows it. Leave lines like that in your code and this bug can never return silently.',
    },
    {
      kind: 'quiz',
      question: 'Your function returns the wrong answer. What does a disciplined debugger do FIRST?',
      options: [
        'Find the smallest input that still reproduces the failure',
        'Rewrite the function a different way',
        'Change several suspicious lines at once and re-run',
        'Add a comment warning that the function is unreliable',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a minimal, reliable reproduction shrinks the haystack before you hunt the needle — and proves later that the fix worked.',
        'Rewriting may accidentally fix it — but you learn nothing, and whatever misunderstanding caused it will strike again elsewhere.',
        'The shotgun approach: if the output changes you can’t tell which change mattered, and you may have traded one bug for two.',
        'Documentation of a bug is not a fix — the robot doesn’t read comments before turning the wrong way.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'In JavaScript, a loop condition of i <= arr.length (instead of <) makes a sum come out as NaN. Why?',
      options: [
        'The final pass reads past the array’s end, gets undefined, and arithmetic with undefined is NaN',
        'The computer rounds the sum incorrectly',
        '<= is not valid JavaScript',
        'The array is deleted after its last element is read',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: valid indexes end at length − 1, so the extra pass reads arr[length] → undefined → total becomes NaN and stays NaN. JS fails silently on out-of-bounds reads.',
        'No rounding is involved — a single poisonous undefined turns the whole total into Not-a-Number.',
        '<= is perfectly valid syntax — that’s exactly why this bug compiles, runs and quietly ruins the answer.',
        'Arrays aren’t consumed by reading — the out-of-bounds READ is the problem, not any deletion.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What makes something a regression test?',
      options: [
        'It re-checks a previously fixed bug on every future change, so the bug can’t quietly return',
        'It tests only brand-new features',
        'It runs the program backwards',
        'It measures how fast the code runs',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: “regression” means sliding back to a broken state — the test is a permanent guard on ground you already won.',
        'New-feature tests matter too, but the regression test’s defining job is protecting old fixes from new changes.',
        'Nothing runs backwards — the name refers to the code regressing, not reversing.',
        'That’s a performance benchmark — related discipline, different question.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Which set of inputs makes the strongest quick test suite for a “find the largest reading” function?',
      options: [
        'An empty list, a one-element list, and a list where the largest value comes first',
        'Three different typical lists of medium length',
        'One very long random list',
        'The list used in the documentation example',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: each edge attacks a classic bug — empty (wrong initial value), single (loop boundary), largest-first (a “start from element 0, compare from 1” slip). Three inputs, three traps.',
        'Typical inputs overlap — they all pass or fail together, exercising the same happy path three times.',
        'Random data has poor aim: when it fails you must first figure out what property triggered it, and next run it may not fail at all.',
        'The documented example is the one input the author definitely tried — the LEAST likely place a bug survives.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You print the function’s inputs at entry and the loop index each pass, and the inputs are already wrong. What did you just learn?',
      options: [
        'The bug is UPSTREAM — this function is innocent; investigate its caller',
        'The print statements corrupted the data',
        'The function’s loop must still be at fault',
        'Nothing — prints prove nothing',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: evidence places the crime before this function was ever called. That single print just saved you an hour of staring at innocent loop code.',
        'Printing a value doesn’t change it — that’s exactly what makes prints safe evidence.',
        'The loop never had a chance — garbage in, garbage out. Fix the caller first, then re-test.',
        'Prints are measurements — they narrow WHERE the bug lives, which is most of the battle.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'A sum function returns exactly double the right answer. Best first hypothesis?',
      options: [
        'Each element is added twice — maybe a nested or duplicated addition',
        'The array is twice as long as expected',
        'The computer’s arithmetic is broken',
        'The base case is missing',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: read the delta — exactly 2× points at double-counting, not randomness. Check for a repeated “total +=” or a loop visiting elements twice.',
        'Possible, but you’d then expect specific extra VALUES, not a clean doubling of the whole sum — print the array length to rule it out in one move.',
        'CPU arithmetic errors are essentially never the answer — suspect your code first, always.',
        'Missing base cases cause infinite recursion or crashes, not clean 2× answers.',
      ],
    },
    {
      question: 'Why explain your buggy code aloud to a rubber duck?',
      options: [
        'Verbalizing forces you to read what the code ACTUALLY does, not what you meant it to do',
        'The duck sometimes spots the bug',
        'It is a superstition with no mechanism',
        'It only works with another programmer present',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: your brain autocorrects silently when you skim your own code; speaking line-by-line disables the autocorrect and the mismatch pops out.',
        'The duck contributes nothing but patience — the mechanism is entirely in your own narration.',
        'The mechanism is real and well-known: forced line-by-line articulation beats silent re-reading.',
        'A human helps, but the effect works alone — that’s the whole point of using a duck.',
      ],
    },
    {
      question: 'A bug appears only in a 300-line function. Fastest way to localize it?',
      options: [
        'Bisect: disable/print at the halfway point, decide which half holds the bug, repeat',
        'Read all 300 lines from top to bottom, slowly',
        'Rewrite the whole function',
        'Run it many times hoping the bug reveals itself',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: halving finds the line in about log₂(300) ≈ 8 checks — the same divide-and-conquer that makes binary search fast.',
        'Careful reading works but costs 300 lines of attention; bisection gets there in ~8 measurements.',
        'A rewrite risks new bugs and teaches you nothing about the old one.',
        'Repetition without new evidence is hope, not debugging — change what you MEASURE, not how often you run.',
      ],
    },
    {
      question: 'When is the ideal moment to write the test for a bug you just fixed?',
      options: [
        'Immediately, before moving on — it guards the fix forever as a regression test',
        'Never — the bug is fixed, so the test is pointless',
        'Only when the codebase is finished',
        'Only if the bug was in someone else’s code',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: you have the failing input in hand right now — one assert turns today’s pain into permanent protection.',
        'Fixed bugs return: a future edit to the same lines can silently reintroduce it. The test makes that impossible to miss.',
        'Codebases are never finished — and the memory of the failing input fades in days.',
        'Your own bugs deserve tests most of all — they mark exactly where your assumptions and reality disagree.',
      ],
    },
  ],
}
