import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ExerciseStatus = 'nao-iniciado' | 'tentado' | 'resolvido'

export type ProgressState = {
  xp: number
  streak: number
  completedLessons: string[]
  favoriteModules: string[]
  theme: 'dark' | 'light'
  exerciseAttempts: Record<string, number>
  exerciseStatuses: Record<string, ExerciseStatus>
  setTheme: (mode: 'dark' | 'light') => void
  toggleFavoriteModule: (moduleId: string) => void
  completeLesson: (lessonId: string) => void
  getModuleProgress: (moduleId: string) => number
  markExerciseAttempt: (exerciseId: string) => void
  spendHintXp: (exerciseId: string, amount: number) => void
  completeExercise: (exerciseId: string, xpGained: number) => void
  resetProgress: () => void
  getExerciseStatus: (exerciseId: string) => ExerciseStatus
  getLevelInfo: () => { level: number; currentLevelXp: number; nextLevelXp: number; progress: number }
}

const defaultState = {
  xp: 0,
  streak: 0,
  completedLessons: [],
  favoriteModules: ['python'],
  theme: 'dark' as const,
  exerciseAttempts: {},
  exerciseStatuses: {},
}

export function getLevelInfo(xp: number) {
  const level = Math.floor(xp / 100) + 1
  const levelStart = (level - 1) * 100
  const currentLevelXp = xp - levelStart
  const nextLevelXp = 100
  const progress = Math.min(100, (currentLevelXp / nextLevelXp) * 100)

  return {
    level,
    currentLevelXp,
    nextLevelXp,
    progress,
  }
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...defaultState,
      setTheme: (mode) => set({ theme: mode }),
      toggleFavoriteModule: (moduleId) =>
        set((state) => ({
          favoriteModules: state.favoriteModules.includes(moduleId)
            ? state.favoriteModules.filter((id) => id !== moduleId)
            : [...state.favoriteModules, moduleId],
        })),
      completeLesson: (lessonId) =>
        set((state) => {
          if (state.completedLessons.includes(lessonId)) {
            return state
          }

          return {
            completedLessons: [...state.completedLessons, lessonId],
            xp: state.xp + 50,
            streak: state.streak + 1,
          }
        }),
      getModuleProgress: (moduleId) => {
        const completed = get().completedLessons.filter((lesson) =>
          lesson.startsWith(`${moduleId}:`),
        )

        return completed.length > 0 ? Math.min(100, completed.length * 25) : 0
      },
      markExerciseAttempt: (exerciseId) =>
        set((state) => ({
          exerciseAttempts: {
            ...state.exerciseAttempts,
            [exerciseId]: (state.exerciseAttempts[exerciseId] ?? 0) + 1,
          },
          exerciseStatuses: {
            ...state.exerciseStatuses,
            [exerciseId]: state.exerciseStatuses[exerciseId] === 'resolvido' ? 'resolvido' : 'tentado',
          },
        })),
      spendHintXp: (exerciseId, amount) =>
        set((state) => ({
          xp: Math.max(0, state.xp - amount),
          exerciseStatuses: {
            ...state.exerciseStatuses,
            [exerciseId]: state.exerciseStatuses[exerciseId] === 'resolvido' ? 'resolvido' : 'tentado',
          },
        })),
      completeExercise: (exerciseId, xpGained) =>
        set((state) => {
          const attempts = state.exerciseAttempts[exerciseId] ?? 0
          const resolved = state.exerciseStatuses[exerciseId] === 'resolvido'

          if (resolved) {
            return state
          }

          return {
            xp: state.xp + xpGained,
            streak: state.streak + 1,
            exerciseAttempts: {
              ...state.exerciseAttempts,
              [exerciseId]: Math.max(attempts, 1),
            },
            exerciseStatuses: {
              ...state.exerciseStatuses,
              [exerciseId]: 'resolvido',
            },
          }
        }),
      resetProgress: () => set(() => ({ ...defaultState })),
      getExerciseStatus: (exerciseId) => get().exerciseStatuses[exerciseId] ?? 'nao-iniciado',
      getLevelInfo: () => getLevelInfo(get().xp),
    }),
    {
      name: 'codetrilha-progress',
      partialize: (state) => ({
        xp: state.xp,
        streak: state.streak,
        completedLessons: state.completedLessons,
        favoriteModules: state.favoriteModules,
        theme: state.theme,
        exerciseAttempts: state.exerciseAttempts,
        exerciseStatuses: state.exerciseStatuses,
      }),
    },
  ),
)
