import { Link } from 'react-router-dom';
import { Instagram, Mail, ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="bg-gray-950 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-4">
          Ready to Build Something Great?
        </h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8 text-base leading-relaxed">
          Let's turn your idea into a product your users will love.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            Get in Touch <ArrowRight size={15} />
          </Link>
        </div>

        <div className="flex justify-center gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-opacity hover:opacity-70"
          >
            <Instagram size={20} stroke="url(#instagram-gradient)" />
          </a>
          <a
            href="mailto:contact@wovo.com"
            aria-label="Email"
            className="transition-opacity hover:opacity-70"
          >
            <Mail size={20} stroke="#EA4335" />
          </a>
        </div>
      </div>
    </section>
  );
}
