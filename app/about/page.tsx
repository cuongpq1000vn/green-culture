import { Metadata } from "next";
import { PageHero } from "@/components/landing/page-hero";
import { AboutCMS } from "@/components/cms/about-cms";
import { FeaturedImageCMS } from "@/components/cms/featured-image-cms";
import { GlobalPartnersCMS } from "@/components/cms/global-partners-cms";
import { TestimonialsCMS } from "@/components/cms/testimonials-cms";
import { CTACMS } from "@/components/cms/cta-cms";
import { getSiteSettings } from "@/lib/strapi/queries/settings";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  
  return {
    title: "About Us",
    description: siteSettings?.companyDescription || "Learn about EGO Agricultural Export - your trusted partner in Vietnamese agricultural products. 25+ years of experience in exporting premium rice, coffee, mango, and cassava worldwide.",
  };
}

export default function AboutPage() {
  return (
    <main>
      <PageHero 
        title="About Us"
        breadcrumbs={[{ label: "About Us", href: "/about" }]}
      />
      <AboutCMS />
      <FeaturedImageCMS />
      <GlobalPartnersCMS />
      <TestimonialsCMS />
      <CTACMS />
    </main>
  );
}