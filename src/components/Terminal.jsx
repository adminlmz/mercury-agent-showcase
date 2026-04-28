import { useState, useEffect, useRef } from 'react'
import { Play, RotateCcw } from 'lucide-react'

const DEMO_CONVERSATIONS = [
  {
    label: 'Code Analysis',
    steps: [
      { type: 'user', text: 'Analyze my project for any security vulnerabilities' },
      { type: 'think', text: 'Recalling security-related memories... 2 past findings found' },
      { type: 'tool', tool: 'list_dir', args: './', result: '47 files found' },
      { type: 'tool', tool: 'read_file', args: 'src/auth.js', result: '312 lines read' },
      { type: 'tool', tool: 'read_file', args: 'src/api/routes.js', result: '189 lines read' },
      { type: 'permission', text: 'Request: run_command "grep -r .env src/"', status: 'approved' },
      { type: 'tool', tool: 'run_command', args: 'grep -r .env src/', result: '3 matches found' },
      { type: 'agent', text: 'Found 2 critical issues:\n1. JWT secret hardcoded in auth.js:47\n2. .env values logged in routes.js:23\n\nWant me to create a PR with fixes?' },
    ],
  },
  {
    label: 'Daily Schedule',
    steps: [
      { type: 'user', text: 'Schedule a daily standup summary every weekday at 9am' },
      { type: 'think', text: 'Checking existing schedules... 1 active task found' },
      { type: 'tool', tool: 'schedule_task', args: 'standup-summary @ 0 9 * * 1-5', result: 'task_id: task_a7f3' },
      { type: 'agent', text: "Done! I'll run every weekday at 9am and send you a summary.\n\nTask ID: task_a7f3\nSchedule: 0 9 * * 1-5 (Mon-Fri)\n\nUse /tasks to view all scheduled tasks." },
    ],
  },
  {
    label: 'Git Workflow',
    steps: [
      { type: 'user', text: 'Commit all changes and push to main with a smart commit message' },
      { type: 'think', text: 'Reviewing recent project context from memory...' },
      { type: 'tool', tool: 'git_status', args: '', result: '8 modified, 3 new files' },
      { type: 'tool', tool: 'git_diff', args: '--stat', result: 'Summary generated' },
      { type: 'permission', text: 'Request: git_add + git_commit + git_push', status: 'approved' },
      { type: 'tool', tool: 'git_add', args: '.', result: 'all files staged' },
      { type: 'tool', tool: 'git_commit', args: 'feat: add auth middleware and rate limiting', result: 'commit abc1234' },
      { type: 'tool', tool: 'git_push', args: 'origin main', result: 'pushed successfully' },
      { type: 'agent', text: 'Pushed to main! Commit: abc1234\n"feat: add auth middleware and rate limiting"\n8 files changed, 234 insertions, 12 deletions' },
    ],
  },
]

function Line({ step, visible }) {
  if (!visible) return null

  if (step.type === 'user') {
    return (
      <div className="flex gap-3 slide-in-up">
        <span className="text-sky-400 font-mono text-sm shrink-0 mt-0.5">You</span>
        <p className="text-slate-200 text-sm">{step.text}</p>
      </div>
    )
  }

  if (step.type === 'think') {
    return (
      <div className="flex items-center gap-2 pl-2 slide-in-up">
        <span className="text-violet-400 text-xs font-mono">◈</span>
        <span className="text-violet-300 text-xs font-mono italic">{step.text}</span>
      </div>
    )
  }

  if (step.type === 'tool') {
    return (
      <div className="pl-2 slide-in-up">
        <div className="inline-flex items-center gap-1.5 bg-slate-800/60 rounded-lg px-3 py-1.5 border border-slate-700/50">
          <span className="text-yellow-400 text-xs">⚡</span>
          <span className="text-yellow-300 text-xs font-mono">{step.tool}</span>
          {step.args && <span className="text-slate-500 text-xs font-mono">({step.args})</span>}
          <span className="text-slate-600 text-xs">→</span>
          <span className="text-green-400 text-xs font-mono">{step.result}</span>
        </div>
      </div>
    )
  }

  if (step.type === 'permission') {
    return (
      <div className="pl-2 slide-in-up">
        <div className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 border ${
          step.status === 'approved'
            ? 'bg-green-950/30 border-green-800/30 text-green-400'
            : 'bg-red-950/30 border-red-800/30 text-red-400'
        }`}>
          <span className="text-xs">{step.status === 'approved' ? '🔓' : '🔒'}</span>
          <span className="text-xs font-mono">{step.text}</span>
          <span className={`text-xs font-bold ${step.status === 'approved' ? 'text-green-300' : 'text-red-300'}`}>
            [{step.status}]
          </span>
        </div>
      </div>
    )
  }

  if (step.type === 'agent') {
    return (
      <div className="flex gap-3 slide-in-up">
        <span className="text-sky-400 font-mono text-sm shrink-0 mt-0.5">☿</span>
        <div className="flex-1">
          {step.text.split('\n').map((line, i) => (
            <p key={i} className="text-slate-200 text-sm leading-relaxed">{line}</p>
          ))}
        </div>
      </div>
    )
  }

  return null
}

export default function Terminal() {
  const [activeDemo, setActiveDemo] = useState(0)
  const [visibleSteps, setVisibleSteps] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  const demo = DEMO_CONVERSATIONS[activeDemo]

  const runDemo = () => {
    setVisibleSteps(0)
    setRunning(true)
    let step = 0
    intervalRef.current = setInterval(() => {
      step++
      setVisibleSteps(step)
      if (step >= demo.steps.length) {
        clearInterval(intervalRef.current)
        setRunning(false)
      }
    }, 700)
  }

  const reset = () => {
    clearInterval(intervalRef.current)
    setVisibleSteps(0)
    setRunning(false)
  }

  useEffect(() => {
    reset()
    setTimeout(() => runDemo(), 300)
    return () => clearInterval(intervalRef.current)
  }, [activeDemo])

  return (
    <section id="demo" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sky-400 text-sm font-mono uppercase tracking-widest mb-3">Interactive Demo</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">See Mercury in Action</h2>
          <p className="text-slate-400 text-lg">Watch how Mercury uses tools, checks permissions, and reasons through tasks.</p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {DEMO_CONVERSATIONS.map((d, i) => (
            <button
              key={d.label}
              onClick={() => setActiveDemo(i)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeDemo === i
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/20'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div className="terminal-window glow-border">
          <div className="terminal-header justify-between">
            <div className="flex items-center gap-2">
              <div className="terminal-dot bg-red-500" />
              <div className="terminal-dot bg-yellow-500" />
              <div className="terminal-dot bg-green-500" />
              <span className="ml-2 text-slate-500 text-xs font-mono">mercury — {demo.label}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={runDemo}
                disabled={running}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-green-400 transition-colors disabled:opacity-40"
              >
                <Play size={12} />
                Run
              </button>
              <button
                onClick={reset}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-sky-400 transition-colors"
              >
                <RotateCcw size={12} />
                Reset
              </button>
            </div>
          </div>

          <div className="p-6 min-h-[320px] space-y-4">
            {visibleSteps === 0 && !running && (
              <div className="flex items-center justify-center h-48 text-slate-600 text-sm">
                Press <span className="mx-1 text-green-400">Run</span> to start the demo
              </div>
            )}
            {demo.steps.slice(0, visibleSteps).map((step, i) => (
              <Line key={i} step={step} visible={true} />
            ))}
            {running && visibleSteps < demo.steps.length && (
              <div className="flex items-center gap-1.5 pl-2">
                <span className="text-sky-400 text-xs animate-pulse">●</span>
                <span className="text-sky-400 text-xs animate-pulse">●</span>
                <span className="text-sky-400 text-xs animate-pulse">●</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
