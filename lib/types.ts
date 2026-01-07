// Core product types for the Nike-level shoe store e-commerce platform

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For sales/discounts
  images: string[]; // Array of image URLs
  spline3dModelUrl?: string; // Spline 3D model URL
  sizes: ShoeSize[];
  colors: ShoeColor[];
  stock: number;
  category: ProductCategory;
  collection?: string; // e.g., "Air Max", "Air Jordan", "Dri-FIT"
  rating: number; // Average rating (1-5)
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ShoeVariant {
  id: string;
  productId: string;
  color: ShoeColor;
  size: ShoeSize;
  stock: number;
  sku: string; // Stock Keeping Unit
}

export interface ShoeSize {
  value: string; // e.g., "7", "8", "9", "10", "11"
  display: string; // e.g., "7", "8", "9", "10", "11"
  available: boolean;
}

export interface ShoeColor {
  name: string; // e.g., "Black", "White", "Red"
  hex: string; // Hex color code
  image?: string; // Color-specific image URL
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number; // 1-5 stars
  title: string;
  comment: string;
  verified: boolean; // Verified purchase
  createdAt: Date;
  helpful: number; // Number of people who found this helpful
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string; // Specific color + size combination
  quantity: number;
  addedAt: Date;
  // Derived fields for convenience
  product?: Product;
  variant?: ShoeVariant;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount?: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  price: number; // Price at time of order
  product?: Product;
  variant?: ShoeVariant;
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'paypal' | 'apple_pay' | 'google_pay';
  last4?: string; // Last 4 digits for credit cards
  brand?: string; // Visa, MasterCard, etc.
  expiryMonth?: number;
  expiryYear?: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  orders: string[]; // Order IDs
  wishlist: string[]; // Product IDs
  createdAt: Date;
  updatedAt: Date;
}

// Enums for better type safety
export enum ProductCategory {
  RUNNING = 'running',
  BASKETBALL = 'basketball',
  CASUAL = 'casual',
  TRAINING = 'training',
  LIFESTYLE = 'lifestyle',
  FOOTBALL = 'football',
  SKATEBOARDING = 'skateboarding',
  GOLF = 'golf',
  TENNIS = 'tennis'
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  RETURNED = 'returned'
}

// Filter types for product queries
export interface ProductFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  sizes?: string[];
  collection?: string;
  inStock?: boolean;
  onSale?: boolean;
  minRating?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'rating_desc' | 'newest';
}

export interface PaginatedProducts {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}