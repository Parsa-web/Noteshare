const PageHeader = ({ title, subtitle, children }) => (
  <header className="page-header">
    <div>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
    {children && <div className="page-header__actions">{children}</div>}
  </header>
)

export default PageHeader
