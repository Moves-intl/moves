import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import MediaSelector from "@/components/admin/MediaSelector";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { Plus, X } from "lucide-react";

const UniversityForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState<{
    name: string;
    location: string;
    country: string;
    website_url: string;
    logo_url: string;
    overview_content: string;
    slug: string;
    featured: boolean;
    application_portal_status: string;
    global_ranking: string;
    accreditation_status: string;
    admission_requirements: Array<{ title: string; description: string }>;
    application_deadlines: Array<{ intake: string; deadline: string }>;
    key_highlights: Array<{
      title: string;
      description: string;
      color: string;
    }>;
    qs_world_ranking: string;
    qs_rating: string;
    research_rating: string;
    institution_type: string;
    established_year: string;
  }>({
    name: "",
    location: "",
    country: "",
    website_url: "",
    logo_url: "",
    overview_content: "",
    slug: "",
    featured: false,
    application_portal_status: "Open",
    global_ranking: "Top 500",
    accreditation_status: "Verified",
    admission_requirements: [],
    application_deadlines: [],
    key_highlights: [],
    qs_world_ranking: "",
    qs_rating: "",
    research_rating: "",
    institution_type: "",
    established_year: "",
  });

  const [loading, setLoading] = useState(false);

  const { data: university } = useQuery({
    queryKey: ["university", id],
    queryFn: async () => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("universities")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: isEditing,
  });

  const { data: destinations = [] } = useQuery({
    queryKey: ["destinations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("id, name")
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (university) {
      setFormData({
        name: university.name || "",
        location: university.location || "",
        country: university.country || "",
        website_url: university.website_url || "",
        logo_url: university.logo_url || "",
        overview_content: university.overview_content || "",
        slug: university.slug || "",
        featured: university.featured || false,
        application_portal_status:
          university.application_portal_status || "Open",
        global_ranking: university.global_ranking || "Top 500",
        accreditation_status: university.accreditation_status || "Verified",
        admission_requirements: Array.isArray(university.admission_requirements)
          ? (university.admission_requirements as Array<{
              title: string;
              description: string;
            }>)
          : [],
        application_deadlines: Array.isArray(university.application_deadlines)
          ? (university.application_deadlines as Array<{
              intake: string;
              deadline: string;
            }>)
          : [],
        key_highlights: Array.isArray(university.key_highlights)
          ? (university.key_highlights as Array<{
              title: string;
              description: string;
              color: string;
            }>)
          : [],
        qs_world_ranking: university.qs_world_ranking || "",
        qs_rating: university.qs_rating || "",
        research_rating: university.research_rating || "",
        institution_type: university.institution_type || "",
        established_year: university.established_year || "",
      });
    }
  }, [university]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare form data, excluding slug if empty (let trigger handle it)
      const submitData = { ...formData };
      if (!submitData.slug || submitData.slug.trim() === "") {
        delete submitData.slug;
      }

      if (isEditing) {
        const { error } = await supabase
          .from("universities")
          .update(submitData)
          .eq("id", id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "University updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("universities")
          .insert([submitData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "University created successfully",
        });
      }

      navigate("/admin/universities");
    } catch (error) {
      console.error("University form error:", error);
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} university`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeaturedChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, featured: checked }));
  };

  const handleLogoChange = (value: string) => {
    setFormData((prev) => ({ ...prev, logo_url: value }));
  };

  const handleOverviewChange = (value: string) => {
    setFormData((prev) => ({ ...prev, overview_content: value }));
  };

  const handleCountryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, country: value }));
  };

  const handleApplicationPortalStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, application_portal_status: value }));
  };

  const handleGlobalRankingChange = (value: string) => {
    setFormData((prev) => ({ ...prev, global_ranking: value }));
  };

  const handleAccreditationStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, accreditation_status: value }));
  };

  const addAdmissionRequirement = () => {
    setFormData((prev) => ({
      ...prev,
      admission_requirements: [
        ...prev.admission_requirements,
        { title: "", description: "" },
      ],
    }));
  };

  const updateAdmissionRequirement = (
    index: number,
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      admission_requirements: prev.admission_requirements.map((req, i) =>
        i === index ? { ...req, [field]: value } : req
      ),
    }));
  };

  const removeAdmissionRequirement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      admission_requirements: prev.admission_requirements.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const addApplicationDeadline = () => {
    setFormData((prev) => ({
      ...prev,
      application_deadlines: [
        ...prev.application_deadlines,
        { intake: "", deadline: "" },
      ],
    }));
  };

  const updateApplicationDeadline = (
    index: number,
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      application_deadlines: prev.application_deadlines.map((deadline, i) =>
        i === index ? { ...deadline, [field]: value } : deadline
      ),
    }));
  };

  const removeApplicationDeadline = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      application_deadlines: prev.application_deadlines.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // Key Highlights handlers
  const addKeyHighlight = () => {
    setFormData((prev) => ({
      ...prev,
      key_highlights: [
        ...prev.key_highlights,
        { title: "", description: "", color: "blue" },
      ],
    }));
  };

  const updateKeyHighlight = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      key_highlights: prev.key_highlights.map((highlight, i) =>
        i === index ? { ...highlight, [field]: value } : highlight
      ),
    }));
  };

  const removeKeyHighlight = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      key_highlights: prev.key_highlights.filter((_, i) => i !== index),
    }));
  };

  // Additional field handlers
  const handleInstitutionTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, institution_type: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">
        {isEditing ? "Edit University" : "Add New University"}
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>University Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">University Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Sydney, Australia"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="country">Country</Label>
              <Select
                value={formData.country}
                onValueChange={handleCountryChange}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50 max-h-60 overflow-y-auto">
                  {destinations.map((destination) => (
                    <SelectItem key={destination.id} value={destination.name}>
                      {destination.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="website_url">Website URL</Label>
              <Input
                id="website_url"
                name="website_url"
                type="url"
                value={formData.website_url}
                onChange={handleChange}
                placeholder="https://university.edu"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="university-name (auto-generated if left empty)"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to auto-generate from university name
              </p>
            </div>

            <MediaSelector
              value={formData.logo_url}
              onChange={handleLogoChange}
              label="University Logo"
              placeholder="https://example.com/logo.png"
            />

            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={handleFeaturedChange}
              />
              <Label htmlFor="featured">Featured University</Label>
              <p className="text-sm text-muted-foreground">
                Featured universities will appear on the home page carousel
              </p>
            </div>

            <RichTextEditor
              label="University Overview"
              value={formData.overview_content}
              onChange={handleOverviewChange}
              placeholder="Enter university overview and description..."
              height="300px"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="mt-5">
                <Label htmlFor="application_portal_status">
                  Application Portal Status
                </Label>
                <Select
                  value={formData.application_portal_status}
                  onValueChange={handleApplicationPortalStatusChange}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-5">
                <Label htmlFor="global_ranking">Global Ranking</Label>
                <Select
                  value={formData.global_ranking}
                  onValueChange={handleGlobalRankingChange}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select ranking" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Top 100">Top 100</SelectItem>
                    <SelectItem value="Top 200">Top 200</SelectItem>
                    <SelectItem value="Top 300">Top 300</SelectItem>
                    <SelectItem value="Top 500">Top 500</SelectItem>
                    <SelectItem value="Top 1000">Top 1000</SelectItem>
                    <SelectItem value="Unranked">Unranked</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-5">
                <Label htmlFor="accreditation_status">
                  Accreditation Status
                </Label>
                <Select
                  value={formData.accreditation_status}
                  onValueChange={handleAccreditationStatusChange}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Verified">Verified</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Not Verified">Not Verified</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>Admission Requirements</Label>
                <Button
                  type="button"
                  onClick={addAdmissionRequirement}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Requirement
                </Button>
              </div>
              <div className="space-y-3">
                {formData.admission_requirements.map((req, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="flex-1">
                      <Input
                        placeholder="Requirement title"
                        value={req.title}
                        onChange={(e) =>
                          updateAdmissionRequirement(
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        className="mb-2"
                      />
                      <Textarea
                        placeholder="Requirement description"
                        value={req.description}
                        onChange={(e) =>
                          updateAdmissionRequirement(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows={2}
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={() => removeAdmissionRequirement(index)}
                      size="sm"
                      variant="outline"
                      className="mt-1"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>Application Deadlines</Label>
                <Button
                  type="button"
                  onClick={addApplicationDeadline}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Deadline
                </Button>
              </div>
              <div className="space-y-3">
                {formData.application_deadlines.map((deadline, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      placeholder="Intake (e.g., Spring 2024)"
                      value={deadline.intake}
                      onChange={(e) =>
                        updateApplicationDeadline(
                          index,
                          "intake",
                          e.target.value
                        )
                      }
                      className="flex-1"
                    />
                    <Input
                      placeholder="Deadline (e.g., December 15, 2023)"
                      value={deadline.deadline}
                      onChange={(e) =>
                        updateApplicationDeadline(
                          index,
                          "deadline",
                          e.target.value
                        )
                      }
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={() => removeApplicationDeadline(index)}
                      size="sm"
                      variant="outline"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>Key Highlights</Label>
                <Button
                  type="button"
                  onClick={addKeyHighlight}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Highlight
                </Button>
              </div>
              <div className="space-y-3">
                {formData.key_highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="flex-1">
                      <Input
                        placeholder="Highlight title"
                        value={highlight.title}
                        onChange={(e) =>
                          updateKeyHighlight(index, "title", e.target.value)
                        }
                        className="mb-2"
                      />
                      <Textarea
                        placeholder="Optional description"
                        value={highlight.description}
                        onChange={(e) =>
                          updateKeyHighlight(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows={2}
                        className="mb-2"
                      />
                      <Select
                        value={highlight.color}
                        onValueChange={(value) =>
                          updateKeyHighlight(index, "color", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select color" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blue">Blue</SelectItem>
                          <SelectItem value="green">Green</SelectItem>
                          <SelectItem value="purple">Purple</SelectItem>
                          <SelectItem value="orange">Orange</SelectItem>
                          <SelectItem value="red">Red</SelectItem>
                          <SelectItem value="yellow">Yellow</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      type="button"
                      onClick={() => removeKeyHighlight(index)}
                      size="sm"
                      variant="outline"
                      className="mt-1"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="qs_world_ranking">QS World Ranking</Label>
                <Input
                  id="qs_world_ranking"
                  name="qs_world_ranking"
                  value={formData.qs_world_ranking}
                  onChange={handleChange}
                  placeholder="e.g., #247"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="qs_rating">QS Rating</Label>
                <Input
                  id="qs_rating"
                  name="qs_rating"
                  value={formData.qs_rating}
                  onChange={handleChange}
                  placeholder="e.g., 5★"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="research_rating">Research Rating</Label>
                <Input
                  id="research_rating"
                  name="research_rating"
                  value={formData.research_rating}
                  onChange={handleChange}
                  placeholder="e.g., A+"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="institution_type">Institution Type</Label>
                <Select
                  value={formData.institution_type}
                  onValueChange={handleInstitutionTypeChange}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select institution type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Public University">
                      Public University
                    </SelectItem>
                    <SelectItem value="Private University">
                      Private University
                    </SelectItem>
                    <SelectItem value="Public Research University">
                      Public Research University
                    </SelectItem>
                    <SelectItem value="Private Research University">
                      Private Research University
                    </SelectItem>
                    <SelectItem value="Community College">
                      Community College
                    </SelectItem>
                    <SelectItem value="Technical Institute">
                      Technical Institute
                    </SelectItem>
                    <SelectItem value="Liberal Arts College">
                      Liberal Arts College
                    </SelectItem>
                    <SelectItem value="Professional School">
                      Professional School
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="established_year">Established Year</Label>
                <Input
                  id="established_year"
                  name="established_year"
                  value={formData.established_year}
                  onChange={handleChange}
                  placeholder="e.g., 1887"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading}>
                {loading
                  ? "Saving..."
                  : isEditing
                  ? "Update University"
                  : "Create University"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/universities")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UniversityForm;
