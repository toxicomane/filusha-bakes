'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Clock, Mail, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        <Breadcrumbs items={[{ label: 'О кондитерской' }]} />

        {/* Title Header */}
        <div className="bg-[#2C1810] text-[#FAF6F0] p-8 border-4 border-[#8B1A2B] shadow-tactile space-y-3">
          <span className="craft-label border border-[#FAF6F0] bg-[#8B1A2B]">
            Московский ремесленный цех
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-black uppercase text-white">
            Кондитерская Filusha Bakes
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#F5EDE3]/90 max-w-2xl leading-relaxed">
            Мы не пишем шаблонов про «сделано с душой» и «нежнейшие воздушки». Мы просто открыто показываем технологическую карту, составы и вес каждого ингредиента.
          </p>
        </div>

        {/* Story & Principles Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6 font-body text-xs sm:text-sm text-[#2C1810] leading-relaxed">
            <div className="border-l-4 border-[#8B1A2B] pl-4 space-y-2">
              <h2 className="font-heading text-xl font-black uppercase text-[#2C1810]">
                Ремесленный подход без компромиссов
              </h2>
              <p>
                Кондитерский цех <strong>Filusha Bakes</strong> расположен на Покровке в Москве. Все десерты готовятся вручную небольшими ежедневными партиями. Мы принципиально не используем заготовки месячной заморозки, готовые смеси-улучшители и искусственные ароматизаторы.
              </p>
            </div>

            <div className="p-5 bg-[#F5EDE3] border-2 border-[#2C1810] space-y-3 shadow-tactile-sm">
              <div className="font-heading text-xs font-bold uppercase text-[#8B1A2B]">
                Наши технологические стандарты:
              </div>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8B1A2B] shrink-0 mt-0.5" />
                  <span><strong>Масло 82.5%:</strong> Только натуральное сладкосливочное несоленое масло ГОСТ. Никакого маргарина и растительных спредов.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8B1A2B] shrink-0 mt-0.5" />
                  <span><strong>Шоколад Callebaut:</strong> Используем бельгийский шоколад Barry Callebaut 54% и 70%, а также чистую какао-пасту.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8B1A2B] shrink-0 mt-0.5" />
                  <span><strong>Цельные яйца и сливки:</strong> Отборные яйца С0 и натуральные сливки 33% без стабилизаторов каррагинана.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8B1A2B] shrink-0 mt-0.5" />
                  <span><strong>Без ИИ-клише и градиентов:</strong> Честная реальная фотосъемка десертов без фотошопа и ИИ-генераций.</span>
                </li>
              </ul>
            </div>

            <p>
              Каждое утро в 07:00 шеф-кондитер выпекает коржи, вареную карамель, конфитюры из дикорастущих ягод и заварной крем с семенами Bourbon ванили. Заказы отправляются покупателям в день выпечки.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-4/3 bg-[#2C1810] border-4 border-[#2C1810] shadow-tactile overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/9329433/pexels-photo-9329433.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Процесс приготовления выпечки в кондитерском цехе"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute bottom-2 left-2 bg-[#2C1810] text-[#FAF6F0] text-[10px] font-heading uppercase px-2 py-1">
                Кондитерский цех Filusha Bakes
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-square border-2 border-[#2C1810] overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/21207660/pexels-photo-21207660.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Витрина кондитерской"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="relative aspect-square border-2 border-[#2C1810] overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/34563914/pexels-photo-34563914.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Готовые тарталетки"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>

        </div>

        {/* Contacts & Map Section */}
        <div className="bg-[#F5EDE3] border-4 border-[#2C1810] p-6 sm:p-8 shadow-tactile space-y-6">
          <h2 className="font-heading text-xl sm:text-2xl font-black uppercase text-[#2C1810] border-b-2 border-[#8B1A2B] pb-2">
            Адрес и контакты кондитерской
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-body text-xs">
            
            <div className="p-4 bg-[#FAF6F0] border-2 border-[#2C1810] space-y-2">
              <div className="flex items-center gap-2 font-heading text-xs font-bold uppercase text-[#8B1A2B]">
                <MapPin className="w-4 h-4" /> Самовывоз и производство
              </div>
              <p className="text-[#2C1810]/90">
                г. Москва, ул. Покровка, д. 18/2 <br />
                (Вход со двора через арку, вывеска «Filusha Bakes»)
              </p>
            </div>

            <div className="p-4 bg-[#FAF6F0] border-2 border-[#2C1810] space-y-2">
              <div className="flex items-center gap-2 font-heading text-xs font-bold uppercase text-[#8B1A2B]">
                <Phone className="w-4 h-4" /> Телефон и Мессенджеры
              </div>
              <a href="tel:+79998887766" className="font-price font-bold text-base text-[#2C1810] block hover:text-[#8B1A2B]">
                +7 (999) 888-77-66
              </a>
              <a href="mailto:order@filusha-bakes.ru" className="text-[#8B1A2B] font-semibold hover:underline block">
                order@filusha-bakes.ru
              </a>
            </div>

            <div className="p-4 bg-[#FAF6F0] border-2 border-[#2C1810] space-y-2">
              <div className="flex items-center gap-2 font-heading text-xs font-bold uppercase text-[#8B1A2B]">
                <Clock className="w-4 h-4" /> Часы работы
              </div>
              <p className="text-[#2C1810]/90">
                Выпечка и выгрузка заказов: 07:00 – 12:00 <br />
                Выдача и курьерская служба: 09:00 – 21:00 <br />
                Приём онлайн-заказов: Круглосуточно
              </p>
            </div>

          </div>

          <div className="pt-2 flex justify-center">
            <Link
              href="/catalog"
              className="bg-[#8B1A2B] hover:bg-[#D9485B] text-white px-8 py-3 font-heading text-xs uppercase font-bold border-2 border-[#2C1810] shadow-tactile hover-tactile flex items-center gap-2"
            >
              <span>Выбрать десерты в каталоге</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
