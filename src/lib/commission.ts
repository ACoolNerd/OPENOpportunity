/**
 * Partner commission split utilities.
 *
 * Commission model:
 *  - Every pack sale generates a $5 OPEN allocation and a $1 creator bonus
 *    on top of the base pack price.  Remaining revenue goes to OPEN LA.
 *
 * All monetary values are expressed in USD cents to avoid floating-point
 * precision issues.
 */

import type { CommissionSplit, Transaction } from '@/types';

/** Fixed OPEN allocation per pack sale, in USD cents ($5.00) */
export const OPEN_ALLOCATION_CENTS = 500;

/** Fixed creator bonus per pack sale, in USD cents ($1.00) */
export const CREATOR_BONUS_CENTS = 100;

/**
 * Calculates the commission split for a single pack sale.
 *
 * @param salePriceCents - Gross sale price of the pack in USD cents.
 * @returns `CommissionSplit` with creator and OPEN allocation amounts.
 */
export function calculatePackCommission(salePriceCents: number): CommissionSplit {
  const creatorCents = CREATOR_BONUS_CENTS;
  const openAllocationCents = OPEN_ALLOCATION_CENTS;
  return { creatorCents, openAllocationCents };
}

/**
 * Calculates the net revenue that goes to OPEN LA after creator bonus.
 *
 * @param salePriceCents - Gross sale price of the pack in USD cents.
 * @returns Net OPEN LA revenue in USD cents.
 */
export function getOpenLaNetRevenue(salePriceCents: number): number {
  const { creatorCents } = calculatePackCommission(salePriceCents);
  return salePriceCents - creatorCents;
}

/**
 * Aggregates total pending commission for a given creator across a list of
 * transactions.
 *
 * @param creatorId  - The creator's unique ID.
 * @param transactions - Array of all transactions to search.
 * @returns Total pending commission in USD cents.
 */
export function getTotalPendingCommission(
  creatorId: string,
  transactions: Transaction[],
): number {
  return transactions
    .filter(
      (t) =>
        t.type === 'PackSale' &&
        t.creatorId === creatorId &&
        t.commissionSplit != null,
    )
    .reduce((sum, t) => sum + (t.commissionSplit?.creatorCents ?? 0), 0);
}

/**
 * Formats a cent value as a USD currency string.
 * e.g. 1999 → "$19.99"
 */
export function formatUSD(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}
