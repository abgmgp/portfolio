import education from '../types/education.js'
import '../styles/education.css'

export function Education() {
  return (
    <section className="site-section" aria-labelledby="education">
      <h1 className="site-section-header">Education</h1>
      <ol className="site-education-list">
        {education.map((item) => {
          const hasSchool = Boolean(item.school)

          return (
            <li
              className={`site-education-item${hasSchool ? ' site-education-item-has-school' : ''}`}
              key={`${item.school ?? 'education'}-${item.program}-${item.date}`}
            >
              {hasSchool && <h3 className="site-education-item-header">{item.school}</h3>}
              <p className="site-education-item-program">{item.program}</p>
              <p className="site-education-item-date">{item.date}</p>
              {item.description && <p className="site-education-item-description">{item.description}</p>}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
