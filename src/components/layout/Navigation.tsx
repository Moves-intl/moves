import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import SecondaryMenu from "./navigation/SecondaryMenu";
import NavigationMenu from "./navigation/NavigationMenu";
import UserMenu from "./navigation/UserMenu";
import MobileMenu from "./navigation/MobileMenu";
import { HamburgerMenu } from "../HamburgerMenu";
// ... other imports

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const [destinations, setDestinations] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch destinations and services with useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch destinations
        const { data: destData, error: destError } = await supabase
          .from("destinations")
          .select("*")
          .order("name");

        if (destError) throw destError;
        setDestinations(destData || []);

        // Fetch services
        const { data: servData, error: servError } = await supabase
          .from("services")
          .select("*")
          .order("title");

        if (servError) throw servError;
        setServices(servData || []);
      } catch (error) {
        console.error("Error fetching navigation data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Main navigation items
  const destinationSubmenu = [
    { name: "All Destinations", path: "/destinations" },
    ...destinations
      .filter((dest) => dest?.slug?.trim())
      .map((dest) => ({
        name: dest.name,
        path: `/destinations/${dest.slug}`,
        isDestinationItem: true,
      })),
  ];

  const servicesSubmenu = [
    { name: "All Services", path: "/services" },
    ...services
      .filter((service) => service?.slug?.trim())
      .map((service) => ({
        name: service.title,
        path: `/services/${service.slug}`,
      })),
  ];

  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "Find a Course", path: "/courses" },
    {
      name: "Destinations",
      path: "/destinations",
      hasMegaMenu: true,
    },
    {
      name: "Services",
      path: "/services",
      hasMegaMenu: true,
    },
  ];
  const secondaryMenuItems = [
    { name: "About Us", path: "/about" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
    {
      name: "Our Offices",
      submenu: [
        {
          name: "Sydney Office",
          path: "https://movesinternational.com.au/",
          external: true,
        },
        {
          name: "Wollongong Office",
          path: "https://movesinternational.com.au/",
          external: true,
        },
        {
          name: "Dhaka Office",
          path: "https://www.movesinternational.com.bd",
          external: true,
        },
      ],
    },
  ];
  // ... rest of your component code

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <>
      {/* Secondary Top Menu */}
      <SecondaryMenu items={secondaryMenuItems} />

      {/* Main Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 relative">
            {/* Desktop logo + navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="overflow-visible">
                <img
                  src="/lovable-uploads/abcbb2a1-5db8-45ce-8215-42e053f17039.png"
                  alt="Moves International"
                  className={`w-auto ${
                    scrolled ? "h-14" : "h-28 py-0 shadow-sm"
                  }`}
                  style={{
                    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                />
              </Link>

              {/* Desktop navigation */}
              <NavigationMenu items={navigationItems} />
            </div>

            {/* Mobile logo + hamburger */}
            <div className="md:hidden flex items-center justify-between w-full px-4">
              {/* Logo */}
              <Link to="/">
                <img
                  src="/lovable-uploads/abcbb2a1-5db8-45ce-8215-42e053f17039.png"
                  alt="Moves International"
                  className="h-10 w-auto"
                />
              </Link>

              {/* Hamburger button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-primary transition-all duration-200 hover:scale-110"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
            {/* Desktop auth section */}
            <div className="hidden md:flex items-end">
              <HamburgerMenu />

              {user ? (
                <UserMenu user={user} onSignOut={handleSignOut} />
              ) : (
                <div className="flex items-center space-x-4">
                  <Button variant="outline" asChild>
                    <Link to="/auth">Sign In</Link>
                  </Button>
                  <Button
                    className="bg-[#fa8500] hover:bg-[#fa8500]/90 text-white"
                    asChild
                  >
                    <Link to="/consultation">Book Consultation</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <MobileMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          secondaryMenuItems={secondaryMenuItems}
          navigationItems={navigationItems}
          user={user}
          onSignOut={handleSignOut}
        />
      </nav>
    </>
  );
};

export default Navigation;
