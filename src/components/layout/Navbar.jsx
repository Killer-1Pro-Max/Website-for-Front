import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiShoppingBag, FiHeart, FiMenu, FiX, FiSearch } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'

const navLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'Bouquets', to: '/shop?category=Bouquets' },
  { label: 'Wedding', to: '/shop?category=Wedding' },
  { label: 'Custom Order', to: '/custom' },
  { label: 'About', to: '/about' },
]

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const location = useLocation()

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setSearchOpen(false)
  }, [location])

  const isHomePage = location.pathname === '/'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-sage-100'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🌸</span>
            <div>
              <span className="font-display text-2xl font-bold text-sage-700 group-hover:text-bloom-500 transition-colors">
                Bloom
              </span>
              <span className="hidden sm:block text-xs text-sage-400 font-body tracking-widest -mt-1">
                FLOWER BOUTIQUE
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-body text-sm font-medium transition-colors hover:text-bloom-500 ${
                  location.pathname === link.to
                    ? 'text-bloom-500'
                    : 'text-sage-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center gap-2 bg-white rounded-full border border-sage-200 px-4 py-2 shadow-sm">
                  <input
                    autoFocus
                    value={searchVal}
                    onChange={e => setSearchVal(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && searchVal.trim()) {
                        window.location.href = `/shop?search=${encodeURIComponent(searchVal)}`
                      }
                      if (e.key === 'Escape') setSearchOpen(false)
                    }}
                    placeholder="Search flowers..."
                    className="text-sm font-body outline-none bg-transparent w-40 text-dark placeholder-sage-300"
                  />
                  <button onClick={() => setSearchOpen(false)} className="text-sage-400 hover:text-dark">
                    <FiX size={15} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-sage-600 hover:text-bloom-500 hover:bg-bloom-50 rounded-full transition-colors"
                >
                  <FiSearch size={20} />
                </button>
              )}
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="p-2 text-sage-600 hover:text-petal-500 hover:bg-petal-50 rounded-full transition-colors"
            >
              <FiHeart size={20} />
            </Link>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-sage-600 hover:text-bloom-500 hover:bg-bloom-50 rounded-full transition-colors"
            >
              <FiShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-bloom-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-sage-600 hover:text-dark rounded-full"
            >
              {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-sage-100 py-4 bg-cream/98">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-4 py-3 text-sage-700 font-body font-medium hover:text-bloom-500 hover:bg-bloom-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
