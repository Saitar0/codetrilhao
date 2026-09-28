import type { ModuleConfig } from '../modules/types'
import type { LessonMeta, ModuleRouteLesson } from '../types/lesson'

const modules = import.meta.glob('../modules/**/config.ts', { eager: true }) as Record<string, { [key: string]: unknown }>

export function getModuleById(moduleId: string): ModuleConfig | undefined {
  for (const key of Object.keys(modules)) {
    const exported = modules[key]
    const config = Object.values(exported).find((value) => {
      if (typeof value !== 'object' || value === null) return false
      const maybe = value as { id?: string }
      return maybe.id === moduleId
    }) as { id?: string; name?: string; description?: string; color?: string; accent?: string; icon?: string; status?: string; trilha?: ModuleConfig['trilha'] }

    if (config && config.id) return config as ModuleConfig
  }

  return undefined
}

export function getAllModuleLessons(): Record<string, ModuleRouteLesson[]> {
  const lessonFiles = import.meta.glob('../modules/**/*.mdx', { eager: true }) as Record<string, { default?: unknown; frontmatter?: LessonMeta }>
  const result: Record<string, ModuleRouteLesson[]> = {}

  for (const [filepath, moduleFile] of Object.entries(lessonFiles)) {
    const frontmatter = moduleFile.frontmatter
    const moduleId = filepath.split('/modules/')[1]?.split('/')[0] ?? 'unknown'

    if (!frontmatter) continue

    result[moduleId] ??= []
    result[moduleId].push({
      id: filepath.split('/').pop()?.replace(/\.mdx$/, '') ?? frontmatter.titulo,
      title: frontmatter.titulo,
      description: frontmatter.descricao,
      section: frontmatter.secao,
      duration: frontmatter.tempo,
      level: frontmatter.nivel,
      keywords: frontmatter.palavrasChave,
      exercises: frontmatter.exercicios,
      path: `/${moduleId}/${(filepath.split('/').pop() ?? '').replace(/\.mdx$/, '')}`,
    })
  }

  return result
}
