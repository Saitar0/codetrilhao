export type LessonFrontmatter = {
  titulo: string
  descricao: string
  secao: string
  ordem: number
  tempo: number
  nivel: string
  palavrasChave: string[]
  exercicios: string[]
}

export type LessonMeta = LessonFrontmatter & {
  slug: string
  moduleId: string
  filepath: string
}

export type ModuleRouteLesson = {
  id: string
  title: string
  description: string
  section: string
  duration: number
  level: string
  keywords: string[]
  exercises: string[]
  path: string
}
