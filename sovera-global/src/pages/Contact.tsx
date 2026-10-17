import { useState, type FormEvent } from 'react';
import { CheckCircle, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { Card, Container, Button, Field, inputCls } from '../components/ui';
import { CONTACT, plans } from '../data';

const faqs = [
  ['How do I get a membership card?', "Contact us through this form or visit our location. We'll help you choose the right membership and issue your card immediately."],
  ['Can I upgrade my membership later?', 'Yes. You can upgrade at any time to access more facilities and benefits.'],
  ['Do you offer day passes?', 'Yes, we offer flexible options including day passes for those who want to try our facilities before committing.'],
  ['How does the investment and partnership program work?', 'We review business ideas and proposals from our members. Promising ventures may receive consulting support, partnership opportunities, or direct investment.'],
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No backend yet: wire this to your CRM / email endpoint.
    console.info('contact form', Object.fromEntries(new FormData(e.currentTarget)));
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <>
      <section className="bg-gradient-to-br from-blue-50 via-white to-gray-50 py-16 md:py-20">
        <Container className="text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">Get in Touch</span>
          <h1 className="mb-4 text-4xl font-semibold md:text-5xl">Let's start your journey</h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">Ready to join Sovera Global? Contact us today and let's discuss how we can help your business thrive.</p>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6">
            <Card className="border-2 p-6">
              <h2 className="mb-1 text-lg font-semibold">Contact information</h2><p className="mb-6 text-sm text-gray-600">Get in touch through any of these channels</p>
              <ul className="space-y-6">
                {[[MapPin, 'Location', <p className="text-gray-600">{CONTACT.city}</p>], [Phone, 'Phone', <a href={CONTACT.phoneHref} className="text-gray-600 hover:text-blue-600">{CONTACT.phone}</a>], [Mail, 'Email', <a href={`mailto:${CONTACT.email}`} className="text-gray-600 hover:text-blue-600">{CONTACT.email}</a>], [Clock, 'Business hours', <><p className="text-gray-600">Mon - Fri: 8:00 AM - 8:00 PM</p><p className="text-gray-600">Sat - Sun: 10:00 AM - 6:00 PM</p></>]].map(([I, t, body]) => {
                  const Icon = I as typeof MapPin;
                  return <li key={t as string} className="flex gap-3"><div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-100"><Icon className="size-5 text-blue-600" aria-hidden /></div><div><h3 className="font-medium">{t as string}</h3>{body as React.ReactNode}</div></li>;
                })}
              </ul>
            </Card>
            <Card className="border-0 bg-blue-600 p-6 text-white">
              <h2 className="mb-4 text-lg font-semibold">Why choose Sovera Global?</h2>
              <ul className="space-y-3 text-blue-50">{['Premier business lounge in Edmonton', 'Business consulting and investment support', 'Flexible membership options', 'State-of-the-art facilities', 'Networking with 500+ professionals'].map((t) => <li key={t} className="flex gap-2"><CheckCircle className="mt-0.5 size-5 shrink-0" aria-hidden />{t}</li>)}</ul>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="border-2 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold">Send us a message</h2><p className="mb-6 mt-1 text-gray-600">We'll get back to you within 24 hours.</p>
              {sent && <p role="status" className="mb-6 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">Thank you for your interest! We will contact you shortly.</p>}
              <form onSubmit={submit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Full name *" id="name"><input id="name" name="name" required placeholder="Jane Doe" autoComplete="name" className={inputCls} /></Field>
                  <Field label="Email address *" id="email"><input id="email" name="email" type="email" required placeholder="jane@company.com" autoComplete="email" className={inputCls} /></Field>
                  <Field label="Phone number" id="phone"><input id="phone" name="phone" type="tel" placeholder="+1 (780) 123-4567" autoComplete="tel" className={inputCls} /></Field>
                  <Field label="I'm interested in" id="interest">
                    <select id="interest" name="interest" defaultValue="" className={inputCls}>
                      <option value="" disabled>Select an option</option>
                      {plans.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                      <option value="tour">Schedule a tour</option><option value="consultation">Business consultation</option><option value="other">Other</option>
                    </select>
                  </Field>
                </div>
                <Field label="Message *" id="message"><textarea id="message" name="message" required rows={6} placeholder="Tell us about your needs..." className={inputCls} /></Field>
                <Button type="submit" size="lg"><Send className="size-4" />Send message</Button>
              </form>
            </Card>
            <div className="mt-10">
              <h2 className="mb-6 text-2xl font-semibold">Frequently asked questions</h2>
              <div className="divide-y">{faqs.map(([q, a]) => <details key={q} className="group py-4"><summary className="cursor-pointer list-none font-medium marker:hidden">{q}</summary><p className="mt-2 text-gray-600">{a}</p></details>)}</div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
