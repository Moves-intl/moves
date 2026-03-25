import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  FileCheck,
  Plane,
  BookOpen,
  Award,
  Users,
  ArrowRight,
  CheckCircle,
  Clock,
  Home,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { supabase } from '@/integrations/supabase/client';
import FeaturedUniversities from '@/components/common/FeaturedUniversities';
import StickyProfileComponent from '@/components/common/StickyProfile';
import HighQuality from '@/components/common/HighQuality';
import Webstories from '@/components/common/Webstories';
import ServicesWorksLayout from '@/components/services/ServicesWorksLayout';
import LatestUpdates from '@/components/common/LatestUpdates';

const Services = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('id, title, icon_url, slug')
          .limit(6);

        if (error) {
          console.error('Error fetching services:', error);
        } else {
          setServices(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Animation effect for the masonry grid
  useEffect(() => {
    if (services.length === 0) return;

    const interval = setInterval(() => {
      setCurrentLogoIndex(prev => (prev + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [services.length]);


  return (
    <div className="min-h-screen">
      {/* Modern Hero Section */}
      <section className="relative bg-[#023047] text-white py-12 lg:py-20 overflow-hidden">
        {/* Enhanced background elements with smoother animations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-60 right-20 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-1/3 w-48 h-48 bg-white/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
          {/* Additional subtle decorative elements */}
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-accent rounded-full animate-ping opacity-20"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-ping delay-3000 opacity-30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:min-h-[500px]">
            {/* Left Column - Text Content */}
            <div className="space-y-8 animate-fade-in">
              {/* Enhanced Modern Breadcrumb */}
              <nav className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 cursor-pointer group">
                  <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 group-hover:border-white/40 transition-all duration-300">
                    <Home className="h-3 w-3 text-white" />
                  </div>
                  <span>Home</span>
                </div>
                <ChevronRight className="h-4 w-4 text-white/50" />
                <span className="text-white font-medium">Services</span>
              </nav>

              {/* Enhanced Hero Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white border border-white/20 hover:border-white/30 transition-all duration-300 animate-scale-in">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                  Our Comprehensive Services
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-black leading-tight animate-fade-in">
                  <span className="block text-white drop-shadow-lg">
                    Expert
                  </span>
                  <span 
                  className="block bg-gradient-to-r from-accent via-orange-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
                    Services
                  </span>
                </h1>
                
                <p className="text-xl text-white/90 leading-relaxed max-w-2xl animate-fade-in delay-200">
                  Comprehensive education and migration services to support your
                  international study journey from dream to diploma.
                </p>
              </div>

              {/* Enhanced Modern Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-300">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 shadow-xl hover:shadow-2xl hover:shadow-accent/25 transition-all duration-300 text-lg px-8 py-6 text-white transform hover:scale-105"
                >
                  <Link to="/services/consultation" className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Book Free Consultation
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 bg-primary hover:scale-105 border-white/30 hover:border-white hover:bg-white/10 backdrop-blur-sm text-white hover:text-white text-lg px-8 py-6 transition-all duration-300"
                >
                  <Link to="/contact" 
                  className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Speak to Expert
                  </Link>
                </Button>
              </div>

              {/* Enhanced Trust Indicators */}
              <div className="flex flex-wrap items-center gap-8 pt-4 animate-fade-in delay-500">
                <div className="flex items-center gap-3 group">
                  <div className="p-2 bg-emerald-500/20 backdrop-blur-sm rounded-lg border border-emerald-500/30 group-hover:border-emerald-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/20">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="text-white/90 font-medium">Expert Guidance</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 bg-blue-500/20 backdrop-blur-sm rounded-lg border border-blue-500/30 group-hover:border-blue-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                    <Clock className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-white/90 font-medium">Quick Process</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 bg-amber-500/20 backdrop-blur-sm rounded-lg border border-amber-500/30 group-hover:border-amber-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-amber-500/20">
                    <Award className="h-4 w-4 text-amber-400" />
                  </div>
                  <span className="text-white/90 font-medium">Proven Results</span>
                </div>
              </div>
            </div>

            {/* Enhanced Right Column - Modern Service Grid */}
            <div className="relative hidden lg:block animate-fade-in delay-700">
              {services.length > 0 && (
                <div className="hidden lg:grid grid-cols-3 gap-4 w-full h-[400px]">
                  {[...Array(6)].map((_, index) => {
                    const serviceIndex = (currentLogoIndex + index) % services.length;
                    const service = services[serviceIndex];

                    return (
                      <div
                        key={index}
                        className="group relative rounded-xl overflow-hidden transition-all duration-500 ease-in-out hover:scale-105 bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:shadow-2xl hover:shadow-white/10"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 group-hover:from-white/10 group-hover:to-white/20 transition-all duration-300"></div>
                        
                        {service.icon_url ? (
                          <img
                            src={service.icon_url}
                            alt={service.title}
                            className="relative w-full h-full object-cover"
                          />
                        ) : (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <Award className="h-16 w-16 text-white/80 group-hover:text-white transition-colors duration-300" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-50">
        <ServicesWorksLayout/>

        <div className="">
          <FeaturedUniversities />
        </div>
        <StickyProfileComponent />
        <HighQuality />
        <Webstories />
        <LatestUpdates/>
      </div>

    </div>
  );
};

export default Services;