import { Github, ExternalLink, Download } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">☿</span>
            <h2 className="text-3xl font-black gradient-text">Mercury Agent</h2>
          </div>
          <p className="text-slate-400 max-w-md mb-8">
            Soul-driven AI agent with Second Brain memory, permission-hardened tools, and multi-channel access.
            Built with TypeScript, Vercel AI SDK, and SQLite.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://www.npmjs.com/package/@cosmicstack/mercury-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl transition-all hover:scale-105"
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
              <Github size={18} />
              View on GitHub
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 text-sm">
          <div>
            <h4 className="font-semibold text-white mb-3">Agent</h4>
            <ul className="space-y-2 text-slate-500">
              <li><a href="#features" className="hover:text-sky-400 transition-colors">Features</a></li>
              <li><a href="#demo" className="hover:text-sky-400 transition-colors">Demo</a></li>
              <li><a href="#architecture" className="hover:text-sky-400 transition-colors">Architecture</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Memory</h4>
            <ul className="space-y-2 text-slate-500">
              <li><a href="#memory" className="hover:text-sky-400 transition-colors">Second Brain</a></li>
              <li><a href="#memory" className="hover:text-sky-400 transition-colors">Memory Types</a></li>
              <li><a href="#memory" className="hover:text-sky-400 transition-colors">Lifecycle</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Tools</h4>
            <ul className="space-y-2 text-slate-500">
              <li><a href="#tools" className="hover:text-sky-400 transition-colors">Filesystem</a></li>
              <li><a href="#tools" className="hover:text-sky-400 transition-colors">Git Tools</a></li>
              <li><a href="#tools" className="hover:text-sky-400 transition-colors">Scheduler</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Links</h4>
            <ul className="space-y-2 text-slate-500">
              <li>
                <a
                  href="https://github.com/cosmicstack-labs/mercury-agent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors flex items-center gap-1"
                >
                  <Github size={12} /> GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/@cosmicstack/mercury-agent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors flex items-center gap-1"
                >
                  <ExternalLink size={12} /> npm
                </a>
              </li>
              <li>
                <a
                  href="https://agentskills.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors flex items-center gap-1"
                >
                  <ExternalLink size={12} /> Agent Skills
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-600">
          <p>MIT License © Cosmic Stack</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              TypeScript · Node.js 20+ · Vercel AI SDK v4
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
