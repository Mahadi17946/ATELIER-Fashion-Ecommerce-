import SideLayout from '@/components/SideLayout';

const GROUPS = [
  {
    title: 'My orders',
    items: [
      { label: 'To Pay', href: '/orders/to-pay' },
      { label: 'To Ship', href: '/orders/to-ship' },
      { label: 'To Receive', href: '/orders/to-receive' },
      { label: 'To Review', href: '/orders/to-review' },
      { label: 'Return & Cancellation', href: '/orders/returns' },
    ],
  },
];

export default function OrdersLayout({ children }) {
  return <SideLayout groups={GROUPS}>{children}</SideLayout>;
}
