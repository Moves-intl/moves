import { useEffect, useRef, useState } from "react";
import { Search, Filter, Heart, MessageCircle, Rocket, ArrowRight, Sparkles, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function HowToApply() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [hasShownFeedback, setHasShownFeedback] = useState(false);
  const [feedbackLoaded, setFeedbackLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Show the feedback popup once the "How It Works" section scrolls into view
  useEffect(() => {
    if (hasShownFeedback || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowFeedback(true);
          setHasShownFeedback(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasShownFeedback]);

  const steps = [
    {
      id: 1,
      title: "Browse Courses",
      description: "Explore hundreds of courses and top universities across the World.",
      icon: Search,
      bgColor: "bg-blue-50",
      cardBg: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
      accentColor: "bg-blue-600",
      borderColor: "border-blue-200",
      button: {
        label: "Browse Courses",
        href: "/courses",
      },
      illustration: (
        <div className="relative">
          <img
            src="https://coadhiipbnnqlmslpzeu.supabase.co/storage/v1/object/public/media/steps/blue_search.svg"
            className="w-24 h-24 rounded-lg shadow-md"
            alt="Browse courses illustration"
          />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-2.5 h-2.5 text-white" />
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Use Smart Filters",
      description: "Apply filters to narrow down the perfect course that fits your goals.",
      icon: Filter,
      bgColor: "bg-green-50",
      cardBg: "bg-gradient-to-br from-green-50 to-green-100",
      iconColor: "text-green-600",
      accentColor: "bg-green-600",
      borderColor: "border-green-200",
      button: {
        label: "Apply Filter",
        href: "/courses",
      },
      illustration: (
        <div className="relative">
          <img
            src="https://coadhiipbnnqlmslpzeu.supabase.co/storage/v1/object/public/media/steps/green_filter.svg"
            className="w-24 h-24 rounded-lg shadow-md"
            alt="Smart filters illustration"
          />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-2.5 h-2.5 text-white" />
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Save & Compare",
      description: "Shortlist your favorite courses and compare them side by side.",
      icon: Heart,
      bgColor: "bg-pink-50",
      cardBg: "bg-gradient-to-br from-pink-50 to-pink-100",
      iconColor: "text-pink-600",
      accentColor: "bg-pink-600",
      borderColor: "border-pink-200",
      button: {
        label: "Compare Courses",
        href: "/courses",
      },
      illustration: (
        <div className="relative">
          <img
            src="https://coadhiipbnnqlmslpzeu.supabase.co/storage/v1/object/public/media/steps/pink_saves.svg"
            className="w-24 h-24 rounded-lg shadow-md"
            alt="Save and compare illustration"
          />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-2.5 h-2.5 text-white" />
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Apply or Get Counselling",
      description: "Apply directly or book a free session with our expert education counsellors.",
      icon: MessageCircle,
      bgColor: "bg-orange-50",
      cardBg: "bg-gradient-to-br from-orange-50 to-orange-100",
      iconColor: "text-orange-600",
      accentColor: "bg-orange-600",
      borderColor: "border-orange-200",
      button: {
        label: "Book Consultation",
        href: "/services/consultation",
      },
      illustration: (
        <div className="relative">
          <img
            src="https://coadhiipbnnqlmslpzeu.supabase.co/storage/v1/object/public/media/steps/orange_counsels.svg"
            className="w-24 h-24 rounded-lg shadow-md"
            alt="Counselling illustration"
          />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-2.5 h-2.5 text-white" />
          </div>
        </div>
      )
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4 md:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: '#f5f5f5' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
      <div className="inline-flex items-start w-fit leading-tight bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-3">
            <Rocket className="w-4 h-4 mr-2" /> 
            Get Started
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-primary bg-clip-text text-transparent mb-4 sm:mb-6">
            How It Works
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find your perfect course in just 4 simple steps and start your educational journey today
          </p>
        </div>

        {/* Animated Path Overlay */}
        <div className="absolute inset-0 pointer-events-none z-5">
          {/* Desktop Path (lg screens) */}
          <svg className="hidden lg:block absolute inset-0 w-full h-full" viewBox="0 0 1200 400" fill="none">
            <path
              id="desktop-path"
              d="M150 120 Q200 80, 300 120 Q350 100, 450 140 Q500 90, 600 140 Q650 110, 750 120 Q800 80, 900 120 Q950 100, 1050 120"
              stroke="#E5E7EB"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8 4"
              className="opacity-60"
            />
            {/* Moving Arrow */}
            <circle r="8" fill="url(#moving-gradient)">
              <animateMotion dur="8s" repeatCount="indefinite">
                <mpath href="#desktop-path"/>
              </animateMotion>
            </circle>
            <defs>
              <linearGradient id="moving-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="25%" stopColor="#10B981" />
                <stop offset="50%" stopColor="#EC4899" />
                <stop offset="75%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Mobile Path (sm screens) */}
          <svg className="block md:hidden absolute inset-0 w-full h-full" viewBox="0 0 400 1200" fill="none">
            <path
              id="mobile-path"
              d="M200 100 Q160 150, 200 200 Q240 250, 200 300 Q160 350, 200 400 Q240 450, 200 500 Q160 550, 200 600 Q240 650, 200 700"
              stroke="#E5E7EB"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8 4"
              className="opacity-60"
            />
            {/* Moving Arrow */}
            <circle r="6" fill="url(#moving-gradient-mobile)">
              <animateMotion dur="6s" repeatCount="indefinite">
                <mpath href="#mobile-path"/>
              </animateMotion>
            </circle>
            <defs>
              <linearGradient id="moving-gradient-mobile" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="33%" stopColor="#10B981" />
                <stop offset="66%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
            </defs>
          </svg>

          {/* Tablet Path (md screens) */}
          <svg className="hidden md:block lg:hidden absolute inset-0 w-full h-full" viewBox="0 0 800 600" fill="none">
            <path
              id="tablet-path"
              d="M200 120 Q240 80, 200 200 Q160 250, 200 300 Q260 320, 400 280 Q440 260, 600 300 Q580 350, 600 400 Q560 440, 600 480"
              stroke="#E5E7EB"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8 4"
              className="opacity-60"
            />
            {/* Moving Arrow */}
            <circle r="7" fill="url(#moving-gradient-tablet)">
              <animateMotion dur="7s" repeatCount="indefinite">
                <mpath href="#tablet-path"/>
              </animateMotion>
            </circle>
            <defs>
              <linearGradient id="moving-gradient-tablet" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="33%" stopColor="#10B981" />
                <stop offset="66%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, index) => (
            <div key={step.id} className="relative group">
              {/* Connection Dots */}
              <div className={`absolute ${index % 2 === 0 ? '-top-2' : '-bottom-2'} left-1/2 transform -translate-x-1/2 w-4 h-4 ${step.accentColor} rounded-full shadow-lg border-2 border-white z-20`}>
                <div className={`w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse`}></div>
              </div>

              {/* Card */}
              <div className={`${step.cardBg} h-full rounded-3xl p-6 text-center relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 z-10 border ${step.borderColor}`}>
                {/* Step Number Badge */}
                <div className={`absolute top-4 right-4 w-7 h-7 ${step.accentColor} rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg`}>
                  {step.id}
                </div>

                {/* Icon Background */}
                <div className={`w-12 h-12 ${step.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-inner border ${step.borderColor}`}>
                  <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                </div>

                {/* Illustration */}
                <div className="mb-4 flex justify-center">
                  <div className="flex items-center justify-center relative transform transition-transform duration-300 group-hover:scale-110">
                    {step.illustration}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {step.description}
                </p>

                {step.button && (
                  <a
                    href={step.button.href}
                    className={`inline-flex items-center gap-2 ${step.accentColor} text-white text-sm font-medium px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group/btn`}
                  >
                    {step.button.label}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </a>
                )}

                {/* Floating Decorative Elements */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-white/40 rounded-full animate-ping"></div>
                <div className="absolute bottom-6 left-6 w-3 h-3 bg-white/30 rounded-full"></div>
                <div className="absolute top-12 right-12 w-1.5 h-1.5 bg-white/35 rounded-full animate-pulse"></div>
                
                {/* Hover Glow Effect */}
                <div className={` inset-0 ${step.accentColor} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog
        open={showFeedback}
        onOpenChange={(open) => {
          if (!open && !feedbackLoaded) return;
          setShowFeedback(open);
        }}
      >
        <DialogContent className="max-w-2xl h-[80vh] p-0 overflow-hidden [&>button:last-of-type]:hidden">
          <button
            onClick={() => feedbackLoaded && setShowFeedback(false)}
            disabled={!feedbackLoaded}
            aria-label="Close"
            className={`absolute top-4 right-4 z-50 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${
              feedbackLoaded
                ? "bg-white text-red-600 hover:bg-red-50 cursor-pointer"
                : "bg-white/70 text-red-300 cursor-not-allowed"
            }`}
          >
            <X className="w-4 h-4" />
          </button>
          {!feedbackLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
          )}
          <iframe
            src="https://app.agents360.io/feedback/moves"
            title="Check In"
            scrolling="no"
            onLoad={() => setFeedbackLoaded(true)}
            style={{
              width: "100%",
              height: "100%",
              border: 0,
              display: "block",
              overflow: "hidden",
              opacity: feedbackLoaded ? 1 : 0,
              transition: "opacity 0.2s ease",
            }}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}