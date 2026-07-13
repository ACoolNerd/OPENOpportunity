'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useApp();

  const navLinks = [
    { label: 'Shop',        href: '/retail' },
    { label: 'Events',      href: '/events' },
    { label: 'Pack Reveal',  href: '/pack-reveal' },
    { label: 'Studio',      href: '/studio' },
    { label: 'Profile',     href: '/profile' },
    { label: 'Admin',       href: '/admin' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-brand-chrome-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-brand-orange font-black text-xl tracking-tight uppercase">
            OPEN
          </span>
          <span className="text-white font-black text-xl tracking-tight uppercase">
            Opportunity
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-brand-chrome-300 hover:text-white text-sm font-medium uppercase tracking-wider transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Status / CTA */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4 bg-brand-chrome-900 border border-brand-chrome-700 px-4 py-1.5 rounded-full">
              <span className="text-brand-chrome-400 text-xs font-mono">@{user.handle}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-white text-xs font-bold font-mono text-brand-orange">{user.points} PTS</span>
              <button 
                onClick={logout}
                className="text-brand-chrome-500 hover:text-red-400 text-xs font-bold uppercase tracking-wider transition-colors ml-2"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/profile"
              className="text-brand-chrome-300 hover:text-brand-orange text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Sign In
            </Link>
          )}
          <Link
            href="/retail"
            className="bg-brand-orange hover:bg-orange-500 text-white text-sm font-bold uppercase tracking-widest px-5 py-2 transition-colors duration-200"
          >
            Shop Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-white mb-1.5" />
          <span className="block w-6 h-0.5 bg-white mb-1.5" />
          <span className="block w-6 h-0.5 bg-white" />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-brand-chrome-900 border-t border-brand-chrome-800">
          <ul className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-brand-chrome-300 hover:text-white text-sm font-medium uppercase tracking-wider"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {user ? (
              <li className="pt-2 border-t border-brand-chrome-800 flex items-center justify-between">
                <span className="text-white text-sm font-bold">@{user.handle} ({user.points} pts)</span>
                <button 
                  onClick={() => { logout(); setOpen(false); }}
                  className="text-red-400 text-xs font-bold uppercase"
                >
                  Sign Out
                </button>
              </li>
            ) : (
              <li className="pt-2 border-t border-brand-chrome-800">
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="block text-brand-orange text-sm font-bold uppercase"
                >
                  Sign In / Register
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/retail"
                onClick={() => setOpen(false)}
                className="block bg-brand-orange text-white text-sm font-bold uppercase tracking-widest px-4 py-2 text-center mt-2"
              >
                Shop Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
