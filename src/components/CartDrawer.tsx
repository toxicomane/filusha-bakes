'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartWithProducts, updateQuantity, removeFromCart, subtotal, totalCount } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2C1810]/70 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF6F0] border-l-4 border-[#2C1810] flex flex-col justify-between shadow-tactile-lg">
          
          {/* Header */}
          <div className="p-4 bg-[#2C1810] text-[#FAF6F0] flex items-center justify-between border-b-2 border-[#8B1A2B]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#E87461]" />
              <h2 className="font-heading text-base uppercase font-bold tracking-wider">
                Корзина ({totalCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 hover:bg-[#8B1A2B] text-white transition-colors border border-[#F5EDE3]"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartWithProducts.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-[#F5EDE3] border-2 border-[#2C1810] flex items-center justify-center text-[#8B1A2B]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="font-heading text-lg font-bold text-[#2C1810]">
                  Корзина пуста
                </div>
                <p className="font-body text-xs text-[#2C1810]/70 max-w-xs mx-auto">
                  Выберите ремесленные десерты в нашем каталоге. Всё выпекается исключительно свежим.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block"
                >
                  <Link
                    href="/catalog"
                    className="inline-flex items-center gap-2 bg-[#8B1A2B] text-white px-4 py-2 text-xs font-heading uppercase font-bold border-2 border-[#2C1810] shadow-tactile-sm hover:bg-[#D9485B]"
                  >
                    Перейти в витрину
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </button>
              </div>
            ) : (
              cartWithProducts.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-3 bg-[#F5EDE3] border-2 border-[#2C1810] flex gap-3 relative shadow-tactile-sm"
                >
                  <div className="relative w-20 h-20 bg-[#2C1810] border border-[#2C1810] shrink-0 overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-heading text-xs font-bold text-[#2C1810] hover:text-[#8B1A2B] line-clamp-2 leading-tight uppercase"
                        >
                          {product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-[#8B1A2B] hover:text-[#2C1810] p-0.5"
                          title="Удалить"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="font-body text-[11px] text-[#2C1810]/70 mt-0.5">
                        {product.weight}
                      </div>
                    </div>

                    <div className="flex justify-between items-end mt-2">
                      {/* Stepper */}
                      <div className="flex items-center border border-[#2C1810] bg-[#FAF6F0]">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1 hover:bg-[#8B1A2B] hover:text-white transition-colors text-[#2C1810]"
                          title="Уменьшить"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-price font-bold text-xs text-[#2C1810]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1 hover:bg-[#8B1A2B] hover:text-white transition-colors text-[#2C1810]"
                          title="Увеличить"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="font-price font-bold text-sm text-[#8B1A2B]">
                        {(product.price * quantity).toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {cartWithProducts.length > 0 && (
            <div className="p-4 bg-[#F5EDE3] border-t-2 border-[#2C1810] space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="font-heading uppercase text-xs font-bold text-[#2C1810]">
                  Предварительный итог:
                </span>
                <span className="font-price text-xl font-bold text-[#8B1A2B]">
                  {subtotal.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              
              <div className="text-[11px] font-body text-[#2C1810]/70 border-l-2 border-[#8B1A2B] pl-2">
                Доставка рассчитывается при оформлении. Доставка курьером по Москве от 300 ₽.
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="text-center py-2.5 px-2 bg-[#FAF6F0] border-2 border-[#2C1810] font-heading text-xs font-bold uppercase text-[#2C1810] hover:bg-[#2C1810] hover:text-white transition-colors shadow-tactile-sm"
                >
                  В корзину
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="text-center py-2.5 px-2 bg-[#8B1A2B] border-2 border-[#2C1810] font-heading text-xs font-bold uppercase text-white hover:bg-[#D9485B] transition-colors shadow-tactile-sm flex items-center justify-center gap-1"
                >
                  <span>Оформить</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
