import type { ExerciseDefinition } from '../types/exercise'

const exerciseFiles = import.meta.glob('../modules/**/exercises/*.json', { eager: true }) as Record<
  string,
  { default?: ExerciseDefinition } | ExerciseDefinition | undefined
>

export function getExercisesByModule(moduleId: string): ExerciseDefinition[] {
  return Object.entries(exerciseFiles)
    .map(([filepath, imported]) => {
      const exercise = imported && 'default' in imported ? imported.default : imported
      if (!exercise) return null
      const currentModule = filepath.split('/modules/')[1]?.split('/')[0]
      return currentModule === moduleId ? exercise : null
    })
    .filter((exercise): exercise is ExerciseDefinition => Boolean(exercise))
    .sort((left, right) => left.titulo.localeCompare(right.titulo))
}

export function getExerciseByModuleAndId(moduleId: string, exerciseId: string): ExerciseDefinition | undefined {
  return getExercisesByModule(moduleId).find((exercise) => exercise.id === exerciseId)
}
