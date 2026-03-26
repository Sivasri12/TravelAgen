import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, Headphones, Globe2 } from "lucide-react";

const CONTACT_METHODS = [
  {
    icon: Phone,
    title: "Call Our Concierge",
    value: "+1 (800) 287-2864",
    desc: "Speak directly with a travel expert",
    action: "tel:+18002872864",
    badge: "24/7",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "voyages@auravoyages.com",
    desc: "Detailed response within 2 hours",
    action: "mailto:voyages@auravoyages.com",
    badge: "2hr response",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    value: "Chat on WhatsApp",
    desc: "Instant messaging with our team",
    action: "#",
    badge: "Instant",
  },
];

const OFFICES = [
  { city: "New York", address: "45 Aura Boulevard, Suite 800, NY 10001", phone: "+1 (800) 287-2864" },
  { city: "London", address: "12 Mayfair Court, Westminster, W1K 5AB", phone: "+44 20 7946 0400" },
  { city: "Dubai", address: "DIFC Gate Village, Tower 2, Level 8", phone: "+971 4 580 2864" },
];

const INQUIRIES = [
  "General Travel Inquiry",
  "Honeymoon & Romance",
  "Family Vacation",
  "Adventure Travel",
  "Luxury Private Journey",
  "Corporate Travel",
  "Group Travel (10+ people)",
  "Custom Bespoke Itinerary",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: "",
    destination: "",
    travelers: "2",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary font-bold tracking-[0.2em] text-xs uppercase mb-5">
            Get in Touch
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-5">Let's Plan <br/>Your Journey</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you have a destination in mind or simply a feeling you want to chase — our concierges are here to craft the perfect journey for you.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {CONTACT_METHODS.map((method, i) => (
            <motion.a
              key={i}
              href={method.action}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 group hover:border-primary/20 transition-all cursor-pointer block"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <method.icon size={22} className="text-primary" />
                </div>
                <span className="text-xs font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-full">{method.badge}</span>
              </div>
              <h3 className="font-display font-bold text-lg mb-1">{method.title}</h3>
              <p className="text-primary font-semibold text-sm mb-1">{method.value}</p>
              <p className="text-muted-foreground text-xs">{method.desc}</p>
            </motion.a>
          ))}
        </div>

        {/* Main Grid: Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-3xl p-8 md:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-primary" />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-3">Message Received!</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Thank you for reaching out. One of our senior concierges will contact you within 2 hours with a personalized proposal.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", inquiry: "", destination: "", travelers: "2", budget: "", message: "" }); }}
                    className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-2xl font-display font-bold mb-2">Inquiry Form</h2>
                  <p className="text-muted-foreground text-sm mb-8">Fill in the details below and a travel expert will reach out personally.</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-medium text-foreground/80 block mb-2">Full Name *</label>
                        <input
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground/80 block mb-2">Email Address *</label>
                        <input
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground/80 block mb-2">Phone Number</label>
                        <input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground/80 block mb-2">Inquiry Type *</label>
                        <select
                          name="inquiry"
                          required
                          value={formData.inquiry}
                          onChange={handleChange}
                          className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground appearance-none"
                        >
                          <option value="">Select inquiry type</option>
                          {INQUIRIES.map(i => <option key={i} value={i}>{i}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground/80 block mb-2">Dream Destination</label>
                        <input
                          name="destination"
                          value={formData.destination}
                          onChange={handleChange}
                          placeholder="e.g. Maldives, Japan, Italy..."
                          className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground/80 block mb-2">Number of Travelers</label>
                        <select
                          name="travelers"
                          value={formData.travelers}
                          onChange={handleChange}
                          className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground appearance-none"
                        >
                          {["1", "2", "3-4", "5-8", "9-15", "16+"].map(n => <option key={n} value={n}>{n} {n === "1" ? "traveler" : "travelers"}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground/80 block mb-2">Budget Range (per person)</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground appearance-none"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-2000">Under $2,000</option>
                        <option value="2000-4000">$2,000 – $4,000</option>
                        <option value="4000-7000">$4,000 – $7,000</option>
                        <option value="7000-15000">$7,000 – $15,000</option>
                        <option value="over-15000">$15,000+</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground/80 block mb-2">Tell Us Your Vision *</label>
                      <textarea
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Describe your ideal journey — the experiences you dream of, any special occasions, dietary needs, or anything else that will help us craft your perfect itinerary..."
                        className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} /> Send Inquiry
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Hours */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Clock size={18} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg">Concierge Hours</h3>
              </div>
              <div className="space-y-3 text-sm">
                {[
                  { day: "Monday – Friday", hours: "8:00 AM – 10:00 PM" },
                  { day: "Saturday", hours: "9:00 AM – 8:00 PM" },
                  { day: "Sunday", hours: "10:00 AM – 6:00 PM" },
                  { day: "Emergency Line", hours: "24/7 Always Available" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-border/40 last:border-0">
                    <span className="text-muted-foreground">{row.day}</span>
                    <span className={`font-medium ${row.day === "Emergency Line" ? "text-primary" : "text-foreground"}`}>{row.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Contact */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Headphones size={18} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg">Why Reach Out?</h3>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Personalized itineraries built for you",
                  "Access to unpublished exclusive offers",
                  "Expert advice from specialists who've been there",
                  "Group & corporate travel coordination",
                  "Last-minute emergency travel assistance",
                  "Honeymoon & special occasion planning",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Global Offices */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Globe2 size={18} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg">Our Offices</h3>
              </div>
              <div className="space-y-4">
                {OFFICES.map((office, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <MapPin size={14} className="text-primary shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground mb-0.5">{office.city}</p>
                      <p className="text-muted-foreground text-xs">{office.address}</p>
                      <p className="text-muted-foreground text-xs">{office.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
