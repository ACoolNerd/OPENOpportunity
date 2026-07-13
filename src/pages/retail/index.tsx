import type { NextPage } from 'next';
import Head from 'next/head';
import PackCard from '@/components/pack/PackCard';
import type { Pack } from '@/types';

// ─── Placeholder data ─────────────────────────────────────────────────────────
const PLACEHOLDER_PACKS: Pack[] = [
  {
    id: 'pack-001',
    packNumber: '001',
    seriesName: 'Series 1 — Summer 2024',
    tier: 'Standard',
    status: 'Available',
    cardIds: ['card-a', 'card-b', 'card-c'],
    priceCents: 1999,
    estimatedValueCents: 3500,
    sealedAt: '2024-06-01T00:00:00Z',
    passportId: 'passport-001',
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2024-06-01T00:00:00Z',
  },
  {
    id: 'pack-002',
    packNumber: '002',
    seriesName: 'Series 1 — Summer 2024',
    tier: 'Premium',
    status: 'Available',
    cardIds: ['card-d', 'card-e', 'card-f', 'card-g'],
    priceCents: 4999,
    estimatedValueCents: 9500,
    sealedAt: '2024-06-05T00:00:00Z',
    passportId: 'passport-002',
    createdAt: '2024-06-05T00:00:00Z',
    updatedAt: '2024-06-05T00:00:00Z',
  },
  {
    id: 'pack-003',
    packNumber: '003',
    seriesName: 'Series 1 — Summer 2024',
    tier: 'Chase',
    status: 'Available',
    cardIds: ['card-h', 'card-i', 'card-j', 'card-k', 'card-l'],
    priceCents: 9999,
    estimatedValueCents: 25000,
    sealedAt: '2024-06-10T00:00:00Z',
    passportId: 'passport-003',
    createdAt: '2024-06-10T00:00:00Z',
    updatedAt: '2024-06-10T00:00:00Z',
  },
];

const TIERS = ['All', 'Standard', 'Premium', 'Chase'] as const;

const RetailPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shop Mystery Packs — OPENOpportunity</title>
        <meta
          name="description"
          content="Browse Standard, Premium, and Chase mystery packs. Curated TCG, sports, and collectibles — every card authenticated."
        />
      </Head>

      <div className="min-h-screen bg-black">
        {/* Page header */}
        <div className="bg-chrome-gradient border-b border-brand-chrome-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-brand-chrome-500 text-xs uppercase tracking-widest mb-2">
              OPEN LA Store × ACoolCOLLECTOR
            </p>
            <h1 className="text-white font-black text-5xl uppercase">
              Mystery <span className="text-brand-orange">Packs</span>
            </h1>
            <p className="text-brand-chrome-400 mt-4 max-w-lg">
              Every pack is hand-curated, sealed, and shipped with a Digital Product Passport.
              Scan the QR code to reveal your cards digitally before you even open the pack.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tier filter */}
          <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2">
            {TIERS.map((tier) => (
              <button
                key={tier}
                className="flex-shrink-0 border border-brand-chrome-700 hover:border-brand-orange text-brand-chrome-300 hover:text-brand-orange text-xs font-bold uppercase tracking-widest px-4 py-2 transition-colors duration-200"
              >
                {tier}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {PLACEHOLDER_PACKS.map((pack) => (
              <PackCard key={pack.id} pack={pack} />
            ))}
          </div>

          {/* Raw singles section */}
          <section className="mt-20">
            <h2 className="text-white font-black text-3xl uppercase mb-2">
              Raw <span className="text-brand-orange">Singles</span>
            </h2>
            <p className="text-brand-chrome-500 text-sm mb-8">
              Individual cards — TCG, sports, and more. Coming soon.
            </p>
            <div className="border border-dashed border-brand-chrome-700 p-12 text-center">
              <p className="text-brand-chrome-600 text-sm uppercase tracking-widest">
                Raw singles inventory coming soon
              </p>
            </div>
          </section>

          {/* Sealed wax section */}
          <section className="mt-16">
            <h2 className="text-white font-black text-3xl uppercase mb-2">
              Sealed <span className="text-brand-orange">Wax</span>
            </h2>
            <p className="text-brand-chrome-500 text-sm mb-8">
              Factory-sealed hobby and retail boxes. Coming soon.
            </p>
            <div className="border border-dashed border-brand-chrome-700 p-12 text-center">
              <p className="text-brand-chrome-600 text-sm uppercase tracking-widest">
                Sealed wax inventory coming soon
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default RetailPage;
