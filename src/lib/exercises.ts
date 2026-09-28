import type { ExerciseDefinition } from '../types/exercise'

const exerciseFiles = import.meta.glob('../modules/**/exercises/*.json', { eager: true }) as Record<
  string,
  { default?: ExerciseDefinition } | ExerciseDefinition | undefined
>

export function getAllExercises(): ExerciseDefinition[] {
  return Object.entries(exerciseFiles)
    .map(([filepath, imported]) => {
      const exercise = imported && 'default' in imported ? imported.default : imported
      if (!exercise) return null
      if (!filepath.includes('/modules/')) return null
      return exercise
    })
    .filter((exercise): exercise is ExerciseDefinition => Boolean(exercise))
    .sort((left, right) => left.titulo.localeCompare(right.titulo))
}

export function getExercisesByModule(moduleId: string): ExerciseDefinition[] {
  return getAllExercises().filter((exercise) => {
    const moduleSegment = exercise.id.split(':')[0]
    return moduleSegment === moduleId || exercise.id.startsWith(`${moduleId}:`)
  })
}

export function getExerciseByModuleAndId(moduleId: string, exerciseId: string): ExerciseDefinition | undefined {
  return getExercisesByModule(moduleId).find((exercise) => exercise.id === exerciseId)
}
