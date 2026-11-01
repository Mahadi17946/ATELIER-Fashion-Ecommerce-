import Link from 'next/link';
import {
  FiArrowLeft,
  FiChevronDown,
  FiClock,
  FiMail,
  FiPhone,
  FiRotateCcw,
  FiTruck,
} from 'react-icons/fi';

/* =========================================================
   CONTACT + FAQ: ekhane change korba.
   Ekhon placeholder. Tomar real info diye replace koro.
   ========================================================= */
const CONTACT = {
  phone: '+880 1700-000000',
  phoneHref: 'tel:+8801700000000',
  email: 'hello@atelier.com',
  hours: 'Saturday to Thursday, 10 AM to 8 PM',
};

const FAQS = [
  {
    q: 'How long does delivery take?',
    a: 'Orders inside Dhaka usually arrive within 1 to 2 working days. Orders outside Dhaka usually take 3 to 5 working days.',
  },
  {
    q: 'What is the delivery charge?',
    a: 'Delivery is free on orders over ৳3000. Below that, a delivery charge of ৳80 applies.',
  },
  {
    q: 'Which payment methods do you accept?',
    a: 'You can pay with cash on delivery, bKash or Nagad. Card payments are not available yet.',
  },
  {
    q: 'Can I return or exchange a product?',
    a: 'Yes. Returns are accepted within 7 days of delivery. The item must be unused and have its tags attached. See Return & Cancellation in your orders for details.',
  },
  {
    q: 'Can I cancel my order?',
    a: 'Orders can be cancelled before they are shipped. Once the order is out for delivery, it cannot be cancelled.',
  },
  {
    q: 'How do I find my size?',
    a: 'Each product page lists the available sizes. If you are between two sizes, we suggest choosing the larger one for a relaxed fit.',
  },
  {
    q: 'How do I track my order?',
    a: 'Use the Track order page with your order number and the phone number or email you used when ordering.',
  },
];

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-2';

const QUICK = [
  {
    title: 'Track your order',
    text: 'See where your order is right now.',
    href: '/track-order',
    icon: FiTruck,
  },
  {
    title: 'Returns & cancellations',
    text: 'Start a return or cancel an order.',
    href: '/orders/returns',
    icon: FiRotateCcw,
  },
  {
    title: 'Contact us',
    text: 'Talk to our team directly.',
    href: '#contact',
    icon: FiMail,
  },
];

export default function HelpPage() {
  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12 lg:py-20">
        <Link
          href="/"
          className={`mb-8 inline-flex items-center gap-2 text-[14px] font-medium text-[#111111] no-underline transition-colors hover:text-[#C2410C] ${FOCUS}`}
        >
          <FiArrowLeft size={16} />
          Back
        </Link>

        <div className="mb-12 lg:mb-16">
          <span className="inline-block rounded-full bg-[#F4F4F5] px-4 py-1 text-[11px] font-medium uppercase tracking-widest text-[#111111]">
            Help
          </span>
          <h1 className="mb-0 mt-5 text-[clamp(30px,4vw,48px)] font-normal leading-[1.05] tracking-tight text-[#111111]">
            How can we help?
          </h1>
        </div>

        {/* Quick links */}
        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3">
          {QUICK.map(q => {
            const Icon = q.icon;
            return (
              <li key={q.title}>
                <Link
                  href={q.href}
                  className={`flex h-full flex-col gap-4 rounded-3xl bg-[#F4F4F5] p-6 text-[#111111] no-underline transition-colors hover:bg-[#EAEAEA] ${FOCUS}`}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
                    <Icon size={18} />
                  </span>
                  <span>
                    <span className="block text-[16px] font-medium">
                      {q.title}
                    </span>
                    <span className="mt-1 block text-[14px] text-[#111111]/60">
                      {q.text}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* FAQ */}
        <div className="mt-16 lg:mt-20">
          <h2 className="m-0 text-[clamp(24px,3vw,34px)] font-normal leading-tight tracking-tight text-[#111111]">
            Frequently asked questions
          </h2>
          <div className="mt-8 divide-y divide-black/10 border-y border-black/10">
            {FAQS.map(f => (
              <details key={f.q} className="group py-5">
                <summary
                  className={`flex cursor-pointer list-none items-center justify-between gap-6 text-[16px] font-medium text-[#111111] [&::-webkit-details-marker]:hidden ${FOCUS}`}
                >
                  {f.q}
                  <FiChevronDown
                    size={18}
                    className="flex-none transition-transform duration-200 group-open:rotate-180"
                  />
                </summary>
                <p className="m-0 mt-3 max-w-[720px] text-[15px] leading-relaxed text-[#111111]/70">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div id="contact" className="mt-16 scroll-mt-28 lg:mt-20">
          <h2 className="m-0 text-[clamp(24px,3vw,34px)] font-normal leading-tight tracking-tight text-[#111111]">
            Contact us
          </h2>
          <p className="mb-0 mt-3 text-[14px] text-[#111111]/60">
            Our team replies as soon as we can during working hours.
          </p>

          <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3">
            <li className="flex flex-col gap-3 rounded-3xl border border-black/10 p-6">
              <FiPhone size={18} />
              <span className="text-[13px] text-[#111111]/55">Phone</span>
              <a
                href={CONTACT.phoneHref}
                className="text-[15px] font-medium text-[#111111] no-underline hover:text-[#C2410C]"
              >
                {CONTACT.phone}
              </a>
            </li>
            <li className="flex flex-col gap-3 rounded-3xl border border-black/10 p-6">
              <FiMail size={18} />
              <span className="text-[13px] text-[#111111]/55">Email</span>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-[15px] font-medium text-[#111111] no-underline hover:text-[#C2410C]"
              >
                {CONTACT.email}
              </a>
            </li>
            <li className="flex flex-col gap-3 rounded-3xl border border-black/10 p-6">
              <FiClock size={18} />
              <span className="text-[13px] text-[#111111]/55">
                Working hours
              </span>
              <span className="text-[15px] font-medium text-[#111111]">
                {CONTACT.hours}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
