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

  // @ts-expect-error pyodide global is provided by the CDN script loaded below
  await import('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js')

  // @ts-expect-error pyodide is global after import
  pyodide = await globalThis.loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
  })
  pyodideReady = true
  return pyodide
}

self.onmessage = async (event: MessageEvent<WorkerMessage>) => {
  const message = event.data

  if (message.type === 'terminate') {
    self.close()
    return
  }

  if (message.type !== 'run') {
    self.postMessage({ type: 'error', message: 'Mensagem não reconhecida.' })
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

    instance.setStdout({ batched: (text: string) => stdout.push(String(text)) })
    instance.setStderr({ batched: (text: string) => stderr.push(String(text)) })

    await instance.runPythonAsync(sanitizedCode)

    self.postMessage({
      type: 'result',
      stdout: stdout.join(''),
      stderr: stderr.join(''),
      ok: true,
    })
  } catch (error) {
    const messageText = error instanceof Error ? error.message : 'Erro ao executar o código.'
    self.postMessage({
      type: 'result',
      stdout: '',
      stderr: messageText,
      ok: false,
    })
  }
}
