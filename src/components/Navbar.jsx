'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FiSearch,
  FiUser,
  FiShoppingBag,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';

/* =========================================================
   DATA: menu ar product ekhane change korba
   ========================================================= */

const MENU = [
  { label: 'New in', href: '/shop/new' },
  {
    label: 'Women',
    href: '/shop/women',
    items: [
      ['Saree', '/shop/women/saree'],
      ['Kurti', '/shop/women/kurti'],
      ['Three piece', '/shop/women/three-piece'],
      ['Tops', '/shop/women/tops'],
      ['Dresses', '/shop/women/dresses'],
    ],
  },
  {
    label: 'Men',
    href: '/shop/men',
    items: [
      ['Panjabi', '/shop/men/panjabi'],
      ['Shirts', '/shop/men/shirts'],
      ['T-shirts', '/shop/men/t-shirts'],
      ['Polo', '/shop/men/polo'],
      ['Pants', '/shop/men/pants'],
    ],
  },
  {
    label: 'Accessories',
    href: '/shop/accessories',
    items: [
      ['Bags', '/shop/accessories/bags'],
      ['Wallets', '/shop/accessories/wallets'],
      ['Belts', '/shop/accessories/belts'],
      ['Jewellery', '/shop/accessories/jewellery'],
      ['Scarves', '/shop/accessories/scarves'],
    ],
  },
  { label: 'Wishlist', href: '/wishlist' }, // Sale er jaygay Wishlist add kora holo
];

const PRODUCTS = [
  {
    name: 'Cotton panjabi',
    category: 'Men',
    price: 2450,
    href: '/product/cotton-panjabi',
  },
  {
    name: 'Linen shirt',
    category: 'Men',
    price: 1890,
    href: '/product/linen-shirt',
  },
  {
    name: 'Heavy cotton t-shirt',
    category: 'Men',
    price: 950,
    href: '/product/heavy-cotton-tee',
  },
  {
    name: 'Jamdani saree',
    category: 'Women',
    price: 6800,
    href: '/product/jamdani-saree',
  },
  {
    name: 'Cotton saree',
    category: 'Women',
    price: 2900,
    href: '/product/cotton-saree',
  },
  {
    name: 'Printed kurti',
    category: 'Women',
    price: 1650,
    href: '/product/printed-kurti',
  },
  {
    name: 'Three piece set',
    category: 'Women',
    price: 3200,
    href: '/product/three-piece-set',
  },
  {
    name: 'Leather tote bag',
    category: 'Accessories',
    price: 2800,
    href: '/product/leather-tote-bag',
  },
  {
    name: 'Silk scarf',
    category: 'Accessories',
    price: 1100,
    href: '/product/silk-scarf',
  },
];

const POPULAR = ['Panjabi', 'Saree', 'Kurti', 'T-shirt', 'Bag'];

const PLACEHOLDERS = [
  'Fashion for men',
  'Fashion for women',
  'Cotton panjabi',
  'Jamdani saree',
  'Exclusive accessories',
];

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C2410C] focus-visible:outline-offset-2';

const ICON_BTN = `relative inline-flex h-10 w-10 cursor-pointer items-center justify-center bg-transparent p-0 text-[#111111] hover:text-[#C2410C] ${FOCUS}`;

const taka = n => `৳${n.toLocaleString('en-US')}`;

function Logo() {
  return (
    <Link
      href="/"
      aria-label="Atelier, home"
      className={`flex items-center gap-2.5 text-[#111111] no-underline ${FOCUS}`}
    >
      <svg
        className="block h-[32px] w-[20px] flex-none"
        viewBox="143 76 64 98"
        aria-hidden="true"
      >
        <path
          d="M147 170 V108 A28 28 0 0 1 203 108 V170 Z"
          fill="none"
          stroke="#C2410C"
          strokeWidth="3"
        />
        <path
          d="M175 130 L156 156 H194 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M175 130 V125 C175 122 179 121 179 117 C179 114 177 112 175 112 C173 112 171.5 113.5 171.5 115.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex flex-col gap-[2px]">
        <span className="at-serif -mr-[0.2em] text-[20px] leading-none tracking-[0.2em]">
          ATELIER
        </span>
        <span className="whitespace-nowrap text-[7.5px] leading-none tracking-[0.2em] opacity-70">
          unique fashion brand
        </span>
      </span>
    </Link>
  );
}

function Badge({ count }) {
  if (count <= 0) return null;
  return (
    <span className="absolute right-0 top-0.5 h-4 min-w-4 rounded-full bg-[#C2410C] px-1 text-center text-[10px] font-medium leading-4 text-white">
      {count}
    </span>
  );
}

export default function Navbar({
  cartCount = 0,
  wishlistCount = 0,
  onCartClick,
}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSub, setOpenSub] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [placeholderIdx, setPlaceholderIdx] = useState(0);

  const searchRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx(prev => (prev + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    ).slice(0, 5);
  }, [query]);

  const closeAll = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') {
        closeAll();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 50);
    }
  }, [searchOpen]);

  const submitSearch = e => {
    if (e) e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <>
      <div className="bg-[#111111] text-[12px] leading-none text-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-center px-4 py-[10px] lg:justify-between lg:px-8">
          <p className="m-0">
            Free delivery in Dhaka over ৳3000. Cash on delivery available.
          </p>
          <div className="hidden gap-5 lg:flex">
            <Link
              href="/track-order"
              className="text-white no-underline hover:underline"
            >
              Track order
            </Link>
            <Link
              href="/help"
              className="text-white no-underline hover:underline"
            >
              Help
            </Link>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-black/10 bg-white text-[#111111]">
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-12"
        >
          {/* Left Side: Logo + Menu */}
          <div className="flex items-center gap-[320px]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={`${ICON_BTN} -ml-2 lg:hidden`}
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
              >
                <FiMenu size={22} />
              </button>
              <Logo />
            </div>

            {/* Desktop Links */}
            <ul className="m-0 hidden h-full list-none items-center p-0 lg:flex gap-6">
              {MENU.map(m => (
                <li
                  key={m.label}
                  className="group relative flex h-full items-center"
                >
                  <Link
                    href={m.href}
                    className={`relative py-1 text-[14.5px] font-medium no-underline after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 after:content-[''] group-hover:after:scale-x-100 focus-visible:after:scale-x-100 ${
                      m.label === 'Wishlist'
                        ? 'text-[#C2410C]'
                        : 'text-[#111111]'
                    } ${FOCUS}`}
                  >
                    {m.label}
                  </Link>

                  {m.items && (
                    <div className="invisible absolute left-0 top-full min-w-[200px] translate-y-1 border border-black/10 bg-white py-2 opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-[opacity,transform,visibility] duration-150 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <Link
                        href={m.href}
                        className="block px-5 py-2 text-[13px] font-medium text-[#C2410C] no-underline hover:bg-black/5"
                      >
                        View all
                      </Link>
                      {m.items.map(([name, href]) => (
                        <Link
                          key={href}
                          href={href}
                          className="block px-5 py-2 text-[14px] text-[#111111] no-underline hover:bg-black/5"
                        >
                          {name}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Search Box + Bag + User Icon (Account icon moved to extreme right) */}
          <div className="flex items-center gap-5">
            {/* Search Box */}
            <div
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center justify-between w-[220px] lg:w-[250px] h-10 px-4 bg-[#F4F4F5] hover:bg-[#EAEAEA] border border-black/10 rounded-full cursor-pointer transition-all"
            >
              <div className="overflow-hidden h-5 relative flex-1">
                <span className="absolute inset-0 flex items-center text-[13px] text-[#111111]/60 transition-all duration-500 ease-in-out">
                  {PLACEHOLDERS[placeholderIdx]}
                </span>
              </div>
              <span className="text-[#111111] ml-2 flex-none">
                <FiSearch size={18} />
              </span>
            </div>

            <button
              type="button"
              className={`${ICON_BTN} sm:hidden`}
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <FiSearch size={22} />
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className={ICON_BTN}
                onClick={onCartClick}
                aria-label={`Bag, ${cartCount} items`}
              >
                <FiShoppingBag size={22} />
                <Badge count={cartCount} />
              </button>
              {/* Account/User icon moved to the extreme right */}
              <Link href="/account" className={ICON_BTN} aria-label="Account">
                <FiUser size={22} />
              </Link>
            </div>
          </div>
        </nav>

        {/* Search full panel overlay */}
        <div
          aria-hidden={!searchOpen}
          className={`absolute inset-x-0 top-0 border-b border-black/10 bg-white transition-[opacity,visibility] duration-150 ${
            searchOpen
              ? 'visible opacity-100 z-50'
              : 'invisible opacity-0 pointer-events-none'
          }`}
        >
          <div className="mx-auto flex h-16 max-w-[1440px] items-center px-6 lg:px-12">
            <form
              onSubmit={submitSearch}
              role="search"
              className="flex w-full items-center gap-3"
            >
              <span className="text-[#111111]/60">
                <FiSearch size={20} />
              </span>
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search for panjabi, saree, kurti..."
                className="min-w-0 flex-1 rounded-none border-0 bg-transparent px-2 py-2 text-base text-[#111111] outline-none placeholder:text-[#111111]/40"
              />
              <button
                type="button"
                className={ICON_BTN}
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                <FiX size={22} />
              </button>
            </form>
          </div>

          <div className="max-h-[65vh] overflow-y-auto border-t border-black/10 px-6 lg:px-12">
            <div className="mx-auto max-w-[1440px] py-5">
              {!query.trim() && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="mr-1 text-[13px] text-[#111111]/55">
                    Popular
                  </span>
                  {POPULAR.map(term => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className={`cursor-pointer rounded-full border border-black/15 bg-white px-4 py-1.5 text-[13px] text-[#111111] hover:border-[#111111] ${FOCUS}`}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              )}

              {query.trim() && results.length > 0 && (
                <div>
                  <ul className="m-0 list-none p-0">
                    {results.map(p => (
                      <li
                        key={p.href}
                        className="border-b border-black/10 last:border-0"
                      >
                        <Link
                          href={p.href}
                          onClick={closeAll}
                          className={`flex items-center gap-4 py-3 text-[#111111] no-underline hover:text-[#C2410C] ${FOCUS}`}
                        >
                          <span className="h-14 w-11 flex-none bg-[#EDEDED]" />
                          <span className="flex flex-1 flex-col gap-0.5">
                            <span className="text-[15px] font-medium">
                              {p.name}
                            </span>
                            <span className="text-[13px] text-[#111111]/55">
                              {p.category}
                            </span>
                          </span>
                          <span className="text-[14px]">{taka(p.price)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={submitSearch}
                    className={`mt-3 cursor-pointer text-[13px] font-medium text-[#111111] underline underline-offset-4 hover:text-[#C2410C] ${FOCUS}`}
                  >
                    See all results for “{query.trim()}”
                  </button>
                </div>
              )}

              {query.trim() && results.length === 0 && (
                <p className="m-0 text-[14px] text-[#111111]/70">
                  No results for “{query.trim()}”. Try panjabi, saree or
                  t-shirt.
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      {searchOpen && (
        <div
          onClick={() => setSearchOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 transition-opacity"
        />
      )}

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-[55] bg-black/40 transition-opacity"
        />
      )}

      {/* Mobile drawer */}
      <aside
        aria-hidden={!menuOpen}
        aria-label="Menu"
        className={`fixed inset-y-0 left-0 z-[60] flex w-[min(86vw,340px)] flex-col bg-white text-[#111111] transition-[transform,visibility] duration-300 ${
          menuOpen ? 'visible translate-x-0' : 'invisible -translate-x-full'
        }`}
      >
        <div className="flex h-16 flex-none items-center justify-between border-b border-black/10 pl-5 pr-2">
          <span className="text-[15px] font-medium">Menu</span>
          <button
            type="button"
            className={ICON_BTN}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <FiX size={22} />
          </button>
        </div>

        <ul className="m-0 flex-1 list-none overflow-y-auto p-0">
          {MENU.map(m => {
            const isOpen = openSub === m.label;
            const isWishlist = m.label === 'Wishlist';
            return (
              <li key={m.label} className="border-b border-black/10">
                {m.items ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpenSub(isOpen ? null : m.label)}
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-center justify-between bg-transparent px-5 py-4 text-left text-[16px] font-medium text-[#111111]"
                    >
                      {m.label}
                      {isOpen ? (
                        <FiChevronUp size={18} />
                      ) : (
                        <FiChevronDown size={18} />
                      )}
                    </button>
                    {isOpen && (
                      <ul className="m-0 flex list-none flex-col bg-black/[0.03] p-0 py-2">
                        <li>
                          <Link
                            href={m.href}
                            onClick={() => setMenuOpen(false)}
                            className="block px-8 py-2.5 text-[14px] font-medium text-[#C2410C] no-underline"
                          >
                            View all
                          </Link>
                        </li>
                        {m.items.map(([name, href]) => (
                          <li key={href}>
                            <Link
                              href={href}
                              onClick={() => setMenuOpen(false)}
                              className="block px-8 py-2.5 text-[15px] text-[#111111] no-underline"
                            >
                              {name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={m.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-5 py-4 text-[16px] font-medium no-underline ${isWishlist ? 'text-[#C2410C]' : 'text-[#111111]'}`}
                  >
                    {m.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex flex-none flex-col gap-3 border-t border-black/10 p-5 text-[14px]">
          <Link
            href="/account"
            onClick={() => setMenuOpen(false)}
            className="text-[#111111] no-underline"
          >
            Account
          </Link>
          <Link
            href="/track-order"
            onClick={() => setMenuOpen(false)}
            className="text-[#111111] no-underline"
          >
            Track order
          </Link>
        </div>
      </aside>
    </>
  );
}
