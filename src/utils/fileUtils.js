import { downloadFilters, dateFilters } from '../data/options'

export const getLocalizedValue = (value, language) => {
  if (value && typeof value === 'object') {
    return value[language] || value.en || value.fa || ''
  }

  return value || ''
}

export const formatDate = (date, language) =>
  new Intl.DateTimeFormat(language === 'fa' ? 'fa-IR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))

export const formatNumber = (number, language) =>
  new Intl.NumberFormat(language === 'fa' ? 'fa-IR' : 'en-US').format(number)

export const formatFileSize = (size) => size

export const getSearchText = (file, language) =>
  [
    getLocalizedValue(file.title, language),
    getLocalizedValue(file.description, language),
    getLocalizedValue(file.author, language),
    file.subject,
    file.grade,
    file.fileType,
  ]
    .join(' ')
    .toLowerCase()

export const filterFiles = (files, filters, language) => {
  const query = filters.query.trim().toLowerCase()
  const dateFilter = dateFilters.find((filter) => filter.id === filters.date)
  const downloadFilter = downloadFilters.find((filter) => filter.id === filters.downloads)
  const now = new Date()

  return files
    .filter((file) => {
      const matchesQuery = !query || getSearchText(file, language).includes(query)
      const matchesSubject = filters.subject === 'all' || file.subject === filters.subject
      const matchesGrade = filters.grade === 'all' || file.grade === filters.grade
      const matchesType = filters.fileType === 'all' || file.fileType === filters.fileType
      const matchesDownloads = !downloadFilter || file.downloads >= downloadFilter.min
      const matchesDate =
        !dateFilter?.days ||
        (now.getTime() - new Date(file.uploadDate).getTime()) / (1000 * 60 * 60 * 24) <= dateFilter.days

      return matchesQuery && matchesSubject && matchesGrade && matchesType && matchesDate && matchesDownloads
    })
    .sort((a, b) => {
      if (filters.sort === 'oldest') return new Date(a.uploadDate) - new Date(b.uploadDate)
      if (filters.sort === 'mostDownloaded') return b.downloads - a.downloads
      if (filters.sort === 'titleAsc') {
        return getLocalizedValue(a.title, language).localeCompare(getLocalizedValue(b.title, language), language)
      }

      return new Date(b.uploadDate) - new Date(a.uploadDate)
    })
}

export const getSubjectFileCount = (files, subject) =>
  files.filter((file) => file.subject === subject).length
