# OPENOpportunity — Collectors Co-op Platform

> **Mystery packs. Authenticated. Creator-powered.**

OPENOpportunity is the master technical foundation for a hybrid retail marketplace, creator studio, and inventory management system built for the **Collectors Co-op** ecosystem — in partnership with **OPEN LA Store** and **ACoolCOLLECTOR**.

---

## 🎴 Mission

The **Collectors Co-op** exists at the intersection of retail, creator empowerment, and education.

- **Retail** — Mystery packs spanning TCG, sports cards, sealed wax, redemptions, and more. Every pack is hand-curated by a verified creator and ships with a **Digital Product Passport** linked via QR code.
- **Creator Empowerment** — A dedicated streaming and content studio lets creators break packs live, build audiences, and earn recurring commissions. The $5 OPEN allocation + $1 creator bonus model ensures every sale benefits the broader ecosystem.
- **Education** — Transparent manifests, authenticated market values, and collection tracking tools that help collectors make informed decisions.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (Pages Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 (dark mode, custom brand tokens) |
| Backend | Firebase (Auth, Firestore, Storage) |
| POS | Square API *(integration placeholder)* |
| Accounting | QuickBooks Online *(integration placeholder)* |

---

## 🎨 Design System — ACoolCOLLECTOR Aesthetic

| Token | Value | Usage |
|---|---|---|
| `brand.black` | `#000000` | Background, cards |
| `brand.orange` | `#FF6600` | CTAs, active states, highlights ONLY |
| `brand.white` | `#FFFFFF` | Primary typography |
| `brand.chrome.*` | `#0A0A0A → #F8F8F8` | Borders, surfaces, muted text |
| `bg-chrome-gradient` | Metallic gradient | Hero sections, headers |

**Rules:**
- Dark mode by default — always. Never use a light background.
- Nike Orange (`#FF6600`) is reserved **strictly** for primary CTA buttons, active nav items, and key highlights.
- Chrome/metallic textures are preferred over flat grey surfaces.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/         # Navbar, Footer, Hero
│   ├── pack/           # PackCard
│   ├── passport/       # DigitalPassportCard
│   └── ui/             # Shared UI primitives
├── lib/
│   ├── firebase/       # Firebase config + Firestore collection helpers
│   ├── inventory.ts    # 90-day rotation logic
│   └── commission.ts   # $5/$1 commission split utilities
├── pages/
│   ├── index.tsx       # Landing page
│   ├── retail/         # Storefront (packs, singles, sealed wax)
│   ├── pack-reveal/    # Interactive pack reveal interface
│   ├── studio/         # Creator Studio booking
│   ├── dashboard/      # User collection & earnings dashboard
│   ├── admin/          # Secure operations hub
│   ├── p/[packId].tsx  # Digital Product Passport (QR entry point)
│   └── api/
│       ├── square-checkout.ts   # Square POS integration
│       └── quickbooks-sync.ts   # QuickBooks reconciliation
├── styles/
│   └── globals.css     # Tailwind directives + custom utilities
└── types/
    └── index.ts        # TypeScript interfaces: Card, Pack, Creator, Transaction
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- A Firebase project ([console.firebase.google.com](https://console.firebase.google.com))

### 1. Clone & install

```bash
git clone https://github.com/ACoolNerd/OPENOpportunity.git
cd OPENOpportunity
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
# Then edit .env.local and fill in your Firebase, Square, and QuickBooks credentials
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
npm start
```

### 5. Lint

```bash
npm run lint
```

---

## 🔗 Key Routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/retail` | Storefront — mystery packs, singles, sealed wax |
| `/pack-reveal` | Enter pack number or scan QR to reveal manifest |
| `/p/[packId]` | **Digital Product Passport** — QR code destination |
| `/studio` | Creator Studio booking interface |
| `/dashboard` | User collection value & earnings |
| `/admin` | Operations hub (inventory, commissions, sync logs) |
| `/api/square-checkout` | `POST` — Square checkout endpoint |
| `/api/quickbooks-sync` | `POST` — QuickBooks sync trigger |

---

## 🔐 Digital Product Passport (QR Ecosystem)

Every physical mystery pack ships with a QR code. When scanned, it routes to `/p/[packId]` and displays:

- **Pack / Item ID** — unique identifier
- **Authentication Number** — issued by OPENOpportunity
- **Series Number** — e.g. "42 of 100"
- **Current Estimated Market Value** — updated from Firestore
- **Full Card Manifest** — every card in the pack with condition and value
- **Legal Disclaimer** — market value estimates are informational only

---

## 💰 Commission Model

| Allocation | Amount per Pack Sale |
|---|---|
| OPEN LA allocation | $5.00 |
| Creator bonus | $1.00 |
| Net OPEN LA revenue | Sale price − $1.00 |

Commission logic lives in `src/lib/commission.ts`.

---

## 🔄 Inventory Rotation Policy

Packs in inventory for more than **90 days** without selling are flagged for repricing, re-packaging, or promotion. Rotation logic lives in `src/lib/inventory.ts`.

---

## 📄 License

See [LICENSE](./LICENSE).

---

*OPENOpportunity is a product of ACoolCOLLECTOR × OPEN LA Store.*  
*[OPENLaStore.com](https://openlastore.com) × [ACoolCOLLECTOR.com](https://acoolcollector.com)*
