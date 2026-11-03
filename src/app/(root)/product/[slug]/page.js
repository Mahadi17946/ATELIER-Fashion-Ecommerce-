'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiStar,
} from 'react-icons/fi';
import { useCart } from '@/lib/cart';
import { PRODUCTS, getProductBySlug } from '@/lib/products';

const CATEGORY_LABEL = {
  men: 'Men',
  women: 'Women',
  accessories: 'Accessories',
  'new-in': 'New in',
};

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#111111] focus-visible:outline-offset-2';

const INPUT =
  'w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[15px] text-[#111111] outline-none transition-colors placeholder:text-[#111111]/40 focus:border-[#111111]';

const taka = n => `৳${Number(n).toLocaleString('en-US')}`;

function getStockStatus(stock) {
  if (stock <= 0) {
    return {
      label: 'Out of stock',
      dot: 'bg-[#111111]/30',
      text: 'text-[#111111]/55',
    };
  }
  if (stock <= 5) {
    return {
      label: `Only ${stock} left in stock`,
      dot: 'bg-[#C2410C]',
      text: 'text-[#C2410C]',
    };
  }
  return { label: 'In stock', dot: 'bg-[#111111]', text: 'text-[#111111]' };
}

function Stars({ value, size = 14 }) {
  const rounded = Math.round(value);
  return (
    <span
      className="inline-flex gap-0.5"
      role="img"
      aria-label={`${value.toFixed(1)} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map(n => (
        <FiStar
          key={n}
          size={size}
          className={
            n <= rounded ? 'fill-[#111111] text-[#111111]' : 'text-[#111111]/25'
          }
        />
      ))}
    </span>
  );
}

function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-[1440px] flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="mb-0 text-[clamp(30px,4vw,48px)] font-normal leading-[1.05] tracking-tight text-[#111111]">
        Product not found
      </h1>
      <p className="mb-0 mt-4 max-w-[420px] text-[15px] text-[#111111]/60">
        This product may have been removed or the link is wrong.
      </p>
      <Link
        href="/"
        className={`mt-8 inline-flex items-center gap-2 rounded-full bg-[#111111] px-7 py-3.5 text-[14px] font-medium text-white no-underline transition-colors hover:bg-[#C2410C] ${FOCUS}`}
      >
        Back to shop
        <FiArrowRight size={16} />
      </Link>
    </section>
  );
}

function ProductView({ product }) {
  const { addItem, toggleWish, wishIds, ready } = useCart();

  const [color, setColor] = useState(product.colors?.[0] ?? null);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);

  // Review state: ekhon shudhu browser e thakbe, backend connect korle save hobe
  const [reviews, setReviews] = useState(product.reviews ?? []);
  const [review, setReview] = useState({ name: '', rating: 0, text: '' });
  const [reviewError, setReviewError] = useState('');
  const [reviewDone, setReviewDone] = useState(false);

  const isWished = ready && wishIds.includes(product.id);
  const stock = product.stock ?? 0;
  const outOfStock = stock <= 0;
  const status = getStockStatus(stock);

  const avg = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const related = PRODUCTS.filter(
    p => p.category === product.category && p.id !== product.id,
  ).slice(0, 4);

  const handleAdd = () => {
    if (outOfStock) return;
    if (product.sizes?.length && !size) {
      setError('Please select a size first.');
      return;
    }
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        href: product.href,
        color: color?.name ?? null,
        size,
      },
      qty,
    );
    setError('');
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const submitReview = e => {
    e.preventDefault();
    if (!review.name.trim()) {
      setReviewError('Please enter your name.');
      return;
    }
    if (review.rating === 0) {
      setReviewError('Please select a rating.');
      return;
    }
    if (!review.text.trim()) {
      setReviewError('Please write your review.');
      return;
    }
    const today = new Date().toLocaleDateString('en-GB');
    setReviews(prev => [
      {
        name: review.name.trim(),
        rating: review.rating,
        date: today,
        text: review.text.trim(),
      },
      ...prev,
    ]);
    setReview({ name: '', rating: 0, text: '' });
    setReviewError('');
    setReviewDone(true);
    setTimeout(() => setReviewDone(false), 3000);
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

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl bg-[#F4F4F5] lg:sticky lg:top-28 lg:self-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="inline-block w-fit rounded-full bg-[#F4F4F5] px-4 py-1 text-[11px] font-medium uppercase tracking-widest text-[#111111]">
              {CATEGORY_LABEL[product.category] ?? product.category}
            </span>

            <h1 className="mb-0 mt-5 text-[clamp(28px,3.4vw,44px)] font-normal leading-[1.1] tracking-tight text-[#111111]">
              {product.name}
            </h1>

            {/* Rating summary */}
            <a
              href="#reviews"
              className={`mt-3 inline-flex w-fit items-center gap-2 text-[13px] text-[#111111]/70 no-underline hover:text-[#111111] ${FOCUS}`}
            >
              <Stars value={avg} />
              <span>
                {reviews.length
                  ? `${avg.toFixed(1)} (${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'})`
                  : 'No reviews yet'}
              </span>
            </a>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-[20px] font-medium">
                {taka(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-[15px] text-[#111111]/45 line-through">
                  {taka(product.oldPrice)}
                </span>
              )}
            </div>

            <p className="mb-0 mt-6 text-[15px] leading-relaxed text-[#111111]/70">
              {product.description}
            </p>

            {/* Colour */}
            {product.colors?.length > 0 && (
              <div className="mt-8">
                <p className="m-0 text-[14px] font-medium">
                  Colour:{' '}
                  <span className="font-normal text-[#111111]/60">
                    {color?.name}
                  </span>
                </p>
                <div
                  role="group"
                  aria-label="Colour"
                  className="mt-3 flex flex-wrap gap-2"
                >
                  {product.colors.map(c => {
                    const active = color?.name === c.name;
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setColor(c)}
                        aria-pressed={active}
                        className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] transition-colors ${
                          active
                            ? 'border-[#111111]'
                            : 'border-black/15 hover:border-[#111111]'
                        } ${FOCUS}`}
                      >
                        <span
                          className="h-4 w-4 rounded-full border border-black/15"
                          style={{ backgroundColor: c.hex }}
                        />
                        {c.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size */}
            {product.sizes?.length > 0 && (
              <div className="mt-8">
                <p className="m-0 text-[14px] font-medium">Size</p>
                <div
                  role="group"
                  aria-label="Size"
                  className="mt-3 flex flex-wrap gap-2"
                >
                  {product.sizes.map(s => {
                    const active = size === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setSize(s);
                          setError('');
                        }}
                        aria-pressed={active}
                        className={`min-w-[52px] cursor-pointer rounded-full border px-4 py-2 text-[14px] transition-colors ${
                          active
                            ? 'border-[#111111] bg-[#111111] text-white'
                            : 'border-black/15 hover:border-[#111111]'
                        } ${FOCUS}`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stock status */}
            <div className="mt-8 flex items-center gap-2 text-[14px] font-medium">
              <span className={`h-2.5 w-2.5 rounded-full ${status.dot}`} />
              <span className={status.text}>{status.label}</span>
            </div>

            {/* Quantity + add + wishlist */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-full border border-black/15 p-1">
                <button
                  type="button"
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  disabled={outOfStock || qty <= 1}
                  aria-label="Decrease quantity"
                  className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-30 ${FOCUS}`}
                >
                  <FiMinus size={14} />
                </button>
                <span
                  className="min-w-[28px] text-center text-[14px] font-medium"
                  aria-live="polite"
                >
                  {outOfStock ? 0 : qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty(q => Math.min(stock, q + 1))}
                  disabled={outOfStock || qty >= stock}
                  aria-label="Increase quantity"
                  className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-30 ${FOCUS}`}
                >
                  <FiPlus size={14} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={outOfStock}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3.5 text-[14px] font-medium text-white transition-colors ${
                  outOfStock
                    ? 'cursor-not-allowed bg-[#111111]/30'
                    : added
                      ? 'cursor-pointer bg-[#C2410C]'
                      : 'cursor-pointer bg-[#111111] hover:bg-[#C2410C]'
                } ${FOCUS}`}
              >
                {outOfStock ? (
                  'Out of stock'
                ) : added ? (
                  <>
                    <FiCheck size={16} />
                    Added to bag
                  </>
                ) : (
                  <>
                    <FiShoppingBag size={16} />
                    Add to bag
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => toggleWish(product)}
                aria-pressed={isWished}
                aria-label={
                  isWished ? 'Remove from wishlist' : 'Add to wishlist'
                }
                className={`flex h-12 w-12 flex-none cursor-pointer items-center justify-center rounded-full border border-black/15 transition-colors hover:border-[#111111] ${FOCUS}`}
              >
                <FiHeart
                  size={18}
                  className={isWished ? 'fill-[#C2410C] text-[#C2410C]' : ''}
                />
              </button>
            </div>

            {error && (
              <p className="m-0 mt-3 text-[13px] text-[#C2410C]">{error}</p>
            )}

            <p className="m-0 mt-4 text-[13px] text-[#111111]/55">
              Free delivery over ৳2000 · Cash on delivery available
            </p>

            {/* Details */}
            <div className="mt-10 border-t border-black/10 pt-8">
              <h2 className="m-0 text-[16px] font-medium">Details</h2>
              <ul className="m-0 mt-4 flex list-disc flex-col gap-2 pl-5 text-[14px] text-[#111111]/70">
                {product.details.map(d => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div
          id="reviews"
          className="mt-20 scroll-mt-28 border-t border-black/10 pt-16"
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
            {/* Summary + form */}
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="m-0 text-[clamp(24px,3vw,34px)] font-normal leading-tight tracking-tight text-[#111111]">
                  Customer reviews
                </h2>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-[32px] font-medium leading-none">
                    {reviews.length ? avg.toFixed(1) : '–'}
                  </span>
                  <div className="flex flex-col gap-1">
                    <Stars value={avg} size={16} />
                    <span className="text-[13px] text-[#111111]/60">
                      {reviews.length}{' '}
                      {reviews.length === 1 ? 'review' : 'reviews'}
                    </span>
                  </div>
                </div>
              </div>

              <form
                onSubmit={submitReview}
                noValidate
                className="flex flex-col gap-4 rounded-3xl bg-[#F4F4F5] p-6"
              >
                <h3 className="m-0 text-[16px] font-medium">Write a review</h3>

                <label className="flex flex-col gap-2">
                  <span className="text-[13px] font-medium">Your name</span>
                  <input
                    value={review.name}
                    onChange={e =>
                      setReview(r => ({ ...r, name: e.target.value }))
                    }
                    placeholder="Your name"
                    className={INPUT}
                  />
                </label>

                <div className="flex flex-col gap-2">
                  <span className="text-[13px] font-medium">Rating</span>
                  <div className="flex gap-1" role="group" aria-label="Rating">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setReview(r => ({ ...r, rating: n }))}
                        aria-label={`${n} star${n > 1 ? 's' : ''}`}
                        aria-pressed={review.rating >= n}
                        className={`cursor-pointer rounded-md p-1 ${FOCUS}`}
                      >
                        <FiStar
                          size={22}
                          className={
                            review.rating >= n
                              ? 'fill-[#111111] text-[#111111]'
                              : 'text-[#111111]/30'
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="text-[13px] font-medium">Your review</span>
                  <textarea
                    rows={4}
                    value={review.text}
                    onChange={e =>
                      setReview(r => ({ ...r, text: e.target.value }))
                    }
                    placeholder="How did the fit, fabric and colour feel?"
                    className={`${INPUT} resize-none`}
                  />
                </label>

                {reviewError && (
                  <p className="m-0 text-[13px] text-[#C2410C]">
                    {reviewError}
                  </p>
                )}
                {reviewDone && (
                  <p className="m-0 text-[13px] text-[#111111]">
                    Thank you for your review.
                  </p>
                )}

                <button
                  type="submit"
                  className={`cursor-pointer rounded-full bg-[#111111] py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-[#C2410C] ${FOCUS}`}
                >
                  Submit review
                </button>
              </form>
            </div>

            {/* Review list */}
            <ul className="m-0 flex list-none flex-col divide-y divide-black/10 p-0">
              {reviews.length === 0 && (
                <li className="py-6 text-[15px] text-[#111111]/60">
                  No reviews yet. Be the first to review this product.
                </li>
              )}
              {reviews.map((r, i) => (
                <li
                  key={`${r.name}-${i}`}
                  className="flex flex-col gap-3 py-6 first:pt-0"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <Stars value={r.rating} />
                      <span className="text-[14px] font-medium">{r.name}</span>
                    </div>
                    <span className="text-[13px] text-[#111111]/50">
                      {r.date}
                    </span>
                  </div>
                  <p className="m-0 text-[15px] leading-relaxed text-[#111111]/75">
                    {r.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="m-0 text-[clamp(24px,3vw,34px)] font-normal leading-tight tracking-tight text-[#111111]">
              You may also like
            </h2>
            <ul className="m-0 mt-8 grid list-none grid-cols-2 gap-x-3 gap-y-8 p-0 md:grid-cols-4 sm:gap-x-5">
              {related.map(p => (
                <li key={p.id} className="min-w-0">
                  <Link
                    href={p.href}
                    className={`group block text-[#111111] no-underline ${FOCUS}`}
                  >
                    <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#F4F4F5]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                      />
                    </div>
                    <h3 className="m-0 mt-3 truncate text-[14px] font-medium">
                      {p.name}
                    </h3>
                    <p className="m-0 mt-1 text-[14px] text-[#111111]/70">
                      {taka(p.price)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default function ProductPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  if (!product) return <NotFound />;

  // key diye product change hole state reset hobe
  return <ProductView key={product.id} product={product} />;
}
