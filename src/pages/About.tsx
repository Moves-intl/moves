import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Webstories from "@/components/common/Webstories";
import HighQuality from "@/components/common/HighQuality";
import StickyProfileComponent from "@/components/common/StickyProfile";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

import {
  BookOpen,
  CheckCircle,
  ArrowRight,
  Award,
  Home,
  ChevronRight,
  Globe,
  GraduationCap
} from 'lucide-react';
import StoryWithStatsSection from '@/components/common/StoryStats';
import ExpertiseAchievements, { ExpertiseAchievements2 } from '@/components/common/ExpertiseAchievements';
import CEOMsg from '@/components/common/CEOMsg';
import LeadershipTeam from '@/components/common/MovesTeam';
import LatestUpdates from '@/components/common/LatestUpdates';

const About = () => {
  // Fetch about page content from database
  const { data: aboutPageData, isLoading } = useQuery({
    queryKey: ['about-page'],
    queryFn: async () => {
      const { data } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', 'about')
        .single();
      return data;
    }
  });

  // Fetch company statistics from settings
  const { data: companyStats } = useQuery({
    queryKey: ['company-stats'],
    queryFn: async () => {
      const { data } = await supabase
        .from('site_settings')
        .select('key, value')
        .in('key', ['students_placed', 'partner_universities', 'years_experience', 'countries_served']);

      return data?.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as Record<string, any>) || {};
    }
  });

  return (
    <div className="min-h-screen">
      {/* Modern Hero Section */}
      <section className="relative py-14 bg-[#023047] overflow-hidden min-h-[500px]">
        {/* Enhanced background elements with smoother animations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-24 left-12 w-44 h-44 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-96 right-16 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-48 left-1/4 w-52 h-52 bg-white/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
          {/* Additional subtle decorative elements */}
          <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-accent rounded-full animate-ping opacity-20"></div>
          <div className="absolute top-1/4 left-2/3 w-1 h-1 bg-white rounded-full animate-ping delay-1500 opacity-30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          {/* Main Hero Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:min-h-[500px] py-6 lg:py-0">
            {/* Left Column - Text Content */}
            <div className="space-y-6 animate-fade-in">
              {/* Enhanced Modern Breadcrumb */}
              <nav className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 cursor-pointer group">
                  <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 group-hover:border-white/40 transition-all duration-300">
                    <Home className="h-3 w-3 text-white" />
                  </div>
                  <span>Home</span>
                </div>
                <ChevronRight className="h-4 w-4 text-white/50" />
                <span className="text-white font-medium">About Us</span>
              </nav>

              {/* Enhanced Hero Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white border border-white/20 hover:border-white/30 transition-all duration-300 animate-scale-in">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                  Trusted Education Partners
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-black leading-tight animate-fade-in">
                  <span className="block text-white drop-shadow-lg">
                    Best Migration
                  </span>
                  <span className="block bg-gradient-to-r from-accent via-orange-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
                    Agents & Consultants
                  </span>
                </h1>

                <p className="text-xl text-white/90 leading-relaxed max-w-2xl animate-fade-in delay-200">
                  {aboutPageData?.subtitle || "We are registered migration agents & education consultants in Australia with 5k+ satisfied clients."}
                </p>
              </div>

              {/* Enhanced Modern Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-300">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 shadow-xl hover:shadow-2xl hover:shadow-accent/25 
                  transition-all duration-300 text-lg px-8 py-6 text-white transform hover:scale-105"
                >
                  <Link to="/contact" className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Get Free Advice
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 bg-primary hover:scale-105 border-white/30 hover:border-white hover:bg-white/10 backdrop-blur-sm text-white hover:text-white text-lg px-8 py-6 transition-all duration-300"
                >
                  <Link to="/services"
                    className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Our Services
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-8 pt-4 animate-fade-in delay-500">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 backdrop-blur-sm rounded-lg border border-emerald-500/30">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="text-white/90 font-medium">Real Professionals</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 backdrop-blur-sm rounded-lg border border-blue-500/30">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-white/90 font-medium">{companyStats?.students_placed || "5,000+"}+ Clients</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/20 backdrop-blur-sm rounded-lg border border-amber-500/30">
                    <Award className="h-4 w-4 text-amber-400" />
                  </div>
                  <span className="text-white/90 font-medium">Proven Results</span>
                </div>
              </div>
            </div>

            {/* Enhanced Right Column - Modern Team Showcase */}
            <div className="relative lg:ml-8 animate-fade-in delay-700 mt-0">
              <div className="relative w-full h-auto lg:h-auto bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-2xl hover:shadow-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10"></div>

                <img
                  src='https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="Team member"
                  className="relative w-full h-full object-contain rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />

                {/* Modern overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#023047]/90 backdrop-blur-sm rounded-xl p-4 border border-white/20 transform group-hover:scale-105 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white mb-1">Expert Team</h3>
                  <p className="text-white/80 text-sm">Dedicated professionals guiding your journey</p>
                </div>
              </div>

              {/* Modern decorative elements */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent/20 rounded-full blur-xl"></div>
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <StoryWithStatsSection />

      {/* Achievements Section */}
      <ExpertiseAchievements />
      <ExpertiseAchievements2 />
      <CEOMsg />

      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary mb-3">
          {aboutPageData?.content?.includes('team_title') ?
            JSON.parse(aboutPageData.content).team_title :
            "Moves International's Team"}
        </h2>
        <p className="text-base text-gray-600 text-center">
          {aboutPageData?.content?.includes('team_subtitle') ?
            JSON.parse(aboutPageData.content).team_subtitle :
            "Experts, Visionaries and ACHIEVERS"}
        </p>
                  <div className="w-24 h-1 bg-orange-600 mt-4 mx-auto rounded-full"></div>

      </div>
      <LeadershipTeam />
      <StickyProfileComponent />
      <HighQuality />

      {/* Web stories */}
      <div className="bg-white">
        <Webstories />
      </div>

      {/* Latest Updates */}
      <LatestUpdates />
    </div>
  );
};

export default About;