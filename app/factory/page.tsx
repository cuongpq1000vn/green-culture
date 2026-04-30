import { Metadata } from "next";
import { PageHero } from "@/components/landing/page-hero";
import { FacilitiesCMS } from "@/components/cms/facilities-cms";
import { ProcessCMS } from "@/components/cms/process-cms";
import { FeaturedImage } from "@/components/landing/featured-image";
import { CTACMS } from "@/components/cms/cta-cms";

export const metadata: Metadata = {
  title: "Our Factory",
  description: "Explore EGO's state-of-the-art processing facilities and quality control systems. Our modern factories ensure the highest standards in agricultural product processing and packaging.",
};

export default function FactoryPage() {
  return (
    <main>
      <PageHero 
        title="Our Factory"
        breadcrumbs={[{ label: "Our Factory", href: "/factory" }]}
      />
      <FacilitiesCMS />
      <ProcessCMS />
      <FeaturedImage />
      <CTACMS />
    </main>
  );
}