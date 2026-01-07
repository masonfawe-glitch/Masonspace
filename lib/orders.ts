import { Order, OrderStatus, OrderItem } from './types';
import { mockProducts } from './mockData';

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: 'u1',
    items: [
      {
        id: 'oi1',
        productId: '1',
        variantId: 'v1-1',
        quantity: 1,
        price: 159.99,
        product: mockProducts[0]
      },
      {
        id: 'oi2',
        productId: '6',
        variantId: 'v6-1',
        quantity: 2,
        price: 109.99,
        product: mockProducts[5]
      }
    ],
    status: OrderStatus.DELIVERED,
    totalAmount: 399.97,
    subtotal: 379.97,
    tax: 30.40,
    shipping: 0,
    shippingAddress: {
      firstName: 'John',
      lastName: 'Smith',
      address1: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      phone: '555-0100'
    },
    billingAddress: {
      firstName: 'John',
      lastName: 'Smith',
      address1: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    paymentMethod: {
      id: 'pm1',
      type: 'credit_card',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2025
    },
    trackingNumber: 'TRK1234567890',
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-20T14:20:00')
  },
  {
    id: 'ORD-002',
    userId: 'u2',
    items: [
      {
        id: 'oi3',
        productId: '2',
        variantId: 'v2-1',
        quantity: 1,
        price: 199.99,
        product: mockProducts[1]
      }
    ],
    status: OrderStatus.SHIPPED,
    totalAmount: 215.99,
    subtotal: 199.99,
    tax: 16.00,
    shipping: 0,
    shippingAddress: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      address1: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA',
      phone: '555-0101'
    },
    billingAddress: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      address1: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA'
    },
    paymentMethod: {
      id: 'pm2',
      type: 'credit_card',
      last4: '5555',
      brand: 'Mastercard'
    },
    trackingNumber: 'TRK0987654321',
    createdAt: new Date('2024-01-18T15:45:00'),
    updatedAt: new Date('2024-01-20T09:30:00')
  },
  {
    id: 'ORD-003',
    userId: 'u3',
    items: [
      {
        id: 'oi4',
        productId: '5',
        variantId: 'v5-1',
        quantity: 1,
        price: 249.99,
        product: mockProducts[4]
      },
      {
        id: 'oi5',
        productId: '3',
        variantId: 'v3-1',
        quantity: 1,
        price: 149.99,
        product: mockProducts[2]
      }
    ],
    status: OrderStatus.PROCESSING,
    totalAmount: 431.98,
    subtotal: 399.98,
    tax: 32.00,
    shipping: 0,
    shippingAddress: {
      firstName: 'Mike',
      lastName: 'Chen',
      address1: '789 Elm St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA',
      phone: '555-0102'
    },
    billingAddress: {
      firstName: 'Mike',
      lastName: 'Chen',
      address1: '789 Elm St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    paymentMethod: {
      id: 'pm3',
      type: 'paypal'
    },
    createdAt: new Date('2024-01-20T11:20:00'),
    updatedAt: new Date('2024-01-20T11:20:00')
  },
  {
    id: 'ORD-004',
    userId: 'u4',
    items: [
      {
        id: 'oi6',
        productId: '4',
        variantId: 'v4-1',
        quantity: 3,
        price: 119.99,
        product: mockProducts[3]
      }
    ],
    status: OrderStatus.PENDING,
    totalAmount: 388.97,
    subtotal: 359.97,
    tax: 29.00,
    shipping: 0,
    shippingAddress: {
      firstName: 'Emily',
      lastName: 'Davis',
      address1: '321 Pine Rd',
      city: 'Houston',
      state: 'TX',
      zipCode: '77001',
      country: 'USA',
      phone: '555-0103'
    },
    billingAddress: {
      firstName: 'Emily',
      lastName: 'Davis',
      address1: '321 Pine Rd',
      city: 'Houston',
      state: 'TX',
      zipCode: '77001',
      country: 'USA'
    },
    paymentMethod: {
      id: 'pm4',
      type: 'credit_card',
      last4: '1111',
      brand: 'Amex'
    },
    createdAt: new Date('2024-01-21T08:15:00'),
    updatedAt: new Date('2024-01-21T08:15:00')
  },
  {
    id: 'ORD-005',
    userId: 'u5',
    items: [
      {
        id: 'oi7',
        productId: '7',
        variantId: 'v7-1',
        quantity: 1,
        price: 139.99,
        product: mockProducts[6]
      }
    ],
    status: OrderStatus.DELIVERED,
    totalAmount: 151.19,
    subtotal: 139.99,
    tax: 11.20,
    shipping: 0,
    shippingAddress: {
      firstName: 'Alex',
      lastName: 'Martinez',
      address1: '654 Maple Dr',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001',
      country: 'USA',
      phone: '555-0104'
    },
    billingAddress: {
      firstName: 'Alex',
      lastName: 'Martinez',
      address1: '654 Maple Dr',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001',
      country: 'USA'
    },
    paymentMethod: {
      id: 'pm5',
      type: 'apple_pay'
    },
    trackingNumber: 'TRK1122334455',
    createdAt: new Date('2024-01-12T14:30:00'),
    updatedAt: new Date('2024-01-17T10:00:00')
  }
];

/**
 * Get all orders with optional filtering
 */
export function getAllOrders(): Order[] {
  return mockOrders.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * Get order by ID
 */
export function getOrderById(id: string): Order | undefined {
  return mockOrders.find(order => order.id === id);
}

/**
 * Get orders by status
 */
export function getOrdersByStatus(status: OrderStatus): Order[] {
  return mockOrders.filter(order => order.status === status);
}

/**
 * Update order status
 */
export function updateOrderStatus(orderId: string, status: OrderStatus): Order | undefined {
  const order = mockOrders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    order.updatedAt = new Date();
  }
  return order;
}

/**
 * Search orders by ID or customer name
 */
export function searchOrders(query: string): Order[] {
  const searchTerm = query.toLowerCase();
  return mockOrders.filter(order =>
    order.id.toLowerCase().includes(searchTerm) ||
    order.shippingAddress.firstName.toLowerCase().includes(searchTerm) ||
    order.shippingAddress.lastName.toLowerCase().includes(searchTerm)
  );
}

/**
 * Get order statistics
 */
export function getOrderStats() {
  const totalOrders = mockOrders.length;
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const averageOrderValue = totalRevenue / totalOrders;
  
  const statusCounts = {
    pending: mockOrders.filter(o => o.status === OrderStatus.PENDING).length,
    processing: mockOrders.filter(o => o.status === OrderStatus.PROCESSING).length,
    shipped: mockOrders.filter(o => o.status === OrderStatus.SHIPPED).length,
    delivered: mockOrders.filter(o => o.status === OrderStatus.DELIVERED).length,
    cancelled: mockOrders.filter(o => o.status === OrderStatus.CANCELLED).length
  };

  return {
    totalOrders,
    totalRevenue,
    averageOrderValue,
    statusCounts
  };
}
