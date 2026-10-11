# TribeTap pricing strategy

Generated 2026-10-11 using the `pricing-strategy` skill steps. All prices CAD unless marked USD. Competitor prices are USD, taken from search snippets and third-party listings (vendor pages did not load), so re-check before publishing.

## 1. Pricing model fit

| Model | Fit | Pros | Cons |
|---|---|---|---|
| Flat subscription | 4 | Predictable MRR; hosts run events monthly (church, networking, coaches) | Sporadic hosts won't commit |
| Usage-based | 2 | Matches cost per guest | Hosts hate surprise bills at an event |
| Per-seat | 1 | None; one host per event | Wrong unit |
| Freemium | 4 | Free small event is the demo; QR spreads to guests who become hosts | Free users cost support time |
| Credits / per-event pass | 4 | Fits one-off conferences; undercuts competitor per-event prices | Lower LTV |
| One-time purchase | 1 | None | Ongoing hosting cost |

**Recommendation: freemium + flat monthly subscription, with a one-off Event Pass.** Because the product is used per event, the free tier proves it with a real group and the pass catches one-off hosts. Monthly is the default offer because recurring revenue is the goal.

## 2. Tiers

| | **Free** | **Host** | **Organizer** |
|---|---|---|---|
| Monthly | $0 | $39 | $129 |
| Annual | $0 | $390 (about $32.50/mo, 17% off) | $1,290 (about $107.50/mo, 17% off) |
| Guests per event | 30 | 150 | 500 |
| Events per month | 1 | 4 | Unlimited |
| Branding | TribeTap branded | Custom event title and branding | Remove TribeTap branding |
| Results | Live view only | Spreadsheet download, feedback averages | Spreadsheet download, feedback averages, Tip Wall export |
| Email capture | No | Yes (optional guest emails) | Yes |
| Extras | 6 categories, quiz round, Tip Wall | Meeting spots | 5 host seats, priority support |
| Sales model | Self-serve | Self-serve | Self-serve up to 500; sales-led for licensing or white-label |

**Event Pass: $29 once** (Host features for one event, 150 guests).

Upgrade triggers:
- Free to Host: a 31st guest, or the host wants the spreadsheet or their own branding.
- Host to Organizer: a fifth event in a month, an audience over 150, or an agency that needs to hide the TribeTap brand.

## 3. Competitor context (USD, checked 2026-10-11 via search, not vendor pages)

| Competitor | Price | Includes | Our position |
|---|---|---|---|
| [Slido](https://www.slido.com/pricing) (per [Capterra](https://www.capterra.com/p/154051/Slido/pricing/)) | Free; Engage $17.50/mo; Professional $75/mo | 100 / 200 / 1,000 participants; Q&A, polls | Between Engage and Professional. Same audience size at 150, but we sell networking, not Q&A |
| [Mentimeter](https://www.mentimeter.com/plans) (per [Capterra](https://www.capterra.com/p/160936/Mentimeter/pricing)) | Free; Basic about $11.99/mo annual; Pro $24.99/mo per presenter | Polls and quizzes | Above. They are cheaper because they are a generic polling tool |
| [Kahoot](https://kahoot.com/business/pricing/) | Presenter $25/mo annual ($29 monthly) | 50 participants | Below per guest: 150 guests for $39 vs 50 for about $29 USD |
| [Pigeonhole Live](https://help.pigeonholelive.com/hc/en-us/articles/210001607) | One-time Engage about $338 USD; subscription listings conflict | Q&A, polls, up to 1,000 | Far below on a one-off event ($29 vs about $338 USD) |

Where we sit: the closest tools sell Q&A and polls; none forms teams. Priced above Slido Engage and Mentimeter Basic because a host can run the room without a facilitator, and below the per-event enterprise tools.

## 4. Unit economics (all costs are estimates unless noted)

Assumptions (estimates): hosting about $10 CAD/mo shared across all hosts; Stripe 2.9% + $0.30 (published rate); support valued at $30/hr; support minutes per paying host per month: Host 15, Organizer 60, Pass 10.

| Tier | Revenue/mo | Stripe | Support | Infra | Gross margin |
|---|---|---|---|---|---|
| Host monthly | $39.00 | $1.43 | $7.50 | $2.00 | $28.07, 72% |
| Host annual | $32.50 | $1.00 (avg) | $7.50 | $2.00 | $22.00, 68% |
| Organizer monthly | $129.00 | $4.04 | $30.00 | $8.00 | $86.96, 67% |
| Event Pass | $29.00 | $1.14 | $5.00 | $0.50 | $22.36, 77% |
| Free | $0 | $0 | $0 | $1.00 | -$1.00 |

Break-even: fixed costs of about $50/mo (estimate) are covered by 2 Host customers ($50 / $28.07).

Target blended ARPU: about $57/mo (80% Host at $39, 20% Organizer at $129). Reaching $2,000 MRR (the consulting baseline) takes about 35 paying hosts. Reaching $4,000 MRR takes about 70.

Confirm before launch: real hosting bill (check `render.yaml`), whether storage costs grow with events.

## 5. Pricing psychology

1. **Anchor:** show Organizer at $129 first (or highlighted at right), so Host at $39 reads as the sensible default.
2. **Decoy:** the $29 Event Pass pushes repeat hosts to Host. Two events a month cost $58 on passes versus $39 on Host.
3. **Annual framing:** show "$32.50/mo, 2 months free" with the annual total underneath. Do not show a percentage.

## 6. Launch versus scale pricing

- **Launch (first 90 days):** Host at $19/mo, "Founding Host", for the first 25 hosts. Purpose: fast case studies and testimonials while the product is young. Organizer stays at $129 so the anchor holds.
- **Grandfathering:** founding hosts keep $19/mo for as long as the subscription stays active, with a 12-month minimum. Give 60 days' written notice before any later change.
- **Price increases (specific triggers):** raise Host to $49 when either (a) 50 paying hosts are active, or (b) free-to-paid conversion exceeds 8% for two straight months, which signals underpricing. Re-test again when custom categories or questions ship.

## Appendix: CAD and USD side by side

Exchange rate assumed at 1 CAD = 0.72 USD (estimate; I could not confirm today's rate). USD list prices are rounded to charm prices.

| Item | CAD | USD list | Straight conversion |
|---|---|---|---|
| Host monthly | $39 | $29 | $28.08 |
| Host annual | $390 | $290 | $280.80 |
| Organizer monthly | $129 | $95 | $92.88 |
| Organizer annual | $1,290 | $950 | $928.80 |
| Event Pass | $29 | $21 | $20.88 |
| Founding Host | $19 | $14 | $13.68 |

Against USD competitors: Host at $29 sits level with Kahoot Presenter ($29 monthly) and above Slido Engage ($17.50), but gives 150 guests against Kahoot's 50 and Slido's 200 at Engage. Event Pass at $21 is about 94% below Pigeonhole's one-time Engage plan (about $338).

Margins hold: the costs above are in CAD, and a $29 USD Host sale is about $40 CAD, so the Host margin is about 72% at the CAD price and the same at the USD price.

Recommendation: list in USD for the public pricing page (matches competitors and Stripe's US/online buyers) and charge CAD to Canadian hosts via Stripe multi-currency prices. Decide after the first 10 paying hosts show where they are.

## Open questions
- Does Free's 30-guest limit suit church and community groups, whose events are often larger?
- Custom categories and questions are not in the current app; do not promise them in a tier until built.
