import { nodes } from './curriculum'
import type { EssentialSkill, SkillCoverage } from '../types'

/**
 * The employability reference skill set — 46 skills across 6 families, derived
 * from the reference courses in docs/employability-skills-coverage.md §2 by
 * deduplication and grouping only. Ids are kebab-case and stable; nodes get
 * tagged with them (`skills` / `skillsPartial`). `sources` records which
 * reference course(s) evidence each skill — provenance only, never tracked.
 */
export const essentialSkills: EssentialSkill[] = [
  // --- languages ---
  { id: 'c', name: 'C', family: 'languages', sources: [1] },
  { id: 'python', name: 'Python', family: 'languages', sources: [1, 2] },
  { id: 'csharp', name: 'C#', family: 'languages', sources: [3] },
  { id: 'dotnet', name: '.NET', family: 'languages', sources: [3] },
  { id: 'java', name: 'Java', family: 'languages', sources: [4, 5] },
  { id: 'sql', name: 'SQL', family: 'languages', sources: [1, 6] },

  // --- programming-concepts ---
  { id: 'variables-and-data-types', name: 'variables and data types', family: 'programming-concepts', sources: [3] },
  { id: 'control-flow', name: 'control flow', family: 'programming-concepts', sources: [3] },
  { id: 'methods', name: 'methods', family: 'programming-concepts', sources: [3] },
  { id: 'functions', name: 'functions', family: 'programming-concepts', sources: [2] },
  { id: 'exceptions', name: 'exceptions', family: 'programming-concepts', sources: [2] },
  { id: 'file-io', name: 'file I/O', family: 'programming-concepts', sources: [2] },
  { id: 'regular-expressions', name: 'regular expressions', family: 'programming-concepts', sources: [2] },
  { id: 'oop', name: 'object-oriented programming / OOP', family: 'programming-concepts', sources: [2, 4] },
  { id: 'advanced-oop', name: 'advanced OOP', family: 'programming-concepts', sources: [5] },
  { id: 'collections', name: 'collections', family: 'programming-concepts', sources: [5] },
  { id: 'interfaces', name: 'interfaces', family: 'programming-concepts', sources: [5] },
  { id: 'streams', name: 'streams', family: 'programming-concepts', sources: [5] },
  { id: 'gui-basics', name: 'GUI basics', family: 'programming-concepts', sources: [5] },
  { id: 'algorithms', name: 'algorithms', family: 'programming-concepts', sources: [1, 4] },
  { id: 'data-structures', name: 'data structures', family: 'programming-concepts', sources: [1] },
  { id: 'memory-management', name: 'memory management', family: 'programming-concepts', sources: [1] },

  // --- tooling-and-testing ---
  { id: 'debugging', name: 'debugging', family: 'tooling-and-testing', sources: [3] },
  { id: 'unit-tests', name: 'unit tests', family: 'tooling-and-testing', sources: [2] },
  { id: 'automated-testing', name: 'automated testing', family: 'tooling-and-testing', sources: [4] },
  { id: 'intellij', name: 'IntelliJ', family: 'tooling-and-testing', sources: [4] },
  { id: 'git', name: 'Git', family: 'tooling-and-testing', sources: [6] },
  { id: 'bash', name: 'Bash', family: 'tooling-and-testing', sources: [6] },

  // --- data-and-databases ---
  { id: 'postgresql', name: 'PostgreSQL', family: 'data-and-databases', sources: [6] },
  { id: 'database-design', name: 'database design', family: 'data-and-databases', sources: [6] },
  { id: 'normalisation', name: 'normalisation', family: 'data-and-databases', sources: [6] },
  { id: 'mongodb', name: 'MongoDB', family: 'data-and-databases', sources: [7] },

  // --- web-and-apis ---
  { id: 'rest-api-design', name: 'REST API design', family: 'web-and-apis', sources: [7] },
  { id: 'nodejs', name: 'Node.js', family: 'web-and-apis', sources: [7] },
  { id: 'express', name: 'Express', family: 'web-and-apis', sources: [7] },
  { id: 'http-methods', name: 'HTTP methods', family: 'web-and-apis', sources: [7] },
  { id: 'middleware', name: 'middleware', family: 'web-and-apis', sources: [7] },

  // --- analytics-and-bi ---
  { id: 'power-bi', name: 'Power BI', family: 'analytics-and-bi', sources: [8] },
  { id: 'power-query', name: 'Power Query', family: 'analytics-and-bi', sources: [8] },
  { id: 'dax', name: 'DAX', family: 'analytics-and-bi', sources: [8] },
  { id: 'data-visualisation', name: 'data visualisation', family: 'analytics-and-bi', sources: [8] },
  { id: 'row-level-security', name: 'row-level security', family: 'analytics-and-bi', sources: [8] },
  { id: 'workspace-management', name: 'workspace management', family: 'analytics-and-bi', sources: [8] },
  { id: 'data-modelling', name: 'data modelling', family: 'analytics-and-bi', sources: [8] },
  { id: 'excel-power-query', name: 'Excel Power Query', family: 'analytics-and-bi', sources: [8] },
  { id: 'excel-power-pivot', name: 'Excel Power Pivot', family: 'analytics-and-bi', sources: [8] },
]

/**
 * Per-skill coverage over the whole graph, derived on the fly from the authored
 * `skills` / `skillsPartial` node tags plus the learner's mastered set (like
 * achievements.ts — nothing new persisted). A skill is 'covered' when some node
 * teaches it at usable depth, 'partial' when a node only touches it, else 'gap'.
 */
export function computeSkillCoverage(masteredNodeIds: string[]): SkillCoverage[] {
  const mastered = new Set(masteredNodeIds)
  return essentialSkills.map((skill) => {
    const nodeIds = nodes.filter((n) => n.skills?.includes(skill.id)).map((n) => n.id)
    const partialNodeIds = nodes.filter((n) => n.skillsPartial?.includes(skill.id)).map((n) => n.id)
    const covering = new Set([...nodeIds, ...partialNodeIds])
    return {
      skill,
      nodeIds,
      partialNodeIds,
      masteredCount: [...covering].filter((id) => mastered.has(id)).length,
      state: nodeIds.length > 0 ? 'covered' : partialNodeIds.length > 0 ? 'partial' : 'gap',
    }
  })
}
