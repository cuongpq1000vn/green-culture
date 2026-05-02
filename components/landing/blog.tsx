"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getStrapiImageProps } from "@/lib/strapi/utils/media";
import { fallbackBlogPosts } from "@/lib/strapi/fallbacks";
import type { BlogPost } from "@/lib/strapi/types";

interface BlogProps {
  data?: BlogPost[];
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function Blog({ data }: BlogProps = {}) {
  // Use CMS data if available, otherwise fallback to static data
  const displayPosts = data && data.length > 0 ? data : fallbackBlogPosts;

  return (
    <section id="news" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-foreground/20 text-sm text-foreground/70 mb-4">
            Blogs
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Latest Updates & Industry Insights
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post, index) => (
            <Link key={post.id || post.title} href={`/news/${post.slug}`}>
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group cursor-pointer h-full"
              >
                <div className="relative h-48 overflow-hidden">
                  {post.coverImage && typeof post.coverImage === 'object' && 'url' in post.coverImage ? (
                    <Image
                      {...getStrapiImageProps(post.coverImage, {
                        quality: 85,
                        fill: true,
                      })}
                      alt={post.coverImage.alternativeText || post.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <Image
                      src={typeof post.coverImage === 'string' ? post.coverImage : '/images/blog-1.jpg'}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#F5A623] text-foreground text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-foreground/50 mb-2">{formatDate(post.publishedAt)}</p>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-[#C4880A] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-foreground/60 line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[#C4880A] group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
