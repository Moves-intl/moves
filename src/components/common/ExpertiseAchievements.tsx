import { ArrowRight, ChevronRight, Flag, PlayCircle } from "lucide-react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ExpertiseAchievements = () => {
  // Fetch expertise content from database
  const { data: statsData } = useQuery({
    queryKey: ["company-stats"],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", [
          "company_established",
          "satisfied_clients",
          "university_partners",
        ]);

      return (
        data?.reduce((acc, setting) => {
          acc[setting.key] = setting.value;
          return acc;
        }, {} as Record<string, any>) || {}
      );
    },
  });

  return (
    <section className="py-16 bg-[#f7f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Text Content */}
          <div className="flex flex-col gap-[22px] border border-dashed py-5 px-4 sm:py-6 sm:px-6 lg:py-[35.5px] lg:px-[50px] rounded-lg from_texteditor_wrapper">
            <div className="flex items-start gap-3">
              <Flag className="w-6 h-6 text-green-500" />
              <span className="text-xl font-semibold text-primary">
                Expertise
              </span>
            </div>

            <h2 className="text-2xl lg:text-4xl font-bold text-primary leading-tight">
              Your Bridge to Success in Australia: <br />
              <span className="text-orange-500">
                Education, Immigration, Careers
              </span>
            </h2>

            <div className="">
              <ul className="space-y-6">
                <li className="text-base leading-relaxed">
                  <div className="flex gap-2 items-start">
                    <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0 mr-1" />
                    <div>
                      <span className="font-semibold text-gray-900">
                        Tailored Education Counselling:{" "}
                      </span>
                      <span className="text-gray-600">
                        We work closely with you to understand your individual
                        needs, goals, and academic background. Our expert
                        counselors provide unbiased advice and match you with
                        the perfect study program at one of our 100+ partner
                        universities.
                      </span>
                    </div>
                  </div>
                </li>

                <li className="text-base leading-relaxed">
                  <div className="flex gap-2 items-start">
                    <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0 mr-1" />
                    <div>
                      <span className="font-semibold text-gray-900">
                        Expert Immigration Services:{" "}
                      </span>
                      <span className="text-gray-600">
                        Navigating the complexities of Australian immigration
                        can be daunting. Our licensed migration agents are here
                        to walk you through the process, ensuring a smooth and
                        efficient visa application experience.
                      </span>
                    </div>
                  </div>
                </li>

                <li className="text-base leading-relaxed">
                  <div className="flex gap-2 items-start">
                    <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0 mr-1" />
                    <div>
                      <span className="font-semibold text-gray-900">
                        Career Advancement Opportunities:{" "}
                      </span>
                      <span className="text-gray-600">
                        We go beyond education, connecting you with top
                        employers and helping you build a successful career in
                        Australia.
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Video and Stats */}
          <div className="flex flex-col h-full space-y-8">
            {/* Video Placeholder */}
            <div className="relative aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://movesinternational.com.au/_next/image?url=%2Fmisc%2Fabout-agency.jpg&w=1080&q=75"
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              {/* Established In */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <img
                    src="https://movesinternational.com.au/_next/image?url=%2Fhome%2Fachievement.png&w=64&q=75"
                    alt="Study International Logo"
                    className="w-8 h-8 mb-3 object-contain"
                  />
                  <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-primary">
                    {statsData?.company_established || "2011"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Established In</p>
                </div>
              </div>

              {/* Satisfied Clients */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <img
                    src="https://movesinternational.com.au/_next/image?url=%2Fhome%2Frate.png&w=64&q=75"
                    alt="Study International Logo"
                    className="w-8 h-8 mb-3 object-contain"
                  />
                  <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-primary">
                    {statsData?.satisfied_clients || "5k+"}+
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Satisfied Clients
                  </p>
                </div>
              </div>

              {/* University Partners */}
              <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <img
                    src="https://movesinternational.com.au/_next/image?url=%2Fhome%2Fbussiness-man.png&w=64&q=75"
                    alt="Study International Logo"
                    className="w-8 h-8 mb-3 object-contain"
                  />
                  <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-primary">
                    {statsData?.university_partners || "50+"}+
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    University Partners
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseAchievements;

export const ExpertiseAchievements2 = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Full Image */}
          <div className="relativ top-16 mt-8 rounded-2xl overflow-hidden  shadow-lg">
            <img
              src="https://movesinternational.com.au/_next/image?url=%2Fservice%2Frpl-recognition.png&w=1080&q=75"
              alt="Student success in Australia"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right Column - Text Content */}
          <div className="flex flex-col gap-[22px] self-start py-5 px-4 sm:py-6 sm:px-6 lg:py-[35.5px] lg:px-[50px]">
            <div className="flex items-center gap-3">
              <Flag className="w-6 h-6 text-green-400" />
              <span className="text-xl font-semibold text-primary">
                Our Commitment
              </span>
            </div>

            <h2 className="text-2xl lg:text-4xl font-bold text-primary leading-tight">
              Paving Your Pathway to Success: <br />
              <span className="text-orange-500">
                100% Growth, Student-Centric Support, and Unwavering Integrity
              </span>
            </h2>

            <ul className="space-y-6">
              <li className="text-base leading-relaxed">
                <div className="flex gap-2 items-start">
                  <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0 mr-1" />
                  <div>
                    <span className="font-semibold text-gray-900">
                      Proven Track Record:{" "}
                    </span>
                    <span className="text-gray-600">
                      We have a proud history of helping countless international
                      students achieve their dreams in Australia. Our 100%
                      growth rate in the past two years speaks volumes about our
                      dedication and success.
                    </span>
                  </div>
                </div>
              </li>

              <li className="text-base leading-relaxed">
                <div className="flex gap-2 items-start">
                  <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0 mr-1" />
                  <div>
                    <span className="font-semibold text-gray-900">
                      Student-Centric Approach:{" "}
                    </span>
                    <span className="text-gray-600">
                      We believe in personalized service and prioritize your
                      individual needs above all else. We are committed to
                      providing unique solutions and exceeding your
                      expectations.
                    </span>
                  </div>
                </div>
              </li>

              <li className="text-base leading-relaxed">
                <div className="flex gap-2 items-start">
                  <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0 mr-1" />
                  <div>
                    <span className="font-semibold text-gray-900">
                      Professional Integrity:{" "}
                    </span>
                    <span className="text-gray-600">
                      We maintain the highest ethical standards and foster
                      strong partnerships with educational institutions,
                      ensuring accurate information and exceptional service.
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
