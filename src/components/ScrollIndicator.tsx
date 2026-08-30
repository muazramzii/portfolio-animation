export default function ScrollIndicator() {
  return (
    <a
      href="#about"
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-text-secondary transition-colors hover:text-text-primary"
    >
      <span className="text-xs tracking-[0.2em] uppercase">Scroll to Explore</span>
      <span className="flex h-9 w-6 items-start justify-center rounded-full border border-border-subtle p-1.5">
        <span className="animate-blink h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
    </a>
  )
}
