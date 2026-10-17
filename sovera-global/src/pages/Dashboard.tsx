import { Link } from 'react-router';
import { Building2, Calendar, CreditCard, FileText, HelpCircle, MapPin, Settings, Users, Video } from 'lucide-react';
import { Button, Card, Container, LinkButton } from '../components/ui';

const actions = [[Calendar, 'Book a desk', 'Reserve your workspace', 'bg-blue-100 text-blue-600'], [Video, 'Meeting room', 'Book a meeting space', 'bg-green-100 text-green-600'], [MapPin, 'Find locations', 'Explore our centers', 'bg-orange-100 text-orange-600'], [Users, 'Invite team', 'Add team members', 'bg-purple-100 text-purple-600']] as const;
const bookings = [[Building2, 'Hot Desk - Downtown', 'Dec 20, 2025 • 9:00 AM - 5:00 PM', 'bg-blue-100 text-blue-600'], [Video, 'Meeting Room A', 'Dec 18, 2025 • 2:00 PM - 4:00 PM', 'bg-green-100 text-green-600'], [Building2, 'Private Office - West', 'Dec 15, 2025 • Full Day', 'bg-orange-100 text-orange-600']] as const;
const account = [[Users, 'Profile settings'], [CreditCard, 'Billing & payments'], [FileText, 'Membership details'], [Settings, 'Settings']] as const;

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="border-b bg-white py-8">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <div><h1 className="mb-1 text-3xl font-semibold md:text-4xl">Welcome to MySovera</h1><p className="text-gray-600">Manage your membership and bookings</p></div>
          <LinkButton to="/services">Book a space</LinkButton>
        </Container>
      </section>
      <Container className="py-12">
        <Card className="mb-8 border-0 bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
          <dl className="grid gap-6 md:grid-cols-4">{[['MEMBERSHIP', 'Gold'], ['STATUS', 'Active'], ['NEXT BILLING', 'Jan 5, 2026'], ['MONTHLY COST', '$110']].map(([k, v]) => <div key={k}><dt className="mb-1 text-sm opacity-90">{k}</dt><dd className="text-2xl">{v}</dd></div>)}</dl>
        </Card>
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {actions.map(([I, t, d, tone]) => <Card key={t} className="p-6 text-center transition-shadow hover:shadow-lg"><div className={`mx-auto mb-4 flex size-12 items-center justify-center rounded-full ${tone}`}><I className="size-6" aria-hidden /></div><h2 className="mb-1 font-semibold">{t}</h2><p className="text-sm text-gray-600">{d}</p></Card>)}
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2">
            <h2 className="mb-6 text-xl font-semibold">Recent bookings</h2>
            <ul className="space-y-4">{bookings.map(([I, t, d, tone]) => <li key={t} className="flex items-center justify-between rounded-lg bg-gray-50 p-4"><div className="flex items-center gap-4"><div className={`flex size-12 items-center justify-center rounded-lg ${tone}`}><I className="size-6" aria-hidden /></div><div><h3 className="font-semibold">{t}</h3><p className="text-sm text-gray-600">{d}</p></div></div><Button variant="outline" size="sm">View</Button></li>)}</ul>
          </Card>
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">My account</h2>
              <ul className="space-y-1">{[...account, [HelpCircle, 'Help & support']].map(([I, t]) => { const Icon = I as typeof Users; return <li key={t as string}><Link to="/contact" className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-50"><Icon className="size-5 text-gray-600" aria-hidden />{t as string}</Link></li>; })}</ul>
            </Card>
            <Card className="p-6">
              <h2 className="mb-4 font-semibold">Upcoming</h2>
              <ul className="space-y-3">{[['DEC', '22', 'Networking Event', 'Downtown • 6:00 PM', 'bg-blue-100 text-blue-600'], ['JAN', '5', 'Membership Renewal', 'Auto-renewed', 'bg-green-100 text-green-600']].map(([m, d, t, s, tone]) => <li key={t} className="flex gap-3"><div className={`flex size-12 shrink-0 flex-col items-center justify-center rounded-lg ${tone}`}><span className="text-xs">{m}</span><span className="text-lg font-semibold">{d}</span></div><div><h3 className="text-sm font-medium">{t}</h3><p className="text-xs text-gray-600">{s}</p></div></li>)}</ul>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
