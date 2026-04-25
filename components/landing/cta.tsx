"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/cta-bg.jpg')`,
        }}
      >
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
            Build a Long-Term Agricultural Supply Partnership
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Partner with EGO for reliable rice export operations and expanding
            agricultural sourcing capabilities.
          </p>
          <Button
            size="lg"
            className="bg-[#F5A623] hover:bg-[#D4911E] text-foreground font-semibold rounded-full px-10 py-6 text-lg"
          >
            Contact Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
