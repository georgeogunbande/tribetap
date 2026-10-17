import { useMemo, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router';
import { ArrowRight, Building2, CheckCircle2, Coffee, Handshake, Linkedin, MapPin, ShieldCheck, Users } from 'lucide-react';
import { Button, Card, Container, Field, LinkButton, inputCls } from '../components/ui';
import { LinkedInCompanyCard } from '../components/LinkedInCompanyCard';
import { CONTACT, LINKEDIN_URL } from '../data';

const reasons = [
  [Users, 'A network, not just a desk', 'Sit beside 500+ founders, consultants and operators. Introductions happen over coffee, not cold DMs.'],
  [Building2, 'A credible Edmonton address', 'Put a real business address on your LinkedIn page, invoices and contracts from day one.'],
  [Coffee, 'Space that flexes with you', 'Day passes, hot desks, private offices and meeting rooms. Scale up or down month to month.'],
] as const;
const steps = [['Tell us about you', 'Two minutes. Role, company, and what you want from a workspace.'], ['Tour or trial day', 'See the space and meet the community. First visit is on us.'], ['Plug into the network', 'Get a plan, a desk and warm intros to members in your industry.']];
const faq = [
  ['Is the first visit really free?', 'Yes. Book a tour and we will arrange a no-obligation trial day so you can work from Sovera before choosing a plan.'],
  ['What does it cost?', 'Memberships start at $25/month, hot desks from $250/month and private offices from $650/month. See full pricing on the memberships page.'],
  ['Who is Sovera for?', 'Founders, freelancers, consultants and growing teams in and around Edmonton who want a professional base and a community.'],
  ['What happens to my details?', "We use them only to follow up on your enquiry. You can ask us to delete them at any time at " + CONTACT.email + '.'],
];

// Ad-platform and campaign params we want to keep on the lead record.
const TRACKED = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'li_fat_id'] as const;

export function LinkedInLanding() {
  const [params] = useSearchParams();
  const [done, setDone] = useState(false);
  const attribution = useMemo(() => Object.fromEntries(TRACKED.map((k) => [k, params.get(k) ?? '']).filter(([, v]) => v)), [params]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const lead = { ...Object.fromEntries(new FormData(e.currentTarget)), ...attribution, page: '/linkedin', submittedAt: new Date().toISOString() };
    // No backend yet: POST `lead` to your CRM / webhook here.
    console.info('linkedin lead', lead);
    setDone(true);
  };

  return (
    <>
      <section className="bg-white">
        <Container className="grid items-center gap-12 py-12 lg:grid-cols-[1.1fr_1fr] lg:py-20">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#0A66C2]/10 px-3 py-1 text-sm font-medium text-[#0A66C2]"><Linkedin className="size-4" />For LinkedIn professionals in Edmonton</p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">Turn your LinkedIn connections into <span className="text-teal-700">real-world partners</span></h1>
            <p className="mt-6 max-w-xl text-lg text-gray-600">Sovera Global is Edmonton's premium business hub: flexible offices, coworking and meeting rooms, plus a community of 500+ professionals. Book a tour and your first visit is free.</p>
            <ul className="mt-8 space-y-3">
              {['Hot desks from $250/mo, private offices from $650/mo', 'Month-to-month, no long lock-ins', 'Downtown, South and West Edmonton locations'].map((t) => <li key={t} className="flex gap-3 text-gray-800"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-teal-700" aria-hidden />{t}</li>)}
            </ul>
            <div className="mt-8 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex -space-x-2" aria-hidden>{['bg-teal-700', 'bg-blue-600', 'bg-orange-500', 'bg-purple-600'].map((c, i) => <span key={c} className={`flex size-9 items-center justify-center rounded-full border-2 border-white text-xs text-white ${c}`}>{'SGCM'[i]}</span>)}</div>
              <span>Join 500+ members already connecting at Sovera</span>
            </div>
          </div>

          <Card className="border-gray-300 p-6 shadow-xl sm:p-8" id="book">
            {done ? (
              <div className="py-6 text-center" role="status">
                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-green-100"><CheckCircle2 className="size-8 text-green-600" /></div>
                <h2 className="mb-2 text-2xl font-semibold">You're on the list</h2>
                <p className="mb-6 text-gray-600">We'll be in touch within one business day to schedule your tour. In the meantime, connect with us.</p>
                <LinkButton href={LINKEDIN_URL} variant="linkedin" size="lg" className="w-full"><Linkedin className="size-5" />Follow Sovera on LinkedIn</LinkButton>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div><h2 className="text-2xl font-semibold">Book your free tour</h2><p className="mt-1 text-sm text-gray-600">Takes under two minutes. No spam, ever.</p></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="First name" id="li-first"><input id="li-first" name="firstName" required autoComplete="given-name" className={inputCls} /></Field>
                  <Field label="Last name" id="li-last"><input id="li-last" name="lastName" required autoComplete="family-name" className={inputCls} /></Field>
                </div>
                <Field label="Work email" id="li-email"><input id="li-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={inputCls} /></Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Company" id="li-company"><input id="li-company" name="company" required autoComplete="organization" className={inputCls} /></Field>
                  <Field label="Job title" id="li-title"><input id="li-title" name="title" autoComplete="organization-title" className={inputCls} /></Field>
                </div>
                <Field label="What do you need?" id="li-need">
                  <select id="li-need" name="need" defaultValue="" required className={inputCls}>
                    <option value="" disabled>Select one</option>
                    <option>Private office</option><option>Hot desk / coworking</option><option>Meeting rooms</option><option>Virtual office address</option><option>Team or corporate plan</option><option>Not sure yet</option>
                  </select>
                </Field>
                <label className="flex items-start gap-2 text-xs text-gray-600"><input type="checkbox" name="consent" required className="mt-0.5" />I agree to be contacted by Sovera Global about my enquiry.</label>
                <Button type="submit" size="lg" variant="accent" className="w-full">Book my free tour<ArrowRight className="size-4" /></Button>
                <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500"><ShieldCheck className="size-3.5" />Your details are only used to arrange your visit.</p>
              </form>
            )}
          </Card>
        </Container>
      </section>

      <section className="border-y bg-gray-50 py-16">
        <Container>
          <h2 className="mb-10 text-center text-3xl font-semibold">Why professionals choose Sovera</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {reasons.map(([I, t, d]) => <Card key={t} className="p-6"><div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-teal-100"><I className="size-6 text-teal-700" aria-hidden /></div><h3 className="mb-2 text-lg font-semibold">{t}</h3><p className="text-gray-600">{d}</p></Card>)}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="max-w-5xl">
          <h2 className="mb-10 text-center text-3xl font-semibold">How it works</h2>
          <ol className="grid gap-8 md:grid-cols-3">
            {steps.map(([t, d], i) => <li key={t} className="text-center"><span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-teal-700 text-lg font-semibold text-white">{i + 1}</span><h3 className="mb-2 font-semibold">{t}</h3><p className="text-gray-600">{d}</p></li>)}
          </ol>
        </Container>
      </section>

      <section className="bg-gray-50 py-16">
        <Container>
          <div className="mb-8 text-center"><h2 className="text-3xl font-semibold">See what's happening at Sovera</h2><p className="mt-3 text-gray-600">Follow our page for events, member spotlights and new space.</p></div>
          <LinkedInCompanyCard />
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="max-w-3xl">
          <h2 className="mb-6 text-3xl font-semibold">Questions</h2>
          <div className="divide-y rounded-xl border">{faq.map(([q, a]) => <details key={q} className="group p-5"><summary className="cursor-pointer list-none font-medium marker:hidden">{q}</summary><p className="mt-2 text-gray-600">{a}</p></details>)}</div>
        </Container>
      </section>

      <section className="bg-[#0A66C2] py-16 text-white">
        <Container className="text-center">
          <Handshake className="mx-auto mb-4 size-10" aria-hidden />
          <h2 className="mb-4 text-3xl font-semibold">Your next connection is a desk away</h2>
          <p className="mx-auto mb-8 max-w-xl text-blue-50"><MapPin className="mr-1 inline size-4" />Edmonton, Alberta · Mon-Fri 8am-8pm</p>
          <a href="#book" className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-8 font-medium text-[#0A66C2] hover:bg-gray-100">Book my free tour<ArrowRight className="size-4" /></a>
        </Container>
      </section>
    </>
  );
}
