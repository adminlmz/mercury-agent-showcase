import { Terminal, Send, Users, Clock, Zap, Shield } from 'lucide-react'

const CLI_FEATURES = [
  'Readline prompt with arrow-key command menus',
  'Real-time text streaming with markdown re-rendering',
  'Cursor-save/restore for smooth output',
  'Permission mode picker (Ask Me / Allow All)',
  'In-chat slash commands without API token usage',
]

const TELEGRAM_FEATURES = [
  'HTML formatting with editable streaming messages',
  'File uploads and typing indicators',
  'Multi-user access with admin/member roles',
  'Pairing code-based user approval system',
  'Admins can promote, demote, remove users',
]

const PROVIDERS = [
  { name: 'DeepSeek', model: 'deepseek-chat', key: 'DEEPSEEK_API_KEY', badge: 'Default', color: 'text-sky-400' },
  { name: 'OpenAI', model: 'gpt-4o-mini', key: 'OPENAI_API_KEY', badge: 'GPT-4o', color: 'text-green-400' },
  { name: 'Anthropic', model: 'claude-sonnet-4', key: 'ANTHROPIC_API_KEY', badge: 'Claude', color: 'text-orange-400' },
  { name: 'Grok (xAI)', model: 'grok-4', key: 'GROK_API_KEY', badge: 'Grok', color: 'text-violet-400' },
  { name: 'Ollama Cloud', model: 'gpt-oss:120b', key: 'OLLAMA_CLOUD_API_KEY', badge: 'Cloud', color: 'text-pink-400' },
  { name: 'Ollama Local', model: 'gpt-oss:20b', key: 'none', badge: 'Free', color: 'text-teal-400' },
]

export default function Channels() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-transparent via-sky-950/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sky-400 text-sm font-mono uppercase tracking-widest mb-3">Access Anywhere</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Two Channels, One Agent</h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Use Mercury from your terminal or Telegram. The same agent, same memory, same tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50 glow-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-sky-950/60 rounded-xl">
                <Terminal size={24} className="text-sky-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-xl">CLI</h3>
                <p className="text-slate-500 text-sm">Your local terminal</p>
              </div>
            </div>
            <ul className="space-y-3">
              {CLI_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="text-sky-400 mt-0.5 shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-6 terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500" />
                <div className="terminal-dot bg-yellow-500" />
                <div className="terminal-dot bg-green-500" />
              </div>
              <div className="p-3 text-xs font-mono space-y-1">
                <p className="text-slate-500">$ npx @cosmicstack/mercury-agent</p>
                <p className="text-sky-400">☿ Mercury starting...</p>
                <p className="text-slate-400">   Loading Second Brain: 127 memories</p>
                <p className="text-green-400">   Ready. Type your message:</p>
                <p className="text-slate-300">❯ <span className="cursor-blink">█</span></p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-violet-950/60 rounded-xl">
                <Send size={24} className="text-violet-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-xl">Telegram</h3>
                <p className="text-slate-500 text-sm">Chat from anywhere</p>
              </div>
            </div>
            <ul className="space-y-3">
              {TELEGRAM_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="text-violet-400 mt-0.5 shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono">
                <Users size={12} className="text-violet-400" />
                <span className="text-slate-400">Organization model: admins + members</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <Shield size={12} className="text-green-400" />
                <span className="text-slate-400">Pairing code approval flow</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <Clock size={12} className="text-sky-400" />
                <span className="text-slate-400">Private chats only (groups ignored)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2 text-center">LLM Provider Fallback Chain</h3>
          <p className="text-slate-500 text-sm text-center mb-6">Mercury tries providers in order and falls back automatically on failure</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PROVIDERS.map((p, i) => (
              <div
                key={p.name}
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:border-slate-700 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold text-sm ${p.color}`}>{p.name}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-500">{p.badge}</span>
                  </div>
                  <p className="text-slate-600 text-xs font-mono">{p.model}</p>
                </div>
                {i === 0 && <Zap size={14} className="text-yellow-400" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
