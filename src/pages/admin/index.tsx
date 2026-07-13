import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { formatUSD } from '@/lib/commission';
import { ROTATION_DAYS } from '@/lib/inventory';
import { useApp } from '@/context/AppContext';

const AdminPage: NextPage = () => {
  const { events, cardAssets } = useApp();
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Simulated transaction records for the QuickBooks report
  const simulatedSales = [
    { id: 'REC-1001', date: '2026-07-10', product: 'Premium Soursop Wellness Juice', qty: 25, price: 7.99, method: 'Square (In-Person)', fee: 6.34, openComm: 0.00, acoolNet: 193.41 },
    { id: 'REC-1002', date: '2026-07-11', product: 'Organic Espresso Latte', qty: 15, price: 4.99, method: 'Square (In-Person)', fee: 3.32, openComm: 0.00, acoolNet: 71.53 },
    { id: 'REC-1003', date: '2026-07-11', product: 'O.P.E.N. Standard Mystery Pack (Series 001)', qty: 65, price: 29.99, method: 'App (Online)', fee: 75.80, openComm: 362.47, acoolNet: 1511.08 },
    { id: 'REC-1004', date: '2026-07-12', product: 'O.P.E.N. Premium Mystery Pack (Series 001)', qty: 12, price: 49.99, method: 'Square (In-Person)', fee: 17.40, openComm: 78.13, acoolNet: 504.35 },
    { id: 'REC-1005', date: '2026-07-13', product: 'Vintage Collectible Mystery Single', qty: 8, price: 9.99, method: 'Square (In-Person)', fee: 3.28, openComm: 19.16, acoolNet: 57.48 }
  ];

  // ─── Export Square POS Catalog CSV ──────────────────────────────────────────
  const downloadSquareCSV = () => {
    const headers = ['Token', 'Item Name', 'Description', 'SKU', 'Price', 'Category'];
    const rows = [
      ['PROD-SOURSOP', 'Premium Soursop Wellness Juice', 'Juice Up organic wellness drink sold at OPEN LA', 'JU-SOURSOP-01', '7.99', 'Drinks'],
      ['PROD-LATTE', 'Organic Espresso Latte', 'Organic double-shot espresso latte', 'CO-LATTE-01', '4.99', 'Drinks'],
      ['REPACK-STD', 'O.P.E.N. Standard Mystery Pack (Series 001)', 'ACoolCOLLECTOR standard repack 5 cards', 'OP-STD-001', '29.99', 'Mystery Packs'],
      ['REPACK-PREM', 'O.P.E.N. Premium Mystery Pack (Series 001)', 'ACoolCOLLECTOR premium repack 5 cards', 'OP-PREM-001', '49.99', 'Mystery Packs'],
      ['REPACK-CHASE', 'O.P.E.N. Chase Mystery Pack (Series 001)', 'ACoolCOLLECTOR premium chase cards repack', 'OP-CHASE-001', '79.99', 'Mystery Packs'],
      ['SINGLE-MYSTERY', 'Vintage Collectible Mystery Single', 'Sealed single vintage card', 'AC-VINTAGE-99', '9.99', 'Singles']
    ];

    const csvContent = [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    triggerDownload(csvContent, 'square_pos_catalog_import.csv');
    triggerFeedback('Square POS Catalog CSV downloaded successfully!');
  };

  // ─── Export QuickBooks Online Sales Receipts CSV ────────────────────────────
  const downloadQuickBooksCSV = () => {
    const headers = ['Receipt No', 'Date', 'Product', 'Quantity', 'Unit Price', 'Gross Sales', 'Payment Method', 'Square Fee', 'OPEN Commission', 'ACool Net'];
    const csvRows = simulatedSales.map(sale => {
      const gross = (sale.qty * sale.price).toFixed(2);
      return [
        sale.id,
        sale.date,
        sale.product,
        sale.qty.toString(),
        sale.price.toFixed(2),
        gross,
        sale.method,
        sale.fee.toFixed(2),
        sale.openComm.toFixed(2),
        sale.acoolNet.toFixed(2)
      ];
    });

    const csvContent = [headers.join(','), ...csvRows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    triggerDownload(csvContent, 'quickbooks_sales_receipts.csv');
    triggerFeedback('QuickBooks Online Sales Receipts CSV downloaded successfully!');
  };

  // Trigger file download helper
  const triggerDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const triggerFeedback = (msg: string) => {
    setSyncFeedback(msg);
    setTimeout(() => setSyncFeedback(null), 3500);
  };

  return (
    <>
      <Head>
        <title>Operations Hub — OPENOpportunity</title>
      </Head>

      <div className="min-h-screen bg-black">
        {/* Header */}
        <div className="bg-chrome-gradient border-b border-brand-chrome-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-brand-orange text-white text-xs font-bold uppercase tracking-widest px-3 py-1">
                Security clearance level 3
              </span>
              <span className="text-brand-chrome-600 text-xs uppercase tracking-widest font-mono">
                Secure Co-Op Access
              </span>
            </div>
            <h1 className="text-white font-black text-4xl uppercase">
              Operations & <span className="text-brand-orange">Integrations</span>
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          
          {syncFeedback && (
            <div className="bg-green-950/20 border border-green-500 text-green-400 p-3.5 text-xs font-bold uppercase tracking-wider text-center">
              {syncFeedback}
            </div>
          )}

          {/* Key operational metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Inventory',    value: '433 Cards Loaded' },
              { label: 'Mystery Singles Pool',value: '55 Active' },
              { label: 'Co-Op Revenue MTD',  value: formatUSD(189450) },
              { label: 'OPEN Allocations MTD',value: formatUSD(43000) },
            ].map((stat) => (
              <div key={stat.label} className="bg-brand-chrome-900 border border-brand-chrome-800 p-5">
                <p className="text-brand-chrome-500 text-xs uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-white font-black text-xl font-mono text-brand-orange">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Financial Integration Panel */}
          <section className="bg-brand-chrome-900 border border-brand-chrome-800 p-6">
            <h2 className="text-white font-black text-lg uppercase mb-2">
              Accounting & Checkout <span className="text-brand-orange">Interoperability</span>
            </h2>
            <p className="text-brand-chrome-405 text-xs mb-6 leading-relaxed">
              Maintain synchronisation across systems. Download item catalogs to import directly into Stephen&apos;s **Square POS** registers, or download sales journals containing Square fee calculations and payouts to import into your **QuickBooks Ledger**.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Square POS Export */}
              <div className="bg-black border border-brand-chrome-850 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-white text-xs font-bold uppercase block mb-1">Square POS Sync</span>
                  <p className="text-brand-chrome-500 text-[11px] leading-relaxed mb-6">
                    Generates a catalog template matching Square POS standards. Contains product tokens, category dividers, and pricing rules.
                  </p>
                </div>
                <button
                  onClick={downloadSquareCSV}
                  className="w-full bg-brand-orange hover:bg-orange-500 text-white font-black text-xs uppercase tracking-widest py-3 transition-colors"
                >
                  Download Square Catalog (CSV)
                </button>
              </div>

              {/* QuickBooks Sync */}
              <div className="bg-black border border-brand-chrome-850 p-6 flex flex-col justify-between">
                <div>
                  <span className="text-white text-xs font-bold uppercase block mb-1">QuickBooks Journal Sync</span>
                  <p className="text-brand-chrome-500 text-[11px] leading-relaxed mb-6">
                    Generates Sales Receipt records including item descriptions, units, in-person/online transaction fees, and co-op splits.
                  </p>
                </div>
                <button
                  onClick={downloadQuickBooksCSV}
                  className="w-full bg-brand-orange hover:bg-orange-500 text-white font-black text-xs uppercase tracking-widest py-3 transition-colors"
                >
                  Download QuickBooks Sales Receipts (CSV)
                </button>
              </div>

            </div>
          </section>

          {/* Partner Commission split overview */}
          <section className="bg-brand-chrome-900 border border-brand-chrome-800 p-6">
            <h2 className="text-white font-black text-lg uppercase mb-4">
              Payout <span className="text-brand-orange">Ledger</span>
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-brand-chrome-800 text-brand-chrome-500 font-bold uppercase tracking-wider">
                    <th className="pb-3 pr-4">Receipt</th>
                    <th className="pb-3 pr-4">Date</th>
                    <th className="pb-3 pr-4">Product</th>
                    <th className="pb-3 pr-4 text-center">Qty</th>
                    <th className="pb-3 pr-4 text-right">Price</th>
                    <th className="pb-3 pr-4 text-right">Gross</th>
                    <th className="pb-3 pr-4">Method</th>
                    <th className="pb-3 pr-4 text-right">Square Fee</th>
                    <th className="pb-3 pr-4 text-right">OPEN Share</th>
                    <th className="pb-3 text-right">ACool Net</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-chrome-850 text-brand-chrome-300 font-mono">
                  {simulatedSales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-brand-chrome-950/20 transition-colors">
                      <td className="py-3.5 pr-4 text-white font-bold">{sale.id}</td>
                      <td className="py-3.5 pr-4">{sale.date}</td>
                      <td className="py-3.5 pr-4 text-white">{sale.product}</td>
                      <td className="py-3.5 pr-4 text-center">{sale.qty}</td>
                      <td className="py-3.5 pr-4 text-right">${sale.price.toFixed(2)}</td>
                      <td className="py-3.5 pr-4 text-right text-white">${(sale.qty * sale.price).toFixed(2)}</td>
                      <td className="py-3.5 pr-4 font-sans text-brand-chrome-400">{sale.method}</td>
                      <td className="py-3.5 pr-4 text-right text-red-400/80">${sale.fee.toFixed(2)}</td>
                      <td className="py-3.5 pr-4 text-right text-brand-orange font-bold">${sale.openComm.toFixed(2)}</td>
                      <td className="py-3.5 text-right text-green-400 font-bold">${sale.acoolNet.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Space Reservations */}
          <section className="bg-brand-chrome-900 border border-brand-chrome-800 p-6">
            <h2 className="text-white font-black text-lg uppercase mb-4">
              OPEN LA Space <span className="text-brand-orange">Bookings</span>
            </h2>
            <div className="space-y-3">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="flex items-center justify-between bg-black border border-brand-chrome-850 px-4 py-3"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                    <div>
                      <span className="text-white text-sm font-bold uppercase">{evt.title}</span>
                      <p className="text-brand-chrome-500 text-[10px] font-mono mt-0.5">
                        {evt.date} at {evt.time} | Host: {evt.hostName} | RSVPs: {evt.rsvps}
                      </p>
                    </div>
                  </div>
                  <span className="bg-brand-chrome-900 text-brand-chrome-400 text-[10px] font-mono font-bold uppercase px-2 py-0.5 border border-brand-chrome-800">
                    Approved
                  </span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
};

export default AdminPage;
