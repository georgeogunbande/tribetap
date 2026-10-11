# FlatPurse Flow pricing strategy (final)

Prepared 2026-10-11. All prices CAD. Based on the Flow feature list, the Stripe Card Plan (Oct 9, 2026) and competitor research. Competitor prices come from third-party listings, not vendor pages; re-check before publishing. Every cost below is an estimate unless stated.

## Decisions

1. **No permanent free tier at launch.** Use a 14-day no-card trial. Reason: card payments earn Flow nothing in Phase 1 (salons pay Stripe directly), so a free user costs hosting and support and pays nothing.
2. **Reconsider a free Starter in Phase 2**, only if Stripe approves wholesale pricing and only while the salon processes cards through Flow (Square's model). The Stripe plan values 0.3% markup on C$30,000 a month at about C$90 a month per salon.
3. **One real price per tier.** No strikethrough list prices and no month-13 price jump. Canada's Competition Act treats an "ordinary price" claim as misleading if the higher price was not genuinely charged; have a lawyer check any struck-through price.
4. **Card payments are included in every tier with no Flow fee**, at Stripe's standard rates: 2.7% + 20¢ tapped, 30¢ flat Interac, 2.9% + 30¢ online. Remove the 2.6% + 10¢ rate and any per-plan card rates from the pricing page, Founders Beta materials and pitch deck.

## Tiers

| | **Starter** | **Pro** | **Pro+** (anchor, "most popular") | **Enterprise** |
|---|---|---|---|---|
| Monthly | C$29 | C$69 | C$139 | Custom (from about C$349) |
| Annual (2 months free) | C$290 | C$690 | C$1,390 | Custom |
| Team members | 1 | 5 | 15 | Unlimited |
| Bookings / month | 150 | Unlimited | Unlimited | Unlimited |
| Core: dashboard, calendar, bookings, clients, online booking page, business setup | Yes | Yes | Yes | Yes |
| Payments (Tap to Pay, Interac, online deposits, payment links), no Flow fee | Yes | Yes | Yes | Yes |
| Deposits and no-show fees | Yes | Yes | Yes | Yes |
| Reminders | Email | Email + 300 SMS (if built) | Email + 600 SMS | Custom |
| AI Front Desk | – | 300 conversations / mo | 1,000 / mo | Custom |
| AI Daily Brief | – | Yes | Yes | Yes |
| Family Hours, Advanced Permissions | – | – | Yes | Yes |
| Flow Coach | – | – | Yes | Yes |
| AI Autopilot | – | – | 1,500 sends / mo | Custom |
| Advanced Analytics, Revenue Optimization, Priority AI, Early access | – | – | Yes | Yes |
| Support | Basic | Priority | Priority + chat | Dedicated CSM, SLA |
| Multi-location, enterprise roles and security, dedicated onboarding, API and integrations (future) | – | – | – | Yes |

Upgrade triggers:
- Starter to Pro: a second team member, more than 150 bookings a month, or wanting AI Front Desk.
- Pro to Pro+: a 6th team member, or wanting Flow Coach or AI Autopilot.
- Pro+ to Enterprise: a third location, or more than 15 team members.

Notes on the feature list:
- Only list a feature on the page once it has shipped. Flow Coach promises predictive analytics and pricing and staffing recommendations; label anything not live as early access.
- "Family Hours" is not defined in the source, so its tier placement is a guess.
- POS, website builder, staff commissions and memberships are not in the feature list. If they exist: website builder and commissions at Pro, memberships at Pro+.
- SMS caps assume SMS exists. The feature list only names email reminders.

## Competitors (USD, third-party listings, checked 2026-10-11)

| Shop size | FlatPurse (at 0.72 USD per CAD) | Vagaro | Fresha | Square Appointments | GlossGenius |
|---|---|---|---|---|---|
| Solo | $21 (Starter) | $30 + add-ons | $20 | Free, or $35 | $24-28 |
| 3 staff | $50 (Pro) | $50 + add-ons | $45 + 20% new-client fee | $35 per location | $48-56 |
| 6 staff | $100 (Pro+) | $80 + add-ons | $90 | $85 | n/a |
| 10 staff | $100 (Pro+) | $90 + add-ons | $150 | $85 | $148-168 |

Position: "one price, nothing extra" against Vagaro's add-ons (one review put a 4-staff salon using everything at about $134 USD a month). Interac at a flat 30¢ is cheaper than Square's 0.75% + 7¢ on any sale over about C$31, and there is no commission on new clients.

Check first: Square's page in my results was the Canadian help page, and its $35 and $85 may be in CAD. If so, Pro+ at C$139 is well above Square Premium. Do not cut Pro+ to C$119 without checking AI cost (below); lead with the all-in comparison against Vagaro instead.

## Unit economics (estimates)

Assumptions: Stripe subscription billing 2.9% + C$0.30; AI at about C$0.03 per conversation; support valued at C$40/hr. Replace AI costs with your real LLM bills.

| Tier | Revenue | Billing fee | Infra | AI | Support | Gross margin |
|---|---|---|---|---|---|---|
| Starter | C$29 | C$1.14 | C$3 | C$0 | C$5 | C$19.86, 68% |
| Pro | C$69 | C$2.30 | C$3 | C$9 | C$7 | C$47.70, 69% |
| Pro+ | C$139 | C$4.33 | C$6 | C$43 | C$14 | C$71.67, 52% |

At C$119, Pro+ margin falls to about 44%.

- Break-even (fixed costs about C$417 a month, estimate): about 21 Starter, 9 Pro or 6 Pro+ customers.
- Target blended revenue per customer: about C$59.50 a month (50% Starter, 35% Pro, 15% Pro+).
- 1,000 trial signups at 20% conversion is 200 paying accounts and about C$11,900 MRR. At 10% it is about C$5,950 MRR.

## Pricing psychology

1. **Anchor:** Pro+ at C$139, highlighted.
2. **Decoy:** Pro lacks Flow Coach and AI Autopilot, so any shop above a solo sees Pro+ as the obvious step.
3. **Annual framing:** "Pay for 10 months, get 12", with the monthly equivalent shown.

## Launch and scale

- **Public launch:** 14-day no-card trial, then 50% off the first 3 months.
- **Founders Beta (first 40 businesses):** 40% off any paid plan for 12 months, locked while the subscription stays active. Show a visible spots-left counter. The beta offer is the only discount that should carry a "was" price.
- **Grandfathering:** early accounts keep their price while subscribed. Give 60 days' written notice before any change.
- **Price increases (triggers):** Pro to C$79 and Pro+ to C$159 once there are 150 paying accounts, or once trial-to-paid conversion stays above 25% for two months. Raise Pro+ only after Flow Coach and AI Autopilot deliver measurable results for customers.

## Stripe Card Plan (summary of the Oct 9 spec)

Salons pay Stripe directly, Flow takes no cut, and Flow earns on subscriptions. At C$30,000 a month in tapped cards over 600 sales, the earlier plan of 2.6% + 10¢ would lose about C$173 per salon per month (about C$83,000 a year across 40 beta salons). Developer rules: create every charge as a direct charge on the salon's own Stripe account, including Tap to Pay, online deposits and payment links; leave `application_fee_amount` off. Phase 2: ask Stripe for wholesale (interchange-plus) pricing and add a small markup (0.3% on C$1 million a month is about C$3,000 a month).

## Open questions

- Is a free Starter wanted at launch? The features document says free forever; this recommendation says trial plus paid until Phase 2. One source of truth is needed.
- What does "Family Hours" include?
- Does SMS exist, and through which channel does AI Front Desk talk to clients?
- Do POS, website builder, staff commissions and memberships exist, and in which tier?
- What do AI Front Desk, Flow Coach and AI Autopilot really cost per salon per month?
