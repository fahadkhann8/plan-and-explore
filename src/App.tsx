import React, { useState } from 'react';
import { PACKAGES } from './data/packages';
import { TravelPackage } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyUs } from './components/WhyUs';
import { ExplorePackages } from './components/ExplorePackages';
import { PackageDetailExperience } from './components/PackageDetailExperience';
import { HaveAPlanSection } from './components/HaveAPlanSection';
import { HowItWorks } from './components/HowItWorks';
import { AboutSection } from './components/AboutSection';
import { EditorialGallery } from './components/EditorialGallery';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { CustomPlanModal } from './components/CustomPlanModal';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [customPlanOpen, setCustomPlanOpen] = useState<boolean>(false);
  const [customPlanDestination, setCustomPlanDestination] = useState<string>('Jibhi & Tirthan Valley');
  const [bookingPackage, setBookingPackage] = useState<TravelPackage | null>(null);

  const handleScrollToPackages = () => {
    const el = document.getElementById('packages');
    if (el) {
      const topOffset = 80;
      const pos = el.getBoundingClientRect().top + window.scrollY - topOffset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  const handleScrollToHaveAPlan = () => {
    const el = document.getElementById('have-a-plan');
    if (el) {
      const topOffset = 80;
      const pos = el.getBoundingClientRect().top + window.scrollY - topOffset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    } else {
      setCustomPlanOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#0B1F33] selection:bg-[#233E32] selection:text-[#FAFAF7] flex flex-col font-sans">
      {/* 1. Navigation */}
      <Navbar onOpenCustomPlan={() => setCustomPlanOpen(true)} />

      {/* Main Page Flow with Deep Scrolling Journey */}
      <main className="flex-1">
        {/* 1. Hero Section (Home) */}
        <Hero
          onExploreClick={handleScrollToPackages}
          onHaveAPlanClick={handleScrollToHaveAPlan}
          onSelectFeaturedPackage={() => setSelectedPackage(PACKAGES[0])}
          onBookFeaturedPackage={() => setBookingPackage(PACKAGES[0])}
        />

        {/* 2. Explore Packages (Package 01, Package 02: Kashmir, Package 03: Manali) - Directly After Home */}
        <ExplorePackages
          packages={PACKAGES}
          onSelectPackage={(pkg) => setSelectedPackage(pkg)}
          onBookPackage={(pkg) => setBookingPackage(pkg)}
          onNotifyPackage={(pkg) => {
            setCustomPlanDestination(pkg.destination);
            setCustomPlanOpen(true);
          }}
        />

        {/* 3. Why Plan & Explore (The Ethos & Why Travel With Us) */}
        <WhyUs />

        {/* 4. How It Works */}
        <HowItWorks />

        {/* 5. Have a Plan? Feature Section */}
        <HaveAPlanSection />

        {/* 6. About Section */}
        <AboutSection />

        {/* 7. Editorial Travel Gallery */}
        <EditorialGallery />

        {/* 8. Contact / WhatsApp Direct Section */}
        <ContactSection onOpenCustomPlan={() => setCustomPlanOpen(true)} />
      </main>

      {/* 10. Minimalist Premium Footer */}
      <Footer onOpenCustomPlan={() => setCustomPlanOpen(true)} />

      {/* Mobile Sticky Bar for rapid WhatsApp & Custom Plan engagement */}
      <MobileStickyBar onOpenCustomPlan={() => setCustomPlanOpen(true)} />

      {/* Full Destination Detail Experience */}
      {selectedPackage && (
        <PackageDetailExperience
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
          onOpenCustomPlan={() => {
            setSelectedPackage(null);
            setCustomPlanOpen(true);
          }}
          onBookPackage={(pkg) => setBookingPackage(pkg)}
        />
      )}

      {/* Have a Plan Bespoke Inquiry Modal */}
      <CustomPlanModal
        isOpen={customPlanOpen}
        initialDestination={customPlanDestination}
        onClose={() => setCustomPlanOpen(false)}
      />

      {/* Booking Modal with Google Sheet Integration */}
      <BookingModal
        pkg={bookingPackage}
        isOpen={!!bookingPackage}
        onClose={() => setBookingPackage(null)}
      />
    </div>
  );
}
