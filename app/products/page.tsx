import { Metadata } from "next";
import { PageHero } from "@/components/landing/page-hero";
import { ProductsCMS } from "@/components/cms/products-cms";
import { CTACMS } from "@/components/cms/cta-cms";

export const metadata: Metadata = {
  title: "Our Products",
  description: "Discover EGO's premium Vietnamese agricultural products including rice, coffee, mango, and cassava. All products meet international quality standards with organic and fair trade certifications.",
};

export default function ProductsPage() {
  return (
    <main>
      <PageHero 
        title="Our Products"
        breadcrumbs={[{ label: "Our Products", href: "/products" }]}
      />
      <ProductsCMS />
      <CTACMS />
    </main>
  );
}