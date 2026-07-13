import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useApp, CommunityEvent } from '@/context/AppContext';

const EventsPage: NextPage = () => {
  const { user, events, rsvpEvent, hostEvent } = useApp();

  // Search filter and states
  const [filterCategory, setFilterCategory] = useState('all');
  const [showHostForm, setShowHostForm] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('OPEN LA Loft Space');
  const [capacity, setCapacity] = useState('20');
  const [category, setCategory] = useState('local service professional');
  const [formFeedback, setFormFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const filteredEvents = events.filter((evt) => {
    if (filterCategory === 'all') return true;
    return evt.category === filterCategory;
  });

  const handleHostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !date || !time) {
      setFormFeedback({ success: false, message: 'Please fill in all required fields.' });
      return;
    }

    const res = hostEvent({
      title,
      description,
      date,
      time,
      location,
      capacity: parseInt(capacity) || 20,
      category
    });

    if (res.success) {
      setFormFeedback({ success: true, message: 'Event successfully created and hosted on the community board!' });
      // Reset fields
      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
      setTimeout(() => {
        setFormFeedback(null);
        setShowHostForm(false);
      }, 2000);
    } else {
      setFormFeedback({ success: false, message: 'An error occurred. Make sure you are logged in.' });
    }
  };

  return (
    <>
      <Head>
        <title>Community Gatherings & Events — OPENOpportunity</title>
      </Head>

      <div className="min-h-screen bg-black">
        {/* Header banner */}
        <div className="bg-chrome-gradient border-b border-brand-chrome-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-2">
              Community Co-op Space
            </p>
            <h1 className="text-white font-black text-5xl uppercase">
              Events & <span className="text-brand-orange">Progress</span>
            </h1>
            <p className="text-brand-chrome-400 mt-4 max-w-xl leading-relaxed">
              Let us help you open your mind and make manifest what you are well-meaning to do. 
              Our ecosystem allows community connection and event hosting for local service professionals 
              looking for engaging space that can be intimate and in close proximity to progress.
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => {
                  if (!user) {
                    window.location.href = '/profile';
                  } else {
                    setShowHostForm(!showHostForm);
                  }
                }}
                className="bg-brand-orange hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors duration-200"
              >
                {showHostForm ? 'Close Booking Panel' : 'Host an Event / Book Space'}
              </button>
              <Link
                href="/retail"
                className="bg-brand-chrome-900 border border-brand-chrome-700 hover:border-brand-orange text-brand-chrome-300 hover:text-white text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors duration-200"
              >
                Buy Loyalty Drinks
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Host Event Panel */}
          {showHostForm && user && (
            <div className="bg-brand-chrome-900 border border-brand-chrome-800 p-8 mb-12 max-w-3xl mx-auto">
              <h2 className="text-white font-black text-2xl uppercase mb-2">
                Book the Space <span className="text-brand-orange">& Host</span>
              </h2>
              <p className="text-brand-chrome-500 text-xs mb-6">
                Fill in the details below to schedule your intimate professional event or gathering in our space.
              </p>

              {formFeedback && (
                <div
                  className={`p-3 text-xs font-bold uppercase tracking-wider mb-6 text-center border ${
                    formFeedback.success
                      ? 'border-green-500 text-green-400 bg-green-950/20'
                      : 'border-brand-orange text-brand-orange bg-red-950/20'
                  }`}
                >
                  {formFeedback.message}
                </div>
              )}

              <form onSubmit={handleHostSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-brand-chrome-400 text-xs font-bold uppercase tracking-widest mb-1.5">
                      Event Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Real Estate & Capital Intro"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-black border border-brand-chrome-800 focus:border-brand-orange text-white text-sm px-4 py-2 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-brand-chrome-400 text-xs font-bold uppercase tracking-widest mb-1.5">
                      Category Group
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-black border border-brand-chrome-800 focus:border-brand-orange text-white text-sm px-4 py-2 focus:outline-none"
                    >
                      <option value="local service professional">Local Service Professional</option>
                      <option value="tcg">TCG & Cards Collectible</option>
                      <option value="creators">Creators & Streaming</option>
                      <option value="other">Other / Social</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-brand-chrome-400 text-xs font-bold uppercase tracking-widest mb-1.5">
                    Description & Objectives
                  </label>
                  <textarea
                    placeholder="Describe what guests can expect..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full bg-black border border-brand-chrome-800 focus:border-brand-orange text-white text-sm px-4 py-2 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-brand-chrome-400 text-xs font-bold uppercase tracking-widest mb-1.5">
                      Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-black border border-brand-chrome-800 focus:border-brand-orange text-white text-xs px-3 py-2 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-brand-chrome-400 text-xs font-bold uppercase tracking-widest mb-1.5">
                      Time
                    </label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-black border border-brand-chrome-800 focus:border-brand-orange text-white text-xs px-3 py-2 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-brand-chrome-400 text-xs font-bold uppercase tracking-widest mb-1.5">
                      Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-black border border-brand-chrome-800 focus:border-brand-orange text-white text-xs px-3 py-2 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-chrome-400 text-xs font-bold uppercase tracking-widest mb-1.5">
                      Capacity
                    </label>
                    <input
                      type="number"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      className="w-full bg-black border border-brand-chrome-800 focus:border-brand-orange text-white text-xs px-3 py-2 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-brand-orange hover:bg-orange-500 text-white font-black text-xs uppercase tracking-widest px-8 py-3 transition-colors mt-4"
                >
                  Publish Event & Reserve Space
                </button>
              </form>
            </div>
          )}

          {/* Filtering Tabs */}
          <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
            {[
              { label: 'All Gatherings', value: 'all' },
              { label: 'Service Professionals', value: 'local service professional' },
              { label: 'TCG & Cards', value: 'tcg' },
              { label: 'Creators & Podcasters', value: 'creators' }
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilterCategory(tab.value)}
                className={`flex-shrink-0 border text-xs font-bold uppercase tracking-widest px-4 py-2 transition-all ${
                  filterCategory === tab.value
                    ? 'border-brand-orange text-brand-orange bg-brand-orange/5'
                    : 'border-brand-chrome-800 text-brand-chrome-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Event Listing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => {
              const isUserRsvped = user?.rsvpedEvents.includes(evt.id) || false;
              const isFullyBooked = evt.rsvps >= evt.capacity;

              return (
                <div
                  key={evt.id}
                  className="bg-brand-chrome-900 border border-brand-chrome-800 p-6 flex flex-col justify-between hover:border-brand-orange/50 transition-all duration-300"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-brand-chrome-800 text-brand-orange font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1">
                        {evt.category}
                      </span>
                      <span className="text-brand-chrome-500 text-[10px] font-mono">
                        {evt.date}
                      </span>
                    </div>

                    <h3 className="text-white font-black text-lg uppercase mb-2">
                      {evt.title}
                    </h3>
                    <p className="text-brand-chrome-400 text-xs leading-relaxed mb-6">
                      {evt.description}
                    </p>
                  </div>

                  <div>
                    <div className="border-t border-brand-chrome-800 pt-4 mb-4 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-brand-chrome-500">Host: </span>
                        <span className="text-white font-bold">{evt.hostName}</span>
                      </div>
                      <div>
                        <span className="text-brand-chrome-500">Attending: </span>
                        <span className="text-brand-orange font-bold font-mono">
                          {evt.rsvps} / {evt.capacity}
                        </span>
                      </div>
                    </div>

                    {user ? (
                      <button
                        onClick={() => rsvpEvent(evt.id)}
                        disabled={isFullyBooked && !isUserRsvped}
                        className={`w-full py-2.5 text-xs font-black uppercase tracking-widest border transition-colors ${
                          isUserRsvped
                            ? 'bg-transparent border-red-500 text-red-400 hover:bg-red-950/20'
                            : isFullyBooked
                            ? 'bg-brand-chrome-800 text-brand-chrome-600 border-brand-chrome-850 cursor-not-allowed'
                            : 'bg-brand-orange hover:bg-orange-500 text-white border-transparent'
                        }`}
                      >
                        {isUserRsvped ? 'Cancel RSVP' : isFullyBooked ? 'Fully Booked' : 'RSVP to Attend'}
                      </button>
                    ) : (
                      <Link
                        href="/profile"
                        className="block text-center w-full bg-brand-chrome-800 hover:bg-brand-chrome-750 text-brand-chrome-300 font-bold text-xs uppercase tracking-widest py-2.5 transition-colors border border-brand-chrome-700"
                      >
                        Sign In to RSVP
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="border border-dashed border-brand-chrome-700 p-16 text-center text-brand-chrome-500 max-w-xl mx-auto">
              No events found matching this category. Be the first to host one!
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default EventsPage;
