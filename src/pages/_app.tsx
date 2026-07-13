import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-1 pt-16">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
