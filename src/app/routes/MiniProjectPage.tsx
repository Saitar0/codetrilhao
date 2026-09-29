import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { StudyLayout } from '../../components/layout/StudyLayout'
import { mdxComponents } from '../../components/lesson/MdxComponents'
import { getMiniProjectByModuleAndSlug, getModuleById } from '../../lib/module-content'

const projectFiles = import.meta.glob('../../modules/**/*.mdx', { eager: true }) as Record<
  string,
  { default?: unknown; frontmatter?: Record<string, unknown> }
>

function parseMdxProject(modulePath: string) {
  const mod = projectFiles[modulePath]
  if (!mod?.default) return null
  return mod.default as React.ComponentType
}

export default function MiniProjectPage() {
  const { modulo, slug } = useParams()
  const module = getModuleById(modulo ?? '')

  const projectInfo = useMemo(() => {
    if (!modulo || !slug) return null

    const matchingPath = Object.keys(projectFiles).find((path) => {
      const normalized = path.split('/').pop()?.replace(/\.mdx$/, '')
      return path.includes(`/${modulo}/mini-projetos/`) && normalized === slug
    })

    if (!matchingPath) {
      const fallback = getMiniProjectByModuleAndSlug(modulo, slug)
      if (!fallback) return null
      return {
        title: fallback.title,
        description: fallback.description,
        variation: fallback.variation,
        duration: fallback.duration,
        execution: fallback.execution,
        component: null,
      }
    }

    const projectModule = projectFiles[matchingPath]
    const frontmatter = projectModule.frontmatter as {
      titulo?: string
      title?: string
      descricao?: string
      description?: string
      variacao?: string
      variation?: string
      tempo?: number
      duration?: number
      execucao?: string
      execution?: string
    } | undefined
    const component = parseMdxProject(matchingPath)

    return {
      title: frontmatter?.titulo ?? frontmatter?.title ?? slug,
      description: frontmatter?.descricao ?? frontmatter?.description ?? '',
      variation: frontmatter?.variacao ?? frontmatter?.variation ?? 'V1',
      duration: frontmatter?.tempo ?? frontmatter?.duration ?? 0,
      execution: frontmatter?.execucao ?? frontmatter?.execution ?? 'navegador',
      component,
    }
  }, [modulo, slug])

  const projectContent = useMemo(() => {
    if (!projectInfo?.component) return null

    const MDXComponent = projectInfo.component as unknown as React.ComponentType<{
      components?: Record<string, unknown>
    }>

    return <MDXComponent components={mdxComponents} />
  }, [projectInfo])

  if (!module) {
    return <div className="empty-state glass">Módulo não encontrado.</div>
  }

  if (!projectInfo) {
    return <div className="empty-state glass">Mini projeto não encontrado.</div>
  }

  return (
    <StudyLayout title={projectInfo.title}>
      <div className="lesson-header" id="top">
        <span className="eyebrow eyebrow--inline">{module.name}</span>
        <h1>{projectInfo.title}</h1>
        <div className="exercise-page__meta" style={{ marginTop: '0.75rem' }}>
          <span className="pill">{projectInfo.variation}</span>
          <span className="pill pill--muted">{projectInfo.duration} min</span>
          <span className="pill pill--muted">{projectInfo.execution === 'navegador' ? 'Roda no navegador' : 'Roda localmente'}</span>
        </div>
        {projectInfo.description ? <p>{projectInfo.description}</p> : null}
      </div>
      <div className="lesson-content">{projectContent}</div>
    </StudyLayout>
  )
}
