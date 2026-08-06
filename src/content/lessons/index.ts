import type { Lesson } from '../../types'
import { bitsLesson } from './bits'
import { gatesLesson } from './gates'
import { adderLesson } from './adder'
import { cpuLesson } from './cpu'
import { hcwExamLesson } from './hcw-exam'
import { mathLinalgLesson } from './math-linalg'
import { mathLinalg2Lesson } from './math-linalg-2'
import { mathLinalg3Lesson } from './math-linalg-3'
import { mathLinalg4Lesson } from './math-linalg-4'
import { mathLinalg5Lesson } from './math-linalg-5'
import { mathCalculusLesson } from './math-calculus'
import { mathCalculus2Lesson } from './math-calculus-2'
import { mathCalculus3Lesson } from './math-calculus-3'
import { mathCalculus4Lesson } from './math-calculus-4'
import { mathCalculus5Lesson } from './math-calculus-5'
import { progVariablesLesson } from './prog-variables'
import { mathProbLesson } from './math-prob'
import { mathProb2Lesson } from './math-prob-2'
import { mathProb3Lesson } from './math-prob-3'
import { physForcesLesson } from './phys-forces'
import { physFirstPrinciplesLesson } from './phys-first-principles'
import { physElectricityLesson } from './phys-electricity'
import { roboSensingLesson } from './robo-sensing'
import { roboControlLesson } from './robo-control'
import { roboControl2Lesson } from './robo-control-2'
import { roboControl3Lesson } from './robo-control-3'
import { roboControl4Lesson } from './robo-control-4'
import { roboKinematicsLesson } from './robo-kinematics'
import { progFunctionsLesson } from './prog-functions'
import { progDataLesson } from './prog-data'
import { progData2Lesson } from './prog-data-2'
import { progData3Lesson } from './prog-data-3'
import { progCLesson } from './prog-c'
import { progC2Lesson } from './prog-c-2'
import { progC3Lesson } from './prog-c-3'
import { mathLogicLesson } from './math-logic'
import { mathLogic2Lesson } from './math-logic-2'
import { mathLogic3Lesson } from './math-logic-3'
import { physEnergyLesson } from './phys-energy'
import { roboEmbeddedLesson } from './robo-embedded'
import { roboRosLesson } from './robo-ros'
import { histComputingLesson } from './hist-computing'
import { histScientificRevolutionLesson } from './hist-scientific-revolution'
import { histIndustrialLesson } from './hist-industrial'
import { chemAtomsLesson } from './chem-atoms'
import { chemReactionsLesson } from './chem-reactions'
import { chemMaterialsLesson } from './chem-materials'
import { chemQuantLesson } from './chem-quant'
import { chemQuant2Lesson } from './chem-quant-2'
import { chemQuant3Lesson } from './chem-quant-3'
import { mecheMachinesLesson } from './meche-machines'
import { mecheGearsLesson } from './meche-gears'
import { mecheMakingLesson } from './meche-making'
import { mecheExamLesson } from './meche-exam'
import { algoBigoLesson } from './algo-bigo'
import { algoStructuresLesson } from './algo-structures'
import { algoGraphsLesson } from './algo-graphs'
import { algoSortingLesson } from './algo-sorting'
import { algoPathsLesson } from './algo-paths'
import { algoDpLesson } from './algo-dp'
import { aiSearchLesson } from './ai-search'
import { aiLearningLesson } from './ai-learning'
import { aiLearning2Lesson } from './ai-learning-2'
import { aiLearning3Lesson } from './ai-learning-3'
import { aiNeuralLesson } from './ai-neural'
import { osProcessesLesson } from './os-processes'
import { osMemoryLesson } from './os-memory'
import { osIoLesson } from './os-io'
import { osConcurrencyLesson } from './os-concurrency'
import { osConcurrency2Lesson } from './os-concurrency-2'
import { osConcurrency3Lesson } from './os-concurrency-3'
import { netStackLesson } from './net-stack'
import { netPacketsLesson } from './net-packets'
import { netProtocolsLesson } from './net-protocols'
import { netSocketsLesson } from './net-sockets'
import { netTcpLesson } from './net-tcp'
import { netRoutingLesson } from './net-routing'
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
import { physElectricity2Lesson } from './phys-electricity-2'
import { physElectricity3Lesson } from './phys-electricity-3'
import { mathMvLesson } from './math-mv'
import { mathMv2Lesson } from './math-mv-2'
import { mathMv3Lesson } from './math-mv-3'
import { mathStatsLesson } from './math-stats'
import { mathStats2Lesson } from './math-stats-2'
import { mathStats3Lesson } from './math-stats-3'
import { elecComponentsLesson } from './elec-components'
import { elecTransistorsLesson } from './elec-transistors'
import { elecMotorsLesson } from './elec-motors'
import { elecExamLesson } from './elec-exam'
import { physStaticsLesson } from './phys-statics'
import { physStatics2Lesson } from './phys-statics-2'
import { physStatics3Lesson } from './phys-statics-3'
import { progPythonLesson } from './prog-python'
import { progPython2Lesson } from './prog-python-2'
import { progPython3Lesson } from './prog-python-3'

export const lessons: Record<string, Lesson> = {
  bits: bitsLesson,
  gates: gatesLesson,
  adder: adderLesson,
  cpu: cpuLesson,
  'hcw-exam': hcwExamLesson,
  'math-linalg': mathLinalgLesson,
  'math-linalg-2': mathLinalg2Lesson,
  'math-linalg-3': mathLinalg3Lesson,
  'math-linalg-4': mathLinalg4Lesson,
  'math-linalg-5': mathLinalg5Lesson,
  'math-calculus': mathCalculusLesson,
  'math-calculus-2': mathCalculus2Lesson,
  'math-calculus-3': mathCalculus3Lesson,
  'math-calculus-4': mathCalculus4Lesson,
  'math-calculus-5': mathCalculus5Lesson,
  'prog-variables': progVariablesLesson,
  'math-prob': mathProbLesson,
  'math-prob-2': mathProb2Lesson,
  'math-prob-3': mathProb3Lesson,
  'phys-first-principles': physFirstPrinciplesLesson,
  'phys-forces': physForcesLesson,
  'phys-electricity': physElectricityLesson,
  'robo-sensing': roboSensingLesson,
  'robo-control': roboControlLesson,
  'robo-control-2': roboControl2Lesson,
  'robo-control-3': roboControl3Lesson,
  'robo-control-4': roboControl4Lesson,
  'robo-kinematics': roboKinematicsLesson,
  'prog-functions': progFunctionsLesson,
  'prog-data': progDataLesson,
  'prog-data-2': progData2Lesson,
  'prog-data-3': progData3Lesson,
  'prog-c': progCLesson,
  'prog-c-2': progC2Lesson,
  'prog-c-3': progC3Lesson,
  'math-logic': mathLogicLesson,
  'math-logic-2': mathLogic2Lesson,
  'math-logic-3': mathLogic3Lesson,
  'phys-energy': physEnergyLesson,
  'robo-embedded': roboEmbeddedLesson,
  'robo-ros': roboRosLesson,
  'hist-computing': histComputingLesson,
  'hist-scientific-revolution': histScientificRevolutionLesson,
  'hist-industrial': histIndustrialLesson,
  'chem-atoms': chemAtomsLesson,
  'chem-reactions': chemReactionsLesson,
  'chem-materials': chemMaterialsLesson,
  'chem-quant': chemQuantLesson,
  'chem-quant-2': chemQuant2Lesson,
  'chem-quant-3': chemQuant3Lesson,
  'meche-machines': mecheMachinesLesson,
  'meche-gears': mecheGearsLesson,
  'meche-making': mecheMakingLesson,
  'meche-exam': mecheExamLesson,
  'algo-bigo': algoBigoLesson,
  'algo-structures': algoStructuresLesson,
  'algo-graphs': algoGraphsLesson,
  'algo-sorting': algoSortingLesson,
  'algo-paths': algoPathsLesson,
  'algo-dp': algoDpLesson,
  'ai-search': aiSearchLesson,
  'ai-learning': aiLearningLesson,
  'ai-learning-2': aiLearning2Lesson,
  'ai-learning-3': aiLearning3Lesson,
  'ai-neural': aiNeuralLesson,
  'os-processes': osProcessesLesson,
  'os-memory': osMemoryLesson,
  'os-io': osIoLesson,
  'os-concurrency': osConcurrencyLesson,
  'os-concurrency-2': osConcurrency2Lesson,
  'os-concurrency-3': osConcurrency3Lesson,
  'net-stack': netStackLesson,
  'net-packets': netPacketsLesson,
  'net-protocols': netProtocolsLesson,
  'net-sockets': netSocketsLesson,
  'net-tcp': netTcpLesson,
  'net-routing': netRoutingLesson,
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
  'phys-electricity-2': physElectricity2Lesson,
  'phys-electricity-3': physElectricity3Lesson,
  'math-mv': mathMvLesson,
  'math-mv-2': mathMv2Lesson,
  'math-mv-3': mathMv3Lesson,
  'math-stats': mathStatsLesson,
  'math-stats-2': mathStats2Lesson,
  'math-stats-3': mathStats3Lesson,
  'elec-components': elecComponentsLesson,
  'elec-transistors': elecTransistorsLesson,
  'elec-motors': elecMotorsLesson,
  'elec-exam': elecExamLesson,
  'phys-statics': physStaticsLesson,
  'phys-statics-2': physStatics2Lesson,
  'phys-statics-3': physStatics3Lesson,
  'prog-python': progPythonLesson,
  'prog-python-2': progPython2Lesson,
  'prog-python-3': progPython3Lesson,
}
