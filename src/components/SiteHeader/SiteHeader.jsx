import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './SiteHeader.css'

function SiteHeader({ actions }) {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY

      if (current <= 10) {
        setVisible(true)
      } else if (current > lastScrollY.current && current > 56) {
        setVisible(false)
      } else if (current < lastScrollY.current) {
        setVisible(true)
      }

      lastScrollY.current = current
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`site-header${visible ? '' : ' site-header--hidden'}`}
    >
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand">
          <span className="site-header__logo">▶</span>
          <div>
            <h1 className="site-header__title">StreamPlay</h1>
            <p className="site-header__subtitle">YouTube Playlist Viewer</p>
          </div>
        </Link>

        <nav className="site-header__nav">
          <Link
            to="/"
            className={`site-header__nav-link${pathname === '/' ? ' site-header__nav-link--active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/playlists"
            className={`site-header__nav-link${pathname === '/playlists' ? ' site-header__nav-link--active' : ''}`}
          >
            Playlists
          </Link>
        </nav>

        {actions && <div className="site-header__actions">{actions}</div>}
      </div>
    </header>
  )
}

export default SiteHeader
