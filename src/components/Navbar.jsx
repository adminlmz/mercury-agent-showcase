import { useState } from 'react'
import { Github, ExternalLink, Menu, X } from 'lucide-react'

export default function Navbar({ scrollY }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isScrolled = scrollY > 40

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Demo', href: '#demo' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Memory', href: '#memory' },
    { label: 'Tools', href: '#tools' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#020817]/90 backdrop-blur-md border-b border-sky-900/30 shadow-lg shadow-sky-950/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-2xl">☿</span>
            <span className="font-bold text-lg text-sky-400 group-hover:text-sky-300 transition-colors">
              Mercury
            </span>
            <span className="text-xs text-slate-500 font-mono mt-0.5">Agent</span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-400 hover:text-sky-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/cosmicstack-labs/mercury-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <Github size={16} />
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@cosmicstack/mercury-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-sm rounded-lg transition-colors"
            >
              <ExternalLink size={14} />
              npm install
            </a>
          </div>

          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#020817]/95 backdrop-blur-md border-b border-sky-900/30 px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-sm text-slate-400 hover:text-sky-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/cosmicstack-labs/mercury-agent"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 mt-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <Github size={16} />
            GitHub
          </a>
        </div>
      )}
    </header>
  )
}
