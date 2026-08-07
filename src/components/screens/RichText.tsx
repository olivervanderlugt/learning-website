/**
 * Fence-aware text rendering for lesson prose.
 *
 * Local-toolchain lessons (python, dev tooling, backend, C#) quote real
 * programs and terminal sessions inside ``` fences. Rendered as a plain <p>
 * those collapse to one unreadable line with literal ``` delimiters, because
 * HTML folds newlines — so every screen that shows authored prose runs its text
 * through here instead.
 *
 * Deliberately NOT a markdown engine: it splits on fences and nothing else.
 * Inline `backticks` are left as-is (that's the existing house style and every
 * merged lesson is written against it).
 *
 * Theming: the code block reuses CodeScreenView's palette (slate-950 ground,
 * slate-200 text, slate-800 border). The html.light block REVERSES the slate
 * ramp, so this re-themes with no extra work — and it avoids `text-white`,
 * which would not.
 */

export type TextPart = { type: 'text'; value: string } | { type: 'code'; value: string }

/**
 * Split authored text into prose and fenced-code parts. An unterminated fence
 * is treated as code to the end of the string, so a typo degrades to a
 * readable block rather than leaking ``` into the page.
 */
export function splitFences(text: string): TextPart[] {
  const parts: TextPart[] = []
  const push = (type: TextPart['type'], value: string) => {
    const v = type === 'code' ? value.replace(/^\n+|\n+$/g, '') : value.trim()
    if (v) parts.push({ type, value: v } as TextPart)
  }
  let rest = text
  for (;;) {
    const open = rest.indexOf('```')
    if (open === -1) break
    push('text', rest.slice(0, open))
    // Skip an optional language tag on the opening fence line.
    const afterOpen = rest.indexOf('\n', open)
    const bodyStart = afterOpen === -1 ? rest.length : afterOpen + 1
    const close = rest.indexOf('```', bodyStart)
    if (close === -1) {
      push('code', rest.slice(bodyStart))
      return parts
    }
    push('code', rest.slice(bodyStart, close))
    rest = rest.slice(close + 3)
  }
  push('text', rest)
  return parts
}

/** True when the text contains a fenced block worth splitting. */
export function hasFence(text: string): boolean {
  return text.includes('```')
}

export function CodeBlock({ value }: { value: string }) {
  return (
    <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-lg border border-slate-800 bg-slate-950 p-3 font-mono text-[13px] leading-relaxed text-slate-200">
      {value}
    </pre>
  )
}

/**
 * Render authored prose, promoting fenced blocks to <pre>. `className` styles
 * the prose paragraphs only; code blocks carry their own look.
 */
export default function RichText({ text, className }: { text: string; className?: string }) {
  const parts = splitFences(text)
  if (parts.length === 1 && parts[0].type === 'text') return <p className={className}>{parts[0].value}</p>
  return (
    <div className="space-y-3">
      {parts.map((part, i) =>
        part.type === 'code' ? (
          <CodeBlock key={i} value={part.value} />
        ) : (
          <p key={i} className={className}>
            {part.value}
          </p>
        ),
      )}
    </div>
  )
}

/**
 * Heading variant for question text: the leading prose stays an <h2> (so the
 * screen keeps one heading and its type scale), and any fenced program follows
 * it as a code block at body size.
 */
export function RichHeading({ text, className }: { text: string; className?: string }) {
  const parts = splitFences(text)
  if (!hasFence(text)) return <h2 className={className}>{text}</h2>
  const firstText = parts.findIndex((p) => p.type === 'text')
  return (
    <div className="space-y-3">
      {parts.map((part, i) =>
        part.type === 'code' ? (
          <CodeBlock key={i} value={part.value} />
        ) : i === firstText ? (
          <h2 key={i} className={className}>
            {part.value}
          </h2>
        ) : (
          <p key={i} className="text-[15px] leading-relaxed text-slate-300">
            {part.value}
          </p>
        ),
      )}
    </div>
  )
}
