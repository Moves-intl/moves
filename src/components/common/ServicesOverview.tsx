
import React from 'react';
import { MessageCircle, FileCheck, Plane, BookOpen, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ServicesOverview = () => {
  const services = [
    {
      icon: MessageCircle,
      title: 'Free Consultation',
      description: 'Get personalized guidance from certified education consultants',
      features: ['Career counseling', 'Course selection', 'University matching'],
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      link: '/services/consultation'
    },
    {
      icon: FileCheck,
      title: 'Application Assistance',
      description: 'Complete support for university and college applications',
      features: ['Document preparation', 'Application review', 'Submission tracking'],
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      link: '/services/application-assistance'
    },
    {
      icon: Plane,
      title: 'Visa & Migration',
      description: 'Expert visa guidance and migration services',
      features: ['Visa application', 'Interview preparation', 'Post-study options'],
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      link: '/services/visa-migration'
    },
    {
      icon: BookOpen,
      title: 'English Test Prep',
      description: 'Comprehensive IELTS and PTE training and test booking',
      features: ['IELTS & PTE classes', 'Practice tests', 'Score guarantee'],
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      link: '/services/english-test-prep'
    },
    {
      icon: Award,
      title: 'Scholarship Guidance',
      description: 'Find and apply for scholarships and financial aid',
      features: ['Scholarship search', 'Application help', 'Merit assessment'],
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      link: '/services/scholarship-guidance'
    },
    {
      icon: Users,
      title: 'Pre-Departure Support',
      description: 'Complete preparation for your journey abroad',
      features: ['Accommodation help', 'Travel guidance', 'Orientation sessions'],
      color: 'bg-teal-500',
      hoverColor: 'hover:bg-teal-600',
      link: '/services/pre-departure-support'
    }
  ];

  return (
    <section className="py-10 sm:py-14 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Complete Education & Migration Services
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            From initial consultation to post-arrival support, we provide end-to-end services 
            to make your international education journey smooth and successful.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="group bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 lg:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-colors"
                  asChild
                >
                  <Link to={service.link}>Learn More</Link>
                </Button>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 sm:mt-12 lg:mt-16 text-center">
          <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-5 sm:p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Book a free consultation with our experts and take the first step 
              towards your international education goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white" asChild>
                <Link to="/services/consultation">Book Free Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/contact">Download Course Guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
