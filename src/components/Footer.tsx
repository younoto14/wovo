import { Link } from 'react-router-dom';
import { Instagram, Mail, Settings } from 'lucide-react';

interface FooterProps {
  onOpenSettings: () => void;
}

export default function Footer({ onOpenSettings }: FooterProps) {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link to="/">
              <img
                src="/ChatGPT_Image_Jun_27,_2026,_03_47_15_PM.png"
                alt="WOVO"
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-gray-500 max-w-xs text-center md:text-left">
              Creative digital solutions crafted with precision.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <nav className="flex gap-6 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/features', label: 'Features' },
                { to: '/pricing', label: 'Pricing' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <Link key={to} to={to} className="hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-opacity hover:opacity-80"
              >
                <Instagram size={20} stroke="url(#instagram-gradient)" />
              </a>
              <a
                href="mailto:contact@wovo.com"
                aria-label="Email"
                className="transition-opacity hover:opacity-80"
              >
                <Mail size={20} stroke="#EA4335" />
              </a>
              <button
                onClick={onOpenSettings}
                aria-label="Settings"
                className="text-gray-600 hover:text-gray-400 transition-colors"
              >
                <Settings size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} WOVO. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
