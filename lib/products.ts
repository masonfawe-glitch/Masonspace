import { 
  Product, 
  ProductCategory, 
  ProductFilters, 
  PaginatedProducts,
  ShoeSize,
  ShoeColor 
} from './types';
import { mockProducts } from './mockData';

/**
 * Get all products with optional pagination
 */
export function getAllProducts(page: number = 1, limit: number = 50): PaginatedProducts {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const products = mockProducts.slice(startIndex, endIndex);
  
  return {
    products,
    total: mockProducts.length,
    page,
    limit,
    hasNext: endIndex < mockProducts.length,
    hasPrevious: page > 1
  };
}

/**
 * Get a product by its ID
 */
export function getProductById(id: string): Product | undefined {
  return mockProducts.find(product => product.id === id);
}

/**
 * Get products by category
 */
export function getProductsByCategory(
  category: ProductCategory, 
  page: number = 1, 
  limit: number = 50
): PaginatedProducts {
  const filteredProducts = mockProducts.filter(product => product.category === category);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const products = filteredProducts.slice(startIndex, endIndex);
  
  return {
    products,
    total: filteredProducts.length,
    page,
    limit,
    hasNext: endIndex < filteredProducts.length,
    hasPrevious: page > 1
  };
}

/**
 * Advanced product filtering with multiple criteria
 */
export function filterProducts(
  filters: ProductFilters,
  page: number = 1,
  limit: number = 50
): PaginatedProducts {
  let filteredProducts = [...mockProducts];

  // Filter by category
  if (filters.category) {
    filteredProducts = filteredProducts.filter(product => product.category === filters.category);
  }

  // Filter by price range
  if (filters.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product => product.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product => product.price <= filters.maxPrice!);
  }

  // Filter by colors
  if (filters.colors && filters.colors.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.colors.some(color => 
        filters.colors!.some(filterColor => 
          color.name.toLowerCase().includes(filterColor.toLowerCase()) ||
          color.hex.toLowerCase() === filterColor.toLowerCase()
        )
      )
    );
  }

  // Filter by sizes
  if (filters.sizes && filters.sizes.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.sizes.some(size => 
        filters.sizes!.includes(size.value) && size.available
      )
    );
  }

  // Filter by collection
  if (filters.collection) {
    filteredProducts = filteredProducts.filter(product => 
      product.collection?.toLowerCase().includes(filters.collection!.toLowerCase())
    );
  }

  // Filter by stock availability
  if (filters.inStock !== undefined) {
    if (filters.inStock) {
      filteredProducts = filteredProducts.filter(product => product.stock > 0);
    } else {
      filteredProducts = filteredProducts.filter(product => product.stock === 0);
    }
  }

  // Filter by sale items
  if (filters.onSale !== undefined) {
    if (filters.onSale) {
      filteredProducts = filteredProducts.filter(product => product.originalPrice !== undefined);
    } else {
      filteredProducts = filteredProducts.filter(product => product.originalPrice === undefined);
    }
  }

  // Filter by minimum rating
  if (filters.minRating !== undefined) {
    filteredProducts = filteredProducts.filter(product => product.rating >= filters.minRating!);
  }

  // Sort products
  if (filters.sortBy) {
    filteredProducts.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'name_desc':
          return b.name.localeCompare(a.name);
        case 'rating_desc':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });
  }

  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    products: paginatedProducts,
    total: filteredProducts.length,
    page,
    limit,
    hasNext: endIndex < filteredProducts.length,
    hasPrevious: page > 1
  };
}

/**
 * Get featured/on-sale products
 */
export function getFeaturedProducts(limit: number = 10): Product[] {
  return mockProducts
    .filter(product => product.originalPrice !== undefined || product.rating >= 4.5)
    .sort((a, b) => {
      // Prioritize sale items, then by rating
      if (a.originalPrice && !b.originalPrice) return -1;
      if (!a.originalPrice && b.originalPrice) return 1;
      return b.rating - a.rating;
    })
    .slice(0, limit);
}

/**
 * Get new arrivals (most recently created products)
 */
export function getNewArrivals(limit: number = 10): Product[] {
  return [...mockProducts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

/**
 * Get products by collection
 */
export function getProductsByCollection(collection: string, limit: number = 20): Product[] {
  return mockProducts
    .filter(product => 
      product.collection?.toLowerCase().includes(collection.toLowerCase())
    )
    .slice(0, limit);
}

/**
 * Search products by name or description
 */
export function searchProducts(query: string, limit: number = 50): Product[] {
  const searchTerm = query.toLowerCase();
  return mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.collection?.toLowerCase().includes(searchTerm) ||
    product.colors.some(color => color.name.toLowerCase().includes(searchTerm))
  ).slice(0, limit);
}

/**
 * Search products with filters and pagination
 */
export function searchProductsWithFilters(
  query: string,
  filters: ProductFilters,
  page: number = 1,
  limit: number = 50
): PaginatedProducts {
  // First get search results
  const searchResults = searchProducts(query, 100); // Get more results for filtering
  
  // Then apply filters to search results
  let filteredProducts = searchResults;
  
  // Additional filtering on search results
  if (filters.category) {
    filteredProducts = filteredProducts.filter(product => product.category === filters.category);
  }

  // Filter by price range
  if (filters.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product => product.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product => product.price <= filters.maxPrice!);
  }

  // Filter by colors
  if (filters.colors && filters.colors.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.colors.some(color => 
        filters.colors!.some(filterColor => 
          color.name.toLowerCase().includes(filterColor.toLowerCase()) ||
          color.hex.toLowerCase() === filterColor.toLowerCase()
        )
      )
    );
  }

  // Filter by sizes
  if (filters.sizes && filters.sizes.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      product.sizes.some(size => 
        filters.sizes!.includes(size.value) && size.available
      )
    );
  }

  // Filter by collection
  if (filters.collection) {
    filteredProducts = filteredProducts.filter(product => 
      product.collection?.toLowerCase().includes(filters.collection!.toLowerCase())
    );
  }

  // Filter by stock availability
  if (filters.inStock !== undefined) {
    if (filters.inStock) {
      filteredProducts = filteredProducts.filter(product => product.stock > 0);
    } else {
      filteredProducts = filteredProducts.filter(product => product.stock === 0);
    }
  }

  // Filter by sale items
  if (filters.onSale !== undefined) {
    if (filters.onSale) {
      filteredProducts = filteredProducts.filter(product => product.originalPrice !== undefined);
    } else {
      filteredProducts = filteredProducts.filter(product => product.originalPrice === undefined);
    }
  }

  // Filter by minimum rating
  if (filters.minRating !== undefined) {
    filteredProducts = filteredProducts.filter(product => product.rating >= filters.minRating!);
  }

  // Sort products
  if (filters.sortBy) {
    filteredProducts.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'name_desc':
          return b.name.localeCompare(a.name);
        case 'rating_desc':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });
  }

  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    products: paginatedProducts,
    total: filteredProducts.length,
    page,
    limit,
    hasNext: endIndex < filteredProducts.length,
    hasPrevious: page > 1
  };
}

/**
 * Get available sizes for a product
 */
export function getAvailableSizes(productId: string): ShoeSize[] {
  const product = getProductById(productId);
  return product?.sizes.filter(size => size.available) || [];
}

/**
 * Get available colors for a product
 */
export function getAvailableColors(productId: string): ShoeColor[] {
  const product = getProductById(productId);
  return product?.colors || [];
}

/**
 * Check if a specific size and color combination is available
 */
export function isVariantAvailable(productId: string, size: string, colorName: string): boolean {
  const product = getProductById(productId);
  if (!product) return false;

  const sizeAvailable = product.sizes.some(s => s.value === size && s.available);
  const colorAvailable = product.colors.some(c => 
    c.name.toLowerCase() === colorName.toLowerCase()
  );

  return sizeAvailable && colorAvailable;
}

/**
 * Get related products (same category, excluding current product)
 */
export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const currentProduct = getProductById(productId);
  if (!currentProduct) return [];

  return mockProducts
    .filter(product => 
      product.id !== productId && 
      product.category === currentProduct.category
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

/**
 * Get all unique categories
 */
export function getAllCategories(): ProductCategory[] {
  const categories = new Set<ProductCategory>();
  mockProducts.forEach(product => categories.add(product.category));
  return Array.from(categories).sort();
}

/**
 * Get all unique collections
 */
export function getAllCollections(): string[] {
  const collections = new Set<string>();
  mockProducts.forEach(product => {
    if (product.collection) {
      collections.add(product.collection);
    }
  });
  return Array.from(collections).sort();
}

/**
 * Get price range for all products
 */
export function getPriceRange(): { min: number; max: number } {
  if (mockProducts.length === 0) return { min: 0, max: 0 };
  
  const prices = mockProducts.map(product => product.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}

/**
 * Get products with low stock (for inventory management)
 */
export function getLowStockProducts(threshold: number = 10): Product[] {
  return mockProducts
    .filter(product => product.stock <= threshold)
    .sort((a, b) => a.stock - b.stock);
}

/**
 * Get product statistics
 */
export function getProductStats() {
  const totalProducts = mockProducts.length;
  const totalValue = mockProducts.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const averagePrice = mockProducts.reduce((sum, product) => sum + product.price, 0) / totalProducts;
  const categories = getAllCategories();
  const collections = getAllCollections();
  const lowStockCount = mockProducts.filter(product => product.stock <= 10).length;
  const onSaleCount = mockProducts.filter(product => product.originalPrice !== undefined).length;

  return {
    totalProducts,
    totalValue,
    averagePrice,
    categories: categories.length,
    collections: collections.length,
    lowStockCount,
    onSaleCount
  };
}