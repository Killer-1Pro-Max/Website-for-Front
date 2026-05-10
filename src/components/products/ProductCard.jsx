import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingBag, FiStar } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../hooks/useWishlist'
import { formatPrice, FLOWER_GRADIENTS, FLOWER_EMOJIS, getDiscountPercent } from '../../utils/helpers'

export default function ProductCard({ product }) {
  const { addToCart, setIsCartOpen } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const [isAdded, setIsAdded] = useState(false)
  const [hovered, setHovered] = useState(false)

  const wishlisted = isWishlisted(product.id)
  const discountPct = getDiscountPercent(product.originalPrice, product.price)
  const gradient = FLOWER_GRADIENTS[product.image] || 'from-sage-50 to-bloom-50'

  function handleAddToCart(e) {
    e.preventDefault() // don't navigate to product page
    addToCart(product, 0)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1800)
    // small delay then open cart
    setTimeout(() => setIsCartOpen(true), 300)
  }

  function handleWishlist(e) {
    e.preventDefault()
    toggleWishlist(product.id)
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        
        {/* Image area */}
        <div className={`relative h-56 sm:h-64 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
          {/* Big flower emoji as placeholder */}
          <span
            className="text-8xl transition-transform duration-500"
            style={{ transform: hovered ? 'scale(1.15) rotate(5deg)' : 'scale(1)' }}
          >
            {FLOWER_EMOJIS[product.image] || '💐'}
          </span>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <span className={`text-xs font-body font-semibold px-2.5 py-1 rounded-full ${
                product.badge === 'Sale' ? 'bg-red-500 text-white' :
                product.badge === 'Premium' ? 'bg-sage-700 text-white' :
                product.badge === 'Custom' ? 'bg-bloom-500 text-white' :
                product.badge === 'Seasonal' ? 'bg-amber-500 text-white' :
                'bg-white text-sage-700 shadow-sm'
              }`}>
                {product.badge}
              </span>
            )}
            {discountPct > 0 && (
              <span className="text-xs font-body font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-600">
                -{discountPct}%
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              wishlisted
                ? 'bg-petal-100 text-petal-500 scale-110'
                : 'bg-white/80 text-sage-400 hover:bg-petal-50 hover:text-petal-500'
            }`}
          >
            <FiHeart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <span className="text-xs font-body text-sage-400 uppercase tracking-wide">
                {product.category}
              </span>
              <h3 className="font-display font-semibold text-dark text-lg leading-tight mt-0.5">
                {product.name}
              </h3>
            </div>
          </div>

          <p className="text-sage-500 font-body text-sm mb-3 leading-snug">
            {product.shortDesc}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-4">
            <FiStar size={13} fill="#f39c12" stroke="#f39c12" />
            <span className="text-sm font-body font-medium text-dark">{product.rating}</span>
            <span className="text-xs font-body text-sage-400">({product.reviewCount})</span>
            <span className="text-sage-200 mx-1">·</span>
            <span className="text-xs font-body text-sage-400">🚚 {product.deliveryDays} day{product.deliveryDays !== '1' ? 's' : ''}</span>
          </div>

          {/* Price + Add to cart */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-display text-xl font-bold text-dark">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sage-400 text-sm line-through ml-2 font-body">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-body text-sm font-medium transition-all ${
                isAdded
                  ? 'bg-sage-600 text-white scale-95'
                  : 'bg-bloom-500 hover:bg-bloom-600 text-white hover:scale-105'
              }`}
            >
              <FiShoppingBag size={15} />
              {isAdded ? 'Added!' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
