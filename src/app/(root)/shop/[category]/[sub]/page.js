import { notFound } from 'next/navigation';
import ShopView from '@/components/ShopView';

const SUBS = {
  women: {
    category: 'women',
    title: 'Women',
    subs: {
      saree: { label: 'Saree', keyword: 'saree' },
      kurti: { label: 'Kurti', keyword: 'kurti' },
      'three-piece': { label: 'Three piece', keyword: 'three piece' },
      tops: { label: 'Tops', keyword: 'top' },
      dresses: { label: 'Dresses', keyword: 'dress' },
    },
  },
  men: {
    category: 'men',
    title: 'Men',
    subs: {
      panjabi: { label: 'Panjabi', keyword: 'panjabi' },
      shirts: { label: 'Shirts', keyword: ' shirt' },
      't-shirts': { label: 'T-shirts', keyword: 't-shirt' },
      polo: { label: 'Polo', keyword: 'polo' },
      pants: { label: 'Pants', keyword: 'pant' },
    },
  },
  accessories: {
    category: 'accessories',
    title: 'Accessories',
    subs: {
      bags: { label: 'Bags', keyword: 'bag' },
      wallets: { label: 'Wallets', keyword: 'wallet' },
      belts: { label: 'Belts', keyword: 'belt' },
      jewellery: { label: 'Jewellery', keyword: 'jewel' },
      scarves: { label: 'Scarves', keyword: 'scarf' },
    },
  },
};

export default async function SubCategoryPage({ params }) {
  const { category, sub } = await params;
  const cfg = SUBS[category];
  const item = cfg?.subs?.[sub];
  if (!cfg || !item) notFound();

  return (
    <ShopView
      title={item.label}
      description={`${cfg.title} · ${item.label}`}
      category={cfg.category}
      keyword={item.keyword}
    />
  );
}
