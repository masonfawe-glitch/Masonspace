"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { Button } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cart';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
  className?: string;
  showQuickAdd?: boolean;
}

export function ProductCard({ 
  product, 
  onProductClick, 
  className,
  showQuickAdd = false 
}: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes.find(s => s.available)?.value || '');
  const [imageLoading, setImageLoading] = useState(true);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedColor && selectedSize) {
      const variantId = `${product.id}_${selectedColor}_${selectedSize}`;
      addItem(product.id, variantId, 1);
    }
  };

  const handleProductClick = () => {
    onProductClick?.(product);
  };

  const isOnSale = product.originalPrice !== undefined;
  const discountPercent = isOnSale ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) : 0;
  const hasLowStock = product.stock <= 5 && product.stock > 0;

  return (
    <Card className={cn(
      "group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer",
      className
    )}>
      <div className="relative overflow-hidden" onClick={handleProductClick}>
        <div className="relative">
          {imageLoading && (
            <div className="h-64 w-full bg-gray-200 animate-pulse" />
          )}
          <img
            src={product.images[0]}
            alt={product.name}
            className={cn(
              "h-64 w-full object-cover transition-all duration-300 group-hover:scale-105",
              imageLoading ? "absolute inset-0 opacity-0" : "relative opacity-100"
            )}
            onLoad={() => setImageLoading(false)}
          />
        </div>
        
        {/* Sale Badge */}
        {isOnSale && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-white z-10">
            -{discountPercent}%
          </Badge>
        )}
        
        {/* Stock Status Badges */}
        {hasLowStock && (
          <Badge className="absolute top-2 left-2 bg-orange-500 text-white z-10">
            Only {product.stock} left
          </Badge>
        )}
        {product.stock === 0 && (
          <Badge className="absolute top-2 left-2 bg-gray-500 text-white z-10">
            Out of Stock
          </Badge>
        )}

        {/* Quick Add Button - shows on hover */}
        {showQuickAdd && product.stock > 0 && (
          <Button
            className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            onClick={handleAddToCart}
            size="sm"
          >
            Quick Add
          </Button>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <div className="flex items-center">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
            <span className="ml-1 text-xs text-gray-400">({product.reviews.length})</span>
          </div>
        </div>
        
        <CardTitle className="text-lg line-clamp-2 leading-tight">
          {product.name}
        </CardTitle>
        
        <CardDescription className="line-clamp-2 text-sm text-gray-600">
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
            {product.colors.slice(0, 5).map((color) => (
              <button
                key={color.name}
                className={cn(
                  "w-6 h-6 rounded-full border-2 transition-all hover:scale-110",
                  selectedColor === color.name ? "border-gray-900 scale-110" : "border-gray-300"
                )}
                style={{ backgroundColor: color.hex }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color.name);
                }}
                title={color.name}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-xs text-gray-500 flex items-center">
                +{product.colors.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-4">
          <p className="text-xs text-gray-600 mb-2">Size: {selectedSize}</p>
          <div className="grid grid-cols-6 gap-1">
            {product.sizes.slice(0, 6).map((size) => (
              <button
                key={size.value}
                className={cn(
                  "text-xs py-1 px-1 rounded border transition-all text-center",
                  selectedSize === size.value
                    ? "border-gray-900 bg-gray-900 text-white"
                    : size.available
                    ? "border-gray-300 hover:border-gray-500 hover:bg-gray-50"
                    : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                )}
                disabled={!size.available}
                onClick={(e) => {
                  e.stopPropagation();
                  if (size.available) {
                    setSelectedSize(size.value);
                  }
                }}
                title={`Size ${size.display}${size.available ? '' : ' (Out of Stock)'}`}
              >
                {size.display}
              </button>
            ))}
          </div>
          {product.sizes.length > 6 && (
            <p className="text-xs text-gray-500 mt-1">
              +{product.sizes.length - 6} more sizes
            </p>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={!selectedColor || !selectedSize || product.stock === 0}
          size="sm"
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardContent>
    </Card>
  );
}