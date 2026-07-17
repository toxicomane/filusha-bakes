'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Check, Clock, Eye, Heart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [isAdded, setIsAdded] = useState(false);
  const favoriteActive = isFavorite(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <div className="bg-[#F5EDE3] border-2 border-[#2C1810] flex flex-col justify-between hover-tactile relative group">
      
      {/* Top Labels Badges & Favorite Heart Button */}
      <div className="absolute top-2 left-2 right-2 z-10 flex items-start justify-between pointer-events-none">
        <div className="flex flex-col gap-1 items-start pointer-events-auto">
          <span className="craft-label border border-[#2C1810]">
            {product.categoryName}
          </span>
          {product.featured && (
            <span className="bg-[#8B1A2B] text-white font-heading text-[10px] font-bold uppercase px-2 py-0.5 border border-[#2C1810]">
              Хит продаж
            </span>
          )}
          {!product.inStock && (
            <span className="bg-[#E87461] text-white font-heading text-[10px] font-bold uppercase px-2 py-0.5 border border-[#2C1810] flex items-center gap-1">
              <Clock className="w-3 h-3" /> Предзаказ {product.preorderDays} дн.
            </span>
          )}
        </div>

        {/* UpGadget-style Favorites Heart Button */}
        <button
          onClick={handleFavoriteClick}
          className={`p-1.5 border-2 border-[#2C1810] shadow-tactile-sm transition-colors pointer-events-auto ${
            favoriteActive
              ? 'bg-[#8B1A2B] text-white'
              : 'bg-[#FAF6F0] text-[#2C1810] hover:bg-[#8B1A2B] hover:text-white'
          }`}
          title={favoriteActive ? 'Убрать из избранного' : 'Добавить в избранное'}
        >
          <Heart className={`w-4 h-4 ${favoriteActive ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div>
        {/* Product Image Container */}
        <Link href={`/product/${product.slug}`} className="block relative aspect-4/3 bg-[#2C1810] border-b-2 border-[#2C1810] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
          
          {/* Quick View Overlay Button */}
          <div className="absolute inset-0 bg-[#2C1810]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-[#FAF6F0] text-[#2C1810] px-3 py-1.5 border-2 border-[#2C1810] font-heading text-xs uppercase font-bold flex items-center gap-1 shadow-tactile-sm">
              <Eye className="w-3.5 h-3.5 text-[#8B1A2B]" />
              Подробнее
            </span>
          </div>
        </Link>

        {/* Content Body */}
        <div className="p-4 space-y-2">
          <div className="flex justify-between items-baseline gap-2 font-body text-[11px] text-[#2C1810]/70 font-semibold uppercase tracking-wider">
            <span>{product.weight}</span>
            {product.servings && <span>• {product.servings}</span>}
          </div>

          <Link
            href={`/product/${product.slug}`}
            className="block font-heading text-sm font-extrabold text-[#2C1810] hover:text-[#8B1A2B] uppercase tracking-tight line-clamp-2 leading-snug"
          >
            {product.name}
          </Link>

          <p className="font-body text-xs text-[#2C1810]/80 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Footer / Price & Add to Cart */}
      <div className="p-4 pt-4 border-t border-[#2C1810]/20 mt-4 flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] uppercase font-heading text-[#2C1810]/60 block -mb-1">Цена</span>
          <span className="font-price font-extrabold text-xl sm:text-2xl text-[#8B1A2B]">
            {product.price.toLocaleString('ru-RU')} ₽
          </span>
        </div>

        <button
          onClick={handleQuickAdd}
          className={`px-3 py-2 border-2 border-[#2C1810] font-heading text-xs font-bold uppercase transition-all flex items-center gap-1.5 shadow-tactile-sm active:translate-x-0.5 active:translate-y-0.5 ${
            isAdded
              ? 'bg-[#E87461] text-white border-[#2C1810]'
              : 'bg-[#8B1A2B] text-white hover:bg-[#D9485B]'
          }`}
          title="Добавить в корзину"
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>В корзине</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>{product.inStock ? 'В корзину' : 'Предзаказ'}</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
