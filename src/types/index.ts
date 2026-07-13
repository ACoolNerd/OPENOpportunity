// ─── Card ────────────────────────────────────────────────────────────────────

export type CardCategory =
  | 'TCG'
  | 'Sports'
  | 'Redemption'
  | 'Coupon'
  | 'Memorabilia'
  | 'Other';

export type CardCondition = 'Mint' | 'Near Mint' | 'Excellent' | 'Good' | 'Fair' | 'Poor';

export interface Card {
  id: string;
  name: string;
  category: CardCategory;
  condition: CardCondition;
  /** Year the card was produced */
  year: number;
  manufacturer: string;
  series?: string;
  setName?: string;
  cardNumber?: string;
  /** Player, character, or subject featured */
  subject?: string;
  /** Estimated market value in USD cents */
  marketValueCents: number;
  /** PSA / BGS / SGC grade, if graded */
  grade?: number;
  gradingCompany?: string;
  imageUrl?: string;
  /** Whether this card is a parallel, refractor, etc. */
  isParallel?: boolean;
  /** Print run, e.g. 25 means /25 */
  printRun?: number;
  isRookie?: boolean;
  isAutographed?: boolean;
  isRelicCard?: boolean;
  /** Authentication / serial number */
  authNumber?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Pack ─────────────────────────────────────────────────────────────────────

export type PackTier = 'Standard' | 'Premium' | 'Chase';

export type PackStatus =
  | 'Available'
  | 'Sold'
  | 'Opened'
  | 'Reserved'
  | 'Rotated';

export interface Pack {
  id: string;
  packNumber: string;
  /** Human-readable series name, e.g. "Series 1 – Summer 2024" */
  seriesName: string;
  tier: PackTier;
  status: PackStatus;
  /** Ordered list of card IDs contained in this pack */
  cardIds: string[];
  /** Total retail price in USD cents */
  priceCents: number;
  /** Estimated total market value in USD cents */
  estimatedValueCents: number;
  qrCodeUrl?: string;
  imageUrl?: string;
  /** ISO timestamp when pack was sealed */
  sealedAt: string;
  /** ISO timestamp when pack was sold / opened, if applicable */
  openedAt?: string;
  /** Creator / partner who built this pack */
  creatorId?: string;
  /** Digital passport ID for the QR ecosystem */
  passportId: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Creator ──────────────────────────────────────────────────────────────────

export type CreatorTier = 'Starter' | 'Pro' | 'Elite';

export interface StudioSlot {
  id: string;
  startTime: string; // ISO 8601
  endTime: string;   // ISO 8601
  /** 'stream' | 'break' | 'content' */
  type: 'stream' | 'break' | 'content';
  isBooked: boolean;
  bookedBy?: string;
}

export interface Creator {
  id: string;
  displayName: string;
  handle: string;
  tier: CreatorTier;
  email: string;
  profileImageUrl?: string;
  bio?: string;
  /** IDs of packs this creator has built */
  packIds: string[];
  /** Total earnings in USD cents */
  totalEarningsCents: number;
  /** Pending (unpaid) earnings in USD cents */
  pendingEarningsCents: number;
  /** ISO date of most recent commission payout */
  lastPayoutDate?: string;
  bookedSlots: StudioSlot[];
  createdAt: string;
  updatedAt: string;
}

// ─── Transaction ──────────────────────────────────────────────────────────────

export type TransactionType =
  | 'PackSale'
  | 'CardSale'
  | 'StudioBooking'
  | 'CommissionPayout'
  | 'Refund';

export type PaymentMethod =
  | 'Square'
  | 'Cash'
  | 'CreditCard'
  | 'CryptoUSDC'
  | 'Other';

export interface CommissionSplit {
  /** Creator share in USD cents */
  creatorCents: number;
  /** OPEN LA store allocation in USD cents */
  openAllocationCents: number;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  paymentMethod: PaymentMethod;
  /** Total amount in USD cents */
  amountCents: number;
  commissionSplit?: CommissionSplit;
  /** Square payment ID, if applicable */
  squarePaymentId?: string;
  /** QuickBooks transaction ID, if synced */
  quickbooksId?: string;
  /** Related pack ID, if a pack sale */
  packId?: string;
  /** Related card IDs, if a card sale */
  cardIds?: string[];
  /** Creator ID for commission payouts / studio bookings */
  creatorId?: string;
  /** Customer (buyer) user ID */
  customerId?: string;
  note?: string;
  /** ISO timestamp of the transaction */
  transactedAt: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Digital Passport ─────────────────────────────────────────────────────────

export interface DigitalPassport {
  id: string;
  packId: string;
  packNumber: string;
  seriesName: string;
  tier: PackTier;
  authNumber: string;
  /** e.g. "12 of 50" */
  seriesNumber: string;
  /** Estimated market value in USD cents at time of sealing */
  estimatedValueCents: number;
  cards: Card[];
  qrCodeUrl?: string;
  sealedAt: string;
  /** ISO timestamp when the QR was first scanned */
  firstScannedAt?: string;
}
