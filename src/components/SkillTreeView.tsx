import { useMemo, useState } from 'react'
import { ReactFlow, Background, Controls, BackgroundVariant } from '@xyflow/react'
import type { Edge, NodeTypes } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { domainLabels, nodeById, nodes as curriculum } from '../content/curriculum'
import { useStore, nodeStatus } from '../store'
import { SkillNode, DomainLabelNode, subjectStyles, subjectNames } from './SkillNode'
import type { SkillFlowNode, LabelFlowNode } from './SkillNode'
import type { KnowledgeNode } from '../types'

const nodeTypes: NodeTypes = {
  skill: SkillNode,
  domainLabel: DomainLabelNode,
}

export default function SkillTreeView() {
  const masteredNodeIds = useStore((s) => s.masteredNodeIds)
  const openLesson = useStore((s) => s.openLesson)
  const [selectedId, setSelectedId] = useState<string | null>(null)

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
      },
      draggable: false,
    }))
    const labels: LabelFlowNode[] = domainLabels.map((l) => ({
      id: l.id,
      type: 'domainLabel' as const,
      position: { x: l.x, y: l.y },
      data: { title: l.title },
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

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => node.type === 'skill' && setSelectedId(node.id)}
        onPaneClick={() => setSelectedId(null)}
        fitView
        fitViewOptions={{ padding: 0.15, maxZoom: 0.9 }}
        minZoom={0.2}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
        colorMode="dark"
        className="bg-slate-950"
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#1e293b" />
        <Controls showInteractive={false} position="bottom-left" />
      </ReactFlow>

      {selected && <DetailPanel node={selected} onStart={() => openLesson(selected.id)} onClose={() => setSelectedId(null)} />}
    </div>
  )
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

      {quizScores[node.id] !== undefined && (
        <p className="mt-3 text-xs text-slate-500">
          Best quiz score: {Math.round(quizScores[node.id] * 100)}%
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
            {status === 'mastered' ? 'Review lesson' : 'Start lesson →'}
          </button>
        ) : (
          <div className="rounded-lg bg-slate-800 px-4 py-2.5 text-center text-sm text-slate-400">
            ✨ Lesson coming soon
          </div>
        )}
      </div>
    </aside>
  )
}
