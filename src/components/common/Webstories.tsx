import React, { useState, useEffect } from "react";
import { BookImage } from "lucide-react";
import Adventure from "@/../public/web-stories/Adventure Awaits - Travel.jpg";
import Breaking from "@/../public/web-stories/Breaking Barriers - Technology.jpg";
import Build from "@/../public/web-stories/Build Bold - Startups.jpg";
import Connected from "@/../public/web-stories/Connected World - Digital.jpg";
import Creative from "@/../public/web-stories/Creative Expressions - Art.jpg";
import Future from "@/../public/web-stories/Future Investments - Finance.jpg";
import Game from "@/../public/web-stories/Game Changer - Innovation.jpg";
import Innovate from "@/../public/web-stories/Innovate - Business.jpg";
import Visual from "@/../public/web-stories/Visual Magic - Design.jpg";
import Story from "@/../public/web-stories/Your Story - Lifestyle.jpg";
import ScholarShipHub from "@/../public/web-stories/scholarship_hub.jpg";
import TestPrep from "@/../public/web-stories/test_prep_mastery.png";
import Sop from "@/../public/web-stories/sop.png";
import SuccessStory from "@/../public/web-stories/success_story.png";
import CareerPath from "@/../public/web-stories/future_career.png";
import DegreeOfChoice from "@/../public/web-stories/degree_of_choice.png";

const Webstories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  const stories = [
    {
      id: 1,
      title: "SCHOLARSHIP HUB",
      image: ScholarShipHub,
      category: "Get Your Personalized Scholarship Match",
    },
    {
      id: 2,
      title: "TEST PREP MASTERY",
      image: TestPrep,
      category: "Register for our Next Success Batch",
    },
    {
      id: 3,
      title: "SOP & LOR SECRETS",
      image: Sop,
      category: "See our full Application Support",
    },
    {
      id: 4,
      title: "YOUR SUCCESS STORY IS NEXT!",
      image: Connected,
      category: "See how we helped others achieve their dreams",
    },
    {
      id: 5,
      title: "SEE YOUR FUTURE CAREER PATH",
      image: Creative,
      category: "Book a Free Global Career Planning Session",
    },
    {
      id: 6,
      title: "Top-Demand Degree of Your Choice",
      image: Future,
      category:
        "Book a free 1-on-1 session with our career expert to validate your course choice and secure your global job blueprint. ",
    },
  ];

  // Calculate max index based on current itemsPerView
  const maxIndex = Math.max(stories.length - itemsPerView, 0);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(2);
      } else if (width < 768) {
        setItemsPerView(2);
      } else if (width < 1024) {
        setItemsPerView(3);
      } else if (width < 1280) {
        setItemsPerView(4);
      } else if (width < 1536) {
        setItemsPerView(6);
      } else {
        setItemsPerView(8);
      }

      setCurrentIndex((prev) =>
        Math.min(prev, Math.max(stories.length - itemsPerView, 0))
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerView, stories.length]);

  // Auto-rotate stories
  useEffect(() => {
    if (maxIndex <= 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= maxIndex) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const cardWidth = `${100 / itemsPerView}%`;

  return (
    <div className="w-full mx-auto px-4 py-8 max-w-12xl">
      <div className="text-center mb-6">
        <div className="inline-flex items-center w-fit leading-tight bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-3">
          <BookImage className="w-4 h-4 mr-2" />
          Our Stories
        </div>
        <h2 className="text-4xl font-bold text-primary">Web Stories</h2>
        <p className="text-gray-600 mt-2">Explore Visual Stories</p>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex-shrink-0 px-2"
              style={{ width: cardWidth }}
            >
              <div className="relative group cursor-pointer h-full">
                <div className="relative overflow-hidden rounded-lg shadow-lg h-full">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-64 md:h-80 lg:h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Enhanced gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold text-lg leading-snug">
                        {story.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination indicators */}
      {maxIndex > 0 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration 300 ${
                index === currentIndex ? "bg-primary/90 w-5" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Webstories;
