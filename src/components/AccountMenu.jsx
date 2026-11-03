'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FiUser } from 'react-icons/fi';

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-2';

const ICON_BTN = `relative inline-flex h-10 w-10 cursor-pointer items-center justify-center bg-transparent p-0 text-[#111111] hover:text-[#C2410C] ${FOCUS}`;

const ITEMS = [
  { label: 'Account', href: '/account/profile' },
  { label: 'My orders', href: '/orders/to-pay' },
];

export default function AccountMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Bairey click korle ba Esc chaple menu bondho
  useEffect(() => {
    if (!open) return;
    const onDown = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = e => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className={ICON_BTN}
      >
        <FiUser size={22} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-44 max-w-[calc(100vw-2rem)] rounded-2xl border border-black/10 bg-white p-2 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
        >
          {ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={`block rounded-xl px-4 py-2.5 text-[14px] text-[#111111] no-underline hover:bg-black/5 ${FOCUS}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
