import { TravelPackage, GalleryPhoto, FeatureItem } from '../types';

export const WHATSAPP_NUMBER = (import.meta.env?.VITE_WHATSAPP_NUMBER as string) || '+91 7870721409';
export const WHATSAPP_RAW_NUMBER = (import.meta.env?.VITE_WHATSAPP_RAW_NUMBER as string) || '917870721409';
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_RAW_NUMBER}`;

// Brand Logo Configuration:
export const BRAND_LOGO_URL = 'https://i.postimg.cc/j5xm3CsJ/1000177583.jpg';

// Google Sheet Webhook URL:
// Configurable via .env (VITE_GOOGLE_SHEET_WEBHOOK_URL) or pasted directly here
export const GOOGLE_SHEET_WEBHOOK_URL = (import.meta.env?.VITE_GOOGLE_SHEET_WEBHOOK_URL as string) || '';

export const PACKAGES: TravelPackage[] = [
  {
    id: 'jibhi-tirthan',
    packageNumber: 'PACKAGE 01',
    destination: 'Jibhi & Tirthan Valley',
    subtitle: 'Misty pine trails, roaring river valleys & high Himalayan passes',
    price: '₹4,999',
    priceNote: 'Starting per person · Limited weekend slots',
    duration: '2 Nights / 3 Days',
    frequency: 'Every Friday',
    departureFrom: 'Delhi (Majnu Ka Tilla / Kashmere Gate)',
    elevation: '1,600m – 3,120m',
    bestSeason: 'Year Round · Snow in Winter',
    groupSize: 'Curated small groups & private escapes',
    coverImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'Hidden deep inside the Banjar valley of Himachal Pradesh, Jibhi is an untouched haven of cedar woods, mossy stone bridges, and cascading river streams.',
    overview:
      'Leave the noise of the city behind as we journey through scenic winding roads into Himachal’s best kept secret. Jibhi and Tirthan Valley invite you to slow down: breathe crisp deodar-scented mountain air, trek through the high winds of Jalori Pass up to the historic ruins of Raghupur Fort, sit by the crystal riverbanks of Tirthan, and discover natural limestone pools at Mini Thailand.',
    isPlaceholder: false,
    routeWaypoints: [
      'Delhi',
      'Jibhi Valley',
      'Jalori Pass (3,120m)',
      'Raghupur Fort',
      'Shoja',
      'Jibhi Waterfall',
      'Mini Thailand',
      'Delhi',
    ],
    inclusions: [
      {
        icon: 'Bus',
        title: 'Delhi → Jibhi Transportation',
        description: 'AC Volvo / Tempo Traveller round-trip comfortable mountain transit.',
      },
      {
        icon: 'Home',
        title: '2-Night Accommodation',
        description: 'Boutique riverside wooden cottage / aesthetic alpine homestay.',
      },
      {
        icon: 'Coffee',
        title: '2 Fresh Breakfasts',
        description: 'Nutritious hot mountain breakfasts made with fresh local ingredients.',
      },
      {
        icon: 'Utensils',
        title: '2 Wholesome Dinners',
        description: 'Warm, authentic Himachali & North Indian dinners served under the stars.',
      },
      {
        icon: 'Compass',
        title: 'Curated Local Sightseeing',
        description: 'Guided excursion to Jalori Pass, Raghupur Fort trek, Shoja, Waterfall & Mini Thailand.',
      },
      {
        icon: 'MapPin',
        title: 'Complete Trip Lead & Itinerary',
        description: 'Experienced mountain trek lead ensuring seamless logistics from start to finish.',
      },
    ],
    exclusions: [
      'Any personal expenses or café hopping in Jibhi',
      'Extra activities not specified in inclusions',
      'Travel insurance or medical emergency costs',
    ],
    itinerary: [
      {
        day: 1,
        title: 'DELHI → JIBHI',
        subtitle: 'The Mountain Crossing & Pine Valley Arrival',
        description:
          'Our journey begins in Delhi in the evening. As the urban sprawl fades into the Himalayan foothills, we climb past Mandi and Aut Tunnel into the lush, secluded Banjar Valley. Reach Jibhi by late morning, check into our handpicked wooden cottages surrounded by towering pine trees.',
        activities: [
          'Depart Delhi in comfortable tempo traveller / luxury transit',
          'Scenic drive along Beas and Tirthan riverbanks',
          'Check-in at boutique wooden stay in Jibhi',
          'Evening stroll through traditional Jibhi wooden village & stone bridges',
          'Unwind by the babbling mountain stream with evening tea',
          'Community dinner and overnight stay in Jibhi',
        ],
        meals: 'Dinner included',
        stay: 'Riverside Wooden Cottages / Traditional Homestay in Jibhi',
        highlightBadge: 'Valley Arrival',
      },
      {
        day: 2,
        title: 'JIBHI → JALORI PASS → RAGHUPUR → SHOJA',
        subtitle: 'High Altitude Pass & Ancient Himalayan Ridge Trek',
        description:
          'Wake up to misty mountain views and a hearty breakfast. Today we ascend to Jalori Pass (10,800 ft), one of the steepest and most dramatic passes in the Himalayas connecting Shimla and Kullu valleys. From the pass, we embark on an easy-to-moderate trek to Raghupur Fort with 360-degree views of snow-dusted Dhauladhar and Kinnaur ranges.',
        activities: [
          'Energizing breakfast amidst deodar trees',
          'Drive up the winding curves to Jalori Pass',
          'Panoramic summit views at Jalori Pass temple',
          'Hike to Raghupur Fort — walking through meadows and ancient oak forests',
          'Relax in the peaceful hamlet of Shoja with hot masala chai',
          'Return to Jibhi cottages for evening warmth & bonfire music',
          'Hearty dinner & restful night stay',
        ],
        meals: 'Breakfast & Dinner included',
        stay: 'Riverside Wooden Cottages, Jibhi',
        highlightBadge: 'Jalori Ridge (3,120m)',
      },
      {
        day: 3,
        title: 'JIBHI WATERFALL → MINI THAILAND → RETURN',
        subtitle: 'Hidden Lagoons, Forest Falls & Homeward Journey',
        description:
          'Savor your last morning in the valley with fresh brewed coffee. We visit the enchanting Jibhi Waterfall tucked away behind wooden footbridges and pine logs. Next, we walk to Mini Thailand (Kulaar), a secret natural emerald rock lagoon between two monolithic stones where the water is calm and crystal clear.',
        activities: [
          'Relaxed morning breakfast with mountain views',
          'Walk to Jibhi Waterfall along the forest wooden walkway',
          'Explore Mini Thailand rock pool & capture stunning photographs',
          'Café time in Jibhi village for local trout or artisanal wood-fired snacks',
          'Pack bags and bid goodbye to the hosts',
          'Board evening return transport back towards Delhi with unforgettable memories',
        ],
        meals: 'Breakfast included',
        stay: 'Comfortable overnight travel back to Delhi',
        highlightBadge: 'Emerald Lagoons',
      },
    ],
  },
  {
    id: 'kashmir-valley',
    packageNumber: 'PACKAGE 02',
    destination: 'Kashmir',
    subtitle: 'Paradise on Earth: Alpine meadows, Dal Lake houseboats & snow caps',
    price: 'Coming Soon',
    priceNote: 'Upcoming seasonal departures · Inquire for early slots',
    duration: '5 Nights / 6 Days',
    frequency: 'Bi-Weekly Departures',
    departureFrom: 'Delhi / Srinagar',
    elevation: '1,585m – 2,740m',
    bestSeason: 'Spring & Autumn · Winter Snow',
    groupSize: 'Curated experiential journeys',
    coverImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'From floating gently on a cedar Shikara at dawn to the sweeping pine meadows of Pahalgam and the snow carpets of Gulmarg, experience the timeless poetry of the valley.',
    overview:
      'Kashmir remains unmatched in its grace. This curated 6-day voyage takes you through the heritage water-ways of Srinagar, into the alpine wonderland of Gulmarg where the world’s highest gondola sweeps above conifers, through the whispering rivers of Pahalgam, and into the raw glacier streams of Sonamarg.',
    isPlaceholder: false,
    routeWaypoints: ['Delhi', 'Srinagar', 'Dal Lake', 'Gulmarg', 'Pahalgam', 'Sonamarg', 'Return'],
    inclusions: [
      {
        icon: 'Home',
        title: 'Heritage Stays & Luxury Houseboat',
        description: 'Curated mix of heritage lake houseboats and boutique pine chalets.',
      },
      {
        icon: 'Compass',
        title: 'Srinagar, Gulmarg & Pahalgam Transit',
        description: 'Private chauffeur-driven Innova / luxury coach for all transfers.',
      },
      {
        icon: 'Coffee',
        title: 'Daily Kashmiri Breakfasts & Dinners',
        description: 'Authentic Wazwan specialties and comforting home-style meals.',
      },
      {
        icon: 'MapPin',
        title: 'Shikara Ride on Dal Lake',
        description: 'Private sunset shikara cruise across lotus gardens and floating markets.',
      },
    ],
    itinerary: [
      {
        day: 1,
        title: 'DELHI → SRINAGAR',
        subtitle: 'Arrival & Dal Lake Houseboat Check-in',
        description:
          'Arrival into Srinagar. Welcome by local host and transfer to a traditional cedar-wood houseboat on the calm waters of Dal Lake. Evening at leisure absorbing the reflections of the Zabarwan mountains.',
        activities: [
          'Arrival at Srinagar airport / transit pickup',
          'Traditional Kahwa welcome at the Dal Lake houseboat',
          'Afternoon stroll along the boulevard',
          'Evening shikara ride as golden hour bathes the lake',
        ],
        meals: 'Dinner included',
        stay: 'Luxury Cedar Houseboat, Dal Lake',
        highlightBadge: 'Lake Houseboat',
      },
      {
        day: 2,
        title: 'SRINAGAR LOCAL',
        subtitle: 'Dal Lake, Shikara & Mughal Heritage',
        description:
          'Awaken to the calls of floating flower sellers. Today we explore Srinagar’s historic grandeur, from the terraced Mughal Gardens (Nishat & Shalimar) to the bustling Old Town lanes.',
        activities: [
          'Sunrise floating market experience on shikara',
          'Visit Shalimar Bagh and Nishat Bagh',
          'Explore local saffron, pashmina & walnut wood craft shops',
          'Sunset overlooking Hari Parbat from Dal Lake',
        ],
        meals: 'Breakfast & Dinner',
        stay: 'Boutique Hotel / Houseboat, Srinagar',
      },
      {
        day: 3,
        title: 'GULMARG',
        subtitle: 'Meadow of Flowers & The Gondola Ride',
        description:
          'Drive through miles of willow and poplar trees to Gulmarg. Ascend via the famous Gondola cable car toward Apharwat Peak for breathtaking views of Pir Panjal peaks.',
        activities: [
          'Scenic drive to Gulmarg (2,650m)',
          'Phase 1 & Phase 2 Gondola ride into alpine heights',
          'Walk through Saint Mary’s Church and historic golf course',
          'Return to Srinagar for an evening of warm local dining',
        ],
        meals: 'Breakfast & Dinner',
        stay: 'Hotel, Srinagar or Gulmarg',
        highlightBadge: 'Gondola Peaks',
      },
      {
        day: 4,
        title: 'PAHALGAM',
        subtitle: 'Valley of Shepherds & Lidder River',
        description:
          'Journey along the Lidder River towards Pahalgam. Known for lush meadows and pristine coniferous forests, Pahalgam offers untouched mountain tranquility.',
        activities: [
          'En-route visit to ancient Awantipora ruins and saffron fields',
          'Explore Betaab Valley and Aru Valley',
          'Leisure walk along the tumbling icy Lidder river',
          'Cozy evening stay nestled inside pine groves',
        ],
        meals: 'Breakfast & Dinner',
        stay: 'Riverside Resort, Pahalgam',
      },
      {
        day: 5,
        title: 'SONAMARG',
        subtitle: 'Meadow of Gold & Thajiwas Glacier',
        description:
          'A spectacular day trip to Sonamarg, surrounded by towering glaciated peaks. Gaze upon the Thajiwas Glacier and the pristine Sindh river that meanders through the pass.',
        activities: [
          'Drive along the scenic Sindh River gorge',
          'Trek or pony ride to the base of Thajiwas Glacier',
          'Picnic lunch amidst alpine wildflowers',
          'Return to Srinagar for farewell dinner',
        ],
        meals: 'Breakfast & Dinner',
        stay: 'Heritage Stay, Srinagar',
        highlightBadge: 'Thajiwas Glacier',
      },
      {
        day: 6,
        title: 'KASHMIR → DELHI',
        subtitle: 'Final Reflections & Return Journey',
        description:
          'Spend a quiet morning sipping saffron Kahwa. Pack souvenirs and cherished moments before transferring to the airport for the homeward journey.',
        activities: [
          'Leisurely morning breakfast by the water',
          'Last-minute souvenir and dry fruit shopping',
          'Transfer to Srinagar airport / transit for Delhi',
        ],
        meals: 'Breakfast included',
        stay: 'Homeward flight/transit',
      },
    ],
  },
  {
    id: 'manali-escape',
    packageNumber: 'PACKAGE 03',
    destination: 'Manali',
    subtitle: 'High alpine cedar forests, mountain cafés & Solang adrenaline',
    price: 'Coming Soon',
    priceNote: 'Upcoming weekend departures · Inquire for early slots',
    duration: '3 Nights / 4 Days',
    frequency: 'Every Thursday & Friday',
    departureFrom: 'Delhi (Majnu Ka Tilla / ISBT)',
    elevation: '2,050m',
    bestSeason: 'Spring Blossom, Monsoon Greenery, Winter Snow',
    groupSize: 'Weekend community & private departures',
    coverImage: 'https://images.unsplash.com/photo-1578592083906-89e477e77b18?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1578592083906-89e477e77b18?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'Crisp mountain breezes, cobblestone alleys in Old Manali, historic wooden pagoda temples, and high-altitude adventures nestled beneath the snow-crowned Rohtang pass.',
    overview:
      'Manali has a magnetic rhythm. From quiet afternoons spent listening to indie acoustic melodies in rustic apple-orchard cafés, to exploring the centuries-old deodar forests around Hadimba temple and feeling the brisk mountain wind in Solang Valley.',
    isPlaceholder: false,
    routeWaypoints: ['Delhi', 'Mandi', 'Kullu Valley', 'Old Manali', 'Solang Valley', 'Hadimba', 'Delhi'],
    inclusions: [
      {
        icon: 'Bus',
        title: 'Delhi → Manali Volvo Transit',
        description: 'Semi-sleeper luxury overnight Volvo buses between Delhi and Manali.',
      },
      {
        icon: 'Home',
        title: '3-Night Apple Orchard Stay',
        description: 'Charming mountain chalet or boutique stay with panoramic valley views.',
      },
      {
        icon: 'Coffee',
        title: 'Daily Breakfasts & Dinners',
        description: 'Wholesome buffet meals prepared fresh at the lodge.',
      },
      {
        icon: 'Compass',
        title: 'Solang & Old Manali Excursions',
        description: 'Dedicated sightseeing cab for temple, valley, and village trails.',
      },
    ],
    itinerary: [
      {
        day: 1,
        title: 'DELHI → MANALI',
        subtitle: 'Overnight Crossing & Orchard Valley Arrival',
        description:
          'Depart Delhi in the late afternoon aboard a luxury Volvo. Ascend through the misty turns of Bilaspur and Kullu. Arrive in Manali the next morning, check-in to your apple orchard retreat, and rest with views of snow-capped peaks.',
        activities: [
          'Overnight semi-sleeper Volvo travel from Delhi',
          'Morning check-in at scenic mountain resort in Manali',
          'Hot mountain breakfast and freshen up',
          'Afternoon stroll down to the Beas river bed',
          'Evening café hop in Old Manali and dinner',
        ],
        meals: 'Dinner included',
        stay: 'Boutique Lodge / Chalet, Old Manali',
        highlightBadge: 'Valley Arrival',
      },
      {
        day: 2,
        title: 'SOLANG VALLEY',
        subtitle: 'High Meadow Adrenaline & Glacial Vistas',
        description:
          'After breakfast, set out towards Solang Valley. Bask in the wide open alpine meadows flanked by sheer granite cliffs and glaciers. Option for adventure activities or serene walking trails.',
        activities: [
          'Wholesome breakfast at the lodge',
          'Drive past Nehru Kund into Solang Valley',
          'Mountain viewpoints, ropeway gondola ride, or nature walk',
          'Warm Maggi & Himachali siddu by mountain shacks',
          'Return to Manali for cozy bonfire night',
        ],
        meals: 'Breakfast & Dinner',
        stay: 'Boutique Lodge, Manali',
        highlightBadge: 'Solang Meadow',
      },
      {
        day: 3,
        title: 'MANALI LOCAL & HERITAGE',
        subtitle: 'Old Manali, Hadimba & Cultural Footpaths',
        description:
          'Discover the soul of Manali. Wander through the ancient cedar groves enclosing the 16th-century Hadimba Devi Temple, visit the sage Manu Temple in Old Manali, and browse the lively Mall Road.',
        activities: [
          'Breakfast amidst apple trees',
          'Visit centuries-old Hadimba Temple inside giant deodars',
          'Walk along Old Manali’s rustic wooden lanes and local artist cafés',
          'Visit Manu Temple and Vashisht Hot Springs',
          'Evening shopping and street food on Mall Road',
        ],
        meals: 'Breakfast & Dinner',
        stay: 'Boutique Lodge, Manali',
      },
      {
        day: 4,
        title: 'MANALI → DELHI',
        subtitle: 'Leisure Morning & Return Voyage',
        description:
          'Take in one last slow morning gazing at the Pir Panjal ranges. Enjoy leisurely coffee, pack handpicked souvenirs, and board the afternoon/evening Volvo returning to Delhi.',
        activities: [
          'Slow morning breakfast and check-out',
          'Free time for souvenir buying (pashminas, Kullu shawls, apples)',
          'Board evening Volvo towards Delhi with heartfelt memories',
        ],
        meals: 'Breakfast included',
        stay: 'Overnight Volvo journey to Delhi',
      },
    ],
  },
];

export const WHY_US_FEATURES: FeatureItem[] = [
  {
    id: 'curated-routes',
    number: '01',
    title: 'Curated Routes',
    description:
      'Thoughtfully selected destinations and road journeys that prioritize offbeat beauty over crowded tourist traps.',
  },
  {
    id: 'comfortable-stays',
    number: '02',
    title: 'Comfortable Stays',
    description:
      'Accommodation chosen to make the journey deeply comfortable without losing the authentic soul and character of the destination.',
  },
  {
    id: 'complete-planning',
    number: '03',
    title: 'Complete Planning',
    description:
      'Transport, handpicked stays, nourishing local meals and sensible timings all thoughtfully arranged so you can truly switch off.',
  },
  {
    id: 'explore-more',
    number: '04',
    title: 'Explore More',
    description:
      'Go beyond the usual checklist: hidden waterfalls, quiet stone villages, sunrise ridge treks, and stories shared over bonfires.',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Choose your journey',
    description: 'Explore our curated mountain packages and upcoming seasonal weekend departures.',
  },
  {
    step: '02',
    title: 'Make it yours',
    description: 'Tell us your dates, group size, or custom preferences directly on WhatsApp.',
  },
  {
    step: '03',
    title: 'Go explore',
    description: 'We handle the route, stays, logistics, and guidance. You pack light and enjoy the road.',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g1',
    title: 'Himalayan Ridge Road',
    location: 'Jalori Pass, Himachal',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'wide',
    tag: 'Mountain Roads',
  },
  {
    id: 'g2',
    title: 'Traditional Pine Chalet',
    location: 'Jibhi, Banjar Valley',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    aspectRatio: 'tall',
    tag: 'Stays',
  },
  {
    id: 'g3',
    title: 'Dawn on Dal Lake',
    location: 'Srinagar, Kashmir',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80',
    aspectRatio: 'square',
    tag: 'Lakes',
  },
  {
    id: 'g4',
    title: 'Secret Waterfall Pool',
    location: 'Tirthan Valley',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    aspectRatio: 'tall',
    tag: 'Waterfalls',
  },
  {
    id: 'g5',
    title: 'Evening Bonfire Moments',
    location: 'Shoja Campsite',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'wide',
    tag: 'Campfires',
  },
  {
    id: 'g6',
    title: 'Meadow Trekkers',
    location: 'Raghupur Fort Ridge',
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1000&q=80',
    aspectRatio: 'square',
    tag: 'Travelers',
  },
  {
    id: 'g7',
    title: 'Pine Valley Mist',
    location: 'Old Manali, Himachal',
    image: 'https://images.unsplash.com/photo-1578592083906-89e477e77b18?auto=format&fit=crop&w=1000&q=80',
    aspectRatio: 'tall',
    tag: 'Valleys',
  },
  {
    id: 'g8',
    title: 'Snow-Dusted Dhauladhar',
    location: 'Pir Panjal Ranges',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'wide',
    tag: 'Snow',
  },
];
