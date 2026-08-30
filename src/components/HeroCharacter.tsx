import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { useState } from "react"
import { portraitSrc } from "../data/content"
import { useInViewport } from "../hooks/useInViewport"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"
import { ENTRANCE_EASE } from "../lib/motion"

// mouse-parallax tilt bounds and spring feel, per the animation spec
const MAX_TILT_X = 6 // rotateX, degrees
const MAX_TILT_Y = 8 // rotateY, degrees
const TILT_SPRING = { stiffness: 150, damping: 18, mass: 0.6 }

// depth-parallax movement budgets, in px, for this component's two layers
const CHARACTER_MOVE = 12
const RING_MOVE = 16

// platform's resting offset and how far it rises in on entrance
const PLATFORM_Y = -12
const PLATFORM_RISE = 14

type HeroCharacterProps = {
  parallaxX: MotionValue<number>
  parallaxY: MotionValue<number>
}

export default function HeroCharacter({ parallaxX, parallaxY }: HeroCharacterProps) {
  const { ref: stageRef, inView } = useInViewport<HTMLDivElement>()
  const [imgFailed, setImgFailed] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const springRotateX = useSpring(rawRotateX, TILT_SPRING)
  const springRotateY = useSpring(rawRotateY, TILT_SPRING)

  const characterX = useTransform(parallaxX, [-0.5, 0.5], [-CHARACTER_MOVE, CHARACTER_MOVE])
  const characterY = useTransform(parallaxY, [-0.5, 0.5], [-CHARACTER_MOVE, CHARACTER_MOVE])
  const ringX = useTransform(parallaxX, [-0.5, 0.5], [-RING_MOVE, RING_MOVE])
  const ringY = useTransform(parallaxY, [-0.5, 0.5], [-RING_MOVE, RING_MOVE])

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
      {/* orbit ring, depth layer 4: around the waist, spins opposite the sway, draws itself in at 900ms */}
      <motion.div
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ x: ringX, y: ringY }}
      >
        <svg
          viewBox="0 0 400 400"
          preserveAspectRatio="none"
          className="animate-spin-slow-reverse h-full w-full"
          style={{ filter: "drop-shadow(0 0 6px rgba(96,165,250,0.45))" }}
        >
          <motion.ellipse
            cx="200"
            cy="232"
            rx="176"
            ry="34"
            fill="none"
            stroke="var(--color-accent-soft)"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.35 }}
            transition={{ delay: 0.9, duration: 1.1, ease: ENTRANCE_EASE }}
          />
        </svg>
      </motion.div>

      {/* cinematic spotlight: very subtle, drifts upper-left -> center over 15s, loops */}
      <div
        className="animate-spotlight pointer-events-none absolute -inset-16 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(96,165,250,0.3) 0%, transparent 65%)",
          backgroundSize: "70% 70%",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* soft radial backlight behind the character — feathered, no visible boundary */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[95%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0.08) 45%, transparent 72%)",
        }}
      />

      {/* holographic platform: fixed in place so the character floats above it, rises in at 600ms */}
      <motion.div
        className="pointer-events-none absolute top-full h-14 w-[82%]"
        style={{ left: "50%", x: "-50%" }}
        initial={{ opacity: 0, y: PLATFORM_Y + PLATFORM_RISE }}
        animate={{ opacity: 1, y: PLATFORM_Y }}
        transition={{ delay: 0.6, duration: 0.7, ease: ENTRANCE_EASE }}
      >
        {/* ambient blue glow beneath */}
        <div className="absolute inset-0 rounded-[50%] bg-accent/25 blur-2xl" />
        {/* glass disc edge with a blue glow */}
        <div
          className="absolute inset-x-[10%] top-1/2 h-3.5 -translate-y-1/2 rounded-[50%] border border-accent-soft/40 bg-white/[0.06] blur-[0.5px]"
          style={{ boxShadow: "0 0 18px 2px rgba(96,165,250,0.35)" }}
        />
        {/* inner glass highlight, top sheen */}
        <div className="absolute inset-x-[24%] top-[30%] h-1 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent blur-[1px]" />
        {/* soft contact shadow */}
        <div className="absolute inset-x-[20%] top-[85%] h-2 rounded-[50%] bg-black/40 blur-md" />
      </motion.div>

      {/* soft reflection of the character, blurred mirror beneath the shoes */}
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

      {/* character, depth layer 3: fades in with a scale pop at 1200ms */}
      <motion.div
        className="relative h-full w-full"
        style={{ x: characterX, y: characterY }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease: ENTRANCE_EASE }}
      >
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
      </motion.div>

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
