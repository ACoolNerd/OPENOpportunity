import type { DigitalPassport } from '@/types';
import { formatUSD } from '@/lib/commission';

interface DigitalPassportCardProps {
  passport: DigitalPassport;
}

export default function DigitalPassportCard({ passport }: DigitalPassportCardProps) {
  const tierColors: Record<string, string> = {
    Standard: 'text-brand-chrome-300',
    Premium:  'text-blue-400',
    Chase:    'text-brand-orange',
  };
  const tierColor = tierColors[passport.tier] ?? tierColors['Standard'];

  return (
    <div className="bg-black border border-brand-chrome-700 p-6 space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-brand-chrome-500 text-xs uppercase tracking-widest mb-1">
            Digital Product Passport
          </p>
          <h2 className="text-white font-black text-2xl uppercase">
            {passport.seriesName}
          </h2>
        </div>
        <span className={`font-black text-sm uppercase tracking-widest ${tierColor}`}>
          {passport.tier}
        </span>
      </div>

      {/* Identity fields */}
      <div className="grid grid-cols-2 gap-4">
        <PassportField label="Pack / Item ID" value={`#${passport.packNumber}`} />
        <PassportField label="Authentication Number" value={passport.authNumber} mono />
        <PassportField label="Series Number" value={passport.seriesNumber} />
        <PassportField
          label="Est. Market Value"
          value={formatUSD(passport.estimatedValueCents)}
          highlight
        />
      </div>

      {/* Card manifest */}
      <div>
        <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-3">
          Pack Manifest ({passport.cards.length} cards)
        </h3>
        <ul className="space-y-2">
          {passport.cards.map((card) => (
            <li
              key={card.id}
              className="flex items-center justify-between bg-brand-chrome-900 border border-brand-chrome-800 px-3 py-2"
            >
              <div>
                <span className="text-white text-sm font-medium">{card.name}</span>
                <span className="text-brand-chrome-500 text-xs ml-2">
                  {card.category} · {card.condition}
                </span>
              </div>
              <span className="text-brand-chrome-300 text-xs">
                {formatUSD(card.marketValueCents)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* QR code placeholder */}
      {passport.qrCodeUrl && (
        <div className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={passport.qrCodeUrl}
            alt="QR Code"
            className="w-32 h-32 border border-brand-chrome-700"
          />
        </div>
      )}

      {/* Legal disclaimer */}
      <div className="border-t border-brand-chrome-800 pt-4">
        <p className="text-brand-chrome-600 text-xs leading-relaxed">
          ⚠️ <strong className="text-brand-chrome-500">Disclaimer:</strong> Estimated
          market values are provided for informational purposes only and are based on
          recent sales data. OPENOpportunity and Collectors Co-op make no warranty as
          to the accuracy of valuations. Collectibles investing involves risk; past
          performance is not indicative of future results. Authentication numbers are
          issued by OPENOpportunity and do not constitute third-party grading.
        </p>
      </div>

      {/* Sealed timestamp */}
      <p className="text-brand-chrome-700 text-xs text-right">
        Sealed:{' '}
        {new Date(passport.sealedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
    </div>
  );
}

interface PassportFieldProps {
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
}

function PassportField({ label, value, mono, highlight }: PassportFieldProps) {
  return (
    <div className="bg-brand-chrome-900 border border-brand-chrome-800 px-3 py-3">
      <p className="text-brand-chrome-500 text-xs uppercase tracking-widest mb-1">
        {label}
      </p>
      <p
        className={[
          'font-bold text-sm',
          mono ? 'font-mono' : '',
          highlight ? 'text-brand-orange' : 'text-white',
        ].join(' ')}
      >
        {value}
      </p>
    </div>
  );
}
