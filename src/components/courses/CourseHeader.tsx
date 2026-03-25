import React from 'react';
import { Filter, BarChart3, GraduationCap, Search, Sparkles, BookOpen, Users, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CourseSearchBar } from './CourseSearchBar';
import { CourseFilters } from './CourseFilters';
import { CourseViewToggle } from './CourseViewToggle';
import { Filters } from '@/hooks/useCourseFilters';

interface CourseHeaderProps {
  totalCount: number;
  currentPage: number;
  totalPages: number;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  savedCourseIds: Set<string>;
}

export const CourseHeader = ({
  totalCount,
  currentPage,
  totalPages,
  filters,
  setFilters,
  resetFilters,
  hasActiveFilters,
  showFilters,
  setShowFilters,
  viewMode,
  setViewMode,
  savedCourseIds
}: CourseHeaderProps) => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#023047] via-[#034a6b] to-[#023047] overflow-hidden">
        {/* Advanced Background Effects */}
        <div className="absolute inset-0">
          {/* Gradient mesh overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#fa8500]/5 to-transparent"></div>
          
          {/* Dynamic floating orbs */}
          <div className="absolute top-10 right-20 w-32 h-32 bg-gradient-to-br from-[#fa8500]/20 to-[#fa8500]/5 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-32 left-16 w-24 h-24 bg-gradient-to-br from-white/15 to-white/5 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 right-40 w-28 h-28 bg-gradient-to-br from-[#fa8500]/15 to-transparent rounded-full blur-xl animate-pulse delay-500"></div>
          <div className="absolute bottom-32 left-32 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-lg animate-pulse delay-1500"></div>
          
          {/* Geometric pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-16 left-1/4 w-1 h-8 bg-white/50 rotate-45"></div>
            <div className="absolute top-28 right-1/4 w-1 h-6 bg-[#fa8500]/60 rotate-12"></div>
            <div className="absolute bottom-24 left-1/3 w-1 h-10 bg-white/40 -rotate-12"></div>
            <div className="absolute top-20 right-1/3">
              <div className="w-8 h-8 border border-white/30 rotate-45"></div>
            </div>
            <div className="absolute bottom-28 left-1/5">
              <div className="w-6 h-6 border border-[#fa8500]/40 rotate-12"></div>
            </div>
          </div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                <Sparkles className="w-4 h-4 text-[#fa8500] mr-2" />
                <span className="text-white font-medium text-sm">Discover Excellence</span>
              </div>
            
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-black text-white mb-4 leading-tight animate-fade-in">
                Find Your
                  <span className="block bg-gradient-to-r from-accent via-orange-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
                  Perfect Course</span>
              </h1>
              
              <p className="text-lg text-white/90 mb-6 max-w-lg lg:max-w-none">
                Explore thousands of courses from top universities worldwide. 
                Start your journey to academic excellence today.
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-white/90">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-emerald-500/20 backdrop-blur-sm rounded-lg border border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-white/90 font-medium">{totalCount}+ Courses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-blue-500/20 backdrop-blur-sm rounded-lg border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                  <Users className="w-4 h-4 text-blue-400" />
                                    </div>
                  <span className="text-white/90 font-medium">50+ Universities</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-amber-500/20 backdrop-blur-sm rounded-lg border border-amber-500/30 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-white/90 font-medium">100+ Study Areas</span>
                </div>
              </div>
            </div>

            {/* Right Visual Element */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Main Icon Container with enhanced styling */}
                <div className="relative w-48 h-48 lg:w-56 lg:h-56">
                  {/* Outer glow ring */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#fa8500]/20 via-white/10 to-[#fa8500]/20 rounded-full blur-xl animate-pulse"></div>
                  
                  {/* Secondary ring */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-white/20 to-[#fa8500]/20 rounded-3xl blur-lg"></div>
                  
                  {/* Central Icon Container */}
                  <div className="relative inset-0 bg-white/10 backdrop-blur-md rounded-3xl border border-white/30 flex items-center justify-center shadow-2xl overflow-hidden">
                    {/* Inner gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-[#fa8500]/10"></div>
                    <GraduationCap className="relative h-24 w-24 lg:h-28 lg:w-28 text-white drop-shadow-lg" />
                  </div>
                  
                  {/* Enhanced Floating Elements */}
                  <div className="absolute -top-6 -right-6 p-1 w-18 h-18 bg-gradient-to-br from-[#fa8500] to-[#e07600] rounded-2xl flex items-center justify-center shadow-2xl rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 cursor-pointer">
                    <BookOpen className="h-9 w-9 text-white drop-shadow-md" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#fa8500] to-transparent rounded-2xl blur opacity-50"></div>
                  </div>
                  
                  <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-white to-gray-100 rounded-2xl flex items-center justify-center shadow-2xl -rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 cursor-pointer">
                    <Trophy className="h-8 w-8 text-[#023047] drop-shadow-sm" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-white to-transparent rounded-2xl blur opacity-30"></div>
                  </div>
                  
                  <div className="absolute top-1/2 -left-10 w-14 h-14 bg-gradient-to-br from-[#fa8500]/90 to-[#fa8500]/70 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer">
                    <Users className="h-7 w-7 text-white drop-shadow-sm" />
                    <div className="absolute inset-0 bg-[#fa8500] rounded-full blur opacity-40"></div>
                  </div>
                  
                  {/* Additional decorative elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-[#fa8500] rounded-full animate-ping"></div>
                  <div className="absolute bottom-8 right-8 w-2 h-2 bg-white rounded-full animate-pulse delay-700"></div>
                  <div className="absolute top-8 left-4 w-2 h-2 bg-[#fa8500] rounded-full animate-pulse delay-1000"></div>
                </div>
                
                {/* Surrounding particle effects */}
                <div className="absolute top-16 -right-8 w-4 h-4 bg-[#fa8500]/60 rounded-full animate-bounce delay-300"></div>
                <div className="absolute bottom-20 -left-4 w-3 h-3 bg-white/60 rounded-full animate-bounce delay-700"></div>
                <div className="absolute top-32 left-8 w-2 h-2 bg-[#fa8500]/80 rounded-full animate-bounce delay-1100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Controls Bar */}
      <div className="bg-white shadow-lg border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-muted-foreground">
                {totalCount} course{totalCount !== 1 ? 's' : ''} available
                {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
              </p>
            </div>

            {/* Search Bar */}
            <CourseSearchBar filters={filters} setFilters={setFilters} />

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <CourseViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />

              {/* Filter Toggle */}
              <Button
                variant={showFilters ? 'default' : 'outline'}
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-4"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>

              {/* Compare Button */}
              {savedCourseIds.size > 0 && (
                <Link to="/course-comparison">
                  <Button className="h-12 px-4 bg-[#fa8500] hover:bg-[#fa8500]/90 text-white">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Compare ({savedCourseIds.size})
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <CourseFilters 
              filters={filters}
              setFilters={setFilters}
              resetFilters={resetFilters}
              hasActiveFilters={hasActiveFilters}
            />
          )}
        </div>
      </div>
    </>
  );
};