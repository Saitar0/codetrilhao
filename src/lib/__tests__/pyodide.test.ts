import { describe, expect, it } from 'vitest'

import { buildPyodideRunnerScript } from '../pyodide'

describe('pyodide runner script', () => {
  it('monta um script estável com entrada e chamada', () => {
    const script = buildPyodideRunnerScript('nome = input()\nprint(nome)', 'Ana', 'nome')

    expect(script).toContain('run_test(')
    expect(script).toContain('entrada="Ana"')
    expect(script).toContain('chamada="nome"')
    expect(script).toContain('nome = input()')
  })

  it('mantém chamada opcional como None', () => {
    const script = buildPyodideRunnerScript('print(1)')

    expect(script).toContain('chamada=None')
  })
})
