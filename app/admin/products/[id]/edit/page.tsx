"use client"

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAdminAuth } from '@/lib/adminAuth';
import AdminNav from '@/components/AdminNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProductById } from '@/lib/products';
import { updateProduct, validateProduct } from '@/lib/adminProducts';
import { Product, ProductCategory, ShoeSize, ShoeColor } from '@/lib/types';

export default function EditProductPage() {
  const { isAuthenticated } = useAdminAuth();
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    stock: 0,
    category: ProductCategory.CASUAL,
    collection: '',
    spline3dModelUrl: '',
    rating: 0,
    images: [''],
    sizes: [{ value: '', display: '', available: true }],
    colors: [{ name: '', hex: '#000000' }],
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
      return;
    }

    const product = getProductById(productId);
    if (!product) {
      router.push('/admin/products');
      return;
    }

    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      stock: product.stock,
      category: product.category,
      collection: product.collection || '',
      spline3dModelUrl: product.spline3dModelUrl || '',
      rating: product.rating,
      images: product.images,
      sizes: product.sizes,
      colors: product.colors,
    });
    setLoading(false);
  }, [isAuthenticated, productId, router]);

  if (!isAuthenticated || loading) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage('');
    setSaving(true);

    // Validate
    const validation = validateProduct(formData as Partial<Product>);
    if (!validation.valid) {
      setErrors(validation.errors);
      setSaving(false);
      return;
    }

    // Update product
    const updated = updateProduct(productId, {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      originalPrice: formData.originalPrice || undefined,
      stock: formData.stock,
      category: formData.category,
      collection: formData.collection || undefined,
      spline3dModelUrl: formData.spline3dModelUrl || undefined,
      rating: formData.rating,
      images: formData.images.filter(img => img.trim() !== ''),
      sizes: formData.sizes.filter(size => size.value.trim() !== ''),
      colors: formData.colors.filter(color => color.name.trim() !== ''),
    });

    setSaving(false);

    if (updated) {
      setSuccessMessage('Product updated successfully!');
      setTimeout(() => {
        router.push('/admin/products');
      }, 1500);
    } else {
      setErrors(['Failed to update product']);
    }
  };

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const updateImage = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addSize = () => {
    setFormData(prev => ({
      ...prev,
      sizes: [...prev.sizes, { value: '', display: '', available: true }]
    }));
  };

  const updateSize = (index: number, field: keyof ShoeSize, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.map((size, i) => 
        i === index ? { ...size, [field]: value } : size
      )
    }));
  };

  const removeSize = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }));
  };

  const addColor = () => {
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, { name: '', hex: '#000000' }]
    }));
  };

  const updateColor = (index: number, field: keyof ShoeColor, value: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.map((color, i) => 
        i === index ? { ...color, [field]: value } : color
      )
    }));
  };

  const removeColor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNav />
      
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => router.push('/admin/products')}
            >
              ← Back to Products
            </Button>
          </div>

          <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Please fix the following errors:</h3>
              <ul className="list-disc list-inside text-red-700 text-sm">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">{successMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="originalPrice">Original Price ($)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stock">Stock *</Label>
                    <Input
                      id="stock"
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="rating">Rating (0-5)</Label>
                    <Input
                      id="rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as ProductCategory }))}
                      required
                    >
                      {Object.values(ProductCategory).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="collection">Collection</Label>
                    <Input
                      id="collection"
                      value={formData.collection}
                      onChange={(e) => setFormData(prev => ({ ...prev, collection: e.target.value }))}
                      placeholder="e.g., Air Max, Jordan"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="spline3dModelUrl">Spline 3D Model URL</Label>
                  <Input
                    id="spline3dModelUrl"
                    value={formData.spline3dModelUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, spline3dModelUrl: e.target.value }))}
                    placeholder="https://my.spline.design/..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        value={image}
                        onChange={(e) => updateImage(index, e.target.value)}
                        placeholder="Image URL"
                      />
                    </div>
                    {formData.images.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeImage(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addImage}>
                  + Add Image
                </Button>
              </CardContent>
            </Card>

            {/* Sizes */}
            <Card>
              <CardHeader>
                <CardTitle>Available Sizes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.sizes.map((size, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Label>Size Value</Label>
                      <Input
                        value={size.value}
                        onChange={(e) => updateSize(index, 'value', e.target.value)}
                        placeholder="e.g., 9"
                      />
                    </div>
                    <div className="flex-1">
                      <Label>Display</Label>
                      <Input
                        value={size.display}
                        onChange={(e) => updateSize(index, 'display', e.target.value)}
                        placeholder="e.g., 9"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={size.available}
                        onChange={(e) => updateSize(index, 'available', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <Label>Available</Label>
                    </div>
                    {formData.sizes.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeSize(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addSize}>
                  + Add Size
                </Button>
              </CardContent>
            </Card>

            {/* Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Available Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.colors.map((color, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Label>Color Name</Label>
                      <Input
                        value={color.name}
                        onChange={(e) => updateColor(index, 'name', e.target.value)}
                        placeholder="e.g., Black/White"
                      />
                    </div>
                    <div className="w-32">
                      <Label>Hex Color</Label>
                      <Input
                        type="color"
                        value={color.hex}
                        onChange={(e) => updateColor(index, 'hex', e.target.value)}
                        className="h-10"
                      />
                    </div>
                    {formData.colors.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeColor(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addColor}>
                  + Add Color
                </Button>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={saving}
                className="flex-1"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/products')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
