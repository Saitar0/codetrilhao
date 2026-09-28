import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const HomePage = lazy(() => import('./routes/HomePage'))
const ModulePage = lazy(() => import('./routes/ModulePage'))
const LessonPage = lazy(() => import('./routes/LessonPage'))
const ExercisePage = lazy(() => import('./routes/ExercisePage'))
const ExerciseListPage = lazy(() => import('./routes/ExerciseListPage'))

export function AppRouter() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem' }}>Carregando...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:modulo" element={<ModulePage />} />
        <Route path="/:modulo/:aula" element={<LessonPage />} />
        <Route path="/:modulo/exercicios" element={<ExerciseListPage />} />
        <Route path="/:modulo/exercicios/:id" element={<ExercisePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
