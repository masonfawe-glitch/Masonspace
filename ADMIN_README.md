# Admin Dashboard

A comprehensive admin dashboard for managing products, orders, and viewing analytics for the Masonspace Nike Store.

## Features

### 1. Dashboard (`/admin`)
- **Overview Cards**: Total revenue, orders, products, and average order value
- **Sales Trend Chart**: Visual representation of sales over the last 7 days
- **Order Status Distribution**: Breakdown of orders by status
- **Recent Orders Table**: Quick view of the 5 most recent orders

### 2. Products Management (`/admin/products`)
- **Product List**: View all products in a paginated table (20 per page)
- **Search**: Search products by name or description
- **Filter**: Filter by category
- **Stock Indicators**: Visual indicators for low stock and out-of-stock items
- **Actions**: Edit or delete products

### 3. Product Edit (`/admin/products/[id]/edit`)
- Edit all product details:
  - Basic information (name, description, price, stock)
  - Images (add/remove multiple images)
  - Sizes (add/remove with availability toggle)
  - Colors (add/remove with hex color picker)
  - Category and collection
  - Spline 3D model URL
  - Rating
- Form validation to ensure data integrity
- Success notification on save

### 4. Product Creation (`/admin/products/new`)
- Same form as edit page
- Create new products from scratch
- Automatic redirect to products list after creation

### 5. Orders Management (`/admin/orders`)
- **Orders Table**: View all orders with customer and order details
- **Search**: Search by order ID or customer name
- **Filter**: Filter orders by status
- **Status Update**: Change order status (pending, processing, shipped, delivered)
- **Order Details**: Click on "items" to expand and view:
  - Product details with images
  - Shipping address
  - Tracking number
  - Order totals breakdown

## Authentication

### Login Credentials
- **URL**: `/admin/login`
- **Username**: `admin`
- **Password**: `admin123`

### Security Features
- Protected routes (unauthorized users redirected to login)
- Session persistence using localStorage
- Logout functionality

## Getting Started

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Access the admin panel**:
   - Navigate to `http://localhost:3000/admin/login`
   - Enter credentials: admin / admin123

3. **Explore the dashboard**:
   - View analytics and metrics
   - Manage products
   - Process orders

## Data Management

The admin dashboard uses mock data stored in:
- `/lib/mockData.ts` - Product data
- `/lib/orders.ts` - Order data

### CRUD Operations

**Products**:
- Create: `/lib/adminProducts.ts` - `createProduct()`
- Read: `/lib/products.ts` - `getAllProducts()`, `getProductById()`
- Update: `/lib/adminProducts.ts` - `updateProduct()`
- Delete: `/lib/adminProducts.ts` - `deleteProduct()`

**Orders**:
- Read: `/lib/orders.ts` - `getAllOrders()`, `getOrderById()`
- Update Status: `/lib/orders.ts` - `updateOrderStatus()`
- Search: `/lib/orders.ts` - `searchOrders()`

## Form Validation

Product forms validate:
- Required fields (name, description, price)
- Price must be greater than 0
- Original price must be greater than current price (for sales)
- At least one image required
- At least one size required
- At least one color required
- Stock must be non-negative
- Rating must be between 0 and 5

## Mobile Responsive

The admin dashboard is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Authentication**: localStorage-based session

## File Structure

```
/app/admin/
├── layout.tsx              # Auth provider wrapper
├── login/page.tsx          # Login page
├── page.tsx                # Dashboard
├── products/
│   ├── page.tsx            # Products list
│   ├── new/page.tsx        # Create product
│   └── [id]/edit/page.tsx  # Edit product
└── orders/page.tsx         # Orders management

/lib/
├── adminAuth.tsx           # Authentication context
├── adminProducts.ts        # Product CRUD operations
└── orders.ts               # Order management

/components/
└── AdminNav.tsx            # Admin navigation sidebar
```

## Future Enhancements

Potential additions for production use:
- Real backend API integration
- JWT-based authentication
- Role-based access control
- Product image upload
- Bulk operations
- Advanced analytics and reporting
- Export data (CSV, PDF)
- Email notifications
- Order tracking integration
- Inventory alerts
