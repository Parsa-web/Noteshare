import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getFavorites, toggleFavoriteId } from '../../utils/storage'

const FavoriteButton = ({ fileId, compact = false, onChange }) => {
  const { t } = useTranslation()
  const [favorites, setFavorites] = useState(() => getFavorites())
  const isFavorited = favorites.includes(fileId)

  useEffect(() => {
    const onStorage = () => setFavorites(getFavorites())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const handleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const nextFavorites = toggleFavoriteId(fileId)
    setFavorites(nextFavorites)
    onChange?.(nextFavorites)
  }

  return (
    <button className={`favorite-button ${isFavorited ? 'is-active' : ''} ${compact ? 'favorite-button--compact' : ''}`} type="button" aria-pressed={isFavorited} onClick={handleClick}>
      <span aria-hidden="true">{isFavorited ? '★' : '☆'}</span>
      {!compact && <span>{isFavorited ? t('actions.favorited') : t('actions.favorite')}</span>}
    </button>
  )
}

export default FavoriteButton
