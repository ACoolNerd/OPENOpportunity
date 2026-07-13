# OPEN Opportunity design system

This branch combines Google Material 3 interaction principles with Claude-style editorial warmth while keeping OPEN LA as the unmistakable visual owner.

## Principles

1. **OPEN first.** Olive, lime, black, cream, supplied photography, and the OPEN mark lead every surface.
2. **Clear before clever.** Navigation, buttons, forms, pricing, disclaimers, and status indicators use direct language and predictable placement.
3. **Warm, not sterile.** Cream editorial panels, serif story copy, irregular image crops, and restrained orange accents create human texture.
4. **Purposeful motion.** Animation confirms state or reveals hierarchy. It respects `prefers-reduced-motion`.
5. **Accessible by default.** Strong contrast, visible focus, 44px minimum touch targets, semantic landmarks, descriptive alt text, and readable measures.
6. **Trust is a feature.** Every mystery product carries disclosures. Campaign, payment, inventory, and legal readiness are visible rather than implied.

## Tokens

- Ink: `#090b09`
- Surface: `#11150e`
- OPEN olive: `#6b8735`
- Opportunity lime: `#b7df38`
- Editorial cream: `#f6f1e7`
- Warm orange: `#d97757`
- Sky utility: `#6a9bcc`
- Quiet gray: `#b0aea5`

## Type

- Display: `Poppins`, `Arial Black`, sans-serif
- Editorial: `Lora`, `Georgia`, serif
- Utility: system sans-serif

## Components

- Buttons have one clear primary action and a quieter secondary action.
- Cards use subtle corners, not pill-shaped containers everywhere.
- Product tiers show price, contents, passport status, and disclosure together.
- Photography is never used as an unreadable text background without a solid gradient scrim.
- Admin and partner functions stay visually separate from public calls to action.

## Responsive behavior

- Desktop navigation collapses to an accessible menu below 900px.
- Product, pathway, trust, and partner grids collapse from three columns to one.
- Large typography uses `clamp()` and never creates horizontal scroll.
- Forms stack on narrow screens and preserve 44px controls.

## Content voice

Direct, optimistic, community-minded, and specific. Avoid guaranteed-value language, gambling language, artificial urgency, or investment claims.
