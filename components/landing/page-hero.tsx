"use client";

import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface PageHeroProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
}

export function PageHero({ title, breadcrumbs }: PageHeroProps) {
  return (
    <section className="relative py-24 bg-gradient-to-r from-background via-background to-[#FFF8E7]">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Breadcrumbs */}
          <nav className="flex justify-center items-center gap-2 mb-8" aria-label="Breadcrumb">
            <Link 
              href="/" 
              className="flex items-center gap-1 text-muted-foreground hover:text-[#C4880A] transition-colors"
            >
              <Home className="h-4 w-4" />
              <span className="text-sm">Home</span>
            </Link>
            
            {breadcrumbs.map((item, index) => (
              <div key={item.href} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-sm font-medium text-[#C4880A]">
                    {item.label}
                  </span>
                ) : (
                  <Link 
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-[#C4880A] transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Page Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {title}
          </h1>
          
          {/* Decorative Line */}
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-[#F5A623] to-[#C4880A] rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}