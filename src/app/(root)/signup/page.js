'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-2';

const INPUT =
  'w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[15px] text-[#111111] outline-none transition-colors placeholder:text-[#111111]/40 focus:border-[#111111]';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^01[3-9]\d{8}$/;

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[13px] font-medium text-[#111111]">{label}</span>
      {children}
      {error && <span className="text-[12px] text-[#C2410C]">{error}</span>}
    </label>
  );
}

export default function SignupPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
  });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const onSubmit = e => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your full name.';
    if (!EMAIL_RE.test(form.email.trim()))
      next.email = 'Please enter a valid email address.';
    if (!PHONE_RE.test(form.phone.replace(/[\s-]/g, '')))
      next.phone = 'Please enter a valid phone number, e.g. 01XXXXXXXXX.';
    if (form.password.length < 8)
      next.password = 'Password must be at least 8 characters.';
    if (form.confirm !== form.password)
      next.confirm = 'Passwords do not match.';
    setErrors(next);
    if (Object.keys(next).length) return;

    // TODO: backend e account create pathao
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 800);
  };

  if (done) {
    return (
      <section className="mx-auto flex min-h-[60vh] w-full max-w-[460px] flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="m-0 text-[clamp(28px,4vw,40px)] font-normal leading-[1.1] tracking-tight text-[#111111]">
          Welcome, {form.name || 'to ATELIER'}
        </h1>
        <p className="mb-0 mt-4 text-[14px] text-[#111111]/60">
          Your account is ready. Browse the collections and start shopping.
        </p>
        <Link
          href="/"
          className={`mt-8 inline-flex items-center gap-2 rounded-full bg-[#111111] px-7 py-3.5 text-[14px] font-medium text-white no-underline transition-colors hover:bg-[#C2410C] ${FOCUS}`}
        >
          Continue shopping
          <FiArrowRight size={16} />
        </Link>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12 lg:py-20">
        <Link
          href="/"
          className={`mb-8 inline-flex items-center gap-2 text-[14px] font-medium text-[#111111] no-underline transition-colors hover:text-[#C2410C] ${FOCUS}`}
        >
          <FiArrowLeft size={16} />
          Back
        </Link>

        <div className="mx-auto w-full max-w-[520px]">
          <span className="inline-block rounded-full bg-[#F4F4F5] px-4 py-1 text-[11px] font-medium uppercase tracking-widest text-[#111111]">
            Account
          </span>
          <h1 className="mb-0 mt-5 text-[clamp(30px,4vw,44px)] font-normal leading-[1.05] tracking-tight text-[#111111]">
            Create account
          </h1>
          <p className="mb-0 mt-3 text-[14px] text-[#111111]/60">
            Join ATELIER for faster checkout and order tracking.
          </p>

          <form
            onSubmit={onSubmit}
            noValidate
            className="mt-10 flex flex-col gap-5 rounded-3xl border border-black/10 p-6 sm:p-8"
          >
            <Field label="Full name" error={errors.name}>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Your full name"
                className={INPUT}
              />
            </Field>

            <Field label="Email" error={errors.email}>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="name@example.com"
                className={INPUT}
              />
            </Field>

            <Field label="Phone number" error={errors.phone}>
              <input
                name="phone"
                inputMode="tel"
                value={form.phone}
                onChange={onChange}
                placeholder="01XXXXXXXXX"
                className={INPUT}
              />
            </Field>

            <Field label="Password" error={errors.password}>
              <div className="relative">
                <input
                  name="password"
                  type={showPwd ? 'text' : 'password'}
                  value={form.password}
                  onChange={onChange}
                  placeholder="At least 8 characters"
                  className={`${INPUT} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(s => !s)}
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-md p-1 text-[#111111]/60 hover:text-[#111111] ${FOCUS}`}
                >
                  {showPwd ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </Field>

            <Field label="Confirm password" error={errors.confirm}>
              <input
                name="confirm"
                type={showPwd ? 'text' : 'password'}
                value={form.confirm}
                onChange={onChange}
                placeholder="Re-enter your password"
                className={INPUT}
              />
            </Field>

            <button
              type="submit"
              disabled={loading}
              className={`mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#111111] py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-[#C2410C] disabled:cursor-wait disabled:opacity-60 ${FOCUS}`}
            >
              {loading ? 'Creating account...' : 'Create account'}
              {!loading && <FiArrowRight size={16} />}
            </button>
          </form>

          <p className="mt-8 text-center text-[14px] text-[#111111]/60">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-[#111111] underline underline-offset-4 hover:text-[#C2410C]"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
