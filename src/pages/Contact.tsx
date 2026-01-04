import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
  Lock,
  ShieldCheck,
} from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

const Contact = () => {
  const [activeOffice, setActiveOffice] = useState(0);

  const nepalOffice = {
    country: "Nepal",
    address: "D&C Building(Next to Himalayan Java), New Baneshwor, Kathmandu",
    phone: "(+977) +977-9768991102",
    email: "info@movesinternational.com.np",
    flag: "🇳🇵",
  };
  const otherOffices = [
    {
      country: "Australia - Sydney",
      address: "Level 2, 251 Elizabeth St, Sydney NSW 2000",
      phone: "(02) 8068 9051",
      email: "info@mieducation.com.au",
      flag: "🇦🇺",
    },
    {
      country: "Australia - Wollongong",
      address: "Suite 9B, Level 2, 175 Keira St, Wollongong NSW 2500",
      phone: "+61 422 979 979",
      email: "rajib@mieducation.com.au",
      flag: "🇦🇺",
    },
    {
      country: "Bangladesh",
      address: "Mir Noor Square, House-43, Road - 02, Dhanmondi R/A, Dhaka",
      phone: "(+88) 013 3879 4188",
      email: "infobd@mieducation.com.bd",
      flag: "🇧🇩",
    },
  ];
  const features = [
    {
      icon: Globe,
      title: "Global Presence",
      description: "Offices worldwide to serve you better",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Dedicated counselors for personalized guidance",
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Thousands of successful student placements",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#023047] to-[#0a4a6e] overflow-hidden">
        {/* Enhanced floating background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-16 w-36 h-36 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-80 right-24 w-28 h-28 bg-accent/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-44 h-44 bg-white/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
          {/* Additional subtle decorative elements */}
          <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-accent rounded-full animate-ping opacity-20"></div>
          <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-white rounded-full animate-ping delay-2000 opacity-30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Enhanced Text Content */}
            <div className="text-white space-y-8 animate-fade-in">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:border-white/40 transition-all duration-300">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Available 24/7</span>
                </div>

                <h1 className="text-6xl lg:text-8xl font-black leading-tight">
                  <span className="block text-white drop-shadow-lg">
                    Let's Talk
                  </span>
                  <span className="block bg-gradient-to-r from-accent via-orange-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg -mt-2">
                    Future
                  </span>
                </h1>
              </div>

              <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                Your educational journey starts with a single conversation.
                Let's make it count.
              </p>

              {/* Interactive Stats - Enhanced */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
                {[
                  {
                    value: "50K+",
                    label: "Dreams Realized",
                    color: "bg-emerald-500/20",
                    icon: <CheckCircle className="h-4 w-4 text-emerald-400" />,
                  },
                  {
                    value: "15+",
                    label: "Years Excellence",
                    color: "bg-blue-500/20",
                    icon: <Clock className="h-4 w-4 text-blue-400" />,
                  },
                  {
                    value: "24/7",
                    label: "Support",
                    color: "bg-amber-500/20",
                    icon: <Globe className="h-4 w-4 text-amber-400" />,
                  },
                ].map((stat, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div
                      className={`${stat.color} backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-lg hover:scale-[1.03]`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg border border-white/20">
                          {stat.icon}
                        </div>
                        <div className="text-3xl font-bold text-white">
                          {stat.value}
                        </div>
                      </div>
                      <div className="text-white/80 text-sm">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Enhanced Contact Form */}
            <div className="relative animate-scale-in py-10">
              <div className="absolute inset-0 bg-accent/20  rounded-3xl blur-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center p-5 bg-gradient-to-r from-accent to-orange-400 rounded-2xl mb-4 shadow-lg">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Start Your Journey
                  </h3>
                  <p className="text-white/90">
                    Fill out the form and we'll get back to you within 24 hours
                  </p>
                </div>

                <ContactForm />

                {/* Trust indicators */}
                <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap justify-center gap-4">
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Lock className="h-4 w-4 text-green-400" />
                    <span>Secure & Confidential</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <ShieldCheck className="h-4 w-4 text-blue-400" />
                    <span>No Spam Ever</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Floating Office Cards Section */}
      <div className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black text-foreground mb-6">
              <span className="">Our Offices</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with our experts worldwide. Choose your preferred
              location.
            </p>
          </div>

          {/* Main Office - Nepal */}
          <div className="mb-20">
            <div className="relative max-w-4xl mx-auto">
              <div className="relative backdrop-blur-xl rounded-3xl p-12 border border-border shadow-elegant bg-background">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-6xl">{nepalOffice.flag}</div>
                      <div>
                        <h3 className="text-3xl font-bold text-foreground">
                          Headquarters
                        </h3>
                        <p className="text-muted-foreground">
                          {nepalOffice.country}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-primary rounded-xl">
                          <MapPin className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-foreground font-medium">Address</p>
                          <p className="text-muted-foreground">
                            {nepalOffice.address}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-accent rounded-xl">
                          <Phone className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-foreground font-medium">Phone</p>
                          <p className="text-muted-foreground">
                            {nepalOffice.phone}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-brand rounded-xl">
                          <Mail className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-foreground font-medium">Email</p>
                          <p className="text-muted-foreground">
                            {nepalOffice.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-soft">
                    <div className="flex items-center gap-3 mb-6">
                      <Clock className="h-6 w-6 text-primary" />
                      <h4 className="text-xl font-bold text-foreground">
                        Office Hours
                      </h4>
                    </div>
                    <div className="space-y-3 text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Sunday - Friday</span>
                        <span className="text-foreground font-medium">
                          9:00 AM - 5:00 PM
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span className="text-destructive font-medium">
                          Closed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Offices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherOffices.map((office, index) => (
              <div
                key={index}
                className="group relative cursor-pointer"
                onMouseEnter={() => setActiveOffice(index)}
              >
                <div
                  className={`relative backdrop-blur-xl flex-col flex justify-between h-full rounded-3xl p-8 border transition-all duration-300 hover-scale bg-background ${
                    activeOffice === index
                      ? "border-primary/50"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">{office.flag}</div>
                    <h4 className="text-xl font-bold text-foreground mb-2">
                      {office.country}
                    </h4>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {office.address}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                      <p className="text-muted-foreground text-sm">
                        {office.phone}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                      <p className="text-muted-foreground text-sm">
                        {office.email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <button className="w-full bg-gradient-primary hover:bg-gradient-brand text-white py-3 rounded-xl font-medium transition-all duration-300 shadow-soft hover:shadow-elegant">
                      Contact Office
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-foreground mb-6">
              Find Us
            </h2>
          </div>

          <div className="relative">
            <div className="relative backdrop-blur-xl rounded-3xl overflow-hidden border border-border shadow-elegant bg-background">
              <div className="h-96 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3013.1145588113045!2d85.33299507464197!3d27.688424726327252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDQxJzE4LjMiTiA4NcKwMjAnMDguMSJF!5e1!3m2!1sen!2snp!4v1763027032300!5m2!1sen!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Moves International - Kathmandu"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
