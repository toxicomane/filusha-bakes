'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Search, Filter, Edit, Clock, CheckCircle2, Truck, PartyPopper, ArrowRight, Save } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { useOrders } from '@/context/OrdersContext';
import { OrderStatus } from '@/types';

export default function AdminPage() {
  const { orders, updateOrderStatus } = useOrders();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [editingStatuses, setEditingStatuses] = useState<Record<string, OrderStatus>>({});
  const [savedSuccessMsg, setSavedSuccessMsg] = useState<string | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch =
      order.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const handleStatusSelectChange = (orderNumber: string, status: OrderStatus) => {
    setEditingStatuses((prev) => ({ ...prev, [orderNumber]: status }));
  };

  const handleSaveStatus = (orderNumber: string) => {
    const newStatus = editingStatuses[orderNumber];
    if (newStatus) {
      updateOrderStatus(orderNumber, newStatus);
      setSavedSuccessMsg(`Статус заказа ${orderNumber} обновлен на «${newStatus}»`);
      setTimeout(() => setSavedSuccessMsg(null), 3000);
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'ordered':
        return <span className="px-2 py-0.5 bg-[#8B1A2B] text-white font-heading text-[10px] font-bold uppercase">🟢 Заказ оформлен</span>;
      case 'preparing':
        return <span className="px-2 py-0.5 bg-[#2C1810] text-[#FAF6F0] font-heading text-[10px] font-bold uppercase">⏳ Готовится</span>;
      case 'delivering':
        return <span className="px-2 py-0.5 bg-blue-800 text-white font-heading text-[10px] font-bold uppercase">🚗 В доставке</span>;
      case 'delivered':
        return <span className="px-2 py-0.5 bg-emerald-800 text-white font-heading text-[10px] font-bold uppercase">🎉 Доставлен</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <Breadcrumbs items={[{ label: 'Панель администратора' }]} />

        {/* Title Header */}
        <div className="bg-[#2C1810] text-[#FAF6F0] p-6 border-4 border-[#8B1A2B] shadow-tactile flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="craft-label border border-[#FAF6F0] bg-[#8B1A2B]">Кондитерский цех</span>
              <ShieldCheck className="w-5 h-5 text-[#E87461]" />
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white mt-1">
              Администрирование заказов ({orders.length})
            </h1>
          </div>
          <div className="font-body text-xs text-[#F5EDE3]/80 bg-[#1E0F0A] p-3 border border-[#8B1A2B]">
            Все изменения статусов сохраняются в локальном хранилище бразуера (localStorage).
          </div>
        </div>

        {savedSuccessMsg && (
          <div className="p-3 bg-emerald-800 text-white border-2 border-[#2C1810] font-heading text-xs font-bold uppercase shadow-tactile-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>{savedSuccessMsg}</span>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="bg-[#F5EDE3] border-2 border-[#2C1810] p-4 shadow-tactile-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            {/* Search Input */}
            <div className="flex-1 flex border-2 border-[#2C1810] bg-[#FAF6F0]">
              <div className="p-2.5 text-[#8B1A2B]">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Поиск по номеру (FILUSHA...), имени клиента или телефону..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pr-3 bg-transparent font-body text-xs text-[#2C1810] focus:outline-none"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 items-center">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 font-heading text-xs font-bold uppercase border-2 border-[#2C1810] ${
                  statusFilter === 'all'
                    ? 'bg-[#8B1A2B] text-white'
                    : 'bg-[#FAF6F0] text-[#2C1810]'
                }`}
              >
                Все ({orders.length})
              </button>
              <button
                onClick={() => setStatusFilter('ordered')}
                className={`px-3 py-1.5 font-heading text-xs font-bold uppercase border-2 border-[#2C1810] ${
                  statusFilter === 'ordered'
                    ? 'bg-[#8B1A2B] text-white'
                    : 'bg-[#FAF6F0] text-[#2C1810]'
                }`}
              >
                Оформлен
              </button>
              <button
                onClick={() => setStatusFilter('preparing')}
                className={`px-3 py-1.5 font-heading text-xs font-bold uppercase border-2 border-[#2C1810] ${
                  statusFilter === 'preparing'
                    ? 'bg-[#8B1A2B] text-white'
                    : 'bg-[#FAF6F0] text-[#2C1810]'
                }`}
              >
                Готовится
              </button>
              <button
                onClick={() => setStatusFilter('delivering')}
                className={`px-3 py-1.5 font-heading text-xs font-bold uppercase border-2 border-[#2C1810] ${
                  statusFilter === 'delivering'
                    ? 'bg-[#8B1A2B] text-white'
                    : 'bg-[#FAF6F0] text-[#2C1810]'
                }`}
              >
                В пути
              </button>
              <button
                onClick={() => setStatusFilter('delivered')}
                className={`px-3 py-1.5 font-heading text-xs font-bold uppercase border-2 border-[#2C1810] ${
                  statusFilter === 'delivered'
                    ? 'bg-[#8B1A2B] text-white'
                    : 'bg-[#FAF6F0] text-[#2C1810]'
                }`}
              >
                Доставлен
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-[#F5EDE3] border-4 border-[#2C1810] shadow-tactile overflow-x-auto">
          <table className="w-full text-left font-body text-xs border-collapse">
            <thead>
              <tr className="bg-[#2C1810] text-[#FAF6F0] font-heading text-[11px] uppercase border-b-2 border-[#8B1A2B]">
                <th className="p-3.5">№ Заказа</th>
                <th className="p-3.5">Дата & Время</th>
                <th className="p-3.5">Покупатель</th>
                <th className="p-3.5">Сумма</th>
                <th className="p-3.5">Текущий статус</th>
                <th className="p-3.5">Изменить статус</th>
                <th className="p-3.5 text-right">Действие</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C1810]/20">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#2C1810]/70 font-heading uppercase text-xs">
                    Заказов по заданным критериям не найдено.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const currentSelStatus = editingStatuses[order.number] || order.status;
                  const isModified = editingStatuses[order.number] && editingStatuses[order.number] !== order.status;

                  return (
                    <tr key={order.number} className="hover:bg-[#FAF6F0] transition-colors">
                      <td className="p-3.5 font-heading font-extrabold text-[#8B1A2B]">
                        <Link href={`/admin/order/${order.number}`} className="hover:underline">
                          {order.number}
                        </Link>
                      </td>
                      <td className="p-3.5 text-[#2C1810]/80">
                        {new Date(order.createdAt).toLocaleDateString('ru-RU')} <br />
                        <span className="text-[10px] text-[#2C1810]/60">
                          {new Date(order.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <strong className="font-bold block text-[#2C1810]">{order.customer.name}</strong>
                        <span className="text-[11px] text-[#2C1810]/70">{order.customer.phone}</span>
                      </td>
                      <td className="p-3.5 font-price font-extrabold text-sm text-[#8B1A2B]">
                        {order.total.toLocaleString('ru-RU')} ₽
                      </td>
                      <td className="p-3.5">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          <select
                            value={currentSelStatus}
                            onChange={(e) => handleStatusSelectChange(order.number, e.target.value as OrderStatus)}
                            className="p-1.5 bg-[#FAF6F0] border border-[#2C1810] text-[11px] font-heading uppercase font-bold focus:outline-none"
                          >
                            <option value="ordered">Заказ оформлен</option>
                            <option value="preparing">Готовится</option>
                            <option value="delivering">В доставке</option>
                            <option value="delivered">Доставлен</option>
                          </select>
                          {isModified && (
                            <button
                              onClick={() => handleSaveStatus(order.number)}
                              className="p-1.5 bg-[#8B1A2B] hover:bg-[#D9485B] text-white border border-[#2C1810] transition-colors"
                              title="Сохранить измененный статус"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5 text-right">
                        <Link
                          href={`/admin/order/${order.number}`}
                          className="inline-flex items-center gap-1 bg-[#2C1810] text-[#FAF6F0] px-2.5 py-1 text-[11px] font-heading uppercase font-bold hover:bg-[#8B1A2B] transition-colors"
                        >
                          <Edit className="w-3 h-3" /> Детали
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </main>

      <Footer />
    </div>
  );
}
