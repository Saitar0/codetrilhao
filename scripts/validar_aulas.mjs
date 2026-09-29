import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const modulesDir = path.join(root, 'src', 'modules')

function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) {
    return { raw: '', data: {} }
  }

  const body = match[1]
  const data = {}
  for (const line of body.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const separatorIndex = trimmed.indexOf(':')
    if (separatorIndex === -1) continue
    const key = trimmed.slice(0, separatorIndex).trim()
    const value = trimmed.slice(separatorIndex + 1).trim()
    data[key] = value
  }

  return { raw: body, data }
}

function listLessonFiles() {
  const files = []
  for (const moduleDir of fs.readdirSync(modulesDir, { withFileTypes: true })) {
    if (!moduleDir.isDirectory()) continue
    const lessonsDir = path.join(modulesDir, moduleDir.name, 'lessons')
    if (!fs.existsSync(lessonsDir)) continue
    for (const file of fs.readdirSync(lessonsDir)) {
      if (file.endsWith('.mdx')) {
        files.push(path.join(lessonsDir, file))
      }
    }
  }
  return files.sort()
}

function assertArrayString(value) {
  if (!Array.isArray(value)) return false
  return value.every((item) => typeof item === 'string')
}

function validateLesson(filePath) {
  const fileName = path.basename(filePath)
  const text = fs.readFileSync(filePath, 'utf8')
  const fm = parseFrontmatter(text)
  const errors = []

  const requiredKeys = ['titulo', 'descricao', 'secao', 'ordem', 'topico', 'tempo', 'nivel', 'palavrasChave', 'exercicios']
  for (const key of requiredKeys) {
    if (!(key in fm.data)) {
      errors.push(`${fileName}: faltando frontmatter '${key}'.`)
    }
  }

  if (!fm.raw) {
    errors.push(`${fileName}: frontmatter ausente.`)
  }

  if (fm.data.titulo && (!String(fm.data.titulo).startsWith('"') && !String(fm.data.titulo).startsWith("'"))) {
    errors.push(`${fileName}: titulo deve estar em string YAML.`)
  }

  if (fm.data.ordem && Number.isNaN(Number(fm.data.ordem))) {
    errors.push(`${fileName}: ordem deve ser numérica.`)
  }

  if (fm.data.tempo && (Number(fm.data.tempo) < 15 || Number(fm.data.tempo) > 35)) {
    errors.push(`${fileName}: tempo deve estar entre 15 e 35 minutos.`)
  }

  if (fm.data.nivel && !['iniciante', 'intermediario'].includes(String(fm.data.nivel).trim())) {
    errors.push(`${fileName}: nivel deve ser 'iniciante' ou 'intermediario'.`)
  }

  if (fm.data.palavrasChave && !assertArrayString(JSON.parse(String(fm.data.palavrasChave).replace(/'/g, '"')) ?? [])) {
    errors.push(`${fileName}: palavrasChave deve ser array de strings.`)
  }

  if (fm.data.exercicios) {
    try {
      const parsed = JSON.parse(String(fm.data.exercicios).replace(/'/g, '"'))
      if (!Array.isArray(parsed)) errors.push(`${fileName}: exercicios deve ser array.`)
    } catch {
      errors.push(`${fileName}: exercicios deve ser lista YAML/JSON válida.`)
    }
  }

  const body = text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
  const sections = [
    /#\s+/,
    /<Callout\s+type="importante"/,
    /##\s+/,
    /<Quiz/i,
    /<Resumo>/i,
    /<Desafio>/i,
    /No mercado de trabalho/i,
  ]

  for (const pattern of sections) {
    if (!pattern.test(body)) {
      errors.push(`${fileName}: corpo da aula sem seção obrigatória: ${pattern}`)
    }
  }

  const codeCount = (body.match(/<CodeBlock|<Playground|<StepThrough/g) || []).length
  if (codeCount < 6) {
    errors.push(`${fileName}: aula deve conter pelo menos 6 blocos de código/atividade.`)
  }

  if (!/\b(Quiz|Resumo|Desafio)\b/i.test(body)) {
    errors.push(`${fileName}: aula sem Quiz/Resumo/Desafio explícitos.`)
  }

  return { file: fileName, errors }
}

function main() {
  const files = listLessonFiles()
  const results = files.map(validateLesson)
  const errors = results.flatMap((result) => result.errors)

  if (errors.length > 0) {
    console.error(`Validação de aulas falhou: ${files.length} aula(s) analisada(s).`)
    for (const error of errors) {
      console.error(`- ${error}`)
    }
    process.exit(1)
  }

  console.log(`Validação OK: ${files.length} aula(s) válidas.`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main()
}
