import { useEffect, useState } from "react"
import { navItems } from "../data/content"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border-subtle bg-bg-primary/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
        <a
          href="#home"
          className="font-display flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-sm font-semibold tracking-wide text-text-primary"
        >
          MR
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group relative text-sm text-text-secondary transition-colors duration-300 hover:text-text-primary"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full border border-border-subtle px-4 py-2 text-sm text-text-primary transition-all duration-300 hover:border-accent hover:text-accent md:inline-block"
        >
          Let's Talk
        </a>
      </nav>
    </header>
  )
}
