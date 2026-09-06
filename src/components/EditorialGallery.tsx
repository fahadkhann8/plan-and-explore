import React, { useState, useEffect, useCallback } from 'react';
import { Camera, X, MapPin, Maximize2, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/packages';
import { GalleryPhoto } from '../types';
import { useBodyScrollLock } from '../utils/scrollLock';

export const EditorialGallery: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const filters = ['All', 'Mountain Roads', 'Stays', 'Lakes', 'Waterfalls', 'Campfires', 'Snow'];

  const filteredPhotos =
    activeFilter === 'All'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.tag === activeFilter);

  // Centralized body scroll lock when lightbox is open
  useBodyScrollLock(selectedPhotoIndex !== null);

  const handleNextPhoto = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => ((prev! + 1) % filteredPhotos.length));
  }, [selectedPhotoIndex, filteredPhotos.length]);

  const handlePrevPhoto = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => ((prev! - 1 + filteredPhotos.length) % filteredPhotos.length));
  }, [selectedPhotoIndex, filteredPhotos.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, handleNextPhoto, handlePrevPhoto]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNextPhoto();
      } else {
        handlePrevPhoto();
      }
    }
    setTouchStartX(null);
  };

  const selectedPhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#FAFAF7] border-t border-[#0B1F33]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-20 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#5A5A40] mb-3 block">
              MOMENTS ALONG THE ROAD
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal text-[#0B1F33] leading-tight">
              Quiet Mountain Days
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#4F5E6E] font-editorial italic max-w-lg">
              Unfiltered Himalayan passes, timber chalets, starlit valley fires, and solitary riverbanks.
            </p>
          </div>

          {/* Minimalist Editorial Category Filter */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs" role="tablist" aria-label="Gallery category filters">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={activeFilter === f}
                onClick={() => {
                  setActiveFilter(f);
                  setSelectedPhotoIndex(null);
                }}
                className={`px-3.5 py-2.5 min-h-[44px] flex items-center transition-all cursor-pointer rounded-xs ${
                  activeFilter === f
                    ? 'text-[#0B1F33] font-bold border-b-2 border-[#0B1F33] bg-[#0B1F33]/5'
                    : 'text-[#4F5E6E] hover:text-[#0B1F33]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredPhotos.length === 0 ? (
          <div className="py-16 text-center bg-white border border-[#0B1F33]/10 rounded-sm">
            <ImageOff className="w-10 h-10 mx-auto text-[#4F5E6E]/40 mb-3" />
            <p className="font-editorial text-lg text-[#0B1F33]">No photographs found in "{activeFilter}"</p>
            <p className="text-xs text-[#4F5E6E] mt-1">Try switching to another category or explore "All".</p>
            <button
              onClick={() => setActiveFilter('All')}
              className="mt-4 px-4 py-2 bg-[#5A5A40] text-white text-xs uppercase font-bold tracking-wider rounded-xs cursor-pointer"
            >
              Show All Photos
            </button>
          </div>
        ) : (
          /* Editorial Masonry Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, index) => {
              const isTall = photo.aspectRatio === 'tall';
              const isWide = photo.aspectRatio === 'wide';

              return (
                <div
                  key={photo.id}
                  id={`gallery-item-${photo.id}`}
                  onClick={() => setSelectedPhotoIndex(index)}
                  className={`group relative rounded-sm overflow-hidden cursor-pointer bg-[#E8E8E1] border border-[#0B1F33]/10 transition-all duration-500 hover:shadow-md ${
                    isTall ? 'sm:row-span-2 aspect-[3/4] sm:aspect-auto' : isWide ? 'aspect-[16/10]' : 'aspect-square'
                  }`}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${photo.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedPhotoIndex(index);
                    }
                  }}
                >
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Subtle Editorial Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-85 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#E8E8E1] font-bold block mb-0.5">
                          {photo.tag}
                        </span>
                        <h4 className="font-editorial text-lg sm:text-xl font-normal text-white">
                          {photo.title}
                        </h4>
                        <p className="text-xs text-white/80 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#E8E8E1]" />
                          <span>{photo.location}</span>
                        </p>
                      </div>

                      <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shrink-0">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedPhoto && (
        <div
          id="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo Lightbox"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedPhotoIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button with min 44x44px touch target */}
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-4 right-4 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors cursor-pointer"
            aria-label="Close Lightbox (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          {filteredPhotos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPhoto();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors cursor-pointer"
              aria-label="Previous image (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next Button */}
          {filteredPhotos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextPhoto();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors cursor-pointer"
              aria-label="Next image (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div
            className="relative max-w-4xl w-full max-h-[88vh] overflow-hidden rounded-sm bg-black border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.image}
              alt={selectedPhoto.title}
              className="w-full h-full max-h-[72vh] object-contain mx-auto select-none"
            />
            <div className="p-4 sm:p-5 bg-[#0B1F33] text-white flex items-center justify-between border-t border-white/10">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#E8E8E1] font-bold block">
                  {selectedPhoto.tag} &middot; {selectedPhotoIndex! + 1} / {filteredPhotos.length}
                </span>
                <h3 className="font-editorial text-lg sm:text-2xl font-normal mt-0.5">
                  {selectedPhoto.title}
                </h3>
                <p className="text-xs text-white/70 flex items-center gap-1.5 mt-1 font-editorial italic">
                  <MapPin className="w-3.5 h-3.5 text-[#E8E8E1]" />
                  <span>{selectedPhoto.location}</span>
                </p>
              </div>

              <span className="text-xs text-white/60 hidden sm:inline font-editorial italic">
                Swipe or use arrow keys to navigate
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
