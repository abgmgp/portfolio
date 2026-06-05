import projects from '../types/projects.js'
import '../styles/projects.css'

export function Projects() {
  return (
    <section className="site-section" aria-labelledby="projects-heading">
      <h2 className="site-section-header" id="projects-heading">Projects</h2>
      <ul className="site-projects-list">
        {projects.map((project) => (
          <li className="site-projects-item" key={project.name}>
            <h3 className="site-projects-title">{project.name}</h3>
            {project.link && (
              <a className="site-projects-link" href={project.link}>
                View project
              </a>
            )}
            <p className="site-projects-description">{project.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
