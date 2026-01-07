"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductGrid } from '@/components/ProductGrid';
import { CartProvider, useCart } from '@/lib/cart';
import { Product } from '@/lib/types';

function ShoppingCart() {
  const { items, total, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
          <p className="text-gray-600">Add some Nike shoes to get started!</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shopping Cart ({items.length} items)</CardTitle>
        <CardDescription>
          Review your items and proceed to checkout
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => {
            const product = item.product || { name: 'Loading...', price: 0 };
            return (
              <div key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex-1">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity} × ${product.price}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(product.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Button className="w-full" size="lg">
            Proceed to Checkout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Header() {
  const { itemCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nike Store</h1>
            <p className="text-sm text-gray-600">Premium athletic footwear</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="px-3 py-1">
              {itemCount} items in cart
            </Badge>
            <Button 
              variant="outline" 
              onClick={() => setCartOpen(!cartOpen)}
            >
              🛒 Cart {itemCount > 0 && `(${itemCount})`}
            </Button>
          </div>
        </div>
      </div>
      {cartOpen && (
        <div className="absolute right-4 top-20 z-50 w-96 max-h-96 overflow-y-auto">
          <ShoppingCart />
        </div>
      )}
    </header>
  );
}

function ProductDetailModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes.find(s => s.available)?.value || '');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (selectedColor && selectedSize) {
      const variantId = `${product.id}_${selectedColor}_${selectedSize}`;
      addItem(product.id, variantId, quantity);
    }
  };

  const isOnSale = product.originalPrice !== undefined;
  const discountPercent = isOnSale ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div className="space-y-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="grid grid-cols-3 gap-2">
              {product.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 2}`}
                  className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-75"
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">{product.category}</Badge>
              <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-lg">{product.rating}</span>
                  <span className="ml-1 text-sm text-gray-500">({product.reviews.length} reviews)</span>
                </div>
              </div>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">${product.price}</span>
              {isOnSale && (
                <>
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                  <Badge className="bg-red-500">-{discountPercent}%</Badge>
                </>
              )}
            </div>

            {/* Colors */}
            <div>
              <h3 className="font-semibold mb-2">Color: {selectedColor}</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-12 h-12 rounded-full border-4 transition-all ${
                      selectedColor === color.name ? 'border-gray-900 scale-110' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="font-semibold mb-2">Size: {selectedSize}</h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.value}
                    className={`py-2 px-3 rounded border text-sm font-medium transition-all ${
                      selectedSize === size.value
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : size.available
                        ? 'border-gray-300 hover:border-gray-500'
                        : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!size.available}
                    onClick={() => size.available && setSelectedSize(size.value)}
                  >
                    {size.display}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-2">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="px-4 py-2 border rounded">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                className="flex-1"
                size="lg"
                onClick={handleAddToCart}
                disabled={!selectedColor || !selectedSize || product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : `Add to Cart - $${(product.price * quantity).toFixed(2)}`}
              </Button>
              <Button variant="outline" size="lg" onClick={onClose}>
                Close
              </Button>
            </div>

            {/* Stock Status */}
            <div className="text-sm text-gray-600">
              {product.stock > 0 ? (
                <span className="text-green-600">✓ In stock ({product.stock} available)</span>
              ) : (
                <span className="text-red-600">Out of stock</span>
              )}
            </div>

            {/* 3D Model */}
            {product.spline3dModelUrl && (
              <div>
                <h3 className="font-semibold mb-2">3D Model</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Interactive 3D model available (placeholder URL: {product.spline3dModelUrl})
                </p>
                <Badge variant="secondary">3D Interactive</Badge>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function NikeStoreDemo() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Nike Store - Premium Athletic Footwear
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover our latest collection of Nike shoes featuring cutting-edge technology and timeless style.
            </p>
            <div className="flex justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                🏃‍♂️ Running Shoes
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                🏀 Basketball Shoes
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                👟 Casual Sneakers
              </Badge>
            </div>
          </div>

          {/* Featured Products */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
            <ProductGrid 
              itemsPerPage={8}
              onProductClick={setSelectedProduct}
            />
          </section>

          {/* All Products */}
          <section>
            <h2 className="text-2xl font-bold mb-6">All Products</h2>
            <ProductGrid 
              onProductClick={setSelectedProduct}
            />
          </section>
        </main>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </CartProvider>
  );
}

export default NikeStoreDemo;