"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { GlobalPartner } from "@/lib/strapi/types";

interface SectionHeader {
  badge?: string;
  title?: string;
  subtitle?: string;
}

interface GlobalPartnersProps {
  data?: GlobalPartner[];
  sectionHeader?: SectionHeader;
}

const defaultPartners = [
  {
    id: 1,
    country: "United Arab Emirates",
    flagEmoji: "🇦🇪",
    partnerCount: 12,
    yearsCooperation: "6+",
    order: 1,
  },
  {
    id: 2,
    country: "Philippines",
    flagEmoji: "🇵🇭",
    partnerCount: 7,
    yearsCooperation: "4+",
    order: 2,
  },
  {
    id: 3,
    country: "China",
    flagEmoji: "🇨🇳",
    partnerCount: 15,
    yearsCooperation: "8+",
    order: 3,
  },
  {
    id: 4,
    country: "Malaysia",
    flagEmoji: "🇲🇾",
    partnerCount: 9,
    yearsCooperation: "5+",
    order: 4,
  },
  {
    id: 5,
    country: "Indonesia",
    flagEmoji: "🇮🇩",
    partnerCount: 11,
    yearsCooperation: "7+",
    order: 5,
  },
  {
    id: 6,
    country: "Singapore",
    flagEmoji: "🇸🇬",
    partnerCount: 6,
    yearsCooperation: "3+",
    order: 6,
  },
];

const defaultSectionHeader: SectionHeader = {
  title: "Global Reach",
  subtitle: "Serving 15+ countries worldwide",
};

export function GlobalPartners({ data, sectionHeader }: GlobalPartnersProps = {}) {
  // Use fallback if data is undefined, null, or empty array
  const displayPartners = data && data.length > 0 ? data : defaultPartners;
  const header = sectionHeader || defaultSectionHeader;
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Partner Cards */}
          <div className="grid grid-cols-2 gap-4">
            {displayPartners.map((partner, index) => (
              <motion.div
                key={partner.id || partner.country}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-2">
                  {partner.flagEmoji && (
                    <span className="text-2xl">{partner.flagEmoji}</span>
                  )}
                  <h3 className="font-semibold text-foreground text-sm">
                    {partner.country}
                  </h3>
                </div>
                {(partner.partnerCount || partner.yearsCooperation) && (
                  <p className="text-xs text-foreground/60">
                    {partner.partnerCount ? `${partner.partnerCount} partners` : ''}
                    {partner.partnerCount && partner.yearsCooperation ? ' · ' : ''}
                    {partner.yearsCooperation ? `${partner.yearsCooperation} years of cooperation` : ''}
                  </p>
                )}
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
                  {header.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-foreground/60"
                >
                  {header.subtitle}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
