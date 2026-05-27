import navbar from "../types/nav"
import { ThemeToggle } from '../lib/toggleCssMode.jsx'

export function NavBar(){
    return(
        <nav className="site-navigation-bar">
            <ul className="site-navigation-header">
                {navbar.map((nav) => (
                    <li key={nav.name}>
                        <a href={nav.route} download={nav.download || undefined}>
                            {nav.name}
                        </a>
                    </li>
                ))}                
            </ul>
            <ThemeToggle />
        </nav>
    )
}
