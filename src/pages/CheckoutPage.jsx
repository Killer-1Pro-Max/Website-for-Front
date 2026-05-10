import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiCheckCircle } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { formatPrice, FLOWER_EMOJIS, generateOrderId } from '../utils/helpers'

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', phone: '', address: '', district: '', note: '',
    paymentMethod: 'cash',
    deliveryTime: 'asap',
  })

  function update(field, val) {
    setForm(prev => ({ ...prev, [field]: val }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    // simulating an API call
    await new Promise(r => setTimeout(r, 1200))
    const id = generateOrderId()
    setOrderId(id)
    setOrderPlaced(true)
    clearCart()
    setLoading(false)
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle size={48} className="text-sage-600" />
          </div>
          <h2 className="font-display text-4xl font-bold mb-2">Order Placed!</h2>
          <p className="font-body text-sage-500 mb-2">Your order number:</p>
          <p className="font-body text-xl font-bold text-bloom-500 mb-6">{orderId}</p>
          <p className="font-body text-sage-500 leading-relaxed mb-8">
            We'll call you shortly to confirm the details and delivery time. Thank you for choosing Bloom! 🌸
          </p>
          <Link
            to="/"
            className="bg-sage-700 text-white px-8 py-3 rounded-full font-body font-medium hover:bg-sage-800 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🌷</div>
          <h2 className="font-display text-3xl font-bold mb-3">Your bag is empty</h2>
          <Link to="/shop" className="text-sage-600 hover:underline font-body">Browse flowers</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-20">
      <h1 className="font-display text-4xl font-bold mb-10">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-5 gap-10">
          
          {/* Left: form */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Contact */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-100">
              <h2 className="font-display text-xl font-semibold mb-6">Delivery Info</h2>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-body font-medium text-dark mb-1.5">Full Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => update('name', e.target.value)}
                      className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-sage-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-dark mb-1.5">Phone *</label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={e => update('phone', e.target.value)}
                      className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-sage-500 transition-colors"
                      placeholder="+998 90 000 00 00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-dark mb-1.5">Address *</label>
                  <input
                    required
                    value={form.address}
                    onChange={e => update('address', e.target.value)}
                    className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-sage-500 transition-colors"
                    placeholder="Street, building, apartment"
                  />
                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-dark mb-1.5">District</label>
                  <select
                    value={form.district}
                    onChange={e => update('district', e.target.value)}
                    className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-sage-500 transition-colors"
                  >
                    <option value="">Select district</option>
                    {['Chilanzar', 'Yunusabad', 'Mirabad', 'Shaykhantahur', 'Yakkasaray', 'Hamza', 'Sergeli', 'Uchtepa', 'Olmazor'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-dark mb-1.5">Delivery Time</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'asap', label: 'ASAP' },
                      { value: 'morning', label: 'Morning (9–12)' },
                      { value: 'afternoon', label: 'Afternoon (12–17)' },
                      { value: 'evening', label: 'Evening (17–21)' },
                    ].map(opt => (
                      <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="deliveryTime"
                          value={opt.value}
                          checked={form.deliveryTime === opt.value}
                          onChange={() => update('deliveryTime', opt.value)}
                          className="accent-sage-700"
                        />
                        <span className="font-body text-sm text-sage-700">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-dark mb-1.5">Order Note</label>
                  <textarea
                    value={form.note}
                    onChange={e => update('note', e.target.value)}
                    rows={2}
                    placeholder="Card message, special instructions..."
                    className="w-full border border-sage-200 rounded-xl px-4 py-3 text-sm font-body focus:outline-none focus:border-sage-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sage-100">
              <h2 className="font-display text-xl font-semibold mb-4">Payment</h2>
              <div className="space-y-3">
                {[
                  { value: 'cash', label: '💵 Cash on delivery' },
                  { value: 'card', label: '💳 Card on delivery' },
                  { value: 'transfer', label: '📱 Bank transfer' },
                ].map(opt => (
                  <label key={opt.value} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                    form.paymentMethod === opt.value ? 'border-sage-700 bg-sage-50' : 'border-sage-200 hover:border-sage-300'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value={opt.value}
                      checked={form.paymentMethod === opt.value}
                      onChange={() => update('paymentMethod', opt.value)}
                      className="accent-sage-700"
                    />
                    <span className="font-body text-sm font-medium text-dark">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right: order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 border border-sage-100 sticky top-24">
              <h2 className="font-display text-xl font-semibold mb-5">Order Summary</h2>
              
              <ul className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <li key={item.key} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-sage-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
                      {FLOWER_EMOJIS[item.image] || '💐'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-medium text-dark truncate">{item.name}</p>
                      <p className="text-xs text-sage-400 font-body">{item.sizeName} × {item.quantity}</p>
                    </div>
                    <p className="font-body font-semibold text-sm shrink-0">{formatPrice(item.price * item.quantity)}</p>
                  </li>
                ))}
              </ul>

              <div className="border-t border-sage-100 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm font-body text-sage-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm font-body text-sage-600">
                  <span>Delivery</span>
                  <span className="text-sage-500">Calculated by call</span>
                </div>
                <div className="flex justify-between font-body font-bold text-dark text-base pt-1">
                  <span>Total (approx.)</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-body font-semibold text-white transition-all ${
                  loading ? 'bg-sage-400 cursor-wait' : 'bg-sage-700 hover:bg-sage-800 hover:shadow-lg'
                }`}
              >
                {loading ? 'Placing Order...' : 'Place Order 🌸'}
              </button>

              <p className="text-center text-xs text-sage-400 font-body mt-3">
                We'll call to confirm and discuss delivery cost
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
