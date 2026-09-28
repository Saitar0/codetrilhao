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

    const worker = new Worker(new URL('../workers/pyodide-worker.ts', import.meta.url), { type: 'module' })
    workerRef.current = worker
    return worker
  }, [])

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
      worker.terminate()
      workerRef.current = null
      const fallbackMessage = 'Tempo limite excedido. O código demorou demais para responder.'
      setStderr(fallbackMessage)
      setLoading(false)
      onError?.(fallbackMessage)
    }, timeoutMs)

    return new Promise((resolve) => {
      worker.onmessage = (event) => {
        const payload = event.data as { stdout?: string; stderr?: string; ok?: boolean }
        window.clearTimeout(timer)

        const nextStdout = payload.stdout ?? ''
        const nextStderr = payload.stderr ?? ''
        setStdout(nextStdout)
        setStderr(nextStdout ? '' : nextStderr)
        setLoading(false)

        const result = {
          stdout: nextStdout,
          stderr: nextStderr,
          ok: payload.ok ?? false,
        }

        if (result.ok === false && nextStderr) {
          onError?.(nextStderr)
        }

        resolve(result)
      }

      worker.onerror = () => {
        window.clearTimeout(timer)
        const message = 'Erro ao executar o código no worker.'
        setStderr(message)
        setLoading(false)
        onError?.(message)
        resolve({ stdout: '', stderr: message, ok: false })
      }

      worker.postMessage({ type: 'run', code, input })
    })
  }, [ensureWorker, onError, timeoutMs])

  const reset = useCallback(() => {
    setStdout('')
    setStderr('')
    setLoading(false)
    terminateWorker()
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
