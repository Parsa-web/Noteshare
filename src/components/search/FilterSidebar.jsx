import { useTranslation } from 'react-i18next'
import Button from '../common/Button'
import Select from '../common/Select'
import { dateFilters, downloadFilters, fileTypes, grades, sortOptions, subjects } from '../../data/options'

const FilterSidebar = ({ filters, onChange, onClear }) => {
  const { t } = useTranslation()

  const setFilter = (key, value) => onChange({ ...filters, [key]: value })

  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar__header">
        <h2>{t('search.filters')}</h2>
        <Button variant="ghost" size="sm" onClick={onClear}>
          {t('actions.clearFilters')}
        </Button>
      </div>
      <Select id="subject-filter" label={t('search.subject')} value={filters.subject} onChange={(event) => setFilter('subject', event.target.value)} options={[{ value: 'all', label: t('search.allSubjects') }, ...subjects.map((subject) => ({ value: subject.id, label: t(`subjects.${subject.id}`) }))]} />
      <Select id="grade-filter" label={t('search.grade')} value={filters.grade} onChange={(event) => setFilter('grade', event.target.value)} options={[{ value: 'all', label: t('search.allGrades') }, ...grades.map((grade) => ({ value: grade, label: t(`grades.${grade}`) }))]} />
      <Select id="type-filter" label={t('search.fileType')} value={filters.fileType} onChange={(event) => setFilter('fileType', event.target.value)} options={[{ value: 'all', label: t('search.allTypes') }, ...fileTypes.map((type) => ({ value: type, label: t(`types.${type}`) }))]} />
      <Select id="date-filter" label={t('search.date')} value={filters.date} onChange={(event) => setFilter('date', event.target.value)} options={dateFilters.map((filter) => ({ value: filter.id, label: filter.id === 'all' ? t('search.anyDate') : t(`filters.${filter.id}`) }))} />
      <Select id="download-filter" label={t('search.downloads')} value={filters.downloads} onChange={(event) => setFilter('downloads', event.target.value)} options={downloadFilters.map((filter) => ({ value: filter.id, label: filter.id === 'all' ? t('search.anyDownloads') : t(`filters.${filter.id}`) }))} />
      <Select id="sort-filter" label={t('search.sortBy')} value={filters.sort} onChange={(event) => setFilter('sort', event.target.value)} options={sortOptions.map((sort) => ({ value: sort, label: t(`filters.${sort}`) }))} />
    </aside>
  )
}

export default FilterSidebar
