'use client';

import Link from 'next/link';
import { FiArrowLeft, FiArrowRight, FiMinus, FiPlus } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';
import { useCart } from '@/lib/cart';

/* =========================================================
   DELIVERY RULE: ekhane change korba
   ========================================================= */
const FREE_DELIVERY_OVER = 3000; // ৳3000 er upore hole delivery free
const DELIVERY_FEE = 80; // ৳ (Dhaka er baire holeo ekhon ei daam)

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-2';

const taka = n => `৳${Number(n).toLocaleString('en-US')}`;

function BackLink() {
  return (
    <Link
      href="/"
      className={`mb-8 inline-flex items-center gap-2 text-[14px] font-medium text-[#111111] no-underline transition-colors hover:text-[#C2410C] ${FOCUS}`}
    >
      <FiArrowLeft size={16} />
      Back
    </Link>
  );
}

export default function CartPage() {
  const { items, ready, count, subtotal, updateQty, removeItem } = useCart();

  // Localstorage load hoyar agey page faka dekhabe, flash na hoy
  if (!ready) {
    return (
      <div className="mx-auto min-h-[60vh] max-w-[1440px] px-6 py-16 lg:px-12" />
    );
  }

  // Cart faka
  if (items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] w-full max-w-[1440px] flex-col items-center justify-center px-6 py-20 text-center">
        <span className="inline-block rounded-full bg-[#F4F4F5] px-4 py-1 text-[11px] font-medium uppercase tracking-widest text-[#111111]">
          My Cart
        </span>
        <h1 className="mb-0 mt-5 text-[clamp(30px,4vw,48px)] font-normal leading-[1.05] tracking-tight text-[#111111]">
          Your cart is empty
        </h1>
        <p className="mb-0 mt-4 max-w-[420px] text-[15px] text-[#111111]/60">
          You haven’t added any items to your cart yet. Explore our collections
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 rounded-full bg-[#111111] px-7 py-3.5 text-[14px] font-medium text-white no-underline transition-colors hover:bg-[#C2410C] ${FOCUS}`}
          >
            Shop now
            <FiArrowRight size={16} />
          </Link>
          <Link
            href="/"
            className={`inline-flex items-center gap-2 rounded-full border border-black/15 px-7 py-3.5 text-[14px] font-medium text-[#111111] no-underline transition-colors hover:bg-[#111111] hover:text-white ${FOCUS}`}
          >
            <FiArrowLeft size={16} />
            Back
          </Link>
        </div>
      </section>
    );
  }

  const freeDelivery = subtotal >= FREE_DELIVERY_OVER;
  const delivery = freeDelivery ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;
  const remaining = FREE_DELIVERY_OVER - subtotal;

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12 lg:py-20">
        <BackLink />

        {/* Header */}
        <div className="mb-10 lg:mb-12">
          <span className="inline-block rounded-full bg-[#F4F4F5] px-4 py-1 text-[11px] font-medium uppercase tracking-widest text-[#111111]">
            Cart
          </span>
          <h1 className="mb-0 mt-5 text-[clamp(30px,4vw,48px)] font-normal leading-[1.05] tracking-tight text-[#111111]">
            Your cart
          </h1>
          <p className="mb-0 mt-3 text-[14px] text-[#111111]/60">
            {count} items
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
          {/* Item list */}
          <ul className="m-0 list-none divide-y divide-black/10 p-0">
            {items.map(item => (
              <li key={item.id} className="flex gap-5 py-6 first:pt-0">
                <Link
                  href={item.href}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="block w-24 flex-none sm:w-32"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#F4F4F5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </Link>

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <Link
                        href={item.href}
                        className={`block truncate text-[15px] font-medium text-[#111111] no-underline hover:underline ${FOCUS}`}
                      >
                        {item.name}
                      </Link>
                      {(item.color || item.size) && (
                        <p className="m-0 mt-1 text-[13px] text-[#111111]/55">
                          {[item.color, item.size && `Size ${item.size}`]
                            .filter(Boolean)
                            .join(' · ')}
                        </p>
                      )}
                    </div>
                    <span className="flex-none text-[15px] font-medium">
                      {taka(item.price * item.qty)}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    {/* Quantity stepper */}
                    <div className="flex items-center gap-1 rounded-full border border-black/15 p-1">
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#111111] hover:bg-black/5 ${FOCUS}`}
                      >
                        <FiMinus size={14} />
                      </button>
                      <span
                        className="min-w-[28px] text-center text-[14px] font-medium"
                        aria-live="polite"
                      >
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#111111] hover:bg-black/5 ${FOCUS}`}
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>

                    {/* Remove item */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                      title="Remove"
                      className={`flex cursor-pointer items-center justify-center text-[#111111]/60 hover:text-[#C2410C] ${FOCUS}`}
                    >
                      <MdDeleteForever size={28} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Summary */}
          <aside className="h-fit rounded-3xl bg-[#F4F4F5] p-6 lg:sticky lg:top-28 lg:p-8">
            <h2 className="m-0 text-[18px] font-medium">Order summary</h2>

            {!freeDelivery && (
              <p className="mb-0 mt-3 rounded-full bg-white px-4 py-2 text-[13px] text-[#111111]/70">
                {taka(remaining)} aro kinle delivery free
              </p>
            )}

            <dl className="m-0 mt-6 flex flex-col gap-3 text-[14px]">
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

            <Link
              href="/checkout"
              className={`mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#111111] py-4 text-[14px] font-medium text-white no-underline transition-colors hover:bg-[#C2410C] ${FOCUS}`}
            >
              Checkout
              <FiArrowRight size={16} />
            </Link>

            <Link
              href="/"
              className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[#111111] py-4 text-[14px] font-medium text-[#111111] no-underline transition-colors hover:bg-[#111111] hover:text-white ${FOCUS}`}
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
