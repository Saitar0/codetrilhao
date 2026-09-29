import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')
const sourceDir = join(rootDir, 'node_modules', 'pyodide')
const targetDir = join(rootDir, 'public', 'assets', 'pyodide')

const filesToCopy = [
  'pyodide.mjs',
  'pyodide.js',
  'pyodide.asm.mjs',
  'pyodide.asm.wasm',
  'pyodide-lock.json',
  'python_stdlib.zip',
  'README.md',
]

function ensureTargetDir() {
  mkdirSync(targetDir, { recursive: true })
}

function copyFiles() {
  if (!existsSync(sourceDir)) {
    throw new Error(`Pyodide não encontrado em ${sourceDir}. Rode npm install antes de continuar.`)
  }

  ensureTargetDir()

  for (const file of filesToCopy) {
    const source = join(sourceDir, file)
    if (!existsSync(source)) {
      continue
    }
    cpSync(source, join(targetDir, file), { recursive: false })
  }
}

copyFiles()
