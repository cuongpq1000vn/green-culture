import { Metadata } from "next";
import { HeroCMS } from "@/components/cms/hero-cms";
import { StatsBarCMS } from "@/components/cms/stats-bar-cms";
import { AboutCMS } from "@/components/cms/about-cms";
import { ProductsCMS } from "@/components/cms/products-cms";
import { FeaturedImageCMS } from "@/components/cms/featured-image-cms";
import { FacilitiesCMS } from "@/components/cms/facilities-cms";
import { ProcessCMS } from "@/components/cms/process-cms";
import { GlobalPartnersCMS } from "@/components/cms/global-partners-cms";
import { TestimonialsCMS } from "@/components/cms/testimonials-cms";
import { BlogCMS } from "@/components/cms/blog-cms";
import { CTACMS } from "@/components/cms/cta-cms";
import { getLandingPage } from "@/lib/strapi/queries/landing-page";

export const metadata: Metadata = {
  title: "EGO - Agricultural Supply & Export from Vietnam",
  description: "EGO is your trusted partner in Vietnamese agricultural exports. With 25+ years of experience, we supply premium rice, coffee, mango, and cassava to global markets with guaranteed quality and international certifications.",
};

export default async function Home() {
  // Fetch landing page data for section headers
  const landingPage = await getLandingPage();
  
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroCMS />
      
      {/* Stats Bar */}
      <StatsBarCMS />
      
      {/* About Section */}
      <AboutCMS />
      
      {/* Featured Products Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {landingPage?.productsSection?.title || "Featured Products"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {landingPage?.productsSection?.description || "Discover our premium agricultural products, crafted with care and exported worldwide."}
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
          <ProductsCMS featuredOnly />
        </div>
      </section>

      {/* Featured Image Section */}
      <FeaturedImageCMS />

      {/* Facilities Section */}
      <FacilitiesCMS />

      {/* Process Section */}
      <ProcessCMS />

      {/* Global Partners Section */}
      <GlobalPartnersCMS />

      {/* Testimonials Section */}
      <TestimonialsCMS />

      {/* Recent News/Blog Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Latest Updates
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Stay informed about our latest developments, industry insights, and company news
            </p>
            <a 
              href="/news"
              className="inline-flex items-center gap-2 text-[#C4880A] font-semibold hover:text-[#F5A623] transition-colors"
            >
              View All News
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
          <BlogCMS limit={3} />
        </div>
      </section>

      {/* Call to Action Section */}
      <CTACMS />
    </main>
  );
}
