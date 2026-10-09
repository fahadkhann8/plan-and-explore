import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_BASE_URL, BRAND_LOGO_URL } from '../data/packages';
import { useBodyScrollLock } from '../utils/scrollLock';
import { useRouter } from '../router';

interface NavbarProps {
  onOpenCustomPlan: () => void;
  onSelectPackage?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCustomPlan }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPath, navigate } = useRouter();

  // Centralized body scroll lock for mobile drawer
  useBodyScrollLock(mobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Packages', href: '/packages' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Contact', href: '/#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigate(href);
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#0B1F33]/10 py-3.5 shadow-xs'
            : 'bg-[#FAFAF7]/90 backdrop-blur-sm border-b border-[#0B1F33]/5 py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              id="brand-logo"
              href="/"
              onClick={(e) => handleNavClick(e, '/')}
              className="group flex items-center gap-3 focus:outline-hidden cursor-pointer"
            >
              {BRAND_LOGO_URL ? (
                <img
                  src={BRAND_LOGO_URL}
                  alt="Plan & Explore Logo"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 object-cover rounded-full shadow-xs border border-[#0B1F33]/15"
                />
              ) : (
                <div className="w-8 h-8 rounded-full border border-[#0B1F33] flex items-center justify-center text-[#0B1F33] transition-colors group-hover:bg-[#0B1F33] group-hover:text-white">
                  <Compass className="w-4 h-4 transition-transform duration-700 group-hover:rotate-45" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tighter text-[#0B1F33] leading-none">
                  PLAN & EXPLORE
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.15em] font-medium text-[#0B1F33]">
              {navLinks.map((link) => {
                const isActive =
                  link.href === '/'
                    ? currentPath === '/'
                    : link.href.startsWith('/#')
                    ? false
                    : currentPath.startsWith(link.href);

                return (
                  <a
                    key={link.name}
                    id={`nav-link-${link.name.toLowerCase()}`}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`transition-all relative py-2.5 px-1 min-h-[44px] inline-flex items-center cursor-pointer ${
                      isActive
                        ? 'opacity-100 font-bold text-[#5A5A40]'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-1 left-1 right-1 h-0.5 bg-[#5A5A40] rounded-full" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                id="navbar-whatsapp-cta"
                href={WHATSAPP_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-glass-button-whatsapp apple-glass-shine text-xs font-semibold px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Chat directly with us on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-white" />
                <span>WhatsApp</span>
              </a>

              <button
                id="navbar-have-a-plan-btn"
                onClick={onOpenCustomPlan}
                className="apple-glass-button apple-glass-shine inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-[#0B1F33] bg-white/80 border border-[#0B1F33]/15 hover:bg-white transition-all cursor-pointer shadow-xs"
              >
                <span>Have a Plan?</span>
              </button>
            </div>

            {/* Mobile Hamburger Button (44x44px touch area) */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-11 h-11 flex items-center justify-center rounded-lg text-[#0B1F33] hover:bg-[#E8E8E1] transition-colors focus:outline-hidden cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-overlay"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            id="mobile-nav-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#FAFAF7] p-6 flex flex-col justify-between shadow-2xl overflow-y-auto animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#EAE6DC]">
                <div className="flex items-center gap-2.5">
                  {BRAND_LOGO_URL ? (
                    <img
                      src={BRAND_LOGO_URL}
                      alt="Plan & Explore Logo"
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 object-cover rounded-full border border-[#0B1F33]/15"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#5A5A40] text-[#FAFAF7] flex items-center justify-center">
                      <Compass className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <span className="font-editorial text-xl font-semibold text-[#0B1F33]">
                    Plan & Explore
                  </span>
                </div>
                <button
                  id="mobile-nav-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-md text-[#4A5B6D] hover:text-[#0B1F33] hover:bg-[#F3F1EC] cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tagline */}
              <p className="mt-3 text-xs italic text-[#4A5B6D] font-editorial">
                “Plan the Journey. Explore the Unknown.”
              </p>

              {/* Navigation Links */}
              <nav className="mt-6 flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="px-3 py-3 rounded-lg text-base font-medium text-[#0B1F33] hover:bg-[#F4F1EA] hover:text-[#233E32] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 text-[#4A5B6D]/40" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-6 border-t border-[#0B1F33]/10 space-y-3">
              <button
                id="mobile-nav-custom-plan-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCustomPlan();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#5A5A40] text-white rounded-md text-xs font-bold uppercase tracking-widest hover:bg-[#4a4a35] transition-colors"
              >
                <span>Have a Plan?</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                id="mobile-nav-whatsapp-link"
                href={WHATSAPP_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-[#0B1F33] text-[#0B1F33] rounded-md text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-[#0B1F33] hover:text-white"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Chat directly on WhatsApp</span>
              </a>

              <p className="text-[11px] text-center text-[#4F5E6E]">
                Curated escapes across the Himalayas
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
