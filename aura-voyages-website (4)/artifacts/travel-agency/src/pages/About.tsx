import { motion } from "framer-motion";
import { Link } from "wouter";
import { Wind, Award, Users, Globe2, Heart, ArrowRight, MapPin } from "lucide-react";

const TEAM = [
  {
    name: "Isabelle Fontaine",
    title: "Founder & Chief Voyager",
    bio: "Former foreign correspondent who turned a passion for discovery into Aura Voyages. Has personally visited 104 countries and still finds new magic in each one.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    countries: "104 countries",
  },
  {
    name: "Rafael Monteiro",
    title: "Head of Luxury Experiences",
    bio: "Former Ritz-Carlton General Manager with 20 years of ultra-luxury hospitality. Rafael's connections open doors that remain permanently closed to others.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    countries: "68 countries",
  },
  {
    name: "Yuki Tanaka",
    title: "Asia & Oceania Specialist",
    bio: "Born in Osaka, educated in Tokyo, and lived across Southeast Asia, Yuki's cultural fluency transforms ordinary Asia itineraries into deeply authentic encounters.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    countries: "42 countries",
  },
  {
    name: "Dimitri Papadakis",
    title: "Mediterranean & Africa Expert",
    bio: "Grew up sailing the Greek islands and spent 8 years guiding safaris across East Africa. Dimitri's itineraries find the soul of every destination he creates.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    countries: "57 countries",
  },
];

const VALUES = [
  {
    icon: Heart,
    title: "Passion for Discovery",
    desc: "Every member of our team is an avid traveler themselves. We design itineraries we'd be thrilled to experience personally — because we have.",
  },
  {
    icon: Award,
    title: "Uncompromising Quality",
    desc: "We personally vet every hotel, guide, restaurant, and experience we recommend. If it doesn't meet our standards, it doesn't make the cut.",
  },
  {
    icon: Globe2,
    title: "Authentic Connections",
    desc: "We build genuine relationships with local communities, artisans, and experts worldwide — creating access that transforms travel from tourism to transformation.",
  },
  {
    icon: Users,
    title: "Dedicated Concierge",
    desc: "You'll have a dedicated travel concierge from first inquiry to final return. One expert who knows your preferences, your pace, and your vision.",
  },
];

const AWARDS = [
  { year: "2024", award: "World's Best Luxury Travel Agency", org: "Condé Nast Traveler" },
  { year: "2023", award: "Top Travel Agency — Ultra Luxury", org: "Travel + Leisure" },
  { year: "2023", award: "Best Concierge Service", org: "Luxury Travel Intelligence" },
  { year: "2022", award: "Sustainability in Luxury Travel Award", org: "ATTA — Adventure Travel" },
  { year: "2022", award: "Editor's Choice — Best Travel Agency", org: "Forbes Travel Guide" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      {/* Hero */}
      <div className="relative h-80 overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background z-10" />
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
          alt="About Aura Voyages"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm text-primary font-bold tracking-[0.2em] text-xs uppercase mb-4"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold text-white drop-shadow-2xl"
          >
            About Aura Voyages
          </motion.h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Est. 2012</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Where Every Journey <br/>Becomes a Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Aura Voyages was born from a simple, radical belief: that travel, done right, can be the most transformative experience a human being can have. Founded in 2012 by Isabelle Fontaine — a former foreign correspondent who had reported from 87 countries — Aura set out to create something the world had never quite seen: a travel agency that operates with the soul of an explorer and the precision of a Swiss watch.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Over 12 years, we've curated thousands of journeys for discerning travelers across 85+ countries. We've arranged private access to the Louvre after hours, orchestrated a wedding on a secluded Maldivian sandbank, and guided families through the heart of the Amazon. Each journey is a story. Each story is uniquely yours.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Today, our team of 40+ travel specialists spans six continents. But our philosophy remains unchanged: we don't sell trips. We craft experiences that echo through a lifetime.
            </p>
            <Link href="/destinations" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all">
              Explore Destinations <ArrowRight size={18} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=500&q=80" alt="Safari" className="rounded-2xl h-64 w-full object-cover" />
              <img src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&q=80" alt="Maldives" className="rounded-2xl h-64 w-full object-cover mt-8" />
              <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80" alt="Kyoto" className="rounded-2xl h-52 w-full object-cover" />
              <img src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=500&q=80" alt="Cappadocia" className="rounded-2xl h-52 w-full object-cover mt-8" />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-card p-5 rounded-2xl shadow-xl shadow-black/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Wind size={24} className="text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground">98,000+ Journeys</p>
                  <p className="text-muted-foreground text-xs">Crafted since 2012</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="mb-28">
          <div className="text-center mb-14">
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">What Drives Us</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-8 text-center group hover:border-primary/20 transition-all"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                  <val.icon size={26} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-3">{val.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-28">
          <div className="text-center mb-14">
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">The Experts</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Meet Your Concierges</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Our team has collectively visited over 270 countries and territories — bringing firsthand knowledge that no algorithm can replicate.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-background/80 backdrop-blur-md rounded-full text-xs font-semibold text-primary">
                      <MapPin size={10} /> {member.countries}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg mb-0.5">{member.name}</h3>
                  <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-3">{member.title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">Recognition</span>
            <h2 className="text-4xl font-display font-bold">Awards & Recognition</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {AWARDS.map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-2xl p-6 flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Award size={22} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1 font-semibold">{award.year} · {award.org}</p>
                  <p className="font-display font-bold text-foreground">{award.award}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center glass-card rounded-3xl p-12 border border-primary/10 bg-gradient-to-r from-primary/5 via-transparent to-accent/5">
          <h2 className="text-4xl font-display font-bold mb-4">Ready to Begin Your Story?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Let our concierges design the journey of your lifetime. Every detail, every moment — crafted for you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-bold hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all">
              Book Your Journey
            </Link>
            <Link href="/contact" className="px-10 py-4 rounded-full border border-border text-foreground font-bold hover:border-primary hover:text-primary transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
