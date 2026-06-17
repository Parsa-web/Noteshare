import { useTranslation } from 'react-i18next'
import EmptyState from '../common/EmptyState'
import FileGrid from './FileGrid'
import { getRecentlyViewed } from '../../utils/storage'

const RecentlyViewed = ({ files }) => {
  const { t } = useTranslation()
  const recentIds = getRecentlyViewed()
  const recentFiles = recentIds.map((id) => files.find((file) => file.id === id)).filter(Boolean)

  if (recentFiles.length === 0) {
    return <EmptyState title={t('home.recentlyViewedTitle')} description={t('home.noRecentlyViewed')} actionLabel={t('actions.browseFiles')} actionTo="/search" />
  }

  return <FileGrid files={recentFiles} />
}

export default RecentlyViewed
