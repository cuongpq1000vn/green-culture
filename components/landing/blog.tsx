"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    image: "/images/blog-1.jpg",
    category: "Industry News",
    title: "Vietnam Rice Exports Reach Record High in 2024",
    excerpt:
      "Vietnam's rice exports have surpassed previous records, with quality improvements driving demand in premium markets.",
    date: "Dec 15, 2024",
  },
  {
    image: "/images/blog-2.jpg",
    category: "Sustainability",
    title: "Sustainable Farming Practices in the Mekong Delta",
    excerpt:
      "New initiatives are helping farmers adopt environmentally friendly practices while maintaining productivity.",
    date: "Dec 10, 2024",
  },
  {
    image: "/images/blog-3.jpg",
    category: "Technology",
    title: "Modern Processing Technology Improves Export Quality",
    excerpt:
      "Investment in advanced milling equipment has significantly improved the quality consistency of export rice.",
    date: "Dec 5, 2024",
  },
];

export function Blog() {
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
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#a3d977] text-foreground text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-foreground/50 mb-2">{post.date}</p>
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-[#7cb342] transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-foreground/60 line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[#7cb342] group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
