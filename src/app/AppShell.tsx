import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

import { siteConfig } from '../config/site'
import { getLevelInfo, useProgressStore } from '../store/progress'

export function AppShell({ children }: { children: React.ReactNode }) {
  const theme = useProgressStore((state) => state.theme)
  const xp = useProgressStore((state) => state.xp)
  const setTheme = useProgressStore((state) => state.setTheme)
  const resetProgress = useProgressStore((state) => state.resetProgress)
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
    { label: 'Módulos', href: '#modulos' },
    { label: 'Recursos', href: '#recursos' },
    { label: 'Demo', href: '#demo' },
    { label: 'FAQ', href: '#faq' },
  ]

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
              <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </a>
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

            <a href="#cta" className="button button--primary navbar-cta">
              Começar agora
            </a>
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
            <a href="#modulos">Módulos</a>
            <a href="#recursos">Recursos</a>
            <a href="#demo">Demo</a>
            <a href="#faq">FAQ</a>
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
