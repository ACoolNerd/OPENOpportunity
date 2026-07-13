/**
 * Inventory rotation utilities.
 *
 * OPENOpportunity operates a 90-day rotation policy: any pack that has been
 * in inventory for 90 days without being sold is flagged for repricing,
 * re-packaging, or promotion.
 */

import type { Pack } from '@/types';

/** Number of days before a pack is considered "stale" */
export const ROTATION_DAYS = 90;

/**
 * Returns `true` if the given pack has been in inventory for more than
 * `ROTATION_DAYS` calendar days without being sold.
 */
export function isPackStale(pack: Pack): boolean {
  if (pack.status !== 'Available') return false;
  const sealedDate = new Date(pack.sealedAt);
  const now = new Date();
  const diffMs = now.getTime() - sealedDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays > ROTATION_DAYS;
}

/**
 * Returns the number of days a pack has been in inventory.
 * Returns `null` for packs that are no longer available.
 */
export function daysInInventory(pack: Pack): number | null {
  if (pack.status !== 'Available') return null;
  const sealedDate = new Date(pack.sealedAt);
  const now = new Date();
  const diffMs = now.getTime() - sealedDate.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Filters a list of packs and returns those eligible for rotation.
 */
export function getStalePacks(packs: Pack[]): Pack[] {
  return packs.filter(isPackStale);
}

/**
 * Returns the ISO date string for when rotation is due, given a sealed date.
 */
export function getRotationDueDate(sealedAt: string): string {
  const date = new Date(sealedAt);
  date.setDate(date.getDate() + ROTATION_DAYS);
  return date.toISOString();
}
