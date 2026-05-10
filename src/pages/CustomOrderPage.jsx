import { useState } from 'react'
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi'

// this page took me a while to get right - the form logic is a bit complex
const OCCASIONS = ['Birthday', 'Anniversary', 'Wedding', 'Just Because', 'Sympathy', 'Corporate', 'Other']
const STYLES = ['Classic & Romantic', 'Modern & Minimal', 'Wild & Natural', 'Bright & Cheerful', 'Soft & Pastel', 'Dark & Moody']
const BUDGETS = ['up to 50,000 UZS', '50,000 – 100,000 UZS', '100,000 – 250,000 UZS', '250,000 – 500,000 UZS', '500,000+ UZS']

export default function CustomOrderPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    occasion: '',
    style: '',
    budget: '',
    colors: '',
    flowers: '',
    date: '',
    message: '',
    name: '',
    phone: '',
    email: '',
  })

  function updateForm(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // normally this would be an API call
    console.log('Custom order submitted:', form)
    setSubmitted(true)
  }

  if (submitted) {
    return <SuccessScreen name={form.name} />
  }

  return (
    <div className="min-h-screen pt-24 pb-20 max-w-3xl mx-auto px-6">
      
      {/* Header */}
      <div className="text-center mb-10">
        <span className="text-5xl block mb-4">✨</span>
        <h1 className="font-display text-5xl font-bold mb-3">Custom Order</h1>
        <p className="font-body text-sage-500 text-lg">
          Tell us your vision and we'll make it bloom
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-10 justify-center">
        {[1, 2, 3].map((s, i) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-body font-semibold text-sm transition-all ${
                step === s ? 'bg-sage-700 text-white shadow-md' :
                step > s ? 'bg-sage-200 text-sage-600' :
                'bg-white border-2 border-sage-200 text-sage-400'
              }`}
            >
              {step > s ? <FiCheckCircle size={18} /> : s}
            </div>
            {i < 2 && (
              <div className={`w-16 sm:w-24 h-0.5 ${step > s ? 'bg-sage-400' : 'bg-sage-100'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-sage-100 p-8 sm:p-10">
        {step === 1 && <Step1 form={form} updateForm={updateForm} />}
        {step === 2 && <Step2 form={form} updateForm={updateForm} />}
        {step === 3 && <Step3 form={form} updateForm={updateForm} />}

        <div className="flex justify-between mt-8 pt-6 border-t border-sage-100">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 font-body text-sm text-sage-600 hover:text-dark transition-colors"
            >
              ← Back
            </button>
          ) : <div />}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 bg-sage-700 text-white px-8 py-3 rounded-full font-body text-sm font-medium hover:bg-sage-800 transition-colors"
            >
              Continue <FiArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-bloom-500 text-white px-8 py-3 rounded-full font-body text-sm font-medium hover:bg-bloom-600 transition-colors"
            >
              Send Request ✨
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Step1({ form, updateForm }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold mb-6">What's the occasion?</h2>
      
      <div className="mb-8">
        <label className="font-body text-sm font-medium text-dark mb-3 block">Occasion</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {OCCASIONS.map(occ => (
            <button
              key={occ}
              onClick={() => updateForm('occasion', occ)}
              className={`px-4 py-3 rounded-xl border font-body text-sm transition-all text-left ${
                form.occasion === occ
                  ? 'border-sage-700 bg-sage-50 text-sage-700 font-medium'
                  : 'border-sage-200 text-sage-600 hover:border-sage-400'
              }`}
            >
              {occ}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="font-body text-sm font-medium text-dark mb-3 block">Style preference</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {STYLES.map(style => (
            <button
              key={style}
              onClick={() => updateForm('style', style)}
              className={`px-4 py-3 rounded-xl border font-body text-sm transition-all text-left ${
                form.style === style
                  ? 'border-sage-700 bg-sage-50 text-sage-700 font-medium'
                  : 'border-sage-200 text-sage-600 hover:border-sage-400'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="font-body text-sm font-medium text-dark mb-3 block">Budget</label>
        <div className="space-y-2">
          {BUDGETS.map(budget => (
            <label key={budget} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="budget"
                value={budget}
                checked={form.budget === budget}
                onChange={() => updateForm('budget', budget)}
                className="accent-sage-700 w-4 h-4"
              />
              <span className="font-body text-sm text-sage-700">{budget}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

function Step2({ form, updateForm }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold mb-6">Tell us more</h2>
      
      <div className="space-y-6">
        <div>
          <label className="font-body text-sm font-medium text-dark mb-2 block">
            Preferred colors
            <span className="font-normal text-sage-400 ml-2">(optional)</span>
          </label>
          <input
            type="text"
            value={form.colors}
            onChange={e => updateForm('colors', e.target.value)}
            placeholder="e.g. Red, White, Pale Pink..."
            className="w-full border border-sage-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-sage-500 transition-colors"
          />
        </div>

        <div>
          <label className="font-body text-sm font-medium text-dark mb-2 block">
            Specific flowers you love
            <span className="font-normal text-sage-400 ml-2">(optional)</span>
          </label>
          <input
            type="text"
            value={form.flowers}
            onChange={e => updateForm('flowers', e.target.value)}
            placeholder="e.g. Peonies, Garden Roses, Eucalyptus..."
            className="w-full border border-sage-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-sage-500 transition-colors"
          />
        </div>

        <div>
          <label className="font-body text-sm font-medium text-dark mb-2 block">
            When do you need it?
          </label>
          <input
            type="date"
            value={form.date}
            onChange={e => updateForm('date', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full border border-sage-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-sage-500 transition-colors"
          />
        </div>

        <div>
          <label className="font-body text-sm font-medium text-dark mb-2 block">
            Any other details?
          </label>
          <textarea
            value={form.message}
            onChange={e => updateForm('message', e.target.value)}
            placeholder="Tell us anything else — the recipient, the vibe, special requests..."
            rows={4}
            className="w-full border border-sage-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-sage-500 transition-colors resize-none"
          />
        </div>
      </div>
    </div>
  )
}

function Step3({ form, updateForm }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold mb-6">Your contact info</h2>
      <p className="font-body text-sage-500 text-sm mb-8">
        We'll reach out within 2 hours to discuss your order and send you a quote.
      </p>

      <div className="space-y-5">
        <div>
          <label className="font-body text-sm font-medium text-dark mb-2 block">Full Name *</label>
          <input
            required
            type="text"
            value={form.name}
            onChange={e => updateForm('name', e.target.value)}
            placeholder="Your name"
            className="w-full border border-sage-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-sage-500 transition-colors"
          />
        </div>

        <div>
          <label className="font-body text-sm font-medium text-dark mb-2 block">Phone *</label>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={e => updateForm('phone', e.target.value)}
            placeholder="+998 __ ___ __ __"
            className="w-full border border-sage-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-sage-500 transition-colors"
          />
        </div>

        <div>
          <label className="font-body text-sm font-medium text-dark mb-2 block">
            Email <span className="font-normal text-sage-400">(optional)</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={e => updateForm('email', e.target.value)}
            placeholder="your@email.com"
            className="w-full border border-sage-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-sage-500 transition-colors"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 bg-sage-50 rounded-2xl p-5">
        <p className="font-body font-medium text-dark mb-3 text-sm">Your request summary</p>
        <div className="space-y-1.5 text-sm font-body text-sage-600">
          {form.occasion && <p>🎉 Occasion: <span className="text-dark">{form.occasion}</span></p>}
          {form.style && <p>🌸 Style: <span className="text-dark">{form.style}</span></p>}
          {form.budget && <p>💰 Budget: <span className="text-dark">{form.budget}</span></p>}
          {form.date && <p>📅 Date: <span className="text-dark">{form.date}</span></p>}
        </div>
      </div>
    </div>
  )
}

function SuccessScreen({ name }) {
  return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-7xl mb-6 animate-float inline-block">🌸</div>
        <h2 className="font-display text-4xl font-bold mb-4">
          {name ? `Thank you, ${name}!` : 'Request Sent!'}
        </h2>
        <p className="font-body text-sage-500 text-lg leading-relaxed mb-8">
          We've received your custom order request. Our florist will contact you within 2 hours to discuss the details and create something beautiful just for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/"
            className="bg-sage-700 text-white px-8 py-3 rounded-full font-body font-medium hover:bg-sage-800 transition-colors"
          >
            Back to Home
          </a>
          <a
            href="/shop"
            className="border border-sage-300 text-sage-700 px-8 py-3 rounded-full font-body font-medium hover:border-sage-500 transition-colors"
          >
            Browse Shop
          </a>
        </div>
      </div>
    </div>
  )
}
