import { useEffect, useRef, useState } from 'react'

const layers = [
  {
    label: 'Channels',
    color: 'sky',
    items: ['CLI (readline + streaming)', 'Telegram Bot (grammY)'],
    desc: 'Multi-channel input with real-time streaming',
  },
  {
    label: 'Agent Core',
    color: 'violet',
    items: ['Vercel AI SDK v4', '10-step agentic loop', 'Provider fallback chain'],
    desc: 'generateText + streamText with tool calling',
  },
  {
    label: 'Permission Layer',
    color: 'green',
    items: ['Shell blocklist', 'Scope approval', 'Ask Me / Allow All'],
    desc: 'Safety enforcement before every tool call',
  },
  {
    label: 'Tool Executor',
    color: 'yellow',
    items: ['Filesystem (8 tools)', 'Shell (3 tools)', 'Git (6 tools)', 'Web (1 tool)', 'Scheduler (3 tools)', 'Skills (3 tools)'],
    desc: '31 built-in tools with structured schemas',
  },
  {
    label: 'Memory System',
    color: 'pink',
    items: ['Second Brain (SQLite + FTS5)', 'Short-term (JSON)', 'Long-term (JSONL)', 'Episodic log (JSONL)'],
    desc: 'Persistent, searchable, auto-extracting memory',
  },
  {
    label: 'Daemon & Scheduler',
    color: 'orange',
    items: ['Background daemon (PID)', 'Crash recovery + backoff', 'System services', 'Cron scheduler'],
    desc: '24/7 operation with auto-restart',
  },
]

const colorMap = {
  sky: { bg: 'bg-sky-950/40', border: 'border-sky-800/40', label: 'text-sky-400', tag: 'bg-sky-900/50 text-sky-300' },
  violet: { bg: 'bg-violet-950/40', border: 'border-violet-800/40', label: 'text-violet-400', tag: 'bg-violet-900/50 text-violet-300' },
  green: { bg: 'bg-green-950/40', border: 'border-green-800/40', label: 'text-green-400', tag: 'bg-green-900/50 text-green-300' },
  yellow: { bg: 'bg-yellow-950/40', border: 'border-yellow-800/40', label: 'text-yellow-400', tag: 'bg-yellow-900/50 text-yellow-300' },
  pink: { bg: 'bg-pink-950/40', border: 'border-pink-800/40', label: 'text-pink-400', tag: 'bg-pink-900/50 text-pink-300' },
  orange: { bg: 'bg-orange-950/40', border: 'border-orange-800/40', label: 'text-orange-400', tag: 'bg-orange-900/50 text-orange-300' },
}

export default function Architecture() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="architecture" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sky-400 text-sm font-mono uppercase tracking-widest mb-3">System Design</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Architecture</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A layered, permission-first architecture with separation between channels, reasoning, safety, execution, and memory.
          </p>
        </div>

        <div ref={ref} className="space-y-3">
          {layers.map((layer, i) => {
            const colors = colorMap[layer.color]
            return (
              <div
                key={layer.label}
                className={`${colors.bg} border ${colors.border} rounded-2xl p-5 transition-all duration-500
                  ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-3 sm:w-48 shrink-0">
                    <div className={`w-2 h-2 rounded-full bg-current ${colors.label}`} />
                    <span className={`font-bold text-sm ${colors.label} uppercase tracking-wide`}>
                      {layer.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 flex-1">
                    {layer.items.map((item) => (
                      <span
                        key={item}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono ${colors.tag}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-500 text-xs sm:text-right sm:w-48 shrink-0 hidden lg:block">
                    {layer.desc}
                  </p>
                </div>
              </div>
            )
          })}

          <div className="flex justify-center pt-4">
            <div className="flex items-center gap-2 text-xs text-slate-600 font-mono">
              <span>Data flows top-down per request</span>
              <span>·</span>
              <span>Memory persists across sessions</span>
              <span>·</span>
              <span>Daemon runs continuously</span>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Built-in Tools', value: '31', color: 'text-sky-400' },
            { label: 'Memory Types', value: '10', color: 'text-violet-400' },
            { label: 'LLM Providers', value: '6', color: 'text-green-400' },
            { label: 'Agentic Steps', value: '10', color: 'text-yellow-400' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-slate-900/40 border border-slate-800/50"
            >
              <div className={`text-4xl font-black mb-1 ${stat.color}`}>{stat.value}</div>
              <div className="text-slate-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
