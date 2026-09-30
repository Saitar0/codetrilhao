import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { validateLessonSet } from '../validar_aulas.mjs'
import { validateProjectSet } from '../validar_projetos.mjs'
import { validateExerciseSet } from '../validar_exercicios_python.mjs'

const root = process.cwd()
const topic1Map = new Set(['o-que-e-python', 'instalando-e-rodando', 'sintaxe-basica', 'entrada-e-saida'])
const topic8Map = new Set(['tuplas', 'sets'])

function makeValidLessonFixture(slug, title, topico) {
  return `---
titulo: "${title}"
descricao: "Resumo curto e específico da aula."
secao: "B. Estruturas de dados"
ordem: 1
topico: ${topico}
fase: "B"
tempo: 20
nivel: "iniciante"
palavrasChave: ['python', '${slug}']
exercicios: []
---

# ${title}

<Callout type="importante" title="O que você vai aprender">
- item 1
- item 2
- item 3
</Callout>

## Teoria

<CodeBlock title="exemplo.py" code={\`print('oi')\`} />

<CodeBlock title="exemplo2.py" code={\`print('oi 2')\`} />

<CodeBlock title="exemplo3.py" code={\`print('oi 3')\`} />

<CodeBlock title="exemplo4.py" code={\`print('oi 4')\`} />

<CodeBlock title="exemplo5.py" code={\`print('oi 5')\`} />

<CodeBlock title="exemplo6.py" code={\`print('oi 6')\`} />

<Playground title="Experimento" code={\`print('playground')\`} />

<StepThrough>
  <div>
    <CodeBlock title="passo1.py" code={\`print('p1')\`} />
  </div>
</StepThrough>

<Quiz questions={[{ question: 'Pergunta?', options: ['A', 'B', 'C'], correctIndex: 0, explanation: 'Explicação.' }]} />

<Resumo>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</Resumo>

<Desafio>
  Resolva o exercício da aula.
</Desafio>

No mercado de trabalho, isso importa.
`
}

describe('topic-scoped validators', () => {
  it('ignores lessons outside the selected topic', () => {
    const result = validateLessonSet({ rootDir: root, topic: 8, global: false })
    expect(result.files.length).toBe(2)
    expect(new Set(result.files.map((file) => path.basename(file, '.mdx')))).toEqual(topic8Map)
    expect(result.errors).toHaveLength(0)
  })

  it('fails only for files inside the selected topic when the content is invalid', () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'codetrilha-scope-'))
    const scriptsDir = path.join(tempRoot, 'scripts')
    const lessonsDir = path.join(tempRoot, 'src', 'modules', 'python', 'lessons')
    fs.mkdirSync(scriptsDir, { recursive: true })
    fs.mkdirSync(lessonsDir, { recursive: true })

    fs.writeFileSync(path.join(scriptsDir, 'mapa-topicos.json'), JSON.stringify({ 1: ['aula-topico-1'] }, null, 2))

    const okFile = path.join(lessonsDir, 'aula-topico-1.mdx')
    fs.writeFileSync(okFile, makeValidLessonFixture('aula-topico-1', 'Aula do tópico 1', 1))

    const invalidFile = path.join(lessonsDir, 'aula-fora-do-topico.mdx')
    fs.writeFileSync(invalidFile, '---\n# sem frontmatter\n')

    const result = validateLessonSet({ rootDir: tempRoot, topic: 1, global: false })
    expect(result.files.map((file) => path.basename(file, '.mdx'))).toEqual(['aula-topico-1'])
    expect(result.errors).toHaveLength(0)

    fs.rmSync(tempRoot, { recursive: true, force: true })
  })

  it('runs global checks only when no topic filter is selected', () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'codetrilha-global-'))
    const scriptsDir = path.join(tempRoot, 'scripts')
    const lessonsDir = path.join(tempRoot, 'src', 'modules', 'python', 'lessons')
    fs.mkdirSync(lessonsDir, { recursive: true })
    fs.mkdirSync(scriptsDir, { recursive: true })

    fs.writeFileSync(path.join(scriptsDir, 'mapa-topicos.json'), JSON.stringify({ 1: ['aula-1'] }, null, 2))
    fs.writeFileSync(path.join(lessonsDir, 'aula-1.mdx'), makeValidLessonFixture('aula-1', 'Aula 1', 1))
    fs.writeFileSync(path.join(lessonsDir, 'aula-extra.mdx'), makeValidLessonFixture('aula-extra', 'Aula extra', 1))

    const result = validateLessonSet({ rootDir: tempRoot, topic: null, global: false })
    expect(result.errors.some((error) => error.includes('slug da trilha sem arquivo') || error.includes('aula fora da trilha'))).toBe(true)

    fs.rmSync(tempRoot, { recursive: true, force: true })
  })

  it('filters projects to the selected topic only', () => {
    const result = validateProjectSet({ rootDir: root, topic: 1, global: false })
    expect(result.files.length).toBe(3)
    expect(result.files.every((file) => file.includes(path.join('mini-projetos', 't01-')))).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('filters exercises to the selected topic only and honors the canonical naming', () => {
    const result = validateExerciseSet({ rootDir: root, topic: 1, global: false })
    expect(result.files.length).toBe(12)
    expect(result.files.every((file) => path.basename(file, '.json').startsWith('t01-'))).toBe(true)
    expect(result.errors).toHaveLength(0)
  })
})
