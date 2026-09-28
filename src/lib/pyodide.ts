export async function loadPyodideInstance() {
  if (typeof window === 'undefined') {
    throw new Error('Pyodide só pode ser carregado no navegador.')
  }
  // Explicit indexURL pointing to public assets. Ensure vite copies public/assets/pyodide
  const base = new URL('/', import.meta.url).toString()
  const indexURL = `${base}assets/pyodide/`

  // Dynamic import with retry logic for transient network failures
  const tryLoad = async (attempt = 1): Promise<any> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { loadPyodide } = await import('pyodide')
      return await loadPyodide({ indexURL })
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
