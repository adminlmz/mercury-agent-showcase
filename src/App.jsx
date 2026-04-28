import { useState, useEffect, useRef } from 'react'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import Terminal from './components/Terminal.jsx'
import Architecture from './components/Architecture.jsx'
import Tools from './components/Tools.jsx'
import MemorySystem from './components/MemorySystem.jsx'
import Channels from './components/Channels.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'

export default function App() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#020817] text-slate-100 overflow-x-hidden">
      <div className="grid-bg fixed inset-0 pointer-events-none" />
      <div className="relative z-10">
        <Navbar scrollY={scrollY} />
        <Hero />
        <Features />
        <Terminal />
        <Architecture />
        <MemorySystem />
        <Tools />
        <Channels />
        <Footer />
      </div>
    </div>
  )
}
