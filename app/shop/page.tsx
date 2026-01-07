"use client"

import React, { useState, useEffect } from 'react';
import { ProductFilters } from '@/components/ProductFilters';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductFilters as ProductFiltersType, ProductCategory } from '@/lib/types';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import { Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface ShopPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ShopPage({ searchParams }: ShopPageProps) {
  const [filters, setFilters] = useState<ProductFiltersType>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowFilters(false); // Auto-hide filters on desktop
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize from search params (URL params)
  useEffect(() => {
    if (searchParams) {
      const newFilters: ProductFiltersType = {};
      
      if (searchParams.category) {
        newFilters.category = searchParams.category as ProductCategory;
      }
      if (searchParams.minPrice) {
        newFilters.minPrice = parseInt(searchParams.minPrice as string);
      }
      if (searchParams.maxPrice) {
        newFilters.maxPrice = parseInt(searchParams.maxPrice as string);
      }
      if (searchParams.colors) {
        newFilters.colors = Array.isArray(searchParams.colors) 
          ? searchParams.colors as string[]
          : [searchParams.colors as string];
      }
      if (searchParams.sizes) {
        newFilters.sizes = Array.isArray(searchParams.sizes)
          ? searchParams.sizes as string[]
          : [searchParams.sizes as string];
      }
      if (searchParams.collection) {
        newFilters.collection = searchParams.collection as string;
      }
      if (searchParams.inStock === 'true') {
        newFilters.inStock = true;
      }
      if (searchParams.onSale === 'true') {
        newFilters.onSale = true;
      }
      if (searchParams.minRating) {
        newFilters.minRating = parseInt(searchParams.minRating as string);
      }
      if (searchParams.sortBy) {
        newFilters.sortBy = searchParams.sortBy as any;
      }
      if (searchParams.search) {
        setCurrentSearch(searchParams.search as string);
        setSearchQuery(searchParams.search as string);
      }

      setFilters(newFilters);
    }
  }, [searchParams]);

  // Handle search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentSearch(searchQuery.trim());
    
    // Update URL with search parameter
    if (searchQuery.trim()) {
      const url = new URL(window.location.href);
      url.searchParams.set('search', searchQuery.trim());
      window.history.pushState({}, '', url);
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete('search');
      window.history.pushState({}, '', url);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setCurrentSearch('');
    
    // Update URL to remove search parameter
    const url = new URL(window.location.href);
    url.searchParams.delete('search');
    window.history.pushState({}, '', url);
  };

  const activeFiltersCount = Object.keys(filters).filter(key => {
    const value = filters[key as keyof ProductFiltersType];
    return value !== undefined && 
           value !== null && 
           (Array.isArray(value) ? value.length > 0 : true);
  }).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            {/* Title and Filter Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
                <p className="text-gray-600 mt-1">
                  Discover our complete collection of premium footwear
                </p>
              </div>
              
              {/* Mobile Filter Toggle */}
              {isMobile && (
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="relative"
                >
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge 
                      className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs"
                      variant="destructive"
                    >
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              )}
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={clearSearch}
                  >
                    ×
                  </Button>
                )}
              </div>
              <Button type="submit" variant="outline">
                Search
              </Button>
            </form>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600 py-2">Active filters:</span>
                {filters.category && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Category: {filters.category}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => setFilters(prev => ({ ...prev, category: undefined }))}
                    >
                      ×
                    </Button>
                  </Badge>
                )}
                {filters.minPrice !== undefined && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Min: ${filters.minPrice}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => setFilters(prev => ({ ...prev, minPrice: undefined }))}
                    >
                      ×
                    </Button>
                  </Badge>
                )}
                {filters.maxPrice !== undefined && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Max: ${filters.maxPrice}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => setFilters(prev => ({ ...prev, maxPrice: undefined }))}
                    >
                      ×
                    </Button>
                  </Badge>
                )}
                {filters.colors && filters.colors.length > 0 && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Colors: {filters.colors.length}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => setFilters(prev => ({ ...prev, colors: undefined }))}
                    >
                      ×
                    </Button>
                  </Badge>
                )}
                {filters.sizes && filters.sizes.length > 0 && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Sizes: {filters.sizes.length}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => setFilters(prev => ({ ...prev, sizes: undefined }))}
                    >
                      ×
                    </Button>
                  </Badge>
                )}
                {filters.inStock && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    In Stock
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => setFilters(prev => ({ ...prev, inStock: undefined }))}
                    >
                      ×
                    </Button>
                  </Badge>
                )}
                {filters.onSale && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    On Sale
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => setFilters(prev => ({ ...prev, onSale: undefined }))}
                    >
                      ×
                    </Button>
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          {!isMobile && (
            <div className="w-80 flex-shrink-0">
              <ProductFilters
                filters={filters}
                onFiltersChange={setFilters}
                className="sticky top-4"
              />
            </div>
          )}

          {/* Mobile Filters Overlay */}
          {isMobile && showFilters && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
              <div className="fixed inset-y-0 left-0 w-80 bg-white z-50 transform transition-transform">
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(false)}
                  >
                    ×
                  </Button>
                </div>
                <div className="overflow-y-auto h-full pb-20">
                  <ProductFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    className="border-0"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            <ProductGrid
              filters={filters}
              searchQuery={currentSearch}
              onProductClick={(product) => {
                console.log('Product clicked:', product);
                // Handle product click - could navigate to product detail page
              }}
              itemsPerPage={16}
            />
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Free shipping on orders over $100</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>30-day return policy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Authenticity guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}