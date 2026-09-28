type WorkerMessage =
  | { type: 'run'; code: string; input?: string }
  | { type: 'terminate' }

let pyodideReady = false
let pyodide: {
  setStdout: (handler: { batched: (value: string) => void }) => void
  setStderr: (handler: { batched: (value: string) => void }) => void
  runPythonAsync: (code: string) => Promise<unknown>
} | null = null

const normalizeInput = (source: string, provided: string) => {
  const values = provided
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  if (!values.length) return source

  let index = 0
  return source.replace(/input\s*\(.+?\)/g, () => {
    const next = values[index] ?? values[values.length - 1]
    index += 1
    return JSON.stringify(next)
  })
}

const ensurePyodide = async () => {
  if (pyodideReady && pyodide) return pyodide

  // Resolve to public assets path; worker runs under same origin
  const base = new URL('/', import.meta.url).toString()
  const indexURL = `${base}assets/pyodide/`

  const { loadPyodide } = await import('pyodide')
  pyodide = await loadPyodide({ indexURL })
  pyodideReady = true
  return pyodide
}

self.onmessage = async (event: MessageEvent<WorkerMessage>) => {
  const message = event.data

  if (message.type === 'terminate') {
    try {
      // allow graceful shutdown
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

    const sanitizedCode = normalizeInput(message.code, message.input ?? '')
    const stdout: string[] = []
    const stderr: string[] = []

    // attach batched handlers
    instance.setStdout({ batched: (text: string) => stdout.push(String(text)) })
    instance.setStderr({ batched: (text: string) => stderr.push(String(text)) })

    // run with a safe timeout guard inside worker
    const runPromise = instance.runPythonAsync(sanitizedCode)
    const timeoutMs = 20_000
    const race = await Promise.race([
      runPromise.then(() => ({ ok: true })),
      new Promise((res) => setTimeout(() => res({ ok: false, reason: 'timeout' }), timeoutMs)),
    ])

    if ((race as any).ok !== true) {
      self.postMessage({ type: 'result', stdout: stdout.join(''), stderr: 'Execução excedeu o tempo limite.', ok: false })
      return
    }

    self.postMessage({ type: 'result', stdout: stdout.join(''), stderr: stderr.join(''), ok: true })
  } catch (error) {
    const messageText = error instanceof Error ? error.message : 'Erro ao executar o código.'
    self.postMessage({ type: 'result', stdout: '', stderr: messageText, ok: false })
  }
}
