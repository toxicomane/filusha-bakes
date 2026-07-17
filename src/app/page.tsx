'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Cake,
  PieChart,
  Utensils,
  Cookie,
  ArrowRight,
  Star,
  Send,
  Check,
  CheckCircle2,
  Clock,
  Sparkles,
  Flame,
  MessageSquare,
  Award,
  Users,
  ShoppingBag,
  BookOpen
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { INITIAL_PRODUCTS, CATEGORIES, SAMPLE_REVIEWS } from '@/data/products';
import { BLOG_POSTS } from '@/data/blog';
import { useOrders } from '@/context/OrdersContext';

export default function HomePage() {
  const { addOrder, generateOrderNumber } = useOrders();

  // Featured / Popular products
  const featuredProducts = INITIAL_PRODUCTS.filter((p) => p.featured || p.inStock).slice(0, 8);

  // FPV-style Spotlight Category ("Все для праздника / Торты & Муссы")
  const spotlightCategory = CATEGORIES[0]; // Торты
  const spotlightProducts = INITIAL_PRODUCTS.filter((p) => p.category === spotlightCategory.slug).slice(0, 3);

  // Quick Order Form State
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickProduct, setQuickProduct] = useState(INITIAL_PRODUCTS[0].id);
  const [quickComment, setQuickComment] = useState('');
  const [quickSuccess, setQuickSuccess] = useState<string | null>(null);

  const handleQuickOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName.trim() || !quickPhone.trim()) return;

    const selectedProd = INITIAL_PRODUCTS.find((p) => p.id === quickProduct) || INITIAL_PRODUCTS[0];
    const orderNum = generateOrderNumber();

    const newOrder = {
      number: orderNum,
      status: 'ordered' as const,
      subtotal: selectedProd.price,
      discount: 0,
      deliveryFee: 300,
      total: selectedProd.price + 300,
      customer: {
        name: quickName.trim(),
        phone: quickPhone.trim(),
        email: 'quick-order@filusha.ru',
      },
      delivery: {
        city: 'Москва',
        address: 'Уточняется менеджером по телефону',
        date: new Date().toISOString().split('T')[0],
        timeSlot: '12:00 - 15:00',
        comment: quickComment.trim() || 'Быстрый заказ с главной страницы',
      },
      paymentMethod: 'mock_card' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: [
        {
          productId: selectedProd.id,
          name: selectedProd.name,
          quantity: 1,
          price: selectedProd.price,
          weight: selectedProd.weight,
          image: selectedProd.images[0],
        },
      ],
    };

    addOrder(newOrder);
    setQuickSuccess(orderNum);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-14">
        
        {/* 1. HERO PROMO BANNER (UpGadget style: headline + proof badges + CTA) */}
        <section className="bg-[#8B1A2B] text-[#FAF6F0] border-4 border-[#2C1810] p-6 sm:p-10 shadow-tactile relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="craft-label border border-[#FAF6F0] bg-[#2C1810] text-[#E87461]">
                  Гарантия свежести выпечки 100%
                </span>
                <span className="bg-[#FAF6F0] text-[#2C1810] font-heading text-[11px] uppercase px-2 py-0.5 font-bold">
                  Москва, ул. Покровка 18/2
                </span>
              </div>

              <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight sm:leading-none text-white">
                Десерты и кондитерские изделия <br />
                <span className="text-[#E87461]">по честным ценам</span>
              </h1>

              <p className="font-body text-xs sm:text-sm text-[#F5EDE3]/90 max-w-2xl leading-relaxed">
                Оригинальные десерты на натуральном сливочном масле 82.5%, сливках 33% и бельгийском шоколаде Callebaut. Быстрая доставка курьером по Москве день-в-день.
              </p>

              {/* Action Button & Trust Counter Pills (UpGadget style) */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  href="/catalog"
                  className="bg-[#2C1810] hover:bg-black text-[#FAF6F0] font-heading text-xs sm:text-sm uppercase font-extrabold px-6 py-3.5 border-2 border-[#FAF6F0] shadow-tactile-sm flex items-center gap-2 transition-transform hover:-translate-y-0.5 shrink-0"
                >
                  <span>Смотреть каталог</span>
                  <ArrowRight className="w-4 h-4 text-[#E87461]" />
                </Link>

                {/* Proof Pills */}
                <div className="flex flex-wrap items-center gap-3 font-heading text-xs uppercase font-bold text-white bg-[#2C1810]/40 p-2 border border-[#FAF6F0]/30">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-[#E87461]" /> 500+ клиентов
                  </span>
                  <span className="text-[#E87461]">|</span>
                  <span className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-[#E87461]" /> 1 000+ заказов
                  </span>
                  <span className="text-[#E87461]">|</span>
                  <span className="flex items-center gap-1 text-[#E87461]">
                    ★5 на Яндекс Картах
                  </span>
                </div>
              </div>

            </div>

            {/* Right Quick Order Ticket */}
            <div className="lg:col-span-4 bg-[#F5EDE3] text-[#2C1810] border-2 border-[#2C1810] p-5 space-y-3 shadow-tactile-sm">
              <div className="font-heading text-xs font-bold uppercase text-[#8B1A2B] border-b-2 border-[#8B1A2B] pb-1 flex items-center justify-between">
                <span>Бронирование на сегодня</span>
                <Flame className="w-4 h-4 text-[#8B1A2B]" />
              </div>
              <ul className="space-y-2 text-xs font-body">
                <li className="flex items-start gap-2">
                  <span className="text-[#8B1A2B] font-bold">1.</span>
                  <span><strong>Без пальмового масла:</strong> Только сливочное масло ГОСТ 82.5%.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8B1A2B] font-bold">2.</span>
                  <span><strong>Утренняя сменная выпечка:</strong> Всё готовится с 07:00 ежедневно.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8B1A2B] font-bold">3.</span>
                  <span><strong>Онлайн-трекинг:</strong> Проверка готовых заказов по номеру.</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* 2. CATEGORIES BLOCK ("Категории — Найдите нужный десерт") */}
        <section className="space-y-6">
          <div className="border-b-4 border-[#2C1810] pb-2 flex justify-between items-end">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase text-[#2C1810]">
                Категории
              </h2>
              <p className="font-body text-xs text-[#2C1810]/70 mt-0.5">
                Найдите нужный десерт в основных разделах
              </p>
            </div>
            <Link
              href="/catalog"
              className="font-heading text-xs uppercase font-bold text-[#8B1A2B] hover:underline flex items-center gap-1"
            >
              Весь каталог ({INITIAL_PRODUCTS.length})
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => {
              let Icon = Cake;
              if (cat.slug === 'pastries') Icon = PieChart;
              if (cat.slug === 'cupcakes') Icon = Utensils;
              if (cat.slug === 'cookies') Icon = Cookie;

              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="bg-[#F5EDE3] border-2 border-[#2C1810] p-5 hover-tactile flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-[#8B1A2B] text-white border-2 border-[#2C1810] flex items-center justify-center shadow-tactile-sm group-hover:bg-[#D9485B] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-black uppercase text-[#2C1810] group-hover:text-[#8B1A2B] transition-colors">
                        {cat.name}
                      </h3>
                      <p className="font-body text-xs text-[#2C1810]/80 mt-1 leading-relaxed line-clamp-2">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#2C1810]/20 flex justify-between items-center text-xs font-heading font-bold text-[#8B1A2B] uppercase">
                    <span>{cat.count} наименований</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 3. SPOTLIGHT FEATURED CATEGORY BLOCK (UpGadget's "Все для FPV" / Spotlight block style) */}
        <section className="bg-[#F5EDE3] border-4 border-[#2C1810] p-6 shadow-tactile space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-[#2C1810] pb-4">
            <div>
              <span className="craft-label border border-[#8B1A2B] bg-[#8B1A2B] text-white">
                Флагманский раздел
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase text-[#2C1810] mt-1">
                Все для праздника & Торты
              </h2>
              <p className="font-body text-xs text-[#2C1810]/80">
                Бисквитные и муссовые торты ручной работы на 6-12 человек.
              </p>
            </div>

            <Link
              href={`/category/${spotlightCategory.slug}`}
              className="bg-[#2C1810] hover:bg-[#8B1A2B] text-white px-4 py-2 text-xs font-heading uppercase font-bold border-2 border-[#2C1810] flex items-center gap-1 transition-colors shrink-0"
            >
              <span>В раздел →</span>
            </Link>
          </div>

          {/* Inline Product Cards Strip (UpGadget style) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {spotlightProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 4. POPULAR PRODUCTS GRID ("Самые популярные товары") */}
        <section className="space-y-6">
          <div className="border-b-4 border-[#8B1A2B] pb-2 flex justify-between items-end">
            <div>
              <span className="text-xs font-heading font-bold text-[#8B1A2B] uppercase tracking-widest block">
                Бестселлеры витрины
              </span>
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl font-black uppercase text-[#2C1810]">
                Самые популярные товары
              </h2>
            </div>
            <Link
              href="/catalog"
              className="font-heading text-xs uppercase font-bold text-[#8B1A2B] hover:text-[#2C1810] flex items-center gap-1 border-2 border-[#8B1A2B] px-3 py-1.5 bg-[#F5EDE3] self-start"
            >
              <span>Смотреть всё</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 5. SUBSCRIBE & FAST ORDER BLOCK ("Будь в курсе лучших цен & Моментальная заявка" - UpGadget style) */}
        <section className="bg-[#2C1810] text-[#FAF6F0] border-4 border-[#8B1A2B] p-6 sm:p-8 shadow-tactile space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-3">
              <span className="craft-label border border-[#8B1A2B] bg-[#8B1A2B]">
                Экспресс-Заявка
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-black uppercase text-white leading-tight">
                Будь в курсе свежей выпечки и индивидуальных заказов
              </h2>
              <p className="font-body text-xs sm:text-sm text-[#F5EDE3]/80 leading-relaxed">
                Оставьте имя и телефон — кондитер свяжется с вами для уточнения декора или брони десертов к точному времени.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#8B1A2B] hover:bg-[#D9485B] text-white px-3 py-2 text-xs font-heading uppercase font-bold flex items-center gap-1.5 border border-[#FAF6F0]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Наш Telegram</span>
                </a>
                <a
                  href="https://wa.me"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#1E0F0A] hover:bg-[#8B1A2B] text-white px-3 py-2 text-xs font-heading uppercase font-bold flex items-center gap-1.5 border border-[#FAF6F0]"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#E87461]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#FAF6F0] text-[#2C1810] border-2 border-[#FAF6F0] p-6 shadow-tactile-sm">
              {quickSuccess ? (
                <div className="p-4 bg-[#F5EDE3] border-2 border-[#8B1A2B] text-center space-y-3">
                  <div className="w-10 h-10 mx-auto bg-[#8B1A2B] text-white flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-base font-black uppercase text-[#8B1A2B]">
                    Заявка № {quickSuccess} отправлена!
                  </h3>
                  <p className="font-body text-xs text-[#2C1810]">
                    Менеджер перезвонит на номер <strong className="font-price">{quickPhone}</strong> в ближайшие минуты.
                  </p>
                  <button
                    onClick={() => setQuickSuccess(null)}
                    className="bg-[#2C1810] text-white px-4 py-2 font-heading text-xs uppercase"
                  >
                    Отправить ещё одну
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuickOrder} className="space-y-3">
                  <div className="font-heading text-xs font-bold uppercase text-[#8B1A2B] border-b-2 border-[#2C1810] pb-2">
                    Форма быстрой связи
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-heading text-[10px] uppercase text-[#2C1810] font-bold mb-1">
                        Ваше имя *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Например, Елена"
                        value={quickName}
                        onChange={(e) => setQuickName(e.target.value)}
                        className="w-full p-2 bg-[#F5EDE3] border border-[#2C1810] font-body text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-heading text-[10px] uppercase text-[#2C1810] font-bold mb-1">
                        Телефон *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+7 (999) 000-00-00"
                        value={quickPhone}
                        onChange={(e) => setQuickPhone(e.target.value)}
                        className="w-full p-2 bg-[#F5EDE3] border border-[#2C1810] font-body text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-heading text-[10px] uppercase text-[#2C1810] font-bold mb-1">
                      Десерт из витрины
                    </label>
                    <select
                      value={quickProduct}
                      onChange={(e) => setQuickProduct(e.target.value)}
                      className="w-full p-2 bg-[#F5EDE3] border border-[#2C1810] font-body text-xs focus:outline-none"
                    >
                      {INITIAL_PRODUCTS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} — {p.price} ₽
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#8B1A2B] hover:bg-[#D9485B] text-white p-2.5 font-heading text-xs font-bold uppercase border-2 border-[#2C1810] shadow-tactile-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Получить консультацию</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

        {/* 6. BLOG & ADVICE ARTICLES SECTION ("Обзоры и советы от кондитеров" - UpGadget style) */}
        <section className="space-y-6">
          <div className="border-b-4 border-[#2C1810] pb-2 flex justify-between items-end">
            <div>
              <span className="text-xs font-heading font-bold text-[#8B1A2B] uppercase tracking-widest block">
                Полезное чтиво
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase text-[#2C1810]">
                Обзоры и советы по десертам
              </h2>
            </div>
            <Link
              href="/blog"
              className="font-heading text-xs uppercase font-bold text-[#8B1A2B] hover:underline flex items-center gap-1"
            >
              Все статьи блога
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="bg-[#F5EDE3] border-2 border-[#2C1810] hover-tactile flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-16/9 bg-[#2C1810] border-b-2 border-[#2C1810] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                    <div className="absolute top-2 left-2">
                      <span className="craft-label text-[9px]">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="font-heading text-sm font-black uppercase text-[#2C1810] group-hover:text-[#8B1A2B] leading-tight line-clamp-2">
                      {post.title}
                    </div>
                    <p className="font-body text-xs text-[#2C1810]/80 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-[#2C1810]/20 mt-2 flex justify-between items-center text-[11px] font-body text-[#2C1810]/60">
                  <span>{post.date}</span>
                  <span className="font-heading font-bold text-[#8B1A2B] uppercase">
                    {post.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 7. CUSTOMER REVIEWS BLOCK ("★ ★ ★ ★ ★ 5 · 61 отзыв" - UpGadget style) */}
        <section className="space-y-6">
          <div className="border-b-4 border-[#8B1A2B] pb-2 flex justify-between items-end">
            <div>
              <div className="font-heading text-sm font-bold text-[#8B1A2B] uppercase tracking-widest">
                Живые отзывы клиентов
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase text-[#2C1810] mt-1">
                Отзывы наших покупателей
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAMPLE_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#F5EDE3] border-2 border-[#2C1810] p-5 shadow-tactile-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-heading text-xs font-bold uppercase text-[#8B1A2B]">
                      {rev.author}
                    </span>
                    <span className="font-body text-[11px] text-[#2C1810]/60">
                      {rev.date}
                    </span>
                  </div>

                  <div className="text-[11px] font-heading font-semibold uppercase text-[#2C1810] border-b border-[#2C1810]/20 pb-1">
                    «{rev.productName}»
                  </div>

                  <p className="font-body text-xs text-[#2C1810]/90 leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[#E87461] pt-2 border-t border-[#2C1810]/20">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-[10px] font-heading font-bold uppercase text-[#2C1810] ml-1">
                    Подтвержденный отзыв
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
