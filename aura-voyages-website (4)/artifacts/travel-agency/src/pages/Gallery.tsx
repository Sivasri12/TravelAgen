import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Filter } from "lucide-react";

const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&fit=crop", alt: "Santorini at sunset", category: "Europe", title: "Santorini Caldera Sunset" },
  { src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&fit=crop", alt: "Tokyo street at night", category: "Asia", title: "Tokyo Neon Nights" },
  { src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&fit=crop", alt: "Tropical resort pool", category: "Luxury", title: "Maldives Overwater Villa" },
  { src: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800&fit=crop", alt: "Desert dunes", category: "Adventure", title: "Sahara Dunes at Dawn" },
  { src: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&fit=crop", alt: "Rome Colosseum", category: "Europe", title: "Rome's Eternal Colosseum" },
  { src: "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?w=800&fit=crop", alt: "Snowy forest cabin", category: "Nature", title: "Nordic Winter Hideaway" },
  { src: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&fit=crop", alt: "Hot air balloons Cappadocia", category: "Adventure", title: "Cappadocia Hot Air Balloons" },
  { src: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&fit=crop", alt: "Venice canal", category: "Europe", title: "Venice Grand Canal" },
  { src: "https://images.unsplash.com/photo-1531366936337-77cf5e08bcce?w=800&fit=crop", alt: "Northern lights", category: "Nature", title: "Icelandic Aurora" },
  { src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&fit=crop", alt: "Greek coast", category: "Europe", title: "Aegean Coastline" },
  { src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&fit=crop", alt: "Safari animals", category: "Adventure", title: "Serengeti Elephant Herd" },
  { src: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&fit=crop", alt: "New York skyline", category: "City", title: "Manhattan After Dark" },
  { src: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&fit=crop", alt: "Machu Picchu", category: "Adventure", title: "Machu Picchu at Sunrise" },
  { src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&fit=crop", alt: "Kyoto temple", category: "Asia", title: "Kyoto Cherry Blossom Temple" },
  { src: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&fit=crop", alt: "Maldives aerial", category: "Luxury", title: "Maldives Turquoise Lagoon" },
  { src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&fit=crop", alt: "Patagonia", category: "Adventure", title: "Patagonian Wilderness" },
  { src: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&fit=crop", alt: "Amalfi coast", category: "Europe", title: "Amalfi Cliff Villages" },
  { src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&fit=crop", alt: "Bali rice terraces", category: "Asia", title: "Bali Emerald Rice Terraces" },
  { src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&fit=crop", alt: "Norwegian fjords", category: "Nature", title: "Norwegian Fjord Reflections" },
  { src: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&fit=crop", alt: "Tanzania safari", category: "Adventure", title: "Great Migration Kenya" },
  { src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&fit=crop", alt: "Dubai skyline", category: "City", title: "Dubai Futuristic Skyline" },
  { src: "https://images.unsplash.com/photo-1548786811-dd6e453ccca7?w=800&fit=crop", alt: "Petra Jordan", category: "Adventure", title: "Petra The Rose City" },
  { src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&fit=crop", alt: "Bora Bora", category: "Luxury", title: "Bora Bora South Pacific" },
  { src: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800&fit=crop", alt: "Tuscany hills", category: "Europe", title: "Tuscan Countryside" },
];

const CATEGORIES = ["All", "Europe", "Asia", "Adventure", "Nature", "Luxury", "City"];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<typeof GALLERY_IMAGES[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const filtered = GALLERY_IMAGES.filter(img => activeCategory === "All" || img.category === activeCategory);

  const openImage = (img: typeof GALLERY_IMAGES[0], idx: number) => {
    setSelectedImage(img);
    setSelectedIndex(idx);
  };

  const navigate = (dir: 1 | -1) => {
    const newIdx = (selectedIndex + dir + filtered.length) % filtered.length;
    setSelectedIndex(newIdx);
    setSelectedImage(filtered[newIdx]);
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">Captured Moments</span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-display font-bold">Through the Lens</h1>
              <p className="text-muted-foreground mt-3 max-w-xl">
                A visual journey through the world's most breathtaking destinations — from ancient ruins to turquoise lagoons, captured through the eyes of our travelers.
              </p>
            </div>
            <p className="text-muted-foreground text-sm whitespace-nowrap">{filtered.length} photos</p>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-secondary text-muted-foreground hover:text-foreground border border-border/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="popLayout">
          <div className="masonry-grid">
            {filtered.map((img, index) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: (index % 5) * 0.07 }}
                className="masonry-item relative rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => openImage(img, index)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col justify-end p-4">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="text-xs text-primary font-semibold uppercase tracking-wider mb-1 block">{img.category}</span>
                    <p className="text-white font-display font-bold text-sm">{img.title}</p>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <ZoomIn size={14} className="text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/96 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full"
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl">
                <span className="text-primary text-xs font-bold uppercase tracking-wider">{selectedImage.category}</span>
                <p className="text-white font-display font-bold text-lg">{selectedImage.title}</p>
              </div>
            </motion.div>

            {/* Nav Arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all backdrop-blur-sm"
            >
              ←
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all backdrop-blur-sm"
            >
              →
            </button>

            <button 
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all flex items-center justify-center backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <X size={18} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs">
              {selectedIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
