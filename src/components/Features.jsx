import { useEffect, useRef, useState } from 'react'
import { Shield, Brain, Coins, Zap, Clock, Puzzle, Radio, GitBranch } from 'lucide-react'

const features = [
  {
    icon: Shield,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/20',
    title: 'Permission-Hardened',
    desc: 'Shell blocklist blocks destructive commands. Folder-level read/write scoping. Ask Me or Allow All per session. No surprises.',
    detail: 'sudo, rm -rf / and 20+ dangerous commands are permanently blocked',
  },
  {
    icon: Brain,
    color: 'text-violet-400',
    bg: 'bg-violet-400/10',
    border: 'border-violet-400/20',
    title: 'Second Brain',
    desc: 'Persistent SQLite + FTS5 memory with 10 types: identity, preference, goal, project, habit, decision, constraint, relationship, episode, reflection.',
    detail: 'Auto-extracts 0–3 facts per conversation, conflicts resolved by confidence score',
  },
  {
    icon: Coins,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/20',
    title: 'Token Budget',
    desc: 'Daily token budget enforcement. Auto-concise mode when usage exceeds 70%. Real-time budget tracking with /budget commands.',
    detail: 'Prevents runaway costs with configurable daily limits and override controls',
  },
  {
    icon: Zap,
    color: 'text-sky-400',
    bg: 'bg-sky-400/10',
    border: 'border-sky-400/20',
    title: 'Soul-Driven',
    desc: 'Personality defined by markdown files you own: soul.md, persona.md, taste.md, heartbeat.md. No corporate wrapper.',
    detail: 'Fully customizable agent identity stored locally — not controlled by any vendor',
  },
  {
    icon: Clock,
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
    border: 'border-orange-400/20',
    title: 'Always-On Daemon',
    desc: 'Run as a background daemon on any OS with auto-restart on crash. Exponential backoff recovery. System service on boot.',
    detail: 'macOS LaunchAgent, Linux systemd, Windows Task Scheduler — one command: mercury up',
  },
  {
    icon: Puzzle,
    color: 'text-pink-400',
    bg: 'bg-pink-400/10',
    border: 'border-pink-400/20',
    title: 'Skill System',
    desc: 'Install community skills with a single command. Schedule skills as recurring tasks. Based on the Agent Skills specification.',
    detail: 'agentskills.io compatible — extend Mercury with community-built capabilities',
  },
  {
    icon: Radio,
    color: 'text-teal-400',
    bg: 'bg-teal-400/10',
    border: 'border-teal-400/20',
    title: 'Live Streaming',
    desc: 'Real-time token streaming on CLI with markdown re-rendering. Telegram streaming with editable status messages and typing indicators.',
    detail: 'Cursor-save/restore for smooth terminal experience, HTML formatting in Telegram',
  },
  {
    icon: GitBranch,
    color: 'text-indigo-400',
    bg: 'bg-indigo-400/10',
    border: 'border-indigo-400/20',
    title: 'Provider Fallback',
    desc: 'Configure multiple LLM providers. Auto-falls back in order: DeepSeek → OpenAI → Anthropic → Grok → Ollama Cloud → Ollama Local.',
    detail: 'Remembers the last successful provider and starts there on next request',
  },
]

function FeatureCard({ feature, index }) {
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

  const Icon = feature.icon

  return (
    <div
      ref={ref}
      className={`group relative p-6 rounded-2xl border ${feature.border} bg-slate-900/40 backdrop-blur-sm
        hover:bg-slate-900/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-default
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        transition-all duration-500`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className={`inline-flex p-3 rounded-xl ${feature.bg} mb-4`}>
        <Icon size={22} className={feature.color} />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-3">{feature.desc}</p>
      <p className={`text-xs font-mono ${feature.color} opacity-70 group-hover:opacity-100 transition-opacity`}>
        → {feature.detail}
      </p>
    </div>
  )
}

export default function Features() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sky-400 text-sm font-mono uppercase tracking-widest mb-3">Core Capabilities</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Built Different
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Every AI agent can read files and run commands. Mercury does it with{' '}
            <span className="text-sky-400">memory</span>,{' '}
            <span className="text-green-400">permissions</span>, and{' '}
            <span className="text-violet-400">personality</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
