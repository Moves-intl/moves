import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Calendar, Building2, ExternalLink, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { JobApplicationModal } from '@/components/careers/JobApplicationModal';

const CareerDetails = () => {
  const { slug } = useParams();

  const { data: career, isLoading, error } = useQuery({
    queryKey: ['career', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('careers')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  const getJobTypeColor = (type: string) => {
    const colors = {
      'Full-Time': 'bg-green-100 text-green-800',
      'Part-Time': 'bg-blue-100 text-blue-800',
      'Internship': 'bg-purple-100 text-purple-800',
      'Contract': 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !career) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Link to="/careers">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Careers
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isDeadlinePassed = career.application_deadline && new Date(career.application_deadline) < new Date();

  return (
    <>
      <Helmet>
        <title>{career.meta_title || `${career.job_title} | Moves International`}</title>
        <meta name="description" content={career.meta_description || career.short_description} />
        <meta property="og:title" content={career.job_title} />
        <meta property="og:description" content={career.short_description} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/careers">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Careers
              </Button>
            </Link>
          </div>

          {/* Job Header */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={getJobTypeColor(career.job_type)}>
                {career.job_type}
              </Badge>
              {isDeadlinePassed && (
                <Badge variant="destructive">Application Deadline Passed</Badge>
              )}
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{career.job_title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                <span>{career.department}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{career.location}</span>
              </div>
              {career.application_deadline && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Apply by {format(new Date(career.application_deadline), 'PPP')}</span>
                </div>
              )}
            </div>

            {isDeadlinePassed && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-medium">The application deadline for this position has passed.</p>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">About This Role</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-wrap">{career.full_description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                  <div className="prose max-w-none">
                    <div className="text-gray-700 whitespace-pre-wrap">{career.requirements}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              {career.benefits && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Benefits & Perks</h2>
                    <div className="prose max-w-none">
                      <div className="text-gray-700 whitespace-pre-wrap">{career.benefits}</div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Job Summary */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Job Summary</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-gray-500">Department</div>
                      <div className="text-gray-900">{career.department}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Location</div>
                      <div className="text-gray-900">{career.location}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Job Type</div>
                      <div className="text-gray-900">{career.job_type}</div>
                    </div>
                    {career.application_deadline && (
                      <div>
                        <div className="text-sm font-medium text-gray-500">Application Deadline</div>
                        <div className="text-gray-900">
                          {format(new Date(career.application_deadline), 'PPP')}
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-500">Posted</div>
                      <div className="text-gray-900">
                        {format(new Date(career.created_at), 'PPP')}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Apply Button */}
              {!isDeadlinePassed && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Ready to Apply?</h3>
                    <p className="text-gray-600 mb-4">
                      Take the next step in your career journey with Moves International.
                    </p>
                    <JobApplicationModal 
                      careerId={career.id} 
                      jobTitle={career.job_title}
                    >
                      <Button className="w-full">
                        Apply Now
                      </Button>
                    </JobApplicationModal>
                  </CardContent>
                </Card>
              )}

              {/* Share Job */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Share This Job</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Know someone who might be interested? Share this opportunity with them.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: career.job_title,
                          text: career.short_description,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                      }
                    }}
                  >
                    Share Job
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerDetails;