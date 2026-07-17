'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Search,
  Clock,
  Heart,
  Menu,
  X,
  ShieldCheck,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Grid
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { CartDrawer } from './CartDrawer';
import { MegaCatalogModal } from './MegaCatalogModal';
import { INITIAL_PRODUCTS, CATEGORIES } from '@/data/products';

export function Header() {
  const router = useRouter();
  const { totalCount, subtotal, setIsCartOpen } = useCart();
  const { favoritesCount } = useFavorites();

  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Live Auto-complete Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchResults = searchQuery.trim()
    ? INITIAL_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.composition.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* 1. TOP UTILITY BAR (UpGadget style) */}
      <div className="bg-[#2C1810] text-[#FAF6F0] text-xs font-body border-b-2 border-[#8B1A2B] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          
          {/* Location & Hours */}
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 font-semibold text-[#E87461]">
              <MapPin className="w-3.5 h-3.5" />
              Москва, ул. Покровка 18/2
            </span>
            <span className="hidden sm:inline text-[#FAF6F0]/40">|</span>
            <span className="hidden sm:flex items-center gap-1 text-[#F5EDE3]/90">
              <Clock className="w-3.5 h-3.5 text-[#E87461]" />
              Ежедневно 08:00 – 22:00
            </span>
          </div>

          {/* Quick Informational Links & Messengers */}
          <div className="flex items-center gap-4 text-[11px] font-heading font-semibold uppercase tracking-wider">
            <Link href="/about" className="hover:text-[#E87461] transition-colors">
              О нас
            </Link>
            <Link href="/blog" className="hover:text-[#E87461] transition-colors">
              Блог & Советы
            </Link>
            <Link href="/admin" className="hidden md:inline-flex items-center gap-1 text-[#E87461] hover:text-white">
              <ShieldCheck className="w-3.5 h-3.5" />
              Админка
            </Link>

            <span className="text-[#FAF6F0]/40 hidden sm:inline">|</span>

            {/* Phone & Messenger Buttons */}
            <div className="flex items-center gap-2">
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="p-1 bg-[#8B1A2B] hover:bg-[#D9485B] text-white transition-colors"
                title="Telegram"
              >
                <Send className="w-3 h-3" />
              </a>
              <a
                href="https://wa.me"
                target="_blank"
                rel="noreferrer"
                className="p-1 bg-[#2C1810] border border-[#8B1A2B] hover:bg-[#8B1A2B] text-white transition-colors"
                title="WhatsApp"
              >
                <MessageSquare className="w-3 h-3 text-[#E87461]" />
              </a>
              <a
                href="tel:+79998887766"
                className="font-price font-bold text-xs text-[#FAF6F0] hover:text-[#E87461] ml-1"
              >
                +7 (999) 888-77-66
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 2. MAIN FUNCTIONAL HEADER (UpGadget layout) */}
      <header className="sticky top-0 z-40 bg-[#FAF6F0] border-b-2 border-[#2C1810] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-3 md:gap-6">
            
            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#2C1810] border-2 border-[#2C1810] bg-[#F5EDE3] hover:bg-[#8B1A2B] hover:text-white transition-colors shrink-0"
              aria-label="Меню"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Brand Logo */}
            <Link href="/" className="flex flex-col shrink-0 group">
              <span className="font-heading text-lg sm:text-2xl font-black tracking-tight text-[#8B1A2B] group-hover:text-[#D9485B] transition-colors uppercase leading-none">
                FILUSHA <span className="text-[#2C1810]">BAKES</span>
              </span>
              <span className="font-body text-[9px] sm:text-[10px] uppercase tracking-widest text-[#2C1810] font-bold mt-0.5">
                Кондитерская витрина
              </span>
            </Link>

            {/* UpGadget-Style "Каталог" Mega Button */}
            <button
              onClick={() => setIsCatalogModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 bg-[#8B1A2B] hover:bg-[#D9485B] text-white px-4 py-2.5 font-heading text-xs font-bold uppercase border-2 border-[#2C1810] shadow-tactile-sm transition-transform active:scale-95 shrink-0"
            >
              <Grid className="w-4 h-4 text-[#FAF6F0]" />
              <span>Каталог</span>
            </button>

            {/* Universal Live Search Bar */}
            <div className="relative flex-1 max-w-xl hidden md:block">
              <form onSubmit={handleSearchSubmit} className="flex border-2 border-[#2C1810] bg-[#F5EDE3]">
                <input
                  type="text"
                  placeholder="Поиск десертов (торт, капкейк, фисташка, кукис)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full px-3 py-2 text-xs font-body text-[#2C1810] bg-transparent focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#8B1A2B] hover:bg-[#D9485B] text-white px-3.5 py-2 font-heading text-xs uppercase transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {/* Live Auto-complete Popup */}
              {isSearchFocused && searchResults.length > 0 && (
                <div
                  className="absolute left-0 right-0 top-full mt-1 bg-[#FAF6F0] border-2 border-[#2C1810] shadow-tactile-lg z-50 p-2 space-y-1"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <div className="text-[10px] font-heading uppercase text-[#8B1A2B] font-bold px-2 py-1 border-b border-[#2C1810]/20">
                    Найденные позиции:
                  </div>
                  {searchResults.map((prod) => (
                    <Link
                      key={prod.id}
                      href={`/product/${prod.slug}`}
                      onClick={() => {
                        setIsSearchFocused(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center justify-between p-2 hover:bg-[#F5EDE3] border border-transparent hover:border-[#2C1810] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="craft-label text-[9px]">{prod.categoryName}</span>
                        <span className="font-heading text-xs font-bold text-[#2C1810]">{prod.name}</span>
                      </div>
                      <span className="font-price font-bold text-xs text-[#8B1A2B]">{prod.price} ₽</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Header Action Controls (Favorites, Tracking, Cart) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Favorites Button */}
              <Link
                href="/favorites"
                className="relative p-2.5 border-2 border-[#2C1810] bg-[#F5EDE3] hover:bg-[#8B1A2B] hover:text-white transition-colors text-[#2C1810]"
                title="Избранные десерты"
              >
                <Heart className="w-4 h-4" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#8B1A2B] text-white font-price font-bold text-[10px] w-4 h-4 rounded-none border border-[#2C1810] flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              {/* Order Track Shortcut */}
              <Link
                href="/order/FILUSHA-20260316-001"
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-heading font-bold uppercase border-2 border-[#2C1810] bg-[#F5EDE3] hover:bg-[#FAF6F0] text-[#2C1810] transition-all shadow-tactile-sm"
              >
                <Clock className="w-3.5 h-3.5 text-[#8B1A2B]" />
                <span>Отследить</span>
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 border-2 border-[#2C1810] bg-[#8B1A2B] hover:bg-[#D9485B] text-white font-heading text-xs font-bold uppercase transition-all shadow-tactile-sm active:translate-x-0.5 active:translate-y-0.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Корзина</span>
                <span className="bg-[#FAF6F0] text-[#8B1A2B] px-2 py-0.5 font-price font-bold text-xs border border-[#2C1810]">
                  {totalCount}
                </span>
                {subtotal > 0 && (
                  <span className="hidden md:inline font-price text-xs text-[#F5EDE3]">
                    • {subtotal.toLocaleString('ru-RU')} ₽
                  </span>
                )}
              </button>

            </div>

          </div>

          {/* Search bar for mobile viewports */}
          <div className="mt-2.5 md:hidden">
            <form onSubmit={handleSearchSubmit} className="flex border-2 border-[#2C1810] bg-[#F5EDE3]">
              <input
                type="text"
                placeholder="Поиск по названию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs font-body text-[#2C1810] bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#8B1A2B] text-white px-3 text-xs font-heading uppercase"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* 3. HORIZONTAL CATEGORIES STRIP MENU (UpGadget style) */}
        <div className="bg-[#F5EDE3] border-t border-[#2C1810]/30 hidden lg:block py-2 px-4 font-heading text-xs font-bold uppercase">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                href="/catalog"
                className="text-[#8B1A2B] hover:underline flex items-center gap-1 font-extrabold"
              >
                <span>Все десерты</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/category/cakes" className="hover:text-[#8B1A2B] transition-colors">
                Торты
              </Link>
              <Link href="/category/pastries" className="hover:text-[#8B1A2B] transition-colors">
                Пирожные & Эклеры
              </Link>
              <Link href="/category/cupcakes" className="hover:text-[#8B1A2B] transition-colors">
                Капкейки
              </Link>
              <Link href="/category/cookies" className="hover:text-[#8B1A2B] transition-colors">
                Печенье Кукис
              </Link>
              <Link href="/blog" className="text-[#2C1810]/80 hover:text-[#8B1A2B] transition-colors">
                Блог кондитеров
              </Link>
            </div>

            <div className="text-[11px] font-body text-[#2C1810]/70 font-semibold">
              ⚡ Гарантия свежести выпечки 100%
            </div>
          </div>
        </div>

        {/* Mobile Nav Overlay Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t-2 border-[#2C1810] bg-[#F5EDE3] p-4 space-y-3 font-heading text-xs font-bold uppercase">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCatalogModalOpen(true);
              }}
              className="w-full bg-[#8B1A2B] text-white p-2.5 text-center flex items-center justify-center gap-2 border-2 border-[#2C1810]"
            >
              <Grid className="w-4 h-4" />
              <span>Открыть полный каталог</span>
            </button>

            <nav className="flex flex-col gap-1 text-[#2C1810]">
              <Link href="/catalog" onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-[#FAF6F0] border border-[#2C1810]">
                Вся витрина
              </Link>
              <Link href="/category/cakes" onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-[#FAF6F0] border border-[#2C1810]">
                Торты
              </Link>
              <Link href="/category/pastries" onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-[#FAF6F0] border border-[#2C1810]">
                Пирожные
              </Link>
              <Link href="/category/cupcakes" onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-[#FAF6F0] border border-[#2C1810]">
                Капкейки
              </Link>
              <Link href="/category/cookies" onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-[#FAF6F0] border border-[#2C1810]">
                Печенье
              </Link>
              <Link href="/favorites" onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-[#FAF6F0] border border-[#2C1810] flex justify-between">
                <span>Избранное</span>
                <span>({favoritesCount})</span>
              </Link>
              <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-[#FAF6F0] border border-[#2C1810]">
                Блог & Рецепты
              </Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-[#FAF6F0] border border-[#2C1810]">
                О нас
              </Link>
              <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-[#2C1810] text-[#FAF6F0] flex justify-between">
                <span>Админ-панель</span>
                <ShieldCheck className="w-4 h-4 text-[#E87461]" />
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* UpGadget-Style Mega Catalog Modal */}
      <MegaCatalogModal
        isOpen={isCatalogModalOpen}
        onClose={() => setIsCatalogModalOpen(false)}
      />
    </>
  );
}
