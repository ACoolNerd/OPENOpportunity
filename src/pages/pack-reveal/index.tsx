'use client';

import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';

const PackRevealPage: NextPage = () => {
  const [packInput, setPackInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (packInput.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <>
      <Head>
        <title>Pack Reveal — OPENOpportunity</title>
        <meta
          name="description"
          content="Enter your pack number or scan the QR code on your mystery pack to reveal your card manifest and Digital Product Passport."
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
          <div className="text-center mb-12">
            <p className="text-brand-chrome-500 text-xs uppercase tracking-widest mb-3">
              Digital Product Passport
            </p>
            <h1 className="text-white font-black text-5xl uppercase mb-4">
              Reveal Your <span className="text-brand-orange">Pack</span>
            </h1>
            <p className="text-brand-chrome-400 text-sm">
              Enter the pack number printed on your mystery pack, or scan the QR
              code to be directed here automatically.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="pack-number"
                  className="block text-brand-chrome-300 text-xs uppercase tracking-widest mb-2"
                >
                  Pack Number
                </label>
                <input
                  id="pack-number"
                  type="text"
                  value={packInput}
                  onChange={(e) => setPackInput(e.target.value)}
                  placeholder="e.g. 00142"
                  className="w-full bg-brand-chrome-900 border border-brand-chrome-700 focus:border-brand-orange text-white placeholder-brand-chrome-600 px-4 py-3 text-sm font-mono outline-none transition-colors duration-200"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-orange hover:bg-orange-500 text-white font-black text-sm uppercase tracking-widest py-4 transition-colors duration-200"
              >
                Reveal Pack
              </button>

              <div className="relative flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-brand-chrome-800" />
                <span className="text-brand-chrome-600 text-xs uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-brand-chrome-800" />
              </div>

              <div className="border border-dashed border-brand-chrome-700 p-8 text-center">
                <span className="text-4xl block mb-3">📱</span>
                <p className="text-brand-chrome-500 text-xs uppercase tracking-widest">
                  QR Scanner coming soon
                </p>
                <p className="text-brand-chrome-600 text-xs mt-1">
                  Scan the QR on your physical pack to auto-fill this form
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
                  Redirecting to your Digital Product Passport…
                </p>
                <Link
                  href={`/p/${encodeURIComponent(packInput.trim())}`}
                  className="inline-block bg-brand-orange hover:bg-orange-500 text-white font-black text-sm uppercase tracking-widest px-8 py-3 transition-colors duration-200"
                >
                  View Digital Passport
                </Link>
              </div>
              <button
                onClick={() => { setSubmitted(false); setPackInput(''); }}
                className="text-brand-chrome-500 hover:text-white text-sm transition-colors"
              >
                ← Try another pack number
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PackRevealPage;
