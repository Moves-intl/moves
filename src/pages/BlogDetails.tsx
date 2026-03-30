import React, { useMemo, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Helmet } from 'react-helmet-async';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ArrowLeft,
  Calendar,
  User,
  ChevronDown,
  ChevronUp,
  Share2,
  BookOpen,
  Tag,
  Heart,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  List,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FAQItem {
  question: string;
  answer: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface RelatedBlog {
  id: string;
  title: string;
  slug: string;
  featured_image_url: string;
  created_at: string;
}

// Parse headings from HTML and inject IDs
function parseHeadings(html: string): { toc: TocItem[]; processedHtml: string } {
  const toc: TocItem[] = [];
  const processedHtml = html.replace(
    /<(h[1-3])([^>]*)>(.*?)<\/h[1-3]>/gi,
    (match, tag, attrs, inner) => {
      const text = inner.replace(/<[^>]+>/g, '').trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const level = parseInt(tag[1]);
      toc.push({ id, text, level });
      return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
    }
  );
  return { toc, processedHtml };
}

const BlogDetails = () => {
  const { id } = useParams();
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);
  const [isLiked, setIsLiked] = React.useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const navigate = useNavigate();

  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      if (!id) throw new Error("No blog identifier provided");

      let query = supabase
        .from("blogs")
        .select(
          `
          id, title, slug, content, featured_image_url, featured_image_alt,
          author, created_at, tags, faqs, meta_title, meta_description,
          blog_category_assignments(
            blog_categories(name, id, type)
          )
        `
        )
        .eq("published", true);

      const isUUID =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

      if (isUUID) {
        query = query.eq("id", id);
      } else {
        query = query.eq("slug", id);
      }

      const { data, error } = await query.maybeSingle();
      if (error) throw error;
      return data;
    },
    staleTime: 10 * 60 * 1000,
  });

  // Get the country category of this blog
  const countryCategory = useMemo(() => {
    if (!blog) return null;
    const cats = blog.blog_category_assignments?.map((a: any) => a.blog_categories) || [];
    return cats.find((c: any) => c?.type === 'country') || null;
  }, [blog]);

  // Fetch related blogs from same country category
  const { data: relatedBlogs } = useQuery({
    queryKey: ["related-blogs", blog?.id, countryCategory?.id],
    queryFn: async (): Promise<RelatedBlog[]> => {
      if (!blog) return [];

      if (countryCategory?.id) {
        const { data: catBlogs } = await supabase
          .from("blog_category_assignments")
          .select("blog_id")
          .eq("category_id", countryCategory.id);

        const blogIds = (catBlogs || [])
          .map((b: any) => b.blog_id)
          .filter((bid: string) => bid !== blog.id)
          .slice(0, 5);

        if (blogIds.length > 0) {
          const { data, error } = await supabase
            .from("blogs")
            .select("id, title, slug, featured_image_url, created_at")
            .eq("published", true)
            .in("id", blogIds)
            .order("created_at", { ascending: false });
          if (error) throw error;
          return (data || []) as RelatedBlog[];
        }
      }

      // Fallback: latest blogs
      const { data, error } = await supabase
        .from("blogs")
        .select("id, title, slug, featured_image_url, created_at")
        .eq("published", true)
        .neq("id", blog.id)
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return (data || []) as RelatedBlog[];
    },
    enabled: !!blog,
    staleTime: 15 * 60 * 1000,
  });

  // Parse TOC from content
  const { toc, processedHtml } = useMemo(() => {
    if (!blog?.content) return { toc: [], processedHtml: '' };
    return parseHeadings(blog.content);
  }, [blog?.content]);

  // Track active heading while scrolling
  useEffect(() => {
    if (toc.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  const scrollToHeading = (headingId: string) => {
    const el = document.getElementById(headingId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const sharePost = async (platform?: string) => {
    const url = window.location.href;
    const title = blog?.title || "";
    const text = blog?.meta_description || blog?.title || "";

    if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
    } else if (platform === "copy") {
      await navigator.clipboard.writeText(url);
    } else {
      if (navigator.share) {
        navigator.share({ title, text, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-12 bg-muted rounded w-3/4"></div>
            <div className="h-6 bg-muted rounded w-1/2"></div>
            <div className="h-96 bg-muted rounded"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto" />
          <h1 className="text-3xl font-bold text-muted-foreground">
            Blog post not found
          </h1>
          <p className="text-muted-foreground">
            The blog post you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link to="/blogs">Return to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  const categories =
    blog.blog_category_assignments?.map(
      (assignment: any) => assignment.blog_categories
    ) || [];
  const faqs =
    blog.faqs && Array.isArray(blog.faqs)
      ? (blog.faqs as unknown as FAQItem[])
      : [];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{blog.meta_title || blog.title}</title>
        <meta name="description" content={blog.meta_description || ''} />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-end px-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              <span className="hidden sm:inline ml-1">Like</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border border-gray-200 p-2">
                <DropdownMenuItem asChild>
                  <button className="flex items-center gap-2 w-full text-left" onClick={() => sharePost("facebook")}>
                    <Facebook className="h-4 w-4" /> Facebook
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button className="flex items-center gap-2 w-full text-left" onClick={() => sharePost("twitter")}>
                    <Twitter className="h-4 w-4" /> Twitter
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button className="flex items-center gap-2 w-full text-left" onClick={() => sharePost("linkedin")}>
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button className="flex items-center gap-2 w-full text-left" onClick={() => sharePost("copy")}>
                    <LinkIcon className="h-4 w-4" /> Copy Link
                  </button>
                </DropdownMenuItem>
                {navigator.share && (
                  <DropdownMenuItem asChild>
                    <button className="flex items-center gap-2 w-full text-left" onClick={() => sharePost()}>
                      <Share2 className="h-4 w-4" /> Native Share
                    </button>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative">
        {blog.featured_image_url && (
          <div className="relative w-full">
            <img
              src={blog.featured_image_url}
              alt={blog.featured_image_alt || blog.title}
              className="w-full h-auto max-h-[65vh] object-cover object-center"
            />
            <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-50">
              <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back </span>
              </Button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
              <div className="container max-w-6xl">
                <div className="flex flex-wrap gap-1.5 mb-2 sm:mb-4">
                  {categories.map((category: any) => (
                    <Badge key={category.id} variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                      {category.name}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-3">
                  {blog.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90 text-sm">
                  {blog.author && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{blog.author}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(blog.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fallback header for posts without featured image */}
        {!blog.featured_image_url && (
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-12 md:py-16">
            <div className="container max-w-6xl px-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category: any) => (
                  <Badge key={category.id} variant="secondary">{category.name}</Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-muted-foreground text-sm">
                {blog.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{blog.author}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(blog.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3-Column Layout: TOC | Content | Related Posts */}
      <div className="w-full max-w-7xl mx-auto px-4 py-6 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_260px] gap-0 lg:gap-8 w-full min-w-0">

          {/* LEFT: Table of Contents */}
          <aside className="hidden lg:block">
            {toc.length > 0 && (
              <div className="sticky top-20">
                <div className="bg-muted/40 rounded-xl p-4 border border-border max-h-[calc(100vh-88px)] overflow-y-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <List className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm text-primary uppercase tracking-wide">
                      Table of Contents
                    </h3>
                  </div>
                  <nav className="space-y-1">
                    {toc.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToHeading(item.id)}
                        className={`w-full text-left text-sm py-1.5 px-2 rounded-md transition-all duration-200 leading-snug
                          ${item.level === 2 ? 'pl-4' : item.level === 3 ? 'pl-6' : ''}
                          ${activeId === item.id
                            ? 'bg-primary text-white font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                          }`}
                      >
                        {item.text}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            )}
          </aside>

          {/* CENTER: Article Content */}
          <main className="min-w-0 w-full">
            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6 md:mb-8 p-4 bg-muted/50 rounded-lg">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {blog.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Content */}
            <article className="prose prose-lg max-w-none mb-8 md:mb-12 overflow-x-auto">
              {blog.content ? (
                <>
                  <style>{`
                    .blog-content table {
                      border-collapse: collapse;
                      width: 100%;
                      margin: 1.5em 0;
                    }
                    .blog-content td, .blog-content th {
                      border: 1px solid #d1d5db;
                      padding: 10px 14px;
                      vertical-align: top;
                      text-align: left;
                    }
                    .blog-content th {
                      background-color: #f3f4f6;
                      font-weight: 600;
                    }
                    .blog-content tr:nth-child(even) td {
                      background-color: #f9fafb;
                    }
                  .blog-content table {
                      display: block;
                      overflow-x: auto;
                      -webkit-overflow-scrolling: touch;
                    }
                  @media (max-width: 1023px) {
                    .blog-content p, .blog-content li,
                    .blog-content h1, .blog-content h2,
                    .blog-content h3, .blog-content h4 {
                      text-align: left !important;
                    }
                  }
                  @media (min-width: 1024px) {
                    .blog-content p, .blog-content li {
                      text-align: justify;
                    }
                  }
                  `}</style>
                  <div
                    className="blog-content text-foreground leading-relaxed text-left"
                    dangerouslySetInnerHTML={{ __html: processedHtml }}
                  />
                </>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">
                    No content available for this post.
                  </p>
                </div>
              )}
            </article>

            {/* Social Share Section */}
            <div className="mb-8 md:mb-12 p-4 md:p-6 bg-muted/30 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Share this article</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" onClick={() => sharePost("facebook")}>
                  <Facebook className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Facebook</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => sharePost("twitter")}>
                  <Twitter className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Twitter</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => sharePost("linkedin")}>
                  <Linkedin className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">LinkedIn</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => sharePost("copy")}>
                  <LinkIcon className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Copy Link</span>
                </Button>
              </div>
            </div>

            {/* FAQ Section */}
            {faqs.length > 0 && (
              <Card className="mb-8 md:mb-12">
                <div className="p-4 md:p-6 border-b">
                  <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                    <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    Frequently Asked Questions
                  </h2>
                  <p className="text-muted-foreground mt-2 text-sm md:text-base">
                    Find answers to common questions about this topic
                  </p>
                </div>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {faqs.map((faq, index) => (
                      <Collapsible
                        key={index}
                        open={openFaqIndex === index}
                        onOpenChange={() =>
                          setOpenFaqIndex(openFaqIndex === index ? null : index)
                        }
                      >
                        <CollapsibleTrigger className="w-full p-4 md:p-6 text-left hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold pr-4 text-sm md:text-base">
                              {faq.question}
                            </h3>
                            {openFaqIndex === index ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            )}
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 md:px-6 pb-4 md:pb-6">
                          <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                            {faq.answer}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8 border-t">
              <Button variant="outline" asChild>
                <Link to="/blogs" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to all posts
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2"
              >
                <ChevronUp className="h-4 w-4" />
                Back to top
              </Button>
            </div>
          </main>

          {/* RIGHT: Related Posts */}
          <aside className="hidden lg:block">
            {relatedBlogs && relatedBlogs.length > 0 && (
              <div className="sticky top-20">
                <div className="bg-muted/40 rounded-xl p-4 border border-border max-h-[calc(100vh-88px)] overflow-y-auto">
                  <h3 className="font-semibold text-sm text-primary uppercase tracking-wide mb-4">
                    {countryCategory ? `More from ${countryCategory.name}` : 'Related Posts'}
                  </h3>
                  <div className="space-y-4">
                    {relatedBlogs.map((post) => (
                      <Link
                        key={post.id}
                        to={`/blogs/${post.slug || post.id}`}
                        className="group flex gap-3 items-start hover:opacity-80 transition-opacity"
                      >
                        {post.featured_image_url ? (
                          <img
                            src={post.featured_image_url}
                            alt={post.title}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-muted flex-shrink-0 flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium leading-snug line-clamp-3 group-hover:text-primary transition-colors">
                            {post.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(post.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    to="/blogs"
                    className="block mt-4 text-xs text-primary hover:underline text-center"
                  >
                    View all blogs →
                  </Link>
                </div>
              </div>
            )}
          </aside>

        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
