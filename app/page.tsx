import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { About } from "@/components/landing/about";
import { Facilities } from "@/components/landing/facilities";
import { FeaturedImage } from "@/components/landing/featured-image";
import { Process } from "@/components/landing/process";
import { GlobalPartners } from "@/components/landing/global-partners";
import { Blog } from "@/components/landing/blog";
import { Testimonials } from "@/components/landing/testimonials";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Facilities />
      <FeaturedImage />
      <Process />
      <GlobalPartners />
      <Blog />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
