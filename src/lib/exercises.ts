import type { ExerciseDefinition } from '../types/exercise'

type ExerciseEntry = {
  moduleId: string
  exercise: ExerciseDefinition
}

const exerciseFiles = import.meta.glob('../modules/**/exercises/*.json', { eager: true }) as Record<
  string,
  { default?: ExerciseDefinition } | ExerciseDefinition | undefined
>

const exerciseEntries: ExerciseEntry[] = Object.entries(exerciseFiles)
  .map(([filepath, imported]) => {
    const exercise = imported && 'default' in imported ? imported.default : imported
    if (!exercise) return null

    const match = filepath.match(/\/modules\/([^/]+)\/exercises\//)
    const moduleId = match?.[1]
    if (!moduleId) return null

    return { moduleId, exercise }
  })
  .filter((entry): entry is ExerciseEntry => Boolean(entry))
  .sort((left, right) => left.exercise.titulo.localeCompare(right.exercise.titulo))

export function getAllExercises(): ExerciseDefinition[] {
  return exerciseEntries.map((entry) => entry.exercise)
}

export function getExercisesByModule(moduleId: string): ExerciseDefinition[] {
  return exerciseEntries
    .filter((entry) => entry.moduleId === moduleId)
    .map((entry) => entry.exercise)
}

export function getExerciseByModuleAndId(moduleId: string, exerciseId: string): ExerciseDefinition | undefined {
  return getExercisesByModule(moduleId).find((exercise) => exercise.id === exerciseId)
}
