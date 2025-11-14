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
    <footer className="bg-gradient-to-br from-primary via-primary to-primary/90 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <img
              src="/lovable-uploads/abcbb2a1-5db8-45ce-8215-42e053f17039.png"
              alt="Moves International"
              className="h-14 w-auto filter brightness-0 invert mb-4"
            />
            <h3 className="text-xl font-semibold mb-3">Moves International</h3>
            <p className="text-gray-200 leading-relaxed mb-6 max-w-md">
              Moves International is Australia's leading education and migration
              services provider, empowering international students to achieve
              their academic and career aspirations.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-accent flex-shrink-0" />
                <div>
                  <span className="text-gray-200 block">+977-9768991102</span>
                  <span className="text-sm text-gray-300">
                    Sun-Fri 9AM-5PM NPY
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-accent flex-shrink-0" />
                <span className="text-gray-200">
                  info@movesinternational.com.np
                </span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-accent mt-1 flex-shrink-0" />
                <span className="text-gray-200">
                  D&C Building (Next to Himalayan Java)
                  <br />
                  New Baneshwor, Kathmandu
                </span>
              </div>
            </div>
          </div>

          {/* Study Abroad */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-accent">
              Study Abroad
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/courses"
                  className="text-gray-200 hover:text-accent transition-colors hover:translate-x-1 transform duration-200 block"
                >
                  Find Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/destinations"
                  className="text-gray-200 hover:text-accent transition-colors hover:translate-x-1 transform duration-200 block"
                >
                  Study Destinations
                </Link>
              </li>
              <li>
                <Link
                  to="/course-comparison"
                  className="text-gray-200 hover:text-accent transition-colors hover:translate-x-1 transform duration-200 block"
                >
                  Compare Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/destinations/australia"
                  className="text-gray-200 hover:text-accent transition-colors hover:translate-x-1 transform duration-200 block"
                >
                  Study in Australia
                </Link>
              </li>
              <li>
                <Link
                  to="/destinations/canada"
                  className="text-gray-200 hover:text-accent transition-colors hover:translate-x-1 transform duration-200 block"
                >
                  Study in Canada
                </Link>
              </li>
              <li>
                <Link
                  to="/destinations/united-kingdom"
                  className="text-gray-200 hover:text-accent transition-colors hover:translate-x-1 transform duration-200 block"
                >
                  Study in UK
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-accent">
              Our Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/services/consultation"
                  className="text-gray-200 hover:text-accent transition-colors hover:translate-x-1 transform duration-200 block"
                >
                  Free Consultation
                </Link>
              </li>
              <li>
                <Link
                  to="/services/application-assistant"
                  className="text-gray-200 hover:text-accent transition-colors hover:translate-x-1 transform duration-200 block"
                >
                  Application Assistant
                </Link>
              </li>
              <li>
                <Link
                  to="/services/education-career-counselling-"
                  className="text-gray-200 hover:text-accent transition-colors hover:translate-x-1 transform duration-200 block"
                >
                  Visa & Migration
                </Link>
              </li>
              <li>
                <Link
                  to="/services/english-test-prep"
                  className="text-gray-200 hover:text-accent transition-colors hover:translate-x-1 transform duration-200 block"
                >
                  IELTS Preparation
                </Link>
              </li>
              <li>
                <Link
                  to="/services/scholarship-guidance"
                  className="text-gray-200 hover:text-accent transition-colors hover:translate-x-1 transform duration-200 block"
                >
                  Scholarships
                </Link>
              </li>
              <li>
                <Link
                  to="/services/pre-departure-support"
                  className="text-gray-200 hover:text-accent transition-colors hover:translate-x-1 transform duration-200 block"
                >
                  Pre-Departure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-600">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-center sm:text-left">
                  Follow Us
                </h4>
                <div className="flex space-x-4 justify-center sm:justify-start">
                  <a
                    href="https://www.facebook.com/MovesInternationalNepal"
                    target="_blank"
                    className="bg-accent/20 p-3 rounded-full hover:bg-accent hover:scale-110 transition-all duration-200"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/movesnepal/"
                    target="_blank"
                    className="bg-accent/20 p-3 rounded-full hover:bg-accent hover:scale-110 transition-all duration-200"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/moves-international-nepal-a036a7376/"
                    target="_blank"
                    className="bg-accent/20 p-3 rounded-full hover:bg-accent hover:scale-110 transition-all duration-200"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@movesnepal"
                    target="_blank"
                    className="bg-accent/20 p-3 rounded-full hover:bg-accent hover:scale-110 transition-all duration-200"
                  >
                    <FaTiktok className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="text-center lg:text-right">
              <h4 className="text-lg font-semibold mb-2">Need Help?</h4>
              <p className="text-gray-200 mb-2">
                Book your free consultation today
              </p>
              <Link
                to="/services/consultation"
                className="inline-flex items-center bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                Book Consultation Now
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-600">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm text-center md:text-left">
              © 2024 Moves International. All rights reserved. | Helping
              students achieve their dreams since 2010.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              <Link
                to="/privacy-policy"
                className="text-gray-300 hover:text-accent text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-gray-300 hover:text-accent text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookie-policy"
                className="text-gray-300 hover:text-accent text-sm transition-colors"
              >
                Cookie Policy
              </Link>
              <Link
                to="/sitemap"
                className="text-gray-300 hover:text-accent text-sm transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
