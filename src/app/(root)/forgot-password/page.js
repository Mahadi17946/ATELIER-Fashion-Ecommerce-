'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi';

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-2';

const INPUT =
  'w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[15px] text-[#111111] outline-none transition-colors placeholder:text-[#111111]/40 focus:border-[#111111]';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');

    // TODO: backend e password reset link pathao
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 800);
  };

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12 lg:py-20">
        <Link
          href="/login"
          className={`mb-8 inline-flex items-center gap-2 text-[14px] font-medium text-[#111111] no-underline transition-colors hover:text-[#C2410C] ${FOCUS}`}
        >
          <FiArrowLeft size={16} />
          Back to log in
        </Link>

        <div className="mx-auto w-full max-w-[460px]">
          <span className="inline-block rounded-full bg-[#F4F4F5] px-4 py-1 text-[11px] font-medium uppercase tracking-widest text-[#111111]">
            Account
          </span>
          <h1 className="mb-0 mt-5 text-[clamp(30px,4vw,44px)] font-normal leading-[1.05] tracking-tight text-[#111111]">
            Forgot password
          </h1>

          {sent ? (
            <div className="mt-10 flex flex-col items-start gap-4 rounded-3xl bg-[#F4F4F5] p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#111111] text-white">
                <FiCheck size={20} />
              </span>
              <h2 className="m-0 text-[18px] font-medium">Check your email</h2>
              <p className="m-0 text-[14px] text-[#111111]/60">
                If an account exists for{' '}
                <span className="font-medium text-[#111111]">{email}</span>, we
                have sent a link to reset your password.
              </p>
              <Link
                href="/login"
                className={`mt-2 inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-[14px] font-medium text-[#111111] no-underline transition-colors hover:border-[#111111] ${FOCUS}`}
              >
                Back to log in
              </Link>
            </div>
          ) : (
            <>
              <p className="mb-0 mt-3 text-[14px] text-[#111111]/60">
                Enter the email you used to create your account. We will send
                you a link to reset your password.
              </p>

              <form
                onSubmit={onSubmit}
                noValidate
                className="mt-10 flex flex-col gap-5 rounded-3xl border border-black/10 p-6 sm:p-8"
              >
                <label className="flex flex-col gap-2">
                  <span className="text-[13px] font-medium text-[#111111]">
                    Email
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className={INPUT}
                  />
                  {error && (
                    <span className="text-[12px] text-[#C2410C]">{error}</span>
                  )}
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#111111] py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-[#C2410C] disabled:cursor-wait disabled:opacity-60 ${FOCUS}`}
                >
                  {loading ? 'Sending...' : 'Send reset link'}
                  {!loading && <FiArrowRight size={16} />}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
