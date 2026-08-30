import { ArrowUpRight } from "lucide-react"
import { projects } from "../data/content"

export default function Projects() {
  return (
    <section id="projects" className="relative bg-bg-secondary px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="animate-fade-up mb-16 text-center">
          <span className="text-xs font-medium tracking-[0.2em] text-accent-soft uppercase">
            Portfolio
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
            Featured Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {projects.map((project, i) => (
            <article
              key={project.title}
              className="animate-fade-up group glass relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:border-accent/50 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.35)]"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="relative flex h-48 items-center justify-center overflow-hidden bg-bg-primary">
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 40%, rgba(59,130,246,0.28), transparent 70%)",
                  }}
                />
                <span className="font-display relative z-10 text-4xl font-bold tracking-tight text-white/10 select-none">
                  {project.title}
                </span>
              </div>

              <div className="flex flex-col gap-4 p-6">
                <div>
                  <h3 className="font-display text-xl font-semibold text-text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-accent-soft">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-text-secondary">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-border-subtle px-3 py-1 text-xs text-text-secondary"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-2 flex w-fit items-center gap-1.5 text-sm font-medium text-text-primary transition-all duration-300 group-hover:gap-2.5 group-hover:text-accent-soft"
                >
                  View Case Study
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
