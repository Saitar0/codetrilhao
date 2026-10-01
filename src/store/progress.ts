import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ExerciseStatus = 'nao-iniciado' | 'tentado' | 'resolvido'

export function canUnlockExerciseVariation(
  variation: 'V1' | 'V2' | 'V3',
  solvedByVariation: Partial<Record<'V1' | 'V2' | 'V3', number>> = { V1: 0, V2: 0, V3: 0 },
): boolean {
  const counts = { V1: 0, V2: 0, V3: 0, ...solvedByVariation }

  if (variation === 'V1') return true
  if (variation === 'V2') return counts.V1 >= 3
  if (variation === 'V3') return counts.V2 >= 3

  return false
}

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
        const moduleConfig = (() => {
          const modules = import.meta.glob('../modules/**/config.ts', { eager: true }) as Record<string, { [key: string]: unknown }>
          for (const entry of Object.values(modules)) {
            const maybe = Object.values(entry).find((value) => {
              if (typeof value !== 'object' || value === null) return false
              const candidate = value as { id?: string }
              return candidate.id === moduleId
            }) as { id?: string; trilha?: Array<{ lessons: string[] }> } | undefined

            if (maybe?.id === moduleId && Array.isArray(maybe.trilha)) {
              return maybe
            }
          }

          return undefined
        })()

        // Count unique base lesson slugs from config (ignore child pages with suffixes)
        const totalLessons = moduleConfig?.trilha
          ?.flatMap((section) => section.lessons)
          ?.map((s) => String(s).split('-')[0])
          ?.
          reduce((set, slug) => set.add(slug), new Set())
          ?.
          size ?? 0

        // Count completed lessons by base slug as well (lessonId has format 'module:slug' or 'module:slug-sub')
        const completed = new Set(
          get()
            .completedLessons
            .filter((lesson) => lesson.startsWith(`${moduleId}:`))
            .map((l) => l.split(':')[1].split('-')[0]),
        ).size

        if (!totalLessons) return 0
        return Math.round((completed / totalLessons) * 100)
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
