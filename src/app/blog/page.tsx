'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BLOG_POSTS } from '@/data/blog';

export default function BlogListPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <Breadcrumbs items={[{ label: 'Блог & Советы кондитеров' }]} />

        {/* Title Header */}
        <div className="bg-[#2C1810] text-[#FAF6F0] p-6 border-4 border-[#8B1A2B] shadow-tactile flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="craft-label border border-[#8B1A2B] bg-[#8B1A2B]">
              База знаний & Рецептура
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white mt-1">
              Блог и советы от кондитеров
            </h1>
            <p className="font-body text-xs text-[#F5EDE3]/80 mt-1">
              Статьи о правильном хранении десертов, выборе шоколада и расчете порций на праздники.
            </p>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              className="bg-[#F5EDE3] border-2 border-[#2C1810] flex flex-col justify-between hover-tactile"
            >
              <div>
                <div className="relative aspect-16/9 bg-[#2C1810] border-b-2 border-[#2C1810]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute top-2 left-2">
                    <span className="craft-label border border-[#2C1810]">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-3 text-[11px] font-body text-[#2C1810]/70">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#8B1A2B]" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#8B1A2B]" />
                      {post.readTime}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-heading text-base font-bold uppercase text-[#2C1810] hover:text-[#8B1A2B] block line-clamp-2 leading-tight"
                  >
                    {post.title}
                  </Link>

                  <p className="font-body text-xs text-[#2C1810]/80 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-[#2C1810]/20 mt-3">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-heading font-bold uppercase text-[#8B1A2B] hover:text-[#2C1810]"
                >
                  Читать статью полностью
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
