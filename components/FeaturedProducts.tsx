"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ProductCard } from '@/components/ProductGrid'
import { Product } from '@/lib/types'
import { getFeaturedProducts } from '@/lib/products'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts(6)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Featured Shoes</h2>
          <Button variant="outline" asChild>
            <Link href="/nike-store">
              Shop All
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <ProductCard
                product={product}
                onProductClick={(p) => {
                  // In a real app, you might open a modal or navigate to product detail
                  console.log('Product clicked:', p.name)
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}