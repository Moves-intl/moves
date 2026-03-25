import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Sitemap = () => {
  const sitemapSections = [
    {
      title: 'Main Pages',
      links: [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Privacy Policy', path: '/privacy-policy' },
      ]
    },
    {
      title: 'Study Abroad',
      links: [
        { name: 'Courses', path: '/courses' },
        { name: 'Universities', path: '/universities' },
        { name: 'Destinations', path: '/destinations' },
        { name: 'Course Comparison', path: '/course-comparison' },
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'All Services', path: '/services' },
        { name: 'Consultation', path: '/services/consultation' },
        { name: 'Visa & Migration', path: '/services/visa-migration' },
        { name: 'English Test Prep', path: '/services/english-test-prep' },
        { name: 'Application Assistance', path: '/services/application-assistance' },
        { name: 'Scholarship Guidance', path: '/services/scholarship-guidance' },
        { name: 'Pre-Departure Support', path: '/services/pre-departure-support' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', path: '/blogs' },
      ]
    },
    {
      title: 'Student Portal',
      links: [
        { name: 'Student Login', path: '/auth' },
        { name: 'Student Dashboard', path: '/student-dashboard/home' },
        { name: 'My Applications', path: '/student-dashboard/applications' },
        { name: 'Saved Courses', path: '/student-dashboard/saved-courses' },
        { name: 'Counselling', path: '/student-dashboard/counselling' },
        { name: 'My Profile', path: '/student-dashboard/profile' },
        { name: 'Account Settings', path: '/student-dashboard/settings' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Helmet>
        <title>Sitemap - Study Hub</title>
        <meta name="description" content="Complete sitemap of all pages available on our study abroad platform." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Sitemap
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Navigate through all the pages and resources available on our platform
            </p>
          </div>

          {/* Sitemap Sections */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sitemapSections.map((section, index) => (
              <Card key={index} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {section.title}
                  </CardTitle>
                  <Separator className="mt-2" />
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link 
                          to={link.path}
                          className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group"
                        >
                          <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-3 group-hover:bg-primary transition-colors" />
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Information */}
          <div className="mt-12 text-center">
            <Card className="border border-border/50 bg-muted/30">
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold mb-4">Need Help Finding Something?</h2>
                <p className="text-muted-foreground mb-6">
                  Can't find what you're looking for? Our support team is here to help you navigate our platform.
                </p>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Contact Us
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link 
              to="/" 
              className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;