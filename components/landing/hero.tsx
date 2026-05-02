"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getStrapiImageProps } from "@/lib/strapi/utils/media";
import type { HeroSection } from "@/lib/strapi/types";

interface HeroProps {
  data?: HeroSection;
}

export function Hero({ data }: HeroProps = {}) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {data?.backgroundImage ? (
          <Image
            {...getStrapiImageProps(data.backgroundImage, {
              fill: true,
              quality: 85,
            })}
            alt={data.backgroundImage.alternativeText || "Hero background"}
            className="object-cover"
            priority
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/hero-bg.jpg')`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block mb-6"
        >
          <span className="px-4 py-2 rounded-full border border-foreground/20 text-sm text-foreground/70 bg-white/50 backdrop-blur-sm">
            {data?.subtitle || "Agricultural Supply & Export from Vietnam"}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 text-balance"
        >
          {data?.title || "Supplying High-Quality Agricultural Products to Global Markets"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-2xl mx-auto text-lg text-foreground/70 mb-8"
        >
          {data?.description || "EGO processes and exports rice, expanding into coffee and mango with controlled quality systems and reliable international logistics."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button
            size="lg"
            className="bg-[#F5A623] hover:bg-[#D4911E] text-foreground font-semibold rounded-full px-8 py-6 text-lg"
            asChild={data?.ctaButton?.url ? true : undefined}
          >
            {data?.ctaButton?.url ? (
              <a href={data.ctaButton.url} target={data.ctaButton.isExternal ? "_blank" : "_self"} rel={data.ctaButton.isExternal ? "noopener noreferrer" : undefined}>
                {data.ctaButton.text}
              </a>
            ) : (
              "Learn More"
            )}
          </Button>
        </motion.div>
      </div>

      {/* Bottom gradient with tractors hint */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
