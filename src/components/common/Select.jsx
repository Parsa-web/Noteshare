const Select = ({ label, id, options, error, className = '', ...props }) => (
  <div className={`field ${className}`.trim()}>
    {label && (
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
    )}
    <select className="field__control field__select" id={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && (
      <p className="field__error" id={`${id}-error`}>
        {error}
      </p>
    )}
  </div>
)

export default Select
