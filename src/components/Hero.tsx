import { Mail } from "lucide-react"
import { socials } from "../data/content"
import HeroCharacter from "./HeroCharacter"
import { GithubIcon, LinkedinIcon } from "./icons"
import ScrollIndicator from "./ScrollIndicator"

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div className="grid-overlay absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="noise-overlay animate-noise" />

      {/* huge background wordmark */}
      <div
        aria-hidden
        className="font-display pointer-events-none absolute inset-0 flex flex-col items-end justify-center gap-0 overflow-hidden pr-4 text-right leading-[0.85] font-bold whitespace-nowrap text-white select-none opacity-5"
        style={{ fontSize: "clamp(4rem, 16vw, 13rem)" }}
      >
        <span>MUAZ</span>
        <span>RAMZI</span>
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[40%_60%] lg:gap-8 lg:px-12">
        {/* left column */}
        <div className="animate-fade-up order-2 flex flex-col items-center gap-6 text-center lg:order-1 lg:items-start lg:text-left">
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

          <div className="mt-2 flex items-center gap-5">
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
        </div>

        {/* right column: 3D character */}
        <div className="order-1 lg:order-2">
          <HeroCharacter />
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
