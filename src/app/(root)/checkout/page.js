'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiCheck, FiPlus } from 'react-icons/fi';
import AddressForm from '@/components/AddressForm';
import { useCart } from '@/lib/cart';

const FREE_DELIVERY_OVER = 3000;
const DELIVERY_FEE = 80;

const PAYMENT_METHODS = [
  {
    id: 'cod',
    label: 'Cash on delivery',
    note: 'Pay in cash when you receive the product.',
  },
  {
    id: 'bkash',
    label: 'bKash',
    note: 'Pay with bKash after placing the order.',
  },
  {
    id: 'nagad',
    label: 'Nagad',
    note: 'Pay with Nagad after placing the order.',
  },
];

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-2';

const taka = n => `৳${Number(n).toLocaleString('en-US')}`;

function BackLink() {
  return (
    <Link
      href="/cart"
      className={`mb-8 inline-flex items-center gap-2 text-[14px] font-medium text-[#111111] no-underline transition-colors hover:text-[#C2410C] ${FOCUS}`}
    >
      <FiArrowLeft size={16} />
      Back to cart
    </Link>
  );
}

function AddressCard({ address, selected, temp, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex w-full cursor-pointer flex-col gap-1.5 rounded-2xl border p-5 text-left transition-colors ${
        selected
          ? 'border-[#111111] bg-[#F4F4F5]'
          : 'border-black/15 bg-white hover:border-[#111111]'
      } ${FOCUS}`}
    >
      <span className="flex items-center justify-between gap-3">
        <span className="text-[15px] font-medium text-[#111111]">
          {address.name}
        </span>
        {address.isDefault && (
          <span className="rounded-full bg-[#111111] px-2.5 py-0.5 text-[11px] text-white">
            Default
          </span>
        )}
        {temp && (
          <span className="rounded-full border border-black/15 px-2.5 py-0.5 text-[11px] text-[#111111]/70">
            Not saved
          </span>
        )}
      </span>
      <span className="text-[13px] text-[#111111]/70">
        {address.address}, {address.district}
      </span>
      <span className="text-[13px] text-[#111111]/70">
        {address.phone} · {address.email}
      </span>
    </button>
  );
}

export default function CheckoutPage() {
  const {
    items,
    ready,
    subtotal,
    clearCart,
    addresses,
    defaultAddress,
    addAddress,
  } = useCart();

  const [selectedId, setSelectedId] = useState(null);
  const [tempAddress, setTempAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [payment, setPayment] = useState('cod');
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);

  const list = tempAddress ? [...addresses, tempAddress] : addresses;
  const effectiveId = selectedId ?? defaultAddress?.id ?? null;
  const selected = list.find(a => a.id === effectiveId) ?? list[0] ?? null;
  const formOpen = showForm || list.length === 0;

  const freeDelivery = subtotal >= FREE_DELIVERY_OVER;
  const delivery = freeDelivery ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;

  // Notun address form theke aste
  const onNewAddress = (values, save) => {
    if (save) {
      const id = addAddress(values);
      setSelectedId(id);
      setTempAddress(null);
    } else {
      setTempAddress({ ...values, id: 'temp-address' });
      setSelectedId('temp-address');
    }
    setShowForm(false);
    setError('');
  };

  const onPlaceOrder = () => {
    if (!selected) {
      setError('Please choose or add a delivery address.');
      return;
    }
    const orderId = 'ATL' + Date.now().toString().slice(-7);
    setOrder({ id: orderId, total, payment, items, address: selected });
    clearCart();
  };

  // Localstorage load hoyar agey faka dekhabe
  if (!ready) {
    return (
      <div className="mx-auto min-h-[60vh] max-w-[1440px] px-6 py-16 lg:px-12" />
    );
  }

  // Order hoye geche
  if (order) {
    return (
      <section className="mx-auto flex min-h-[60vh] w-full max-w-[1440px] flex-col items-center justify-center px-6 py-20 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#111111] text-white">
          <FiCheck size={24} />
        </span>
        <h1 className="mb-0 mt-6 text-[clamp(30px,4vw,48px)] font-normal leading-[1.05] tracking-tight text-[#111111]">
          Thank you, {order.address.name}
        </h1>
        <p className="mb-0 mt-4 max-w-[460px] text-[15px] text-[#111111]/60">
          Your order number is{' '}
          <span className="font-medium text-[#111111]">{order.id}</span>. We
          will contact you on {order.address.phone} or {order.address.email} to
          confirm delivery.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 rounded-full bg-[#111111] px-7 py-3.5 text-[14px] font-medium text-white no-underline transition-colors hover:bg-[#C2410C] ${FOCUS}`}
          >
            Continue shopping
            <FiArrowRight size={16} />
          </Link>
        </div>
      </section>
    );
  }

  // Cart faka
  if (items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] w-full max-w-[1440px] flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="mb-0 text-[clamp(30px,4vw,48px)] font-normal leading-[1.05] tracking-tight text-[#111111]">
          Your cart is empty
        </h1>
        <div className="mt-8">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 rounded-full bg-[#111111] px-7 py-3.5 text-[14px] font-medium text-white no-underline transition-colors hover:bg-[#C2410C] ${FOCUS}`}
          >
            Shop now
            <FiArrowRight size={16} />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-12 lg:py-20">
        <BackLink />

        <div className="mb-10 lg:mb-12">
          <span className="inline-block rounded-full bg-[#F4F4F5] px-4 py-1 text-[11px] font-medium uppercase tracking-widest text-[#111111]">
            Checkout
          </span>
          <h1 className="mb-0 mt-5 text-[clamp(30px,4vw,48px)] font-normal leading-[1.05] tracking-tight text-[#111111]">
            Delivery details
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
          <div className="flex flex-col gap-10">
            {/* Delivery address */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="m-0 text-[18px] font-medium">
                  Delivery address
                </h2>
                <Link
                  href="/address-book"
                  className={`text-[13px] font-medium text-[#111111] underline underline-offset-4 hover:text-[#C2410C] ${FOCUS}`}
                >
                  Manage address book
                </Link>
              </div>

              {list.length > 0 && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {list.map(a => (
                    <AddressCard
                      key={a.id}
                      address={a}
                      selected={a.id === selected?.id}
                      temp={a.id === 'temp-address'}
                      onSelect={() => {
                        setSelectedId(a.id);
                        setError('');
                      }}
                    />
                  ))}
                  {!formOpen && (
                    <button
                      type="button"
                      onClick={() => setShowForm(true)}
                      className={`flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-black/25 text-[14px] font-medium text-[#111111] transition-colors hover:border-[#111111] ${FOCUS}`}
                    >
                      <FiPlus size={18} />
                      Add a new address
                    </button>
                  )}
                </div>
              )}

              {formOpen && (
                <div className="rounded-3xl border border-black/10 p-6 sm:p-8">
                  <h3 className="m-0 mb-6 text-[16px] font-medium">
                    New delivery address
                  </h3>
                  <AddressForm
                    submitLabel="Use this address"
                    optionLabel="Save this address to my address book"
                    optionDefault={true}
                    onSubmit={onNewAddress}
                    onCancel={
                      list.length ? () => setShowForm(false) : undefined
                    }
                  />
                </div>
              )}
            </div>

            {/* Payment */}
            <div className="flex flex-col gap-4">
              <h2 className="m-0 text-[18px] font-medium">Payment method</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {PAYMENT_METHODS.map(m => {
                  const checked = payment === m.id;
                  return (
                    <label
                      key={m.id}
                      className={`flex cursor-pointer flex-col gap-1 rounded-2xl border p-4 transition-colors ${
                        checked
                          ? 'border-[#111111] bg-[#F4F4F5]'
                          : 'border-black/15 bg-white hover:border-[#111111]'
                      } ${FOCUS}`}
                    >
                      <span className="flex items-center gap-2 text-[14px] font-medium">
                        <input
                          type="radio"
                          name="payment"
                          value={m.id}
                          checked={checked}
                          onChange={() => setPayment(m.id)}
                          className="accent-[#111111]"
                        />
                        {m.label}
                      </span>
                      <span className="pl-6 text-[12px] text-[#111111]/55">
                        {m.note}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {error && <p className="m-0 text-[14px] text-[#C2410C]">{error}</p>}

            <button
              type="button"
              onClick={onPlaceOrder}
              className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#111111] py-4 text-[14px] font-medium text-white transition-colors hover:bg-[#C2410C] ${FOCUS}`}
            >
              Place order · {taka(total)}
              <FiArrowRight size={16} />
            </button>
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-3xl bg-[#F4F4F5] p-6 lg:sticky lg:top-28 lg:p-8">
            <h2 className="m-0 text-[18px] font-medium">Your order</h2>

            <ul className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
              {items.map(item => (
                <li
                  key={item.id}
                  className="flex justify-between gap-4 text-[14px]"
                >
                  <span className="min-w-0 truncate">
                    {item.name} × {item.qty}
                  </span>
                  <span className="flex-none">
                    {taka(item.price * item.qty)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="m-0 mt-6 flex flex-col gap-3 border-t border-black/10 pt-6 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-[#111111]/65">Subtotal</dt>
                <dd className="m-0">{taka(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#111111]/65">Delivery</dt>
                <dd className="m-0">
                  {freeDelivery ? 'Free' : taka(delivery)}
                </dd>
              </div>
            </dl>

            <div className="mt-5 flex justify-between border-t border-black/10 pt-5 text-[16px] font-medium">
              <span>Total</span>
              <span>{taka(total)}</span>
            </div>

            {selected && (
              <div className="mt-6 border-t border-black/10 pt-6 text-[13px] text-[#111111]/70">
                <p className="m-0 font-medium text-[#111111]">Delivering to</p>
                <p className="m-0 mt-1">{selected.name}</p>
                <p className="m-0">
                  {selected.address}, {selected.district}
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
