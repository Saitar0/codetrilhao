export type ModuleStatus = 'available' | 'coming-soon'

export type ModuleLessonSection = {
  id: string
  title: string
  lessons: string[]
}

export type ModuleConfig = {
  id: string
  name: string
  description: string
  color: string
  accent: string
  icon: string
  status: ModuleStatus
  trilha: ModuleLessonSection[]
}
