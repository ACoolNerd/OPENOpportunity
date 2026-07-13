import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { formatUSD } from '@/lib/commission';

// Placeholder dashboard data
const stats = [
  { label: 'Collection Value',  value: formatUSD(47500), change: '+12%' },
  { label: 'Packs Opened',      value: '14',             change: null },
  { label: 'Creator Earnings',  value: formatUSD(2200),  change: '+$100' },
  { label: 'Passports Scanned', value: '9',              change: null },
];

const recentPacks = [
  { id: 'pack-001', series: 'Series 1 – Summer 2024', tier: 'Standard', status: 'Opened',    value: formatUSD(3500) },
  { id: 'pack-002', series: 'Series 1 – Summer 2024', tier: 'Premium',  status: 'Available', value: formatUSD(9500) },
  { id: 'pack-003', series: 'Series 1 – Summer 2024', tier: 'Chase',    status: 'Reserved',  value: formatUSD(25000) },
];

const DashboardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard — OPENOpportunity</title>
      </Head>

      <div className="min-h-screen bg-black">
        {/* Header */}
        <div className="bg-chrome-gradient border-b border-brand-chrome-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div>
              <p className="text-brand-chrome-500 text-xs uppercase tracking-widest mb-1">
                Collector Dashboard
              </p>
              <h1 className="text-white font-black text-4xl uppercase">My Collection</h1>
            </div>
            <Link
              href="/retail"
              className="bg-brand-orange hover:bg-orange-500 text-white font-black text-xs uppercase tracking-widest px-5 py-2.5 transition-colors"
            >
              Shop Packs
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-brand-chrome-900 border border-brand-chrome-700 p-5">
                <p className="text-brand-chrome-500 text-xs uppercase tracking-widest mb-2">
                  {stat.label}
                </p>
                <p className="text-white font-black text-2xl">{stat.value}</p>
                {stat.change && (
                  <p className="text-green-400 text-xs mt-1 font-medium">{stat.change}</p>
                )}
              </div>
            ))}
          </div>

          {/* Recent packs */}
          <section>
            <h2 className="text-white font-bold text-xl uppercase mb-4">Recent Packs</h2>
            <div className="space-y-2">
              {recentPacks.map((pack) => (
                <div
                  key={pack.id}
                  className="flex items-center justify-between bg-brand-chrome-900 border border-brand-chrome-800 px-4 py-3"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-brand-chrome-600 font-mono text-xs">#{pack.id}</span>
                    <div>
                      <p className="text-white text-sm font-medium">{pack.series}</p>
                      <p className="text-brand-chrome-500 text-xs">{pack.tier} tier</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span
                      className={`text-xs font-bold uppercase tracking-widest px-2 py-0.5 border ${
                        pack.status === 'Opened'
                          ? 'border-brand-chrome-600 text-brand-chrome-500'
                          : pack.status === 'Available'
                          ? 'border-green-500 text-green-400'
                          : 'border-brand-orange text-brand-orange'
                      }`}
                    >
                      {pack.status}
                    </span>
                    <span className="text-white font-bold text-sm">{pack.value}</span>
                    <Link
                      href={`/p/${pack.id}`}
                      className="text-brand-orange hover:text-orange-400 text-xs uppercase tracking-widest transition-colors"
                    >
                      Passport →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Digital Passports section */}
          <section>
            <h2 className="text-white font-bold text-xl uppercase mb-4">Digital Passports</h2>
            <div className="border border-dashed border-brand-chrome-700 p-10 text-center">
              <p className="text-brand-chrome-600 text-xs uppercase tracking-widest mb-2">
                Full passport history coming soon
              </p>
              <Link href="/pack-reveal" className="text-brand-orange text-sm hover:underline">
                Reveal a new pack →
              </Link>
            </div>
          </section>

          {/* Studio earnings */}
          <section>
            <h2 className="text-white font-bold text-xl uppercase mb-4">Studio Earnings</h2>
            <div className="border border-dashed border-brand-chrome-700 p-10 text-center">
              <p className="text-brand-chrome-600 text-xs uppercase tracking-widest mb-2">
                Creator earnings history coming soon
              </p>
              <Link href="/studio" className="text-brand-orange text-sm hover:underline">
                Book a studio slot →
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
