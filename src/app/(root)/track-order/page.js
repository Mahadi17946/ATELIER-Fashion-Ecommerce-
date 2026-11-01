'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FiArrowLeft,
  FiCheck,
  FiPackage,
  FiSearch,
  FiTruck,
} from 'react-icons/fi';

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-2';

const INPUT =
  'w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[15px] text-[#111111] outline-none transition-colors placeholder:text-[#111111]/40 focus:border-[#111111]';

const taka = n => `৳${Number(n).toLocaleString('en-US')}`;

const STEPS = [
  { key: 'placed', label: 'Order placed', icon: FiPackage },
  { key: 'confirmed', label: 'Confirmed', icon: FiCheck },
  { key: 'packed', label: 'Packed', icon: FiPackage },
  { key: 'shipped', label: 'Out for delivery', icon: FiTruck },
  { key: 'delivered', label: 'Delivered', icon: FiCheck },
];

/*
  TODO: backend connect korar por ekhane order khujbe.
  Ekhon sob somoy null return kore, tai "not found" message ashbe.
  Backend theke pathabe:
  { orderId, statusIndex (0-4), total, placedAt, items: [{ name, qty }] }
*/
async function findOrder(orderId, contact) {
  return null;
}

function Timeline({ currentIndex }) {
  return (
    <ol className="m-0 flex list-none flex-col gap-6 p-0">
      {STEPS.map((s, i) => {
        const done = i <= currentIndex;
        const Icon = s.icon;
        return (
          <li key={s.key} className="flex items-center gap-4">
            <span
              className={`flex h-10 w-10 flex-none items-center justify-center rounded-full ${
                done
                  ? 'bg-[#111111] text-white'
                  : 'bg-[#F4F4F5] text-[#111111]/40'
              }`}
            >
              <Icon size={16} />
            </span>
            <span
              className={`text-[15px] ${
                done ? 'font-medium text-[#111111]' : 'text-[#111111]/45'
              }`}
            >
              {s.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default function TrackOrderPage() {
  const [form, setForm] = useState({ orderId: '', contact: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | notfound | found
  const [result, setResult] = useState(null);

  const onChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    const next = {};
    if (!form.orderId.trim()) next.orderId = 'Please enter your order number.';
    if (!form.contact.trim())
      next.contact = 'Please enter the phone number or email you used.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus('loading');
    const found = await findOrder(form.orderId.trim(), form.contact.trim());
    if (found) {
      setResult(found);
      setStatus('found');
    } else {
      setResult(null);
      setStatus('notfound');
    }
  };

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

        <div className="mb-10 lg:mb-12">
          <span className="inline-block rounded-full bg-[#F4F4F5] px-4 py-1 text-[11px] font-medium uppercase tracking-widest text-[#111111]">
            Track order
          </span>
          <h1 className="mb-0 mt-5 text-[clamp(30px,4vw,48px)] font-normal leading-[1.05] tracking-tight text-[#111111]">
            Track your order
          </h1>
          <p className="mb-0 mt-3 max-w-[520px] text-[14px] text-[#111111]/60">
            Enter the order number from your confirmation message, and the phone
            number or email you used when you ordered.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[420px_1fr] lg:gap-16">
          {/* Form */}
          <form
            onSubmit={onSubmit}
            noValidate
            className="flex h-fit flex-col gap-5 rounded-3xl bg-[#F4F4F5] p-6 sm:p-8"
          >
            <label className="flex flex-col gap-2">
              <span className="text-[13px] font-medium">Order number</span>
              <input
                name="orderId"
                value={form.orderId}
                onChange={onChange}
                placeholder="e.g. ATL1234567"
                className={INPUT}
              />
              {errors.orderId && (
                <span className="text-[12px] text-[#C2410C]">
                  {errors.orderId}
                </span>
              )}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-[13px] font-medium">Phone or email</span>
              <input
                name="contact"
                value={form.contact}
                onChange={onChange}
                placeholder="01XXXXXXXXX or name@example.com"
                className={INPUT}
              />
              {errors.contact && (
                <span className="text-[12px] text-[#C2410C]">
                  {errors.contact}
                </span>
              )}
            </label>

            <button
              type="submit"
              disabled={status === 'loading'}
              className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#111111] py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-[#C2410C] disabled:cursor-wait disabled:opacity-60 ${FOCUS}`}
            >
              <FiSearch size={16} />
              {status === 'loading' ? 'Checking...' : 'Track order'}
            </button>
          </form>

          {/* Result */}
          <div>
            {status === 'idle' && (
              <p className="m-0 text-[15px] text-[#111111]/50">
                Your order status will appear here.
              </p>
            )}

            {status === 'notfound' && (
              <div className="rounded-3xl border border-black/10 p-6 sm:p-8">
                <h2 className="m-0 text-[18px] font-medium">Order not found</h2>
                <p className="m-0 mt-2 text-[14px] text-[#111111]/60">
                  We could not find an order with these details. Check the order
                  number and the phone or email you used, then try again. If you
                  still need help, visit our{' '}
                  <Link
                    href="/help#contact"
                    className="text-[#111111] underline underline-offset-4 hover:text-[#C2410C]"
                  >
                    help page
                  </Link>
                  .
                </p>
              </div>
            )}

            {status === 'found' && result && (
              <div className="flex flex-col gap-8 rounded-3xl border border-black/10 p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="m-0 text-[13px] text-[#111111]/55">
                      Order number
                    </p>
                    <p className="m-0 mt-1 text-[18px] font-medium">
                      {result.orderId}
                    </p>
                  </div>
                  {result.total != null && (
                    <p className="m-0 text-[15px]">
                      Total: {taka(result.total)}
                    </p>
                  )}
                </div>

                <Timeline currentIndex={result.statusIndex} />

                {result.items?.length > 0 && (
                  <ul className="m-0 flex list-none flex-col gap-2 border-t border-black/10 pt-6 p-0 text-[14px] text-[#111111]/70">
                    {result.items.map(item => (
                      <li key={item.name}>
                        {item.name} × {item.qty}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
