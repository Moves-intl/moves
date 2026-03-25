import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  User,
  Search,
  BookOpen,
  ArrowRight,
  Clock,
  TrendingUp,
  Grid3X3,
  List,
  Sparkles,
  Filter,
  Star,
  Quote,
  Eye,
  MessageCircle,
  Share2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"magazine" | "grid" | "list">(
    "magazine"
  );
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "trending">(
    "newest"
  );

  // Optimized single query to fetch all necessary data
  const { data: blogsData, isLoading: blogsLoading } = useQuery({
    queryKey: ["blogs-data", selectedCategory, sortBy],
    queryFn: async () => {
      // Fetch categories first
      const { data: categories, error: categoriesError } = await supabase
        .from("blog_categories")
        .select("*")
        .order("name");

      if (categoriesError) throw categoriesError;

      // Get exact total count of all published blogs
      const { count: totalCount } = await supabase
        .from("blogs")
        .select("*", { count: "exact", head: true })
        .eq("published", true);

      // Build blogs query with optimizations
      let blogsQuery = supabase
        .from("blogs")
        .select(
          `
          id, title, slug, content, featured_image_url, featured_image_alt,
          author, created_at, tags,
          blog_category_assignments!inner(
  blog_categories(name, id)
)

        `
        )
        .eq("published", true);

      // Apply category filter at database level if specific category selected
      if (selectedCategory !== "all") {
        blogsQuery = blogsQuery.eq(
          "blog_category_assignments.category_id",
          selectedCategory
        );
      }

      // Apply sorting at database level
      if (sortBy === "newest") {
        blogsQuery = blogsQuery.order("created_at", { ascending: false });
      }

      // Limit initial load for performance
      blogsQuery = blogsQuery.limit(500);

      const { data: blogs, error: blogsError } = await blogsQuery;

      if (blogsError) throw blogsError;

      return {
        blogs: blogs || [],
        categories: categories || [],
        total: totalCount || 0,
      };
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const blogs = blogsData?.blogs || [];
  const categories = blogsData?.categories || [];
  const blogStats = blogsData?.total || 0;

  // Optimized filtering - only search filter applied client-side
  const processedBlogs = React.useMemo(() => {
    if (!searchTerm.trim()) return blogs;

    return blogs.filter((blog) => {
      // Only search in title and author for performance
      return (
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [blogs, searchTerm]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (!content) return "";
    const text = content.replace(/<[^>]*>/g, "");
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  const getReadingTime = (content: string) => {
    if (!content) return 0;
    const words = content.split(" ").length;
    return Math.ceil(words / 200);
  };

  // Magazine layout logic
  const heroArticle = processedBlogs[0];
  const featuredArticles = processedBlogs.slice(1, 5);
  const regularArticles = processedBlogs.slice(5);

  const MagazineCard = ({
    blog,
    size = "regular",
    className = "",
  }: {
    blog: any;
    size?: "hero" | "featured" | "regular" | "small";
    className?: string;
  }) => {
    const categories =
      blog.blog_category_assignments?.map(
        (assignment: any) => assignment.blog_categories
      ) || [];

    return (
      <Card
        className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-card ${className}`}
      >
        {blog.featured_image_url && (
          <div
            className={`relative overflow-hidden ${
              size === "hero"
                ? "h-80 lg:h-96"
                : size === "featured"
                ? "h-64"
                : size === "small"
                ? "h-40"
                : "h-56"
            }`}
          >
            <img
              src={blog.featured_image_url}
              alt={blog.featured_image_alt || blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* Category Badge */}
            {categories.length > 0 && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary text-primary-foreground font-medium">
                  {categories[0].name}
                </Badge>
              </div>
            )}

            {/* Featured Badge */}
            {size === "hero" && (
              <div className="absolute top-4 right-4">
                <Badge
                  variant="secondary"
                  className="bg-yellow-500 text-yellow-900 font-bold"
                >
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              </div>
            )}

            {/* Overlay Content for Hero */}
            {size === "hero" && (
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center gap-4 text-sm mb-4 opacity-90">
                  {blog.author && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{blog.author}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(blog.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{getReadingTime(blog.content || "")} min read</span>
                  </div>
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                  {blog.title}
                </h2>

                {blog.content && (
                  <p className="text-lg text-white/90 mb-6 line-clamp-2">
                    {truncateContent(blog.content, 200)}
                  </p>
                )}

                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90"
                  asChild
                >
                  <Link to={`/blogs/${blog.slug || blog.id}`}>
                    Read Full Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}

        {size !== "hero" && (
          <CardContent className={`${size === "small" ? "p-4" : "p-6"}`}>
            {/* Meta Info */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              {blog.author && (
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span className="font-medium">{blog.author}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(blog.created_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{getReadingTime(blog.content || "")} min</span>
              </div>
            </div>

            {/* Title */}
            <h3
              className={`font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 ${
                size === "featured"
                  ? "text-xl"
                  : size === "small"
                  ? "text-base"
                  : "text-lg"
              }`}
            >
              {blog.title}
            </h3>

            {/* Content Preview */}
            {blog.content && size !== "small" && (
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                {truncateContent(blog.content, size === "featured" ? 120 : 100)}
              </p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between">
              {/* <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{Math.floor(Math.random() * 1000) + 100}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  <span>{Math.floor(Math.random() * 50) + 5}</span>
                </div>
              </div> */}

              <Button
                variant="ghost"
                size="sm"
                className="font-group-hover:text-primary group-hover:translate-x-1 transition-all h-auto font-semibold text-xs py-2 px-4 duration-300"
                asChild
              >
                <Link to={`/blogs/${blog.slug || blog.id}`}>
                  Read More
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Magazine Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 py-12 lg:py-16 relative">
          <div className="max-w-5xl mx-auto">
            {/* Top Badge */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-card/80 backdrop-blur-sm rounded-full px-6 py-3 border border-border/50 shadow-lg">
                <Quote className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  The Chronicle
                </span>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>
                    {blogStats ? `${blogStats}+ Stories` : "Loading..."}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Headlines */}
            <div className="text-center space-y-6 mb-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight sm:leading-none">
                <span className="text-foreground">Stories </span>
                <span className="text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-clip-text animate-pulse">
                  Worth
                </span>
                <span className="text-foreground italic font-serif">
                  Reading
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A curated collection of insights, expert perspectives, and
                compelling narratives that inform, inspire, and ignite
                curiosity.
              </p>
            </div>

            {/* Enhanced Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6 group-focus-within:text-primary transition-colors z-10" />
                  <Input
                    placeholder="Discover stories, explore topics, find insights..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-16 pr-6 py-6 text-lg bg-card/80 backdrop-blur-sm border-2 border-border/50 focus:border-primary/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all font-medium"
                  />
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <kbd className="px-2 py-1 bg-muted/80 rounded text-xs">
                        ⌘
                      </kbd>
                      <span>+</span>
                      <kbd className="px-2 py-1 bg-muted/80 rounded text-xs">
                        K
                      </kbd>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="bg-card/50 backdrop-blur-sm rounded-xl px-6 py-4 border border-border/50">
                <div className="text-2xl font-bold text-primary">
                  {blogStats || processedBlogs.length}
                </div>
                <div className="text-sm text-muted-foreground">Articles</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-xl px-6 py-4 border border-border/50">
                <div className="text-2xl font-bold text-primary">
                  {categories?.length || 0}
                </div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-xl px-6 py-4 border border-border/50">
                <div className="text-2xl font-bold text-primary">
                  {processedBlogs.reduce(
                    (total, blog) => total + getReadingTime(blog.content || ""),
                    0
                  )}
                </div>
                <div className="text-sm text-muted-foreground">Min Read</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-xl px-6 py-4 border border-border/50">
                <div className="text-2xl font-bold text-primary">∞</div>
                <div className="text-sm text-muted-foreground">Knowledge</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" />
                <span className="font-semibold">Filter</span>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border">
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={sortBy}
                  onValueChange={(value: any) => setSortBy(value)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border">
                    <SelectItem value="newest">Latest</SelectItem>
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">View:</span>
              <div className="flex bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === "magazine" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("magazine")}
                  className="h-8 px-3 text-xs"
                >
                  Magazine
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 px-3"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 px-3"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Badge variant="outline" className="ml-4">
                {blogsLoading
                  ? "Loading..."
                  : `${processedBlogs.length} stories`}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-12">
        {blogsLoading ? (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <div className="h-56 bg-muted"></div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-20"></div>
                    <div className="h-6 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : processedBlogs.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="h-20 w-20 text-muted-foreground/50 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold mb-3">No stories found</h3>
            <p className="text-muted-foreground mb-8">
              Try adjusting your search or explore all categories
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              View All Stories
            </Button>
          </div>
        ) : (
          <>
            {/* Magazine Layout */}
            {viewMode === "magazine" && (
              <div className="space-y-12">
                {/* Hero Article */}
                {heroArticle && (
                  <div className="mb-12">
                    <MagazineCard blog={heroArticle} size="hero" />
                  </div>
                )}

                {/* Featured Articles */}
                {featuredArticles.length > 0 && (
                  <div className="mb-12">
                    <div className="flex items-center gap-3 mb-8">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <h2 className="text-2xl font-bold">Featured Stories</h2>
                      <Separator className="flex-1" />
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                      {featuredArticles.map((blog, index) => (
                        <MagazineCard
                          key={blog.id}
                          blog={blog}
                          size={index < 2 ? "featured" : "regular"}
                          className={
                            index < 2 ? "md:col-span-1 lg:col-span-2" : ""
                          }
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Regular Articles */}
                {regularArticles.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h2 className="text-2xl font-bold">More Stories</h2>
                      <Separator className="flex-1" />
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {regularArticles.map((blog, index) => (
                        <MagazineCard
                          key={blog.id}
                          blog={blog}
                          size={
                            index % 7 === 0
                              ? "featured"
                              : index % 5 === 0
                              ? "regular"
                              : "small"
                          }
                          className={index % 7 === 0 ? "md:col-span-2" : ""}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Grid Layout */}
            {viewMode === "grid" && (
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {processedBlogs.map((blog) => (
                  <MagazineCard key={blog.id} blog={blog} size="regular" />
                ))}
              </div>
            )}

            {/* List Layout */}
            {viewMode === "list" && (
              <div className="max-w-4xl mx-auto space-y-8">
                {processedBlogs.map((blog) => (
                  <MagazineCard
                    key={blog.id}
                    blog={blog}
                    size="regular"
                    className="flex flex-row"
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-primary/5 to-accent/5 border-t">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Never Miss a Story</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get our best stories delivered to your inbox weekly
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Your email address" className="flex-1" />
              <Button size="lg">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
