import { useTranslation } from 'react-i18next'
import Container from '../components/common/Container'
import EmptyState from '../components/common/EmptyState'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const NotFoundPage = () => {
  const { t } = useTranslation()
  useDocumentTitle(t('notFound.title'))

  return (
    <Container>
      <div className="not-found">
        <EmptyState title={t('notFound.heading')} description={t('notFound.description')} actionLabel={t('actions.returnHome')} actionTo="/" />
      </div>
    </Container>
  )
}

export default NotFoundPage
