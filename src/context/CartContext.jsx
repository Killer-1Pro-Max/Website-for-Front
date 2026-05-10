import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('bloom_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [isCartOpen, setIsCartOpen] = useState(false)

  // save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('bloom_cart', JSON.stringify(cartItems))
  }, [cartItems])

  function addToCart(product, selectedSize = 0, qty = 1) {
    const itemKey = `${product.id}-${selectedSize}`
    
    setCartItems(prev => {
      const existing = prev.find(item => item.key === itemKey)
      if (existing) {
        return prev.map(item =>
          item.key === itemKey
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      }
      return [...prev, {
        key: itemKey,
        productId: product.id,
        name: product.name,
        price: product.priceBySize[selectedSize],
        sizeName: product.sizes[selectedSize],
        image: product.image,
        isCustom: product.isCustom,
        quantity: qty,
        selectedSize,
      }]
    })
  }

  function removeFromCart(itemKey) {
    setCartItems(prev => prev.filter(item => item.key !== itemKey))
  }

  function updateQty(itemKey, newQty) {
    if (newQty < 1) {
      removeFromCart(itemKey)
      return
    }
    setCartItems(prev =>
      prev.map(item => item.key === itemKey ? { ...item, quantity: newQty } : item)
    )
  }

  function clearCart() {
    setCartItems([])
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const hasCustomItems = cartItems.some(item => item.isCustom)

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      totalItems,
      totalPrice,
      hasCustomItems,
      isCartOpen,
      setIsCartOpen,
    }}>
      {children}
    </CartContext.Provider>
  )
}

// custom hook — easier than importing context every time
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
