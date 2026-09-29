import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const projectsDir = path.join(root, 'src', 'modules')

function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) return { raw: '', data: {} }
  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed) continue
    const index = trimmed.indexOf(':')
    if (index === -1) continue
    data[trimmed.slice(0, index).trim()] = trimmed.slice(index + 1).trim()
  }
  return { raw: match[1], data }
}

function listProjectFiles() {
  const files = []
  for (const moduleDir of fs.readdirSync(projectsDir, { withFileTypes: true })) {
    if (!moduleDir.isDirectory()) continue
    const miniDir = path.join(projectsDir, moduleDir.name, 'mini-projetos')
    if (!fs.existsSync(miniDir)) continue
    for (const file of fs.readdirSync(miniDir)) {
      if (file.endsWith('.mdx')) {
        files.push(path.join(miniDir, file))
      }
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

function main() {
  const files = listProjectFiles()
  const results = files.map(validateProject)
  const errors = results.flatMap((result) => result.errors)

  if (errors.length > 0) {
    console.error(`Validação de mini projetos falhou: ${files.length} projeto(s) analisado(s).`)
    for (const error of errors) {
      console.error(`- ${error}`)
    }
    process.exit(1)
  }

  console.log(`Validação OK: ${files.length} projeto(s) válidos.`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main()
}
