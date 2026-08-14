export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-8 md:px-16">
      <div className="inline-flex items-center gap-2 w-fit mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
        <span className="font-mono text-xs tracking-wide text-ink">
          AVAILABLE · REMOTE, GLOBAL
        </span>
      </div>

      <h1 className="font-display font-extrabold text-6xl md:text-8xl leading-[0.98] tracking-tight max-w-3xl">
        Full-stack developer for the{' '}
        <span className="bg-gradient-to-r from-violet via-pink to-cyan bg-clip-text text-transparent">
          modern web
        </span>.
      </h1>

      <p className="mt-8 text-lg text-ink-soft max-w-xl">
        I build and deploy MERN applications end to end — APIs, React interfaces,
        real-time systems, and the infrastructure that keeps them running.
      </p>

      <div className="mt-10 flex gap-4">
        <a href="#work" className="px-6 py-3 rounded-full font-mono text-sm bg-gradient-to-r from-violet to-pink text-white font-semibold">
          View work →
        </a>
        <a href="#contact" className="px-6 py-3 rounded-full font-mono text-sm border border-white/10 bg-white/5 backdrop-blur-md">
          Get in touch
        </a>
      </div>
    </section>
  )
}