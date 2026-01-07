"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Search, Menu, X } from 'lucide-react'
import { useCart } from '@/lib/cart'
import Link from 'next/link'

export function Header() {
  const { itemCount } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // In a real app, you would navigate to search results
      console.log('Search for:', searchQuery)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-gray-900">
              NIKE
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/nike-store" className="text-gray-700 hover:text-gray-900 font-medium">
                Shop
              </Link>
              <Link href="/collections/running" className="text-gray-700 hover:text-gray-900 font-medium">
                Running
              </Link>
              <Link href="/collections/basketball" className="text-gray-700 hover:text-gray-900 font-medium">
                Basketball
              </Link>
              <Link href="/collections/casual" className="text-gray-700 hover:text-gray-900 font-medium">
                Casual
              </Link>
            </nav>
          </div>

          {/* Search and Cart */}
          <div className="flex items-center gap-4">
            {/* Search - Hidden on mobile */}
            <div className="hidden md:flex items-center">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search shoes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Cart Icon */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4">
              <Link
                href="/nike-store"
                className="text-gray-700 hover:text-gray-900 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/collections/running"
                className="text-gray-700 hover:text-gray-900 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Running
              </Link>
              <Link
                href="/collections/basketball"
                className="text-gray-700 hover:text-gray-900 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Basketball
              </Link>
              <Link
                href="/collections/casual"
                className="text-gray-700 hover:text-gray-900 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Casual
              </Link>
              <div className="mt-4">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search shoes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}