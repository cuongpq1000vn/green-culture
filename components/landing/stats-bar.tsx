"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import type { Stat } from "@/lib/strapi/types";

interface StatsBarProps {
  data?: Stat[];
}

const defaultStats = [
  {
    value: "25+",
    label: "Years Experience"
  },
  {
    value: "500+",
    label: "Global Partners"
  },
  {
    value: "50K+",
    label: "Tons Exported"
  },
  {
    value: "99%",
    label: "Quality Guaranteed"
  }
];

export function StatsBar({ data }: StatsBarProps = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  // Use fallback if data is undefined, null, or empty array
  const stats = data && data.length > 0 ? data : defaultStats;

  // Helper to format stat value with prefix/suffix
  const formatValue = (stat: any) => {
    if ('prefix' in stat || 'suffix' in stat) {
      return `${stat.prefix || ''}${stat.value}${stat.suffix || ''}`;
    }
    return stat.value;
  };

  return (
    <section className="py-16 bg-gradient-to-r from-background to-[#FFF8E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-[#FFF5E0]/50 rounded-2xl p-6">
                <span className="block text-3xl md:text-4xl font-bold text-[#C4880A] mb-2">
                  {formatValue(stat)}
                </span>
                <span className="text-muted-foreground text-sm font-medium">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}