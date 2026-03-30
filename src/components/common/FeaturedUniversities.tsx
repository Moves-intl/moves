import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, GraduationCap, ExternalLink, ChevronLeft, ChevronRight, ArrowRight, Building2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface University {
  id: string;
  name: string;
  location: string | null;
  country: string | null;
  website_url: string | null;
  logo_url: string | null;
  overview_content: string | null;
  courses?: Array<{ count: number }>;
  slug: string | null;
  featured: boolean;
}

const FeaturedUniversities = () => {
  const navigate = useNavigate();
  const handleViewAllUniversities = () => {
    navigate('/universities');
  };
  const { data: universities = [], isLoading } = useQuery({
    queryKey: ['featured-universities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('universities')
        .select('*,  courses:courses(count)')
        .eq('featured', true)
        .order('name');

      if (error) throw error;
      return data as University[];
    },
  });

  if (isLoading) {
    return (
      <section className="py-10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Universities
            </h2>
            <div className="animate-pulse flex space-x-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-64 w-80 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (universities.length === 0) {
    return null; // Don't show section if no featured universities
  }


  return (
    <section className="py-10 sm:py-14 lg:py-20 relative overflow-hidden">
      {/* Background decoration */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-start mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center w-fit leading-tight bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <GraduationCap className="w-4 h-4 mr-2" />
            Our Partners
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-primary bg-clip-text  mb-4">
            World-Class Universities
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Discover exceptional institutions that shape the future of education and innovation
            </p>
            <button
              onClick={handleViewAllUniversities}
              className="flex items-center self-start sm:self-auto shrink-0 gap-2 px-4 py-2 border border-orange-500 bg-orange-100 text-orange-600 rounded-md font-medium hover:bg-orange-200 transition"
            >
              Explore All Universities <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        {/* univertisites */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-6 py-4">
              {universities.map((university) => (
                <CarouselItem key={university.id} className="pl-6 basis-full md:basis-1/2 lg:basis-1/3">
                  <div className="h-full">
                    <Card className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 rounded-xl h-full">
                      {/* Gradient overlay for depth */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-black/5 pointer-events-none"></div>

                      {/* {university.featured && (
                    <div className="absolute top-2 left-2 z-20">
                      <div className="flex items-center gap-1 bg-gradient-to-r from-[#fa8500] to-[#023047] text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow-lg">
                        <Sparkles className="h-2.5 w-2.5" />
                        Featured
                      </div>
                    </div>
                  )} */}

                      {/* University logo section */}
                      <div className="relative h-28 bg-gradient-to-br from-slate-100 via-[#023047]/5 to-[#fa8500]/10 flex items-center justify-center p-6">
                        {university.logo_url ? (
                          <img
                            src={university.logo_url}
                            alt={university.name}
                            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg flex items-center justify-center">
                            <Building2 className="h-10 w-10 text-primary" />
                          </div>
                        )}
                      </div>

                      {/* Save Button
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 z-20 bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg rounded-full h-8 w-8 p-0 border-0 transition-all duration-300 hover:scale-110"
                  >
                    <Heart className="h-3.5 w-3.5 text-gray-400 hover:text-red-500" />
                  </Button> */}

                      {/* Content Section */}
                      <div className="p-4 space-y-3 relative z-10">
                        {/* Title and Location */}
                        <div className="space-y-2">
                          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors duration-300">
                            {university.name}
                          </h3>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                            <span className="text-sm font-medium">
                              {university.location}, {university.country}
                            </span>
                          </div>
                        </div>

                        {/* Programs count */}
                        <div className="flex items-center justify-between p-2.5 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md flex items-center justify-center">
                              <GraduationCap className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">Programs</span>
                          </div>
                          <span className="text-sm font-bold text-gray-900 bg-white px-2 py-0.5 rounded-md shadow-sm">
                            {university.courses?.[0]?.count || 0}
                          </span>
                        </div>

                        {/* Separator with gradient */}
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            className="flex-1 h-10 font-semibold border-2 border-orange-200 text-orange-600 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300 rounded-xl shadow-sm hover:shadow-md"
                            asChild
                          >
                            <Link to={`/universities/${university.slug || university.id}`}>
                              View Details
                            </Link>
                          </Button>
                          {university.website_url && (
                            <Button
                              className="flex-1 h-10 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                              asChild
                            >
                              <a href={university.website_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Website
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Enhanced navigation buttons */}
            {universities.length > 4 && (
              <>
            <CarouselPrevious className="hidden md:flex -left-6 w-12 h-12 bg-white/90 backdrop-blur-sm border-2 border-white rounded-2xl shadow-xl hover:bg-white hover:shadow-2xl transition-all text-primary hover:text-primary duration-300 hover:scale-110" />
            <CarouselNext className="hidden md:flex -right-6 w-12 h-12 bg-white/90 backdrop-blur-sm border-2 border-white rounded-2xl shadow-xl hover:bg-white hover:shadow-2xl transition-all 
                     text-primary hover:text-primary duration-300 hover:scale-110" />
                     </>
            )}
          </Carousel>
        </div> {/* Dots Indicator */}
        {universities.length > 6 && (

          <div className="mt-4 bottom-6 left-0 right-0 flex justify-center items-center space-x-3 z-30">
            {universities.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-primary/90 w-5' : 'bg-gray-200 hover:bg-gray-300'}`}
                aria-label={`Go to university ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Enhanced Call to Action */}
        <div className="text-center mt-16">
          <p className="text-slate-500 text-sm mt-4 font-medium">
            Discover {universities.length}+ partnered institutions worldwide
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedUniversities;


