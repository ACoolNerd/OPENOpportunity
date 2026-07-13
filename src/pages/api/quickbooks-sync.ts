/**
 * /api/quickbooks-sync
 *
 * Placeholder endpoint for QuickBooks Online financial reconciliation.
 *
 * In production this endpoint will:
 *  1. Pull unsynced Transaction records from Firestore.
 *  2. Map each transaction to a QuickBooks Sales Receipt or Invoice.
 *  3. Push records to QuickBooks via the QuickBooks Online API (OAuth 2.0).
 *  4. Update each Firestore transaction with the resulting `quickbooksId`.
 *  5. Log the sync event for the admin dashboard.
 *
 * Environment variables required:
 *   QB_CLIENT_ID       — QuickBooks app client ID
 *   QB_CLIENT_SECRET   — QuickBooks app client secret
 *   QB_REFRESH_TOKEN   — Long-lived refresh token
 *   QB_REALM_ID        — QuickBooks company (realm) ID
 *   QB_ENVIRONMENT     — 'sandbox' | 'production'
 */

import type { NextApiRequest, NextApiResponse } from 'next';

export interface SyncRequestBody {
  /** Optional: sync only transactions created after this ISO date */
  since?: string;
}

export interface SyncResponseBody {
  success: boolean;
  syncedCount?: number;
  lastSyncedAt?: string;
  error?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SyncResponseBody>,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  // TODO: integrate QuickBooks Online API
  // const qbClient = new OAuthClient({ ... });
  // const unsyncedTransactions = await getUnsyncedTransactions(body.since);
  // for (const tx of unsyncedTransactions) { await pushToQuickBooks(qbClient, tx); }

  return res.status(200).json({
    success: true,
    syncedCount: 0,
    lastSyncedAt: new Date().toISOString(),
  });
}
