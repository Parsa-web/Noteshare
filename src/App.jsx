import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import FavoritesPage from './pages/FavoritesPage'
import FileDetailsPage from './pages/FileDetailsPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import SearchPage from './pages/SearchPage'
import UploadPage from './pages/UploadPage'

const App = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="file/:id" element={<FileDetailsPage />} />
      <Route path="upload" element={<UploadPage />} />
      <Route path="favorites" element={<FavoritesPage />} />
      <Route path="not-found" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Route>
  </Routes>
)

export default App
