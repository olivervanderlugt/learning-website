import type { Lesson } from '../../types'

export const dbSqlLesson: Lesson = {
  nodeId: 'db-sql',
  screens: [
    {
      kind: 'explain',
      title: 'Say WHAT, not HOW',
      body: [
        'Every loop you’ve written says HOW: visit each element, test, collect. SQL flips it — you DECLARE what you want, and the database figures out how.',
        '`SELECT name FROM missions WHERE status = \'failed\'` — no loop, no index variable. The query planner picks the strategy (scan? use an index?) for you.',
        'To demystify it, let’s build what SQL does with the tools you already have.',
      ],
      links: [{ nodeId: 'db-relational', label: 'Refresher: Tables & Relations' }],
    },
    {
      kind: 'code',
      prompt: 'This is `SELECT name FROM missions WHERE duration > 60` as a loop. Complete the WHERE condition.',
      starter:
        "let missions = [\n  { name: 'patrol-A', duration: 45 },\n  { name: 'deep-clean', duration: 90 },\n  { name: 'patrol-B', duration: 50 },\n  { name: 'survey', duration: 120 },\n]\n\nfor (let i = 0; i < missions.length; i = i + 1) {\n  let m = missions[i]\n  if (/* duration above 60 */) {\n    print(m.name)\n  }\n}",
      expected: 'deep-clean\nsurvey',
      hint: 'm.duration > 60',
      success:
        'SELECT = what you print, FROM = what you loop over, WHERE = your if-condition. Every SQL query compiles down to loops like this — the magic is that the database CHOOSES the loop (or skips it via an index) so you don’t have to.',
    },
    {
      kind: 'predict',
      question: '`SELECT * FROM missions WHERE robot_id = 7` on 10 million rows. Without an index, what must the database do?',
      options: [
        'Scan all 10 million rows, testing each — O(n), your linear search',
        'Jump straight to the matching rows by magic',
        'Ask the operating system which rows match',
        'Refuse queries that big',
      ],
      correctIndex: 0,
      reveal:
        'Declarative syntax doesn’t repeal Big-O: with no better structure, WHERE is a full-table linear scan. The fix is an INDEX on robot_id — a sorted/hashed side-structure making the lookup O(log n) or O(1), exactly your data-structures trade-off. Next lesson builds on this; for now: SQL hides the HOW, but the how still exists and still has a cost.',
    },
    {
      kind: 'code',
      prompt: 'A JOIN is a lookup inside a loop. List each mission with its robot’s name — complete the lookup.',
      starter:
        "let robots = { 7: 'Rusty', 8: 'Bolt' }\nlet missions = [\n  { name: 'patrol-A', robot_id: 8 },\n  { name: 'survey', robot_id: 7 },\n]\n\n// SELECT missions.name, robots.name FROM missions JOIN robots ...\nfor (let i = 0; i < missions.length; i = i + 1) {\n  let m = missions[i]\n  let robotName =   // <-- follow the foreign key\n  print(m.name + ' by ' + robotName)\n}",
      expected: 'patrol-A by Bolt\nsurvey by Rusty',
      hint: 'robots[m.robot_id]',
      success:
        'JOIN = for each row, follow the key into the other table. Real databases choose between this (with a hash map: “hash join”) and other strategies per query. You now know what the most feared SQL keyword actually does: a loop and a lookup.',
    },
    {
      kind: 'explain',
      title: 'The rest of the verbs',
      body: [
        'You’ve met the core: SELECT (project columns), WHERE (filter rows), JOIN (connect tables). The remaining workhorses: ORDER BY (sort), GROUP BY + COUNT/AVG (summarize per group), INSERT/UPDATE/DELETE (write).',
        '“Average mission duration per robot” = GROUP BY robot_id, AVG(duration) — one line replacing your counting-loop pattern from the structures lesson.',
        'Six verbs cover ~95% of real-world querying. The skill is composing them, and knowing what they cost.',
      ],
      deeper: [
        'GROUP BY is your “object as counter” pattern industrialized: the database builds a map keyed by group, accumulating counts/sums per key — the exact code you wrote for command-counting, chosen and optimized automatically.',
        'Query planners are why declarative wins: the SAME query runs as a scan today and an index lookup tomorrow (after you add the index) — zero code changes. Imperative loops would each need rewriting.',
        'One security preview you can’t learn too early: NEVER paste user input into SQL strings. `"WHERE name = \'" + userInput + "\'"` plus a malicious input like `\'; DROP TABLE missions; --` = SQL injection, the most classic attack on the web. Parameterized queries (placeholders) fix it completely — the security domain will revisit this.',
      ],
    },
    {
      kind: 'quiz',
      question: '“Declarative” means SQL queries specify…',
      options: [
        'WHAT result you want; the database chooses HOW to compute it',
        'The exact loop the database must run',
        'Only the table names, never conditions',
        'The physical disk location of rows',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: you state the shape of the answer; the planner picks scan vs index vs join strategy — and can pick differently as data grows.',
        'The loop is the planner’s business — that freedom is the whole point.',
        'WHERE conditions are central — filtering is most of querying.',
        'Physical layout is deliberately hidden — Codd’s big idea.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In the loop translation, WHERE corresponds to…',
      options: [
        'The if-condition inside the loop',
        'The print statement',
        'The array being looped over',
        'The loop counter i',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: WHERE filters rows exactly as your `if (m.duration > 60)` did.',
        'Printing/collecting is SELECT — choosing what comes OUT of matching rows.',
        'The looped array is FROM — the table.',
        'The counter is plumbing the database handles invisibly.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A JOIN between missions and robots fundamentally does what?',
      options: [
        'For each mission row, finds the robot row its foreign key points to, combining them',
        'Merges the two tables permanently into one',
        'Deletes rows that don’t match',
        'Copies robots into every mission on disk',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: loop + key lookup, per row — producing combined result rows while the tables stay untouched.',
        'The result is temporary query output; the stored tables never change.',
        'Non-matching rows are just absent from THIS result (unless you ask otherwise) — nothing is deleted.',
        'No copying to disk — normalization stays intact; the join happens at query time.',
      ],
    },
    {
      kind: 'quiz',
      question: '“Average mission duration per robot” uses which combination?',
      options: [
        'GROUP BY robot_id with AVG(duration)',
        'WHERE robot_id = AVG',
        'ORDER BY duration',
        'Three nested JOINs',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: partition rows by robot, aggregate within each group — the counting-map pattern as a one-liner.',
        'AVG isn’t a filter value — aggregation and filtering are different verbs.',
        'Sorting arranges rows; it computes nothing.',
        'One table suffices — grouping, not joining, is the tool here.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does adding an index later speed up an EXISTING query with zero code changes?',
      options: [
        'The planner re-chooses the strategy — declarative queries never specified the old slow way',
        'Indexes rewrite your application code automatically',
        'It doesn’t; queries must be rewritten',
        'Indexes make the table physically smaller',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the query said WHAT; yesterday the best HOW was a scan, today it’s the index. Declarativeness is future-proofing.',
        'Your code is untouched — the change is entirely inside the planner’s options.',
        'That’s the imperative world’s problem — the one SQL was designed to escape.',
        'Indexes ADD storage — they buy speed with space.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'SELECT vs WHERE — the difference is…',
      options: [
        'WHERE picks which ROWS survive; SELECT picks which COLUMNS of them you see',
        'They are synonyms',
        'SELECT filters rows; WHERE sorts them',
        'WHERE only works on numbers',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: filter rows (WHERE), project columns (SELECT) — vertical vs horizontal slicing.',
        'Different clauses, orthogonal jobs.',
        'Backwards, and sorting is ORDER BY.',
        'WHERE compares strings, dates, anything comparable.',
      ],
    },
    {
      question: 'Why is `"...WHERE name = \'" + userInput + "\'"` a famous security hole?',
      options: [
        'Malicious input can close the quote and inject its own SQL commands (SQL injection)',
        'String concatenation is too slow',
        'User input is always misspelled',
        'It only works on Sundays',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: input like `\'; DROP TABLE missions; --` becomes executable query text. Parameterized queries keep input as DATA, never code — the fix is total and costs nothing.',
        'Performance is fine; the catastrophe is interpreting data as code.',
        'Spelling is harmless; crafted syntax is the weapon.',
        'It works every day, unfortunately.',
      ],
    },
  ],
}
