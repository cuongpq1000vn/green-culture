"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { getStrapiImageProps } from "@/lib/strapi/utils/media";
import type { StrapiMedia } from "@/lib/strapi/types";

interface FeaturedImageProps {
  data?: StrapiMedia;
}

export function FeaturedImage({ data }: FeaturedImageProps = {}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative h-[70vh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        {data ? (
          <Image
            {...getStrapiImageProps(data, {
              fill: true,
              quality: 85,
            })}
            alt={data.alternativeText || "Featured image"}
            className="object-cover"
          />
        ) : (
          <Image
            src="/images/rice-closeup.jpg"
            alt="Rice plants in hand"
            fill
            className="object-cover"
          />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-60" />
    </section>
  );
}
