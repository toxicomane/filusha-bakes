'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, MapPin, Phone, Clock, Mail, ArrowRight, CheckCircle2, Send, MessageSquare } from 'lucide-react';

export function Footer() {
  const [trackNumber, setTrackNumber] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackNumber.trim()) {
      window.location.href = `/order/${encodeURIComponent(trackNumber.trim())}`;
    }
  };

  return (
    <footer className="bg-[#2C1810] text-[#FAF6F0] border-t-4 border-[#8B1A2B] mt-16">
      {/* Top Value Strip */}
      <div className="border-b-2 border-[#8B1A2B]/40 bg-[#1E0F0A] py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 font-body text-xs text-[#F5EDE3]/90">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#E87461] shrink-0 mt-0.5" />
            <div>
              <strong className="font-heading uppercase text-white block mb-0.5 text-xs">
                100% честный состав
              </strong>
              Только натуральное сливочное масло 82.5%, сливки 33% и шоколад Callebaut.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#E87461] shrink-0 mt-0.5" />
            <div>
              <strong className="font-heading uppercase text-white block mb-0.5 text-xs">
                Утренняя сменная выпечка
              </strong>
              Заказы выпекаются и собираются ежедневно с 07:00.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#E87461] shrink-0 mt-0.5" />
            <div>
              <strong className="font-heading uppercase text-white block mb-0.5 text-xs">
                Быстрый трекинг заказа
              </strong>
              Проверка этапа выполнения по номеру заказа в 1 клик.
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Social Shortcuts (UpGadget style) */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-black tracking-tight text-[#FAF6F0] uppercase">
                FILUSHA <span className="text-[#E87461]">BAKES</span>
              </span>
            </Link>
            <p className="font-body text-xs leading-relaxed text-[#F5EDE3]/80">
              Интернет-магазин ремесленных десертов. Выгодные цены, свежие натуральные ингредиенты, быстрая доставка по Москве.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-[#8B1A2B] hover:bg-[#D9485B] text-white border border-[#FAF6F0] transition-colors"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-[#1E0F0A] hover:bg-[#8B1A2B] text-white border border-[#FAF6F0] transition-colors"
                title="WhatsApp"
              >
                <MessageSquare className="w-4 h-4 text-[#E87461]" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#E87461] border-b-2 border-[#8B1A2B] pb-1 inline-block">
              Разделы & Информация
            </h3>
            <ul className="space-y-2 font-body text-xs text-[#F5EDE3]/90">
              <li>
                <Link href="/catalog" className="hover:text-[#E87461] transition-colors">
                  Весь каталог десертов
                </Link>
              </li>
              <li>
                <Link href="/category/cakes" className="hover:text-[#E87461] transition-colors">
                  Торты бисквитные и муссовые
                </Link>
              </li>
              <li>
                <Link href="/category/pastries" className="hover:text-[#E87461] transition-colors">
                  Пирожные, тарталетки и эклеры
                </Link>
              </li>
              <li>
                <Link href="/category/cupcakes" className="hover:text-[#E87461] transition-colors">
                  Капкейки и наборы
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#E87461] transition-colors">
                  Блог & Статьи кондитеров
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#E87461] transition-colors">
                  О кондитерском цехе
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts & Hours (UpGadget style) */}
          <div className="space-y-3">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#E87461] border-b-2 border-[#8B1A2B] pb-1 inline-block">
              Контакты
            </h3>
            <ul className="space-y-2.5 font-body text-xs text-[#F5EDE3]/90">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E87461] shrink-0 mt-0.5" />
                <span>г. Москва, ул. Покровка, д. 18/2</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E87461] shrink-0" />
                <a href="tel:+79998887766" className="hover:text-[#E87461] font-price text-sm font-bold">
                  +7 (999) 888-77-66
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E87461] shrink-0" />
                <a href="mailto:order@filusha-bakes.ru" className="hover:text-[#E87461]">
                  order@filusha-bakes.ru
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#E87461] shrink-0 mt-0.5" />
                <span>Ежедневно 08:00 – 22:00</span>
              </li>
            </ul>
          </div>

          {/* Quick Order Track & Admin Link */}
          <div className="space-y-4">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#E87461] border-b-2 border-[#8B1A2B] pb-1 inline-block">
              Отследить заказ
            </h3>
            <form onSubmit={handleTrackSubmit} className="space-y-2">
              <div className="flex border-2 border-[#FAF6F0] bg-[#FAF6F0]">
                <input
                  type="text"
                  placeholder="Номер заказа (FILUSHA...)"
                  value={trackNumber}
                  onChange={(e) => setTrackNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-body text-[#2C1810] focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#8B1A2B] hover:bg-[#D9485B] text-white px-3 font-heading text-xs font-bold uppercase transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="pt-2 border-t border-[#8B1A2B]/50 flex justify-between items-center text-xs font-body">
              <Link href="/admin" className="inline-flex items-center gap-1.5 text-[#E87461] hover:text-white font-heading uppercase text-[11px] font-bold">
                <ShieldCheck className="w-4 h-4" />
                Панель управления
              </Link>
            </div>
          </div>

        </div>

        {/* UpGadget-Style Footer Legal Disclaimer & Payment Badges */}
        <div className="mt-12 pt-6 border-t border-[#8B1A2B]/40 space-y-4 text-xs font-body text-[#F5EDE3]/70">
          <p>
            Информация на сайте не является публичной офертой (ст. 437 ГК РФ). Точную стоимость и наличие уточняйте у менеджеров кондитерской.
          </p>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
            <div>
              © 2026 Filusha Bakes. Все права защищены.
            </div>

            {/* Payment Systems Badges (UpGadget style) */}
            <div className="flex items-center gap-3 font-heading text-[10px] font-bold uppercase text-[#FAF6F0]/80">
              <span className="bg-[#FAF6F0] text-[#2C1810] px-2 py-0.5 border border-[#2C1810]">VISA</span>
              <span className="bg-[#FAF6F0] text-[#2C1810] px-2 py-0.5 border border-[#2C1810]">МИР</span>
              <span className="bg-[#8B1A2B] text-white px-2 py-0.5 border border-[#FAF6F0]">СБП</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
