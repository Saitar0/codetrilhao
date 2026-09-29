import { describe, expect, it } from 'vitest'

import { getAllModuleLessons } from '../module-content'

const lessonFiles = import.meta.glob('../../modules/**/*.mdx', { eager: true }) as Record<
  string,
  { default?: unknown; frontmatter?: Record<string, unknown> }
>

const lessonEntries = Object.entries(lessonFiles).filter(
  ([filepath]) => !filepath.includes('/mini-projetos/'),
)

describe('module-content', () => {
  it('exports frontmatter and valid metadata for every lesson file', () => {
    const slugs = new Set<string>()

    expect(lessonEntries.length).toBeGreaterThan(0)

    for (const [filepath, module] of lessonEntries) {
      const frontmatter = module.frontmatter
      const slug = filepath.split('/').pop()?.replace(/\.mdx$/, '') ?? ''

      expect(frontmatter, `frontmatter ausente em ${filepath}`).toBeTruthy()
      expect(slug).not.toBe('')
      expect(slugs.has(slug), `slug duplicado: ${slug}`).toBe(false)
      slugs.add(slug)

      expect(frontmatter?.titulo).toEqual(expect.any(String))
      expect(String(frontmatter?.titulo ?? '')).not.toHaveLength(0)
      expect(frontmatter?.descricao).toEqual(expect.any(String))
      expect(String(frontmatter?.descricao ?? '')).not.toHaveLength(0)
      expect(frontmatter?.secao).toEqual(expect.any(String))
      expect(String(frontmatter?.secao ?? '')).not.toHaveLength(0)
      expect(frontmatter?.ordem).toEqual(expect.any(Number))
      expect(frontmatter?.tempo).toEqual(expect.any(Number))
      expect(frontmatter?.nivel).toEqual(expect.any(String))
      expect(String(frontmatter?.nivel ?? '')).not.toHaveLength(0)
      expect(frontmatter?.palavrasChave).toEqual(expect.any(Array))
      expect((frontmatter?.palavrasChave as string[] | undefined)?.length).toBeGreaterThan(0)
      expect(frontmatter?.exercicios).toEqual(expect.any(Array))
      expect((frontmatter?.exercicios as string[] | undefined)?.length).toBeGreaterThanOrEqual(0)
    }
  })

  it('loads python lessons without including mini projects and keeps the expected count', () => {
    const lessons = getAllModuleLessons().python ?? []

    expect(lessons.length).toBe(39)
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(lessons.length)
    expect(lessons.every((lesson) => lesson.title.trim().length > 0)).toBe(true)
    expect(lessons.every((lesson) => lesson.section.trim().length > 0)).toBe(true)
  })
})
