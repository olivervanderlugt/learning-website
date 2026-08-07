import type { Lesson } from '../../types'

export const webServerLesson: Lesson = {
  nodeId: 'web-server',
  screens: [
    {
      kind: 'explain',
      title: 'JavaScript, off the leash',
      body: [
        'Node is the JavaScript engine from a browser, lifted out and handed the things a browser deliberately withholds: files, sockets, processes. Same language you already write; a completely different set of powers.',
        'Make a folder, `cd` into it, and check you have it: `node -v` should print something like `v24.18.0`. Then run `npm init -y`, which writes a `package.json` — the file that records what your project is and what it depends on.',
        'One more idea before code: `npm` is the package installer. `npm install express` downloads a library and its dependencies into `node_modules/` and records it in `package.json`, so anyone who clones your project can rebuild it with one command.',
      ],
      deeper: [
        'Two things confuse people about `node_modules/`. First, it is enormous and disposable — you never commit it; you commit `package.json` (what you asked for) and `package-lock.json` (the exact versions you got), and `npm install` reconstructs the folder. That is the Git lesson’s rule applied here: record the recipe, not the cake.',
        'Second, `require(\'express\')` and `require(\'node:http\')` look the same but are not. The `node:` prefix means a BUILT-IN module — shipped with Node, nothing to install. A bare name is looked up in `node_modules/`. Writing `node:http` rather than plain `http` makes that distinction visible at a glance, and cannot be shadowed by a package that happens to be called `http`.',
      ],
    },
    {
      kind: 'explain',
      title: 'A web server in twelve lines',
      body: [
        'Node can serve HTTP with no libraries at all. Save this as `bare.js`:',
        '```\nconst http = require(\'node:http\')\n\nconst server = http.createServer((req, res) => {\n  console.log(req.method, req.url)\n  res.writeHead(200, { \'Content-Type\': \'text/plain\' })\n  res.end(\'hello from node\\n\')\n})\n\nserver.listen(3000, () => console.log(\'listening on http://localhost:3000\'))\n```',
        'Run it with `node bare.js`. It prints `listening on http://localhost:3000` and then just sits there — that is correct. Leave it running, open a SECOND terminal, and hit it with `curl -i http://localhost:3000/`.',
      ],
      deeper: [
        'Read the shape rather than the syntax: `createServer` takes ONE function and Node calls it once per incoming request, handing you the request (`req`) and the thing you write the answer into (`res`). `writeHead` sets the status line and headers; `res.end(...)` sends the body and closes the response. Forget `res.end` and the client hangs forever waiting for a body that never arrives — the request never fails, it just never finishes.',
        '`listen(3000)` is the moment the program claims port 3000 and starts accepting connections. If you see `EADDRINUSE`, an earlier copy of the server is still running and holding the port — stop it (Ctrl-C in its terminal) or use a different port. Every “why won’t my server start” hour begins here.',
      ],
    },
    {
      kind: 'predict',
      question:
        'That server’s handler never looks at `req.url`. With `bare.js` running, you curl `http://localhost:3000/status` — a path the code never mentions. What comes back?',
      options: [
        '`hello from node` — with no routing, every path runs the same handler',
        '404 Not Found — `/status` was never defined',
        'An error, because `req.url` is unused',
        'Nothing — the server only answers requests to `/`',
      ],
      correctIndex: 0,
      reveal:
        'You get `hello from node`, exactly as you would for `/`, `/robots` or `/anything-at-all`. The server’s terminal proves it saw the difference — it logs `GET /` for the first request and `GET /status` for the second — but the handler ignores `req.url` entirely, so all paths get the same answer. ROUTING is not something HTTP gives you; it is a thing you write. That is precisely the tedium a framework removes.',
    },
    {
      kind: 'explain',
      title: 'One thread, and why it still serves everyone',
      body: [
        'Node runs your JavaScript on a SINGLE thread. There is no thread per request, which sounds like it should collapse under load — and does not, because almost nothing a server does is computation.',
        'Reading a file, querying a database, calling another service: those are waits, not work. Node hands the wait to the operating system and moves on to the next request; when the answer arrives, your callback is queued and runs. This is the EVENT LOOP.',
        'The catch is symmetrical: waiting is free, but COMPUTING is not. Any synchronous work you do blocks the one thread, and every other client waits behind it.',
      ],
      deeper: [
        'This is the same trade-off as the OS lesson’s polling versus interrupts, one level up. A thread-per-request server pays memory and context-switching for thousands of mostly-idle threads; Node pays one thread and a queue. For I/O-bound work — which is what an API mostly is — the event loop wins decisively, which is why it suits a telemetry service ingesting from a hundred robots.',
        'It also tells you what NOT to put in a Node server: heavy number-crunching. A ten-second image-processing or SLAM computation inside a request handler freezes every other request for ten seconds. The fix is to move that work elsewhere — a worker thread, a separate service, the robot itself — and keep the request handler doing what it is good at: waiting.',
      ],
    },
    {
      kind: 'predict',
      question:
        'A request handler runs a tight synchronous `for` loop that takes 5 seconds. While it runs, another client sends a request to a different, trivial route. What happens to that second client?',
      options: [
        'It waits roughly 5 seconds — the single thread is busy, so nothing else can be handled until the loop finishes',
        'It is served instantly — Node starts a new thread for each request',
        'It gets a 503 immediately, because the server is busy',
        'It crashes the server with a concurrency error',
      ],
      correctIndex: 0,
      reveal:
        'It waits. The event loop is one thread, and a synchronous loop never yields it, so requests pile up in the queue behind the busy handler — no error, no warning, just everything getting slow at once. This is the single most important consequence of the model: `await`ing a database for 5 seconds costs you nothing, while COMPUTING for 5 seconds costs you the entire server.',
    },
    {
      kind: 'explain',
      title: 'The same server, with routing',
      body: [
        'Now install the framework — `npm install express` — and write `server.js`. The bare version’s single handler becomes one small function PER route:',
        '```\nconst express = require(\'express\')\nconst app = express()\n\nconst robots = [\n  { id: 1, name: \'rover\', battery: 82 },\n  { id: 2, name: \'arm\', battery: 47 },\n]\n\napp.get(\'/\', (req, res) => res.send(\'hello from express\'))\napp.get(\'/robots\', (req, res) => res.json(robots))\n\napp.get(\'/robots/:id\', (req, res) => {\n  const robot = robots.find((r) => r.id === Number(req.params.id))\n  if (!robot) return res.status(404).json({ error: \'no such robot\' })\n  res.json(robot)\n})\n\napp.listen(3000, () => console.log(\'listening on http://localhost:3000\'))\n```',
        'Run `node server.js`, then curl `/`, `/robots` and `/robots/2` from your second terminal. `/robots` answers `[{"id":1,"name":"rover","battery":82},{"id":2,"name":"arm","battery":47}]`.',
      ],
      deeper: [
        'Three pieces are doing real work here. `app.get(path, handler)` registers a handler under a METHOD plus a PATH — `app.post(\'/robots\', ...)` is a different entry entirely, even at the same path. `:id` is a path PARAMETER: it matches any single segment and hands you the text in `req.params.id` (text, hence the `Number(...)` — `req.params.id` for `/robots/2` is the string `"2"`, and `"2" === 2` is false). And `res.json(...)` serialises the value AND sets `Content-Type: application/json` for you.',
        'Notice `return res.status(404).json(...)`. The `return` is not decoration: `res.json` does not stop your function, so without it execution continues to the next line and tries to send a SECOND response, which throws “Cannot set headers after they are sent”. One request, one response — the framework enforces it, but only after you have already tried.',
      ],
    },
    {
      kind: 'code',
      prompt:
        'Routing, from scratch — this is what `app.get` builds internally. `handle` looks up a route in the table, but the `find` predicate is stuck at `false`, so nothing ever matches. Replace `false` with a test that matches on BOTH the method and the path, and run it.',
      starter: `// A tiny version of what app.get / app.post build inside Express.
const routes = []
function on(method, path, handler) { routes.push({ method, path, handler }) }

on('GET', '/robots', () => 'list of robots')
on('POST', '/robots', () => 'created a robot')
on('GET', '/health', () => 'ok')

function handle(method, path) {
  const route = routes.find((r) => false) // <-- replace false: match method AND path
  if (!route) return '404 not found'
  return route.handler()
}

print(handle('GET', '/robots'))
print(handle('POST', '/robots'))
print(handle('GET', '/nope'))`,
      expected: `list of robots
created a robot
404 not found`,
      hint: 'Both fields have to agree: `r.method === method && r.path === path`.',
      success:
        'Notice what the first two lines prove: `GET /robots` and `POST /robots` share a path and are still completely different routes, because the KEY is method plus path. And the third line shows where 404 actually comes from — it is not a network condition, it is simply what a router returns when its table has no entry.',
    },
    {
      kind: 'predict',
      question:
        'With `server.js` running, you curl `http://localhost:3000/robots/99` — a robot that does not exist. What does `curl -i` show?',
      options: [
        '`HTTP/1.1 404 Not Found` with the JSON body `{"error":"no such robot"}`',
        '`HTTP/1.1 200 OK` with an empty body — the route matched, so it succeeded',
        '`HTTP/1.1 500` — `find` returning undefined crashes the handler',
        'Nothing — the route only accepts ids 1 and 2',
      ],
      correctIndex: 0,
      reveal:
        'You get `HTTP/1.1 404 Not Found` and the body `{"error":"no such robot"}`. Two separate things happened and it is worth separating them: the ROUTE matched fine (`/robots/:id` accepts any segment, including `99`), and then your handler decided that this particular robot does not exist and said so deliberately. A missing route and a missing resource are both 404, but only one of them is code you wrote — and the JSON body is how the client tells them apart.',
    },
    {
      kind: 'quiz',
      question: 'What does `app.listen(3000, ...)` actually do?',
      options: [
        'Claims port 3000 and starts accepting connections — the process then stays alive, waiting for requests',
        'Sends a request to port 3000 to check whether a server is there',
        'Runs the server once and exits when it finishes',
        'Reserves 3000 megabytes of memory for the server',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: it binds the port and hands control to the event loop. The program not exiting is the point — a server that returned to the prompt would be a server that stopped serving.',
        'That is what `curl` does. `listen` is the other side of the conversation: it waits to be contacted.',
        'Nothing “finishes”; the process idles until a request arrives, then idles again. Ctrl-C is what ends it.',
        'The 3000 is a port number — an address on this machine, nothing to do with memory.',
      ],
    },
    {
      question:
        'The bare `node:http` server answers every path identically, while the Express version answers `/robots` and `/health` differently. What is the actual difference?',
      kind: 'quiz',
      options: [
        'Routing is application code, not a protocol feature — Express provides a table matching method+path to handlers, which the bare version simply did not have',
        'The bare `http` module is unable to read the request path',
        'HTTP only supports routing when a framework negotiates it during the handshake',
        'Express uses a faster network protocol than the built-in module',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the bare server received the path (its log printed `GET /status`) and chose to ignore it. Express is that same `req.url` inspection, structured as a lookup table you register handlers in.',
        'It reads it fine — `req.url` and `req.method` are right there; the twelve-line version just never branched on them.',
        'HTTP has no notion of routes at all. It carries a method and a path; deciding what those MEAN is entirely the server application’s job.',
        'Both sit on exactly the same built-in HTTP machinery — Express is a layer above it, not a different protocol.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'In `app.get(\'/robots/:id\', ...)`, what is `req.params.id` when a request arrives for `/robots/7`?',
      options: [
        'The string `"7"` — path parameters arrive as text, so comparing it to a number needs a conversion',
        'The number `7`, already typed correctly',
        'The whole path `"/robots/7"`',
        'Undefined — `:id` is only a comment for readers',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: URLs are text, so everything parsed out of one is text. This is why the lesson’s handler wraps it in `Number(...)` — `"7" === 7` is false, and the lookup would silently find nothing.',
        'Nothing in the URL says whether a segment is a number, a name or an id, so the framework cannot guess a type; it hands you the characters.',
        'The full path is `req.path`. `req.params` holds just the captured segments, keyed by the names in the route.',
        '`:id` is a real capture, not a comment — that is exactly how the value gets into `req.params`.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Why does a Node server usually handle many simultaneous clients well despite running your code on one thread?',
      options: [
        'Most of its work is waiting on I/O, and waits are handed to the OS — the thread is free to serve other requests until the answer arrives',
        'Node secretly starts one thread per connection',
        'Because JavaScript executes faster than other languages',
        'Because HTTP only allows one client to connect at a time anyway',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: an API is I/O-bound, and I/O is a wait rather than work. The event loop turns thousands of concurrent waits into one thread plus a queue of callbacks.',
        'Your JavaScript really does run on one thread — that is why a synchronous loop blocks everyone. (Node uses a small internal pool for some file work, but not one thread per connection.)',
        'Raw speed is not the mechanism, and it would not help: the win comes from not blocking during waits, not from computing faster.',
        'HTTP servers handle many connections concurrently; that is the whole problem the event loop exists to solve.',
      ],
    },
  ],
  extraPractice: [
    {
      question:
        'You start your server and get `EADDRINUSE: address already in use :::3000`. What happened?',
      options: [
        'Another process — usually an earlier copy of this same server — is still holding port 3000',
        'Your code has a syntax error on the `listen` line',
        'Port 3000 is reserved by Node and cannot be used',
        'The firewall blocked the outgoing request',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: a port can be bound by one process at a time. Stop the old server (Ctrl-C in its terminal) or listen on a different port.',
        'A syntax error would fail before anything ran, with a different message entirely; this one comes from the OS refusing the bind.',
        '3000 is just a conventional choice for development — nothing reserves it.',
        'No outgoing request is involved; the server is trying to CLAIM a local port and being told it is taken.',
      ],
    },
    {
      question: 'What is the difference between `res.send(...)` and `res.json(...)`?',
      options: [
        '`res.json` serialises the value as JSON and sets `Content-Type: application/json`; `res.send` guesses from what you hand it',
        'They are identical aliases',
        '`res.json` only accepts strings',
        '`res.send` closes the connection but `res.json` leaves it open',
      ],
      correctIndex: 0,
      explanations: [
        'Correct — and the header is the part that matters, because it is how the client knows to parse the body rather than treat it as text.',
        'They overlap for objects, but `res.json` is explicit about intent and about the content type; `res.send` with a string sends HTML by default.',
        '`res.json` is for objects and arrays — the values that need serialising.',
        'Both finish the response; neither leaves the connection hanging.',
      ],
    },
    {
      question:
        'Your handler calls `res.json(robot)` and then, further down, `res.status(404).json({ error: ... })`. What goes wrong?',
      options: [
        'The second send throws “Cannot set headers after they are sent” — one request gets exactly one response',
        'The client receives both bodies concatenated',
        'The 404 wins, because it comes last',
        'Nothing — Express merges them into one response',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the headers went out with the first response, so the second cannot set a status. This is why guard clauses need `return res.status(404)...`, not a bare call.',
        'The response is already closed; nothing more is appended to it.',
        'The first one wins — it was already sent. The later call just throws.',
        'There is no merging. HTTP is strictly one response per request.',
      ],
    },
    {
      question: 'Why should `node_modules/` be kept out of Git?',
      options: [
        'It is large and fully reconstructable — `package.json` plus `package-lock.json` let `npm install` rebuild it exactly',
        'It contains secrets that must never be shared',
        'Git is technically unable to store that many files',
        'It changes the code, so committing it would break the build',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: commit the recipe, not the cake. The lock file pins exact versions, so the rebuild is reproducible.',
        'Secrets belong in environment variables and are a separate concern; `node_modules` is public library code.',
        'Git could store it — it would just be a huge, churning, pointless diff on every install.',
        'Committing it would not break anything; it is simply wasteful and noisy.',
      ],
    },
    {
      question:
        'Which of these is a genuinely bad fit for a request handler in a Node API?',
      options: [
        'A CPU-heavy computation that takes several seconds, because it blocks the single thread for every other client',
        'Awaiting a slow database query',
        'Calling another HTTP service and awaiting its response',
        'Reading a file from disk asynchronously',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: computation occupies the one thread. Push heavy work to a worker thread or a separate service and keep handlers in the business of waiting.',
        'A slow query is a WAIT — the event loop happily serves other requests meanwhile. Latency for that one client, no cost to the rest.',
        'Same story: an outbound call is I/O, exactly the case the event loop is built for.',
        'Asynchronous file reads are I/O too. (The synchronous variants, like `readFileSync`, would be the problem.)',
      ],
    },
  ],
}
