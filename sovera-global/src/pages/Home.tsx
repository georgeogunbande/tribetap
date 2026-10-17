import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Award, Calendar, CheckCircle, Clock, Headphones, Linkedin, MapPin, Search, Shield, Star, Users } from 'lucide-react';
import { Card, Container, Img, LinkButton, SectionHead, Tabs, Button } from '../components/ui';
import { LinkedInCompanyCard } from '../components/LinkedInCompanyCard';
import { LINKEDIN_URL, img } from '../data';

const spaces = [
  { cat: 'office', title: 'Private Offices', desc: 'Ready-to-use, fully equipped offices with everything you need to get started.', image: img.office, feats: [[Calendar, 'By month or year'], [Users, 'Teams of any size']], price: 'From $650/month', cta: 'Get a quote', to: '/contact' },
  { cat: 'office', title: 'Custom Offices', desc: 'Customize every aspect of your space, including furniture and branding.', image: img.office2, feats: [[Calendar, 'By month or year + customized'], [Users, 'Teams of any size']], price: 'Custom pricing', cta: 'Get a quote', to: '/contact' },
  { cat: 'coworking', title: 'Hot Desks', desc: 'Flexible access to our business lounges, when and where you choose.', image: img.desks, feats: [[Clock, '5, 10 or unlimited days per month']], price: 'From $250/month', cta: 'Get started', to: '/get-started?plan=coworking' },
  { cat: 'coworking', title: 'Business Lounge', desc: 'Professional on-demand workspace for the hours between meetings.', image: img.lounge, feats: [[Clock, 'By the hour or day'], [Users, 'Teams of any size']], price: 'From $60/month', cta: 'Get started', to: '/get-started?plan=lounge' },
  { cat: 'meeting', title: 'Meeting Rooms', desc: 'Professional meeting spaces for 2-50 people with full AV equipment included.', image: img.meeting, feats: [[Clock, 'By the hour or day'], [Users, '2-50 people']], price: 'From $45/hour', cta: 'Book now', to: '/get-started?plan=meeting-room' },
  { cat: 'virtual', title: 'Virtual Office', desc: 'Business address and mail handling. Establish your presence in Edmonton remotely.', image: img.virtual, feats: [[MapPin, 'Premium Edmonton address'], [Calendar, 'Mail forwarding available']], price: 'From $99/month', cta: 'Get started', to: '/get-started?plan=virtual-office' },
] as const;

const stats = [['500+', 'Members', 'and growing'], ['50+', 'Office spaces', 'available'], ['15+', 'Meeting rooms', 'ready to book'], ['24/7', 'Access', 'for members']];
const benefits = [[Award, 'Premium locations', 'Prestigious business address in Edmonton'], [Shield, 'Secure & reliable', '24/7 security and IT support'], [Users, 'Networking', 'Connect with 500+ business professionals'], [Star, 'Flexible terms', 'Monthly or annual plans available']] as const;
const testimonials = [
  { name: 'Michael Chen', role: 'Tech Startup Founder', company: 'TechStart Edmonton', quote: 'Sovera Global provided the perfect environment to grow my startup. The networking opportunities alone were worth it.' },
  { name: 'Sarah Johnson', role: 'Freelance Consultant', company: 'Independent Consultant', quote: 'Professional space, great amenities, and the business library has been invaluable for my research.' },
  { name: 'David Thompson', role: 'CEO', company: 'InnovateCorp', quote: 'Our team uses Sovera Global for quarterly retreats. The facilities and support are world-class.' },
];

export function Home() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  return (
    <>
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-teal-900 via-gray-800 to-blue-900 md:min-h-[80vh]">
        <Img src={img.office} loading="eager" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        <Container className="relative z-10 py-20 text-center">
          <div className="mx-auto max-w-4xl space-y-6">
            <p className="text-lg font-light tracking-wide text-white md:text-xl">From a single desk to a whole building. The choice is yours.</p>
            <h1 className="text-5xl font-semibold leading-tight text-white md:text-6xl lg:text-7xl">
              Office space your way<span className="ml-2 inline-block size-3 rounded-full bg-orange-500 md:size-4" aria-hidden />
            </h1>
            <div className="flex flex-col justify-center gap-4 pt-6 sm:flex-row">
              <LinkButton to="/contact" variant="accent" size="lg">Get a Quote</LinkButton>
              <LinkButton to="/services" variant="outline" size="lg" className="border-white bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-gray-900">Explore Spaces</LinkButton>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); navigate(`/contact?q=${encodeURIComponent(q)}`); }} className="mx-auto mt-6 flex max-w-2xl flex-col gap-3 rounded-lg bg-white p-2 shadow-2xl sm:flex-row" role="search">
              <label className="flex flex-1 items-center gap-3 px-3">
                <MapPin className="size-5 text-gray-400" aria-hidden />
                <span className="sr-only">City or postcode</span>
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Enter a city or postcode" className="w-full border-0 py-2 text-gray-900 outline-none" />
              </label>
              <Button type="submit" size="lg" className="bg-teal-700 hover:bg-teal-800"><Search className="size-4" />Search</Button>
            </form>
          </div>
        </Container>
      </section>

      <section className="border-y bg-white py-12">
        <Container className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map(([v, l, s]) => (
            <div key={l} className="text-center"><div className="mb-1 text-4xl font-semibold text-blue-600">{v}</div><div>{l}</div><div className="text-sm text-gray-500">{s}</div></div>
          ))}
        </Container>
      </section>

      <section className="bg-gray-50 py-20">
        <Container>
          <SectionHead title="Flexible workspace designed around your needs" sub="Fully customisable office rentals, available by the hour, day, or as long as you need." />
          <Tabs tabs={[{ id: 'office', label: 'Office Space' }, { id: 'coworking', label: 'Coworking' }, { id: 'virtual', label: 'Virtual Offices' }, { id: 'meeting', label: 'Meeting Rooms' }]}>
            {(active) => (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {spaces.filter((s) => s.cat === active).map((s) => (
                  <Card key={s.title} className="group overflow-hidden transition-shadow hover:shadow-xl">
                    <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-teal-100 to-blue-100"><Img src={s.image} alt={s.title} className="size-full object-cover transition-transform duration-300 group-hover:scale-105" /></div>
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-semibold">{s.title}</h3>
                      <p className="mb-4 text-gray-600">{s.desc}</p>
                      <ul className="mb-4 space-y-2 text-sm text-gray-700">
                        {s.feats.map(([I, t]) => <li key={t} className="flex items-center gap-2"><I className="size-4" aria-hidden />{t}</li>)}
                      </ul>
                      <p className="mb-4 text-sm text-gray-600">{s.price}</p>
                      <div className="flex gap-2"><LinkButton to={s.to} variant="accent" className="flex-1">{s.cta}</LinkButton><LinkButton to="/services" variant="outline" className="flex-1">Learn more</LinkButton></div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Tabs>

          <Card className="mt-12 border-0 bg-gray-800 p-8 text-white">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold"><Headphones className="size-6" />Need a helping hand?</h3>
                <ul className="space-y-2 text-gray-300">
                  {['Agents available worldwide', 'Discuss different options', 'Receive a personalized quote', 'Sign up and get started'].map((t) => <li key={t} className="flex items-center gap-2"><CheckCircle className="size-4 shrink-0" />{t}</li>)}
                </ul>
              </div>
              <LinkButton to="/contact" variant="white" size="lg">Talk to an expert</LinkButton>
            </div>
          </Card>
        </Container>
      </section>

      {/* LinkedIn element: company-page block + conversion path to /linkedin */}
      <section className="bg-white py-20" aria-labelledby="li-heading">
        <Container>
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#0A66C2]/10 px-3 py-1 text-sm font-medium text-[#0A66C2]"><Linkedin className="size-4" />Sovera on LinkedIn</p>
              <h2 id="li-heading" className="text-3xl font-semibold tracking-tight md:text-4xl">Your next introduction is already here</h2>
              <p className="mt-4 max-w-2xl text-lg text-gray-600">Sovera is where Edmonton's founders, consultants and operators meet in person, then keep the conversation going online. Follow along, then come and sit with us.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <LinkButton href={LINKEDIN_URL} variant="linkedin" size="lg"><Linkedin className="size-5" />Follow on LinkedIn</LinkButton>
              <LinkButton to="/linkedin" variant="outline" size="lg">Join the network</LinkButton>
            </div>
          </div>
          <LinkedInCompanyCard />
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <SectionHead center title="Why choose Sovera Global?" sub="More than just workspace: a complete ecosystem for business growth" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map(([I, t, d]) => (
              <div key={t} className="text-center"><div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-blue-100"><I className="size-8 text-blue-600" aria-hidden /></div><h3 className="mb-2 text-lg font-semibold">{t}</h3><p className="text-gray-600">{d}</p></div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-gray-50 py-20">
        <Container>
          <SectionHead center title="Trusted by Edmonton's leading businesses" sub="See what our members have to say about their experience" />
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-2 p-6">
                <div className="mb-4 flex gap-1" aria-label="5 out of 5 stars">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />)}</div>
                <p className="mb-6 italic text-gray-600">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 border-t pt-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-blue-600 text-white">{t.name[0]}</div>
                  <div><div className="font-medium">{t.name}</div><div className="text-sm text-gray-600">{t.role}</div><div className="text-sm text-gray-500">{t.company}</div></div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-blue-600 py-20 text-white">
        <Container className="text-center">
          <h2 className="mb-6 text-3xl font-semibold md:text-4xl">Ready to transform your workspace?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-50">Join hundreds of businesses and professionals at Sovera Global. Schedule a tour today.</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row"><LinkButton to="/contact" variant="white" size="lg" className="text-blue-600">Schedule a Tour</LinkButton><LinkButton to="/memberships" variant="outline" size="lg" className="border-white bg-transparent text-white hover:bg-white/10">View Pricing</LinkButton></div>
        </Container>
      </section>
    </>
  );
}
