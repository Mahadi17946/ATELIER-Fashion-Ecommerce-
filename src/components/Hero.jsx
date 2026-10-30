'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

/* =========================================================
   SLIDES: text, link, photo ekhane change korba.
   ========================================================= */
const SLIDES = [
  {
    label: 'New arrivals',
    title: 'New season, new wardrobe',
    text: 'Fresh styles in breathable fabric, made to wear all day.',
    cta: 'Shop new in',
    href: '/shop/new',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80',
  },
  {
    label: 'Women',
    title: 'Women’s collection',
    text: 'Sarees, kurtis and three piece sets for every day and every occasion.',
    cta: 'Shop women',
    href: '/shop/women',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1920&q=80',
  },
  {
    label: 'Men',
    title: 'Menswear essentials',
    text: 'Panjabi, shirts and t-shirts cut for a clean, comfortable fit.',
    cta: 'Shop men',
    href: '/shop/men',
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1920&q=80',
  },
];

const DURATION = 6000; // 6 seconds

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2';

const ARROW_BTN = `hidden lg:flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#111111] hover:scale-105 ${FOCUS}`;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchX = useRef(null);
  const total = SLIDES.length;

  const goTo = i => setCurrent((i + total) % total);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = setTimeout(() => setCurrent(c => (c + 1) % total), DURATION);
    return () => clearTimeout(id);
  }, [current, paused, reduceMotion, total]);

  const onTouchStart = e => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = e => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
    touchX.current = null;
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative h-[calc(100svh-80px)] max-h-[800px] min-h-[520px] overflow-hidden bg-[#111111]"
    >
      {SLIDES.map((s, i) => {
        const active = i === current;
        return (
          <div
            key={s.title}
            aria-hidden={!active}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${total}`}
            className={`absolute inset-0 transition-[opacity,visibility] duration-700 motion-reduce:transition-none ${
              active ? 'visible z-10 opacity-100' : 'invisible opacity-0'
            }`}
          >
            {/* Background Photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.image}
              alt=""
              loading={i === 0 ? 'eager' : 'lazy'}
              className="absolute inset-0 h-full w-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 md:bg-gradient-to-r md:from-black/70 md:via-black/30 md:to-transparent" />

            {/* Content Container */}
            <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-between px-6 py-12 lg:px-12 lg:py-16">
              <div />

              {/* Center Left Text Content */}
              <div
                className={`max-w-[560px] text-white transition-[opacity,transform] delay-200 duration-700 motion-reduce:transition-none ${
                  active
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-6 opacity-0'
                }`}
              >
                <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-[11px] font-medium tracking-widest uppercase backdrop-blur-md">
                  {s.label}
                </span>
                <h2 className="m-0 text-[clamp(36px,5.5vw,64px)] font-normal leading-[1.05] tracking-tight">
                  {s.title}
                </h2>
                <p className="mb-8 mt-4 max-w-[440px] text-[15px] leading-relaxed text-white/85 md:text-base">
                  {s.text}
                </p>
                <Link
                  href={s.href}
                  tabIndex={active ? 0 : -1}
                  className={`inline-flex items-center gap-3 bg-white px-8 py-4 text-[14px] font-medium text-[#111111] no-underline transition-all duration-300 hover:bg-[#C2410C] hover:text-white ${FOCUS}`}
                >
                  {s.cta}
                </Link>
              </div>

              {/* Bottom Navigation Arrows (Counter and dots removed) */}
              <div className="flex items-center justify-end pt-6">
                <div className="hidden sm:flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => goTo(current - 1)}
                    aria-label="Previous slide"
                    className={ARROW_BTN}
                  >
                    <FiArrowLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(current + 1)}
                    aria-label="Next slide"
                    className={ARROW_BTN}
                  >
                    <FiArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
