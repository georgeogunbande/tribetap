import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { Clock, Linkedin, Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import logo from '../assets/logo.png';
import { CONTACT, LINKEDIN_URL } from '../data';
import { Container, LinkButton } from './ui';

const nav = [
  { name: 'Home', href: '/' },
  { name: 'Memberships', href: '/memberships' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <img src={logo} alt="" className="h-12 w-auto" />
      <span className="flex flex-col">
        <span className={`text-xl font-semibold leading-none ${inverted ? 'text-white' : ''}`}>Sovera Global</span>
        <span className={`text-xs ${inverted ? 'text-gray-300' : 'text-gray-500'}`}>Premium Business Hub</span>
      </span>
    </Link>
  );
}

export function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <div className="bg-gray-900 text-sm text-white">
        <Container className="flex h-10 items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={CONTACT.phoneHref} className="flex items-center gap-1.5 hover:text-gray-300"><Phone className="size-3.5" /><span className="hidden sm:inline">{CONTACT.phone}</span></a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-1.5 hover:text-gray-300"><Mail className="size-3.5" /><span className="hidden md:inline">{CONTACT.email}</span></a>
          </div>
          <div className="flex items-center gap-4 text-gray-300">
            <span className="flex items-center gap-1.5 text-xs"><Clock className="size-3.5" />Mon-Fri: 8am-8pm</span>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="Sovera Global on LinkedIn" className="hover:text-white"><Linkedin className="size-4" /></a>
          </div>
        </Container>
      </div>

      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <Container className="flex h-20 items-center justify-between">
          <Brand />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {nav.map((n) => (
              <NavLink key={n.href} to={n.href} end={n.href === '/'}
                className={({ isActive }) => `relative transition-colors ${isActive ? 'text-blue-600 after:absolute after:-bottom-[26px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
                {n.name}
              </NavLink>
            ))}
            <LinkButton to="/linkedin" variant="linkedin" size="sm"><Linkedin className="size-4" />Connect</LinkButton>
            <LinkButton to="/get-started">Get Started</LinkButton>
          </nav>
          <button className="rounded-md p-2 hover:bg-gray-100 md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </Container>
        {open && (
          <nav className="border-t bg-white md:hidden" aria-label="Mobile">
            <Container className="flex flex-col gap-1 py-4">
              {nav.map((n) => (
                <NavLink key={n.href} to={n.href} end={n.href === '/'} className={({ isActive }) => `rounded-md px-3 py-3 text-lg ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}>{n.name}</NavLink>
              ))}
              <div className="mt-2 grid gap-2">
                <LinkButton to="/linkedin" variant="linkedin"><Linkedin className="size-4" />Connect on LinkedIn</LinkButton>
                <LinkButton to="/get-started">Get Started</LinkButton>
              </div>
            </Container>
          </nav>
        )}
      </header>

      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}

function Footer() {
  const col = (title: string, items: [string, string][]) => (
    <div>
      <h3 className="mb-4 font-semibold">{title}</h3>
      <ul className="space-y-3 text-gray-600">
        {items.map(([label, to]) => <li key={label}><Link to={to} className="hover:text-blue-600">{label}</Link></li>)}
      </ul>
    </div>
  );
  return (
    <footer className="border-t bg-gray-50">
      <Container className="py-16">
        <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Brand />
            <p className="mb-6 mt-4 max-w-sm text-gray-600">Canada's premier business lounge offering workspace, networking, consulting, and investment opportunities all under one roof.</p>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start gap-2"><MapPin className="mt-1 size-4 shrink-0" />{CONTACT.city}</div>
              <a href={CONTACT.phoneHref} className="flex items-center gap-2 hover:text-blue-600"><Phone className="size-4" />{CONTACT.phone}</a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-blue-600"><Mail className="size-4" />{CONTACT.email}</a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#0A66C2]"><Linkedin className="size-4" />Follow us on LinkedIn</a>
            </div>
          </div>
          {col('Our Services', [['Private Offices', '/services'], ['Meeting Rooms', '/services'], ['Business Lounge', '/services'], ['Virtual Offices', '/services']])}
          {col('Memberships', [['Blue', '/memberships'], ['Gold', '/memberships'], ['Platinum', '/memberships'], ['Partnerships', '/memberships']])}
          {col('Company', [['Connect on LinkedIn', '/linkedin'], ['Contact', '/contact'], ['MySovera', '/dashboard'], ['Get Started', '/get-started']])}
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-gray-600 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Sovera Global. All rights reserved.</p>
          <div className="flex gap-6"><a href="#" className="hover:text-blue-600">Privacy Policy</a><a href="#" className="hover:text-blue-600">Terms of Service</a></div>
        </div>
      </Container>
    </footer>
  );
}

/** Minimal chrome for paid-traffic landing pages: logo and one exit, no site nav. */
export function FocusedLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <ScrollToTop />
      <header className="border-b bg-white">
        <Container className="flex h-16 items-center justify-between">
          <Brand />
          <Link to="/" className="text-sm text-gray-600 hover:text-blue-600">Visit full site →</Link>
        </Container>
      </header>
      <main className="flex-1"><Outlet /></main>
      <footer className="border-t bg-white py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Sovera Global · {CONTACT.city}
      </footer>
    </div>
  );
}
