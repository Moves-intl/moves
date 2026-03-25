import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Award, MapPin, DollarSign, Calendar, ExternalLink, Building, BookOpen, Mail, Phone, ArrowLeft, GraduationCap, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet-async';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';

const ScholarshipDetails = () => {
  const { slug } = useParams();

  const { data: scholarship, isLoading, error } = useQuery({
    queryKey: ['scholarship-details', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('scholarships')
        .select(`
          *,
          universities(name, logo_url, website_url),
          courses(title, slug)
        `)
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      return data;
    }
  });

  const getScholarshipTypeColor = (type: string) => {
    const colors = {
      'merit': 'bg-blue-100 text-blue-800',
      'need-based': 'bg-green-100 text-green-800',
      'sports': 'bg-purple-100 text-purple-800',
      'academic': 'bg-orange-100 text-orange-800',
      'research': 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const isDeadlineSoon = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !scholarship) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Scholarship Not Found</h1>
          <p className="text-gray-600 mb-6">The scholarship you're looking for doesn't exist or has been removed.</p>
          <Link to="/scholarships">
            <Button>Browse All Scholarships</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{scholarship.meta_title || scholarship.title} | Moves International</title>
        <meta name="description" content={scholarship.meta_description || scholarship.short_description} />
      </Helmet>

      {/* Hero Section with Modern Design */}
      <section className="relative bg-[#023047] text-white py-12 lg:py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-16 w-36 h-36 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-80 right-24 w-28 h-28 bg-accent/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-44 h-44 bg-white/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
          {/* Subtle decorative elements */}
          <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-accent rounded-full animate-ping opacity-20"></div>
          <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-white rounded-full animate-ping delay-2000 opacity-30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:min-h-[500px]">
            {/* Left Column - Scholarship Content */}
            <div className="space-y-8 pt-0 animate-fade-in">
              {/* Modern Breadcrumb */}
              <nav className="flex items-center gap-3 text-sm">
                <Link
                  to="/scholarships"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 group"
                >
                  <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 group-hover:border-white/40 transition-all duration-300">
                    <ArrowLeft className="h-3 w-3 text-white" />
                  </div>
                  <span>Back to Scholarships</span>
                </Link>
                <ChevronRight className="h-4 w-4 text-white/50" />
                <span className="text-white font-medium">{scholarship.title}</span>
              </nav>

              {/* Scholarship Content */}
              <div className="space-y-6">
                {/* Badges */}
                <div className="flex flex-wrap gap-2">

                   <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white border border-white/20 hover:border-white/30 transition-all duration-300 animate-scale-in">
                  <GraduationCap className='w-4 h-4 text-accent '/>
                  {scholarship.scholarship_type}
                </div>
                  {scholarship.is_featured && (
                    <Badge className="bg-accent/90 hover:bg-accent border-accent text-white transition-all duration-300">
                      Featured
                    </Badge>
                  )}
                  {scholarship.deadline && isDeadlineSoon(scholarship.deadline) && (
                    <Badge className="bg-red-500/90 hover:bg-red-500 border-red-400 text-white transition-all duration-300">
                      Deadline Soon
                    </Badge>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-black leading-tight">
                  <span className="block text-white drop-shadow-lg">
                    {scholarship.title}
                  </span>
                </h1>

                {/* Short Description */}
                {scholarship.short_description && (
                  <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                    {scholarship.short_description}
                  </p>
                )}
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {scholarship.scholarship_amount && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-accent/20 backdrop-blur-sm rounded-lg border border-accent/30">
                        <DollarSign className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-white/80 text-sm">Amount</p>
                        <p className="text-white font-semibold">{scholarship.scholarship_amount} {scholarship.currency}</p>
                      </div>
                    </div>
                  </div>
                )}

                {scholarship.deadline && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 backdrop-blur-sm rounded-lg border border-blue-500/30">
                        <Calendar className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-white/80 text-sm">Deadline</p>
                        <p className="text-white font-semibold">{format(new Date(scholarship.deadline), 'MMM dd, yyyy')}</p>
                      </div>
                    </div>
                  </div>
                )}

                {scholarship.destination_country && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/20 backdrop-blur-sm rounded-lg border border-emerald-500/30">
                        <MapPin className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-white/80 text-sm">Location</p>
                        <p className="text-white font-semibold">{scholarship.destination_country}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {scholarship.application_link && (
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 shadow-xl hover:shadow-2xl hover:shadow-accent/25 
              transition-all duration-300 text-lg px-8 py-6 text-white transform hover:scale-105"
                  >
                    <a href={scholarship.application_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <ExternalLink className="h-5 w-5" />
                      Apply Now
                    </a>
                  </Button>
                )}

              </div>
            </div>

            {/* Right Column - Featured Image */}
            {scholarship.featured_image_url && (
              <div className="relative hidden lg:block animate-fade-in delay-700">
                <div className="relative w-full h-[400px] bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-2xl hover:shadow-white/10 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10"></div>
                  <img
                    src={scholarship.featured_image_url}
                    alt={scholarship.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Floating elements */}
                  <div className="absolute top-8 right-8 w-16 h-16 bg-accent/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-accent/30">
                    <Award className="h-6 w-6 text-accent" />
                  </div>

                  <div className="absolute bottom-8 left-8 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Main Content */}
      <div className="container px-4 py-8 lg:py-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-8">
            {/* Quick Overview Card */}
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Award className="h-6 w-6" />
                  Quick Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {scholarship.universities?.name && (
                    <div className="flex items-start gap-3">
                      <Building className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">University</p>
                        <p className="text-gray-600">{scholarship.universities.name}</p>
                      </div>
                    </div>
                  )}

                  {scholarship.courses?.title && (
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Course</p>
                        <Link to={`/courses/${scholarship.courses.slug}`} className="text-primary hover:text-primary/80 transition-colors">
                          {scholarship.courses.title}
                        </Link>
                      </div>
                    </div>
                  )}

                  {scholarship.start_date && (
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Start Date</p>
                        <p className="text-gray-600">{format(new Date(scholarship.start_date), 'PPP')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {scholarship.full_description && (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl">About This Scholarship</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed">
                    <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
                      {scholarship.full_description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Eligibility */}
            {scholarship.eligibility_criteria && (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Eligibility Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700">
                    <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
                      {scholarship.eligibility_criteria}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Application Process */}
            {scholarship.application_process && (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl text-accent">How to Apply</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700">
                    <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
                      {scholarship.application_process}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Required Documents */}
            {scholarship.required_documents && (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl">Required Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700">
                    <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
                      {scholarship.required_documents}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Sticky Container */}
            <div className="xl:sticky xl:top-16 space-y-6 top-auto">
              {/* Apply Now - Highlighted */}
              <Card className="shadow-lg border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader className="pb-4">
                  <CardTitle className="text-center text-primary">Ready to Apply?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {scholarship.application_link && (
                    <Button size="lg" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg" asChild>
                      <a href={scholarship.application_link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-5 w-5 mr-2" />
                        Apply Now
                      </a>
                    </Button>
                  )}

                  <Button variant="outline" size="lg" className="w-full border-2 hover:bg-primary/5" asChild>
                    <Link to="/contact">
                      Get Help with Application
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Information */}
              {(scholarship.contact_email || scholarship.contact_phone) && (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {scholarship.contact_email && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                        <a href={`mailto:${scholarship.contact_email}`} className="text-primary hover:text-primary/80 break-all">
                          {scholarship.contact_email}
                        </a>
                      </div>
                    )}
                    {scholarship.contact_phone && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                        <a href={`tel:${scholarship.contact_phone}`} className="text-primary hover:text-primary/80">
                          {scholarship.contact_phone}
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* University Information */}
              {scholarship.universities && (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">University</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                      {scholarship.universities.logo_url && (
                        <img
                          src={scholarship.universities.logo_url}
                          alt={scholarship.universities.name}
                          className="w-12 h-12 object-contain flex-shrink-0"
                        />
                      )}
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{scholarship.universities.name}</h3>
                      </div>
                    </div>
                    {scholarship.universities.website_url && (
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href={scholarship.universities.website_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit Website
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}

              
            </div>
          </div>
        </div>
                  <LeadEnquiryForm />
      </div>
    </div>
  );
};

export default ScholarshipDetails;