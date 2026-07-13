# Security and access model

- Stephen Smalls and Keith McPherson are separate `super_admin` identities; never share credentials.
- The prototype accepts server-side admin tokens only from environment variables. Replace this with an identity provider supporting WebAuthn/passkeys or TOTP MFA before production.
- Require MFA for hosting, GitHub, domain/DNS, Square, QuickBooks, email, cloud storage, and password-manager accounts.
- Use least-privilege Square and QuickBooks OAuth scopes. Never expose access tokens in browser code.
- Store production entries in an encrypted managed database, not the prototype JSON store. Encrypt backups and define deletion/retention procedures.
- Verify Square webhook signatures, use idempotency keys, and maintain an append-only audit log before enabling payments or inventory mutation.
- Protect exports as personal/confidential data. Log access but never log tokens, passwords, full payment details, or secrets.
- The Integration Console is deliberately simulation-only. Production Square and QuickBooks writes require separate OAuth connections, least-privilege scopes, signed webhook verification, idempotency, reconciliation, and an append-only audit trail.
- Rotate secrets on staff changes or suspected exposure. Use separate development, staging, and production credentials.
