'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-2';

const INPUT =
  'w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[15px] text-[#111111] outline-none transition-colors placeholder:text-[#111111]/40 focus:border-[#111111]';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[13px] font-medium text-[#111111]">{label}</span>
      {children}
      {error && <span className="text-[12px] text-[#C2410C]">{error}</span>}
    </label>
  );
}

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    const next = {};
    if (!EMAIL_RE.test(form.email.trim()))
      next.email = 'Please enter a valid email address.';
    if (!form.password) next.password = 'Please enter your password.';
    setErrors(next);
    setLoginError('');
    if (Object.keys(next).length) return;

    // TODO: backend e login request pathao
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoginError('Login is not available yet. Please try again later.');
    }, 800);
  };

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

        <div className="mx-auto w-full max-w-[460px]">
          <span className="inline-block rounded-full bg-[#F4F4F5] px-4 py-1 text-[11px] font-medium uppercase tracking-widest text-[#111111]">
            Account
          </span>
          <h1 className="mb-0 mt-5 text-[clamp(30px,4vw,44px)] font-normal leading-[1.05] tracking-tight text-[#111111]">
            Log in
          </h1>
          <p className="mb-0 mt-3 text-[14px] text-[#111111]/60">
            Welcome back. Enter your details to continue.
          </p>

          <form
            onSubmit={onSubmit}
            noValidate
            className="mt-10 flex flex-col gap-5 rounded-3xl border border-black/10 p-6 sm:p-8"
          >
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

            <Field label="Password" error={errors.password}>
              <div className="relative">
                <input
                  name="password"
                  type={showPwd ? 'text' : 'password'}
                  value={form.password}
                  onChange={onChange}
                  placeholder="Your password"
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

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className={`text-[13px] text-[#111111]/70 underline underline-offset-4 hover:text-[#C2410C] ${FOCUS}`}
              >
                Forgot password?
              </Link>
            </div>

            {loginError && (
              <p className="m-0 text-[13px] text-[#C2410C]">{loginError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#111111] py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-[#C2410C] disabled:cursor-wait disabled:opacity-60 ${FOCUS}`}
            >
              {loading ? 'Logging in...' : 'Log in'}
              {!loading && <FiArrowRight size={16} />}
            </button>
          </form>

          <p className="mt-8 text-center text-[14px] text-[#111111]/60">
            New to ATELIER?{' '}
            <Link
              href="/signup"
              className="font-medium text-[#111111] underline underline-offset-4 hover:text-[#C2410C]"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
