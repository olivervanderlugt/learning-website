import type { Lesson } from '../../types'

export const dbTransactionsLesson: Lesson = {
  nodeId: 'db-transactions',
  screens: [
    {
      kind: 'explain',
      title: 'Making queries fast: indexes',
      body: [
        'Last lesson’s cliffhanger: WHERE on an unindexed column scans every row. An INDEX is the fix — a sorted (or hashed) side-structure mapping column values to row locations.',
        'B-tree index: O(log n) lookups AND range queries (duration > 60). Hash index: O(1) exact matches only. Recognize the menu? It’s your data-structures lesson, sold by the database.',
        'Cost: every index must be UPDATED on every write. Indexes trade write speed and storage for read speed — a dial, not a free lunch.',
      ],
      links: [{ nodeId: 'algo-structures', label: 'Refresher: hash maps & friends' }],
    },
    {
      kind: 'predict',
      question: 'Your mission-log table gets 1,000 writes/minute and one dashboard query/hour. Indexing every column would…',
      options: [
        'Slow the writes badly while barely helping — index what you QUERY, not everything',
        'Make everything faster with no cost',
        'Be required by SQL standards',
        'Corrupt the data',
      ],
      correctIndex: 0,
      reveal:
        'Each write now updates N index structures — write-heavy tables pay N-fold. With one query per hour, a scan was fine! Rule: index the columns your frequent queries filter/join on, and nothing else. (Databases EXPLAIN their plans — `EXPLAIN SELECT...` shows whether an index is actually used. Measure, don’t guess — the profiling lesson of Big-O applies verbatim.)',
    },
    {
      kind: 'explain',
      title: 'Transactions: all or nothing',
      body: [
        'A mission completes: mark it done AND add its distance to the robot’s odometer. Two writes. Power dies between them — the log says done, the odometer never heard. Your data now lies.',
        'A TRANSACTION wraps writes into one atomic unit: BEGIN … COMMIT. The database guarantees all of it happens, or none of it — even across crashes.',
        'The guarantees have a name: ACID — Atomic, Consistent, Isolated, Durable. Each letter is a hard promise engineers spent decades making true.',
      ],
      deeper: [
        'HOW can atomicity survive a power cut? Write-ahead logging: the database first appends “I intend to do X and Y” to a log, flushes it to disk, THEN changes the data. On reboot it replays or rolls back half-done intentions. The log is the truth; tables are a cache of it.',
        'Isolated: two transactions running “simultaneously” must behave as if run one-after-another. Without it: two dashboards both read balance 100, both add 10, both write 110 — one update vanished. This is a RACE CONDITION — the same beast as your rapid-click game bug (functional setState!) and the OS lesson’s shared-state hazards. One pattern, three domains.',
        'Durable: once COMMIT returns, the data survives anything short of disk destruction — which is why commit waits for a physical disk flush, and why transactions-per-second is a real hardware limit.',
      ],
    },
    {
      kind: 'predict',
      question: 'Two services concurrently do: read robot7’s error_count (both see 4), add 1, write back. Final value without isolation?',
      options: [
        '5 — one increment silently vanished',
        '6 — both increments apply',
        '4 — writes cancel out',
        'The database always prevents this automatically',
      ],
      correctIndex: 0,
      reveal:
        'Both computed 4+1 and both wrote 5: the classic lost update. Fixes: a transaction that locks the row, or an atomic `UPDATE ... SET error_count = error_count + 1` (let the database do the math). You’ve now met this bug in React state, in OS scheduling, and in SQL — concurrent read-modify-write is THE recurring monster of computing. Learn its face.',
    },
    {
      kind: 'quiz',
      question: 'A B-tree index on `duration` helps `WHERE duration > 60` because…',
      options: [
        'It keeps values sorted, so the matching range is found in O(log n) and read off in order',
        'It memorizes the answer to every possible query',
        'It compresses the table',
        'It makes writes faster too',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: sorted structure = binary-search entry + sequential range walk — the “sorted data superpower” from your Big-O lesson.',
        'No memorized answers — it’s a live structure any range query can use.',
        'Indexes ADD bytes; compression is a different feature.',
        'Writes get SLOWER — every insert must also maintain the tree.',
      ],
    },
    {
      kind: 'quiz',
      question: 'When is adding an index the WRONG call?',
      options: [
        'Write-heavy column that queries rarely filter on — all maintenance cost, no read benefit',
        'A column your dashboard filters on every second',
        'A foreign key used in frequent joins',
        'Indexes are always right',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: indexes are bought with write speed and storage — spend where reads repay it.',
        'Textbook YES-index case.',
        'Join keys are prime index real estate.',
        '“Always” dies on write-heavy tables — it’s a trade-off dial.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Atomicity in ACID means…',
      options: [
        'A transaction’s writes all happen or none do — no half-finished state survives, even a crash',
        'Each write is very small',
        'Only one user may use the database',
        'Data is stored on atomic clocks',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the all-or-nothing promise — the mission-done-but-odometer-missed state becomes impossible.',
        '“Atomic” = indivisible, not tiny — a transaction can touch a thousand rows.',
        'Concurrency is allowed — ISOLATION makes it safe.',
        'Tempting, but no.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The write-ahead log makes crash recovery possible because…',
      options: [
        'Intentions hit disk before data changes, so a rebooting database can replay or roll back anything half-done',
        'It keeps a copy of the database in RAM',
        'It prevents crashes from happening',
        'It logs user passwords',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: log first, change second — the reboot reads the log and finishes or undoes. The log is the source of truth.',
        'RAM dies with the power — the log’s whole point is being on DISK first.',
        'Crashes still happen; WAL makes them survivable.',
        'Security logs are separate — WAL records data-change intentions.',
      ],
    },
    {
      kind: 'quiz',
      question: 'The lost-update race (both read 4, both write 5) also appeared in your ProbabilitySim click-handler bug. The shared root cause is…',
      options: [
        'Concurrent read-modify-write on shared state without coordination',
        'JavaScript and SQL share a compiler',
        'Databases run on React',
        'Coincidence — the bugs are unrelated',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: two actors, stale reads, overlapping writes — the pattern transcends language and layer. The fixes rhyme too: atomic updates (functional setState / UPDATE SET x = x + 1) or exclusion (locks/transactions).',
        'No shared tooling — shared MATH of interleaving.',
        'They just share the failure mode.',
        'Recognizing this NON-coincidence is the mark of a systems thinker — one graph, remember.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Why does COMMIT wait for a physical disk flush before returning?',
      options: [
        'Durability — “committed” must mean surviving an immediate power cut, and only disk survives one',
        'To slow down attackers',
        'Disk flushes make queries faster later',
        'Tradition from the 1970s',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the D in ACID is a promise about power cuts — RAM breaks it, so commit pays the disk latency. This is why bulk inserts batch many rows per transaction.',
        'Security isn’t the driver; physics is.',
        'It costs now and buys nothing later except truthfulness.',
        'The constraint (volatile RAM) is as real today as then.',
      ],
    },
    {
      question: 'Your robot writes odometry at 100 Hz and commits each row individually; throughput is terrible. The standard fix?',
      options: [
        'Batch many rows per transaction — one disk flush amortized over hundreds of writes',
        'Remove the disk',
        'Index the odometry column harder',
        'Lower the sensor rate to 1 Hz',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the flush is per-COMMIT, not per-row — batching turns 100 flushes/second into 1. (Accepting you might lose the last second on a crash — often the right robot trade.)',
        'Then nothing is durable at all.',
        'More indexes make writes SLOWER.',
        'Don’t nerf the robot to fit the storage pattern — fix the pattern.',
      ],
    },
  ],
}
