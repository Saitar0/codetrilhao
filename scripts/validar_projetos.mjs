import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const projectsDir = path.join(root, 'src', 'modules')

function parseArgs(argv) {
  const args = { topico: null, global: false }

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index]
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
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) return { raw: '', data: {} }
  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed) continue
    const index = trimmed.indexOf(':')
    if (index === -1) continue
    data[trimmed.slice(0, index).trim()] = parseFrontmatterValue(trimmed.slice(index + 1).trim())
  }
  return { raw: match[1], data }
}

function listProjectFiles({ rootDir = root, topic = null, global = false } = {}) {
  const files = []
  const modulesRoot = path.join(rootDir, 'src', 'modules')
  if (!fs.existsSync(modulesRoot)) {
    return files
  }

  for (const moduleDir of fs.readdirSync(modulesRoot, { withFileTypes: true })) {
    if (!moduleDir.isDirectory()) continue
    const miniDir = path.join(modulesRoot, moduleDir.name, 'mini-projetos')
    if (!fs.existsSync(miniDir)) continue
    for (const file of fs.readdirSync(miniDir)) {
      if (!file.endsWith('.mdx')) continue
      const fullPath = path.join(miniDir, file)
      const name = path.basename(file, '.mdx')
      if (topic !== null && !global) {
        const expectedPrefix = `t${String(topic).padStart(2, '0')}`
        if (!name.startsWith(expectedPrefix) && !name.startsWith(`${expectedPrefix}-`)) {
          continue
        }
      }
      files.push(fullPath)
    }
  }
  return files.sort()
}

function validateProject(filePath) {
  const fileName = path.basename(filePath)
  const text = fs.readFileSync(filePath, 'utf8')
  const fm = parseFrontmatter(text)
  const errors = []

  const requiredKeys = ['titulo', 'descricao', 'topico', 'topicoNome', 'variacao', 'tempo', 'nivel', 'execucao', 'palavrasChave']
  for (const key of requiredKeys) {
    if (!(key in fm.data)) {
      errors.push(`${fileName}: faltando frontmatter '${key}'.`)
    }
  }

  if (!fm.raw) {
    errors.push(`${fileName}: frontmatter ausente.`)
  }

  if (fm.data.execucao && !['navegador', 'local'].includes(String(fm.data.execucao).trim())) {
    errors.push(`${fileName}: execucao deve ser 'navegador' ou 'local'.`)
  }

  const body = text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
  const requiredPatterns = [
    /#\s+/,
    /Contexto/i,
    /O que você vai construir/i,
    /Requisitos/i,
    /Critérios de aceite|Critérios de aceite/i,
    /Guia/i,
    /Desafio extra/i,
    /Visão de mercado|Visao de mercado/i,
    /Autoavaliação|Autoavaliacao/i,
    /Solução de referência|Solucao de referencia|<details>/i,
  ]

  for (const pattern of requiredPatterns) {
    if (!pattern.test(body)) {
      errors.push(`${fileName}: corpo do mini projeto sem seção obrigatória.`)
    }
  }

  if (!/\<Playground\b|<CodeBlock\b/.test(body) && String(fm.data.execucao).trim() === 'navegador') {
    errors.push(`${fileName}: projeto em navegador deve incluir exemplo inicial em Playground.`)
  }

  return { file: fileName, errors }
}

export function validateProjectSet({ rootDir = root, topic = null, global = false } = {}) {
  const files = listProjectFiles({ rootDir, topic, global })
  const results = files.map(validateProject)
  const errors = results.flatMap((result) => result.errors)

  return { files, errors }
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  const result = validateProjectSet({ rootDir: process.cwd(), topic: args.topico, global: args.global })

  if (result.errors.length > 0) {
    console.error(`Validação de mini projetos falhou: ${result.files.length} projeto(s) analisado(s).`)
    for (const error of result.errors) {
      console.error(`- ${error}`)
    }
    process.exit(1)
  }

  console.log(`Validação OK: ${result.files.length} projeto(s) válidos.`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main()
}
