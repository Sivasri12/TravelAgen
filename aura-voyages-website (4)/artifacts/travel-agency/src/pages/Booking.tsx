import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { useGetDestinations, useGetPackages, useCreateBooking } from "@workspace/api-client-react";
import { Plane, Calendar, Users, MapPin, Package, CheckCircle2 } from "lucide-react";
import { format, addDays, isBefore, startOfDay } from "date-fns";

const bookingSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  destinationName: z.string().min(1, "Please select a destination"),
  packageName: z.string().min(1, "Please select a package"),
  departureDate: z.string().min(1, "Departure date is required"),
  returnDate: z.string().min(1, "Return date is required"),
  travelers: z.coerce.number().min(1).max(10),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function Booking() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialDest = searchParams.get("destination") || "";
  const initialPkg = searchParams.get("package") || "";

  const [isSuccess, setIsSuccess] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const { data: destinations, isLoading: destLoading } = useGetDestinations();
  const { data: packages, isLoading: pkgLoading } = useGetPackages();
  const createBookingMutation = useCreateBooking();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isSubmitting }
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    mode: "onChange",
    defaultValues: {
      destinationName: initialDest,
      packageName: initialPkg,
      travelers: 1,
      departureDate: format(addDays(new Date(), 7), "yyyy-MM-dd")
    }
  });

  const watchPackage = watch("packageName");
  const watchTravelers = watch("travelers");
  const watchDeparture = watch("departureDate");
  const watchReturn = watch("returnDate");

  // Calculate dynamic price
  useEffect(() => {
    if (watchPackage && watchTravelers && packages) {
      const selectedPkg = packages.find(p => p.name === watchPackage);
      if (selectedPkg) {
        setTotalPrice(selectedPkg.pricePerPerson * watchTravelers);
      }
    } else {
      setTotalPrice(0);
    }
  }, [watchPackage, watchTravelers, packages]);

  // Date validation effect
  useEffect(() => {
    if (watchDeparture && watchReturn) {
      const dep = new Date(watchDeparture);
      const ret = new Date(watchReturn);
      if (isBefore(ret, dep)) {
        setValue("returnDate", format(addDays(dep, 1), "yyyy-MM-dd"));
      }
    }
  }, [watchDeparture, watchReturn, setValue]);

  const onSubmit = async (data: BookingFormValues) => {
    try {
      await createBookingMutation.mutateAsync({
        data: {
          ...data,
          totalPrice
        }
      });
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  const today = format(startOfDay(new Date()), "yyyy-MM-dd");
  const minReturnDate = watchDeparture 
    ? format(addDays(new Date(watchDeparture), 1), "yyyy-MM-dd") 
    : format(addDays(new Date(), 1), "yyyy-MM-dd");

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center overflow-hidden relative">
        {/* Airplane Animation */}
        <motion.div 
          initial={{ x: -200, y: 200, rotate: -45, scale: 0.5 }}
          animate={{ x: "120vw", y: -500, scale: 1.5 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute z-0 text-primary opacity-20 pointer-events-none"
        >
          <Plane size={200} />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 rounded-3xl text-center max-w-lg mx-4 z-10"
        >
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-primary" />
          </div>
          <h2 className="text-4xl font-display font-bold mb-4">Journey Secured</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Your booking has been confirmed. Our concierge team will contact you shortly to refine the details of your itinerary.
          </p>
          <button 
            onClick={() => setLocation("/")}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            Return Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative">
      {/* Background visual element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">Begin Your Journey</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold">Reservation Request</h1>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="glass-card rounded-3xl p-6 md:p-10 space-y-8"
        >
          {createBookingMutation.isError && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm font-medium">
              We encountered an issue processing your booking. Please check your details and try again.
            </div>
          )}

          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold border-b border-border/50 pb-2">Passenger Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Full Name</label>
                <input 
                  {...register("fullName")}
                  className="w-full bg-input/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="text-destructive text-xs">{errors.fullName.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Email Address</label>
                <input 
                  {...register("email")}
                  type="email"
                  className="w-full bg-input/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
              </div>
            </div>
          </div>

          {/* Trip Configuration */}
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold border-b border-border/50 pb-2">Trip Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                  <MapPin size={16} className="text-primary"/> Destination
                </label>
                <select 
                  {...register("destinationName")}
                  className="w-full bg-input/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground appearance-none"
                  disabled={destLoading}
                >
                  <option value="">Select a destination</option>
                  {destinations?.map(d => (
                    <option key={d.id} value={d.name}>{d.name} ({d.country})</option>
                  ))}
                </select>
                {errors.destinationName && <p className="text-destructive text-xs">{errors.destinationName.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                  <Package size={16} className="text-primary"/> Travel Package
                </label>
                <select 
                  {...register("packageName")}
                  className="w-full bg-input/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground appearance-none"
                  disabled={pkgLoading}
                >
                  <option value="">Select a package</option>
                  {packages?.map(p => (
                    <option key={p.id} value={p.name}>{p.name} - ${p.pricePerPerson}</option>
                  ))}
                </select>
                {errors.packageName && <p className="text-destructive text-xs">{errors.packageName.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                  <Calendar size={16} className="text-primary"/> Departure Date
                </label>
                <input 
                  type="date"
                  min={today}
                  {...register("departureDate")}
                  className="w-full bg-input/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                />
                {errors.departureDate && <p className="text-destructive text-xs">{errors.departureDate.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                  <Calendar size={16} className="text-primary"/> Return Date
                </label>
                <input 
                  type="date"
                  min={minReturnDate}
                  {...register("returnDate")}
                  className="w-full bg-input/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground"
                />
                {errors.returnDate && <p className="text-destructive text-xs">{errors.returnDate.message}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                  <Users size={16} className="text-primary"/> Number of Travelers
                </label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="1" max="10" 
                    {...register("travelers")}
                    className="flex-grow accent-primary"
                  />
                  <span className="text-2xl font-bold w-12 text-center bg-input/50 rounded-lg py-1">{watchTravelers}</span>
                </div>
                {errors.travelers && <p className="text-destructive text-xs">{errors.travelers.message}</p>}
              </div>
            </div>
          </div>

          {/* Total & Submit */}
          <div className="border-t border-border/50 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-sm text-muted-foreground block mb-1">Estimated Total</span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={totalPrice}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-4xl font-display font-bold text-primary"
                >
                  ${totalPrice.toLocaleString()}
                </motion.div>
              </AnimatePresence>
            </div>

            <button 
              type="submit"
              disabled={!isValid || isSubmitting || createBookingMutation.isPending}
              className="w-full md:w-auto px-10 py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-xl shadow-primary/20 hover:-translate-y-1 hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting || createBookingMutation.isPending ? (
                <>Processing...</>
              ) : (
                <>Confirm Booking <Plane size={18} className="rotate-45"/></>
              )}
            </button>
          </div>

        </motion.form>
      </div>
    </div>
  );
}
