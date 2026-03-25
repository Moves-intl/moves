import React from "react";
import { useCountingAnimation } from "@/hooks/useCountingAnimation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Users, GraduationCap, Globe, Calendar, Flag } from "lucide-react";

const StoryWithStatsSection = () => {
  // Fetch stats from database
  const { data: statsData } = useQuery({
    queryKey: ["company-stats"],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", [
          "students_placed",
          "partner_universities",
          "countries_served",
          "years_experience",
        ]);

      return (
        data?.reduce((acc, setting) => {
          acc[setting.key] = setting.value;
          return acc;
        }, {} as Record<string, any>) || {}
      );
    },
  });

  // Get values from database or use defaults
  const studentsPlaced = parseInt(statsData?.students_placed || "10000");
  const partnerUniversities = parseInt(
    statsData?.partner_universities || "500"
  );
  const countriesServed = parseInt(statsData?.countries_served || "15");
  const yearsExperience = parseInt(statsData?.years_experience || "15");

  const { count: studentsCount, ref: studentsRef } = useCountingAnimation({
    end: studentsPlaced,
    duration: 2000,
  });
  const { count: universitiesCount, ref: universitiesRef } =
    useCountingAnimation({ end: partnerUniversities, duration: 2000 });
  const { count: countriesCount, ref: countriesRef } = useCountingAnimation({
    end: countriesServed,
    duration: 2000,
  });
  const { count: experienceCount, ref: experienceRef } = useCountingAnimation({
    end: yearsExperience,
    duration: 2000,
  });

  const stats = [
    {
      number: `${studentsCount.toLocaleString()}+`,
      label: "Students Placed",
      icon: Users,
      ref: studentsRef,
    },
    {
      number: `${universitiesCount}+`,
      label: "Partner Universities",
      icon: GraduationCap,
      ref: universitiesRef,
    },
    {
      number: `${countriesCount}+`,
      label: "Countries",
      icon: Globe,
      ref: countriesRef,
    },
    {
      number: `${experienceCount}+`,
      label: "Years of Excellence",
      icon: Calendar,
      ref: experienceRef,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[60%_40%] gap-12 items-start">
          {/* Left Column - Our Story */}
          <div className="sticky top-24 self-start flex flex-col gap-6 border border-dashed px-4 py-6 sm:px-8 sm:py-10 rounded-lg bg-gray-50">
            <div className="flex items-center gap-3">
              <Flag className="w-6 h-6 text-green-500" />
              <span className="text-xl font-semibold text-primary">
                Our Story
              </span>
            </div>

            <div className="space-y-4 text-gray-600 text-base leading-relaxed">
              <p>
                {statsData?.company_story_paragraph_1 ||
                  "Moves International Education and Migration Consulting provides trustworthy education and migration consulting services to students and professionals in Nepal to help them reach their international ambitions. Our team of educated, enthusiastic, and professional counselors and licensed consultants works together to assist individuals in realizing their aspirations to study and migrate to top countries in the world, i.e., the United States of America (USA), Canada, the  United Kingdom (UK), and Australia."}
              </p>
              <p>
                {statsData?.company_story_paragraph_2 ||
                  `The objective of Moves International is to consider that when an individual decides to go abroad for education, it is not merely to get a degree but to shape a global future. At Moves International, we offer one-on-one counseling, transparent application procedures, and complete support throughout the entire process, including selecting the right University, preparing the required documents, assisting with Visa applications, and providing support after arrival.

`}
              </p>
            </div>
          </div>

          {/* Right Column - Stats Cards */}
          <div className="grid grid-cols-1 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center"
              >
                <stat.icon className="h-8 w-8 text-orange-500 mb-3" />
                <div
                  className="text-3xl font-bold text-orange-500 mb-1"
                  ref={stat.ref}
                >
                  {stat.number}
                </div>
                <p className="text-sm text-primary font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryWithStatsSection;
