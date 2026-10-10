"use client";

import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";

// Curated stock images from Unsplash to ensure reliable loading out of the box
const WORKS: WorksWheelItem[] = [
  {
    title: "Prismatic Rift",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    href: "#prismatic-rift",
  },
  {
    title: "Ember Clouds",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    href: "#ember-clouds",
  },
  {
    title: "Neon Portal",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    href: "#neon-portal",
  },
  {
    title: "Red Ribbon",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    href: "#red-ribbon",
  },
  {
    title: "Celestial",
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1200&q=80",
    href: "#celestial",
  },
  {
    title: "Uplight",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1200&q=80",
    href: "#uplight",
  },
  {
    title: "Indigo Marble",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    href: "#indigo-marble",
  },
  {
    title: "Launch Window",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    href: "#launch-window",
  },
  {
    title: "Cosmic Wave",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    href: "#cosmic-wave",
  },
];

export default function WorksWheelDemo() {
  return (
    <div className="bg-background text-foreground w-full h-screen">
      <WorksWheel items={WORKS} label="Works '26" action="View" />
    </div>
  );
}
