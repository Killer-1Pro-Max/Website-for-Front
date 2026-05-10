import { useState, useEffect } from 'react'

// simple wishlist — just saves ids to localStorage
export function useWishlist() {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('bloom_wishlist')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('bloom_wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  function toggleWishlist(productId) {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  function isWishlisted(productId) {
    return wishlist.includes(productId)
  }

  return { wishlist, toggleWishlist, isWishlisted }
}
