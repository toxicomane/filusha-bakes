'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CreditCard, Truck, Calendar, Clock, CheckCircle2, Loader2, ArrowLeft, ShieldCheck, Lock } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrdersContext';

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  date?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartWithProducts, subtotal, clearCart } = useCart();
  const { addOrder, generateOrderNumber } = useOrders();

  // Form Fields State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Москва');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('12:00 - 15:00');
  const [comment, setComment] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccessAnim, setIsSuccessAnim] = useState(false);

  // Load saved contact info from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('filusha_saved_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.name) setName(parsed.name);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.address) setAddress(parsed.address);
      }
    } catch (e) {
      console.error(e);
    }

    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const deliveryFee = subtotal >= 5000 || subtotal === 0 ? 0 : 300;
  const totalPayable = subtotal + deliveryFee;

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Пожалуйста, укажите имя получателя';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Имя слишком короткое';
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!phone.trim()) {
      newErrors.phone = 'Укажите телефон для связи с курьером';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Введитe полный номер телефона (мин. 10 цифр)';
    }

    if (!email.trim()) {
      newErrors.email = 'Укажите Email для отправки чека';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Некорректный формат адреса Email';
    }

    if (!address.trim()) {
      newErrors.address = 'Укажите адрес доставки (улица, дом, квартира)';
    }

    if (!date) {
      newErrors.date = 'Выберите дату доставки';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);

    // Save contacts to localStorage for convenience next time
    try {
      localStorage.setItem(
        'filusha_saved_user',
        JSON.stringify({ name, phone, email, address })
      );
    } catch (e) {
      console.error(e);
    }

    const orderNumber = generateOrderNumber();

    const orderItems = cartWithProducts.map(({ product, quantity }) => ({
      productId: product.id,
      name: product.name,
      quantity,
      price: product.price,
      weight: product.weight,
      image: product.images[0],
    }));

    const newOrder = {
      number: orderNumber,
      status: 'ordered' as const,
      subtotal,
      discount: 0,
      deliveryFee,
      total: totalPayable,
      customer: {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
      },
      delivery: {
        city,
        address: address.trim(),
        date,
        timeSlot,
        comment: comment.trim() || undefined,
      },
      paymentMethod: 'mock_card' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: orderItems,
    };

    // Simulate mock card processing latency
    setTimeout(() => {
      addOrder(newOrder);
      setIsProcessing(false);
      setIsSuccessAnim(true);

      // Brief tick delay then redirect to success page
      setTimeout(() => {
        clearCart();
        router.push(`/checkout/success?order=${encodeURIComponent(orderNumber)}`);
      }, 1200);
    }, 1800);
  };

  if (cartWithProducts.length === 0 && !isProcessing && !isSuccessAnim) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF6F0]">
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-16 text-center space-y-4">
          <Breadcrumbs items={[{ label: 'Оформление заказа' }]} />
          <h1 className="font-heading text-2xl font-bold uppercase text-[#8B1A2B]">
            Ваша корзина пуста
          </h1>
          <p className="font-body text-xs text-[#2C1810]">
            Для оформления заказа сначала добавьте товары из нашего каталога.
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 bg-[#8B1A2B] text-white px-5 py-2.5 text-xs font-heading uppercase font-bold border-2 border-[#2C1810]"
          >
            <ArrowLeft className="w-4 h-4" /> Перейти в каталог
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Корзина', href: '/cart' },
            { label: 'Оформление заказа' },
          ]}
        />

        <div className="bg-[#2C1810] text-[#FAF6F0] p-6 border-4 border-[#8B1A2B] shadow-tactile flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="craft-label border border-[#8B1A2B] bg-[#8B1A2B]">Безопасный Mock-Заказ</span>
            <h1 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white mt-1">
              Оформление заказа
            </h1>
          </div>
          <div className="flex items-center gap-2 font-body text-xs text-[#F5EDE3]/80">
            <Lock className="w-4 h-4 text-[#E87461]" />
            <span>SSL Защищённое соединение</span>
          </div>
        </div>

        <form onSubmit={handleSubmitPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Sections */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* SECTION 1: Contacts */}
            <div className="bg-[#F5EDE3] border-2 border-[#2C1810] p-5 shadow-tactile-sm space-y-4">
              <div className="font-heading text-xs font-bold uppercase text-[#8B1A2B] border-b-2 border-[#2C1810] pb-2 flex items-center gap-2">
                <span className="w-5 h-5 bg-[#8B1A2B] text-white rounded-none flex items-center justify-center text-[10px]">1</span>
                Контактные данные получателя
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-heading text-[11px] uppercase text-[#2C1810] font-bold mb-1">
                    ФИО получателя <span className="text-[#8B1A2B]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Например: Анна Смирнова"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    className={`w-full p-2.5 bg-[#FAF6F0] border-2 font-body text-xs focus:outline-none ${
                      errors.name ? 'border-[#8B1A2B]' : 'border-[#2C1810]'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-[11px] font-body text-[#8B1A2B] font-bold mt-1 block">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block font-heading text-[11px] uppercase text-[#2C1810] font-bold mb-1">
                    Телефон для связи <span className="text-[#8B1A2B]">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+7 (999) 000-00-00"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    className={`w-full p-2.5 bg-[#FAF6F0] border-2 font-body text-xs focus:outline-none ${
                      errors.phone ? 'border-[#8B1A2B]' : 'border-[#2C1810]'
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-[11px] font-body text-[#8B1A2B] font-bold mt-1 block">
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block font-heading text-[11px] uppercase text-[#2C1810] font-bold mb-1">
                    Email (для кассового чека) <span className="text-[#8B1A2B]">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="example@mail.ru"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    className={`w-full p-2.5 bg-[#FAF6F0] border-2 font-body text-xs focus:outline-none ${
                      errors.email ? 'border-[#8B1A2B]' : 'border-[#2C1810]'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] font-body text-[#8B1A2B] font-bold mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 2: Delivery Address */}
            <div className="bg-[#F5EDE3] border-2 border-[#2C1810] p-5 shadow-tactile-sm space-y-4">
              <div className="font-heading text-xs font-bold uppercase text-[#8B1A2B] border-b-2 border-[#2C1810] pb-2 flex items-center gap-2">
                <span className="w-5 h-5 bg-[#8B1A2B] text-white rounded-none flex items-center justify-center text-[10px]">2</span>
                Адрес доставки
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-heading text-[11px] uppercase text-[#2C1810] font-bold mb-1">
                    Город
                  </label>
                  <input
                    type="text"
                    disabled
                    value={city}
                    className="w-full p-2.5 bg-[#2C1810]/10 border-2 border-[#2C1810] font-body text-xs font-bold text-[#2C1810]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-heading text-[11px] uppercase text-[#2C1810] font-bold mb-1">
                    Улица, дом, корпус, квартира <span className="text-[#8B1A2B]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="ул. Покровка, д. 12, кв. 34, подъезд 2"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (errors.address) setErrors({ ...errors, address: undefined });
                    }}
                    className={`w-full p-2.5 bg-[#FAF6F0] border-2 font-body text-xs focus:outline-none ${
                      errors.address ? 'border-[#8B1A2B]' : 'border-[#2C1810]'
                    }`}
                  />
                  {errors.address && (
                    <span className="text-[11px] font-body text-[#8B1A2B] font-bold mt-1 block">
                      {errors.address}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 3: Date & Time Slot */}
            <div className="bg-[#F5EDE3] border-2 border-[#2C1810] p-5 shadow-tactile-sm space-y-4">
              <div className="font-heading text-xs font-bold uppercase text-[#8B1A2B] border-b-2 border-[#2C1810] pb-2 flex items-center gap-2">
                <span className="w-5 h-5 bg-[#8B1A2B] text-white rounded-none flex items-center justify-center text-[10px]">3</span>
                Желаемая дата и время доставки
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-heading text-[11px] uppercase text-[#2C1810] font-bold mb-1">
                    Дата курьера <span className="text-[#8B1A2B]">*</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      if (errors.date) setErrors({ ...errors, date: undefined });
                    }}
                    className={`w-full p-2.5 bg-[#FAF6F0] border-2 font-body text-xs focus:outline-none ${
                      errors.date ? 'border-[#8B1A2B]' : 'border-[#2C1810]'
                    }`}
                  />
                  {errors.date && (
                    <span className="text-[11px] font-body text-[#8B1A2B] font-bold mt-1 block">
                      {errors.date}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block font-heading text-[11px] uppercase text-[#2C1810] font-bold mb-1">
                    Интервал времени
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF6F0] border-2 border-[#2C1810] font-body text-xs focus:outline-none"
                  >
                    <option value="09:00 - 12:00">Утро (09:00 - 12:00)</option>
                    <option value="12:00 - 15:00">День (12:00 - 15:00)</option>
                    <option value="15:00 - 18:00">Послеобеденное (15:00 - 18:00)</option>
                    <option value="18:00 - 21:00">Вечер (18:00 - 21:00)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 4: Payment Method Simulation */}
            <div className="bg-[#F5EDE3] border-2 border-[#2C1810] p-5 shadow-tactile-sm space-y-4">
              <div className="font-heading text-xs font-bold uppercase text-[#8B1A2B] border-b-2 border-[#2C1810] pb-2 flex items-center gap-2">
                <span className="w-5 h-5 bg-[#8B1A2B] text-white rounded-none flex items-center justify-center text-[10px]">4</span>
                Способ оплаты
              </div>

              <div className="p-3 bg-[#FAF6F0] border-2 border-[#8B1A2B] flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-[#8B1A2B]" />
                <div>
                  <strong className="font-heading uppercase text-xs text-[#2C1810] block">
                    Банковской картой онлайн (Тестовый Mock)
                  </strong>
                  <span className="font-body text-[11px] text-[#2C1810]/70">
                    Симуляция оплаты. Деньги не списываются, заказ формируется сразу.
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-heading text-[11px] uppercase text-[#2C1810] font-bold mb-1">
                  Комментарий к заказу для курьера или кондитера
                </label>
                <textarea
                  rows={2}
                  placeholder="Домофон, предпочтения по упаковке, поздравительные слова..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF6F0] border-2 border-[#2C1810] font-body text-xs focus:outline-none"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Order Items Summary & Payment Trigger */}
          <div className="lg:col-span-5 bg-[#F5EDE3] border-4 border-[#2C1810] p-6 shadow-tactile space-y-4 sticky top-24">
            <h2 className="font-heading text-base font-black uppercase text-[#2C1810] border-b-2 border-[#8B1A2B] pb-2">
              Ваш заказ
            </h2>

            {/* Selected Items Summary List */}
            <div className="max-h-60 overflow-y-auto space-y-2 border-b border-[#2C1810]/20 pb-3 pr-1">
              {cartWithProducts.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between items-center text-xs font-body gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <div className="relative w-10 h-10 border border-[#2C1810] shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <span className="font-semibold text-[#2C1810] truncate">
                      {product.name} × {quantity}
                    </span>
                  </div>
                  <span className="font-price font-bold text-[#8B1A2B] shrink-0">
                    {(product.price * quantity).toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 font-body text-xs border-b border-[#2C1810]/20 pb-3">
              <div className="flex justify-between">
                <span>Товары ({cartWithProducts.reduce((s, i) => s + i.quantity, 0)} шт):</span>
                <span className="font-price font-bold text-[#2C1810]">{subtotal.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка:</span>
                <span className="font-price font-bold text-[#2C1810]">
                  {deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee} ₽`}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-1">
              <span className="font-heading text-sm font-black uppercase text-[#2C1810]">
                Всего к оплате:
              </span>
              <span className="font-price font-black text-3xl text-[#8B1A2B]">
                {totalPayable.toLocaleString('ru-RU')} ₽
              </span>
            </div>

            {/* Payment Submit Button with Modal Spinners */}
            {isSuccessAnim ? (
              <div className="p-4 bg-[#FAF6F0] border-2 border-[#8B1A2B] text-center space-y-2 text-[#8B1A2B]">
                <CheckCircle2 className="w-8 h-8 mx-auto animate-bounce text-emerald-600" />
                <div className="font-heading text-xs font-black uppercase">
                  Оплата прошла успешно!
                </div>
                <div className="font-body text-[11px] text-[#2C1810]">
                  Формируем квитанцию и создаём трек-номер...
                </div>
              </div>
            ) : (
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#8B1A2B] hover:bg-[#D9485B] disabled:bg-[#2C1810]/50 text-white p-4 font-heading text-xs sm:text-sm font-bold uppercase border-2 border-[#2C1810] shadow-tactile-sm flex items-center justify-center gap-2 transition-colors hover-tactile"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#E87461]" />
                    <span>Обработка платежа...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Оплатить {totalPayable.toLocaleString('ru-RU')} ₽</span>
                  </>
                )}
              </button>
            )}

            <div className="text-[11px] font-body text-[#2C1810]/70 flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#8B1A2B]" />
              <span>Данные карт обрабатываются в защищённом тестовом шлюзе</span>
            </div>

          </div>

        </form>

      </main>

      <Footer />
    </div>
  );
}
