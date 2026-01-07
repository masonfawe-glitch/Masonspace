import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from '@/lib/cart'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nike Store - Premium Shoes & Gear",
  description: "Shop the latest Nike shoes and athletic gear for running, basketball, and casual wear",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
