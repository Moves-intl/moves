import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface HowItWorksBlurb {
  icon: string;
  title: string;
  description: string;
}

interface HowItWorksDisplayProps {
  title?: string;
  description?: string;
  featureImageUrl?: string;
  blurbs?: HowItWorksBlurb[];
}

const HowItWorksDisplay: React.FC<HowItWorksDisplayProps> = ({
  title,
  description,
  featureImageUrl,
  blurbs = [],
}) => {
  if (!title && !description && !featureImageUrl && blurbs.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl grid lg:grid-cols-[40%_60%] gap-[30px]  mx-auto">
        {/* Left Column - Full height image */}
        <div className="self-start sticky top-20">
          {featureImageUrl && (
            <div className="w-full  flex items-center">
              <img src={featureImageUrl} alt={title || "How it works"} />
            </div>
          )}
        </div>

        {/* Right Column - Content */}
        <div className="flex flex-col space-y-12">
          {/* Title and Description (not in card) */}
          <div className="space-y-6">
            {title && (
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Blurbs in cards */}
          {blurbs.length > 0 && (
            <div className="space-y-8">
              {blurbs.map((blurb, index) => (
                <Card
                  key={index}
                  className="bg-[#fcfcfc] hover:shadow-md transition-shadow rounded-2xl"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      {/* Image/Icon at top left */}
                      {blurb.icon && (
                        <div className="w-16 h-16">
                          <img
                            src={blurb.icon}
                            alt={blurb.title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-foreground">
                        {blurb.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed">
                        {blurb.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksDisplay;
