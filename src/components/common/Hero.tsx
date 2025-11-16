import React, { useState } from "react";
import { Search, ArrowRight, GraduationCap, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const backgroundPattern =
    "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F5F5F5' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/courses");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePopularTagClick = (tag: string) => {
    navigate(`/courses?search=${encodeURIComponent(tag)}`);
  };

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("${backgroundPattern}")`,
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20 lg:pb-0">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Start Your
                <span className="text-accent block">Study Abroad</span>
                Journey Today
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Discover thousands of courses from top universities in
                Australia, Canada, UK, and more. Get expert guidance from our
                certified education consultants.
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search courses, universities, or destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-10 bg-white text-gray-900 border-0 h-12"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="bg-accent hover:bg-accent/90 text-white h-12 px-8"
                >
                  Search
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-300">Popular:</span>
                {["MBA", "Engineering", "IT", "Healthcare", "Business"].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => handlePopularTagClick(tag)}
                      className="px-3 py-1 bg-white/20 rounded-full text-sm hover:bg-white/30 transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/services/consultation")}
                className="bg-accent hover:bg-accent/90 shadow-xl hover:shadow-2xl hover:shadow-accent/25 transition-all duration-300 text-lg px-8 py-6 text-white transform hover:scale-105"
              >
                {" "}
                <MessageCircle className="h-5 w-5" />
                Book Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/courses")}
                className="border-2 bg-primary hover:scale-105 border-white/30 hover:border-white hover:bg-white/10 backdrop-blur-sm text-white hover:text-white text-lg px-8 py-6 transition-all duration-300"
              >
                <GraduationCap className="h-5 w-5" />
                Browse Courses
              </Button>
              {!user && null}
            </div>
          </div>

          {/* Right Content - Full Image Display */}
          <div className="relative flex justify-center items-center">
            <div className="relative w-full max-w-full">
              <img
                src="https://coadhiipbnnqlmslpzeu.supabase.co/storage/v1/object/public/media/all/hero_image.png"
                alt="Students studying abroad"
                className="w-full h-[700px] object-contain object-right-top rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
