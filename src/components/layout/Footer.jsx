import { Link } from 'react-router-dom'
import { FiInstagram, FiPhone, FiMail, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-sage-800 text-sage-200 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌸</span>
              <span className="font-display text-2xl font-bold text-white">Bloom</span>
            </div>
            <p className="text-sage-300 font-body text-sm leading-relaxed">
              A boutique flower shop creating beautiful arrangements for every occasion — from a single stem to full wedding decor.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sage-300 hover:text-white transition-colors text-sm"
            >
              <FiInstagram size={18} />
              @bloom.boutique
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {['All Flowers', 'Bouquets', 'Single Flowers', 'Wedding', 'Custom Order', 'Events'].map(item => (
                <li key={item}>
                  <Link
                    to={`/shop?category=${item}`}
                    className="text-sage-300 hover:text-white font-body text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-display text-white font-semibold mb-4">Info</h4>
            <ul className="space-y-2">
              {[
                { label: 'About Us', to: '/about' },
                { label: 'Delivery & Care', to: '/delivery' },
                { label: 'FAQ', to: '/faq' },
                { label: 'Privacy Policy', to: '/privacy' },
              ].map(link => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sage-300 hover:text-white font-body text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sage-300 text-sm font-body">
                <FiMapPin size={16} className="mt-0.5 shrink-0" />
                <span>Chilanzar-3, Tashkent, Uzbekistan</span>
              </li>
              <li>
                <a href="tel:+998901234567" className="flex items-center gap-3 text-sage-300 hover:text-white text-sm font-body transition-colors">
                  <FiPhone size={16} />
                  +998 90 123 45 67
                </a>
              </li>
              <li>
                <a href="mailto:hello@bloom.uz" className="flex items-center gap-3 text-sage-300 hover:text-white text-sm font-body transition-colors">
                  <FiMail size={16} />
                  hello@bloom.uz
                </a>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-sage-700">
              <p className="text-sage-400 text-xs font-body">
                Open daily: 8:00 — 21:00
              </p>
              <p className="text-sage-400 text-xs font-body mt-1">
                Delivery across Tashkent
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-sage-700 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-sage-400 text-xs font-body">
            © 2024 Bloom Flower Boutique. All rights reserved.
          </p>
          <p className="text-sage-500 text-xs font-body">
            Made with 🌸 in Tashkent
          </p>
        </div>
      </div>
    </footer>
  )
}
