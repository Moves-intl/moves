import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Award, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCounsellingBookingForm } from "@/hooks/useCounsellingBookingForm";
import { PersonalInfoSection } from "@/components/forms/counselling/PersonalInfoSection";
import { StudyPreferencesSection } from "@/components/forms/counselling/StudyPreferencesSection";
import { SchedulingSection } from "@/components/forms/counselling/SchedulingSection";
import { supabase } from "@/integrations/supabase/client";

const LeadEnquiryForm = () => {
  const {
    formData,
    loading,
    destinations,
    studyLevels,
    handleInputChange,
    handleSubmit,
  } = useCounsellingBookingForm();

  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("id, title, icon_url,slug")
          .limit(5);

        if (error) {
          console.error("Error fetching services:", error);
        } else {
          setServices(data || []);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className=" py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid lg:grid-cols-2 gap-12 relative">
        {/* Left Column */}
        <div className="space-y-6 lg:sticky lg:top-[-35px] lg:self-start">
          {/* Header Text */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">
              Moves International can help you
            </h2>
            <p className="text-gray-600 mt-2" id="lead_form">
              Enter your details and one of our expert counsellors will reach
              out to you so we can connect you to the right course, country,
              university — and even scholarships!
            </p>
          </div>

          {/* Form */}
          <div
            className="bg-white rounded-2xl border  border-dashed border-gray-400 p-6
"
          >
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-3">
              <PersonalInfoSection
                formData={formData}
                onInputChange={handleInputChange}
              />

              <StudyPreferencesSection
                formData={formData}
                destinations={destinations}
                studyLevels={studyLevels}
                onInputChange={handleInputChange}
              />

              <SchedulingSection
                formData={formData}
                onInputChange={handleInputChange}
              />

              {/* Checkboxes */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agrees_to_terms"
                    checked={formData.agrees_to_terms}
                    onCheckedChange={(checked) =>
                      handleInputChange("agrees_to_terms", checked as boolean)
                    }
                    className="mt-1"
                  />
                  <label
                    htmlFor="agrees_to_terms"
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    I agree to Moves International Terms and{" "}
                    <Link
                      to="/privacy-policy"
                      className="text-primary hover:underline"
                    >
                      privacy policy
                    </Link>
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agrees_to_contact"
                    checked={formData.agrees_to_contact}
                    onCheckedChange={(checked) =>
                      handleInputChange("agrees_to_contact", checked as boolean)
                    }
                    className="mt-1"
                  />
                  <label
                    htmlFor="agrees_to_contact"
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    Please contact me by phone, email or SMS to assist with my
                    enquiry
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agrees_to_marketing"
                    checked={formData.agrees_to_marketing}
                    onCheckedChange={(checked) =>
                      handleInputChange(
                        "agrees_to_marketing",
                        checked as boolean
                      )
                    }
                    className="mt-1"
                  />
                  <label
                    htmlFor="agrees_to_marketing"
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    Please accept to receive updates and offers from Moves
                    International
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-10 text-base bg-primary hover:bg-primary/90 text-white rounded-full font-semibold"
              >
                {loading ? "Submitting..." : "Get Free Counselling"}
              </Button>
            </form>
          </div>

          {/* Trust Elements */}
          <div className="flex flex-wrap gap-6 justify-center pt-4 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>10,000+ Students Placed</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-accent" />
              <span>99% Success Rate</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col space-y-6">
          {isLoading
            ? // Loading skeleton
              [...Array(5)].map((_, idx) => (
                <div
                  key={idx}
                  className="shadow-[0_1.5px_3px_rgba(0,0,0,0.1)] rounded-md overflow-hidden animate-pulse"
                >
                  <div className="w-full h-48 bg-gray-300 rounded-t-xl"></div>
                  <div className="flex items-center justify-between p-5 bg-white">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <ChevronRight className="text-gray-300 " />
                  </div>
                </div>
              ))
            : // Actual services data
              services.map((service) => (
                <div
                  key={service.id}
                  className="shadow-[0_1.5px_3px_rgba(0,0,0,0.1)] rounded-md overflow-hidden"
                >
                  <a href={`/services/${service.slug}`}>
                    <img
                      src={service.icon_url}
                      alt={service.title}
                      className="rounded-t-xl shadow-xl w-full object-cover"
                    />
                    <div className="flex items-center font-bold justify-between p-5 bg-white">
                      <p>{service.title}</p>
                      <a
                        href={`/services/${service.slug}`}
                        className="hover:cursor-pointer"
                      >
                        <ChevronRight />
                      </a>
                    </div>
                  </a>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default LeadEnquiryForm;
