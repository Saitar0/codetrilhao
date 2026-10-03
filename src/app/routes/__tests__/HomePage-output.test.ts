import { describe, expect, it } from 'vitest'

import { getCodeExampleOutput } from '../HomePage'

describe('HomePage demo outputs', () => {
  it('returns the output matching the active code example', () => {
    expect(getCodeExampleOutput('hello')).toBe('Olá, CodeTrilha!')
    expect(getCodeExampleOutput('loop')).toBe('2\n4\n6\n8\n10')
    expect(getCodeExampleOutput('function')).toBe('15')
  })
})
