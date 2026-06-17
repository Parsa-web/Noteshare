import { useTranslation } from 'react-i18next'
import { getLocalizedValue } from '../../utils/fileUtils'

const PDFPreview = ({ file }) => {
  const { i18n, t } = useTranslation()

  return (
    <section className="pdf-preview" aria-labelledby="pdf-preview-title">
      <div className="pdf-preview__toolbar">
        <div>
          <h2 id="pdf-preview-title">{t('file.preview')}</h2>
          <p>{t('file.previewHint')}</p>
        </div>
        <div className="pdf-preview__tools" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="pdf-preview__document">
        <div className="pdf-preview__page">
          <span className="pdf-preview__page-label">{t('file.page')} 1</span>
          <h3>{getLocalizedValue(file.title, i18n.language)}</h3>
          <p>{getLocalizedValue(file.description, i18n.language)}</p>
          <div className="pdf-lines" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="pdf-chart" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PDFPreview
