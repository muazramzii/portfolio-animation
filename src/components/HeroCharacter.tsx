import { useRef, useState } from "react"

const MAX_TILT = 6

export default function HeroCharacter() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [imgFailed, setImgFailed] = useState(false)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const stage = stageRef.current
    if (!stage) return
    const rect = stage.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -MAX_TILT * 2, y: px * MAX_TILT * 2 })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto flex h-[420px] w-[320px] items-center justify-center sm:h-[520px] sm:w-[400px] lg:h-[620px] lg:w-[480px]"
      style={{ perspective: "1400px" }}
    >
      {/* orbit rings */}
      <svg
        viewBox="0 0 400 400"
        className="animate-spin-slow pointer-events-none absolute inset-0 h-full w-full opacity-60"
      >
        <ellipse
          cx="200"
          cy="200"
          rx="190"
          ry="150"
          fill="none"
          stroke="var(--color-accent-soft)"
          strokeWidth="1"
          strokeDasharray="2 10"
        />
      </svg>
      <svg
        viewBox="0 0 400 400"
        className="animate-spin-slow-reverse pointer-events-none absolute inset-0 h-full w-full opacity-40"
      >
        <ellipse
          cx="200"
          cy="200"
          rx="150"
          ry="185"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1"
        />
      </svg>

      {/* ambient studio glow, upper-left spotlight */}
      <div
        className="pointer-events-none absolute -inset-10 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(96,165,250,0.28), transparent 60%)",
        }}
      />

      {/* float: independent vertical bob */}
      <div className="animate-float relative h-full w-full">
        {/* idle: slow autonomous yaw sway, "one rotation" every 24s */}
        <div
          className="animate-hero-idle relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* mouse parallax: extra tilt layered on top, max +/-6deg */}
          <div
            className="relative h-full w-full transition-transform duration-300 ease-out"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            }}
          >
            {/* rim light behind character */}
            <div
              className="pointer-events-none absolute inset-x-6 top-4 bottom-16 rounded-[3rem]"
              style={{
                boxShadow:
                  "0 0 80px 10px rgba(59,130,246,0.35), inset 0 0 60px rgba(255,255,255,0.03)",
              }}
            />

            {imgFailed ? (
              <PlaceholderSilhouette />
            ) : (
              <img
                src="/character.png"
                alt="Muaz Ramzi — 3D rendered portrait in a formal suit"
                className="relative z-10 h-full w-full select-none object-contain object-bottom drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
                draggable={false}
                onError={() => setImgFailed(true)}
              />
            )}

            {/* reflective ground platform */}
            <div className="absolute bottom-2 left-1/2 h-8 w-[70%] -translate-x-1/2 rounded-full bg-accent/30 blur-2xl" />
            <div className="absolute bottom-4 left-1/2 h-2 w-[55%] -translate-x-1/2 rounded-full bg-accent-glow/60 blur-md" />
          </div>
        </div>
      </div>

      {/* floating particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="animate-float pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-accent-glow/70"
          style={{
            top: p.top,
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  )
}

const PARTICLES = [
  { top: "12%", left: "8%", delay: "0s", duration: "5s" },
  { top: "25%", left: "88%", delay: "0.8s", duration: "6s" },
  { top: "68%", left: "4%", delay: "1.4s", duration: "4.5s" },
  { top: "80%", left: "92%", delay: "0.4s", duration: "5.5s" },
  { top: "5%", left: "55%", delay: "1s", duration: "6.5s" },
]

function PlaceholderSilhouette() {
  return (
    <div className="glass relative z-10 flex h-full w-full flex-col items-center justify-end overflow-hidden rounded-[2rem] p-6">
      <svg
        viewBox="0 0 200 320"
        className="h-[85%] w-auto text-accent-soft/70"
        fill="none"
      >
        <circle cx="100" cy="55" r="34" fill="currentColor" opacity="0.9" />
        <path
          d="M40 300c0-70 27-110 60-110s60 40 60 110"
          fill="currentColor"
          opacity="0.9"
        />
        <rect x="70" y="150" width="14" height="90" rx="6" fill="var(--color-bg-primary)" opacity="0.5" />
      </svg>
      <p className="absolute top-4 text-center text-xs tracking-wide text-text-secondary">
        Add your portrait at <code>public/character.png</code>
      </p>
    </div>
  )
}
