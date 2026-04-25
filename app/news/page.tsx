import { Metadata } from "next";
import { PageHero } from "@/components/landing/page-hero";
import { Blog } from "@/components/landing/blog";
import { CTA } from "@/components/landing/cta";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Stay updated with the latest news from EGO Agricultural Export. Read about industry trends, company milestones, and insights into Vietnamese agricultural exports.",
};

export default function NewsPage() {
  return (
    <main>
      <PageHero 
        title="News & Updates"
        breadcrumbs={[{ label: "News & Updates", href: "/news" }]}
      />
      <Blog />
      <CTA />
    </main>
  );
}