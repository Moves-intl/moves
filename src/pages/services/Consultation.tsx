import React from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  CheckCircle,
  Clock,
  Users,
  Star,
  ArrowRight,
  Calendar,
  Shield,
  Award,
  Phone,
  Mail,
  MapPin,
  Plus,
  Minus,
  GraduationCap,
  Target,
  Globe,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CounsellingBookingForm from "@/components/forms/CounsellingBookingForm";
import Webstories from "@/components/common/Webstories";
import LatestUpdates from "@/components/common/LatestUpdates";
import HighQuality from "@/components/common/HighQuality";
import StickyProfileComponent from "@/components/common/StickyProfile";

const Consultation = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Personalized Study Plan",
      description:
        "Tailored roadmap based on your academic background and career goals",
    },
    {
      icon: Star,
      title: "University Matching",
      description:
        "Find the perfect universities and programs that fit your profile",
    },
    {
      icon: Award,
      title: "Scholarship Guidance",
      description:
        "Identify and apply for scholarships to reduce your study costs",
    },
    {
      icon: Shield,
      title: "Application Support",
      description:
        "Complete assistance with your application process and documentation",
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

      {/* Hero Section with Split Design */}
      <div className="relative min-h-screen flex items-center bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Text Content */}
            <div className="text-white space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    100% FREE Consultation
                  </span>
                </div>

                <h1 className="text-7xl lg:text-8xl font-black leading-none">
                  <span className="block text-white">Expert</span>
                  <span className="block text-white bg-gradient-accent bg-clip-text -mt-4">
                    Guidance
                  </span>
                </h1>
              </div>

              <p className="text-2xl text-white/90 leading-relaxed max-w-lg">
                Connect with certified education consultants and get
                personalized guidance for your study abroad journey.
              </p>

              {/* Interactive Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="group cursor-pointer">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover-scale">
                    <div className="text-3xl font-bold text-white mb-2">
                      500+
                    </div>
                    <div className="text-white/70 text-sm">Success Stories</div>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover-scale">
                    <div className="text-3xl font-bold text-white mb-2">
                      98%
                    </div>
                    <div className="text-white/70 text-sm">Success Rate</div>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover-scale">
                    <div className="text-3xl font-bold text-white mb-2">
                      24/7
                    </div>
                    <div className="text-white/70 text-sm">Support</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Consultation Form */}
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-xl"></div>
              <div className="relative glass rounded-3xl p-10 border border-white/20 shadow-elegant backdrop-blur-xl">
                <div className="text-center mb-8">
                  <div className="inline-block p-4 bg-gradient-brand rounded-2xl mb-4">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Book Your Free Session
                  </h3>
                  <p className="text-white/90">
                    Start your journey to international education success
                  </p>
                </div>
                <CounsellingBookingForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section - Floating Cards */}
      <div className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black text-foreground mb-6">
              <span className="">What You'll Get</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive consultation package designed to guide your
              success.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="group relative cursor-pointer">
                <div className="relative backdrop-blur-xl rounded-3xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover-scale bg-background shadow-elegant">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-2">
                      {benefit.title}
                    </h4>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed text-center">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Services Overview Section */}

      <StickyProfileComponent />
      <HighQuality />

      {/* Web stories */}
      <div className="bg-white">
        <Webstories />
      </div>

      {/* Latest Updates */}
      <LatestUpdates />
    </div>
  );
};

export default Consultation;
