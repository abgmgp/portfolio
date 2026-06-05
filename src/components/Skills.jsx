import skills from '../types/skills.js'
import '../styles/skills.css'

export function Skills() {
  return (
    <section className="site-section" aria-labelledby="skills-heading">
      <h2 className="site-section-header" id="skills-heading">Technical Skills</h2>
      <div className="site-skills-groups">
        {skills.map((skillGroup) => (
          <section className="site-skills-group" key={skillGroup.group}>
            <h3 className="site-skills-group-header">{skillGroup.group}</h3>
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
