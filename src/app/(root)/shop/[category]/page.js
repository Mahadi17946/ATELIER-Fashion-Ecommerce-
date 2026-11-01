import { notFound } from 'next/navigation';
import ShopView from '@/components/ShopView';

const CATEGORIES = {
  new: {
    title: 'New in',
    description: 'Fresh arrivals this season',
    value: 'new-in',
  },
  women: {
    title: 'Women',
    description: 'Sarees, kurtis and three piece sets',
    value: 'women',
  },
  men: {
    title: 'Men',
    description: 'Panjabi, shirts and t-shirts',
    value: 'men',
  },
  accessories: {
    title: 'Accessories',
    description: 'Bags, scarves and more',
    value: 'accessories',
  },
};

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const cfg = CATEGORIES[category];
  if (!cfg) notFound();

  return (
    <ShopView
      title={cfg.title}
      description={cfg.description}
      category={cfg.value}
    />
  );
}
