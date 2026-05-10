import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { formatPrice, FLOWER_EMOJIS } from '../../utils/helpers'

export default function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, totalPrice, totalItems, updateQty, removeFromCart } = useCart()

  // close with escape key
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') setIsCartOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [setIsCartOpen])

  // prevent body scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isCartOpen])

  if (!isCartOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cream z-50 flex flex-col shadow-2xl animate-slide-in">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-sage-100">
          <div className="flex items-center gap-3">
            <FiShoppingBag size={22} className="text-sage-600" />
            <h2 className="font-display text-xl font-semibold">
              Your Bag
            </h2>
            {totalItems > 0 && (
              <span className="bg-bloom-100 text-bloom-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-sage-400 hover:text-dark hover:bg-sage-100 rounded-full transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">🌷</div>
              <p className="font-display text-xl text-sage-700 mb-2">Your bag is empty</p>
              <p className="text-sage-400 font-body text-sm mb-6">Add some flowers to get started</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-sage-600 text-white px-6 py-2.5 rounded-full font-body text-sm hover:bg-sage-700 transition-colors"
              >
                Browse flowers
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {cartItems.map(item => (
                <li key={item.key} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm">
                  {/* Flower emoji thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-sage-50 flex items-center justify-center text-3xl shrink-0">
                    {FLOWER_EMOJIS[item.image] || '💐'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-body font-medium text-dark text-sm leading-snug">{item.name}</p>
                        <p className="text-sage-400 text-xs mt-0.5">{item.sizeName}</p>
                        {item.isCustom && (
                          <span className="text-xs bg-bloom-50 text-bloom-600 px-1.5 py-0.5 rounded-full mt-1 inline-block">
                            Custom
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.key)}
                        className="text-sage-300 hover:text-red-400 transition-colors p-1 shrink-0"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty controls */}
                      <div className="flex items-center gap-2 bg-sage-50 rounded-full px-1 py-1">
                        <button
                          onClick={() => updateQty(item.key, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-sage-600 hover:bg-white rounded-full transition-colors"
                        >
                          <FiMinus size={12} />
                        </button>
                        <span className="text-sm font-body font-medium w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.key, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-sage-600 hover:bg-white rounded-full transition-colors"
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>
                      <p className="font-body font-semibold text-dark text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — total & checkout */}
        {cartItems.length > 0 && (
          <div className="border-t border-sage-100 px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-body text-sage-600">Subtotal</span>
              <span className="font-display text-xl font-semibold">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-sage-400 text-xs font-body">
              Delivery cost calculated at checkout
            </p>
            <Link
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full text-center bg-sage-700 hover:bg-sage-800 text-white font-body font-medium py-4 rounded-2xl transition-colors"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={() => setIsCartOpen(false)}
              className="block w-full text-center text-sage-500 hover:text-dark font-body text-sm py-2 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
