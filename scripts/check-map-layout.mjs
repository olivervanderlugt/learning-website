// Map layout checker — run after ANY node position/prereq change:
//   node scripts/check-map-layout.mjs
// Parses src/content/curriculum.ts, rebuilds the visible edge list for EVERY
// view tier (same transitive-redundancy filter + projectToTier re-anchoring as
// SkillTreeView), samples each edge's bezier mathematically (source-bottom →
// target-top, control offset d = 0.5·Δy down / 6.25·√Δy up, node rects
// 192×80), and reports edge→node penetrations, node-rect overlaps, and tight
// clearances (<25px). The map convention is ZERO hits in ALL tiers.
// Edge–edge crossings are fine (streets host them); edge–NODE hits are not.
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SRC = join(dirname(fileURLToPath(import.meta.url)), '../src/content/curriculum.ts')
const src = readFileSync(SRC, 'utf8')
const nodesSection = src.slice(src.indexOf('export const nodes'), src.indexOf('const resourcesByNode'))

const nodes = []
const re = /id: '([^']+)',[\s\S]*?prereqIds: \[([^\]]*)\],\s*x: (-?\d+),\s*y: (-?\d+),(\s*tier: (\d+),)?/g
let m
while ((m = re.exec(nodesSection))) {
  const prereqIds = [...m[2].matchAll(/'([^']+)'/g)].map((x) => x[1])
  nodes.push({ id: m[1], prereqIds, x: +m[3], y: +m[4], tier: m[6] ? +m[6] : undefined })
}
if (nodes.length < 82) throw new Error(`only parsed ${nodes.length} nodes — regex out of sync with curriculum.ts?`)

const byId = new Map(nodes.map((n) => [n.id, n]))
const isDepthId = (id) => /-\d$/.test(id)
const tierOf = (n) => n.tier ?? (isDepthId(n.id) ? 1 : 0)
const maxTier = Math.max(...nodes.map(tierOf))
const projectToTier = (id, tier) => {
  let cur = id
  while (tierOf(byId.get(cur)) > tier) cur = byId.get(cur).prereqIds[0]
  return cur
}
function buildVisibleEdges(prereqsOf, include) {
  const anc = new Map()
  const ancestorsOf = (id) => {
    if (anc.has(id)) return anc.get(id)
    const s = new Set()
    anc.set(id, s)
    const node = byId.get(id)
    for (const p of node && include(node) ? prereqsOf(node) : []) {
      s.add(p)
      for (const a of ancestorsOf(p)) s.add(a)
    }
    return s
  }
  const edges = []
  for (const n of nodes) {
    if (!include(n)) continue
    const prereqs = prereqsOf(n)
    for (const p of prereqs) {
      if (!prereqs.some((q) => q !== p && ancestorsOf(q).has(p))) edges.push([p, n.id])
    }
  }
  return edges
}

const W = 192, H = 80
let failed = false
for (let tier = 0; tier <= maxTier; tier++) {
  const include = (n) => tierOf(n) <= tier
  const edges = buildVisibleEdges(
    (n) => [...new Set(n.prereqIds.map((p) => projectToTier(p, tier)))].filter((p) => p !== n.id),
    include,
  )
  const vis = nodes.filter(include)
  const problems = [], tight = []
  for (const [s, t] of edges) {
    const a = byId.get(s), b = byId.get(t)
    const sx = a.x + W / 2, sy = a.y + H, tx = b.x + W / 2, ty = b.y
    const d = ty > sy ? 0.5 * (ty - sy) : 6.25 * Math.sqrt(sy - ty)
    const c1y = sy + d, c2y = ty - d
    const worst = new Map()
    for (let i = 0; i <= 300; i++) {
      const u = i / 300, v = 1 - u
      const x = (v * v * v + 3 * v * v * u) * sx + (3 * v * u * u + u * u * u) * tx
      const y = v * v * v * sy + 3 * v * v * u * c1y + 3 * v * u * u * c2y + u * u * u * ty
      for (const n of vis) {
        if (n.id === s || n.id === t) continue
        const dx = Math.max(n.x - x, x - (n.x + W), 0)
        const dy = Math.max(n.y - y, y - (n.y + H), 0)
        const pen = dx === 0 && dy === 0
          ? Math.min(x - n.x, n.x + W - x, y - n.y, n.y + H - y)
          : -Math.hypot(dx, dy)
        const prev = worst.get(n.id)
        if (prev === undefined || pen > prev) worst.set(n.id, pen)
      }
    }
    for (const [nid, pen] of worst) {
      if (pen >= 0) problems.push(`  HIT   ${s} → ${t} pierces ${nid} (depth ${pen.toFixed(0)}px)`)
      else if (pen > -25) tight.push(`  tight ${s} → ${t} vs ${nid} (clearance ${(-pen).toFixed(0)}px)`)
    }
  }
  const overlaps = []
  for (let i = 0; i < vis.length; i++)
    for (let j = i + 1; j < vis.length; j++) {
      const a = vis[i], b = vis[j]
      const gx = Math.max(a.x, b.x) - Math.min(a.x + W, b.x + W)
      const gy = Math.max(a.y, b.y) - Math.min(a.y + H, b.y + H)
      if (gx < 0 && gy < 0) overlaps.push(`  OVERLAP ${a.id} / ${b.id}`)
    }
  console.log(`=== tier ${tier}: ${vis.length} nodes, ${edges.length} edges ===`)
  console.log(problems.length ? problems.join('\n') : '  ✓ zero edge/node crossings')
  if (overlaps.length) console.log(overlaps.join('\n'))
  if (tight.length) console.log('  -- tight clearances (<25px):\n' + tight.join('\n'))
  if (problems.length || overlaps.length) failed = true
}
process.exit(failed ? 1 : 0)
