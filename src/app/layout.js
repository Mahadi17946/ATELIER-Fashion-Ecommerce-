import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'ATELIER   |  Unique Fashion Brand',
  description:
    'ATELIER is a unique fashion brand that combines contemporary design with timeless elegance. Explore our exclusive collections and discover the art of fashion.',
  icons: {
    icon: '/atelier-icon1.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
