import { techStack } from "../data/content"

export default function TechStack() {
  return (
    <section id="skills" className="relative px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="animate-fade-up mb-16 text-center">
          <span className="text-xs font-medium tracking-[0.2em] text-accent-soft uppercase">
            Skills
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
            Technologies I Work With
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {techStack.map((category, i) => (
            <div
              key={category.title}
              className="animate-fade-up glass group rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-accent/40"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <h3 className="font-display mb-4 text-sm font-semibold tracking-wide text-text-primary">
                {category.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="cursor-default rounded-xl border border-transparent px-3 py-2 text-sm text-text-secondary transition-all duration-300 [transform-style:preserve-3d] hover:-translate-y-0.5 hover:border-border-subtle hover:bg-white/[0.04] hover:text-accent-glow hover:[text-shadow:0_0_12px_rgba(147,197,253,0.6)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
