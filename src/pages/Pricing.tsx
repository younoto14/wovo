import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';

const tiers = [
  {
    name: 'Starter',
    price: '5,000',
    description: 'Perfect for small businesses and landing pages.',
    features: [
      'Up to 5 pages',
      'Responsive design',
      'Basic SEO setup',
      'Contact form',
      '1 revision round',
    ],
    cta: 'Get Started',
    highlighted: false,
    turnedOff: false,
  },
  {
    name: 'Growth',
    price: '15,000',
    description: 'For growing businesses that need more power.',
    features: [
      'Up to 15 pages',
      'Custom design system',
      'Advanced SEO',
      'CMS integration',
      '3 revision rounds',
      'Analytics setup',
    ],
    cta: 'Get Started',
    highlighted: true,
    turnedOff: false,
  },
  {
    name: 'Enterprise',
    price: '30,000',
    description: 'Full-scale digital solutions for large operations.',
    features: [
      'Unlimited pages',
      'Full-stack app',
      'Custom integrations',
      'Priority support',
      'Unlimited revisions',
      'Dedicated manager',
    ],
    cta: 'Unavailable',
    highlighted: false,
    turnedOff: true,
  },
];

export default function Pricing() {
  return (
    <div className="pt-16">
      <section className="bg-gray-950 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">Pricing</p>
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">Simple, Transparent Pricing</h1>
          <p className="mt-4 text-gray-400 max-w-xl text-lg leading-relaxed">
            Choose the plan that fits your project. No hidden fees.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-xl border p-7 flex flex-col transition-all ${
                  tier.turnedOff
                    ? 'opacity-40 grayscale select-none pointer-events-none border-gray-200'
                    : tier.highlighted
                    ? 'border-gray-900 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {tier.turnedOff && (
                  <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                    <svg width="100%" height="100%" className="absolute inset-0">
                      <line x1="0" y1="0" x2="100%" y2="100%" stroke="#6b7280" strokeWidth="1.5" strokeOpacity="0.4" />
                      <line x1="100%" y1="0" x2="0" y2="100%" stroke="#6b7280" strokeWidth="1.5" strokeOpacity="0.4" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="rotate-[-35deg] text-xs font-semibold tracking-widest uppercase text-gray-500 border border-gray-400 px-3 py-1 rounded">
                        Not Available
                      </span>
                    </div>
                  </div>
                )}

                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold bg-gray-900 text-white px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{tier.description}</p>
                  <p className="mt-4">
                    <span className="text-4xl font-semibold text-gray-900">{tier.price}</span>
                    <span className="text-gray-500 text-sm ml-1">TL</span>
                  </p>
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check size={15} className="text-gray-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {tier.turnedOff ? (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-lg text-sm font-semibold bg-gray-200 text-gray-400 cursor-not-allowed"
                  >
                    Unavailable
                  </button>
                ) : (
                  <Link
                    to="/contact"
                    className={`block text-center py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                      tier.highlighted
                        ? 'bg-gray-900 text-white hover:bg-gray-700'
                        : 'border border-gray-300 text-gray-700 hover:border-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
