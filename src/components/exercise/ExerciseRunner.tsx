import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import confetti from 'canvas-confetti'
import { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useNavigate } from 'react-router-dom'

import { getExerciseByModuleAndId } from '../../lib/exercises'
import { useProgressStore } from '../../store/progress'
import type { ExerciseDefinition, ExerciseStatus } from '../../types/exercise'

const difficultyCost: Record<string, number> = {
  fácil: 0,
  médio: 5,
  difícil: 10,
}

const inputLabel = 'Entrada do programa'

function translatePythonError(message: string) {
  if (!message) return 'Não houve saída.'

  const clean = message.replace(/\s+/g, ' ').trim()
  if (clean.includes('SyntaxError')) return 'Há um erro de sintaxe no código. Verifique parênteses, espaços e indentação.'
  if (clean.includes('NameError')) return 'Você usou uma variável que ainda não existe.'
  if (clean.includes('TypeError')) return 'Há um problema de tipo: confira os valores e o tipo esperado.'
  if (clean.includes('IndexError')) return 'Você tentou acessar uma posição que não existe na lista.'
  if (clean.includes('ValueError')) return 'O valor informado não está em um formato válido.'
  return clean
}

function getExerciseXp(exercise: ExerciseDefinition) {
  const base = {
    fácil: 10,
    médio: 20,
    difícil: 40,
  }[exercise.dificuldade]

  return base ?? 10
}

function formatStatus(status: ExerciseStatus) {
  return {
    'nao-iniciado': 'Não iniciado',
    tentado: 'Tentado',
    resolvido: 'Resolvido',
  }[status]
}

function SortableLine({ id, text }: { id: string; text: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.7 : 1,
      }}
      className="exercise-sort__item"
      {...attributes}
      {...listeners}
    >
      {text}
    </div>
  )
}

function ExerciseRunner({ moduleId, exerciseId }: { moduleId: string; exerciseId: string }) {
  const navigate = useNavigate()
  const exercise = getExerciseByModuleAndId(moduleId, exerciseId)
  const [code, setCode] = useState(exercise?.tipo === 'codigo' || exercise?.tipo === 'bug' || exercise?.tipo === 'completar' ? exercise.starterCode : '')
  const [inputValue, setInputValue] = useState('')
  const [stdout, setStdout] = useState('')
  const [stderr, setStderr] = useState('')
  const [tests, setTests] = useState<Array<{ ok: boolean; label: string; input: string; expected: string; actual: string; hidden: boolean }>>([])
  const [loading, setLoading] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [hintIndex, setHintIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)
  const [sortOrder, setSortOrder] = useState<string[]>(() => (exercise?.tipo === 'ordenar' ? exercise.linhas : []))
  const [resultMessage, setResultMessage] = useState('')
  const workerRef = useRef<Worker | null>(null)

  const status = useProgressStore((state) => state.exerciseStatuses[exerciseId] ?? 'nao-iniciado')
  const attempts = useProgressStore((state) => state.exerciseAttempts[exerciseId] ?? 0)
  const markExerciseAttempt = useProgressStore((state) => state.markExerciseAttempt)
  const completeExercise = useProgressStore((state) => state.completeExercise)
  const spendHintXp = useProgressStore((state) => state.spendHintXp)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  if (!exercise) {
    return <div className="empty-state glass">Exercício não encontrado.</div>
  }

  const exerciseXp = getExerciseXp(exercise)
  const canSeeSolution = attempts >= 3 || showSolution

  const runCode = async () => {
    if (!workerRef.current) return

    setLoading(true)
    setStdout('')
    setStderr('')
    setResultMessage('')

    const timer = setTimeout(() => {
      workerRef.current?.terminate()
      const replacement = new Worker(new URL('../../workers/pyodide-worker.ts', import.meta.url), { type: 'module' })
      workerRef.current = replacement
      setStderr('Tempo limite excedido. O código demorou demais para responder.')
      setLoading(false)
    }, 5000)

    workerRef.current.onmessage = (event) => {
      clearTimeout(timer)
      const payload = event.data as { stdout?: string; stderr?: string; ok?: boolean; message?: string }

      if (payload.stderr) {
        setStderr(translatePythonError(payload.stderr))
      } else {
        setStderr('')
      }

      setStdout(payload.stdout ?? '')
      setLoading(false)

      if (payload.ok === false) {
        markExerciseAttempt(exerciseId)
      }
    }

    workerRef.current.postMessage({ type: 'run', code, input: inputValue })
  }

  const verifySolution = () => {
    if (!exercise) return

    markExerciseAttempt(exerciseId)

    const testsToCheck = 'testes' in exercise ? exercise.testes ?? [] : []
    const results = testsToCheck.map((test, index) => {
      const output = stdout || ''
      const expected = test.esperado
      const actual = output
      const ok = actual.trim() === expected.trim()
      return {
        ok,
        label: `Caso ${index + 1}`,
        input: test.entrada,
        expected: test.esperado,
        actual,
        hidden: Boolean(test.oculto),
      }
    })

    const allPassed = results.some((test) => !test.hidden) ? results.filter((test) => !test.hidden).every((test) => test.ok) : true

    if (allPassed) {
      setCompleted(true)
      setResultMessage('Parabéns! Você resolveu este exercício.')
      confetti({ particleCount: 130, spread: 70, origin: { y: 0.7 } })
      completeExercise(exerciseId, exerciseXp)
      navigate(`/${moduleId}/exercicios`)
      return
    }

    setResultMessage('Ainda há alguns casos faltando.')
    setTests(results)
  }

  const resetCode = () => {
    const baseCode = exercise.tipo === 'codigo' || exercise.tipo === 'bug' || exercise.tipo === 'completar' ? exercise.starterCode : ''
    setCode(baseCode)
    setStdout('')
    setStderr('')
  }

  const currentHint = exercise.dicas[hintIndex] ?? exercise.dicas[exercise.dicas.length - 1]

  const handleHint = () => {
    if (!exercise.dicas.length) return
    const cost = difficultyCost[exercise.dificuldade] ?? 0
    const nextIndex = Math.min(exercise.dicas.length - 1, hintIndex + 1)
    setHintIndex(nextIndex)
    spendHintXp(exerciseId, cost)
  }

  const handleMultipleChoice = () => {
    if (!exercise || exercise.tipo !== 'multipla-escolha') return
    const answer = exercise.alternativas.find((item) => item.correta)
    const chosen = selectedAnswer

    if (!answer || !chosen) {
      setResultMessage('Selecione uma alternativa para verificar.')
      return
    }

    if (chosen === answer.texto) {
      setResultMessage('Resposta correta!')
      confetti({ particleCount: 100, spread: 60 })
      completeExercise(exerciseId, exerciseXp)
      setCompleted(true)
    } else {
      markExerciseAttempt(exerciseId)
      setResultMessage(`Incorreto. ${answer.explicacao}`)
    }
  }

  const handleSortSubmit = () => {
    if (exercise.tipo !== 'ordenar') return
    const isCorrect = JSON.stringify(sortOrder) === JSON.stringify(exercise.ordemCorreta)
    if (isCorrect) {
      setResultMessage('Sequência correta!')
      confetti({ particleCount: 100, spread: 60 })
      completeExercise(exerciseId, exerciseXp)
      setCompleted(true)
      return
    }

    markExerciseAttempt(exerciseId)
    setResultMessage('A sequência ainda não está correta.')
  }

  const handlePredictionSubmit = () => {
    const response = document.querySelector<HTMLInputElement>('#prediction-answer')
    if (!response) return
    const answer = response.value.trim()
    const expected = exercise.tipo === 'prever-saida' ? exercise.respostaEsperada.trim() : ''
    const ok = answer === expected

    if (ok) {
      setResultMessage('Resposta correta!')
      completeExercise(exerciseId, exerciseXp)
      confetti({ particleCount: 100, spread: 60 })
      setCompleted(true)
    } else {
      markExerciseAttempt(exerciseId)
      setResultMessage(`Resposta incorreta. O correto seria: ${expected}`)
    }
  }

  return (
    <section className="exercise-page glass">
      <div className="exercise-page__header">
        <div>
          <span className="eyebrow eyebrow--inline">{exercise.topico}</span>
          <h1>{exercise.titulo}</h1>
        </div>
        <div className="exercise-page__meta">
          <span className="pill">{exercise.dificuldade}</span>
          <span className="pill pill--muted">{exercise.xp} XP</span>
          <span className="pill pill--muted">{formatStatus(status)}</span>
        </div>
      </div>

      <div className="exercise-layout">
        <div className="exercise-panel">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{exercise.enunciado}</ReactMarkdown>

          {exercise.tipo === 'multipla-escolha' && (
            <div className="exercise-choices">
              {exercise.alternativas.map((option) => (
                <button
                  key={option.texto}
                  type="button"
                  className={`choice ${selectedAnswer === option.texto ? 'is-selected' : ''}`}
                  onClick={() => setSelectedAnswer(option.texto)}
                >
                  {option.texto}
                </button>
              ))}
              <button type="button" className="button button--primary" onClick={handleMultipleChoice}>
                Verificar resposta
              </button>
            </div>
          )}

          {exercise.tipo === 'ordenar' && (
            <div className="exercise-sort">
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={({ active, over }) => {
                if (!over || active.id === over.id) return
                setSortOrder((items) => {
                  const oldIndex = items.indexOf(String(active.id))
                  const newIndex = items.indexOf(String(over.id))
                  return arrayMove(items, oldIndex, newIndex)
                })
              }}>
                <SortableContext items={sortOrder} strategy={verticalListSortingStrategy}>
                  {sortOrder.map((line) => (
                    <SortableLine key={line} id={line} text={line} />
                  ))}
                </SortableContext>
              </DndContext>
              <button type="button" className="button button--primary" onClick={handleSortSubmit}>
                Verificar ordem
              </button>
            </div>
          )}

          {exercise.tipo === 'prever-saida' && (
            <div className="exercise-predict">
              <pre>{exercise.codigo}</pre>
              <input id="prediction-answer" type="text" placeholder="Digite o que será impresso" />
              <button type="button" className="button button--primary" onClick={handlePredictionSubmit}>
                Verificar previsão
              </button>
            </div>
          )}

          {exercise.dicas.length > 0 && (
            <div className="exercise-hints">
              <button type="button" className="button button--secondary" onClick={handleHint}>
                Ver dica {Math.min(hintIndex + 1, exercise.dicas.length)}/{exercise.dicas.length}
              </button>
              {currentHint && <p>{currentHint}</p>}
            </div>
          )}

          {canSeeSolution && (
            <button type="button" className="button button--ghost" onClick={() => setShowSolution(true)}>
              Ver solução
            </button>
          )}

          {showSolution && <pre className="exercise-solution">{exercise.solucao}</pre>}

          {'testes' in exercise && Array.isArray(exercise.testes) && exercise.testes.length > 0 && (
            <div className="exercise-tests-panel">
              <h3>Painel de testes</h3>
              {tests.length ? (
                tests.map((test, index) => (
                  <div key={index} className={`test-row ${test.ok ? 'is-pass' : 'is-fail'}`}>
                    <span>{test.hidden ? 'Oculto' : test.ok ? '✓' : '✗'}</span>
                    {!test.hidden && (
                      <>
                        <small>Entrada: {test.input || '—'}</small>
                        <small>Esperado: {test.expected}</small>
                        <small>Obtido: {test.actual || '—'}</small>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p>Os testes aparecerão aqui depois da primeira verificação.</p>
              )}
            </div>
          )}
        </div>

        <div className="exercise-exec-panel">
          {(exercise.tipo === 'codigo' || exercise.tipo === 'bug' || exercise.tipo === 'completar') && (
            <>
              <div className="editor-toolbar">
                <span>{inputLabel}</span>
                <button type="button" onClick={runCode} disabled={loading}>
                  {loading ? 'Executando...' : 'Executar'}
                </button>
              </div>
              <textarea
                className="exercise-editor"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                spellCheck={false}
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              />
              <div className="exercise-input-row">
                <label htmlFor="exercise-input">Entrada do usuário</label>
                <input id="exercise-input" value={inputValue} onChange={(event) => setInputValue(event.target.value)} placeholder="Ex.: 10" />
              </div>
              <div className="exercise-actions">
                <button type="button" className="button button--primary" onClick={runCode}>Executar</button>
                <button type="button" className="button button--secondary" onClick={verifySolution}>Verificar</button>
                <button type="button" className="button button--ghost" onClick={resetCode}>Resetar código</button>
              </div>
            </>
          )}

          <div className="exercise-output">
            <h3>Saída</h3>
            <pre>{stderr || stdout || 'A execução aparecerá aqui.'}</pre>
          </div>

          {resultMessage && <div className={`exercise-result ${completed ? 'is-success' : 'is-error'}`}>{resultMessage}</div>}
        </div>
      </div>
    </section>
  )
}

export default ExerciseRunner
