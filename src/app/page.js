import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">

      {/* Top nav bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <span className="text-xs tracking-[0.3em] text-white/40 uppercase">Munkhbold</span>
        <div className="flex gap-8 text-xs tracking-widest text-white/40 uppercase">
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          <Link href="/DataJson" className="hover:text-white transition-colors">Data</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-end px-10 pb-20 pt-32 relative overflow-hidden">
        <div className="absolute top-1/3 right-10 w-px h-40 bg-white/10" />
        <div className="absolute top-1/3 right-10 w-20 h-px bg-white/10" />

        <p className="text-xs tracking-[0.4em] text-white/30 uppercase mb-6">Web Developer — Ulaanbaatar</p>
        <h1 className="text-[clamp(4rem,12vw,10rem)] font-bold leading-none tracking-tighter mb-8">
          Munkh<br />
          <span className="text-white/20">bold</span>
        </h1>
        <div className="flex items-center gap-6">
          <div className="w-12 h-px bg-white/30" />
          <p className="text-sm text-white/40 max-w-sm leading-relaxed">
            Building modern web experiences with clean code and intentional design.
          </p>
        </div>

        <div className="absolute bottom-10 right-10 text-xs text-white/20 tracking-widest rotate-90 origin-bottom-right">
          scroll
        </div>
      </section>

      {/* Bento grid projects */}
      <section id="work" className="px-10 py-24">
        <p className="text-xs tracking-[0.4em] text-white/30 uppercase mb-12">Selected Work</p>
        <div className="grid grid-cols-12 gap-4">

          <div className="col-span-12 md:col-span-7 border border-white/10 p-8 hover:border-white/30 transition-colors group">
            <div className="flex justify-between items-start mb-16">
              <span className="text-xs text-white/30">01</span>
              <span className="text-xs text-white/20 group-hover:text-white transition-colors">→</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Project One</h3>
            <p className="text-sm text-white/40 mb-8">A cutting-edge web application built with modern technologies and thoughtful UX.</p>
            <div className="flex gap-2">
              <span className="text-xs px-3 py-1 border border-white/20 text-white/50">React</span>
              <span className="text-xs px-3 py-1 border border-white/20 text-white/50">Next.js</span>
              <span className="text-xs px-3 py-1 border border-white/20 text-white/50">Tailwind</span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 border border-white/10 p-8 hover:border-white/30 transition-colors group">
            <div className="flex justify-between items-start mb-16">
              <span className="text-xs text-white/30">02</span>
              <span className="text-xs text-white/20 group-hover:text-white transition-colors">→</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Project Two</h3>
            <p className="text-sm text-white/40 mb-8">Urban-focused platform connecting communities at scale.</p>
            <div className="flex gap-2">
              <span className="text-xs px-3 py-1 border border-white/20 text-white/50">Node.js</span>
              <span className="text-xs px-3 py-1 border border-white/20 text-white/50">MongoDB</span>
            </div>
          </div>

          <div className="col-span-12 border border-white/10 p-8 hover:border-white/30 transition-colors group flex items-center justify-between">
            <div>
              <span className="text-xs text-white/30 block mb-4">03</span>
              <h3 className="text-2xl font-bold mb-2">Project Three</h3>
              <p className="text-sm text-white/40">Real-time dashboard with advanced data visualization.</p>
            </div>
            <div className="flex gap-2">
              <span className="text-xs px-3 py-1 border border-white/20 text-white/50">TypeScript</span>
              <span className="text-xs px-3 py-1 border border-white/20 text-white/50">D3.js</span>
              <span className="text-xs px-3 py-1 border border-white/20 text-white/50 group-hover:text-white transition-colors">→</span>
            </div>
          </div>

        </div>
      </section>

      {/* About */}
      <section id="about" className="px-10 py-24 border-t border-white/10 grid grid-cols-2 gap-20">
        <div>
          <p className="text-xs tracking-[0.4em] text-white/30 uppercase mb-12">About</p>
          <h2 className="text-4xl font-bold leading-tight mb-6">
            Crafting digital<br />experiences that matter.
          </h2>
        </div>
        <div className="flex flex-col justify-end">
          <p className="text-sm text-white/50 leading-relaxed mb-6">
            I'm a web developer based in Ulaanbaatar with a passion for building clean, performant interfaces. I work across the full stack with a focus on frontend craft.
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs text-white/30">
            <div>
              <p className="text-white mb-1">Stack</p>
              <p>React / Next.js</p>
              <p>Node.js / Express</p>
              <p>PostgreSQL / MongoDB</p>
            </div>
            <div>
              <p className="text-white mb-1">Currently</p>
              <p>Open to opportunities</p>
              <p>Freelance projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-10 py-32 border-t border-white/10 text-center">
        <p className="text-xs tracking-[0.4em] text-white/30 uppercase mb-8">Get in touch</p>
        <h2 className="text-[clamp(2rem,6vw,5rem)] font-bold tracking-tight mb-12">
          Let's work together.
        </h2>
        <div className="flex gap-4 justify-center">
          <Link href="/contact" className="px-8 py-3 bg-white text-black text-sm font-bold tracking-widest uppercase hover:bg-white/80 transition-colors">
            Contact Me
          </Link>
          <Link href="/about" className="px-8 py-3 border border-white/20 text-sm tracking-widest uppercase hover:border-white/60 transition-colors">
            Learn More
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-10 py-6 border-t border-white/10 flex justify-between items-center text-xs text-white/20">
        <span>© 2024 Munkhbold</span>
        <span>Built with Next.js & Tailwind CSS</span>
      </footer>

    </div>
  )
}