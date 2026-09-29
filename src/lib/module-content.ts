import type { ModuleConfig } from '../modules/types'
import type { LessonMeta, ModuleRouteLesson } from '../types/lesson'

const modules = import.meta.glob('../modules/**/config.ts', { eager: true }) as Record<string, { [key: string]: unknown }>

export type MiniProjectMeta = {
  id: string
  title: string
  description: string
  topic: string
  variation: 'V1' | 'V2' | 'V3'
  duration: number
  level: string
  execution: 'navegador' | 'local'
  keywords: string[]
  path: string
  moduleId: string
}

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
    if (filepath.includes('/mini-projetos/')) continue

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

export function getAllMiniProjects(): MiniProjectMeta[] {
  const projectFiles = import.meta.glob('../modules/**/*.mdx', { eager: true }) as Record<string, { default?: unknown; frontmatter?: Record<string, unknown> }>

  return Object.entries(projectFiles)
    .filter(([filepath]) => filepath.includes('/mini-projetos/'))
    .map(([filepath, moduleFile]) => {
      const frontmatter = moduleFile.frontmatter ?? {}
      const moduleId = filepath.split('/modules/')[1]?.split('/')[0] ?? 'unknown'
      const slug = filepath.split('/').pop()?.replace(/\.mdx$/, '') ?? ''

      const title = String(frontmatter.titulo ?? frontmatter.title ?? '')
      const description = String(frontmatter.descricao ?? frontmatter.description ?? '')
      const topic = String(frontmatter.topico ?? frontmatter.topic ?? '')
      const variation = (frontmatter.variacao ?? frontmatter.variation ?? 'V1') as MiniProjectMeta['variation']
      const duration = Number(frontmatter.tempo ?? frontmatter.duration ?? 0)
      const level = String(frontmatter.nivel ?? frontmatter.level ?? 'iniciante')
      const execution = (frontmatter.execucao ?? frontmatter.execution ?? 'navegador') as MiniProjectMeta['execution']
      const keywords = Array.isArray(frontmatter.palavrasChave)
        ? frontmatter.palavrasChave.map((word) => String(word))
        : Array.isArray(frontmatter.keywords)
          ? frontmatter.keywords.map((word) => String(word))
          : []

      return {
        id: slug,
        title,
        description,
        topic,
        variation,
        duration,
        level,
        execution,
        keywords,
        path: `/${moduleId}/projeto/${slug}`,
        moduleId,
      }
    })
    .filter((project) => project.id && project.title)
}

export function getMiniProjectsByModule(moduleId: string): MiniProjectMeta[] {
  return getAllMiniProjects().filter((project) => project.moduleId === moduleId)
}

export function getMiniProjectByModuleAndSlug(moduleId: string, slug: string): MiniProjectMeta | undefined {
  return getMiniProjectsByModule(moduleId).find((project) => project.id === slug)
}
