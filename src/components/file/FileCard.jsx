import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Badge from '../common/Badge'
import Button from '../common/Button'
import FavoriteButton from './FavoriteButton'
import { formatDate, formatNumber, getLocalizedValue } from '../../utils/fileUtils'

const FileCard = ({ file, badge, onFavoriteChange }) => {
  const { i18n, t } = useTranslation()
  const language = i18n.language

  return (
    <article className="file-card">
      <Link className="file-card__main" to={`/file/${file.id}`}>
        <div className={`file-thumb file-thumb--${file.thumbnail}`} aria-hidden="true">
          <span>{file.fileType.toUpperCase()}</span>
        </div>
        <div className="file-card__content">
          <div className="file-card__topline">
            <Badge>{t(`subjects.${file.subject}`)}</Badge>
            {badge && <Badge tone="warning">{badge}</Badge>}
          </div>
          <h3>{getLocalizedValue(file.title, language)}</h3>
          <p>{getLocalizedValue(file.description, language)}</p>
        </div>
      </Link>
      <div className="file-card__meta">
        <span>{t(`grades.${file.grade}`)}</span>
        <span>{t(`types.${file.fileType}`)}</span>
        <span>{file.size}</span>
      </div>
      <div className="file-card__footer">
        <span>{t('meta.downloads', { count: formatNumber(file.downloads, language) })}</span>
        <span>{formatDate(file.uploadDate, language)}</span>
      </div>
      <div className="file-card__actions">
        <Button to={`/file/${file.id}`} variant="secondary" size="sm">
          {t('actions.preview')}
        </Button>
        <FavoriteButton fileId={file.id} compact onChange={onFavoriteChange} />
      </div>
    </article>
  )
}

export default FileCard
