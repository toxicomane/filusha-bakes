'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Clock, Truck, ArrowRight, Home, Copy, Check, Loader2 } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useOrders } from '@/context/OrdersContext';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || 'FILUSHA-20260316-001';

  const { getOrder } = useOrders();
  const order = getOrder(orderNumber);

  const [copied, setCopied] = React.useState(false);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const customerName = order?.customer.name || 'покупатель';

  return (
    <div className="space-y-8">
      {/* Banner Card */}
      <div className="bg-[#2C1810] text-[#FAF6F0] p-8 border-4 border-[#8B1A2B] shadow-tactile text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-[#8B1A2B] text-white border-2 border-[#FAF6F0] flex items-center justify-center shadow-tactile-sm">
          <CheckCircle2 className="w-10 h-10 text-[#FAF6F0]" />
        </div>

        <div className="space-y-1">
          <span className="craft-label border border-[#FAF6F0] bg-[#8B1A2B] text-white">
            Заказ успешно оплачен и забронирован
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white mt-2">
            Спасибо, {customerName}! Ваш заказ принят.
          </h1>
        </div>

        {/* Big Order Number Callout */}
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 bg-[#FAF6F0] text-[#2C1810] p-4 border-2 border-[#8B1A2B] shadow-tactile-sm max-w-lg mx-auto">
          <span className="font-heading text-xs uppercase font-bold text-[#8B1A2B]">
            Номер заказа:
          </span>
          <span className="font-price font-black text-xl sm:text-2xl text-[#8B1A2B] tracking-wider">
            {orderNumber}
          </span>
          <button
            onClick={handleCopyNumber}
            className="p-1.5 border border-[#2C1810] bg-[#F5EDE3] hover:bg-[#8B1A2B] hover:text-white transition-colors ml-2"
            title="Скопировать номер"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <p className="font-body text-xs text-[#F5EDE3]/90 max-w-md mx-auto leading-relaxed">
          Мы уже отправили подтверждение на вашу почту. Утренний кондитерский цех приступит к сборке десертов.
        </p>
      </div>

      {/* 3-Step Order Status Timeline Required by Spec */}
      <div className="bg-[#F5EDE3] border-4 border-[#2C1810] p-6 shadow-tactile space-y-6">
        <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-[#8B1A2B] border-b-2 border-[#2C1810] pb-2 text-center">
          Текущий статус исполнения
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          
          {/* Step 1: Active/Ordered */}
          <div className="p-4 bg-[#8B1A2B] text-white border-2 border-[#2C1810] shadow-tactile-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-heading text-[10px] font-bold uppercase bg-[#FAF6F0] text-[#8B1A2B] px-2 py-0.5">
                Шаг 1 • Завершено
              </span>
              <span className="w-3 h-3 bg-emerald-400 rounded-full animate-ping"></span>
            </div>
            <div className="flex items-center gap-2 font-heading text-sm font-black uppercase">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span>Заказ оформлен</span>
            </div>
            <p className="font-body text-xs text-[#F5EDE3]/90">
              Оплата подтверждена, состав передан в производство.
            </p>
          </div>

          {/* Step 2: Preparing */}
          <div className="p-4 bg-[#FAF6F0] text-[#2C1810] border-2 border-[#2C1810] opacity-80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-heading text-[10px] font-bold uppercase bg-[#2C1810] text-[#FAF6F0] px-2 py-0.5">
                Шаг 2 • Ожидание
              </span>
              <Clock className="w-4 h-4 text-[#8B1A2B]" />
            </div>
            <div className="flex items-center gap-2 font-heading text-sm font-black uppercase text-[#2C1810]">
              <span>⚪ Готовится</span>
            </div>
            <p className="font-body text-xs text-[#2C1810]/70">
              Выпечка коржей, пропитка конфи и декор перед курьером.
            </p>
          </div>

          {/* Step 3: Delivering */}
          <div className="p-4 bg-[#FAF6F0] text-[#2C1810] border-2 border-[#2C1810] opacity-80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-heading text-[10px] font-bold uppercase bg-[#2C1810] text-[#FAF6F0] px-2 py-0.5">
                Шаг 3 • Ожидание
              </span>
              <Truck className="w-4 h-4 text-[#8B1A2B]" />
            </div>
            <div className="flex items-center gap-2 font-heading text-sm font-black uppercase text-[#2C1810]">
              <span>⚪ В пути</span>
            </div>
            <p className="font-body text-xs text-[#2C1810]/70">
              Передача курьерской службе с сохранением температурного режима.
            </p>
          </div>

        </div>
      </div>

      {/* Action Buttons Required by Spec */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
        <Link
          href={`/order/${encodeURIComponent(orderNumber)}`}
          className="w-full sm:w-auto bg-[#8B1A2B] hover:bg-[#D9485B] text-white px-6 py-3.5 font-heading text-xs uppercase font-bold border-2 border-[#2C1810] shadow-tactile hover-tactile flex items-center justify-center gap-2"
        >
          <span>Отслеживать заказ онлайн</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/"
          className="w-full sm:w-auto bg-[#FAF6F0] hover:bg-[#F5EDE3] text-[#2C1810] px-6 py-3.5 font-heading text-xs uppercase font-bold border-2 border-[#2C1810] shadow-tactile hover-tactile flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4 text-[#8B1A2B]" />
          <span>Вернуться в витрину</span>
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Suspense
          fallback={
            <div className="p-12 text-center font-heading uppercase text-xs text-[#8B1A2B] flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Загрузка данных заказа...</span>
            </div>
          }
        >
          <SuccessContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
