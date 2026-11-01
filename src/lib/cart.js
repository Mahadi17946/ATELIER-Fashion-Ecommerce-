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
   STORE: cart, wishlist, address book
   Puro site e share hoy. Browser er localStorage e save thake.
   ========================================================= */

const CartContext = createContext(null);
const CART_KEY = 'atelier-cart';
const WISH_KEY = 'atelier-wishlist';
const ADDR_KEY = 'atelier-addresses';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [wishItems, setWishItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
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
    try {
      const a = window.localStorage.getItem(ADDR_KEY);
      if (a) setAddresses(JSON.parse(a));
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

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(ADDR_KEY, JSON.stringify(addresses));
    } catch {}
  }, [addresses, ready]);

  /* ---------- Cart ---------- */

   const addItem = useCallback((product, qty = 1) => {
     const color = product.color ?? null;
     const size = product.size ?? null;
     // Same product hole onno colour/size hole alada line hobe
     const key = [product.id, color ?? '', size ?? ''].join('|');
     setItems(prev => {
       const found = prev.find(i => i.id === key);
       if (found) {
         return prev.map(i => (i.id === key ? { ...i, qty: i.qty + qty } : i));
       }
       return [
         ...prev,
         {
           id: key,
           productId: product.id,
           name: product.name,
           price: product.price,
           image: product.image,
           href: product.href,
           color,
           size,
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

  /* ---------- Address book ---------- */

  // data: { name, email, phone, address, district, isDefault }
  const addAddress = useCallback(data => {
    const id = `addr-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setAddresses(prev => {
      const makeDefault = !!data.isDefault || prev.length === 0;
      const base = makeDefault
        ? prev.map(a => ({ ...a, isDefault: false }))
        : prev;
      return [...base, { ...data, id, isDefault: makeDefault }];
    });
    return id;
  }, []);

  const updateAddress = useCallback((id, data) => {
    setAddresses(prev => {
      const makeDefault = !!data.isDefault;
      return prev.map(a => {
        if (a.id === id) return { ...a, ...data, isDefault: makeDefault };
        return makeDefault ? { ...a, isDefault: false } : a;
      });
    });
  }, []);

  const deleteAddress = useCallback(id => {
    setAddresses(prev => {
      const rest = prev.filter(a => a.id !== id);
      if (rest.length && !rest.some(a => a.isDefault)) {
        rest[0] = { ...rest[0], isDefault: true };
      }
      return rest;
    });
  }, []);

  const setDefaultAddress = useCallback(id => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  }, []);

  /* ---------- Value ---------- */

  const value = useMemo(() => {
    const count = items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const wishIds = wishItems.map(i => i.id);
    const defaultAddress =
      addresses.find(a => a.isDefault) ?? addresses[0] ?? null;
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
      addresses,
      defaultAddress,
      addAddress,
      updateAddress,
      deleteAddress,
      setDefaultAddress,
    };
  }, [
    ready,
    items,
    wishItems,
    addresses,
    addItem,
    updateQty,
    removeItem,
    clearCart,
    toggleWish,
    removeWish,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
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
