# Deployment

## Local

1. Install Node 20+ and run `npm install`.
2. Copy `.env.example` to `.env`; generate unique 32+ character values for session/admin secrets.
3. Keep `ENTRY_CAMPAIGN_ENABLED=false` until final approvals.
4. Run `npm test`, then `npm start`.

## Production checklist

- Deploy to a Node-compatible host (Render, Railway, Fly.io, or container platform).
- Set `PUBLIC_BASE_URL` to the final HTTPS domain and add every environment variable in the host's encrypted secret manager.
- Put the application behind managed TLS and a web application firewall.
- Replace token login and JSON storage with an MFA identity provider and managed encrypted database.
- Point a controlled subdomain such as `opportunity.openlastore.com` or an approved ACool domain to the deployment.
- Update printed QR targets only after the final domain is verified; use redirect records so destinations can change without reprinting.
- Connect Square and QuickBooks in sandbox/test mode first. Reconcile test sales, refund reversals, fees, commissions, and month reset before production.
- Obtain written permission for all logos, names, prize suppliers, card images, and partner likenesses used in marketing.

No hosting account, DNS record, Square account, QuickBooks company, or GitHub environment is modified automatically by this repository.
