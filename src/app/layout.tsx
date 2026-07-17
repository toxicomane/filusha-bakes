import type { Metadata } from 'next';
import { Unbounded, IBM_Plex_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { OrdersProvider } from '@/context/OrdersContext';
import { FavoritesProvider } from '@/context/FavoritesContext';

const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-unbounded',
  display: 'swap',
  weight: ['400', '600', '700', '900'],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-ibm-plex',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['600', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Filusha Bakes | Домашняя кондитерская ручной работы',
  description: 'Интернет-витрина ремесленных десертов: торты, тарталетки, капкейки и печенье. Натуральные ингредиенты, честный состав, оперативная доставка по Москве.',
  keywords: ['кондитерская', 'торты на заказ', 'капкейки', 'эклеры', 'десерты', 'Filusha Bakes', 'печенье кукис'],
  authors: [{ name: 'Filusha Bakes' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${ibmPlexSans.variable} ${playfairDisplay.variable}`}
    >
      <body className="bg-[#FAF6F0] text-[#2C1810] min-h-screen flex flex-col antialiased selection:bg-[#8B1A2B] selection:text-[#FAF6F0]">
        <OrdersProvider>
          <CartProvider>
            <FavoritesProvider>
              {children}
            </FavoritesProvider>
          </CartProvider>
        </OrdersProvider>
      </body>
    </html>
  );
}
