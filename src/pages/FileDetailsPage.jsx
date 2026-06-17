import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Badge from '../components/common/Badge'
import Button from '../components/common/Button'
import Container from '../components/common/Container'
import EmptyState from '../components/common/EmptyState'
import Modal from '../components/common/Modal'
import Section from '../components/common/Section'
import FavoriteButton from '../components/file/FavoriteButton'
import FileGrid from '../components/file/FileGrid'
import PDFPreview from '../components/file/PDFPreview'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useFiles } from '../hooks/useFiles'
import { addRecentlyViewed } from '../utils/storage'
import { formatDate, formatNumber, getLocalizedValue } from '../utils/fileUtils'
import { useEffect } from 'react'

const FileDetailsPage = () => {
  const { id } = useParams()
  const { i18n, t } = useTranslation()
  const files = useFiles()
  const file = files.find((item) => item.id === id)
  const [message, setMessage] = useState('')
  const [downloading, setDownloading] = useState(false)

  useDocumentTitle(file ? t('file.title', { title: getLocalizedValue(file.title, i18n.language) }) : t('file.notFoundTitle'))

  useEffect(() => {
    if (file) addRecentlyViewed(file.id)
  }, [file])

  const relatedFiles = useMemo(() => {
    if (!file) return []
    return files.filter((item) => item.subject === file.subject && item.id !== file.id).slice(0, 4)
  }, [file, files])

  if (!file) {
    return (
      <Container>
        <EmptyState title={t('file.notFoundTitle')} description={t('file.notFoundDescription')} actionLabel={t('actions.browseFiles')} actionTo="/search" />
      </Container>
    )
  }

  const shareFile = async () => {
    await navigator.clipboard?.writeText(window.location.href)
    setMessage(t('file.shareSuccess'))
  }

  const downloadFile = () => {
    setDownloading(true)
    setMessage(t('file.downloadStarted'))
    window.setTimeout(() => setDownloading(false), 800)
  }

  return (
    <Container>
      <article className="file-details">
        <header className="file-details__header">
          <div>
            <div className="file-details__badges">
              <Badge>{t(`subjects.${file.subject}`)}</Badge>
              <Badge tone="blue">{t(`grades.${file.grade}`)}</Badge>
              <Badge tone="success">{t(`types.${file.fileType}`)}</Badge>
            </div>
            <h1>{getLocalizedValue(file.title, i18n.language)}</h1>
            <p>{getLocalizedValue(file.description, i18n.language)}</p>
          </div>
          <div className="file-actions">
            <Button onClick={downloadFile} disabled={downloading}>{downloading ? t('file.downloadStarted') : t('actions.download')}</Button>
            <FavoriteButton fileId={file.id} />
            <Button variant="secondary" onClick={shareFile}>{t('actions.share')}</Button>
          </div>
        </header>

        <div className="file-details__meta" aria-label={t('file.details')}>
          <Meta label={t('file.downloads')} value={formatNumber(file.downloads, i18n.language)} />
          <Meta label={t('file.uploaded')} value={formatDate(file.uploadDate, i18n.language)} />
          <Meta label={t('file.size')} value={file.size} />
          <Meta label={t('file.author')} value={getLocalizedValue(file.author, i18n.language)} />
        </div>

        <PDFPreview file={file} />

        <Section title={t('file.relatedTitle')} subtitle={t('file.relatedSubtitle')}>
          <FileGrid files={relatedFiles} />
        </Section>
      </article>

      <Modal open={Boolean(message)} title={t('app.name')} closeLabel={t('nav.closeMenu')} onClose={() => setMessage('')}>
        <p>{message}</p>
      </Modal>
    </Container>
  )
}

const Meta = ({ label, value }) => (
  <div>
    <dt>{label}</dt>
    <dd>{value}</dd>
  </div>
)

export default FileDetailsPage
