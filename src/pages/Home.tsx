import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Pin } from 'lucide-react';
import CTASection from '../components/CTASection';
import { supabase, type Example } from '../lib/supabase';

const stats = [
  { value: '3', label: 'Clients Served' },
  { value: '92%', label: 'Client Satisfaction' },
  { value: '12h', label: 'Avg. Response Time' },
];

export default function Home() {
  const [examples, setExamples] = useState<Example[]>([]);
  const [loadingExamples, setLoadingExamples] = useState(true);

  useEffect(() => {
    async function fetchExamples() {
      const { data } = await supabase
        .from('examples')
        .select('*')
        .order('pinned', { ascending: false })
        .order('created_at', { ascending: false });
      setExamples(data ?? []);
      setLoadingExamples(false);
    }
    fetchExamples();
  }, []);

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative bg-gray-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.04)_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36 relative">
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
            Digital Studio
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight mb-6">
            We Build<br />
            <span className="text-gray-300">Digital Products</span><br />
            That Matter
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mb-10 leading-relaxed">
            From concept to launch — websites, apps, and brand experiences
            designed to grow your business.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              Start a Project <ArrowRight size={16} />
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center gap-2 border border-gray-700 text-gray-300 px-6 py-3 rounded-lg text-sm font-semibold hover:border-gray-500 hover:text-white transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-3 gap-8 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className="text-4xl lg:text-5xl font-semibold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500 mt-1 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">Portfolio</p>
            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900">Recent Projects</h2>
            <p className="text-gray-500 mt-2 text-base">A selection of work delivered to our clients.</p>
          </div>

          {loadingExamples ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
            </div>
          ) : examples.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
              <p className="text-base">No projects yet — check back soon.</p>
            </div>
          ) : (
            <div className="max-h-[520px] overflow-y-auto pr-1 rounded-xl">
              <div className="grid gap-4">
                {examples.map((ex) => (
                  <div
                    key={ex.id}
                    className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {ex.pinned && (
                        <Pin size={14} className="text-gray-400 mt-1 shrink-0" />
                      )}
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">{ex.name}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">{ex.business_type}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-6 shrink-0">
                      <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                        {ex.pricing_chosen}
                      </span>
                      <a
                        href={ex.website_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        Visit <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
