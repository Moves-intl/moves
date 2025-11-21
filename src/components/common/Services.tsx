import {
  Lightbulb,
  BookOpen,
  Globe,
  GraduationCap,
  Award,
  Plane,
  Users,
} from "lucide-react";

export default function Services() {
  return (
    <section className="w-full mx-auto bg-[#fcfcfc] py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 items-top">
          {/* Left Container - Image */}
          <div className="w-full lg:w-3/5">
            <img
              src="https://coadhiipbnnqlmslpzeu.supabase.co/storage/v1/object/public/media/all/get-better-about-us.png"
              alt="Professional consultant with glasses and blue shirt"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Container - Content */}
          <div className="w-full lg:w-3/5 space-y-8">
            {/* Header section */}
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-orange-100 px-4 py-2 rounded-full">
                <Lightbulb className="w- h-5 text-orange-500" />
                <span className="text-orange-600 text-1xl">
                  Get Better About Us
                </span>
              </div>

              {/* Main heading */}
              <h2 className="text-4xl lg:text-5xl font-bold text-[#023047]-900 leading-tight">
                Best{" "}
                <span className="relative text-[#fa8500]">
                  guidance
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3"
                    viewBox="0 0 200 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 10C20 4 40 2 60 4C80 6 100 8 120 4C140 0 160 2 180 6C185 7 190 8 198 10"
                      stroke="#FA8500"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.7"
                    />
                  </svg>
                </span>{" "}
                given by our highly specialized consultants.
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                Whether you need help with an English test application or your
                first student research, our expert consultants are here to guide
                you.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <ServiceCard
                title="Free Consultation"
                color="blue"
                icon={<Users className="w-5 h-5" />}
              />
              <ServiceCard
                title="Visa & Migration"
                color="purple"
                icon={<Globe className="w-5 h-5" />}
              />
              <ServiceCard
                title="English Test Prep"
                color="orange"
                icon={<GraduationCap className="w-5 h-5" />}
              />
              <ServiceCard
                title="Application Assistance"
                color="green"
                icon={<BookOpen className="w-5 h-5" />}
              />
              <ServiceCard
                title="Scholarship Guidance"
                color="red"
                icon={<Award className="w-5 h-5" />}
              />
              <ServiceCard
                title="Pre Departure Support"
                color="cyan"
                icon={<Plane className="w-5 h-5" />}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const colorConfig = {
  blue: {
    bg: "bg-gradient-to-br from-blue-50 to-blue-100",
    border: "border-blue-500",
    text: "text-blue-600",
    accent: "bg-blue-500",
    shadow: "shadow-blue-100",
  },
  green: {
    bg: "bg-gradient-to-br from-green-50 to-green-100",
    border: "border-green-500",
    text: "text-green-600",
    accent: "bg-green-500",
    shadow: "shadow-green-100",
  },
  purple: {
    bg: "bg-gradient-to-br from-purple-50 to-purple-100",
    border: "border-purple-500",
    text: "text-purple-600",
    accent: "bg-purple-500",
    shadow: "shadow-purple-100",
  },
  orange: {
    bg: "bg-gradient-to-br from-orange-50 to-orange-100",
    border: "border-orange-500",
    text: "text-orange-600",
    accent: "bg-orange-500",
    shadow: "shadow-orange-100",
  },
  red: {
    bg: "bg-gradient-to-br from-red-50 to-red-100",
    border: "border-red-500",
    text: "text-red-600",
    accent: "bg-red-500",
    shadow: "shadow-red-100",
  },
  cyan: {
    bg: "bg-gradient-to-br from-cyan-50 to-cyan-100",
    border: "border-cyan-500",
    text: "text-cyan-600",
    accent: "bg-cyan-500",
    shadow: "shadow-cyan-100",
  },
};

type ServiceCardProps = {
  title: string;
  color: keyof typeof colorConfig;
  icon: React.ReactNode;
};

function ServiceCard({ title, color, icon }: ServiceCardProps) {
  const config = colorConfig[color];

  return (
    <div
      className={`
      group relative overflow-hidden
      ${config.bg} ${config.shadow}
      border-l-4 ${config.border}
      rounded-2xl p-4
      hover:shadow-xl hover:-translate-y-1
      transition-all duration-300 ease-out
      cursor-pointer
    `}
    >
      {/* Background pattern */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-5">
        <div
          className={`w-full h-full ${config.accent} rounded-full transform translate-x-8 -translate-y-8`}
        ></div>
      </div>

      <div className="relative z-10 flex items-start gap-3">
        {/* Icon container */}
        <div
          className={`
          ${config.text} p-2 bg-white/50 rounded-xl
          group-hover:scale-110 group-hover:bg-white/80
          transition-all duration-300
        `}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`${config.text} font-semibold text-sm group-hover:text-opacity-80 transition-all duration-300`}
          >
            {title}
          </h3>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
    </div>
  );
}
