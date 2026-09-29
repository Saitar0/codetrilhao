import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

import { validateLessonSet } from '../validar_aulas.mjs'
import { validateProjectSet } from '../validar_projetos.mjs'
import { validateExerciseSet } from '../validar_exercicios_python.mjs'

const root = process.cwd()
const topic1Map = new Set(['o-que-e-python', 'instalando-e-rodando', 'sintaxe-basica', 'entrada-e-saida'])

describe('topic-scoped validators', () => {
  it('filters lessons to the selected topic only', () => {
    const result = validateLessonSet({ rootDir: root, topic: 1, global: false })
    expect(result.files.length).toBe(4)
    expect(new Set(result.files.map((file) => path.basename(file, '.mdx')))).toEqual(topic1Map)
    expect(result.errors).toHaveLength(1)
    expect(result.errors[0]).toContain('o-que-e-python.mdx: aula deve conter pelo menos 6 blocos de código/atividade.')
  })

  it('filters projects to the selected topic only', () => {
    const result = validateProjectSet({ rootDir: root, topic: 1, global: false })
    expect(result.files.length).toBe(1)
    expect(result.files[0].endsWith('t01-v2-conversor-de-moedas-fixo.mdx')).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('filters exercises to the selected topic only and honors the canonical naming', () => {
    const result = validateExerciseSet({ rootDir: root, topic: 1, global: false })
    expect(result.files.length).toBeGreaterThan(0)
    expect(result.files.every((file) => path.basename(file, '.json').startsWith('t01-'))).toBe(true)
    expect(result.errors).toHaveLength(0)
  })
})
