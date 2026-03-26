import { motion, AnimatePresence } from "framer-motion";
import { useGetDestinations } from "@workspace/api-client-react";
import { Star, MapPin, SlidersHorizontal, X } from "lucide-react";
import { Link } from "wouter";
import { useState, useMemo } from "react";

const CATEGORIES = ["All", "Romantic", "Adventure", "Culture", "Luxury", "Nature"];
const SORT_OPTIONS = [
  { label: "Featured", value: "default" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
];

export default function Destinations() {
  const { data: destinations, isLoading, error } = useGetDestinations();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    if (!destinations) return [];
    let result = [...destinations];

    if (searchQuery) {
      result = result.filter(d =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeCategory !== "All") {
      result = result.filter(d => d.category === activeCategory);
    }

    if (sortBy === "price_asc") result.sort((a, b) => a.priceFrom - b.priceFrom);
    else if (sortBy === "price_desc") result.sort((a, b) => b.priceFrom - a.priceFrom);
    else if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [destinations, activeCategory, sortBy, searchQuery]);

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      {/* Hero Banner */}
      <div className="relative h-72 mb-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background z-10" />
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
          alt="Destinations"
          className="w-full h-full object-cover object-center scale-110"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm text-primary font-bold tracking-[0.2em] text-xs uppercase mb-4"
          >
            Where to next?
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold text-white drop-shadow-2xl"
          >
            Discover the World
          </motion.h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Explore our curated portfolio of {destinations?.length || 0} spectacular destinations across 6 continents — each chosen for its extraordinary beauty, cultural richness, and once-in-a-lifetime experiences.
        </motion.p>

        {/* Filter & Search Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-5">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search destinations or countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
              />
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground appearance-none pr-8"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted border border-border/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[400px] rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-destructive py-12 glass-card rounded-xl">
            <p>Failed to load destinations. Please try again later.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-display font-bold mb-2">No destinations found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms.</p>
            <button
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); setSortBy("default"); }}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                  className="break-inside-avoid relative group rounded-2xl overflow-hidden glass-card"
                >
                  <div className="relative overflow-hidden" style={{ height: i % 4 === 0 ? '420px' : '340px' }}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500 z-10" />
                    <img 
                      src={dest.imageUrl} 
                      alt={dest.name} 
                      className="w-full h-full object-cover grayscale-0 group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    
                    <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
                      <span className="px-3 py-1 bg-background/80 backdrop-blur-md text-foreground text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                        {dest.category}
                      </span>
                      <div className="flex items-center gap-1 bg-background/80 backdrop-blur-md px-2.5 py-1 rounded-full shadow-lg text-sm font-bold">
                        <Star fill="currentColor" className="text-primary" size={12} />
                        <span>{dest.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 z-30 p-6 bg-gradient-to-t from-background via-background/96 to-transparent translate-y-[40%] group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="flex items-center gap-1 text-primary mb-2">
                      <MapPin size={14} />
                      <span className="text-xs font-semibold tracking-wide uppercase">{dest.country}</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-2">{dest.name}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed">
                      {dest.description}
                    </p>
                    
                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150 translate-y-2 group-hover:translate-y-0">
                      <div>
                        <span className="text-xs text-muted-foreground block mb-0.5">Starting from</span>
                        <span className="text-xl font-bold text-foreground">${dest.priceFrom.toLocaleString()}</span>
                      </div>
                      <Link 
                        href={`/booking?destination=${dest.name}`}
                        className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
