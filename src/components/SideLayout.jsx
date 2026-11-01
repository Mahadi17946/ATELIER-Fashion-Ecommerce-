'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-2';

export default function SideLayout({ groups, children }) {
  const pathname = usePathname();

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12 lg:py-16">
        <Link
          href="/"
          className={`mb-8 inline-flex items-center gap-2 text-[14px] font-medium text-[#111111] no-underline transition-colors hover:text-[#C2410C] ${FOCUS}`}
        >
          <FiArrowLeft size={16} />
          Back
        </Link>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
          <aside className="min-w-0 lg:sticky lg:top-28 lg:h-fit">
            {groups.map(group => (
              <div key={group.title} className="mb-8 last:mb-0">
                <p className="m-0 mb-3 text-[12px] font-medium uppercase tracking-widest text-[#111111]/50">
                  {group.title}
                </p>
                <nav aria-label={group.title}>
                  <ul className="m-0 flex list-none gap-2 overflow-x-auto p-0 pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
                    {group.items.map(item => {
                      const active = pathname === item.href;
                      return (
                        <li key={item.href} className="flex-none">
                          <Link
                            href={item.href}
                            aria-current={active ? 'page' : undefined}
                            className={`block whitespace-nowrap rounded-full px-4 py-2 text-[14px] no-underline transition-colors duration-200 lg:rounded-xl lg:py-2.5 ${
                              active
                                ? 'bg-[#111111] text-white'
                                : 'border border-black/15 text-[#111111]/70 hover:text-[#111111] lg:border-0 lg:hover:bg-black/5'
                            } ${FOCUS}`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            ))}
          </aside>

          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </section>
  );
}
