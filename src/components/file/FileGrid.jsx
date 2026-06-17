import FileCard from './FileCard'

const FileGrid = ({ files, badge, onFavoriteChange }) => (
  <div className="file-grid">
    {files.map((file) => (
      <FileCard key={file.id} file={file} badge={badge} onFavoriteChange={onFavoriteChange} />
    ))}
  </div>
)

export default FileGrid
