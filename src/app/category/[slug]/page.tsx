'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Cake, PieChart, Utensils, Cookie } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { INITIAL_PRODUCTS, CATEGORIES } from '@/data/products';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF6F0]">
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-12 text-center space-y-4">
          <Breadcrumbs items={[{ label: 'Категория не найдена' }]} />
          <h1 className="font-heading text-2xl font-bold uppercase text-[#8B1A2B]">
            Категория «{slug}» не существует
          </h1>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 bg-[#8B1A2B] text-white px-4 py-2 text-xs font-heading uppercase font-bold border-2 border-[#2C1810]"
          >
            <ArrowLeft className="w-4 h-4" /> Вернуться в весь каталог
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryProducts = INITIAL_PRODUCTS.filter((p) => p.category === slug);

  let IconComp = Cake;
  if (slug === 'pastries') IconComp = PieChart;
  if (slug === 'cupcakes') IconComp = Utensils;
  if (slug === 'cookies') IconComp = Cookie;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Каталог', href: '/catalog' },
            { label: category.name },
          ]}
        />

        {/* Category Header Banner */}
        <div className="bg-[#8B1A2B] text-[#FAF6F0] p-6 border-4 border-[#2C1810] shadow-tactile flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="craft-label border border-[#FAF6F0] bg-[#2C1810]">
                Раздел
              </span>
              <span className="font-body text-xs font-bold uppercase text-[#F5EDE3]">
                {categoryProducts.length} наименований
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-black uppercase text-white flex items-center gap-3">
              <IconComp className="w-8 h-8 text-[#E87461]" />
              {category.name}
            </h1>
            <p className="font-body text-xs text-[#F5EDE3]/90 max-w-xl">
              {category.description}
            </p>
          </div>

          <Link
            href="/catalog"
            className="bg-[#2C1810] hover:bg-black text-white px-4 py-2.5 font-heading text-xs font-bold uppercase border-2 border-[#FAF6F0] shadow-tactile-sm shrink-0 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4 text-[#E87461]" />
            Все категории
          </Link>
        </div>

        {/* Category Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
