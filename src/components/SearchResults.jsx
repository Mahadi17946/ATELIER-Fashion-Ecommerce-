'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiArrowRight, FiSearch } from 'react-icons/fi';
import { PRODUCTS } from '@/lib/products';

const POPULAR = ['Panjabi', 'Saree', 'Kurti', 'T-shirt', 'Bag'];

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-2';

export default function SearchResults({ query }) {
  const router = useRouter();
  const [text, setText] = useState(query);

  const term = query.trim().toLowerCase();
  const results = term
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(term))
    : [];

  const onSubmit = e => {
    e.preventDefault();
    const q = text.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12 lg:py-20">
        {/* Header */}
        <div className="mb-10">
          <span className="inline-block rounded-full bg-[#F4F4F5] px-4 py-1 text-[11px] font-medium uppercase tracking-widest text-[#111111]">
            Search
          </span>
          <h1 className="mb-0 mt-5 text-[clamp(30px,4vw,48px)] font-normal leading-[1.05] tracking-tight text-[#111111]">
            {term ? `Results for “${query.trim()}”` : 'Search products'}
          </h1>
          {term && (
            <p className="mb-0 mt-3 text-[14px] text-[#111111]/60">
              {results.length} {results.length === 1 ? 'item' : 'items'} found
            </p>
          )}
        </div>

        {/* Search box */}
        <form
          onSubmit={onSubmit}
          role="search"
          className="mb-12 flex max-w-[640px] items-center gap-3 rounded-full border border-black/15 bg-white py-2 pl-5 pr-2 focus-within:border-[#111111]"
        >
          <FiSearch size={18} className="flex-none text-[#111111]/50" />
          <input
            type="search"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Search for panjabi, saree, kurti..."
            className="min-w-0 flex-1 border-0 bg-transparent py-2 text-[15px] text-[#111111] outline-none placeholder:text-[#111111]/40"
          />
          <button
            type="submit"
            className={`cursor-pointer rounded-full bg-[#111111] px-6 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#C2410C] ${FOCUS}`}
          >
            Search
          </button>
        </form>

        {/* Empty query: popular searches */}
        {!term && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[13px] text-[#111111]/55">Popular</span>
            {POPULAR.map(t => (
              <Link
                key={t}
                href={`/search?q=${encodeURIComponent(t)}`}
                className={`rounded-full border border-black/15 bg-white px-4 py-1.5 text-[13px] text-[#111111] no-underline hover:border-[#111111] ${FOCUS}`}
              >
                {t}
              </Link>
            ))}
          </div>
        )}

        {/* No results */}
        {term && results.length === 0 && (
          <div className="flex flex-col items-start gap-4 rounded-3xl bg-[#F4F4F5] p-8">
            <h2 className="m-0 text-[18px] font-medium">No products found</h2>
            <p className="m-0 text-[14px] text-[#111111]/60">
              Try a different word, or browse the collections.
            </p>
            <div className="mt-2">
              <Link
                href="/shop"
                className={`inline-flex items-center gap-2 rounded-full bg-[#111111] px-6 py-3 text-[14px] font-medium text-white no-underline transition-colors hover:bg-[#C2410C] ${FOCUS}`}
              >
                Shop all products
                <FiArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}

        {/* Results: product name only */}
        {results.length > 0 && (
          <ul className="m-0 flex list-none flex-col divide-y divide-black/10 p-0">
            {results.map(p => (
              <li key={p.id}>
                <Link
                  href={p.href}
                  className={`block py-4 text-[17px] font-medium text-[#111111] no-underline transition-colors hover:text-[#C2410C] ${FOCUS}`}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
