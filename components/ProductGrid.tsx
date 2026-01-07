"use client"

import React, { useState, useEffect } from 'react';
import { Product, ProductFilters as ProductFiltersType, PaginatedProducts } from '@/lib/types';
import { filterProducts, searchProductsWithFilters } from '@/lib/products';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui';
import { Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  filters?: ProductFiltersType;
  searchQuery?: string;
  onProductClick?: (product: Product) => void;
  className?: string;
  initialPage?: number;
  itemsPerPage?: number;
}

export function ProductGrid({ 
  filters = {}, 
  searchQuery = '',
  onProductClick, 
  className,
  initialPage = 1,
  itemsPerPage = 20 
}: ProductGridProps) {
  const [paginatedProducts, setPaginatedProducts] = useState<PaginatedProducts>({
    products: [],
    total: 0,
    page: initialPage,
    limit: itemsPerPage,
    hasNext: false,
    hasPrevious: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load products when filters, search query, or page change
  useEffect(() => {
    loadProducts(initialPage, filters, searchQuery);
  }, [filters, searchQuery]);

  const loadProducts = async (page: number, currentFilters: ProductFiltersType, query: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let result: PaginatedProducts;
      
      if (query.trim()) {
        // Use search with filters
        result = searchProductsWithFilters(query.trim(), currentFilters, page, itemsPerPage);
      } else {
        // Use regular filtering
        result = filterProducts(currentFilters, page, itemsPerPage);
      }
      
      setPaginatedProducts(result);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    loadProducts(newPage, filters, searchQuery);
    // Scroll to top of grid on page change
    const gridElement = document.getElementById('product-grid');
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Show loading skeleton
  if (loading) {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-t-lg" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-20" />
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="h-8 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Products</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={() => loadProducts(paginatedProducts.page, filters, searchQuery)}>
          Try Again
        </Button>
      </div>
    );
  }

  // Show empty state
  if (paginatedProducts.products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4-2-2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Found</h3>
        <p className="text-gray-600 mb-4">
          {searchQuery.trim() 
            ? `No products found for "${searchQuery}". Try adjusting your filters or search criteria.`
            : 'Try adjusting your filters or search criteria to find what you\'re looking for.'
          }
        </p>
        <Button variant="outline" onClick={() => loadProducts(1, {}, '')}>
          Clear All Filters
        </Button>
      </div>
    );
  }

  const totalPages = Math.ceil(paginatedProducts.total / paginatedProducts.limit);
  const currentPage = paginatedProducts.page;

  return (
    <div id="product-grid" className={cn("space-y-6", className)}>
      {/* Results Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-medium text-gray-900">
            {paginatedProducts.total} Product{paginatedProducts.total !== 1 ? 's' : ''}
            {searchQuery.trim() && (
              <span className="text-gray-600 font-normal">
                {' '}for "{searchQuery}"
              </span>
            )}
          </h2>
          <Badge variant="secondary">
            Page {currentPage} of {totalPages}
          </Badge>
        </div>
        
        {paginatedProducts.total > 0 && (
          <div className="text-sm text-gray-600">
            Showing {((currentPage - 1) * paginatedProducts.limit) + 1} to{' '}
            {Math.min(currentPage * paginatedProducts.limit, paginatedProducts.total)} of{' '}
            {paginatedProducts.total} results
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedProducts.products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProductClick={onProductClick}
            showQuickAdd={true}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 py-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!paginatedProducts.hasPrevious}
          >
            Previous
          </Button>
          
          <div className="flex items-center space-x-1">
            {/* First page */}
            {currentPage > 3 && (
              <>
                <Button
                  variant={1 === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(1)}
                >
                  1
                </Button>
                {currentPage > 4 && <span className="px-2 text-gray-400">...</span>}
              </>
            )}
            
            {/* Page numbers around current page */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}
            
            {/* Last page */}
            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && <span className="px-2 text-gray-400">...</span>}
                <Button
                  variant={totalPages === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(totalPages)}
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!paginatedProducts.hasNext}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}