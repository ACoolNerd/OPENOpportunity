import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import QRCode from 'qrcode';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 3000);
const base = process.env.PUBLIC_BASE_URL || `http://localhost:${port}`;
const entriesFile = path.join(__dirname, 'data', 'entries.json');
const catalog = JSON.parse(await fs.readFile(path.join(__dirname, 'data', 'catalog.json'), 'utf8'));
const demo = { points: 240, drinks: 7, freeDrinks: 0, subscription: 'inactive', cards: [{ id: 'OPEN-2026-001', name: 'OPEN Opportunity Series 001', status: 'registered' }], rsvps: [], purchases: [] };

app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: { directives: { defaultSrc: ["'self'"], imgSrc: ["'self'", 'data:'], styleSrc: ["'self'", "'unsafe-inline'"], scriptSrc: ["'self'"], connectSrc: ["'self'"] } } }));
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: false, limit: '20kb' }));
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, limit: 120, standardHeaders: 'draft-7', legacyHeaders: false }));
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

const clean = (value, max = 100) => String(value || '').trim().replace(/[<>]/g, '').slice(0, max);
const allocation = units => Math.min(units, 50) * 5 + Math.max(units - 50, 0);
const auth = (req, res, next) => {
  const token = req.get('x-admin-token');
  const roles = token && token === process.env.ADMIN_TOKEN_KEITH ? { name: 'Keith McPherson', role: 'super_admin' }
    : token && token === process.env.ADMIN_TOKEN_STEPHEN ? { name: 'Stephen Smalls', role: 'super_admin' } : null;
  if (!roles) return res.status(401).json({ error: 'Super-admin authentication required.' });
  req.user = roles; next();
};

app.get('/api/config', (_req, res) => res.json({
  brand: 'OPEN Opportunity × ACoolCOLLECTOR × Collectors Co-op',
  openUrl: 'https://openlastore.com',
  campaignEnabled: process.env.ENTRY_CAMPAIGN_ENABLED === 'true',
  campaignPrize: process.env.ENTRY_PRIZE_DESCRIPTION || 'Month of Juice Up and/or one free soursop',
  campaignWindow: { start: process.env.ENTRY_START_AT || null, end: process.env.ENTRY_END_AT || null },
  products: catalog
}));

app.get('/api/community', (_req, res) => res.json({
  profile: demo,
  levels: ['Rookie Collector','Community Seller','Certified Breaker','Featured Creator','Elite Host','ACool Ambassador'],
  events: [{ id:'trade-night', title:'OPEN Trade Night', type:'Collect · Connect', status:'Interest list' },{ id:'creator-lab', title:'Creator Studio Lab', type:'Learn · Produce', status:'Interest list' },{ id:'juice-community', title:'Juice Up Community Pop-Up', type:'Wellness · Community', status:'Interest list' }],
  rewards: { pointsPerDollar: 1, packRedemptionPoints: 1000, drinkPunchGoal: 10, subscriberMultiplier: 1.5 }
}));

app.post('/api/demo/purchase', (req, res) => {
  const sku = clean(req.body.sku, 48); const item = catalog.find(x => x.sku === sku);
  const price = item?.price ?? (sku === 'JUICE-UP' ? 8 : 0);
  if (!price) return res.status(400).json({ error: 'Unknown demo item.' });
  const multiplier = demo.subscription === 'active' ? 1.5 : 1;
  demo.points += Math.floor(price * multiplier); if (sku === 'JUICE-UP') { demo.drinks++; if (demo.drinks >= 10) { demo.drinks -= 10; demo.freeDrinks++; } }
  demo.purchases.unshift({ id: crypto.randomUUID(), sku, price, createdAt: new Date().toISOString(), processor: 'demo_only' });
  res.json({ ok: true, profile: demo, message: 'Demo purchase recorded. No payment was processed.' });
});

app.post('/api/demo/subscribe', (_req, res) => { demo.subscription = demo.subscription === 'active' ? 'inactive' : 'active'; res.json({ ok:true, profile:demo, message:'Demo Juice Club status updated. No billing was started.' }); });
app.post('/api/demo/rsvp', (req, res) => { const eventId = clean(req.body.eventId, 48); if (!eventId) return res.status(400).json({error:'Event required.'}); if (!demo.rsvps.includes(eventId)) demo.rsvps.push(eventId); res.json({ok:true,profile:demo,message:'Added to the demo interest list.'}); });
app.post('/api/demo/register-card', (req, res) => { const code = clean(req.body.code, 48).toUpperCase(); if (!/^OPEN-[A-Z0-9-]{4,40}$/.test(code)) return res.status(400).json({error:'Use an OPEN-prefixed prototype code.'}); if (!demo.cards.some(x=>x.id===code)) demo.cards.push({id:code,name:'Community collectible',status:'registered'}); res.json({ok:true,profile:demo,message:'Prototype card registered.'}); });

app.get('/api/passports/:id', (req, res) => {
  const id = clean(req.params.id, 48).toUpperCase();
  if (!/^OPEN-[A-Z0-9-]{4,40}$/.test(id)) return res.status(400).json({ error: 'Invalid passport ID.' });
  res.json({ id, series: 'Series 001', status: 'Authenticity pending manifest verification', curator: 'ACoolCOLLECTOR', retailHost: 'OPEN LA', reveal: false, disclosure: 'Contents and market values vary. Not an investment or wager.' });
});

app.get('/api/qr', async (req, res) => {
  const target = clean(req.query.to || `${base}/enter`, 500);
  let parsed; try { parsed = new URL(target, base); } catch { return res.status(400).send('Invalid URL'); }
  if (!['http:', 'https:'].includes(parsed.protocol)) return res.status(400).send('Invalid URL');
  const svg = await QRCode.toString(parsed.toString(), { type: 'svg', margin: 1, color: { dark: '#0A0A0A', light: '#FFFFFF' }, errorCorrectionLevel: 'H' });
  res.type('image/svg+xml').send(svg);
});

app.post('/api/entries', async (req, res) => {
  if (process.env.ENTRY_CAMPAIGN_ENABLED !== 'true') return res.status(503).json({ error: 'Campaign entry is not open. Final rules and dates require sponsor approval.' });
  const { firstName, email, postalCode, ageConfirmed, rulesAccepted, honeypot } = req.body;
  if (honeypot) return res.status(202).json({ accepted: true });
  if (!ageConfirmed || !rulesAccepted) return res.status(400).json({ error: 'Eligibility and official rules must be accepted.' });
  const safeEmail = clean(email, 160).toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(safeEmail)) return res.status(400).json({ error: 'Valid email required.' });
  const entry = { id: crypto.randomUUID(), firstName: clean(firstName, 60), email: safeEmail, postalCode: clean(postalCode, 12), createdAt: new Date().toISOString(), source: 'qr-entry-card' };
  let entries = []; try { entries = JSON.parse(await fs.readFile(entriesFile, 'utf8')); } catch {}
  entries.push(entry); await fs.writeFile(entriesFile, JSON.stringify(entries, null, 2), { mode: 0o600 });
  res.status(201).json({ accepted: true, entryId: entry.id, message: 'Entry received. No purchase necessary.' });
});

app.get('/api/admin/dashboard', auth, async (req, res) => {
  let entries = []; try { entries = JSON.parse(await fs.readFile(entriesFile, 'utf8')); } catch {}
  res.json({ user: req.user, kpis: { inventoryRecords: 3942, totalItems: 3961, recordedMarketValue: 10689.80, visibleSingles: 40, reserveSingles: 10, entryCount: entries.length }, monthlyAllocationExamples: [10,25,50,60,100,150,250].map(units => ({ units, openAllocation: allocation(units) })), catalog });
});

app.get('/api/admin/export/catalog.csv', auth, (_req, res) => {
  const headers = ['sku','name','type','price','cards','openComp','squareItemId','quickbooksItemId'];
  const csv = [headers.join(','), ...catalog.map(row => headers.map(h => `"${String(row[h] ?? '').replaceAll('"','""')}"`).join(','))].join('\n');
  res.attachment('open-opportunity-catalog-mapping.csv').send(csv);
});

app.get('/healthz', (_req, res) => res.json({ ok: true }));
app.use((_req, res) => res.status(404).sendFile(path.join(__dirname, 'public', '404.html')));
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) app.listen(port, () => console.log(`OPEN Opportunity running at ${base}`));
export { app, allocation };
