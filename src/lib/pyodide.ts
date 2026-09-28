export type PyodideLike = {
  setStdout: (handler: { batched: (value: string) => void }) => void
  setStderr: (handler: { batched: (value: string) => void }) => void
  runPythonAsync: (code: string) => Promise<void>
}

export async function loadPyodideInstance(): Promise<PyodideLike> {
  if (typeof window === 'undefined') {
    throw new Error('Pyodide só pode ser carregado no navegador.')
  }
  // Explicit indexURL pointing to public assets. Ensure vite copies public/assets/pyodide
  const base = new URL('/', import.meta.url).toString()
  const indexURL = `${base}assets/pyodide/`

  // Dynamic import with retry logic for transient network failures
  const tryLoad = async (attempt = 1): Promise<PyodideLike> => {
    try {
       
      const { loadPyodide } = await import('pyodide')
      // loadPyodide returns a runtime instance; cast it to our minimal shape
      const inst = await loadPyodide({ indexURL })
      return inst as unknown as PyodideLike
    } catch (err) {
      if (attempt < 3) {
        // exponential backoff
        await new Promise((res) => setTimeout(res, 300 * Math.pow(2, attempt)))
        return tryLoad(attempt + 1)
      }
      throw err
    }
  }

  return tryLoad()
}
