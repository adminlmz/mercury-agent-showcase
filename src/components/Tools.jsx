import { useState, useEffect, useRef } from 'react'
import { Folder, Terminal, MessageSquare, GitBranch, Globe, Cpu, Calendar, Database, Shield } from 'lucide-react'

const TOOL_CATEGORIES = [
  {
    icon: Folder,
    label: 'Filesystem',
    color: 'text-sky-400',
    bg: 'bg-sky-950/30',
    border: 'border-sky-800/30',
    count: 8,
    tools: ['read_file', 'write_file', 'create_file', 'edit_file', 'list_dir', 'delete_file', 'send_file', 'approve_scope'],
  },
  {
    icon: Terminal,
    label: 'Shell',
    color: 'text-green-400',
    bg: 'bg-green-950/30',
    border: 'border-green-800/30',
    count: 3,
    tools: ['run_command', 'cd', 'approve_command'],
  },
  {
    icon: MessageSquare,
    label: 'Messaging',
    color: 'text-violet-400',
    bg: 'bg-violet-950/30',
    border: 'border-violet-800/30',
    count: 1,
    tools: ['send_message'],
  },
  {
    icon: GitBranch,
    label: 'Git',
    color: 'text-orange-400',
    bg: 'bg-orange-950/30',
    border: 'border-orange-800/30',
    count: 6,
    tools: ['git_status', 'git_diff', 'git_log', 'git_add', 'git_commit', 'git_push'],
  },
  {
    icon: Globe,
    label: 'Web',
    color: 'text-teal-400',
    bg: 'bg-teal-950/30',
    border: 'border-teal-800/30',
    count: 1,
    tools: ['fetch_url'],
  },
  {
    icon: Cpu,
    label: 'Skills',
    color: 'text-pink-400',
    bg: 'bg-pink-950/30',
    border: 'border-pink-800/30',
    count: 3,
    tools: ['install_skill', 'list_skills', 'use_skill'],
  },
  {
    icon: Calendar,
    label: 'Scheduler',
    color: 'text-yellow-400',
    bg: 'bg-yellow-950/30',
    border: 'border-yellow-800/30',
    count: 3,
    tools: ['schedule_task', 'list_scheduled_tasks', 'cancel_scheduled_task'],
  },
  {
    icon: Database,
    label: 'System',
    color: 'text-slate-400',
    bg: 'bg-slate-800/30',
    border: 'border-slate-700/30',
    count: 1,
    tools: ['budget_status'],
  },
]

export default function Tools() {
  const [expanded, setExpanded] = useState(null)
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
    <section id="tools" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sky-400 text-sm font-mono uppercase tracking-widest mb-3">Built-in Capabilities</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            31 Tools,{' '}
            <span className="gradient-text">8 Categories</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Every tool goes through the permission layer before execution. Click a category to see its tools.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {TOOL_CATEGORIES.map((cat, i) => {
            const Icon = cat.icon
            const isExpanded = expanded === i
            return (
              <button
                key={cat.label}
                onClick={() => setExpanded(isExpanded ? null : i)}
                className={`${cat.bg} border ${cat.border} rounded-2xl p-5 text-left transition-all duration-300
                  hover:scale-[1.02] hover:shadow-xl group
                  ${isExpanded ? 'col-span-2 sm:col-span-2 row-span-2 shadow-xl scale-[1.01]' : ''}
                  ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                  transition-all duration-500`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className={`inline-flex p-2.5 rounded-xl bg-slate-900/50 mb-3`}>
                  <Icon size={18} className={cat.color} />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`font-bold text-sm ${cat.color}`}>{cat.label}</p>
                    <p className="text-slate-500 text-xs">{cat.count} tool{cat.count !== 1 ? 's' : ''}</p>
                  </div>
                  <Shield size={12} className="text-slate-700 group-hover:text-green-600 transition-colors mt-1" />
                </div>
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-700/30 flex flex-wrap gap-1.5">
                    {cat.tools.map((tool) => (
                      <span
                        key={tool}
                        className={`px-2 py-0.5 rounded text-xs font-mono ${cat.color} bg-slate-900/50 border border-slate-700/50`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-center gap-3 text-sm text-slate-500">
          <Shield size={14} className="text-green-400" />
          <span>All tools require permission approval before execution</span>
        </div>
      </div>
    </section>
  )
}
