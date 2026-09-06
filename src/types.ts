export interface ItineraryDay {
  day: number;
  title: string;
  subtitle?: string;
  description: string;
  activities: string[];
  meals?: string;
  stay?: string;
  highlightBadge?: string;
  image?: string;
}

export interface PackageInclusion {
  icon: string;
  title: string;
  description?: string;
}

export interface TravelPackage {
  id: string;
  packageNumber: string;
  destination: string;
  subtitle: string;
  price: string;
  priceNote?: string;
  duration: string;
  frequency: string;
  departureFrom: string;
  coverImage: string;
  galleryImages: string[];
  shortDescription: string;
  overview: string;
  isPlaceholder?: boolean;
  inclusions: PackageInclusion[];
  exclusions?: string[];
  itinerary: ItineraryDay[];
  routeWaypoints: string[];
  elevation?: string;
  bestSeason?: string;
  groupSize?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  location: string;
  image: string;
  aspectRatio: 'tall' | 'wide' | 'square';
  tag: string;
}

export interface FeatureItem {
  id: string;
  number: string;
  title: string;
  description: string;
}
