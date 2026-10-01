export type PyodideLike = {
  setStdout: (handler: { batched: (value: string) => void }) => void
  setStderr: (handler: { batched: (value: string) => void }) => void
  loadPackagesFromImports: (code: string) => Promise<unknown>
  runPythonAsync: (code: string) => Promise<unknown>
}

export function buildPyodideRunnerScript(code: string, input = '', chamada?: string): string {
  const codeLiteral = JSON.stringify(code)
  const inputLiteral = JSON.stringify(input)
  const chamadaLiteral = chamada === undefined ? 'None' : JSON.stringify(chamada)

  return [
    'result = run_test(codigo=' + codeLiteral + ', entrada=' + inputLiteral + ', chamada=' + chamadaLiteral + ')',
    'result',
  ].join('\n')
}

export async function loadPyodideInstance(): Promise<PyodideLike> {
  if (typeof window === 'undefined') {
    throw new Error('Pyodide só pode ser carregado no navegador.')
  }

  const origin = (globalThis as any).location?.origin ?? new URL(import.meta.url).origin
  const indexURL = `${origin}/assets/pyodide/`

  const tryLoad = async (attempt = 1): Promise<PyodideLike> => {
    try {
      const { loadPyodide } = await import('pyodide')
      const inst = await loadPyodide({ indexURL })
      return inst as unknown as PyodideLike
    } catch (err) {
      if (attempt < 3) {
        await new Promise((res) => setTimeout(res, 300 * Math.pow(2, attempt)))
        return tryLoad(attempt + 1)
      }
      throw err
    }
  }

  return tryLoad()
}
