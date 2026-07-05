import type { Lesson } from '../../types'
import { bitsLesson } from './bits'
import { gatesLesson } from './gates'
import { adderLesson } from './adder'
import { cpuLesson } from './cpu'
import { hcwExamLesson } from './hcw-exam'
import { mathLinalgLesson } from './math-linalg'
import { mathCalculusLesson } from './math-calculus'
import { progVariablesLesson } from './prog-variables'
import { mathProbLesson } from './math-prob'
import { physForcesLesson } from './phys-forces'
import { physElectricityLesson } from './phys-electricity'
import { roboSensingLesson } from './robo-sensing'
import { roboControlLesson } from './robo-control'
import { roboKinematicsLesson } from './robo-kinematics'
import { progFunctionsLesson } from './prog-functions'
import { progDataLesson } from './prog-data'
import { mathLogicLesson } from './math-logic'
import { physEnergyLesson } from './phys-energy'
import { roboEmbeddedLesson } from './robo-embedded'
import { roboRosLesson } from './robo-ros'
import { histComputingLesson } from './hist-computing'
import { histScientificRevolutionLesson } from './hist-scientific-revolution'
import { histIndustrialLesson } from './hist-industrial'
import { chemAtomsLesson } from './chem-atoms'
import { chemReactionsLesson } from './chem-reactions'
import { chemMaterialsLesson } from './chem-materials'
import { algoBigoLesson } from './algo-bigo'
import { algoStructuresLesson } from './algo-structures'
import { algoGraphsLesson } from './algo-graphs'

export const lessons: Record<string, Lesson> = {
  bits: bitsLesson,
  gates: gatesLesson,
  adder: adderLesson,
  cpu: cpuLesson,
  'hcw-exam': hcwExamLesson,
  'math-linalg': mathLinalgLesson,
  'math-calculus': mathCalculusLesson,
  'prog-variables': progVariablesLesson,
  'math-prob': mathProbLesson,
  'phys-forces': physForcesLesson,
  'phys-electricity': physElectricityLesson,
  'robo-sensing': roboSensingLesson,
  'robo-control': roboControlLesson,
  'robo-kinematics': roboKinematicsLesson,
  'prog-functions': progFunctionsLesson,
  'prog-data': progDataLesson,
  'math-logic': mathLogicLesson,
  'phys-energy': physEnergyLesson,
  'robo-embedded': roboEmbeddedLesson,
  'robo-ros': roboRosLesson,
  'hist-computing': histComputingLesson,
  'hist-scientific-revolution': histScientificRevolutionLesson,
  'hist-industrial': histIndustrialLesson,
  'chem-atoms': chemAtomsLesson,
  'chem-reactions': chemReactionsLesson,
  'chem-materials': chemMaterialsLesson,
  'algo-bigo': algoBigoLesson,
  'algo-structures': algoStructuresLesson,
  'algo-graphs': algoGraphsLesson,
}
