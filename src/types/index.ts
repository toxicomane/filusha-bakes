export type ProductCategory = 'cakes' | 'pastries' | 'cupcakes' | 'cookies';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  weight: string;
  servings?: string;
  description: string;
  composition: string;
  allergens: string[];
  nutritionalValue: {
    calories: number;
    proteins: number;
    fats: number;
    carbs: number;
  };
  images: string[];
  inStock: boolean;
  preorderDays?: number;
  featured?: boolean;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  weight: string;
  image: string;
}

export type OrderStatus = 'ordered' | 'preparing' | 'delivering' | 'delivered';

export interface Order {
  number: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  promoCode?: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  delivery: {
    city: string;
    address: string;
    date: string;
    timeSlot: string;
    comment?: string;
  };
  paymentMethod: 'mock_card';
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  author: string;
  date: string;
  text: string;
  productName: string;
  rating: number;
}
