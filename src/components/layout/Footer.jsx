import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/search', label: t('nav.search') },
    { to: '/upload', label: t('nav.upload') },
    { to: '/favorites', label: t('nav.favorites') },
  ]

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="brand">
            <span className="brand__mark" aria-hidden="true">N</span>
            <span>{t('app.name')}</span>
          </div>
          <p>{t('footer.description')}</p>
        </div>
        <div>
          <h2>{t('footer.quickLinks')}</h2>
          <div className="footer__links">
            {links.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <p className="footer__copy">{t('app.copyright')}</p>
      </div>
    </footer>
  )
}

export default Footer
