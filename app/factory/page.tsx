import { Metadata } from "next";
import { PageHero } from "@/components/landing/page-hero";
import { Facilities } from "@/components/landing/facilities";
import { Process } from "@/components/landing/process";
import { FeaturedImage } from "@/components/landing/featured-image";
import { CTA } from "@/components/landing/cta";

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
      <Facilities />
      <Process />
      <FeaturedImage />
      <CTA />
    </main>
  );
}