import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-brand-chrome-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-brand-orange font-black text-lg uppercase">OPEN</span>
              <span className="text-white font-black text-lg uppercase">Opportunity</span>
            </Link>
            <p className="text-brand-chrome-400 text-sm leading-relaxed max-w-xs">
              A hybrid retail marketplace, creator studio, and inventory
              management system built on the Collectors Co-op ecosystem.
              Mystery packs for TCG, sports cards, and collectibles.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'Shop Mystery Packs', href: '/retail' },
                { label: 'Pack Reveal',         href: '/pack-reveal' },
                { label: 'Creator Studio',      href: '/studio' },
                { label: 'My Dashboard',        href: '/dashboard' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-chrome-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4">
              Ecosystem
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'OPEN LA Store',       href: 'https://openlastore.com' },
                { label: 'ACoolCOLLECTOR',      href: 'https://acoolcollector.com' },
                { label: 'Digital Passport',    href: '/p/demo' },
                { label: 'Admin',               href: '/admin' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-brand-chrome-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-brand-chrome-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-brand-chrome-600 text-xs">
            © {year} OPENOpportunity / Collectors Co-op. All rights reserved.
          </p>
          <p className="text-brand-chrome-600 text-xs italic">
            Collectibles investing involves risk. Market values are estimates only.
          </p>
        </div>
      </div>
    </footer>
  );
}
