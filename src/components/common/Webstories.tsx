import { useState, useEffect } from "react";
import { BookImage } from "lucide-react";
import Connected from "@/../public/web-stories/Connected World - Digital.jpg";
import Creative from "@/../public/web-stories/Creative Expressions - Art.jpg";
import Future from "@/../public/web-stories/Future Investments - Finance.jpg";
import ScholarShipHub from "@/../public/web-stories/scholarship-hub.png";
import TestPrep from "@/../public/web-stories/test-prep.png";
import Sop from "@/../public/web-stories/application-support.png";
import VisaEligibility from "@/../public/web-stories/visa_eligibility.png";
import CompareOffer from "@/../public/web-stories/compare_offer.png";
import Document from "@/../public/web-stories/document.png";
import RealExam from "@/../public/web-stories/real_exam.png";

const Webstories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  const stories = [
    {
      id: 1,
      title: "SCHOLARSHIP HUB",
      image: ScholarShipHub,
      category: "Get Your Personalized Scholarship Match",
      link: "/services/scholarship-guidance",
    },
    {
      id: 2,
      title: "TEST PREP MASTERY",
      image: TestPrep,
      category: "Register for our Next Success Batch",
      link: "/services/test-preparation",
    },
    {
      id: 3,
      title: "SOP & LOR SECRETS",
      image: Sop,
      category: "See our full Application Support",
      link: "/services/application-support",
    },
    {
      id: 4,
      title: "YOUR SUCCESS STORY IS NEXT!",
      image: Connected,
      category: "See how we helped others achieve their dreams",
      link: "/",
    },
    {
      id: 5,
      title: "SEE YOUR FUTURE CAREER PATH",
      image: Creative,
      category: "Book a Free Global Career Planning Session",
      link: "#lead_form",
    },
    {
      id: 6,
      title: "Top-Demand Degree of Your Choice",
      image: Future,
      category:
        "Book a free 1-on-1 session with our career expert to validate your course choice and secure your global job blueprint. ",
      link: "#lead_form",
    },
    {
      id: 7,
      title: "CHECK YOUR VISA ELIGIBILITY NOW!",
      image: VisaEligibility,
      link: "/services/consultation",
    },
    {
      id: 9,
      title: "PRACTICE WITH REAL EXAM CONDITIONS",
      image: RealExam,
      link: "/services/test-preparation",
    },
    {
      id: 8,
      title: "COMPARE OFFERS SIDE-BY-SIDE",
      image: CompareOffer,
      link: "/services/consultation",
    },
    {
      id: 10,
      title: "GET YOUR DOCUMENTS VERIFIED FREE",
      image: Document,
      link: "/services/application-support",
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
              onClick={() => {
                if (story.link.startsWith("#")) {
                  const el = document.querySelector(story.link);
                  el?.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.open(story.link, "_blank");
                }
              }}
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
