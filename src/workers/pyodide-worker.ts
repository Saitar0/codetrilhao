import pyodidePrelude from '../lib/py-runner-prelude.py?raw'
import { buildPyodideRunnerScript } from '../lib/pyodide'

type WorkerMessage =
  | { type: 'run'; code: string; input?: string; chamada?: string }
  | { type: 'terminate' }

let pyodideReady = false
let pyodide: {
  setStdout: (handler: { batched: (value: string) => void }) => void
  setStderr: (handler: { batched: (value: string) => void }) => void
  loadPackagesFromImports: (code: string) => Promise<unknown>
  runPythonAsync: (code: string) => Promise<unknown>
} | null = null

const ensurePyodide = async () => {
  if (pyodideReady && pyodide) return pyodide

  const base = new URL('/', import.meta.url).toString()
  const indexURL = `${base}assets/pyodide/`

  const { loadPyodide } = await import('pyodide')
  const instance = await loadPyodide({ indexURL })
  pyodide = instance as unknown as {
    setStdout: (handler: { batched: (value: string) => void }) => void
    setStderr: (handler: { batched: (value: string) => void }) => void
    loadPackagesFromImports: (code: string) => Promise<unknown>
    runPythonAsync: (code: string) => Promise<unknown>
  }
  pyodideReady = true

  const current = pyodide
  if (!current) {
    throw new Error('Pyodide não inicializou corretamente.')
  }

  await current.runPythonAsync(pyodidePrelude)
  return current
}

self.onmessage = async (event: MessageEvent<WorkerMessage>) => {
  const message = event.data

  if (message.type === 'terminate') {
    pyodideReady = false
    pyodide = null
    try {
      self.close()
    } catch {
      // ignore
    }
    return
  }

  if (message.type !== 'run') {
    self.postMessage({ type: 'result', stdout: '', stderr: 'Mensagem não reconhecida.', ok: false })
    return
  }

  try {
    const instance = await ensurePyodide()
    if (!instance) {
      throw new Error('Pyodide não inicializou corretamente.')
    }

    await instance.loadPackagesFromImports(message.code)

    const stdout: string[] = []
    const stderr: string[] = []
    instance.setStdout({ batched: (text: string) => stdout.push(String(text)) })
    instance.setStderr({ batched: (text: string) => stderr.push(String(text)) })

    const result = await instance.runPythonAsync(
      buildPyodideRunnerScript(message.code, message.input ?? '', message.chamada),
    ) as { stdout?: string; stderr?: string; ok?: boolean }

    const output = {
      stdout: result?.stdout ?? '',
      stderr: result?.stderr ?? stderr.join(''),
      ok: result?.ok ?? true,
    }

    self.postMessage({ type: 'result', ...output })
  } catch (error) {
    const messageText = error instanceof Error ? error.message : 'Erro ao executar o código.'
    self.postMessage({ type: 'result', stdout: '', stderr: messageText, ok: false })
  }
}
