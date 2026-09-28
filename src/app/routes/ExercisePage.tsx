import { useParams } from 'react-router-dom'

import ExerciseRunner from '../../components/exercise/ExerciseRunner'

export default function ExercisePage() {
  const { modulo, id } = useParams()

  if (!modulo || !id) {
    return <div className="empty-state glass">Exercício não encontrado.</div>
  }

  return <ExerciseRunner key={`${modulo}-${id}`} moduleId={modulo} exerciseId={id} />
}
