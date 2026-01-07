"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product, ProductCategory } from '@/lib/types';
import { getAllProducts, getProductsByCategory, filterProducts, getFeaturedProducts } from '@/lib/products';
import { useCart } from '@/lib/cart';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

function ProductCard({ product, onProductClick }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes.find(s => s.available)?.value || '');

  const handleAddToCart = () => {
    if (selectedColor && selectedSize) {
      const variantId = `${product.id}_${selectedColor}_${selectedSize}`;
      addItem(product.id, variantId, 1);
    }
  };

  const isOnSale = product.originalPrice !== undefined;
  const discountPercent = isOnSale ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) : 0;

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onClick={() => onProductClick?.(product)}
          style={{ cursor: onProductClick ? 'pointer' : 'default' }}
        />
        {isOnSale && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-white">
            -{discountPercent}%
          </Badge>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <Badge className="absolute top-2 left-2 bg-orange-500 text-white">
            Only {product.stock} left
          </Badge>
        )}
        {product.stock === 0 && (
          <Badge className="absolute top-2 left-2 bg-gray-500 text-white">
            Out of Stock
          </Badge>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
            <span className="ml-1 text-xs text-gray-400">({product.reviews.length})</span>
          </div>
        </div>
        <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
        <CardDescription className="line-clamp-2 text-sm">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          {isOnSale && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>

        {/* Colors */}
        <div className="mb-3">
          <p className="text-xs text-gray-600 mb-2">Color: {selectedColor}</p>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color.name}
                className={cn(
                  "w-6 h-6 rounded-full border-2 transition-all",
                  selectedColor === color.name ? "border-gray-900 scale-110" : "border-gray-300"
                )}
                style={{ backgroundColor: color.hex }}
                onClick={() => setSelectedColor(color.name)}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-4">
          <p className="text-xs text-gray-600 mb-2">Size: {selectedSize}</p>
          <div className="grid grid-cols-6 gap-1">
            {product.sizes.map((size) => (
              <button
                key={size.value}
                className={cn(
                  "text-xs py-1 px-2 rounded border transition-all",
                  selectedSize === size.value
                    ? "border-gray-900 bg-gray-900 text-white"
                    : size.available
                    ? "border-gray-300 hover:border-gray-500"
                    : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                )}
                disabled={!size.available}
                onClick={() => size.available && setSelectedSize(size.value)}
              >
                {size.display}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={!selectedColor || !selectedSize || product.stock === 0}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardContent>
      </Card>
      );
      }

      export { ProductCard };

      interface ProductGridProps {
  category?: ProductCategory;
  featured?: boolean;
  limit?: number;
  showFilters?: boolean;
  onProductClick?: (product: Product) => void;
}

export function ProductGrid({ 
  category, 
  featured = false, 
  limit = 20, 
  showFilters = false,
  onProductClick 
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      let result;
      
      if (featured) {
        result = getFeaturedProducts(limit);
      } else if (category) {
        const paginatedResult = getProductsByCategory(category, 1, limit);
        result = paginatedResult.products;
      } else {
        const paginatedResult = getAllProducts(1, limit);
        result = paginatedResult.products;
      }
      
      setProducts(result);
      setError(null);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  }, [category, featured, limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-64 bg-gray-200"></div>
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
}

// Product listing page component
export function ProductListing() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | undefined>();
  const [viewMode, setViewMode] = useState<'all' | 'featured' | 'sale'>('all');

  const categories = Object.values(ProductCategory);

  const getCategoryDisplayName = (category: ProductCategory): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const getProducts = () => {
    switch (viewMode) {
      case 'featured':
        return <ProductGrid featured={true} onProductClick={(p) => console.log('Product clicked:', p)} />;
      case 'sale':
        return <ProductGrid limit={50} onProductClick={(p) => console.log('Product clicked:', p)} />;
      default:
        return (
          <ProductGrid 
            category={selectedCategory} 
            onProductClick={(p) => console.log('Product clicked:', p)} 
          />
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Nike Shoe Collection</h1>
        <p className="text-gray-600">
          Discover our latest collection of premium Nike shoes for every occasion.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* View Mode Tabs */}
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'All Products' },
            { key: 'featured', label: 'Featured' },
            { key: 'sale', label: 'Sale' }
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={viewMode === tab.key ? 'default' : 'outline'}
              onClick={() => setViewMode(tab.key as any)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Category Filter */}
        {viewMode === 'all' && (
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === undefined ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(undefined)}
              size="sm"
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {getCategoryDisplayName(category)}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Products Grid */}
      {getProducts()}
    </div>
  );
}