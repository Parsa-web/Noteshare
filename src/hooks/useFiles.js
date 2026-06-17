import { useMemo } from 'react'
import { mockFiles } from '../data/files'
import { getUploadedFiles } from '../utils/storage'

export const useFiles = () =>
  useMemo(() => {
    const uploadedFiles = getUploadedFiles()
    return [...uploadedFiles, ...mockFiles]
  }, [])
