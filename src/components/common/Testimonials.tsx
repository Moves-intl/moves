
import React from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      country: 'Australia',
      university: 'University of Melbourne',
      course: 'Master of Data Science',
      image: '/placeholder.svg',
      rating: 5,
      text: "Moves International made my dream of studying in Australia a reality. Their team guided me through every step of the application process and helped me secure a scholarship. I couldn't have done it without their expertise and support.",
      flag: '🇦🇺'
    },
    {
      id: 2,
      name: 'Raj Patel',
      country: 'Canada',
      university: 'University of Toronto',
      course: 'MBA',
      image: '/placeholder.svg',
      rating: 5,
      text: "The visa process seemed overwhelming at first, but the consultants at Moves International simplified everything. They prepared me thoroughly for the visa interview and I got approved on my first attempt.",
      flag: '🇨🇦'
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      country: 'United Kingdom',
      university: 'Imperial College London',
      course: 'MS in Engineering',
      image: '/placeholder.svg',
      rating: 5,
      text: "Professional, knowledgeable, and genuinely caring - that's how I'd describe the team. They helped me choose the right course and university, and even assisted with accommodation. Highly recommended!",
      flag: '🇬🇧'
    },
    {
      id: 4,
      name: 'David Kim',
      country: 'New Zealand',
      university: 'University of Auckland',
      course: 'Bachelor of Computer Science',
      image: '/placeholder.svg',
      rating: 5,
      text: "From course selection to visa approval, everything was handled professionally. The team's expertise in New Zealand's education system was evident. I'm now enjoying my studies in beautiful Auckland.",
      flag: '🇳🇿'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-primary/5"></div>
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10 sm:mb-14 lg:mb-20">
          <div className="inline-flex items-center bg-green-500/10 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2 fill-current" />
            Student Success Stories
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            What Our Students
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Say About Us</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Hear from students who have successfully started their international education journey with our guidance. 
            Their success stories inspire us to continue delivering excellence.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-14 lg:mb-16">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 relative border border-gray-100 hover:-translate-y-1"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-12 h-12 bg-gradient-to-r from-accent to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Quote className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Flag */}
              <div className="absolute top-6 right-6 text-3xl opacity-20 group-hover:opacity-40 transition-opacity">
                {testimonial.flag}
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6 mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-5 sm:mb-8 leading-relaxed text-sm sm:text-base lg:text-lg italic">
                "{testimonial.text}"
              </p>

              {/* Student Info */}
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 font-medium">{testimonial.course}</p>
                  <p className="text-sm text-accent font-semibold">
                    {testimonial.university}
                  </p>
                  <p className="text-xs text-gray-500">
                    {testimonial.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-gray-200">
            <div className="flex justify-center items-center mb-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent border-4 border-white shadow-lg flex items-center justify-center text-white font-bold">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full bg-accent text-white text-sm flex items-center justify-center border-4 border-white shadow-lg font-bold">
                  +10k
                </div>
              </div>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Join 10,000+ Successful Students
            </h3>
            <p className="text-gray-600 mb-8">
              Ready to write your own success story? Start your journey today with a free consultation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link to="/services/consultation">
                  Share Your Success Story
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary bg-white text-primary hover:bg-white/90 hover:text-primary px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link to="/testimonials">
                  Read More Stories
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
