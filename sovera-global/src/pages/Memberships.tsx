import { useState } from 'react';
import { Link } from 'react-router';
import { Briefcase, Building2, Calendar, Check, Globe, Handshake, MapPin } from 'lucide-react';
import { Card, Container, LinkButton } from '../components/ui';
import { plans } from '../data';

const why = [[Calendar, 'Flexible terms', 'Plans start from one month, allowing you to adapt as your business needs change.'], [MapPin, 'Business locations anywhere', 'Our locations are in every major town and city worldwide, so you can represent your business professionally.'], [Building2, 'Real business centres', 'Memberships give access to professional business centres where you can work, meet with clients and hold interviews.']] as const;

const programs = [
  { id: 'corporate', label: 'Corporate Partnerships', icon: Briefcase, title: 'Corporate Partnership Programs', cta: ['Request Corporate Partnership Info', '/contact'],
    blurb: 'Give your employees flexible workspace across Edmonton, with exclusive benefits and cost savings for organizations of any size.',
    groups: [['Volume discounts', ['15-20% off for 10+ memberships', '25-30% off for 50+ memberships', 'Custom pricing for 100+ memberships']], ['Exclusive benefits', ['Dedicated account manager', 'Priority booking for meeting rooms', 'Customized reporting and analytics']], ['Flexible management', ['Centralized billing and invoicing', 'Add or remove members anytime', 'Online dashboard for HR teams']], ['Support services', ['Onboarding and training sessions', '24/7 support for your team', 'Quarterly business reviews']]] },
  { id: 'referral', label: 'Referral Program', icon: Handshake, title: 'Referral Program', cta: ['Join Referral Program', '/contact'],
    blurb: 'Earn credits towards your membership for every successful referral.',
    groups: [['$50 per Blue/Lounge referral', ['Credit applied within 30 days']], ['$150 per Gold/Office referral', ['Credit applied within 30 days']], ['$300 per Platinum referral', ['Credit applied within 30 days']]] },
  { id: 'enterprise', label: 'Enterprise Solutions', icon: Building2, title: 'Enterprise Solutions', cta: ['Schedule Enterprise Consultation', '/contact'],
    blurb: 'Dedicated spaces, advanced technology and full-service support for large and fast-growing organizations.',
    groups: [["What's included", ['Dedicated floors or buildings', 'Custom interior design', 'Advanced technology and AV', 'Dedicated IT support', 'Concierge services']], ['Contract terms', ['12, 24 or 36 months', 'No hidden fees', 'Expand or scale down as needed']]] },
  { id: 'affiliates', label: 'Affiliate Network', icon: Globe, title: 'Affiliate Network Program', cta: ['Join Affiliate Network', '/contact'],
    blurb: 'Earn recurring commissions by promoting Sovera. Built for consultants, real estate professionals and service providers.',
    groups: [['Earning potential', ['20% first month commission', '10% recurring monthly']], ['Tools', ['Marketing materials', 'Real-time tracking dashboard', 'Monthly payouts on the 15th']]] },
] as const;

export function Memberships() {
  const [selected, setSelected] = useState('gold');
  const [tab, setTab] = useState<(typeof programs)[number]['id']>('corporate');
  const plan = plans.find((p) => p.id === selected)!;
  const program = programs.find((p) => p.id === tab)!;

  return (
    <>
      <section className="border-b bg-white py-12">
        <Container>
          <p className="mb-6 text-sm text-gray-600">PLAN TYPE <span className="mx-1">&gt;</span> <span className="text-gray-400">MEMBERSHIP LENGTH &gt; YOUR DETAILS &gt; PAYMENT DETAILS</span></p>
          <h1 className="mb-3 text-3xl font-semibold md:text-4xl">Choose your membership plan</h1>
          <p className="text-gray-600">Flexible workspace memberships for Edmonton founders, professionals and growing teams.</p>
        </Container>
      </section>

      <section className="bg-gray-50 py-12">
        <Container className="grid gap-8 lg:grid-cols-3">
          <div className="grid gap-6 pt-3 md:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
            {plans.map((p) => (
              <button key={p.id} onClick={() => setSelected(p.id)} aria-pressed={selected === p.id}
                className={`relative cursor-pointer rounded-xl border-2 bg-white p-6 text-left transition hover:shadow-lg ${selected === p.id ? 'border-teal-600 shadow-lg' : 'border-transparent'}`}>
                {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-3 py-0.5 text-xs font-medium text-white">Most Popular</span>}
                <div className="mb-3 flex size-12 items-center justify-center rounded-lg bg-gray-100"><p.icon className="size-6 text-gray-700" aria-hidden /></div>
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="mb-4 text-sm text-gray-600">{p.description}</p>
                <ul className="mb-6 space-y-3">{p.features.map((f) => <li key={f} className="flex gap-2 text-sm text-gray-700"><Check className="mt-0.5 size-4 shrink-0 text-gray-500" aria-hidden />{f}</li>)}</ul>
                <div className="space-y-1">{p.pricing.map((x) => <div key={x.label + x.sublabel}><span className="text-sm font-medium">{x.label}</span> <span className="text-xs text-gray-500">{x.sublabel}</span></div>)}</div>
              </button>
            ))}
          </div>
          <aside>
            <Card className="sticky top-24 border-0 bg-gray-800 p-6 text-white">
              <h3 className="mb-6 text-xl font-semibold">Summary</h3>
              <dl className="mb-6 space-y-4">
                <div className="border-b border-gray-700 pb-4"><dt className="mb-1 text-sm text-gray-400">PLAN TYPE</dt><dd>{plan.name}</dd></div>
                <div className="border-b border-gray-700 pb-4"><dt className="mb-1 text-sm text-gray-400">MONTHLY COST</dt><dd className="text-2xl">{plan.pricing[0].label}</dd><dd className="text-sm text-gray-400">{plan.pricing[0].sublabel}</dd></div>
              </dl>
              <LinkButton to={`/get-started?plan=${plan.id}`} variant="accent" className="w-full">CONTINUE</LinkButton>
            </Card>
          </aside>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <h2 className="mb-12 text-3xl font-semibold">Why a membership.</h2>
          <div className="grid gap-12 md:grid-cols-3">
            {why.map(([I, t, d]) => <div key={t}><div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-gray-100"><I className="size-6 text-gray-700" aria-hidden /></div><h3 className="mb-3 text-xl font-semibold">{t}</h3><p className="leading-relaxed text-gray-600">{d}</p></div>)}
          </div>
        </Container>
      </section>

      <section className="bg-gray-50 py-16">
        <Container className="max-w-5xl">
          <div className="mb-10 text-center"><h2 className="mb-4 text-3xl font-semibold">Partnership opportunities</h2><p className="text-xl text-gray-600">Grow your business with our strategic partnership programs</p></div>
          <div role="tablist" className="mb-8 flex flex-wrap justify-center gap-2 border-b">
            {programs.map((p) => <button key={p.id} role="tab" aria-selected={tab === p.id} onClick={() => setTab(p.id)} className={`-mb-px cursor-pointer border-b-2 px-6 py-3 text-sm transition-colors ${tab === p.id ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>{p.label}</button>)}
          </div>
          <Card className="p-8 shadow-sm" role="tabpanel">
            <div className="mb-8 flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-teal-100"><program.icon className="size-6 text-teal-600" aria-hidden /></div>
              <div><h3 className="mb-2 text-2xl font-semibold">{program.title}</h3><p className="text-gray-600">{program.blurb}</p></div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {program.groups.map(([h, items]) => (
                <Card key={h} className="p-6"><h4 className="mb-3 font-semibold">{h}</h4><ul className="space-y-2 text-sm text-gray-600">{items.map((i) => <li key={i} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-teal-600" aria-hidden />{i}</li>)}</ul></Card>
              ))}
            </div>
            <div className="mt-8 flex justify-center"><LinkButton to={program.cta[1]} variant="accent" size="lg">{program.cta[0]}</LinkButton></div>
          </Card>
        </Container>
      </section>

      <section className="bg-gray-800 py-16 text-white">
        <Container className="text-center">
          <h2 className="mb-6 text-3xl font-semibold">Need help choosing?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">Our team will help you pick the right membership. Schedule a tour to see our facilities in person.</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row"><LinkButton to="/contact" variant="accent" size="lg">Talk to an Expert</LinkButton><Link to="/services" className="inline-flex h-12 items-center justify-center rounded-md border border-white px-8 hover:bg-white/10">Explore Spaces</Link></div>
        </Container>
      </section>
    </>
  );
}
