const Section = ({ eyebrow, title, subtitle, children, action, className = '' }) => (
  <section className={`section ${className}`.trim()}>
    <div className="section__header">
      <div>
        {eyebrow && <p className="section__eyebrow">{eyebrow}</p>}
        {title && <h2>{title}</h2>}
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action && <div className="section__action">{action}</div>}
    </div>
    {children}
  </section>
)

export default Section
