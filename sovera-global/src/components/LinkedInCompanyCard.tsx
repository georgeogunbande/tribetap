import { Briefcase, Calendar, MapPin, MessageSquare, Repeat2, Send, ThumbsUp, Users } from 'lucide-react';
import logo from '../assets/logo.png';
import { LINKEDIN_URL, img } from '../data';
import { Img, LinkButton } from './ui';

const posts = [
  { kind: 'Workspace', age: '2d', body: 'New this month: private offices on our downtown floor now start at $650/mo with 24/7 access, cleaning and a Sovera business address included.', image: img.office2, likes: 128, comments: 14, reposts: 9 },
  { kind: 'Community', age: '1w', body: 'Thursday networking night at Downtown Edmonton. Founders, consultants and operators swapping notes over coffee. Members bring a guest free.', image: img.lounge, likes: 214, comments: 31, reposts: 22 },
  { kind: 'Members', age: '2w', body: 'Seven members closed new clients this quarter from conversations that started in our lounge. Your next introduction might be one desk away.', image: null, likes: 96, comments: 8, reposts: 5 },
];

const stat = (n: number) => n.toLocaleString('en-CA');

/**
 * A LinkedIn-company-page-style block: cover, avatar, follow/visit actions, and a post feed.
 * Pure presentation, so the numbers and posts above are sample content to replace with real ones.
 */
export function LinkedInCompanyCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
      <div className="h-28 bg-gradient-to-r from-teal-800 via-teal-700 to-blue-700 sm:h-36" aria-hidden />
      <div className="px-5 pb-5 sm:px-8">
        <div className="-mt-12 flex flex-wrap items-end justify-between gap-4">
          <div className="flex size-24 items-center justify-center rounded-lg border-4 border-white bg-white shadow">
            <img src={logo} alt="Sovera Global logo" className="size-full object-contain p-1" />
          </div>
          <div className="flex gap-2">
            <LinkButton href={LINKEDIN_URL} variant="linkedin" size="md">+ Follow</LinkButton>
            <LinkButton to="/contact" variant="outline" size="md">Message</LinkButton>
          </div>
        </div>
        <h3 className="mt-3 text-2xl font-semibold">Sovera Global</h3>
        <p className="text-gray-700">Premium business hub: offices, coworking, meeting rooms and a professional network.</p>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
          <span className="flex items-center gap-1"><MapPin className="size-3.5" />Edmonton, Alberta</span>
          <span>·</span><span className="flex items-center gap-1"><Users className="size-3.5" />500+ members</span>
          <span>·</span><span className="flex items-center gap-1"><Briefcase className="size-3.5" />Real estate & workspace</span>
        </p>
      </div>
      <div className="border-t bg-gray-50 p-4 sm:p-6">
        <ul className="grid gap-4 md:grid-cols-3">
          {posts.map((p) => (
            <li key={p.body} className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="flex items-center gap-2 p-3">
                <img src={logo} alt="" className="size-9 rounded object-contain" />
                <div className="leading-tight">
                  <div className="text-sm font-semibold">Sovera Global</div>
                  <div className="text-xs text-gray-500">{p.kind} · {p.age}</div>
                </div>
              </div>
              <p className="px-3 pb-3 text-sm text-gray-800">{p.body}</p>
              {p.image ? <div className="aspect-video bg-gradient-to-br from-teal-700 to-blue-700"><Img src={p.image} className="size-full object-cover" /></div> : (
                <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-teal-700 to-blue-700 text-white"><Calendar className="size-10 opacity-80" /></div>
              )}
              <div className="mt-auto flex items-center justify-between border-t px-3 py-2 text-xs text-gray-500">
                <span className="flex items-center gap-1"><ThumbsUp className="size-3.5 text-[#0A66C2]" />{stat(p.likes)}</span>
                <span>{p.comments} comments · {p.reposts} reposts</span>
              </div>
              <div className="grid grid-cols-4 border-t text-xs text-gray-600">
                {[[ThumbsUp, 'Like'], [MessageSquare, 'Comment'], [Repeat2, 'Repost'], [Send, 'Send']].map(([Icon, label]) => {
                  const I = Icon as typeof ThumbsUp;
                  return <span key={label as string} className="flex flex-col items-center gap-0.5 py-2"><I className="size-4" />{label as string}</span>;
                })}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
