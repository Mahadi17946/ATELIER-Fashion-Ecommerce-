'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi';
import { useCart } from '@/lib/cart';

/* =========================================================
   DELIVERY RULE: cart page er sathe mile rakha hoyeche
   ========================================================= */
const FREE_DELIVERY_OVER = 3000;
const DELIVERY_FEE = 80;

const PAYMENT_METHODS = [
  {
    id: 'cod',
    label: 'Cash on delivery',
    note: 'Product haate peye taka dibben.',
  },
  {
    id: 'bkash',
    label: 'bKash',
    note: 'Order er por bKash e payment korben.',
  },
  {
    id: 'nagad',
    label: 'Nagad',
    note: 'Order er por Nagad e payment korben.',
  },
];

const PHONE_RE = /^01[3-9]\d{8}$/;

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-2';

const INPUT =
  'w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[15px] text-[#111111] outline-none transition-colors placeholder:text-[#111111]/40 focus:border-[#111111]';

const taka = n => `৳${Number(n).toLocaleString('en-US')}`;

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[13px] font-medium text-[#111111]">{label}</span>
      {children}
      {error && <span className="text-[12px] text-[#C2410C]">{error}</span>}
    </label>
  );
}

function BackLink() {
  return (
    <Link
      href="/cart"
      className={`mb-8 inline-flex items-center gap-2 text-[14px] font-medium text-[#111111] no-underline transition-colors hover:text-[#C2410C] ${FOCUS}`}
    >
      <FiArrowLeft size={16} />
      Back to cart
    </Link>
  );
}

export default function CheckoutPage() {
  const { items, ready, subtotal, clearCart } = useCart();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    district: '',
    note: '',
  });
  const [payment, setPayment] = useState('cod');
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);

  const freeDelivery = subtotal >= FREE_DELIVERY_OVER;
  const delivery = freeDelivery ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;

  const onChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Naam likhun';
    if (!PHONE_RE.test(form.phone.trim()))
      next.phone = 'Sothik phone number likhun (01XXXXXXXXX)';
    if (!form.address.trim()) next.address = 'Thikana likhun';
    if (!form.district.trim()) next.district = 'Jela ba shohor likhun';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!validate()) return;

    // TODO: ekhane API te order pathabo
    const orderId = 'ATL' + Date.now().toString().slice(-7);
    setOrder({
      id: orderId,
      total,
      delivery,
      payment,
      items,
      customer: form,
    });
    clearCart();
  };

  // Localstorage load hoyar agey faka dekhabe, flash na hoy
  if (!ready) {
    return (
      <div className="mx-auto min-h-[60vh] max-w-[1440px] px-6 py-16 lg:px-12" />
    );
  }

  // Order hoye geche: success page
  if (order) {
    return (
      <section className="mx-auto flex min-h-[60vh] w-full max-w-[1440px] flex-col items-center justify-center px-6 py-20 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#111111] text-white">
          <FiCheck size={24} />
        </span>
        <h1 className="mb-0 mt-6 text-[clamp(30px,4vw,48px)] font-normal leading-[1.05] tracking-tight text-[#111111]">
          Order niyechi
        </h1>
        <p className="mb-0 mt-4 max-w-[460px] text-[15px] text-[#111111]/60">
          Dhonnobad {order.customer.name}. Apnar order number{' '}
          <span className="font-medium text-[#111111]">{order.id}</span>. Amra
          shiggir apnar sathe jogajog korbo.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 rounded-full bg-[#111111] px-7 py-3.5 text-[14px] font-medium text-white no-underline transition-colors hover:bg-[#C2410C] ${FOCUS}`}
          >
            Continue shopping
            <FiArrowRight size={16} />
          </Link>
        </div>
      </section>
    );
  }

  // Cart faka thakle checkout e kaj nei
  if (items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] w-full max-w-[1440px] flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="mb-0 text-[clamp(30px,4vw,48px)] font-normal leading-[1.05] tracking-tight text-[#111111]">
          Your cart is empty
        </h1>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 rounded-full bg-[#111111] px-7 py-3.5 text-[14px] font-medium text-white no-underline transition-colors hover:bg-[#C2410C] ${FOCUS}`}
          >
            Shop now
            <FiArrowRight size={16} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12 lg:py-20">
        <BackLink />

        {/* Header */}
        <div className="mb-10 lg:mb-12">
          <span className="inline-block rounded-full bg-[#F4F4F5] px-4 py-1 text-[11px] font-medium uppercase tracking-widest text-[#111111]">
            Checkout
          </span>
          <h1 className="mb-0 mt-5 text-[clamp(30px,4vw,48px)] font-normal leading-[1.05] tracking-tight text-[#111111]">
            Delivery details
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
          {/* Form */}
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-10">
            {/* Delivery info */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Full name" error={errors.name}>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Apnar naam"
                  className={INPUT}
                />
              </Field>

              <Field label="Phone number" error={errors.phone}>
                <input
                  name="phone"
                  inputMode="tel"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="01XXXXXXXXX"
                  className={INPUT}
                />
              </Field>

              <div className="sm:col-span-2">
                <Field label="Address" error={errors.address}>
                  <textarea
                    name="address"
                    rows={3}
                    value={form.address}
                    onChange={onChange}
                    placeholder="House, road, area"
                    className={`${INPUT} resize-none`}
                  />
                </Field>
              </div>

              <Field label="District / City" error={errors.district}>
                <input
                  name="district"
                  value={form.district}
                  onChange={onChange}
                  placeholder="Dhaka"
                  className={INPUT}
                />
              </Field>

              <Field label="Note (optional)">
                <input
                  name="note"
                  value={form.note}
                  onChange={onChange}
                  placeholder="Delivery ar jonno kichu"
                  className={INPUT}
                />
              </Field>
            </div>

            {/* Payment */}
            <div className="flex flex-col gap-4">
              <h2 className="m-0 text-[18px] font-medium">Payment method</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {PAYMENT_METHODS.map(m => {
                  const checked = payment === m.id;
                  return (
                    <label
                      key={m.id}
                      className={`flex cursor-pointer flex-col gap-1 rounded-2xl border p-4 transition-colors ${
                        checked
                          ? 'border-[#111111] bg-[#F4F4F5]'
                          : 'border-black/15 bg-white hover:border-[#111111]'
                      } ${FOCUS}`}
                    >
                      <span className="flex items-center gap-2 text-[14px] font-medium">
                        <input
                          type="radio"
                          name="payment"
                          value={m.id}
                          checked={checked}
                          onChange={() => setPayment(m.id)}
                          className="accent-[#111111]"
                        />
                        {m.label}
                      </span>
                      <span className="pl-6 text-[12px] text-[#111111]/55">
                        {m.note}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#111111] py-4 text-[14px] font-medium text-white transition-colors hover:bg-[#C2410C] ${FOCUS}`}
            >
              Place order · {taka(total)}
              <FiArrowRight size={16} />
            </button>
          </form>

          {/* Summary */}
          <aside className="h-fit rounded-3xl bg-[#F4F4F5] p-6 lg:sticky lg:top-28 lg:p-8">
            <h2 className="m-0 text-[18px] font-medium">Your order</h2>

            <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
              {items.map(item => (
                <li
                  key={item.id}
                  className="flex justify-between gap-4 text-[14px]"
                >
                  <span className="min-w-0 truncate">
                    {item.name} × {item.qty}
                  </span>
                  <span className="flex-none">
                    {taka(item.price * item.qty)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="m-0 mt-6 flex flex-col gap-3 border-t border-black/10 pt-6 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-[#111111]/65">Subtotal</dt>
                <dd className="m-0">{taka(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#111111]/65">Delivery</dt>
                <dd className="m-0">
                  {freeDelivery ? 'Free' : taka(delivery)}
                </dd>
              </div>
            </dl>

            <div className="mt-5 flex justify-between border-t border-black/10 pt-5 text-[16px] font-medium">
              <span>Total</span>
              <span>{taka(total)}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
