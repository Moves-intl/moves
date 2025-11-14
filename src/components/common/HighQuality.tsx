import React from "react";
import { ShieldCheck, Star } from "lucide-react";

const HighQuality = () => {
  const cointainer =
    "ml-auto mr-auto w-full max-w-[1330px] px-5 sm:px-10 lg:px-20";

  const testimonials = [
    {
      name: "Navraj Joshi",
      role: "Student",
      text: "Great experience with the team and Specially Disha didi. I am really thankful to the team for guidin...",
      rating: 5,
    },
    {
      name: "Aakash Bohara",
      role: "Student",
      text: "I am so grateful that I went to study international for my TR. They were very active and helpful th...",
      rating: 5,
    },
    {
      name: "Unique Subedi",
      role: "Student",
      text: "I can't say enough good things about AEC Student Consultancy! As a high school senior navigating the...",
      rating: 5,
    },
    {
      name: "Sumit Kumar Yadav",
      role: "Student",
      text: "Had a very good counselling session with their agent which provided me with a detailed insight on th...",
      rating: 5,
    },
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-2 bg-[#FFF6E8] px-2 py-2 rounded-md">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-orange-400 text-orange-400" : "text-gray-300 "
            } `}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      className="relative bg-no-repeat bg-[left_top_30%] bg-contain py-16"
      style={{
        backgroundImage: `url('https://coadhiipbnnqlmslpzeu.supabase.co/storage/v1/object/public/media/general/quality-bg-img-.png')`,
      }}
    >
      <div className={cointainer}>
        <div className="grid lg:grid-cols-[400px_1fr] items-center gap-5 lg:gap-[40px]">
          {/* Left side - Title and description */}
          <div className="flex flex-col lg:gap-[20px] p-5 lg:p-[30px] bg-white">
            <span className="bg-gray-50 self-start inline-block  px-4 py-[6px] rounded-full text-sm text-primary mb-0">
              Rated 4.0 Stars
            </span>

            <h2 className="text-3xl ml-4 lg:text-4xl  font-bold text-primary">
              <span className="bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                What Our Students
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                Say About Us
              </span>
            </h2>

            <p className="text-gray-700 ml-4 text-lg leading-relaxed max-w-md">
              Advanced services combined with a large experience and fast
              performance.
            </p>

            <button className="text-primary ml-4 hover:text-orange-600 font-light text-sm flex items-center gap-1  group">
              <span className="w-6 h-6 rounded-full flex items-center justify-center mr-0 ">
                <ShieldCheck className="w-4 h-4 text-orange-500 mb-0.5 mr-0" />
              </span>
              View all reviews
            </button>
          </div>

          {/* Right side - Testimonials 2x2 layout */}
          <div className="space-y-4 ">
            {/* Top row - 2 testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.slice(0, 2).map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-[15px]  items-center p-5 lg:p-9 shadow-[0_1px_5px_0_rgba(0,0,0,0.05)] rounded-md border border-[#F3F3F3] bg-white "
                >
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    {testimonial.text}
                  </p>
                  <StarRating rating={testimonial.rating} />
                  <div className="border-t pt-3 flex flex-col items-center">
                    <h4 className="font-semibold text-primary text-base">
                      {testimonial.name}
                    </h4>
                    <p className="text-primary text-base">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom row - 2 testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.slice(2, 4).map((testimonial, index) => (
                <div
                  key={index + 2}
                  className="flex flex-col gap-[15px]  items-center p-5 lg:p-9 shadow-[0_1px_5px_0_rgba(0,0,0,0.05)] rounded-md border border-[#F3F3F3] bg-white "
                >
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    {testimonial.text}
                  </p>
                  <StarRating rating={testimonial.rating} />
                  <div className="border-t pt-3 flex flex-col items-center">
                    <h4 className="font-semibold text-primary text-base">
                      {testimonial.name}
                    </h4>
                    <p className="text-primary text-base">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* View All button */}
            <div className="flex justify-center mt-12 relative z-10">
              <button className="bg-accent hover:shadow-2xl hover:shadow-accent/25 hover:scale-105 transition-all duration-300 text-white px-8 py-3 rounded-md hover:bg-accent/90 font-medium">
                View All
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighQuality;
