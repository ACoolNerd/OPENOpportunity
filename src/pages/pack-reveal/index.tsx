import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

const PackRevealPage: NextPage = () => {
  const { user, registerCard, cardAssets } = useApp();

  const [activeTab, setActiveTab] = useState<'pack' | 'card'>('pack');
  const [packInput, setPackInput] = useState('');
  const [cardInput, setCardInput] = useState('');
  
  const [packSubmitted, setPackSubmitted] = useState(false);
  const [cardFeedback, setCardFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handlePackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (packInput.trim()) {
      setPackSubmitted(true);
    }
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setCardFeedback({ type: 'error', message: 'You must be signed in to register cards. Go to the Profile page to sign in.' });
      return;
    }
    if (!cardInput.trim()) {
      setCardFeedback({ type: 'error', message: 'Please enter a card code.' });
      return;
    }

    const res = registerCard(cardInput);
    if (res.success) {
      setCardFeedback({ type: 'success', message: res.message });
      setCardInput('');
    } else {
      setCardFeedback({ type: 'error', message: res.message });
    }
  };

  return (
    <>
      <Head>
        <title>Scan & Activate Portal — OPENOpportunity</title>
        <meta
          name="description"
          content="Scan the QR codes on your mystery packs and physical card inserts to reveal passports or activate rewards."
        />
      </Head>

      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-20">
        {/* Glow backdrop */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255,102,0,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest bg-brand-chrome-900 border border-brand-chrome-800 px-3 py-1">
              Digital Scanner Portal
            </span>
            <h1 className="text-white font-black text-4xl uppercase mt-4 mb-3">
              Scan & <span className="text-brand-orange">Activate</span>
            </h1>
            <p className="text-brand-chrome-400 text-sm">
              Reveal your pack’s digital contents or register physical insert cards in your vault.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-brand-chrome-800 mb-8">
            <button
              onClick={() => setActiveTab('pack')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest text-center transition-all ${
                activeTab === 'pack'
                  ? 'border-b-2 border-brand-orange text-white'
                  : 'text-brand-chrome-500 hover:text-white'
              }`}
            >
              Reveal a Pack
            </button>
            <button
              onClick={() => setActiveTab('card')}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest text-center transition-all ${
                activeTab === 'card'
                  ? 'border-b-2 border-brand-orange text-white'
                  : 'text-brand-chrome-500 hover:text-white'
              }`}
            >
              Register Card Insert
            </button>
          </div>

          {/* TAB 1: REVEAL A PACK */}
          {activeTab === 'pack' && (
            <div className="space-y-6">
              {!packSubmitted ? (
                <form onSubmit={handlePackSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="pack-number"
                      className="block text-brand-chrome-400 text-xs font-bold uppercase tracking-widest mb-2"
                    >
                      Pack Number
                    </label>
                    <input
                      id="pack-number"
                      type="text"
                      value={packInput}
                      onChange={(e) => setPackInput(e.target.value)}
                      placeholder="e.g. pack-001"
                      className="w-full bg-brand-chrome-900 border border-brand-chrome-700 focus:border-brand-orange text-white placeholder-brand-chrome-600 px-4 py-3 text-sm font-mono outline-none transition-colors duration-200"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-orange hover:bg-orange-500 text-white font-black text-xs uppercase tracking-widest py-3.5 transition-colors duration-200"
                  >
                    Reveal Pack Passport
                  </button>

                  <div className="border border-dashed border-brand-chrome-700 p-6 text-center mt-6">
                    <span className="text-3xl block mb-2">📸</span>
                    <p className="text-brand-chrome-500 text-xs uppercase tracking-widest">
                      Camera QR Scanner Active
                    </p>
                    <p className="text-brand-chrome-650 text-[10px] mt-1">
                      Hold the package code in front of your camera to open details.
                    </p>
                  </div>
                </form>
              ) : (
                <div className="space-y-6 text-center">
                  <div className="bg-brand-chrome-900 border border-brand-orange p-8">
                    <span className="text-5xl block mb-4">🎴</span>
                    <h2 className="text-white font-black text-2xl uppercase mb-2">
                      Pack #{packInput}
                    </h2>
                    <p className="text-brand-chrome-400 text-sm mb-6">
                      Manifest ready for digital review...
                    </p>
                    <Link
                      href={`/p/${encodeURIComponent(packInput.trim())}`}
                      className="inline-block bg-brand-orange hover:bg-orange-500 text-white font-black text-xs uppercase tracking-widest px-8 py-3.5 transition-colors duration-200"
                    >
                      View Digital Passport
                    </Link>
                  </div>
                  <button
                    onClick={() => { setPackSubmitted(false); setPackInput(''); }}
                    className="text-brand-chrome-500 hover:text-white text-xs uppercase tracking-widest font-bold transition-colors"
                  >
                    ← Try another pack number
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: REGISTER CARD */}
          {activeTab === 'card' && (
            <div className="space-y-6">
              {cardFeedback && (
                <div
                  className={`p-3 text-xs font-bold uppercase tracking-wider text-center border ${
                    cardFeedback.type === 'success'
                      ? 'border-green-500 text-green-400 bg-green-950/20'
                      : 'border-brand-orange text-brand-orange bg-red-950/20'
                  }`}
                >
                  {cardFeedback.message}
                </div>
              )}

              <form onSubmit={handleCardSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="card-code"
                    className="block text-brand-chrome-400 text-xs font-bold uppercase tracking-widest mb-2"
                  >
                    Enter Physical Card Serial/Code
                  </label>
                  <input
                    id="card-code"
                    type="text"
                    value={cardInput}
                    onChange={(e) => setCardInput(e.target.value)}
                    placeholder="e.g. DRINK-SHARE-777"
                    className="w-full bg-brand-chrome-900 border border-brand-chrome-700 focus:border-brand-orange text-white placeholder-brand-chrome-600 px-4 py-3 text-sm font-mono outline-none transition-colors duration-200"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-orange hover:bg-orange-500 text-white font-black text-xs uppercase tracking-widest py-3.5 transition-colors duration-200"
                >
                  Register Card to Vault
                </button>

                <div className="bg-brand-chrome-900 border border-brand-chrome-800 p-4 mt-6">
                  <span className="text-white text-xs font-bold uppercase block mb-3">
                    Available Pilot Codes:
                  </span>
                  <ul className="space-y-2.5 text-[11px] text-brand-chrome-400 font-mono">
                    <li>
                      <span className="text-brand-orange font-bold">DRINK-SHARE-777</span> - Golden Drink Ticket (1 free + spawns 10 community coupons)
                    </li>
                    <li>
                      <span className="text-brand-orange font-bold">AUTOGRAPH-KEITH-101</span> - Autographed Card (+1,000 Pts)
                    </li>
                    <li>
                      <span className="text-brand-orange font-bold">LUFFY-CHASE-001</span> - One Piece Luffy Card (+500 Pts)
                    </li>
                    <li>
                      <span className="text-brand-orange font-bold">JUICE-UP-FREE-PASS</span> - Free Month of Juice Club
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PackRevealPage;
