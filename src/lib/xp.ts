export function getXpForLesson(level = 1) {
  return 50 * level
}

export function getNextLevel(xp: number) {
  return Math.floor(xp / 250) + 1
}
