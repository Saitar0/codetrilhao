import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

import { siteConfig } from '../config/site'
import { getLevelInfo, useProgressStore } from '../store/progress'

export function AppShell({ children }: { children: React.ReactNode }) {
  const theme = useProgressStore((state) => state.theme)
  const xp = useProgressStore((state) => state.xp)
  const setTheme = useProgressStore((state) => state.setTheme)
  const resetProgress = useProgressStore((state) => state.resetProgress)
  const navigate = useNavigate()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { label: 'Módulos', hash: '#modulos' },
    { label: 'Recursos', hash: '#recursos' },
    { label: 'Demo', hash: '#demo' },
    { label: 'FAQ', hash: '#faq' },
  ]

  const handleNavClick = (hash: string) => {
    setIsMenuOpen(false)
    const target = hash.replace(/^#/, '')

    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: `#${target}` })
      return
    }

    if (window.location.hash !== hash) {
      // use replaceState to avoid creating extra history entries when navigating within the page
      window.history.replaceState(null, '', hash)
    }

    requestAnimationFrame(() => {
      const anchor = document.getElementById(target)
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // move focus for accessibility after scroll
        anchor.setAttribute('tabindex', '-1')
        anchor.focus({ preventScroll: true })
      }
    })
  }

  const levelInfo = getLevelInfo(xp)

  return (
    <div className="app-shell">
      <header className={`glass app-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container app-header__inner">
          <Link to="/" className="brand" aria-label="Página inicial do CodeTrilha">
            <span className="brand__mark">CT</span>
            <span>{siteConfig.name}</span>
          </Link>

          <nav aria-label="Navegação principal" className={`main-nav ${isMenuOpen ? 'is-open' : ''}`}>
            {navItems.map((item) => (
              <button key={item.hash} type="button" className="nav-link" onClick={() => handleNavClick(item.hash)}>
                {item.label}
              </button>
            ))}
            <NavLink to="/python" className="nav-link route-link">
              Python
            </NavLink>
          </nav>

          <div className="header-actions">
            <div className="xp-chip" aria-label="Nível atual">
              <span>Nível</span>
              <strong>{levelInfo.level}</strong>
            </div>

            <button
              type="button"
              className="theme-toggle"
              aria-label="Alternar tema claro e escuro"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <div className="settings-menu">
              <button
                type="button"
                className="menu-toggle"
                aria-label="Abrir configurações"
                onClick={() => setIsSettingsOpen((current) => !current)}
              >
                ⚙️
              </button>

              {isSettingsOpen && (
                <div className="settings-panel glass">
                  <button type="button" onClick={() => { resetProgress(); setIsSettingsOpen(false) }}>
                    Zerar progresso
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              className="menu-toggle"
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <div className="xp-bar-wrap">
          <div className="xp-bar" aria-label="Progresso de nível">
            <span style={{ width: `${levelInfo.progress}%` }} />
          </div>
          <small>
            {xp} XP · {levelInfo.currentLevelXp}/{levelInfo.nextLevelXp}
          </small>
        </div>
      </header>

      <main className="container app-main">{children}</main>

      <footer className="app-footer">
        <div className="container app-footer__inner">
          <p>© 2026 {siteConfig.name}. Aprenda programação com ritmo e clareza.</p>
          <div className="app-footer__links">
            <button type="button" className="footer-link" onClick={() => handleNavClick('#modulos')}>Módulos</button>
            <button type="button" className="footer-link" onClick={() => handleNavClick('#recursos')}>Recursos</button>
            <button type="button" className="footer-link" onClick={() => handleNavClick('#demo')}>Demo</button>
            <button type="button" className="footer-link" onClick={() => handleNavClick('#faq')}>FAQ</button>
          </div>
          <button
            type="button"
            className="theme-toggle footer-theme"
            aria-label="Alternar tema claro e escuro"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </footer>
    </div>
  )
}
