import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import DigitalPassportCard from '@/components/passport/DigitalPassportCard';
import type { DigitalPassport } from '@/types';
import Link from 'next/link';

interface PassportPageProps {
  passport: DigitalPassport | null;
  packId: string;
}

/**
 * Dynamic route — /p/[packId]
 *
 * Handles incoming QR code scans from physical retail packaging.
 * In production this page fetches the passport document from Firestore.
 * For now it renders a placeholder passport so the route is fully functional.
 */
const PassportPage: NextPage<PassportPageProps> = ({ passport, packId }) => {
  if (!passport) {
    return (
      <>
        <Head>
          <title>Pack Not Found — OPENOpportunity</title>
        </Head>
        <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
          <span className="text-6xl mb-6">🔍</span>
          <h1 className="text-white font-black text-4xl uppercase mb-4">
            Pack Not Found
          </h1>
          <p className="text-brand-chrome-400 mb-8 max-w-sm">
            No Digital Product Passport found for pack <code className="text-brand-orange">#{packId}</code>.
            Please check the pack number and try again.
          </p>
          <Link
            href="/pack-reveal"
            className="bg-brand-orange hover:bg-orange-500 text-white font-black text-sm uppercase tracking-widest px-8 py-3 transition-colors duration-200"
          >
            Try Again
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Pack #{passport.packNumber} Passport — OPENOpportunity</title>
        <meta
          name="description"
          content={`Digital Product Passport for ${passport.seriesName} Pack #${passport.packNumber}. Authentication: ${passport.authNumber}.`}
        />
      </Head>

      <div className="min-h-screen bg-black py-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-brand-chrome-600 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/pack-reveal" className="hover:text-white transition-colors">Pack Reveal</Link>
            <span>/</span>
            <span className="text-brand-chrome-300">Pack #{passport.packNumber}</span>
          </nav>

          <DigitalPassportCard passport={passport} />

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/retail"
              className="border border-brand-chrome-700 hover:border-white text-brand-chrome-300 hover:text-white font-bold text-xs uppercase tracking-widest px-6 py-3 text-center transition-all duration-200"
            >
              Shop More Packs
            </Link>
            <Link
              href="/pack-reveal"
              className="bg-brand-orange hover:bg-orange-500 text-white font-black text-xs uppercase tracking-widest px-6 py-3 text-center transition-colors duration-200"
            >
              Reveal Another Pack
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PassportPageProps> = async (ctx) => {
  const packId = String(ctx.params?.packId ?? '');

  // TODO: Replace with Firestore lookup:
  //   const passportSnap = await getDocs(
  //     query(passportsCollection(), where('packId', '==', packId))
  //   );

  // Placeholder passport for demonstration
  const demoPassport: DigitalPassport = {
    id: `passport-${packId}`,
    packId,
    packNumber: packId,
    seriesName: 'Series 1 — Summer 2024',
    tier: 'Standard',
    authNumber: `AUTH-${packId.toUpperCase()}-2024`,
    seriesNumber: `${packId} of 100`,
    estimatedValueCents: 3500,
    sealedAt: '2024-06-01T00:00:00Z',
    cards: [
      {
        id: 'card-demo-1',
        name: 'Charizard (Base Set)',
        category: 'TCG',
        condition: 'Near Mint',
        year: 1999,
        manufacturer: 'Wizards of the Coast',
        series: 'Base Set',
        setName: 'Pokémon Base Set',
        cardNumber: '4/102',
        subject: 'Charizard',
        marketValueCents: 2500,
        createdAt: '2024-06-01T00:00:00Z',
        updatedAt: '2024-06-01T00:00:00Z',
      },
      {
        id: 'card-demo-2',
        name: 'LeBron James Rookie Card',
        category: 'Sports',
        condition: 'Excellent',
        year: 2003,
        manufacturer: 'Upper Deck',
        series: 'SP Authentic',
        cardNumber: '148',
        subject: 'LeBron James',
        marketValueCents: 1000,
        createdAt: '2024-06-01T00:00:00Z',
        updatedAt: '2024-06-01T00:00:00Z',
      },
    ],
  };

  return {
    props: {
      passport: demoPassport,
      packId,
    },
  };
};

export default PassportPage;
