import { Link } from 'react-router-dom'

const Button = ({ children, variant = 'primary', size = 'md', className = '', to, ...props }) => {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim()

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  )
}

export default Button
