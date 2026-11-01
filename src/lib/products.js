/* =========================================================
   PRODUCTS: sob product ekhane.
   stock: kotoguli ache (0 hole Out of stock)
   reviews: customer review gulo. Nijer review diye replace koro.
   ========================================================= */

export const PRODUCTS = [
  {
    id: '1',
    slug: 'cotton-panjabi',
    href: '/product/cotton-panjabi',
    name: 'Cotton panjabi',
    category: 'men',
    price: 2450,
    oldPrice: 2900,
    badge: 'Best seller',
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
    description:
      'A relaxed-fit panjabi in heavy cotton. Soft against the skin, with a clean collar and a fall that works for Eid, weddings and everyday wear.',
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Sand', hex: '#D9CBB5' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    details: [
      '100% heavy cotton',
      'Pre-washed, does not shrink',
      'Machine wash cold, line dry',
    ],
    stock: 12,
    reviews: [
      {
        name: 'Rafiul H.',
        rating: 5,
        date: '12/09/2026',
        text: 'Fabric is thick and comfortable. Fits well across the shoulders.',
      },
      {
        name: 'Tanvir A.',
        rating: 4,
        date: '28/08/2026',
        text: 'Good quality for the price. The collar could be a little softer.',
      },
    ],
  },
  {
    id: '2',
    slug: 'jamdani-saree',
    href: '/product/jamdani-saree',
    name: 'Jamdani saree',
    category: 'women',
    price: 6800,
    oldPrice: null,
    badge: 'New',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80',
    description:
      'A handwoven jamdani saree with fine motifs across the body. Light enough for a full day, rich enough for a celebration.',
    colors: [
      { name: 'Red', hex: '#C2410C' },
      { name: 'Champagne', hex: '#E7C9A9' },
    ],
    sizes: ['Free size'],
    details: [
      'Cotton jamdani weave',
      'Blouse piece included',
      'Dry clean recommended',
    ],
    stock: 3,
    reviews: [
      {
        name: 'Natasha J.',
        rating: 5,
        date: '03/10/2026',
        text: 'The motifs are beautiful and the weave is very fine. Received it well packed.',
      },
    ],
  },
  {
    id: '3',
    slug: 'leather-tote-bag',
    href: '/product/leather-tote-bag',
    name: 'Leather tote bag',
    category: 'accessories',
    price: 2800,
    oldPrice: 3400,
    badge: 'Sale',
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
    description:
      'A structured everyday tote in full-grain leather. Room for your laptop, a water bottle and whatever else the day brings.',
    colors: [{ name: 'Brown', hex: '#3A2A20' }],
    sizes: [],
    details: [
      'Full-grain leather',
      'Inner zip pocket',
      'Dimensions: 38 x 28 x 12 cm',
    ],
    stock: 0,
    reviews: [
      {
        name: 'Sadia K.',
        rating: 4,
        date: '15/09/2026',
        text: 'Solid leather and sturdy handles. The inside pocket is very useful.',
      },
      {
        name: 'Imran S.',
        rating: 5,
        date: '20/08/2026',
        text: 'Looks more expensive than it is. Stitching is neat.',
      },
    ],
  },
  {
    id: '4',
    slug: 'printed-kurti',
    href: '/product/printed-kurti',
    name: 'Printed kurti',
    category: 'women',
    price: 1650,
    oldPrice: null,
    badge: null,
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
    description:
      'A printed cotton kurti with a straight cut and side slits. Easy to style with jeans or with a salwar.',
    colors: [
      { name: 'Clay', hex: '#D5B8A6' },
      { name: 'Sage', hex: '#B9C4B0' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    details: ['100% cotton', 'Side slits', 'Machine wash cold'],
    stock: 25,
    reviews: [
      {
        name: 'Farzana M.',
        rating: 4,
        date: '07/10/2026',
        text: 'Light and breathable. The print is exactly like the photo.',
      },
    ],
  },
  {
    id: '5',
    slug: 'linen-shirt',
    href: '/product/linen-shirt',
    name: 'Linen shirt',
    category: 'men',
    price: 1890,
    oldPrice: null,
    badge: 'New',
    image:
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1000&q=80',
    description:
      'A breathable linen shirt for hot days. Clean lines, a soft collar and a relaxed body that looks good untucked.',
    colors: [
      { name: 'Sage', hex: '#C9D1C0' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    details: ['100% linen', 'Button-down collar', 'Machine wash cold'],
    stock: 8,
    reviews: [],
  },
  {
    id: '6',
    slug: 'silk-scarf',
    href: '/product/silk-scarf',
    name: 'Silk scarf',
    category: 'accessories',
    price: 1100,
    oldPrice: 1500,
    badge: 'Sale',
    image:
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80',
    description:
      'A lightweight silk scarf with a soft drape. Wear it at the neck, in your hair or tied onto a bag.',
    colors: [{ name: 'Peach', hex: '#E8B9A0' }],
    sizes: [],
    details: ['100% silk', 'Size: 90 x 90 cm', 'Dry clean only'],
    stock: 40,
    reviews: [
      {
        name: 'Mehnaz R.',
        rating: 5,
        date: '25/09/2026',
        text: 'Very soft and the colour is lovely. Great gift option.',
      },
    ],
  },
  {
    id: '7',
    slug: 'three-piece-set',
    href: '/product/three-piece-set',
    name: 'Three piece set',
    category: 'women',
    price: 3200,
    oldPrice: null,
    badge: null,
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
    description:
      'A matching three piece set with kurti, trousers and dupatta. Cut from breathable cotton for long days.',
    colors: [{ name: 'Sage', hex: '#B9C4B0' }],
    sizes: ['S', 'M', 'L', 'XL'],
    details: [
      'Kurti, trousers and dupatta',
      '100% cotton',
      'Machine wash cold',
    ],
    stock: 5,
    reviews: [
      {
        name: 'Ayesha T.',
        rating: 4,
        date: '18/10/2026',
        text: 'Good stitching and the set matches well. Dupatta is a bit thin.',
      },
    ],
  },
  {
    id: '8',
    slug: 'heavy-cotton-tee',
    href: '/product/heavy-cotton-tee',
    name: 'Heavy cotton t-shirt',
    category: 'new-in',
    price: 950,
    oldPrice: null,
    badge: 'New',
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
    description:
      'A boxy heavy cotton tee with a thick, structured feel. Holds its shape wash after wash.',
    colors: [
      { name: 'Oat', hex: '#E4D9C7' },
      { name: 'Black', hex: '#111111' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    details: [
      '240gsm heavy cotton',
      'Pre-washed, does not shrink',
      'Machine wash cold',
    ],
    stock: 0,
    reviews: [
      {
        name: 'Hasan B.',
        rating: 5,
        date: '01/10/2026',
        text: 'Thick fabric and the fit is boxy in the right way.',
      },
    ],
  },
];

export function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug) ?? null;
}
