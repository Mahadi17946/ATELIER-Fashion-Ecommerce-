'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiArrowLeft, FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import AddressForm from '@/components/AddressForm';
import { useCart } from '@/lib/cart';

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-2';

const SMALL_BTN = `inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-[13px] font-medium text-[#111111] transition-colors hover:border-[#111111] ${FOCUS}`;

export default function AddressBookPage() {
  const {
    ready,
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  } = useCart();

  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  if (!ready) {
    return (
      <div className="mx-auto min-h-[60vh] max-w-[1440px] px-6 py-16 lg:px-12" />
    );
  }

  const onAdd = (values, isDefault) => {
    addAddress({ ...values, isDefault });
    setAdding(false);
  };

  const onUpdate = (id, values, isDefault) => {
    updateAddress(id, { ...values, isDefault });
    setEditingId(null);
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

        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-block rounded-full bg-[#F4F4F5] px-4 py-1 text-[11px] font-medium uppercase tracking-widest text-[#111111]">
              Address book
            </span>
            <h1 className="mb-0 mt-5 text-[clamp(30px,4vw,48px)] font-normal leading-[1.05] tracking-tight text-[#111111]">
              Your addresses
            </h1>
            <p className="mb-0 mt-3 text-[14px] text-[#111111]/60">
              {addresses.length} saved
            </p>
          </div>

          {!adding && (
            <button
              type="button"
              onClick={() => setAdding(true)}
              className={`inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-[#111111] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#C2410C] ${FOCUS}`}
            >
              <FiPlus size={16} />
              Add new address
            </button>
          )}
        </div>

        {/* Add form */}
        {adding && (
          <div className="mb-10 rounded-3xl border border-black/10 p-6 sm:p-8">
            <h2 className="m-0 mb-6 text-[18px] font-medium">New address</h2>
            <AddressForm
              submitLabel="Save address"
              optionLabel="Set as default address"
              optionDefault={addresses.length === 0}
              onSubmit={onAdd}
              onCancel={() => setAdding(false)}
            />
          </div>
        )}

        {addresses.length === 0 && !adding && (
          <p className="m-0 text-[15px] text-[#111111]/60">
            You have no saved addresses yet.
          </p>
        )}

        {/* List */}
        <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2">
          {addresses.map(a =>
            editingId === a.id ? (
              <li
                key={a.id}
                className="rounded-3xl border border-black/10 p-6 sm:p-8 md:col-span-2"
              >
                <h2 className="m-0 mb-6 text-[18px] font-medium">
                  Edit address
                </h2>
                <AddressForm
                  initial={a}
                  submitLabel="Update address"
                  optionLabel="Set as default address"
                  optionDefault={a.isDefault}
                  onSubmit={(values, opt) => onUpdate(a.id, values, opt)}
                  onCancel={() => setEditingId(null)}
                />
              </li>
            ) : (
              <li
                key={a.id}
                className="flex flex-col gap-3 rounded-3xl bg-[#F4F4F5] p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="m-0 text-[16px] font-medium">{a.name}</h2>
                  {a.isDefault && (
                    <span className="rounded-full bg-[#111111] px-3 py-1 text-[11px] font-medium text-white">
                      Default
                    </span>
                  )}
                </div>

                <div className="text-[14px] leading-relaxed text-[#111111]/75">
                  <p className="m-0">{a.address}</p>
                  <p className="m-0">{a.district}</p>
                  <p className="m-0 mt-2">{a.phone}</p>
                  <p className="m-0">{a.email}</p>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingId(a.id)}
                    className={SMALL_BTN}
                  >
                    <FiEdit2 size={14} />
                    Edit
                  </button>

                  {!a.isDefault && (
                    <button
                      type="button"
                      onClick={() => setDefaultAddress(a.id)}
                      className={SMALL_BTN}
                    >
                      Set as default
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Delete this address?')) {
                        deleteAddress(a.id);
                      }
                    }}
                    className={`${SMALL_BTN} hover:text-[#C2410C]`}
                  >
                    <FiTrash2 size={14} />
                    Delete
                  </button>
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
