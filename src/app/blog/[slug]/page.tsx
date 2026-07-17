'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, BookOpen, Share2 } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BLOG_POSTS } from '@/data/blog';

interface SinglePostProps {
  params: Promise<{ slug: string }>;
}

export default function SingleBlogPost({ params }: SinglePostProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const post = BLOG_POSTS.find((b) => b.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF6F0]">
        <Header />
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 text-center space-y-4">
          <Breadcrumbs items={[{ label: 'Блог', href: '/blog' }, { label: 'Статья не найдена' }]} />
          <h1 className="font-heading text-2xl font-bold uppercase text-[#8B1A2B]">
            Статья не найдена
          </h1>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#8B1A2B] text-white px-5 py-2.5 text-xs font-heading uppercase font-bold border-2 border-[#2C1810]"
          >
            <ArrowLeft className="w-4 h-4" /> Вернуться в блог
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        <Breadcrumbs
          items={[
            { label: 'Блог', href: '/blog' },
            { label: post.title },
          ]}
        />

        <article className="bg-[#F5EDE3] border-4 border-[#2C1810] p-6 sm:p-8 shadow-tactile space-y-6">
          <div className="space-y-3 border-b-2 border-[#2C1810] pb-4">
            <span className="craft-label border border-[#8B1A2B] bg-[#8B1A2B]">
              {post.category}
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black uppercase text-[#2C1810] leading-snug">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-xs font-body text-[#2C1810]/70 pt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#8B1A2B]" /> {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#8B1A2B]" /> {post.readTime} чтива
              </span>
            </div>
          </div>

          <div className="relative aspect-16/9 bg-[#2C1810] border-2 border-[#2C1810] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>

          <div className="font-body text-xs sm:text-sm text-[#2C1810] leading-relaxed space-y-4 whitespace-pre-line">
            {post.content}
          </div>

          <div className="pt-6 border-t-2 border-[#2C1810] flex justify-between items-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 bg-[#2C1810] text-[#FAF6F0] px-4 py-2 font-heading text-xs uppercase font-bold hover:bg-[#8B1A2B] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#E87461]" /> Все статьи блога
            </Link>

            <Link
              href="/catalog"
              className="bg-[#8B1A2B] text-white px-4 py-2 font-heading text-xs uppercase font-bold border-2 border-[#2C1810]"
            >
              Перейти к витрине десертов
            </Link>
          </div>
        </article>

      </main>

      <Footer />
    </div>
  );
}
