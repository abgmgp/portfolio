import '../styles/about.css'
import about from '../types/about'

function renderDescriptionPart(part, index) {
    if (typeof part === 'string') {
        return part
    }

    return (
        <a href={part.url} key={`${part.url}-${index}`}>
            {part.label}
        </a>
    )
}

function renderDescription(item) {
    if (Array.isArray(item)) {
        return item.map(renderDescriptionPart)
    }

    return item
}

export function About(){
    return(
        <section className="site-section">
            <h1 className="site-about-header">{about.headerName}</h1>
            <h2 className="site-about-sub">{about.headerContent}</h2>
            {about.description.map((item, index) => (
                <p className="site-about-description" key={index}>{renderDescription(item)}</p>
            ))}
        </section>
    )
}
