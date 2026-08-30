import { experience } from "../data/content"

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="animate-fade-up mb-20 text-center">
          <span className="text-xs font-medium tracking-[0.2em] text-accent-soft uppercase">
            Journey
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
            Experience Timeline
          </h2>
        </div>

        <ol className="relative flex flex-col gap-16">
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent sm:left-1/2 sm:-translate-x-1/2"
          />

          {experience.map((item, i) => {
            const alignRight = i % 2 === 1
            return (
              <li
                key={item.year}
                className={`animate-fade-up relative flex flex-col gap-2 pl-8 sm:w-1/2 sm:pl-0 ${
                  alignRight
                    ? "sm:ml-auto sm:items-start sm:pl-10 sm:text-left"
                    : "sm:mr-auto sm:items-end sm:pr-10 sm:text-right"
                }`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <span className="absolute top-1.5 left-0 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg-primary shadow-[0_0_16px_rgba(59,130,246,0.7)] sm:left-1/2 sm:-translate-x-1/2" />
                <div className="glass w-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 sm:w-auto">
                  <span className="font-display text-sm font-semibold text-accent-soft">
                    {item.year}
                  </span>
                  <h3 className="mt-1 text-base font-medium text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary">{item.place}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
