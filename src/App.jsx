import './App.css'
import { NavBar } from "./components/NavBar"
import AppBody from './app/AppBody'
import { Footer } from './components/Footer'

function App() {
  return (
    <main className="site-layout">
      <NavBar />
      <AppBody />
      <Footer />
    </main>
  
  )

}

export default App
