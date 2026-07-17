'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { INITIAL_PRODUCTS } from '@/data/products';
import { useFavorites } from '@/context/FavoritesContext';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  const favoriteProducts = INITIAL_PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <Breadcrumbs items={[{ label: 'Избранные десерты' }]} />

        {/* Title Banner */}
        <div className="bg-[#2C1810] text-[#FAF6F0] p-6 border-4 border-[#8B1A2B] shadow-tactile flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="craft-label border border-[#8B1A2B] bg-[#8B1A2B]">Сохраненные позиции</span>
            <h1 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white mt-1 flex items-center gap-2">
              <Heart className="w-7 h-7 text-[#E87461] fill-current" />
              <span>Избранное ({favoriteProducts.length})</span>
            </h1>
          </div>
          <Link
            href="/catalog"
            className="bg-[#F5EDE3] text-[#2C1810] px-4 py-2 text-xs font-heading uppercase font-bold border-2 border-[#FAF6F0]"
          >
            В весь каталог
          </Link>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="bg-[#F5EDE3] border-4 border-[#2C1810] p-12 text-center space-y-4 shadow-tactile my-8">
            <div className="w-16 h-16 mx-auto bg-[#8B1A2B] text-white border-2 border-[#2C1810] flex items-center justify-center">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-heading text-xl font-black uppercase text-[#2C1810]">
              У вас пока нет избранных десертов
            </h2>
            <p className="font-body text-xs text-[#2C1810]/80 max-w-md mx-auto">
              Нажмите иконку сердечка на карточках товаров в каталоге, чтобы сохранить понравившиеся позиций.
            </p>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 bg-[#8B1A2B] text-white px-6 py-3 text-xs font-heading uppercase font-bold border-2 border-[#2C1810] shadow-tactile hover-tactile"
            >
              <span>Смотреть витрину</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
