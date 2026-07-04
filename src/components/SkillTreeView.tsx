import { useMemo, useState } from 'react'
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
import { domains, domainLabels, nodeById, nodes as curriculum } from '../content/curriculum'
import { useStore, nodeStatus } from '../store'
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
}

const NODE_W = 192
const NODE_H = 80

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
  const openLesson = useStore((s) => s.openLesson)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { fitBounds, fitView } = useReactFlow()

  const flowNodes = useMemo(() => {
    const skillNodes: (SkillFlowNode | LabelFlowNode)[] = curriculum.map((n) => ({
      id: n.id,
      type: 'skill' as const,
      position: { x: n.x, y: n.y },
      data: {
        title: n.title,
        subject: n.subject,
        status: nodeStatus(n.id, n.prereqIds, masteredNodeIds),
        hasLesson: !!n.hasLesson,
        isExam: !!n.isExam,
      },
      width: NODE_W,
      height: NODE_H,
      draggable: false,
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
    }))
    return [...skillNodes, ...labels]
  }, [masteredNodeIds])

  const flowEdges = useMemo<Edge[]>(
    () =>
      curriculum.flatMap((n) =>
        n.prereqIds.map((p) => {
          const active = masteredNodeIds.includes(p)
          return {
            id: `${p}->${n.id}`,
            source: p,
            target: n.id,
            style: {
              stroke: active ? '#38bdf8' : '#334155',
              strokeWidth: active ? 2 : 1.5,
            },
            animated: active && !masteredNodeIds.includes(n.id),
          }
        }),
      ),
    [masteredNodeIds],
  )

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
        minZoom={0.15}
        maxZoom={1.6}
        proOptions={{ hideAttribution: true }}
        colorMode="dark"
        className="bg-slate-950"
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#1e293b" />
        <Controls showInteractive={false} position="bottom-left" />
        <MiniMap
          position="bottom-right"
          pannable
          zoomable
          bgColor="#020617"
          maskColor="rgba(2, 6, 23, 0.75)"
          nodeColor={(n) => {
            const kn = nodeById.get(n.id)
            if (!kn) return 'transparent'
            const st = nodeStatus(kn.id, kn.prereqIds, masteredNodeIds)
            return st === 'locked' ? '#1e293b' : subjectHex[kn.subject]
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
        {(Object.keys(subjectHex) as Subject[]).map((s) => (
          <span key={s} className="flex items-center gap-1 text-[10px] text-slate-400">
            <span className="h-2 w-2 rounded-full" style={{ background: subjectHex[s] }} />
            {subjectNames[s]}
          </span>
        ))}
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
  const quizScores = useStore((s) => s.quizScores)
  const status = nodeStatus(node.id, node.prereqIds, masteredNodeIds)
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
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Requires</div>
          <ul className="mt-1.5 space-y-1">
            {node.prereqIds.map((p) => {
              const pre = nodeById.get(p)
              const done = masteredNodeIds.includes(p)
              return (
                <li key={p} className={`text-sm ${done ? 'text-slate-300' : 'text-slate-500'}`}>
                  {done ? '✅' : '🔒'} {pre?.title ?? p}
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
        {status === 'locked' ? (
          <div className="rounded-lg bg-slate-800 px-4 py-2.5 text-center text-sm text-slate-400">
            🔒 Master the prerequisites first
          </div>
        ) : node.hasLesson ? (
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
        ) : (
          <div className="rounded-lg bg-slate-800 px-4 py-2.5 text-center text-sm text-slate-400">
            ✨ Lesson coming soon — use the resources above meanwhile
          </div>
        )}
      </div>
    </aside>
  )
}
