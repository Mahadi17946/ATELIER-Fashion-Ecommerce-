'use client';

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';

const STORAGE_KEY = 'atelier-account';

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-2';

const INPUT =
  'w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[15px] text-[#111111] outline-none transition-colors placeholder:text-[#111111]/40 focus:border-[#111111]';

const BTN =
  'cursor-pointer rounded-full bg-[#111111] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#C2410C]';

const PHONE_RE = /^01[3-9]\d{8}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DEFAULT = {
  profile: { name: '', email: '', phone: '' },
  notifications: { orders: true, offers: false, news: false },
  language: 'English',
};

const META = {
  profile: {
    title: 'Profile',
    description: 'Your name, email and phone number.',
  },
  address: {
    title: 'Address book',
    description: 'Manage the addresses you use for delivery.',
  },
  password: {
    title: 'Change password',
    description: 'Use at least 8 characters.',
  },
  notifications: {
    title: 'Notifications',
    description: 'Choose what we can send you.',
  },
  language: {
    title: 'Language',
    description: 'Choose your preferred language.',
  },
};

function Card({ children }) {
  return (
    <div className="rounded-3xl border border-black/10 p-6 sm:p-8">
      {children}
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[13px] font-medium text-[#111111]">{label}</span>
      {children}
      {error && <span className="text-[12px] text-[#C2410C]">{error}</span>}
    </label>
  );
}

/* ---------- Profile ---------- */
function ProfileSection({ data, persist }) {
  const [form, setForm] = useState(data.profile);
  const [errors, setErrors] = useState({});

  const onChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const onSubmit = e => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = 'Please enter your full name.';
    if (!EMAIL_RE.test(form.email.trim()))
      err.email = 'Please enter a valid email address.';
    if (!PHONE_RE.test(form.phone.replace(/[\s-]/g, '')))
      err.phone = 'Please enter a valid phone number, e.g. 01XXXXXXXXX.';
    setErrors(err);
    if (Object.keys(err).length) return;

    persist(
      {
        ...data,
        profile: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.replace(/[\s-]/g, ''),
        },
      },
      'Profile saved',
    );
  };

  return (
    <Card>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
        </div>
        <div>
          <button type="submit" className={`${BTN} ${FOCUS}`}>
            Save profile
          </button>
        </div>
      </form>
    </Card>
  );
}

/* ---------- Address ---------- */
function AddressSection() {
  return (
    <Card>
      <p className="m-0 text-[14px] text-[#111111]/70">
        Add, edit or delete your delivery addresses from the address book.
      </p>
      <Link
        href="/address-book"
        className={`mt-6 inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-[14px] font-medium text-[#111111] no-underline transition-colors hover:border-[#111111] ${FOCUS}`}
      >
        Open address book
        <FiArrowRight size={16} />
      </Link>
    </Card>
  );
}

/* ---------- Password ---------- */
function PasswordSection({ showFlash }) {
  const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' });
  const [err, setErr] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (!pwd.current) return setErr('Please enter your current password.');
    if (pwd.next.length < 8)
      return setErr('New password must be at least 8 characters.');
    if (pwd.next !== pwd.confirm) return setErr('New passwords do not match.');
    setErr('');
    // TODO: backend e password update pathao
    setPwd({ current: '', next: '', confirm: '' });
    showFlash('Password updated');
  };

  return (
    <Card>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Current password">
            <input
              type="password"
              value={pwd.current}
              onChange={e => setPwd(p => ({ ...p, current: e.target.value }))}
              className={INPUT}
            />
          </Field>
          <div className="hidden sm:block" aria-hidden="true" />
          <Field label="New password">
            <input
              type="password"
              value={pwd.next}
              onChange={e => setPwd(p => ({ ...p, next: e.target.value }))}
              className={INPUT}
            />
          </Field>
          <Field label="Confirm new password">
            <input
              type="password"
              value={pwd.confirm}
              onChange={e => setPwd(p => ({ ...p, confirm: e.target.value }))}
              className={INPUT}
            />
          </Field>
        </div>
        {err && <p className="m-0 text-[13px] text-[#C2410C]">{err}</p>}
        <div>
          <button type="submit" className={`${BTN} ${FOCUS}`}>
            Update password
          </button>
        </div>
      </form>
    </Card>
  );
}

/* ---------- Notifications ---------- */
const NOTIF_ITEMS = [
  { key: 'orders', label: 'Order updates' },
  { key: 'offers', label: 'Offers and promotions' },
  { key: 'news', label: 'New arrivals' },
];

function NotificationsSection({ data, persist }) {
  const toggle = key =>
    persist(
      {
        ...data,
        notifications: {
          ...data.notifications,
          [key]: !data.notifications[key],
        },
      },
      'Preferences saved',
    );

  return (
    <Card>
      <ul className="m-0 flex list-none flex-col gap-5 p-0">
        {NOTIF_ITEMS.map(n => (
          <li key={n.key}>
            <label className="flex cursor-pointer items-center justify-between gap-4 text-[15px]">
              {n.label}
              <input
                type="checkbox"
                checked={!!data.notifications[n.key]}
                onChange={() => toggle(n.key)}
                className="h-4 w-4 accent-[#111111]"
              />
            </label>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ---------- Language ---------- */
function LanguageSection({ data, persist }) {
  return (
    <Card>
      <select
        value={data.language}
        onChange={e =>
          persist({ ...data, language: e.target.value }, 'Language saved')
        }
        className={`${INPUT} max-w-[280px] cursor-pointer`}
      >
        <option value="English">English</option>
        <option value="Bangla">বাংলা</option>
      </select>
    </Card>
  );
}

/* ---------- Page ---------- */
export default function AccountSectionPage() {
  const { section } = useParams();
  const [data, setData] = useState(DEFAULT);
  const [ready, setReady] = useState(false);
  const [flash, setFlash] = useState('');

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setData({ ...DEFAULT, ...JSON.parse(raw) });
    } catch {}
    setReady(true);
  }, []);

  const showFlash = msg => {
    setFlash(msg);
    setTimeout(() => setFlash(''), 2000);
  };

  const persist = (next, msg) => {
    setData(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
    if (msg) showFlash(msg);
  };

  const meta = META[section];
  if (!meta) notFound();
  if (!ready) return <div className="min-h-[50vh]" />;

  const props = { data, persist, showFlash };
  let body = null;
  switch (section) {
    case 'profile':
      body = <ProfileSection {...props} />;
      break;
    case 'address':
      body = <AddressSection />;
      break;
    case 'password':
      body = <PasswordSection {...props} />;
      break;
    case 'notifications':
      body = <NotificationsSection {...props} />;
      break;
    case 'language':
      body = <LanguageSection {...props} />;
      break;
    default:
      notFound();
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <div>
        <span className="inline-block rounded-full bg-[#F4F4F5] px-4 py-1 text-[11px] font-medium uppercase tracking-widest text-[#111111]">
          Account
        </span>
        <h1 className="mb-0 mt-5 text-[clamp(30px,4vw,48px)] font-normal leading-[1.05] tracking-tight text-[#111111]">
          {meta.title}
        </h1>
        <p className="mb-0 mt-3 text-[14px] text-[#111111]/60">
          {meta.description}
        </p>
      </div>

      {flash && (
        <p
          role="status"
          className="m-0 w-fit rounded-full bg-[#111111] px-5 py-2 text-[13px] text-white"
        >
          {flash}
        </p>
      )}

      {body}
    </div>
  );
}

