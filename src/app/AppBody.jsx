import { About } from '../components/About'
import { Career } from '../components/Career'
import { Education } from '../components/Education'
import { Skills } from '../components/Skills'
import { Projects } from '../components/Projects'
import { Contact } from '../components/Contact'

export default function AppBody() {
  return (
    <>
      <About />
      <Education />
      <Career />
      <Skills />
      <Projects />
      <Contact />
    </>
  )
}
