import { djangoModule } from './django/config'
import { flaskModule } from './flask/config'
import { pythonModule } from './python/config'

export const moduleConfigs = [pythonModule, flaskModule, djangoModule]

export const moduleCount = moduleConfigs.length

export const lessonCount = moduleConfigs.reduce(
  (total, module) =>
    total +
    module.trilha.reduce((sum, section) => sum + section.lessons.length, 0),
  0,
)

const exerciseFiles = import.meta.glob('./**/*.json', { eager: true })
export const exerciseCount = Object.keys(exerciseFiles).length

export { pythonModule, flaskModule, djangoModule }
