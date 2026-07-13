import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRGeneratorProps {
  defaultUrl?: string;
  defaultName?: string;
  defaultSku?: string;
  defaultPrice?: string;
}

export default function QRGenerator({
  defaultUrl = 'https://openlastore.com/p/pack-001',
  defaultName = 'O.P.E.N. Standard Pack (Series 001)',
  defaultSku = 'OP-STD-001',
  defaultPrice = '$29.99',
}: QRGeneratorProps) {
  const [url, setUrl] = useState(defaultUrl);
  const [name, setName] = useState(defaultName);
  const [sku, setSku] = useState(defaultSku);
  const [price, setPrice] = useState(defaultPrice);
  const [condition, setCondition] = useState('Near Mint');
  const [category, setCategory] = useState('Mystery Packs');
  
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-brand-chrome-900 border border-brand-chrome-800 p-6 space-y-6 no-print">
      <div className="border-b border-brand-chrome-800 pb-4">
        <h3 className="text-white font-black text-lg uppercase">
          Dynamic <span className="text-brand-orange">QR Tag Generator</span>
        </h3>
        <p className="text-brand-chrome-500 text-xs mt-1">
          Generate unique QR codes for physical inventory packages. Perfect for printing 4x6 adhesive product tags.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-brand-chrome-400 text-[10px] font-bold uppercase tracking-widest mb-1">
              Item Name / Label
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black border border-brand-chrome-800 focus:border-brand-orange text-white text-xs px-3 py-2 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-brand-chrome-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                SKU / Serial Code
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full bg-black border border-brand-chrome-800 focus:border-brand-orange text-white text-xs px-3 py-2 outline-none"
              />
            </div>
            <div>
              <label className="block text-brand-chrome-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                Price (MSRP)
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-black border border-brand-chrome-800 focus:border-brand-orange text-white text-xs px-3 py-2 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-brand-chrome-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-black border border-brand-chrome-800 focus:border-brand-orange text-white text-xs px-3 py-2 outline-none"
              >
                <option value="Mystery Packs">Mystery Packs</option>
                <option value="Raw Singles">Raw Singles</option>
                <option value="Sealed Wax">Sealed Wax</option>
                <option value="Wellness Drinks">Wellness Drinks</option>
              </select>
            </div>
            <div>
              <label className="block text-brand-chrome-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                Condition
              </label>
              <input
                type="text"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full bg-black border border-brand-chrome-800 focus:border-brand-orange text-white text-xs px-3 py-2 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-brand-chrome-400 text-[10px] font-bold uppercase tracking-widest mb-1">
              QR Redirect URL (Passport Destination)
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-black border border-brand-chrome-800 focus:border-brand-orange text-white text-xs px-3 py-2 outline-none font-mono"
            />
          </div>

          <button
            onClick={handlePrint}
            className="w-full bg-brand-orange hover:bg-orange-500 text-white font-black text-xs uppercase tracking-widest py-3 transition-colors"
          >
            Print 4x6 Label
          </button>
        </div>

        {/* Live Preview Display */}
        <div className="flex flex-col items-center justify-center bg-black border border-brand-chrome-800 p-4">
          <span className="text-brand-chrome-500 text-[9px] uppercase tracking-widest mb-3">
            Tag Layout Preview (4&quot; x 6&quot; aspect)
          </span>

          {/* 4x6 Label tag container */}
          <div 
            ref={printRef}
            className="print-label w-[240px] h-[360px] bg-white text-black p-5 border border-black flex flex-col justify-between items-center text-center shadow-lg relative overflow-hidden"
          >
            {/* Tag Header */}
            <div className="w-full border-b border-black pb-2">
              <span className="text-[10px] font-black tracking-widest block uppercase text-open-olive">
                O.P.E.N. Opportunity
              </span>
              <span className="text-[8px] text-gray-500 tracking-wider block font-sans">
                Organic • Personal • Environmental • Necessities
              </span>
            </div>

            {/* Tag Body Details */}
            <div className="my-2 space-y-1 w-full">
              <h4 className="font-display font-black text-xs uppercase leading-tight line-clamp-2">
                {name}
              </h4>
              <span className="text-[8px] bg-black text-white px-2 py-0.5 font-bold uppercase tracking-wider inline-block">
                {category}
              </span>
            </div>

            {/* QR SVG */}
            <div className="p-1 border border-black bg-white my-1">
              <QRCodeSVG 
                value={url} 
                size={120} 
                level="M"
                includeMargin={false}
              />
            </div>

            {/* Tag Footer details */}
            <div className="w-full border-t border-black pt-2 flex flex-col items-center">
              <span className="text-[8px] font-mono font-bold block">
                SKU: {sku}
              </span>
              <div className="flex justify-between w-full text-[9px] font-black uppercase mt-1">
                <span>Cond: {condition}</span>
                <span className="text-open-orange">{price}</span>
              </div>
            </div>

            {/* Serial badge */}
            <div className="absolute top-2 right-2 text-[6px] font-mono text-gray-400">
              ORIGINAL
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
