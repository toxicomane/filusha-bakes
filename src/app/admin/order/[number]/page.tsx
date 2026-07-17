'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ShieldCheck, Save, CheckCircle2, User, Phone, Mail, MapPin, Calendar, Clock, Eye } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { useOrders } from '@/context/OrdersContext';
import { OrderStatus } from '@/types';

interface SingleAdminOrderProps {
  params: Promise<{ number: string }>;
}

export default function SingleAdminOrderPage({ params }: SingleAdminOrderProps) {
  const resolvedParams = use(params);
  const rawNumber = resolvedParams.number;
  const decodedNumber = decodeURIComponent(rawNumber);

  const { getOrder, updateOrderStatus } = useOrders();
  const order = getOrder(decodedNumber);

  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(order?.status || 'ordered');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF6F0]">
        <Header />
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-12 text-center space-y-4">
          <Breadcrumbs items={[{ label: 'Админка', href: '/admin' }, { label: 'Заказ не найден' }]} />
          <h1 className="font-heading text-2xl font-bold uppercase text-[#8B1A2B]">
            Заказ {decodedNumber} не существует
          </h1>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 bg-[#8B1A2B] text-white px-5 py-2.5 text-xs font-heading uppercase font-bold border-2 border-[#2C1810]"
          >
            <ArrowLeft className="w-4 h-4" /> Вернуться в список заказов
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrderStatus(order.number, selectedStatus);
    setSuccessMsg(`Статус заказа ${order.number} успешно изменен на «${selectedStatus}»!`);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Панель админа', href: '/admin' },
            { label: order.number },
          ]}
        />

        {/* Title & Navigation */}
        <div className="bg-[#2C1810] text-[#FAF6F0] p-6 border-4 border-[#8B1A2B] shadow-tactile flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="craft-label border border-[#FAF6F0] bg-[#8B1A2B]">Администрирование</span>
              <ShieldCheck className="w-5 h-5 text-[#E87461]" />
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white mt-1">
              Заказ {order.number}
            </h1>
            <div className="font-body text-xs text-[#F5EDE3]/80 mt-1">
              Оформлен: {new Date(order.createdAt).toLocaleString('ru-RU')}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/order/${encodeURIComponent(order.number)}`}
              target="_blank"
              className="bg-[#F5EDE3] hover:bg-white text-[#2C1810] font-heading text-xs uppercase font-bold px-4 py-2 border-2 border-[#FAF6F0] flex items-center gap-1.5"
            >
              <Eye className="w-4 h-4 text-[#8B1A2B]" />
              Публичный трекинг
            </Link>
            <Link
              href="/admin"
              className="bg-[#8B1A2B] hover:bg-[#D9485B] text-white font-heading text-xs uppercase font-bold px-4 py-2 border-2 border-[#FAF6F0] flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Все заказы
            </Link>
          </div>
        </div>

        {successMsg && (
          <div className="p-4 bg-emerald-800 text-white border-2 border-[#2C1810] font-heading text-xs font-bold uppercase shadow-tactile-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Status Editing Panel */}
        <div className="bg-[#F5EDE3] border-4 border-[#2C1810] p-6 shadow-tactile space-y-4">
          <h2 className="font-heading text-sm font-black uppercase text-[#2C1810] border-b-2 border-[#8B1A2B] pb-2">
            Управление статусом заказа
          </h2>

          <form onSubmit={handleUpdate} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="flex-1">
              <label className="block font-heading text-[11px] uppercase text-[#2C1810] font-bold mb-1">
                Выберите новый статус заказа:
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
                className="w-full p-2.5 bg-[#FAF6F0] border-2 border-[#2C1810] font-heading text-xs uppercase font-bold text-[#2C1810] focus:outline-none"
              >
                <option value="ordered">🟢 1. Заказ оформлен (ordered)</option>
                <option value="preparing">⏳ 2. Готовится в цехе (preparing)</option>
                <option value="delivering">🚗 3. Передан в доставку (delivering)</option>
                <option value="delivered">🎉 4. Заказ доставлен (delivered)</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-[#8B1A2B] hover:bg-[#D9485B] text-white px-6 py-3 font-heading text-xs font-bold uppercase border-2 border-[#2C1810] shadow-tactile-sm flex items-center justify-center gap-2 self-end hover-tactile"
            >
              <Save className="w-4 h-4" />
              <span>Обновить статус</span>
            </button>
          </form>
        </div>

        {/* Order Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Customer & Address */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-[#F5EDE3] border-2 border-[#2C1810] p-5 shadow-tactile-sm space-y-3">
              <div className="font-heading text-xs font-bold uppercase text-[#8B1A2B] border-b-2 border-[#2C1810] pb-2">
                Данные клиента
              </div>
              <div className="space-y-2 font-body text-xs text-[#2C1810]">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#8B1A2B]" />
                  <strong>ФИО: {order.customer.name}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#8B1A2B]" />
                  <span>Телефон: <strong>{order.customer.phone}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#8B1A2B]" />
                  <span>Email: {order.customer.email}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F5EDE3] border-2 border-[#2C1810] p-5 shadow-tactile-sm space-y-3">
              <div className="font-heading text-xs font-bold uppercase text-[#8B1A2B] border-b-2 border-[#2C1810] pb-2">
                Доставка и комментарии
              </div>
              <div className="space-y-2 font-body text-xs text-[#2C1810]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#8B1A2B] shrink-0 mt-0.5" />
                  <span>Адрес: {order.delivery.city}, {order.delivery.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#8B1A2B]" />
                  <span>Дата: <strong>{order.delivery.date}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#8B1A2B]" />
                  <span>Время: <strong>{order.delivery.timeSlot}</strong></span>
                </div>
                {order.delivery.comment && (
                  <div className="p-3 bg-[#FAF6F0] border border-[#2C1810] text-xs mt-2">
                    <strong className="block font-heading text-[10px] uppercase text-[#8B1A2B]">Комментарий к заказу:</strong>
                    «{order.delivery.comment}»
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Items Breakdown */}
          <div className="lg:col-span-6 bg-[#F5EDE3] border-4 border-[#2C1810] p-6 shadow-tactile space-y-4">
            <div className="font-heading text-xs font-bold uppercase text-[#8B1A2B] border-b-2 border-[#2C1810] pb-2">
              Содержимое заказа ({order.items.length} позиций)
            </div>

            <div className="space-y-3 border-b border-[#2C1810]/20 pb-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs font-body gap-3 bg-[#FAF6F0] p-2.5 border border-[#2C1810]">
                  <div className="flex items-center gap-3">
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
                      <strong className="font-heading uppercase text-xs block text-[#2C1810]">
                        {item.name}
                      </strong>
                      <span className="text-[#2C1810]/70 text-[11px]">
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

            <div className="space-y-2 font-body text-xs">
              <div className="flex justify-between">
                <span>Товары:</span>
                <span className="font-price font-bold">{order.subtotal.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка:</span>
                <span className="font-price font-bold">
                  {order.deliveryFee === 0 ? 'Бесплатно' : `${order.deliveryFee} ₽`}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-[#2C1810]/20 font-heading">
                <span className="text-xs font-black uppercase text-[#2C1810]">Итого оплачено:</span>
                <span className="font-price font-black text-2xl text-[#8B1A2B]">{order.total.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
