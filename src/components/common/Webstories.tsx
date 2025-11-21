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

const Webstories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  const stories = [
    {
      id: 1,
      title: "Adventure Awaits",
      image: Adventure,
      category: "Travel",
    },
    {
      id: 2,
      title: "Breaking Barriers",
      image: Breaking,
      category: "Technology",
    },
    {
      id: 3,
      title: "Build Bold",
      image: Build,
      category: "Startups",
    },
    {
      id: 4,
      title: "Connected World",
      image: Connected,
      category: "Digital",
    },
    {
      id: 5,
      title: "Creative Expressions",
      image: Creative,
      category: "Art",
    },
    {
      id: 6,
      title: "Future Investments",
      image: Future,
      category: "Finance",
    },
    {
      id: 7,
      title: "Game Changer",
      image: Game,
      category: "Innovation",
    },
    {
      id: 8,
      title: "Innovate",
      image: Innovate,
      category: "Business",
    },
    {
      id: 9,
      title: "Visual Magic",
      image: Visual,
      category: "Design",
    },
    {
      id: 10,
      title: "Your Story",
      image: Story,
      category: "Lifestyle",
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
                      <div className="text-xs text-white/90 mb-1 font-medium uppercase tracking-wider">
                        {story.category}
                      </div>
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
