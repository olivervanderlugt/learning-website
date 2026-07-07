import type { Lesson } from '../../types'
import { bitsLesson } from './bits'
import { gatesLesson } from './gates'
import { adderLesson } from './adder'
import { cpuLesson } from './cpu'
import { hcwExamLesson } from './hcw-exam'
import { mathLinalgLesson } from './math-linalg'
import { mathLinalg2Lesson } from './math-linalg-2'
import { mathLinalg3Lesson } from './math-linalg-3'
import { mathCalculusLesson } from './math-calculus'
import { mathCalculus2Lesson } from './math-calculus-2'
import { mathCalculus3Lesson } from './math-calculus-3'
import { progVariablesLesson } from './prog-variables'
import { mathProbLesson } from './math-prob'
import { mathProb2Lesson } from './math-prob-2'
import { mathProb3Lesson } from './math-prob-3'
import { physForcesLesson } from './phys-forces'
import { physElectricityLesson } from './phys-electricity'
import { roboSensingLesson } from './robo-sensing'
import { roboControlLesson } from './robo-control'
import { roboControl2Lesson } from './robo-control-2'
import { roboControl3Lesson } from './robo-control-3'
import { roboKinematicsLesson } from './robo-kinematics'
import { progFunctionsLesson } from './prog-functions'
import { progDataLesson } from './prog-data'
import { progData2Lesson } from './prog-data-2'
import { progData3Lesson } from './prog-data-3'
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
import { aiSearchLesson } from './ai-search'
import { aiLearningLesson } from './ai-learning'
import { aiNeuralLesson } from './ai-neural'
import { osProcessesLesson } from './os-processes'
import { osMemoryLesson } from './os-memory'
import { osIoLesson } from './os-io'
import { netStackLesson } from './net-stack'
import { netPacketsLesson } from './net-packets'
import { netProtocolsLesson } from './net-protocols'
import { dbRelationalLesson } from './db-relational'
import { dbSqlLesson } from './db-sql'
import { dbTransactionsLesson } from './db-transactions'
import { theoryFsmLesson } from './theory-fsm'
import { theoryTuringLesson } from './theory-turing'
import { theoryComplexityLesson } from './theory-complexity'
import { secThreatsLesson } from './sec-threats'
import { secCryptoLesson } from './sec-crypto'
import { secSystemsLesson } from './sec-systems'
import { progExamLesson } from './prog-exam'
import { mathExamLesson } from './math-exam'
import { physExamLesson } from './phys-exam'
import { algoExamLesson } from './algo-exam'
import { osExamLesson } from './os-exam'
import { netExamLesson } from './net-exam'
import { dbExamLesson } from './db-exam'
import { theoryExamLesson } from './theory-exam'
import { aiExamLesson } from './ai-exam'
import { secExamLesson } from './sec-exam'
import { roboExamLesson } from './robo-exam'
import { histExamLesson } from './hist-exam'
import { chemExamLesson } from './chem-exam'
import { physForces2Lesson } from './phys-forces-2'
import { physForces3Lesson } from './phys-forces-3'
import { mathOdeLesson } from './math-ode'
import { mathOde2Lesson } from './math-ode-2'
import { mathOde3Lesson } from './math-ode-3'
import { roboKinematics2Lesson } from './robo-kinematics-2'
import { roboKinematics3Lesson } from './robo-kinematics-3'
import { roboEstimationLesson } from './robo-estimation'
import { roboEstimation2Lesson } from './robo-estimation-2'
import { roboEstimation3Lesson } from './robo-estimation-3'

export const lessons: Record<string, Lesson> = {
  bits: bitsLesson,
  gates: gatesLesson,
  adder: adderLesson,
  cpu: cpuLesson,
  'hcw-exam': hcwExamLesson,
  'math-linalg': mathLinalgLesson,
  'math-linalg-2': mathLinalg2Lesson,
  'math-linalg-3': mathLinalg3Lesson,
  'math-calculus': mathCalculusLesson,
  'math-calculus-2': mathCalculus2Lesson,
  'math-calculus-3': mathCalculus3Lesson,
  'prog-variables': progVariablesLesson,
  'math-prob': mathProbLesson,
  'math-prob-2': mathProb2Lesson,
  'math-prob-3': mathProb3Lesson,
  'phys-forces': physForcesLesson,
  'phys-electricity': physElectricityLesson,
  'robo-sensing': roboSensingLesson,
  'robo-control': roboControlLesson,
  'robo-control-2': roboControl2Lesson,
  'robo-control-3': roboControl3Lesson,
  'robo-kinematics': roboKinematicsLesson,
  'prog-functions': progFunctionsLesson,
  'prog-data': progDataLesson,
  'prog-data-2': progData2Lesson,
  'prog-data-3': progData3Lesson,
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
  'ai-search': aiSearchLesson,
  'ai-learning': aiLearningLesson,
  'ai-neural': aiNeuralLesson,
  'os-processes': osProcessesLesson,
  'os-memory': osMemoryLesson,
  'os-io': osIoLesson,
  'net-stack': netStackLesson,
  'net-packets': netPacketsLesson,
  'net-protocols': netProtocolsLesson,
  'db-relational': dbRelationalLesson,
  'db-sql': dbSqlLesson,
  'db-transactions': dbTransactionsLesson,
  'theory-fsm': theoryFsmLesson,
  'theory-turing': theoryTuringLesson,
  'theory-complexity': theoryComplexityLesson,
  'sec-threats': secThreatsLesson,
  'sec-crypto': secCryptoLesson,
  'sec-systems': secSystemsLesson,
  'prog-exam': progExamLesson,
  'math-exam': mathExamLesson,
  'phys-exam': physExamLesson,
  'algo-exam': algoExamLesson,
  'os-exam': osExamLesson,
  'net-exam': netExamLesson,
  'db-exam': dbExamLesson,
  'theory-exam': theoryExamLesson,
  'ai-exam': aiExamLesson,
  'sec-exam': secExamLesson,
  'robo-exam': roboExamLesson,
  'hist-exam': histExamLesson,
  'chem-exam': chemExamLesson,
  'phys-forces-2': physForces2Lesson,
  'phys-forces-3': physForces3Lesson,
  'math-ode': mathOdeLesson,
  'math-ode-2': mathOde2Lesson,
  'math-ode-3': mathOde3Lesson,
  'robo-kinematics-2': roboKinematics2Lesson,
  'robo-kinematics-3': roboKinematics3Lesson,
  'robo-estimation': roboEstimationLesson,
  'robo-estimation-2': roboEstimation2Lesson,
  'robo-estimation-3': roboEstimation3Lesson,
}
