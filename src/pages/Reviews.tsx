import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';
import { supabase } from '@/integrations/supabase/client';
import { Globe, User2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface Review {
  id: string;
  content: string;
  rating: number;
  reviewer_name: string;
  reviewer_role: string;
  reviewer_image_url?: string;
  is_featured?: boolean;
  is_published?: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}
const Reviews = () => {
  // Fetch reviews from database
  const { data: reviews = [], isLoading, error } = useQuery({
    queryKey: ['reviews'],
    queryFn: async (): Promise<Review[]> => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data;
    }
  });

  // Calculate stats
  const totalReviews = reviews.length;
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : '5.0';
  const featuredReviews = reviews.filter(review => review.is_featured);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Something went wrong</h2>
          <p className="text-slate-600">We couldn't load the reviews. Please try again later.</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>Student Reviews & Testimonials | Moves International</title>
        <meta name="description" content="Read genuine reviews and testimonials from our students who successfully pursued their study abroad dreams with Moves International." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-24 bg-[#fcfcfc] overflow-hidden">

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-start w-fit leading-tight bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-3">
            <User2 className="w-4 h-4 mr-2" />
            Student Testimonials
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-primary bg-clip-text text-transparent">
            What Our Students Say
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover genuine stories from students who achieved their study abroad dreams with our guidance and support.
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-14 lg:mb-20">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2">{totalReviews}+</div>
              <div className="text-slate-600">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2">{averageRating}/5</div>
              <div className="text-slate-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-slate-600">Success Rate</div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={{
                  id: review.id,
                  content: review.content,
                  rating: review.rating,
                  reviewerName: review.reviewer_name,
                  reviewerRole: review.reviewer_role,
                  reviewerImage: review.reviewer_image_url
                }}
              />
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-10 sm:mt-14 lg:mt-20">
            <div className="bg-primary rounded-2xl p-5 sm:p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join thousands of successful students who trusted us with their study abroad dreams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size='lg'
                  className="hover:bg-accent/90 bg-accent hover:shadow-2xl hover:shadow-accent/25 hover:text-white transition-colors">
                  <a
                    href="/consultation"
                    className="inline-flex items-center justify-center gap-2">  <Globe className="h-5 w-5" />                Book Free Consultation
                  </a>
                </Button>
               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Enquiry Form */}
      <LeadEnquiryForm />
    </>
  );
};

export default Reviews;