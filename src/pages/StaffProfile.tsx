import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const StaffProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: staffMember,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["staff-member", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staff_members")
        .select("*")
        .eq("id", id)
        .eq("is_active", true)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading staff profile...</p>
        </div>
      </div>
    );
  }

  if (error || !staffMember) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">
            Staff Member Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The staff member you're looking for doesn't exist or has been
            removed.
          </p>
          <Button onClick={() => navigate("/about")} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to About
          </Button>
        </div>
      </div>
    );
  }

  const socialLinks = staffMember.social_media_links || {};
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "linkedin":
        return Linkedin;
      case "twitter":
        return Twitter;
      case "facebook":
        return Facebook;
      case "instagram":
        return Instagram;
      default:
        return Globe;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="text-accent hover:text-white"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/70">
                •
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/about"
                  className="text-accent hover:text-white"
                >
                  About
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/70">
                •
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  {staffMember.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Button
            onClick={() => navigate("/about")}
            className="mb-6 bg-transparent text-white border-white/20  hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to About
          </Button>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <img
                src={staffMember.profile_image_url || "/default-profile.png"}
                alt={`${staffMember.name}'s profile picture`}
                className="w-48 h-48 rounded-full object-cover border-4 border-white/20"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">{staffMember.name}</h1>
              <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
                {staffMember.designation}
              </Badge>

              {staffMember.description && (
                <p className="text-lg text-white/90 leading-relaxed mb-6">
                  {staffMember.description}
                </p>
              )}

              <div className="flex flex-wrap gap-4">
                {staffMember.email && (
                  <a
                    href={`mailto:${staffMember.email}`}
                    className="flex items-center gap-2 text-accent hover:text-white transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                    {staffMember.email}
                  </a>
                )}

                {staffMember.phone && (
                  <a
                    href={`tel:${staffMember.phone}`}
                    className="flex items-center gap-2 text-accent hover:text-white transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    {staffMember.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  About {staffMember.name}
                </h2>
                {staffMember.description ? (
                  <div className="prose max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      {staffMember.description}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    {staffMember.name} is a valued member of our team with
                    expertise in {staffMember.designation.toLowerCase()}.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  {staffMember.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-accent" />
                      <a
                        href={`mailto:${staffMember.email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {staffMember.email}
                      </a>
                    </div>
                  )}

                  {staffMember.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-accent" />
                      <a
                        href={`tel:${staffMember.phone}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {staffMember.phone}
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            {Object.keys(socialLinks).length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4">
                    Connect
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(socialLinks).map(([platform, url]) => {
                      const Icon = getSocialIcon(platform);
                      return (
                        <div key={platform} className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-accent" />
                          <a
                            href={url as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors capitalize"
                          >
                            {platform}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Role Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">
                  Role
                </h3>
                <Badge variant="outline" className="text-sm">
                  {staffMember.designation}
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProfile;
