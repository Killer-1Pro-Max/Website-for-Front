import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="text-8xl mb-6 animate-float inline-block">🥀</div>
      <h1 className="font-display text-6xl font-bold text-dark mb-3">404</h1>
      <p className="font-display text-2xl text-sage-600 mb-2">Page not found</p>
      <p className="font-body text-sage-400 mb-8 max-w-sm">
        Looks like this page wilted. Let's get you back to the garden.
      </p>
      <div className="flex gap-4">
        <Link
          to="/"
          className="bg-sage-700 text-white px-6 py-3 rounded-full font-body font-medium hover:bg-sage-800 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/shop"
          className="border border-sage-300 text-sage-700 px-6 py-3 rounded-full font-body font-medium hover:border-sage-500 transition-colors"
        >
          Shop
        </Link>
      </div>
    </div>
  )
}
