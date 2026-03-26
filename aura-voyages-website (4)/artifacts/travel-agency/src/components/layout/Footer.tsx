import { Link } from "wouter";
import { Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone, Wind } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Wind size={20} className="text-primary" />
              </div>
              <span className="font-display font-bold text-xl tracking-wider text-foreground leading-tight">
                AURA<br/><span className="text-primary text-sm tracking-[0.3em]">VOYAGES</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              Curating extraordinary journeys for discerning travelers since 2012. Experience the world through the lens of luxury, authenticity, and wonder.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="w-9 h-9 rounded-full bg-secondary border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-base mb-5 text-foreground">Explore</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/destinations" className="hover:text-primary transition-colors">Destinations</Link></li>
              <li><Link href="/packages" className="hover:text-primary transition-colors">Travel Packages</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Photo Gallery</Link></li>
              <li><Link href="/booking" className="hover:text-primary transition-colors">Book a Trip</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-base mb-5 text-foreground">Support</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Travel Insurance</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-base mb-5 text-foreground">Contact</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <span>45 Aura Boulevard, Suite 800<br/>New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-primary shrink-0" />
                <span>+1 (800) 287-2864</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary shrink-0" />
                <span>voyages@auravoyages.com</span>
              </li>
            </ul>

            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-xs text-primary font-semibold mb-1">24/7 Concierge Line</p>
              <p className="text-sm font-bold text-foreground">+1 (800) 287-2864</p>
            </div>
          </div>

        </div>

        {/* Newsletter */}
        <div className="py-8 border-y border-border/50 mb-8 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div>
            <p className="font-display font-bold text-lg text-foreground">Join the Aura Inner Circle</p>
            <p className="text-muted-foreground text-sm mt-1">Receive exclusive deals, destination guides, and travel inspiration.</p>
          </div>
          <div className="flex w-full md:w-auto gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow md:w-72 bg-secondary border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
            />
            <button className="px-5 py-3 bg-primary text-primary-foreground font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Aura Voyages. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Crafted with passion for extraordinary journeys.</p>
        </div>
      </div>
    </footer>
  );
}
