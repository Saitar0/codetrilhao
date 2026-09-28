import { useEffect, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import { motion, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  ChevronDown,
  Code2,
  Cpu,
  Dumbbell,
  Gauge,
  MonitorSmartphone,
  Play,
  Search,
  SunMedium,
  Trophy,
} from 'lucide-react'

import { loadPyodideInstance } from '../../lib/pyodide'
import { exerciseCount, lessonCount, moduleCount } from '../../modules'
import { moduleConfigs } from '../../modules'

const resourceCards = [
  { icon: Code2, title: 'Editor de código no navegador', text: 'Escreva em um ambiente limpo, com foco e sem instalar nada.' },
  { icon: Cpu, title: 'Python executando de verdade', text: 'Pyodide roda Python real direto no navegador com um clique.' },
  { icon: CheckCircle2, title: 'Exercícios com correção automática', text: 'Receba retorno imediato para reforçar o que aprendeu.' },
  { icon: Trophy, title: 'Quizzes com feedback imediato', text: 'Fixe conceitos rapidamente em pequenas validações.' },
  { icon: Gauge, title: 'XP, streak e progresso salvo', text: 'Seu avanço fica guardado no navegador e motiva a continuar.' },
  { icon: Search, title: 'Busca rápida de aulas', text: 'Encontre o que precisa em segundos com um comando simples.' },
  { icon: SunMedium, title: 'Modo claro e escuro', text: 'Tema adaptativo que respeita suas preferências e acessibilidade.' },
  { icon: MonitorSmartphone, title: 'Funciona bem no celular', text: 'Layout mobile-first para treinar de qualquer lugar.' },
]

const learningPath = [
  {
    id: 'python',
    name: 'Python',
    color: '#3776AB',
    status: 'available',
    topics: ['Sintaxe', 'Variáveis', 'Funções', 'Listas', 'Loops'],
    cta: 'Começar',
  },
  {
    id: 'flask',
    name: 'Flask',
    color: '#14B8A6',
    status: 'coming-soon',
    topics: ['Rotas', 'Templates', 'Formulários', 'APIs', 'Deploy'],
    cta: 'Em breve',
  },
  {
    id: 'django',
    name: 'Django',
    color: '#0C4B33',
    status: 'coming-soon',
    topics: ['Modelos', 'Admin', 'Autenticação', 'Views', 'Projetos'],
    cta: 'Em breve',
  },
]

const codeExamples = [
  {
    id: 'hello',
    label: 'Olá mundo',
    code: 'name = "CodeTrilha"\nprint(f"Olá, {name}!")',
  },
  {
    id: 'loop',
    label: 'Loop',
    code: 'for numero in range(1, 6):\n    print(numero * 2)',
  },
  {
    id: 'function',
    label: 'Função',
    code: 'def somar(a, b):\n    return a + b\n\nprint(somar(7, 8))',
  },
]

const steps = [
  { title: 'Leia a aula', text: 'Entenda o conceito com explicações estruturadas e exemplos práticos.', icon: BookOpenText },
  { title: 'Rode o código', text: 'Teste ideias reais no navegador, sem instalar Python na máquina.', icon: Play },
  { title: 'Resolva o exercício', text: 'Aplique o conhecimento em desafios pequenos e objetivos.', icon: Dumbbell },
]

const faqs = [
  { question: 'É gratuito?', answer: 'Sim. A base do projeto e os módulos iniciais ficam abertos para quem quer aprender do zero sem pagar nada.' },
  { question: 'Preciso instalar algo?', answer: 'Não. O editor e o Python rodam no navegador, então você pode começar em segundos.' },
  { question: 'Serve para iniciantes?', answer: 'Sim. A trilha foi pensada para quem está começando e quer evoluir com clareza.' },
  { question: 'Meu progresso fica salvo?', answer: 'Sim. XP, streak e preferências são persistidos em localStorage no navegador.' },
  { question: 'Posso usar no celular?', answer: 'Sim. O layout foi pensado para mobile primeiro e funciona bem em telas pequenas.' },
  { question: 'Quando saem Flask e Django?', answer: 'Flask e Django já estão previstos como próximos módulos da plataforma e seguem a mesma estrutura.' },
]

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let frame = 0
    const duration = 1100
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.round(value * progress))

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isVisible, value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const reduceMotion = useReducedMotion()
  const [terminalStage, setTerminalStage] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [selectedExample, setSelectedExample] = useState(codeExamples[0].id)
  const [editorCode, setEditorCode] = useState<Record<string, string>>({
    hello: codeExamples[0].code,
    loop: codeExamples[1].code,
    function: codeExamples[2].code,
  })
  const [pyodideState, setPyodideState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [demoOutput, setDemoOutput] = useState('')
  const pyodideRef = useRef<{
    setStdout: (handler: { batched: (value: string) => void }) => void
    setStderr: (handler: { batched: (value: string) => void }) => void
    runPythonAsync: (code: string) => Promise<void>
  } | null>(null)
  const [activeFaq, setActiveFaq] = useState<number | null>(0)

  useEffect(() => {
    if (reduceMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-copy > *',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
      )

      gsap.fromTo(
        '.terminal-shell',
        { y: 30, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.25, ease: 'power3.out' },
      )

      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        { scaleY: 1, duration: 1.3, ease: 'none', scrollTrigger: { trigger: '.learning-timeline', start: 'top 70%', end: 'bottom 35%', scrub: true } },
      )

      gsap.utils.toArray<HTMLElement>('.timeline-card').forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 85%' } },
        )
      })
    })

    return () => ctx.revert()
  }, [reduceMotion])

  useEffect(() => {
    const stage = codeExamples[terminalStage]
    if (!stage) return

    const fullCode = stage.code

    if (typedText.length < fullCode.length) {
      const timer = window.setTimeout(() => {
        setTypedText(fullCode.slice(0, typedText.length + 1))
      }, 26)

      return () => window.clearTimeout(timer)
    }

    const totalTimer = window.setTimeout(() => {
      setTypedText('')
      setTerminalStage((current) => (current + 1) % codeExamples.length)
    }, 1100)

    return () => window.clearTimeout(totalTimer)
  }, [terminalStage, typedText])

  const showOutput = typedText.length >= (codeExamples[terminalStage]?.code.length ?? 0) && typedText.length > 0

  const handleExampleChange = (exampleId: string) => {
    setSelectedExample(exampleId)
    setDemoOutput('')
  }

  useEffect(() => {
    let ignore = false

    void (async () => {
      try {
        const pyodide = await loadPyodideInstance()
        if (!ignore) {
          pyodideRef.current = pyodide
          setPyodideState('ready')
        }
      } catch {
        if (!ignore) {
          setPyodideState('error')
          setDemoOutput('Não foi possível carregar o ambiente Python. Verifique sua conexão e tente novamente.')
        }
      }
    })()

    return () => {
      ignore = true
    }
  }, [])

  const activeExample = codeExamples.find((example) => example.id === selectedExample) ?? codeExamples[0]
  const activeCode = editorCode[activeExample.id] ?? activeExample.code

  const loadDemoPyodide = async () => {
    try {
      setPyodideState('loading')
      const pyodide = await loadPyodideInstance()
      pyodideRef.current = pyodide
      setPyodideState('ready')
      setDemoOutput('')
    } catch {
      setPyodideState('error')
      setDemoOutput('Não foi possível carregar o ambiente Python. Verifique sua conexão e tente novamente.')
    }
  }

  const executeDemoCode = async () => {
    if (!pyodideRef.current) return

    setDemoOutput('')

    try {
      pyodideRef.current.setStdout({
        batched: (value: string) => setDemoOutput((current) => `${current}${value}\n`),
      })
      pyodideRef.current.setStderr({
        batched: (value: string) => setDemoOutput((current) => `${current}${value}\n`),
      })

      await pyodideRef.current.runPythonAsync(activeCode)
    } catch (error) {
      setDemoOutput(error instanceof Error ? error.message : 'Erro ao executar o código.')
    }
  }

  const statItems = [
    { label: 'aulas', value: lessonCount, suffix: '+' },
    { label: 'exercícios', value: exerciseCount, suffix: '+' },
    { label: 'módulos', value: moduleCount, suffix: '' },
    { label: '% gratuito', value: 100, suffix: '%' },
  ]

  return (
    <>
      <section className="hero-section grid-bg">
        <div className="hero-copy">
          <motion.span className="eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Aprenda com prática, não com teoria vazia
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }}>
            Aprenda a programar escrevendo código de verdade
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            Aulas curtas, exercícios objetivos e ambiente de prática em tempo real para você evoluir com confiança.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.22 }}>
            <a href="#modulos" className="button button--primary">
              Começar com Python <ArrowRight size={16} />
            </a>
            <a href="#demo" className="button button--secondary">
              Ver trilha
            </a>
          </motion.div>
          <motion.ul className="hero-badges" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.28 }}>
            <li><CheckCircle2 size={14} /> Iniciante amigável</li>
            <li><CheckCircle2 size={14} /> Python no navegador</li>
            <li><CheckCircle2 size={14} /> Progresso salvo</li>
          </motion.ul>
        </div>

        <motion.div className="terminal-shell" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.18 }}>
          <div className="terminal-header">
            <span className="terminal-dot red" />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green" />
          </div>

          <div className="terminal-body">
            <div className="terminal-code">
              <pre>{typedText || ' '}</pre>
            </div>

            <div className={`terminal-output ${showOutput ? 'is-visible' : ''}`}>
              <span className="output-label">resultado</span>
              <code>{codeExamples[terminalStage].code.includes('print(') ? '12' : '[2, 4, 6, 8, 10]'}</code>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="stats-section container section-spacing" aria-label="Números da plataforma">
        {statItems.map((stat) => (
          <div key={stat.label} className="stat-card glass">
            <strong>
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section id="modulos" className="learning-section container section-spacing">
        <div className="section-heading">
          <span className="eyebrow eyebrow--inline">Trilha de aprendizado</span>
          <h2>Uma estrada clara para evoluir</h2>
        </div>

        <div className="learning-timeline">
          <div className="timeline-line" aria-hidden="true" />
          {learningPath.map((module) => (
            <article key={module.id} className={`timeline-card glass ${module.status}`}>
              <div className="timeline-marker" style={{ background: module.color }} />
              <div className="timeline-card__header">
                <span className="module-badge" style={{ background: `${module.color}22`, color: module.color }}>
                  {module.name}
                </span>
                {module.status === 'coming-soon' ? (
                  <span className="status-badge">Em breve</span>
                ) : (
                  <span className="status-badge status-badge--active">Disponível</span>
                )}
              </div>
              <h3>{module.name}</h3>
              <ul>
                {module.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
              <button type="button" className={`button ${module.status === 'available' ? 'button--primary' : 'button--secondary'} timeline-button`}>
                {module.cta}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="recursos" className="resources-section container section-spacing">
        <div className="section-heading section-heading--centered">
          <span className="eyebrow eyebrow--inline">Recursos</span>
          <h2>Ferramentas pensadas para aprender rápido</h2>
        </div>

        <div className="resource-grid">
          {resourceCards.map(({ icon: Icon, title, text }) => (
            <article key={title} className="resource-card glass tilt-card">
              <div className="resource-icon">
                <Icon size={22} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="demo" className="demo-section container section-spacing">
        <div className="section-heading">
          <span className="eyebrow eyebrow--inline">Demo ao vivo</span>
          <h2>Experimente Python direto no navegador</h2>
        </div>

        <div className="demo-panel glass">
          <div className="demo-tabs" role="tablist" aria-label="Exemplos em Python">
            {codeExamples.map((example) => (
              <button
                key={example.id}
                type="button"
                role="tab"
                aria-selected={selectedExample === example.id}
                className={selectedExample === example.id ? 'is-active' : ''}
                onClick={() => handleExampleChange(example.id)}
              >
                {example.label}
              </button>
            ))}
          </div>

          {pyodideState === 'loading' && (
            <div className="editor-skeleton">
              <div className="skeleton-line w-80" />
              <div className="skeleton-line w-60" />
              <div className="skeleton-line w-72" />
            </div>
          )}

          {pyodideState === 'error' && (
            <div className="exercise-result is-error" role="alert">
              O ambiente Python falhou ao carregar. Verifique sua conexão e tente novamente.
              <div className="exercise-actions" style={{ marginTop: '0.8rem' }}>
                <button type="button" className="button button--secondary" onClick={() => void loadDemoPyodide()}>
                  Tentar novamente
                </button>
              </div>
            </div>
          )}

          {pyodideState !== 'loading' && pyodideState !== 'error' && (
            <Editor
              height="220px"
              language="python"
              theme="vs-dark"
              value={activeCode}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                padding: { top: 18, bottom: 18 },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
              }}
              onChange={(value) => {
                if (typeof value === 'string') {
                  setEditorCode((current) => ({
                    ...current,
                    [activeExample.id]: value,
                  }))
                }
              }}
            />
          )}

          <div className="demo-actions">
            <button type="button" className="button button--primary" onClick={executeDemoCode} disabled={pyodideState !== 'ready'}>
              <Play size={16} /> Executar
            </button>
          </div>

          <div className="demo-output" aria-live="polite" aria-atomic="true">
            <span className="output-label">saída</span>
            <pre>{demoOutput || 'A saída aparece aqui ao executar o código.'}</pre>
          </div>
        </div>
      </section>

      <section className="preview-section container section-spacing" id="preview">
        <div className="section-heading section-heading--centered">
          <span className="eyebrow eyebrow--inline">Preview dos módulos</span>
          <h2>Trilhas organizadas por objetivo</h2>
        </div>

        <div className="module-preview-grid">
          {moduleConfigs.map((module) => (
            <article key={module.id} className="module-card glass" style={{ borderColor: `${module.color}66` }}>
              <div className="module-card__top">
                <div className="module-icon" style={{ background: `${module.color}22`, color: module.color }}>
                  {module.icon === 'python' ? 'PY' : module.icon === 'flask' ? 'FL' : 'DJ'}
                </div>
                <span className={`status-badge ${module.status === 'available' ? 'status-badge--active' : ''}`}>
                  {module.status === 'available' ? 'Disponível' : 'Em breve'}
                </span>
              </div>
              <h3>{module.name}</h3>
              <p>{module.description}</p>
              <ul>
                {module.trilha.length > 0 ? (
                  module.trilha.slice(0, 3).map((section) => <li key={section.id}>{section.title}</li>)
                ) : (
                  <li>Em breve</li>
                )}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="steps-section container section-spacing">
        <div className="section-heading section-heading--centered">
          <span className="eyebrow eyebrow--inline">Como funciona</span>
          <h2>Aprender deve ser simples</h2>
        </div>

        <div className="steps-grid">
          {steps.map(({ title, text, icon: Icon }, index) => (
            <div key={title} className="step-card glass">
              <span className="step-number">0{index + 1}</span>
              <div className="step-icon">
                <Icon size={20} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="faq-section container section-spacing">
        <div className="section-heading">
          <span className="eyebrow eyebrow--inline">FAQ</span>
          <h2>Perguntas frequentes</h2>
        </div>

        <div className="faq-list">
          {faqs.map((item, index) => {
            const isOpen = activeFaq === index

            return (
              <div key={item.question} className={`faq-item glass ${isOpen ? 'is-open' : ''}`}>
                <button type="button" onClick={() => setActiveFaq(isOpen ? null : index)} aria-expanded={isOpen}>
                  <span>{item.question}</span>
                  <ChevronDown size={18} />
                </button>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section id="cta" className="cta-section container section-spacing">
        <div className="cta-panel glass">
          <div>
            <span className="eyebrow eyebrow--inline">Comece hoje mesmo</span>
            <h2>Seu primeiro projeto em Python começa agora.</h2>
          </div>
          <a href="#modulos" className="button button--primary">
            Começar agora <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  )
}
