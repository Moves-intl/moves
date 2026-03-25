import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Calendar, Building2, ExternalLink, Filter } from 'lucide-react';
import { format } from 'date-fns';

const Careers = () => {
  const [jobTypeFilter, setJobTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const { data: careers, isLoading } = useQuery({
    queryKey: ['careers', jobTypeFilter, locationFilter],
    queryFn: async () => {
      let query = supabase
        .from('careers')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (jobTypeFilter !== 'all') {
        query = query.eq('job_type', jobTypeFilter as any);
      }

      if (locationFilter !== 'all') {
        query = query.eq('location', locationFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  // Get unique locations for filter
  const { data: locations } = useQuery({
    queryKey: ['career-locations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('careers')
        .select('location')
        .eq('is_published', true);
      
      if (error) throw error;
      
      const uniqueLocations = [...new Set(data.map(item => item.location))];
      return uniqueLocations;
    }
  });

  const getJobTypeColor = (type: string) => {
    const colors = {
      'Full-Time': 'bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 text-emerald-700 border-emerald-200',
      'Part-Time': 'bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-700 border-blue-200', 
      'Internship': 'bg-gradient-to-r from-purple-500/10 to-purple-600/10 text-purple-700 border-purple-200',
      'Contract': 'bg-gradient-to-r from-orange-500/10 to-orange-600/10 text-orange-700 border-orange-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gradient-to-r from-muted/50 to-muted text-muted-foreground border-border';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <div className="h-12 bg-gradient-to-r from-muted/50 to-muted rounded-xl animate-pulse mx-auto max-w-md"></div>
                <div className="h-6 bg-gradient-to-r from-muted/30 to-muted/60 rounded-lg animate-pulse mx-auto max-w-2xl"></div>
              </div>
              <div className="grid gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-8">
                      <div className="animate-pulse space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="h-6 bg-gradient-to-r from-muted/50 to-muted rounded-lg w-1/3"></div>
                          <div className="h-5 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full w-20"></div>
                        </div>
                        <div className="h-4 bg-gradient-to-r from-muted/30 to-muted/60 rounded w-1/2"></div>
                        <div className="h-4 bg-gradient-to-r from-muted/30 to-muted/60 rounded w-full"></div>
                        <div className="h-4 bg-gradient-to-r from-muted/30 to-muted/60 rounded w-3/4"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Careers | Moves International - Join Our Team</title>
        <meta name="description" content="Explore exciting career opportunities at Moves International. Join our team and help students achieve their international education dreams." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-accent/10 to-accent/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative">
          <div className="max-w-6xl mx-auto">
            {/* Hero Header */}
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/20 px-4 py-2 rounded-full text-sm font-medium text-primary mb-6">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                Join Our Growing Team
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-black leading-tight mb-6">
                <span className="block bg-gradient-to-r from-foreground via-foreground to-primary/80 bg-clip-text text-transparent">
                  Build Your
                </span>
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Future With Us
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Be part of our mission to help students achieve their international education dreams. 
                Discover exciting career opportunities where innovation meets impact.
              </p>
            </div>

            {/* Modern Filters */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 mb-12 shadow-lg">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-primary/10 to-primary/20 rounded-lg">
                    <Filter className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">Filter Opportunities:</span>
                </div>
                
                <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                  <SelectTrigger className="w-44 bg-background/80 border-border/50 hover:border-primary/50 transition-colors">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Full-Time">Full-Time</SelectItem>
                    <SelectItem value="Part-Time">Part-Time</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-44 bg-background/80 border-border/50 hover:border-primary/50 transition-colors">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations?.map((location) => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Job Listings */}
            {careers?.length === 0 ? (
              <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                <CardContent className="p-16 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">No Positions Available</h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
                    We don't have any open positions matching your criteria at the moment. 
                    Please check back later or adjust your filters.
                  </p>
                  <Button 
                    onClick={() => {
                      setJobTypeFilter('all');
                      setLocationFilter('all');
                    }}
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-8">
                {careers?.map((career) => (
                  <Card key={career.id} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                          <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-4">
                              <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <Building2 className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                  {career.job_title}
                                </h3>
                                <Badge variant="outline" className={`mt-2 border ${getJobTypeColor(career.job_type)}`}>
                                  {career.job_type}
                                </Badge>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <div className="p-1 bg-gradient-to-br from-accent/10 to-accent/20 rounded">
                                  <Building2 className="h-3 w-3 text-accent" />
                                </div>
                                <span className="font-medium">{career.department}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="p-1 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded">
                                  <MapPin className="h-3 w-3 text-secondary" />
                                </div>
                                <span className="font-medium">{career.location}</span>
                              </div>
                              {career.application_deadline && (
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-gradient-to-br from-orange-500/10 to-orange-600/20 rounded">
                                    <Calendar className="h-3 w-3 text-orange-600" />
                                  </div>
                                  <span className="font-medium">
                                    Apply by {format(new Date(career.application_deadline), 'PPP')}
                                  </span>
                                </div>
                              )}
                            </div>

                            <p className="text-muted-foreground leading-relaxed line-clamp-2">
                              {career.short_description}
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row items-stretch gap-3 lg:items-center">
                            <Link to={`/careers/${career.slug}`}>
                              <Button 
                                variant="outline" 
                                className="w-full sm:w-auto border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                              >
                                View Details
                              </Button>
                            </Link>
                            <Button 
                              asChild 
                              className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              <a 
                                href={career.apply_link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2"
                              >
                                Apply Now
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover gradient bar */}
                      <div className="h-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Modern Call to Action */}
            <div className="mt-20 text-center">
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden relative">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl"></div>
                
                <CardContent className="p-6 sm:p-8 lg:p-12 relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                    <Building2 className="h-10 w-10 text-white" />
                  </div>
                  
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                    Don't See a Perfect
                    <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Role for You?
                    </span>
                  </h2>
                  
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                    We're always looking for talented individuals to join our team. 
                    Send us your resume and we'll keep you in mind for future opportunities.
                  </p>
                  
                  <Button 
                    asChild 
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-6"
                  >
                    <a href="mailto:careers@movesinternational.com" className="flex items-center gap-3">
                      <Building2 className="h-5 w-5" />
                      Send Your Resume
                    </a>
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

export default Careers;