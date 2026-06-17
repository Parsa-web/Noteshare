const STORAGE_PREFIX = 'noteshare.'

export const storageKeys = {
  language: `${STORAGE_PREFIX}language`,
  favorites: `${STORAGE_PREFIX}favorites`,
  recentlyViewed: `${STORAGE_PREFIX}recentlyViewed`,
  uploadedFiles: `${STORAGE_PREFIX}uploadedFiles`,
}

export const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export const writeStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getFavorites = () => readStorage(storageKeys.favorites, [])

export const saveFavorites = (favorites) => writeStorage(storageKeys.favorites, favorites)

export const toggleFavoriteId = (id) => {
  const favorites = getFavorites()
  const nextFavorites = favorites.includes(id)
    ? favorites.filter((favoriteId) => favoriteId !== id)
    : [...favorites, id]

  saveFavorites(nextFavorites)
  return nextFavorites
}

export const getRecentlyViewed = () => readStorage(storageKeys.recentlyViewed, [])

export const addRecentlyViewed = (id) => {
  const nextRecentlyViewed = [id, ...getRecentlyViewed().filter((fileId) => fileId !== id)].slice(0, 10)
  writeStorage(storageKeys.recentlyViewed, nextRecentlyViewed)
  return nextRecentlyViewed
}

export const getUploadedFiles = () => readStorage(storageKeys.uploadedFiles, [])

export const saveUploadedFile = (file) => {
  const uploadedFiles = getUploadedFiles()
  const nextUploadedFiles = [file, ...uploadedFiles]
  writeStorage(storageKeys.uploadedFiles, nextUploadedFiles)
  return nextUploadedFiles
}
