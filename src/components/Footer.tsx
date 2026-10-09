import React from 'react';
import { Compass, MessageCircle, ArrowRight } from 'lucide-react';
import { WHATSAPP_BASE_URL, BRAND_LOGO_URL } from '../data/packages';
import { useRouter } from '../router';

interface FooterProps {
  onOpenCustomPlan: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCustomPlan }) => {
  const { navigate } = useRouter();

  const links = [
    { name: 'Home', href: '/' },
    { name: 'All Packages', href: '/packages' },
    { name: 'About Us', href: '/about' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Contact', href: '/#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <footer className="bg-[#0B1F33] text-white pt-16 pb-28 sm:pb-16 border-t border-[#0B1F33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 pb-14 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-6">
            <div className="flex items-center gap-2.5 mb-3">
              {BRAND_LOGO_URL ? (
                <img
                  src={BRAND_LOGO_URL}
                  alt="Plan & Explore Logo"
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 sm:w-9 sm:h-9 object-cover rounded-full border border-white/20 bg-white/5"
                />
              ) : (
                <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white">
                  <Compass className="w-4 h-4" />
                </div>
              )}
              <span className="text-xl font-bold tracking-tighter text-white">
                PLAN & EXPLORE
              </span>
            </div>
            <p className="font-editorial text-lg italic text-white/80 max-w-sm mb-4">
              “Plan the Journey. Explore the Unknown.”
            </p>
            <p className="text-xs text-white/60 max-w-md leading-relaxed">
              Thoughtfully curated journeys and scenic escapes across the Himalayas. Designed for
              travellers seeking authentic routes, rustic charm, and unforgettable stories.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8E8E1] font-bold block mb-4">
              Navigation
            </span>
            <ul className="space-y-2.5 text-[11px] uppercase tracking-[0.15em] font-medium text-white/70">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Primary CTA */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8E8E1] font-bold block mb-4">
                Direct Contact
              </span>
              <a
                id="footer-whatsapp-link"
                href={WHATSAPP_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition-all shadow-md hover:shadow-lg hover:shadow-green-500/25 mb-4"
              >
                <MessageCircle className="w-4 h-4 text-white fill-white/20" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <button
              id="footer-have-a-plan-btn"
              onClick={onOpenCustomPlan}
              className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-sm bg-[#5A5A40] text-white hover:bg-[#4a4a35] text-xs font-bold uppercase tracking-widest transition-all mt-4 w-full sm:w-auto cursor-pointer"
            >
              <span>Have a Plan?</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <span>&copy; 2026 Plan & Explore. Travel should feel like discovery.</span>
          <span className="text-white/40 text-[10px] uppercase tracking-wider">
            Curated Routes &middot; Delhi &amp; Himachal Pradesh
          </span>
        </div>
      </div>
    </footer>
  );
};
