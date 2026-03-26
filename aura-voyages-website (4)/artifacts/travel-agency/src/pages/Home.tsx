import { Link } from "wouter";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Star, Globe2, Shield, Clock, Award, HeartHandshake, Sparkles, ChevronDown, Quote } from "lucide-react";
import { useGetDestinations } from "@workspace/api-client-react";

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop",
    title: "Discover the Untamed",
    subtitle: "Journey beyond the ordinary into extraordinary landscapes."
  },
  {
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1920&h=1080&fit=crop",
    title: "Embrace Serenity",
    subtitle: "Find your perfect escape in hidden paradise retreats."
  },
  {
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1920&h=1080&fit=crop",
    title: "Echoes of Eternity",
    subtitle: "Walk through history in the world's most iconic cities."
  },
  {
    image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=1920&h=1080&fit=crop",
    title: "Rise Above It All",
    subtitle: "Unlock perspectives that transform how you see the world."
  }
];

const STATS = [
  { value: "12+", label: "Years of Excellence" },
  { value: "98k+", label: "Happy Travelers" },
  { value: "85+", label: "Countries Covered" },
  { value: "4.9★", label: "Average Rating" },
];

const TESTIMONIALS = [
  {
    name: "Isabella Laurent",
    location: "Paris, France",
    text: "Aura Voyages arranged my honeymoon in Bora Bora with flawless precision. Every detail — from the overwater villa to the private sunset dinner — was beyond anything I could have imagined. Truly life-changing.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    destination: "Bora Bora, French Polynesia",
    stars: 5,
  },
  {
    name: "Marcus Chen",
    location: "Singapore",
    text: "The Vagabond First Class package to Japan was worth every cent. Our personal concierge arranged a private tea ceremony with a 5th-generation tea master. These are moments you can't Google — only Aura delivers this.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    destination: "Kyoto, Japan",
    stars: 5,
  },
  {
    name: "Sophia Müller",
    location: "Berlin, Germany",
    text: "I've traveled with many agencies, but Aura Voyages stands apart. Our Tanzania safari was so expertly curated — we watched the Great Migration from a private camp with just our family. Absolutely unforgettable.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    destination: "Serengeti, Tanzania",
    stars: 5,
  },
];

const FEATURES = [
  { icon: Globe2, title: "Global Expertise", desc: "Our concierges have firsthand knowledge of the world's most guarded secrets — places no guidebook will ever mention." },
  { icon: Shield, title: "Unwavering Security", desc: "Travel with complete peace of mind. Every journey is meticulously planned, insured, and monitored from departure to return." },
  { icon: Clock, title: "Time Crafted", desc: "We optimize every itinerary so your precious time is spent living extraordinary moments, not waiting in lines." },
  { icon: Award, title: "Award Winning", desc: "Recognized by Condé Nast Traveler and Travel + Leisure as a top luxury travel agency for over seven consecutive years." },
  { icon: HeartHandshake, title: "Bespoke Service", desc: "No two travelers are alike. Every journey we design is a one-of-a-kind experience built around your unique desires." },
  { icon: Sparkles, title: "Exclusive Access", desc: "From private museum after-hours to chef's table reservations at impossible-to-book restaurants — we open doors others can't." },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const { data: destinations } = useGetDestinations();
  const featuredDestinations = destinations?.slice(0, 6) || [];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {HERO_SLIDES.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ 
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.08,
              zIndex: currentSlide === index ? 10 : 0
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ y }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background z-10" />
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        ))}

        <motion.div 
          style={{ opacity }}
          className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-20"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm text-primary font-bold tracking-[0.2em] text-xs uppercase mb-6"
          >
            Aura Voyages — Luxury Travel
          </motion.span>
          
          <div className="h-[130px] sm:h-[160px] md:h-[200px] flex items-center justify-center mb-4">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="text-5xl sm:text-7xl md:text-8xl font-display font-bold text-white drop-shadow-2xl"
              >
                {HERO_SLIDES[currentSlide].title}
              </motion.h1>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto font-light"
            >
              {HERO_SLIDES[currentSlide].subtitle}
            </motion.p>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/destinations"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-base hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300"
            >
              Start Exploring
            </Link>
            <Link 
              href="/packages"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold text-base hover:bg-white/20 transition-all duration-300"
            >
              View Packages
            </Link>
          </motion.div>
        </motion.div>

        {/* Slide indicators */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`transition-all duration-300 rounded-full ${i === currentSlide ? 'w-8 h-2 bg-primary' : 'w-2 h-2 bg-white/40'}`}
            />
          ))}
        </div>

        {/* Search Overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[820px] z-30"
        >
          <div className="glass-card rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4">
            <div className="flex-grow w-full">
              <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1 block px-2">Where to?</label>
              <input 
                type="text" 
                placeholder="Search destinations..." 
                className="w-full bg-transparent border-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 px-2 text-lg"
              />
            </div>
            <div className="hidden md:block w-px h-10 bg-border/60" />
            <div className="w-full md:w-auto flex-shrink-0">
              <Link 
                href="/destinations"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30 transition-all font-semibold"
              >
                Search <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-[160px] right-8 z-30 hidden md:flex flex-col items-center gap-2">
          <span className="text-white/40 text-[10px] uppercase tracking-widest rotate-90 origin-center translate-y-6">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/0 via-white/40 to-white/0 scroll-indicator" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 bg-secondary border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-display font-bold gold-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">Curated Selection</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold">Featured Destinations</h2>
              <p className="text-muted-foreground mt-3 max-w-lg">Handpicked by our travel experts for their exceptional beauty, cultural richness, and unparalleled experiences.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/destinations" className="group flex items-center gap-2 text-foreground hover:text-primary font-medium transition-colors text-sm">
                View all {destinations?.length || 18} destinations 
                <span className="group-hover:translate-x-1 transition-transform"><ArrowRight size={16}/></span>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDestinations.length > 0 ? featuredDestinations.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.15 }}
                className={i === 0 ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <Link href={`/booking?destination=${dest.name}`} className="block group relative rounded-2xl overflow-hidden cursor-pointer" style={{ height: i === 0 ? '520px' : '360px' }}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors z-10" />
                  <img 
                    src={dest.imageUrl} 
                    alt={dest.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-7 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                    <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-md text-primary text-xs font-bold uppercase tracking-wider rounded-full w-max mb-3 border border-primary/30">
                      {dest.category}
                    </span>
                    <h3 className="text-3xl font-display font-bold text-white mb-1">{dest.name}</h3>
                    <p className="text-white/70 text-sm mb-4">{dest.country}</p>
                    
                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <div className="flex items-center gap-1">
                        <Star fill="currentColor" size={14} className="text-primary" />
                        <span className="font-bold text-white text-sm">{dest.rating}</span>
                        <span className="text-white/60 text-xs ml-2">From ${dest.priceFrom.toLocaleString()}</span>
                      </div>
                      <span className="text-white font-medium text-sm border-b border-primary pb-0.5">Explore Now →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )) : (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[360px] rounded-2xl bg-muted animate-pulse" />
              ))
            )}
          </div>

          <div className="text-center mt-10">
            <Link href="/destinations" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-primary/40 text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              Explore All Destinations <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">The Aura Difference</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-5">Why Travel With Us</h2>
            <p className="text-muted-foreground text-lg">We redefine luxury travel by blending exclusive access, unparalleled comfort, and deeply authentic local experiences into seamless, unforgettable itineraries.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.15 }}
                className="glass-card rounded-2xl p-8 group hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon size={26} className="text-primary" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">Guest Stories</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold">What Our Travelers Say</h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
                className="glass-card rounded-3xl p-10 md:p-14 relative"
              >
                <div className="absolute top-8 left-10 text-primary/20">
                  <Quote size={60} />
                </div>
                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                  <div className="shrink-0">
                    <img 
                      src={TESTIMONIALS[testimonialIndex].avatar} 
                      alt={TESTIMONIALS[testimonialIndex].name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-primary/30 shadow-lg shadow-primary/10"
                    />
                  </div>
                  <div>
                    <p className="text-foreground/90 text-lg leading-relaxed mb-6 italic">
                      "{TESTIMONIALS[testimonialIndex].text}"
                    </p>
                    <div>
                      <p className="font-display font-bold text-foreground">{TESTIMONIALS[testimonialIndex].name}</p>
                      <p className="text-muted-foreground text-sm">{TESTIMONIALS[testimonialIndex].location}</p>
                      <p className="text-primary text-xs font-medium mt-1">✈ {TESTIMONIALS[testimonialIndex].destination}</p>
                      <div className="flex gap-1 mt-2">
                        {Array.from({ length: TESTIMONIALS[testimonialIndex].stars }).map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" className="text-primary" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  className={`transition-all duration-300 rounded-full ${i === testimonialIndex ? 'w-8 h-2 bg-primary' : 'w-2 h-2 bg-muted-foreground/30'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages Teaser */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">Our Offerings</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Travel Packages <br/>For Every Dream</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">From adventurous solo journeys to ultra-luxury private escapes, our three meticulously crafted tiers ensure every traveler finds their perfect journey — all with transparent pricing and no hidden surprises.</p>
              
              <div className="space-y-4 mb-8">
                {[
                  { name: "Wanderer", price: "From $1,299/person", desc: "Essential luxury for independent spirits" },
                  { name: "Explorer", price: "From $2,499/person", desc: "Perfect balance of comfort & discovery" },
                  { name: "Vagabond First Class", price: "From $6,999/person", desc: "Uncompromising ultra-luxury experience" },
                ].map((pkg, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl glass-card group hover:border-primary/20 transition-all">
                    <div>
                      <p className="font-bold text-foreground">{pkg.name}</p>
                      <p className="text-muted-foreground text-sm">{pkg.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-bold text-sm">{pkg.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/packages" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all">
                Compare All Packages <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=500&q=80" 
                  alt="Luxury resort"
                  className="w-full h-56 object-cover rounded-2xl"
                />
                <img 
                  src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&q=80" 
                  alt="Scenic landscape"
                  className="w-full h-56 object-cover rounded-2xl mt-8"
                />
                <img 
                  src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=500&q=80" 
                  alt="Safari"
                  className="w-full h-48 object-cover rounded-2xl"
                />
                <img 
                  src="https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=500&q=80" 
                  alt="Santorini"
                  className="w-full h-48 object-cover rounded-2xl mt-8"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-4 shadow-xl shadow-black/20">
                <p className="text-xs text-muted-foreground mb-1">Trusted by travelers from</p>
                <p className="text-lg font-display font-bold text-primary">85+ Countries</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Your Next Adventure <br/>
              <span className="gold-shimmer">Awaits You</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Let our travel experts craft the journey of your lifetime. From the first call to your final return — we handle every detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking" className="px-10 py-5 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all duration-300">
                Start Your Journey
              </Link>
              <Link href="/contact" className="px-10 py-5 rounded-full border border-border text-foreground font-bold text-lg hover:border-primary hover:text-primary transition-all duration-300">
                Speak to a Concierge
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
