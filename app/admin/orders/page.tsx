"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/lib/adminAuth';
import AdminNav from '@/components/AdminNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getAllOrders, searchOrders, updateOrderStatus } from '@/lib/orders';
import { Order, OrderStatus } from '@/lib/types';

export default function OrdersPage() {
  const { isAuthenticated } = useAdminAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const allOrders = getAllOrders();
    setOrders(allOrders);
  };

  if (!isAuthenticated) {
    return null;
  }

  // Filter orders
  let filteredOrders = orders;
  
  if (searchQuery) {
    filteredOrders = searchOrders(searchQuery);
  }
  
  if (statusFilter !== 'all') {
    filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
  }

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    loadOrders();
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case OrderStatus.PROCESSING:
        return 'bg-blue-100 text-blue-800';
      case OrderStatus.SHIPPED:
        return 'bg-purple-100 text-purple-800';
      case OrderStatus.DELIVERED:
        return 'bg-green-100 text-green-800';
      case OrderStatus.CANCELLED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNav />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Orders</h1>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by order ID or customer name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-48">
                  <Select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value={OrderStatus.PENDING}>Pending</option>
                    <option value={OrderStatus.PROCESSING}>Processing</option>
                    <option value={OrderStatus.SHIPPED}>Shipped</option>
                    <option value={OrderStatus.DELIVERED}>Delivered</option>
                    <option value={OrderStatus.CANCELLED}>Cancelled</option>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>All Orders ({filteredOrders.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <>
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {order.shippingAddress.city}, {order.shippingAddress.state}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                            <div className="text-xs text-gray-500">
                              {new Date(order.createdAt).toLocaleTimeString()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                          >
                            {order.items.length} items
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium">
                          ${order.totalAmount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                            className="w-auto text-sm"
                          >
                            <option value={OrderStatus.PENDING}>Pending</option>
                            <option value={OrderStatus.PROCESSING}>Processing</option>
                            <option value={OrderStatus.SHIPPED}>Shipped</option>
                            <option value={OrderStatus.DELIVERED}>Delivered</option>
                            <option value={OrderStatus.CANCELLED}>Cancelled</option>
                          </Select>
                        </TableCell>
                      </TableRow>
                      {expandedOrderId === order.id && (
                        <TableRow>
                          <TableCell colSpan={7} className="bg-gray-50">
                            <div className="p-4 space-y-3">
                              <h4 className="font-semibold">Order Items:</h4>
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-3 bg-white rounded border">
                                  {item.product && (
                                    <>
                                      <img
                                        src={item.product.images[0]}
                                        alt={item.product.name}
                                        className="w-16 h-16 object-cover rounded"
                                      />
                                      <div className="flex-1">
                                        <div className="font-medium">{item.product.name}</div>
                                        <div className="text-sm text-gray-500">
                                          Quantity: {item.quantity} × ${item.price.toFixed(2)}
                                        </div>
                                      </div>
                                      <div className="font-semibold">
                                        ${(item.quantity * item.price).toFixed(2)}
                                      </div>
                                    </>
                                  )}
                                </div>
                              ))}
                              
                              <div className="mt-4 pt-4 border-t">
                                <h4 className="font-semibold mb-2">Shipping Address:</h4>
                                <div className="text-sm text-gray-600">
                                  <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                                  <p>{order.shippingAddress.address1}</p>
                                  {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
                                  <p>
                                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                                  </p>
                                  <p>{order.shippingAddress.country}</p>
                                  {order.shippingAddress.phone && <p>Phone: {order.shippingAddress.phone}</p>}
                                </div>
                              </div>

                              {order.trackingNumber && (
                                <div className="mt-2">
                                  <span className="text-sm font-medium">Tracking Number: </span>
                                  <span className="text-sm text-blue-600">{order.trackingNumber}</span>
                                </div>
                              )}

                              <div className="mt-4 pt-4 border-t flex justify-between text-sm">
                                <div>
                                  <p>Subtotal: ${order.subtotal.toFixed(2)}</p>
                                  <p>Tax: ${order.tax.toFixed(2)}</p>
                                  <p>Shipping: ${order.shipping.toFixed(2)}</p>
                                  {order.discount && <p>Discount: -${order.discount.toFixed(2)}</p>}
                                </div>
                                <div className="text-right">
                                  <p className="text-lg font-bold">Total: ${order.totalAmount.toFixed(2)}</p>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
