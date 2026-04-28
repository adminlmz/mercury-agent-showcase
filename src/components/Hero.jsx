import { useState, useEffect } from 'react'
import { ArrowRight, Star, Download, Zap } from 'lucide-react'

const TYPING_SEQUENCES = [
  "Analyze my codebase for security vulnerabilities",
  "Schedule a daily summary every morning at 9am",
  "Commit and push my changes to GitHub",
  "Search my memory for last week's decisions",
  "Fetch the latest API docs and summarize them",
  "Run tests and fix any failing ones automatically",
]

export default function Hero() {
  const [currentText, setCurrentText] = useState('')
  const [seqIndex, setSeqIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const target = TYPING_SEQUENCES[seqIndex]
    const delay = isDeleting ? 30 : charIndex === target.length ? 2000 : 60

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex === target.length) {
        setIsDeleting(true)
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setSeqIndex((prev) => (prev + 1) % TYPING_SEQUENCES.length)
      } else {
        setCharIndex((prev) => prev + (isDeleting ? -1 : 1))
        setCurrentText(target.slice(0, charIndex + (isDeleting ? -1 : 1)))
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, seqIndex])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-950/60 border border-sky-800/40 rounded-full text-sky-400 text-sm mb-6">
          <Zap size={14} className="text-yellow-400" />
          <span>AI Agent · 31 Built-in Tools · Second Brain Memory</span>
        </div>

        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-6xl sm:text-7xl">☿</span>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight">
            <span className="gradient-text">Mercury</span>
          </h1>
        </div>

        <p className="text-xl sm:text-2xl text-slate-300 font-light mb-2">
          Soul-Driven AI Agent
        </p>

        <p className="text-base text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Remembers what matters. Asks before it acts. Runs 24/7 from CLI or Telegram.
          Permission-hardened tools, token budgets, and a persistent Second Brain.
        </p>

        <div className="max-w-2xl mx-auto mb-10">
          <div className="terminal-window glow-border">
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500" />
              <div className="terminal-dot bg-yellow-500" />
              <div className="terminal-dot bg-green-500" />
              <span className="ml-3 text-slate-500 text-xs font-mono">mercury</span>
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex items-start gap-2">
                <span className="text-sky-400 font-mono text-sm mt-0.5">❯</span>
                <div className="flex-1 text-left">
                  <p className="text-slate-400 text-xs font-mono mb-1">You:</p>
                  <p className="font-mono text-sm text-slate-200 min-h-[1.5rem]">
                    {currentText}
                    <span className="cursor-blink text-sky-400">█</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800">
                <p className="text-slate-400 text-xs font-mono mb-2">Mercury:</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-green-400">✓</span>
                    <span className="text-slate-400">Recalling relevant memories...</span>
                    <span className="text-slate-600">3 matches found</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-yellow-400">⚡</span>
                    <span className="text-slate-400">Planning execution strategy</span>
                    <span className="text-sky-500 animate-pulse">thinking...</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-violet-400">🔒</span>
                    <span className="text-slate-400">Permission check: filesystem read</span>
                    <span className="text-green-500">approved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://www.npmjs.com/package/@cosmicstack/mercury-agent"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-sky-500/25"
          >
            <Download size={18} />
            npx @cosmicstack/mercury-agent
          </a>
          <a
            href="https://github.com/cosmicstack-labs/mercury-agent"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-all hover:scale-105"
          >
            <Star size={18} className="text-yellow-400" />
            Star on GitHub
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>MIT License</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>Node.js 20+</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span>TypeScript</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span>Multi-LLM Support</span>
          </div>
        </div>
      </div>
    </section>
  )
}
