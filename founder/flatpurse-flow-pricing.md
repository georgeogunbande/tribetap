# FlatPurse Flow pricing strategy

Generated 2026-10-11. USD list prices (competitors list in USD; use Stripe multi-currency to charge CAD to Canadian customers). Competitor prices come from search results and third-party listings, not vendor pages, so re-check them before publishing. Tier names Basic / Pro / Pro+ / Unlimited and the Basic limit of 50 appointments a month are kept from your existing plan.

## 1. Pricing model fit

| Model | Fit | Pros | Cons |
|---|---|---|---|
| Flat subscription | 4 | Predictable MRR; simple to explain | Staff-heavy shops get the same price as solos |
| Usage-based | 3 | Appointments map to value and cost | Bills vary; owners dislike surprises |
| Per-seat | 4 | Industry standard (Vagaro, Fresha); revenue grows with the shop | Punishes growth; many owners hide staff to cut cost |
| Freemium | 5 | Free is table stakes (Square has one); fastest path to 1,000 signups | Free users cost support time |
| Credits | 2 | Fits SMS and AI-marketing sends only | Confusing for the core product |
| One-time purchase | 1 | None | Ongoing hosting, SMS and AI cost |

**Recommendation: freemium + flat tiers gated by appointments, staff and locations**, with SMS and AI sends capped inside each tier. Reason: tiers with staff caps give you per-seat-like growth without a per-seat bill that owners dodge.

## 2. Tiers

| | **Basic** | **Pro** | **Pro+** | **Unlimited** |
|---|---|---|---|---|
| Monthly | $0 | $29 | $69 | $149 |
| Annual | $0 | $290 (17% off, about $24.17/mo) | $690 (17% off, $57.50/mo) | $1,490 (17% off, about $124.17/mo) |
| Appointments / month | 50 | 500 | 2,000 | Unlimited |
| Staff | 1 | 3 | 10 | Unlimited |
| Locations | 1 | 1 | 1 | Up to 5 (+$39 each after) |
| Booking + POS | Booking page, POS (Stripe) | Same, plus deposits and no-show fees | Same | Same |
| Website builder | No | 1 site | 1 site, custom domain | 1 site per location |
| Staff commissions | No | Yes | Yes | Yes |
| Memberships and packages | No | No | Yes | Yes |
| AI marketing | No | No | 1,000 sends / mo | 10,000 sends / mo |
| SMS reminders | Email only | 200 / mo | 500 / mo | 1,500 / mo |
| Support | Help centre | Email | Email + chat | Priority |
| Sales model | Self-serve | Self-serve | Self-serve | Self-serve to 5 locations; sales-led above |

Upgrade triggers:
- Basic to Pro: the 51st appointment of the month, or a second staff member.
- Pro to Pro+: a 4th staff member, or wanting memberships or AI marketing.
- Pro+ to Unlimited: a second location, or more than 2,000 appointments a month.

## 3. Competitor pricing (USD, checked 2026-10-11 via search)

| Competitor | Price | Included | Our position |
|---|---|---|---|
| [Square Appointments](https://square.com/help/ca/en/article/6359-square-appointments-subscription-options) | Free; Plus $35; Premium $85, per location (varies by country) | Booking, POS | Pro ($29) just below Plus. Unlimited ($149) is above Premium but covers 5 locations, where Square charges per location |
| [Vagaro](https://koalendar.com/blog/vagaro-pricing) | $30 for 1 calendar, +$10 per extra, about $90 at 7 staff; add-ons extra (SMS from $20/mo, website $10-20) | Booking, POS | Pro ($29) covers 3 staff, where Vagaro charges about $50. Pro+ ($69) includes marketing and website that Vagaro bills as add-ons |
| [Fresha](https://www.fresha.com/pricing) | About $14.95 per team member (third-party); 20% fee on new marketplace clients | Booking, POS, marketplace | Pro is cheaper for 3 staff (about $45 at Fresha). We charge no marketplace commission |
| [GlossGenius](https://koalendar.com/blog/gloss-genius-pricing) | $24 / $48 / $148 billed annually ($28 / $56 / $168 monthly) | Booking, POS, website, marketing | Unlimited ($149) matches Platinum; Pro+ ($69 monthly) is above Gold ($56) but adds memberships and AI marketing |
| [Acuity](https://koalendar.com/blog/acuity-scheduling-pricing) | $20 / $34 / $61 monthly ($16 / $27 / $49 annual) | Scheduling only | Above on price, but includes POS and marketing |

Placement: the market has a free entry tier, $25-$35 for small shops, and $60-$150 for larger ones. Your four tiers follow that shape.

## 4. Unit economics (every cost is an estimate unless noted)

Assumptions (estimates): Stripe subscription billing fee 2.9% + $0.30 (published rate); support valued at $30/hr; support minutes a month: Pro 10, Pro+ 20, Unlimited 60; SMS at about $0.008 each; AI marketing at about $0.003 per send.

| Tier | Revenue | Stripe | Infra | SMS | AI | Support | Gross margin |
|---|---|---|---|---|---|---|---|
| Basic | $0 | $0 | $0.50 | $0 | $0 | $0 | -$0.50 |
| Pro | $29 | $1.14 | $2.00 | $1.60 | $0 | $5 | $19.26, 66% |
| Pro+ | $69 | $2.30 | $5.00 | $4.00 | $3 | $10 | $44.70, 65% |
| Unlimited | $149 | $4.62 | $12.00 | $12.00 | $30 | $30 | $60.38, 41% |

Unlimited margin is lower because the 10,000 AI sends and 1,500 SMS cost the most. If margin matters more than headline limits, cut the AI cap to 5,000 sends (AI cost $15, margin $75.38, 51%).

Break-even (fixed costs about $300/mo, estimate): 16 Pro, or 7 Pro+, or 5 Unlimited customers.

Target blended ARPU: about $55/mo (55% Pro, 35% Pro+, 10% Unlimited: 0.55 × 29 + 0.35 × 69 + 0.10 × 149).

The goal of 1,000 customers in 2 months is aggressive. If it happened and 15% paid, that is 150 paying accounts at $55 = $8,250 MRR, with 850 free accounts costing about $425/mo in infrastructure. A more likely first-year target is 40 beta accounts becoming 100 paying.

Not included: Stripe processing on customer card payments. If you add a platform fee via Stripe Connect, treat it as upside, not baseline.

## 5. Pricing psychology

1. **Anchor:** Unlimited at $149, shown first or on the right, so Pro+ at $69 feels moderate.
2. **Decoy:** Pro (no memberships, no AI marketing, 3 staff) exists to make Pro+ the obvious pick for any shop above a solo.
3. **Annual framing:** "Pay for 10 months, get 12", with the monthly equivalent underneath ($24.17 Pro, $57.50 Pro+).

## 6. Launch versus scale pricing

- **Launch (first 90 days):** the 40+ beta businesses get Pro+ free for 90 days, then **$35/mo (about half price) locked for 12 months**. Public launch: Pro $29 / Pro+ $69 / Unlimited $149 from day one. Reason: beta accounts supply testimonials and bug reports, and the free quarter proves AI marketing and memberships work.
- **Grandfathering:** beta and early accounts keep their price as long as the subscription stays active. Give 60 days' written notice for any later change.
- **Price increases (specific triggers):** raise Pro to $39 and Pro+ to $79 when either (a) 150 paid accounts are active, or (b) Basic-to-paid conversion exceeds 10% for two straight months, which signals underpricing. Revisit Unlimited when multi-location reporting ships.

## Open questions
- Is the 50-appointment Basic cap right? A solo barber at 3 clients a day hits 50 in about 17 days, which is a good natural upgrade trigger.
- Does the product already support SMS, memberships and multi-location? Do not list a feature in a tier until it ships.
- Will you charge a platform fee on Stripe payments? That changes the margin table.
