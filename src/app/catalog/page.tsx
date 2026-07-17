'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, Check, X, RotateCcw } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { INITIAL_PRODUCTS, CATEGORIES } from '@/data/products';

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(4500);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.composition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesInStock = !inStockOnly || product.inStock;
      const matchesPrice = product.price <= maxPrice;

      return matchesCategory && matchesSearch && matchesInStock && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name, 'ru');
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, inStockOnly, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setInStockOnly(false);
    setMaxPrice(4500);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <Breadcrumbs items={[{ label: 'Каталог десертов' }]} />

        {/* Title Header */}
        <div className="bg-[#2C1810] text-[#FAF6F0] p-6 border-4 border-[#8B1A2B] shadow-tactile flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="craft-label border border-[#8B1A2B] bg-[#8B1A2B]">Ассортимент витрины</span>
            <h1 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white mt-1">
              Каталог кондитерских изделий
            </h1>
            <p className="font-body text-xs text-[#F5EDE3]/80 mt-1">
              Оригинальные рецепты, честные веса и свежие натуральные ингредиенты.
            </p>
          </div>
          <div className="font-heading text-xs font-bold uppercase bg-[#FAF6F0] text-[#2C1810] p-3 border-2 border-[#8B1A2B] shadow-tactile-sm shrink-0">
            Найдено позиций: <span className="font-price text-base text-[#8B1A2B]">{filteredProducts.length}</span>
          </div>
        </div>

        {/* UpGadget-Style Catalog Layout: Sidebar + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Filter Sidebar */}
          <aside className="lg:col-span-3 bg-[#F5EDE3] border-4 border-[#2C1810] p-5 shadow-tactile space-y-6">
            
            <div className="flex justify-between items-center border-b-2 border-[#8B1A2B] pb-2">
              <span className="font-heading text-xs font-black uppercase text-[#2C1810] flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-[#8B1A2B]" />
                Фильтры каталога
              </span>
              <button
                onClick={handleResetFilters}
                className="text-[10px] font-heading uppercase text-[#8B1A2B] font-bold hover:underline flex items-center gap-1"
                title="Сбросить все фильтры"
              >
                <RotateCcw className="w-3 h-3" /> Сброс
              </button>
            </div>

            {/* Category Filter Tree */}
            <div className="space-y-2">
              <label className="block font-heading text-[11px] uppercase text-[#8B1A2B] font-extrabold">
                Категории десертов
              </label>
              <div className="space-y-1 font-body text-xs">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left p-2 border transition-colors font-bold ${
                    selectedCategory === 'all'
                      ? 'bg-[#8B1A2B] text-white border-[#2C1810]'
                      : 'bg-[#FAF6F0] text-[#2C1810] border-[#2C1810]/30 hover:border-[#2C1810]'
                  }`}
                >
                  Все категории ({INITIAL_PRODUCTS.length})
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left p-2 border transition-colors flex justify-between items-center ${
                      selectedCategory === cat.slug
                        ? 'bg-[#8B1A2B] text-white border-[#2C1810] font-bold'
                        : 'bg-[#FAF6F0] text-[#2C1810] border-[#2C1810]/30 hover:border-[#2C1810]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="font-price text-[11px]">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Range */}
            <div className="space-y-2 border-t border-[#2C1810]/20 pt-4">
              <div className="flex justify-between items-center">
                <label className="block font-heading text-[11px] uppercase text-[#8B1A2B] font-extrabold">
                  Макс. цена
                </label>
                <span className="font-price font-bold text-sm text-[#8B1A2B]">
                  до {maxPrice.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <input
                type="range"
                min={300}
                max={4500}
                step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#8B1A2B]"
              />
            </div>

            {/* In Stock Toggle */}
            <div className="border-t border-[#2C1810]/20 pt-4">
              <label className="flex items-center gap-2 cursor-pointer font-body text-xs text-[#2C1810] font-semibold select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 accent-[#8B1A2B] border-2 border-[#2C1810]"
                />
                <span>Только десерты в наличии</span>
              </label>
            </div>

          </aside>

          {/* Right Main Catalog Grid */}
          <div className="lg:col-span-9 space-y-4">
            
            {/* Top Toolbar: Search & Sorting */}
            <div className="bg-[#F5EDE3] border-2 border-[#2C1810] p-3 shadow-tactile-sm flex flex-col sm:flex-row justify-between items-center gap-3">
              {/* Search input */}
              <div className="w-full sm:w-auto flex-1 flex border-2 border-[#2C1810] bg-[#FAF6F0]">
                <div className="p-2 text-[#8B1A2B]">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Быстрый фильтр по названию..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-1.5 pr-2 font-body text-xs text-[#2C1810] bg-transparent focus:outline-none"
                />
              </div>

              {/* Sort selector */}
              <div className="w-full sm:w-auto flex items-center gap-2 shrink-0 border-2 border-[#2C1810] bg-[#FAF6F0] px-3 py-1">
                <ArrowUpDown className="w-4 h-4 text-[#8B1A2B]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-body text-xs text-[#2C1810] font-bold focus:outline-none py-1"
                >
                  <option value="featured">Рекомендуемые</option>
                  <option value="price-asc">Цена: сперва недорогие</option>
                  <option value="price-desc">Цена: сперва дорогие</option>
                  <option value="name">По алфавиту (А-Я)</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-[#F5EDE3] border-4 border-[#2C1810] p-12 text-center space-y-4 shadow-tactile my-4">
                <h3 className="font-heading text-lg font-bold uppercase text-[#2C1810]">
                  Десертов с такими параметрами не найдено
                </h3>
                <p className="font-body text-xs text-[#2C1810]/80">
                  Попробуйте сбросить лимит цены или отключить фильтр наличия.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-[#8B1A2B] text-white px-4 py-2 font-heading text-xs uppercase font-bold border-2 border-[#2C1810]"
                >
                  Сбросить все настройки
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
