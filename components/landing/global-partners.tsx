"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  {
    country: "United Arab Emirates",
    flag: "🇦🇪",
    partners: 12,
    years: "6+",
  },
  {
    country: "Philippines",
    flag: "🇵🇭",
    partners: 7,
    years: "4+",
  },
  {
    country: "China",
    flag: "🇨🇳",
    partners: 15,
    years: "8+",
  },
  {
    country: "Malaysia",
    flag: "🇲🇾",
    partners: 9,
    years: "5+",
  },
  {
    country: "Indonesia",
    flag: "🇮🇩",
    partners: 11,
    years: "7+",
  },
  {
    country: "Singapore",
    flag: "🇸🇬",
    partners: 6,
    years: "3+",
  },
];

export function GlobalPartners() {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Partner Cards */}
          <div className="grid grid-cols-2 gap-4">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.country}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{partner.flag}</span>
                  <h3 className="font-semibold text-foreground text-sm">
                    {partner.country}
                  </h3>
                </div>
                <p className="text-xs text-foreground/60">
                  {partner.partners} partners · {partner.years} years of cooperation
                </p>
              </motion.div>
            ))}
          </div>

          {/* Globe Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] lg:h-[500px]"
          >
            <Image
              src="/images/globe.jpg"
              alt="Global reach"
              fill
              className="object-contain opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-3xl md:text-4xl font-bold text-foreground mb-2"
                >
                  Global Reach
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-foreground/60"
                >
                  Serving 15+ countries worldwide
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
