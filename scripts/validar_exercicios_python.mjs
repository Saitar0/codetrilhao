import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const modulesDir = path.join(root, 'src', 'modules')
const preludePath = path.join(root, 'src', 'lib', 'py-runner-prelude.py')
const prohibitedPhrases = [
  'Aplique esse tema em um mini cenário do dia a dia',
  'Leia o problema e identifique a entrada esperada',
  'Qual é a ideia central desta aula?',
  'Teste a lógica em casos simples antes de generalizar',
]
const difficultyXp = {
  fácil: 10,
  médio: 20,
  difícil: 30,
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

function normalizeOutput(value) {
  return String(value ?? '').replace(/\r/g, '').trim()
}

function listExerciseFiles({ rootDir = root, topic = null, global = false } = {}) {
  const files = []
  const modulesRoot = path.join(rootDir, 'src', 'modules')
  if (!fs.existsSync(modulesRoot)) {
    return files
  }

  function walk(currentDir) {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const fullPath = path.join(currentDir, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
        continue
      }
      if (!entry.isFile() || !fullPath.endsWith('.json')) continue
      if (!fullPath.includes(path.join('src', 'modules')) || !fullPath.includes(path.join('exercises'))) continue
      const name = path.basename(fullPath, '.json')
      if (topic !== null && !global) {
        const expectedPrefix = `t${String(topic).padStart(2, '0')}`
        if (!name.startsWith(expectedPrefix) && !name.startsWith(`${expectedPrefix}-`)) {
          continue
        }
      }
      files.push(fullPath)
    }
  }

  walk(modulesRoot)
  files.sort()
  return files
}

function findModuleIdFromFile(filePath) {
  const relative = path.relative(modulesDir, filePath)
  const parts = relative.split(path.sep)
  return parts[0]
}

function lessonExists(moduleId, slug) {
  const lessonPath = path.join(root, 'src', 'modules', moduleId, 'lessons', `${slug}.mdx`)
  return fs.existsSync(lessonPath)
}

function resolvePythonCommand() {
  const candidates = [
    ['python3'],
    ['python'],
    ['py', '-3'],
  ]

  for (const candidate of candidates) {
    const result = spawnSync(candidate[0], candidate.slice(1), {
      encoding: 'utf8',
      timeout: 2000,
    })
    if (!result.error && (result.status === 0 || result.status === null)) {
      return candidate
    }
  }

  return ['python3']
}

function runPythonBatch(codigo, tests) {
  const script = `
import importlib.util
import json
import pathlib
import sys

prelude_path = pathlib.Path(${JSON.stringify(preludePath)})
spec = importlib.util.spec_from_file_location('py_runner_prelude', prelude_path)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

tests = json.loads(sys.argv[1])
results = []
for item in tests:
    result = module.run_test(item['codigo'], item.get('entrada', ''), item.get('chamada'))
    results.append({
        'stdout': result.get('stdout', ''),
        'stderr': result.get('stderr', ''),
        'ok': bool(result.get('ok')),
    })
print(json.dumps(results))
`

  const command = resolvePythonCommand()
  const payload = JSON.stringify(tests.map((test) => ({
    codigo,
    entrada: test.entrada ?? '',
    chamada: test.chamada ?? null,
  })))

  const child = spawnSync(command[0], [...command.slice(1), '-c', script, payload], {
    cwd: root,
    encoding: 'utf8',
    timeout: 5000,
    maxBuffer: 5 * 1024 * 1024,
  })

  if (child.error) {
    return { ok: false, errors: [String(child.error)] }
  }

  if (child.status !== 0) {
    const stderr = String(child.stderr ?? '').replace(/\r/g, '').trim()
    return { ok: false, errors: [stderr || 'Erro ao executar a solução em CPython.'] }
  }

  try {
    return { ok: true, results: JSON.parse(child.stdout) }
  } catch (error) {
    return { ok: false, errors: [`Falha ao interpretar a saída Python: ${String(error)}`] }
  }
}

function validateCommonFields(exercise, fileName, filePath, errors) {
  if (!exercise || typeof exercise !== 'object' || Array.isArray(exercise)) {
    errors.push(`${fileName}: JSON inválido.`)
    return
  }

  if (!exercise.id || typeof exercise.id !== 'string') {
    errors.push(`${fileName}: campo id ausente ou inválido.`)
  } else if (exercise.id !== path.basename(fileName, '.json')) {
    errors.push(`${fileName}: id deve ser igual ao nome do arquivo (${path.basename(fileName, '.json')}).`)
  }

  if (!exercise.tipo || typeof exercise.tipo !== 'string') {
    errors.push(`${fileName}: campo tipo ausente.`)
  }

  if (!exercise.titulo || typeof exercise.titulo !== 'string') {
    errors.push(`${fileName}: campo titulo ausente.`)
  }

  if (!exercise.topico || typeof exercise.topico !== 'string') {
    errors.push(`${fileName}: campo topico ausente.`)
  }

  if (!exercise.dificuldade || !difficultyXp[exercise.dificuldade]) {
    errors.push(`${fileName}: dificuldade inválida: ${String(exercise.dificuldade)}`)
  }

  if (typeof exercise.xp !== 'number' || Number.isNaN(exercise.xp)) {
    errors.push(`${fileName}: xp deve ser numérico.`)
  } else if (exercise.dificuldade && difficultyXp[exercise.dificuldade] && exercise.xp !== difficultyXp[exercise.dificuldade]) {
    errors.push(`${fileName}: xp incompatível com a dificuldade (${exercise.dificuldade} => ${difficultyXp[exercise.dificuldade]}).`)
  }

  if (!exercise.aulaRelacionada || typeof exercise.aulaRelacionada !== 'string') {
    errors.push(`${fileName}: aulaRelacionada ausente.`)
  } else {
    const moduleId = findModuleIdFromFile(filePath)
    if (!lessonExists(moduleId, exercise.aulaRelacionada)) {
      errors.push(`${fileName}: aulaRelacionada '${exercise.aulaRelacionada}' não existe em src/modules/${moduleId}/lessons.`)
    }
  }

  if (!exercise.enunciado || typeof exercise.enunciado !== 'string') {
    errors.push(`${fileName}: enunciado ausente.`)
  }

  if (!Array.isArray(exercise.tags)) {
    errors.push(`${fileName}: tags deve ser um array.`)
  }

  if (!Array.isArray(exercise.dicas)) {
    errors.push(`${fileName}: dicas deve ser um array.`)
  } else {
    if (exercise.dicas.length !== 3) {
      errors.push(`${fileName}: dicas deve ter exatamente 3 itens.`)
    }
    if (new Set(exercise.dicas).size !== exercise.dicas.length) {
      errors.push(`${fileName}: dicas duplicadas.`)
    }
    for (const phrase of prohibitedPhrases) {
      if (exercise.dicas.some((item) => item.includes(phrase))) {
        errors.push(`${fileName}: dica contém frase proibida: "${phrase}".`)
      }
    }
  }

  if (exercise.topicoNumero !== undefined && (!Number.isInteger(exercise.topicoNumero) || exercise.topicoNumero < 1)) {
    errors.push(`${fileName}: topicoNumero deve ser um inteiro positivo.`)
  }

  if (exercise.variacao !== undefined && !['V1', 'V2', 'V3'].includes(exercise.variacao)) {
    errors.push(`${fileName}: variacao deve ser V1, V2 ou V3.`)
  }
}

function validateExerciseFile(filePath, { strict = false } = {}) {
  const fileName = path.basename(filePath)
  const errors = []

  let parsed
  try {
    parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (error) {
    return { file: fileName, errors: [`${fileName}: JSON inválido - ${String(error)}`], warnings: [] }
  }

  validateCommonFields(parsed, fileName, filePath, errors)

  if (parsed.tipo === 'codigo' || parsed.tipo === 'bug' || parsed.tipo === 'completar') {
    if (typeof parsed.starterCode !== 'string' || !parsed.starterCode.trim()) {
      errors.push(`${fileName}: starterCode ausente.`)
    }
    if (typeof parsed.solucao !== 'string' || !parsed.solucao.trim()) {
      errors.push(`${fileName}: solucao ausente.`)
    }
    if (!Array.isArray(parsed.testes)) {
      errors.push(`${fileName}: testes deve ser um array.`)
    } else {
      if (parsed.testes.length < 5) {
        errors.push(`${fileName}: precisa de pelo menos 5 testes.`)
      }
      const visible = parsed.testes.filter((test) => !test.oculto)
      const hidden = parsed.testes.filter((test) => test.oculto)
      if (visible.length < 3) {
        errors.push(`${fileName}: precisa de pelo menos 3 testes visíveis.`)
      }
      if (hidden.length < 2) {
        errors.push(`${fileName}: precisa de pelo menos 2 testes ocultos.`)
      }
      const signatures = parsed.testes.map((test) => JSON.stringify({
        entrada: test.entrada ?? '',
        chamada: test.chamada ?? null,
        esperado: test.esperado,
        oculto: Boolean(test.oculto),
      }))
      if (new Set(signatures).size !== signatures.length) {
        errors.push(`${fileName}: testes duplicados.`)
      }
      for (const test of parsed.testes) {
        if (!test || typeof test !== 'object') {
          errors.push(`${fileName}: teste inválido.`)
          continue
        }
        if (typeof test.esperado !== 'string') {
          errors.push(`${fileName}: teste sem esperado válido.`)
        }
        if (test.entrada === undefined && test.chamada === undefined) {
          errors.push(`${fileName}: teste deve possuir entrada ou chamada.`)
        }
      }

      if (typeof parsed.starterCode === 'string' && typeof parsed.solucao === 'string' && Array.isArray(parsed.testes)) {
        const starterRun = runPythonBatch(parsed.starterCode, parsed.testes)
        if (starterRun.ok) {
          let failedCount = 0
          for (let index = 0; index < parsed.testes.length; index += 1) {
            const test = parsed.testes[index]
            const result = starterRun.results[index]
            if (!result || !result.ok) {
              failedCount += 1
              continue
            }
            if (normalizeOutput(result.stdout) !== normalizeOutput(test.esperado)) {
              failedCount += 1
            }
          }
          if (failedCount < 1) {
            errors.push(`${fileName}: starterCode deve falhar em pelo menos 1 teste.`)
          }
        } else {
          errors.push(`${fileName}: starterCode não pôde ser executado: ${starterRun.errors.join('; ')}`)
        }

        const solutionRunA = runPythonBatch(parsed.solucao, parsed.testes)
        if (!solutionRunA.ok) {
          errors.push(`${fileName}: solução falhou ao executar em CPython: ${solutionRunA.errors.join('; ')}`)
        } else {
          for (let index = 0; index < parsed.testes.length; index += 1) {
            const test = parsed.testes[index]
            const result = solutionRunA.results[index]
            if (!result || result.ok !== true) {
              errors.push(`${fileName}: teste ${index + 1} da solução falhou com erro Python.`)
              continue
            }
            const actual = normalizeOutput(result.stdout)
            const expected = normalizeOutput(test.esperado)
            if (actual !== expected) {
              errors.push(`${fileName}: teste ${index + 1} da solução está incorreto. Esperado '${expected}' e obteve '${actual}'.`)
            }
          }

          const solutionRunB = runPythonBatch(parsed.solucao, parsed.testes)
          if (!solutionRunB.ok) {
            errors.push(`${fileName}: solução não determinística: não pôde ser executada em segunda rodada.`)
          } else {
            for (let index = 0; index < parsed.testes.length; index += 1) {
              const left = solutionRunA.results[index]
              const right = solutionRunB.results[index]
              if (!left || !right || JSON.stringify(left) !== JSON.stringify(right)) {
                errors.push(`${fileName}: solução não é determinística no teste ${index + 1}.`)
              }
            }
          }
        }
      }
    }
  }

  if (parsed.tipo === 'prever-saida') {
    if (typeof parsed.codigo !== 'string' || !parsed.codigo.trim()) {
      errors.push(`${fileName}: codigo ausente.`)
    }
    if (typeof parsed.respostaEsperada !== 'string') {
      errors.push(`${fileName}: respostaEsperada ausente.`)
    } else {
      const execution = runPythonBatch(parsed.codigo, [{ entrada: '', esperado: parsed.respostaEsperada }])
      if (!execution.ok) {
        errors.push(`${fileName}: execução de código falhou: ${execution.errors.join('; ')}`)
      } else {
        const result = execution.results[0]
        if (!result || result.ok !== true) {
          errors.push(`${fileName}: execução de código falhou em previsão de saída.`)
        } else if (normalizeOutput(result.stdout) !== normalizeOutput(parsed.respostaEsperada)) {
          errors.push(`${fileName}: respostaEsperada não bate com a execução do código.`)
        }
      }
    }
  }

  if (parsed.tipo === 'ordenar') {
    if (!Array.isArray(parsed.linhas) || parsed.linhas.length === 0) {
      errors.push(`${fileName}: linhas deve ser um array não vazio.`)
    }
    if (!Array.isArray(parsed.ordemCorreta) || parsed.ordemCorreta.length !== (parsed.linhas?.length ?? 0)) {
      errors.push(`${fileName}: ordemCorreta deve ser uma permutação de linhas.`)
    } else {
      const sorted = [...parsed.linhas].sort()
      const correctSorted = [...parsed.ordemCorreta].sort()
      if (JSON.stringify(sorted) !== JSON.stringify(correctSorted)) {
        errors.push(`${fileName}: ordemCorreta não é permutação de linhas.`)
      }
    }
  }

  if (parsed.tipo === 'multipla-escolha') {
    if (!Array.isArray(parsed.alternativas) || parsed.alternativas.length < 2) {
      errors.push(`${fileName}: alternativas deve ter ao menos 2 itens.`)
    } else {
      const correct = parsed.alternativas.filter((item) => item && item.correta === true)
      if (correct.length !== 1) {
        errors.push(`${fileName}: multipla-escolha deve ter exatamente 1 alternativa correta.`)
      }
      for (const item of parsed.alternativas) {
        if (!item || typeof item.explicacao !== 'string' || !item.explicacao.trim()) {
          errors.push(`${fileName}: alternativa sem explicacao válida.`)
          break
        }
      }
    }
  }

  return { file: fileName, errors, warnings: [] }
}

export function validateExerciseSet({ rootDir = root, strict = false, topic = null, global = false } = {}) {
  const files = listExerciseFiles({ rootDir, topic, global })
  const results = files.map((file) => validateExerciseFile(file, { strict }))
  const errors = results.flatMap((result) => result.errors)

  const ids = new Map()
  for (const file of files) {
    const parsed = JSON.parse(fs.readFileSync(file, 'utf8'))
    const currentId = parsed.id || path.basename(file, '.json')
    if (ids.has(currentId)) {
      errors.push(`${file}: id duplicado: ${currentId}`)
    }
    ids.set(currentId, file)
  }

  return { files, errors }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = parseArgs(process.argv.slice(2))
  const result = validateExerciseSet({
    rootDir: process.cwd(),
    strict: args.estrito,
    topic: args.global ? null : args.topico,
    global: args.global,
  })

  if (result.errors.length) {
    console.error(`Validação de exercícios falhou: ${result.files.length} arquivo(s) analisado(s).`)
    for (const error of result.errors) {
      console.error(`- ${error}`)
    }
    process.exit(1)
  }

  console.log(`Validação OK: ${result.files.length} exercício(s) válidos.`)
}
