export async function loadPyodideInstance() {
  if (typeof window === 'undefined') {
    throw new Error('Pyodide só pode ser carregado no navegador.')
  }

  const { loadPyodide } = await import('pyodide')
  return loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
  })
}
