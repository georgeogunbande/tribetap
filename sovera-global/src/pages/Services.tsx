import { Bed, Building2, Calendar, Check, Clock, Coffee, Headphones, MapPin, Printer, Shield, Users, Video, Wifi } from 'lucide-react';
import { Card, Container, Img, LinkButton, SectionHead, Tabs } from '../components/ui';
import { img } from '../data';

const offices = [
  { name: 'Private Offices', price: 'From $650/month', desc: 'Ready-to-use, fully equipped offices with everything you need to get started', feats: [[Calendar, 'By month or year'], [Users, 'Teams of any size']], details: ['Private furnished office space', 'Professional business address', 'Office cleaning and maintenance', '24/7 access available', 'High-speed internet included'] },
  { name: 'Custom Offices', price: 'Custom pricing', desc: 'Customize all aspects of your space, including furniture and branding', feats: [[Calendar, 'By month or year + customized'], [Users, 'Teams of any size']], details: ['Fully customizable office design', 'Your branding and furniture choices', 'Dedicated account manager', 'Flexible floor plans', 'Premium amenities included'] },
] as const;
const rooms = [['Boardroom', 'Formal executive meetings and board discussions', '8-12 people', ['Video conferencing', 'Whiteboard', 'Premium furniture']], ['Collaborative', 'Team working sessions and brainstorming', '6-8 people', ['Flexible seating', 'Whiteboards', 'Presentation screen']], ['Theatre Style', 'Professional presentations and seminars', '30-50 people', ['Projector & screen', 'Sound system', 'Podium']], ['Classroom', 'Training sessions and workshops', '20-30 people', ['Individual desks', 'Projector', 'Flip charts']], ['U-Shape', 'Open discussions and collaborative meetings', '15-20 people', ['U-shaped setup', 'Video conferencing', 'Whiteboard']]] as const;
const amenities = [[Wifi, 'High-Speed WiFi', 'Secure, reliable internet throughout'], [Coffee, 'Refreshments', 'Complimentary beverages available'], [Printer, 'Business Services', 'Print, scan, and copy facilities'], [Shield, '24/7 Security', 'Safe and secure environment'], [Clock, 'Flexible Access', 'Access when you need it'], [Headphones, 'IT Support', 'Dedicated technical assistance']] as const;
const virtual = [[MapPin, 'Professional Address', 'Use our Edmonton business address on your cards, website, and correspondence'], [Check, 'Mail Handling', 'Professional mail collection, scanning, and forwarding'], [Video, 'Meeting Room Credits', 'Monthly credits to book meeting rooms when you need them'], [Headphones, 'Phone Answering', 'Professional call handling in your company name'], [Printer, 'Business Services', 'Printing, scanning, and administrative support'], [Building2, 'Lounge Access', 'Drop-in workspace access when you need to work on-site']] as const;

const Ticks = ({ items, tone = 'text-green-600' }: { items: readonly string[]; tone?: string }) => (
  <ul className="space-y-3">{items.map((t) => <li key={t} className="flex gap-3"><Check className={`mt-0.5 size-5 shrink-0 ${tone}`} aria-hidden /><span className="text-gray-700">{t}</span></li>)}</ul>
);

export function Services() {
  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 via-white to-gray-50 py-16 md:py-20">
        <Container className="text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">Professional Business Services</span>
          <h1 className="mb-4 text-4xl font-semibold md:text-5xl">Everything your business needs to succeed</h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">From private offices to meeting rooms, comprehensive business solutions so you can focus on what matters most.</p>
        </Container>
      </section>

      <section className="bg-gray-50 py-20">
        <Container className="max-w-6xl">
          <Tabs tabs={[{ id: 'office', label: 'Office Space' }, { id: 'coworking', label: 'Coworking' }, { id: 'virtual', label: 'Virtual Offices' }, { id: 'meeting', label: 'Meeting Rooms' }]}>
            {(tab) => tab === 'office' ? (
              <div className="space-y-8">
                <SectionHead center title="Private office spaces" sub="Dedicated workspace for your business. Full-time, part-time, or flexible use." />
                <div className="grid gap-8 lg:grid-cols-2">
                  {offices.map((o) => (
                    <Card key={o.name} className="border-2 p-6 transition-colors hover:border-blue-600">
                      <div className="mb-4 flex items-start justify-between"><div className="flex size-12 items-center justify-center rounded-lg bg-blue-100"><Building2 className="size-6 text-blue-600" aria-hidden /></div><span className="text-blue-600">{o.price}</span></div>
                      <h3 className="text-2xl font-semibold">{o.name}</h3><p className="mb-6 mt-1 text-gray-600">{o.desc}</p>
                      <ul className="mb-6 space-y-3">{o.feats.map(([I, t]) => <li key={t} className="flex gap-3"><I className="size-5 shrink-0 text-green-600" aria-hidden /><span className="text-gray-700">{t}</span></li>)}</ul>
                      <Ticks items={o.details} />
                      <LinkButton to="/get-started?plan=office" className="mt-6 w-full">Get Started</LinkButton>
                    </Card>
                  ))}
                </div>
                <div className="rounded-lg border-2 border-blue-100 bg-blue-50 p-8">
                  <h3 className="mb-4 text-lg font-semibold">Pricing options</h3>
                  <div className="grid gap-6 md:grid-cols-3">
                    {[['$650/mo', '1 person office', 'Perfect for solo entrepreneurs'], ['$1,150/mo', '2-3 person office', 'Ideal for small teams'], ['$1,950/mo', 'Up to 4 people', 'Growing businesses']].map(([p, a, b]) => <div key={p} className="rounded-lg bg-white p-6"><div className="mb-2 text-2xl font-semibold">{p}</div><p className="text-sm text-gray-600">{a}</p><p className="text-xs text-gray-500">{b}</p></div>)}
                  </div>
                  <p className="mt-6 text-sm text-gray-600">Also available: business address for cards, mail handling and reception services.</p>
                </div>
              </div>
            ) : tab === 'coworking' ? (
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-3xl font-semibold">Coworking spaces</h2>
                  <p className="mb-6 text-lg text-gray-600">Flexible hot desk access in shared coworking zones, for remote workers, freelancers and teams.</p>
                  <div className="mb-8 space-y-4">{[['Hot Desk Access', 'Choose any available desk in our coworking areas'], ['Book via MySovera App', 'Reserve your space ahead of time'], ['Digital Business Services', 'Print, scan, copy, and more'], ['Community & Networking', 'Connect with like-minded professionals']].map(([h, d]) => <div key={h} className="flex gap-3"><Check className="mt-1 size-5 shrink-0 text-blue-600" aria-hidden /><div><h4 className="font-medium">{h}</h4><p className="text-gray-600">{d}</p></div></div>)}</div>
                  <div className="mb-6 rounded-lg bg-gray-100 p-6"><h4 className="mb-4 font-semibold">Coworking pricing</h4><div className="space-y-3"><div className="flex justify-between"><span className="text-gray-700">10 days/month</span><span className="font-semibold">$250/mo</span></div><div className="flex justify-between"><span className="text-gray-700">Mon-Fri (full month)</span><span className="font-semibold">$325/mo</span></div></div></div>
                  <LinkButton to="/get-started?plan=coworking" size="lg">Get Started</LinkButton>
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-br from-teal-100 to-blue-100 shadow-xl"><Img src={img.desks} alt="Coworking space" className="size-full object-cover" /></div>
              </div>
            ) : tab === 'virtual' ? (
              <div>
                <SectionHead center title="Virtual office solutions" sub="Establish your professional presence without the overhead of a physical office." />
                <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {virtual.map(([I, t, d]) => <Card key={t} className="border-2 p-6"><div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-blue-100"><I className="size-6 text-blue-600" aria-hidden /></div><h3 className="mb-2 text-lg font-semibold">{t}</h3><p className="text-gray-600">{d}</p></Card>)}
                </div>
                <div className="mx-auto max-w-2xl rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-center text-white">
                  <h3 className="mb-4 text-2xl font-semibold">Virtual office pricing</h3><div className="text-5xl font-semibold">$99</div><p className="mb-6 text-lg text-blue-100">per month</p>
                  <LinkButton to="/get-started?plan=virtual-office" variant="white" size="lg" className="text-blue-600">Get Started</LinkButton>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <SectionHead center title="Professional meeting spaces" sub="Book by the hour, half-day, or full day. All rooms include standard amenities." />
                <div className="grid gap-6 md:grid-cols-2">
                  {rooms.map(([n, d, c, f]) => <Card key={n} className="border-2 p-6"><div className="mb-2 flex items-start justify-between"><h3 className="font-semibold">{n}</h3><span className="text-sm text-gray-600">{c}</span></div><p className="mb-4 text-gray-600">{d}</p><div className="flex flex-wrap gap-2">{f.map((x) => <span key={x} className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">{x}</span>)}</div></Card>)}
                </div>
                <div className="mx-auto max-w-2xl rounded-lg border-2 border-blue-100 bg-blue-50 p-8">
                  <h3 className="mb-4 text-center text-lg font-semibold">Meeting room pricing</h3>
                  <div className="grid gap-6 md:grid-cols-3">{[['$45', 'per hour'], ['$150', 'half day (4 hours)'], ['$280', 'full day (8 hours)']].map(([p, l]) => <div key={p} className="rounded-lg bg-white p-6 text-center"><div className="mb-2 text-3xl font-semibold">{p}</div><p className="text-sm text-gray-600">{l}</p></div>)}</div>
                </div>
                <div className="pt-4 text-center"><LinkButton to="/get-started?plan=meeting-room" size="lg">Book a Meeting Room</LinkButton></div>
              </div>
            )}
          </Tabs>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <SectionHead center title="Premium amenities included" sub="All our services come with these standard amenities" />
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {amenities.map(([I, t, d]) => <div key={t} className="text-center"><div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-lg bg-blue-100"><I className="size-7 text-blue-600" aria-hidden /></div><h4 className="mb-1 text-sm font-medium">{t}</h4><p className="text-xs text-gray-600">{d}</p></div>)}
          </div>
        </Container>
      </section>

      <section className="bg-gray-50 py-20">
        <Container className="max-w-5xl">
          <Card className="grid overflow-hidden border-2 md:grid-cols-2">
            <div className="p-10">
              <div className="mb-6 flex size-12 items-center justify-center rounded-lg bg-purple-100"><Bed className="size-6 text-purple-600" aria-hidden /></div>
              <h2 className="mb-4 text-3xl font-semibold">Executive hostels</h2>
              <p className="mb-6 text-lg text-gray-600">Accommodation for business and executive teams using our facilities for multi-day retreats or extended meetings.</p>
              <div className="mb-8"><Ticks tone="text-purple-600" items={['Comfortable accommodations', 'Direct access to all facilities', 'Perfect for multi-day events', 'Team retreat packages available']} /></div>
              <LinkButton to="/contact" className="bg-purple-600 hover:bg-purple-700">Request Information</LinkButton>
            </div>
            <div className="flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 p-10 text-center text-white"><div><Bed className="mx-auto mb-6 size-24 opacity-90" aria-hidden /><h3 className="mb-3 text-2xl font-semibold">Extended stays</h3><p className="text-lg text-purple-100">Everything you need for productive multi-day business sessions</p></div></div>
          </Card>
        </Container>
      </section>

      <section className="bg-blue-600 py-20 text-white">
        <Container className="text-center">
          <h2 className="mb-6 text-3xl font-semibold md:text-4xl">Ready to get started?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-50">Explore our membership options and find the right solution for your business.</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row"><LinkButton to="/memberships" variant="white" size="lg" className="text-blue-600">View Memberships</LinkButton><LinkButton to="/contact" variant="outline" size="lg" className="border-white bg-transparent text-white hover:bg-white/10">Contact Us</LinkButton></div>
        </Container>
      </section>
    </>
  );
}
