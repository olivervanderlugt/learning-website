import type { Lesson } from '../../types'

export const secCryptoLesson: Lesson = {
  nodeId: 'sec-crypto',
  screens: [
    {
      kind: 'explain',
      title: 'Scrambling with a secret',
      body: [
        'Encryption transforms readable data (plaintext) into gibberish (ciphertext) using a KEY — reversible only by someone holding the right key.',
        'The oldest scheme is Caesar’s: shift every letter by a fixed amount. Key = the shift. Weak, but it teaches the anatomy: algorithm (shift letters) + key (how far) = cipher.',
        'Build it, break it, then meet the real thing.',
      ],
      links: [{ nodeId: 'sec-threats', label: 'Refresher: what we’re defending against' }],
    },
    {
      kind: 'code',
      prompt: 'Caesar cipher: shift each letter forward by the key (wrapping Z→A). Complete the shift line.',
      starter:
        "let msg = 'ATTACK'\nlet key = 3\nlet out = ''\nfor (let i = 0; i < msg.length; i = i + 1) {\n  let code = msg.charCodeAt(i) - 65      // A=0 ... Z=25\n  // shift by key, wrap around 26, back to a letter\n  let shifted =   // <-- (code + key) % 26\n  out = out + String.fromCharCode(shifted + 65)\n}\nprint(out)",
      expected: 'DWWDFN',
      hint: '(code + key) % 26',
      success:
        'ATTACK + shift 3 = DWWDFN. Decryption is the same loop with (code − key + 26) % 26 — same algorithm, inverse key direction. Now: how hard is this to BREAK?',
    },
    {
      kind: 'predict',
      question: 'You intercept DWWDFN knowing it’s Caesar-encrypted. How long to crack WITHOUT the key?',
      options: [
        'Seconds — only 25 possible keys; try them all',
        'Centuries — encryption is encryption',
        'Impossible without the key',
        'Only the NSA could do it',
      ],
      correctIndex: 0,
      reveal:
        'A key space of 25 dies to brute force instantly (and letter-frequency analysis kills even fancier substitution ciphers). The lesson generalizes: security lives in the SIZE OF THE KEY SPACE, not the cleverness of the scramble. Modern AES-128 has 2¹²⁸ keys ≈ 3×10³⁸ — all computers on Earth working for the universe’s lifetime wouldn’t enumerate them. Same anatomy as Caesar; astronomically bigger haystack.',
    },
    {
      kind: 'explain',
      title: 'The key-sharing paradox — and its beautiful solution',
      body: [
        'Symmetric crypto (AES): one shared key encrypts and decrypts. Fast, unbreakable in practice — but how do you SHARE the key with a robot across the internet without an eavesdropper grabbing it?',
        'Public-key crypto solves it with a key PAIR: a public key anyone may have (it can only LOCK), and a private key that never leaves you (only it can UNLOCK).',
        'Publish the padlock, keep the only key. Anyone can send you a locked box; only you open it. No secret ever crosses the wire.',
      ],
      deeper: [
        'Why can’t the public key be reversed into the private one? Trapdoor math: multiplying two huge primes is instant, but factoring the product back is (as far as anyone knows) computationally infeasible — an easy-forward, hard-backward function. Recognize it? A find≫check gap — cryptography is complexity theory, weaponized for defense.',
        'Signatures run the pair backwards: encrypt a fingerprint of your message with the PRIVATE key, and anyone can verify with the public key that it was really you and unchanged. This — not secrecy — is what authenticates a firmware update.',
        'Real systems (TLS, i.e. the S in HTTPS) combine both: slow public-key math ONCE to agree on a fresh symmetric session key, then fast AES for the actual data. Your browser did this handshake to load this page; your robot’s command channel should do exactly the same.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Caesar falls in seconds while AES stands for the foreseeable future. The decisive difference is…',
      options: [
        'Key space: 25 keys versus 2¹²⁸ — brute force dies against astronomical numbers',
        'AES is written in a secret language',
        'AES ciphertext looks more random to the eye',
        'Caesar is illegal to use',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: with the algorithm public in both cases, the haystack size is the security. 2¹²⁸ is a number physics can’t enumerate.',
        'AES is fully public — secrecy of the ALGORITHM is explicitly not relied upon (Kerckhoffs’s principle, next quiz).',
        'Looks deceive; measurable key space is the metric.',
        'Legality isn’t cryptanalysis.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Kerckhoffs’s principle says a cipher must stay secure even if…',
      options: [
        'The attacker knows everything about the algorithm — only the KEY is secret',
        'The attacker has quantum computers',
        'The key is printed in the manual',
        'The messages are very long',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: algorithms leak, get reverse-engineered, get standardized — design so the key is the ONLY secret. “Security through obscurity” is the anti-pattern this forbids.',
        'Quantum is a real but separate consideration (it halves symmetric strength and threatens some public-key math — hence post-quantum standards).',
        'Then nothing is secret — the principle demands the key stays private precisely because nothing else is.',
        'Length isn’t the threat model here.',
      ],
    },
    {
      kind: 'quiz',
      question: 'In public-key encryption, what may travel openly across the internet?',
      options: [
        'The public key — it can only lock (encrypt), never unlock',
        'The private key, if sent quickly',
        'Both keys, since they’re a pair',
        'Neither; all keys must stay offline',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: publishing the padlock costs nothing — that asymmetry is the entire solution to the key-sharing paradox.',
        'Speed doesn’t beat an eavesdropper who records everything — the private key NEVER travels.',
        'The pair’s power comes from splitting their fates: one public, one never-leaves-home.',
        'Then nobody could ever encrypt TO you — the public half is meant to roam.',
      ],
    },
    {
      kind: 'quiz',
      question: 'A digital signature on your robot’s firmware update proves…',
      options: [
        'The update came from the private-key holder and wasn’t altered — authenticity and integrity',
        'The update is free of bugs',
        'The update is encrypted',
        'The update installs faster',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: verify-with-public-key means only the manufacturer’s private key could have signed it, and any tampering breaks the check. THE defense against malicious updates.',
        'Signatures authenticate origin, not quality — signed bugs install perfectly.',
        'Signing and encrypting are separate operations (often combined, never identical).',
        'Verification adds a moment — the value is trust, not speed.',
      ],
    },
    {
      kind: 'quiz',
      question: 'Why does TLS use public-key math only for the handshake, then switch to symmetric AES?',
      options: [
        'Public-key operations are thousands of times slower — use them once to agree on a fast session key',
        'AES is more secure than all public-key systems',
        'Laws limit public-key usage per connection',
        'The handshake deletes the need for keys',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: the classic hybrid — asymmetric solves key-sharing, symmetric does the heavy lifting. Best tool per phase, like your robot’s learned-perception + classical-control sandwich.',
        'Neither is “more secure” per se — they solve different problems at different speeds.',
        'Engineering, not legislation.',
        'The handshake CREATES the session key — everything after depends on it.',
      ],
    },
  ],
  extraPractice: [
    {
      question: 'An attacker records your robot’s encrypted commands and REPLAYS them later (“open door” again at 3 AM). Encryption alone fails here because…',
      options: [
        'The replayed ciphertext is genuinely valid — you also need freshness: nonces, timestamps or counters',
        'Encryption always includes replay protection',
        'Replayed packets decrypt to garbage',
        'Recording encrypted traffic is impossible',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: secrecy ≠ freshness. A perfectly encrypted “open door” is perfectly reusable unless messages carry a number-used-once. Protocol design is more than a cipher — same lesson as MQTT’s duplicate commands.',
        'Base encryption doesn’t — protocols must add it explicitly (TLS does; naive custom protocols forget).',
        'It decrypts to exactly what it said before — that’s the attack.',
        'Anyone on the path can record bytes — assume they do.',
      ],
    },
    {
      question: 'Where does key-space arithmetic meet your complexity lesson?',
      options: [
        'Crypto needs easy-to-verify-with-key, infeasible-to-find-without — a deliberately engineered find≫check gap',
        'Encryption proves P = NP',
        'Complexity theory forbids encryption',
        'They are unrelated fields',
      ],
      correctIndex: 0,
      explanations: [
        'Correct: decrypting with the key is the cheap check; cracking without it is the astronomical find. Cryptography is the constructive use of computational hardness — P = NP (practically) would collapse it.',
        'Rather the opposite — working crypto is evidence FOR the gap being real.',
        'It ENABLES it, by supplying trustworthy hardness.',
        'They’re the same subject wearing different hats.',
      ],
    },
  ],
}
