'use client';

import { useState } from 'react';

const PHONE_RE = /^01[3-9]\d{8}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-2';

const INPUT =
  'w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[15px] text-[#111111] outline-none transition-colors placeholder:text-[#111111]/40 focus:border-[#111111]';

const EMPTY = { name: '', email: '', phone: '', address: '', district: '' };

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[13px] font-medium text-[#111111]">{label}</span>
      {children}
      {error && <span className="text-[12px] text-[#C2410C]">{error}</span>}
    </label>
  );
}

/*
  Props:
  initial       : edit korar jonno age theke data
  submitLabel   : button er lekha
  onSubmit(values, optionChecked)
  onCancel      : thakle Cancel button dekhabe
  optionLabel   : thakle ekta checkbox dekhabe
  optionDefault : checkbox er shuru er obostha
*/
export default function AddressForm({
  initial,
  submitLabel = 'Save address',
  onSubmit,
  onCancel,
  optionLabel,
  optionDefault = false,
}) {
  const [values, setValues] = useState({ ...EMPTY, ...(initial || {}) });
  const [errors, setErrors] = useState({});
  const [option, setOption] = useState(optionDefault);

  const onChange = e => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Please enter your full name.';
    if (!EMAIL_RE.test(values.email.trim()))
      next.email = 'Please enter a valid email address.';
    if (!PHONE_RE.test(values.phone.replace(/[\s-]/g, '')))
      next.phone = 'Please enter a valid phone number, e.g. 01XXXXXXXXX.';
    if (!values.address.trim()) next.address = 'Please enter your address.';
    if (!values.district.trim())
      next.district = 'Please enter your district or city.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(
      {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.replace(/[\s-]/g, ''),
        address: values.address.trim(),
        district: values.district.trim(),
      },
      option,
    );
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name}>
          <input
            name="name"
            value={values.name}
            onChange={onChange}
            placeholder="Your full name"
            className={INPUT}
          />
        </Field>

        <Field label="Email" error={errors.email}>
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={onChange}
            placeholder="name@example.com"
            className={INPUT}
          />
        </Field>

        <Field label="Phone number" error={errors.phone}>
          <input
            name="phone"
            inputMode="tel"
            value={values.phone}
            onChange={onChange}
            placeholder="01XXXXXXXXX"
            className={INPUT}
          />
        </Field>

        <Field label="District / City" error={errors.district}>
          <input
            name="district"
            value={values.district}
            onChange={onChange}
            placeholder="Dhaka"
            className={INPUT}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Address" error={errors.address}>
            <textarea
              name="address"
              rows={3}
              value={values.address}
              onChange={onChange}
              placeholder="House, road, area"
              className={`${INPUT} resize-none`}
            />
          </Field>
        </div>
      </div>

      {optionLabel && (
        <label className="flex cursor-pointer items-center gap-2 text-[14px] text-[#111111]">
          <input
            type="checkbox"
            checked={option}
            onChange={e => setOption(e.target.checked)}
            className="h-4 w-4 accent-[#111111]"
          />
          {optionLabel}
        </label>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className={`cursor-pointer rounded-full bg-[#111111] px-7 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-[#C2410C] ${FOCUS}`}
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className={`cursor-pointer rounded-full border border-black/15 px-7 py-3.5 text-[14px] font-medium text-[#111111] transition-colors hover:border-[#111111] ${FOCUS}`}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
