import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { formatUSD } from '@/lib/commission';
import { ROTATION_DAYS } from '@/lib/inventory';
import { useApp } from '@/context/AppContext';
import QRGenerator from '@/components/passport/QRGenerator';

type TxScenario = 'standard-pos' | 'premium-app' | 'single-pos' | 'drink-app';

const AdminPage: NextPage = () => {
  const { events } = useApp();
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Simulation controls state
  const [selectedTxType, setSelectedTxType] = useState<TxScenario>('standard-pos');
  const [monthlyVolume, setMonthlyVolume] = useState<number>(35); // Seeded month volume

  // Simulated transaction records for the static QuickBooks history table
  const simulatedSales = [
    { id: 'REC-1001', date: '2026-07-10', product: 'Premium Soursop Wellness Juice', qty: 25, price: 7.99, method: 'Square (In-Person)', fee: 6.34, openComm: 0.00, acoolNet: 193.41 },
    { id: 'REC-1002', date: '2026-07-11', product: 'Organic Espresso Latte', qty: 15, price: 4.99, method: 'Square (In-Person)', fee: 3.32, openComm: 0.00, acoolNet: 71.53 },
    { id: 'REC-1003', date: '2026-07-11', product: 'O.P.E.N. Standard Mystery Pack (Series 001)', qty: 65, price: 29.99, method: 'App (Online)', fee: 75.80, openComm: 362.47, acoolNet: 1511.08 },
    { id: 'REC-1004', date: '2026-07-12', product: 'O.P.E.N. Premium Mystery Pack (Series 001)', qty: 12, price: 49.99, method: 'Square (In-Person)', fee: 17.40, openComm: 78.13, acoolNet: 504.35 },
    { id: 'REC-1005', date: '2026-07-13', product: 'Vintage Collectible Mystery Single', qty: 8, price: 9.99, method: 'Square (In-Person)', fee: 3.28, openComm: 19.16, acoolNet: 57.48 }
  ];

  // Waterfall Calculation Logic
  let grossPrice = 29.99;
  let isPack = true;
  let isSingle = false;
  let isDrink = false;
  let feePercentage = 2.6;
  let feeFlat = 0.15;
  let sku = 'OP-STD-001';
  let productName = 'O.P.E.N. Standard Mystery Pack (Series 001)';
  let category = 'Mystery Packs';

  if (selectedTxType === 'standard-pos') {
    grossPrice = 29.99;
    isPack = true;
    feePercentage = 2.6;
    feeFlat = 0.15;
    sku = 'OP-STD-001';
    productName = 'O.P.E.N. Standard Mystery Pack (Series 001)';
    category = 'Mystery Packs';
  } else if (selectedTxType === 'premium-app') {
    grossPrice = 49.99;
    isPack = true;
    feePercentage = 2.9;
    feeFlat = 0.30;
    sku = 'OP-PREM-001';
    productName = 'O.P.E.N. Premium Mystery Pack (Series 001)';
    category = 'Mystery Packs';
  } else if (selectedTxType === 'single-pos') {
    grossPrice = 12.00;
    isPack = false;
    isSingle = true;
    feePercentage = 2.6;
    feeFlat = 0.15;
    sku = 'AC-SINGLE-101';
    productName = 'Vintage Collectible Single Card';
    category = 'Raw Singles';
  } else if (selectedTxType === 'drink-app') {
    grossPrice = 7.99;
    isPack = false;
    isDrink = true;
    feePercentage = 2.9;
    feeFlat = 0.30;
    sku = 'JU-SOURSOP-01';
    productName = 'Premium Soursop Wellness Juice';
    category = 'Wellness Drinks';
  }

  // Payout rate transitions based on monthly volume
  const payoutRate = monthlyVolume <= 50 ? '$5.00 Base' : '$1.00 Base';
  const basePayout = monthlyVolume <= 50 ? 5.00 : 1.00;

  const squareFee = (grossPrice * (feePercentage / 100)) + feeFlat;
  const netPrice = grossPrice - squareFee;

  let stephenComm = 0;
  if (isPack) {
    stephenComm = basePayout + (netPrice * 0.05);
  } else if (isSingle) {
    stephenComm = netPrice * 0.25;
  } else if (isDrink) {
    stephenComm = 0;
  }

  const acoolNet = netPrice - stephenComm;

  const squareMap = {
    Token: `PROD-${sku.split('-')[1] || 'ITEM'}`,
    ItemName: productName,
    SKU: sku,
    Price: grossPrice.toFixed(2),
    Category: category
  };

  const qbMap = {
    Product: productName,
    UnitPrice: grossPrice.toFixed(2),
    SquareFee: squareFee.toFixed(2),
    OPENComm: stephenComm.toFixed(2),
    ACoolNet: acoolNet.toFixed(2)
  };

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
        <div className="bg-chrome-gradient border-b border-brand-chrome-800 py-12 no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5">
                Co-Op Portal
              </span>
              <span className="text-brand-chrome-600 text-xs uppercase tracking-widest font-mono">
                Secure Partner Access
              </span>
            </div>
            <h1 className="text-white font-black text-4xl uppercase">
              Operations & <span className="text-brand-orange">Integrations</span>
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          
          {syncFeedback && (
            <div className="bg-green-950/20 border border-green-500 text-green-400 p-3.5 text-xs font-bold uppercase tracking-wider text-center no-print">
              {syncFeedback}
            </div>
          )}

          {/* Key operational metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 no-print">
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
          <section className="bg-brand-chrome-900 border border-brand-chrome-800 p-6 no-print">
            <h2 className="text-white font-black text-lg uppercase mb-2">
              Accounting & Export <span className="text-brand-orange">Controls</span>
            </h2>
            <p className="text-brand-chrome-400 text-xs mb-6 leading-relaxed">
              Export data schemas in batch format for your partner tools. Import item files to Square POS, or sync transaction receipts to QuickBooks Online.
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

          {/* NEW: Co-op Integration Console Section */}
          <section className="bg-brand-chrome-900 border border-brand-chrome-800 p-6 no-print">
            <div className="border-b border-brand-chrome-800 pb-4 mb-6">
              <h2 className="text-white font-black text-lg uppercase">
                Co-op <span className="text-brand-orange">Integration Console</span>
              </h2>
              <p className="text-brand-chrome-505 text-xs mt-1">
                Simulate transactional field mappings to Square POS and QuickBooks Online according to the Co-op split protocol.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Simulation Controls */}
              <div className="lg:col-span-1 space-y-4">
                <div>
                  <label className="block text-brand-chrome-400 text-[10px] font-bold uppercase tracking-widest mb-1.5">
                    Select Transaction Scenario
                  </label>
                  <select
                    value={selectedTxType}
                    onChange={(e) => setSelectedTxType(e.target.value as TxScenario)}
                    className="w-full bg-black border border-brand-chrome-800 focus:border-brand-orange text-white text-xs px-3 py-2.5 outline-none"
                  >
                    <option value="standard-pos">Standard Repack Pack ($29.99) - POS Card Checkout</option>
                    <option value="premium-app">Premium Repack Pack ($49.99) - App Self-Checkout</option>
                    <option value="single-pos">Vintage Single Card ($12.00) - POS Card Checkout</option>
                    <option value="drink-app">Premium Soursop Drink ($7.99) - App Self-Checkout</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-brand-chrome-400 mb-1.5">
                    <span>Monthly Pack Volume ({monthlyVolume} sold)</span>
                    <span className="text-brand-orange font-bold font-mono">{payoutRate}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={monthlyVolume}
                    onChange={(e) => setMonthlyVolume(parseInt(e.target.value))}
                    className="w-full accent-brand-orange bg-brand-chrome-800 h-1 cursor-pointer"
                  />
                  <span className="text-[10px] text-brand-chrome-500 block mt-1">
                    Sliding scale: $5 base payout for packs 1-50, then drops to $1.
                  </span>
                </div>

                {/* Calculations Card */}
                <div className="bg-black border border-brand-chrome-850 p-4 space-y-2.5 text-xs font-sans">
                  <span className="text-white font-bold uppercase block mb-1 text-[10px] tracking-wider text-brand-orange">
                    Waterfall Payout Resolution
                  </span>
                  <div className="flex justify-between">
                    <span className="text-brand-chrome-400">Gross Price:</span>
                    <span className="text-white font-mono font-bold">${grossPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-chrome-400 font-sans">Square Fee ({feePercentage}% + ${feeFlat.toFixed(2)}):</span>
                    <span className="text-red-400 font-mono">-${squareFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-brand-chrome-805 pt-2">
                    <span className="text-brand-chrome-400">Net Sales:</span>
                    <span className="text-white font-mono font-bold">${netPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-brand-orange font-sans">
                    <span>Stephen Commission:</span>
                    <span className="font-mono font-bold">${stephenComm.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-400 font-bold border-t border-brand-chrome-805 pt-2">
                    <span>ACool Net:</span>
                    <span className="font-mono">${acoolNet.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Mapped CSV schemas */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Square POS catalog map */}
                <div className="bg-black border border-brand-chrome-850 p-4 space-y-3 font-mono text-[10px]">
                  <span className="text-white font-sans font-bold uppercase tracking-wider block text-xs border-b border-brand-chrome-805 pb-1.5">
                    Square POS Catalog Mapping
                  </span>
                  <div>
                    <span className="text-brand-chrome-500 block uppercase text-[8px]">Token (Internal ID)</span>
                    <span className="text-white font-bold">{squareMap.Token}</span>
                  </div>
                  <div>
                    <span className="text-brand-chrome-500 block uppercase text-[8px]">Item Name</span>
                    <span className="text-white font-bold">{squareMap.ItemName}</span>
                  </div>
                  <div>
                    <span className="text-brand-chrome-500 block uppercase text-[8px]">SKU</span>
                    <span className="text-white font-bold">{squareMap.SKU}</span>
                  </div>
                  <div>
                    <span className="text-brand-chrome-500 block uppercase text-[8px]">Price</span>
                    <span className="text-brand-orange font-bold">${squareMap.Price}</span>
                  </div>
                  <div>
                    <span className="text-brand-chrome-500 block uppercase text-[8px]">Category</span>
                    <span className="text-white">{squareMap.Category}</span>
                  </div>
                </div>

                {/* QuickBooks Sales receipt mapping */}
                <div className="bg-black border border-brand-chrome-850 p-4 space-y-3 font-mono text-[10px]">
                  <span className="text-white font-sans font-bold uppercase tracking-wider block text-xs border-b border-brand-chrome-805 pb-1.5">
                    QuickBooks Sales Journal Map
                  </span>
                  <div>
                    <span className="text-brand-chrome-500 block uppercase text-[8px]">Receipt No</span>
                    <span className="text-white font-bold">REC-SIM-{(monthlyVolume + 1000)}</span>
                  </div>
                  <div>
                    <span className="text-brand-chrome-500 block uppercase text-[8px]">Product Link</span>
                    <span className="text-white font-bold">{qbMap.Product}</span>
                  </div>
                  <div>
                    <span className="text-brand-chrome-500 block uppercase text-[8px]">Unit Price</span>
                    <span className="text-white font-bold">${qbMap.UnitPrice}</span>
                  </div>
                  <div>
                    <span className="text-brand-chrome-500 block uppercase text-[8px]">Square Processing Fee</span>
                    <span className="text-red-400 font-bold">-${qbMap.SquareFee}</span>
                  </div>
                  <div>
                    <span className="text-brand-chrome-500 block uppercase text-[8px]">OPEN Commission split</span>
                    <span className="text-brand-orange font-bold">${qbMap.OPENComm}</span>
                  </div>
                  <div>
                    <span className="text-brand-chrome-500 block uppercase text-[8px]">ACool Net Receipts</span>
                    <span className="text-green-400 font-bold">${qbMap.ACoolNet}</span>
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* Partner Commission split overview */}
          <section className="bg-brand-chrome-900 border border-brand-chrome-800 p-6 no-print">
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

          {/* Tag Printing QR Generator Panel */}
          <section className="no-print">
            <QRGenerator />
          </section>

          {/* Space Reservations */}
          <section className="bg-brand-chrome-900 border border-brand-chrome-800 p-6 no-print">
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
