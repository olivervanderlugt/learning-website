import type { Lesson } from '../../types'

export const dbExamLesson: Lesson = {
  nodeId: 'db-exam',
  screens: [
    {
      kind: 'explain',
      title: 'Module exam — data that can’t lie',
      body: [
        'Ten fresh questions across the whole Databases module — tables and keys, SQL traces, indexes and transactions. Nothing recycled from the lesson quizzes, and every query trace happens in your head: no runner, no notes.',
        'Score 80% and the module is sealed. Below that? You lose nothing — you’ll see exactly which idea slipped, review it, and retake.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Your mapping stack has two tables: maps (id, name) and waypoints (id, map_id, x, y). Which column is the FOREIGN key?',
      options: [
        'waypoints.map_id — it points at maps.id, tying each waypoint to its map',
        'maps.id — it’s the id that all the waypoints mention',
        'waypoints.id — it’s the id column in the child table',
        'Both id columns — any column named id is a foreign key',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the foreign key is the POINTER, living in the referring table — waypoints.map_id reaches into maps and grabs one row.',
        'maps.id is the primary key being pointed AT — the target, not the pointer. Foreign keys live on the referring side.',
        'waypoints.id identifies each waypoint itself — that’s the waypoints table’s own primary key, referencing nothing.',
        'Names don’t make keys — the ROLE does. Each table’s id is its primary key; only map_id reaches across tables.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A parts table for your robot: serial_no (unique per part), part_name, supplier, price. Which column can serve as the PRIMARY key?',
      options: [
        'serial_no — it’s the only column guaranteed unique per row',
        'part_name — names are the most human-readable choice',
        'price — numbers make faster keys than text',
        'Whichever column comes first in the table',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a primary key must identify exactly ONE row, forever — uniqueness is the whole job description, and serial_no is the only column that has it.',
        'Readable, yes — but you’ll stock two “M3 bolt” rows eventually, and then part_name points at two rows at once. Duplicates disqualify it.',
        'Being numeric doesn’t help — two different parts can cost €4.99, and a key that matches two rows identifies neither.',
        'Column order is meaningless in the relational model — tables are sets of rows, not spreadsheets. Position confers nothing.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'battery_log holds four rows: (robot 2, 85%), (robot 5, 40%), (robot 2, 15%), (robot 9, 60%). What does SELECT robot_id FROM battery_log WHERE level < 50 return?',
      options: [
        'Two rows: robot 5, then robot 2',
        'One row: robot 5 — each robot appears at most once in results',
        'Two rows: robots 2 and 9',
        'All four rows — WHERE only chooses which columns you see',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: test each row against level < 50 — 85 no, 40 yes, 15 yes, 60 no. Two survivors, robots 5 and 2.',
        'Queries return matching ROWS, not distinct robots — robot 2 appearing twice in the table means it can appear again in results. (Deduplication needs an explicit DISTINCT.)',
        'That’s WHERE level > 50 — you flipped the comparison. 85 and 60 are the levels ABOVE fifty.',
        'Backwards: WHERE filters rows (horizontal cut), SELECT picks columns (vertical cut). A WHERE that kept every row would filter nothing.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'robots: (id 1, ‘Ada’), (id 2, ‘Turing’). missions: (m1, robot_id 2), (m2, robot_id 2), (m3, robot_id 1). What does SELECT robots.name FROM missions JOIN robots ON robots.id = missions.robot_id return?',
      options: [
        'Three rows — Turing, Turing, Ada: one output row per mission',
        'Two rows — Turing, Ada: duplicate names collapse automatically',
        'Six rows — every mission paired with every robot',
        'The missions table now permanently gains a name column',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: JOIN loops over missions and follows each robot_id — m1→Turing, m2→Turing, m3→Ada. Turing ran two missions, so Turing prints twice.',
        'Nothing collapses uninvited — three missions in, three result rows out. Trace the loop: JOIN is per-ROW, not per-robot.',
        'Six rows is what you’d get with NO ON condition — the every-with-every cross join. The ON clause is exactly what keeps each mission matched to its ONE robot.',
        'Query results are temporary output — the stored tables never change. That’s the beauty: normalization stays intact while the join happens fresh at query time.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'dockings: (bay 1, ‘ok’), (bay 2, ‘failed’), (bay 1, ‘failed’), (bay 3, ‘ok’). What does SELECT COUNT(*) FROM dockings WHERE bay = 1 AND result = ‘failed’ return?',
      options: ['1', '2', '3', '0'],
      correctIndex: 0,
      explanations: [
        'Correct: AND demands BOTH conditions per row — only (bay 1, ‘failed’) qualifies. One row, count 1.',
        '2 counts one condition alone — two rows are bay 1, and two rows are ‘failed’, but only ONE row is both. AND is stricter than either half.',
        '3 is the OR count — rows matching bay = 1 OR ‘failed’ (the first three). You widened the net; AND narrows it.',
        'AND isn’t impossible to satisfy — row three is a bay-1 docking that failed. Check each row against both conditions before declaring zero.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'You meant to park one robot but ran UPDATE robots SET status = ‘idle’ — no WHERE clause. What happens?',
      options: [
        'EVERY robot’s status becomes ‘idle’ — no WHERE means the whole table matches',
        'Only the first row changes',
        'An error — UPDATE requires a WHERE clause',
        'Nothing changes until you add the WHERE later',
      ],
      correctIndex: 0,
      explanations: [
        'Correct — and it’s a classic production disaster. WHERE is a filter; omitting it filters nothing, so the update sweeps the entire fleet. Habit worth building: write the WHERE first.',
        'Row order carries no meaning in the relational model, so “first” isn’t special — the statement matches all rows equally.',
        'Painfully, no — SQL happily accepts it. The syntax is legal; only the blast radius is wrong.',
        'The statement executes immediately and completely — SQL doesn’t wait around for clauses you meant to write.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Missions still reference robot 4 via an ENFORCED foreign key (no cascade configured). You run DELETE FROM robots WHERE id = 4. What happens?',
      options: [
        'The database REJECTS the delete — orphan missions are impossible by rule',
        'The robot goes; its missions silently point at nothing',
        'The missions are automatically deleted along with it',
        'The missions’ robot_id is silently reset to 0',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: referential integrity is a promise the database keeps FOR you — a delete that would strand missions is refused. Handle the missions first, or the robot stays.',
        'That’s the JSON-file failure mode — dangling references breaking dashboards a week later. Enforcement exists precisely to make this outcome impossible.',
        'Cascade deletion exists but is OPT-IN (ON DELETE CASCADE) — the default is refusal, because silently erasing mission history is rarely what you meant.',
        'Rewriting to a sentinel is also opt-in (ON DELETE SET NULL, roughly) — and 0 would just be a dangling reference wearing a disguise. The default is to block the delete.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Your dashboard queries battery_history with WHERE recorded_at BETWEEN yesterday AND now. Which index type fits?',
      options: [
        'B-tree — sorted order lets it find the range start in O(log n) and walk forward',
        'Hash — O(1) beats O(log n), so it wins everywhere',
        'No index — SQL is declarative, so the query is already fast',
        'Either one — all index types handle all query shapes',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a BETWEEN is a range, and ranges need ORDER — binary-search to yesterday, then read timestamps off sequentially until now.',
        'Hash is O(1) for EXACT matches only — hashing scatters neighboring timestamps to unrelated buckets, so “everything between” would mean hashing every possible instant. Ranges are B-tree territory.',
        'Declarative syntax hides the HOW, but the how still exists — without an index this WHERE is a full-table scan, one row at a time through months of history.',
        'Index types are specialists, not interchangeable parts — the data-structure menu (sorted tree vs hash map) decides which queries each can serve.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A transfer transaction removes a package row from shelf_a and adds it to shelf_b. Power dies BETWEEN the two writes. On reboot the package sits safely in shelf_a, as if nothing happened. Which ACID property did the work?',
      options: [
        'Atomicity — the half-finished transaction rolled back, so “removed but never added” can’t survive',
        'Durability — the database remembered the removal',
        'Isolation — no other transaction saw the transfer in progress',
        'Consistency — the C guarantees data always looks right, transaction or not',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: all-or-nothing — the transaction never committed, so on reboot its half-done work is undone and the package is exactly where it started. No vanished packages, ever.',
        'Durability protects COMMITTED work — this transaction never reached COMMIT, so the right move was to FORGET the removal, not remember it.',
        'Isolation governs what CONCURRENT transactions can see of each other — true and useful, but it isn’t what restored the row after the crash.',
        'Consistency is the RESULT (rules hold before and after each transaction), but it has no mechanism of its own here — atomicity’s rollback is what enforced it through the crash.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Two dashboards each run a transaction on robot 3: read inspection_count (both see 7), add 1, write 8. Final value is 8, not 9. Which ACID property was missing?',
      options: [
        'Isolation — concurrent transactions must behave as if they ran one after another',
        'Atomicity — one of the writes must have half-failed',
        'Durability — one of the 8s never reached the disk',
        'None — this outcome is impossible in a real database',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: run serially, the second reader would have seen 8 and written 9. Interleaved stale reads lost an update — proper isolation (or an atomic UPDATE SET count = count + 1) is the fix.',
        'Both transactions completed every write flawlessly — nothing half-failed. The bug lives BETWEEN transactions, in their interleaving, which is exactly isolation’s beat.',
        'Both 8s hit the disk just fine — one simply overwrote the other. Durability makes writes survive; it says nothing about ordering concurrent readers.',
        'It’s all too possible — the lost update is THE classic concurrency bug, and databases at relaxed isolation levels can absolutely exhibit it. Never assume the machine saved you.',
      ],
    },
  ],
}
