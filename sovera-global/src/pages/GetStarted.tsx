import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Calendar, Check, CheckCircle2, ChevronLeft, ChevronRight, CreditCard, Mail, MapPin } from 'lucide-react';
import { Button, Card, Container, Field, inputCls } from '../components/ui';
import { addOns as addOnList, locations, plans, terms } from '../data';

const steps = ['Location', 'Plan', 'Term', 'Details', 'Review', 'Your info', 'Payment'];
const money = (n: number) => `$${n.toLocaleString('en-CA', { maximumFractionDigits: 2 })}`;
const choice = (on: boolean) => `w-full cursor-pointer rounded-lg border-2 p-4 text-left transition hover:shadow-md ${on ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`;

export function GetStarted() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState(params.get('location') ?? '');
  const [planId, setPlanId] = useState(plans.some((p) => p.id === params.get('plan')) ? params.get('plan')! : '');
  const [termId, setTermId] = useState('month-to-month');
  const [people, setPeople] = useState(1);
  const [extras, setExtras] = useState<string[]>([]);
  const [start, setStart] = useState('');
  const [me, setMe] = useState({ first: '', last: '', email: '', phone: '', business: '', type: '' });
  const [pay, setPay] = useState<'card' | 'invoice'>('card');

  const plan = plans.find((p) => p.id === planId);
  const term = terms.find((t) => t.id === termId)!;
  const total = plan ? plan.basePrice * people * term.factor + extras.reduce((s, id) => s + (addOnList.find((a) => a.id === id)?.price ?? 0), 0) : 0;
  const custom = plan?.basePrice === 0;
  const unit = planId === 'office' ? 'offices' : 'people';
  const canContinue = step === 2 ? !!plan : step === 6 ? !!(me.first && me.last && me.email && me.phone && me.business) : true;
  const toggle = (id: string) => setExtras((x) => (x.includes(id) ? x.filter((i) => i !== id) : [...x, id]));
  const set = (k: keyof typeof me) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setMe({ ...me, [k]: e.target.value });

  const nav = (back = true, next = true) => (
    <div className="mt-8 flex justify-between">
      {back && step > 1 ? <Button variant="outline" onClick={() => setStep(step - 1)}><ChevronLeft className="size-4" />Back</Button> : <span />}
      {next && <Button disabled={!canContinue} onClick={() => setStep(step + 1)}>Continue<ChevronRight className="size-4" /></Button>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="border-b bg-white py-8">
        <Container>
          <h1 className="mb-6 text-3xl font-semibold md:text-4xl">Get started with Sovera Global</h1>
          <ol className="flex max-w-4xl items-center" aria-label="Progress">
            {steps.map((label, i) => {
              const n = i + 1;
              return (
                <li key={label} className="flex items-center" aria-current={step === n ? 'step' : undefined}>
                  <div className="flex flex-col items-center">
                    <span className={`flex size-10 items-center justify-center rounded-full text-sm transition-colors ${step >= n ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{step > n ? <Check className="size-5" /> : n}</span>
                    <span className="mt-2 hidden text-xs text-gray-600 sm:block">{label}</span>
                  </div>
                  {i < steps.length - 1 && <span className={`mx-1 h-0.5 w-5 sm:mx-2 sm:w-14 ${step > n ? 'bg-blue-600' : 'bg-gray-200'}`} />}
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <Container className="grid gap-8 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-6 sm:p-8">
            {step === 1 && <>
              <h2 className="mb-1 text-2xl font-semibold">Choose your preferred location</h2><p className="mb-6 text-gray-600">Select a Sovera Global center near you (optional)</p>
              <div className="space-y-4">
                {locations.map((l) => <button key={l.id} onClick={() => setLocation(l.id)} className={choice(location === l.id)}><span className="flex items-start gap-3"><MapPin className="mt-0.5 size-5 text-blue-600" /><span><span className="block font-semibold">{l.name}</span><span className="block text-sm text-gray-600">{l.address}, {l.city}</span></span></span></button>)}
                <button onClick={() => { setLocation(''); setStep(2); }} className="w-full cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 text-gray-600 hover:border-blue-600 hover:text-blue-600">Skip, I'll choose later</button>
              </div>
              {nav(false)}
            </>}

            {step === 2 && <>
              <h2 className="mb-1 text-2xl font-semibold">Choose your membership plan</h2><p className="mb-6 text-gray-600">Select the plan that fits your needs</p>
              <div className="grid gap-4 md:grid-cols-2">
                {plans.map((p) => (
                  <button key={p.id} onClick={() => setPlanId(p.id)} className={`${choice(planId === p.id)} relative`}>
                    {p.popular && <span className="absolute -right-2 -top-2 rounded-full bg-orange-500 px-2 py-0.5 text-xs text-white">Most Popular</span>}
                    <span className="mb-3 flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-lg bg-blue-100"><p.icon className="size-5 text-blue-600" /></span><span><span className="block font-semibold">{p.name}</span><span className="block text-sm text-gray-600">{p.description}</span></span></span>
                    <span className="mb-3 block space-y-1">{p.features.slice(0, 3).map((f) => <span key={f} className="flex gap-2 text-sm text-gray-700"><Check className="mt-0.5 size-4 shrink-0 text-green-600" />{f}</span>)}</span>
                    <span className="font-semibold">{p.basePrice ? `From ${money(p.basePrice)}/mo` : 'Custom pricing'}</span>
                  </button>
                ))}
              </div>
              {nav()}
            </>}

            {step === 3 && <>
              <h2 className="mb-1 text-2xl font-semibold">Choose membership length</h2><p className="mb-6 text-gray-600">Longer terms receive additional discounts</p>
              <div className="space-y-4">
                {terms.map((t) => <button key={t.id} onClick={() => setTermId(t.id)} className={choice(termId === t.id)}><span className="flex items-center gap-4"><Calendar className="size-6 text-blue-600" /><span><span className="block font-semibold">{t.label}</span>{t.discount > 0 && <span className="text-sm text-green-600">Save {t.discount}%</span>}</span>{termId === t.id && <Check className="ml-auto size-5 text-blue-600" />}</span></button>)}
              </div>
              {nav()}
            </>}

            {step === 4 && <>
              <h2 className="mb-1 text-2xl font-semibold">Customize your membership</h2><p className="mb-6 text-gray-600">Add team members and extras</p>
              <div className="mb-8">
                <span className="mb-3 block font-medium">Number of {unit}</span>
                <div className="flex items-center gap-4">
                  <Button variant="outline" aria-label={`Fewer ${unit}`} onClick={() => setPeople(Math.max(1, people - 1))}>−</Button>
                  <output className="w-12 text-center text-2xl font-semibold">{people}</output>
                  <Button variant="outline" aria-label={`More ${unit}`} onClick={() => setPeople(people + 1)}>+</Button>
                </div>
              </div>
              <fieldset className="mb-8"><legend className="mb-3 font-medium">Add-ons (optional)</legend>
                <div className="space-y-3">{addOnList.map((a) => <button key={a.id} aria-pressed={extras.includes(a.id)} onClick={() => toggle(a.id)} className={choice(extras.includes(a.id))}><span className="flex items-center justify-between"><span><span className="block font-medium">{a.label}</span><span className="text-sm text-gray-600">+{money(a.price)}/month</span></span>{extras.includes(a.id) && <Check className="size-5 text-blue-600" />}</span></button>)}</div>
              </fieldset>
              <Field label="Preferred start date" id="start"><input id="start" type="date" value={start} min={new Date().toISOString().split('T')[0]} onChange={(e) => setStart(e.target.value)} className={inputCls} /></Field>
              {nav()}
            </>}

            {step === 5 && <>
              <h2 className="mb-1 text-2xl font-semibold">Review your selection</h2><p className="mb-6 text-gray-600">Make sure everything looks correct</p>
              <dl className="space-y-3">
                {[['Location', locations.find((l) => l.id === location)?.name ?? 'Not selected'], ['Membership plan', plan?.name], ['Term length', term.label], [`Number of ${unit}`, String(people)], ['Add-ons', extras.length ? extras.map((id) => addOnList.find((a) => a.id === id)?.label).join(', ') : 'None'], ['Start date', start ? new Date(start + 'T00:00').toLocaleDateString('en-CA', { dateStyle: 'long' }) : 'To be confirmed']].map(([k, v]) => <div key={k} className="rounded-lg bg-gray-50 p-4"><dt className="mb-1 text-sm text-gray-600">{k}</dt><dd className="font-medium">{v}</dd></div>)}
              </dl>
              {nav()}
            </>}

            {step === 6 && <>
              <h2 className="mb-1 text-2xl font-semibold">Your information</h2><p className="mb-6 text-gray-600">Tell us a bit about yourself and your business</p>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="First name *" id="first"><input id="first" value={me.first} onChange={set('first')} autoComplete="given-name" className={inputCls} /></Field>
                  <Field label="Last name *" id="last"><input id="last" value={me.last} onChange={set('last')} autoComplete="family-name" className={inputCls} /></Field>
                </div>
                <Field label="Email address *" id="email"><input id="email" type="email" value={me.email} onChange={set('email')} autoComplete="email" className={inputCls} /></Field>
                <Field label="Phone number *" id="phone"><input id="phone" type="tel" value={me.phone} onChange={set('phone')} autoComplete="tel" className={inputCls} /></Field>
                <Field label="Business name *" id="biz"><input id="biz" value={me.business} onChange={set('business')} autoComplete="organization" className={inputCls} /></Field>
                <Field label="Business type" id="type"><select id="type" value={me.type} onChange={set('type')} className={inputCls}><option value="">Select type</option>{['Startup', 'Small business', 'Enterprise', 'Freelancer', 'Non-profit'].map((t) => <option key={t}>{t}</option>)}</select></Field>
              </div>
              {nav()}
            </>}

            {step === 7 && <>
              <h2 className="mb-1 text-2xl font-semibold">Payment details</h2><p className="mb-6 text-gray-600">How would you like to pay?</p>
              <div className="mb-6 space-y-4">
                <button onClick={() => setPay('card')} className={choice(pay === 'card')}><span className="flex items-center gap-3"><CreditCard className="size-5 text-blue-600" /><span><span className="block font-medium">Credit/debit card</span><span className="text-sm text-gray-600">Pay securely with your card</span></span></span></button>
                <button onClick={() => setPay('invoice')} className={choice(pay === 'invoice')}><span className="flex items-center gap-3"><Mail className="size-5 text-blue-600" /><span><span className="block font-medium">Invoice (Net 30)</span><span className="text-sm text-gray-600">Request an invoice for payment</span></span></span></button>
              </div>
              {pay === 'card'
                ? <p className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-gray-700">Card details are collected securely by our payment provider once online payments are enabled. For now, our team will confirm payment with you after you complete this request.</p>
                : <p className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-gray-700">We'll send an invoice to {me.email || 'your email address'}. Payment is due within 30 days.</p>}
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setStep(6)}><ChevronLeft className="size-4" />Back</Button>
                <Button onClick={() => setStep(8)}>Complete request</Button>
              </div>
            </>}

            {step === 8 && (
              <div className="text-center">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100"><CheckCircle2 className="size-10 text-green-600" /></div>
                <h2 className="mb-2 text-3xl font-semibold">Welcome to Sovera Global!</h2>
                <p className="mb-8 text-gray-600">Your request is in. We'll email {me.email} to confirm your membership.</p>
                <dl className="mx-auto mb-8 max-w-md space-y-3 text-left">
                  <div className="rounded-lg bg-gray-50 p-4"><dt className="text-sm text-gray-600">Membership</dt><dd className="font-semibold">{plan?.name}</dd></div>
                  <div className="rounded-lg bg-gray-50 p-4"><dt className="text-sm text-gray-600">Start date</dt><dd className="font-semibold">{start ? new Date(start + 'T00:00').toLocaleDateString('en-CA') : 'To be confirmed'}</dd></div>
                  <div className="rounded-lg bg-gray-50 p-4"><dt className="text-sm text-gray-600">Monthly cost</dt><dd className="text-2xl font-semibold text-blue-600">{custom ? 'Custom quote' : `${money(total)}/mo`}</dd></div>
                </dl>
                <div className="flex flex-col justify-center gap-4 sm:flex-row"><Button onClick={() => navigate('/dashboard')}>Go to dashboard</Button><Button variant="outline" onClick={() => navigate('/services')}>Book a space</Button></div>
              </div>
            )}
          </Card>
        </div>

        {step < 8 && (
          <aside>
            <Card className="sticky top-24 border-0 bg-gray-900 p-6 text-white">
              <h2 className="mb-6 text-xl font-semibold">Summary</h2>
              <dl className="space-y-4">
                {location && <div className="border-b border-gray-700 pb-4"><dt className="mb-1 text-sm text-gray-400">LOCATION</dt><dd className="text-sm">{locations.find((l) => l.id === location)?.name}</dd></div>}
                <div className="border-b border-gray-700 pb-4"><dt className="mb-1 text-sm text-gray-400">PLAN TYPE</dt><dd>{plan?.name ?? '---'}</dd></div>
                <div className="border-b border-gray-700 pb-4"><dt className="mb-1 text-sm text-gray-400">MEMBERSHIP LENGTH</dt><dd>{step >= 3 ? term.label : '---'}</dd></div>
                {step >= 4 && <div className="border-b border-gray-700 pb-4"><dt className="mb-1 text-sm text-gray-400">{unit.toUpperCase()}</dt><dd>{people}</dd></div>}
                <div className="border-b border-gray-700 pb-4"><dt className="mb-1 text-sm text-gray-400">MONTHLY COST</dt>
                  <dd>{plan && step >= 3 ? (custom ? <span className="text-xl">Custom quote</span> : <><span className="text-3xl font-semibold">{money(total)}</span><span className="block text-sm text-gray-400">per month</span></>) : '---'}</dd></div>
                {extras.length > 0 && <div><dt className="mb-2 text-sm text-gray-400">ADD-ONS</dt><dd><ul className="space-y-1 text-sm">{extras.map((id) => { const a = addOnList.find((x) => x.id === id)!; return <li key={id} className="flex justify-between"><span>{a.label}</span><span>+{money(a.price)}</span></li>; })}</ul></dd></div>}
              </dl>
            </Card>
          </aside>
        )}
      </Container>
    </div>
  );
}
