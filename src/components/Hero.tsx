import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Mail } from "lucide-react"
import { useRef } from "react"
import { socials } from "../data/content"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"
import { ENTRANCE_EASE } from "../lib/motion"
import HeroCharacter from "./HeroCharacter"
import { GithubIcon, LinkedinIcon } from "./icons"
import ScrollIndicator from "./ScrollIndicator"

const PARALLAX_SPRING = { stiffness: 120, damping: 20, mass: 0.6 }

// depth-parallax movement budgets, in px, per layer
const WORDMARK_MOVE = 2
const GRID_MOVE = 4

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const parallaxX = useSpring(rawX, PARALLAX_SPRING)
  const parallaxY = useSpring(rawY, PARALLAX_SPRING)

  const wordmarkX = useTransform(parallaxX, [-0.5, 0.5], [-WORDMARK_MOVE, WORDMARK_MOVE])
  const wordmarkY = useTransform(parallaxY, [-0.5, 0.5], [-WORDMARK_MOVE, WORDMARK_MOVE])
  const gridX = useTransform(parallaxX, [-0.5, 0.5], [-GRID_MOVE, GRID_MOVE])
  const gridY = useTransform(parallaxY, [-0.5, 0.5], [-GRID_MOVE, GRID_MOVE])

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion) return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set((event.clientX - rect.left) / rect.width - 0.5)
    rawY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* background: grid texture (depth layer 2) + noise, fades in on load */}
      <motion.div
        className="grid-overlay absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        style={{ x: gridX, y: gridY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: ENTRANCE_EASE }}
      />
      <div className="noise-overlay animate-noise" />

      {/* huge background wordmark (depth layer 1), part of the 0ms background reveal */}
      <motion.div
        aria-hidden
        className="font-display pointer-events-none absolute inset-0 flex flex-col items-end justify-center gap-0 overflow-hidden pr-4 text-right leading-[0.85] font-bold whitespace-nowrap text-white select-none"
        style={{ fontSize: "clamp(4rem, 16vw, 13rem)", x: wordmarkX, y: wordmarkY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1.2, ease: ENTRANCE_EASE }}
      >
        <span>MUAZ</span>
        <span>RAMZI</span>
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[40%_60%] lg:gap-8 lg:px-12">
        {/* left column */}
        <div className="order-2 flex flex-col items-center gap-6 text-center lg:order-1 lg:items-start lg:text-left">
          {/* the real MUAZ RAMZI typography appears at 300ms */}
          <motion.div
            className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: ENTRANCE_EASE }}
          >
            <span className="rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium tracking-[0.15em] text-accent-soft uppercase">
              Software Engineer
            </span>

            <h1 className="font-display text-5xl leading-[0.95] font-bold tracking-tight text-text-primary sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              MUAZ
              <br />
              RAMZI
            </h1>

            <p className="max-w-md text-base leading-relaxed text-text-secondary">
              Final Year Information Technology student passionate about Full
              Stack Development, Artificial Intelligence, and building modern
              digital experiences.
            </p>
          </motion.div>

          {/* buttons + socials: slide upward on load, 1500ms */}
          <motion.div
            className="flex flex-col items-center gap-8 lg:items-start"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6, ease: ENTRANCE_EASE }}
          >
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <a
                href="#projects"
                className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.03] hover:bg-accent-soft hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="rounded-full border border-border-subtle px-6 py-3 text-sm font-medium text-text-primary transition-all duration-300 hover:scale-[1.03] hover:border-accent hover:text-accent"
              >
                Contact Me
              </a>
            </div>

            <div className="flex items-center gap-5">
              <a
                href={socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-text-secondary transition-colors hover:text-accent-soft"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-text-secondary transition-colors hover:text-accent-soft"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href={`mailto:${socials.email}`}
                aria-label="Email"
                className="text-text-secondary transition-colors hover:text-accent-soft"
              >
                <Mail size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* right column: 3D character */}
        <div className="order-1 lg:order-2">
          <HeroCharacter parallaxX={parallaxX} parallaxY={parallaxY} />
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
