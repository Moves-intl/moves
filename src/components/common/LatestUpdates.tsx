import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface BlogCategory {
  id: string;
  name: string;
}

interface Blog {
  id: string;
  title: string;
  slug: string;
  featured_image_url?: string;
  meta_description?: string;
  created_at: string;
  author?: string;
  blog_category_assignments: {
    blog_categories: BlogCategory;
  }[];
}

const LatestUpdates = () => {
  const navigate = useNavigate();
  const handleViewAllBlogs = () => {
    navigate("/blogs");
  };
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["latest-blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select(
          `
          id, 
          title, 
          slug, 
          featured_image_url, 
          meta_description, 
          created_at, 
          author,
          blog_category_assignments(
            blog_categories(
              id,
              name
            )
          )
        `
        )
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data as Blog[];
    },
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-12"></div>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-80"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-start mb-6">
          <div className="inline-flex items-start w-fit leading-tight bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-3">
            <Newspaper className="w-4 h-4 mr-2" />
            Latest Updates
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Stay Informed
          </h2>
          <div className="flex justify-between">
            <p className="text-xl text-muted-foreground items-start">
              Discover the latest insights, tips, and news in international
              education
            </p>
            <div className="text-end">
              <button
                onClick={handleViewAllBlogs}
                className="flex items-center -mt-5 gap-2 px-4 py-2 border border-orange-500 bg-orange-100 text-orange-600 rounded-md font-medium hover:bg-orange-200 transition"
              >
                View All Articles <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => {
            const categories =
              blog.blog_category_assignments?.map(
                (assignment) => assignment.blog_categories
              ) || [];

            return (
              <article
                key={blog.id}
                className="group bg-white h-full flex flex-col rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-primary/50"
              >
                {/* Image with Categories */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  {blog.featured_image_url ? (
                    <img
                      src={blog.featured_image_url}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                      <div className="text-6xl font-bold text-primary/20">
                        {index + 1}
                      </div>
                    </div>
                  )}

                  {/* Categories overlay */}
                  {categories.length > 0 && (
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-white/90 text-primary border-0 text-xs font-medium shadow-sm backdrop-blur-sm"
                      >
                        {categories[0].name}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(blog.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    {blog.author && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span>{blog.author}</span>
                      </>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>

                    {blog.meta_description && (
                      <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                        {blog.meta_description}
                      </p>
                    )}
                  </div>

                  <Button
                    onClick={() => navigate(`/blogs/${blog.slug}`)}
                    variant="default"
                    size="default"
                    className="mt-auto w-full bg-accent hover:bg-accent/90 text-white relative z-10"
                  >
                    Read Article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LatestUpdates;
