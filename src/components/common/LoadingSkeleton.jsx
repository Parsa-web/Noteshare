const LoadingSkeleton = ({ count = 3 }) => (
  <div className="skeleton-grid" aria-hidden="true">
    {Array.from({ length: count }).map((_, index) => (
      <div className="skeleton-card" key={index}>
        <span />
        <strong />
        <p />
        <p />
      </div>
    ))}
  </div>
)

export default LoadingSkeleton
