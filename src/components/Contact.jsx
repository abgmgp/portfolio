import contact from '../types/contact.js'
import '../styles/contact.css'

export function Contact() {
  return (
    <section className="site-section" id="contact" aria-labelledby="contact-heading">
      <h1 className="site-section-header" id="contact-heading">Contact</h1>
      <p className="site-contact-intro">{contact.intro}</p>
      <div className="site-contact-actions">
        {contact.links.map((item) => (
          <a className="site-contact-link" href={item.url} key={item.label}>
            {item.label}
          </a>
        ))}
      </div>
    </section>
  )
}
