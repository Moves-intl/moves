import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-primary to-primary/90 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img
                src="/lovable-uploads/abcbb2a1-5db8-45ce-8215-42e053f17039.png"
                alt="Moves International"
                className="h-12 w-auto filter brightness-0 invert mr-3"
              />
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
                  Moves International
                </h3>
                <p className="text-xs text-gray-400">
                  Education & Migration Experts
                </p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6 text-sm">
              Australia's leading education and migration services provider,
              empowering international students to achieve their academic and
              career aspirations since 2010.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-start group">
                <div className="bg-accent/20 p-2 rounded-lg group-hover:bg-accent transition-colors duration-200 mr-3">
                  <Phone className="h-4 w-4 text-accent group-hover:text-white" />
                </div>
                <div>
                  <span className="text-white block font-medium">
                    +977-9768991102
                  </span>
                  <span className="text-xs text-gray-400">
                    Sun-Fri 9AM-5PM NPT
                  </span>
                </div>
              </div>

              <div className="flex items-center group">
                <div className="bg-accent/20 p-2 rounded-lg group-hover:bg-accent transition-colors duration-200 mr-3">
                  <Mail className="h-4 w-4 text-accent group-hover:text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  info@movesinternational.com.np
                </span>
              </div>

              <div className="flex items-start group">
                <div className="bg-accent/20 p-2 rounded-lg group-hover:bg-accent transition-colors duration-200 mr-3 mt-1">
                  <MapPin className="h-4 w-4 text-accent group-hover:text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors text-sm">
                  D&C Building (Next to Himalayan Java)
                  <br />
                  New Baneshwor, Kathmandu
                </span>
              </div>
            </div>
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
              {[
                { path: "/services/consultation", label: "Free Consultation" },
                {
                  path: "/services/application-assistant",
                  label: "Application Assistant",
                },
                {
                  path: "/services/education-career-counselling-",
                  label: "Visa & Migration",
                },
                {
                  path: "/services/english-test-prep",
                  label: "IELTS Preparation",
                },
                {
                  path: "/services/scholarship-guidance",
                  label: "Scholarships",
                },
                {
                  path: "/services/pre-departure-support",
                  label: "Pre-Departure",
                },
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

          {/* Newsletter & CTA */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Start Your Journey
            </h3>
            <p className="text-gray-300 text-sm mb-6">
              Ready to begin your international education adventure? Get free
              personalized guidance.
            </p>

            <Link
              to="/services/consultation"
              className="inline-flex items-center justify-center w-full bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 mb-4 text-center"
            >
              Book Free Consultation
            </Link>

            <div className="text-center">
              <p className="text-xs text-gray-400 mb-3">
                Follow our success stories
              </p>
              <div className="flex justify-center space-x-3">
                {[
                  {
                    icon: Facebook,
                    href: "https://www.facebook.com/MovesInternationalNepal",
                  },
                  {
                    icon: Instagram,
                    href: "https://www.instagram.com/movesnepal/",
                  },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/moves-international-nepal-a036a7376/",
                  },
                  {
                    icon: FaTiktok,
                    href: "https://www.tiktok.com/@movesnepal",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 p-2 rounded-lg hover:bg-accent hover:scale-110 transition-all duration-200 backdrop-blur-sm"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
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
