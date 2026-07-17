'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, CheckCircle2, ChefHat, Truck, PartyPopper, Clock, MapPin, Phone, User, Calendar, AlertCircle, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { useOrders } from '@/context/OrdersContext';
import { OrderStatus } from '@/types';

interface OrderPageProps {
  params: Promise<{ number: string }>;
}

export default function OrderTrackingPage({ params }: OrderPageProps) {
  const resolvedParams = use(params);
  const rawNumber = resolvedParams.number;
  const decodedNumber = decodeURIComponent(rawNumber);

  const [searchQuery, setSearchQuery] = useState(decodedNumber);
  const { getOrder } = useOrders();

  const currentOrder = getOrder(decodedNumber);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/order/${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  // Helper for 4 steps progress step ranking
  const getStepStatus = (stepName: OrderStatus, currentStatus?: OrderStatus) => {
    const orderRanks: Record<OrderStatus, number> = {
      ordered: 1,
      preparing: 2,
      delivering: 3,
      delivered: 4,
    };

    if (!currentStatus) return 'upcoming';

    const currentRank = orderRanks[currentStatus] || 1;
    const stepRank = orderRanks[stepName];

    if (stepRank < currentRank) return 'completed';
    if (stepRank === currentRank) return 'current';
    return 'upcoming';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        <Breadcrumbs items={[{ label: 'Отслеживание заказа' }, { label: decodedNumber }]} />

        {/* Top Tracking Search Form */}
        <div className="bg-[#2C1810] text-[#FAF6F0] p-6 border-4 border-[#8B1A2B] shadow-tactile space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <span className="craft-label border border-[#8B1A2B] bg-[#8B1A2B]">Онлайн Трекинг</span>
              <h1 className="font-heading text-xl sm:text-2xl font-black uppercase text-white mt-1">
                Проверка статуса заказа по номеру
              </h1>
            </div>
            <span className="font-body text-xs text-[#F5EDE3]/80">
              Без регистрации и ввода паролей
            </span>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="flex-1 flex border-2 border-[#FAF6F0] bg-[#FAF6F0]">
              <div className="p-2.5 text-[#8B1A2B]">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Введите ваш номер заказа, напр. FILUSHA-20260316-001"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pr-3 bg-transparent font-heading text-xs uppercase font-bold text-[#2C1810] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-[#8B1A2B] hover:bg-[#D9485B] text-white px-6 font-heading text-xs font-bold uppercase border-2 border-[#FAF6F0] shadow-tactile-sm shrink-0"
            >
              Найти заказ
            </button>
          </form>
        </div>

        {!currentOrder ? (
          /* Order Not Found State */
          <div className="bg-[#F5EDE3] border-4 border-[#2C1810] p-10 text-center space-y-4 shadow-tactile">
            <div className="w-16 h-16 mx-auto bg-[#8B1A2B] text-white flex items-center justify-center border-2 border-[#2C1810]">
              <AlertCircle className="w-8 h-8 text-[#FAF6F0]" />
            </div>
            <h2 className="font-heading text-xl font-black uppercase text-[#2C1810]">
              Заказ «{decodedNumber}» не найден
            </h2>
            <p className="font-body text-xs text-[#2C1810]/80 max-w-md mx-auto leading-relaxed">
              Проверьте правильность введённого номера. Формат должен соответствовать вида <code className="bg-[#FAF6F0] px-1 font-bold text-[#8B1A2B]">FILUSHA-YYYYMMDD-XXX</code>.
            </p>
            <div className="pt-2">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 bg-[#8B1A2B] text-white px-5 py-2.5 text-xs font-heading uppercase font-bold border-2 border-[#2C1810]"
              >
                <ArrowLeft className="w-4 h-4" /> Перейти к каталогу
              </Link>
            </div>
          </div>
        ) : (
          /* Order Details & Progress Timeline */
          <div className="space-y-8">
            
            {/* 4-Step Status Progress Bar Required by Spec */}
            <div className="bg-[#F5EDE3] border-4 border-[#2C1810] p-6 shadow-tactile space-y-6">
              <div className="flex justify-between items-center border-b-2 border-[#2C1810] pb-3">
                <div>
                  <span className="text-[10px] uppercase font-heading font-bold text-[#8B1A2B]">
                    Текущий статус
                  </span>
                  <div className="font-heading text-xl font-black uppercase text-[#2C1810]">
                    {currentOrder.status === 'ordered' && '🟢 1. Заказ оформлен'}
                    {currentOrder.status === 'preparing' && '⏳ 2. Готовится в кондитерском цехе'}
                    {currentOrder.status === 'delivering' && '🚗 3. Передан в доставку курьеру'}
                    {currentOrder.status === 'delivered' && '🎉 4. Заказ успешно доставлен'}
                  </div>
                </div>
                <div className="text-right font-body text-xs text-[#2C1810]/70">
                  Обновлено: {new Date(currentOrder.updatedAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {/* 4 Steps Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Step 1: Ordered */}
                {(() => {
                  const state = getStepStatus('ordered', currentOrder.status);
                  return (
                    <div
                      className={`p-4 border-2 border-[#2C1810] space-y-2 ${
                        state === 'current'
                          ? 'bg-[#8B1A2B] text-white shadow-tactile-sm'
                          : state === 'completed'
                          ? 'bg-emerald-800 text-white'
                          : 'bg-[#FAF6F0] text-[#2C1810] opacity-60'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-heading text-[10px] uppercase font-bold px-1.5 py-0.5 bg-[#2C1810] text-white">
                          Шаг 1
                        </span>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="font-heading text-xs font-extrabold uppercase">
                        ✅ Заказ оформлен
                      </div>
                      <p className="font-body text-[11px] opacity-90">
                        Оплата зафиксирована, квитанция сформирована.
                      </p>
                    </div>
                  );
                })()}

                {/* Step 2: Preparing */}
                {(() => {
                  const state = getStepStatus('preparing', currentOrder.status);
                  return (
                    <div
                      className={`p-4 border-2 border-[#2C1810] space-y-2 ${
                        state === 'current'
                          ? 'bg-[#8B1A2B] text-white shadow-tactile-sm'
                          : state === 'completed'
                          ? 'bg-emerald-800 text-white'
                          : 'bg-[#FAF6F0] text-[#2C1810] opacity-60'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-heading text-[10px] uppercase font-bold px-1.5 py-0.5 bg-[#2C1810] text-white">
                          Шаг 2
                        </span>
                        <ChefHat className="w-4 h-4" />
                      </div>
                      <div className="font-heading text-xs font-extrabold uppercase">
                        ⏳ Готовится
                      </div>
                      <p className="font-body text-[11px] opacity-90">
                        Выпечка бисквитов, сборка и охлаждение.
                      </p>
                    </div>
                  );
                })()}

                {/* Step 3: Delivering */}
                {(() => {
                  const state = getStepStatus('delivering', currentOrder.status);
                  return (
                    <div
                      className={`p-4 border-2 border-[#2C1810] space-y-2 ${
                        state === 'current'
                          ? 'bg-[#8B1A2B] text-white shadow-tactile-sm'
                          : state === 'completed'
                          ? 'bg-emerald-800 text-white'
                          : 'bg-[#FAF6F0] text-[#2C1810] opacity-60'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-heading text-[10px] uppercase font-bold px-1.5 py-0.5 bg-[#2C1810] text-white">
                          Шаг 3
                        </span>
                        <Truck className="w-4 h-4" />
                      </div>
                      <div className="font-heading text-xs font-extrabold uppercase">
                        🚗 В доставке
                      </div>
                      <p className="font-body text-[11px] opacity-90">
                        Курьер везет заказ по указанному адресу.
                      </p>
                    </div>
                  );
                })()}

                {/* Step 4: Delivered */}
                {(() => {
                  const state = getStepStatus('delivered', currentOrder.status);
                  return (
                    <div
                      className={`p-4 border-2 border-[#2C1810] space-y-2 ${
                        state === 'current' || state === 'completed'
                          ? 'bg-emerald-800 text-white shadow-tactile-sm'
                          : 'bg-[#FAF6F0] text-[#2C1810] opacity-60'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-heading text-[10px] uppercase font-bold px-1.5 py-0.5 bg-[#2C1810] text-white">
                          Шаг 4
                        </span>
                        <PartyPopper className="w-4 h-4" />
                      </div>
                      <div className="font-heading text-xs font-extrabold uppercase">
                        🎉 Доставлен
                      </div>
                      <p className="font-body text-[11px] opacity-90">
                        Десерт вручен покупателю.
                      </p>
                    </div>
                  );
                })()}

              </div>
            </div>

            {/* Order Specification & Summary Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Customer & Delivery Info */}
              <div className="lg:col-span-6 space-y-6">
                
                <div className="bg-[#F5EDE3] border-2 border-[#2C1810] p-5 shadow-tactile-sm space-y-3">
                  <div className="font-heading text-xs font-bold uppercase text-[#8B1A2B] border-b-2 border-[#2C1810] pb-2">
                    Получатель заказа
                  </div>
                  <div className="space-y-2 font-body text-xs text-[#2C1810]">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#8B1A2B]" />
                      <strong>{currentOrder.customer.name}</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#8B1A2B]" />
                      <span>{currentOrder.customer.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F5EDE3] border-2 border-[#2C1810] p-5 shadow-tactile-sm space-y-3">
                  <div className="font-heading text-xs font-bold uppercase text-[#8B1A2B] border-b-2 border-[#2C1810] pb-2">
                    Адрес и интервал доставки
                  </div>
                  <div className="space-y-2 font-body text-xs text-[#2C1810]">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#8B1A2B] shrink-0 mt-0.5" />
                      <span>{currentOrder.delivery.city}, {currentOrder.delivery.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#8B1A2B]" />
                      <span>Дата: <strong>{currentOrder.delivery.date}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#8B1A2B]" />
                      <span>Интервал: <strong>{currentOrder.delivery.timeSlot}</strong></span>
                    </div>
                    {currentOrder.delivery.comment && (
                      <div className="p-2 bg-[#FAF6F0] border border-[#2C1810] text-[11px] mt-2 italic">
                        «{currentOrder.delivery.comment}»
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column: Ordered Items List */}
              <div className="lg:col-span-6 bg-[#F5EDE3] border-4 border-[#2C1810] p-6 shadow-tactile space-y-4">
                <div className="font-heading text-xs font-bold uppercase text-[#8B1A2B] border-b-2 border-[#2C1810] pb-2">
                  Состав заказа ({currentOrder.items.reduce((s, i) => s + i.quantity, 0)} шт)
                </div>

                <div className="space-y-3 border-b border-[#2C1810]/20 pb-4">
                  {currentOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs font-body gap-3 bg-[#FAF6F0] p-2 border border-[#2C1810]">
                      <div className="flex items-center gap-2">
                        <div className="relative w-12 h-12 border border-[#2C1810] shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <strong className="font-heading uppercase text-[11px] block text-[#2C1810] line-clamp-1">
                            {item.name}
                          </strong>
                          <span className="text-[#2C1810]/70 text-[10px]">
                            {item.weight} • {item.price} ₽ × {item.quantity} шт.
                          </span>
                        </div>
                      </div>
                      <span className="font-price font-bold text-sm text-[#8B1A2B] shrink-0">
                        {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calculation */}
                <div className="space-y-2 font-body text-xs">
                  <div className="flex justify-between text-[#2C1810]/80">
                    <span>Подытог:</span>
                    <span className="font-price font-bold">{currentOrder.subtotal.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between text-[#2C1810]/80">
                    <span>Доставка:</span>
                    <span className="font-price font-bold">
                      {currentOrder.deliveryFee === 0 ? 'Бесплатно' : `${currentOrder.deliveryFee} ₽`}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-[#2C1810]/20">
                    <span className="font-heading text-xs font-black uppercase text-[#2C1810]">
                      Итого оплачено:
                    </span>
                    <span className="font-price font-black text-2xl text-[#8B1A2B]">
                      {currentOrder.total.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
