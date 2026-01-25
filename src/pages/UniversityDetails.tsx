import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Building2,
  MapPin,
  ExternalLink,
  GraduationCap,
  Users,
  Calendar,
  Star,
  Globe,
  Award,
  BookOpen,
  Phone,
  Mail,
  ArrowLeft,
  Share2,
  Heart,
  Eye,
  Clock,
  CheckCircle,
  Bookmark,
  Download,
  Filter,
  Search,
  ChevronRight,
  Info,
  DollarSign,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import LeadEnquiryForm from "@/components/common/LeadEnquiryForm";

const UniversityDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [programFilter, setProgramFilter] = useState("all");
  const [programSearch, setProgramSearch] = useState("");
  const [savedCourseIds, setSavedCourseIds] = useState<Set<string>>(new Set());

  const {
    data: university,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["university", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("universities")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const { data: courses = [] } = useQuery({
    queryKey: ["university-courses", university?.id],
    queryFn: async () => {
      if (!university?.id) return [];

      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("university_id", university.id);

      if (error) throw error;
      return data;
    },
    enabled: !!university?.id,
  });

  // Filter courses based on search and level
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(programSearch.toLowerCase()) ||
      course.study_area.toLowerCase().includes(programSearch.toLowerCase());
    const matchesLevel =
      programFilter === "all" || course.level === programFilter;
    return matchesSearch && matchesLevel;
  });

  // Get unique course levels for filter
  const courseLevels = [...new Set(courses.map((course) => course.level))];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          {/* Hero Skeleton */}
          <div className="relative h-[500px] bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            <div className="container mx-auto px-4 h-full flex items-end pb-16">
              <div className="space-y-4 w-full max-w-2xl">
                <div className="h-8 bg-muted rounded w-1/4"></div>
                <div className="h-12 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="flex gap-4">
                  <div className="h-12 bg-muted rounded w-32"></div>
                  <div className="h-12 bg-muted rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 space-y-6">
                <div className="h-8 bg-muted rounded w-1/3"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                  <div className="h-4 bg-muted rounded w-4/6"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-64 bg-muted rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="bg-muted/20 rounded-full p-12 w-32 h-32 mx-auto flex items-center justify-center">
            <Building2 className="h-16 w-16 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              University Not Found
            </h1>
            <p className="text-muted-foreground text-lg">
              The university you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => navigate("/universities")} size="lg">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse Universities
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/contact")}
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: GraduationCap,
      label: "Programs Offered",
      value: courses.length,
      color: "text-blue-600",
    },
    {
      icon: Users,
      label: "Application Portal",
      value: university?.application_portal_status || "Open",
      color: "text-green-600",
    },
    {
      icon: Globe,
      label: "Global Ranking",
      value: university?.global_ranking || "Top 500",
      color: "text-purple-600",
    },
    {
      icon: Award,
      label: "Accreditation",
      value: university?.accreditation_status || "Verified",
      color: "text-orange-600",
    },
  ];

  function handleSaveToggle(id: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Dynamic Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.02)_1px,transparent_0)] bg-[size:24px_24px]"></div>
        </div>

        <div className="relative">
          {/* Navigation Bar */}
          <div className="container mx-auto max-w-7xl px-4 py-16">
            <div className="flex items-center justify-between">
              {/* Breadcrumb Navigation */}
              <nav className="mb-8 flex items-center text-sm text-gray-300">
                <div className="flex items-center gap-2 text-primary/70 hover:text-primary transition-all duration-300 cursor-pointer group">
                  <div className="p-1.5 bg-primary/10 rounded-lg backdrop-blur-sm border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                    <Home className="h-3 w-3 text-primary" />
                  </div>
                  <span>Home</span>
                </div>
                <ChevronRight className="h-4 w-4 mx-2 text-gray-500" />
                <span className="hover:text-primary/70 transition-colors cursor-pointer text-primary">
                  Universities
                </span>
                <ChevronRight className="h-4 w-4 mx-2 text-gray-500" />
                <span className="text-[#fa8500] font-medium">
                  {university.name}
                </span>
              </nav>
            </div>
          </div>

          {/* Hero Content */}
          <div className="container mx-auto max-w-7xl px-4 pb-16">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* University Information */}
              <div className="lg:col-span-8 space-y-6">
                {/* Badges */}
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-primary/5 text-primary border-primary/20 px-4 py-2 text-sm hover:text-white">
                    <Building2 className="h-4 w-4 mr-2" />
                    {university.institution_type || "University"}
                  </Badge>
                  {university.featured && (
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2">
                      <Star className="h-4 w-4 mr-1" />
                      Featured Institution
                    </Badge>
                  )}
                  <Badge variant="outline" className="px-4 py-2">
                    <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                    Verified
                  </Badge>
                </div>

                {/* University Name & Details */}
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                    {university.name}
                  </h1>

                  {university.location && (
                    <div className="flex flex-wrap items-center gap-6 text-lg text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span>{university.location}</span>
                        {university.country && (
                          <>
                            <span className="mx-2">•</span>
                            <span className="font-medium">
                              {university.country}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-accent hover:bg-orange-500 text-white text-lg px-8 py-6 rounded-lg"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Consultation
                  </Button>

                  {university.website_url && (
                    <Button size="lg" variant="ghost" asChild className="px-6">
                      <a
                        href={university.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-5 w-5 mr-2" />
                        Official Website
                      </a>
                    </Button>
                  )}
                </div>
                {/* Quick Stats Grid */}
                <div className="grid  grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
                  {stats.map((stat, index) => (
                    <Card
                      key={index}
                      className="bg-card/50 backdrop-blur border-border/50 hover:shadow-md transition-all"
                    >
                      <CardContent className="p-4 text-center">
                        <stat.icon
                          className={`h-5 w-5 mx-auto mb-2 ${stat.color}`}
                        />
                        <div className="text-lg font-bold text-foreground">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {stat.label}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* University Logo & Quick Stats moved here */}
              <div className="lg:col-span-4 space-y-6">
                {university.logo_url && (
                  <div className="flex justify-center lg:justify-end">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                      <Card className="relative bg-card/80 backdrop-blur border-0 shadow-2xl">
                        <CardContent className="p-8">
                          <img
                            src={university.logo_url}
                            alt={university.name}
                            className="h-24 w-24 lg:h-32 lg:w-32 object-contain mx-auto"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Content Section */}
      <section className="py-8">
        <div className="container mx-auto max-w-7xl px-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            {/* Enhanced Tab Navigation */}
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-2xl h-14 bg-muted/30 backdrop-blur p-1">
                <TabsTrigger value="overview" className="h-12 font-medium">
                  <Info className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="programs" className="h-12 font-medium">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Programs ({courses.length})
                </TabsTrigger>
                <TabsTrigger value="admissions" className="h-12 font-medium">
                  <Users className="h-4 w-4 mr-2" />
                  Admissions
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                      <CardTitle className="text-2xl">
                        About {university.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                      {university.overview_content ? (
                        <div
                          className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground"
                          dangerouslySetInnerHTML={{
                            __html: university.overview_content,
                          }}
                        />
                      ) : (
                        <div className="text-center py-12">
                          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            Comprehensive Information Coming Soon
                          </h3>
                          <p className="text-muted-foreground">
                            Detailed information about this prestigious
                            institution will be available shortly.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Key Highlights */}
                  {Array.isArray(university.key_highlights) &&
                    university.key_highlights.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" />
                            Key Highlights
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            {university.key_highlights.map(
                              (highlight: any, index: number) => {
                                const colorMap: Record<
                                  string,
                                  { bg: string; text: string; icon: string }
                                > = {
                                  blue: {
                                    bg: "bg-blue-50",
                                    text: "text-blue-600",
                                    icon: "text-blue-600",
                                  },
                                  green: {
                                    bg: "bg-green-50",
                                    text: "text-green-600",
                                    icon: "text-green-600",
                                  },
                                  purple: {
                                    bg: "bg-purple-50",
                                    text: "text-purple-600",
                                    icon: "text-purple-600",
                                  },
                                  orange: {
                                    bg: "bg-orange-50",
                                    text: "text-orange-600",
                                    icon: "text-orange-600",
                                  },
                                  red: {
                                    bg: "bg-red-50",
                                    text: "text-red-600",
                                    icon: "text-red-600",
                                  },
                                  yellow: {
                                    bg: "bg-yellow-50",
                                    text: "text-yellow-600",
                                    icon: "text-yellow-600",
                                  },
                                };
                                const colors =
                                  colorMap[highlight.color] || colorMap.blue;

                                return (
                                  <div
                                    key={index}
                                    className={`flex items-center gap-3 p-3 ${colors.bg} rounded-lg`}
                                  >
                                    <CheckCircle
                                      className={`h-5 w-5 ${colors.icon}`}
                                    />
                                    <div>
                                      <span
                                        className={`text-sm font-medium ${colors.text}`}
                                      >
                                        {highlight.title}
                                      </span>
                                      {highlight.description && (
                                        <p
                                          className={`text-xs ${colors.text} opacity-75 mt-1`}
                                        >
                                          {highlight.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                </div>

                {/* Enhanced Sidebar */}
                <div className="space-y-6">
                  {/* Application Support */}
                  <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Need Guidance?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Get expert help with your application process
                      </p>
                      <Button
                        onClick={() => navigate("/services/consultation")}
                        className="w-full"
                        size="sm"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Free Consultation
                      </Button>
                      <Button
                        onClick={() => navigate("/contact")}
                        variant="outline"
                        className="w-full"
                        size="sm"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Request Callback
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Institute Facts */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Institute Facts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Location</span>
                        <span className="font-medium">
                          {university.location || "N/A"}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Programs</span>
                        <span className="font-medium">
                          {courses.length} available
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Type</span>
                        <span className="font-medium">
                          {university.institution_type || "N/A"}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Established
                        </span>
                        <span className="font-medium">
                          {university.established_year || "N/A"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Rankings & Recognition */}
                  {(university.qs_world_ranking ||
                    university.qs_rating ||
                    university.research_rating) && (
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Award className="h-5 w-5 text-yellow-500" />
                          Rankings & Recognition
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {university.qs_world_ranking && (
                          <div className="p-3 bg-yellow-50 rounded-lg text-center">
                            <div className="text-2xl font-bold text-yellow-600">
                              {university.qs_world_ranking}
                            </div>
                            <div className="text-xs text-yellow-600">
                              QS World Ranking
                            </div>
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-2">
                          {university.qs_rating && (
                            <div className="p-2 bg-blue-50 rounded text-center">
                              <div className="font-bold text-blue-600">
                                {university.qs_rating}
                              </div>
                              <div className="text-xs text-blue-600">
                                QS Rating
                              </div>
                            </div>
                          )}
                          {university.research_rating && (
                            <div className="p-2 bg-green-50 rounded text-center">
                              <div className="font-bold text-green-600">
                                {university.research_rating}
                              </div>
                              <div className="text-xs text-green-600">
                                Research
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="programs" className="space-y-6">
              {/* Program Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search programs..."
                          value={programSearch}
                          onChange={(e) => setProgramSearch(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select
                      value={programFilter}
                      onValueChange={setProgramFilter}
                    >
                      <SelectTrigger className="w-full md:w-48">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="All Levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        {courseLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    Showing {filteredCourses.length} of {courses.length}{" "}
                    programs
                  </div>
                </CardContent>
              </Card>

              {/* Programs Grid */}
              {filteredCourses.length > 0 ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <Card
                      key={course.id}
                      className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-xl"
                    >
                      <CardContent className="p-0">
                        <div className="p-5 space-y-4">
                          {/* Header with title and save button */}
                          <div className="flex items-start justify-between">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-tight">
                              {course.title}
                            </h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`absolute top-2 right-2 z-20 bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg rounded-full h-8 w-8 p-0 border-0 transition-all duration-300 hover:scale-110 ${
                                savedCourseIds.has(course.id)
                                  ? "text-red-500 hover:text-red-600"
                                  : "text-gray-400 hover:text-red-500"
                              }`}
                              onClick={() => handleSaveToggle(course.id)}
                            >
                              <Heart
                                className={`h-3.5 w-3.5 transition-all duration-300 ${
                                  savedCourseIds.has(course.id)
                                    ? "fill-current"
                                    : ""
                                }`}
                              />
                            </Button>
                          </div>

                          {/* Badges with gradient styling */}
                          <div className="flex flex-wrap gap-2">
                            {course.level && (
                              <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white border-0 px-2.5 py-1 text-xs font-semibold rounded-full shadow-sm">
                                {course.level}
                              </Badge>
                            )}
                            {course.study_area && (
                              <Badge className="bg-gradient-to-r from-violet-500 to-purple-500 text-white border-0 px-2.5 py-1 text-xs font-semibold rounded-full shadow-sm">
                                {course.study_area}
                              </Badge>
                            )}
                          </div>

                          {/* Description with subtle hover effect */}
                          {course.description && (
                            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed group-hover:text-gray-700 transition-colors">
                              {course.description}
                            </p>
                          )}

                          {/* Duration and tuition with enhanced styling */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg border border-gray-100">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md flex items-center justify-center">
                                  <Clock className="h-3 w-3 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">
                                  Duration
                                </span>
                              </div>
                              <span className="text-sm font-bold text-gray-900">
                                {Math.floor(course.duration_months / 12)} year
                                {Math.floor(course.duration_months / 12) !== 1
                                  ? "s"
                                  : ""}
                              </span>
                            </div>

                            {course.tuition_fee && (
                              <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-md flex items-center justify-center">
                                    <DollarSign className="h-3 w-3 text-white" />
                                  </div>
                                  <span className="text-sm font-medium text-gray-700">
                                    Tuition
                                  </span>
                                </div>
                                <span className="text-sm font-bold text-primary">
                                  {course.currency}{" "}
                                  {course.tuition_fee?.toLocaleString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action buttons with gradient hover effects */}
                        <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-slate-50 p-4">
                          <div className="flex gap-3">
                            <Link
                              to={`/courses/${course.slug}`}
                              className="flex-1"
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full h-10 font-semibold border-2 border-orange-200 text-orange-600 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300 rounded-xl"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Details
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              className="flex-1 h-10 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-16">
                    <div className="bg-muted/50 rounded-full p-8 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                      <GraduationCap className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      No Programs Found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search or filter criteria.
                    </p>
                    <Button
                      onClick={() => {
                        setProgramSearch("");
                        setProgramFilter("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="admissions" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Admission Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {university?.admission_requirements &&
                      Array.isArray(university.admission_requirements) &&
                      university.admission_requirements.length > 0 ? (
                        (university.admission_requirements as any[]).map(
                          (req: any, index: number) => (
                            <div className="flex items-start gap-3">
                              <CheckCircle className="h-4 w-4 mt-[6pxoo] text-green-600 leading-none shrink-0" />
                              <div>
                                <div className="font-medium">{req.title}</div>
                                <div className="text-sm text-muted-foreground">
                                  {req.description}
                                </div>
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                            <div>
                              <div className="font-medium">
                                Academic Qualifications
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Minimum 65% in relevant field
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                            <div>
                              <div className="font-medium">
                                English Proficiency
                              </div>
                              <div className="text-sm text-muted-foreground">
                                IELTS 6.5 or TOEFL 80
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                            <div>
                              <div className="font-medium">
                                Documents Required
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Transcripts, CV, SOP, LOR
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Application Deadlines</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {university?.application_deadlines &&
                      Array.isArray(university.application_deadlines) &&
                      university.application_deadlines.length > 0 ? (
                        (university.application_deadlines as any[]).map(
                          (deadline: any, index: number) => (
                            <div
                              key={index}
                              className={`p-3 border rounded-lg ${
                                deadline.color || "border-blue-200 bg-blue-50"
                              }`}
                            >
                              <div
                                className={`font-medium ${
                                  deadline.textColor || "text-blue-800"
                                }`}
                              >
                                {deadline.intake}
                              </div>
                              <div
                                className={`text-sm ${
                                  deadline.dateColor || "text-blue-600"
                                }`}
                              >
                                Deadline: {deadline.deadline}
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <>
                          <div className="p-3 border border-orange-200 bg-orange-50 rounded-lg">
                            <div className="font-medium text-orange-800">
                              Fall Intake 2024
                            </div>
                            <div className="text-sm text-orange-600">
                              Deadline: March 15, 2024
                            </div>
                          </div>
                          <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg">
                            <div className="font-medium text-blue-800">
                              Spring Intake 2025
                            </div>
                            <div className="text-sm text-blue-600">
                              Deadline: September 15, 2024
                            </div>
                          </div>
                          <div className="p-3 border border-green-200 bg-green-50 rounded-lg">
                            <div className="font-medium text-green-800">
                              Summer Intake 2025
                            </div>
                            <div className="text-sm text-green-600">
                              Deadline: January 15, 2025
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
                  <p className="text-muted-foreground mb-6">
                    Let our experts guide you through the application process
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button size="lg">Start Your Application</Button>
                    <Button
                      onClick={() => navigate("/services/application-support")}
                      size="lg"
                      variant="outline"
                    >
                      Get Application Help
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Lead Enquiry Form */}
      <LeadEnquiryForm />
    </div>
  );
};

export default UniversityDetails;
