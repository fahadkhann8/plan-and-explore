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
    price: '₹10,999',
    priceNote: 'Starting per person · Limited seasonal departures',
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
    price: '₹5,999',
    priceNote: 'Starting per person · Limited weekend slots',
    duration: '3 Nights / 4 Days',
    frequency: 'Every Thursday & Friday',
    departureFrom: 'Delhi (Majnu Ka Tilla / ISBT)',
    elevation: '2,050m',
    bestSeason: 'Spring Blossom, Monsoon Greenery, Winter Snow',
    groupSize: 'Weekend community & private departures',
    coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
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
          "Walk along Old Manali's rustic wooden lanes and local artist cafés",
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
  {
    id: 'udaipur-royal',
    packageNumber: 'PACKAGE 04',
    destination: 'Udaipur',
    subtitle: 'The City of Lakes — royal palaces, shimmering waters & Rajasthani charm',
    price: '₹7,499',
    priceNote: 'Starting per person · Seasonal departures',
    duration: '4 Nights / 5 Days',
    frequency: 'Bi-Weekly Departures',
    departureFrom: 'Delhi / Udaipur Airport',
    elevation: '598m',
    bestSeason: 'Oct – Mar · Pleasant Winters',
    groupSize: 'Curated small groups & private escapes',
    coverImage: 'https://images.unsplash.com/photo-1699949967693-9b0084730462?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1699949967693-9b0084730462?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1664241689244-ea76002ec956?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1784561329625-7e1732f78086?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598324789736-4861f89564a0?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'Known as the Venice of the East, Udaipur enchants with its floating palaces, shimmering lakes, ornate havelis, and the timeless grace of Mewar\'s royal heritage.',
    overview:
      'Udaipur is where India\'s regal past meets serene natural beauty. This curated 5-day itinerary takes you through the magnificent City Palace overlooking Lake Pichola, a sunset boat ride past the iconic Jag Mandir, the ancient fortress of Kumbhalgarh stretching along the Aravalli ridgeline, the exquisite marble carvings of Ranakpur\'s Jain temples, the vibrant lanes of the old city\'s bazaars, and a peaceful evening at the Monsoon Palace as golden light bathes the valley below. Every day blends history, art, and lakeside serenity.',
    isPlaceholder: false,
    routeWaypoints: [
      'Delhi / Arrival',
      'City Palace',
      'Lake Pichola',
      'Kumbhalgarh Fort',
      'Ranakpur Jain Temple',
      'Sajjangarh (Monsoon Palace)',
      'Departure',
    ],
    inclusions: [
      {
        icon: 'Home',
        title: '4-Night Heritage Haveli Stay',
        description: 'Boutique lakeside haveli or heritage hotel with rooftop lake views.',
      },
      {
        icon: 'Bus',
        title: 'All Transfers & Sightseeing',
        description: 'Private AC vehicle for airport pickups, Kumbhalgarh, Ranakpur & local sightseeing.',
      },
      {
        icon: 'Coffee',
        title: 'Daily Rajasthani Breakfasts',
        description: 'Authentic morning meals featuring pyaaz kachori, dal baati churma & fresh chai.',
      },
      {
        icon: 'Utensils',
        title: '4 Traditional Dinners',
        description: 'Royal Rajasthani thalis, lakeside candlelight dining & rooftop feasts.',
      },
      {
        icon: 'MapPin',
        title: 'Lake Pichola Sunset Boat Ride',
        description: 'Private evening boat cruise past Jag Mandir and the Lake Palace.',
      },
      {
        icon: 'Compass',
        title: 'Guided Heritage Walks',
        description: 'Expert-led tours of City Palace, old city lanes, and artisan workshops.',
      },
    ],
    exclusions: [
      'Airfare or train tickets to/from Udaipur',
      'Entry fees at Kumbhalgarh, Ranakpur & Sajjangarh (minimal)',
      'Personal shopping, tips & café expenses',
      'Travel insurance or medical emergency costs',
    ],
    itinerary: [
      {
        day: 1,
        title: 'ARRIVAL → UDAIPUR',
        subtitle: 'Welcome to the City of Lakes',
        description:
          'Arrive in Udaipur and feel the warm Rajasthani welcome. Transfer to your heritage haveli nestled along the banks of Lake Pichola. Spend the afternoon soaking in rooftop views of the shimmering lake and the distant Aravalli hills. As evening falls, stroll through the vibrant lanes near Jagdish Temple, soaking in the old-world charm of havelis, street art, and the aroma of Rajasthani spices.',
        activities: [
          'Arrive at Udaipur airport / railway station, private transfer to haveli',
          'Traditional tilak welcome with rose water and masala chai',
          'Check-in and freshen up at lakeside heritage haveli',
          'Afternoon rooftop relaxation with panoramic lake views',
          'Evening heritage walk through the old city lanes near Jagdish Temple',
          'Welcome dinner featuring authentic Mewari thali on the rooftop',
        ],
        meals: 'Dinner included',
        stay: 'Heritage Lakeside Haveli, Lake Pichola',
        highlightBadge: 'Royal Welcome',
      },
      {
        day: 2,
        title: 'CITY PALACE → LAKE PICHOLA',
        subtitle: 'Mewar\'s Crown Jewel & Golden Hour on Water',
        description:
          'Today is devoted to Udaipur\'s beating heart. Begin at the magnificent City Palace — a sprawling complex of courtyards, towers, and balconies overlooking Lake Pichola. Wander through the Crystal Gallery, Mor Chowk with its dazzling peacock mosaics, and the ornate Sheesh Mahal. After lunch at a lakeside café, explore the serene Saheliyon Ki Bari gardens. As the sun sets, board a private boat on Lake Pichola, gliding past the ethereal Jag Mandir and the iconic Lake Palace as the sky turns amber and rose.',
        activities: [
          'Energizing Rajasthani breakfast — pyaaz kachori, mirchi vada & chai',
          'Guided tour of City Palace: Mor Chowk, Sheesh Mahal & Crystal Gallery',
          'Explore the vintage car museum and royal armoury collection',
          'Leisurely lunch at a lakeside café overlooking the ghats',
          'Visit Saheliyon Ki Bari — the Garden of the Maidens with lotus pools',
          'Private sunset boat ride on Lake Pichola past Jag Mandir & Lake Palace',
          'Candlelight dinner at a rooftop restaurant with palace reflections',
        ],
        meals: 'Breakfast & Dinner included',
        stay: 'Heritage Lakeside Haveli',
        highlightBadge: 'City Palace',
      },
      {
        day: 3,
        title: 'KUMBHALGARH → RANAKPUR',
        subtitle: 'The Great Wall of India & Marble Poetry in Stone',
        description:
          'A spectacular day trip through the Aravalli ranges. First, ascend to the awe-inspiring Kumbhalgarh Fort — the second longest continuous wall in the world after the Great Wall of China, stretching over 36 kilometres along mountain ridges. The fort\'s massive bastions and panoramic views are staggering. Continue through winding forest roads to Ranakpur, home to one of India\'s most exquisite Jain temples, where 1,444 intricately carved marble pillars — no two alike — create a hypnotic labyrinth of light and shadow.',
        activities: [
          'Early breakfast and departure for the Aravalli hills',
          'Arrive at Kumbhalgarh Fort — explore the ramparts and palace ruins',
          'Walk along the fortress walls with sweeping views of the hills and jungle',
          'Scenic drive through leopard country and Aravalli forest roads',
          'Explore the magnificent Ranakpur Jain Temple and its 1,444 unique pillars',
          'Peaceful meditation in the temple\'s serene marble courtyard',
          'Return drive to Udaipur with a stop for chai at a village dhaba',
          'Traditional Rajasthani dinner with live folk music at the haveli',
        ],
        meals: 'Breakfast & Dinner included',
        stay: 'Heritage Lakeside Haveli',
        highlightBadge: 'Kumbhalgarh Fort',
      },
      {
        day: 4,
        title: 'HALDIGHATI → MONSOON PALACE → OLD CITY',
        subtitle: 'Warrior Legends, Hilltop Sunsets & Artisan Bazaars',
        description:
          'Begin with a visit to the historic battlefield of Haldighati where Maharana Pratap\'s legendary valour echoes through the crimson hills. Continue to the Maharana Pratap Memorial and museum. After lunch, explore Udaipur\'s vibrant artisan workshops — miniature paintings, silver jewellery, and block-printed textiles. As the day draws to a close, ascend to Sajjangarh (Monsoon Palace) perched high on a hilltop, offering a breathtaking 360-degree panorama as the sun sets behind the Aravalli ranges and the city lights begin to twinkle below.',
        activities: [
          'Leisurely breakfast at the haveli rooftop',
          'Day trip to Haldighati — walk the historic battlefield and visit the memorial',
          'Learn about Maharana Pratap\'s legacy at the museum',
          'Return to Udaipur for lunch at a heritage restaurant',
          'Explore artisan workshops: miniature Mewar paintings & block-print textiles',
          'Browse the bustling Hathi Pol and Bada Bazaar for handicrafts & spices',
          'Ascend to Sajjangarh Monsoon Palace for a spectacular hilltop sunset',
          'Farewell dinner — royal Rajasthani thali with dal baati churma & gatte ki sabzi',
        ],
        meals: 'Breakfast & Dinner included',
        stay: 'Heritage Lakeside Haveli',
        highlightBadge: 'Monsoon Palace Sunset',
      },
      {
        day: 5,
        title: 'UDAIPUR → DEPARTURE',
        subtitle: 'Final Lakeside Morning & Fond Farewell',
        description:
          'Wake up to the gentle sounds of Lake Pichola one last time. Enjoy a slow morning on the haveli rooftop, watching the sunrise paint the Aravalli hills in gold. Take a final walk through the old city, pick up last-minute souvenirs — Rajasthani mojris (leather juttis), miniature paintings, or bags of fragrant masala chai. Carry the warmth and colours of Udaipur home with you.',
        activities: [
          'Sunrise chai on the haveli rooftop overlooking the lake',
          'Relaxed final breakfast with fresh parathas and lassi',
          'Last stroll through the old city for souvenir shopping',
          'Pick up Rajasthani mojris, miniature paintings & spice boxes',
          'Check-out and private transfer to Udaipur airport / station',
        ],
        meals: 'Breakfast included',
        stay: 'Homeward journey',
        highlightBadge: 'Fond Farewell',
      },
    ],
  },
  {
    id: 'mcleodganj-triund',
    packageNumber: 'PACKAGE 05',
    destination: 'McLeodganj × Triund Trek',
    subtitle: 'Tibetan culture, Dhauladhar ridge trek, Triund camping & Dharamshala exploration',
    price: '₹6,250',
    priceNote: 'Starting per person (Quad: ₹6,250 · Triple: ₹6,350 · Double: ₹6,450) · Advance: ₹2,250',
    duration: '3 Nights / 4 Days',
    frequency: 'Upcoming Weekend Departures',
    departureFrom: 'Delhi (Jamia Millia Islamia)',
    elevation: '2,828m (Triund Top)',
    bestSeason: 'Spring Blossom, Summer Breezes & Autumn Clear Skies',
    groupSize: 'Community groups & private circles',
    coverImage: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1543832923-44667a44c804?auto=format&fit=crop&w=1200&q=80',
    ],
    shortDescription:
      'A thrilling Himalayan adventure connecting the Tibetan soul of McLeodganj to the dizzying ridge of Triund with overnight stargazing camping beneath the Dhauladhar giants.',
    overview:
      'Escape from the city with an immersive 4-day mountain getaway. Board from Jamia Millia Islamia, Delhi with a legendary midnight dhaba stop at Murthal, wake up in the cedar-scented tranquility of McLeodganj, visit the Dalai Lama Temple, and hike through deodar woods to St. John in the Wilderness. Next, ascend from Dharamkot along the iconic Triund trail for a mesmerizing sunset over the Kangra Valley and sleep in alpine tents under starry skies. Down below, unwind at Shiva Café, marvel at Bhagsu Waterfall, catch golden hour at Naddi, and explore Dharamshala\'s lush tea gardens and HPCA Cricket Stadium before returning refreshed.',
    isPlaceholder: false,
    routeWaypoints: [
      'Delhi (Jamia)',
      'Murthal',
      'McLeodganj',
      'Dharamkot',
      'Triund Top (2,828m)',
      'Shiva Café & Bhagsu',
      'Naddi & Dal Lake',
      'Dharamshala (HPCA & Tea Gardens)',
      'Delhi',
    ],
    inclusions: [
      {
        icon: 'Bus',
        title: 'Delhi ↔ McLeodganj Transit',
        description: 'Comfortable round-trip mountain transit departing from Jamia Millia Islamia, Delhi.',
      },
      {
        icon: 'Home',
        title: 'Hotel Stay & Triund Camping',
        description: 'Cozy hotel stay in McLeodganj + alpine tent camping with sleeping gear at Triund Top.',
      },
      {
        icon: 'Coffee',
        title: 'Breakfasts & Dinners',
        description: 'Nutritious hot mountain breakfasts and wholesome dinners during your stays.',
      },
      {
        icon: 'Compass',
        title: 'Guided Triund Trek',
        description: 'Experienced mountain trek leader with first-aid, navigation, and trail guidance.',
      },
      {
        icon: 'Sparkles',
        title: 'Bonfire & DJ Music Nights',
        description: 'Evening bonfires, music, interactive group games, and memorable night gatherings.',
      },
      {
        icon: 'MapPin',
        title: 'Full Dharamshala Sightseeing',
        description: 'Bhagsu Waterfall, Shiva Café, Dalai Lama Temple, St. John Church, Naddi, Tea Gardens & HPCA Stadium.',
      },
    ],
    exclusions: [
      'Personal snacks, café bills, and shopping on Mall Road',
      'En-route meals during transit (e.g. Murthal dinner)',
      'Any camera or stadium entry fees if applicable',
      'Travel insurance or medical emergency costs',
    ],
    itinerary: [
      {
        day: 0,
        title: 'DEPARTURE FROM DELHI',
        subtitle: 'Overnight Road Voyage & Murthal Food Stop',
        description:
          'Assemble at Jamia Millia Islamia, Delhi in the evening. Meet your fellow travelers and trip coordinator, board the vehicle, and begin the road trip toward the Himalayas. Make a classic first pitstop at Murthal for hot stuffed parathas, chai, and dinner before settling in for the overnight drive.',
        activities: [
          'Assemble at Jamia Millia Islamia departure point',
          'Meet your trip lead and group members',
          'Board the vehicle and commence the journey to Himachal',
          'First Stop: Murthal for dinner, authentic parathas & refreshments',
          'Overnight highway journey towards the Dhauladhar ranges',
        ],
        meals: 'Dinner at Murthal (self-paid)',
        stay: 'Overnight journey in comfortable transit',
        highlightBadge: 'Journey Begins',
      },
      {
        day: 1,
        title: 'WELCOME TO McLEODGANJ',
        subtitle: 'Arrival, Heritage, Café Hopping & Bonfire DJ Night',
        description:
          'Arrive in McLeodganj amidst cool morning breezes and tall deodar pines. Check in at your stay, freshen up, and enjoy a hearty breakfast. Spend the afternoon discovering the soul of Little Lhasa: visit the peaceful Dalai Lama Temple & Tsuglagkhang complex, explore the neo-Gothic St. John in the Wilderness Church hidden in cedar woods, and browse vibrant Tibetan handicrafts on Mall Road. Head out for café hopping, tasting steamed momos and Tibetan herbal teas. Conclude Day 1 with a lively bonfire, group games, and DJ music night.',
        activities: [
          'Morning arrival in McLeodganj & check-in at the hotel',
          'Freshen up and have a warm mountain breakfast',
          'Visit historic St. John in the Wilderness Church surrounded by deodars',
          'Explore Dalai Lama Temple / Monastery and soak in Tibetan spirituality',
          'Stroll along McLeodganj Mall Road for souvenirs, singing bowls & street food',
          'Café hopping: explore popular hillside cafés for bakery treats and snacks',
          'Evening dinner followed by Bonfire + DJ Night with music, dance & group fun',
        ],
        meals: 'Breakfast & Dinner included',
        stay: 'Hotel Stay, McLeodganj',
        highlightBadge: 'Bonfire + DJ Night',
      },
      {
        day: 2,
        title: 'THE TRIUND TREK',
        subtitle: 'Dharamkot to Triund Top & Stargazing Camping',
        description:
          'Wake up early, fuel up with breakfast, and pack a light daypack for the trek. Drive up to Dharamkot, the starting trailhead. Begin the scenic ascent through mixed forests of rhododendron and oak. As you climb, the Kangra valley opens up below and the sheer granite walls of the Dhauladhar loom closer. Reach the iconic Triund ridge by late afternoon, sip hot tea at the campsite, and witness an unforgettable golden sunset. As night sets in, gather around the bonfire under crystal-clear starry skies before retiring to your tents.',
        activities: [
          'Early wake up, freshen up & hot breakfast at the stay',
          'Pack trekking essentials (water, warm layers, camera)',
          'Drive from McLeodganj to Dharamkot trailhead',
          'Begin the trek through forest trails and panoramic viewpoint pauses',
          'Reach Triund Top (2,828m) and settle into the mountain campsite',
          'Enjoy hot evening tea with 360-degree panoramic vistas',
          'Spectacular sunset over the Dhauladhar range and Kangra valley',
          'Warm campsite dinner, acoustic music & group conversations',
          'Stargazing under brilliant Himalayan night skies',
          'Overnight camping in tents at Triund Top',
        ],
        meals: 'Breakfast & Camp Dinner included',
        stay: 'Alpine Tent Camping, Triund Top',
        highlightBadge: 'Triund Ridge Summit',
      },
      {
        day: 3,
        title: 'SUNRISE • DESCENT • BHAGSU • NADDI',
        subtitle: 'Shiva Café, Bhagsu Waterfall, Dal Lake & Naddi Sunset',
        description:
          'Wake up to a glorious sunrise as the first rays turn the Dhauladhar peaks into molten gold. After breakfast, begin the descent back toward McLeodganj. Take a well-deserved chillout break at the legendary Shiva Café, then visit the cascading Bhagsu Waterfall. Return to your hotel to freshen up and have lunch. In the late afternoon, drive to the tranquil Dal Lake and head up to Naddi Viewpoint to witness one of the most stunning sunset panoramas in Himachal. Enjoy a delicious dinner and a cozy second bonfire night.',
        activities: [
          'Witness the breathtaking Himalayan sunrise from Triund Top',
          'Morning tea, refreshments & breakfast at the campsite',
          'Begin the guided descent towards McLeodganj',
          'Relaxing pitstop at the famous Shiva Café with mountain views',
          'Visit the cascading Bhagsu Waterfall and explore the bazaar',
          'Return to the hotel, freshen up and enjoy lunch & rest',
          'Afternoon sightseeing: peaceful Dal Lake surrounded by deodars',
          'Naddi View Point: spectacular sunset overlooking the Dhauladhar peaks',
          'Return to hotel for dinner, group games, music and bonfire night',
        ],
        meals: 'Breakfast & Dinner included',
        stay: 'Hotel Stay, McLeodganj',
        highlightBadge: 'Bhagsu & Naddi Sunset',
      },
      {
        day: 4,
        title: 'DHARAMSHALA EXPLORATION → DELHI',
        subtitle: 'Tea Gardens, HPCA Cricket Stadium & Journey Home',
        description:
          'Enjoy your final mountain breakfast and check out from the stay. Head down into Dharamshala to wander through the lush green Kangra Tea Gardens with panoramic mountain views. Next, visit the world-famous HPCA Cricket Stadium, renowned as one of the most picturesque stadiums in the world backdropped by snow peaks. In the afternoon, board your transit for the return journey to Delhi, stopping for an en-route dinner. Arrive back in Delhi early morning with lifetime memories and new friendships.',
        activities: [
          'Leisurely morning breakfast and hotel check-out',
          'Visit Kangra / Dharamshala Tea Gardens for scenic tea plantation walks',
          'Tour the iconic HPCA Dharamshala Cricket Stadium for photography',
          'Begin the comfortable return journey toward Delhi',
          'En-route dinner & refreshments stop',
          'Overnight drive concluding with early morning arrival at Jamia / Delhi',
        ],
        meals: 'Breakfast included',
        stay: 'Return journey to Delhi',
        highlightBadge: 'HPCA Stadium',
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
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
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
