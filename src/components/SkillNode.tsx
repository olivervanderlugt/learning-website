import { Handle, Position } from '@xyflow/react'
import type { NodeProps, Node } from '@xyflow/react'
import type { NodeStatus, Subject } from '../types'

export const subjectStyles: Record<
  Subject,
  { border: string; text: string; dot: string; badge: string; glow: string }
> = {
  cs: {
    border: 'border-cs',
    text: 'text-cs',
    dot: 'bg-cs',
    badge: 'bg-cs/15 text-cs',
    glow: 'shadow-[0_0_18px_rgba(34,211,238,0.35)]',
  },
  math: {
    border: 'border-math',
    text: 'text-math',
    dot: 'bg-math',
    badge: 'bg-math/15 text-math',
    glow: 'shadow-[0_0_18px_rgba(167,139,250,0.35)]',
  },
  physics: {
    border: 'border-physics',
    text: 'text-physics',
    dot: 'bg-physics',
    badge: 'bg-physics/15 text-physics',
    glow: 'shadow-[0_0_18px_rgba(251,191,36,0.35)]',
  },
  engineering: {
    border: 'border-engineering',
    text: 'text-engineering',
    dot: 'bg-engineering',
    badge: 'bg-engineering/15 text-engineering',
    glow: 'shadow-[0_0_18px_rgba(52,211,153,0.35)]',
  },
  robotics: {
    border: 'border-robotics',
    text: 'text-robotics',
    dot: 'bg-robotics',
    badge: 'bg-robotics/15 text-robotics',
    glow: 'shadow-[0_0_18px_rgba(251,113,133,0.35)]',
  },
  history: {
    border: 'border-fuchsia-400',
    text: 'text-fuchsia-300',
    dot: 'bg-fuchsia-400',
    badge: 'bg-fuchsia-500/15 text-fuchsia-300',
    glow: 'shadow-[0_0_18px_rgba(232,121,249,0.35)]',
  },
  chemistry: {
    border: 'border-teal-400',
    text: 'text-teal-300',
    dot: 'bg-teal-400',
    badge: 'bg-teal-500/15 text-teal-300',
    glow: 'shadow-[0_0_18px_rgba(45,212,191,0.35)]',
  },
}

export const subjectNames: Record<Subject, string> = {
  cs: 'Computer Science',
  math: 'Math',
  physics: 'Physics',
  engineering: 'Engineering',
  robotics: 'Robotics',
  history: 'History',
  chemistry: 'Chemistry',
}

export type SkillNodeData = {
  title: string
  subject: Subject
  status: NodeStatus
  hasLesson: boolean
  isExam?: boolean
}

export type SkillFlowNode = Node<SkillNodeData, 'skill'>

export function SkillNode({ data, selected }: NodeProps<SkillFlowNode>) {
  const s = subjectStyles[data.subject]
  const locked = data.status === 'locked'
  const mastered = data.status === 'mastered'

  return (
    <div
      className={[
        'w-48 rounded-xl border-2 px-3 py-2.5 transition-all duration-200',
        locked
          ? 'border-slate-700 bg-slate-900/80 opacity-60'
          : `${s.border} bg-slate-900 ${data.status === 'available' && data.hasLesson ? s.glow : ''}`,
        selected ? 'ring-2 ring-white/60' : '',
        'cursor-pointer hover:opacity-100',
      ].join(' ')}
    >
      <Handle type="target" position={Position.Top} className="!bg-slate-600 !border-0 !h-1.5 !w-1.5" />
      <div className="flex items-start gap-2">
        <span className="mt-0.5 text-sm leading-none">
          {mastered ? '✅' : locked ? '🔒' : data.isExam ? '🏅' : data.hasLesson ? '▶️' : '✨'}
        </span>
        <div className="min-w-0">
          <div className={`text-[13px] font-semibold leading-tight ${locked ? 'text-slate-400' : 'text-slate-100'}`}>
            {data.title}
          </div>
          <div className={`mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-medium ${locked ? 'bg-slate-800 text-slate-500' : s.badge}`}>
            {subjectNames[data.subject]}
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-slate-600 !border-0 !h-1.5 !w-1.5" />
    </div>
  )
}

export type LabelNodeData = { title: string }
export type LabelFlowNode = Node<LabelNodeData, 'domainLabel'>

export function DomainLabelNode({ data }: NodeProps<LabelFlowNode>) {
  return (
    <div className="w-48 text-[11px] font-bold uppercase tracking-widest text-slate-500">
      {data.title}
    </div>
  )
}
