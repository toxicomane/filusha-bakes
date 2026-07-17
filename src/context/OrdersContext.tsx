'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, OrderStatus } from '@/types';

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderNumber: string, status: OrderStatus) => void;
  getOrder: (orderNumber: string) => Order | undefined;
  generateOrderNumber: () => string;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'filusha_orders';

const SAMPLE_ORDERS: Order[] = [
  {
    number: 'FILUSHA-20260316-001',
    status: 'preparing',
    subtotal: 3200,
    discount: 0,
    deliveryFee: 300,
    total: 3500,
    customer: {
      name: 'Екатерина Смирнова',
      phone: '+7 (916) 555-01-23',
      email: 'kate.smirnova@example.com',
    },
    delivery: {
      city: 'Москва',
      address: 'ул. Тверская, д. 12, кв. 45',
      date: '2026-03-16',
      timeSlot: '12:00 - 15:00',
      comment: 'Домофон 45В, курьеру звонить на мобильный.',
    },
    paymentMethod: 'mock_card',
    createdAt: '2026-03-16T10:15:00.000Z',
    updatedAt: '2026-03-16T10:45:00.000Z',
    items: [
      {
        productId: 'p-1',
        name: 'Шоколадный торт с вишнёвым конфи',
        quantity: 1,
        price: 3200,
        weight: '1.2 кг',
        image: 'https://images.pexels.com/photos/12081754/pexels-photo-12081754.jpeg?auto=compress&cs=tinysrgb&w=800',
      },
    ],
  },
  {
    number: 'FILUSHA-20260315-002',
    status: 'delivering',
    subtotal: 2800,
    discount: 0,
    deliveryFee: 300,
    total: 3100,
    customer: {
      name: 'Дмитрий Волков',
      phone: '+7 (903) 444-99-88',
      email: 'dmitry.volkov@example.com',
    },
    delivery: {
      city: 'Москва',
      address: 'Ленинский проспект, д. 88, корп. 2, кв. 102',
      date: '2026-03-15',
      timeSlot: '15:00 - 18:00',
      comment: 'Позвонить за 20 минут до приезда.',
    },
    paymentMethod: 'mock_card',
    createdAt: '2026-03-15T12:00:00.000Z',
    updatedAt: '2026-03-15T14:30:00.000Z',
    items: [
      {
        productId: 'p-4',
        name: 'Тарталетки с лесной малиной (4 шт)',
        quantity: 2,
        price: 1400,
        weight: '440 г (4×110 г)',
        image: 'https://images.pexels.com/photos/3850843/pexels-photo-3850843.jpeg?auto=compress&cs=tinysrgb&w=800',
      },
    ],
  },
  {
    number: 'FILUSHA-20260314-003',
    status: 'delivered',
    subtotal: 2340,
    discount: 0,
    deliveryFee: 300,
    total: 2640,
    customer: {
      name: 'Мария Орлова',
      phone: '+7 (926) 777-11-22',
      email: 'mariya.orlova@example.com',
    },
    delivery: {
      city: 'Москва',
      address: 'ул. Покровка, д. 24, оф. 12',
      date: '2026-03-14',
      timeSlot: '10:00 - 13:00',
    },
    paymentMethod: 'mock_card',
    createdAt: '2026-03-14T09:30:00.000Z',
    updatedAt: '2026-03-14T11:50:00.000Z',
    items: [
      {
        productId: 'p-10',
        name: 'Печенье Кукис с тёмным шоколадом (6 шт)',
        quantity: 3,
        price: 780,
        weight: '360 г (6×60 г)',
        image: 'https://images.pexels.com/photos/34979324/pexels-photo-34979324.jpeg?auto=compress&cs=tinysrgb&w=800',
      },
    ],
  },
];

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrders(parsed);
        } else {
          setOrders(SAMPLE_ORDERS);
        }
      } else {
        setOrders(SAMPLE_ORDERS);
      }
    } catch (e) {
      console.error('Failed to load orders from localStorage', e);
      setOrders(SAMPLE_ORDERS);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
      } catch (e) {
        console.error('Failed to save orders to localStorage', e);
      }
    }
  }, [orders, isHydrated]);

  const addOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderNumber: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.number === orderNumber
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      )
    );
  };

  const getOrder = (orderNumber: string) => {
    const cleanNumber = orderNumber.trim().toUpperCase();
    return orders.find((o) => o.number.toUpperCase() === cleanNumber);
  };

  const generateOrderNumber = () => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const randomSeq = String(Math.floor(Math.random() * 900) + 100);
    return `FILUSHA-${yyyy}${mm}${dd}-${randomSeq}`;
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        getOrder,
        generateOrderNumber,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}
