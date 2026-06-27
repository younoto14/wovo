import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import AdminSettings from './components/AdminSettings';
import { supabase } from './lib/supabase';

function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/Mobi|Android/i.test(ua)) return 'mobile';
  if (/Tablet|iPad/i.test(ua)) return 'tablet';
  return 'desktop';
}

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    supabase.from('analytics_logs').insert({
      path: location.pathname,
      user_agent: navigator.userAgent,
      device_type: getDeviceType(),
    }).then(() => {});
  }, [location.pathname]);

  return null;
}

export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <BrowserRouter>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433" />
            <stop offset="25%" stopColor="#e6683c" />
            <stop offset="50%" stopColor="#dc2743" />
            <stop offset="75%" stopColor="#cc2366" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>
      </svg>

      <AnalyticsTracker />

      <div className="min-h-screen bg-white flex flex-col">
        <Navbar onOpenSettings={() => setSettingsOpen(true)} />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer onOpenSettings={() => setSettingsOpen(true)} />
      </div>

      {settingsOpen && (
        <AdminSettings onClose={() => setSettingsOpen(false)} />
      )}
    </BrowserRouter>
  );
}
