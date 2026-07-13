import type { NextPage } from 'next';
import Head from 'next/head';

const studioSlots = [
  { time: '9:00 AM – 11:00 AM',  type: 'Stream',  available: true  },
  { time: '11:30 AM – 1:30 PM', type: 'Break',   available: false },
  { time: '2:00 PM – 4:00 PM',  type: 'Content', available: true  },
  { time: '4:30 PM – 6:30 PM',  type: 'Stream',  available: true  },
  { time: '7:00 PM – 9:00 PM',  type: 'Break',   available: false },
];

const typeColors: Record<string, string> = {
  Stream:  'text-blue-400 border-blue-500',
  Break:   'text-brand-orange border-brand-orange',
  Content: 'text-green-400 border-green-500',
};

const StudioPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Creator Studio — OPENOpportunity</title>
        <meta
          name="description"
          content="Book streaming, breaking, and content creation studio time with the Collectors Co-op Creator Studio."
        />
      </Head>

      <div className="min-h-screen bg-black">
        {/* Header */}
        <div className="bg-chrome-gradient border-b border-brand-chrome-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-brand-chrome-500 text-xs uppercase tracking-widest mb-2">
              Collectors Co-op
            </p>
            <h1 className="text-white font-black text-5xl uppercase">
              Creator <span className="text-brand-orange">Studio</span>
            </h1>
            <p className="text-brand-chrome-400 mt-4 max-w-lg">
              Reserve studio time for live streaming, card breaking, and content
              creation. Earn commissions on every pack sold through your sessions.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Studio info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-brand-chrome-900 border border-brand-chrome-700 p-6">
                <h2 className="text-white font-bold text-lg mb-4">Studio Details</h2>
                <ul className="space-y-3 text-sm text-brand-chrome-400">
                  <li className="flex items-start gap-2"><span>📍</span> OPEN LA — Los Angeles, CA</li>
                  <li className="flex items-start gap-2"><span>📡</span> 4K streaming setup, multi-camera</li>
                  <li className="flex items-start gap-2"><span>🎴</span> On-site card inventory access</li>
                  <li className="flex items-start gap-2"><span>💵</span> $5 OPEN allocation + $1 creator bonus per pack sold</li>
                </ul>
              </div>

              <div className="bg-brand-chrome-900 border border-brand-chrome-700 p-6">
                <h2 className="text-white font-bold text-lg mb-4">Session Types</h2>
                <ul className="space-y-2">
                  {['Stream', 'Break', 'Content'].map((type) => (
                    <li key={type} className={`border-l-2 pl-3 text-sm ${typeColors[type]}`}>
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Booking calendar */}
            <div className="lg:col-span-2">
              <h2 className="text-white font-bold text-xl mb-6">
                Available Slots — <span className="text-brand-chrome-500">Today</span>
              </h2>
              <div className="space-y-3">
                {studioSlots.map((slot) => (
                  <div
                    key={slot.time}
                    className={`flex items-center justify-between bg-brand-chrome-900 border p-4 transition-colors ${
                      slot.available
                        ? 'border-brand-chrome-700 hover:border-brand-chrome-400'
                        : 'border-brand-chrome-800 opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-bold uppercase tracking-widest border px-2 py-0.5 ${typeColors[slot.type]}`}>
                        {slot.type}
                      </span>
                      <span className="text-white text-sm font-mono">{slot.time}</span>
                    </div>
                    <button
                      disabled={!slot.available}
                      className={`text-xs font-black uppercase tracking-widest px-4 py-2 transition-colors duration-200 ${
                        slot.available
                          ? 'bg-brand-orange hover:bg-orange-500 text-white'
                          : 'bg-brand-chrome-800 text-brand-chrome-600 cursor-not-allowed'
                      }`}
                    >
                      {slot.available ? 'Book' : 'Booked'}
                    </button>
                  </div>
                ))}
              </div>

              <p className="text-brand-chrome-600 text-xs mt-6">
                * Full booking system with creator authentication coming soon. Contact{' '}
                <a href="mailto:studio@openlastore.com" className="text-brand-orange hover:underline">
                  studio@openlastore.com
                </a>{' '}
                to reserve a slot today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudioPage;
