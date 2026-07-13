/**
 * /api/square-checkout
 *
 * Placeholder endpoint for Square payment processing.
 *
 * In production this endpoint will:
 *  1. Validate the incoming cart / pack IDs.
 *  2. Create a Square Order via the Square Orders API.
 *  3. Create a Square Payment link or process a card nonce.
 *  4. Record the resulting Transaction document in Firestore.
 *  5. Trigger commission split calculation.
 *
 * Environment variables required:
 *   SQUARE_ACCESS_TOKEN  — Square API access token (server-side only)
 *   SQUARE_LOCATION_ID   — Square location ID
 *   SQUARE_ENVIRONMENT   — 'sandbox' | 'production'
 */

import type { NextApiRequest, NextApiResponse } from 'next';

export interface CheckoutRequestBody {
  packIds: string[];
  /** Customer email (optional for guest checkout) */
  customerEmail?: string;
}

export interface CheckoutResponseBody {
  success: boolean;
  checkoutUrl?: string;
  orderId?: string;
  error?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckoutResponseBody>,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const body = req.body as Partial<CheckoutRequestBody>;

  if (!body.packIds || body.packIds.length === 0) {
    return res.status(400).json({ success: false, error: 'packIds is required' });
  }

  // TODO: integrate Square Orders API
  // const squareClient = new SquareClient({ accessToken: process.env.SQUARE_ACCESS_TOKEN });
  // const order = await squareClient.ordersApi.createOrder({ ... });
  // const payment = await squareClient.checkoutApi.createPaymentLink({ ... });

  return res.status(200).json({
    success: true,
    checkoutUrl: '/retail?checkout=pending',
    orderId: `order-placeholder-${Date.now()}`,
  });
}
