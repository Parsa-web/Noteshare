const Input = ({ label, id, error, className = '', ...props }) => (
  <div className={`field ${className}`.trim()}>
    {label && (
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
    )}
    <input className="field__control" id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />
    {error && (
      <p className="field__error" id={`${id}-error`}>
        {error}
      </p>
    )}
  </div>
)

export default Input
