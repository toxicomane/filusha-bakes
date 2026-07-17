'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, Check, AlertCircle, ShoppingCart } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { useCart } from '@/context/CartContext';
import { VALID_PROMO_CODES } from '@/data/products';

export default function CartPage() {
  const { cartWithProducts, updateQuantity, removeFromCart, clearCart, subtotal, totalCount } = useCart();
  
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number; description: string } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) return;

    if (VALID_PROMO_CODES[code]) {
      const match = VALID_PROMO_CODES[code];
      setAppliedPromo({
        code: match.code,
        percent: match.discountPercent,
        description: match.description,
      });
      setPromoCodeInput('');
    } else {
      setPromoError('Неверный промокод. Попробуйте FILUSHA10 или SWEET15');
    }
  };

  const discountAmount = appliedPromo ? Math.round((subtotal * appliedPromo.percent) / 100) : 0;
  const deliveryFee = subtotal >= 5000 || subtotal === 0 ? 0 : 300;
  const totalPayable = Math.max(0, subtotal - discountAmount + deliveryFee);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <Breadcrumbs items={[{ label: 'Корзина десертов' }]} />

        {/* Title Header */}
        <div className="bg-[#2C1810] text-[#FAF6F0] p-6 border-4 border-[#8B1A2B] shadow-tactile flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="craft-label border border-[#8B1A2B] bg-[#8B1A2B]">Состав вашего заказа</span>
            <h1 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white mt-1">
              Ваша корзина ({totalCount} позиций)
            </h1>
          </div>
          {cartWithProducts.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-heading uppercase font-bold text-[#E87461] hover:text-white underline decoration-[#E87461]"
            >
              Очистить всю корзину
            </button>
          )}
        </div>

        {cartWithProducts.length === 0 ? (
          /* Empty State */
          <div className="bg-[#F5EDE3] border-4 border-[#2C1810] p-12 text-center space-y-6 shadow-tactile my-8">
            <div className="w-20 h-20 mx-auto bg-[#8B1A2B] text-white border-2 border-[#2C1810] flex items-center justify-center shadow-tactile-sm">
              <ShoppingCart className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="font-heading text-2xl font-black uppercase text-[#2C1810]">
                Корзина пока пуста
              </h2>
              <p className="font-body text-xs sm:text-sm text-[#2C1810]/80 max-w-md mx-auto leading-relaxed">
                В нашей витрине всегда есть свежие бисквитные торты, франжипановые тарталетки, эклеры и печенье.
              </p>
            </div>
            <div>
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 bg-[#8B1A2B] hover:bg-[#D9485B] text-white px-6 py-3 font-heading text-xs uppercase font-bold border-2 border-[#2C1810] shadow-tactile hover-tactile"
              >
                <span>Перейти в каталог витрины</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Cart Content Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Items Table */}
            <div className="lg:col-span-8 space-y-4">
              <div className="space-y-3">
                {cartWithProducts.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="bg-[#F5EDE3] border-2 border-[#2C1810] p-4 shadow-tactile-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-24 h-24 bg-[#2C1810] border-2 border-[#2C1810] shrink-0 overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="craft-label text-[9px] border border-[#2C1810]">
                          {product.categoryName}
                        </span>
                        <Link
                          href={`/product/${product.slug}`}
                          className="font-heading text-sm font-extrabold uppercase text-[#2C1810] hover:text-[#8B1A2B] block line-clamp-1 leading-snug"
                        >
                          {product.name}
                        </Link>
                        <div className="font-body text-xs text-[#2C1810]/70">
                          {product.weight} {product.servings && `• ${product.servings}`}
                        </div>
                        <div className="font-price font-bold text-xs text-[#8B1A2B]">
                          {product.price.toLocaleString('ru-RU')} ₽ / шт.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-t-0 border-[#2C1810]/20 pt-3 sm:pt-0">
                      {/* Stepper */}
                      <div className="flex items-center border-2 border-[#2C1810] bg-[#FAF6F0]">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1.5 hover:bg-[#8B1A2B] hover:text-white transition-colors text-[#2C1810]"
                          title="Уменьшить"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 font-price font-bold text-sm text-[#2C1810]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1.5 hover:bg-[#8B1A2B] hover:text-white transition-colors text-[#2C1810]"
                          title="Увеличить"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total line item price */}
                      <div className="text-right">
                        <div className="text-[10px] uppercase font-heading text-[#2C1810]/60">Сумма</div>
                        <div className="font-price font-extrabold text-lg text-[#8B1A2B]">
                          {(product.price * quantity).toLocaleString('ru-RU')} ₽
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="p-2 border border-[#2C1810] bg-[#FAF6F0] hover:bg-[#8B1A2B] hover:text-white text-[#8B1A2B] transition-colors"
                        title="Удалить позицию"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Promo Code Box */}
              <div className="bg-[#F5EDE3] border-2 border-[#2C1810] p-4 shadow-tactile-sm space-y-3">
                <div className="font-heading text-xs font-bold uppercase text-[#2C1810] flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#8B1A2B]" />
                  Есть промокод на скидку?
                </div>

                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Введите промокод (например FILUSHA10)"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    className="flex-1 p-2 bg-[#FAF6F0] border-2 border-[#2C1810] font-heading uppercase text-xs focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#2C1810] hover:bg-black text-[#FAF6F0] font-heading text-xs font-bold uppercase px-4 py-2 border-2 border-[#2C1810]"
                  >
                    Применить
                  </button>
                </form>

                {appliedPromo && (
                  <div className="p-2.5 bg-[#FAF6F0] border border-[#8B1A2B] text-xs font-body text-[#8B1A2B] flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Промокод «{appliedPromo.code}» применён ({appliedPromo.percent}% скидки)
                    </span>
                    <button
                      onClick={() => setAppliedPromo(null)}
                      className="text-[10px] uppercase underline text-[#2C1810]"
                    >
                      Отменить
                    </button>
                  </div>
                )}

                {promoError && (
                  <div className="p-2 bg-red-100 border border-red-500 text-xs font-body text-red-700 flex items-center gap-1.5 font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {promoError}
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Calculations & Order Confirmation Link */}
            <div className="lg:col-span-4 bg-[#F5EDE3] border-4 border-[#2C1810] p-6 shadow-tactile space-y-4">
              <h2 className="font-heading text-base font-black uppercase text-[#2C1810] border-b-2 border-[#8B1A2B] pb-2">
                Итоговый расчет
              </h2>

              <div className="space-y-2.5 font-body text-xs border-b border-[#2C1810]/20 pb-4">
                <div className="flex justify-between">
                  <span className="text-[#2C1810]/80">Стоимость десертов:</span>
                  <span className="font-price font-bold text-sm text-[#2C1810]">
                    {subtotal.toLocaleString('ru-RU')} ₽
                  </span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-[#8B1A2B] font-bold">
                    <span>Скидка ({appliedPromo.code}):</span>
                    <span className="font-price font-bold text-sm">
                      -{discountAmount.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-[#2C1810]/80">Доставка курьером:</span>
                  <span className="font-price font-bold text-sm text-[#2C1810]">
                    {deliveryFee === 0 ? 'Бесплатно 🎉' : `${deliveryFee} ₽`}
                  </span>
                </div>

                {subtotal < 5000 && (
                  <div className="text-[11px] text-[#2C1810]/70 border-l-2 border-[#8B1A2B] pl-2 py-0.5">
                    Добавьте товаров ещё на {(5000 - subtotal).toLocaleString('ru-RU')} ₽ для бесплатной доставки!
                  </div>
                )}
              </div>

              <div className="flex justify-between items-baseline pt-1">
                <span className="font-heading text-sm font-black uppercase text-[#2C1810]">
                  К оплате:
                </span>
                <span className="font-price font-black text-3xl text-[#8B1A2B]">
                  {totalPayable.toLocaleString('ru-RU')} ₽
                </span>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-[#8B1A2B] hover:bg-[#D9485B] text-white p-3.5 font-heading text-xs sm:text-sm font-bold uppercase border-2 border-[#2C1810] shadow-tactile-sm flex items-center justify-center gap-2 hover-tactile transition-all"
              >
                <span>Перейти к оформлению</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="text-[11px] font-body text-[#2C1810]/70 text-center pt-2">
                Безопасный тестовый способ оплаты онлайн банковской картой.
              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
