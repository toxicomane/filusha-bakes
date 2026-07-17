'use client';

import React from 'react';
import Link from 'next/link';
import { Cake, PieChart, Utensils, Cookie, X, ArrowRight, Sparkles, Flame } from 'lucide-react';
import { CATEGORIES, INITIAL_PRODUCTS } from '@/data/products';

interface MegaCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaCatalogModal({ isOpen, onClose }: MegaCatalogModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2C1810]/75 backdrop-blur-xs flex items-start justify-center pt-20 px-4 pb-12">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />

      <div className="relative w-full max-w-5xl bg-[#FAF6F0] border-4 border-[#2C1810] shadow-tactile-lg z-10 p-6 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b-4 border-[#8B1A2B] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#8B1A2B] text-white border-2 border-[#2C1810] flex items-center justify-center font-heading font-black">
              ★
            </div>
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-black uppercase text-[#2C1810]">
                Каталог ремесленной кондитерской
              </h2>
              <p className="font-body text-xs text-[#2C1810]/70">
                Выберите категорию десертов или перейдите ко всем {INITIAL_PRODUCTS.length} позициям
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 border-2 border-[#2C1810] bg-[#F5EDE3] hover:bg-[#8B1A2B] hover:text-white transition-colors"
            aria-label="Закрыть каталог"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => {
            let Icon = Cake;
            if (cat.slug === 'pastries') Icon = PieChart;
            if (cat.slug === 'cupcakes') Icon = Utensils;
            if (cat.slug === 'cookies') Icon = Cookie;

            const subItems = INITIAL_PRODUCTS.filter((p) => p.category === cat.slug);

            return (
              <div
                key={cat.slug}
                className="bg-[#F5EDE3] border-2 border-[#2C1810] p-4 flex flex-col justify-between hover-tactile"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="w-10 h-10 bg-[#8B1A2B] text-white border-2 border-[#2C1810] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="craft-label text-[10px]">
                      {cat.count} видов
                    </span>
                  </div>

                  <div>
                    <Link
                      href={`/category/${cat.slug}`}
                      onClick={onClose}
                      className="font-heading text-base font-black uppercase text-[#2C1810] hover:text-[#8B1A2B] block"
                    >
                      {cat.name}
                    </Link>
                    <p className="font-body text-[11px] text-[#2C1810]/70 mt-1 line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  {/* Sub-items list */}
                  <ul className="space-y-1 pt-2 border-t border-[#2C1810]/20 font-body text-xs">
                    {subItems.map((prod) => (
                      <li key={prod.id}>
                        <Link
                          href={`/product/${prod.slug}`}
                          onClick={onClose}
                          className="text-[#2C1810] hover:text-[#8B1A2B] hover:underline flex items-center justify-between line-clamp-1"
                        >
                          <span className="truncate">{prod.name}</span>
                          <span className="font-price font-bold text-[#8B1A2B] ml-1 text-[11px] shrink-0">
                            {prod.price}₽
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-[#2C1810]/20">
                  <Link
                    href={`/category/${cat.slug}`}
                    onClick={onClose}
                    className="w-full bg-[#2C1810] hover:bg-[#8B1A2B] text-white py-2 text-center font-heading text-[11px] uppercase font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Перейти в раздел</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

        {/* Featured Specials Banner at Bottom of Modal */}
        <div className="bg-[#8B1A2B] text-white p-4 border-2 border-[#2C1810] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Flame className="w-6 h-6 text-[#E87461]" />
            <div>
              <strong className="font-heading uppercase text-xs block">
                Свежая утренняя сменная выпечка
              </strong>
              <span className="font-body text-xs text-[#F5EDE3]/90">
                Закажите до 14:00 для доставки курьером в течение сегодняшнего дня.
              </span>
            </div>
          </div>

          <Link
            href="/catalog"
            onClick={onClose}
            className="bg-[#FAF6F0] text-[#2C1810] hover:bg-[#F5EDE3] px-5 py-2.5 font-heading text-xs uppercase font-extrabold border-2 border-[#2C1810] shadow-tactile-sm shrink-0"
          >
            Смотреть весь каталог ({INITIAL_PRODUCTS.length})
          </Link>
        </div>

      </div>
    </div>
  );
}
