import SideLayout from '@/components/SideLayout';

const GROUPS = [
  {
    title: 'My account',
    items: [
      { label: 'Profile', href: '/account/profile' },
      { label: 'Address book', href: '/account/address' },
      { label: 'Change password', href: '/account/password' },
      { label: 'Notifications', href: '/account/notifications' },
      { label: 'Language', href: '/account/language' },
    ],
  },
];

export default function AccountLayout({ children }) {
  return <SideLayout groups={GROUPS}>{children}</SideLayout>;
}
