import { Metadata } from "next";
import { Hero } from "@/components/landing/hero";
import { StatsBar } from "@/components/landing/stats-bar";
import { Products } from "@/components/landing/products";
import { CTA } from "@/components/landing/cta";

export const metadata: Metadata = {
  title: "EGO - Agricultural Supply & Export from Vietnam",
  description: "EGO is your trusted partner in Vietnamese agricultural exports. With 25+ years of experience, we supply premium rice, coffee, mango, and cassava to global markets with guaranteed quality and international certifications.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <StatsBar />
      {/* Products Preview - showing first 4 products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Featured Products
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover our premium agricultural products, crafted with care and exported worldwide.
            </p>
            <a 
              href="/products"
              className="inline-flex items-center gap-2 text-[#C4880A] font-semibold hover:text-[#F5A623] transition-colors"
            >
              View All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      <CTA />
    </main>
  );
}
