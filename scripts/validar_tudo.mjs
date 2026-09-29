import { spawnSync } from 'node:child_process'

const commands = [
  ['node', ['scripts/validar_exercicios_python.mjs']],
  ['node', ['scripts/validar_aulas.mjs']],
  ['node', ['scripts/validar_projetos.mjs']],
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
