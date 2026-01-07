import { Product, ProductCategory, ShoeSize, ShoeColor } from './types';
import { mockProducts } from './mockData';

/**
 * Create a new product
 */
export function createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
  const newProduct: Product = {
    ...productData,
    id: String(mockProducts.length + 1),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  mockProducts.push(newProduct);
  return newProduct;
}

/**
 * Update an existing product
 */
export function updateProduct(
  id: string, 
  productData: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>
): Product | undefined {
  const index = mockProducts.findIndex(p => p.id === id);
  
  if (index === -1) return undefined;
  
  mockProducts[index] = {
    ...mockProducts[index],
    ...productData,
    updatedAt: new Date()
  };
  
  return mockProducts[index];
}

/**
 * Delete a product
 */
export function deleteProduct(id: string): boolean {
  const index = mockProducts.findIndex(p => p.id === id);
  
  if (index === -1) return false;
  
  mockProducts.splice(index, 1);
  return true;
}

/**
 * Update product stock
 */
export function updateProductStock(id: string, stock: number): Product | undefined {
  const product = mockProducts.find(p => p.id === id);
  
  if (!product) return undefined;
  
  product.stock = stock;
  product.updatedAt = new Date();
  
  return product;
}

/**
 * Validate product data
 */
export function validateProduct(productData: Partial<Product>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!productData.name || productData.name.trim() === '') {
    errors.push('Product name is required');
  }
  
  if (!productData.description || productData.description.trim() === '') {
    errors.push('Product description is required');
  }
  
  if (productData.price === undefined || productData.price <= 0) {
    errors.push('Valid price is required');
  }
  
  if (productData.originalPrice !== undefined && productData.originalPrice < (productData.price || 0)) {
    errors.push('Original price must be greater than current price');
  }
  
  if (!productData.images || productData.images.length === 0) {
    errors.push('At least one product image is required');
  }
  
  if (!productData.sizes || productData.sizes.length === 0) {
    errors.push('At least one size is required');
  }
  
  if (!productData.colors || productData.colors.length === 0) {
    errors.push('At least one color is required');
  }
  
  if (productData.stock === undefined || productData.stock < 0) {
    errors.push('Valid stock quantity is required');
  }
  
  if (!productData.category) {
    errors.push('Product category is required');
  }
  
  if (productData.rating !== undefined && (productData.rating < 0 || productData.rating > 5)) {
    errors.push('Rating must be between 0 and 5');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
