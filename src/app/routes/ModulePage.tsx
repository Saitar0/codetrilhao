import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { getAllModuleLessons, getModuleById } from '../../lib/module-content'
import { useProgressStore } from '../../store/progress'

export default function ModulePage() {
  const { modulo } = useParams()
  const module = getModuleById(modulo ?? '')
  const lessons = getAllModuleLessons()[modulo ?? ''] ?? []
  const completedLessons = useProgressStore((state) => state.completedLessons)
  const [notified, setNotified] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return Boolean(window.localStorage.getItem(`codetrilha-notify:${modulo}`))
  })

  const progress = useMemo(() => {
    if (!module || !module.trilha.length) return 0
    const total = module.trilha.reduce((sum, section) => sum + section.lessons.length, 0)
    const learned = completedLessons.filter((lessonId) => lessonId.startsWith(`${module.id}:`)).length
    return total ? Math.round((learned / total) * 100) : 0
  }, [completedLessons, module])

  if (!module) {
    return <div className="empty-state glass">Módulo não encontrado.</div>
  }

  if (module.status === 'coming-soon') {
    return (
      <section className="soon-panel glass">
        <span className="eyebrow eyebrow--inline">Em breve</span>
        <h1>{module.name}</h1>
        <p>{module.description}</p>
        <button
          type="button"
          className="button button--primary"
          onClick={() => {
            localStorage.setItem(`codetrilha-notify:${modulo}`, 'true')
            setNotified(true)
          }}
          disabled={notified}
        >
          {notified ? 'Aviso registrado' : 'Avise-me quando sair'}
        </button>
      </section>
    )
  }

  return (
    <section className="module-overview">
      <div className="module-hero glass">
        <div>
          <span className="eyebrow eyebrow--inline">Módulo</span>
          <h1>{module.name}</h1>
          <p>{module.description}</p>
        </div>
        <div className="module-progress-card">
          <span>Progresso total</span>
          <strong>{progress}%</strong>
          <div className="progress-track">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="module-actions">
        <Link to={`/${module.id}/${lessons[0]?.id ?? 'introducao'}`} className="button button--primary">
          Continuar de onde parou
        </Link>
      </div>

      <div className="section-grid">
        {module.trilha.map((section) => (
          <article key={section.id} className="glass section-card">
            <h3>{section.title}</h3>
            <ul>
              {section.lessons.map((lessonId) => {
                const lesson = lessons.find((item) => item.id === lessonId)
                if (!lesson) return null
                return (
                  <li key={lesson.id}>
                    <Link to={`/${module.id}/${lesson.id}`}>{lesson.title}</Link>
                  </li>
                )
              })}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
