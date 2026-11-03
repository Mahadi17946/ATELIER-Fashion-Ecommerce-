'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { FiArrowRight, FiCheck, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '@/lib/cart';

/* =========================================================
   CATEGORIES: sidebar er list
   ========================================================= */
const CATEGORIES = [
  { slug: 'all', name: 'All' },
  { slug: 'women', name: 'Women' },
  { slug: 'men', name: 'Men' },
  { slug: 'accessories', name: 'Accessories' },
  { slug: 'new-in', name: 'New in' },
];

/* =========================================================
   PRODUCTS: naam, daam, photo, colour, href ekhane change korba.
   href: product page er link.
   ========================================================= */
const PRODUCTS = [
  {
    id: '1',
    name: 'Cotton panjabi',
    category: 'men',
    price: 2450,
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    colors: ['#111111', '#D9CBB5'],
    href: '/product/cotton-panjabi',
  },
  {
    id: '2',
    name: 'Jamdani saree',
    category: 'women',
    price: 6800,
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    colors: ['#C2410C', '#E7C9A9'],
    href: '/product/jamdani-saree',
  },
  {
    id: '3',
    name: 'Leather tote bag',
    category: 'accessories',
    price: 2800,
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    colors: ['#3A2A20'],
    href: '/product/leather-tote-bag',
  },
  {
    id: '4',
    name: 'Printed kurti',
    category: 'women',
    price: 1650,
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    colors: ['#D5B8A6', '#B9C4B0'],
    href: '/product/printed-kurti',
  },
  {
    id: '5',
    name: 'Linen shirt',
    category: 'men',
    price: 1890,
    image:
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80',
    colors: ['#C9D1C0', '#FFFFFF'],
    href: '/product/linen-shirt',
  },
  {
    id: '6',
    name: 'Silk scarf',
    category: 'accessories',
    price: 1100,
    image:
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
    colors: ['#E8B9A0'],
    href: '/product/silk-scarf',
  },
  {
    id: '7',
    name: 'Three piece set',
    category: 'women',
    price: 3200,
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    colors: ['#B9C4B0'],
    href: '/product/three-piece-set',
  },
  {
    id: '8',
    name: 'Heavy cotton t-shirt',
    category: 'new-in',
    price: 950,
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    colors: ['#E4D9C7', '#111111'],
    href: '/product/heavy-cotton-tee',
  },
];

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-2';

const taka = n => `৳${Number(n).toLocaleString('en-US')}`;

export default function Categories() {
  const { addItem, wishIds, toggleWish } = useCart();
  const [active, setActive] = useState('all');

  const [addedId, setAddedId] = useState(null);

  const products = useMemo(
    () =>
      active === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === active),
    [active],
  );

  const handleAdd = product => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      href: product.href,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section aria-labelledby="categories-title" className="w-full">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-12 lg:py-24">
        {/* Header */}
        <div className="mb-10 lg:mb-12">
          <span className="inline-block rounded-full bg-[#F4F4F5] px-4 py-1 text-[11px] font-medium uppercase tracking-widest text-[#111111]">
            Collections
          </span>
          <h2
            id="categories-title"
            className="mb-0 mt-5 text-[clamp(30px,4vw,48px)] font-normal leading-[1.05] tracking-tight text-[#111111]"
          >
            Shop by category
          </h2>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
          {/* Sidebar: desktop e vertical list, mobile e horizontal chips */}
          <aside className="lg:w-[200px] lg:flex-none">
            <nav aria-label="Categories">
              <ul className="category-scroll m-0 flex list-none gap-2 overflow-x-auto overscroll-x-contain touch-pan-x p-0 pb-2 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0">
                {CATEGORIES.map(c => {
                  const isActive = active === c.slug;
                  return (
                    <li key={c.slug} className="flex-none lg:w-full">
                      <button
                        type="button"
                        onClick={() => setActive(c.slug)}
                        aria-current={isActive ? 'true' : undefined}
                        className={`w-full cursor-pointer whitespace-nowrap rounded-full px-4 py-2.5 text-left text-[13px] font-medium tracking-wide transition-all duration-200 lg:rounded-lg lg:px-4 lg:py-3 lg:text-[14px] ${
                          isActive
                            ? 'bg-[#111111] text-white'
                            : 'border border-black/15 text-[#111111]/65 hover:border-black/30 hover:bg-[#F7F7F5] hover:text-[#111111] lg:border-transparent'
                        } ${FOCUS}`}
                      >
                        {c.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <Link
              href="/shop"
              className={`mt-6 hidden items-center gap-2 text-[13px] font-medium uppercase tracking-wide text-[#111111] no-underline hover:text-[#C2410C] lg:inline-flex ${FOCUS}`}
            >
              View all
              <FiArrowRight size={14} />
            </Link>
          </aside>

          {/* Product grid */}
          <div className="min-w-0 flex-1">
            <ul className="m-0 grid list-none grid-cols-2 gap-x-3 gap-y-8 p-0 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-4">
              {products.map(p => {
                const isWished = wishIds.includes(p.id);
                const isAdded = addedId === p.id;
                return (
                  <li key={p.id} className="group min-w-0">
                    <div className="relative">
                      {/* Photo */}
                      <Link
                        href={p.href}
                        tabIndex={-1}
                        aria-hidden="true"
                        className="block"
                      >
                        <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#F4F4F5]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.image}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                          />
                        </div>
                      </Link>

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
                          size={16}
                          className={
                            isWished ? 'fill-[#C2410C] text-[#C2410C]' : ''
                          }
                        />
                      </button>

                      {/* Add to bag: cart e jog hobe. Desktop e hover e, mobile e shobsomoy. */}
                      <button
                        type="button"
                        onClick={() => handleAdd(p)}
                        className={`absolute inset-x-3 bottom-3 flex cursor-pointer items-center justify-center gap-2 rounded-full py-3 text-[13px] font-medium text-white transition-all duration-300 lg:translate-y-3 lg:opacity-0 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 ${
                          isAdded
                            ? 'bg-[#C2410C]'
                            : 'bg-[#111111] hover:bg-[#C2410C]'
                        } ${FOCUS}`}
                      >
                        {isAdded ? (
                          <>
                            <FiCheck size={15} />
                            Added
                          </>
                        ) : (
                          <>
                            <FiShoppingBag size={15} />
                            Add to bag
                          </>
                        )}
                      </button>
                    </div>

                    {/* Info */}
                    <Link
                      href={p.href}
                      className={`mt-4 block text-[#111111] no-underline ${FOCUS}`}
                    >
                      <h3 className="m-0 truncate text-[14px] font-medium leading-snug">
                        {p.name}
                      </h3>
                      <p className="m-0 mt-1 text-[14px] text-[#111111]/70">
                        {taka(p.price)}
                      </p>
                    </Link>

                    {p.colors?.length > 0 && (
                      <div className="mt-2 flex gap-1.5" aria-label="Colours">
                        {p.colors.map(c => (
                          <span
                            key={c}
                            style={{ backgroundColor: c }}
                            className="h-3 w-3 rounded-full border border-black/15"
                          />
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {products.length === 0 && (
              <p className="m-0 py-16 text-center text-[14px] text-[#111111]/60">
                Ei category te ekhono product nei.
              </p>
            )}

            <Link
              href="/shop"
              className={`mt-10 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-wide text-[#111111] no-underline hover:text-[#C2410C] lg:hidden ${FOCUS}`}
            >
              View all
              <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
