import type { Lesson } from '../../types'

export const webHttpLesson: Lesson = {
  nodeId: 'web-http',
  screens: [
    {
      kind: 'explain',
      title: 'Every web page is a conversation',
      body: [
        'Loading a page is not one thing happening — it is a REQUEST you send and a RESPONSE you get back. Your browser hides both halves. `curl` shows them.',
        'A request says: which METHOD (what kind of action), which URL (what thing), plus HEADERS (extra facts about the request). A response says: a STATUS CODE (how it went), headers, then the body.',
        'Open your terminal and run `curl -i https://example.com`. The `-i` means “include the response headers”, so you see the machine part, not just the HTML.',
      ],
      deeper: [
        'Without `-i` you only get the body, which hides everything interesting. Two other flags earn their keep immediately: `-X POST` sends a different method, and `-o /dev/null -w "%{http_code}\\n"` throws the body away and prints only the status code — perfect when you care whether it worked, not what came back.',
        '`curl` is not a browser toy. It is how you check whether the robot’s telemetry service is alive from inside a deploy script, and it is the tool every API’s documentation uses to show you an example call, because a curl line is a complete, runnable, copy-pasteable description of one HTTP request.',
      ],
    },
    {
      kind: 'predict',
      question:
        'You run `curl -i https://example.com`. The very FIRST line of output is not HTML — it is the response’s summary. What does it look like?',
      options: [
        'A status line: the protocol version and a status code, e.g. `HTTP/2 200`',
        'The full HTML of the page — headers only appear at the very end',
        'The IP address of the server that answered',
        'Nothing — a successful request prints no line at all',
      ],
      correctIndex: 0,
      reveal:
        'The response opens with a STATUS LINE, then headers, then a blank line, then the body. On this machine it prints `HTTP/2 200`, followed by headers like `content-type: text/html` and `server: cloudflare`, a blank line, and only then the HTML. If your curl negotiates the older HTTP/1.1 you will see `HTTP/1.1 200 OK` instead — HTTP/2 dropped the human-readable reason phrase (“OK”) because nothing ever read it; the NUMBER is the part that matters, and it is the same 200 either way.',
    },
    {
      kind: 'explain',
      title: 'Methods: the verb is a promise',
      body: [
        'The method is the verb of the request, and each one is a promise about what the call does. GET reads a thing. POST creates a new thing. PUT replaces a thing. DELETE removes it. PATCH edits part of it.',
        'Two properties matter more than the names. SAFE means it changes nothing — only GET (and HEAD) are safe. IDEMPOTENT means doing it five times leaves the same result as doing it once: GET, PUT and DELETE are idempotent; POST is not.',
        'That is why a browser will happily re-issue a GET on a flaky connection but warns before re-submitting a form: repeating a POST can create a second order — or launch a second robot.',
      ],
      deeper: [
        'Nothing in the network ENFORCES these promises. You can write a GET handler that deletes a database, and HTTP will not stop you — but every layer between you and the client assumes you did not. Browsers pre-fetch GETs, proxies and CDNs cache them, crawlers follow them, and retry logic re-sends idempotent calls automatically. A GET with side effects gets those side effects triggered by a search-engine crawler at 3am, which is a real and famous class of outage.',
        'DELETE being idempotent surprises people, because the second call usually answers 404 rather than 204. Idempotence is about the STATE OF THE SERVER, not the response you get: after one DELETE the thing is gone, and after five DELETEs the thing is still exactly as gone. The state converged after the first call, which is precisely what makes it safe to retry.',
      ],
    },
    {
      kind: 'predict',
      question:
        'That site serves documentation pages, and its response headers include `allow: GET, HEAD`. You run `curl -i -X POST https://example.com`. What comes back?',
      options: [
        'A 4xx client error — 405 Method Not Allowed: the URL exists, but not for this verb',
        '200 OK — the server ignores the method and just serves the page',
        '404 Not Found — POSTing makes the URL invalid',
        '500 Internal Server Error — POST always crashes a read-only server',
      ],
      correctIndex: 0,
      reveal:
        'It answers **405**. That status is worth knowing precisely because it is so specific: 405 means the RESOURCE exists and the server understood you fine — you just used a verb it does not offer here. Compare it with 404, which means the server has nothing at that URL under any verb. The `allow: GET, HEAD` header is the server telling you the menu in advance; the 405 is it repeating itself after you ordered off-menu. (Run it yourself and confirm.)',
    },
    {
      kind: 'explain',
      title: 'Status codes: the first digit is the whole story',
      body: [
        'There are dozens of status codes and you do not need to memorise them. You need the FIRST DIGIT, which tells you who is responsible: 2xx it worked, 3xx go look elsewhere, 4xx YOUR request was wrong, 5xx the SERVER broke.',
        'That split decides what you do next. A 4xx means fixing your request will help; retrying identical bytes will not. A 5xx means your request may have been fine — retrying later is exactly the right move.',
        'The handful worth knowing by name: 200 OK, 201 Created, 204 No Content, 301 Moved Permanently, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests, 500 Internal Server Error.',
      ],
      deeper: [
        '401 versus 403 catches everyone. 401 Unauthorized actually means UNAUTHENTICATED — “I do not know who you are, send credentials”. 403 Forbidden means “I know exactly who you are, and you are not allowed” — sending better credentials will not help. Retry logic depends on the difference: 401 says refresh the token and try again, 403 says stop.',
        '429 Too Many Requests is the one that bites fleets. When fifty robots poll the same telemetry endpoint every second, the server starts rejecting them, usually with a `Retry-After` header. The fix is not a faster retry loop — it is backing off (each retry waiting longer than the last), which is why every good HTTP client has exponential backoff built in.',
      ],
    },
    {
      kind: 'code',
      prompt:
        'Triage by first digit. This function should turn any status code into the action it implies — but `cls` is hard-coded to 0, so every code falls through to “unknown”. Replace the 0 with an expression that extracts the code’s first digit (200 → 2, 404 → 4), and run it.',
      starter: `// Every status code's FIRST DIGIT says who is responsible.
function triage(code) {
  const cls = 0 // <-- replace 0: pull the first digit out of code
  if (cls === 2) return 'ok'
  if (cls === 3) return 'follow the redirect'
  if (cls === 4) return 'fix your request'
  if (cls === 5) return 'retry - the server broke'
  return 'unknown'
}

for (const code of [200, 301, 404, 500]) {
  print(code, triage(code))
}`,
      expected: `200 ok
301 follow the redirect
404 fix your request
500 retry - the server broke`,
      hint: 'Integer-divide by 100 and throw away the remainder: `Math.floor(code / 100)` turns 404 into 4.',
      success:
        'That is the entire triage rule, in one line of arithmetic. A client that branches on the class — not on individual codes — handles status codes it has never seen before correctly, which is exactly why the classes were designed this way.',
    },
    {
      kind: 'predict',
      question:
        'You run `curl -s -o /dev/null -w "%{http_code}\\n" https://example.com/no-such-page` — throw the body away, print only the code. What number prints?',
      options: [
        '404 — the server answered, and its answer is “I have nothing at that path”',
        '500 — asking for a missing page is a server error',
        '200 — the server always returns 200 and puts an error message in the body',
        'Nothing prints, because a missing page produces no response at all',
      ],
      correctIndex: 0,
      reveal:
        'It prints **404**. The subtle point: a 404 is a perfectly SUCCESSFUL round trip. DNS resolved, the connection opened, the server understood the request, and it answered clearly — the answer is just “no such thing”. Nothing failed at the network level, which is why `curl` exits happily and why a client that only checks “did the request throw?” will sail straight past a 404 and try to read a body that is not there.',
    },
    {
      kind: 'explain',
      title: 'Headers, URLs, and the server that forgets you',
      body: [
        'Headers are the metadata around the payload: `Content-Type` says what format the body is in (`application/json`), `Accept` says what the client wants back, `Authorization` carries the token that proves who you are.',
        'A URL has parts that mean different things: `https://api.example.com:443/robots/7?fields=battery`. Scheme, host, optional port, PATH (which resource), QUERY (options about it). The path names the thing; the query tunes the request.',
        'And the big one: HTTP is STATELESS. The server remembers nothing between requests. Request two knows nothing about request one unless the request itself carries the proof — a token or a cookie.',
      ],
      deeper: [
        'Statelessness sounds like a limitation and is actually the feature that lets the web scale. Because no request depends on the server that handled the last one, you can put twenty identical servers behind a load balancer and route each request to whichever is free. The moment a server keeps in-memory session state, every one of that user’s requests must come back to that exact machine — and when it dies, the session dies with it.',
        'Logged-in sites feel stateful because the state is re-sent every single time: your browser attaches a session cookie to each request, and the server looks the session up in a shared store. The connection is forgetful; the CREDENTIAL is what carries continuity. The same trick is how a robot fleet works — each robot attaches its API token to every telemetry POST, and any server in the pool can handle it.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does it mean that GET is “safe” and POST is not?',
      options: [
        'GET only reads — it is not supposed to change anything on the server, while POST is expected to cause a change',
        'GET is encrypted and POST is sent in plain text',
        'GET can only be used on small amounts of data; POST is for big data',
        'GET requests cannot be intercepted, so attackers cannot read them',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: “safe” is a promise about EFFECTS. Because GET changes nothing, browsers, caches and crawlers are free to issue it whenever they like — which is exactly why a GET that deletes something is a bug waiting for a crawler to find it.',
        'Encryption comes from HTTPS (TLS) and applies to the whole request whatever the method — POST is not less encrypted than GET.',
        'Size is a practical convention (a URL can only be so long), not what safety means; a huge GET is legal and a tiny POST is normal.',
        'Both are equally interceptable on a plain HTTP connection and equally protected on HTTPS. Safety is about side effects, not secrecy.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'Your client sends the same DELETE for robot 7 three times because the network kept timing out. Why is that considered acceptable?',
      options: [
        'DELETE is idempotent: after the first one succeeds, repeating it leaves the server in the same state — robot 7 stays deleted',
        'DELETE is safe, so it never changes anything at all',
        'The server automatically ignores any repeated request within a minute',
        'It is not acceptable — a repeated DELETE deletes robots 7, 8 and 9',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: idempotence means the resulting STATE is the same after one call or five. The later calls may answer 404 instead of 204, but the server ends up identical — which is what makes automatic retries safe.',
        'DELETE is definitely not safe: it changes things. It is idempotent, which is a different (weaker) promise — “changes the same way no matter how often”.',
        'Nothing in HTTP de-duplicates requests for you. Retries are safe here because of what DELETE promises, not because of anything the protocol does.',
        'A DELETE acts on the one resource its URL names; repeating it cannot wander onto neighbouring ids.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A monitoring script gets a 503 from your telemetry service. What is the sensible automatic response?',
      options: [
        'Wait and retry — 5xx means the server side failed, so the identical request may well succeed shortly',
        'Fix the request body and resend immediately — 5xx means malformed input',
        'Stop forever — 5xx means the endpoint has been permanently removed',
        'Re-send it as a GET, since 5xx only affects POST requests',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the 5 says the fault is on the server side, so your bytes were probably fine. Backing off and retrying is the right move (with increasing delays, so you do not make an overloaded server worse).',
        'That is the 4xx playbook. A 5xx says your request was not the problem, so editing it is guesswork.',
        'Permanent removal is 410 Gone (a 4xx); 503 specifically suggests a temporary condition.',
        'Status classes are about who failed, not which verb was used — switching methods does not route around a broken server.',
      ],
    },
    {
      kind: 'quiz',
      question:
        'A URL exists and works for GET, but your POST to it comes back 405. What is the server telling you?',
      options: [
        'The resource is there and your request was understood — that verb just is not offered on this URL',
        'The URL does not exist at all',
        'Your credentials were rejected',
        'The server crashed while handling the POST',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: 405 Method Not Allowed is specifically “right resource, wrong verb”, and a well-behaved server sends an `Allow` header listing the verbs it does accept.',
        'That would be 404. The whole point of 405 is that the resource was found — only the method was refused.',
        'Rejected credentials are 401 (unauthenticated) or 403 (authenticated but not permitted), not 405.',
        'A crash would be a 5xx. 405 is a 4xx: the server is fine and is deliberately declining.',
      ],
    },
    {
      kind: 'quiz',
      question: 'What does it mean that HTTP is stateless?',
      options: [
        'The server keeps no memory of previous requests — anything it needs to know must be carried in the current request, e.g. a token or cookie',
        'HTTP cannot transfer data that changes over time',
        'The server forgets your data as soon as you close the browser, but remembers it while the tab is open',
        'Each request must go to a different server',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: every request stands alone. Logged-in sites feel continuous only because the credential is re-sent each time and looked up in shared storage — which is exactly what lets many interchangeable servers share the load.',
        'HTTP moves changing data constantly; statelessness is about the SERVER’s memory of your past requests, not about the data itself.',
        'The connection does not hold your session either — the state lives in the credential you resend and in server-side storage keyed by it, not in the open tab.',
        'Requests MAY land on any server in a pool, which is the benefit statelessness buys — but nothing requires them to be different.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'Which method should create a NEW robot record that the server assigns an id to?',
      options: [
        'POST — it creates a new subordinate resource and is deliberately not idempotent',
        'GET — it fetches the robot into existence',
        'PUT — it must be used for anything that writes',
        'DELETE — it is the only method allowed to change data',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: POST is the “create something new here” verb, and its non-idempotence is honest — sending it twice really should make two robots.',
        'GET is safe: it reads and must not create anything.',
        'PUT replaces a resource at a URL YOU choose. It fits “create with an id I picked”, but not “server, assign an id”.',
        'DELETE removes; plenty of other methods write.',
      ],
    },
    {
      question:
        'You send an API request with a token that expired. Which status best describes the response?',
      options: [
        '401 — the server does not accept who you claim to be; refresh the credential and retry',
        '403 — the server knows you and permanently refuses',
        '404 — an expired token makes the URL disappear',
        '500 — expired tokens crash the server',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: 401 means unauthenticated. A fresh token is likely to make the identical request work, which is why clients treat 401 as “re-authenticate, then retry once”.',
        '403 is for a request whose identity IS established and still not permitted — a new token would not help there.',
        'The resource is unaffected by your credential; 404 is about the path, not about you.',
        'A rejected token is an expected, handled condition — that is a 4xx, not a server fault.',
      ],
    },
    {
      question: 'In `https://api.example.com/robots/7?fields=battery`, what is `?fields=battery`?',
      options: [
        'The query string — options that tune the request, separate from the path that names the resource',
        'Part of the path, naming a sub-resource called `fields`',
        'A header sent with the request',
        'The response body',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: everything after `?` is the query string. `/robots/7` identifies WHICH robot; the query modifies how you want it returned.',
        'The path ends at the `?`. Query parameters are a separate part of the URL with their own key=value syntax.',
        'Headers travel in the request’s header block, not inside the URL.',
        'The body is what comes BACK (or what you send with POST/PUT); the URL is part of the request line.',
      ],
    },
    {
      question:
        'A crawler visits every link on your internal dashboard and a batch of robots gets decommissioned. What was the design mistake?',
      options: [
        'A destructive action was exposed behind a GET link — GET must be safe, and crawlers follow every GET they find',
        'The crawler was buggy; following links is never expected behaviour',
        'The dashboard should have used HTTPS',
        'Nothing — this is normal and unavoidable on any web dashboard',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: crawlers, browser pre-fetchers and caches all assume GET changes nothing. Destructive actions belong behind POST/DELETE, which nothing follows automatically.',
        'Following links is exactly what a crawler is for; the bug is on the side that made a link destructive.',
        'Encryption would not change anything — the crawler was authenticated and inside; the verb was the problem.',
        'It is entirely avoidable, and the rule that avoids it is the safety promise of GET.',
      ],
    },
    {
      question:
        'Why can a load balancer send your second request to a completely different server than your first?',
      options: [
        'Because HTTP is stateless: each request carries everything needed, so no server holds anything the next one needs',
        'Because the load balancer copies the first server’s memory to the second one',
        'Because HTTP requests are sent to every server at once',
        'It cannot — all requests in a session must reach the same machine',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: statelessness is what makes servers interchangeable. Any shared state (like a session) lives in a store both servers can reach, not in either one’s memory.',
        'No memory copying happens; the request itself carries the credential, and shared state lives in shared storage.',
        'A request goes to exactly one server; the balancer picks which.',
        'That constraint (“sticky sessions”) is precisely what you are forced into if you break statelessness by keeping session data in one server’s memory.',
      ],
    },
  ],
}
