import { BookOpen, Building2, Coffee, MapPin, Users, Video, type LucideIcon } from 'lucide-react';

export const CONTACT = {
  phone: '+1 (780) 400 1234',
  phoneHref: 'tel:+17804001234',
  email: 'info@sovereglobal.com',
  city: 'Edmonton, Alberta, Canada',
};

// Placeholder: replace with the real company page URL.
export const LINKEDIN_URL = 'https://www.linkedin.com/company/sovera-global';

export type Plan = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  basePrice: number; // 0 = custom
  features: string[];
  pricing: { label: string; sublabel: string }[];
  popular?: boolean;
};

export const plans: Plan[] = [
  { id: 'blue', name: 'Blue', description: 'Library access membership', icon: BookOpen, basePrice: 25,
    features: ['Full access to quiet study and focus areas', 'High-speed Wi-Fi', 'Flexible scheduling during staffed hours'],
    pricing: [{ label: 'From $25', sublabel: 'pp, per/mo' }, { label: 'From $45', sublabel: 'pp, 5 days a month' }, { label: 'From $70', sublabel: 'pp, 10 days a month' }] },
  { id: 'lounge', name: 'Lounge', description: 'Access to any Sovera lounge', icon: Coffee, basePrice: 60,
    features: ['Access to Sovera business lounges', 'Use of coworking spaces and shared amenities', '10% discount when you book via MySovera'],
    pricing: [{ label: 'From $60', sublabel: 'pp, per/mo' }, { label: 'From $90', sublabel: 'pp, 5 days a month' }, { label: 'From $140', sublabel: 'pp, 10 days a month' }] },
  { id: 'coworking', name: 'Coworking', description: 'Hot desk & shared workspace', icon: Users, basePrice: 325,
    features: ['Hot desk access in shared coworking zones', 'Live digital business services', 'Book your days with the MySovera app', 'Mon-Fri access included'],
    pricing: [{ label: 'From $325', sublabel: 'pp, per/mo (Mon–Fri)' }, { label: 'From $250', sublabel: 'pp, 10 days a month' }] },
  { id: 'office', name: 'Office', description: 'Private office space', icon: Building2, basePrice: 650,
    features: ['Private office access (furnished)', 'Office cleaning and maintenance', 'Book your office and extras with the app', '24/7 access available'],
    pricing: [{ label: 'From $650', sublabel: 'per office, per/mo (1 person)' }, { label: 'From $1,150', sublabel: 'per office, per/mo (2–3 people)' }, { label: 'From $1,950', sublabel: 'per office, per/mo (up to 4 people)' }] },
  { id: 'virtual-office', name: 'Virtual Office', description: 'Business address & mail handling', icon: MapPin, basePrice: 99,
    features: ['Professional business address', 'Mail handling and forwarding', 'Meeting room credits included', 'Phone answering service available'],
    pricing: [{ label: 'From $99', sublabel: 'per/mo' }] },
  { id: 'meeting-room', name: 'Meeting Room', description: 'Book meeting spaces as needed', icon: Video, basePrice: 45,
    features: ['Hourly booking available', 'Video conferencing equipment', 'Whiteboard & presentation tools', 'Refreshments included'],
    pricing: [{ label: 'From $45', sublabel: 'per hour' }] },
  { id: 'gold', name: 'Gold', description: 'Premium business access', icon: Building2, basePrice: 110, popular: true,
    features: ['Premium workspaces across Sovera', 'Meeting room access (4 hrs/month included)', 'Business travel support', 'Dedicated support team'],
    pricing: [{ label: 'From $110', sublabel: 'pp, per/mo' }, { label: 'From $120', sublabel: 'pp, 5 days a month' }, { label: 'From $135', sublabel: 'pp, 10 days a month' }] },
  { id: 'platinum', name: 'Platinum', description: 'Exclusive corporate access', icon: Building2, basePrice: 0,
    features: ['Full corporate access for your team', 'Unlimited meeting rooms', 'Business address & virtual office service', 'Dedicated account manager'],
    pricing: [{ label: 'Custom', sublabel: 'tailored to your team' }] },
];

export const locations = [
  { id: 'downtown', name: 'Downtown Edmonton', address: '10155 102 St', city: 'Edmonton, AB' },
  { id: 'south', name: 'South Edmonton', address: '2803 Calgary Trail NW', city: 'Edmonton, AB' },
  { id: 'west', name: 'West Edmonton', address: '8882 170 St NW', city: 'Edmonton, AB' },
];

export const terms = [
  { id: 'month-to-month', label: 'Month-to-month', discount: 0, factor: 1 },
  { id: '6-months', label: '6 months', discount: 10, factor: 0.9 },
  { id: '12-months', label: '12 months', discount: 20, factor: 0.8 },
];

export const addOns = [
  { id: 'meeting-4', label: 'Meeting room (4 hrs/mo)', price: 40 },
  { id: 'meeting-8', label: 'Meeting room (8 hrs/mo)', price: 75 },
  { id: 'virtual-office', label: 'Virtual office & mail handling', price: 50 },
  { id: 'lounge-access', label: 'Additional lounge access', price: 30 },
];

export const img = {
  office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80',
  office2: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
  desks: 'https://images.unsplash.com/photo-1560821630-1a7c45c3286e?w=800&q=80',
  lounge: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
  meeting: 'https://images.unsplash.com/photo-1759310610372-c547611af808?w=800&q=80',
  virtual: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
};
