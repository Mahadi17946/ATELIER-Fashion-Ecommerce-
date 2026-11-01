'use client';

import Link from 'next/link';
import { FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi';

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-2';

const LINKS = [
  { label: 'Shop', href: '/shop/new' },
  { label: 'Track order', href: '/track-order' },
  { label: 'Help', href: '/help' },
  { label: 'My account', href: '/account/profile' },
];

const SOCIALS = [
  { label: 'Facebook', href: 'https://facebook.com', Icon: FiFacebook },
  { label: 'Instagram', href: 'https://instagram.com', Icon: FiInstagram },
  { label: 'YouTube', href: 'https://youtube.com', Icon: FiYoutube },
];

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

export default function Footer() {
  return (
    <footer className="w-full border-t border-black/10 bg-[#F4F4F5] text-[#111111]">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-10 lg:px-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Logo />

          <ul className="m-0 flex list-none flex-wrap items-center gap-x-8 gap-y-3 p-0">
            {LINKS.map(l => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`text-[14px] text-[#111111]/65 no-underline transition-colors hover:text-[#111111] ${FOCUS}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`text-[#111111]/60 transition-colors hover:text-[#111111] ${FOCUS}`}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <p className="m-0 mt-8 border-t border-black/10 pt-6 text-[12px] text-[#111111]/50">
          © {new Date().getFullYear()} ATELIER. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
