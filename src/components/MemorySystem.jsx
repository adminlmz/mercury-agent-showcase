import { useState, useEffect, useRef } from 'react'
import { Database, Search, RefreshCw, Trash2 } from 'lucide-react'

const MEMORY_TYPES = [
  { type: 'identity', color: 'text-sky-400 bg-sky-950/50 border-sky-800/30', icon: '👤', example: 'Name: Alex, prefers TypeScript, works in fintech' },
  { type: 'preference', color: 'text-violet-400 bg-violet-950/50 border-violet-800/30', icon: '⭐', example: 'Prefers concise responses, dislikes verbose explanations' },
  { type: 'goal', color: 'text-green-400 bg-green-950/50 border-green-800/30', icon: '🎯', example: 'Launch v2.0 by Q1, reduce tech debt by 40%' },
  { type: 'project', color: 'text-yellow-400 bg-yellow-950/50 border-yellow-800/30', icon: '📁', example: 'mercury-agent: AI agent with Second Brain memory' },
  { type: 'habit', color: 'text-orange-400 bg-orange-950/50 border-orange-800/30', icon: '🔄', example: 'Commits code every evening, reviews PRs on Tuesdays' },
  { type: 'decision', color: 'text-pink-400 bg-pink-950/50 border-pink-800/30', icon: '⚖️', example: 'Chose SQLite over Redis for simplicity and portability' },
  { type: 'constraint', color: 'text-red-400 bg-red-950/50 border-red-800/30', icon: '🚫', example: 'Never use sudo, avoid breaking changes in v1.x' },
  { type: 'relationship', color: 'text-teal-400 bg-teal-950/50 border-teal-800/30', icon: '🤝', example: 'Alice: team lead, reviews all auth-related PRs' },
  { type: 'episode', color: 'text-indigo-400 bg-indigo-950/50 border-indigo-800/30', icon: '📖', example: 'Fixed critical auth bug in prod — 2h incident, Jan 15' },
  { type: 'reflection', color: 'text-slate-400 bg-slate-800/50 border-slate-700/30', icon: '💭', example: 'Pattern: tends to over-engineer; suggest simpler solutions' },
]

const LIFECYCLE = [
  { step: 'Extract', icon: '⬇', desc: 'After each conversation, Mercury pulls 0–3 high-confidence facts', color: 'text-sky-400' },
  { step: 'Store', icon: '💾', desc: 'Saved to SQLite with confidence, importance, and durability scores', color: 'text-violet-400' },
  { step: 'Recall', icon: '🔍', desc: 'Top 5 relevant memories injected before each new message (900-char budget)', color: 'text-green-400' },
  { step: 'Consolidate', icon: '🔄', desc: 'Every 60 min: profile summary, active-state summary, reflections generated', color: 'text-yellow-400' },
  { step: 'Resolve', icon: '⚖', desc: 'Conflicting memories resolved by confidence (higher wins) or recency', color: 'text-orange-400' },
  { step: 'Prune', icon: '✂', desc: 'Active memories stale after 21 days; low-confidence dismissed after 120 days', color: 'text-pink-400' },
]

export default function MemorySystem() {
  const [selected, setSelected] = useState(null)
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
    <section id="memory" className="py-24 px-4 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-violet-400 text-sm font-mono uppercase tracking-widest mb-3">Persistent Intelligence</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Second Brain</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A structured memory that grows with every conversation. All data stays on your machine — no cloud.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-500 font-mono">
            <Database size={12} className="text-violet-400" />
            <span>~/.mercury/memory/second-brain/second-brain.db</span>
            <span>(SQLite + FTS5)</span>
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Database size={18} className="text-violet-400" />
              10 Memory Types
              <span className="text-xs text-slate-500 font-normal">Click to see example</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {MEMORY_TYPES.map((m, i) => (
                <button
                  key={m.type}
                  onClick={() => setSelected(selected === i ? null : i)}
                  className={`p-3 rounded-xl border text-left transition-all ${m.color}
                    ${selected === i ? 'scale-[1.02] shadow-lg' : 'hover:scale-[1.01]'}
                    ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                    transition-all duration-300`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>{m.icon}</span>
                    <span className="font-mono text-xs font-semibold capitalize">{m.type}</span>
                  </div>
                  {selected === i && (
                    <p className="text-xs opacity-80 leading-relaxed mt-1">{m.example}</p>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <RefreshCw size={18} className="text-sky-400" />
              Memory Lifecycle
            </h3>
            <div className="space-y-3">
              {LIFECYCLE.map((step, i) => (
                <div
                  key={step.step}
                  className={`flex items-start gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/50
                    ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
                    transition-all duration-300`}
                  style={{ transitionDelay: `${200 + i * 80}ms` }}
                >
                  <div className={`text-2xl shrink-0 ${step.color}`}>{step.icon}</div>
                  <div>
                    <span className={`font-bold text-sm ${step.color}`}>{step.step}</span>
                    <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dot bg-red-500" />
            <div className="terminal-dot bg-yellow-500" />
            <div className="terminal-dot bg-green-500" />
            <span className="ml-2 text-slate-500 text-xs font-mono">mercury — memory commands</span>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="space-y-2">
              <p className="text-slate-500"># View memory</p>
              <p className="text-slate-300">/memory</p>
              <p className="text-sky-400 text-xs">→ overview with stats</p>
            </div>
            <div className="space-y-2">
              <p className="text-slate-500"># Search memory</p>
              <p className="text-slate-300">/memory search auth</p>
              <p className="text-sky-400 text-xs">→ FTS5 full-text search</p>
            </div>
            <div className="space-y-2">
              <p className="text-slate-500"># Pause extraction</p>
              <p className="text-slate-300">/memory pause</p>
              <p className="text-sky-400 text-xs">→ stop auto-extraction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
