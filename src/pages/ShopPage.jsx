import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiSearch, FiFilter, FiX, FiSliders } from 'react-icons/fi'
import { products, CATEGORIES } from '../data/products'
import ProductCard from '../components/products/ProductCard'

const SORT_OPTIONS = [
  { label: 'Popular first', value: 'popular' },
  { label: 'Price: low to high', value: 'price-asc' },
  { label: 'Price: high to low', value: 'price-desc' },
  { label: 'Top rated', value: 'rating' },
]

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All')
  const [sortBy, setSortBy] = useState('popular')
  const [showCustomOnly, setShowCustomOnly] = useState(false)
  const [maxPrice, setMaxPrice] = useState(15000)
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Sync category from url params
  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setSelectedCategory(cat)
    const search = searchParams.get('search')
    if (search) setSearchInput(search)
  }, [searchParams])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // category filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory)
    }

    // search
    if (searchInput.trim()) {
      const q = searchInput.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.flowers.some(f => f.toLowerCase().includes(q))
      )
    }

    // custom filter
    if (showCustomOnly) {
      result = result.filter(p => p.isCustom)
    }

    // price filter
    result = result.filter(p => p.price <= maxPrice)

    // sort
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating)
    if (sortBy === 'popular') result.sort((a, b) => b.reviewCount - a.reviewCount)

    return result
  }, [selectedCategory, searchInput, showCustomOnly, maxPrice, sortBy])

  function handleCategoryClick(cat) {
    setSelectedCategory(cat)
    setSearchParams(params => {
      if (cat === 'All') params.delete('category')
      else params.set('category', cat)
      return params
    })
  }

  function clearFilters() {
    setSearchInput('')
    setSelectedCategory('All')
    setShowCustomOnly(false)
    setMaxPrice(15000)
    setSortBy('popular')
    setSearchParams({})
  }

  const hasActiveFilters = selectedCategory !== 'All' || searchInput || showCustomOnly || maxPrice < 15000

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20">
      
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-display text-5xl font-bold mb-2">All Flowers</h1>
        <p className="font-body text-sage-500">
          {filteredProducts.length} arrangements available
        </p>
      </div>

      {/* Search + sort bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FiSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-sage-400" />
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search by flower, occasion, color..."
            className="w-full bg-white border border-sage-200 rounded-full pl-11 pr-10 py-3 font-body text-sm focus:outline-none focus:border-sage-400 transition-colors"
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sage-400 hover:text-dark"
            >
              <FiX size={15} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-white border border-sage-200 rounded-full px-5 py-3 font-body text-sm focus:outline-none cursor-pointer text-dark"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`flex items-center gap-2 px-5 py-3 rounded-full font-body text-sm font-medium border transition-colors ${
              filtersOpen || hasActiveFilters
                ? 'bg-sage-700 text-white border-sage-700'
                : 'bg-white border-sage-200 text-sage-700 hover:border-sage-400'
            }`}
          >
            <FiSliders size={16} />
            Filters
            {hasActiveFilters && (
              <span className="bg-bloom-400 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                !
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filters panel */}
      {filtersOpen && (
        <div className="bg-white rounded-2xl border border-sage-100 p-6 mb-6 grid sm:grid-cols-3 gap-6">
          <div>
            <label className="font-body text-sm font-medium text-dark mb-2 block">Max Price</label>
            <input
              type="range"
              min={500}
              max={15000}
              step={500}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-sage-600"
            />
            <div className="flex justify-between text-xs font-body text-sage-400 mt-1">
              <span>500 UZS</span>
              <span className="font-medium text-dark">{maxPrice.toLocaleString()} UZS</span>
            </div>
          </div>

          <div>
            <label className="font-body text-sm font-medium text-dark mb-2 block">Type</label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showCustomOnly}
                onChange={e => setShowCustomOnly(e.target.checked)}
                className="accent-sage-600 w-4 h-4"
              />
              <span className="font-body text-sm text-sage-700">Custom orders only</span>
            </label>
          </div>

          <div className="flex items-end">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 text-sm font-body text-red-500 hover:text-red-600 transition-colors"
              >
                <FiX size={14} />
                Clear all filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-10 pb-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`shrink-0 px-5 py-2.5 rounded-full font-body text-sm font-medium transition-colors whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-sage-700 text-white shadow-sm'
                : 'bg-white text-sage-600 border border-sage-200 hover:border-sage-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">🥀</div>
          <h3 className="font-display text-2xl font-semibold text-dark mb-2">Nothing found</h3>
          <p className="font-body text-sage-400 mb-6">Try different search terms or filters</p>
          <button
            onClick={clearFilters}
            className="bg-sage-700 text-white px-6 py-3 rounded-full font-body text-sm hover:bg-sage-800 transition-colors"
          >
            Show all products
          </button>
        </div>
      )}
    </div>
  )
}
