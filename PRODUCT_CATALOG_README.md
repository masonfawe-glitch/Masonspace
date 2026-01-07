# Product Catalog with Filters and Responsive Grid

A comprehensive product catalog system built with Next.js 14, TypeScript, and Tailwind CSS featuring advanced filtering, search, and responsive grid layout.

## Features

### 🎯 Core Features
- **Product Catalog Page** (`/app/shop/page.tsx`) - Complete shopping experience
- **Product Card Component** (`/components/ProductCard.tsx`) - Interactive product display
- **Product Filters** (`/components/ProductFilters.tsx`) - Advanced filtering sidebar
- **Responsive Grid** (`/components/ProductGrid.tsx`) - Paginated product grid

### 🔍 Advanced Filtering
- **Price Range Slider** - Set min/max price with apply button
- **Category Filter** - Multiple categories (running, basketball, casual, etc.)
- **Size Filter** - Checkbox selection for sizes 6-14
- **Color Filter** - Visual color selection with hex codes
- **Collection Filter** - Filter by product collections
- **Availability** - In-stock only and on-sale filters
- **Rating Filter** - Minimum rating selection (1-4+ stars)
- **Sorting Options** - Price, name, rating, newest

### 📱 Responsive Design
- **Desktop** - Full sidebar with filters
- **Mobile** - Collapsible filter overlay
- **Tablet** - Optimized grid layout
- **Breakpoints** - 1/2/3/4 column responsive grid

### 🚀 Performance Features
- **Search Functionality** - Real-time product search
- **URL Parameters** - Shareable filter URLs
- **Pagination** - Efficient page navigation
- **Loading States** - Skeleton loaders
- **Error Handling** - Graceful error states
- **Empty States** - User-friendly no-results messages

## File Structure

```
/app/shop/page.tsx              # Main catalog page
/components/
  ├── ProductCard.tsx           # Individual product display
  ├── ProductFilters.tsx        # Filter sidebar
  ├── ProductGrid.tsx           # Grid layout & pagination
  └── ui/checkbox.tsx           # Custom checkbox component
/lib/
  ├── products.ts               # Product data & search logic
  ├── types.ts                  # TypeScript interfaces
  └── mockData.ts               # Sample product data
```

## Component Details

### ProductCard
```tsx
<ProductCard 
  product={product}
  onProductClick={(p) => handleProductClick(p)}
  showQuickAdd={true}
/>
```
- Interactive color/size selection
- Quick add to cart functionality
- Sale badges and stock indicators
- Rating display
- Hover effects

### ProductFilters
```tsx
<ProductFilters 
  filters={currentFilters}
  onFiltersChange={(f) => setFilters(f)}
/>
```
- Real-time filter updates
- Clear all filters option
- Active filter badges
- Price range slider
- Multi-select checkboxes

### ProductGrid
```tsx
<ProductGrid 
  filters={filters}
  searchQuery={searchQuery}
  itemsPerPage={16}
/>
```
- Paginated results
- Search integration
- Loading skeletons
- Error states
- Empty state handling

## Filter Options

### Available Filters
- **Price Range**: Min/Max price selection
- **Categories**: Running, Basketball, Casual, Training, etc.
- **Sizes**: 6, 7, 8, 9, 10, 11, 12, 13, 14
- **Colors**: Black, White, Red, Blue, Green, Yellow, Purple, Pink, Gray, Brown
- **Collections**: Air Max, Air Jordan, Dri-FIT, etc.
- **Availability**: In stock only, On sale items
- **Rating**: 1+, 2+, 3+, 4+ stars minimum

### Sorting Options
- Default (featured first)
- Price: Low to High / High to Low
- Name: A to Z / Z to A
- Rating: Highest Rated
- Newest First

## Usage Examples

### Basic Shop Page
```tsx
// /app/shop/page.tsx
export default function ShopPage() {
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <form onSubmit={handleSearch}>
        <Input 
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-80 flex-shrink-0">
          <ProductFilters 
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <ProductGrid 
            filters={filters}
            searchQuery={searchQuery}
            itemsPerPage={16}
          />
        </div>
      </div>
    </div>
  );
}
```

### Filter by Category
```tsx
const runningShoes = {
  category: 'running',
  minPrice: 50,
  maxPrice: 200,
  colors: ['Black', 'White'],
  sizes: ['10', '11'],
  inStock: true,
  sortBy: 'price_asc'
};
```

### Search Integration
```tsx
// URL: /shop?search=nike&category=running&minPrice=100
const searchParams = {
  search: 'nike',
  category: 'running',
  minPrice: '100'
};
```

## Styling

### Tailwind Classes Used
- **Grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- **Spacing**: `gap-6`, `space-y-4`, `px-4 py-6`
- **Colors**: `bg-gray-50`, `text-gray-600`, `border-gray-200`
- **Interactive**: `hover:shadow-lg`, `transition-all duration-300`
- **Responsive**: `md:`, `lg:`, `xl:` breakpoints

### Custom Components
- **Badge**: Status indicators for sale, stock, ratings
- **Button**: Primary/secondary variants with sizes
- **Card**: Product containers with shadows
- **Input**: Search and form inputs
- **Checkbox**: Custom styled checkboxes

## API Integration

### Product Functions
```tsx
// Filter products with multiple criteria
const result = filterProducts(filters, page, limit);

// Search with filters
const searchResult = searchProductsWithFilters(query, filters, page, limit);

// Get paginated results
const paginated = {
  products: [],
  total: 154,
  page: 1,
  limit: 20,
  hasNext: true,
  hasPrevious: false
};
```

## Mobile Experience

### Mobile Features
- **Collapsible Filters**: Overlay sidebar on mobile
- **Touch Friendly**: Large tap targets
- **Responsive Grid**: Adapts to screen size
- **Filter Count**: Shows active filter badge
- **Quick Actions**: Easy filter clearing

### Mobile Breakpoints
- **Small**: < 768px (1 column)
- **Medium**: 768px+ (2 columns)
- **Large**: 1024px+ (3 columns)
- **Extra Large**: 1280px+ (4 columns)

## Performance

### Optimization Features
- **Lazy Loading**: Images load on demand
- **Debounced Search**: Prevents excessive API calls
- **Pagination**: Limits DOM elements
- **Memoization**: Prevents unnecessary re-renders
- **Skeleton Loading**: Better perceived performance

## Accessibility

### A11y Features
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels
- **Color Contrast**: WCAG compliant colors
- **Focus States**: Visible focus indicators
- **Alternative Text**: Image descriptions

## Testing

### Manual Testing Checklist
- [ ] Filter combinations work correctly
- [ ] Search finds relevant products
- [ ] Pagination functions properly
- [ ] Mobile responsive design
- [ ] Loading states display correctly
- [ ] Error states handled gracefully
- [ ] Empty states are informative
- [ ] URL parameters sync correctly
- [ ] Performance is acceptable
- [ ] Accessibility standards met

## Future Enhancements

### Planned Features
- **Infinite Scroll**: Alternative to pagination
- **Advanced Search**: Auto-complete suggestions
- **Favorites**: Wishlist functionality
- **Compare**: Product comparison tool
- **Filters**: Save filter presets
- **Analytics**: Search and filter tracking
- **Real API**: Integration with live product data
- **SEO**: Server-side rendering optimization

## Dependencies

### Core Dependencies
- **Next.js 14**: React framework
- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling framework
- **Radix UI**: Accessible components

### Key Libraries
- `@radix-ui/react-slot`: Button component utility
- `class-variance-authority`: Variant management
- `clsx`: Conditional class names
- `tailwind-merge`: Tailwind class merging

This product catalog system provides a solid foundation for e-commerce applications with comprehensive filtering, search, and responsive design capabilities.