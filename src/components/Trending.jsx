'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { FiArrowRight, FiHeart, FiShoppingBag } from 'react-icons/fi';

/* =========================================================
   PRODUCTS: naam, price, photo ekhane change korba.
   Nijer photo dite hole public/products/ e rekhe
   image: '/products/panjabi.jpg' likho.
   ========================================================= */
const PRODUCTS = [
  {
    id: 'cotton-panjabi',
    name: 'Cotton panjabi',
    category: 'Men',
    price: 2450,
    oldPrice: 2900,
    badge: 'Best seller',
    href: '/product/cotton-panjabi',
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'jamdani-saree',
    name: 'Jamdani saree',
    category: 'Women',
    price: 6800,
    oldPrice: null,
    badge: 'New',
    href: '/product/jamdani-saree',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'leather-tote',
    name: 'Leather tote bag',
    category: 'Accessories',
    price: 2800,
    oldPrice: 3400,
    badge: 'Sale',
    href: '/product/leather-tote-bag',
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'printed-kurti',
    name: 'Printed kurti',
    category: 'Women',
    price: 1650,
    oldPrice: null,
    badge: null,
    href: '/product/printed-kurti',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'linen-shirt',
    name: 'Linen shirt',
    category: 'Men',
    price: 1890,
    oldPrice: null,
    badge: 'New',
    href: '/product/linen-shirt',
    image:
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'silk-scarf',
    name: 'Silk scarf',
    category: 'Accessories',
    price: 1100,
    oldPrice: 1500,
    badge: 'Sale',
    href: '/product/silk-scarf',
    image:
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
  },
];

const FILTERS = ['All', 'Women', 'Men', 'Accessories'];

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-2';

const taka = n => `৳${n.toLocaleString('en-US')}`;

export default function Trending({ onAddToBag }) {
  const [filter, setFilter] = useState('All');
  const [wished, setWished] = useState([]);

  const items = useMemo(
    () =>
      filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter),
    [filter],
  );

  const toggleWish = id => {
    setWished(w => (w.includes(id) ? w.filter(x => x !== id) : [...w, id]));
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
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f)}
                  className={`cursor-pointer rounded-full border px-5 py-2.5 text-[14px] font-medium transition-colors duration-200 ${
                    active
                      ? 'border-[#111111] bg-[#111111] text-white'
                      : 'border-black/15 bg-white text-[#111111] hover:border-[#111111]'
                  } ${FOCUS}`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product grid */}
        <ul className="m-0 grid w-full list-none grid-cols-2 gap-x-3 gap-y-8 p-0 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
          {items.map(p => {
            const isWished = wished.includes(p.id);
            const badgeStyle =
              p.badge === 'Sale'
                ? 'bg-[#C2410C] text-white'
                : 'bg-white text-[#111111]';
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
                    onClick={() => toggleWish(p.id)}
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

                  {/* Add to bag: desktop e hover e, mobile e shob somoy */}
                  <button
                    type="button"
                    onClick={() => onAddToBag?.(p)}
                    className={`absolute inset-x-3 bottom-3 flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#111111] py-3 text-[14px] font-medium text-white transition-all duration-300 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 ${FOCUS}`}
                  >
                    <FiShoppingBag size={16} />
                    Add to bag
                  </button>
                </div>

                {/* Info */}
                <Link
                  href={p.href}
                  className={`mt-4 block no-underline text-[#111111] ${FOCUS}`}
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
                    {p.category}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Footer link */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/shop"
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
