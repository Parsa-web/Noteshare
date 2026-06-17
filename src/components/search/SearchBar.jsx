import { useTranslation } from 'react-i18next'

const SearchBar = ({ value, onChange, placeholder, onSubmit }) => {
  const { t } = useTranslation()

  return (
    <form className="search-bar" role="search" onSubmit={onSubmit}>
      <span className="search-bar__icon" aria-hidden="true">⌕</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} aria-label={placeholder} />
      <button type="submit">{t('actions.search')}</button>
    </form>
  )
}

export default SearchBar
