import { useTranslation } from 'react-i18next'
import Container from '../components/common/Container'
import PageHeader from '../components/common/PageHeader'
import UploadForm from '../components/upload/UploadForm'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const UploadPage = () => {
  const { t } = useTranslation()
  useDocumentTitle(t('upload.title'))

  return (
    <Container>
      <PageHeader title={t('upload.heading')} subtitle={t('upload.subtitle')} />
      <UploadForm />
    </Container>
  )
}

export default UploadPage
