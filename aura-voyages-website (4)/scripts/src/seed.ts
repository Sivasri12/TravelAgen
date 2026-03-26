import { db } from "@workspace/db";
import { destinationsTable, packagesTable } from "@workspace/db/schema";

const destinations = [
  {
    name: "Santorini",
    country: "Greece",
    description: "Iconic white-washed buildings perched on volcanic cliffs above the deep blue Aegean Sea. Famous for breathtaking caldera sunsets, world-class wineries, and ancient Minoan ruins — a timeless romantic escape.",
    imageUrl: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
    rating: 4.9,
    priceFrom: 1899,
    category: "Romantic",
  },
  {
    name: "Machu Picchu",
    country: "Peru",
    description: "The legendary 'Lost City of the Incas' hidden among misty mountain peaks at 2,430 meters. An awe-inspiring UNESCO World Heritage site with extraordinary Incan architecture and breathtaking Andean scenery.",
    imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
    rating: 4.8,
    priceFrom: 2299,
    category: "Adventure",
  },
  {
    name: "Kyoto",
    country: "Japan",
    description: "Japan's cultural heart, home to over 1,600 Buddhist temples, traditional geisha districts, bamboo forests, and serene Zen gardens. Best experienced during sakura season when cherry blossoms transform the city.",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    rating: 4.9,
    priceFrom: 2499,
    category: "Culture",
  },
  {
    name: "Maldives",
    country: "Maldives",
    description: "A paradise of turquoise lagoons, powdery white beaches, and overwater bungalows above crystal-clear waters. Experience pristine coral reefs teeming with marine life in one of the world's most exclusive island destinations.",
    imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    rating: 5.0,
    priceFrom: 3999,
    category: "Luxury",
  },
  {
    name: "Patagonia",
    country: "Argentina & Chile",
    description: "Dramatic landscapes at the end of the world — soaring granite spires, vast glaciers, and untamed wilderness stretching across the Patagonian steppe. A bucket-list destination for hikers and nature lovers alike.",
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    rating: 4.7,
    priceFrom: 2799,
    category: "Adventure",
  },
  {
    name: "Amalfi Coast",
    country: "Italy",
    description: "A spectacular UNESCO-listed stretch of Mediterranean coastline with colorful fishing villages clinging to cliffs, fragrant lemon groves, and clifftop restaurants overlooking the sparkling azure sea.",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    rating: 4.8,
    priceFrom: 2199,
    category: "Romantic",
  },
  {
    name: "Bali",
    country: "Indonesia",
    description: "The Island of Gods — terraced emerald rice paddies, ancient stone temples, spiritual ceremonies at dawn, world-class surfing breaks, and a vibrant arts scene all wrapped in one lush tropical paradise.",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    rating: 4.7,
    priceFrom: 1499,
    category: "Culture",
  },
  {
    name: "Norwegian Fjords",
    country: "Norway",
    description: "Majestic natural waterways carved by ancient glaciers over millions of years, with towering cliff walls reflected in mirror-still waters, charming villages, and the ethereal Northern Lights dancing overhead.",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    rating: 4.9,
    priceFrom: 2599,
    category: "Nature",
  },
  {
    name: "Safari Tanzania",
    country: "Tanzania",
    description: "Witness the Great Migration of over a million wildebeest crossing the Serengeti. Encounter the Big Five from a private jeep on a luxury safari in Africa's most breathtaking savannah ecosystem.",
    imageUrl: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    rating: 4.8,
    priceFrom: 4299,
    category: "Adventure",
  },
  {
    name: "Reykjavik",
    country: "Iceland",
    description: "A gateway to otherworldly natural wonders — glaciers, geysers, black sand beaches, and the magical Northern Lights. Iceland's vibrant capital blends Nordic charm with geothermal spas and volcanic landscapes.",
    imageUrl: "https://images.unsplash.com/photo-1531366936337-77cf5e08bcce?w=800&q=80",
    rating: 4.8,
    priceFrom: 2800,
    category: "Nature",
  },
  {
    name: "Cappadocia",
    country: "Turkey",
    description: "A surreal landscape of fairy chimneys, ancient cave dwellings, and underground cities carved into volcanic rock. Rise above it all in a hot air balloon at sunrise for one of the world's most iconic travel experiences.",
    imageUrl: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&q=80",
    rating: 4.9,
    priceFrom: 1799,
    category: "Adventure",
  },
  {
    name: "Marrakech",
    country: "Morocco",
    description: "A sensory feast of ancient medinas, souks bursting with color and spice, ornate riads with hidden gardens, and the legendary Djemaa el-Fna square alive with storytellers, musicians, and street food at dusk.",
    imageUrl: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80",
    rating: 4.6,
    priceFrom: 1599,
    category: "Culture",
  },
  {
    name: "Dubrovnik",
    country: "Croatia",
    description: "The 'Pearl of the Adriatic' — a perfectly preserved medieval walled city rising from the sea. Walk the ancient ramparts, explore limestone-paved streets, and swim in hidden coves carved from pristine Croatian coastline.",
    imageUrl: "https://images.unsplash.com/photo-1555990538-1bf8e8e43f2e?w=800&q=80",
    rating: 4.7,
    priceFrom: 1899,
    category: "Romantic",
  },
  {
    name: "Bora Bora",
    country: "French Polynesia",
    description: "The jewel of the South Pacific — a volcanic island surrounded by a turquoise lagoon of impossible beauty. Overwater bungalows, private beaches, and colorful coral gardens make this the ultimate luxury escape.",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    rating: 5.0,
    priceFrom: 4799,
    category: "Luxury",
  },
  {
    name: "Dubai",
    country: "UAE",
    description: "Where the desert meets the future — futuristic skyscrapers, the world's tallest building, artificial islands, gold souks, and luxury shopping fused with ancient Emirati culture and Michelin-star dining.",
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    rating: 4.6,
    priceFrom: 2499,
    category: "Luxury",
  },
  {
    name: "Petra",
    country: "Jordan",
    description: "The rose-red city half as old as time, carved directly into rose-hued sandstone cliffs by the Nabataean people 2,000 years ago. Walk the Siq canyon to reveal the Treasury — one of humanity's greatest archaeological wonders.",
    imageUrl: "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?w=800&q=80",
    rating: 4.8,
    priceFrom: 1999,
    category: "Culture",
  },
  {
    name: "Queenstown",
    country: "New Zealand",
    description: "The adventure capital of the world, set against a backdrop of dramatic Remarkables mountain range and Lake Wakatipu. Bungee jump, ski, heli-hike, and then dine at award-winning restaurants by the lakeside.",
    imageUrl: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80",
    rating: 4.8,
    priceFrom: 3199,
    category: "Adventure",
  },
  {
    name: "Tuscany",
    country: "Italy",
    description: "Rolling golden hills dotted with cypress trees, medieval hilltop towns, world-renowned wine estates, and Renaissance art treasures. A region that perfected the art of la dolce vita centuries ago.",
    imageUrl: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800&q=80",
    rating: 4.8,
    priceFrom: 2099,
    category: "Romantic",
  },
];

const packages = [
  {
    name: "Wanderer",
    description: "Perfect for independent travelers seeking authentic experiences with essential comfort.",
    pricePerPerson: 1299,
    duration: 7,
    features: [
      "Round-trip economy flights",
      "4-star hotel accommodation",
      "Airport transfers",
      "Guided city walking tour",
      "Breakfast daily",
      "Digital travel guide & maps",
      "24/7 support hotline",
      "Travel tips & itinerary",
    ],
    isPopular: false,
    tier: "basic",
  },
  {
    name: "Explorer",
    description: "Our most popular package — the perfect balance of comfort, discovery, and exclusive access.",
    pricePerPerson: 2499,
    duration: 10,
    features: [
      "Round-trip business class flights",
      "5-star hotel accommodation",
      "Private airport transfers",
      "Expert guided tours included",
      "Breakfast & dinner daily",
      "Comprehensive travel insurance",
      "Dedicated concierge service",
      "Exclusive local experiences",
      "Spa access at hotel",
      "Welcome champagne package",
    ],
    isPopular: true,
    tier: "popular",
  },
  {
    name: "Vagabond First Class",
    description: "An uncompromising luxury experience where every detail is meticulously and personally crafted.",
    pricePerPerson: 6999,
    duration: 14,
    features: [
      "Private jet or first class flights",
      "Ultra-luxury 5-star resorts & villas",
      "Personal butler & travel concierge",
      "All meals with private chef option",
      "Helicopter & yacht excursions",
      "Bespoke spa & wellness program",
      "Private guided cultural immersions",
      "Platinum travel & medical insurance",
      "VIP airport lounge & fast-track",
      "Michelin-star dining reservations",
      "24/7 dedicated concierge line",
      "Curated luxury gift hamper",
    ],
    isPopular: false,
    tier: "elite",
  },
];

async function seed() {
  console.log("Seeding destinations...");
  await db.delete(destinationsTable);
  await db.insert(destinationsTable).values(destinations);
  console.log(`Inserted ${destinations.length} destinations`);

  console.log("Seeding packages...");
  await db.delete(packagesTable);
  await db.insert(packagesTable).values(packages);
  console.log(`Inserted ${packages.length} packages`);

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
