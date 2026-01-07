"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Button } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Input } from '@/components/ui';
import { Label } from '@/components/ui';
import { Select } from '@/components/ui';
import { Checkbox } from '@/components/ui';
import { ProductFilters as ProductFiltersType, ProductCategory } from '@/lib/types';
import { getAllCategories, getAllCollections, getPriceRange } from '@/lib/products';
import { cn } from '@/lib/utils';

interface ProductFiltersProps {
  filters: ProductFiltersType;
  onFiltersChange: (filters: ProductFiltersType) => void;
  className?: string;
}

export function ProductFilters({ filters, onFiltersChange, className }: ProductFiltersProps) {
  const [localFilters, setLocalFilters] = useState<ProductFiltersType>(filters);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [tempPriceRange, setTempPriceRange] = useState({ min: 0, max: 500 });

  // Initialize price range from actual product data
  useEffect(() => {
    const range = getPriceRange();
    setPriceRange(range);
    setTempPriceRange(range);
  }, []);

  // Update local filters when props change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: keyof ProductFiltersType, value: any) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleArrayFilterChange = (key: keyof ProductFiltersType, value: string, checked: boolean) => {
    const currentArray = (localFilters[key as keyof ProductFiltersType] as string[]) || [];
    const newArray = checked
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value);
    
    handleFilterChange(key, newArray.length > 0 ? newArray : undefined);
  };

  const handlePriceRangeChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    const newRange = { ...tempPriceRange, [type]: numValue };
    setTempPriceRange(newRange);
  };

  const applyPriceRange = () => {
    handleFilterChange('minPrice', tempPriceRange.min);
    handleFilterChange('maxPrice', tempPriceRange.max);
  };

  const clearFilters = () => {
    const clearedFilters: ProductFiltersType = {};
    setLocalFilters(clearedFilters);
    setTempPriceRange(priceRange);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = () => {
    return Object.keys(localFilters).some(key => {
      const value = localFilters[key as keyof ProductFiltersType];
      return value !== undefined && 
             value !== null && 
             (Array.isArray(value) ? value.length > 0 : true);
    });
  };

  const categories = getAllCategories();
  const collections = getAllCollections();
  const sizes = ['6', '7', '8', '9', '10', '11', '12', '13', '14'];
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Red', hex: '#EF4444' },
    { name: 'Blue', hex: '#3B82F6' },
    { name: 'Green', hex: '#10B981' },
    { name: 'Yellow', hex: '#F59E0B' },
    { name: 'Purple', hex: '#8B5CF6' },
    { name: 'Pink', hex: '#EC4899' },
    { name: 'Gray', hex: '#6B7280' },
    { name: 'Brown', hex: '#A3A3A3' }
  ];

  const getCategoryDisplayName = (category: ProductCategory): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const sortOptions = [
    { value: '', label: 'Default' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'name_asc', label: 'Name: A to Z' },
    { value: 'name_desc', label: 'Name: Z to A' },
    { value: 'rating_desc', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ];

  return (
    <Card className={cn("sticky top-4", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters() && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Sort By */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Sort By</Label>
          <Select
            value={localFilters.sortBy || ''}
            onChange={(e) => handleFilterChange('sortBy', e.target.value || undefined)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Price Range</Label>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-gray-600">Min</Label>
                <Input
                  type="number"
                  value={tempPriceRange.min}
                  onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                  placeholder={priceRange.min.toString()}
                  min="0"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-600">Max</Label>
                <Input
                  type="number"
                  value={tempPriceRange.max}
                  onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                  placeholder={priceRange.max.toString()}
                  min="0"
                />
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={applyPriceRange}
            >
              Apply Price Range
            </Button>
            {(localFilters.minPrice !== undefined || localFilters.maxPrice !== undefined) && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  ${localFilters.minPrice || priceRange.min} - ${localFilters.maxPrice || priceRange.max}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2"
                  onClick={() => {
                    handleFilterChange('minPrice', undefined);
                    handleFilterChange('maxPrice', undefined);
                    setTempPriceRange(priceRange);
                  }}
                >
                  ×
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Category */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Category</Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={localFilters.category === category}
                  onCheckedChange={(checked) => 
                    handleFilterChange('category', checked ? category : undefined)
                  }
                />
                <span className="text-sm">{getCategoryDisplayName(category)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Collection */}
        {collections.length > 0 && (
          <div>
            <Label className="text-sm font-medium mb-3 block">Collection</Label>
            <div className="space-y-2">
              {collections.map((collection) => (
                <label key={collection} className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    checked={(localFilters.collection && localFilters.collection.includes(collection)) || false}
                    onCheckedChange={(checked) => {
                      // Handle collection filter as a single selection
                      handleFilterChange('collection', checked ? collection : undefined);
                    }}
                  />
                  <span className="text-sm">{collection}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Size</Label>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => (
              <label key={size} className="cursor-pointer">
                <Checkbox
                  checked={(localFilters.sizes || []).includes(size)}
                  onCheckedChange={(checked) => 
                    handleArrayFilterChange('sizes', size, checked as boolean)
                  }
                  className="sr-only"
                />
                <div className={cn(
                  "border rounded px-2 py-1 text-xs text-center transition-colors",
                  (localFilters.sizes || []).includes(size)
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:border-gray-400"
                )}>
                  {size}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Color</Label>
          <div className="space-y-2">
            {colors.map((color) => (
              <label key={color.name} className="flex items-center space-x-3 cursor-pointer">
                <Checkbox
                  checked={(localFilters.colors || []).some(c => 
                    c.toLowerCase() === color.name.toLowerCase()
                  )}
                  onCheckedChange={(checked) => 
                    handleArrayFilterChange('colors', color.name, checked as boolean)
                  }
                />
                <div
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-sm">{color.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability & Special */}
        <div className="space-y-3">
          <Label className="text-sm font-medium mb-3 block">Availability</Label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <Checkbox
              checked={localFilters.inStock || false}
              onCheckedChange={(checked) => handleFilterChange('inStock', checked || undefined)}
            />
            <span className="text-sm">In Stock Only</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <Checkbox
              checked={localFilters.onSale || false}
              onCheckedChange={(checked) => handleFilterChange('onSale', checked || undefined)}
            />
            <span className="text-sm">On Sale</span>
          </label>
        </div>

        {/* Rating */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Minimum Rating</Label>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={localFilters.minRating === rating}
                  onCheckedChange={(checked) => 
                    handleFilterChange('minRating', checked ? rating : undefined)
                  }
                />
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm mr-1">★</span>
                  <span className="text-sm">{rating}+ Stars</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}