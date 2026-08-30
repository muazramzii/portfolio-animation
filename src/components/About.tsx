import { portraitSrc, stats } from "../data/content"

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-bg-secondary px-6 py-28 lg:px-12"
    >
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        {/* portrait card */}
        <div className="animate-fade-up mx-auto w-full max-w-sm">
          <div className="glass relative aspect-[4/5] overflow-hidden rounded-3xl">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, rgba(59,130,246,0.25), transparent 65%)",
              }}
            />
            <div className="animate-float relative z-10 h-full w-full">
              <div
                className="animate-hero-sway relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="animate-hero-breathe relative h-full w-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img
                    src={portraitSrc}
                    alt="Muaz Ramzi portrait"
                    className="h-full w-full object-contain object-bottom"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* copy + stats */}
        <div className="animate-fade-up flex flex-col gap-8">
          <div>
            <span className="text-xs font-medium tracking-[0.2em] text-accent-soft uppercase">
              About Me
            </span>
            <h2 className="font-display mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
              Engineering thoughtful, scalable products
            </h2>
          </div>

          <p className="max-w-xl leading-relaxed text-text-secondary">
            I'm Muaz Ramzi, a Software Engineer focused on creating scalable
            applications, AI-powered systems, and intuitive user experiences.
            I enjoy transforming complex ideas into elegant digital products
            through clean architecture and thoughtful design.
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-2"
              >
                <p className="font-display text-lg font-semibold text-accent-soft">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
