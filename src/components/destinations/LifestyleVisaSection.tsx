import React, { useState } from 'react';
import { Heart, Plane, MapPin, Globe, Calendar, Shield, TrendingUp } from 'lucide-react';

const LifestyleVisaSection = ({ destination = {} }: { destination?: any }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  if (!destination?.lifestyle_info && !destination?.visa_info) {
    return null;
  }

  const cards = [
    {
      id: 'lifestyle',
      title: 'Lifestyle & Culture',
      icon: Heart,
      content: destination?.lifestyle_info,
      primaryGradient: 'from-[#023047] via-[#034759] to-[#045c6a]',
      accentGradient: 'from-[#fa8500] via-[#fb9124] to-[#fc9d48]',
      iconColor: 'text-[#fa8500]',
      bgPattern: 'bg-gradient-to-br from-[#023047]/5 to-[#fa8500]/5',
      highlights: [
        { icon: MapPin, text: 'Cultural Immersion' },
        { icon: Globe, text: 'Expat Friendly' }
      ]
    },
    {
      id: 'visa',
      title: 'Visa Information',
      icon: Plane,
      content: destination?.visa_info,
      primaryGradient: 'from-[#023047] via-[#034759] to-[#045c6a]',
      accentGradient: 'from-[#fa8500] via-[#fb9124] to-[#fc9d48]',
      iconColor: 'text-[#023047]',
      bgPattern: 'bg-gradient-to-br from-[#fa8500]/5 to-[#023047]/5',
      highlights: [
        { icon: Calendar, text: 'Quick Processing' },
        { icon: Shield, text: 'Secure & Reliable' }
      ]
    }
  ];

  const visibleCards = cards.filter(card => 
    (card.id === 'lifestyle' && destination?.lifestyle_info) ||
    (card.id === 'visa' && destination?.visa_info)
  );

  return (
    <section className="py-10 sm:py-14 lg:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-start w-fit leading-tight bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-3">
        <TrendingUp className="w-4 h-4 mr-2" />
        Essential Information
      </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-primary bg-clip-text text-transparent mb-3 sm:mb-4">
            Your Journey Awaits
          </h2> 
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover everything you need to know about living and traveling in your dream destination
          </p>
        </div>

        {/* Cards Grid */}
        <div className={`grid gap-8 ${visibleCards.length === 2 ? 'lg:grid-cols-2' : 'max-w-3xl mx-auto'}`}>
          {visibleCards.map((card, index) => {
            const IconComponent = card.icon;
            const isHovered = hoveredCard === card.id;
            
            return (
              <div
                key={card.id}
                className={`group relative overflow-hidden rounded-3xl transition-all duration-500 transform ${
                  isHovered ? 'scale-105 shadow-2xl' : 'shadow-xl hover:shadow-2xl hover:scale-102'
                }`}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              >
                {/* Background Pattern */}
                <div className={`absolute inset-0 ${card.bgPattern} opacity-50`}></div>
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.primaryGradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Floating Orbs with Brand Colors */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#fa8500]/20 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-tr from-[#023047]/10 to-transparent rounded-full blur-lg group-hover:scale-125 transition-transform duration-700"></div>
                
                {/* Content */}
                <div className="relative bg-white/90 backdrop-blur-sm border border-white/20 rounded-3xl p-5 sm:p-6 lg:p-8 h-full">
                  {/* Header */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`relative p-4 rounded-2xl ${
                        card.id === 'lifestyle' 
                          ? 'bg-gradient-to-br from-[#fa8500] to-[#fc9d48]' 
                          : 'bg-gradient-to-br from-[#023047] to-[#045c6a]'
                      } shadow-lg`}>
                        <IconComponent className="h-8 w-8 text-white" />
                        <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm"></div>
                      </div>
                      
                      {/* Highlight Badges */}
                      <div className="flex gap-2">
                        {card.highlights.map((highlight, idx) => {
                          const HighlightIcon = highlight.icon;
                          return (
                            <div key={idx} className="flex items-center gap-1 bg-white/70 px-3 py-1 rounded-full text-xs font-medium text-[#023047] border border-[#023047]/20">
                              <HighlightIcon className="h-3 w-3 text-[#fa8500]" />
                              <span>{highlight.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-[#023047] mb-2 group-hover:text-[#034759] transition-colors">
                      {card.title}
                    </h3>
                    
                    {/* Animated Underline with Brand Colors */}
                    <div className={`h-1 rounded-full transition-all duration-500 ${
                      card.id === 'lifestyle' 
                        ? 'bg-gradient-to-r from-[#fa8500] to-[#fc9d48]'
                        : 'bg-gradient-to-r from-[#023047] to-[#045c6a]'
                    } ${isHovered ? 'w-24' : 'w-12'}`}></div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {card.content}
                    </p>
                    
                    {/* Interactive Element */}
                    <div className={`mt-6 p-4 rounded-xl border transition-all duration-300 ${
                      card.id === 'lifestyle'
                        ? 'bg-gradient-to-r from-[#fa8500]/5 to-[#fc9d48]/5 border-[#fa8500]/20'
                        : 'bg-gradient-to-r from-[#023047]/5 to-[#045c6a]/5 border-[#023047]/20'
                    } ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-70'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#023047]">
                          {card.id === 'lifestyle' ? 'Quality of Life Score' : 'Processing Time'}
                        </span>
                        <div className="flex items-center gap-2">
                          {card.id === 'lifestyle' ? (
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Heart 
                                  key={i} 
                                  className={`h-4 w-4 ${i < 4 ? 'text-[#fa8500]' : 'text-gray-300'} fill-current`} 
                                />
                              ))}
                            </div>
                          ) : (
                            <span className="text-sm font-bold text-[#023047]">5-10 days</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LifestyleVisaSection;