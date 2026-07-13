import Link from 'next/link';
import { motion } from 'framer-motion';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function Hero({
  title = 'OPEN. OPEN. OPPORTUNITY.',
  subtitle =
    'The ACoolCOLLECTOR Repack Series. 5 Premium Cards. Infinite Possibilities. Powered by the Organic, Personal, Environmental, Necessities (O.P.E.N.) Boutique & Juice Up ecosystem.',
  ctaLabel = 'Shop Mystery Packs',
  ctaHref = '/retail',
}: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Chrome gradient backdrop */}
      <div className="absolute inset-0 bg-chrome-gradient opacity-40" />

      {/* Orange glow behind CTA area */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(255,102,0,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-brand-chrome-900 border border-brand-chrome-700 px-4 py-1.5 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-brand-chrome-300 text-xs font-medium uppercase tracking-widest font-mono">
            Collectors Co-op × OPEN LA
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl sm:text-6xl md:text-7xl font-display font-black text-white uppercase leading-none mb-6"
        >
          {title.split('.').map((part, i) => (
            <span key={i}>
              {i > 0 && (
                <span className="text-brand-orange">.</span>
              )}
              {part.trim()}
              {i < title.split('.').length - 2 && ' '}
            </span>
          ))}
        </motion.h1>

        {/* Sub-headline */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="text-brand-chrome-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-editorial font-medium italic"
        >
          {subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href={ctaHref}
            className="bg-brand-orange hover:bg-orange-500 text-white font-black text-xs uppercase tracking-widest px-8 py-4 transition-all duration-205 hover:scale-105 active:scale-95 min-w-[200px]"
          >
            {ctaLabel}
          </Link>
          <Link
            href="/pack-reveal"
            className="border border-brand-chrome-600 hover:border-white text-brand-chrome-300 hover:text-white font-bold text-xs uppercase tracking-widest px-8 py-4 transition-all duration-200 min-w-[200px]"
          >
            Reveal a Pack
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.75 }}
          className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto border-t border-brand-chrome-800/40 pt-8"
        >
          {[
            { label: 'Authenticated', icon: '🔐' },
            { label: 'QR Passport',   icon: '📱' },
            { label: 'Creator-Built', icon: '🎴' },
          ].map((badge) => (
            <div key={badge.label} className="flex flex-col items-center gap-2">
              <span className="text-2xl">{badge.icon}</span>
              <span className="text-brand-chrome-400 text-[10px] font-bold uppercase tracking-widest font-mono">
                {badge.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
