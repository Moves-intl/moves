import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, MapPin, Clock, DollarSign, Calendar, GraduationCap, X, BookOpen, Users, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: string;
  title: string;
  description: string;
  study_area: string;
  level: string;
  country: string;
  university: string;
  tuition_fee: number;
  currency: string;
  duration_months: number;
  intake_dates: string[];
  eligibility: string;
  requirements: string;
  image_url: string;
  featured: boolean;
}

const CourseComparison = () => {
  const { toast } = useToast();

  const { data: savedCourses = [], isLoading, refetch } = useQuery({
    queryKey: ['saved-courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('saved_courses')
        .select(`
          id,
          course_id,
          courses (*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data.map(item => ({ ...item.courses, saved_id: item.id })) as (Course & { saved_id: string })[];
    }
  });

  const removeCourse = async (savedId: string) => {
    const { error } = await supabase
      .from('saved_courses')
      .delete()
      .eq('id', savedId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to remove course from comparison",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Course removed from comparison"
      });
      refetch();
    }
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

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "bachelor's": return 'bg-blue-100 text-blue-800 border-blue-200';
      case "master's": return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'phd': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStudyAreaIcon = (area: string) => {
    switch (area.toLowerCase()) {
      case 'computer science': return <BookOpen className="h-4 w-4" />;
      case 'business': return <Users className="h-4 w-4" />;
      case 'engineering': return <Award className="h-4 w-4" />;
      default: return <GraduationCap className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-[#023047] mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 bg-[#023047]/10 animate-pulse mx-auto"></div>
          </div>
          <p className="text-gray-600 font-medium">Loading your saved courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-white shadow-md rounded-lg border border-gray-200">
        {/* Gradient overlay with slight blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#023047]/10 to-[#fa8500]/10 blur-sm pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-0">
            
            <div className="max-w-xl text-center md:text-left">
              <h1 className="text-4xl font-extrabold text-[#023047] mb-3 leading-tight">
                Course Comparison
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Compare your saved courses side by side
              </p>

              {savedCourses.length > 0 && (
                <div className="inline-flex items-center space-x-3 bg-[#023047]/15 rounded-full px-5 py-3 shadow-sm">
                  <GraduationCap className="h-6 w-6 text-[#023047]" />
                  <span className="text-[#023047] font-semibold text-lg">
                    {savedCourses.length} courses saved
                  </span>
                </div>
              )}
            </div>

            <Link to="/courses" className="shrink-0">
              <Button
                variant="outline"
                className="border-[#023047] text-[#023047] px-6 py-3 rounded-md font-semibold transition-colors duration-300
                hover:bg-[#023047] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fa8500]"
              >
                Back to Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {savedCourses.length === 0 ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center bg-white rounded-2xl shadow-lg border p-6 sm:p-8 lg:p-12">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-[#023047]/10 rounded-full flex items-center justify-center mx-auto">
                <GraduationCap className="h-12 w-12 text-[#023047]" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">0</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No saved courses yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
              You haven't saved any courses for comparison yet. Browse our extensive course catalog and save the ones that interest you.
            </p>
            <Link to="/courses">
              <Button className="bg-[#fa8500] hover:bg-[#fa8500]/90 text-white px-8 py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Stats Bar */}
          {savedCourses.length > 0 && (
            <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{savedCourses.length}</div>
                    <div className="text-sm text-gray-600">Courses</div>
                  </div>
                  <div className="h-8 w-px bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{new Set(savedCourses.map(c => c.country)).size}</div>
                    <div className="text-sm text-gray-600">Countries</div>
                  </div>
                  <div className="h-8 w-px bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{new Set(savedCourses.map(c => c.level)).size}</div>
                    <div className="text-sm text-gray-600">Levels</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile View - Enhanced Cards */}
          <div className="lg:hidden space-y-6">
            {savedCourses.map((course) => (
              <Card key={course.id} className="relative overflow-hidden bg-white border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#023047] to-[#fa8500]"></div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full w-8 h-8 p-0 transition-all duration-200"
                  onClick={() => removeCourse(course.saved_id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between pr-12">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                        {course.title}
                      </CardTitle>
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mr-2 text-[#fa8500]" />
                        <span className="font-medium">{course.university}</span>
                        <span className="mx-2">•</span>
                        <span>{course.country}</span>
                      </div>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(course.level)}`}>
                        <GraduationCap className="h-3 w-3 mr-1" />
                        {course.level}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        {getStudyAreaIcon(course.study_area)}
                        <span className="ml-2 text-sm font-medium text-gray-700">Study Area</span>
                      </div>
                      <div className="text-gray-900 font-semibold">{course.study_area}</div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <Clock className="h-4 w-4 text-gray-600" />
                        <span className="ml-2 text-sm font-medium text-gray-700">Duration</span>
                      </div>
                      <div className="text-gray-900 font-semibold">{formatDuration(course.duration_months)}</div>
                    </div>
                  </div>
                  
                  <div className="bg-[#fa8500]/10 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <DollarSign className="h-4 w-4 text-[#fa8500]" />
                      <span className="ml-2 text-sm font-medium text-gray-700">Tuition Fees</span>
                    </div>
                    <div className="text-2xl font-bold text-[#fa8500]">
                      {course.currency} {course.tuition_fee?.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <Calendar className="h-4 w-4 text-gray-600" />
                        <span className="ml-2 text-sm font-medium text-gray-700">Intake Dates</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {course.intake_dates?.map((date, idx) => (
                          <span key={idx} className="bg-[#023047]/10 text-[#023047] px-3 py-1 rounded-full text-sm font-medium">
                            {date}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700 block mb-2">Eligibility Requirements</span>
                      <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 leading-relaxed">{course.eligibility}</p>
                    </div>
                  </div>
                  
                  <Link to="/student-dashboard/applications">
                    <Button className="w-full bg-[#fa8500] hover:bg-[#fa8500]/90 text-white py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105">
                      Apply Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop View - Enhanced Comparison Table */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
              <div className="grid gap-0" style={{ gridTemplateColumns: `240px repeat(${savedCourses.length}, 1fr)` }}>
                {/* Header Row */}
                <div className="bg-gray-50 p-6 font-bold text-gray-900 border-b border-gray-200">
                  Course Details
                </div>
                {savedCourses.map((course) => (
                  <div key={`header-${course.id}`} className="relative bg-white border-b border-gray-200">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#023047] to-[#fa8500]"></div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full w-8 h-8 p-0 transition-all duration-200"
                      onClick={() => removeCourse(course.saved_id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="p-6 pr-16">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">{course.title}</h3>
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mr-2 text-[#fa8500]" />
                        <span className="text-sm">{course.university}, {course.country}</span>
                      </div>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(course.level)}`}>
                        <GraduationCap className="h-3 w-3 mr-1" />
                        {course.level}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Level Row */}
                <div className="bg-gray-50 p-6 font-semibold text-gray-800 border-b border-gray-200 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-gray-600" />
                  Level
                </div>
                {savedCourses.map((course) => (
                  <div key={`level-${course.id}`} className="p-6 border-b border-gray-200 bg-white">
                    <span className="flex items-center">
                      <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
                      {course.level}
                    </span>
                  </div>
                ))}

                {/* Duration Row */}
                <div className="bg-gray-50 p-6 font-semibold text-gray-800 border-b border-gray-200 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-gray-600" />
                  Duration
                </div>
                {savedCourses.map((course) => (
                  <div key={`duration-${course.id}`} className="p-6 border-b border-gray-200 bg-white">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      {formatDuration(course.duration_months)}
                    </span>
                  </div>
                ))}

                {/* Study Area Row */}
                <div className="bg-gray-50 p-6 font-semibold text-gray-800 border-b border-gray-200 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-gray-600" />
                  Study Area
                </div>
                {savedCourses.map((course) => (
                  <div key={`area-${course.id}`} className="p-6 border-b border-gray-200 bg-white">
                    <div className="flex items-center">
                      {getStudyAreaIcon(course.study_area)}
                      <span className="ml-2 font-medium text-gray-900">{course.study_area}</span>
                    </div>
                  </div>
                ))}

                {/* Tuition Row */}
                <div className="bg-gray-50 p-6 font-semibold text-gray-800 border-b border-gray-200 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-gray-600" />
                  Tuition Fees
                </div>
                {savedCourses.map((course) => (
                  <div key={`tuition-${course.id}`} className="p-6 border-b border-gray-200 bg-[#fa8500]/5">
                    <div className="text-xl font-bold text-[#fa8500] flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {course.currency} {course.tuition_fee?.toLocaleString()}
                    </div>
                  </div>
                ))}

                {/* Intakes Row */}
                <div className="bg-gray-50 p-6 font-semibold text-gray-800 border-b border-gray-200 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-gray-600" />
                  Intake Dates
                </div>
                {savedCourses.map((course) => (
                  <div key={`intakes-${course.id}`} className="p-6 border-b border-gray-200 bg-white">
                    <div className="flex flex-wrap gap-2">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400 mt-1" />
                      <div className="flex flex-wrap gap-2">
                        {course.intake_dates?.map((date, idx) => (
                          <span key={idx} className="bg-[#023047]/10 text-[#023047] px-3 py-1 rounded-full text-sm font-medium">
                            {date}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Eligibility Row */}
                <div className="bg-gray-50 p-6 font-semibold text-gray-800 border-b border-gray-200">
                  Eligibility
                </div>
                {savedCourses.map((course) => (
                  <div key={`eligibility-${course.id}`} className="p-6 border-b border-gray-200 bg-white">
                    <p className="text-sm text-gray-600 leading-relaxed">{course.eligibility}</p>
                  </div>
                ))}

                {/* Action Row */}
                <div className="bg-gray-50 p-6 font-semibold text-gray-800">
                  Apply
                </div>
                {savedCourses.map((course) => (
                  <div key={`actions-${course.id}`} className="p-6 bg-white">
                    <Button asChild className="w-full bg-[#fa8500] hover:bg-[#fa8500]/90 text-white py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105">
                      <Link to="/student-dashboard/applications">
                        Apply Now
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseComparison;