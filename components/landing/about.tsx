"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "50+", label: "Global Partners" },
  { value: "100K+", label: "Tons Exported Annually" },
  { value: "15+", label: "Countries Served" },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-[#e8f5dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#f5f5dc]/50 rounded-2xl p-6 text-center"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                className="block text-4xl md:text-5xl font-bold text-[#7cb342] mb-2"
              >
                {stat.value}
              </motion.span>
              <span className="text-foreground/60 text-sm">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full border border-foreground/20 text-sm text-foreground/70 mb-4">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Building Sustainable Agricultural Supply Chains
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-6">
              EGO is a leading agricultural export company based in Vietnam,
              specializing in high-quality rice processing and export. Our
              operations begin with cassava starch and are built around
              practical production needs and long-term growth.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              We focus on quality control, sustainable sourcing, and reliable
              international logistics to ensure our partners receive the best
              agricultural products for their markets.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative h-80 lg:h-[450px] rounded-2xl overflow-hidden"
          >
            <Image
              src="/images/about-rice-field.jpg"
              alt="Agricultural fields"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
