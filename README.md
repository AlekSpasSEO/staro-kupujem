# RetroBid

**Good finds. Great bids.** A responsive auction marketplace inspired by the simple, tactile web of the late 1990s and early 2000s. Built for North Macedonia with EUR auction prices and a $100 USD/year Pro membership concept.

## Current delivery

This is an interactive **sample marketplace**, not a live money service. It starts with **1,000 fictional sample auctions**, generated from curated item templates across Clothing, Home items, Tools, Vehicles, Property, Toys & games, and Furniture. Photos are illustrative Unsplash images. No Reklama5, Pazar3 or Facebook content has been copied. The catalog is marked as sample throughout.

- Responsive desktop, tablet and phone layouts; compact mobile navigation
- Search by title, category, subcategory and description
- Filters for category, subcategory, city, condition, price, delivery and closing time
- Six sort modes, pagination, grid/list views and saved finds
- Auction details, minimum bid increments, closing-time checks and full-bid balance reservations
- Wallet with available/reserved balances and sample credit ledger
- Pro preview gating **both bidding and selling** in Vehicles and Property
- Seller listing form with ownership, availability and 30% commission acknowledgment
- Authorized JSON feed import (up to 1,000 rows), duplicate-source checks, source attribution, permission reference and separate seller confirmation before sample publication
- Dependency-free Node 24 + SQLite server for persistent, shared sample auctions, isolated browser sessions, atomic bid updates, release of the previous leader's reservation, and sample winner settlement
- GitHub Pages deployment workflow; Pages runs the browser-local preview

## Run

Requires Node.js 24 or later. No installation or dependencies needed.

```sh
npm start
```

Open http://127.0.0.1:4175. SQLite data lives in `data/retrobid.sqlite` (ignored by Git). `PORT`, `DATA_DIR` and `SECURE_COOKIES=1` can be set through environment variables. The server binds to loopback; place it behind an HTTPS reverse proxy for an internal deployment. Sessions use a random, HttpOnly, SameSite=Strict cookie. The server deliberately provides sample credit and free Pro activation, and must not be used to hold real funds.

For static hosting, serve **`public/`**, never the repository root. The static preview stores sample actions on the visitor's device and never sends account records to an external service. The Node server is not deployed by GitHub Pages or the static Sites preview. Static preview reservations do not simulate other bidders; the Node server supports multiple sessions and releases holds when outbid.

```sh
npm run check
```

## Imports

Use **Import desk** in the footer to download a JSON template and import an authorized feed. Required fields:

```json
[
  {
    "title": "Bentwood chair",
    "category": "furniture",
    "subcategory": "Chairs",
    "price": 3500,
    "city": "Skopje",
    "sourceUrl": "https://example.com/authorized-listing",
    "permissionReference": "Seller consent reference",
    "description": "Authorized description",
    "image": "chair"
  }
]
```

Prices are integer EUR cents. Category IDs: `clothing`, `home`, `tools`, `vehicles`, `property`, `toys`, `furniture`. Importing records does not contact sellers. Review each source, contact the seller outside the app, verify permission and availability, then confirm. Imports and permission references remain private to the importing session. Publication creates a sample auction. Do not include private contact details. There is no unattended scraping or Facebook access in the app.

## Auction rules

The next bid is at least the current price plus 5%, rounded up to a whole euro, with a €1 minimum increment. The full leading bid is reserved; raising your own bid replaces the previous hold. The server releases the previous bidder's hold atomically. Ended auctions reject bids. Sample settlement is lazy on the next API request: the winning hold is deducted once and a 30% commission / 70% seller split is recorded on the auction. No actual seller payout is made. Delivery is separate.

## Before live trading

Connect verified identity and account recovery; replace preview endpoints with verified payment-provider checkout, signed webhooks, an auditable money ledger, payouts and reconciliation; implement paid Pro renewal/cancellation; require seller verification, licensed feeds and actual product photos; add owner roles, moderation, contact workflows, notifications, disputes, cancellation/refunds and operational monitoring. Review applicable marketplace, consumer, payment and property requirements with qualified local support. Current sessions are browser-bound preview identities, not verified customer accounts.

The live 30% fee is modeled as a deduction from seller proceeds. At a €100 final bid, the buyer pays €100, the seller receives €70 and RetroBid retains €30. Pro is priced at **$100 USD per year**, separate from the EUR wallet. No currency conversion or live subscription is implemented.

## Deploy to GitHub Pages

In the repository's **Settings → Pages**, select **GitHub Actions** as the build source. The included workflow validates source and publishes only `public/` on pushes to `main`. This publishes a sample preview, not the Node/SQLite server. A separate private Sites preview may also be deployed from the same public directory.

## Files

`public/` contains the app, catalog and shared bid rules; `server.mjs` provides the persistent sample API; `test/` contains auction and import invariant tests. Fonts use Google Fonts with local fallbacks; images use Unsplash with graceful fallback text.
