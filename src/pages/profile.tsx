import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';

const ProfilePage: NextPage = () => {
  const {
    user,
    events,
    login,
    buyProduct,
    claimFreeDrink,
    toggleSubscription,
    claimCommunityDrink,
    communityCoupons
  } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setFeedback({ type: 'error', message: 'Please fill out all fields.' });
      return;
    }
    login(email, name);
    setFeedback({ type: 'success', message: 'Logged in successfully!' });
  };

  const handleBuySimulated = (productId: string) => {
    const res = buyProduct(productId);
    if (res.success) {
      setFeedback({ type: 'success', message: res.message });
    } else {
      setFeedback({ type: 'error', message: res.message });
    }
  };

  const handleClaimFreeDrink = () => {
    const res = claimFreeDrink();
    if (res.success) {
      setFeedback({ type: 'success', message: res.message });
    } else {
      setFeedback({ type: 'error', message: res.message });
    }
  };

  const handleClaimGiftCoupon = (couponId: string) => {
    const res = claimCommunityDrink(couponId);
    if (res.success) {
      setFeedback({ type: 'success', message: res.message });
    } else {
      setFeedback({ type: 'error', message: res.message });
    }
  };

  // If not logged in, render registration/login form
  if (!user) {
    return (
      <>
        <Head>
          <title>Sign In / Register — OPENOpportunity</title>
        </Head>
        <div className="min-h-screen bg-black flex items-center justify-center px-4 py-20">
          <div className="max-w-md w-full bg-brand-chrome-900 border border-brand-chrome-800 p-8 shadow-2xl">
            <div className="text-center mb-8">
              <span className="text-brand-orange text-xs font-bold uppercase tracking-widest bg-brand-chrome-800 px-3 py-1">
                Co-Op Loyalty Portal
              </span>
              <h1 className="text-white font-black text-3xl uppercase mt-4">
                Open Your <span className="text-brand-orange">Mind</span>
              </h1>
              <p className="text-brand-chrome-500 text-sm mt-2">
                Allow community connection, track loyalty rewards, and register your collectible card assets.
              </p>
            </div>

            {feedback && (
              <div
                className={`p-3 text-xs font-bold uppercase tracking-wider mb-6 text-center border ${
                  feedback.type === 'success'
                    ? 'border-green-500 text-green-400 bg-green-950/20'
                    : 'border-brand-orange text-brand-orange bg-red-950/20'
                }`}
              >
                {feedback.message}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-brand-chrome-400 text-xs font-bold uppercase tracking-widest mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Keith McPherson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black border border-brand-chrome-800 focus:border-brand-orange text-white text-sm px-4 py-2.5 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-brand-chrome-400 text-xs font-bold uppercase tracking-widest mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. keith@acoolcollector.domain"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-brand-chrome-800 focus:border-brand-orange text-white text-sm px-4 py-2.5 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-orange hover:bg-orange-500 text-white font-black text-xs uppercase tracking-widest py-3 transition-colors duration-200 mt-2"
              >
                Enter Ecosystem
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  // Visual variables for punch card
  const activePunchesCount = user.punches % 10;
  const freeDrinksEarned = Math.floor(user.punches / 10);

  return (
    <>
      <Head>
        <title>My Profile — OPENOpportunity</title>
      </Head>

      <div className="min-h-screen bg-black">
        {/* Profile Header */}
        <div className="bg-chrome-gradient border-b border-brand-chrome-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-brand-chrome-500 text-xs uppercase tracking-widest font-mono">
                  Member Profile
                </span>
                {user.isSubscribed && (
                  <span className="bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 animate-pulse">
                    Juice Club Pro
                  </span>
                )}
              </div>
              <h1 className="text-white font-black text-4xl uppercase">
                {user.name}
              </h1>
              <p className="text-brand-chrome-400 text-sm mt-1">
                Handle: <span className="font-mono text-brand-orange">@{user.handle}</span> | Email: {user.email}
              </p>
            </div>

            <div className="flex items-center gap-4 bg-brand-chrome-900 border border-brand-chrome-800 p-4">
              <div className="text-right">
                <p className="text-brand-chrome-500 text-[10px] uppercase tracking-widest font-bold">
                  Loyalty Balance
                </p>
                <p className="text-white font-black text-3xl font-mono text-brand-orange">
                  {user.points} <span className="text-xs uppercase font-sans text-brand-chrome-400">Pts</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Loyalty Punch Card & Actions */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Drink Punch Card */}
              <div className="bg-brand-chrome-900 border border-brand-chrome-800 p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-white font-black text-xl uppercase">
                      Drink <span className="text-brand-orange">Punch Card</span>
                    </h2>
                    <p className="text-brand-chrome-500 text-xs mt-1">
                      Buy 10 drinks (Soursop wellness juices, coffees, smoothies), get 1 free!
                    </p>
                  </div>
                  {freeDrinksEarned > 0 && (
                    <span className="bg-green-500/20 border border-green-500 text-green-400 text-xs font-bold uppercase px-3 py-1 rounded">
                      {freeDrinksEarned} Free Earned!
                    </span>
                  )}
                </div>

                {/* Grid of Punch slots */}
                <div className="grid grid-cols-5 md:grid-cols-10 gap-3 mb-6">
                  {Array.from({ length: 10 }).map((_, idx) => {
                    const isPunched = idx < activePunchesCount;
                    return (
                      <div
                        key={idx}
                        className={`aspect-square flex flex-col items-center justify-center border transition-all duration-300 relative ${
                          isPunched
                            ? 'bg-brand-orange/10 border-brand-orange text-brand-orange scale-105'
                            : 'bg-black border-brand-chrome-800 text-brand-chrome-700'
                        }`}
                      >
                        <span className="text-2xl">{isPunched ? '🥤' : '◯'}</span>
                        <span className="text-[10px] font-mono mt-1 font-bold">
                          {idx + 1}
                        </span>
                        {isPunched && (
                          <span className="absolute -top-1 -right-1 text-[8px] bg-brand-orange text-white w-3 h-3 rounded-full flex items-center justify-center font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleClaimFreeDrink}
                    disabled={user.punches < 10}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
                      user.punches >= 10
                        ? 'bg-green-600 hover:bg-green-500 text-white cursor-pointer'
                        : 'bg-brand-chrome-800 text-brand-chrome-600 cursor-not-allowed border border-brand-chrome-700'
                    }`}
                  >
                    Claim Free Soursop Drink ({freeDrinksEarned} available)
                  </button>
                </div>
              </div>

              {/* simulated actions */}
              <div className="bg-brand-chrome-900 border border-brand-chrome-800 p-6">
                <h2 className="text-white font-black text-lg uppercase mb-2">
                  Simulation <span className="text-brand-orange">Store Shortcuts</span>
                </h2>
                <p className="text-brand-chrome-500 text-xs mb-6">
                  Click below to simulate purchasing items at the counter to test your points multiplier and punch card additions:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => handleBuySimulated('prod-soursop-juice')}
                    className="bg-black hover:bg-brand-chrome-850 border border-brand-chrome-800 p-4 text-left hover:border-brand-orange transition-all flex flex-col justify-between"
                  >
                    <span className="text-2xl">🥤</span>
                    <span className="text-white font-bold text-xs uppercase mt-3">Soursop Juice</span>
                    <span className="text-[10px] text-brand-chrome-400 mt-1">$7.99 | +80 pts | +1 Punch</span>
                  </button>

                  <button
                    onClick={() => handleBuySimulated('prod-latte')}
                    className="bg-black hover:bg-brand-chrome-850 border border-brand-chrome-800 p-4 text-left hover:border-brand-orange transition-all flex flex-col justify-between"
                  >
                    <span className="text-2xl">☕</span>
                    <span className="text-white font-bold text-xs uppercase mt-3">Espresso Latte</span>
                    <span className="text-[10px] text-brand-chrome-400 mt-1">$4.99 | +50 pts | +1 Punch</span>
                  </button>

                  <button
                    onClick={() => handleBuySimulated('prod-standard-repack')}
                    className="bg-black hover:bg-brand-chrome-850 border border-brand-chrome-800 p-4 text-left hover:border-brand-orange transition-all flex flex-col justify-between"
                  >
                    <span className="text-2xl">🎴</span>
                    <span className="text-white font-bold text-xs uppercase mt-3">Opportunity Pack</span>
                    <span className="text-[10px] text-brand-chrome-400 mt-1">$29.99 | +300 pts</span>
                  </button>
                </div>
              </div>

              {/* Event RSVPs */}
              <div className="bg-brand-chrome-900 border border-brand-chrome-800 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-white font-black text-lg uppercase">
                    My <span className="text-brand-orange">RSVPs</span>
                  </h2>
                  <Link href="/events" className="text-brand-orange text-xs font-bold uppercase hover:underline">
                    Find Events →
                  </Link>
                </div>

                {user.rsvpedEvents.length === 0 ? (
                  <div className="border border-dashed border-brand-chrome-800 p-8 text-center text-brand-chrome-650">
                    You have not RSVPed to any upcoming gatherings yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {events
                      .filter((e) => user.rsvpedEvents.includes(e.id))
                      .map((evt) => (
                        <div
                          key={evt.id}
                          className="bg-black border border-brand-chrome-800 p-4 flex justify-between items-center"
                        >
                          <div>
                            <h3 className="text-white font-bold text-sm">{evt.title}</h3>
                            <p className="text-[10px] text-brand-chrome-500 font-mono mt-0.5">
                              {evt.date} at {evt.time} | Host: {evt.hostName}
                            </p>
                          </div>
                          <Link
                            href="/events"
                            className="border border-brand-chrome-700 hover:border-brand-orange text-brand-chrome-400 hover:text-brand-orange text-[10px] uppercase font-bold px-3 py-1 transition-colors"
                          >
                            Details
                          </Link>
                        </div>
                      ))}
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Subscriptions, registered cards, community pool */}
            <div className="space-y-8">
              
              {/* Juice Up Subscription */}
              <div className="bg-brand-chrome-900 border border-brand-chrome-800 p-6 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-orange/10 rounded-full blur-xl" />
                <h2 className="text-white font-black text-xl uppercase mb-2">
                  Juice Up <span className="text-brand-orange">Subscription</span>
                </h2>
                <p className="text-brand-chrome-500 text-xs leading-relaxed mb-6">
                  Join the Juice Club and receive **1.5x loyalty points** on all purchases, plus **1 free mystery pack credit** every single month!
                </p>

                <div className="bg-black border border-brand-chrome-800 p-4 mb-6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-brand-chrome-400">Monthly Cost</span>
                    <span className="text-white font-black">$19.99 / mo</span>
                  </div>
                  <div className="flex justify-between items-center text-xs mt-2 pt-2 border-t border-brand-chrome-805">
                    <span className="text-brand-chrome-400">Subscription Status</span>
                    <span className={`font-black uppercase tracking-widest ${
                      user.isSubscribed ? 'text-green-400' : 'text-brand-chrome-500'
                    }`}>
                      {user.isSubscribed ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={toggleSubscription}
                  className={`w-full py-3 text-xs font-black uppercase tracking-widest transition-all ${
                    user.isSubscribed
                      ? 'bg-transparent border border-red-500/50 hover:bg-red-950/20 text-red-400'
                      : 'bg-brand-orange hover:bg-orange-500 text-white shadow-lg shadow-orange-950/30'
                  }`}
                >
                  {user.isSubscribed ? 'Cancel Juice Club' : 'Join Juice Club'}
                </button>
              </div>

              {/* Registered Cards Vault */}
              <div className="bg-brand-chrome-900 border border-brand-chrome-800 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-white font-black text-lg uppercase">
                    My <span className="text-brand-orange">Card Vault</span>
                  </h2>
                  <Link href="/pack-reveal" className="text-brand-orange text-xs font-bold uppercase hover:underline">
                    Register Code →
                  </Link>
                </div>

                {user.registeredCards.length === 0 ? (
                  <div className="border border-dashed border-brand-chrome-800 p-8 text-center text-brand-chrome-650">
                    No physical card codes registered yet. Check the back of your collectible cards for QR activation!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {user.registeredCards.map((cardCode) => (
                      <div
                        key={cardCode}
                        className="bg-black border border-brand-chrome-800 p-3 flex flex-col"
                      >
                        <span className="text-white font-bold text-xs uppercase">
                          {cardCode.includes('DRINK') ? '🥤 Golden Drink Ticket' : '🎴 Autograph Insert'}
                        </span>
                        <span className="text-[10px] text-brand-chrome-500 font-mono mt-1">
                          Code: {cardCode}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Community Free Drink Board */}
              <div className="bg-brand-chrome-900 border border-brand-chrome-800 p-6">
                <h2 className="text-white font-black text-lg uppercase mb-2">
                  Community <span className="text-brand-orange">Drink Gifts</span>
                </h2>
                <p className="text-brand-chrome-500 text-xs mb-4">
                  Golden Drink Cards registered by community co-founders put free drinks on this board for everyone to enjoy!
                </p>

                {communityCoupons.filter((c) => !c.isClaimed).length === 0 ? (
                  <div className="border border-dashed border-brand-chrome-800 p-8 text-center text-brand-chrome-650">
                    All drink coupons claimed! Register a Golden Drink Card to add more!
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {communityCoupons
                      .filter((c) => !c.isClaimed)
                      .map((c) => (
                        <div
                          key={c.id}
                          className="bg-black border border-brand-chrome-850 p-3.5 flex justify-between items-center"
                        >
                          <div>
                            <span className="text-white font-bold text-xs font-mono">1x Free Drink Payout</span>
                            <p className="text-[9px] text-brand-chrome-500 font-sans mt-0.5">
                              Gifted by {c.donorName}
                            </p>
                          </div>
                          <button
                            onClick={() => handleClaimGiftCoupon(c.id)}
                            className="bg-brand-orange hover:bg-orange-500 text-white text-[9px] uppercase font-black px-2.5 py-1.5 transition-colors"
                          >
                            Claim Cup
                          </button>
                        </div>
                      ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
