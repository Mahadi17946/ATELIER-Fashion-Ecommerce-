'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { FiArrowRight, FiCheck, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '@/lib/cart';
import { PRODUCTS } from '@/lib/products';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Women', value: 'women' },
  { label: 'Men', value: 'men' },
  { label: 'Accessories', value: 'accessories' },
];

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-2';

const taka = n => `৳${Number(n).toLocaleString('en-US')}`;

export default function Trending() {
  const { addItem, wishIds, toggleWish } = useCart();
  const [filter, setFilter] = useState('all');
  const [addedId, setAddedId] = useState(null);

  const items = useMemo(
    () =>
      filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter),
    [filter],
  );

  const handleAdd = p => {
    addItem({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
      href: p.href,
    });
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section aria-labelledby="trending-title" className="w-full">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-12 lg:py-24">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-block rounded-full bg-[#F4F4F5] px-4 py-1 text-[11px] font-medium uppercase tracking-widest text-[#111111]">
              Trending now
            </span>
            <h2
              id="trending-title"
              className="mb-0 mt-5 text-[clamp(30px,4vw,48px)] font-normal leading-[1.05] tracking-tight text-[#111111]"
            >
              Most loved this week
            </h2>
          </div>

          {/* Filter pills */}
          <div
            role="tablist"
            aria-label="Filter by category"
            className="flex flex-wrap gap-2"
          >
            {FILTERS.map(f => {
              const active = filter === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.value)}
                  className={`cursor-pointer rounded-full border px-5 py-2.5 text-[14px] font-medium transition-colors duration-200 ${
                    active
                      ? 'border-[#111111] bg-[#111111] text-white'
                      : 'border-black/15 bg-white text-[#111111] hover:border-[#111111]'
                  } ${FOCUS}`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product grid */}
        <ul className="m-0 grid w-full list-none grid-cols-2 gap-x-3 gap-y-8 p-0 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
          {items.map(p => {
            const isWished = wishIds.includes(p.id);
            const isAdded = addedId === p.id;
            const outOfStock = (p.stock ?? 0) <= 0;
            const needsOptions = (p.sizes?.length ?? 0) > 0;
            const badgeStyle =
              p.badge === 'Sale'
                ? 'bg-[#C2410C] text-white'
                : 'bg-white text-[#111111]';

            const actionBase = `absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 rounded-full py-3 text-[14px] font-medium text-white transition-all duration-300 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 ${FOCUS}`;

            return (
              <li key={p.id} className="group min-w-0">
                {/* Image */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-[#F4F4F5]">
                  <Link
                    href={p.href}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="block h-full w-full"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                    />
                  </Link>

                  {p.badge && (
                    <span
                      className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide ${badgeStyle}`}
                    >
                      {p.badge}
                    </span>
                  )}

                  {/* Wishlist heart */}
                  <button
                    type="button"
                    onClick={() => toggleWish(p)}
                    aria-pressed={isWished}
                    aria-label={
                      isWished
                        ? `Remove ${p.name} from wishlist`
                        : `Add ${p.name} to wishlist`
                    }
                    className={`absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-[#111111] transition-colors duration-200 hover:text-[#C2410C] ${FOCUS}`}
                  >
                    <FiHeart
                      size={17}
                      className={
                        isWished ? 'fill-[#C2410C] text-[#C2410C]' : ''
                      }
                    />
                  </button>

                  {/* Action: stock / size / add */}
                  {outOfStock ? (
                    <button
                      type="button"
                      disabled
                      className={`${actionBase} cursor-not-allowed bg-[#111111]/40 opacity-100 lg:translate-y-0`}
                    >
                      Out of stock
                    </button>
                  ) : needsOptions ? (
                    <Link
                      href={p.href}
                      className={`${actionBase} bg-[#111111] no-underline hover:bg-[#C2410C]`}
                    >
                      <FiShoppingBag size={16} />
                      Select size
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAdd(p)}
                      className={`${actionBase} cursor-pointer ${
                        isAdded
                          ? 'bg-[#C2410C]'
                          : 'bg-[#111111] hover:bg-[#C2410C]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <FiCheck size={16} />
                          Added
                        </>
                      ) : (
                        <>
                          <FiShoppingBag size={16} />
                          Add to bag
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Info */}
                <Link
                  href={p.href}
                  className={`mt-4 block text-[#111111] no-underline ${FOCUS}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="m-0 min-w-0 truncate text-[15px] font-medium leading-snug">
                      {p.name}
                    </h3>
                    <div className="flex flex-none flex-col items-end leading-tight">
                      <span className="text-[15px] font-medium">
                        {taka(p.price)}
                      </span>
                      {p.oldPrice && (
                        <span className="text-[12px] text-[#111111]/45 line-through">
                          {taka(p.oldPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="m-0 mt-1 text-[13px] text-[#111111]/55">
                    {p.category === 'new-in'
                      ? 'New in'
                      : p.category.charAt(0).toUpperCase() +
                        p.category.slice(1)}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Footer link */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-[14px] font-medium text-[#111111] no-underline transition-colors duration-200 hover:bg-[#111111] hover:text-white ${FOCUS}`}
          >
            Shop all products
            <FiArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
