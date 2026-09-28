import { useCallback, useRef, useState } from 'react'

export type CodeRunResult = {
  stdout: string
  stderr: string
  ok: boolean
}

export type UseCodeRunnerOptions = {
  timeoutMs?: number
  onError?: (message: string) => void
}

export function useCodeRunner({ timeoutMs = 5000, onError }: UseCodeRunnerOptions = {}) {
  const workerRef = useRef<Worker | null>(null)
  const [loading, setLoading] = useState(false)
  const [stdout, setStdout] = useState('')
  const [stderr, setStderr] = useState('')

  const ensureWorker = useCallback(() => {
    if (workerRef.current) return workerRef.current

    try {
      const worker = new Worker(new URL('../workers/pyodide-worker.ts', import.meta.url), { type: 'module' })
      // setup basic health handlers
      worker.onerror = (ev) => {
        console.error('Worker error', ev)
      }

      workerRef.current = worker
      return worker
    } catch (err) {
      onError?.('Falha ao iniciar o worker de execução de código.')
      throw err
    }
  }, [onError])

  const terminateWorker = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate()
      workerRef.current = null
    }
  }, [])

  const run = useCallback(async (code: string, input = ''): Promise<CodeRunResult> => {
    const worker = ensureWorker()
    setLoading(true)
    setStdout('')
    setStderr('')

    const timer = window.setTimeout(() => {
      try {
        workerRef.current?.terminate()
      } catch (e) {
        // ignore termination errors
         
        console.warn('Worker termination failed', e)
      }
      workerRef.current = null
      const fallbackMessage = 'Tempo limite excedido. O código demorou demais para responder.'
      setStderr(fallbackMessage)
      setLoading(false)
      onError?.(fallbackMessage)
    }, timeoutMs)

    return new Promise((resolve) => {
      const cleanup = () => {
        window.clearTimeout(timer)
        setLoading(false)
      }

      const handleMessage = (event: MessageEvent) => {
        const payload = (event.data ?? {}) as { stdout?: string; stderr?: string; ok?: boolean }
        cleanup()

        const nextStdout = payload.stdout ?? ''
        const nextStderr = payload.stderr ?? ''
        setStdout(nextStdout)
        setStderr(nextStdout ? '' : nextStderr)

        const result: CodeRunResult = {
          stdout: nextStdout,
          stderr: nextStderr,
          ok: payload.ok ?? false,
        }

        if (!result.ok && nextStderr) onError?.(nextStderr)

        // keep worker alive for subsequent runs; don't terminate here
        resolve(result)
      }

      const handleError = (ev: ErrorEvent) => {
        cleanup()
        const message = ev?.message ?? 'Erro ao executar o código no worker.'
        setStderr(message)
        onError?.(message)
        resolve({ stdout: '', stderr: message, ok: false })
      }

      // attach listeners
      worker.addEventListener('message', handleMessage)
      worker.addEventListener('error', handleError)

      // post request
      worker.postMessage({ type: 'run', code, input })
    })
  }, [ensureWorker, onError, timeoutMs])

  const reset = useCallback(() => {
    setStdout('')
    setStderr('')
    setLoading(false)
    // terminate worker gracefully and clear ref
    try {
      workerRef.current?.postMessage({ type: 'terminate' })
    } catch {
      // fallback
      terminateWorker()
    }
  }, [terminateWorker])

  return {
    workerRef,
    stdout,
    stderr,
    loading,
    run,
    reset,
    terminateWorker,
  }
}
