'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { FiCheck, FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '@/lib/cart';
import { PRODUCTS } from '@/lib/products';

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-2';

const SORTS = [
  { value: 'default', label: 'Default' },
  { value: 'low', label: 'Price: low to high' },
  { value: 'high', label: 'Price: high to low' },
];

const taka = n => `৳${Number(n).toLocaleString('en-US')}`;

const CATEGORY_LABEL = {
  men: 'Men',
  women: 'Women',
  accessories: 'Accessories',
  'new-in': 'New in',
};

export default function ShopView({
  title,
  description,
  category = 'all',
  keyword = '',
}) {
  const { addItem, wishIds, toggleWish } = useCart();
  const [sort, setSort] = useState('default');
  const [addedId, setAddedId] = useState(null);

  const items = useMemo(() => {
    let list =
      category === 'all'
        ? [...PRODUCTS]
        : PRODUCTS.filter(p => p.category === category);

    if (keyword) {
      list = list.filter(p => p.name.toLowerCase().includes(keyword));
    }

    if (sort === 'low') list.sort((a, b) => a.price - b.price);
    if (sort === 'high') list.sort((a, b) => b.price - a.price);
    return list;
  }, [category, keyword, sort]);

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
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12 lg:py-20">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-block rounded-full bg-[#F4F4F5] px-4 py-1 text-[11px] font-medium uppercase tracking-widest text-[#111111]">
              Shop
            </span>
            <h1 className="mb-0 mt-5 text-[clamp(30px,4vw,48px)] font-normal leading-[1.05] tracking-tight text-[#111111]">
              {title}
            </h1>
            <p className="mb-0 mt-3 text-[14px] text-[#111111]/60">
              {description} · {items.length} items
            </p>
          </div>

          <label className="flex items-center gap-3 text-[14px] text-[#111111]/70">
            Sort by
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className={`cursor-pointer rounded-full border border-black/15 bg-white px-4 py-2.5 text-[14px] text-[#111111] outline-none focus:border-[#111111] ${FOCUS}`}
            >
              {SORTS.map(s => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Grid */}
        {items.length === 0 ? (
          <p className="m-0 py-20 text-center text-[15px] text-[#111111]/60">
            No products in this category yet.
          </p>
        ) : (
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

                    {outOfStock ? (
                      <button
                        type="button"
                        disabled
                        className={`${actionBase} cursor-not-allowed bg-[#111111]/40 lg:translate-y-0 lg:opacity-100`}
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
                      {CATEGORY_LABEL[p.category] ?? p.category}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
