import { Metadata } from "next";
import { PageHero } from "@/components/landing/page-hero";
import { AboutCMS } from "@/components/cms/about-cms";
import { FeaturedImage } from "@/components/landing/featured-image";
import { GlobalPartnersCMS } from "@/components/cms/global-partners-cms";
import { TestimonialsCMS } from "@/components/cms/testimonials-cms";
import { CTACMS } from "@/components/cms/cta-cms";

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
      <AboutCMS />
      <FeaturedImage />
      <GlobalPartnersCMS />
      <TestimonialsCMS />
      <CTACMS />
    </main>
  );
}