import { MotionConfig } from "framer-motion"
import About from "./components/About"
import Contact from "./components/Contact"
import Experience from "./components/Experience"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Projects from "./components/Projects"
import TechStack from "./components/TechStack"

function App() {
  return (
    // reducedMotion="user" makes every framer-motion transition (entrance
    // sequences, orbit-ring draw-on) respect prefers-reduced-motion; the CSS
    // media query elsewhere only covers plain CSS animations/transitions
    <MotionConfig reducedMotion="user">
      <main className="bg-bg-primary text-text-primary">
        <Navbar />
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </MotionConfig>
  )
}

export default App
