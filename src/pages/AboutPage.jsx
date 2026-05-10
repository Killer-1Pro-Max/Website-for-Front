export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-20">
      <div className="text-center mb-16">
        <span className="text-6xl block mb-4">🌸</span>
        <h1 className="font-display text-5xl sm:text-6xl font-bold mb-4">Our Story</h1>
        <p className="font-body text-sage-500 text-lg">A small boutique with a big love for flowers</p>
      </div>

      <div className="prose max-w-none space-y-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12">
          <h2 className="font-display text-3xl font-semibold mb-4">How it all started</h2>
          <p className="font-body text-sage-600 leading-relaxed text-lg">
            Bloom was started in 2020 by Nilufar, a florist with 10 years of experience who wanted to bring 
            something different to Tashkent's flower market — not just pretty bouquets, but a real personal 
            service that actually listens to what you need.
          </p>
          <p className="font-body text-sage-600 leading-relaxed text-lg mt-4">
            What started as a small operation from a home studio quickly grew into a proper boutique. 
            Today we're a team of 6 passionate florists who work with fresh flowers sourced daily from 
            local growers and trusted importers.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { num: '1,200+', label: 'Happy customers', emoji: '😊' },
            { num: '45', label: 'Weddings this year', emoji: '💍' },
            { num: '4.9★', label: 'Average rating', emoji: '⭐' },
          ].map(stat => (
            <div key={stat.label} className="bg-sage-50 rounded-3xl p-8 text-center">
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="font-display text-4xl font-bold text-sage-700 mb-1">{stat.num}</div>
              <div className="font-body text-sage-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12">
          <h2 className="font-display text-3xl font-semibold mb-6">What we believe in</h2>
          <div className="space-y-5">
            {[
              { icon: '🌱', title: 'Freshness first', desc: 'We source flowers every morning. No day-old arrangements, ever.' },
              { icon: '💚', title: 'Sustainability', desc: 'We minimize waste, use eco-friendly packaging, and support local growers.' },
              { icon: '🎨', title: 'Real craftsmanship', desc: 'Every arrangement is hand-made with care. No cookie-cutter bouquets.' },
              { icon: '🤝', title: 'Personal service', desc: 'We actually listen. Your vision matters more than our templates.' },
            ].map(v => (
              <div key={v.title} className="flex items-start gap-4">
                <span className="text-3xl shrink-0">{v.icon}</span>
                <div>
                  <h3 className="font-body font-semibold text-dark mb-0.5">{v.title}</h3>
                  <p className="font-body text-sage-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
