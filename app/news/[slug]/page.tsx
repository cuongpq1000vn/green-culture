import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { PageHero } from "@/components/landing/page-hero";
import { CTACMS } from "@/components/cms/cta-cms";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/strapi/queries/blog";
import { getStrapiMediaUrl } from "@/lib/strapi/utils/media";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords,
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const coverImageUrl = post.coverImage && typeof post.coverImage === 'object' && 'url' in post.coverImage
    ? getStrapiMediaUrl(post.coverImage.url)
    : '/images/blog-1.jpg';

  return (
    <main>
      <PageHero
        title={post.title}
        breadcrumbs={[
          { label: "News", href: "/news" },
          { label: post.title, href: `/news/${post.slug}` },
        ]}
      />

      <article className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link 
            href="/news" 
            className="inline-flex items-center gap-2 text-[#C4880A] hover:text-[#D4911E] mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to News
          </Link>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 mb-8 text-foreground/60">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
            {post.author && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span className="px-3 py-1 bg-[#FFF8E7] text-[#C4880A] text-xs font-medium rounded-full">
                {post.category}
              </span>
            </div>
          </div>

          {/* Cover image */}
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
            <Image
              src={coverImageUrl}
              alt={post.coverImage && typeof post.coverImage === 'object' && post.coverImage.alternativeText 
                ? post.coverImage.alternativeText 
                : post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/80 prose-strong:text-foreground prose-a:text-[#C4880A] hover:prose-a:text-[#D4911E]">
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
            ) : (
              <p className="text-foreground/70 text-lg">{post.excerpt}</p>
            )}
          </div>
        </div>
      </article>

      <CTACMS />
    </main>
  );
}

// Simple markdown to HTML converter for blog content
function formatContent(content: string): string {
  return content
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    // Paragraphs (split by double newlines)
    .split('\n\n')
    .map(paragraph => {
      const trimmed = paragraph.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol')) {
        return trimmed;
      }
      return `<p>${trimmed}</p>`;
    })
    .join('\n')
    // Clean up extra whitespace
    .replace(/\n{3,}/g, '\n\n');
}
