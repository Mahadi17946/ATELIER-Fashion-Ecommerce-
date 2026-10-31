'use client';

import Link from 'next/link';
import {
  FiArrowLeft,
  FiArrowRight,
  FiHeart,
  FiShoppingBag,
} from 'react-icons/fi';
import { useCart } from '@/lib/cart';

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

export default function WishlistPage() {
  const { ready, wishItems, wishCount, addItem, removeWish } = useCart();

  // Localstorage load hoyar agey page faka dekhabe, flash na hoy
  if (!ready) {
    return (
      <div className="mx-auto min-h-[60vh] max-w-[1440px] px-6 py-16 lg:px-12" />
    );
  }

  // Wishlist faka
  if (wishItems.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] w-full max-w-[1440px] flex-col items-center justify-center px-6 py-20 text-center">
        <span className="inline-block rounded-full bg-[#F4F4F5] px-4 py-1 text-[11px] font-medium uppercase tracking-widest text-[#111111]">
          Wishlist
        </span>
        <h1 className="mb-0 mt-5 text-[clamp(30px,4vw,48px)] font-normal leading-[1.05] tracking-tight text-[#111111]">
          Apnar wishlist ekhon khali
        </h1>
        <p className="mb-0 mt-4 max-w-[420px] text-[15px] text-[#111111]/60">
          Pochondo hole heart icon e click korun, ekhane jamba.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/shop"
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

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12 lg:py-20">
        <BackLink />

        {/* Header */}
        <div className="mb-10 lg:mb-12">
          <span className="inline-block rounded-full bg-[#F4F4F5] px-4 py-1 text-[11px] font-medium uppercase tracking-widest text-[#111111]">
            Wishlist
          </span>
          <h1 className="mb-0 mt-5 text-[clamp(30px,4vw,48px)] font-normal leading-[1.05] tracking-tight text-[#111111]">
            Your wishlist
          </h1>
          <p className="mb-0 mt-3 text-[14px] text-[#111111]/60">
            {wishCount} ta item
          </p>
        </div>

        {/* Grid */}
        <ul className="m-0 grid list-none grid-cols-2 gap-x-3 gap-y-10 p-0 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-4">
          {wishItems.map(item => (
            <li key={item.id} className="min-w-0">
              <div className="relative">
                <Link
                  href={item.href}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="block"
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

                {/* Remove from wishlist */}
                <button
                  type="button"
                  onClick={() => removeWish(item.id)}
                  aria-label={`Remove ${item.name} from wishlist`}
                  className={`absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-[#111111] transition-colors duration-200 hover:text-[#C2410C] ${FOCUS}`}
                >
                  <FiHeart
                    size={16}
                    className="fill-[#C2410C] text-[#C2410C]"
                  />
                </button>
              </div>

              <Link
                href={item.href}
                className={`mt-4 block text-[#111111] no-underline ${FOCUS}`}
              >
                <h3 className="m-0 truncate text-[14px] font-medium leading-snug">
                  {item.name}
                </h3>
                <p className="m-0 mt-1 text-[14px] text-[#111111]/70">
                  {taka(item.price)}
                </p>
              </Link>

              {/* Bag e move: cart e jog hobe, wishlist theke soriye dibe */}
              <button
                type="button"
                onClick={() => {
                  addItem(item, 1);
                  removeWish(item.id);
                }}
                className={`mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#111111] py-3 text-[13px] font-medium text-white transition-colors duration-200 hover:bg-[#C2410C] ${FOCUS}`}
              >
                <FiShoppingBag size={15} />
                Add to bag
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
