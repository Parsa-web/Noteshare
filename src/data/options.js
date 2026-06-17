export const subjects = [
  { id: 'math', icon: '∑' },
  { id: 'physics', icon: '⚛' },
  { id: 'chemistry', icon: '⌬' },
  { id: 'biology', icon: '✦' },
  { id: 'english', icon: 'Aa' },
  { id: 'computer', icon: '</>' },
]

export const grades = ['middle', 'grade10', 'grade11', 'grade12', 'university', 'examPrep']

export const fileTypes = ['pdf', 'docx', 'png', 'jpg']

export const sortOptions = ['newest', 'oldest', 'mostDownloaded', 'titleAsc']

export const dateFilters = [
  { id: 'all', days: null },
  { id: 'lastWeek', days: 7 },
  { id: 'lastMonth', days: 30 },
  { id: 'lastQuarter', days: 90 },
]

export const downloadFilters = [
  { id: 'all', min: 0 },
  { id: 'downloads100', min: 100 },
  { id: 'downloads500', min: 500 },
  { id: 'downloads1000', min: 1000 },
]
