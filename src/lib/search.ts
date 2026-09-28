export function searchInContent<T extends Record<string, unknown>>(
  items: T[],
  query: string,
  fields: (keyof T)[],
) {
  const formatted = query.trim().toLowerCase()

  if (!formatted) return items

  return items.filter((item) =>
    fields.some((field) => {
      const value = item[field]
      return typeof value === 'string' && value.toLowerCase().includes(formatted)
    }),
  )
}
