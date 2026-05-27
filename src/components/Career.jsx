import career from '../types/career.js'
import '../styles/career.css'

export function Career() {
  return (
    <section className="site-section" aria-labelledby="career">
      <h1 className="site-section-header">Work</h1>
      <ol className="site-career-list">
        {career.map((item) => {
          const hasCompany = Boolean(item.company)

          return (
            <li
              className={`site-career-item${hasCompany ? ' site-career-item-has-company' : ''}`}
              key={`${item.company ?? 'career'}-${item.role}-${item.date}`}
            >
              {hasCompany && <h3 className="site-career-item-header">{item.company}</h3>}
              <p className="site-career-item-role">{item.role}</p>
              <p className="site-career-item-date">{item.date}</p>
              {item.description && <p className="site-career-item-description">{item.description}</p>}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
