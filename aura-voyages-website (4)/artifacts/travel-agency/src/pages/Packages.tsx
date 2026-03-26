import { motion } from "framer-motion";
import { useGetPackages } from "@workspace/api-client-react";
import { Check, X, Star, ArrowRight, Phone } from "lucide-react";
import { Link } from "wouter";

const COMPARISON_FEATURES = [
  "Accommodation",
  "Flights",
  "Airport Transfers",
  "Daily Meals",
  "Guided Tours",
  "Travel Insurance",
  "Concierge Service",
  "Spa & Wellness",
  "Private Experiences",
  "Helicopter/Yacht Access",
  "24/7 Dedicated Line",
];

const PACKAGE_DETAILS: Record<string, Record<string, string | boolean>> = {
  "Wanderer": {
    "Accommodation": "4-Star Hotel",
    "Flights": "Economy Class",
    "Airport Transfers": true,
    "Daily Meals": "Breakfast",
    "Guided Tours": "Group Tours",
    "Travel Insurance": false,
    "Concierge Service": false,
    "Spa & Wellness": false,
    "Private Experiences": false,
    "Helicopter/Yacht Access": false,
    "24/7 Dedicated Line": false,
  },
  "Explorer": {
    "Accommodation": "5-Star Hotel",
    "Flights": "Business Class",
    "Airport Transfers": "Private",
    "Daily Meals": "Breakfast & Dinner",
    "Guided Tours": "Private Guides",
    "Travel Insurance": "Comprehensive",
    "Concierge Service": true,
    "Spa & Wellness": "Hotel Access",
    "Private Experiences": "Select",
    "Helicopter/Yacht Access": false,
    "24/7 Dedicated Line": false,
  },
  "Vagabond First Class": {
    "Accommodation": "Ultra-Luxury Villa",
    "Flights": "Private Jet / First Class",
    "Airport Transfers": "VIP Limousine",
    "Daily Meals": "All-Inclusive + Private Chef",
    "Guided Tours": "Personal Expert",
    "Travel Insurance": "Platinum Coverage",
    "Concierge Service": "24/7 Personal Butler",
    "Spa & Wellness": "Full Private Program",
    "Private Experiences": "Fully Bespoke",
    "Helicopter/Yacht Access": true,
    "24/7 Dedicated Line": true,
  },
};

const POPULAR_DESTINATIONS = [
  "Santorini, Greece",
  "Kyoto, Japan",
  "Maldives",
  "Amalfi Coast, Italy",
  "Bali, Indonesia",
  "Safari Tanzania",
  "Norwegian Fjords",
  "Patagonia",
  "Cappadocia, Turkey",
  "Bora Bora",
];

export default function Packages() {
  const { data: packages, isLoading, error } = useGetPackages();

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary font-bold tracking-[0.2em] text-xs uppercase mb-5">
            Curated Experiences
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Travel Packages</h1>
          <p className="text-lg text-muted-foreground">
            Transparent pricing, unparalleled value. Select the tier that matches your ambition and let us craft the journey of a lifetime.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-destructive py-12 glass-card rounded-xl">
            <p>Failed to load packages. Please try again later.</p>
          </div>
        ) : (
          <>
            {/* Package Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative mb-24">
              {packages?.map((pkg, i) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className={`
                    relative rounded-3xl p-8 flex flex-col h-full
                    ${pkg.isPopular 
                      ? 'border-2 border-primary shadow-2xl shadow-primary/20 lg:-translate-y-6 bg-card' 
                      : pkg.tier === 'elite' 
                        ? 'border border-amber-700/40 bg-gradient-to-b from-amber-950/20 to-card glass-card'
                        : 'glass-card'
                    }
                  `}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-4 inset-x-0 flex justify-center">
                      <span className="bg-gradient-to-r from-primary to-amber-500 text-primary-foreground text-xs font-bold px-5 py-1.5 rounded-full shadow-lg uppercase tracking-wider flex items-center gap-1">
                        <Star size={12} fill="currentColor" /> Most Popular
                      </span>
                    </div>
                  )}

                  {pkg.tier === 'elite' && (
                    <div className="absolute -top-4 inset-x-0 flex justify-center">
                      <span className="bg-gradient-to-r from-amber-700 to-amber-500 text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                        ✦ Ultra Luxury
                      </span>
                    </div>
                  )}

                  <div className="mb-8 text-center border-b border-border/50 pb-8">
                    <h3 className={`text-2xl font-display font-bold mb-2 ${pkg.tier === 'elite' ? 'gold-text' : ''}`}>{pkg.name}</h3>
                    <p className="text-muted-foreground text-sm mb-6 min-h-[40px]">{pkg.description}</p>
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="text-4xl font-bold">${pkg.pricePerPerson.toLocaleString()}</span>
                      <span className="text-muted-foreground text-sm">/person</span>
                    </div>
                    <div className={`text-sm font-semibold ${pkg.isPopular ? 'text-primary' : 'text-muted-foreground'}`}>
                      {pkg.duration} Days · {pkg.duration - 1} Nights
                    </div>
                  </div>

                  <div className="flex-grow">
                    <ul className="space-y-3.5 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <Check size={16} className="text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link 
                    href={`/booking?package=${pkg.name}`}
                    className={`
                      w-full py-4 rounded-xl font-bold text-center transition-all duration-300 block
                      ${pkg.isPopular 
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1' 
                        : pkg.tier === 'elite'
                          ? 'bg-gradient-to-r from-amber-700 to-amber-500 text-white hover:shadow-lg hover:shadow-amber-600/30 hover:-translate-y-1'
                          : 'bg-secondary text-secondary-foreground hover:bg-foreground hover:text-background'
                      }
                    `}
                  >
                    Select {pkg.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Comparison Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-24"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">Compare Packages</h2>
                <p className="text-muted-foreground">A detailed breakdown of what's included in each tier</p>
              </div>

              <div className="glass-card rounded-2xl overflow-hidden overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left p-5 text-muted-foreground font-medium text-sm w-1/3">Feature</th>
                      {packages?.map((pkg) => (
                        <th key={pkg.id} className={`p-5 text-center text-sm font-bold ${pkg.tier === 'elite' ? 'gold-text' : pkg.isPopular ? 'text-primary' : 'text-foreground'}`}>
                          {pkg.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_FEATURES.map((feature, i) => (
                      <tr key={feature} className={`border-b border-border/30 ${i % 2 === 0 ? 'bg-background/30' : ''}`}>
                        <td className="p-5 text-sm text-foreground/80 font-medium">{feature}</td>
                        {packages?.map((pkg) => {
                          const val = PACKAGE_DETAILS[pkg.name]?.[feature];
                          return (
                            <td key={pkg.id} className={`p-5 text-center text-sm ${pkg.tier === 'elite' ? 'bg-amber-950/10' : pkg.isPopular ? 'bg-primary/5' : ''}`}>
                              {val === true ? (
                                <Check size={18} className="text-primary mx-auto" />
                              ) : val === false ? (
                                <X size={18} className="text-muted-foreground/40 mx-auto" />
                              ) : (
                                <span className="text-foreground/70">{val as string}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                    {/* Price Row */}
                    <tr className="bg-secondary/50">
                      <td className="p-5 font-bold text-sm">Starting Price</td>
                      {packages?.map((pkg) => (
                        <td key={pkg.id} className={`p-5 text-center font-bold ${pkg.tier === 'elite' ? 'gold-text' : 'text-primary'}`}>
                          ${pkg.pricePerPerson.toLocaleString()}/person
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-5" />
                      {packages?.map((pkg) => (
                        <td key={pkg.id} className="p-5 text-center">
                          <Link
                            href={`/booking?package=${pkg.name}`}
                            className={`inline-block px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                              pkg.tier === 'elite'
                                ? 'bg-gradient-to-r from-amber-700 to-amber-500 text-white'
                                : 'bg-primary text-primary-foreground'
                            }`}
                          >
                            Book Now
                          </Link>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Popular Destinations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-display font-bold mb-2">Top Destinations Included</h2>
                <p className="text-muted-foreground text-sm">All packages apply to our full roster of destinations</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {POPULAR_DESTINATIONS.map((dest, i) => (
                  <motion.span
                    key={dest}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-sm text-foreground/80 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
                  >
                    {dest}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Custom Concierge CTA */}
            <div className="p-8 md:p-10 glass-card rounded-3xl flex flex-col md:flex-row items-center gap-8 justify-between border border-primary/10 bg-gradient-to-r from-primary/5 via-transparent to-accent/5">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">Bespoke</div>
                <h4 className="font-display font-bold text-2xl mb-2">Need a Custom Itinerary?</h4>
                <p className="text-muted-foreground max-w-md">Our senior concierges specialize in crafting one-of-a-kind journeys tailored to your exact vision — from private island buyouts to multi-continent adventures.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link href="/contact" className="px-7 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all text-center">
                  Contact Concierge
                </Link>
                <a href="tel:+18002872864" className="flex items-center justify-center gap-2 px-7 py-4 border border-border text-foreground font-bold rounded-xl hover:border-primary hover:text-primary transition-colors">
                  <Phone size={16} /> Call Now
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
