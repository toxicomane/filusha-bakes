'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Check,
  Plus,
  Minus,
  Clock,
  ShieldAlert,
  ArrowRight,
  Truck,
  Heart,
  Zap,
  Info,
  ChevronDown
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { INITIAL_PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const { addToCart, setIsCartOpen } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [quantity, setQuantity] = useState(1);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'composition' | 'nutrition' | 'allergens' | 'shipping'>('composition');

  const product = INITIAL_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF6F0]">
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-16 text-center space-y-4">
          <Breadcrumbs items={[{ label: 'Товар не найден' }]} />
          <h1 className="font-heading text-2xl font-bold uppercase text-[#8B1A2B]">
            Десерт с адресом «{slug}» не найден
          </h1>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 bg-[#8B1A2B] text-white px-5 py-2.5 text-xs font-heading uppercase font-bold border-2 border-[#2C1810]"
          >
            Вернуться в витрину
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const favoriteActive = isFavorite(product.id);

  const crossSellProducts = INITIAL_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.featured)
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setIsCartOpen(true);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        <Breadcrumbs
          items={[
            { label: 'Каталог', href: '/catalog' },
            { label: product.categoryName, href: `/category/${product.category}` },
            { label: product.name },
          ]}
        />

        {/* UpGadget Product Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image Gallery & Thumbnails */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-4/3 bg-[#2C1810] border-4 border-[#2C1810] shadow-tactile overflow-hidden">
              <Image
                src={product.images[activeImgIndex] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
              
              {/* Badges Overlay */}
              <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                <span className="craft-label border border-[#FAF6F0]">
                  {product.categoryName}
                </span>
                {!product.inStock && (
                  <span className="bg-[#E87461] text-white font-heading text-[10px] font-bold uppercase px-2 py-0.5 border border-[#2C1810]">
                    Предзаказ ({product.preorderDays} дн.)
                  </span>
                )}
              </div>

              {/* UpGadget Favorite Heart */}
              <button
                onClick={() => toggleFavorite(product.id)}
                className={`absolute top-3 right-3 p-2 border-2 border-[#2C1810] shadow-tactile-sm transition-colors z-10 ${
                  favoriteActive
                    ? 'bg-[#8B1A2B] text-white'
                    : 'bg-[#FAF6F0] text-[#2C1810] hover:bg-[#8B1A2B] hover:text-white'
                }`}
                title={favoriteActive ? 'Из избранного' : 'В избранное'}
              >
                <Heart className={`w-5 h-5 ${favoriteActive ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative w-20 h-20 bg-[#2C1810] border-2 transition-all ${
                      activeImgIndex === idx
                        ? 'border-[#8B1A2B] scale-105 shadow-tactile-sm'
                        : 'border-[#2C1810] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} preview ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Title, Pricing, Purchasing & Quick Controls */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2 border-b-2 border-[#2C1810] pb-4">
              <div className="flex items-center gap-3 text-xs font-body font-bold uppercase tracking-wider text-[#2C1810]/70">
                <span className="bg-[#2C1810] text-[#FAF6F0] px-2 py-0.5 font-heading">
                  {product.weight}
                </span>
                {product.servings && <span>• {product.servings}</span>}
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black uppercase text-[#2C1810] leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 pt-2">
                <span className="font-price font-black text-3xl sm:text-4xl text-[#8B1A2B]">
                  {product.price.toLocaleString('ru-RU')} ₽
                </span>
                <span className="font-body text-xs text-[#2C1810]/60">
                  за {product.weight}
                </span>
              </div>
            </div>

            <p className="font-body text-xs sm:text-sm text-[#2C1810] leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Stepper & Add To Cart */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                
                {/* Stepper */}
                <div className="flex items-center justify-between border-2 border-[#2C1810] bg-[#F5EDE3] px-3 py-2 w-32 shrink-0 shadow-tactile-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 text-[#2C1810] hover:bg-[#8B1A2B] hover:text-white transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-price font-extrabold text-lg text-[#2C1810]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1 text-[#2C1810] hover:bg-[#8B1A2B] hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add To Cart */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 p-3.5 border-2 border-[#2C1810] font-heading text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-tactile hover-tactile flex items-center justify-center gap-2 transition-all ${
                    isAdded ? 'bg-[#E87461]' : 'bg-[#8B1A2B] hover:bg-[#D9485B]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Добавлено в корзину!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>
                        В корзину • {(product.price * quantity).toLocaleString('ru-RU')} ₽
                      </span>
                    </>
                  )}
                </button>

              </div>

              <Link
                href="/checkout"
                onClick={handleAddToCart}
                className="w-full bg-[#2C1810] hover:bg-black text-[#FAF6F0] py-3 font-heading text-xs font-bold uppercase border-2 border-[#2C1810] shadow-tactile-sm flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-[#E87461]" />
                <span>Быстрое оформление в 1 клик</span>
              </Link>
            </div>

            {/* UpGadget Specs Tabs Panel */}
            <div className="bg-[#F5EDE3] border-4 border-[#2C1810] p-4 shadow-tactile-sm space-y-3">
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-1 border-b-2 border-[#2C1810] pb-2">
                <button
                  onClick={() => setActiveTab('composition')}
                  className={`px-3 py-1 font-heading text-[11px] uppercase font-bold border-2 transition-colors ${
                    activeTab === 'composition'
                      ? 'bg-[#8B1A2B] text-white border-[#2C1810]'
                      : 'bg-[#FAF6F0] text-[#2C1810] border-transparent hover:border-[#2C1810]'
                  }`}
                >
                  Состав
                </button>
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className={`px-3 py-1 font-heading text-[11px] uppercase font-bold border-2 transition-colors ${
                    activeTab === 'nutrition'
                      ? 'bg-[#8B1A2B] text-white border-[#2C1810]'
                      : 'bg-[#FAF6F0] text-[#2C1810] border-transparent hover:border-[#2C1810]'
                  }`}
                >
                  Пищевая ценность
                </button>
                <button
                  onClick={() => setActiveTab('allergens')}
                  className={`px-3 py-1 font-heading text-[11px] uppercase font-bold border-2 transition-colors ${
                    activeTab === 'allergens'
                      ? 'bg-[#8B1A2B] text-white border-[#2C1810]'
                      : 'bg-[#FAF6F0] text-[#2C1810] border-transparent hover:border-[#2C1810]'
                  }`}
                >
                  Аллергены
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`px-3 py-1 font-heading text-[11px] uppercase font-bold border-2 transition-colors ${
                    activeTab === 'shipping'
                      ? 'bg-[#8B1A2B] text-white border-[#2C1810]'
                      : 'bg-[#FAF6F0] text-[#2C1810] border-transparent hover:border-[#2C1810]'
                  }`}
                >
                  Доставка & Хранение
                </button>
              </div>

              {/* Tab Contents */}
              <div className="font-body text-xs text-[#2C1810] leading-relaxed min-h-24">
                {activeTab === 'composition' && (
                  <p>{product.composition}</p>
                )}

                {activeTab === 'nutrition' && product.nutritionalValue && (
                  <div className="grid grid-cols-4 gap-2 text-center bg-[#FAF6F0] p-3 border border-[#2C1810]">
                    <div>
                      <span className="block text-[10px] uppercase font-heading text-[#2C1810]/60">Калории</span>
                      <strong className="font-price text-sm text-[#8B1A2B]">{product.nutritionalValue.calories} ккал</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-heading text-[#2C1810]/60">Белки</span>
                      <strong className="font-price text-sm">{product.nutritionalValue.proteins} г</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-heading text-[#2C1810]/60">Жиры</span>
                      <strong className="font-price text-sm">{product.nutritionalValue.fats} г</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-heading text-[#2C1810]/60">Углеводы</span>
                      <strong className="font-price text-sm">{product.nutritionalValue.carbs} г</strong>
                    </div>
                  </div>
                )}

                {activeTab === 'allergens' && (
                  <div className="flex items-start gap-2 text-[#8B1A2B] font-bold">
                    <ShieldAlert className="w-5 h-5 shrink-0" />
                    <span>Содержит аллергены: {product.allergens.join(', ')}. Готовится на оборудовании, где обрабатываются орехи.</span>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <p>
                    Доставляется курьером в герметичной упаковке. Хранить в холодильнике при температуре +2..+6°C не более 72 часов.
                  </p>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Cross-Sell Block */}
        <section className="space-y-6 pt-8 border-t-4 border-[#2C1810]">
          <div className="flex justify-between items-end">
            <h2 className="font-heading text-2xl font-black uppercase text-[#2C1810]">
              Похожие товары и рекомендации
            </h2>
            <Link
              href="/catalog"
              className="font-heading text-xs uppercase font-bold text-[#8B1A2B] hover:text-[#2C1810] flex items-center gap-1"
            >
              Смотреть всё
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {crossSellProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
