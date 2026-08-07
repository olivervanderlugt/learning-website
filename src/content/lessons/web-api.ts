import type { Lesson } from '../../types'

export const webApiLesson: Lesson = {
  nodeId: 'web-api',
  screens: [
    {
      kind: 'explain',
      title: 'REST: name things, not actions',
      body: [
        'An API that people can guess is worth more than a clever one. REST’s core move is to put the NOUNS in the URL and let the METHOD supply the verb — `/robots/7` is a thing, and GET, PUT or DELETE decide what you do to it.',
        'Collections are plural and their members hang off them: `/robots` is all of them, `/robots/7` is one, `/robots/7/logs` is that one’s logs. That is the whole naming system.',
        'The payoff is that CRUD falls out of the four methods with nothing left to invent: create is POST to the collection, read is GET, update is PUT, delete is DELETE.',
      ],
      deeper: [
        'Contrast that with an action-in-the-URL API: `/getRobot?id=7`, `/deleteRobot?id=7`, `/updateRobotBattery`. Every operation is a new name someone has to look up, nothing is guessable, and — worse — it is all GET, so you have thrown away the safety and idempotence promises the previous lesson relied on. A crawler that hits `/deleteRobot?id=7` will delete robot 7.',
        'REST is a set of constraints rather than a specification, and one of them you have already met: statelessness. The others worth knowing are a UNIFORM INTERFACE (the same small set of verbs everywhere, so a client written for one resource works for the next) and CACHEABILITY (responses can say whether they may be reused). Purists add HATEOAS — responses linking to the next available actions — which almost nobody implements, and it is honest to say so.',
      ],
    },
    {
      kind: 'predict',
      question:
        'Your API creates a robot when you `POST /robots` with a JSON body. The creation succeeds. Which status code should come back?',
      options: [
        '201 Created — the request succeeded AND a new resource now exists, usually returned in the body',
        '200 OK — every successful request is a 200',
        '204 No Content — creation returns nothing, so there is no content',
        '302 Found — the client is redirected to the new robot',
      ],
      correctIndex: 0,
      reveal:
        '**201 Created** is the precise answer, and the created object comes back in the body so the client learns the id the server assigned — running this against the lesson’s server returns `HTTP/1.1 201 Created` with `{"id":3,"name":"drone","battery":100}`. 200 is not wrong so much as vague: it says “fine” where 201 says “fine, and something new exists now”. 204 No Content is the right choice for a successful DELETE, where there genuinely is nothing to send back.',
    },
    {
      kind: 'explain',
      title: 'The five routes, and what each one answers',
      body: [
        'A complete resource is five routes, and each has a conventional success code: `GET /robots` → 200 with a list, `GET /robots/7` → 200 or 404, `POST /robots` → 201, `PUT /robots/7` → 200, `DELETE /robots/7` → 204.',
        'The failure codes matter just as much. Malformed body → 400 Bad Request. No or bad credentials → 401. Known caller, not permitted → 403. Nothing at that id → 404.',
        'Choosing these deliberately is the difference between an API a client can automate against and one where every response has to be read by a human to find out what happened.',
      ],
      deeper: [
        'The commonest failure in the wild is a server that answers 200 with `{"success": false}` in the body. It forces every client to parse the body to discover an error, defeats every generic retry and monitoring layer (all of which watch status codes), and means a dashboard showing “100% success” can be entirely wrong. The status code IS the outcome; the body explains it.',
        'PUT versus PATCH is the other everyday choice. PUT REPLACES the whole resource — send a partial body and the missing fields are meant to be cleared, which is why it stays idempotent. PATCH applies a partial change (`{"battery": 47}` and nothing else). Using PUT where you meant PATCH is how fields silently vanish.',
      ],
    },
    {
      kind: 'explain',
      title: 'Middleware: the pipeline every request walks',
      body: [
        'Before a request reaches your handler it can pass through a chain of small functions — MIDDLEWARE. Each gets `(req, res, next)` and either answers the request itself or calls `next()` to pass it along.',
        'That is how the cross-cutting jobs get done exactly once instead of in every handler: `app.use(express.json())` parses JSON bodies, a logger records the method and path, an auth check rejects anyone without a valid token.',
        'Two rules govern all of it. The chain runs in REGISTRATION ORDER, and a function that never calls `next()` (and never responds) stops the request dead.',
      ],
      deeper: [
        'Order being significant is not an implementation quirk, it is the feature: authentication must run before the handler that trusts `req.user`, and body parsing must run before anything reads `req.body` (skip `express.json()` and `req.body` is simply undefined — the single most common “why is my POST empty” bug).',
        'The stall case is worth seeing once. Register a middleware that logs and then forgets `next()`, and curl that route: the server’s terminal proves the middleware ran, and curl just hangs until you time it out. No error, no 500 — because from HTTP’s point of view nothing went wrong, the response simply never came. Error handlers are the mirror image: a function taking FOUR arguments `(err, req, res, next)` is treated as the error handler and registered last, catching whatever the chain threw.',
      ],
    },
    {
      kind: 'code',
      prompt:
        'Build the pipeline. `run` invokes middleware `i`, but hands it a `next` that does nothing — so the chain stops after the first function. Replace `() => {}` with a `next` that continues to the NEXT middleware, and run it. Watch what the second request does when auth refuses to call `next()`.',
      starter: `// The middleware pipeline: each function gets the request and a next().
const stack = []
function use(fn) { stack.push(fn) }

use((req, next) => { req.log.push('logger: ' + req.method + ' ' + req.path); next() })
use((req, next) => {
  if (!req.token) { req.log.push('auth: rejected 401'); return } // no next() -> stop here
  req.log.push('auth: ok')
  next()
})
use((req) => { req.log.push('handler: sent 200') })

function run(req, i) {
  if (i >= stack.length) return
  stack[i](req, () => {}) // <-- replace () => {} so next() runs the NEXT function
}

const good = { method: 'GET', path: '/robots', token: 'abc123', log: [] }
run(good, 0)
print(good.log.join(' | '))

const anon = { method: 'GET', path: '/robots', token: null, log: [] }
run(anon, 0)
print(anon.log.join(' | '))`,
      expected: `logger: GET /robots | auth: ok | handler: sent 200
logger: GET /robots | auth: rejected 401`,
      hint: 'The `next` you pass to middleware `i` should be a function that runs the rest of the chain: `() => run(req, i + 1)`.',
      success:
        'That is the entire mechanism — `next()` is literally “call the rest of the chain”. Look at the second line: the request was logged and then stopped at auth, and the handler never ran. Rejecting unauthenticated traffic before it can reach a single handler is one `app.use` placed in the right position, not a check repeated in twenty functions.',
      links: [{ nodeId: 'prog-functions', label: 'Refresher: functions as values' }],
    },
    {
      kind: 'predict',
      question:
        'You register a logging middleware with `app.use(...)` AFTER `app.get(\'/early\', ...)` but BEFORE `app.get(\'/late\', ...)`. You then request both routes. Which ones does the logger record?',
      options: [
        'Only `/late` — the chain runs in registration order, and `/early` was answered before the logger existed in it',
        'Both — `app.use` applies globally regardless of where it is written',
        'Neither — `app.use` only affects middleware, not routes',
        'Only `/early` — middleware runs after the routes above it',
      ],
      correctIndex: 0,
      reveal:
        'Only `/late`. Running exactly this server prints `late logger saw /late` and, for an unmatched path, `late logger saw /nope` — but nothing at all for `/early`, because that handler responded before the request ever reached the logger’s position in the chain. `app.use` is not global configuration; it is an entry appended to an ordered list. This is why logging and body parsing go at the TOP of the file, and error handlers at the very bottom.',
    },
    {
      kind: 'explain',
      title: 'Documents: when a row is the wrong shape',
      body: [
        'The relational model you already know stores fixed-column rows and stitches them together with joins. A DOCUMENT store keeps whole nested JSON objects instead — a robot and its config and its last five readings can live as one document.',
        'The trade is real in both directions. One read fetches everything related, and different documents may carry different fields (great for evolving sensor payloads). But data you EMBED in two places must be updated in two places — the guarantee normalization was invented to give you.',
        'So the rule of thumb is about access patterns: EMBED what is always read together and owned by the parent; REFERENCE (store an id, like a foreign key) what is shared or changes independently.',
      ],
      deeper: [
        'The honest framing is that “schemaless” means the schema moved rather than disappeared — out of the database and into your code, where nothing enforces it. Ten robots written by an older version of your firmware still have the old field names, and every reader must now cope with both. That flexibility is a genuine asset while a payload format is still moving and a genuine liability once it has settled.',
        'For a robot fleet the split is usually clean. Telemetry — high-volume, nested, self-contained, written once and read as a unit — suits documents. Anything with real relational integrity to protect (which operator owns which robot, billing, audit trails) wants rows, constraints and transactions. Choosing per data set rather than per project is the mature answer.',
      ],
      links: [{ nodeId: 'db-relational', label: 'Compare: tables, rows and foreign keys' }],
    },
    {
      kind: 'quiz',
      question:
        'Which pair of URLs is the more RESTful design for reading and deleting robot 7?',
      options: [
        '`GET /robots/7` and `DELETE /robots/7` — one noun, the method supplies the verb',
        '`GET /getRobot?id=7` and `GET /deleteRobot?id=7`',
        '`POST /robots/read` and `POST /robots/remove`',
        '`GET /robots/7/get` and `GET /robots/7/delete`',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the URL identifies the resource and the method says what to do with it, so the pattern generalises to every resource without inventing new names.',
        'This puts the verb in the path and makes deletion a GET — discarding the safety promise, so any crawler or pre-fetcher that follows the link performs the delete.',
        'Making everything POST throws away idempotence and cacheability, and the client now has to learn a bespoke action name per operation.',
        'The `/get` and `/delete` suffixes duplicate what the method already says, and again route a destructive action through GET.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A client sends a JSON body to your `POST /robots` route, but `req.body` is `undefined`. What is the most likely cause?',
      options: [
        'The body-parsing middleware (`app.use(express.json())`) is missing, or registered after this route',
        'JSON bodies cannot be sent with POST',
        'The client forgot to send a status code',
        'The route needs to be `app.put` instead',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: nothing parses the raw body unless you install a parser, and because the chain is ordered, a parser registered below the route runs too late to help it.',
        'A JSON body on POST is the standard case; the raw bytes arrive fine — they are just not parsed into an object for you.',
        'Status codes are part of the RESPONSE, sent by the server. Clients send methods, headers and bodies.',
        'The method is not the issue: PUT with no parser gives you exactly the same undefined body.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A middleware runs, logs a line, and never calls `next()` or sends a response. What does the client experience?',
      options: [
        'The request hangs with no response until something times out — no error is raised, the answer simply never comes',
        'An immediate 500 Internal Server Error',
        'The next middleware runs anyway after a short delay',
        'A 404, because no handler was reached',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: `next()` is the only thing that advances the chain, so the request stalls mid-pipeline. This is genuinely hard to spot precisely because nothing looks broken on the server side.',
        'Nothing threw, so there is no error to report — the failure is an absence, not an exception.',
        'There is no timer; a middleware that does not call `next()` ends the journey there permanently.',
        'A 404 is a real response the framework sends when no route matches. Here the request never got that far.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'When does embedding related data inside one document beat storing it in a separate collection and referencing it by id?',
      options: [
        'When the data is owned by that parent and essentially always read with it — one read gets the whole thing',
        'Always — embedding is simply the faster option',
        'When the same data is shared by many parents and updated often',
        'Never — document stores cannot nest data',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: embed for locality when the child belongs to the parent and travels with it. That is the case where one fetch replaces a join.',
        'Embedding shared data duplicates it, and every duplicate is a place an update can be missed — the exact problem normalization exists to prevent.',
        'That is the case FOR referencing: store it once, point at it by id, and one update fixes every reader.',
        'Nesting is the defining feature of a document store — the question is only when to use it.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Why is answering `200 OK` with a body of `{"success": false, "error": "not found"}` considered a design mistake?',
      options: [
        'The status code is the machine-readable outcome — reporting failure as 200 breaks every client, cache and monitor that decides what to do from the code alone',
        'JSON bodies are not allowed on error responses',
        'It uses more bandwidth than a 404',
        'It is fine, and preferable to 4xx codes',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: retry logic, dashboards, proxies and generic clients all branch on the status. Hiding the failure in the body makes an error look like a success to everything that is not a human reading the payload.',
        'Error responses SHOULD carry a JSON body explaining what went wrong — the mistake is the code, not the body.',
        'The sizes are effectively identical; correctness is the issue, not bytes.',
        'It is the opposite of fine: it discards the one field every layer of the stack already agrees on how to read.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'What status code best fits a successful `DELETE /robots/7`?',
      options: [
        '204 No Content — it worked, and there is nothing meaningful left to return',
        '201 Created — something changed',
        '404 Not Found — the robot is gone now, after all',
        '500 — deletion is a server-side change',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: 204 says “success, and deliberately no body”. (200 with a small confirmation body is also defensible; 204 is the conventional choice.)',
        '201 specifically announces that a new resource exists — the opposite of what happened.',
        'The delete succeeded, so it is a 2xx. A later GET for that id returning 404 is a separate, correct thing.',
        'Nothing failed; 5xx is for the server breaking, not for the server doing what you asked.',
      ],
    },
    {
      question:
        'You want to change only a robot’s `battery` field and leave everything else untouched. Which method fits?',
      options: [
        'PATCH — a partial update, sending just the fields that change',
        'PUT — because PUT means “write”',
        'POST — because you are sending a body',
        'GET with a query parameter `?battery=47`',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: PATCH is defined as a partial modification, which is exactly this.',
        'PUT REPLACES the resource with what you send, so a partial PUT body is meant to clear the fields you omitted — a quiet way to lose data.',
        'POST is for creating a new subordinate resource, not for editing an existing one at a known URL.',
        'GET must be safe — it may not change anything, whatever you put in the query string.',
      ],
    },
    {
      question:
        'In what order should you register: (a) the route handlers, (b) `express.json()`, (c) an error handler taking `(err, req, res, next)`?',
      options: [
        'b, then a, then c — parse bodies first, handle requests, and let the error handler sit last to catch whatever the chain threw',
        'a, then b, then c',
        'c, then b, then a',
        'Order is irrelevant; the framework sorts them',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the chain is walked in registration order, so parsing must precede any handler that reads `req.body`, and the error handler is registered last so everything above it is inside its reach.',
        'Registering routes before the parser leaves them with an undefined `req.body` — the classic empty-POST bug.',
        'An error handler registered first has nothing after it to catch; errors thrown further down never reach it.',
        'Order is the whole model — nothing is reordered for you.',
      ],
    },
    {
      question:
        'Two document collections each embed a copy of the same operator’s contact details. The operator changes phone number. What is the problem?',
      options: [
        'Every embedded copy must be found and updated — miss one and the data silently disagrees with itself',
        'Document stores forbid duplicated fields',
        'The database will refuse the update until the copies are merged',
        'There is no problem; embedded copies update themselves',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: this is exactly the anomaly normalization prevents, and it is the price of embedding. Shared, independently-changing data wants a reference instead.',
        'Duplication is permitted — that is precisely why the discipline has to come from your design.',
        'Nothing enforces consistency across documents by default; the update succeeds and leaves the other copy stale.',
        'Copies are independent data. Nothing propagates a change between them.',
      ],
    },
    {
      question:
        'A client gets 401 on every call. Which middleware position would explain it best?',
      options: [
        'An auth middleware registered above the routes that rejects the request before any handler runs',
        'An error handler registered first',
        'A body parser registered last',
        'A logger that forgets to call `next()`',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: an auth check placed above the routes sees every request and can end it with a 401 before a single handler executes — which is exactly why it is placed there.',
        'An error handler registered first simply never gets reached; it would not produce a 401.',
        'A late body parser causes undefined bodies (often a 400 from your own validation), not a 401.',
        'A middleware that never calls `next()` produces a HANG, not a status code.',
      ],
    },
  ],
}
