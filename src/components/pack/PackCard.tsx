import type { Pack } from '@/types';
import Link from 'next/link';
import { formatUSD } from '@/lib/commission';

interface PackCardProps {
  pack: Pack;
}

const tierColors: Record<string, string> = {
  Standard: 'border-brand-chrome-600 text-brand-chrome-300',
  Premium:  'border-blue-500 text-blue-400',
  Chase:    'border-brand-orange text-brand-orange',
};

export default function PackCard({ pack }: PackCardProps) {
  const tierStyle = tierColors[pack.tier] ?? tierColors['Standard'];

  return (
    <div className="group relative bg-brand-chrome-900 border border-brand-chrome-700 hover:border-brand-chrome-400 transition-all duration-300 overflow-hidden">
      {/* Tier badge */}
      <div className={`absolute top-3 right-3 border px-2 py-0.5 text-xs font-bold uppercase tracking-widest z-10 ${tierStyle}`}>
        {pack.tier}
      </div>

      {/* Pack image / placeholder */}
      <div className="relative h-48 bg-chrome-gradient flex items-center justify-center overflow-hidden">
        {pack.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={pack.imageUrl}
            alt={`Pack ${pack.packNumber}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-brand-chrome-500">
            <span className="text-4xl">🎴</span>
            <span className="text-xs uppercase tracking-widest">Mystery Pack</span>
          </div>
        )}
        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 group-hover:translate-x-full transition-transform duration-700 -translate-x-full" />
      </div>

      {/* Details */}
      <div className="p-4">
        <p className="text-brand-chrome-500 text-xs uppercase tracking-widest mb-1">
          {pack.seriesName}
        </p>
        <h3 className="text-white font-bold text-lg mb-1">
          Pack #{pack.packNumber}
        </h3>
        <p className="text-brand-chrome-400 text-xs mb-4">
          {pack.cardIds.length} card{pack.cardIds.length !== 1 ? 's' : ''} inside
        </p>

        <div className="flex items-center justify-between">
          <span className="text-white font-black text-xl">
            {formatUSD(pack.priceCents)}
          </span>
          <span className="text-brand-chrome-500 text-xs">
            Est. {formatUSD(pack.estimatedValueCents)}
          </span>
        </div>

        <Link
          href={`/retail?pack=${pack.id}`}
          className="mt-4 block w-full bg-brand-orange hover:bg-orange-500 text-white text-xs font-black uppercase tracking-widest text-center py-2.5 transition-colors duration-200"
        >
          Add to Cart
        </Link>
      </div>
    </div>
  );
}
