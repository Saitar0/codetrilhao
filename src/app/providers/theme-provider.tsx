import { useEffect } from 'react'

import { useProgressStore } from '../../store/progress'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useProgressStore((state) => state.theme)

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const storedTheme = useProgressStore.getState().theme

    if (!storedTheme) {
      useProgressStore.setState({ theme: prefersDark ? 'dark' : 'light' })
    }
  }, [])

  return <>{children}</>
}
