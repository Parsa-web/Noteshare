import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation()

  return (
    <label className="language-switcher">
      <span className="sr-only">{t('language.label')}</span>
      <select value={i18n.language} onChange={(event) => i18n.changeLanguage(event.target.value)} aria-label={t('language.label')}>
        <option value="fa">{t('language.fa')}</option>
        <option value="en">{t('language.en')}</option>
      </select>
    </label>
  )
}

export default LanguageSwitcher
