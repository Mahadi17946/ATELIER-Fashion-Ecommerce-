import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiArrowRight, FiPackage } from 'react-icons/fi';

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-2';

const STATUSES = {
  'to-pay': {
    title: 'To Pay',
    description: 'Orders waiting for payment.',
    emptyTitle: 'No orders to pay',
    emptyText: 'Orders that are waiting for payment will appear here.',
  },
  'to-ship': {
    title: 'To Ship',
    description: 'Paid orders that are being prepared for delivery.',
    emptyTitle: 'No orders to ship',
    emptyText: 'Orders that are being packed will appear here.',
  },
  'to-receive': {
    title: 'To Receive',
    description: 'Orders on the way to you.',
    emptyTitle: 'No orders to receive',
    emptyText: 'Orders that are out for delivery will appear here.',
  },
  'to-review': {
    title: 'To Review',
    description: 'Delivered orders you can rate.',
    emptyTitle: 'Nothing to review yet',
    emptyText: 'Delivered products will appear here so you can leave a review.',
  },
  returns: {
    title: 'Return & Cancellation',
    description: 'Your return and cancellation requests.',
    emptyTitle: 'No requests yet',
    emptyText: 'Return and cancellation requests will appear here.',
    policy: [
      'Returns are accepted within 7 days of delivery. The item must be unused and have its tags attached.',
      'Orders can be cancelled before they are shipped.',
      'Refunds go back to your original payment method within 7 working days of receiving the return.',
    ],
  },
};

export default async function OrderStatusRoute({ params }) {
  const { status } = await params;
  const cfg = STATUSES[status];
  if (!cfg) notFound();

  return (
    <div className="flex w-full flex-col gap-10">
      <div>
        <span className="inline-block rounded-full bg-[#F4F4F5] px-4 py-1 text-[11px] font-medium uppercase tracking-widest text-[#111111]">
          My orders
        </span>
        <h1 className="mb-0 mt-5 text-[clamp(30px,4vw,48px)] font-normal leading-[1.05] tracking-tight text-[#111111]">
          {cfg.title}
        </h1>
        <p className="mb-0 mt-3 text-[14px] text-[#111111]/60">
          {cfg.description}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-[#F4F4F5] px-6 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#111111]">
          <FiPackage size={22} />
        </span>
        <h2 className="m-0 text-[18px] font-medium">{cfg.emptyTitle}</h2>
        <p className="m-0 max-w-[420px] text-[14px] text-[#111111]/60">
          {cfg.emptyText}
        </p>
        <Link
          href="/"
          className={`mt-2 inline-flex items-center gap-2 rounded-full bg-[#111111] px-7 py-3.5 text-[14px] font-medium text-white no-underline transition-colors hover:bg-[#C2410C] ${FOCUS}`}
        >
          Continue shopping
          <FiArrowRight size={16} />
        </Link>
      </div>

      {cfg.policy && (
        <section className="rounded-3xl border border-black/10 p-6 sm:p-8">
          <h2 className="m-0 text-[18px] font-medium">Return policy</h2>
          <ul className="m-0 mt-4 flex list-none flex-col gap-3 p-0 text-[14px] leading-relaxed text-[#111111]/70">
            {cfg.policy.map(p => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
