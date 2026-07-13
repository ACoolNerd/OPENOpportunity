import type { NextPage } from 'next';
import Head from 'next/head';
import Hero from '@/components/layout/Hero';
import Link from 'next/link';

const features = [
  {
    icon: '🎴',
    title: 'Mystery Packs',
    desc: 'Standard, Premium, and Chase tiers — each pack hand-curated and digitally authenticated.',
    href: '/retail',
  },
  {
    icon: '📱',
    title: 'Digital Passport',
    desc: 'Every pack ships with a QR code linking to its full manifest, authentication number, and market value.',
    href: '/pack-reveal',
  },
  {
    icon: '🎥',
    title: 'Creator Studio',
    desc: 'Reserve streaming and breaking studio slots. Build your audience, earn commissions.',
    href: '/studio',
  },
  {
    icon: '📊',
    title: 'Live Inventory',
    desc: '90-day rotation policy keeps the catalog fresh. Track your collection value in real-time.',
    href: '/dashboard',
  },
];

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>OPENOpportunity — Mystery Pack Platform</title>
      </Head>

      {/* Hero */}
      <Hero />

      {/* Features section */}
      <section className="bg-brand-chrome-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-white font-black text-4xl uppercase mb-4">
              The <span className="text-brand-orange">Collectors Co-op</span> Ecosystem
            </h2>
            <p className="text-brand-chrome-400 max-w-xl mx-auto">
              Retail. Creator empowerment. Education. One platform built for the
              modern card collector.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat) => (
              <Link
                key={feat.title}
                href={feat.href}
                className="group bg-black border border-brand-chrome-800 hover:border-brand-orange p-6 flex flex-col gap-4 transition-all duration-300"
              >
                <span className="text-4xl">{feat.icon}</span>
                <h3 className="text-white font-bold text-lg group-hover:text-brand-orange transition-colors">
                  {feat.title}
                </h3>
                <p className="text-brand-chrome-500 text-sm leading-relaxed">
                  {feat.desc}
                </p>
                <span className="text-brand-orange text-xs font-bold uppercase tracking-widest mt-auto">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy & Philosophy */}
      <section className="bg-brand-chrome-900 border-t border-b border-brand-chrome-800 py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-orange-glow opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest bg-brand-chrome-800 px-3 py-1">
              Brand Philosophy
            </span>
            <h2 className="text-white font-black text-4xl uppercase mt-4 mb-6">
              Organic. Personal.<br />
              Environmental. <span className="text-brand-orange">Necessities.</span>
            </h2>
            <p className="text-brand-chrome-300 text-sm leading-relaxed mb-6">
              O.P.E.N. is not just a storefront — it is a Los Angeles-based community hub, boutique, and collective designed to open minds and connect local service professionals, creators, and wellness enthusiasts in close proximity to progress.
            </p>
            <div className="grid grid-cols-2 gap-4 border-t border-brand-chrome-800 pt-6">
              <div>
                <span className="text-white font-bold text-sm block">Curate. Protect. Repeat.</span>
                <span className="text-brand-chrome-500 text-xs">Keeping the card vault secure and graded gems authenticated.</span>
              </div>
              <div>
                <span className="text-white font-bold text-sm block">Juice Up Wellness</span>
                <span className="text-brand-chrome-500 text-xs">Integrating healthy soursop subscription programs into trade nights.</span>
              </div>
            </div>
          </div>

          <div className="bg-black border border-brand-chrome-800 p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
            <span className="text-brand-orange text-4xl mb-4">👑</span>
            <p className="text-white font-black text-2xl uppercase tracking-tight leading-snug max-w-sm mb-6">
              &ldquo;It&apos;s not just a hobby. It&apos;s the legacy I build.&rdquo;
            </p>
            <span className="text-brand-chrome-500 text-xs uppercase tracking-widest font-mono">
              — ACoolCOLLECTOR
            </span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-white font-black text-4xl uppercase mb-4">
              How It <span className="text-brand-orange">Works</span>
            </h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Your Pack',
                desc: 'Browse Standard, Premium, and Chase mystery packs in the shop.',
              },
              {
                step: '02',
                title: 'Scan the QR Code',
                desc: 'Scan the code on your physical pack to reveal the full manifest and digital passport.',
              },
              {
                step: '03',
                title: 'Track & Earn',
                desc: 'Monitor your collection value, list cards for sale, and earn creator commissions.',
              },
            ].map((item) => (
              <li key={item.step} className="flex flex-col gap-4">
                <span className="text-brand-orange font-black text-5xl leading-none">
                  {item.step}
                </span>
                <h3 className="text-white font-bold text-xl">{item.title}</h3>
                <p className="text-brand-chrome-400 text-sm leading-relaxed">{item.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-brand-orange py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-white font-black text-4xl uppercase mb-4">
            Ready to Open?
          </h2>
          <p className="text-orange-100 mb-8">
            Join the Collectors Co-op community. Shop mystery packs, reveal your
            cards digitally, and build your collection today.
          </p>
          <Link
            href="/retail"
            className="inline-block bg-black hover:bg-brand-chrome-900 text-white font-black text-sm uppercase tracking-widest px-10 py-4 transition-colors duration-200"
          >
            Shop Mystery Packs
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
