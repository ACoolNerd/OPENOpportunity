import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';

const RetailPage: NextPage = () => {
  const { user, products, buyProduct } = useApp();
  const [filterCategory, setFilterCategory] = useState<'all' | 'repack' | 'drink' | 'item'>('all');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const filteredProducts = products.filter((prod) => {
    if (filterCategory === 'all') return true;
    return prod.category === filterCategory;
  });

  const handleBuy = (productId: string) => {
    const res = buyProduct(productId);
    if (res.success) {
      setFeedback({ type: 'success', message: res.message });
      // Clear alert after 3 seconds
      setTimeout(() => setFeedback(null), 3000);
    } else {
      setFeedback({ type: 'error', message: res.message });
    }
  };

  return (
    <>
      <Head>
        <title>Shop Mystery Packs & Drinks — OPENOpportunity</title>
        <meta
          name="description"
          content="Browse Standard, Premium, and Chase mystery packs, premium soursop juices, and collectible raw singles."
        />
      </Head>

      <div className="min-h-screen bg-black">
        {/* Page header */}
        <div className="bg-chrome-gradient border-b border-brand-chrome-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-2">
                OPEN LA Store × ACoolCOLLECTOR
              </p>
              <h1 className="text-white font-black text-5xl uppercase">
                Co-Op <span className="text-brand-orange">Marketplace</span>
              </h1>
              <p className="text-brand-chrome-400 mt-4 max-w-lg leading-relaxed">
                Buy drinks to earn punches on your digital loyalty card (Buy 10, Get 1 Free).
                Buy mystery packs and card singles to accumulate points and unlock rare collectibles.
              </p>
            </div>
            
            {user && (
              <div className="bg-brand-chrome-900 border border-brand-chrome-800 p-4 font-mono text-xs">
                <span className="text-brand-chrome-500 block uppercase">Your Balances</span>
                <span className="text-brand-orange font-bold text-sm block mt-1">{user.points} PTS</span>
                <span className="text-white block mt-0.5">Punches: {user.punches % 10}/10</span>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {feedback && (
            <div
              className={`p-3 text-xs font-bold uppercase tracking-wider mb-8 text-center border ${
                feedback.type === 'success'
                  ? 'border-green-500 text-green-400 bg-green-950/20'
                  : 'border-brand-orange text-brand-orange bg-red-950/20'
              }`}
            >
              {feedback.message}
            </div>
          )}

          {/* Category Filters */}
          <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2">
            {[
              { label: 'All Items', value: 'all' },
              { label: 'O.P.E.N. Mystery Packs', value: 'repack' },
              { label: 'Juice Up & Drinks', value: 'drink' },
              { label: 'Mystery Singles', value: 'item' }
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilterCategory(tab.value as any)}
                className={`flex-shrink-0 border text-xs font-bold uppercase tracking-widest px-4 py-2 transition-all duration-200 ${
                  filterCategory === tab.value
                    ? 'border-brand-orange text-brand-orange bg-brand-orange/5'
                    : 'border-brand-chrome-700 text-brand-chrome-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-brand-chrome-900 border border-brand-chrome-800 p-5 flex flex-col justify-between hover:border-brand-orange/50 transition-all duration-300 group"
              >
                <div>
                  <div className="aspect-square bg-black border border-brand-chrome-800 flex items-center justify-center text-5xl mb-4 group-hover:scale-105 transition-transform duration-300">
                    {prod.image}
                  </div>
                  
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-brand-chrome-800 text-brand-chrome-400 font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5">
                      {prod.category}
                    </span>
                    {user?.isSubscribed && (
                      <span className="text-brand-orange text-[8px] font-bold font-mono">
                        1.5X PTS
                      </span>
                    )}
                  </div>

                  <h3 className="text-white font-bold text-base uppercase group-hover:text-brand-orange transition-colors">
                    {prod.name}
                  </h3>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white font-black text-lg">
                      ${prod.price.toFixed(2)}
                    </span>
                    <span className="text-brand-chrome-500 font-mono text-xs">
                      +{prod.points} Pts {prod.isDrink ? '& 1 Punch' : ''}
                    </span>
                  </div>

                  {user ? (
                    <button
                      onClick={() => handleBuy(prod.id)}
                      className="w-full bg-brand-orange hover:bg-orange-500 text-white font-black text-xs uppercase tracking-widest py-2.5 transition-colors"
                    >
                      Buy & Earn Points
                    </button>
                  ) : (
                    <Link
                      href="/profile"
                      className="block text-center w-full bg-brand-chrome-800 hover:bg-brand-chrome-750 text-brand-chrome-300 font-bold text-xs uppercase tracking-widest py-2.5 transition-colors border border-brand-chrome-700"
                    >
                      Sign In to Buy
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Soursop Juice Up Subscription Box */}
          <div className="mt-16 bg-brand-chrome-900 border border-brand-chrome-800 p-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="max-w-xl">
              <span className="bg-brand-orange text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1">
                Monthly Subscription
              </span>
              <h2 className="text-white font-black text-2xl uppercase mt-3 mb-2">
                Juice Up <span className="text-brand-orange">Subscription Club</span>
              </h2>
              <p className="text-brand-chrome-400 text-xs leading-relaxed">
                Enjoy fresh soursop drinks and premium benefits. Juice Club members receive a 1.5x multiplier on all points earned in-store, along with a free mystery card pack credit automatically added to their profile vault every calendar month.
              </p>
            </div>
            
            <div className="text-center md:text-right min-w-[200px]">
              <p className="text-brand-chrome-500 text-xs uppercase tracking-widest">Pricing</p>
              <p className="text-white font-black text-3xl font-mono mt-1 mb-4">$19.99<span className="text-xs font-sans text-brand-chrome-400">/mo</span></p>
              <Link
                href="/profile"
                className="inline-block bg-brand-orange hover:bg-orange-500 text-white font-black text-xs uppercase tracking-widest px-6 py-3 transition-colors"
              >
                {user?.isSubscribed ? 'Manage Subscription' : 'Subscribe Now'}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default RetailPage;
