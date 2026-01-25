import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CounsellingBookingForm from "@/components/forms/CounsellingBookingForm";
import counsellingImage from "@/assets/counselling-support.jpg";
import { X, Sparkles, GraduationCap, Globe } from "lucide-react";

const CounsellingPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (hasShown) return;

      const scrollPercentage =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      if (scrollPercentage >= 20) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasShown]);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-hidden bg-gradient-to-br from-slate-50 to-white p-0 border-0 shadow-2xl">
        {/* Custom Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:bg-white"
        >
          <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] max-h-[80vh]">
          {/* Left Column - Hero Content */}
          <div className="hidden lg:flex relative bg-gradient-to-br from-[#023047] via-[#034a6b] to-[#023047] p-6 lg:p-8 flex-col justify-center overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-md animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <Sparkles className="w-4 h-4 text-[#fa8500] mr-2" />
                <span className="text-white font-medium text-sm">
                  Limited Time Offer
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-3">
                <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
                  Your Dream
                  <span className="block text-[#fa8500] drop-shadow-lg">
                    Starts Here
                  </span>
                </h2>
                <p className="text-lg text-blue-100 leading-relaxed max-w-md">
                  Get personalized guidance from education experts – completely
                  free consultation
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-white/90">
                  <div className="w-2 h-2 bg-[#fa8500] rounded-full"></div>
                  <span className="font-medium text-sm">
                    Expert counsellors with 10+ years experience
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-white/90">
                  <div className="w-2 h-2 bg-[#fa8500] rounded-full"></div>
                  <span className="font-medium text-sm">
                    Personalized university recommendations
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-white/90">
                  <div className="w-2 h-2 bg-[#fa8500] rounded-full"></div>
                  <span className="font-medium text-sm">
                    Scholarship guidance & application support
                  </span>
                </div>
              </div>

              {/* Image Container */}
              <div className="relative">
                <div className="relative rounded-xl overflow-hidden shadow-xl group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                  <img
                    src={counsellingImage}
                    alt="Students receiving counselling support for international education"
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Floating Icons */}
                  <div className="absolute top-3 right-3 z-20">
                    <div className="flex space-x-2">
                      <div className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                        <GraduationCap className="w-3 h-3 text-[#023047]" />
                      </div>
                      <div className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                        <Globe className="w-3 h-3 text-[#fa8500]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="p-6 lg:p-8 overflow-y-auto bg-white/80 backdrop-blur-sm">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-[#023047] mb-2">
                Book Your Free Session
              </h3>
              <p className="text-gray-600 text-sm">
                Fill out the form below and we'll get back to you within 24
                hours
              </p>
            </div>
            <CounsellingBookingForm onSuccess={handleSuccess} />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-t from-[#023047]/20 to-[#fa8500]/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-b from-[#fa8500]/20 to-[#023047]/20 rounded-full blur-3xl"></div>
      </DialogContent>
    </Dialog>
  );
};

export default CounsellingPopup;
