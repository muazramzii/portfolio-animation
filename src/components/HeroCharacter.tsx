import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"
import { portraitSrc } from "../data/content"
import { useInViewport } from "../hooks/useInViewport"

const MAX_TILT_X = 6
const MAX_TILT_Y = 8
const SPRING = { stiffness: 150, damping: 18, mass: 0.6 }

export default function HeroCharacter() {
  const { ref: stageRef, inView } = useInViewport<HTMLDivElement>()
  const [imgFailed, setImgFailed] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const springRotateX = useSpring(rawRotateX, SPRING)
  const springRotateY = useSpring(rawRotateY, SPRING)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReducedMotion(query.matches)
    onChange()
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    const stage = stageRef.current
    if (!stage) return
    const rect = stage.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rawRotateX.set(py * -MAX_TILT_X * 2)
    rawRotateY.set(px * MAX_TILT_Y * 2)
  }

  const handleMouseLeave = () => {
    rawRotateX.set(0)
    rawRotateY.set(0)
  }

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative mx-auto flex h-[420px] w-[320px] items-center justify-center sm:h-[520px] sm:w-[400px] lg:h-[620px] lg:w-[480px] ${
        inView ? "" : "[&_*]:![animation-play-state:paused]"
      }`}
      style={{ perspective: "1400px" }}
    >
      {/* orbit ring, around the waist, spinning opposite to the sway */}
      <svg
        viewBox="0 0 400 400"
        preserveAspectRatio="none"
        className="animate-spin-slow-reverse pointer-events-none absolute inset-0 h-full w-full"
        style={{ filter: "drop-shadow(0 0 6px rgba(96,165,250,0.45))" }}
      >
        <ellipse
          cx="200"
          cy="232"
          rx="176"
          ry="34"
          fill="none"
          stroke="var(--color-accent-soft)"
          strokeWidth="1.5"
          opacity="0.35"
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

      {/* holographic platform: fixed in place so the character floats above it */}
      <div className="pointer-events-none absolute top-full left-1/2 h-12 w-[80%] -translate-x-1/2 -translate-y-3">
        <div className="absolute inset-0 rounded-[50%] bg-accent/25 blur-2xl" />
        <div className="absolute inset-x-[12%] top-1/2 h-3 -translate-y-1/2 rounded-[50%] border border-white/10 bg-white/[0.06] blur-[1px]" />
        <div className="absolute inset-x-[20%] top-[85%] h-2 rounded-[50%] bg-black/40 blur-md" />
      </div>

      {/* soft reflection of the character on the platform */}
      <div
        className="pointer-events-none absolute top-full left-1/2 h-full w-full -translate-x-1/2 opacity-25 blur-sm"
        style={{
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.45), transparent 40%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.45), transparent 40%)",
        }}
      >
        {!imgFailed && (
          <img
            src={portraitSrc}
            alt=""
            aria-hidden
            draggable={false}
            className="h-full w-full object-contain object-top"
            style={{ transform: "scaleY(-1)" }}
          />
        )}
      </div>

      {/* float: independent vertical bob */}
      <div className="animate-float relative h-full w-full">
        {/* sway: -18deg to +18deg yaw, 8s ease-in-out infinite alternate */}
        <div
          className="animate-hero-sway relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* breathing: very subtle scale pulse */}
          <div
            className="animate-hero-breathe relative h-full w-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* mouse parallax: spring-eased tilt, disabled under reduced motion */}
            <motion.div
              className="relative h-full w-full"
              style={{
                transformStyle: "preserve-3d",
                rotateX: springRotateX,
                rotateY: springRotateY,
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
                  src={portraitSrc}
                  alt="Muaz Ramzi — Software Engineer, in a formal suit holding a laptop"
                  className="relative z-10 h-full w-full select-none object-contain object-bottom drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
                  draggable={false}
                  onError={() => setImgFailed(true)}
                />
              )}
            </motion.div>
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
