import React, { useState } from 'react';
import { RouterProvider, useRouter } from './router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { CustomPlanModal } from './components/CustomPlanModal';
import { BookingModal } from './components/BookingModal';
import { UnderConstructionModal } from './components/UnderConstructionModal';
import { HomePage } from './pages/HomePage';
import { PackagesPage } from './pages/PackagesPage';
import { PackageDetailPage } from './pages/PackageDetailPage';
import { AboutPage } from './pages/AboutPage';
import { TravelPackage } from './types';

function AppContent() {
  const { currentPath } = useRouter();
  const [customPlanOpen, setCustomPlanOpen] = useState<boolean>(false);
  const [customPlanDestination, setCustomPlanDestination] = useState<string>('Jibhi & Tirthan Valley');
  const [bookingPackage, setBookingPackage] = useState<TravelPackage | null>(null);

  // Determine active view based on currentPath
  const renderCurrentView = () => {
    // Normalise path (trim trailing slash unless root)
    const normalized =
      currentPath.length > 1 && currentPath.endsWith('/')
        ? currentPath.slice(0, -1)
        : currentPath;

    // Check for /packages/:id
    if (normalized.startsWith('/packages/')) {
      const packageId = normalized.replace('/packages/', '');
      return (
        <PackageDetailPage
          packageId={packageId}
          onBookPackage={(pkg) => setBookingPackage(pkg)}
          onOpenCustomPlan={() => setCustomPlanOpen(true)}
        />
      );
    }

    // Check for /packages
    if (normalized === '/packages') {
      return (
        <PackagesPage
          onBookPackage={(pkg) => setBookingPackage(pkg)}
          onOpenCustomPlan={() => setCustomPlanOpen(true)}
        />
      );
    }

    // Check for /about
    if (normalized === '/about') {
      return <AboutPage onOpenCustomPlan={() => setCustomPlanOpen(true)} />;
    }

    // Default: Home Page
    return (
      <HomePage
        onOpenCustomPlan={() => setCustomPlanOpen(true)}
        onBookPackage={(pkg) => setBookingPackage(pkg)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#0B1F33] selection:bg-[#233E32] selection:text-[#FAFAF7] flex flex-col font-sans">
      {/* 1. Global Navigation */}
      <Navbar onOpenCustomPlan={() => setCustomPlanOpen(true)} />

      {/* 2. Active Page Content */}
      <main className="flex-1">{renderCurrentView()}</main>

      {/* 3. Global Footer */}
      <Footer onOpenCustomPlan={() => setCustomPlanOpen(true)} />

      {/* 4. Mobile Sticky Bar */}
      <MobileStickyBar onOpenCustomPlan={() => setCustomPlanOpen(true)} />

      {/* 5. Custom Plan / Have a Plan Bespoke Inquiry Modal */}
      <CustomPlanModal
        isOpen={customPlanOpen}
        initialDestination={customPlanDestination}
        onClose={() => setCustomPlanOpen(false)}
      />

      {/* 6. Booking Modal with Google Sheet Integration */}
      <BookingModal
        pkg={bookingPackage}
        isOpen={!!bookingPackage}
        onClose={() => setBookingPackage(null)}
      />

      {/* 7. Building Phase Notice Modal */}
      <UnderConstructionModal />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}

