import { Mail } from "lucide-react"
import { socials } from "../data/content"
import { GithubIcon, LinkedinIcon } from "./icons"

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-bg-secondary px-6 py-32 lg:px-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(59,130,246,0.14), transparent 60%)",
        }}
      />

      <div className="animate-fade-up relative mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <span className="text-xs font-medium tracking-[0.2em] text-accent-soft uppercase">
          Contact
        </span>
        <h2 className="font-display text-4xl font-bold text-text-primary sm:text-5xl">
          Let's Build Something Together
        </h2>
        <p className="max-w-xl leading-relaxed text-text-secondary">
          Available for internship, collaboration, freelance, and software
          development opportunities.
        </p>

        <div className="glass mt-4 flex w-full max-w-lg flex-col items-center gap-6 rounded-3xl p-8">
          <div className="flex flex-col items-center gap-3">
            <a
              href={`mailto:${socials.email}`}
              className="flex items-center gap-2 text-sm text-text-primary transition-colors hover:text-accent-soft"
            >
              <Mail size={16} />
              {socials.email}
            </a>
            <div className="flex items-center gap-5 pt-1">
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
            </div>
          </div>

          <a
            href={`mailto:${socials.email}`}
            className="w-full rounded-full bg-accent px-8 py-3.5 text-center text-sm font-medium text-white transition-all duration-300 hover:scale-[1.03] hover:bg-accent-soft hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
          >
            Get In Touch
          </a>
        </div>
      </div>

      <footer className="relative mt-24 text-center text-xs text-text-secondary">
        © {new Date().getFullYear()} Muaz Ramzi. Built with React, TypeScript
        &amp; Tailwind.
      </footer>
    </section>
  )
}
