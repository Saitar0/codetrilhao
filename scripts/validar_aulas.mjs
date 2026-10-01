import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const modulesDir = path.join(root, 'src', 'modules')

function loadMapaTopicos(rootDir = root) {
  const mapaTopicosPath = path.join(rootDir, 'scripts', 'mapa-topicos.json')
  if (!fs.existsSync(mapaTopicosPath)) {
    return {}
  }
  return JSON.parse(fs.readFileSync(mapaTopicosPath, 'utf8'))
}

function parseArgs(argv) {
  const args = { topico: null, estrito: false, global: false }

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index]
    if (current === '--estrito') {
      args.estrito = true
      continue
    }
    if (current === '--global') {
      args.global = true
      continue
    }
    if (current === '--topico') {
      const nextValue = argv[index + 1]
      if (nextValue !== undefined) {
        args.topico = Number(nextValue)
        index += 1
      }
      continue
    }
    if (current.startsWith('--topico=')) {
      args.topico = Number(current.split('=')[1])
    }
  }

  return args
}

function parseFrontmatterValue(value) {
  const trimmed = String(value).trim()
  if (!trimmed) return ''

  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1)
  }

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      return JSON.parse(trimmed.replace(/'/g, '"'))
    } catch {
      return trimmed
    }
  }

  if (/^-?\d+$/.test(trimmed)) return Number(trimmed)
  if (/^-?\d+\.\d+$/.test(trimmed)) return Number(trimmed)
  if (trimmed === 'true') return true
  if (trimmed === 'false') return false

  return trimmed
}

function parseFrontmatter(text) {
  const normalizedText = String(text ?? '').replace(/^\uFEFF/, '')
  const match = normalizedText.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
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
    data[key] = parseFrontmatterValue(value)
  }

  return { raw: body, data }
}

function normalizeTopicKey(value) {
  return String(value).trim()
}

function getTopicSlugs(topic, rootDir = root) {
  if (topic === null) return null
  const mapaTopicos = loadMapaTopicos(rootDir)
  const key = normalizeTopicKey(topic)
  const match = mapaTopicos[key]
  if (Array.isArray(match)) {
    return new Set(match)
  }
  const fallback = mapaTopicos[Number(key)]
  if (Array.isArray(fallback)) {
    return new Set(fallback)
  }
  return new Set()
}

function listLessonFiles({ rootDir = root, topic = null, global = false } = {}) {
  const files = []
  const modulesRoot = path.join(rootDir, 'src', 'modules')
  if (!fs.existsSync(modulesRoot)) {
    return files
  }

  const topicSlugs = topic === null ? null : getTopicSlugs(topic, rootDir)
  for (const moduleDir of fs.readdirSync(modulesRoot, { withFileTypes: true })) {
    if (!moduleDir.isDirectory()) continue
    const lessonsDir = path.join(modulesRoot, moduleDir.name, 'lessons')
    if (!fs.existsSync(lessonsDir)) continue
    for (const file of fs.readdirSync(lessonsDir)) {
      if (!file.endsWith('.mdx')) continue
      const fullPath = path.join(lessonsDir, file)
      const slug = path.basename(file, '.mdx')
      if (global || topic === null) {
        files.push(fullPath)
        continue
      }

      // include files that match the topic slug or are child pages like `slug-...`
      if (topicSlugs && (topicSlugs.has(slug) || [...topicSlugs].some((s) => slug.startsWith(`${s}-`)))) {
        files.push(fullPath)
      }
    }
  }

  return files.sort()
}

function assertArrayString(value) {
  if (!Array.isArray(value)) return false
  return value.every((item) => typeof item === 'string')
}

function validateLessonFile(filePath, { strict = false } = {}) {
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

  if (fm.data.titulo !== undefined && (typeof fm.data.titulo !== 'string' || !fm.data.titulo.trim())) {
    errors.push(`${fileName}: titulo deve estar em string YAML.`)
  }

  if (fm.data.ordem !== undefined && Number.isNaN(Number(fm.data.ordem))) {
    errors.push(`${fileName}: ordem deve ser numérica.`)
  }

  if (fm.data.tempo !== undefined && (Number(fm.data.tempo) < 15 || Number(fm.data.tempo) > 35)) {
    errors.push(`${fileName}: tempo deve estar entre 15 e 35 minutos.`)
  }

  if (fm.data.nivel !== undefined && !['iniciante', 'intermediario'].includes(String(fm.data.nivel).trim())) {
    errors.push(`${fileName}: nivel deve ser 'iniciante' ou 'intermediario'.`)
  }

  if (fm.data.palavrasChave !== undefined && !assertArrayString(fm.data.palavrasChave)) {
    errors.push(`${fileName}: palavrasChave deve ser array de strings.`)
  }

  if (fm.data.exercicios !== undefined && !Array.isArray(fm.data.exercicios)) {
    errors.push(`${fileName}: exercicios deve ser array.`)
  }

  const normalizedText = String(text ?? '').replace(/^\uFEFF/, '')
  const body = normalizedText.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
  const sections = [
    /#\s+/,
    /<Callout\s+type="importante"/,
    /##\s+/,
    /<Quiz\b/i,
    /<Resumo\b/i,
    /<Desafio\b/i,
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

  if (strict && fm.data.topico && !['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '99'].includes(String(fm.data.topico).trim())) {
    errors.push(`${fileName}: topico do frontmatter não é um número válido.`)
  }

  return { file: fileName, errors }
}

function runGlobalLessonChecks({ rootDir = root } = {}) {
  const errors = []
  const files = listLessonFiles({ rootDir, global: true })
  const mapaTopicos = loadMapaTopicos(rootDir)
  const mapSlugs = new Set(Object.values(mapaTopicos).flatMap((list) => Array.isArray(list) ? list : []))
  const found = new Set(files.map((file) => path.basename(file, '.mdx')))

  for (const slug of [...mapSlugs].sort()) {
    const exists = files.some((file) => path.basename(file, '.mdx') === slug)
    if (!exists) {
      errors.push(`slug da trilha sem arquivo: ${slug}`)
    }
  }

  for (const slug of [...found].sort()) {
    if (!mapSlugs.has(slug)) {
      errors.push(`aula fora da trilha: ${slug}`)
    }
  }

  const orders = []
  for (const file of files) {
    const fm = parseFrontmatter(fs.readFileSync(file, 'utf8'))
    if (fm.data.ordem !== undefined) {
      const parsed = Number(fm.data.ordem)
      if (!Number.isNaN(parsed)) {
        orders.push({ slug: path.basename(file, '.mdx'), ordem: parsed })
      }
    }
  }

  const uniqueOrders = new Set(orders.map((entry) => entry.ordem))
  if (orders.length && uniqueOrders.size !== orders.length) {
    errors.push('ordem duplicada entre aulas.')
  }

  if (orders.length > 0) {
    const sorted = [...orders].map((entry) => entry.ordem).sort((a, b) => a - b)
    const expected = Array.from({ length: sorted.length }, (_, index) => index + 1)
    if (JSON.stringify(sorted) !== JSON.stringify(expected)) {
      errors.push('ordem das aulas fora da sequência esperada.')
    }
  }

  const totalMapSlugs = [...mapSlugs].length
  if (files.length !== totalMapSlugs) {
    errors.push(`contagem global inconsistente: ${files.length} aulas encontradas para ${totalMapSlugs} slugs esperados.`)
  }

  return errors
}

export function validateLessonSet({ rootDir = root, topic = null, strict = false, global = false } = {}) {
  const files = listLessonFiles({ rootDir, topic, global })
  const results = files.map((file) => validateLessonFile(file, { strict }))
  const errors = results.flatMap((result) => result.errors)

  if (global || topic === null) {
    errors.push(...runGlobalLessonChecks({ rootDir }))
  }

  return { files, errors }
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  const { topic, global, estrito } = args
  const result = validateLessonSet({ rootDir: process.cwd(), topic, strict: estrito, global })

  if (result.errors.length > 0) {
    console.error(`Validação de aulas falhou: ${result.files.length} aula(s) analisada(s).`)
    for (const error of result.errors) {
      console.error(`- ${error}`)
    }
    process.exit(1)
  }

  console.log(`Validação OK: ${result.files.length} aula(s) válidas.`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main()
}
