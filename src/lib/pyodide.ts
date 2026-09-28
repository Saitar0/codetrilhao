export async function loadPyodideInstance() {
  if (typeof window === 'undefined') {
    throw new Error('Pyodide só pode ser carregado no navegador.')
  }

  const { loadPyodide } = await import('pyodide')
  return loadPyodide({
    indexURL: new URL('./assets/pyodide/', import.meta.url).toString(),
  })
}
