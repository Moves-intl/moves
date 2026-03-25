
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, Clock, DollarSign, Calendar, ArrowLeft, GraduationCap, BookOpen, Users, Award, CheckCircle, Globe, BarChart3, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useSavedCourses } from '@/hooks/useSavedCourses';
import HowToApply from '@/components/common/HowToApply';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';

const CourseDetails = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const { savedCourseIds, toggleSaveCourse } = useSavedCourses();

  const { data: course, isLoading, error } = useQuery({
    queryKey: ['course', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          universities:university_id(name, location, logo_url, website_url, slug),
          destinations:destination_id(name, featured_image_url)
        `)
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  // Check if course is saved using the hook
  const isSaved = course?.id ? savedCourseIds.has(course.id) : false;

  const handleSaveCourse = async () => {
    if (!course?.id) return;
    await toggleSaveCourse(course.id);
  };

  const formatTuitionFee = (min: number, max: number, currency: string) => {
    const formatNumber = (num: number) => new Intl.NumberFormat().format(num);
    if (min === max) {
      return `${currency} ${formatNumber(min)}`;
    }
    return `${currency} ${formatNumber(min)} - ${formatNumber(max)}`;
  };

  const formatDuration = (months: number) => {
    if (months === 12) return '1 year';
    if (months % 12 === 0) return `${months / 12} years`;
    return `${months} months`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-gray-200 rounded-xl"></div>
                <div className="h-40 bg-gray-200 rounded-xl"></div>
              </div>
              <div className="space-y-6">
                <div className="h-60 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Course not found</h1>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Link to="/courses">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link 
              to="/courses" 
              className="inline-flex items-center text-white/80 hover:text-white transition-all duration-200 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-medium">Back to Courses</span>
            </Link>
          </nav>
          
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {course.featured && (
                  <Badge className="bg-yellow-500 text-yellow-900 border-yellow-600 px-3 py-1 font-medium">
                    <Award className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                <Badge className="bg-blue-500 text-white border-blue-600 px-3 py-1 font-medium">
                  {course.study_area}
                </Badge>
                <Badge className="bg-green-500 text-white border-green-600 px-3 py-1 font-medium">
                  {course.level}
                </Badge>
              </div>
              
              {/* Course Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                {course.title}
              </h1>
              
              {/* Quick Info */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-blue-500/20 backdrop-blur-sm rounded-xl border border-blue-400/30">
                  <div className="p-2 bg-blue-500/30 rounded-lg">
                    <MapPin className="h-5 w-5 text-blue-100" />
                  </div>
                  <div>
                    <div className="text-white/80 text-sm">University</div>
                    <div className="font-semibold">{course.universities?.name || course.university}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-green-500/20 backdrop-blur-sm rounded-xl border border-green-400/30">
                  <div className="p-2 bg-green-500/30 rounded-lg">
                    <Globe className="h-5 w-5 text-green-100" />
                  </div>
                  <div>
                    <div className="text-white/80 text-sm">Location</div>
                    <div className="font-semibold">{course.destinations?.name || course.country}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-purple-500/20 backdrop-blur-sm rounded-xl border border-purple-400/30">
                  <div className="p-2 bg-purple-500/30 rounded-lg">
                    <Clock className="h-5 w-5 text-purple-100" />
                  </div>
                  <div>
                    <div className="text-white/80 text-sm">Duration</div>
                    <div className="font-semibold">{formatDuration(course.duration_months)}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tuition Fee Card */}
            <div className="lg:justify-self-end">
              <div className="p-6 bg-orange-500/20 backdrop-blur-md rounded-2xl border border-orange-400/30 text-center">
                <div className="text-white/80 text-sm mb-2">Tuition Fee</div>
                <div className="text-3xl font-bold mb-4">
                  {course.currency} {course.tuition_fee?.toLocaleString()}
                </div>
                <div className="space-y-3">
                  {course.application_link ? (
                    <Button 
                      className="w-full bg-orange-500 text-white hover:bg-orange-600 font-semibold"
                      asChild
                    >
                      <a href={course.application_link} target="_blank" rel="noopener noreferrer">
                        Apply Now
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  ) : (
                    <Button 
                      className="w-full bg-orange-500 text-white hover:bg-orange-600 font-semibold"
                      asChild
                    >
                      <Link to="/student-dashboard/applications">
                        Apply Now
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  )}
                  
                  <Button 
                    variant={isSaved ? "default" : "outline"}
                    className={`w-full border-orange-300 ${isSaved 
                      ? 'bg-orange-500 hover:bg-red-600 text-white border-transparent' 
                      : 'bg-transpar\ent text-white hover:bg-orange-500/20 border-orange-400'}`}
                    onClick={handleSaveCourse}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                    {isSaved ? 'Saved' : 'Save Course'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* Course Image */}
            {course.thumbnail_url && (
              <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                <img 
                  src={course.thumbnail_url} 
                  alt={course.title}
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            )}

            {/* Course Overview */}
            <div className="bg-white rounded-2xl shadow-xl border border-border/50 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Course Overview</h2>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {course.description || 'No description available for this course.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Requirements Section */}
            <div className="grid md:grid-cols-2 gap-8">
              {course.eligibility && (
                <div className="bg-white rounded-2xl shadow-xl border border-border/50 overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold">Eligibility Requirements</h3>
                    </div>
                    <div className="prose max-w-none">
                      <p className="text-muted-foreground whitespace-pre-line">{course.eligibility}</p>
                    </div>
                  </div>
                </div>
              )}

              {course.requirements && (
                <div className="bg-white rounded-2xl shadow-xl border border-border/50 overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Award className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold">Additional Requirements</h3>
                    </div>
                    <div className="prose max-w-none">
                      <p className="text-muted-foreground whitespace-pre-line">{course.requirements}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Course Info & Actions */}
          <div className="space-y-8">
            {/* Course Quick Stats */}
            <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-2xl shadow-xl border border-border/50 overflow-hidden">
              <div className="p-8">
                <h3 className="text-xl font-bold mb-6">Course Information</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-border/30">
                      <div className="p-3 bg-primary/10 rounded-full mx-auto mb-3 w-fit">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">Study Level</div>
                      <div className="font-bold text-foreground">{course.level}</div>
                    </div>
                    
                    <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-border/30">
                      <div className="p-3 bg-accent/10 rounded-full mx-auto mb-3 w-fit">
                        <Clock className="h-6 w-6 text-accent" />
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">Duration</div>
                      <div className="font-bold text-foreground">{formatDuration(course.duration_months)}</div>
                    </div>
                  </div>

                  {course.intake_dates && course.intake_dates.length > 0 && (
                    <div className="p-6 bg-white rounded-xl shadow-sm border border-border/30">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold">Intake Dates</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {course.intake_dates.map((date, index) => (
                          <Badge key={index} variant="secondary" className="px-3 py-1">
                            {date}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* University Info */}
            {course.universities && (
              <div className="bg-white rounded-2xl shadow-xl border border-border/50 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">University</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {course.universities.logo_url && (
                      <div className="flex justify-center p-4 bg-muted/30 rounded-xl">
                        <img 
                          src={course.universities.logo_url} 
                          alt={course.universities.name}
                          className="h-20 object-contain"
                        />
                      </div>
                    )}
                    <div className="text-center">
                      <h4 className="font-bold text-lg mb-2">{course.universities.name}</h4>
                      {course.universities.location && (
                        <p className="text-muted-foreground">{course.universities.location}</p>
                      )}
                    </div>
                    {course.universities.slug && (
                      <Button variant="outline" className="w-full" asChild>
                        <Link to={`/universities/${course.universities.slug}`}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View University Details
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* How to Apply Section */}
      <HowToApply />
      
      {/* Lead Enquiry Form */}
      <LeadEnquiryForm />
    </div>
  );
};

export default CourseDetails;
