import { Header } from '@/components/Header'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-80"></div>

        {/* Hero Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1920&h=1080&fit=crop)',
            filter: 'blur(2px)',
            transform: 'scale(1.1)'
          }}
        ></div>

        {/* Hero Content */}
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Your Game. Your Gear.
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Elevate your performance with the latest Nike innovation
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-gray-100" asChild>
            <Link href="/nike-store">
              Shop Now
            </Link>
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Collection Showcases */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Shop by Collection
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Running Collection */}
            <div className="relative group overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-600 opacity-70"></div>
              <img
                src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800"
                alt="Running shoes"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-4">Running</h3>
                  <Button variant="outline" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
                    <Link href="/collections/running">
                      Shop Running
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Basketball Collection */}
            <div className="relative group overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-red-600 opacity-70"></div>
              <img
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800"
                alt="Basketball shoes"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-4">Basketball</h3>
                  <Button variant="outline" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
                    <Link href="/collections/basketball">
                      Shop Basketball
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Casual Collection */}
            <div className="relative group overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-600 opacity-70"></div>
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
                alt="Casual shoes"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-4">Casual</h3>
                  <Button variant="outline" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
                    <Link href="/collections/casual">
                      Shop Casual
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}