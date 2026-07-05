import type { ComponentType } from 'react'
import BinaryCounter from './BinaryCounter'
import BinaryConverter from './BinaryConverter'
import RippleAdder from './RippleAdder'
import CpuSim from './CpuSim'
import VectorPlayground from './VectorPlayground'
import SlopeExplorer from './SlopeExplorer'
import ProbabilitySim from './ProbabilitySim'
import ForceSim from './ForceSim'
import OhmsLawSim from './OhmsLawSim'
import AdcSim from './AdcSim'
import PidSim from './PidSim'
import ArmSim from './ArmSim'
import ComputingTimeline from './ComputingTimeline'
import AtomBuilder from './AtomBuilder'
import BigORace from './BigORace'
import PathfinderSim from './PathfinderSim'
import GradientDescent from './GradientDescent'
import NeuralPlayground from './NeuralPlayground'

export interface GameProps {
  onComplete: (score: number) => void
}

/** gameId (from content) → game component. One game = one file. */
export const games: Record<string, ComponentType<GameProps>> = {
  'binary-counter': BinaryCounter,
  'binary-converter': BinaryConverter,
  'ripple-adder': RippleAdder,
  'cpu-sim': CpuSim,
  'vector-playground': VectorPlayground,
  'slope-explorer': SlopeExplorer,
  'probability-sim': ProbabilitySim,
  'force-sim': ForceSim,
  'ohms-law-sim': OhmsLawSim,
  'adc-sim': AdcSim,
  'pid-sim': PidSim,
  'arm-sim': ArmSim,
  'computing-timeline': ComputingTimeline,
  'atom-builder': AtomBuilder,
  'big-o-race': BigORace,
  'pathfinder-sim': PathfinderSim,
  'gradient-descent': GradientDescent,
  'neural-playground': NeuralPlayground,
}
