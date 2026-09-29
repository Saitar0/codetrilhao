import { spawnSync } from 'node:child_process'

const passthroughArgs = process.argv.slice(2)
const commands = [
  ['node', ['scripts/validar_exercicios_python.mjs', ...passthroughArgs]],
  ['node', ['scripts/validar_aulas.mjs', ...passthroughArgs]],
  ['node', ['scripts/validar_projetos.mjs', ...passthroughArgs]],
]

let failed = false
for (const [command, args] of commands) {
  const result = spawnSync(command, args, { stdio: 'inherit', cwd: process.cwd() })
  if (result.status !== 0) {
    failed = true
  }
}

if (failed) {
  process.exit(1)
}

console.log('Validação completa: todos os contratos passaram.')
