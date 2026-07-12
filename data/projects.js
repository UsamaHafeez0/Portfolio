export const projects = [
  {
    slug: "braid",
    title: "Braid — Core Banking Dashboard",
    cardTitle: "Braid",
    tag: "Fintech · Web",
    cardDesc: "Core banking dashboard used by US banks.",
    featured: true,
    cover: "/images/braid-cover.jpg",
    oneLiner:
      "Braid is banking infrastructure that lets community banks sponsor fintech programs. I built its core dashboard — the surface where banks run ledger, payments, fraud, and compliance operations.",
    meta: {
      Role: "Sole engineer & architect",
      Stack: "Next.js, Tailwind",
      Scope: "Enterprise, multi-tenant",
      Website: { label: "braidfi.com", href: "https://braidfi.com" },
    },
    tldr: [
      "Designed, architected, and built the entire dashboard single-handedly.",
      "In production at US banks and international financial institutions running fintech, payroll, and cross-border programs.",
      "Covers the real-time ledger, ACH/wire/FedNow/RTP payment ops, fraud case management, OFAC screening, and 314(a) compliance.",
    ],
    capabilities: [
      { label: "Real-time ledger & reconciliation", target: "payment-operations" },
      { label: "Payment ops — ACH, wires, FedNow, RTP", target: "payment-operations" },
      { label: "Fraud & risk — velocity limits, alerts, cases", target: "fraud-and-compliance-one-queue" },
      { label: "Compliance — OFAC, 314(a), BSA/AML", target: "fraud-and-compliance-one-queue" },
      { label: "Accounts, customers & counterparties", target: "accounts-in-one-operational-view" },
      { label: "Programs, multi-tenant & kill switch", target: "programs-products-and-the-kill-switch" },
      { label: "Real-time analytics & reporting", target: "statements-and-reporting" },
    ],
    sections: [
      {
        heading: "The problem",
        body: "Braid deploys a 'sidecar core' beside a bank's existing core system, giving community banks the rails to sponsor fintech programs — virtual accounts, a real-time ledger, and direct access to FedNow, ACH, wire, and RTP. All of that power needed one operational surface: a dashboard where bank teams post and reconcile transactions, manage programs, and stay compliant. Legacy tools weren't built for any of this.",
        images: [],
      },
      {
        heading: "Accounts, in one operational view",
        body: "Every account a bank runs — checking, savings, funding, escrow — in a single sortable table, and one click deeper the full picture of any account: live, available, and settled balances, pending credits and debits, funds on hold, related fees, limits and counterparties, plus payment creation and a full audit timeline.",
        images: [
          {
            src: "/images/braid-accounts.jpg",
            caption: "The Accounts module — types, ownership, and status across the whole book (demo data).",
          },
          {
            src: "/images/braid-account-detail.jpg",
            caption: "Account detail — balances, pending activity, holds, and audit timeline (demo data).",
          },
        ],
      },
      {
        heading: "Customers and KYC",
        body: "Individuals and businesses from list to profile: CIP verification status sits in every row, and one click deeper is the full KYC picture — business profiles with beneficial owners, OFAC clearance, masked IDs, and audit timelines; individual profiles with identity documents, KYC provider, and product assignment. Fintech-sponsored customers carry their FBO product lineage right in the table.",
        images: [
          {
            src: "/images/braid-individuals.jpg",
            caption: "Individuals list with CIP status.",
          },
          {
            src: "/images/braid-businesses.jpg",
            caption: "Businesses with FBO product lineage.",
          },
          {
            src: "/images/braid-business-profile.jpg",
            caption: "Business profile — UBOs, OFAC, timeline.",
          },
          {
            src: "/images/braid-individual-profile.jpg",
            caption: "Individual profile — documents and KYC.",
          },
        ],
      },
      {
        heading: "Payment operations",
        body: "The full lifecycle of money movement. Payments start in a guided create flow — transfer, adjustment, wire, or fee, with counterparty search built in — and every transaction gets a detail view carrying its OFAC check, processing status, and a compliance-reviewed timeline. Behind that sit the rails: ACH and wire file processing with per-file pending, posted, and NOC counts, and settlement runs that reconcile debits and credits down to the file.",
        images: [
          {
            src: "/images/braid-txn-detail.jpg",
            caption: "Transaction detail — status, OFAC screening, and compliance timeline.",
          },
          {
            src: "/images/braid-txn-new.jpg",
            caption: "Creating a payment — transfer, adjustment, wire, or fee.",
          },
          {
            src: "/images/braid-ach.jpg",
            caption: "ACH processing — file uploads with pending, posted, and NOC counts.",
          },
          {
            src: "/images/braid-ach-settlement.jpg",
            caption: "ACH settlement files with reconciled debit and credit totals.",
          },
          {
            src: "/images/braid-wire-processing.jpg",
            caption: "Wire batch processing history.",
          },
          {
            src: "/images/braid-wire-settlement.jpg",
            caption: "Wire settlement — run settlements and return files.",
          },
        ],
      },
      {
        heading: "Fraud and compliance, one queue",
        body: "OFAC hits, dual approvals, monitoring flags, and processing errors land in a single alert queue — and each alert opens into a full investigation: analyst notes, RFI tracking, document uploads, and a resolution timeline. OFAC matches come scored against watchlists with the counterparty blocked until reviewed, velocity limits enforce transaction rules automatically, and 314(a) batch screening runs from the same surface.",
        images: [
          {
            src: "/images/braid-alerts.jpg",
            caption: "The alerts queue — OFAC matches, dual approvals, and monitoring flags awaiting triage.",
          },
          {
            src: "/images/braid-alert-detail.jpg",
            caption: "Alert investigation — notes, RFIs, documents, and resolution timeline.",
          },
          {
            src: "/images/braid-ofac.jpg",
            caption: "OFAC screening — watchlist matches scored, counterparty blocked until resolved.",
          },
          {
            src: "/images/braid-velocity.jpg",
            caption: "Velocity limits — transaction rules with max amounts, counts, and decline actions.",
          },
          {
            src: "/images/braid-314a.jpg",
            caption: "314(a) file uploads — batch screening with records checked and alerts created.",
          },
        ],
      },
      {
        heading: "Programs, products, and the kill switch",
        body: "One platform, many programs: banks run multiple fintech programs and product lines side by side — each program with its own operating model and ODFI, each product with its own settlement contacts, CIP configuration, interest terms, and OFAC thresholds, per tenant. Every operational lever stays in the bank's hands, down to API access with IP whitelisting — and the kill switch can pause a program, account, or counterparty instantly.",
        images: [
          {
            src: "/images/braid-program.jpg",
            caption: "Program configuration — operating model, ODFI, and status.",
          },
          {
            src: "/images/braid-product.jpg",
            caption: "Product configuration — settlement, CIP, interest, and OFAC thresholds.",
          },
          {
            src: "/images/braid-devcontrols.jpg",
            caption: "Developer controls — API access locked down with IP whitelisting.",
          },
        ],
      },
      {
        heading: "Statements and reporting",
        body: "Pick an entity and a date range, and the ledger does the rest: a statement summary with starting and ending balances, balance change for the period, and transaction rollups by type and direction — exportable to CSV or PDF. The same ledger data feeds reconciliation uploads and exception review.",
        images: [
          {
            src: "/images/braid-statement-report.jpg",
            caption: "A generated statement — balances, balance change, and per-type transaction summary with CSV/PDF export.",
          },
          {
            src: "/images/braid-statement.jpg",
            caption: "Statement parameters — entity and date range in, report out.",
          },
        ],
      },
      {
        heading: "Impact",
        body: "",
        bullets: [
          "In production at US and international financial institutions — daily operations, compliance, and risk run through it.",
          "A single system of record that replaced fragmented legacy tooling.",
          "Trusted with mission-critical money movement across ACH, wires, FedNow, and RTP.",
          "Designed, architected, and delivered solo — from UX to backend integrations.",
        ],
        images: [],
      },
    ],
  },
  {
    slug: "drops",
    title: "Drops — Grocery E-Commerce App",
    cardTitle: "Drops",
    tag: "Consumer · Mobile",
    cardDesc: "Kuwait's leading grocery delivery app.",
    featured: true,
    cover: "/images/drops-cover.jpg",
    oneLiner:
      "One of Kuwait's leading grocery delivery apps, with hundreds of thousands of downloads. My work spans performance, revenue features, and UX.",
    meta: {
      Role: "Mobile engineer, in-house team",
      Stack: "Flutter",
      Scale: "Hundreds of thousands of downloads",
    },
    tldr: [
      "Cut API response times by up to 3x — faster ordering, smoother journeys.",
      "Work spans wallet payments, gift cards, loyalty, marketplace, and shopping lists.",
      "Drove the homepage experience forward; co-designed a modular data layer that let Drops switch core platforms without rewrites.",
    ],
    capabilities: [
      { label: "Wallet payments", target: "wallet" },
      { label: "Digital gift cards", target: "digital-gift-cards" },
      { label: "Loyalty program", target: "loyalty" },
      { label: "Marketplace", target: "the-marketplace" },
      { label: "Homepage", target: "the-homepage" },
      { label: "OTP verification — SMS & email", target: "performance-and-trust" },
    ],
    sections: [
      {
        heading: "The problem",
        body: "In a competitive delivery market, Drops needed a faster, more reliable app, smoother shopping journeys, and new features to support growth and marketing.",
        images: [],
      },
      {
        heading: "The homepage",
        body: "The homepage is the daily entry point for hundreds of thousands of shoppers. My work here has focused on how categories, special offers, and campaigns surface — with load-time performance kept front and center.",
        images: [
          {
            src: "/images/drops-home.jpg",
            caption: "The homepage — campaigns, categories, and offers, tuned for load time.",
            phone: true,
          },
        ],
      },
      {
        heading: "The marketplace",
        body: "Drops grew beyond groceries with a marketplace vertical, and I built its mobile experience: listing pages with offers, deals, and quantity controls, and product detail pages carrying promotions, certifications, and recommendations — all on the same performant catalog foundation as the core app.",
        phones: true,
        images: [
          {
            src: "/images/drops-plp.jpg",
            caption: "Marketplace listing — offers, deals, and quick add in the grid.",
          },
          {
            src: "/images/drops-product.jpg",
            caption: "Product detail — promotions, certifications, and recommendations.",
          },
        ],
      },
      {
        heading: "Wallet",
        body: "Drops Wallet brought stored balance into the app: top-ups, refunds returned as instant credit, and one-tap payment — a faster way to pay and a retention lever for marketing campaigns.",
        phones: true,
        images: [
          {
            src: "/images/drops-wallet.jpg",
            caption: "Drops Wallet — live balance, top-ups, and transaction history.",
          },
          {
            src: "/images/drops-wallet-recharge.jpg",
            caption: "Recharging the wallet — preset or custom amounts.",
          },
          {
            src: "/images/drops-wallet-payment.jpg",
            caption: "One-tap top-up with a saved card.",
          },
        ],
      },
      {
        heading: "Loyalty",
        body: "The loyalty program turns every order into a reason to come back: points earned on purchases, tracked in the app, and redeemable against future baskets — built to plug directly into campaigns.",
        phones: true,
        images: [
          {
            src: "/images/drops-loyalty.jpg",
            caption: "True Blue rewards — points, tier progress, and recent activity.",
          },
          {
            src: "/images/drops-loyalty-family.jpg",
            caption: "Family tier — the top tier unlocked.",
          },
          {
            src: "/images/drops-loyalty-zero.jpg",
            caption: "The zero-points state that onboards shoppers into earning.",
          },
        ],
      },
      {
        heading: "Digital gift cards",
        body: "Gift cards let anyone send Drops credit: purchased in-app, delivered by a branded email, and redeemable in a tap.",
        phones: true,
        images: [
          {
            src: "/images/drops-giftcard.jpg",
            caption: "Send a gift card — amount, recipient, and a personal message.",
          },
          {
            src: "/images/drops-giftcard-custom.jpg",
            caption: "Custom gift amounts with instant validation.",
          },
        ],
      },
      {
        heading: "Performance and trust",
        body: "The invisible work that moved the numbers: API optimizations that cut response times up to 3x across the shopping journey, secure OTP verification over SMS and email for registered and guest users, and a modular data layer — shared SFCC and Magento packages — that let Drops switch commerce platforms without a rewrite.",
        images: [
          {
            src: "/images/drops-orders.jpg",
            caption: "Order tracking — live status from placement to delivery.",
            phone: true,
          },
        ],
      },
      {
        heading: "Impact",
        body: "",
        bullets: [
          "API responses up to 3x faster across the shopping journey.",
          "A top grocery delivery platform in Kuwait — hundreds of thousands of downloads.",
          "Strengthened and shipped revenue features: wallet, gift cards, loyalty, and marketplace.",
          "Modular data layer let Drops switch core platforms without a costly rewrite.",
        ],
        images: [],
      },
    ],
  },
  {
    slug: "drops-warehouse",
    title: "Drops — Warehouse Operations App",
    cardTitle: "Drops Warehouse",
    tag: "Operations · Mobile",
    cardDesc: "The app running Drops' fulfillment, built solo.",
    cover: "/images/drops-warehouse-cover.jpg",
    oneLiner:
      "The internal app that runs Drops' warehouse — pickers, quality checkers, dispatchers, and drivers — built end-to-end as a solo engineer.",
    meta: {
      Role: "Solo engineer — design to deploy",
      Stack: "Flutter",
      Scope: "4 role-based workflows",
    },
    tldr: [
      "Replaced manual warehouse processes with a single system of record.",
      "Role-based workflows: each of the 4 roles sees exactly what they need.",
      "Barcode scanning, real-time order status, and structured task handoffs.",
    ],
    capabilities: [
      { label: "Order picking", target: "pick-scan-hand-off" },
      { label: "Barcode scanning", target: "pick-scan-hand-off" },
      { label: "Quality checks", target: "quality-check" },
      { label: "Dispatch", target: "dispatch" },
      { label: "Driver handoffs", target: "deliver" },
      { label: "Real-time status", target: "dispatch" },
    ],
    sections: [
      {
        heading: "The problem",
        body: "Drops' fulfillment ran on manual, paper-based processes — slow, error-prone, and opaque. The company needed to digitize the full workflow from picking to delivery handoff, and I built the app end-to-end, solo: one Flutter codebase, four role-based experiences. The screens below are the design wireframes the app was built from.",
        images: [],
      },
      {
        heading: "Pick, scan, hand off",
        body: "Pickers work a queue of today's pickups, accept orders, and pick item by item with barcode scanning — quantities verified against the order, mismatches flagged on the spot — then hand the completed order to quality check with one tap.",
        phones: true,
        images: [
          {
            src: "/images/drops-wh-listing.jpg",
            caption: "The picker's queue — today's pickups with bins and quantities.",
          },
          {
            src: "/images/drops-wh-scan.jpg",
            caption: "Barcode-verified picking with quantity controls.",
          },
          {
            src: "/images/drops-wh-toqc.jpg",
            caption: "Order handed off to quality check.",
          },
        ],
      },
      {
        heading: "Quality check",
        body: "Checkers re-verify every item — scan again, confirm counts per bag and box, flag missing or damaged products with reasons — before the order is cleared for dispatch.",
        phones: true,
        images: [
          {
            src: "/images/drops-wh-qc-check.jpg",
            caption: "Item-by-item verification with per-container scanning.",
          },
          {
            src: "/images/drops-wh-qc-done.jpg",
            caption: "Quality verified — order cleared for dispatch.",
          },
        ],
      },
      {
        heading: "Dispatch",
        body: "Dispatchers see the day's orders by zone with bag and box counts, assign drivers from the roster, and confirm each dispatch — keeping the handoff between warehouse and road accountable.",
        phones: true,
        images: [
          {
            src: "/images/drops-wh-dispatch.jpg",
            caption: "Today's dispatches by zone, ready to assign.",
          },
          {
            src: "/images/drops-wh-assign.jpg",
            caption: "Assigning a driver from the roster.",
          },
          {
            src: "/images/drops-wh-dispatched.jpg",
            caption: "Dispatch confirmed with full order details.",
          },
        ],
      },
      {
        heading: "Deliver",
        body: "Drivers accept deliveries by zone and distance, get the address, map, and customer contact for each order, and close the loop with delivery confirmation — every order accounted for from shelf to doorstep.",
        phones: true,
        images: [
          {
            src: "/images/drops-wh-deliveries.jpg",
            caption: "The driver's queue — deliveries by zone and distance.",
          },
          {
            src: "/images/drops-wh-deliver-detail.jpg",
            caption: "Delivery detail — address, map, and customer contact.",
          },
          {
            src: "/images/drops-wh-delivered.jpg",
            caption: "Delivered — the loop closed.",
          },
        ],
      },
      {
        heading: "Impact",
        body: "",
        bullets: [
          "Paper-based warehouse operations replaced with a single system of record.",
          "Faster dispatch and fewer errors across all four fulfillment roles.",
          "Real-time order visibility for managers, from picking to handoff.",
          "A production-critical system scoped, architected, and shipped solo.",
        ],
        images: [],
      },
    ],
  },
  {
    slug: "tuam",
    title: "Tuam — Restaurant Ordering & Delivery",
    cardTitle: "Tuam",
    tag: "Platform · Mobile",
    cardDesc: "White-label ordering + rider apps for restaurants.",
    featured: true,
    cover: "/images/tuam-cover.jpg",
    oneLiner:
      "A white-label platform that lets restaurants launch branded ordering and delivery apps in days — customer app and rider app, both built solo.",
    meta: {
      Role: "Sole Flutter engineer, both apps",
      Stack: "Flutter",
      Scope: "Customer app + rider app",
    },
    tldr: [
      "Config-driven theming: new branded restaurant apps launch in days, not months.",
      "Full customer journey — browsing, customization, checkout, live order tracking.",
      "Rider app with job management, dispatch communication, and offline tolerance.",
    ],
    capabilities: [
      { label: "White-label branding & theming", target: "one-design-system-many-brands" },
      { label: "Menu browsing & item customization", target: "the-customer-app" },
      { label: "Checkout & payments", target: "menu-to-checkout" },
      { label: "Live order tracking", target: "menu-to-checkout" },
      { label: "Rider job management", target: "the-rider-app" },
      { label: "Offline-tolerant workflows", target: "the-rider-app" },
    ],
    sections: [
      {
        heading: "The problem",
        body: "Restaurants wanted their own branded ordering experience without building their own tech. Tuam needed one codebase that could ship many branded apps, plus reliable last-mile delivery.",
        images: [],
      },
      {
        heading: "The customer app",
        body: "Every restaurant gets its own branded storefront on one codebase: onboarding and social auth, a home screen with categories and featured items, and full menu browsing — colors, logo, and content all driven by configuration.",
        phones: true,
        images: [
          {
            src: "/images/tuam-main.jpg",
            caption: "Home — categories, featured restaurants, and search.",
          },
          {
            src: "/images/tuam-restaurant.jpg",
            caption: "The restaurant storefront — menu sections and items.",
          },
          {
            src: "/images/tuam-signup.jpg",
            caption: "Onboarding — sign up, sign in, and social auth.",
          },
        ],
      },
      {
        heading: "Menu to checkout",
        body: "Item customization, cart, and checkout with integrated payments, then real-time status all the way to the doorstep — the conversion path built from reusable components that hold up across every branded variant.",
        phones: true,
        images: [
          {
            src: "/images/tuam-product.jpg",
            caption: "Item detail with options and customization.",
          },
          {
            src: "/images/tuam-cart.jpg",
            caption: "Cart — quantities, notes, and totals.",
          },
          {
            src: "/images/tuam-track.jpg",
            caption: "Live order tracking from kitchen to doorstep.",
          },
        ],
      },
      {
        heading: "The rider app",
        body: "The platform's second app runs the last mile: riders sign in under their branch, see today's orders and kilometers at a glance, and work a queue of pending deliveries with route views and cash-on-delivery details — engineered to keep working in low-connectivity areas.",
        phones: true,
        images: [
          {
            src: "/images/tuam-rider-dashboard.jpg",
            caption: "Rider dashboard — today's totals and pending deliveries with routes.",
          },
          {
            src: "/images/tuam-rider-login.jpg",
            caption: "Rider login — branch and rider credentials.",
          },
        ],
      },
      {
        heading: "One design system, many brands",
        body: "White-label isn't a paint job. A defined token system — palette, tints, and a full Noto Sans type ramp — flows through every screen of both apps, so launching a new restaurant brand means changing configuration, not code.",
        images: [
          {
            src: "/images/tuam-styleguide.jpg",
            caption: "The Tuam style guide every branded build inherits.",
            phone: true,
          },
        ],
      },
      {
        heading: "Impact",
        body: "",
        bullets: [
          "Restaurants launch fully branded apps in days instead of months.",
          "One shared codebase powers every branded variant — no forks, no duplication.",
          "Smooth ordering with real-time updates for customers; reliable workflows for riders.",
          "Two production apps delivered end-to-end, solo.",
        ],
        images: [],
      },
    ],
  },
  {
    slug: "litte",
    title: "Litte — Local Events & Social Discovery",
    cardTitle: "Litte",
    tag: "Social · Mobile",
    cardDesc: "Discover events, go live, connect nearby.",
    cover: "/images/litte-cover.jpg",
    oneLiner:
      "A social discovery app for everything happening nearby — explore events, host your own, go live, and run local ads, all in one ecosystem.",
    meta: {
      Role: "Core Flutter engineer",
      Stack: "Flutter, AWS Amplify, GraphQL",
      Scope: "Events, live, social, ads",
    },
    tldr: [
      "Event discovery, hosting, live streams, and real-time feeds in one app.",
      "Real-time backend on AWS Amplify GraphQL — auth, feeds, user content.",
      "Ad modules that let local businesses promote events in-app.",
    ],
    capabilities: [
      { label: "Nearby event discovery", target: "discover-what-s-happening-nearby" },
      { label: "Real-time trending feeds", target: "discover-what-s-happening-nearby" },
      { label: "Media-rich profiles", target: "discover-what-s-happening-nearby" },
      { label: "Event hosting & ticketing", target: "host-attend-and-get-paid" },
      { label: "Live streams & chat", target: "go-live" },
      { label: "Local ads & promotion", target: "local-ads-built-in" },
    ],
    sections: [
      {
        heading: "The problem",
        body: "Local events, live content, and social connection were scattered across separate apps. Litte set out to combine discovery, hosting, live interaction, and local advertising in a single experience — and I built the Flutter app end-to-end on an AWS Amplify GraphQL backend handling auth, real-time updates, and user content.",
        images: [],
      },
      {
        heading: "Discover what's happening nearby",
        body: "Real-time feeds of everything around you — live events, streams, and hot spots filtered by category and radius, a global trending page for what's blowing up beyond your city, and media-rich creator profiles carrying events, videos, and follower stats.",
        phones: true,
        images: [
          {
            src: "/images/litte-feed.jpg",
            caption: "The nearby feed — live events around you, filtered by category.",
          },
          {
            src: "/images/litte-trending.jpg",
            caption: "Lituation — the globally trending events page.",
          },
          {
            src: "/images/litte-profile.jpg",
            caption: "Creator profiles with events, videos, and followers.",
          },
        ],
      },
      {
        heading: "Host, attend, and get paid",
        body: "Anyone can host: create an event with categories, location on maps, and ticket pricing in one form — and attendees buy VIP or economy tickets with seat counts and in-app payment, end to end.",
        phones: true,
        images: [
          {
            src: "/images/litte-create-event.jpg",
            caption: "Creating an event — details, category, maps, and tickets.",
          },
          {
            src: "/images/litte-ticket.jpg",
            caption: "Buying a ticket — type, seats, and total.",
          },
        ],
      },
      {
        heading: "Go live",
        body: "Streams are first-class: tag your stream by category, go live to nearby audiences, and interact in real time — comments, gifts, and adding friends into the stream — all kept smooth under media-heavy load.",
        images: [
          {
            src: "/images/litte-live.jpg",
            caption: "Going live — tagged streams broadcast to the nearby feed.",
            phone: true,
          },
        ],
      },
      {
        heading: "Local ads, built in",
        body: "The monetization loop for local businesses and creators: set a destination, target an audience by age, gender, and location, pick a daily budget and duration, preview the estimated reach, then review and launch the campaign — without leaving the app.",
        phones: true,
        images: [
          {
            src: "/images/litte-promo.jpg",
            caption: "Campaign setup — destination, audience, budget, and duration.",
          },
          {
            src: "/images/litte-promo-review.jpg",
            caption: "Review and launch — the campaign summary before payment.",
          },
        ],
      },
      {
        heading: "Impact",
        body: "",
        bullets: [
          "Events, live streams, social feeds, and local ads unified in one app.",
          "Real-time experience on an AWS Amplify GraphQL backend built for fast iteration.",
          "A complex, media-rich Flutter app delivered with strong cross-stack execution.",
        ],
        images: [],
      },
    ],
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}
