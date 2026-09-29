import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

import { StudyLayout } from '../../components/layout/StudyLayout'
import { mdxComponents } from '../../components/lesson/MdxComponents'
import { getExercisesByModule } from '../../lib/exercises'
import { getMiniProjectsByModule, getModuleById } from '../../lib/module-content'
import { useProgressStore } from '../../store/progress'

const lessonFiles = import.meta.glob('../../modules/**/*.mdx', { eager: true }) as Record<string, { default?: unknown; frontmatter?: Record<string, unknown> }>

function parseMdxModule(modulePath: string) {
  const mod = lessonFiles[modulePath]
  if (!mod?.default) return null
  return mod.default as React.ComponentType
}

export default function LessonPage() {
  const { modulo, aula } = useParams()
  const module = getModuleById(modulo ?? '')
  const exerciseStatuses = useProgressStore((state) => state.exerciseStatuses)

  const lessonInfo = useMemo(() => {
    if (!modulo || !aula) return null

    const matchingPath = Object.keys(lessonFiles).find((path) => {
      const normalized = path.split('/').pop()?.replace(/\.mdx$/, '')
      return path.includes(`/${modulo}/`) && normalized === aula && !path.includes('/mini-projetos/')
    })

    if (!matchingPath) return null

    const lessonModule = lessonFiles[matchingPath]
    const frontmatter = lessonModule.frontmatter as { titulo?: string; descricao?: string } | undefined
    const component = parseMdxModule(matchingPath)

    return {
      title: frontmatter?.titulo ?? aula,
      description: frontmatter?.descricao ?? '',
      component,
    }
  }, [aula, modulo])

  const lessonContent = useMemo(() => {
    if (!lessonInfo?.component) return null

    const MDXComponent = lessonInfo.component as unknown as React.ComponentType<{
      components?: Record<string, unknown>
    }>

    return <MDXComponent components={mdxComponents} />
  }, [lessonInfo])

  const exercisesForLesson = useMemo(() => {
    if (!modulo || !aula) return []
    return getExercisesByModule(modulo).filter((exercise) => exercise.aulaRelacionada === aula)
  }, [aula, modulo])

  const miniProjectsForLesson = useMemo(() => {
    if (!modulo || !aula) return []
    return getMiniProjectsByModule(modulo).filter((project) => project.topic === aula)
  }, [aula, modulo])

  const exerciseGroups = useMemo(() => {
    const groups: Record<'V1' | 'V2' | 'V3', typeof exercisesForLesson> = { V1: [], V2: [], V3: [] }
    for (const exercise of exercisesForLesson) {
      const variation = (exercise.variacao ?? 'V1') as 'V1' | 'V2' | 'V3'
      groups[variation].push(exercise)
    }
    return groups
  }, [exercisesForLesson])

  const projectGroups = useMemo(() => {
    const groups: Record<'V1' | 'V2' | 'V3', typeof miniProjectsForLesson> = { V1: [], V2: [], V3: [] }
    for (const project of miniProjectsForLesson) {
      const variation = project.variation as 'V1' | 'V2' | 'V3'
      groups[variation].push(project)
    }
    return groups
  }, [miniProjectsForLesson])

  if (!module) {
    return <div className="empty-state glass">Módulo não encontrado.</div>
  }

  if (!aula) return null

  return (
    <StudyLayout title={lessonInfo?.title ?? aula} currentLessonId={aula}>
      <div className="lesson-header" id="top">
        <span className="eyebrow eyebrow--inline">{module.name}</span>
        <h1>{lessonInfo?.title ?? aula}</h1>
        {lessonInfo?.description ? <p>{lessonInfo.description}</p> : null}
      </div>
      <div className="lesson-content">{lessonContent}</div>

      {Object.entries(exerciseGroups).some(([, group]) => group.length > 0) && (
        <section className="lesson-section">
          <h3>Exercícios deste tópico</h3>
          {(['V1', 'V2', 'V3'] as const).map((variation) => {
            const group = exerciseGroups[variation]
            if (!group.length) return null

            return (
              <div key={variation} style={{ marginBottom: '1rem' }}>
                <h4>{variation}</h4>
                <div className="exercise-list__grid">
                  {group.map((exercise) => {
                    const status = exerciseStatuses[exercise.id] ?? 'nao-iniciado'
                    return (
                      <Link key={exercise.id} to={`/${modulo}/exercicios/${exercise.id}`} className="exercise-card glass">
                        <div className="exercise-card__top">
                          <span className={`pill pill--${exercise.dificuldade}`}>{exercise.dificuldade}</span>
                          <span className="exercise-card__xp">{exercise.xp} XP</span>
                        </div>
                        <h3>{exercise.titulo}</h3>
                        <p>{exercise.topico}</p>
                        <div className="exercise-card__meta">
                          <span>{status === 'resolvido' ? 'Resolvido' : status === 'tentado' ? 'Tentado' : 'Não iniciado'}</span>
                          <span>{exercise.tags[0] ?? 'python'}</span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </section>
      )}

      {Object.entries(projectGroups).some(([, group]) => group.length > 0) && (
        <section className="lesson-section">
          <h3>Mini projetos</h3>
          {(['V1', 'V2', 'V3'] as const).map((variation) => {
            const group = projectGroups[variation]
            if (!group.length) return null

            return (
              <div key={variation} style={{ marginBottom: '1rem' }}>
                <h4>{variation}</h4>
                <div className="exercise-list__grid">
                  {group.map((project) => (
                    <Link key={project.id} to={project.path} className="exercise-card glass">
                      <div className="exercise-card__top">
                        <span className="pill">{project.variation}</span>
                        <span className="exercise-card__xp">{project.duration} min</span>
                      </div>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="exercise-card__meta">
                        <span>{project.execution === 'navegador' ? 'Navegador' : 'Local'}</span>
                        <span>{project.level}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </section>
      )}
    </StudyLayout>
  )
}
