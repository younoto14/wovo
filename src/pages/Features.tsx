import { Zap, Palette, BarChart2, Globe, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';

const features = [
  {
    icon: Zap,
    title: 'Fast Delivery',
    description:
      'We move quickly without cutting corners. Most projects ship in days, not months, so you can start seeing results right away.',
  },
  {
    icon: Palette,
    title: 'Custom Design',
    description:
      'Every pixel is intentional. We craft interfaces that reflect your brand and connect with your audience on every device.',
  },
  {
    icon: BarChart2,
    title: 'Performance First',
    description:
      'Speed, SEO, and Core Web Vitals baked in from day one. Fast websites win — both in search rankings and user retention.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description:
      'Multi-language ready, globally hosted, and optimized for international audiences so your business can scale without limits.',
  },
  {
    icon: Layers,
    title: 'Full-Stack Solutions',
    description:
      'From landing pages to complex web applications — we handle frontend, backend, databases, and third-party integrations.',
  },
];

export default function Features() {
  return (
    <div className="pt-16">
      <section className="bg-gray-950 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">What We Do</p>
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">Our Services</h1>
          <p className="mt-4 text-gray-400 max-w-xl text-lg leading-relaxed">
            Everything you need to launch and grow a compelling digital presence.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="p-7 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={20} className="text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
