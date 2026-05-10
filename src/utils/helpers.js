// just some random helper functions I keep using everywhere

export function formatPrice(amount) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'UZS',
    maximumFractionDigits: 0,
  }).format(amount)
}

// get a nice gradient bg based on the flower image key
export const FLOWER_GRADIENTS = {
  'rose-bouquet': 'from-red-100 via-pink-50 to-rose-100',
  'wildflower-mix': 'from-yellow-50 via-purple-50 to-blue-50',
  'white-elegance': 'from-gray-50 via-white to-gray-100',
  'sunflower': 'from-yellow-100 via-amber-50 to-orange-50',
  'tropical': 'from-green-100 via-emerald-50 to-teal-100',
  'single-rose': 'from-red-50 via-pink-50 to-red-100',
  'peony': 'from-pink-100 via-rose-50 to-pink-50',
  'bridal': 'from-gray-50 via-white to-purple-50',
  'centerpiece': 'from-green-50 via-white to-green-50',
  'event': 'from-purple-50 via-white to-pink-50',
  'custom': 'from-orange-50 via-amber-50 to-yellow-50',
}

export const FLOWER_EMOJIS = {
  'rose-bouquet': '🌹',
  'wildflower-mix': '🌸',
  'white-elegance': '🤍',
  'sunflower': '🌻',
  'tropical': '🌺',
  'single-rose': '🥀',
  'peony': '🌸',
  'bridal': '👰',
  'centerpiece': '💐',
  'event': '🎊',
  'custom': '✨',
}

export function getDiscountPercent(original, current) {
  if (!original || original === current) return 0
  return Math.round((1 - current / original) * 100)
}

export function truncateText(text, maxLen) {
  if (text.length <= maxLen) return text
  return text.slice(0, maxLen) + '...'
}

export function generateOrderId() {
  const timestamp = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `BLM-${timestamp}-${rand}`
}
