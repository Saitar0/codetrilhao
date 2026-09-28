import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { getExercisesByModule } from '../../lib/exercises'
import { useProgressStore } from '../../store/progress'

const difficultyOrder = { fácil: 1, médio: 2, difícil: 3 }

export default function ExerciseListPage() {
  const { modulo } = useParams()
  const moduleId = modulo ?? 'python'
  const exercises = getExercisesByModule(moduleId)
  const [query, setQuery] = useState('')
  const [difficulty, setDifficulty] = useState('todas')
  const [topic, setTopic] = useState('todos')
  const [status, setStatus] = useState('todos')
  const exerciseStatuses = useProgressStore((state) => state.exerciseStatuses)

  const visibleExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      const matchesText =
        !query ||
        exercise.titulo.toLowerCase().includes(query.toLowerCase()) ||
        exercise.topico.toLowerCase().includes(query.toLowerCase()) ||
        exercise.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))

      const matchesDifficulty = difficulty === 'todas' || exercise.dificuldade === difficulty
      const matchesTopic = topic === 'todos' || exercise.topico === topic
      const currentStatus = exerciseStatuses[exercise.id] ?? 'nao-iniciado'
      const matchesStatus = status === 'todos' || currentStatus === status

      return matchesText && matchesDifficulty && matchesTopic && matchesStatus
    })
  }, [difficulty, exerciseStatuses, exercises, query, status, topic])

  const completedCount = exercises.filter((exercise) => (exerciseStatuses[exercise.id] ?? 'nao-iniciado') === 'resolvido').length
  const totalXp = exercises.reduce((sum, exercise) => sum + exercise.xp, 0)
  const streak = useProgressStore((state) => state.streak)

  return (
    <section className="exercise-list">
      <div className="exercise-list__header glass">
        <div>
          <span className="eyebrow eyebrow--inline">Exercícios</span>
          <h1>{moduleId.toUpperCase()} · trilha de prática</h1>
        </div>
        <div className="exercise-summary">
          <div>
            <strong>{completedCount}</strong>
            <span>Resolvidos</span>
          </div>
          <div>
            <strong>{totalXp}</strong>
            <span>XP total</span>
          </div>
          <div>
            <strong>{streak}</strong>
            <span>Streak</span>
          </div>
        </div>
      </div>

      <div className="exercise-list__toolbar glass">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar exercício..." />
        <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
          <option value="todas">Todas as dificuldades</option>
          <option value="fácil">Fácil</option>
          <option value="médio">Médio</option>
          <option value="difícil">Difícil</option>
        </select>
        <select value={topic} onChange={(event) => setTopic(event.target.value)}>
          <option value="todos">Todos os tópicos</option>
          {Array.from(new Set(exercises.map((exercise) => exercise.topico))).map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="todos">Todos os status</option>
          <option value="nao-iniciado">Não iniciado</option>
          <option value="tentado">Tentado</option>
          <option value="resolvido">Resolvido</option>
        </select>
      </div>

      {visibleExercises.length ? (
        <div className="exercise-list__grid">
          {visibleExercises
            .slice()
            .sort((left, right) => difficultyOrder[left.dificuldade] - difficultyOrder[right.dificuldade])
            .map((exercise) => {
              const currentStatus = exerciseStatuses[exercise.id] ?? 'nao-iniciado'

              return (
                <Link key={exercise.id} to={`/${moduleId}/exercicios/${exercise.id}`} className="exercise-card glass">
                  <div className="exercise-card__top">
                    <span className={`pill pill--${exercise.dificuldade}`}>{exercise.dificuldade}</span>
                    <span className="exercise-card__xp">{exercise.xp} XP</span>
                  </div>
                  <h3>{exercise.titulo}</h3>
                  <p>{exercise.topico}</p>
                  <div className="exercise-card__meta">
                    <span>{currentStatus === 'resolvido' ? 'Resolvido' : currentStatus === 'tentado' ? 'Tentado' : 'Não iniciado'}</span>
                    <span>{exercise.tags[0] ?? 'python'}</span>
                  </div>
                </Link>
              )
            })}
        </div>
      ) : (
        <div className="empty-state glass">Nenhum exercício encontrado com esses filtros.</div>
      )}
    </section>
  )
}
