import skills from '../types/skills.js'
import '../styles/skills.css'

export function Skills() {
  return (
    <section className="site-section" aria-labelledby="skills">
      <h1 className="site-section-header">Technical Skills</h1>
      <div className="site-skills-groups">
        {skills.map((skillGroup) => (
          <section className="site-skills-group" key={skillGroup.group}>
            <h2 className="site-skills-group-header">{skillGroup.group}</h2>
            <ul className="site-skills-list">
              {skillGroup.items.map((skill) => (
                <li className="site-skills-item" key={skill}>
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  )
}
