import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { StudyLayout } from '../../components/layout/StudyLayout'
import { mdxComponents } from '../../components/lesson/MdxComponents'
import { getModuleById } from '../../lib/module-content'

const lessonFiles = import.meta.glob('../../modules/**/*.mdx', { eager: true }) as Record<string, { default?: unknown; frontmatter?: Record<string, unknown> }>

function parseMdxModule(modulePath: string) {
  const mod = lessonFiles[modulePath]
  if (!mod?.default) return null
  return mod.default as React.ComponentType
}

export default function LessonPage() {
  const { modulo, aula } = useParams()
  const module = getModuleById(modulo ?? '')

  const lessonInfo = useMemo(() => {
    if (!modulo || !aula) return null

    const matchingPath = Object.keys(lessonFiles).find((path) => {
      const normalized = path.split('/').pop()?.replace(/\.mdx$/, '')
      return path.includes(`/${modulo}/`) && normalized === aula
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
    </StudyLayout>
  )
}
