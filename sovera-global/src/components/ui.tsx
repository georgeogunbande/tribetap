import { useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';

type Variant = 'primary' | 'accent' | 'outline' | 'white' | 'ghost' | 'linkedin';
const variants: Record<Variant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  accent: 'bg-orange-500 text-white hover:bg-orange-600',
  outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50',
  white: 'bg-white text-gray-900 hover:bg-gray-100',
  ghost: 'text-gray-700 hover:bg-gray-100',
  linkedin: 'bg-[#0A66C2] text-white hover:bg-[#004182]',
};
const sizes = { md: 'h-10 px-5 text-sm', lg: 'h-12 px-8 text-base', sm: 'h-8 px-3 text-sm' };

type BtnProps = { variant?: Variant; size?: keyof typeof sizes; className?: string; children: ReactNode };
const base = 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
const cls = (v: Variant, s: keyof typeof sizes, extra = '') => twMerge(base, variants[v], sizes[s], extra);

export function Button({ variant = 'primary', size = 'md', className, children, ...rest }: BtnProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cls(variant, size, className)} {...rest}>{children}</button>;
}

export function LinkButton({ to, href, variant = 'primary', size = 'md', className, children }: BtnProps & { to?: string; href?: string }) {
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls(variant, size, className)}>{children}</a>;
  return <Link to={to ?? '/'} className={cls(variant, size, className)}>{children}</Link>;
}

export function Card({ className = '', children, ...rest }: { className?: string; children: ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return <div className={twMerge('rounded-xl border border-gray-200 bg-white', className)} {...rest}>{children}</div>;
}

export function Container({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={twMerge('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}

export function SectionHead({ title, sub, center }: { title: string; sub?: string; center?: boolean }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      {sub && <p className={`mt-4 text-lg text-gray-600 ${center ? 'mx-auto max-w-2xl' : 'max-w-3xl'}`}>{sub}</p>}
    </div>
  );
}

export function Tabs({ tabs, initial, children }: { tabs: { id: string; label: string }[]; initial?: string; children: (active: string) => ReactNode }) {
  const [active, setActive] = useState(initial ?? tabs[0].id);
  return (
    <div>
      <div role="tablist" className="mb-10 grid grid-cols-2 gap-1 rounded-lg border-2 border-gray-200 bg-white p-1 md:grid-cols-4">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={active === t.id} onClick={() => setActive(t.id)}
            className={`cursor-pointer rounded-md px-4 py-3 text-sm font-medium transition-colors ${active === t.id ? 'bg-teal-700 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">{children(active)}</div>
    </div>
  );
}

export function Field({ label, id, children }: { label: string; id: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-800">{label}</label>
      {children}
    </div>
  );
}
export const inputCls = 'w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20';

/** Remote photo that degrades to its (gradient) parent background if it fails to load. */
export function Img({ className = '', alt = '', ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img alt={alt} loading="lazy" onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} className={className} {...rest} />;
}
