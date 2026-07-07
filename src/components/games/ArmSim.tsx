import { useEffect, useState } from 'react'

const L1 = 92
const L2 = 78
const D2R = Math.PI / 180
const BASE = { x: 130, y: 250 }

/** Forward kinematics of a 2-joint arm: hand position from the two joint angles. */
function fk(a1: number, a2: number) {
  const s = (a1 + a2) * D2R
  return { x: L1 * Math.cos(a1 * D2R) + L2 * Math.cos(s), y: L1 * Math.sin(a1 * D2R) + L2 * Math.sin(s) }
}
const TARGET = fk(35, 45) // guaranteed reachable; hint points here

const toScreen = (p: { x: number; y: number }) => ({ x: BASE.x + p.x, y: BASE.y - p.y })

export default function ArmSim({ onComplete }: { onComplete: (score: number) => void }) {
  const [a1, setA1] = useState(70)
  const [a2, setA2] = useState(20)
  const elbow = { x: L1 * Math.cos(a1 * D2R), y: L1 * Math.sin(a1 * D2R) }
  const hand = fk(a1, a2)
  const dist = Math.hypot(hand.x - TARGET.x, hand.y - TARGET.y)
  const solved = dist < 14

  useEffect(() => {
    if (solved) onComplete(1)
  }, [solved, onComplete])

  const S = { base: toScreen({ x: 0, y: 0 }), elbow: toScreen(elbow), hand: toScreen(hand), target: toScreen(TARGET) }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <p className="text-sm text-slate-300">
        A robot arm has two joints. Set each joint’s angle and the hand goes… somewhere. Going from angles to hand
        position is <b>forward kinematics</b>. Pose the arm so the hand reaches the <span className="font-bold" style={{ color: '#fbbf24' }}>star</span>.
      </p>

      <svg viewBox="0 0 440 300" className="mt-3 w-full rounded-lg bg-slate-950">
        {/* reach circle */}
        <circle cx={S.base.x} cy={S.base.y} r={L1 + L2} fill="none" stroke="#1e293b" strokeWidth={1} strokeDasharray="3 4" />
        {/* target */}
        <circle cx={S.target.x} cy={S.target.y} r={13} fill="none" stroke="#fbbf24" strokeWidth={2} strokeDasharray="3 3" />
        <text x={S.target.x} y={S.target.y + 6} textAnchor="middle" fontSize={16}>⭐</text>
        {/* upper arm */}
        <line x1={S.base.x} y1={S.base.y} x2={S.elbow.x} y2={S.elbow.y} stroke="#22d3ee" strokeWidth={6} strokeLinecap="round" />
        {/* forearm */}
        <line x1={S.elbow.x} y1={S.elbow.y} x2={S.hand.x} y2={S.hand.y} stroke="#a78bfa" strokeWidth={6} strokeLinecap="round" />
        {/* joints */}
        <circle cx={S.base.x} cy={S.base.y} r={6} fill="#64748b" />
        <circle cx={S.elbow.x} cy={S.elbow.y} r={5} fill="#94a3b8" />
        {/* var(--color-slate-200) flips with the theme so the hand dot stays visible on light backgrounds */}
        <circle cx={S.hand.x} cy={S.hand.y} r={6} fill={solved ? '#34d399' : 'var(--color-slate-200)'} />
      </svg>

      <div className="mt-3 grid grid-cols-2 gap-4">
        <label className="text-sm">
          <span className="text-slate-400">Shoulder: <span className="font-mono font-bold text-cyan-300">{a1}°</span></span>
          <input type="range" min={0} max={140} value={a1} onChange={(e) => setA1(+e.target.value)} className="mt-1 w-full accent-cyan-400" />
        </label>
        <label className="text-sm">
          <span className="text-slate-400">Elbow: <span className="font-mono font-bold text-violet-300">{a2}°</span></span>
          <input type="range" min={-20} max={150} value={a2} onChange={(e) => setA2(+e.target.value)} className="mt-1 w-full accent-violet-400" />
        </label>
      </div>

      {solved ? (
        <p className="mt-3 text-center text-sm font-semibold text-emerald-300">
          🎯 Reached it! Each joint is a rotation, and chaining them (shoulder then elbow) is a chain of matrix
          multiplications — the linear algebra you learned, running a real arm.
        </p>
      ) : (
        <p className="mt-2 text-center text-xs text-slate-500">
          Hand is {Math.round(dist)} px from the star. Hint: try shoulder ≈ 35°, elbow ≈ 45° — but any pose that reaches it wins.
        </p>
      )}
    </div>
  )
}
