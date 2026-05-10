import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiHeart, FiShoppingBag, FiStar, FiTruck, FiCheckCircle, FiClock } from 'react-icons/fi'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../hooks/useWishlist'
import { formatPrice, FLOWER_GRADIENTS, FLOWER_EMOJIS } from '../utils/helpers'
import ProductCard from '../components/products/ProductCard'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, setIsCartOpen } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()

  const product = products.find(p => p.id === Number(id))
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(0)
  const [qty, setQty] = useState(1)
  const [addedAnimation, setAddedAnimation] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-6xl mb-4">🥀</div>
        <h2 className="font-display text-2xl font-semibold mb-2">Product not found</h2>
        <Link to="/shop" className="text-sage-600 hover:underline font-body">Back to shop</Link>
      </div>
    )
  }

  const currentPrice = product.priceBySize[selectedSizeIdx]
  const gradient = FLOWER_GRADIENTS[product.image] || 'from-sage-50 to-bloom-50'
  const wishlisted = isWishlisted(product.id)

  // get some related products
  const related = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.isFeatured))
    .slice(0, 4)

  function handleAddToCart() {
    addToCart(product, selectedSizeIdx, qty)
    setAddedAnimation(true)
    setTimeout(() => setAddedAnimation(false), 2000)
    setTimeout(() => setIsCartOpen(true), 400)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-sm font-body text-sage-400">
        <button onClick={() => navigate(-1)} className="hover:text-dark transition-colors flex items-center gap-1">
          <FiArrowLeft size={15} />
          Back
        </button>
        <span>/</span>
        <Link to="/shop" className="hover:text-dark transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-dark">{product.name}</span>
      </div>

      {/* Main product section */}
      <div className="grid lg:grid-cols-2 gap-12 mb-20">
        
        {/* Image */}
        <div>
          <div className={`relative rounded-3xl bg-gradient-to-br ${gradient} h-80 sm:h-[500px] flex items-center justify-center overflow-hidden`}>
            <span className="text-[200px] sm:text-[240px] animate-float select-none">
              {FLOWER_EMOJIS[product.image] || '💐'}
            </span>
            
            {product.badge && (
              <div className="absolute top-6 left-6">
                <span className={`text-sm font-body font-semibold px-4 py-2 rounded-full ${
                  product.badge === 'Premium' ? 'bg-sage-700 text-white' :
                  product.badge === 'Custom' ? 'bg-bloom-500 text-white' :
                  product.badge === 'Sale' ? 'bg-red-500 text-white' :
                  'bg-white text-sage-700 shadow-sm'
                }`}>
                  {product.badge}
                </span>
              </div>
            )}

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                wishlisted ? 'bg-petal-100 text-petal-500' : 'bg-white/80 text-sage-400 hover:text-petal-500'
              }`}
            >
              <FiHeart size={20} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Flower tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {product.flowers.map(flower => (
              <span key={flower} className="bg-sage-50 text-sage-600 text-xs font-body px-3 py-1.5 rounded-full border border-sage-100">
                🌿 {flower}
              </span>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <span className="text-bloom-500 font-body text-sm font-medium uppercase tracking-widest">
            {product.category}
          </span>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-dark mt-2 mb-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar
                  key={i}
                  size={15}
                  fill={i < Math.floor(product.rating) ? '#f39c12' : 'none'}
                  stroke="#f39c12"
                />
              ))}
            </div>
            <span className="font-body font-medium text-dark text-sm">{product.rating}</span>
            <span className="text-sage-400 text-sm font-body">({product.reviewCount} reviews)</span>
          </div>

          <p className="font-body text-sage-600 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Size selector */}
          <div className="mb-6">
            <p className="font-body font-medium text-dark mb-3">
              Size: <span className="text-sage-500 font-normal">{product.sizes[selectedSizeIdx]}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSizeIdx(idx)}
                  className={`px-4 py-2.5 rounded-xl border font-body text-sm transition-all ${
                    selectedSizeIdx === idx
                      ? 'border-sage-700 bg-sage-700 text-white shadow-sm'
                      : 'border-sage-200 text-sage-700 hover:border-sage-400 bg-white'
                  }`}
                >
                  <div className="font-medium">{size}</div>
                  <div className={`text-xs mt-0.5 ${selectedSizeIdx === idx ? 'text-sage-300' : 'text-sage-400'}`}>
                    {formatPrice(product.priceBySize[idx])}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Qty */}
          <div className="mb-8">
            <p className="font-body font-medium text-dark mb-3">Quantity</p>
            <div className="flex items-center gap-4 bg-white border border-sage-200 rounded-xl px-2 py-2 w-fit">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-8 h-8 flex items-center justify-center text-sage-600 hover:bg-sage-50 rounded-lg transition-colors font-bold"
              >
                −
              </button>
              <span className="font-body font-semibold text-lg w-6 text-center">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="w-8 h-8 flex items-center justify-center text-sage-600 hover:bg-sage-50 rounded-lg transition-colors font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="border-t border-sage-100 pt-6">
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-display text-4xl font-bold text-dark">
                {formatPrice(currentPrice * qty)}
              </span>
              {qty > 1 && (
                <span className="text-sage-400 font-body text-sm">
                  ({formatPrice(currentPrice)} each)
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-body font-semibold text-lg transition-all mb-3 ${
                addedAnimation
                  ? 'bg-sage-600 text-white'
                  : 'bg-bloom-500 hover:bg-bloom-600 text-white hover:shadow-lg'
              }`}
            >
              {addedAnimation ? (
                <>
                  <FiCheckCircle size={22} />
                  Added to Bag!
                </>
              ) : (
                <>
                  <FiShoppingBag size={22} />
                  Add to Bag — {formatPrice(currentPrice * qty)}
                </>
              )}
            </button>

            {product.isCustom && (
              <Link
                to="/custom"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-body font-medium border border-sage-300 hover:border-sage-500 text-sage-700 transition-colors"
              >
                Customize this order
              </Link>
            )}
          </div>

          {/* Delivery info */}
          <div className="mt-6 bg-sage-50 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-3 text-sm font-body">
              <FiTruck size={17} className="text-sage-600 shrink-0" />
              <span className="text-sage-700">
                Delivery in <strong>{product.deliveryDays} day{product.deliveryDays !== '1' ? 's' : ''}</strong> across Tashkent
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm font-body">
              <FiClock size={17} className="text-sage-600 shrink-0" />
              <span className="text-sage-700">Order before 14:00 for same-day delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="font-display text-3xl font-bold mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
