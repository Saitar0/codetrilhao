export const STORAGE_KEYS = {
  theme: 'codetrilha-theme',
  progress: 'codetrilha-progress',
}

export function formatXp(xp: number) {
  return `${xp.toLocaleString('pt-BR')} XP`
}

export function getProgressPercent(completed: number, total: number) {
  if (total === 0) return 0
  return Math.min(100, Math.round((completed / total) * 100))
}
