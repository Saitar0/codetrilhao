import { BrowserRouter } from 'react-router-dom'

import './App.css'
import './styles/home.css'
import './styles/exercise.css'
import './styles/lesson.css'
import './styles/globals.css'
import { AppRouter } from './app/AppRouter'
import { AppShell } from './app/AppShell'
import { ThemeProvider } from './app/providers/theme-provider'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppShell>
          <AppRouter />
        </AppShell>
      </ThemeProvider>
    </BrowserRouter>
  )
}
