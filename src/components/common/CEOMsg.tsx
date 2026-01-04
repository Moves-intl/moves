import { Mail, Phone } from "lucide-react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const CEOMsg = () => {
  // Fetch CEO information from database
  const { data: ceoData } = useQuery({
    queryKey: ["ceo-info"],
    queryFn: async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", [
          "ceo_name",
          "ceo_position",
          "ceo_phone",
          "ceo_email",
          "ceo_message",
          "ceo_image_url",
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
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Column - Image */}
          <div className="relative w-full max-w-xl mx-auto">
            <div className="relative aspect-[3/4] sm:aspect-[4/3] lg:aspect-[3/2]">
              <img
                src={
                  ceoData?.ceo_image_url ||
                  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=700&fit=crop"
                }
                alt="CEO of Moves International"
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />

              {/* Contact Badge */}
              <div className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6 bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(2,48,71,0.12)] p-4 sm:p-6 max-w-[260px] w-full">
                <div className="space-y-1">
                  <h4 className="text-lg sm:text-xl font-bold text-primary">
                    {ceoData?.ceo_name || "Shakil Shikdar"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {ceoData?.ceo_position || "CEO at Moves International"}
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-gray-600">
                      {ceoData?.ceo_phone || "+61 434 051 189"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-gray-600 break-all">
                      {ceoData?.ceo_email || "shakil@mieducation.com.au"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - CEO Message */}
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
              Message From Our CEO
            </h2>

            <div className="space-y-5 text-base sm:text-lg text-gray-600 leading-relaxed">
              {ceoData?.ceo_message ? (
                <div
                  className="prose prose-gray max-w-none"
                  dangerouslySetInnerHTML={{ __html: ceoData.ceo_message }}
                />
              ) : (
                <>
                  <p>
                    I started this for all those who dream of studying or
                    migrating to beautiful Australia. Therefore, we have started
                    building strong relationships with Australian universities
                    over time.
                  </p>
                  <p>
                    Our purpose is to ensure the right information reaches the
                    right candidates, turning their dreams into reality and
                    guiding them toward long-term success in Australia.
                  </p>
                  <p>
                    If your visa has expired, you must wait for the new visa
                    approval before entering Australia. Reach out to us for any
                    further queries.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEOMsg;
