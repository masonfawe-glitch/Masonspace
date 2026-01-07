import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">NIKE</h3>
            <p className="text-gray-400 text-sm">
              Bring inspiration and innovation to every athlete in the world.
            </p>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-300">Help</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help/order-status" className="text-gray-400 hover:text-white text-sm">
                  Order Status
                </Link>
              </li>
              <li>
                <Link href="/help/shipping" className="text-gray-400 hover:text-white text-sm">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/help/returns" className="text-gray-400 hover:text-white text-sm">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/help/payment" className="text-gray-400 hover:text-white text-sm">
                  Payment Options
                </Link>
              </li>
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-300">About</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about/story" className="text-gray-400 hover:text-white text-sm">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/about/careers" className="text-gray-400 hover:text-white text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/about/sustainability" className="text-gray-400 hover:text-white text-sm">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/about/news" className="text-gray-400 hover:text-white text-sm">
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Collections Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-300">Collections</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/collections/running" className="text-gray-400 hover:text-white text-sm">
                  Running
                </Link>
              </li>
              <li>
                <Link href="/collections/basketball" className="text-gray-400 hover:text-white text-sm">
                  Basketball
                </Link>
              </li>
              <li>
                <Link href="/collections/casual" className="text-gray-400 hover:text-white text-sm">
                  Casual
                </Link>
              </li>
              <li>
                <Link href="/collections/training" className="text-gray-400 hover:text-white text-sm">
                  Training
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h4 className="font-semibold mb-2">Join Our Newsletter</h4>
              <p className="text-gray-400 text-sm">
                Get updates on new releases, special offers, and more.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white w-full md:w-64"
              />
              <button className="px-6 py-2 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-4 mb-4 md:mb-0">
            <Link href="https://facebook.com" className="text-gray-400 hover:text-white">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="https://twitter.com" className="text-gray-400 hover:text-white">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="https://instagram.com" className="text-gray-400 hover:text-white">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="https://youtube.com" className="text-gray-400 hover:text-white">
              <Youtube className="w-5 h-5" />
            </Link>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Nike, Inc. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}