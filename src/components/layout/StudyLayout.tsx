import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, ChevronRight, Menu, PanelRightClose, Search, X } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { getExercisesByModule } from '../../lib/exercises'
import { useProgressStore } from '../../store/progress'
import { getModuleById, getAllModuleLessons } from '../../lib/module-content'
import type { ModuleRouteLesson } from '../../types/lesson'

const lessonMap = getAllModuleLessons()

export function StudyLayout({ children, title, currentLessonId }: {
  children: React.ReactNode
  title?: string
  currentLessonId?: string
}) {
  const { modulo, aula } = useParams()
  const navigate = useNavigate()
  const module = getModuleById(modulo ?? '')
  const completedLessons = useProgressStore((state) => state.completedLessons)
  const completeLesson = useProgressStore((state) => state.completeLesson)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})

  const lessons = lessonMap[modulo ?? ''] ?? []
  const currentIndex = lessons.findIndex((lesson) => lesson.id === (currentLessonId ?? aula))
  const previousLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null
  const nextLesson = currentIndex >= 0 && currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null

  const progress = useMemo(() => {
    if (!module || !module.trilha.length) return 0
    const total = module.trilha.reduce((sum, section) => sum + section.lessons.length, 0)
    const completed = completedLessons.filter((lessonId) => lessonId.startsWith(`${module.id}:`)).length
    return Math.round((completed / total) * 100)
  }, [completedLessons, module])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setIsSearchOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setIsSidebarOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const filteredResults = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return []

    const lessonsResults = Object.values(lessonMap)
      .flat()
      .filter((item) =>
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.keywords.some((word) => word.toLowerCase().includes(term)),
      )
      .map((item) => ({
        id: item.id,
        title: item.title,
        text: item.description,
        section: item.section,
        path: item.path,
        type: 'aula',
      }))

    const exerciseResults = getExercisesByModule(modulo ?? '').filter((item) =>
      item.titulo.toLowerCase().includes(term) ||
      item.topico.toLowerCase().includes(term) ||
      item.tags.some((tag) => tag.toLowerCase().includes(term)),
    ).map((item) => ({
      id: item.id,
      title: item.titulo,
      text: item.topico,
      section: item.dificuldade,
      path: `/${modulo}/exercicios/${item.id}`,
      type: 'exercício',
    }))

    return [...lessonsResults, ...exerciseResults].slice(0, 10)
  }, [modulo, query])

  const renderSections = () => {
    if (!module) return null

    const lessonGroupSuffixes = ['-introducao', '-conceito-principal', '-aplicacao-pratica', '-no-mercado-de-trabalho']

    const getGroupId = (lessonId: string) => {
      for (const suffix of lessonGroupSuffixes) {
        if (lessonId.endsWith(suffix)) {
          return lessonId.slice(0, -suffix.length)
        }
      }
      return lessonId
    }

    return module.trilha.map((section) => {
      const groups = new Map<string, { id: string; parent: ModuleRouteLesson | undefined; children: ModuleRouteLesson[] }>()

      for (const lessonId of section.lessons) {
        const lesson = lessons.find((item) => item.id === lessonId)
        if (!lesson) continue

        const groupId = getGroupId(lessonId)
        const parentLesson = lessons.find((item) => item.id === groupId) ?? lesson

        const currentGroup = groups.get(groupId) ?? {
          id: groupId,
          parent: parentLesson,
          children: [] as ModuleRouteLesson[],
        }

        currentGroup.children.push(lesson)
        groups.set(groupId, currentGroup)
      }

      return (
        <div key={section.id} className="study-section">
          <div className="study-section__title">{section.title}</div>
          <ul>
            {[...groups.values()].map(({ id, parent, children }) => {
              const activeLessonId = currentLessonId ?? aula
              const isGroupActive = children.some((lesson) => lesson.id === activeLessonId)
              const expanded = isGroupActive || Boolean(expandedGroups[id])
              const groupTitle = parent?.title.replace(/\s*[-–]\s*índice$/i, '').trim() || id
              const isDone = children.some((lesson) => completedLessons.includes(`${module.id}:${lesson.id}`))

              return (
                <li key={id} className={isGroupActive ? 'is-active is-group-active' : ''}>
                  <button
                    type="button"
                    onClick={() => {
                      const nextExpanded = !expanded
                      setExpandedGroups((prev) => ({ ...prev, [id]: nextExpanded }))

                      if (parent) {
                        localStorage.setItem('codetrilha-last-lesson', JSON.stringify({ moduleId: module.id, lessonId: parent.id }))
                        navigate(`/${module.id}/${parent.id}`)
                      }
                    }}
                    className="study-lesson study-lesson--group"
                  >
                    <span className="study-lesson__status">
                      {isDone ? <Check size={12} /> : <span className="status-dot" />}
                    </span>
                    <span>{groupTitle}</span>
                  </button>

                  {expanded && (
                    <ul className="study-lesson__children">
                      {children.map((lesson) => {
                        const isActive = lesson.id === activeLessonId
                        const isDoneChild = completedLessons.includes(`${module.id}:${lesson.id}`)

                        return (
                          <li key={lesson.id} className={isActive ? 'is-active' : ''}>
                            <button
                              type="button"
                              onClick={() => {
                                localStorage.setItem('codetrilha-last-lesson', JSON.stringify({ moduleId: module.id, lessonId: lesson.id }))
                                navigate(`/${module.id}/${lesson.id}`)
                              }}
                              className="study-lesson study-lesson--child"
                            >
                              <span className="study-lesson__status study-lesson__status--small">
                                {isDoneChild ? <Check size={10} /> : <span className="status-dot" />}
                              </span>
                              <span>{lesson.title.replace(/\s*[-–]\s*índice$/i, '').trim()}</span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )
    })
  }

  if (!module) return null

  return (
    <div className="study-layout">
      <div className="study-topbar">
        <div className="study-progress">
          <span>Progresso do módulo</span>
          <div className="progress-track">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <aside className={`study-sidebar glass ${isSidebarOpen ? 'is-open' : ''}`}>
        <div className="study-sidebar__header">
          <div className="sidebar-brand">
            <span>{module.name}</span>
          </div>
          <button type="button" className="sidebar-close" onClick={() => setIsSidebarOpen(false)}>
            <X size={16} />
          </button>
        </div>

        <div className="study-sidebar__meta">
          <button type="button" className="search-button" onClick={() => setIsSearchOpen(true)}>
            <Search size={14} /> Buscar aulas e exercícios
            <kbd>Ctrl K</kbd>
          </button>
        </div>

        <div className="study-sidebar__content">{renderSections()}</div>
      </aside>

      <main className="study-main">
        <div className="study-main__top">
          <button type="button" className="mobile-sidebar-button" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={18} />
          </button>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Início</Link>
            <ChevronRight size={14} />
            <Link to={`/${module.id}`}>{module.name}</Link>
            {aula ? (
              <>
                <ChevronRight size={14} />
                <span>{title || aula}</span>
              </>
            ) : null}
          </nav>

          <button
            type="button"
            className="complete-button"
            onClick={() => {
              const lessonSlug = currentLessonId ?? aula
              if (lessonSlug) {
                completeLesson(`${module.id}:${lessonSlug}`)
                localStorage.setItem('codetrilha-last-lesson', JSON.stringify({ moduleId: module.id, lessonId: lessonSlug }))
              }
            }}
          >
            <Check size={16} /> Marcar como concluída
          </button>
        </div>

        <article className="lesson-reading" aria-live="polite">
          {children}
        </article>

        <div className="lesson-navigation">
          {previousLesson ? (
            <button type="button" className="button button--secondary" onClick={() => navigate(`/${module.id}/${previousLesson.id}`)}>
              <ArrowLeft size={16} /> Aula anterior
            </button>
          ) : <span />}

          {nextLesson ? (
            <button type="button" className="button button--primary" onClick={() => navigate(`/${module.id}/${nextLesson.id}`)}>
              Próxima aula <ArrowRight size={16} />
            </button>
          ) : (
            <button type="button" className="button button--primary" onClick={() => navigate(`/${module.id}/exercicios`)}>
              Ver exercícios
            </button>
          )}
        </div>
      </main>

      <aside className="study-toc glass">
        <div className="study-toc__heading">
          <PanelRightClose size={16} />
          <span> Nesta página</span>
        </div>
        <ul>
          <li><a href="#top">Resumo</a></li>
        </ul>
      </aside>

      {isSearchOpen && (
        <div className="search-overlay" onClick={() => setIsSearchOpen(false)}>
          <div className="search-panel glass" onClick={(event) => event.stopPropagation()}>
            <div className="search-panel__header">
              <Search size={16} />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar aulas e exercícios"
                aria-label="Buscar aulas e exercícios"
              />
              <button type="button" onClick={() => setIsSearchOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <div className="search-panel__results">
              {filteredResults.length ? (
                filteredResults.map((result) => (
                  <button key={`${result.path}-${result.id}`} type="button" onClick={() => { navigate(result.path); setIsSearchOpen(false); setQuery(''); }}>
                    <span>{result.title}</span>
                    <small>{result.type} · {result.section}</small>
                  </button>
                ))
              ) : (
                <p>Nenhum resultado encontrado.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
