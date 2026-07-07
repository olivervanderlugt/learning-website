import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  addEdge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react'
import type { Connection, Edge, Node, NodeProps, NodeTypes, IsValidConnection } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { motion } from 'motion/react'
import { useStore } from '../store'
import type { GateKind, GatePuzzle } from '../types'

// ---------- circuit evaluation ----------

type Bit = 0 | 1
type Signal = Bit | null

interface SimNode {
  id: string
  kind: GateKind
}

interface Wire {
  source: string
  target: string
  targetHandle?: string | null
}

function evalCircuit(
  simNodes: SimNode[],
  wires: Wire[],
  inputVals: Record<string, Bit>,
): Record<string, Signal> {
  const byId = new Map(simNodes.map((n) => [n.id, n]))
  const memo = new Map<string, Signal>()
  const visiting = new Set<string>()

  const inEdge = (id: string, handle: string) =>
    wires.find((w) => w.target === id && (w.targetHandle ?? 'in') === handle)

  function val(id: string): Signal {
    if (memo.has(id)) return memo.get(id)!
    if (visiting.has(id)) return null // cycle → undefined signal
    visiting.add(id)
    const n = byId.get(id)
    let out: Signal = null
    if (n) {
      if (n.kind === 'INPUT') {
        out = inputVals[id] ?? 0
      } else {
        const handles = n.kind === 'NOT' || n.kind === 'OUTPUT' ? ['in'] : ['a', 'b']
        const vals = handles.map((h) => {
          const e = inEdge(id, h)
          return e ? val(e.source) : null
        })
        if (!vals.some((v) => v === null)) {
          const [x, y] = vals as Bit[]
          switch (n.kind) {
            case 'NOT':
              out = x ? 0 : 1
              break
            case 'OUTPUT':
              out = x
              break
            case 'NAND':
              out = x && y ? 0 : 1
              break
            case 'AND':
              out = x && y ? 1 : 0
              break
            case 'OR':
              out = x || y ? 1 : 0
              break
            case 'XOR':
              out = x !== y ? 1 : 0
              break
          }
        }
      }
    }
    visiting.delete(id)
    memo.set(id, out)
    return out
  }

  const result: Record<string, Signal> = {}
  for (const n of simNodes) result[n.id] = val(n.id)
  return result
}

// ---------- flow node components ----------

type GateNodeData = {
  kind: GateKind
  label: string
  value: Signal
  onToggle?: () => void
}
type GateFlowNode = Node<GateNodeData>

const gateColors: Record<string, string> = {
  NAND: 'border-cyan-400 text-cyan-300',
  NOT: 'border-violet-400 text-violet-300',
  AND: 'border-emerald-400 text-emerald-300',
  OR: 'border-amber-400 text-amber-300',
  XOR: 'border-rose-400 text-rose-300',
}

const handleCls = '!h-2.5 !w-2.5 !border-2 !border-slate-500 !bg-slate-900'

function GateNode({ data, selected }: NodeProps<GateFlowNode>) {
  const two = data.kind !== 'NOT'
  return (
    <div
      className={[
        'relative rounded-lg border-2 bg-slate-900 px-4 py-3 font-mono text-sm font-bold',
        gateColors[data.kind] ?? 'border-slate-500',
        selected ? 'ring-2 ring-slate-100/70' : '',
      ].join(' ')}
    >
      {two ? (
        <>
          <Handle id="a" type="target" position={Position.Left} style={{ top: '30%' }} className={handleCls} />
          <Handle id="b" type="target" position={Position.Left} style={{ top: '70%' }} className={handleCls} />
        </>
      ) : (
        <Handle id="in" type="target" position={Position.Left} className={handleCls} />
      )}
      {data.kind}
      <span className={`ml-2 ${data.value === 1 ? 'text-cyan-300' : 'text-slate-500'}`}>
        {data.value ?? '·'}
      </span>
      <Handle id="out" type="source" position={Position.Right} className={handleCls} />
    </div>
  )
}

function InputNode({ data }: NodeProps<GateFlowNode>) {
  const on = data.value === 1
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm font-bold text-slate-300">{data.label}</span>
      <button
        onClick={data.onToggle}
        className={[
          'relative flex h-12 w-12 items-center justify-center rounded-lg border-2 font-mono text-xl font-black transition-all',
          on
            ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.5)]'
            : 'border-slate-600 bg-slate-950 text-slate-500 hover:border-slate-400',
        ].join(' ')}
      >
        {on ? 1 : 0}
        <Handle id="out" type="source" position={Position.Right} className={handleCls} />
      </button>
    </div>
  )
}

function OutputNode({ data }: NodeProps<GateFlowNode>) {
  const v = data.value
  return (
    <div className="relative flex items-center gap-2 rounded-lg border-2 border-slate-500 bg-slate-900 px-3 py-2.5">
      <Handle id="in" type="target" position={Position.Left} className={handleCls} />
      <span
        className={`font-mono text-xl font-black ${
          v === null ? 'text-slate-600' : v === 1 ? 'text-cyan-300' : 'text-slate-400'
        }`}
      >
        {v ?? '?'}
      </span>
      <span className="font-mono text-xs font-bold text-slate-400">{data.label}</span>
    </div>
  )
}

const nodeTypes: NodeTypes = {
  gate: GateNode,
  circuitInput: InputNode,
  circuitOutput: OutputNode,
}

// ---------- the sandbox ----------

export default function GateSandbox({
  puzzle,
  onComplete,
}: {
  puzzle: GatePuzzle
  onComplete: (score: number) => void
}) {
  const theme = useStore((s) => s.theme)
  const initialNodes = useMemo<GateFlowNode[]>(() => {
    const ins: GateFlowNode[] = puzzle.inputLabels.map((label, i) => ({
      id: `in-${i}`,
      type: 'circuitInput',
      position: { x: 0, y: 60 + i * 110 },
      data: { kind: 'INPUT' as GateKind, label, value: 0 as Signal },
      deletable: false,
      draggable: true,
    }))
    const outs: GateFlowNode[] = puzzle.outputLabels.map((label, i) => ({
      id: `out-${i}`,
      type: 'circuitOutput',
      position: { x: 520, y: 80 + i * 110 },
      data: { kind: 'OUTPUT' as GateKind, label, value: null },
      deletable: false,
      draggable: true,
    }))
    return [...ins, ...outs]
  }, [puzzle])

  const [nodes, setNodes, onNodesChange] = useNodesState<GateFlowNode>(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const [inputVals, setInputVals] = useState<Record<string, Bit>>({})
  const [solved, setSolved] = useState(false)
  const gateCount = useRef(0)

  const simNodes: SimNode[] = useMemo(
    () => nodes.map((n) => ({ id: n.id, kind: n.data.kind })),
    [nodes],
  )

  // Live values for the current toggle state.
  const liveValues = useMemo(
    () => evalCircuit(simNodes, edges, inputVals),
    [simNodes, edges, inputVals],
  )

  // Check every truth-table row.
  const rowResults = useMemo(
    () =>
      puzzle.truthTable.map((row) => {
        const vals: Record<string, Bit> = {}
        row.inputs.forEach((v, i) => (vals[`in-${i}`] = v as Bit))
        const res = evalCircuit(simNodes, edges, vals)
        const actual = row.outputs.map((_, i) => res[`out-${i}`])
        const pass = row.outputs.every((exp, i) => actual[i] === exp)
        return { actual, pass }
      }),
    [puzzle, simNodes, edges],
  )

  const allPass = rowResults.every((r) => r.pass)
  useEffect(() => {
    if (allPass && !solved) {
      setSolved(true)
      onComplete(1)
    }
  }, [allPass, solved, onComplete])

  const addGate = (kind: GateKind) => {
    const n = gateCount.current++
    setNodes((nds) => [
      ...nds,
      {
        id: `g-${kind}-${n}`,
        type: 'gate',
        position: { x: 180 + (n % 3) * 60, y: 60 + ((n * 90) % 270) },
        data: { kind, label: kind, value: null },
      },
    ])
  }

  const isValidConnection: IsValidConnection = useCallback(
    (conn) => {
      if (conn.source === conn.target) return false
      // one wire per input handle
      return !edges.some(
        (e) => e.target === conn.target && (e.targetHandle ?? 'in') === (conn.targetHandle ?? 'in'),
      )
    },
    [edges],
  )

  const onConnect = useCallback(
    (conn: Connection) => setEdges((eds) => addEdge(conn, eds)),
    [setEdges],
  )

  // Inject live values (and input toggle handlers) into node data for rendering.
  const displayNodes = useMemo(
    () =>
      nodes.map((n) => ({
        ...n,
        data: {
          ...n.data,
          value: n.data.kind === 'INPUT' ? (inputVals[n.id] ?? 0) : (liveValues[n.id] ?? null),
          onToggle:
            n.data.kind === 'INPUT'
              ? () => setInputVals((v) => ({ ...v, [n.id]: v[n.id] ? 0 : 1 }))
              : undefined,
        },
      })),
    [nodes, liveValues, inputVals],
  )

  const displayEdges = useMemo(
    () =>
      edges.map((e) => {
        const v = liveValues[e.source]
        return {
          ...e,
          style: {
            stroke: v === 1 ? '#22d3ee' : v === 0 ? '#475569' : '#7f1d1d',
            strokeWidth: 2.5,
          },
          animated: v === 1,
        }
      }),
    [edges, liveValues],
  )

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Add gate:</span>
        {puzzle.palette.map((k) => (
          <button
            key={k}
            onClick={() => addGate(k)}
            className={`rounded-lg border-2 bg-slate-900 px-3 py-1.5 font-mono text-xs font-bold transition hover:bg-slate-800 active:scale-95 ${gateColors[k]}`}
          >
            + {k}
          </button>
        ))}
        <span className="ml-auto text-xs text-slate-500">
          wire: drag (or click) ○ → ○ · remove: click a wire, or gate + ⌫ · test: click the inputs
        </span>
      </div>

      <div className="flex min-h-0 flex-1 gap-3">
        <div className="relative min-w-0 flex-1 overflow-hidden rounded-xl border border-slate-800">
          <ReactFlow
            nodes={displayNodes}
            edges={displayEdges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            isValidConnection={isValidConnection}
            onEdgeClick={(_, edge) => setEdges((eds) => eds.filter((e) => e.id !== edge.id))}
            deleteKeyCode={['Backspace', 'Delete']}
            fitView
            fitViewOptions={{ padding: 0.3 }}
            minZoom={0.4}
            maxZoom={1.6}
            proOptions={{ hideAttribution: true }}
            colorMode={theme}
            className="bg-slate-950"
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color={theme === 'light' ? '#cbd5e1' : '#1e293b'} />
          </ReactFlow>
          {solved && (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="pointer-events-none absolute inset-x-0 bottom-4 mx-auto w-fit rounded-full border border-emerald-500/50 bg-emerald-500/15 px-5 py-2 text-sm font-bold text-emerald-300 backdrop-blur"
            >
              ⚡ Circuit complete — every row matches!
            </motion.div>
          )}
        </div>

        <div className="w-56 shrink-0 overflow-y-auto rounded-xl border border-slate-800 bg-slate-900/70 p-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Truth table</p>
          <table className="mt-2 w-full text-center font-mono text-sm">
            <thead>
              <tr className="text-[11px] text-slate-500">
                {puzzle.inputLabels.map((l) => (
                  <th key={l} className="pb-1 font-semibold">{l}</th>
                ))}
                {puzzle.outputLabels.map((l) => (
                  <th key={l} className="pb-1 font-semibold text-cyan-300">{l}</th>
                ))}
                <th className="pb-1 font-semibold">got</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {puzzle.truthTable.map((row, i) => {
                const r = rowResults[i]
                return (
                  <tr key={i} className={r.pass ? 'text-emerald-300' : 'text-slate-300'}>
                    {row.inputs.map((v, j) => (
                      <td key={j} className="py-1">{v}</td>
                    ))}
                    {row.outputs.map((v, j) => (
                      <td key={j} className="py-1 text-cyan-300">{v}</td>
                    ))}
                    <td className="py-1">{r.actual.map((a) => a ?? '·').join(' ')}</td>
                    <td className="py-1">{r.pass ? '✓' : ''}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            The table re-checks your circuit on every change — all rows green wins.
          </p>
        </div>
      </div>
    </div>
  )
}
