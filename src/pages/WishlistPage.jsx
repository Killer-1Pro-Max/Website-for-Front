import { Link } from 'react-router-dom'
import { useWishlist } from '../hooks/useWishlist'
import { products } from '../data/products'
import ProductCard from '../components/products/ProductCard'
import { FiHeart } from 'react-icons/fi'

export default function WishlistPage() {
  const { wishlist } = useWishlist()
  const likedProducts = products.filter(p => wishlist.includes(p.id))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20">
      <div className="flex items-center gap-3 mb-8">
        <FiHeart size={28} className="text-petal-500" fill="currentColor" />
        <h1 className="font-display text-5xl font-bold">Wishlist</h1>
        {likedProducts.length > 0 && (
          <span className="bg-petal-100 text-petal-600 font-body text-sm font-medium px-3 py-1 rounded-full">
            {likedProducts.length} items
          </span>
        )}
      </div>

      {likedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-7xl mb-4">🤍</div>
          <h2 className="font-display text-2xl font-semibold mb-2 text-dark">Nothing here yet</h2>
          <p className="font-body text-sage-400 mb-6">
            Click the heart icon on any product to save it here
          </p>
          <Link
            to="/shop"
            className="bg-sage-700 text-white px-8 py-3 rounded-full font-body font-medium hover:bg-sage-800 transition-colors"
          >
            Browse Flowers
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {likedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
