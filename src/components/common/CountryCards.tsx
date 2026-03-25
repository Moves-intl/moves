import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  MapPin,
  DollarSign,
  Clock,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Plane,
} from "lucide-react";
import { Button } from "../ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const CountryCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  // Fetch destinations from Supabase
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const { data, error } = await supabase
          .from("destinations")
          .select(
            "id, name, slug, description, flag_icon_url, average_fee, why_study_points"
          )
          .order("name");

        if (error) {
          console.error("Error fetching destinations:", error);
        } else {
          setDestinations(data || []);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Country-specific configurations
  const countryConfig = {
    Australia: {
      flag: "🇦🇺",
      features: [
        "2-4 year work visa",
        "High-quality education",
        "Multicultural society",
      ],
      averageFee: "$30,000 - $45,000",
      duration: "1-4 years",
      intakes: "Feb, Jul, Nov",
      gradient: "from-green-400 to-blue-600",
    },
    Canada: {
      flag: "🇨🇦",
      features: ["Work while studying", "PR pathways", "Safe environment"],
      averageFee: "$25,000 - $35,000",
      duration: "1-4 years",
      intakes: "Jan, May, Sep",
      gradient: "from-red-400 to-red-600",
    },
    "United Kingdom": {
      flag: "🇬🇧",
      features: ["1-year masters", "Research opportunities", "Rich culture"],
      averageFee: "$35,000 - $50,000",
      duration: "1-3 years",
      intakes: "Sep, Jan",
      gradient: "from-blue-400 to-purple-600",
    },
    "New Zealand": {
      flag: "🇳🇿",
      features: ["Work opportunities", "Safe country", "Beautiful nature"],
      averageFee: "$28,000 - $40,000",
      duration: "1-4 years",
      intakes: "Feb, Jul",
      gradient: "from-green-400 to-teal-600",
    },
    Germany: {
      flag: "🇩🇪",
      features: ["Low tuition fees", "Strong economy", "Research excellence"],
      averageFee: "$15,000 - $25,000",
      duration: "1-4 years",
      intakes: "Oct, Apr",
      gradient: "from-yellow-400 to-red-600",
    },
    USA: {
      flag: "🇺🇸",
      features: [
        "World-class universities",
        "Innovation hub",
        "Diverse opportunities",
      ],
      averageFee: "$40,000 - $60,000",
      duration: "1-4 years",
      intakes: "Aug, Jan",
      gradient: "from-blue-500 to-red-500",
    },
  };

  const getDefaultConfig = (countryName) => ({
    flag: "🌍",
    features: [
      "Quality education",
      "International experience",
      "Career opportunities",
    ],
    averageFee: "Contact for details",
    duration: "1-4 years",
    intakes: "Multiple intakes",
    gradient: "from-blue-400 to-indigo-600",
  });

  const nextSlide = () => {
    if (isTransitioning || destinations.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    if (isTransitioning || destinations.length === 0) return;
    setCurrentIndex(
      (prev) => (prev - 1 + destinations.length) % destinations.length
    );
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex || destinations.length === 0)
      return;
    setCurrentIndex(index);
  };

  // Auto-play functionality (similar to Projects component)
  useEffect(() => {
    if (destinations.length === 0 || isHovering) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % destinations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [destinations.length, isHovering]);

  // Animation class function similar to Projects component
  const getCardAnimationClass = (index) => {
    if (index === currentIndex) return "scale-100 opacity-100 z-20";
    if (index === (currentIndex + 1) % destinations.length)
      return "translate-x-[40%] scale-95 opacity-60 z-10";
    if (
      index ===
      (currentIndex - 1 + destinations.length) % destinations.length
    )
      return "translate-x-[-40%] scale-95 opacity-60 z-10";
    return "scale-90 opacity-0";
  };

  if (isLoading) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center w-fit leading-tight bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-3">
              <Plane className="w-4 h-4 mr-2" />
              Explore Countries
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-3">
              Choose Your Study Destination
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Loading destinations...
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!destinations || destinations.length === 0) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center w-fit leading-tight bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Plane className="w-4 h-4 mr-2" />
              Explore Countries
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
              Choose Your Study Destination
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              No destinations available at the moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center w-fit leading-tight bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-3">
            <Plane className="w-4 h-4 mr-2" />
            Explore Countries
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-3">
            Choose Your Study Destination
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Explore top study destinations with excellent education systems,
            work opportunities, and pathways to permanent residency.
          </p>
        </div>

        {/* Carousel Container - Similar to Projects component */}
        <div className="relative max-w-6xl mx-auto">
          <div
            className="relative min-h-[420px] sm:h-[450px] overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              {destinations.map((destination, index) => {
                const config =
                  countryConfig[destination.name] ||
                  getDefaultConfig(destination.name);

                // Get features from database or fallback to config
                const features =
                  destination.why_study_points &&
                  Array.isArray(destination.why_study_points)
                    ? destination.why_study_points.slice(0, 3)
                    : config.features;

                return (
                  <div
                    key={destination.id}
                    className={`absolute top-0 w-full max-w-md transform transition-all duration-500 ${getCardAnimationClass(
                      index
                    )}`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-auto w-full max-w-[340px] sm:max-w-[400px] mx-auto border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      {/* Header with gradient */}
                      <div
                        className={`bg-gradient-to-r ${config.gradient} p-6 text-white relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="text-4xl transform transition-transform duration-300 hover:scale-110">
                              {destination.flag_icon_url ? (
                                <img
                                  src={destination.flag_icon_url}
                                  alt={`${destination.name} flag`}
                                  className="w-12 h-8 object-cover rounded shadow-md"
                                />
                              ) : (
                                config.flag
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold mb-1">
                                {destination.name}
                              </h3>
                              <p className="text-white/90 text-sm line-clamp-2 leading-relaxed">
                                {destination.description ||
                                  `Discover amazing opportunities to study in ${destination.name}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        {/* Key Features */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-blue-600" />
                            Key Benefits
                          </h4>
                          <ul className="space-y-2">
                            {features
                              .slice(0, 2)
                              .map((feature, featureIndex) => (
                                <li
                                  key={featureIndex}
                                  className="flex items-start text-sm text-gray-700"
                                >
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                  <span className="line-clamp-1 leading-relaxed">
                                    {typeof feature === "string"
                                      ? feature
                                      : feature.point || feature}
                                  </span>
                                </li>
                              ))}
                          </ul>
                        </div>

                        {/* Details */}
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center text-sm text-gray-700">
                            <DollarSign className="w-4 h-4 mr-3 text-green-600 flex-shrink-0" />
                            <span className="font-medium min-w-0">
                              {destination.average_fee || config.averageFee}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <Clock className="w-4 h-4 mr-3 text-blue-600 flex-shrink-0" />
                            <span className="font-medium">
                              {config.duration}
                            </span>
                          </div>
                        </div>

                        {/* CTA Button */}
                        <div className="mt-auto">
                          <Link
                            to={`/destinations/${destination.slug}`}
                            className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group"
                          >
                            <span>Explore {destination.name}</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons - Similar to Projects component */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-all duration-300 hover:scale-110"
              aria-label="Previous destination"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-500 hover:bg-white z-30 shadow-md transition-all duration-300 hover:scale-110"
              aria-label="Next destination"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center space-x-3 z-30">
              {destinations.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "bg-primary/90 w-5"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to destination ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-primary rounded-2xl p-5 sm:p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Not sure which destination is right for you?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our expert counselors will help you choose the best study
              destination based on your academic background, career goals, and
              budget.
            </p>
            <a href="#lead_form">
              {" "}
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white"
              >
                Get Free Counseling
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCards;
