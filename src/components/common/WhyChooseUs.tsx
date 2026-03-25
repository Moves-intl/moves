import React from 'react';
import { Award, Users, Globe, BookOpen, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Award,
      title: 'Expert Counsellors',
      description: 'Certified education consultants with 10+ years of experience in international admissions.',
      color: 'bg-blue-500',
      hoverColor: 'group-hover:bg-blue-600'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Partnerships with 500+ universities across 15+ countries worldwide.',
      color: 'bg-green-500',
      hoverColor: 'group-hover:bg-green-600'
    },
    {
      icon: Users,
      title: '10,000+ Success Stories',
      description: 'Over 10,000 students successfully placed in top universities globally.',
      color: 'bg-purple-500',
      hoverColor: 'group-hover:bg-purple-600'
    },
    {
      icon: BookOpen,
      title: 'Complete Support',
      description: 'End-to-end assistance from application to visa approval and pre-departure support.',
      color: 'bg-orange-500',
      hoverColor: 'group-hover:bg-orange-600'
    },
    {
      icon: Shield,
      title: '99% Visa Success Rate',
      description: 'Industry-leading visa approval rate with expert documentation support.',
      color: 'bg-red-500',
      hoverColor: 'group-hover:bg-red-600'
    },
    {
      icon: Clock,
      title: 'Quick Processing',
      description: 'Fast-track your applications with our streamlined processes and university partnerships.',
      color: 'bg-teal-500',
      hoverColor: 'group-hover:bg-teal-600'
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10 sm:mb-14 lg:mb-20">
          <div className="inline-flex items-center bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4 mr-2" />
            Why Students Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Your Success is Our
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Mission</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're not just consultants, we're your partners in achieving your dream of studying abroad. 
            Here's what sets us apart and makes us the trusted choice for thousands of students worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-14 lg:mb-20">
          {features.map((feature, index) => (
            <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
              <div className={`w-16 h-16 ${feature.color} ${feature.hoverColor} rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary via-primary/95 to-accent rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl transform -translate-x-24 translate-y-24"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">Ready to Transform Your Future?</h3>
              <p className="text-sm sm:text-base lg:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of students who have achieved their dreams with our expert guidance. 
                Your journey to international education starts with a single conversation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link to="/services/consultation">
                    Get Free Consultation
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white bg-white text-primary hover:bg-white/90 hover:text-primary px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link to="/courses">
                    Explore Courses
                  </Link>
                </Button>
              </div>
              
              {/* Stats row */}
              <div className="flex flex-wrap justify-center gap-8 mt-8 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-2xl font-bold">10,000+</div>
                  <div className="text-sm opacity-80">Students Placed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm opacity-80">University Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">99%</div>
                  <div className="text-sm opacity-80">Visa Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-sm opacity-80">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
