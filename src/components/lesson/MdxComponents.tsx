import { isValidElement, useEffect, useMemo, useState } from 'react'
import { codeToHtml } from 'shiki'
import { Check, Info, Lightbulb, TriangleAlert, X } from 'lucide-react'

import { loadPyodideInstance } from '../../lib/pyodide'

export type MdxComponentProps = {
  title?: string
  language?: string
  code?: string
  highlight?: number[]
  children?: React.ReactNode
  type?: 'dica' | 'atencao' | 'curiosidade' | 'erro-comum' | 'importante'
  kind?: 'dica' | 'atencao' | 'curiosidade' | 'erro-comum' | 'importante'
  label?: string
  termo?: string
  definition?: string
  questions?: Array<{
    question: string
    options: string[]
    correctIndex: number
    explanation: string
  }>
  items?: Array<{ label: string; description: string }>
  data?: Array<Array<string | number>>
}

export function CodeBlock({ title, language = 'python', code, highlight = [], children }: MdxComponentProps & { highlight?: number[] }) {
  const [copied, setCopied] = useState(false)
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [html, setHtml] = useState('')

  const source = useMemo(() => {
    if (typeof code === 'string') return code
    if (typeof children === 'string') return children
    return ''
  }, [children, code])

  const highlightedLines = highlight.length ? new Set(highlight) : new Set<number>()

  useEffect(() => {
    void (async () => {
      if (!source) return
      const markup = await codeToHtml(source, {
        lang: language,
        theme: 'github-dark',
      })
      setHtml(markup)
    })()
  }, [language, source])

  const handleCopy = async () => {
    if (!source) return
    await navigator.clipboard.writeText(source)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  const handleExecute = async () => {
    try {
      setLoading(true)
      const pyodide = await loadPyodideInstance()
      setOutput('')
      pyodide.setStdout({ batched: (value: string) => setOutput((current) => `${current}${value}\n`) })
      pyodide.setStderr({ batched: (value: string) => setOutput((current) => `${current}${value}\n`) })
      await pyodide.runPythonAsync(source)
    } catch (error) {
      setOutput(error instanceof Error ? error.message : 'Erro ao executar o código.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="code-block glass">
      <div className="code-block__header">
        <span>{title || 'snippet.py'}</span>
        <div className="code-block__actions">
          <button type="button" onClick={handleCopy} aria-label="Copiar código">
            {copied ? 'Copiado' : 'Copiar'}
          </button>
          <button type="button" onClick={handleExecute} aria-label="Executar código no navegador">
            {loading ? 'Executando...' : 'Executar'}
          </button>
        </div>
      </div>

      <div className="code-block__editor">
        {html ? (
          <div
            className={`shiki-root ${highlightedLines.size ? 'is-highlighted' : ''}`}
            data-highlighted-lines={Array.from(highlightedLines).join(',')}
            dangerouslySetInnerHTML={{
              __html: html.replace(/class="shiki"/g, 'class="shiki code-block__code"'),
            }}
          />
        ) : (
          <pre>{source}</pre>
        )}
      </div>

      {output && (
        <div className="code-block__output">
          <span>Saída</span>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  )
}

export function Callout({ type = 'dica', title, children }: MdxComponentProps) {
  const config = {
    dica: { icon: <Lightbulb size={18} />, className: 'callout callout--dica' },
    atencao: { icon: <TriangleAlert size={18} />, className: 'callout callout--atencao' },
    curiosidade: { icon: <Info size={18} />, className: 'callout callout--curiosidade' },
    'erro-comum': { icon: <X size={18} />, className: 'callout callout--erro-comum' },
    importante: { icon: <Check size={18} />, className: 'callout callout--importante' },
  }[type]

  return (
    <div className={config.className}>
      <div className="callout__icon">{config.icon}</div>
      <div>
        {title ? <strong>{title}</strong> : null}
        <div>{children}</div>
      </div>
    </div>
  )
}

export function CodeTabs({ children }: MdxComponentProps) {
  const [active, setActive] = useState(0)
  const tabs = Array.isArray(children) ? children : [children]

  return (
    <div className="code-tabs glass">
      <div className="code-tabs__header">
        {tabs.map((tab, index) => {
          const tabProps = isValidElement<{ label?: string }>(tab) ? tab.props : undefined
          const tabLabel = typeof tabProps?.label === 'string' ? tabProps.label : `Opção ${index + 1}`

          return (
            <button key={index} type="button" className={active === index ? 'is-active' : ''} onClick={() => setActive(index)}>
              {tabLabel}
            </button>
          )
        })}
      </div>
      <div className="code-tabs__body">{tabs[active]}</div>
    </div>
  )
}

export function Playground({ title = 'Playground', code = 'print("Experimente!")' }: MdxComponentProps) {
  const [value, setValue] = useState(code)
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRun = async () => {
    try {
      setLoading(true)
      const pyodide = await loadPyodideInstance()
      pyodide.setStdout({ batched: (text: string) => setOutput((current) => `${current}${text}\n`) })
      pyodide.setStderr({ batched: (text: string) => setOutput((current) => `${current}${text}\n`) })
      await pyodide.runPythonAsync(value)
    } catch (error) {
      setOutput(error instanceof Error ? error.message : 'Erro ao executar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="playground glass">
      <div className="playground__header">
        <span>{title}</span>
        <button type="button" onClick={handleRun}>{loading ? 'Executando...' : 'Executar'}</button>
      </div>
      <textarea value={value} onChange={(event) => setValue(event.target.value)} spellCheck={false} />
      <div className="playground__output">
        <span>Saída</span>
        <pre>{output || 'A saída vai aparecer aqui.'}</pre>
      </div>
    </div>
  )
}

export function StepThrough({ children }: MdxComponentProps) {
  const steps = Array.isArray(children) ? children : [children]
  const [index, setIndex] = useState(0)

  return (
    <div className="step-through glass">
      <div className="step-through__content">{steps[index]}</div>
      <div className="step-through__actions">
        <button type="button" onClick={() => setIndex((current) => Math.max(0, current - 1))}>
          Anterior
        </button>
        <button type="button" onClick={() => setIndex((current) => Math.min(steps.length - 1, current + 1))}>
          Próximo
        </button>
        <button type="button" onClick={() => setIndex(0)}>
          Reiniciar
        </button>
      </div>
    </div>
  )
}

export function Quiz({ questions = [] }: MdxComponentProps) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])

  const question = questions[current]

  const handleAnswer = (index: number) => {
    if (selected !== null) return
    setSelected(index)
    setAnswers((prev) => [...prev, index])
  }

  const nextQuestion = () => {
    if (!question) return
    setSelected(null)
    setCurrent((prev) => Math.min(prev + 1, questions.length - 1))
  }

  const score = questions.reduce((total, currentQuestion, index) => {
    return total + (answers[index] === currentQuestion.correctIndex ? 1 : 0)
  }, 0)

  if (!question) return null

  return (
    <div className="quiz glass">
      <p className="quiz__meta">Pergunta {current + 1} de {questions.length}</p>
      <h3>{question.question}</h3>

      <div className="quiz__options">
        {question.options.map((option, index) => {
          const isCorrect = question.correctIndex === index
          const isSelected = selected === index

          return (
            <button
              key={option}
              type="button"
              className={[
                'quiz__option',
                selected !== null && isCorrect ? 'is-correct' : '',
                selected !== null && isSelected && !isCorrect ? 'is-wrong' : '',
              ].join(' ')}
              onClick={() => handleAnswer(index)}
              disabled={selected !== null}
            >
              {option}
            </button>
          )
        })}
      </div>

      {selected !== null && (
        <div className={`quiz__feedback ${selected === question.correctIndex ? 'is-success' : 'is-error'}`}>
          <strong>{selected === question.correctIndex ? 'Correto!' : 'Quase lá!'}</strong>
          <p>{question.explanation}</p>
          {current < questions.length - 1 ? (
            <button type="button" onClick={nextQuestion}>Próxima pergunta</button>
          ) : (
            <p className="quiz__score">Seu placar final: {score} / {questions.length}</p>
          )}
        </div>
      )}
    </div>
  )
}

export function Resumo({ children }: MdxComponentProps) {
  return (
    <div className="summary glass">
      <h3>Resumo da aula</h3>
      <ul>{children}</ul>
    </div>
  )
}

export function Tabela({ data = [] }: MdxComponentProps) {
  if (!data.length) return null

  return (
    <div className="table-wrapper glass">
      <table>
        <thead>
          <tr>{(data[0] ?? []).map((cell, index) => <th key={index}>{String(cell)}</th>)}</tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>{row.map((cell, index) => <td key={index}>{String(cell)}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Glossario({ termo = 'Termo', definition = 'Definição do termo.' }: MdxComponentProps) {
  const [visible, setVisible] = useState(false)

  return (
    <span className="glossary" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} onClick={() => setVisible((value) => !value)}>
      <span className="glossary__term">{termo}</span>
      {visible && <span className="glossary__tooltip">{definition}</span>}
    </span>
  )
}

export function Desafio({ title = 'Desafio', children }: MdxComponentProps) {
  return (
    <div className="challenge glass">
      <strong>{title}</strong>
      <div>{children}</div>
    </div>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const mdxComponents = {
  CodeBlock,
  Callout,
  CodeTabs,
  Playground,
  StepThrough,
  Quiz,
  Resumo,
  Tabela,
  Glossario,
  Desafio,
}
