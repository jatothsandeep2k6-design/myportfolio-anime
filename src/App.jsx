import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaGraduationCap, FaCertificate } from 'react-icons/fa'
import { data } from './data'

const links = ['about', 'skills', 'certificates', 'projects', 'contact']

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6 }
}

function Navbar() {
  const { scrollYProgress } = useScroll()
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass">
      <nav className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between" aria-label="Main">
        <a href="#home" className="font-extrabold text-lg text-white">Sandeep</a>
        <ul className="flex gap-4 md:gap-7 text-sm overflow-x-auto">
          {links.map((l) => (
            <li key={l}><a href={`#${l}`} className="capitalize text-slate-400 hover:text-accent whitespace-nowrap">{l}</a></li>
          ))}
        </ul>
      </nav>
      <motion.div style={{ scaleX: width }} className="h-0.5 origin-left bg-gradient-to-r from-accent to-accent2" />
    </header>
  )
}

function Blobs() {
  return (
    <div className="fixed inset-0 -z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute top-20 -left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-teal-400/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
    </div>
  )
}

function Hero() {
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [del, setDel] = useState(false)
  useEffect(() => {
    const full = data.titles[i]
    const t = setTimeout(() => {
      if (!del) {
        setText(full.slice(0, text.length + 1))
        if (text.length + 1 === full.length) setTimeout(() => setDel(true), 1400)
      } else {
        setText(full.slice(0, text.length - 1))
        if (text.length - 1 === 0) { setDel(false); setI((i + 1) % data.titles.length) }
      }
    }, del ? 40 : 80)
    return () => clearTimeout(t)
  }, [text, del, i])

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16">
      <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-full px-4 py-1.5 text-sm text-accent font-semibold mb-6 inline-flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Welcome to my portfolio
      </motion.span>
      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }} className="text-5xl md:text-8xl font-black tracking-tight leading-none text-white">
        I'm <span className="text-gradient">{data.name}</span>
      </motion.h1>
      <h2 className="mt-5 h-10 text-xl md:text-3xl font-mono text-slate-300" aria-label={data.titles.join(', ')}>
        {text}<span className="text-accent animate-pulse">|</span>
      </h2>
      <p className="mt-4 max-w-xl text-slate-400">{data.bio}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href="#contact" className="px-6 py-3 rounded-lg bg-accent text-bg font-bold hover:brightness-110">Contact me</a>
        <a href={data.github} target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-lg glass flex items-center gap-2 hover:border-accent/50"><FaGithub /> GitHub</a>
        <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-lg glass flex items-center gap-2 hover:border-accent/50"><FaLinkedin /> LinkedIn</a>
      </div>
    </section>
  )
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="max-w-5xl mx-auto px-5 py-20">
      <motion.h2 {...fade} className="text-3xl md:text-4xl font-black text-white mb-10">
        <span className="text-gradient">{title}</span>
      </motion.h2>
      {children}
    </section>
  )
}

function About() {
  const e = data.education
  return (
    <Section id="about" title="About me">
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div {...fade} className="space-y-4 text-slate-300 leading-relaxed">
          {data.about.map((p) => <p key={p}>{p}</p>)}
        </motion.div>
        <motion.div {...fade} className="glass-card p-6 flex gap-4">
          <FaGraduationCap className="text-accent text-3xl shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-white">{e.degree}</h3>
            <p className="text-slate-400 mt-1">{e.college}</p>
            <p className="text-accent text-sm mt-2">{e.year}</p>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

function Skills() {
  return (
    <Section id="skills" title="Skills">
      <motion.div {...fade} className="flex flex-wrap gap-3">
        {data.skills.map((s) => <span key={s} className="glass rounded-full px-5 py-2 font-semibold text-white">{s}</span>)}
      </motion.div>
      <motion.h3 {...fade} className="text-xl font-bold text-accent mt-12 mb-2">Currently learning</motion.h3>
      <p className="text-slate-500 text-sm mb-4">Dashed outlines mean I am still learning these.</p>
      <motion.div {...fade} className="flex flex-wrap gap-3">
        {data.learning.map((s) => <span key={s} className="rounded-full px-5 py-2 border border-dashed border-slate-600 text-slate-400">{s}</span>)}
      </motion.div>
    </Section>
  )
}

function Certificates() {
  const groups = [...new Set(data.certificates.map((c) => c.group))]
  return (
    <Section id="certificates" title="Certificates">
      {groups.map((g) => (
        <div key={g} className="mb-10">
          <h3 className="text-lg font-bold text-accent mb-4">{g}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {data.certificates.filter((c) => c.group === g).map((c) => (
              <motion.div key={c.title} {...fade} className="glass-card p-5 flex gap-4">
                <FaCertificate className="text-accent2 text-2xl shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white">{c.title}</h4>
                  <p className="text-slate-400 text-sm mt-1">{c.by} · {c.date}</p>
                  {c.id && <p className="text-slate-500 text-xs mt-1 font-mono">ID: {c.id}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </Section>
  )
}

function Projects() {
  return (
    <Section id="projects" title="Projects">
      {data.projects.length === 0 ? (
        <motion.div {...fade} className="glass rounded-2xl border-dashed p-8 text-slate-400">
          My first projects are in progress: Python programs first, then a full-stack MERN app. Follow my work on{' '}
          <a className="text-accent underline" href={data.github} target="_blank" rel="noopener noreferrer">GitHub</a>.
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {data.projects.map((p) => (
            <motion.div key={p.title} {...fade} className="glass-card p-6">
              <h3 className="font-bold text-white text-lg">{p.title}</h3>
              <p className="text-slate-400 mt-2">{p.description}</p>
              <p className="text-accent text-sm mt-3">{p.tech.join(' · ')}</p>
              <div className="flex gap-4 mt-4 text-sm">
                {p.github && <a className="text-accent underline" href={p.github} target="_blank" rel="noopener noreferrer">Code</a>}
                {p.live && <a className="text-accent underline" href={p.live} target="_blank" rel="noopener noreferrer">Live</a>}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </Section>
  )
}

function Contact() {
  const items = [
    { icon: <FaEnvelope />, label: 'Email', text: data.email, href: `mailto:${data.email}` },
    { icon: <FaLinkedin />, label: 'LinkedIn', text: 'linkedin.com/in/jatoth-sandeep', href: data.linkedin },
    { icon: <FaGithub />, label: 'GitHub', text: 'github.com/jatothsandeep2k6-design', href: data.github }
  ]
  return (
    <Section id="contact" title="Contact">
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((c) => (
          <motion.a key={c.label} {...fade} href={c.href} target="_blank" rel="noopener noreferrer" className="glass-card p-6 block">
            <div className="text-accent text-2xl mb-3">{c.icon}</div>
            <div className="font-bold text-white">{c.label}</div>
            <div className="text-slate-400 text-sm mt-1 break-all">{c.text}</div>
          </motion.a>
        ))}
      </div>
    </Section>
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Blobs />
      <Navbar />
      <main className="relative z-10">
        <Hero /><About /><Skills /><Certificates /><Projects /><Contact />
      </main>
      <footer className="relative z-10 text-center text-slate-500 text-sm py-8 border-t border-white/5">
        © 2026 Jatoth Sandeep
      </footer>
    </div>
  )
}
