import Button from './Button'

const EmptyState = ({ title, description, actionLabel, actionTo, onAction }) => (
  <div className="empty-state">
    <div className="empty-state__art" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
    <h2>{title}</h2>
    <p>{description}</p>
    {actionLabel && (
      <Button to={actionTo} onClick={onAction} variant="secondary">
        {actionLabel}
      </Button>
    )}
  </div>
)

export default EmptyState
