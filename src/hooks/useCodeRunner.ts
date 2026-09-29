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

  const run = useCallback(async (code: string, input = '', chamada?: string): Promise<CodeRunResult> => {
    const worker = ensureWorker()
    setLoading(true)
    setStdout('')
    setStderr('')

    return new Promise((resolve) => {
      let settled = false

      const finish = (result: CodeRunResult) => {
        if (settled) return
        settled = true
        window.clearTimeout(timer)
        setLoading(false)
        setStdout(result.stdout)
        setStderr(result.stdout ? '' : result.stderr)
        resolve(result)
      }

      const timer = window.setTimeout(() => {
        const fallbackMessage = 'Execução excedeu o tempo limite (possível loop infinito)'
        try {
          worker.terminate()
        } catch (error) {
          console.warn('Worker termination failed', error)
        }
        workerRef.current = null
        setStderr(fallbackMessage)
        setLoading(false)
        onError?.(fallbackMessage)
        finish({ stdout: '', stderr: fallbackMessage, ok: false })
      }, timeoutMs)

      const handleMessage = (event: MessageEvent) => {
        const payload = (event.data ?? {}) as { stdout?: string; stderr?: string; ok?: boolean }
        const result: CodeRunResult = {
          stdout: payload.stdout ?? '',
          stderr: payload.stderr ?? '',
          ok: payload.ok ?? false,
        }

        if (!result.ok && result.stderr) onError?.(result.stderr)

        finish(result)
      }

      const handleError = (ev: ErrorEvent) => {
        const message = ev?.message ?? 'Erro ao executar o código no worker.'
        setStderr(message)
        onError?.(message)
        finish({ stdout: '', stderr: message, ok: false })
      }

      worker.addEventListener('message', handleMessage)
      worker.addEventListener('error', handleError)
      worker.postMessage({ type: 'run', code, input, chamada })
    })
  }, [ensureWorker, onError, timeoutMs])

  const reset = useCallback(() => {
    setStdout('')
    setStderr('')
    setLoading(false)
    try {
      workerRef.current?.postMessage({ type: 'terminate' })
    } catch {
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
