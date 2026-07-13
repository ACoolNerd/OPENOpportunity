import type { NextPage } from 'next';
import Head from 'next/head';
import { formatUSD } from '@/lib/commission';
import { ROTATION_DAYS } from '@/lib/inventory';

// Placeholder admin stats
const adminStats = [
  { label: 'Total Inventory',    value: '247 packs'       },
  { label: 'Stale (90+ days)',   value: '12 packs'        },
  { label: 'Gross Revenue (MTD)',value: formatUSD(1248900) },
  { label: 'Creator Payouts Due',value: formatUSD(14200)  },
  { label: 'QuickBooks Status',  value: 'Synced ✓'        },
  { label: 'Square POS Status',  value: 'Connected ✓'     },
];

const AdminPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Admin — OPENOpportunity</title>
      </Head>

      <div className="min-h-screen bg-black">
        {/* Header */}
        <div className="bg-chrome-gradient border-b border-brand-chrome-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-2 py-0.5">
                Admin
              </span>
              <span className="text-brand-chrome-600 text-xs uppercase tracking-widest">
                Secure View
              </span>
            </div>
            <h1 className="text-white font-black text-4xl uppercase">
              Operations <span className="text-brand-orange">Hub</span>
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          {/* Key metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {adminStats.map((stat) => (
              <div key={stat.label} className="bg-brand-chrome-900 border border-brand-chrome-700 p-5">
                <p className="text-brand-chrome-500 text-xs uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-white font-black text-xl">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Inventory management */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-xl uppercase">Inventory Management</h2>
              <span className="text-brand-chrome-500 text-xs">
                Rotation policy: {ROTATION_DAYS} days
              </span>
            </div>
            <div className="border border-dashed border-brand-chrome-700 p-10 text-center">
              <p className="text-brand-chrome-600 text-xs uppercase tracking-widest">
                Full inventory management UI coming soon
              </p>
            </div>
          </section>

          {/* Commission tracking */}
          <section>
            <h2 className="text-white font-bold text-xl uppercase mb-4">
              Partner Commission Tracking
            </h2>
            <div className="bg-brand-chrome-900 border border-brand-chrome-700 p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-brand-chrome-500 text-xs uppercase tracking-widest mb-1">Model</p>
                  <p className="text-white">$5 OPEN allocation + $1 creator bonus per pack</p>
                </div>
                <div>
                  <p className="text-brand-chrome-500 text-xs uppercase tracking-widest mb-1">Payout Cycle</p>
                  <p className="text-white">Monthly (1st of month)</p>
                </div>
                <div>
                  <p className="text-brand-chrome-500 text-xs uppercase tracking-widest mb-1">Current Queue</p>
                  <p className="text-brand-orange font-bold">{formatUSD(14200)} pending</p>
                </div>
              </div>
              <div className="border border-dashed border-brand-chrome-700 p-6 text-center">
                <p className="text-brand-chrome-600 text-xs uppercase tracking-widest">
                  Detailed commission reports coming soon
                </p>
              </div>
            </div>
          </section>

          {/* QuickBooks / Square sync logs */}
          <section>
            <h2 className="text-white font-bold text-xl uppercase mb-4">
              Integration Sync Logs
            </h2>
            <div className="space-y-3">
              {[
                { system: 'QuickBooks', status: 'Success', time: '5 mins ago',  records: 14 },
                { system: 'Square POS', status: 'Success', time: '12 mins ago', records: 3  },
              ].map((log) => (
                <div
                  key={log.system}
                  className="flex items-center justify-between bg-brand-chrome-900 border border-brand-chrome-800 px-4 py-3"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-white text-sm font-medium">{log.system}</span>
                    <span className="text-brand-chrome-500 text-xs">{log.records} records</span>
                  </div>
                  <span className="text-brand-chrome-600 text-xs">{log.time}</span>
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
