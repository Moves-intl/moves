import React, { useState, useEffect } from 'react';
import { Briefcase, TrendingUp, Target, Rocket, Users, Award, MapPin, DollarSign, Clock, Star, ChevronRight, Building, Globe } from 'lucide-react';

interface JobMarketSectionProps {
  destination: any;
  jobMarketPoints: string[];
}

const JobMarketSection = ({ destination, jobMarketPoints }: JobMarketSectionProps) => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const iconVariants = [Briefcase, Building, DollarSign, Rocket, Globe, Users];

  return (
    <section className="py-12 sm:py-16 lg:py-24 px-4 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-16 w-64 h-64 bg-gradient-to-br from-[#fa8500]/12 to-orange-300/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-24 left-16 w-48 h-48 bg-gradient-to-br from-[#023047]/10 to-blue-400/6 rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-400/8 to-[#fa8500]/6 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-emerald-400/8 to-[#023047]/6 rounded-full blur-xl"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-[#fa8500]/40 rounded-full animate-bounce"></div>
        <div className="absolute top-3/4 right-1/5 w-1.5 h-1.5 bg-[#023047]/40 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-orange-400/40 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className={`text-center mb-10 sm:mb-14 lg:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Enhanced Badge */}
          <div className="inline-flex items-start w-fit leading-tight bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-3">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Career Opportunities
                </div>

          {/* Enhanced Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-transparent bg-clip-text bg-primary mb-4 sm:mb-6 leading-tight animate-pulse">
            Job Market & Growth
          </h2>

          {/* Animated decoration */}
          <div className="relative mx-auto w-48 h-2 mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fa8500] to-transparent rounded-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full animate-pulse"></div>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-[#fa8500] to-orange-400 rounded-full animate-bounce"></div>
          </div>

          {/* Enhanced Description */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8">
            Unlock exceptional career opportunities in{' '}
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#023047] to-[#fa8500] relative">
              {destination?.name}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#fa8500] to-orange-400 animate-pulse"></span>
            </span>
            {' '}with thriving industries and endless possibilities
          </p>

          {/* Quick Stats Preview */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-md">
              <MapPin className="h-4 w-4 text-[#fa8500]" />
              <span className="text-sm font-semibold text-gray-700">Global Hub</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-md">
              <Star className="h-4 w-4 text-[#fa8500]" />
              <span className="text-sm font-semibold text-gray-700">High Growth</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-md">
              <Award className="h-4 w-4 text-[#fa8500]" />
              <span className="text-sm font-semibold text-gray-700">Top Rated</span>
            </div>
          </div>
        </div>

        {/* Enhanced Timeline */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Enhanced timeline line with gradient animation */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#fa8500] via-[#023047] via-purple-500 to-[#fa8500] rounded-full shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-b from-orange-400 via-blue-400 via-purple-400 to-orange-400 rounded-full animate-pulse opacity-60"></div>
            </div>
            
            <div className="space-y-6 sm:space-y-10 lg:space-y-20">
              {jobMarketPoints.map((point, index) => {
                const IconComponent = iconVariants[index % iconVariants.length];
                const isLeft = index % 2 === 0;
                const isActive = activeCard === index;
                
                return (
                  <div
                    key={index}
                    className={`group relative flex items-center transition-all duration-700 justify-center lg:${
                      isLeft ? 'justify-start' : 'justify-end'
                    } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                    onMouseEnter={() => setActiveCard(index)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    {/* Enhanced timeline node */}
                    <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-[#fa8500] to-orange-400 rounded-full shadow-xl items-center justify-center z-20 group-hover:scale-150 transition-all duration-500 border-4 border-white">
                      <div className={`w-2 h-2 bg-white rounded-full transition-all duration-300 ${isActive ? 'animate-ping' : 'animate-pulse'}`}></div>
                      
                      {/* Ripple effect */}
                      <div className="absolute inset-0 rounded-full bg-[#fa8500]/30 animate-ping opacity-0 group-hover:opacity-100"></div>
                    </div>

                    {/* Enhanced content card */}
                    <div className={`w-full lg:w-5/12 ${isLeft ? 'lg:pr-20' : 'lg:pl-20'} px-2 sm:px-4 lg:px-0`}>
                      <div className="group relative">
                        {/* Enhanced glowing background */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-[#fa8500]/20 to-[#023047]/20 rounded-3xl blur-2xl transition-all duration-700 ${isActive ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}`}></div>
                        
                        {/* Main enhanced card */}
                        <div className={`relative bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl p-5 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 ${isActive ? 'border-[#fa8500]/50 scale-105' : 'border-gray-100/50'} backdrop-blur-sm`}>
                          
                          {/* Enhanced card number */}
                          <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-[#023047] to-[#034663] rounded-full flex items-center justify-center shadow-xl border-2 border-white">
                            <span className="text-white text-sm font-black">{String(index + 1).padStart(2, '0')}</span>
                          </div>

                          {/* Enhanced header with icon and progress line */}
                          <div className="flex items-center gap-4 mb-6">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-[#fa8500] to-orange-400 shadow-xl flex items-center justify-center transition-all duration-500 ${isActive ? 'rotate-12 scale-110' : ''}`}>
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1 h-1 bg-gradient-to-r from-[#fa8500]/40 via-orange-300/40 to-transparent rounded-full overflow-hidden">
                              <div className={`h-full bg-gradient-to-r from-[#fa8500] to-orange-400 rounded-full transition-all duration-1000 ${isActive ? 'w-full' : 'w-1/3'}`}></div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-[#fa8500]" />
                              <span className="text-xs font-bold text-gray-500">#{index + 1}</span>
                            </div>
                          </div>

                          {/* Enhanced content */}
                          <p className={`text-gray-700 leading-relaxed font-medium text-lg transition-all duration-300 ${isActive ? 'text-gray-800 transform translate-x-1' : ''}`}>
                            {point}
                          </p>

                          {/* Call-to-action hint */}
                          <div className={`mt-4 flex items-center gap-2 text-[#fa8500] transition-all duration-300 ${isActive ? 'opacity-100 translate-x-2' : 'opacity-0'}`}>
                            <span className="text-sm font-semibold">Learn more</span>
                            <ChevronRight className="h-4 w-4" />
                          </div>

                          {/* Enhanced arrow */}
                          <div className={`hidden lg:block absolute top-1/2 transform -translate-y-1/2 ${
                            isLeft ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'
                          }`}>
                            <div className={`w-0 h-0 border-t-[12px] border-b-[12px] border-transparent transition-all duration-300 ${
                              isLeft 
                                ? 'border-l-[16px] border-l-white' 
                                : 'border-r-[16px] border-r-white'
                            } ${isActive ? 'scale-125' : ''}`}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Stats */}
        <div className={`mt-12 sm:mt-16 lg:mt-24 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: '800ms'}}>
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-white via-orange-50/50 to-white backdrop-blur-sm rounded-3xl border border-orange-200/50 shadow-2xl p-5 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              <div className="group flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#023047] to-[#034663] rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-[#023047] mb-1">95%</div>
                  <div className="text-sm text-gray-600 font-semibold">Employment Rate</div>
                </div>
              </div>

              <div className="group flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fa8500] to-orange-400 rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-300">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-[#fa8500] mb-1">Fast</div>
                  <div className="text-sm text-gray-600 font-semibold">Career Growth</div>
                </div>
              </div>

              <div className="group flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-300">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-emerald-600 mb-1">$70K+</div>
                  <div className="text-sm text-gray-600 font-semibold">Starting Salary</div>
                </div>
              </div>

              <div className="group flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-300">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-purple-600 mb-1">2yrs</div>
                  <div className="text-sm text-gray-600 font-semibold">Work Visa</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Demo component with enhanced sample data
const Demo = () => {
  const sampleData = {
    destinationName: "Australia",
    jobMarketPoints: [
      "Strong job market with diverse opportunities across industries including tech, healthcare, engineering, and finance with unprecedented growth rates",
      "Post-graduation work visas allow international students to gain valuable work experience for up to 4 years in their field of study",
      "Competitive salaries with average graduate starting salaries ranging from AUD $50,000 to $70,000 annually, with rapid progression opportunities",
      "Growing startup ecosystem and innovation hubs in major cities like Sydney, Melbourne, and Brisbane fostering entrepreneurship",
      "Skills shortage in key sectors creating excellent opportunities for qualified international graduates with specialized expertise",
      "Professional networking opportunities through industry associations and alumni networks connecting global talent"
    ]
  };

  return <JobMarketSection destination={sampleData} jobMarketPoints={sampleData.jobMarketPoints} />;
};

export default JobMarketSection;