import { Metadata } from "next";
import { PageHero } from "@/components/landing/page-hero";
import { About } from "@/components/landing/about";
import { FeaturedImage } from "@/components/landing/featured-image";
import { GlobalPartners } from "@/components/landing/global-partners";
import { Testimonials } from "@/components/landing/testimonials";
import { CTA } from "@/components/landing/cta";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about EGO Agricultural Export - your trusted partner in Vietnamese agricultural products. 25+ years of experience in exporting premium rice, coffee, mango, and cassava worldwide.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero 
        title="About Us"
        breadcrumbs={[{ label: "About Us", href: "/about" }]}
      />
      <About />
      <FeaturedImage />
      <GlobalPartners />
      <Testimonials />
      <CTA />
    </main>
  );
}