import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiTruck, FiPhone, FiStar } from 'react-icons/fi'
import { products, testimonials, CATEGORIES } from '../data/products'
import ProductCard from '../components/products/ProductCard'
import { formatPrice } from '../utils/helpers'

export default function HomePage() {
  const featured = products.filter(p => p.isFeatured).slice(0, 4)
  const bestsellers = products.filter(p => p.isBestseller)

  return (
    <div>
      <HeroSection />
      <TrustBar />
      <FeaturedSection products={featured} />
      <CategoryBanner />
      <BestsellerSection products={bestsellers} />
      <CustomOrderBanner />
      <TestimonialsSection />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-sage-50 via-cream to-bloom-50">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-petal-100 rounded-full blur-3xl opacity-40 animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-sage-100 rounded-full blur-3xl opacity-40 animate-float" style={{ animationDelay: '-3s' }} />

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Text */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 bg-white/80 border border-sage-200 text-sage-600 text-sm font-body px-4 py-2 rounded-full mb-6 shadow-sm">
            🌸 Fresh flowers, delivered same day
          </span>
          
          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold text-dark leading-[0.9] mb-6">
            Flowers
            <br />
            <em className="text-sage-600 font-normal">that speak</em>
            <br />
            for you
          </h1>
          
          <p className="font-body text-sage-600 text-lg sm:text-xl max-w-md leading-relaxed mb-8">
            From a single rose to a full wedding ceremony — we create floral moments that last a lifetime.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-sage-700 hover:bg-sage-800 text-white font-body font-medium px-8 py-4 rounded-full transition-all hover:gap-3 hover:shadow-lg"
            >
              Shop Now <FiArrowRight size={18} />
            </Link>
            <Link
              to="/custom"
              className="inline-flex items-center gap-2 bg-white hover:bg-bloom-50 text-dark font-body font-medium px-8 py-4 rounded-full border border-sage-200 transition-all hover:border-bloom-300"
            >
              Custom Order
            </Link>
          </div>
        </div>

        {/* Floral composition */}
        <div className="relative flex items-center justify-center">
          <div className="relative">
            {/* Main big flower */}
            <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-petal-100 via-bloom-50 to-sage-100 flex items-center justify-center shadow-2xl">
              <span className="text-[160px] lg:text-[190px] animate-float">🌹</span>
            </div>
            
            {/* Floating smaller cards */}
            <div className="absolute -top-8 -left-8 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3 animate-float" style={{ animationDelay: '-1s' }}>
              <span className="text-3xl">🌸</span>
              <div>
                <p className="font-display text-sm font-semibold">Spring Mix</p>
                <p className="text-xs text-sage-400 font-body">{formatPrice(3200)}</p>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3 animate-float" style={{ animationDelay: '-2s' }}>
              <span className="text-3xl">🌻</span>
              <div>
                <p className="font-display text-sm font-semibold">Sunflowers</p>
                <p className="text-xs text-sage-400 font-body">{formatPrice(2800)}</p>
              </div>
            </div>

            <div className="absolute top-1/2 -right-12 bg-sage-700 text-white rounded-2xl shadow-lg p-3 animate-float" style={{ animationDelay: '-4s' }}>
              <p className="font-body text-xs font-medium">Same-day delivery</p>
              <p className="font-body text-xs text-sage-300">Order before 14:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-sage-400">
        <p className="text-xs font-body tracking-widest uppercase">Scroll</p>
        <div className="w-px h-10 bg-gradient-to-b from-sage-400 to-transparent animate-pulse" />
      </div>
    </section>
  )
}

function TrustBar() {
  const items = [
    { icon: '🌱', title: 'Fresh Flowers', desc: 'Sourced daily from local growers' },
    { icon: '🚚', title: 'Fast Delivery', desc: 'Same-day delivery in Tashkent' },
    { icon: '✨', title: 'Custom Made', desc: 'Tailored to your vision' },
    { icon: '📞', title: '24/7 Support', desc: 'We\'re always here to help' },
  ]

  return (
    <section className="bg-sage-700 text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(item => (
            <div key={item.title} className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-body font-semibold text-sm">{item.title}</p>
                <p className="text-sage-300 text-xs font-body">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedSection({ products }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-bloom-500 font-body text-sm font-medium uppercase tracking-widest mb-2">
            — Featured
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold">
            Today's Picks
          </h2>
        </div>
        <Link
          to="/shop"
          className="hidden sm:flex items-center gap-2 text-sage-600 hover:text-bloom-500 font-body text-sm font-medium transition-colors"
        >
          View all <FiArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

function CategoryBanner() {
  const categories = [
    { name: 'Bouquets', emoji: '💐', desc: 'Ready-made arrangements', color: 'from-petal-100 to-pink-50', to: '/shop?category=Bouquets' },
    { name: 'Wedding', emoji: '👰', desc: 'For your special day', color: 'from-sage-100 to-green-50', to: '/shop?category=Wedding' },
    { name: 'Custom Order', emoji: '✨', desc: 'Made just for you', color: 'from-bloom-100 to-orange-50', to: '/custom' },
  ]

  return (
    <section className="max-w-7xl mx-auto px-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {categories.map(cat => (
          <Link
            key={cat.name}
            to={cat.to}
            className={`relative overflow-hidden bg-gradient-to-br ${cat.color} rounded-3xl p-8 group hover:shadow-lg transition-all`}
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">
              {cat.emoji}
            </div>
            <h3 className="font-display text-2xl font-bold text-dark mb-1">{cat.name}</h3>
            <p className="font-body text-sage-500 text-sm">{cat.desc}</p>
            <FiArrowRight
              size={20}
              className="absolute bottom-6 right-6 text-sage-400 group-hover:text-bloom-500 group-hover:translate-x-1 transition-all"
            />
          </Link>
        ))}
      </div>
    </section>
  )
}

function BestsellerSection({ products }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-10">
        <p className="text-bloom-500 font-body text-sm font-medium uppercase tracking-widest mb-2">
          — Most Loved
        </p>
        <h2 className="font-display text-4xl sm:text-5xl font-bold">Bestsellers</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

function CustomOrderBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-4">
      <div className="bg-sage-800 rounded-3xl p-10 sm:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 overflow-hidden relative">
        {/* Background decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 text-[300px] flex items-center justify-center overflow-hidden select-none pointer-events-none">
          🌸
        </div>

        <div className="relative">
          <p className="text-sage-300 font-body text-sm uppercase tracking-widest mb-3">
            Can't find what you're looking for?
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-white font-bold mb-4">
            Let's create it<br />
            <em className="text-bloom-300">together</em>
          </h2>
          <p className="font-body text-sage-300 max-w-lg leading-relaxed">
            Tell us your vision, occasion, and budget. Our florists will design something beautiful just for you — from a unique bouquet to full event decor.
          </p>
        </div>

        <div className="relative shrink-0 flex flex-col gap-3">
          <Link
            to="/custom"
            className="inline-flex items-center gap-2 bg-white text-sage-800 font-body font-semibold px-8 py-4 rounded-full hover:bg-bloom-50 transition-colors whitespace-nowrap"
          >
            Start Custom Order <FiArrowRight size={18} />
          </Link>
          <a
            href="tel:+998901234567"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white font-body text-sm justify-center transition-colors"
          >
            <FiPhone size={15} />
            Or call us: +998 90 123 45 67
          </a>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <p className="text-bloom-500 font-body text-sm font-medium uppercase tracking-widest mb-2">
          — Reviews
        </p>
        <h2 className="font-display text-4xl sm:text-5xl font-bold">What customers say</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map(t => (
          <div key={t.id} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <FiStar key={i} size={16} fill="#f39c12" stroke="#f39c12" />
              ))}
            </div>
            <p className="font-body text-dark leading-relaxed mb-6 text-[15px]">
              "{t.text}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-lg">
                👤
              </div>
              <div>
                <p className="font-body font-medium text-dark text-sm">{t.name}</p>
                <p className="text-sage-400 text-xs font-body">{t.occasion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
