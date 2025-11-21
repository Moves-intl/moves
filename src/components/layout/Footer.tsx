import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function Footer() {
  const [services, setServices] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data: servData, error: servError } = await supabase
          .from("services")
          .select("*")
          .order("title");

        if (servError) throw servError;
        setServices(servData || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-primary to-primary/90 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            {/* ... your existing company info, contact, logo ... */}
          </div>

          {/* Study Abroad */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-accent relative inline-block">
              Study Abroad
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-accent/50 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { path: "/courses", label: "Find Courses" },
                { path: "/destinations", label: "Study Destinations" },
                { path: "/course-comparison", label: "Compare Courses" },
                {
                  path: "/destinations/australia",
                  label: "Study in Australia",
                },
                { path: "/destinations/canada", label: "Study in Canada" },
                { path: "/destinations/united-kingdom", label: "Study in UK" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-300 hover:text-accent transition-all duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 mr-2 transition-opacity duration-200"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-accent relative inline-block">
              Our Services
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-accent/50 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => navigate(`/services/${service.slug}`)}
                    className="text-gray-300 hover:text-accent transition-all duration-200 flex items-center group w-full text-left"
                  >
                    <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 mr-2 transition-opacity duration-200"></span>
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & CTA */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            {/* ... existing CTA code ... */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 Moves International. All rights reserved. |
              <span className="text-accent">
                {" "}
                Helping students achieve their dreams since 2010.
              </span>
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              {[
                { path: "/privacy-policy", label: "Privacy Policy" },
                { path: "/terms-of-service", label: "Terms of Service" },
                { path: "/cookie-policy", label: "Cookie Policy" },
                { path: "/sitemap", label: "Sitemap" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-400 hover:text-accent text-sm transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
