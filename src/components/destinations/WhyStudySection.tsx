import React from 'react';
import { GraduationCap, CheckCircle, Star, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface WhyStudySectionProps {
  destinationName: string;
  whyStudyPoints: string[];
}

const WhyStudySection = ({ destinationName, whyStudyPoints }: WhyStudySectionProps) => {
  return (
    <section className="relative py-10 sm:py-14 lg:py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#fa8500]/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-amber-300/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-200/40 rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start">
          {/* Left Side: Enhanced Header Section */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#fa8500]/20 to-amber-400/20 rounded-2xl blur-xl opacity-60"></div>
            <div className="relative bg-white/80 backdrop-blur-sm border border-white/50 shadow-2xl p-5 sm:p-7 lg:p-10 rounded-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#fa8500] to-amber-500"></div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="relative p-4 bg-gradient-to-br from-[#fa8500] to-amber-500 rounded-2xl shadow-lg">
                  <GraduationCap className="h-12 w-12 text-white" />
                  <div className="absolute -top-1 -right-1">
                    <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-800 mb-4 sm:mb-6 leading-tight">
                Why Study in{' '}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fa8500] to-amber-600">
                    {destinationName}
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#fa8500] to-amber-500 rounded-full"></div>
                </span>
                ?
              </h2>
              
              <p className="text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed font-medium">
                Discover the unique advantages and opportunities that make{' '}
                <span className="text-[#fa8500] font-semibold">{destinationName}</span>{' '}
                an ideal destination for international students.
              </p>

              <div className="mt-8 flex items-center gap-3 text-sm text-gray-600">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-br from-[#fa8500] to-amber-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                  <div className="w-8 h-8 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center text-gray-600 text-xs font-bold">
                    +
                  </div>
                </div>
                <span className="font-medium">Join 50,000+ international students</span>
              </div>
            </div>
          </div>

          {/* Right Side: Enhanced Reasons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyStudyPoints && whyStudyPoints.map((reason, index) => (
              <Card
                key={index}
                className="group relative bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden hover:-translate-y-2"
              >
                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#fa8500] via-amber-500 to-[#fa8500] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl p-[2px]">
                  <div className="w-full h-full bg-white rounded-2xl"></div>
                </div>
                
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#fa8500] to-amber-500 group-hover:h-2 transition-all duration-300"></div>
                
                <CardContent className="relative p-5 sm:p-6 lg:p-8 bg-transparent text-left">
                  <div className="flex flex-col items-start">
                    {/* Enhanced icon */}
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#fa8500]/10 to-amber-500/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <CheckCircle className="h-10 w-10 text-[#fa8500] group-hover:text-amber-600 transition-colors duration-300" />
                      </div>
                      {/* Floating number badge */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-[#fa8500] to-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg group-hover:scale-125 transition-transform duration-300">
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="w-full">
                      <p className="text-gray-800 text-lg font-semibold leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                        {reason}
                      </p>
                      
                      {/* Progress indicator */}
                      <div className="mt-6 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#fa8500] to-amber-500 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyStudySection;