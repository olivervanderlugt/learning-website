import type { Lesson } from '../../types'

export const dbRelationalLesson: Lesson = {
  nodeId: 'db-relational',
  screens: [
    {
      kind: 'explain',
      title: 'Data that must survive',
      body: [
        'Your program’s arrays and objects die with the process — one reboot and the robot forgets every map it ever built. Data that matters needs a home OUTSIDE the program: a database.',
        'The model that won (50 years and counting): TABLES. Rows are things, columns are their attributes, and every row has a unique KEY.',
        'A robot fleet: a `robots` table (id, name, model), a `missions` table (id, robot_id, start, status). Boring-looking. Unreasonably powerful.',
      ],
      links: [{ nodeId: 'prog-data', label: 'Refresher: arrays & records' }],
    },
    {
      kind: 'predict',
      question: 'The missions table stores which robot ran each mission. Should it store the robot’s NAME (“Rusty”) or its ID (7)?',
      options: [
        'The ID — names change and duplicate; the key is forever, and the name lives in ONE place',
        'The name — it’s human-readable',
        'Both, copied into every mission row',
        'Neither; missions don’t need robots',
      ],
      correctIndex: 0,
      reveal:
        'Store the FACT once. If “Rusty” is renamed “Rusty II”, a name-based missions table now lies about history — or needs a thousand rows edited. With robot_id 7, the rename touches ONE row in `robots`, and every mission stays correct. Keys-not-copies is the core discipline (normalization): every fact has exactly one home, so nothing can disagree.',
    },
    {
      kind: 'code',
      prompt: 'A foreign key is a lookup you’ve already met. Find mission 2’s robot NAME by following its robot_id into the robots “table” (a hash map by id).',
      starter:
        "let robots = { 7: 'Rusty', 8: 'Bolt' }              // id -> name\nlet missions = [\n  { id: 1, robot_id: 8, status: 'done' },\n  { id: 2, robot_id: 7, status: 'active' },\n]\n\nlet mission = missions[1]        // mission with id 2\n// look up the robot's name via the foreign key\nlet name =\n\nprint(mission.status)\nprint(name)",
      expected: 'active\nRusty',
      hint: 'robots[mission.robot_id]',
      success:
        'You just performed a JOIN by hand: follow the foreign key (robot_id 7) into the other table, O(1) via the key. SQL’s JOIN does exactly this across millions of rows — the relational model is “hash maps with discipline and a survival guarantee”.',
    },
    {
      kind: 'explain',
      title: 'Why not just save a file?',
      body: [
        'You could dump JSON to disk. Databases earn their keep on four promises: fast search in millions of rows (indexes), many writers without corruption (transactions), enforced rules (no mission without a valid robot_id), and surviving crashes mid-write.',
        'Each promise is genuinely hard to build; the database industry is those four problems solved and battle-tested.',
        'Rule of thumb: config → a file is fine. Anything that grows, gets queried, or is written concurrently → a database.',
      ],
      deeper: [
        'The relational model (Codd, 1970) was radical for what it REMOVED: no pointers to chase, no fixed access paths — just declare tables and query anything by content. Forty years of “post-relational” challengers later, SQL still runs finance, logistics and most of the web.',
        'The rules-enforcement promise is underrated: `robot_id REFERENCES robots(id)` makes orphan missions IMPOSSIBLE — the database rejects them. Compare debugging a JSON file where a typo’d id silently breaks the dashboard a week later.',
        'SQLite deserves a robot builder’s attention: a full SQL database in a single file, no server, running on everything from phones to Mars helicopters’ ground tooling. Your robot’s mission log wants SQLite long before it wants a database server.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In a relational table, a PRIMARY KEY is…',
      options: [
        'A unique identifier per row — the handle other tables use to refer to it',
        'The most important data column',
        'A password protecting the table',
        'The first row of the table',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: uniqueness is the point — one key, one row, forever; foreign keys elsewhere point at it.',
        '“Primary” means identifying, not important — id 7 says nothing interesting about Rusty except which row is his.',
        'Access control exists, but keys are identity, not security.',
        'Row order is meaningless in the relational model — tables are sets, not lists.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Storing the robot’s name in every mission row (instead of its id) eventually causes…',
      options: [
        'Inconsistency — a rename leaves old rows disagreeing with new ones about the same robot',
        'Faster queries with no downside',
        'Automatic deduplication by the database',
        'Nothing; copies are always safe',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: duplicated facts drift apart — the classic update anomaly that normalization (one fact, one home) exists to prevent.',
        'Sometimes marginally faster to read, yes — that’s the trade — but the correctness risk is the story.',
        'The database faithfully stores whatever you duplicate; discipline is the schema designer’s job.',
        'Copies of MUTABLE facts are time bombs.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A foreign key like missions.robot_id → robots.id does what?',
      options: [
        'Links each mission to its robot, and (if enforced) makes missions with nonexistent robots impossible',
        'Copies the whole robot row into the mission',
        'Encrypts the relationship',
        'Speeds up the robots table',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: reference + constraint — the JOIN path for queries and a guarantee against orphan rows.',
        'Nothing is copied — that’s the point; the data stays in one home.',
        'No cryptography — it’s about referential integrity.',
        'Performance comes from indexes; foreign keys are about correctness.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Which robot data most clearly deserves a database over a JSON file?',
      options: [
        'The ever-growing mission log that the dashboard queries while new missions write to it',
        'The robot’s name and wheel diameter',
        'A constant like PI used in control math',
        'Nothing; files always suffice',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: grows forever + queried by content + concurrent readers/writers — all four database promises needed at once.',
        'Two stable values = config file territory; a database would be ceremony.',
        'Constants belong in code.',
        'Files fail exactly where the log lives: search speed, concurrent writes, crash-during-write.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The relational model has outlived dozens of “successors” since 1970 largely because…',
      options: [
        'Declaring data as tables + querying by content keeps ANY future question answerable — no baked-in access paths',
        'Governments mandated SQL by law',
        'Nobody tried alternatives',
        'Tables are the fastest structure for every workload',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: Codd’s insight — store facts neutrally, decide questions later. Systems with hardwired access paths answer yesterday’s questions fast and tomorrow’s never.',
        'No mandate — it won on merit and momentum.',
        'Many tried (object DBs, XML DBs, NoSQL wave) — several found real niches; none displaced the core.',
        'Specialized stores beat tables per-workload — the general model wins on flexibility, not raw speed.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Your missions table needs the robot’s battery level AT MISSION TIME. Where does it go?',
      options: [
        'A column in missions — it’s a fact about the mission moment, not about the robot now',
        'Overwrite a battery column in robots each mission',
        'A separate file per mission',
        'Don’t store it; recompute later',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: “one fact, one home” cuts both ways — battery-at-mission-start belongs to the MISSION. The robots table holds current state; missions hold history.',
        'Overwriting destroys history — every past mission would show today’s battery.',
        'A thousand files reinvent the table, badly.',
        'Historical sensor state is unrecomputable — store it or lose it.',
      ],
    },
    {
      question: 'Why is SQLite (single-file, serverless SQL) beloved for embedded and robot use?',
      options: [
        'Full transactional SQL with zero server administration — the file IS the database',
        'It is faster than every server database',
        'It never needs a schema',
        'It only runs in the cloud',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: open a file, get ACID transactions and SQL — perfect for a mission log on a robot’s SD card.',
        'Big servers win on concurrency and scale; SQLite wins on simplicity and footprint.',
        'It’s fully schema’d SQL — the discipline comes along.',
        'The opposite — it thrives precisely where there is no cloud.',
      ],
    },
  ],
}
