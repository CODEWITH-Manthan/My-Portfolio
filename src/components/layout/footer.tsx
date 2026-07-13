export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <footer className="py-8 border-t border-white/5">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/25 tracking-widest">
          © {new Date().getFullYear()} MANTHAN ILAKE
        </p>
        <p className="text-xs text-white/20">
          Built with <span className="text-electric">Next.js</span> &amp; <span className="text-purple-acc">Framer Motion</span>
        </p>
        <button
          onClick={scrollTop}
          className="text-xs text-white/30 hover:text-white/70 transition-colors tracking-widest flex items-center gap-2"
          aria-label="Back to top"
        >
          ↑ BACK TO TOP
        </button>
      </div>
    </footer>
  );
}
