'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiArrowRight, FiInstagram, FiFacebook } from 'react-icons/fi';

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = e => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#111111] text-[#F4F4F5] border-t border-white/10">
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12">
        {/* Main Editorial Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pb-16 border-b border-white/10 items-start">
          {/* Brand & Mission */}
          <div>
            <span className="at-serif text-[28px] tracking-[0.25em] font-light block mb-4">
              ATELIER
            </span>
            <p className="text-[15px] font-light text-white/70 max-w-[400px] leading-relaxed">
              Redefining modern luxury through exceptional craftsmanship,
              breathable fabrics, and timeless silhouettes designed for the
              discerning wardrobe.
            </p>
          </div>

          {/* Exclusive Newsletter */}
          <div className="lg:justify-self-end w-full max-w-[440px]">
            <h4 className="text-[14px] font-medium uppercase tracking-[0.2em] mb-3 text-white">
              Join The Inner Circle
            </h4>
            <p className="text-[13px] text-white/60 mb-6">
              Receive private access to seasonal drops, private sales, and
              editorial stories.
            </p>
            {submitted ? (
              <div className="py-3 px-4 bg-white/10 text-white text-[14px] font-medium tracking-wide">
                Welcome to Atelier. Your subscription is confirmed.
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex items-center bg-white/5 border border-white/20 px-4 py-3 rounded-none focus-within:border-white transition-colors"
              >
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-transparent border-0 text-[14px] text-white placeholder:text-white/40 outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className={`cursor-pointer bg-transparent border-0 text-white hover:text-[#C2410C] transition-colors p-0 ml-3 ${FOCUS}`}
                >
                  <FiArrowRight size={20} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Navigation Links - Horizontal Minimalist Row */}
        <div className="py-12 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <ul className="m-0 flex flex-wrap items-center justify-center md:justify-start list-none p-0 gap-8">
            <li>
              <Link
                href="/shop/new"
                className={`text-[13px] uppercase tracking-[0.15em] text-white/75 hover:text-white transition-colors no-underline ${FOCUS}`}
              >
                New Arrivals
              </Link>
            </li>
            <li>
              <Link
                href="/shop/women"
                className={`text-[13px] uppercase tracking-[0.15em] text-white/75 hover:text-white transition-colors no-underline ${FOCUS}`}
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                href="/shop/men"
                className={`text-[13px] uppercase tracking-[0.15em] text-white/75 hover:text-white transition-colors no-underline ${FOCUS}`}
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                href="/shop/accessories"
                className={`text-[13px] uppercase tracking-[0.15em] text-white/75 hover:text-white transition-colors no-underline ${FOCUS}`}
              >
                Accessories
              </Link>
            </li>
            <li>
              <Link
                href="/journal"
                className={`text-[13px] uppercase tracking-[0.15em] text-white/75 hover:text-white transition-colors no-underline ${FOCUS}`}
              >
                Journal
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`text-[13px] uppercase tracking-[0.15em] text-white/75 hover:text-white transition-colors no-underline ${FOCUS}`}
              >
                Client Care
              </Link>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={`text-white/75 hover:text-white transition-colors ${FOCUS}`}
            >
              <FiInstagram size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={`text-white/75 hover:text-white transition-colors ${FOCUS}`}
            >
              <FiFacebook size={18} />
            </a>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-white/50 tracking-wide">
          <p className="m-0">
            © {new Date().getFullYear()} ATELIER STUDIOS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-8">
            <Link
              href="/privacy"
              className={`hover:text-white transition-colors no-underline ${FOCUS}`}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className={`hover:text-white transition-colors no-underline ${FOCUS}`}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
