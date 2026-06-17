import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Container from '../components/common/Container'
import EmptyState from '../components/common/EmptyState'
import PageHeader from '../components/common/PageHeader'
import FileGrid from '../components/file/FileGrid'
import FilterSidebar from '../components/search/FilterSidebar'
import SearchBar from '../components/search/SearchBar'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useFiles } from '../hooks/useFiles'
import { filterFiles, formatNumber } from '../utils/fileUtils'

const getInitialFilters = (searchParams) => ({
  query: searchParams.get('q') || '',
  subject: searchParams.get('subject') || 'all',
  grade: 'all',
  fileType: 'all',
  date: 'all',
  downloads: 'all',
  sort: 'newest',
})

const SearchPage = () => {
  const { i18n, t } = useTranslation()
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState(() => getInitialFilters(searchParams))
  const debouncedQuery = useDebouncedValue(filters.query)
  const files = useFiles()
  useDocumentTitle(t('search.title'))

  const results = useMemo(() => filterFiles(files, { ...filters, query: debouncedQuery }, i18n.language), [files, filters, debouncedQuery, i18n.language])

  const clearFilters = () => setFilters({ query: '', subject: 'all', grade: 'all', fileType: 'all', date: 'all', downloads: 'all', sort: 'newest' })

  return (
    <Container>
      <PageHeader title={t('search.heading')} subtitle={t('search.subtitle')} />
      <div className="search-page">
        <FilterSidebar filters={filters} onChange={setFilters} onClear={clearFilters} />
        <section className="search-results" aria-labelledby="search-results-title">
          <SearchBar value={filters.query} onChange={(query) => setFilters((current) => ({ ...current, query }))} placeholder={t('search.placeholder')} onSubmit={(event) => event.preventDefault()} />
          <div className="search-results__header">
            <h2 id="search-results-title">{t('search.results')}</h2>
            <span>{t('search.resultsCount', { count: formatNumber(results.length, i18n.language) })}</span>
          </div>
          {results.length > 0 ? (
            <FileGrid files={results} />
          ) : (
            <EmptyState title={t('search.emptyTitle')} description={t('search.emptyDescription')} actionLabel={t('actions.clearFilters')} onAction={clearFilters} />
          )}
        </section>
      </div>
    </Container>
  )
}

export default SearchPage
