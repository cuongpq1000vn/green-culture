"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getStrapiImageProps } from "@/lib/strapi/utils/media";
import type { CTASection } from "@/lib/strapi/types";

interface CTAProps {
  data?: CTASection;
}

export function CTA({ data }: CTAProps = {}) {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {data?.backgroundImage ? (
          <Image
            {...getStrapiImageProps(data.backgroundImage, {
              fill: true,
              quality: 85,
            })}
            alt={data.backgroundImage.alternativeText || "CTA background"}
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/images/cta-bg.jpg')`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            {data?.title || "Build a Long-Term Agricultural Supply Partnership"}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            {data?.description || "Partner with EGO for reliable rice export operations and expanding agricultural sourcing capabilities."}
          </p>
          <Button
            size="lg"
            className="bg-[#F5A623] hover:bg-[#D4911E] text-foreground font-semibold rounded-full px-10 py-6 text-lg"
            asChild={data?.primaryButton?.href ? true : undefined}
          >
            {data?.primaryButton?.href ? (
              <a href={data.primaryButton.href} target={data.primaryButton.openInNewTab ? "_blank" : "_self"} rel={data.primaryButton.openInNewTab ? "noopener noreferrer" : undefined}>
                {data.primaryButton.label}
              </a>
            ) : (
              "Contact Us"
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
