'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

/* =========================================================
   CART + WISHLIST STORE
   Puro site e share hoy. Browser er localStorage e save thake.

   Cart:
     const { items, addItem, updateQty, removeItem, count, subtotal } = useCart();
   Wishlist:
     const { wishItems, wishIds, toggleWish, removeWish } = useCart();
   ========================================================= */

const CartContext = createContext(null);
const CART_KEY = 'atelier-cart';
const WISH_KEY = 'atelier-wishlist';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [wishItems, setWishItems] = useState([]);
  const [ready, setReady] = useState(false);

  // Browser e load
  useEffect(() => {
    try {
      const c = window.localStorage.getItem(CART_KEY);
      if (c) setItems(JSON.parse(c));
    } catch {}
    try {
      const w = window.localStorage.getItem(WISH_KEY);
      if (w) setWishItems(JSON.parse(w));
    } catch {}
    setReady(true);
  }, []);

  // Save
  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(WISH_KEY, JSON.stringify(wishItems));
    } catch {}
  }, [wishItems, ready]);

  /* ---------- Cart ---------- */

  const addItem = useCallback((product, qty = 1) => {
    setItems(prev => {
      const found = prev.find(i => i.id === product.id);
      if (found) {
        return prev.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          href: product.href,
          color: product.color ?? null,
          qty,
        },
      ];
    });
  }, []);

  const updateQty = useCallback((id, qty) => {
    setItems(prev =>
      qty < 1
        ? prev.filter(i => i.id !== id)
        : prev.map(i => (i.id === id ? { ...i, qty } : i)),
    );
  }, []);

  const removeItem = useCallback(id => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  /* ---------- Wishlist ---------- */

  // Age thakle remove, na thakle add
  const toggleWish = useCallback(product => {
    setWishItems(prev =>
      prev.some(i => i.id === product.id)
        ? prev.filter(i => i.id !== product.id)
        : [
            ...prev,
            {
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              href: product.href,
            },
          ],
    );
  }, []);

  const removeWish = useCallback(id => {
    setWishItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const value = useMemo(() => {
    const count = items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const wishIds = wishItems.map(i => i.id);
    return {
      ready,
      items,
      count,
      subtotal,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      wishItems,
      wishIds,
      wishCount: wishItems.length,
      toggleWish,
      removeWish,
    };
  }, [
    ready,
    items,
    wishItems,
    addItem,
    updateQty,
    removeItem,
    clearCart,
    toggleWish,
    removeWish,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return ctx;
}
