import { Product, ProductCategory, Review } from './types';

// Mock data for Nike-level shoe store
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Air Max 270 React',
    description: 'The Nike Air Max 270 React brings the comfort of React foam to the iconic Air Max 270 silhouette. Experience all-day comfort with a full-length React foam midsole and large-volume Max Air unit.',
    price: 159.99,
    originalPrice: 179.99,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800'
    ],
    spline3dModelUrl: 'https://my.spline.design/uncopyedeign-b3b84a83a9c5d3f6a8c7c8d9e0f1g2h3',
    sizes: [
      { value: '7', display: '7', available: true },
      { value: '8', display: '8', available: true },
      { value: '9', display: '9', available: true },
      { value: '10', display: '10', available: true },
      { value: '11', display: '11', available: false },
      { value: '12', display: '12', available: true }
    ],
    colors: [
      { name: 'Black/White', hex: '#000000', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
      { name: 'University Blue', hex: '#0033A0', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' },
      { name: 'Triple White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400' }
    ],
    stock: 150,
    category: ProductCategory.RUNNING,
    collection: 'Air Max',
    rating: 4.5,
    reviews: [
      {
        id: 'r1',
        productId: '1',
        userId: 'u1',
        userName: 'Mike Johnson',
        rating: 5,
        title: 'Amazing comfort!',
        comment: 'These shoes are incredibly comfortable for daily wear. The React foam really makes a difference.',
        verified: true,
        createdAt: new Date('2024-01-15'),
        helpful: 12
      },
      {
        id: 'r2',
        productId: '1',
        userId: 'u2',
        userName: 'Sarah Chen',
        rating: 4,
        title: 'Great shoes but runs small',
        comment: 'Love the style and comfort, but I had to size up. Otherwise excellent quality.',
        verified: true,
        createdAt: new Date('2024-01-20'),
        helpful: 8
      }
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    name: 'Air Jordan 1 Retro High',
    description: 'The Air Jordan 1 Retro High brings you the classic basketball shoe that started it all. Premium leather upper with iconic colorways and the legendary Jordan branding.',
    price: 199.99,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800'
    ],
    spline3dModelUrl: 'https://my.spline.design/uncopyedeign-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5',
    sizes: [
      { value: '7', display: '7', available: true },
      { value: '8', display: '8', available: true },
      { value: '9', display: '9', available: true },
      { value: '10', display: '10', available: true },
      { value: '11', display: '11', available: true },
      { value: '12', display: '12', available: false }
    ],
    colors: [
      { name: 'Bred', hex: '#000000', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
      { name: 'Chicago', hex: '#DC143C', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400' },
      { name: 'Royal Blue', hex: '#0033A0', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400' }
    ],
    stock: 89,
    category: ProductCategory.BASKETBALL,
    collection: 'Air Jordan',
    rating: 4.8,
    reviews: [
      {
        id: 'r3',
        productId: '2',
        userId: 'u3',
        userName: 'BasketballFan92',
        rating: 5,
        title: 'Iconic!',
        comment: 'These are classics for a reason. Great quality and style that never goes out of fashion.',
        verified: true,
        createdAt: new Date('2024-01-10'),
        helpful: 25
      }
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '3',
    name: 'React Infinity Run Flyknit',
    description: 'Nike React Infinity Run Flyknit features 270 degrees of foam support underfoot to help keep you comfortable as you clock kays. Designed for daily training.',
    price: 149.99,
    originalPrice: 159.99,
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800'
    ],
    spline3dModelUrl: 'https://my.spline.design/uncopyedeign-f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2',
    sizes: [
      { value: '6', display: '6', available: true },
      { value: '7', display: '7', available: true },
      { value: '8', display: '8', available: true },
      { value: '9', display: '9', available: false },
      { value: '10', display: '10', available: true },
      { value: '11', display: '11', available: true }
    ],
    colors: [
      { name: 'Black/White', hex: '#000000', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400' },
      { name: 'Ocean', hex: '#006994', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
      { name: 'Volt', hex: '#FFFF00', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' }
    ],
    stock: 76,
    category: ProductCategory.RUNNING,
    collection: 'React',
    rating: 4.3,
    reviews: [
      {
        id: 'r4',
        productId: '3',
        userId: 'u4',
        userName: 'Runner4Life',
        rating: 4,
        title: 'Great for marathon training',
        comment: 'Perfect for long runs. The React foam provides excellent cushioning.',
        verified: true,
        createdAt: new Date('2024-01-12'),
        helpful: 15
      }
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: '4',
    name: 'Dunk Low Retro',
    description: 'The Nike Dunk Low Retro brings back the old-school college basketball look with crisp leather overlays and retro colorways. Perfect for casual wear.',
    price: 119.99,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800'
    ],
    spline3dModelUrl: 'https://my.spline.design/uncopyedeign-u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9',
    sizes: [
      { value: '5', display: '5', available: true },
      { value: '6', display: '6', available: true },
      { value: '7', display: '7', available: true },
      { value: '8', display: '8', available: true },
      { value: '9', display: '9', available: true },
      { value: '10', display: '10', available: true }
    ],
    colors: [
      { name: 'Panda', hex: '#000000', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
      { name: 'Syracuse', hex: '#FF6600', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400' },
      { name: 'Kentucky', hex: '#0033A0', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400' }
    ],
    stock: 134,
    category: ProductCategory.CASUAL,
    collection: 'Dunk',
    rating: 4.6,
    reviews: [
      {
        id: 'r5',
        productId: '4',
        userId: 'u5',
        userName: 'Sneakerhead23',
        rating: 5,
        title: 'Perfect everyday shoe',
        comment: 'Love the retro style and comfort. Great value for the price.',
        verified: true,
        createdAt: new Date('2024-01-14'),
        helpful: 18
      }
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-19')
  },
  {
    id: '5',
    name: 'LeBron XX',
    description: 'The LeBron XX basketball shoes are built for king-sized performance. Featuring Max Air cushioning and responsive foam for explosive plays on the court.',
    price: 249.99,
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'
    ],
    spline3dModelUrl: 'https://my.spline.design/uncopyedeign-m0n1o2p3q4r5s6t7u8v9w0x1y2z3a4b5c6d7',
    sizes: [
      { value: '7', display: '7', available: true },
      { value: '8', display: '8', available: true },
      { value: '9', display: '9', available: true },
      { value: '10', display: '10', available: false },
      { value: '11', display: '11', available: true },
      { value: '12', display: '12', available: true }
    ],
    colors: [
      { name: 'Purple', hex: '#6B46C1', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' },
      { name: 'Black/Gold', hex: '#000000', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400' },
      { name: 'Lakers Yellow', hex: '#FFD700', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' }
    ],
    stock: 45,
    category: ProductCategory.BASKETBALL,
    collection: 'LeBron',
    rating: 4.7,
    reviews: [
      {
        id: 'r6',
        productId: '5',
        userId: 'u6',
        userName: 'HooperPro',
        rating: 5,
        title: 'Elite performance',
        comment: 'Best basketball shoes I\'ve played in. Great ankle support and cushioning.',
        verified: true,
        createdAt: new Date('2024-01-11'),
        helpful: 22
      }
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-17')
  },
  {
    id: '6',
    name: 'Air Force 1 \'07',
    description: 'The Nike Air Force 1 \'07 brings back the classic basketball shoe with premium leather and the iconic Air-Sole unit. A timeless streetwear staple.',
    price: 109.99,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800'
    ],
    spline3dModelUrl: 'https://my.spline.design/uncopyedeign-e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4',
    sizes: [
      { value: '6', display: '6', available: true },
      { value: '7', display: '7', available: true },
      { value: '8', display: '8', available: true },
      { value: '9', display: '9', available: true },
      { value: '10', display: '10', available: true },
      { value: '11', display: '11', available: true },
      { value: '12', display: '12', available: true }
    ],
    colors: [
      { name: 'Triple White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
      { name: 'Triple Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400' },
      { name: 'Black/White', hex: '#333333', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400' }
    ],
    stock: 198,
    category: ProductCategory.CASUAL,
    collection: 'Air Force',
    rating: 4.4,
    reviews: [
      {
        id: 'r7',
        productId: '6',
        userId: 'u7',
        userName: 'ClassicSneakerFan',
        rating: 4,
        title: 'Timeless style',
        comment: 'Can\'t go wrong with AF1s. Comfortable and stylish for everyday wear.',
        verified: true,
        createdAt: new Date('2024-01-13'),
        helpful: 31
      }
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-21')
  },
  {
    id: '7',
    name: 'Pegasus 40',
    description: 'Nike Pegasus 40 road running shoes feature a breathable mesh upper and responsive cushioning. Your trusted partner for daily runs.',
    price: 139.99,
    originalPrice: 149.99,
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800'
    ],
    spline3dModelUrl: 'https://my.spline.design/uncopyedeign-v5w6x7y8z9a0b1c2d3e4f5g6h7i8j9k0l1',
    sizes: [
      { value: '6', display: '6', available: true },
      { value: '7', display: '7', available: true },
      { value: '8', display: '8', available: false },
      { value: '9', display: '9', available: true },
      { value: '10', display: '10', available: true },
      { value: '11', display: '11', available: true }
    ],
    colors: [
      { name: 'Blue/White', hex: '#0033A0', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400' },
      { name: 'Black/Volt', hex: '#000000', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
      { name: 'Grey/Orange', hex: '#808080', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' }
    ],
    stock: 112,
    category: ProductCategory.RUNNING,
    collection: 'Pegasus',
    rating: 4.5,
    reviews: [
      {
        id: 'r8',
        productId: '7',
        userId: 'u8',
        userName: 'DailyRunner',
        rating: 5,
        title: 'Reliable daily trainer',
        comment: 'Perfect for my daily 5k runs. Comfortable and durable.',
        verified: true,
        createdAt: new Date('2024-01-09'),
        helpful: 14
      }
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '8',
    name: 'SB Dunk Low Pro',
    description: 'Nike SB Dunk Low Pro combines classic Dunk style with skate-specific performance. Padded collar and Zoom Air unit for boardfeel and impact protection.',
    price: 119.99,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'
    ],
    spline3dModelUrl: 'https://my.spline.design/uncopyedeign-m2n3o4p5q6r7s8t9u0v1w2x3y4z5a6b7c8d9',
    sizes: [
      { value: '7', display: '7', available: true },
      { value: '8', display: '8', available: true },
      { value: '9', display: '9', available: true },
      { value: '10', display: '10', available: true },
      { value: '11', display: '11', available: false },
      { value: '12', display: '12', available: true }
    ],
    colors: [
      { name: 'Pine Green', hex: '#228B22', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400' },
      { name: 'Blue/White', hex: '#0033A0', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400' },
      { name: 'Purple/Black', hex: '#800080', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' }
    ],
    stock: 67,
    category: ProductCategory.SKATEBOARDING,
    collection: 'SB',
    rating: 4.2,
    reviews: [
      {
        id: 'r9',
        productId: '8',
        userId: 'u9',
        userName: 'SkateLife',
        rating: 4,
        title: 'Great for skating',
        comment: 'Perfect grip and boardfeel. Love the style too.',
        verified: true,
        createdAt: new Date('2024-01-08'),
        helpful: 11
      }
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-14')
  },
  {
    id: '9',
    name: 'Blazer Mid \'77',
    description: 'Nike Blazer Mid \'77 brings vintage basketball style to modern streetwear. Classic leather upper with comfortable padding and timeless design.',
    price: 99.99,
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800'
    ],
    spline3dModelUrl: 'https://my.spline.design/uncopyedeign-e0f1g2h3i4j5k6l7m8n9o0p1q2r3s4t5u6',
    sizes: [
      { value: '6', display: '6', available: true },
      { value: '7', display: '7', available: false },
      { value: '8', display: '8', available: true },
      { value: '9', display: '9', available: true },
      { value: '10', display: '10', available: true },
      { value: '11', display: '11', available: true }
    ],
    colors: [
      { name: 'Vintage Green', hex: '#228B22', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400' },
      { name: 'Vintage Red', hex: '#DC143C', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
      { name: 'White/Black', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' }
    ],
    stock: 93,
    category: ProductCategory.CASUAL,
    collection: 'Blazer',
    rating: 4.3,
    reviews: [
      {
        id: 'r10',
        productId: '9',
        userId: 'u10',
        userName: 'VintageVibes',
        rating: 4,
        title: 'Love the retro look',
        comment: 'Great vintage style. Comfortable for all-day wear.',
        verified: true,
        createdAt: new Date('2024-01-07'),
        helpful: 9
      }
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-13')
  },
  {
    id: '10',
    name: 'Air Zoom Pegasus 39',
    description: 'Nike Air Zoom Pegasus 39 road running shoes feature responsive cushioning and a lightweight mesh upper. Built for everyday training runs.',
    price: 149.99,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800'
    ],
    spline3dModelUrl: 'https://my.spline.design/uncopyedeign-v7w8x9y0z1a2b3c4d5e6f7g8h9i0j1k2l3',
    sizes: [
      { value: '5', display: '5', available: true },
      { value: '6', display: '6', available: true },
      { value: '7', display: '7', available: true },
      { value: '8', display: '8', available: true },
      { value: '9', display: '9', available: true },
      { value: '10', display: '10', available: false }
    ],
    colors: [
      { name: 'Black/White', hex: '#000000', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
      { name: 'Blue/White', hex: '#0033A0', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400' },
      { name: 'Grey/Volt', hex: '#808080', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' }
    ],
    stock: 87,
    category: ProductCategory.RUNNING,
    collection: 'Pegasus',
    rating: 4.6,
    reviews: [
      {
        id: 'r11',
        productId: '10',
        userId: 'u11',
        userName: 'MarathonRunner',
        rating: 5,
        title: 'Excellent for long runs',
        comment: 'Great cushioning and durability. My go-to shoe for marathons.',
        verified: true,
        createdAt: new Date('2024-01-06'),
        helpful: 20
      }
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: '11',
    name: 'Nike GT Run',
    description: 'Nike GT Run basketball shoes are designed for explosive court performance. Featuring advanced cushioning and lockdown support for quick cuts and jumps.',
    price: 179.99,
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800'
    ],
    spline3dModelUrl: 'https://my.spline.design/uncopyedeign-m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d',
    sizes: [
      { value: '7', display: '7', available: true },
      { value: '8', display: '8', available: true },
      { value: '9', display: '9', available: true },
      { value: '10', display: '10', available: true },
      { value: '11', display: '11', available: true },
      { value: '12', display: '12', available: true }
    ],
    colors: [
      { name: 'Blue/White', hex: '#0033A0', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' },
      { name: 'Red/Black', hex: '#DC143C', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
      { name: 'Green/White', hex: '#228B22', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400' }
    ],
    stock: 56,
    category: ProductCategory.BASKETBALL,
    collection: 'GT',
    rating: 4.4,
    reviews: [
      {
        id: 'r12',
        productId: '11',
        userId: 'u12',
        userName: 'CourtWarrior',
        rating: 4,
        title: 'Great for indoor courts',
        comment: 'Excellent grip and support. Perfect for my weekly games.',
        verified: true,
        createdAt: new Date('2024-01-05'),
        helpful: 16
      }
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-11')
  },
  {
    id: '12',
    name: 'Air Max 90',
    description: 'Nike Air Max 90 brings retro running style to modern comfort. Features the iconic Max Air unit and classic design elements that made it legendary.',
    price: 129.99,
    originalPrice: 139.99,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'
    ],
    spline3dModelUrl: 'https://my.spline.design/uncopyedeign-e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7',
    sizes: [
      { value: '6', display: '6', available: true },
      { value: '7', display: '7', available: true },
      { value: '8', display: '8', available: true },
      { value: '9', display: '9', available: false },
      { value: '10', display: '10', available: true },
      { value: '11', display: '11', available: true },
      { value: '12', display: '12', available: true }
    ],
    colors: [
      { name: 'Triple White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400' },
      { name: 'Triple Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400' },
      { name: 'Infrared', hex: '#FF0000', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' }
    ],
    stock: 125,
    category: ProductCategory.CASUAL,
    collection: 'Air Max',
    rating: 4.7,
    reviews: [
      {
        id: 'r13',
        productId: '12',
        userId: 'u13',
        userName: 'RetroLover',
        rating: 5,
        title: 'Classic comfort',
        comment: 'Still one of the most comfortable shoes after all these years.',
        verified: true,
        createdAt: new Date('2024-01-04'),
        helpful: 28
      }
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '13',
    name: 'Mercurial Vapor 15',
    description: 'Nike Mercurial Vapor 15 football shoes feature lightweight materials and excellent traction for explosive speed on firm ground surfaces.',
    price: 199.99,
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800'
    ],
    spline3dModelUrl: 'https://my.spline.design/uncopyedeign-v8w9x0y1z2a3b4c5d6e7f8g9h0i1j2k3l4m5',
    sizes: [
      { value: '6', display: '6', available: true },
      { value: '7', display: '7', available: true },
      { value: '8', display: '8', available: true },
      { value: '9', display: '9', available: true },
      { value: '10', display: '10', available: true },
      { value: '11', display: '11', available: false },
      { value: '12', display: '12', available: true }
    ],
    colors: [
      { name: 'Volt/Black', hex: '#FFFF00', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400' },
      { name: 'Royal Blue', hex: '#0033A0', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
      { name: 'Crimson', hex: '#DC143C', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' }
    ],
    stock: 73,
    category: ProductCategory.FOOTBALL,
    collection: 'Mercurial',
    rating: 4.5,
    reviews: [
      {
        id: 'r14',
        productId: '13',
        userId: 'u14',
        userName: 'SoccerPro',
        rating: 5,
        title: 'Lightning fast',
        comment: 'Amazing speed and traction. Perfect for my game.',
        verified: true,
        createdAt: new Date('2024-01-03'),
        helpful: 19
      }
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-09')
  },
  {
    id: '14',
    name: 'Court Vision Low',
    description: 'Nike Court Vision Low brings classic basketball heritage to modern street style. Leather and synthetic upper with traditional basketball shoe details.',
    price: 89.99,
    originalPrice: 99.99,
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800'
    ],
    spline3dModelUrl: 'https://my.spline.design/uncopyedeign-n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2',
    sizes: [
      { value: '5', display: '5', available: true },
      { value: '6', display: '6', available: true },
      { value: '7', display: '7', available: true },
      { value: '8', display: '8', available: true },
      { value: '9', display: '9', available: true },
      { value: '10', display: '10', available: true },
      { value: '11', display: '11', available: true },
      { value: '12', display: '12', available: false }
    ],
    colors: [
      { name: 'White/Black', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400' },
      { name: 'Black/White', hex: '#000000', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
      { name: 'Navy/White', hex: '#001F3F', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' }
    ],
    stock: 156,
    category: ProductCategory.CASUAL,
    collection: 'Court',
    rating: 4.1,
    reviews: [
      {
        id: 'r15',
        productId: '14',
        userId: 'u15',
        userName: 'StreetStyle',
        rating: 4,
        title: 'Great value',
        comment: 'Love the retro basketball style at an affordable price.',
        verified: true,
        createdAt: new Date('2024-01-02'),
        helpful: 13
      }
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-08')
  },
  {
    id: '15',
    name: 'Air Zoom Winflo 9',
    description: 'Nike Air Zoom Winflo 9 road running shoes offer responsive cushioning and breathable mesh upper. Perfect for daily training and tempo runs.',
    price: 129.99,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800'
    ],
    spline3dModelUrl: 'https://my.spline.design/uncopyedeign-e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v',
    sizes: [
      { value: '6', display: '6', available: true },
      { value: '7', display: '7', available: false },
      { value: '8', display: '8', available: true },
      { value: '9', display: '9', available: true },
      { value: '10', display: '10', available: true },
      { value: '11', display: '11', available: true }
    ],
    colors: [
      { name: 'Grey/White', hex: '#808080', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
      { name: 'Black/White', hex: '#000000', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400' },
      { name: 'Blue/White', hex: '#0033A0', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400' }
    ],
    stock: 98,
    category: ProductCategory.RUNNING,
    collection: 'Winflo',
    rating: 4.3,
    reviews: [
      {
        id: 'r16',
        productId: '15',
        userId: 'u16',
        userName: 'TempoRunner',
        rating: 4,
        title: 'Great for tempo runs',
        comment: 'Good balance of comfort and responsiveness for faster runs.',
        verified: true,
        createdAt: new Date('2024-01-01'),
        helpful: 10
      }
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-07')
  }
];

// Additional mock data for cart items, orders, etc.
export const mockUsers = [
  {
    id: 'u1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1-555-0123',
    addresses: [
      {
        firstName: 'John',
        lastName: 'Doe',
        address1: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        phone: '+1-555-0123'
      }
    ],
    paymentMethods: [
      {
        id: 'pm1',
        type: 'credit_card' as const,
        last4: '1234',
        brand: 'Visa',
        expiryMonth: 12,
        expiryYear: 2025
      }
    ],
    orders: ['ord1'],
    wishlist: ['1', '2'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  }
];

export const mockOrders = [
  {
    id: 'ord1',
    userId: 'u1',
    items: [
      {
        id: 'oi1',
        productId: '1',
        variantId: 'v1',
        quantity: 1,
        price: 159.99
      }
    ],
    status: 'delivered' as const,
    totalAmount: 159.99,
    subtotal: 159.99,
    tax: 12.80,
    shipping: 8.99,
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      phone: '+1-555-0123'
    },
    billingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      phone: '+1-555-0123'
    },
    paymentMethod: {
      id: 'pm1',
      type: 'credit_card' as const,
      last4: '1234',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2025
    },
    trackingNumber: 'TRK123456789',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15')
  }
];

export const mockCartItems = [
  {
    id: 'cart1',
    productId: '1',
    variantId: 'v1',
    quantity: 1,
    addedAt: new Date('2024-01-20')
  },
  {
    id: 'cart2',
    productId: '4',
    variantId: 'v2',
    quantity: 2,
    addedAt: new Date('2024-01-19')
  }
];