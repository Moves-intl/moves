import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCounsellingBookingForm } from "@/hooks/useCounsellingBookingForm";
import { PersonalInfoSection } from "./counselling/PersonalInfoSection";
import { StudyPreferencesSection } from "./counselling/StudyPreferencesSection";
import { SchedulingSection } from "./counselling/SchedulingSection";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

interface CounsellingBookingFormProps {
  defaultDestination?: string;
  onSuccess?: () => void;
}

// const RECAPTCHA_SITE_KEY = '6LfUk6UrAAAAAIoWzkz54uHyaR0cXY0H2DCQb7Nn';

const CounsellingBookingForm = ({
  defaultDestination,
  onSuccess,
}: CounsellingBookingFormProps) => {
  const { toast } = useToast();
  // const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const {
    formData,
    loading,
    destinations,
    studyLevels,
    handleInputChange,
    handleSubmit: submitBooking,
  } = useCounsellingBookingForm(defaultDestination, onSuccess);

  // Load reCAPTCHA script
  // useEffect(() => {
  //   if (window.grecaptcha) {
  //     setRecaptchaLoaded(true);
  //     return;
  //   }

  //   const script = document.createElement('script');
  //   script.src = `https://www.recaptcha.net/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
  //   script.async = true;
  //   script.defer = true;
  //   script.onload = () => {
  //     if (window.grecaptcha) {
  //       setRecaptchaLoaded(true);
  //     } else {
  //       toast({
  //         title: 'Security Error',
  //         description: 'Could not load security verification',
  //         variant: 'destructive',
  //       });
  //     }
  //   };
  //   script.onerror = () => {
  //     toast({
  //       title: 'Security Error',
  //       description: 'Failed to load security verification',
  //       variant: 'destructive',
  //     });
  //   };
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, [toast]);

  // const getRecaptchaToken = async (): Promise<string> => {
  //   if (!window.grecaptcha) {
  //     throw new Error('reCAPTCHA not loaded');
  //   }
  //   return await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'counselling_booking' });
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (!recaptchaLoaded) {
    //   toast({
    //     title: 'Security Check',
    //     description: 'Please wait while security verification loads',
    //     variant: 'destructive',
    //   });
    //   return;
    // }

    try {
      // const token = await getRecaptchaToken();
      await submitBooking(e); // Pass token directly to hook
    } catch (error) {
      console.error("reCAPTCHA error:", error);
      toast({
        title: "Verification Failed",
        description: "Please complete the security check",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm ring-1 ring-gray-200/50 hover:shadow-3xl transition-all duration-300 ease-out hover:ring-gray-300/50">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <PersonalInfoSection
            formData={formData}
            onInputChange={handleInputChange}
          />
          <StudyPreferencesSection
            formData={formData}
            onInputChange={handleInputChange}
            destinations={destinations}
            studyLevels={studyLevels}
          />
          <SchedulingSection
            formData={formData}
            onInputChange={handleInputChange}
          />

          <Button
            type="submit"
            // disabled={loading || !recaptchaLoaded}
            disabled={loading}
            className="w-full h-12 text-lg bg-accent hover:bg-accent/90"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Submitting...
              </span>
            ) : (
              "Book Free Counselling"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CounsellingBookingForm;
