import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useSecurityValidation } from "@/hooks/useSecurityValidation";

interface FormData {
  student_name: string;
  student_email: string;
  student_phone: string;
  preferred_destination: string;
  study_level: string;
  course_interest: string;
  current_education_level: string;
  english_test_score: string;
  work_experience: string;
  preferred_date: string;
  preferred_time: string;
  message: string;
  agrees_to_terms?: boolean;
  agrees_to_contact?: boolean;
  agrees_to_marketing?: boolean;
}

export const useCounsellingBookingForm = (
  defaultDestination?: string,
  onSuccess?: () => void
) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { validateForm, checkFormRateLimit } = useSecurityValidation();

  const [formData, setFormData] = useState<FormData>({
    student_name: "",
    student_email: user?.email || "",
    student_phone: "",
    preferred_destination: defaultDestination || "",
    study_level: "",
    course_interest: "",
    current_education_level: "",
    english_test_score: "",
    work_experience: "",
    preferred_date: "",
    preferred_time: "",
    message: "",
    agrees_to_terms: false,
    agrees_to_contact: false,
    agrees_to_marketing: false,
  });

  // Fetch destinations
  const { data: destinations } = useQuery({
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

  // Fetch study levels
  const { data: studyLevels } = useQuery({
    queryKey: ["study-levels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course_study_levels")
        .select("id, name")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const rateLimitOk = await checkFormRateLimit("counselling_booking");
    if (!rateLimitOk) {
      toast({
        title: "Rate Limit Exceeded",
        description: "Too many submissions. Please wait before trying again.",
        variant: "destructive",
      });
      return;
    }

    // Comprehensive validation
    const validationRules = {
      student_name: {
        required: true,
        minLength: 2,
        maxLength: 100,
        type: "text" as const,
      },
      student_email: { required: true, type: "email" as const },
      student_phone: { required: true, type: "phone" as const },
      preferred_destination: { maxLength: 100, type: "text" as const },
      study_level: { maxLength: 50, type: "text" as const },
      preferred_time: { maxLength: 50, type: "text" as const },
      course_interest: { maxLength: 200, type: "text" as const },
      current_education_level: { maxLength: 100, type: "text" as const },
      english_test_score: { maxLength: 50, type: "text" as const },
      work_experience: { maxLength: 500, type: "text" as const },
      message: { maxLength: 1000, type: "text" as const },
    };

    // Convert FormData to Record<string, string> for validation
    const formDataForValidation: Record<string, string> = {
      student_name: String(formData.student_name),
      student_email: String(formData.student_email),
      student_phone: String(formData.student_phone),
      preferred_destination: String(formData.preferred_destination),
      study_level: String(formData.study_level),
      preferred_time: String(formData.preferred_time),
      course_interest: String(formData.course_interest),
      current_education_level: String(formData.current_education_level),
      english_test_score: String(formData.english_test_score),
      work_experience: String(formData.work_experience),
      message: String(formData.message),
    };

    const validation = validateForm(formDataForValidation, validationRules);
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      toast({
        title: "Validation Error",
        description: firstError,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Prepare data for counselling_bookings table with sanitized values
      const bookingData = {
        student_name: validation.sanitizedData.student_name,
        student_email: validation.sanitizedData.student_email,
        student_phone: validation.sanitizedData.student_phone,
        preferred_destination: validation.sanitizedData.preferred_destination,
        study_level: validation.sanitizedData.study_level,
        preferred_time: validation.sanitizedData.preferred_time,
        course_interest: validation.sanitizedData.course_interest,
        current_education_level:
          validation.sanitizedData.current_education_level,
        english_test_score: validation.sanitizedData.english_test_score,
        work_experience: validation.sanitizedData.work_experience,
        message: validation.sanitizedData.message,
        preferred_date: formData.preferred_date || null,
        status: "pending",
      };

      const { error } = await supabase
        .from("counselling_bookings")
        .insert([bookingData]);

      if (error) throw error;

      toast({
        title: "Success!",
        description:
          "Your counselling request has been submitted successfully. We'll contact you within 24 hours.",
      });

      setFormData({
        student_name: "",
        student_email: user?.email || "",
        student_phone: "",
        preferred_destination: defaultDestination || "",
        study_level: "",
        course_interest: "",
        current_education_level: "",
        english_test_score: "",
        work_experience: "",
        preferred_date: "",
        preferred_time: "",
        message: "",
        agrees_to_terms: false,
        agrees_to_contact: false,
        agrees_to_marketing: false,
      });

      onSuccess?.();
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    destinations,
    studyLevels,
    handleInputChange,
    handleSubmit,
  };
};
