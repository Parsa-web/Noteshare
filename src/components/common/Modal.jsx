import Button from './Button'

const Modal = ({ open, title, children, closeLabel, onClose }) => {
  if (!open) return null

  return (
    <div className="modal" role="presentation" onMouseDown={onClose}>
      <div className="modal__panel" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal__header">
          <h2 id="modal-title">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label={closeLabel}>
            ×
          </Button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
