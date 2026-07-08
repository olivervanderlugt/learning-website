import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  useReactFlow,
} from '@xyflow/react'
import type { Edge, NodeTypes } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import {
  domains,
  domainLabels,
  nodeById,
  nodes as curriculum,
  nodeTier,
  viewTiers,
} from '../content/curriculum'
import { useStore, nodeStatus, dueReviewIds, reviewDecay } from '../store'
import { SkillNode, DomainLabelNode, subjectStyles, subjectNames } from './SkillNode'
import type { SkillFlowNode, LabelFlowNode } from './SkillNode'
import type { KnowledgeNode, Subject } from '../types'

const nodeTypes: NodeTypes = {
  skill: SkillNode,
  domainLabel: DomainLabelNode,
}

const subjectHex: Record<Subject, string> = {
  cs: '#22d3ee',
  math: '#a78bfa',
  physics: '#fbbf24',
  engineering: '#34d399',
  robotics: '#fb7185',
  history: '#e879f9',
  chemistry: '#2dd4bf',
  electronics: '#fb923c',
}

/** Darker subject shades for the minimap on light backgrounds (mirrors html.light in index.css). */
const subjectHexLight: Record<Subject, string> = {
  cs: '#0891b2',
  math: '#7c3aed',
  physics: '#b45309',
  engineering: '#047857',
  robotics: '#e11d48',
  history: '#a21caf',
  chemistry: '#0f766e',
  electronics: '#c2410c',
}

const NODE_W = 192
const NODE_H = 80

/** Which subject each domain label belongs to (labels lack a subject field). */
const labelSubject: Record<string, Subject> = {
  'label-hcw': 'cs',
  'label-prog': 'cs',
  'label-math': 'math',
  'label-phys': 'physics',
  'label-os': 'cs',
  'label-algo': 'cs',
  'label-net': 'cs',
  'label-db': 'cs',
  'label-robo': 'robotics',
  'label-theory': 'cs',
  'label-ai': 'cs',
  'label-sec': 'cs',
  'label-hist': 'history',
  'label-chem': 'chemistry',
}

/**
 * Walk up a node's prereq chain until it lands at or below the given tier,
 * e.g. tier 0: phys-forces-3 → phys-forces. Higher-tier nodes always hang off
 * a chain whose first prereq leads back to a lower tier.
 */
const projectToTier = (id: string, tier: number): string => {
  let cur = id
  while (nodeTier(nodeById.get(cur)!) > tier) cur = nodeById.get(cur)!.prereqIds[0]
  return cur
}

/**
 * Build the visible edge list for a node set, dropping prereq edges that are
 * transitively implied by another prereq of the same node (e.g. bits→exam when
 * cpu→exam exists and cpu already requires bits). MAP display only — unlock
 * logic and the detail panel use the full list.
 */
function buildVisibleEdges(prereqsOf: (n: KnowledgeNode) => string[], include: (n: KnowledgeNode) => boolean) {
  const ancestors = new Map<string, Set<string>>()
  const ancestorsOf = (id: string): Set<string> => {
    const cached = ancestors.get(id)
    if (cached) return cached
    const set = new Set<string>()
    ancestors.set(id, set) // seed before recursing (prereq graph is a DAG)
    const node = nodeById.get(id)
    for (const p of node && include(node) ? prereqsOf(node) : []) {
      set.add(p)
      for (const a of ancestorsOf(p)) set.add(a)
    }
    return set
  }
  const edges: { source: string; target: string }[] = []
  for (const n of curriculum) {
    if (!include(n)) continue
    const prereqs = prereqsOf(n)
    for (const p of prereqs) {
      const implied = prereqs.some((q) => q !== p && ancestorsOf(q).has(p))
      if (!implied) edges.push({ source: p, target: n.id })
    }
  }
  return edges
}

/**
 * One edge list per view tier. At lower tiers, hidden higher-tier nodes have
 * their in/out edges re-anchored down the chain (deduped, self-loops dropped)
 * so the map stays connected.
 */
const edgesByTier = new Map(
  viewTiers.map(({ tier }) => [
    tier,
    buildVisibleEdges(
      (n) => [...new Set(n.prereqIds.map((p) => projectToTier(p, tier)))].filter((p) => p !== n.id),
      (n) => nodeTier(n) <= tier,
    ),
  ]),
)

/** Bounding box of a domain's nodes (plus its label above). */
function domainBounds(domainId: string) {
  const ns = curriculum.filter((n) => n.domainId === domainId)
  const xs = ns.map((n) => n.x)
  const ys = ns.map((n) => n.y)
  const minX = Math.min(...xs)
  const minY = Math.min(...ys) - 60
  return {
    x: minX,
    y: minY,
    width: Math.max(...xs) + NODE_W - minX,
    height: Math.max(...ys) + NODE_H - minY,
  }
}

export default function SkillTreeView() {
  return (
    <ReactFlowProvider>
      <SkillTreeInner />
    </ReactFlowProvider>
  )
}

function SkillTreeInner() {
  const masteredNodeIds = useStore((s) => s.masteredNodeIds)
  const knownNodeIds = useStore((s) => s.knownNodeIds)
  const reviews = useStore((s) => s.reviews)
  const openLesson = useStore((s) => s.openLesson)
  const theme = useStore((s) => s.theme)
  const viewTier = useStore((s) => s.viewTier)
  const setViewTier = useStore((s) => s.setViewTier)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  /** Empty = show every subject; otherwise only the chosen subjects are visible. */
  const [activeSubjects, setActiveSubjects] = useState<Set<Subject>>(new Set())
  const { fitBounds, fitView } = useReactFlow()

  const showAll = activeSubjects.size === 0
  const isVisible = (subj: Subject) => showAll || activeSubjects.has(subj)
  const nodeShown = (n: KnowledgeNode) => isVisible(n.subject) && nodeTier(n) <= viewTier

  const flowNodes = useMemo(() => {
    const due = new Set(dueReviewIds(reviews, masteredNodeIds))
    const skillNodes: (SkillFlowNode | LabelFlowNode)[] = curriculum.map((n) => ({
      id: n.id,
      type: 'skill' as const,
      position: { x: n.x, y: n.y },
      data: {
        title: n.title,
        subject: n.subject,
        status: nodeStatus(n.id, n.prereqIds, masteredNodeIds, knownNodeIds),
        hasLesson: !!n.hasLesson,
        isExam: !!n.isExam,
        due: due.has(n.id),
        decay: due.has(n.id) ? reviewDecay(reviews[n.id]) : 0,
      },
      width: NODE_W,
      height: NODE_H,
      draggable: false,
      hidden: !nodeShown(n),
    }))
    const labels: LabelFlowNode[] = domainLabels.map((l) => ({
      id: l.id,
      type: 'domainLabel' as const,
      position: { x: l.x, y: l.y },
      data: { title: l.title },
      width: NODE_W,
      height: 24,
      draggable: false,
      selectable: false,
      hidden: !isVisible(labelSubject[l.id] ?? 'cs'),
    }))
    return [...skillNodes, ...labels]
  }, [masteredNodeIds, knownNodeIds, reviews, activeSubjects, viewTier])

  /** Nodes filtered out — their edges are hidden too. */
  const hiddenNodeIds = useMemo(
    () => new Set(curriculum.filter((n) => !nodeShown(n)).map((n) => n.id)),
    [activeSubjects, viewTier],
  )

  const flowEdges = useMemo<Edge[]>(
    () =>
      (edgesByTier.get(viewTier) ?? edgesByTier.get(viewTiers[viewTiers.length - 1].tier)!).map(
        ({ source: p, target }) => {
          const active = masteredNodeIds.includes(p)
          return {
            id: `${p}->${target}`,
            source: p,
            target,
            style: {
              stroke: active ? '#38bdf8' : '#334155',
              strokeWidth: active ? 2 : 1.5,
            },
            animated: active && !masteredNodeIds.includes(target),
            hidden: hiddenNodeIds.has(p) || hiddenNodeIds.has(target),
          }
        },
      ),
    [masteredNodeIds, hiddenNodeIds, viewTier],
  )

  const toggleSubject = (s: Subject) =>
    setActiveSubjects((prev) => {
      const next = new Set(prev)
      next.has(s) ? next.delete(s) : next.add(s)
      return next
    })

  // Re-fit the view to whatever subjects are visible when the filter changes
  // (skip the very first render so the initial "How Computers Work" focus stays).
  const firstRun = useRef(true)
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    const t = setTimeout(() => fitView({ padding: 0.2, duration: 400 }), 60)
    return () => clearTimeout(t)
  }, [activeSubjects, viewTier, fitView])

  const selected: KnowledgeNode | undefined = selectedId ? nodeById.get(selectedId) : undefined

  const jumpToDomain = (domainId: string) => {
    if (domainId === 'all') fitView({ padding: 0.1, duration: 500 })
    else fitBounds(domainBounds(domainId), { padding: 0.15, duration: 500 })
  }

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => node.type === 'skill' && setSelectedId(node.id)}
        onPaneClick={() => setSelectedId(null)}
        onInit={() => fitBounds(domainBounds('how-computers-work'), { padding: 0.35 })}
        minZoom={0.08}
        maxZoom={1.6}
        proOptions={{ hideAttribution: true }}
        colorMode={theme}
        className="bg-slate-950"
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color={theme === 'light' ? '#cbd5e1' : '#1e293b'} />
        <Controls showInteractive={false} position="bottom-left" />
        <MiniMap
          position="bottom-right"
          pannable
          zoomable
          bgColor={theme === 'light' ? '#e2e8f0' : '#020617'}
          maskColor={theme === 'light' ? 'rgba(203,213,225,0.6)' : 'rgba(2, 6, 23, 0.75)'}
          nodeColor={(n) => {
            const kn = nodeById.get(n.id)
            if (!kn) return 'transparent'
            const st = nodeStatus(kn.id, kn.prereqIds, masteredNodeIds, knownNodeIds)
            // 'later' blocks were hardcoded near-black — invisible contrast on the
            // light minimap. Both the dim shade and the subject colors flip now.
            if (st === 'later') return theme === 'light' ? '#cbd5e1' : '#1e293b'
            return (theme === 'light' ? subjectHexLight : subjectHex)[kn.subject]
          }}
          nodeStrokeWidth={0}
        />
      </ReactFlow>

      {/* Navigation + legend bar */}
      <div className="absolute left-4 top-4 z-10 flex flex-wrap items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-3 py-2 backdrop-blur">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Jump to</span>
        <select
          onChange={(e) => jumpToDomain(e.target.value)}
          defaultValue="how-computers-work"
          className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-slate-200 outline-none focus:border-cyan-400"
        >
          {domains.map((d) => (
            <option key={d.id} value={d.id}>
              {d.title}
            </option>
          ))}
        </select>
        <button
          onClick={() => jumpToDomain('all')}
          className="rounded-lg border border-slate-700 px-2.5 py-1 text-xs text-slate-300 hover:bg-slate-800"
        >
          🗺 Whole map
        </button>
        <span className="mx-1 h-4 w-px bg-slate-700" />
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">View</span>
        <div className="flex overflow-hidden rounded-lg border border-slate-700">
          {viewTiers.map((t, i) => (
            <button
              key={t.tier}
              onClick={() => setViewTier(t.tier)}
              title={`${t.desc} Suggestions and unlocks are never affected.`}
              className={`px-2.5 py-1 text-[11px] font-medium transition ${
                i > 0 ? 'border-l border-slate-700' : ''
              } ${
                viewTier === t.tier
                  ? 'bg-violet-500/15 text-violet-300'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
        <span className="mx-1 h-4 w-px bg-slate-700" />
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Filter</span>
        {(Object.keys(subjectHex) as Subject[]).map((s) => {
          const on = showAll || activeSubjects.has(s)
          return (
            <button
              key={s}
              onClick={() => toggleSubject(s)}
              title={showAll ? `Show only ${subjectNames[s]}` : on ? `Hide ${subjectNames[s]}` : `Add ${subjectNames[s]}`}
              className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] transition ${
                on
                  ? 'border-slate-600 bg-slate-800 text-slate-200'
                  : 'border-transparent text-slate-500 opacity-50 hover:opacity-100'
              }`}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: subjectHex[s] }} />
              {subjectNames[s]}
            </button>
          )
        })}
        {!showAll && (
          <button
            onClick={() => setActiveSubjects(new Set())}
            className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2 py-0.5 text-[10px] text-cyan-300 hover:bg-cyan-500/20"
          >
            ✕ Clear
          </button>
        )}
      </div>

      {selected && (
        <DetailPanel node={selected} onStart={() => openLesson(selected.id)} onClose={() => setSelectedId(null)} />
      )}
    </div>
  )
}

const resourceIcon: Record<string, string> = {
  video: '▶️',
  interactive: '🎮',
  article: '📄',
  book: '📘',
  course: '🎓',
}

function DetailPanel({
  node,
  onStart,
  onClose,
}: {
  node: KnowledgeNode
  onStart: () => void
  onClose: () => void
}) {
  const masteredNodeIds = useStore((s) => s.masteredNodeIds)
  const knownNodeIds = useStore((s) => s.knownNodeIds)
  const markKnown = useStore((s) => s.markKnown)
  const unmarkKnown = useStore((s) => s.unmarkKnown)
  const quizScores = useStore((s) => s.quizScores)
  const status = nodeStatus(node.id, node.prereqIds, masteredNodeIds, knownNodeIds)
  const s = subjectStyles[node.subject]

  return (
    <aside className="absolute right-4 top-4 bottom-4 z-10 flex w-80 flex-col overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900/95 p-5 backdrop-blur">
      <div className="flex items-start justify-between gap-2">
        <span className={`rounded px-2 py-0.5 text-[11px] font-medium ${s.badge}`}>
          {subjectNames[node.subject]}
          {node.isExam && ' · exam'}
        </span>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-300" aria-label="Close">
          ✕
        </button>
      </div>

      <h2 className="mt-3 text-lg font-bold leading-snug">{node.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{node.description}</p>

      <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950/60 p-3">
        <div className={`text-[11px] font-bold uppercase tracking-wider ${s.text}`}>Why it matters</div>
        <p className="mt-1 text-sm leading-relaxed text-slate-300">{node.whyItMatters}</p>
      </div>

      {node.prereqIds.length > 0 && (
        <div className="mt-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Suggested first
          </div>
          <ul className="mt-1.5 space-y-1">
            {node.prereqIds.map((p) => {
              const pre = nodeById.get(p)
              const done = masteredNodeIds.includes(p)
              const skipped = knownNodeIds.includes(p)
              return (
                <li
                  key={p}
                  className={`flex items-center justify-between gap-2 text-sm ${done || skipped ? 'text-slate-300' : 'text-slate-500'}`}
                >
                  <span className="min-w-0 truncate">
                    {done ? '✅' : skipped ? '⏩' : '○'} {pre?.title ?? p}
                  </span>
                  {!done && (
                    <button
                      onClick={() => (skipped ? unmarkKnown(p) : markKnown(p))}
                      title={
                        skipped
                          ? 'Back to normal — suggest this lesson again'
                          : 'Skip the suggestion: mark this as something you already know (no XP, reversible)'
                      }
                      className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] ${
                        skipped
                          ? 'border-slate-600 text-slate-400 hover:bg-slate-800'
                          : 'border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {skipped ? '↩ undo' : 'know it'}
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {node.resources && node.resources.length > 0 && (
        <div className="mt-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Go deeper — hand-picked
          </div>
          <ul className="mt-1.5 space-y-2">
            {node.resources.map((r) => (
              <li key={r.url}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-lg border border-slate-800 bg-slate-950/60 p-2.5 transition hover:border-slate-600"
                >
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300">
                    {resourceIcon[r.type]} {r.title} ↗
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-slate-400">{r.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {quizScores[node.id] !== undefined && (
        <p className="mt-3 text-xs text-slate-500">
          Best {node.isExam ? 'exam' : 'quiz'} score: {Math.round(quizScores[node.id] * 100)}%
        </p>
      )}

      <div className="mt-auto pt-5">
        {status === 'known' && (
          <div className="mb-3 flex items-center justify-between gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2">
            <span className="text-xs text-slate-300">⏩ Marked as already known (no XP)</span>
            <button
              onClick={() => unmarkKnown(node.id)}
              className="shrink-0 rounded border border-slate-600 px-2 py-0.5 text-[11px] text-slate-300 hover:bg-slate-700"
            >
              ↩ back to normal
            </button>
          </div>
        )}
        {!node.hasLesson ? (
          <div className="rounded-lg bg-slate-800 px-4 py-2.5 text-center text-sm text-slate-400">
            ✨ Lesson coming soon — use the resources above meanwhile
          </div>
        ) : status === 'later' ? (
          <div className="space-y-2">
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs leading-relaxed text-amber-200">
              🕒 Nothing is locked — but this builds on the suggested lessons above. Do those first,
              tap “know it” on any you’ve already got, or dive straight in.
            </div>
            <button
              onClick={onStart}
              className="w-full rounded-lg border border-slate-600 px-4 py-2.5 text-sm font-bold text-slate-200 transition hover:bg-slate-800 active:scale-[0.98]"
            >
              {node.isExam ? 'Take the exam anyway →' : 'Start anyway →'}
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <button
              onClick={onStart}
              className="w-full rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-400 active:scale-[0.98]"
            >
              {status === 'mastered'
                ? node.isExam
                  ? 'Retake exam'
                  : 'Review lesson'
                : node.isExam
                  ? 'Take the exam →'
                  : 'Start lesson →'}
            </button>
            {status === 'available' && (
              <button
                onClick={() => markKnown(node.id)}
                className="w-full rounded-lg border border-slate-700 px-4 py-1.5 text-xs text-slate-400 transition hover:border-slate-500 hover:text-slate-200"
              >
                ⏩ Too easy? Mark as already known (no XP, reversible)
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}
