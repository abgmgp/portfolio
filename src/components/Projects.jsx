import projects from '../types/projects.js'
import '../styles/projects.css'

export function Projects() {
  return (
    <section className="site-section" aria-labelledby="projects">
      <h1 className="site-section-header">Projects</h1>
      <ul className="site-projects-list">
        {projects.map((project) => (
          <li className="site-projects-item" key={project.name}>
            <h2 className="site-projects-title">{project.name}</h2>
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
