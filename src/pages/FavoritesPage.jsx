import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Container from '../components/common/Container'
import EmptyState from '../components/common/EmptyState'
import PageHeader from '../components/common/PageHeader'
import FileGrid from '../components/file/FileGrid'
import SearchBar from '../components/search/SearchBar'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useFiles } from '../hooks/useFiles'
import { getFavorites } from '../utils/storage'
import { getSearchText } from '../utils/fileUtils'

const FavoritesPage = () => {
  const { i18n, t } = useTranslation()
  const files = useFiles()
  const [favoriteIds, setFavoriteIds] = useState(() => getFavorites())
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query)
  useDocumentTitle(t('favorites.title'))

  const favoriteFiles = useMemo(() => files.filter((file) => favoriteIds.includes(file.id)), [favoriteIds, files])
  const filteredFiles = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase()
    return normalizedQuery ? favoriteFiles.filter((file) => getSearchText(file, i18n.language).includes(normalizedQuery)) : favoriteFiles
  }, [debouncedQuery, favoriteFiles, i18n.language])

  return (
    <Container>
      <PageHeader title={t('favorites.heading')} subtitle={t('favorites.subtitle')} />
      {favoriteFiles.length > 0 && (
        <SearchBar value={query} onChange={setQuery} placeholder={t('favorites.searchPlaceholder')} onSubmit={(event) => event.preventDefault()} />
      )}
      {favoriteFiles.length === 0 ? (
        <EmptyState title={t('favorites.emptyTitle')} description={t('favorites.emptyDescription')} actionLabel={t('actions.browseFiles')} actionTo="/search" />
      ) : filteredFiles.length === 0 ? (
        <EmptyState title={t('favorites.noMatchesTitle')} description={t('favorites.noMatchesDescription')} />
      ) : (
        <FileGrid files={filteredFiles} onFavoriteChange={setFavoriteIds} />
      )}
    </Container>
  )
}

export default FavoritesPage
